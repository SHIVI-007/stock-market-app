/**
 * Grants or revokes administrator access from the command line.
 *
 * There are three ways to become an administrator, and this is the one that
 * works without signing in:
 *
 *   1. The email is listed in `ADMIN_EMAILS` — applied automatically at sign-up,
 *      and upgraded at sign-in if the list changed later.
 *   2. Promoted from the Users table on the /admin dashboard.
 *   3. This script.
 *
 * Usage:
 *   npm run admin:promote -- someone@example.com
 *   npm run admin:demote  -- someone@example.com
 */
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const VALID_ACTIONS = ["promote", "demote"] as const;
type Action = (typeof VALID_ACTIONS)[number];

/** The `ADMIN_EMAILS` allowlist, normalised the same way the app normalises it. */
function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

function usage(): never {
  console.error("Usage: tsx scripts/set-role.ts <promote|demote> <email>");
  console.error("   or: npm run admin:promote -- someone@example.com");
  console.error("   or: npm run admin:demote  -- someone@example.com");
  process.exit(1);
}

async function main() {
  const [rawAction, rawEmail] = process.argv.slice(2);

  if (!rawAction || !rawEmail) usage();
  if (!(VALID_ACTIONS as readonly string[]).includes(rawAction)) usage();

  const action = rawAction as Action;
  const email = rawEmail.trim().toLowerCase();
  const role = action === "promote" ? "ADMIN" : "LEARNER";

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error(
      "DATABASE_URL is not set. Copy .env.example to .env and point it at a PostgreSQL database.",
    );
    process.exit(1);
  }

  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      console.error(`No account found for ${email}.`);
      console.error("The account must sign up through the app before it can be promoted.");
      process.exit(1);
    }

    if (user.role === role) {
      console.log(`${user.email} is already ${role}. Nothing to do.`);
      return;
    }

    // Refuse to remove the last administrator: that would lock everyone out of
    // the dashboard, leaving only a manual database edit to recover.
    if (action === "demote") {
      const remainingAdmins = await prisma.user.count({
        where: { role: "ADMIN", NOT: { id: user.id } },
      });

      if (remainingAdmins === 0) {
        console.error(
          `Refusing to demote ${user.email}: it is the only administrator account left.`,
        );
        console.error("Promote another account first.");
        process.exit(1);
      }
    }

    await prisma.user.update({ where: { id: user.id }, data: { role } });

    console.log(`${action === "promote" ? "Promoted" : "Demoted"} ${user.email} to ${role}.`);
    console.log("Existing sessions pick this up on their next request — no sign-out needed.");

    // A demoted account that is still allowlisted would be re-promoted the next
    // time it signs in, which is rarely what someone means by "demote".
    if (action === "demote" && adminEmails().includes(email)) {
      console.log(
        `Note: ${email} is still listed in ADMIN_EMAILS, so it will be promoted again at its next sign-in. Remove it from .env to make this stick.`,
      );
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
