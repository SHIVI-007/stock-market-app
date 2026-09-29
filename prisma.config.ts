import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "prisma/config";

/**
 * Minimal `.env` loader.
 *
 * Prisma 7 no longer reads `.env` automatically, and we deliberately avoid
 * adding `dotenv` as a dependency. This keeps the CLI working out of the box
 * while remaining completely optional — commands that don't touch a database
 * (like `prisma generate`) still run when no `.env` exists.
 */
function loadEnvFile(): void {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env"), "utf8");

    for (const line of raw.split("\n")) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
      if (!match) continue;

      const key = match[1];
      let value = match[2].trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (process.env[key] === undefined) {
        process.env[key] = value;
      }
    }
  } catch {
    // `.env` is optional.
  }
}

loadEnvFile();

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrations: {
    path: "prisma/migrations",
    // Seeds the catalogue + glossary into PostgreSQL. `npx tsx` lets the seed
    // import the authored TypeScript curriculum modules directly.
    seed: "npx tsx prisma/seed.ts",
  },
});
