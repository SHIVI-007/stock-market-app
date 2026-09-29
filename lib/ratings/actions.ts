"use server";

import { revalidatePath } from "next/cache";

import { getPrismaClient } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/user";
import type { AuthState } from "@/lib/auth/types";

const MAX_COMMENT_LENGTH = 1000;

/**
 * Saves (or updates) the learner's 1–5 star rating of a lesson.
 * One rating per learner per lesson — re-rating replaces the previous one.
 */
export async function saveLessonRatingAction(
  _previous: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const user = await getCurrentUser();
  if (!user) {
    return { error: "Sign in to rate a lesson — ratings are tied to your account." };
  }

  const lessonSlug = String(formData.get("lessonSlug") ?? "");
  const stars = Number(formData.get("stars") ?? "");
  const comment = String(formData.get("comment") ?? "").trim();

  if (!lessonSlug) return { error: "Missing lesson reference." };
  if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
    return { error: "Choose a rating between 1 and 5 stars." };
  }
  if (comment.length > MAX_COMMENT_LENGTH) {
    return { error: "That comment is too long." };
  }

  const prisma = getPrismaClient();
  if (!prisma) {
    return { error: "Ratings need a database. Set DATABASE_URL and run `npm run db:push`." };
  }

  let lessonId: string | undefined;
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { slug: lessonSlug },
      select: { id: true },
    });
    lessonId = lesson?.id;
  } catch {
    return { error: "Could not reach the database. Please try again." };
  }

  if (!lessonId) {
    return { error: "That lesson is not in the catalogue yet." };
  }

  try {
    await prisma.lessonRating.upsert({
      where: { userId_lessonId: { userId: user.id, lessonId } },
      create: { userId: user.id, lessonId, stars, comment: comment || null },
      update: { stars, comment: comment || null },
    });
  } catch {
    return { error: "Could not save your rating. Please try again." };
  }

  revalidatePath("/admin");
  return { saved: true };
}

/**
 * Rating summary for a lesson, used by the rating widget on lesson pages.
 *
 * Lesson pages are statically rendered, so the widget calls this from the client
 * rather than reading the database at build time.
 */
export async function fetchLessonRatingSummary(lessonSlug: string): Promise<{
  average: number | null;
  count: number;
  mine: { stars: number; comment: string | null } | null;
}> {
  const empty = { average: null, count: 0, mine: null };

  const prisma = getPrismaClient();
  if (!prisma || !lessonSlug) return empty;

  try {
    const lesson = await prisma.lesson.findUnique({
      where: { slug: lessonSlug },
      select: { id: true },
    });
    if (!lesson) return empty;

    const user = await getCurrentUser();

    const [aggregate, mine] = await Promise.all([
      prisma.lessonRating.aggregate({
        where: { lessonId: lesson.id },
        _avg: { stars: true },
        _count: { _all: true },
      }),
      user
        ? prisma.lessonRating.findUnique({
            where: { userId_lessonId: { userId: user.id, lessonId: lesson.id } },
            select: { stars: true, comment: true },
          })
        : Promise.resolve(null),
    ]);

    return {
      average: aggregate._avg.stars ?? null,
      count: aggregate._count._all,
      mine: mine ? { stars: mine.stars, comment: mine.comment } : null,
    };
  } catch {
    return empty;
  }
}
