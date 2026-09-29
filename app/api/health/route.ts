import { NextResponse } from "next/server";

import { getPrismaClient, isDatabaseConfigured } from "@/lib/db/prisma";

/**
 * Liveness/readiness probe.
 *
 * Reports whether the app is running and whether an optional PostgreSQL
 * connection is available. The app never depends on the database to render.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({
      status: "ok",
      database: "not-configured",
      note: "The app is fully usable without a database.",
    });
  }

  const prisma = getPrismaClient();
  if (!prisma) {
    return NextResponse.json({ status: "ok", database: "unavailable" });
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    const [chapters, lessons] = await Promise.all([
      prisma.chapter.count(),
      prisma.lesson.count(),
    ]);

    return NextResponse.json({
      status: "ok",
      database: "connected",
      seeded: { chapters, lessons },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "degraded",
        database: "unreachable",
        error: error instanceof Error ? error.message : "Unknown database error",
      },
      { status: 200 },
    );
  }
}
