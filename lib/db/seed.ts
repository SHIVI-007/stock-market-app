import type { PrismaClient } from "@prisma/client";

import { achievements } from "../learning/achievements";
import { course } from "../learning/curriculum";
import { glossary } from "../learning/glossary";

/**
 * Mirrors the authored learning content into PostgreSQL.
 *
 * The course, glossary and achievements are authored in `lib/learning/*` and
 * this module copies them across. It is **idempotent and safe to re-run**: rows
 * are matched on their natural key (`slug`) and updated in place, so lesson ids
 * stay stable and everything hanging off them survives.
 *
 * That matters because learners' data hangs off `Lesson`:
 *
 *  - `LessonProgress` and `LessonRating` both cascade from `Lesson`, and
 *  - `QuizAttempt` cascades from `Quiz`.
 *
 * An earlier version deleted and recreated those rows, which quietly wiped every
 * learner's progress, scores and ratings on each run. Nothing here deletes
 * except content that has genuinely been removed from the authored source.
 */

/**
 * Used to park existing rows out of the way while the unique ordering columns
 * are rewritten.
 *
 * `chapters` and `lessons` are unique on their position within the parent
 * (`[courseId, chapterOrder]`, `[chapterId, lessonOrder]`), so moving a row onto
 * a position another row still holds fails. Parking everything above this offset
 * first means the real values can then be written in any order — including when
 * a chapter is inserted into the middle and everything after it shifts.
 */
const ORDER_PARK_OFFSET = 100_000;

export interface SeedSummary {
  chapters: number;
  lessons: number;
  questions: number;
  glossaryTerms: number;
  achievements: number;
  /** Content deleted because it no longer exists in the authored source. */
  removedChapters: string[];
  removedLessons: string[];
  removedGlossaryTerms: string[];
}

/** Moves every chapter position in the course above the parking offset. */
async function parkChapterOrders(prisma: PrismaClient, courseId: string): Promise<void> {
  // Already-parked rows are skipped, so a run that fails halfway can be repeated.
  await prisma.chapter.updateMany({
    where: { courseId, chapterOrder: { lt: ORDER_PARK_OFFSET } },
    data: { chapterOrder: { increment: ORDER_PARK_OFFSET } },
  });
}

/** Moves every lesson position in the given chapters above the parking offset. */
async function parkLessonOrders(
  prisma: PrismaClient,
  chapterIds: string[],
): Promise<void> {
  if (chapterIds.length === 0) return;

  await prisma.lesson.updateMany({
    where: {
      chapterId: { in: chapterIds },
      lessonOrder: { lt: ORDER_PARK_OFFSET },
    },
    data: { lessonOrder: { increment: ORDER_PARK_OFFSET } },
  });
}

export async function seedDatabase(prisma: PrismaClient): Promise<SeedSummary> {
  const summary: SeedSummary = {
    chapters: 0,
    lessons: 0,
    questions: 0,
    glossaryTerms: 0,
    achievements: 0,
    removedChapters: [],
    removedLessons: [],
    removedGlossaryTerms: [],
  };

  // ---- Course -------------------------------------------------------------
  const seededCourse = await prisma.course.upsert({
    where: { slug: course.slug },
    create: {
      slug: course.slug,
      title: course.title,
      description: course.description,
    },
    update: {
      title: course.title,
      description: course.description,
    },
  });

  // ---- Chapters -----------------------------------------------------------
  await parkChapterOrders(prisma, seededCourse.id);

  const chapterIdBySlug = new Map<string, string>();

  for (const chapter of course.chapters) {
    const seededChapter = await prisma.chapter.upsert({
      where: { slug: chapter.slug },
      create: {
        slug: chapter.slug,
        title: chapter.title,
        description: chapter.description,
        chapterOrder: chapter.chapterOrder,
        courseId: seededCourse.id,
      },
      update: {
        title: chapter.title,
        description: chapter.description,
        chapterOrder: chapter.chapterOrder,
        courseId: seededCourse.id,
      },
      select: { id: true },
    });

    chapterIdBySlug.set(chapter.slug, seededChapter.id);
    summary.chapters += 1;
  }

  // ---- Lessons and their quizzes -----------------------------------------
  // All positions are parked before any lesson is written, because a chapter
  // inserted in the middle shifts the position of every lesson after it.
  await parkLessonOrders(prisma, [...chapterIdBySlug.values()]);

  const authoredLessonSlugs: string[] = [];

  for (const chapter of course.chapters) {
    const chapterId = chapterIdBySlug.get(chapter.slug);
    if (!chapterId) continue;

    for (const [index, lesson] of chapter.lessons.entries()) {
      const seededLesson = await prisma.lesson.upsert({
        where: { slug: lesson.slug },
        create: {
          slug: lesson.slug,
          title: lesson.title,
          description: lesson.summary,
          lessonOrder: index + 1,
          difficulty: lesson.difficulty,
          estimatedMinutes: lesson.estimatedMinutes,
          interactive: lesson.interactive,
          chapterId,
        },
        update: {
          title: lesson.title,
          description: lesson.summary,
          lessonOrder: index + 1,
          difficulty: lesson.difficulty,
          estimatedMinutes: lesson.estimatedMinutes,
          interactive: lesson.interactive,
          chapterId,
        },
        select: { id: true },
      });

      authoredLessonSlugs.push(lesson.slug);
      summary.lessons += 1;

      await seedLessonQuiz(prisma, seededLesson.id, lesson, summary);
    }
  }

  // ---- Glossary and achievements -----------------------------------------
  summary.glossaryTerms = await seedGlossary(prisma, summary);
  summary.achievements = await seedAchievements(prisma);

  // ---- Remove content that is no longer authored --------------------------
  await pruneRemovedContent(prisma, seededCourse.id, authoredLessonSlugs, summary);

  return summary;
}

