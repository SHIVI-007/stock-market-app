"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getPrismaClient } from "@/lib/db/prisma";
import { MIN_PASSWORD_LENGTH, hashPassword, verifyPassword } from "@/lib/auth/password";
import { sendPasswordResetEmail, shouldShowResetLink } from "@/lib/auth/mailer";
import {
  RESET_TOKEN_TTL_MINUTES,
  createResetToken,
  hashResetToken,
  isResetTokenUsable,
  resetTokenExpiry,
} from "@/lib/auth/reset-token";
import { clearSessionCookie, setSessionCookie } from "@/lib/auth/session";
import { isAdminEmail } from "@/lib/auth/roles";
import { getCurrentUser } from "@/lib/auth/user";
import { RATE_LIMITS, checkRateLimit, type RateLimitResult } from "@/lib/rate-limit";
import type { AuthState } from "@/lib/auth/types";
import { isThemePreference } from "@/lib/theme/theme";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NO_DATABASE_MESSAGE =
  "Accounts need a database. Set DATABASE_URL and run `npm run db:push` to enable them.";

/**
 * These actions return `{ ok: true }` rather than calling `redirect()`.
 *
 * A server-action redirect is a *soft* navigation, which would leave the
 * client-side session provider holding its old (signed-out) state. The client
 * performs a full navigation on success instead, so the new session cookie is
 * picked up immediately.
 */

/**
 * These actions `redirect()` on success. The client session provider re-reads
 * the session whenever the path changes, which is why the auth panel lives at
 * `/signin` and the account page at `/profile` — signing in therefore always
 * changes the path and the new session is picked up immediately.
 */

function normaliseEmail(value: FormDataEntryValue | null): string {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

const ALLOWED: RateLimitResult = { allowed: true, retryAfterMs: 0 };

/**
 * Best-effort client address, used as a secondary rate-limit key.
 *
 * Returns null when nothing reliable is available — a connection made straight to
 * the app carries no forwarding header — so callers fall back to the per-email
 * limit rather than lumping every visitor under one shared key.
 */
async function clientAddress(): Promise<string | null> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headerList.get("x-real-ip") || null;
}

/**
 * Applies a per-email limit plus an optional per-address one.
 *
 * The per-email limit is the one that matters: it stops password guessing and
 * reset-email spam even when no client address can be determined.
 */
function checkAuthLimits(
  scope: string,
  email: string,
  perAddressRule: { limit: number; windowMs: number },
  perEmailRule: { limit: number; windowMs: number },
  address: string | null,
): boolean {
  const byEmail = checkRateLimit(`${scope}:email:${email}`, perEmailRule);
  const byAddress = address
    ? checkRateLimit(`${scope}:address:${address}`, perAddressRule)
    : ALLOWED;

  // Both are evaluated before returning, so neither counter is skipped.
  return byEmail.allowed && byAddress.allowed;
}

export async function signUpAction(
  _previous: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = normaliseEmail(formData.get("email"));
  const name = String(formData.get("name") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const fieldErrors: Record<string, string> = {};
  if (!EMAIL_PATTERN.test(email)) fieldErrors.email = "Enter a valid email address.";
  if (password.length < MIN_PASSWORD_LENGTH) {
    fieldErrors.password = `Use at least ${MIN_PASSWORD_LENGTH} characters.`;
  }
  if (name.length > 80) fieldErrors.name = "That name is too long.";
  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  const address = await clientAddress();
  if (
    address &&
    !checkRateLimit(`signup:address:${address}`, RATE_LIMITS.signUpPerAddress).allowed
  ) {
    return { error: "Too many accounts created from this connection. Please try again later." };
  }

  const prisma = getPrismaClient();
  if (!prisma) return { error: NO_DATABASE_MESSAGE };

  let userId: string;
  try {
    const existing = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (existing) {
      return { fieldErrors: { email: "An account with this email already exists." } };
    }

    const passwordHash = await hashPassword(password);
    const created = await prisma.user.create({
      data: {
        email,
        name: name || null,
        passwordHash,
        // Bootstraps the first administrator via the ADMIN_EMAILS allowlist.
        role: isAdminEmail(email) ? "ADMIN" : "LEARNER",
      },
      select: { id: true },
    });
    userId = created.id;
  } catch {
    return { error: "Could not create your account. Please try again." };
  }

  await setSessionCookie(userId);
  revalidatePath("/", "layout");
  redirect("/profile");
}

export async function signInAction(
  _previous: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = normaliseEmail(formData.get("email"));
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter your email and password to continue." };
  }

  // Counted before any database work, so guessing is cheap to reject.
  if (
    !checkAuthLimits(
      "signin",
      email,
      RATE_LIMITS.signInPerAddress,
      RATE_LIMITS.signInPerEmail,
      await clientAddress(),
    )
  ) {
    return { error: "Too many sign-in attempts. Please wait a few minutes and try again." };
  }

  const prisma = getPrismaClient();
  if (!prisma) return { error: NO_DATABASE_MESSAGE };

  let user: { id: string; passwordHash: string | null; role: "LEARNER" | "ADMIN" } | null =
    null;
  try {
    user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, passwordHash: true, role: true },
    });
  } catch {
    return { error: "Could not reach the database. Please try again." };
  }

  const passwordMatches = await verifyPassword(password, user?.passwordHash);
  if (!user || !passwordMatches) {
    // Deliberately vague: do not reveal whether the email exists.
    return { error: "That email and password combination was not recognised." };
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastSignedInAt: new Date(),
        // Picking up a newly allowlisted email without a separate promotion step.
        ...(isAdminEmail(email) && user.role !== "ADMIN" ? { role: "ADMIN" } : {}),
      },
    });
  } catch {
    // A failed bookkeeping update should not block a successful sign-in.
  }

  await setSessionCookie(user.id);
  revalidatePath("/", "layout");
  redirect("/profile");
}

