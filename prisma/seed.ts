/**
 * Seeds PostgreSQL from the authored learning content.
 *
 * The course, glossary and achievements live in `lib/learning/*` as plain data,
 * so this script simply mirrors that content into the database. Run it with
 * `npm run db:seed` (which uses `tsx`).
 */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { achievements } from "../lib/learning/achievements";
import { course } from "../lib/learning/curriculum";
import { glossary } from "../lib/learning/glossary";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Copy .env.example to .env and point it at a PostgreSQL database.",
  );
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

async function main() {
  console.log("Seeding database…");

  // Clear existing rows (child tables first to respect foreign keys).
  await prisma.quizAttempt.deleteMany();
  await prisma.answer.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.course.deleteMany();
  await prisma.glossaryTerm.deleteMany();
  await prisma.achievement.deleteMany();

  const createdCourse = await prisma.course.create({
    data: {
      slug: course.slug,
      title: course.title,
      description: course.description,
    },
  });

  let lessonCount = 0;
  let questionCount = 0;

  for (const chapter of course.chapters) {
    const createdChapter = await prisma.chapter.create({
      data: {
        slug: chapter.slug,
        title: chapter.title,
        description: chapter.description,
        chapterOrder: chapter.chapterOrder,
        courseId: createdCourse.id,
      },
    });

    for (const [index, lesson] of chapter.lessons.entries()) {
      const createdLesson = await prisma.lesson.create({
        data: {
          slug: lesson.slug,
          title: lesson.title,
          description: lesson.summary,
          lessonOrder: index + 1,
          difficulty: lesson.difficulty,
          estimatedMinutes: lesson.estimatedMinutes,
          interactive: lesson.interactive,
          chapterId: createdChapter.id,
        },
      });
      lessonCount += 1;

      if (lesson.quiz.length > 0) {
        const quiz = await prisma.quiz.create({
          data: {
            title: `${lesson.title} — quiz`,
            lessonId: createdLesson.id,
          },
        });

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
          questionCount += 1;
        }
      }
    }
  }

  await prisma.glossaryTerm.createMany({
    data: glossary.map((entry) => ({
      slug: entry.slug,
      term: entry.term,
      definition: entry.definition,
      formula: entry.formula ?? null,
      example: entry.example ?? null,
      related: entry.related ?? [],
    })),
  });

  await prisma.achievement.createMany({
    data: achievements.map((entry) => ({
      slug: entry.slug,
      name: entry.name,
      description: `${entry.description} (${entry.requirement})`,
      icon: entry.icon,
    })),
  });

  console.log(
    `Seeded ${course.chapters.length} chapters, ${lessonCount} lessons, ${questionCount} quiz questions, ${glossary.length} glossary terms and ${achievements.length} achievements.`,
  );
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