/**
 * Brings one lesson's quiz in line with the authored questions.
 *
 * The quiz row itself is reused when it exists: `QuizAttempt` cascades from
 * `Quiz`, so replacing it would delete learners' attempt history. Questions carry
 * no learner data — attempts hang off the quiz, not the question — so they are
 * safe to replace wholesale, which keeps the update simple.
 */
async function seedLessonQuiz(
  prisma: PrismaClient,
  lessonId: string,
  lesson: (typeof course.chapters)[number]["lessons"][number],
  summary: SeedSummary,
): Promise<void> {
  const title = `${lesson.title} — quiz`;
  const existing = await prisma.quiz.findFirst({
    where: { lessonId },
    select: { id: true },
  });

  // A lesson whose quiz was removed keeps no quiz behind.
  if (lesson.quiz.length === 0) {
    if (existing) await prisma.quiz.delete({ where: { id: existing.id } });
    return;
  }

  const quiz = existing
    ? await prisma.quiz.update({ where: { id: existing.id }, data: { title } })
    : await prisma.quiz.create({ data: { title, lessonId }, select: { id: true } });

  await prisma.question.deleteMany({ where: { quizId: quiz.id } });

  for (const [questionIndex, question] of lesson.quiz.entries()) {
    await prisma.question.create({
      data: {
        prompt: question.prompt,
        explanation: question.explanation,
        questionOrder: questionIndex + 1,
        quizId: quiz.id,
        answers: {
          create: question.options.map((text, optionIndex) => ({
            text,
            isCorrect: optionIndex === question.correctIndex,
          })),
        },
      },
    });

    summary.questions += 1;
  }
}

async function seedGlossary(prisma: PrismaClient, summary: SeedSummary): Promise<number> {
  for (const entry of glossary) {
    const data = {
      term: entry.term,
      definition: entry.definition,
      formula: entry.formula ?? null,
      example: entry.example ?? null,
      related: entry.related ?? [],
    };

    await prisma.glossaryTerm.upsert({
      where: { slug: entry.slug },
      create: { slug: entry.slug, ...data },
      update: data,
    });
  }

  const authoredSlugs = glossary.map((entry) => entry.slug);
  const stale = await prisma.glossaryTerm.findMany({
    where: { slug: { notIn: authoredSlugs } },
    select: { slug: true },
  });

  if (stale.length > 0) {
    await prisma.glossaryTerm.deleteMany({
      where: { slug: { in: stale.map((term) => term.slug) } },
    });
    summary.removedGlossaryTerms = stale.map((term) => term.slug);
  }

  return glossary.length;
}

async function seedAchievements(prisma: PrismaClient): Promise<number> {
  for (const entry of achievements) {
    const data = {
      name: entry.name,
      description: `${entry.description} (${entry.requirement})`,
      icon: entry.icon,
    };

    await prisma.achievement.upsert({
      where: { slug: entry.slug },
      create: { slug: entry.slug, ...data },
      update: data,
    });
  }

  await prisma.achievement.deleteMany({
    where: { slug: { notIn: achievements.map((entry) => entry.slug) } },
  });

  return achievements.length;
}

/**
 * Deletes chapters and lessons that the authored source no longer contains.
 *
 * This is the one destructive part of the run, and it has to be: a lesson that
 * no longer exists cannot keep its progress or ratings, because both cascade
 * from `Lesson`. The caller reports what was removed rather than doing it
 * silently.
 */
async function pruneRemovedContent(
  prisma: PrismaClient,
  courseId: string,
  authoredLessonSlugs: string[],
  summary: SeedSummary,
): Promise<void> {
  const staleLessons = await prisma.lesson.findMany({
    where: {
      chapter: { courseId },
      slug: { notIn: authoredLessonSlugs },
    },
    select: { slug: true },
  });

  if (staleLessons.length > 0) {
    const slugs = staleLessons.map((lesson) => lesson.slug);
    await prisma.lesson.deleteMany({ where: { slug: { in: slugs } } });
    summary.removedLessons = slugs;
  }

  const authoredChapterSlugs = course.chapters.map((chapter) => chapter.slug);

  const staleChapters = await prisma.chapter.findMany({
    where: { courseId, slug: { notIn: authoredChapterSlugs } },
    select: { slug: true },
  });

  if (staleChapters.length > 0) {
    const slugs = staleChapters.map((chapter) => chapter.slug);
    await prisma.chapter.deleteMany({ where: { slug: { in: slugs } } });
    summary.removedChapters = slugs;
  }
}
