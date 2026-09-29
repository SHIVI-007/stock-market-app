import { NextResponse } from "next/server";

import { getPrismaClient } from "@/lib/db/prisma";
import { chapters as authoredChapters, totalLessons } from "@/lib/learning/curriculum";
import { glossary } from "@/lib/learning/glossary";

/**
 * Course catalogue endpoint.
 *
 * When `DATABASE_URL` is configured the catalogue is served from PostgreSQL
 * (populated by `npm run db:seed`). Otherwise — or if the database cannot be
 * reached — it falls back to the authored TypeScript content, so the endpoint
 * always returns a usable, identically-shaped payload.
 */
export const dynamic = "force-dynamic";

interface CourseSummary {
  chapterCount: number;
  lessonCount: number;
  glossaryCount: number;
  achievementCount?: number;
}

const AUTHORED_SUMMARY: CourseSummary = {
  chapterCount: authoredChapters.length,
  lessonCount: totalLessons,
  glossaryCount: glossary.length,
};

const AUTHORED_CHAPTERS = authoredChapters.map((chapter) => ({
  slug: chapter.slug,
  title: chapter.title,
  chapterOrder: chapter.chapterOrder,
  difficulty: chapter.difficulty,
  lessons: chapter.lessons.map((lesson) => ({
    slug: lesson.slug,
    title: lesson.title,
    difficulty: lesson.difficulty,
    estimatedMinutes: lesson.estimatedMinutes,
    interactive: lesson.interactive,
  })),
}));

function authoredPayload(note: string, error?: string) {
  return {
    source: "authored-content" as const,
    note,
    ...(error ? { error } : {}),
    course: AUTHORED_SUMMARY,
    chapters: AUTHORED_CHAPTERS,
  };
}

export async function GET() {
  const prisma = getPrismaClient();

  if (!prisma) {
    return NextResponse.json(
      authoredPayload(
        "DATABASE_URL is not set, so the catalogue is served from the authored content.",
      ),
    );
  }

  try {
    const [chapters, lessonCount, glossaryCount, achievementCount] = await Promise.all([
      prisma.chapter.findMany({
        orderBy: { chapterOrder: "asc" },
        include: {
          lessons: {
            orderBy: { lessonOrder: "asc" },
            select: {
              slug: true,
              title: true,
              difficulty: true,
              estimatedMinutes: true,
              interactive: true,
            },
          },
        },
      }),
      prisma.lesson.count(),
      prisma.glossaryTerm.count(),
      prisma.achievement.count(),
    ]);

    return NextResponse.json({
      source: "database",
      course: {
        chapterCount: chapters.length,
        lessonCount,
        glossaryCount,
        achievementCount,
      } satisfies CourseSummary,
      chapters: chapters.map((chapter) => ({
        slug: chapter.slug,
        title: chapter.title,
        chapterOrder: chapter.chapterOrder,
        lessons: chapter.lessons,
      })),
    });
  } catch (error) {
    // A database can be configured but unreachable. Degrade rather than fail,
    // returning the same shape as the success case.
    return NextResponse.json(
      authoredPayload(
        "The database is configured but could not be read; serving authored content instead.",
        error instanceof Error ? error.message : "Unknown database error",
      ),
    );
  }
}
