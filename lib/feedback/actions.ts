"use server";

import { revalidatePath } from "next/cache";

import { getPrismaClient } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/user";
import type { AuthState } from "@/lib/auth/types";

/**
 * Feedback about the app itself.
 *
 * Signed-in learners are linked to their account; anyone else can leave an
 * email address (or nothing at all).
 */
const CATEGORIES = ["BUG", "CONTENT", "FEATURE", "OTHER"] as const;
type Category = (typeof CATEGORIES)[number];

const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 4000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function parseCategory(value: string): Category {
  return (CATEGORIES as readonly string[]).includes(value) ? (value as Category) : "OTHER";
}

function parseStars(value: string): number | null {
  if (!value) return null;
  const stars = Number(value);
  if (!Number.isInteger(stars) || stars < 1 || stars > 5) return null;
  return stars;
}

export async function submitFeedbackAction(
  _previous: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const message = String(formData.get("message") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const category = parseCategory(String(formData.get("category") ?? "OTHER"));
  const stars = parseStars(String(formData.get("stars") ?? ""));

  const fieldErrors: Record<string, string> = {};
  if (message.length < MIN_MESSAGE_LENGTH) {
    fieldErrors.message = `Please write at least ${MIN_MESSAGE_LENGTH} characters.`;
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    fieldErrors.message = "That message is too long.";
  }
  if (subject.length > 120) {
    fieldErrors.subject = "That subject is too long.";
  }
  if (email && !EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "Enter a valid email address.";
  }
  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  const prisma = getPrismaClient();
  if (!prisma) {
    return {
      error: "Feedback needs a database. Set DATABASE_URL and run `npm run db:push`.",
    };
  }

  const user = await getCurrentUser();

  try {
    await prisma.feedback.create({
      data: {
        message,
        subject: subject || null,
        category,
        stars,
        // Only keep an address for anonymous submissions; signed-in ones are
        // already linked to the account.
        email: user ? null : email || null,
        userId: user?.id ?? null,
      },
    });
  } catch {
    return { error: "Could not send your feedback. Please try again." };
  }

  revalidatePath("/admin");
  return { sent: true };
}
