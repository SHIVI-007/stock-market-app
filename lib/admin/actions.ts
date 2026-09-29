"use server";

import { revalidatePath } from "next/cache";

import { getPrismaClient } from "@/lib/db/prisma";
import { isAdmin } from "@/lib/auth/roles";
import { getCurrentUser } from "@/lib/auth/user";

/**
 * Admin-only actions, used by the dashboard.
 *
 * These are plain form actions (no client-side state), so the dashboard renders
 * entirely on the server. Every action re-checks the caller's role — hiding a
 * button in the UI is never the security boundary.
 */

const ROLE_VALUES = ["LEARNER", "ADMIN"] as const;
const STATUS_VALUES = ["OPEN", "REVIEWING", "RESOLVED"] as const;

export async function setUserRoleAction(formData: FormData): Promise<void> {
  const admin = await getCurrentUser();
  if (!isAdmin(admin)) return;

  const userId = String(formData.get("userId") ?? "");
  const role = String(formData.get("role") ?? "");

  if (!userId) return;
  if (!(ROLE_VALUES as readonly string[]).includes(role)) return;

  // An admin removing their own rights would lock themselves out of the
  // dashboard, so that is refused.
  if (userId === admin.id && role === "LEARNER") return;

  const prisma = getPrismaClient();
  if (!prisma) return;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: role as (typeof ROLE_VALUES)[number] },
    });
  } catch {
    return;
  }

  revalidatePath("/admin");
}

export async function setFeedbackStatusAction(formData: FormData): Promise<void> {
  const admin = await getCurrentUser();
  if (!isAdmin(admin)) return;

  const feedbackId = String(formData.get("feedbackId") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!feedbackId) return;
  if (!(STATUS_VALUES as readonly string[]).includes(status)) return;

  const prisma = getPrismaClient();
  if (!prisma) return;

  try {
    await prisma.feedback.update({
      where: { id: feedbackId },
      data: { status: status as (typeof STATUS_VALUES)[number] },
    });
  } catch {
    return;
  }

  revalidatePath("/admin");
}

export async function updateFeedbackNoteAction(formData: FormData): Promise<void> {
  const admin = await getCurrentUser();
  if (!isAdmin(admin)) return;

  const feedbackId = String(formData.get("feedbackId") ?? "");
  const note = String(formData.get("adminNote") ?? "").trim();

  if (!feedbackId || note.length > 2000) return;

  const prisma = getPrismaClient();
  if (!prisma) return;

  try {
    await prisma.feedback.update({
      where: { id: feedbackId },
      data: { adminNote: note || null },
    });
  } catch {
    return;
  }

  revalidatePath("/admin");
}
