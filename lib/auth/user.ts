import { cache } from "react";

import { getPrismaClient } from "@/lib/db/prisma";
import { getSessionUserId } from "@/lib/auth/session";
import type { SessionUser } from "@/lib/auth/types";
import { isAdminRole } from "@/lib/auth/roles";
import { isThemePreference } from "@/lib/theme/theme";

export type { AuthState, Role, SessionUser } from "@/lib/auth/types";

/**
 * Resolves the signed-in user for the current request.
 *
 * Wrapped in React's `cache` so multiple calls within one request hit the
 * database only once.
 */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const userId = await getSessionUserId();
  if (!userId) return null;

  const prisma = getPrismaClient();
  if (!prisma) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        themePreference: true,
        createdAt: true,
      },
    });

    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: isAdminRole(user.role) ? "ADMIN" : "LEARNER",
      themePreference: isThemePreference(user.themePreference)
        ? user.themePreference
        : "system",
      createdAt: user.createdAt.toISOString(),
    };
  } catch {
    // A missing table or unreachable database must not crash the request.
    return null;
  }
});
