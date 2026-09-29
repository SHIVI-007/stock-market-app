// @vitest-environment node
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { seedDatabase } from "./seed";

/**
 * Runs against a real PostgreSQL database, because what is being tested is what
 * happens to rows and cascading foreign keys — which a mock cannot show.
 *
 * Skipped unless `SEED_TEST_DATABASE_URL` is set, and it needs an **empty,
 * dedicated** database that already has the migrations applied. It deletes
 * content rows, so never point it at anything real:
 *
 *   podman exec stock-market-db psql -U postgres -c "create database smf_seed_test;"
 *   DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/smf_seed_test" npm run db:deploy
 *   SEED_TEST_DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/smf_seed_test" npm run test
 */
const connectionString = process.env.SEED_TEST_DATABASE_URL;

/** Anything at or above this was left behind by the order-parking step. */
const PARK_OFFSET = 100_000;

describe.skipIf(!connectionString)("seedDatabase", () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient({
      adapter: new PrismaPg({ connectionString: connectionString as string }),
    });
  });

  afterAll(async () => {
    await prisma?.$disconnect();
  });

  /** Empties every content table, leaving learner data alone. */
  async function clearContent() {
    await prisma.question.deleteMany();
    await prisma.quiz.deleteMany();
    await prisma.lessonProgress.deleteMany();
    await prisma.lessonRating.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.chapter.deleteMany();
    await prisma.course.deleteMany();
  }

  it("preserves lesson ids, progress, ratings and quiz attempts when re-run", async () => {
    await clearContent();

    const first = await seedDatabase(prisma);
    expect(first.lessons).toBeGreaterThan(0);
    expect(first.questions).toBeGreaterThan(0);

    const lesson = await prisma.lesson.findFirstOrThrow({
      select: { id: true, slug: true },
    });
    const quiz = await prisma.quiz.findFirstOrThrow({
      where: { lessonId: lesson.id },
      select: { id: true },
    });

    // A learner who completed a lesson, took its quiz and rated it.
    const user = await prisma.user.create({
      data: { email: `seed-test-${Date.now()}@example.com`, passwordHash: "not-a-real-hash" },
      select: { id: true },
    });

    await prisma.lessonProgress.create({
      data: {
        userId: user.id,
        lessonId: lesson.id,
        completed: true,
        score: 100,
        xpEarned: 50,
      },
    });
    await prisma.lessonRating.create({
      data: { userId: user.id, lessonId: lesson.id, stars: 5 },
    });
    await prisma.quizAttempt.create({
      data: { userId: user.id, quizId: quiz.id, score: 100, total: 3 },
    });

    // ---- The re-run that used to wipe all of the above --------------------
    await seedDatabase(prisma);

    const afterLesson = await prisma.lesson.findUniqueOrThrow({
      where: { slug: lesson.slug },
      select: { id: true },
    });
    const afterQuiz = await prisma.quiz.findFirstOrThrow({
      where: { lessonId: lesson.id },
      select: { id: true },
    });

    // Ids are stable…
    expect(afterLesson.id).toBe(lesson.id);
    expect(afterQuiz.id).toBe(quiz.id);

    // …so everything hanging off them survives.
    expect(await prisma.lessonProgress.count({ where: { userId: user.id } })).toBe(1);
    expect(await prisma.lessonRating.count({ where: { userId: user.id } })).toBe(1);
    expect(await prisma.quizAttempt.count({ where: { userId: user.id } })).toBe(1);

    await prisma.user.delete({ where: { id: user.id } });
  });

  it("does not duplicate content when re-run", async () => {
    await clearContent();
    await seedDatabase(prisma);

    const before = {
      chapters: await prisma.chapter.count(),
      lessons: await prisma.lesson.count(),
      quizzes: await prisma.quiz.count(),
      questions: await prisma.question.count(),
      answers: await prisma.answer.count(),
      glossary: await prisma.glossaryTerm.count(),
      achievements: await prisma.achievement.count(),
    };

    await seedDatabase(prisma);

    expect({
      chapters: await prisma.chapter.count(),
      lessons: await prisma.lesson.count(),
      quizzes: await prisma.quiz.count(),
      questions: await prisma.question.count(),
      answers: await prisma.answer.count(),
      glossary: await prisma.glossaryTerm.count(),
      achievements: await prisma.achievement.count(),
    }).toEqual(before);
  });

  it("leaves the authored order behind, with no parked positions", async () => {
    await clearContent();
    await seedDatabase(prisma);
    await seedDatabase(prisma);

    expect(await prisma.chapter.count({ where: { chapterOrder: { gte: PARK_OFFSET } } })).toBe(0);
    expect(await prisma.lesson.count({ where: { lessonOrder: { gte: PARK_OFFSET } } })).toBe(0);

    const chapters = await prisma.chapter.findMany({
      orderBy: { chapterOrder: "asc" },
      select: { chapterOrder: true },
    });
    expect(chapters.map((chapter) => chapter.chapterOrder)).toEqual(
      chapters.map((_, index) => index + 1),
    );
  });

  it("removes content that is no longer authored, and reports it", async () => {
    await clearContent();
    await seedDatabase(prisma);

    // Stand in for a chapter that was deleted from the authored source.
    await prisma.chapter.create({
      data: {
        slug: "chapter-removed-in-test",
        title: "Removed",
        chapterOrder: 9999,
        courseId: (await prisma.course.findFirstOrThrow({ select: { id: true } })).id,
      },
    });
    await prisma.glossaryTerm.create({
      data: { slug: "term-removed-in-test", term: "Removed", definition: "…" },
    });

    const summary = await seedDatabase(prisma);

    expect(summary.removedChapters).toContain("chapter-removed-in-test");
    expect(summary.removedGlossaryTerms).toContain("term-removed-in-test");
    expect(await prisma.chapter.count({ where: { slug: "chapter-removed-in-test" } })).toBe(0);
  });
});
