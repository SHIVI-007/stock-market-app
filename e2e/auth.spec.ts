import { expect, test } from "@playwright/test";

/**
 * Email accounts.
 *
 * The important assertion is the last one: after signing out we wipe the
 * browser's localStorage, so the *only* place progress and the theme can come
 * from is the account. That is what proves the sync really works.
 */
test.use({ colorScheme: "light" });

test("an email account carries progress and theme between sessions", async ({ page }) => {
  const email = `learner-${Date.now()}@example.com`;
  const password = "marketlearn123";

  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  // -------------------------------------------------- 1. Create an account
  await page.goto("/signin");
  await expect(
    page.getByRole("heading", { name: /Track your progress with your email/i }),
  ).toBeVisible();

  await page.getByRole("tab", { name: "Sign up" }).click();
  await page.getByLabel("Name (optional)").fill("Ananya");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Create account" }).click();

  await expect(page).toHaveURL(/\/profile$/);
  await expect(page.getByRole("heading", { name: /Welcome back, Ananya/ })).toBeVisible();
  await expect(page.getByText(email).first()).toBeVisible();

  // --------------------------------- 2. Choose a theme saved to the account
  // The browser is set to prefer light, so only the account can make it dark.
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await page.getByRole("button", { name: "Dark", exact: true }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);

  // The pre-paint theme script keeps the choice across an ordinary reload.
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);

  // ------------------------------- 3. Complete a lesson and its quiz
  await page.goto("/learn/chapter-1-money/lesson-1-what-is-money");
  await page.getByRole("button", { name: "Complete lesson" }).click();
  await expect(page.getByText("Lesson complete")).toBeVisible();

  await page.getByRole("button", { name: /A bank fixed deposit/ }).click();
  await expect(page.getByText("Correct")).toBeVisible();
  await page.getByRole("button", { name: "Next question" }).click();

  await page.getByRole("button", { name: /Saving keeps money safe/ }).click();
  await expect(page.getByText("Correct")).toBeVisible();
  await page.getByRole("button", { name: "Next question" }).click();

  await page.getByRole("button", { name: /₹3,00,000/ }).click();
  await expect(page.getByText("Correct")).toBeVisible();
  await page.getByRole("button", { name: "See results" }).click();
  await expect(page.getByText("3 of 3 correct")).toBeVisible();

  // --------- 4. Wait until the server has stored the lesson *and* the score
  // (the quiz score is debounced, so this also proves the flush-on-unload path).
  await expect
    .poll(
      async () => {
        const response = await page.request.get("/api/progress");
        if (!response.ok()) return -1;
        const body = (await response.json()) as { lessons?: { bestScore: number }[] };
        const scores = (body.lessons ?? []).map((lesson) => lesson.bestScore);
        return scores.length === 0 ? -1 : Math.max(...scores);
      },
      { timeout: 25_000, intervals: [500, 1000, 1500, 2000] },
    )
    .toBe(100);

  // --------------------------- 5. Sign out and wipe the browser completely
  await page.goto("/profile");
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/$/);

  await page.evaluate(() => localStorage.clear());
  await page.reload();

  // The wiped browser is back to the system (light) theme…
  await expect(page.locator("html")).not.toHaveClass(/dark/);

  // ---------------------------------------- 6. Sign back in with the email
  await page.goto("/signin");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page).toHaveURL(/\/profile$/);
  await expect(page.getByRole("heading", { name: /Welcome back, Ananya/ })).toBeVisible();

  // …and both the theme and the progress come back from the account alone.
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(page.getByText(/1 \/ \d+/).first()).toBeVisible();
});

/**
 * Progress made *before* signing in is the easy case to get wrong: the merge that
 * pulls the account's saved progress in also contains the browser's own records,
 * so treating the merged result as "already uploaded" would silently drop them.
 */
