export interface PasswordResetEmail {
  to: string;
  resetUrl: string;
  expiresInMinutes: number;
}

export interface MailResult {
  /** True only when a real transport accepted the message. */
  delivered: boolean;
  reason?: string;
}

/** Product name used in the subject line and the email body. */
export const MAIL_APP_NAME = "MarketLearn";

/**
 * Resend's REST endpoint. Called with `fetch` rather than the SDK so the app
 * gains no dependency for one request.
 */
const RESEND_ENDPOINT = "https://api.resend.com/emails";

/**
 * Resend's shared onboarding address, used until `AUTH_MAIL_FROM` is set. It
 * only delivers to the account owner's own address, so a real deployment should
 * always configure a sender on a verified domain.
 */
const DEFAULT_MAIL_FROM = `${MAIL_APP_NAME} <onboarding@resend.dev>`;

/** Bounds how long a stuck request can hold the server action open. */
const REQUEST_TIMEOUT_MS = 10_000;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** The `From` header: `AUTH_MAIL_FROM`, or Resend's shared test address. */
export function mailFromAddress(): string {
  const configured = process.env.AUTH_MAIL_FROM?.trim();
  return configured || DEFAULT_MAIL_FROM;
}

/**
 * Builds the reset message.
 *
 * Kept separate from delivery so the copy can be tested without touching the
 * network. Both an HTML and a plain-text part are produced: HTML-only mail is
 * more likely to be filed as spam, and some clients show the text part only.
 */
export function buildPasswordResetEmail(email: PasswordResetEmail): {
  subject: string;
  html: string;
  text: string;
} {
  const url = escapeHtml(email.resetUrl);

  const subject = `Reset your ${MAIL_APP_NAME} password`;

  const text = [
    `Reset your ${MAIL_APP_NAME} password`,
    "",
    `Someone asked to reset the password for your ${MAIL_APP_NAME} account.`,
    `Open this link to choose a new password. It is valid for ${email.expiresInMinutes} minutes and can only be used once:`,
    "",
    email.resetUrl,
    "",
    "If you did not request this, you can ignore this email. Your password will not change.",
    "",
    `— ${MAIL_APP_NAME}`,
    "Educational use only. This is not investment advice.",
  ].join("\n");

  const html = `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#f6f7f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;">
    <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:12px;padding:32px;">
      <p style="margin:0 0 8px;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280;">${MAIL_APP_NAME}</p>
      <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;">Reset your password</h1>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.6;">
        Someone asked to reset the password for your ${MAIL_APP_NAME} account.
        Use the button below to choose a new one.
      </p>
      <p style="margin:0 0 24px;">
        <a href="${url}" style="display:inline-block;background:#111827;color:#ffffff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;">Choose a new password</a>
      </p>
      <p style="margin:0 0 16px;font-size:13px;line-height:1.6;color:#6b7280;">
        This link is valid for ${email.expiresInMinutes} minutes and can only be used once.
      </p>
      <p style="margin:0 0 24px;font-size:13px;line-height:1.6;color:#6b7280;">
        If the button does not work, paste this address into your browser:<br />
        <span style="word-break:break-all;color:#374151;">${url}</span>
      </p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 16px;" />
      <p style="margin:0;font-size:12px;line-height:1.6;color:#9ca3af;">
        If you did not request this, ignore this email — your password will not change.
        ${MAIL_APP_NAME} is an educational project and nothing here is investment advice.
      </p>
    </div>
  </body>
</html>`;

  return { subject, html, text };
}

/**
 * Reads Resend's error message without trusting the body to be JSON.
 *
 * Resend returns `{ statusCode, name, message }` on failure, but a proxy or an
 * outage can return anything at all.
 */
async function readResendError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { message?: unknown; error?: unknown };
    if (typeof body.message === "string") return body.message;
    if (typeof body.error === "string") return body.error;
  } catch {
    // Fall through to the status text.
  }
  return response.statusText || "no details";
}

async function sendWithResend(email: PasswordResetEmail, apiKey: string): Promise<MailResult> {
  const { subject, html, text } = buildPasswordResetEmail(email);

  let response: Response;
  try {
    response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: mailFromAddress(),
        to: [email.to],
        subject,
        html,
        text,
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch (error) {
    // Never log the key, but do log why it failed.
    const detail = error instanceof Error ? error.message : "unknown error";
    console.error(`[auth] Could not reach Resend: ${detail}`);
    return { delivered: false, reason: `resend-unreachable:${detail}` };
  }

  if (!response.ok) {
    const detail = await readResendError(response);
    console.error(`[auth] Resend rejected the reset email (${response.status}): ${detail}`);
    return { delivered: false, reason: `resend-${response.status}:${detail}` };
  }

  let id = "unknown";
  try {
    const body = (await response.json()) as { id?: unknown };
    if (typeof body.id === "string") id = body.id;
  } catch {
    // The message was accepted; a missing id only affects the log line.
  }

  console.info(`[auth] Reset email sent to ${email.to} via Resend (id ${id}).`);
  return { delivered: true };
}

/**
 * Delivers a password reset email.
 *
 * Transports, selected by `AUTH_MAIL_TRANSPORT`:
 *
 *  - `resend` — sends through the Resend API. Needs `RESEND_API_KEY`, and should
 *    have `AUTH_MAIL_FROM` set to a sender on a verified domain.
 *  - `console` (the default) — writes the message to the server log and reports
 *    `delivered: false`, which lets the UI offer the link during local
 *    development.
 *
 * A `delivered: false` result is never fatal: the caller still reports success so
 * the page cannot be used to discover which addresses have accounts.
 */
export async function sendPasswordResetEmail(email: PasswordResetEmail): Promise<MailResult> {
  const transport = (process.env.AUTH_MAIL_TRANSPORT ?? "console").toLowerCase();

  if (transport === "resend") {
    const apiKey = process.env.RESEND_API_KEY?.trim();

    if (!apiKey) {
      console.warn(
        "[auth] AUTH_MAIL_TRANSPORT=resend but RESEND_API_KEY is not set; no email was sent.",
      );
      return { delivered: false, reason: "resend-api-key-missing" };
    }

    return sendWithResend(email, apiKey);
  }

  if (transport === "console") {
    console.info(
      [
        "",
        "──────────────────────────────────────────────────────────────",
        `[auth] Password reset requested for ${email.to}`,
        `Link (valid for ${email.expiresInMinutes} minutes):`,
        email.resetUrl,
        "──────────────────────────────────────────────────────────────",
        "",
      ].join("\n"),
    );

    return { delivered: false, reason: "no-mail-transport-configured" };
  }

  console.warn(
    `[auth] AUTH_MAIL_TRANSPORT="${transport}" is not implemented; the reset email was not sent.`,
  );

  return { delivered: false, reason: `unsupported-transport:${transport}` };
}

/**
 * Whether the reset link may be shown in the UI.
 *
 * Showing a reset link would let anyone reset any account, so this is a
 * **development convenience only**. There is a hard guard against production:
 * setting the environment variable cannot turn it on there.
 */
export function shouldShowResetLink(): boolean {
  if (process.env.NODE_ENV === "production") return false;
  return process.env.AUTH_DEV_SHOW_RESET_LINK !== "false";
}
