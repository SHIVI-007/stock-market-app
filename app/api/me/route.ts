import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth/user";

/**
 * Returns the signed-in learner, or `null`.
 *
 * The UI reads this on the client so that pages can stay statically rendered.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();
  return NextResponse.json({ user });
}
