import { analysisChapters } from "./modules/analysis";
import { foundationsChapters } from "./modules/foundations";
import { instrumentsChapters } from "./modules/instruments";
import { marketsChapters } from "./modules/markets";
import { ratiosChapters } from "./modules/ratios";
import { statementsChapters } from "./modules/statements";
import { valuationChapters } from "./modules/valuation";
import type { Chapter, Course, Lesson } from "./types";

const allChapters: Chapter[] = [
  ...foundationsChapters,
  ...marketsChapters,
  ...instrumentsChapters,
  ...statementsChapters,
  ...ratiosChapters,
  ...valuationChapters,
  ...analysisChapters,
].sort((a, b) => a.chapterOrder - b.chapterOrder);

export const course: Course = {
  slug: "stock-market-fundamentals",
  title: "Stock Market Fundamentals",
  subtitle: "Learn the stock market from zero",
  description:
    "An interactive journey from understanding your first share to learning how to analyse a company's fundamentals.",
  chapters: allChapters,
};

export const chapters = allChapters;

/** Every lesson paired with its parent chapter, in course order. */
export interface FlatLesson {
  chapter: Chapter;
  lesson: Lesson;
  /** Position across the whole course, starting at 1. */
  index: number;
}

export const flatLessons: FlatLesson[] = allChapters.flatMap((chapter) =>
  chapter.lessons.map((lesson) => ({ chapter, lesson, index: 0 })),
).map((entry, index) => ({ ...entry, index: index + 1 }));

export const totalLessons = flatLessons.length;
export const totalChapters = allChapters.length;

export function getChapter(chapterSlug: string): Chapter | undefined {
  return allChapters.find((chapter) => chapter.slug === chapterSlug);
}

export function getLesson(chapterSlug: string, lessonSlug: string): Lesson | undefined {
  return getChapter(chapterSlug)?.lessons.find((lesson) => lesson.slug === lessonSlug);
}

export function getChapterIndex(chapterSlug: string): number {
  return allChapters.findIndex((chapter) => chapter.slug === chapterSlug);
}

export interface LessonNeighbours {
  previous?: { chapter: Chapter; lesson: Lesson };
  next?: { chapter: Chapter; lesson: Lesson };
}

/** Previous/next lesson across chapter boundaries, for lesson navigation. */
export function getLessonNeighbours(
  chapterSlug: string,
  lessonSlug: string,
): LessonNeighbours {
  const current = flatLessons.findIndex(
    (entry) => entry.chapter.slug === chapterSlug && entry.lesson.slug === lessonSlug,
  );
  if (current === -1) return {};

  const previous = flatLessons[current - 1];
  const next = flatLessons[current + 1];

  return {
    previous: previous ? { chapter: previous.chapter, lesson: previous.lesson } : undefined,
    next: next ? { chapter: next.chapter, lesson: next.lesson } : undefined,
  };
}

/** The first lesson of the course — used by "Start Learning". */
export function getFirstLesson(): FlatLesson | undefined {
  return flatLessons[0];
}

/**
 * The next lesson the learner has not completed yet, given a set of completed
 * lesson slugs. Falls back to the first lesson.
 */
export function getRecommendedLesson(completedLessonSlugs: string[]): FlatLesson {
  const completed = new Set(completedLessonSlugs);
  return flatLessons.find((entry) => !completed.has(entry.lesson.slug)) ?? flatLessons[0];
}

/** Formatted lesson count for a chapter, e.g. "3 lessons". */
export function chapterLessonLabel(chapter: Chapter): string {
  const count = chapter.lessons.length;
  return `${count} ${count === 1 ? "lesson" : "lessons"}`;
}

/** Build a URL for a lesson. */
export function lessonHref(chapterSlug: string, lessonSlug: string): string {
  return `/learn/${chapterSlug}/${lessonSlug}`;
}

/** Build a URL for a chapter. */
export function chapterHref(chapterSlug: string): string {
  return `/learn/${chapterSlug}`;
}

/** Estimated total minutes across the course. */
export const totalMinutes = flatLessons.reduce(
  (sum, entry) => sum + entry.lesson.estimatedMinutes,
  0,
);
