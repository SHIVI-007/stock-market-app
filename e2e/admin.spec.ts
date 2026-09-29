import { expect, test, type Page } from "@playwright/test";

/**
 * Administrator access, the dashboard, and the rating system.
 *
 * The administrator is bootstrapped through the `ADMIN_EMAILS` allowlist, which
 * is what that mechanism exists for — so the first admin never needs a manual
 * database edit.
 */
const ADMIN_EMAIL = "admin@marketlearn.test";
const ADMIN_PASSWORD = "admin-dashboard-123";

/** Signs in, creating the account first if it does not exist yet. */
async function signInOrSignUp(page: Page, email: string, password: string) {
  await page.goto("/signin");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();

  const signedIn = await page
    .waitForURL(/\/profile$/, { timeout: 5000 })
    .then(() => true)
    .catch(() => false);

  if (signedIn) return;

  await page.goto("/signin");
  await page.getByRole("tab", { name: "Sign up" }).click();
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page).toHaveURL(/\/profile$/);
}

test("signed-out visitors are redirected away from the dashboard", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/signin$/);
  await expect(page.getByRole("heading", { name: /Track your progress/ })).toBeVisible();
});

test("a learner on the dashboard is told how to get access", async ({ page }) => {
  const email = `not-admin-${Date.now()}@example.com`;
  await signInOrSignUp(page, email, "learner-password-123");

  await page.goto("/admin");
  await expect(page.getByText("Not an administrator account")).toBeVisible();
  await expect(page.getByText(email).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Admin dashboard" })).toHaveCount(0);
});

test("an admin can review users, triage feedback and see ratings", async ({ page }) => {
  const marker = `e2e-${Date.now()}`;

  // ---- Someone submits anonymous feedback -------------------------------
  await page.goto("/feedback");
  await page.getByLabel("What is this about?").selectOption("BUG");
  await page.getByLabel("Your feedback").fill(`${marker}: the quiz button felt slow to respond.`);
  await page.getByRole("button", { name: "Send feedback" }).click();
  await expect(page.getByText("Thank you")).toBeVisible();

  // ---- Sign in as the administrator -------------------------------------
  await signInOrSignUp(page, ADMIN_EMAIL, ADMIN_PASSWORD);

  // The header now offers the admin area.
  await expect(page.getByRole("link", { name: "Admin" }).first()).toBeVisible();

  await page.goto("/admin");
  await expect(page.getByRole("heading", { name: "Admin dashboard" })).toBeVisible();
  await expect(page.getByText("Registered users")).toBeVisible();
  await expect(page.getByText("Lesson analytics")).toBeVisible();

  // ---- The feedback is in the inbox and can be triaged ------------------
  const entry = page.locator("li", { hasText: marker });
  await expect(entry).toBeVisible();
  await expect(entry.getByLabel("Feedback status")).toHaveValue("OPEN");

  await entry.getByLabel("Feedback status").selectOption("RESOLVED");
  await entry.getByRole("button", { name: "Update" }).click();

  // The status select reflects the saved value. (Asserting on the select avoids
  // ambiguity with the "Resolved" <option> text.)
  await expect(
    page.locator("li", { hasText: marker }).getByLabel("Feedback status"),
  ).toHaveValue("RESOLVED");

  // An internal note can be attached. (Asserting on the textarea value avoids
  // ambiguity: the saved note is rendered again as text below the form.)
  const noteBox = entry.getByPlaceholder("Internal note (only visible here)");
  await noteBox.fill("Looked into it.");
  await entry.getByRole("button", { name: "Save note" }).click();

  await expect(
    page.locator("li", { hasText: marker }).getByPlaceholder("Internal note (only visible here)"),
  ).toHaveValue("Looked into it.");

  await expect(
    page.locator("li", { hasText: marker }).getByText(/Note: Looked into it\./),
  ).toBeVisible();

  // ---- The admin appears in the user table ------------------------------
  await expect(page.getByRole("table").getByText(ADMIN_EMAIL)).toBeVisible();
});

test("a learner can rate a lesson and the average is shown", async ({ page }) => {
  const email = `rater-${Date.now()}@example.com`;
  await signInOrSignUp(page, email, "rater-password-123");

  await page.goto("/learn/chapter-1-money/lesson-2-saving-vs-investing");
  await expect(page.getByText("How was this lesson?")).toBeVisible();

  // The form only renders once the client session has loaded, so waiting for
  // the picker also guarantees React has hydrated and clicks will register.
  const picker = page.getByRole("radiogroup", { name: "Rating out of five stars" });
  await expect(picker).toBeVisible();

  const fiveStars = picker.getByRole("radio", { name: "5 stars" });
  await fiveStars.click();
  await expect(fiveStars).toHaveAttribute("aria-checked", "true");

  await page.getByRole("button", { name: "Submit rating" }).click();

  await expect(page.getByText("Thanks — your rating is saved.")).toBeVisible();

  // The button becomes "Update rating", proving the aggregate and the learner's
  // own rating were re-fetched after saving.
  await expect(page.getByRole("button", { name: "Update rating" })).toBeVisible();

  // An aggregate is now displayed for the lesson.
  await expect(page.getByText(/\(\d+ ratings?\)/)).toBeVisible();
});

test("feedback can be sent without an account", async ({ page }) => {
  const marker = `anon-${Date.now()}`;

  await page.goto("/feedback");
  await page.getByLabel("Your feedback").fill(`${marker} — no account needed.`);
  await page.getByLabel("Email (optional)").fill("anonymous@example.com");
  await page.getByRole("button", { name: "Send feedback" }).click();

  await expect(page.getByText("Thank you")).toBeVisible();
});
