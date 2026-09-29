// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  MAIL_APP_NAME,
  buildPasswordResetEmail,
  mailFromAddress,
  sendPasswordResetEmail,
  shouldShowResetLink,
} from "./mailer";

const RESET_URL = "https://example.com/reset-password?token=abc-123_XYZ";
const EMAIL = { to: "learner@example.com", resetUrl: RESET_URL, expiresInMinutes: 30 };

function jsonResponse(body: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "content-type": "application/json" },
    ...init,
  });
}

beforeEach(() => {
  // Keep the suite output clean; the assertions cover the returned values.
  vi.spyOn(console, "info").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("buildPasswordResetEmail", () => {
  it("names the app and carries the link in both parts", () => {
    const { subject, html, text } = buildPasswordResetEmail(EMAIL);

    expect(subject).toContain(MAIL_APP_NAME);
    expect(html).toContain(RESET_URL);
    expect(text).toContain(RESET_URL);
  });

  it("states how long the link lasts and that it is single-use", () => {
    const { html, text } = buildPasswordResetEmail(EMAIL);

    expect(text).toContain("30 minutes");
    expect(text).toContain("only be used once");
    expect(html).toContain("30 minutes");
  });

  it("tells the recipient what to do if they did not ask for it", () => {
    const { html, text } = buildPasswordResetEmail(EMAIL);

    expect(text).toContain("Your password will not change");
    expect(html).toContain("your password will not change");
  });

  it("escapes HTML so a crafted URL cannot inject markup", () => {
    const { html } = buildPasswordResetEmail({
      ...EMAIL,
      resetUrl: 'https://example.com/?a="><script>alert(1)</script>',
    });

    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("carries no investment advice, in line with the rest of the app", () => {
    const { text } = buildPasswordResetEmail(EMAIL);

    expect(text).toContain("not investment advice");
  });
});

describe("mailFromAddress", () => {
  it("falls back to Resend's shared address", () => {
    vi.stubEnv("AUTH_MAIL_FROM", "");
    expect(mailFromAddress()).toBe(`${MAIL_APP_NAME} <onboarding@resend.dev>`);
  });

  it("uses the configured sender", () => {
    vi.stubEnv("AUTH_MAIL_FROM", "MarketLearn <no-reply@mkpl.work.gd>");
    expect(mailFromAddress()).toBe("MarketLearn <no-reply@mkpl.work.gd>");
  });
});

describe("sendPasswordResetEmail", () => {
  it("logs the link and reports no delivery on the console transport", async () => {
    vi.stubEnv("AUTH_MAIL_TRANSPORT", "console");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const result = await sendPasswordResetEmail(EMAIL);

    expect(result).toEqual({ delivered: false, reason: "no-mail-transport-configured" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("reports a missing API key instead of sending", async () => {
    vi.stubEnv("AUTH_MAIL_TRANSPORT", "resend");
    vi.stubEnv("RESEND_API_KEY", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const result = await sendPasswordResetEmail(EMAIL);

    expect(result).toEqual({ delivered: false, reason: "resend-api-key-missing" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts the message to Resend and reports delivery", async () => {
    vi.stubEnv("AUTH_MAIL_TRANSPORT", "resend");
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubEnv("AUTH_MAIL_FROM", "MarketLearn <no-reply@mkpl.work.gd>");

    const fetchMock = vi.fn(async () => jsonResponse({ id: "msg_123" }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await sendPasswordResetEmail(EMAIL);

    expect(result).toEqual({ delivered: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.method).toBe("POST");
    expect((init.headers as Record<string, string>).authorization).toBe("Bearer re_test_key");

    const body = JSON.parse(String(init.body)) as Record<string, unknown>;
    expect(body.from).toBe("MarketLearn <no-reply@mkpl.work.gd>");
    expect(body.to).toEqual([EMAIL.to]);
    expect(String(body.subject)).toContain(MAIL_APP_NAME);
    expect(String(body.html)).toContain(RESET_URL);
    expect(String(body.text)).toContain(RESET_URL);
  });

  it("surfaces Resend's error message when the send is rejected", async () => {
    vi.stubEnv("AUTH_MAIL_TRANSPORT", "resend");
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse(
          { statusCode: 422, message: "The mkpl.work.gd domain is not verified." },
          { status: 422, statusText: "Unprocessable Entity" },
        ),
      ),
    );

    const result = await sendPasswordResetEmail(EMAIL);

    expect(result.delivered).toBe(false);
    expect(result.reason).toContain("resend-422");
    expect(result.reason).toContain("not verified");
  });

  it("degrades gracefully when Resend cannot be reached", async () => {
    vi.stubEnv("AUTH_MAIL_TRANSPORT", "resend");
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("connect ECONNREFUSED");
      }),
    );

    const result = await sendPasswordResetEmail(EMAIL);

    expect(result.delivered).toBe(false);
    expect(result.reason).toContain("resend-unreachable");
  });

  it("handles an error body that is not JSON", async () => {
    vi.stubEnv("AUTH_MAIL_TRANSPORT", "resend");
    vi.stubEnv("RESEND_API_KEY", "re_test_key");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("<html>502 Bad Gateway</html>", { status: 502 })),
    );

    const result = await sendPasswordResetEmail(EMAIL);

    expect(result.delivered).toBe(false);
    expect(result.reason).toContain("resend-502");
  });

  it("refuses an unknown transport rather than pretending to send", async () => {
    vi.stubEnv("AUTH_MAIL_TRANSPORT", "carrier-pigeon");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const result = await sendPasswordResetEmail(EMAIL);

    expect(result).toEqual({
      delivered: false,
      reason: "unsupported-transport:carrier-pigeon",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("shouldShowResetLink", () => {
  it("is off in production, whatever the environment variable says", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("AUTH_DEV_SHOW_RESET_LINK", "true");

    expect(shouldShowResetLink()).toBe(false);
  });

  it("can be turned off during development", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("AUTH_DEV_SHOW_RESET_LINK", "false");

    expect(shouldShowResetLink()).toBe(false);
  });

  it("defaults to on outside production", () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("AUTH_DEV_SHOW_RESET_LINK", "");

    expect(shouldShowResetLink()).toBe(true);
  });
});
