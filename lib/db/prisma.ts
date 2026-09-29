import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Prisma 7 connects through a driver adapter. The adapter is created lazily and
 * only when `DATABASE_URL` is present, so the application still renders (and the
 * test suite still runs) in environments without a database.
 */
const globalForPrisma = globalThis as unknown as {
  __stockMarketPrisma?: PrismaClient;
};

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getPrismaClient(): PrismaClient | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;

  if (globalForPrisma.__stockMarketPrisma) {
    return globalForPrisma.__stockMarketPrisma;
  }

  const adapter = new PrismaPg({ connectionString });
  const client = new PrismaClient({ adapter });

  // Cache the client in development so hot reloads don't exhaust connections.
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.__stockMarketPrisma = client;
  }

  return client;
}
