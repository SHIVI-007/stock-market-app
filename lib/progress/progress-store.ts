import type { LessonProgressRecord } from "@/lib/learning/types";

/**
 * A small external store for learning progress.
 *
 * Using a module-level store (rather than `useState` + `useEffect`) means the UI
 * reads progress through `useSyncExternalStore`, which is the recommended way to
 * synchronise React with an external system such as `localStorage`.
 */
export const STORAGE_KEY = "smf-progress-v1";
const XP_PER_LESSON = 50;

export interface StreakState {
  count: number;
  lastActiveDate: string | null;
}

export interface ProgressState {
  lessons: Record<string, LessonProgressRecord>;
  streak: StreakState;
}

export const EMPTY_PROGRESS: ProgressState = {
  lessons: {},
  streak: { count: 0, lastActiveDate: null },
};

let cachedSnapshot: ProgressState | null = null;
const listeners = new Set<() => void>();

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Advance the streak based on the last day there was activity. */
function nextStreak(streak: StreakState): StreakState {
  const today = todayKey();
  if (streak.lastActiveDate === today) return streak;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);

  const count = streak.lastActiveDate === yesterdayKey ? streak.count + 1 : 1;
  return { count, lastActiveDate: today };
}

function readFromStorage(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      lessons: parsed.lessons ?? {},
      streak: parsed.streak ?? EMPTY_PROGRESS.streak,
    };
  } catch {
    return EMPTY_PROGRESS;
  }
}

/** Snapshot used by the client. The value is cached for referential stability. */
export function getClientSnapshot(): ProgressState {
  if (cachedSnapshot === null) {
    cachedSnapshot = readFromStorage();
  }
  return cachedSnapshot;
}

/** Snapshot used during server rendering and hydration. */
export function getServerSnapshot(): ProgressState {
  return EMPTY_PROGRESS;
}

export function subscribeProgress(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function commit(next: ProgressState): void {
  cachedSnapshot = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore storage failures (private mode, quota exceeded).
  }
  for (const listener of listeners) listener();
}

function upsertLesson(
  lessonSlug: string,
  chapterSlug: string,
  patch: Partial<LessonProgressRecord>,
): void {
  const current = getClientSnapshot();
  const existing = current.lessons[lessonSlug];

  commit({
    lessons: {
      ...current.lessons,
      [lessonSlug]: {
        lessonSlug,
        chapterSlug,
        completed: existing?.completed ?? false,
        bestScore: existing?.bestScore ?? 0,
        xpEarned: existing?.xpEarned ?? 0,
        updatedAt: new Date().toISOString(),
        ...patch,
      },
    },
    streak: nextStreak(current.streak),
  });
}

export function markLessonCompleteAction(input: {
  lessonSlug: string;
  chapterSlug: string;
  xp?: number;
}): void {
  const current = getClientSnapshot();
  const existing = current.lessons[input.lessonSlug];
  upsertLesson(input.lessonSlug, input.chapterSlug, {
    completed: true,
    xpEarned: Math.max(existing?.xpEarned ?? 0, input.xp ?? XP_PER_LESSON),
  });
}

export function recordQuizScoreAction(input: {
  lessonSlug: string;
  chapterSlug: string;
  percent: number;
  correctCount?: number;
  xpPerCorrect?: number;
}): void {
  const current = getClientSnapshot();
  const existing = current.lessons[input.lessonSlug];
  const quizXp = (input.correctCount ?? 0) * (input.xpPerCorrect ?? 20);

  upsertLesson(input.lessonSlug, input.chapterSlug, {
    bestScore: Math.max(existing?.bestScore ?? 0, input.percent),
    xpEarned: Math.max(existing?.xpEarned ?? 0, quizXp),
  });
}

export function resetProgressAction(): void {
  commit(EMPTY_PROGRESS);
}

/** The current lesson map (used when syncing with the server). */
export function getLessons(): Record<string, LessonProgressRecord> {
  return getClientSnapshot().lessons;
}

/**
 * Merges progress fetched from the server into the local store.
 *
 * The merge is a union: a lesson counts as complete if either side says so, and
 * the best quiz score and highest XP win. This means signing in on a new device
 * never loses progress made before signing in.
 */
export function mergeServerProgress(records: LessonProgressRecord[]): void {
  if (records.length === 0) return;

  const current = getClientSnapshot();
  const merged: Record<string, LessonProgressRecord> = { ...current.lessons };

  for (const record of records) {
    const existing = merged[record.lessonSlug];

    if (!existing) {
      merged[record.lessonSlug] = record;
      continue;
    }

    merged[record.lessonSlug] = {
      lessonSlug: record.lessonSlug,
      chapterSlug: existing.chapterSlug || record.chapterSlug,
      completed: existing.completed || record.completed,
      bestScore: Math.max(existing.bestScore, record.bestScore),
      xpEarned: Math.max(existing.xpEarned, record.xpEarned),
      updatedAt: existing.updatedAt > record.updatedAt ? existing.updatedAt : record.updatedAt,
    };
  }

  commit({ lessons: merged, streak: current.streak });
}
