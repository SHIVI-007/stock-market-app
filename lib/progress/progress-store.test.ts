import { beforeEach, describe, expect, it } from "vitest";

import {
  EMPTY_PROGRESS,
  STORAGE_KEY,
  getClientSnapshot,
  getLessons,
  markLessonCompleteAction,
  mergeServerProgress,
  recordQuizScoreAction,
  resetProgressAction,
  subscribeProgress,
} from "./progress-store";

/**
 * The store caches its snapshot at module scope, so each test resets the
 * persisted data and the cache to keep them independent.
 */
function resetStore() {
  localStorage.clear();
  resetProgressAction();
}

describe("progress store", () => {
  beforeEach(() => {
    resetStore();
  });

  it("starts empty", () => {
    expect(getClientSnapshot()).toEqual(EMPTY_PROGRESS);
  });

  it("marks a lesson complete and awards XP", () => {
    markLessonCompleteAction({
      lessonSlug: "lesson-1-what-is-money",
      chapterSlug: "chapter-1-money",
    });

    const record = getClientSnapshot().lessons["lesson-1-what-is-money"];
    expect(record?.completed).toBe(true);
    expect(record?.xpEarned).toBe(50);
  });

  it("records a quiz score and keeps the best score", () => {
    recordQuizScoreAction({
      lessonSlug: "lesson-2-saving-vs-investing",
      chapterSlug: "chapter-1-money",
      percent: 40,
      correctCount: 2,
    });
    recordQuizScoreAction({
      lessonSlug: "lesson-2-saving-vs-investing",
      chapterSlug: "chapter-1-money",
      percent: 80,
      correctCount: 4,
    });

    const record = getClientSnapshot().lessons["lesson-2-saving-vs-investing"];
    expect(record?.bestScore).toBe(80);
    expect(record?.xpEarned).toBe(80);
  });

  it("persists to localStorage under a stable key", () => {
    markLessonCompleteAction({ lessonSlug: "a", chapterSlug: "chapter-1-money" });

    const raw = localStorage.getItem(STORAGE_KEY);
    expect(raw).toBeTruthy();
    expect(JSON.parse(raw as string).lessons.a.completed).toBe(true);
  });

  it("notifies subscribers when progress changes", () => {
    let calls = 0;
    const unsubscribe = subscribeProgress(() => {
      calls += 1;
    });

    markLessonCompleteAction({ lessonSlug: "b", chapterSlug: "chapter-1-money" });
    expect(calls).toBe(1);

    unsubscribe();
    markLessonCompleteAction({ lessonSlug: "c", chapterSlug: "chapter-1-money" });
    expect(calls).toBe(1);
  });

  it("starts a streak on first activity", () => {
    markLessonCompleteAction({ lessonSlug: "d", chapterSlug: "chapter-1-money" });
    expect(getClientSnapshot().streak.count).toBe(1);
  });

  it("resets progress", () => {
    markLessonCompleteAction({ lessonSlug: "e", chapterSlug: "chapter-1-money" });
    resetProgressAction();
    expect(getClientSnapshot()).toEqual(EMPTY_PROGRESS);
  });

  it("exposes the lesson map for syncing", () => {
    markLessonCompleteAction({ lessonSlug: "f", chapterSlug: "chapter-1-money" });
    expect(Object.keys(getLessons())).toEqual(["f"]);
  });
});

describe("merging progress from the server", () => {
  beforeEach(() => {
    resetStore();
  });

  it("adds lessons that exist only on the server", () => {
    mergeServerProgress([
      {
        lessonSlug: "server-only",
        chapterSlug: "chapter-1-money",
        completed: true,
        bestScore: 80,
        xpEarned: 120,
        updatedAt: "2024-01-01T00:00:00.000Z",
      },
    ]);

    const record = getClientSnapshot().lessons["server-only"];
    expect(record?.completed).toBe(true);
    expect(record?.bestScore).toBe(80);
    expect(record?.xpEarned).toBe(120);
  });

  it("keeps the better quiz score when both sides have the lesson", () => {
    recordQuizScoreAction({
      lessonSlug: "shared",
      chapterSlug: "chapter-1-money",
      percent: 40,
      correctCount: 2,
    });

    mergeServerProgress([
      {
        lessonSlug: "shared",
        chapterSlug: "chapter-1-money",
        completed: false,
        bestScore: 90,
        xpEarned: 40,
        updatedAt: "2024-05-01T00:00:00.000Z",
      },
    ]);

    expect(getClientSnapshot().lessons.shared?.bestScore).toBe(90);
  });

  it("never loses a lesson completed locally", () => {
    markLessonCompleteAction({ lessonSlug: "local", chapterSlug: "chapter-1-money" });

    mergeServerProgress([
      {
        lessonSlug: "local",
        chapterSlug: "chapter-1-money",
        completed: false,
        bestScore: 0,
        xpEarned: 0,
        updatedAt: "2024-01-01T00:00:00.000Z",
      },
    ]);

    expect(getClientSnapshot().lessons.local?.completed).toBe(true);
  });

  it("ignores an empty payload", () => {
    markLessonCompleteAction({ lessonSlug: "keep", chapterSlug: "chapter-1-money" });
    mergeServerProgress([]);
    expect(Object.keys(getClientSnapshot().lessons)).toEqual(["keep"]);
  });
});