test("progress made before signing in is uploaded to the new account", async ({ page }) => {
  const email = `pre-signin-${Date.now()}@example.com`;

  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  // ---------------------- 1. Complete a lesson with no account at all
  await page.goto("/learn/chapter-1-money/lesson-3-types-of-investments");
  await page.getByRole("button", { name: "Complete lesson" }).click();
  await expect(page.getByText("Lesson complete")).toBeVisible();

  // The server has nothing, because nobody is signed in yet.
  expect((await page.request.get("/api/progress")).status()).toBe(401);

  // ------------------------------------- 2. Create the account afterwards
  await page.goto("/signin");
  await page.getByRole("tab", { name: "Sign up" }).click();
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill("marketlearn123");
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page).toHaveURL(/\/profile$/);

  // ------------- 3. The earlier lesson arrives in the account on its own
  await expect
    .poll(
      async () => {
        const response = await page.request.get("/api/progress");
        if (!response.ok()) return [];
        const body = (await response.json()) as { lessons?: { lessonSlug: string }[] };
        return (body.lessons ?? []).map((lesson) => lesson.lessonSlug);
      },
      { timeout: 25_000, intervals: [500, 1000, 1500, 2000] },
    )
    .toContain("lesson-3-types-of-investments");
});

test("signing in with the wrong password is rejected", async ({ page }) => {
  await page.goto("/signin");

  await page.getByLabel("Email").fill(`nobody-${Date.now()}@example.com`);
  await page.getByLabel("Password").fill("definitely-not-the-password");
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(
    page.getByText(/That email and password combination was not recognised/i),
  ).toBeVisible();
  await expect(page).toHaveURL(/\/signin$/);
});

test("a learner can reset a forgotten password", async ({ page }) => {
  const email = `reset-${Date.now()}@example.com`;
  const originalPassword = "original-password-123";
  const newPassword = "brand-new-password-456";

  // Sign up, then sign straight back out.
  await page.goto("/signin");
  await page.getByRole("tab", { name: "Sign up" }).click();
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(originalPassword);
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page).toHaveURL(/\/profile$/);

  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/$/);

  // ------------------------------------------- 1. Request a reset link
  await page.goto("/signin");
  await page.getByRole("link", { name: "Forgot your password?" }).click();
  await expect(page).toHaveURL(/\/forgot-password$/);

  await page.getByLabel("Email").fill(email);
  await page.getByRole("button", { name: "Send reset link" }).click();

  await expect(page.getByText("Check your email")).toBeVisible();

  // No mail transport is configured, so development mode surfaces the link.
  const resetLink = page.getByRole("link", { name: "Open the reset link" });
  await expect(resetLink).toBeVisible();
  await resetLink.click();

  await expect(page).toHaveURL(/\/reset-password\?token=/);

  // ------------------------------------------- 2. Choose a new password
  await page.getByLabel("New password", { exact: true }).fill(newPassword);
  await page.getByLabel("Confirm new password", { exact: true }).fill(newPassword);
  await page.getByRole("button", { name: "Set new password" }).click();

  // Reset signs the learner straight in.
  await expect(page).toHaveURL(/\/profile$/);
  await expect(page.getByText(email).first()).toBeVisible();

  // ------------------------------------------- 3. The new password works
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/$/);
  await page.goto("/signin");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(newPassword);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/profile$/);

  // ------------------------------------------- 4. The old one does not
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/$/);
  await page.goto("/signin");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(originalPassword);
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(
    page.getByText(/That email and password combination was not recognised/i),
  ).toBeVisible();
});

test("a reset link can only be used once", async ({ page }) => {
  const email = `single-use-${Date.now()}@example.com`;

  await page.goto("/signin");
  await page.getByRole("tab", { name: "Sign up" }).click();
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill("original-password-123");
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page).toHaveURL(/\/profile$/);
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/$/);

  await page.goto("/forgot-password");
  await page.getByLabel("Email").fill(email);
  await page.getByRole("button", { name: "Send reset link" }).click();

  const resetUrl = await page
    .getByRole("link", { name: "Open the reset link" })
    .getAttribute("href");
  expect(resetUrl).toBeTruthy();

  // Use the link once.
  await page.goto(resetUrl as string);
  await page.getByLabel("New password", { exact: true }).fill("first-new-password-1");
  await page.getByLabel("Confirm new password", { exact: true }).fill("first-new-password-1");
  await page.getByRole("button", { name: "Set new password" }).click();
  await expect(page).toHaveURL(/\/profile$/);
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/$/);

  // Reusing it is refused.
  await page.goto(resetUrl as string);
  await page.getByLabel("New password", { exact: true }).fill("second-new-password-2");
  await page.getByLabel("Confirm new password", { exact: true }).fill("second-new-password-2");
  await page.getByRole("button", { name: "Set new password" }).click();

  await expect(page.getByText(/invalid or has expired/i)).toBeVisible();
});
