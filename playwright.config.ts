import { defineConfig, devices } from "@playwright/test";

/**
 * End-to-end configuration.
 *
 * Playwright starts its own server on a port of its own rather than reusing the
 * one you develop against. That is deliberate: the suite must always run with the
 * `console` mail transport, because the reset specs read the link out of the UI
 * (which only happens when nothing was delivered).
 *
 * Pointing the suite at a real provider would send live email to `@example.com`
 * addresses, and those hard bounces would damage the sending domain's reputation
 * with the provider. A dedicated port is what guarantees the `env` below actually
 * applies — with `reuseExistingServer` an already-running dev server would keep
 * its own `.env`, including a real transport.
 */
const PORT = 3100;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"]],
  timeout: 60_000,
  expect: { timeout: 15_000 },

  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    actionTimeout: 20_000,
    navigationTimeout: 90_000,
    trace: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: `npm run dev -- --port ${PORT}`,
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: false,
    timeout: 180_000,
    env: {
      // Never send real mail from a test run.
      AUTH_MAIL_TRANSPORT: "console",
      // Keep the reset link visible in the UI regardless of NODE_ENV.
      AUTH_DEV_SHOW_RESET_LINK: "true",
      // The admin specs need an administrator, and the real allowlist must not
      // carry a test account — its password is in this repository. The suite
      // therefore allowlists its own fixture here instead of in `.env`.
      ADMIN_EMAILS: "admin@marketlearn.test",
      // Every request in a test run shares one client identity, so the limits
      // would trip across tests. The limiter has its own unit tests; the
      // end-to-end suite is not the place to exercise it.
      AUTH_RATE_LIMIT_ENABLED: "false",
      // Its own build directory, so this server can run alongside the one you
      // develop on — Next permits only one dev server per project directory.
      NEXT_DIST_DIR: ".next-e2e",
    },
  },
});
