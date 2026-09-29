"use client";

import * as React from "react";

import type { LessonProgressRecord } from "@/lib/learning/types";
import {
  getClientSnapshot,
  getServerSnapshot,
  markLessonCompleteAction,
  recordQuizScoreAction,
  resetProgressAction,
  subscribeProgress,
} from "@/lib/progress/progress-store";

interface ProgressContextValue {
  /** False during server rendering and the first client render. */
  ready: boolean;
  lessons: Record<string, LessonProgressRecord>;
  xp: number;
  completedCount: number;
  /** Average of all recorded quiz scores, or null when there are none. */
  quizAverage: number | null;
  streak: number;
  isComplete: (lessonSlug: string) => boolean;
  getLesson: (lessonSlug: string) => LessonProgressRecord | undefined;
  markLessonComplete: (input: { lessonSlug: string; chapterSlug: string; xp?: number }) => void;
  recordQuizScore: (input: {
    lessonSlug: string;
    chapterSlug: string;
    percent: number;
    xpPerCorrect?: number;
    correctCount?: number;
  }) => void;
  resetProgress: () => void;
}

const ProgressContext = React.createContext<ProgressContextValue | null>(null);

/** Stable functions so the "ready" snapshot never triggers extra renders. */
const alwaysTrue = () => true;
const alwaysFalse = () => false;

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  // Progress lives outside React (in localStorage), so it is read through
  // useSyncExternalStore rather than mirrored into state via an effect.
  const state = React.useSyncExternalStore(
    subscribeProgress,
    getClientSnapshot,
    getServerSnapshot,
  );

  // False on the server and during hydration, true once the browser store is read.
  const ready = React.useSyncExternalStore(subscribeProgress, alwaysTrue, alwaysFalse);

  const value = React.useMemo<ProgressContextValue>(() => {
    const records = Object.values(state.lessons);
    const xp = records.reduce((sum, record) => sum + (record.xpEarned ?? 0), 0);
    const completedCount = records.filter((record) => record.completed).length;
    const scored = records.filter((record) => record.bestScore > 0);
    const quizAverage =
      scored.length > 0
        ? scored.reduce((sum, record) => sum + record.bestScore, 0) / scored.length
        : null;

    return {
      ready,
      lessons: state.lessons,
      xp,
      completedCount,
      quizAverage,
      streak: state.streak.count,
      isComplete: (lessonSlug) => Boolean(state.lessons[lessonSlug]?.completed),
      getLesson: (lessonSlug) => state.lessons[lessonSlug],
      markLessonComplete: markLessonCompleteAction,
      recordQuizScore: recordQuizScoreAction,
      resetProgress: resetProgressAction,
    };
  }, [state, ready]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const context = React.useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a <ProgressProvider>");
  }
  return context;
}
