import { NextResponse } from "next/server";

import { getPrismaClient } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/user";
import type { LessonProgressRecord } from "@/lib/learning/types";

/**
 * Progress synchronisation for signed-in learners.
 *
 *   GET  /api/progress  → the learner's saved progress
 *   POST /api/progress  → upsert a batch of progress records
 *
 * Progress also lives in the browser, so the app keeps working when the learner
 * is signed out or the database is unavailable.
 */
export const dynamic = "force-dynamic";

function parseRecords(value: unknown): LessonProgressRecord[] {
  if (!Array.isArray(value)) return [];

  const records: LessonProgressRecord[] = [];

  for (const item of value) {
    if (!item || typeof item !== "object") continue;

    const raw = item as Record<string, unknown>;
    if (typeof raw.lessonSlug !== "string" || typeof raw.chapterSlug !== "string") continue;

    const bestScore =
      typeof raw.bestScore === "number" && Number.isFinite(raw.bestScore)
        ? Math.max(0, Math.min(100, raw.bestScore))
        : 0;

    const xpEarned =
      typeof raw.xpEarned === "number" && Number.isFinite(raw.xpEarned)
        ? Math.max(0, Math.trunc(raw.xpEarned))
        : 0;

    records.push({
      lessonSlug: raw.lessonSlug,
      chapterSlug: raw.chapterSlug,
      completed: raw.completed === true,
      bestScore,
      xpEarned,
      updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt : new Date().toISOString(),
    });
  }

  return records;
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const prisma = getPrismaClient();
  if (!prisma) {
    return NextResponse.json({ lessons: [], note: "No database is configured." });
  }

  try {
    const rows = await prisma.lessonProgress.findMany({
      where: { userId: user.id },
      include: {
        lesson: {
          select: { slug: true, chapter: { select: { slug: true } } },
        },
      },
    });

    return NextResponse.json({
      lessons: rows.map((row) => ({
        lessonSlug: row.lesson.slug,
        chapterSlug: row.lesson.chapter.slug,
        completed: row.completed,
        bestScore: row.score ?? 0,
        xpEarned: row.xpEarned,
        updatedAt: row.lastAttempt.toISOString(),
      })),
    });
  } catch {
    return NextResponse.json({ lessons: [], note: "Could not read progress." });
  }
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const records = parseRecords((body as { lessons?: unknown } | null)?.lessons);
  if (records.length === 0) {
    return NextResponse.json({ saved: 0 });
  }

  const prisma = getPrismaClient();
  if (!prisma) {
    return NextResponse.json({ saved: 0, note: "No database is configured." });
  }

  try {
    // Resolve slugs to database ids. Unknown slugs (for example if the database
    // has not been seeded) are skipped rather than failing the whole batch.
    const lessons = await prisma.lesson.findMany({
      where: { slug: { in: records.map((record) => record.lessonSlug) } },
      select: { id: true, slug: true },
    });
    const idBySlug = new Map(lessons.map((lesson) => [lesson.slug, lesson.id]));

    let saved = 0;
    for (const record of records) {
      const lessonId = idBySlug.get(record.lessonSlug);
      if (!lessonId) continue;

      await prisma.lessonProgress.upsert({
        where: { userId_lessonId: { userId: user.id, lessonId } },
        create: {
          userId: user.id,
          lessonId,
          completed: record.completed,
          score: record.bestScore,
          xpEarned: record.xpEarned,
        },
        update: {
          completed: record.completed,
          score: record.bestScore,
          xpEarned: record.xpEarned,
        },
      });
      saved += 1;
    }

    return NextResponse.json({ saved, skipped: records.length - saved });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Could not save progress.",
        detail: error instanceof Error ? error.message : undefined,
      },
      { status: 500 },
    );
  }
}