export async function signOutAction(): Promise<void> {
  await clearSessionCookie();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function updateProfileAction(
  _previous: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const user = await getCurrentUser();
  if (!user) return { error: "You need to sign in first." };

  const name = String(formData.get("name") ?? "").trim();
  if (name.length > 80) return { fieldErrors: { name: "That name is too long." } };

  const prisma = getPrismaClient();
  if (!prisma) return { error: NO_DATABASE_MESSAGE };

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { name: name || null },
    });
  } catch {
    return { error: "Could not save your changes. Please try again." };
  }

  revalidatePath("/profile");
  return { saved: true };
}

/**
 * Persists the learner's theme choice so it follows them to any device.
 * Called from the client when a signed-in user changes the theme.
 */
export async function updateThemePreferenceAction(preference: string): Promise<void> {
  if (!isThemePreference(preference)) return;

  const user = await getCurrentUser();
  if (!user) return;

  const prisma = getPrismaClient();
  if (!prisma) return;

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { themePreference: preference },
    });
  } catch {
    // The theme is already applied locally; failing to persist it is not fatal.
  }
}

/* -------------------------------------------------------------------------- */
/* Password reset                                                             */
/* -------------------------------------------------------------------------- */

/** Absolute base URL for this deployment, used to build links in emails. */
async function resolveBaseUrl(): Promise<string> {
  const configured = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL;
  if (configured) return configured.replace(/\/+$/, "");

  const headerList = await headers();
  const host =
    headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3000";
  const protocol = headerList.get("x-forwarded-proto") ?? "http";

  return `${protocol}://${host}`;
}

/**
 * Starts a password reset.
 *
 * Always reports success, whether or not the address has an account, so the page
 * cannot be used to discover which emails are registered.
 */
export async function requestPasswordResetAction(
  _previous: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = normaliseEmail(formData.get("email"));
  if (!EMAIL_PATTERN.test(email)) {
    return { fieldErrors: { email: "Enter a valid email address." } };
  }

  // Checked against the submitted address, before any account lookup, so the
  // response is identical whether or not the address has an account.
  if (
    !checkAuthLimits(
      "reset",
      email,
      RATE_LIMITS.passwordResetPerAddress,
      RATE_LIMITS.passwordResetPerEmail,
      await clientAddress(),
    )
  ) {
    return { error: "Too many reset requests. Please wait a few minutes and try again." };
  }

  const prisma = getPrismaClient();
  if (!prisma) return { error: NO_DATABASE_MESSAGE };

  let user: { id: string } | null = null;
  try {
    user = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  } catch {
    return { error: "Could not reach the database. Please try again." };
  }

  if (!user) return { sent: true };

  const { token, tokenHash } = createResetToken();

  try {
    await prisma.$transaction([
      // Requesting a new link invalidates any earlier unused ones.
      prisma.passwordResetToken.updateMany({
        where: { userId: user.id, usedAt: null },
        data: { usedAt: new Date() },
      }),
      prisma.passwordResetToken.create({
        data: { userId: user.id, tokenHash, expiresAt: resetTokenExpiry() },
      }),
    ]);
  } catch {
    return { error: "Could not start the reset. Please try again." };
  }

  const resetUrl = `${await resolveBaseUrl()}/reset-password?token=${encodeURIComponent(token)}`;
  const result = await sendPasswordResetEmail({
    to: email,
    resetUrl,
    expiresInMinutes: RESET_TOKEN_TTL_MINUTES,
  });

  // With no mail transport configured, offer the link locally so the flow is
  // usable end to end. `shouldShowResetLink` refuses unless in development.
  return {
    sent: true,
    resetUrl: !result.delivered && shouldShowResetLink() ? resetUrl : undefined,
  };
}

/** Completes a password reset and signs the learner in. */
export async function resetPasswordAction(
  _previous: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!token) {
    return { error: "This reset link is invalid. Please request a new one." };
  }

  const fieldErrors: Record<string, string> = {};
  if (password.length < MIN_PASSWORD_LENGTH) {
    fieldErrors.password = `Use at least ${MIN_PASSWORD_LENGTH} characters.`;
  }
  if (password !== confirmPassword) {
    fieldErrors.confirmPassword = "The two passwords do not match.";
  }
  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  const prisma = getPrismaClient();
  if (!prisma) return { error: NO_DATABASE_MESSAGE };

  let record: { id: string; userId: string; usedAt: Date | null; expiresAt: Date } | null = null;
  try {
    record = await prisma.passwordResetToken.findUnique({
      where: { tokenHash: hashResetToken(token) },
      select: { id: true, userId: true, usedAt: true, expiresAt: true },
    });
  } catch {
    return { error: "Could not verify the reset link. Please try again." };
  }

  if (!record || !isResetTokenUsable(record)) {
    return { error: "This reset link is invalid or has expired. Please request a new one." };
  }

  const passwordHash = await hashPassword(password);

  try {
    await prisma.$transaction([
      prisma.user.update({ where: { id: record.userId }, data: { passwordHash } }),
      prisma.passwordResetToken.update({
        where: { id: record.id },
        data: { usedAt: new Date() },
      }),
    ]);
  } catch {
    return { error: "Could not reset your password. Please try again." };
  }

  // Sign them straight in: they have just proved control of the email address.
  await setSessionCookie(record.userId);
  revalidatePath("/", "layout");
  redirect("/profile");
}
