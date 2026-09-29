/**
 * Sends one real password reset email through the configured transport, so a
 * mail setup can be confirmed end to end without going through the UI.
 *
 *   npm run mail:verify -- someone@example.com
 *
 * The link in the message is deliberately not a valid token: this checks
 * delivery, not the reset flow.
 */
import { mailFromAddress, sendPasswordResetEmail } from "../lib/auth/mailer";

async function main() {
  const to = process.argv[2];
  if (!to) {
    console.error("Usage: npm run mail:verify -- someone@example.com");
    process.exit(1);
  }

  const result = await sendPasswordResetEmail({
    to,
    // Deliberately not a valid token: this checks delivery, not the reset flow.
    resetUrl: "https://example.com/reset-password?token=CONFIGURATION-CHECK-NOT-VALID",
    expiresInMinutes: 30,
  });

  console.log("from:", mailFromAddress());
  console.log("result:", result);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
