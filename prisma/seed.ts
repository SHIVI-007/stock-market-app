/**
 * CLI entry point for seeding. Run it with `npm run db:seed`.
 *
 * The logic lives in `lib/db/seed.ts` so that tests can drive it against a real
 * database; this file only wires up a client and reports the result.
 *
 * Safe to re-run: content is matched on `slug` and updated in place, so learner
 * progress, scores and ratings are preserved. See `lib/db/seed.ts`.
 */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { seedDatabase } from "../lib/db/seed";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Copy .env.example to .env and point it at a PostgreSQL database.",
  );
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

async function main() {
  console.log("Seeding database…");

  const summary = await seedDatabase(prisma);

  console.log(
    `Seeded ${summary.chapters} chapters, ${summary.lessons} lessons, ${summary.questions} quiz questions, ${summary.glossaryTerms} glossary terms and ${summary.achievements} achievements.`,
  );

  const removed = [
    ...summary.removedChapters.map((slug) => `chapter ${slug}`),
    ...summary.removedLessons.map((slug) => `lesson ${slug}`),
    ...summary.removedGlossaryTerms.map((slug) => `glossary term ${slug}`),
  ];

  if (removed.length > 0) {
    console.warn(
      `\nRemoved ${removed.length} item(s) no longer present in the authored content.`,
    );
    console.warn("Any learner progress or ratings attached to them went too:");
    for (const item of removed) console.warn(`  - ${item}`);
  }
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
