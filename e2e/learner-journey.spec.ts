import { expect, test } from "@playwright/test";

/**
 * The end-to-end journey described in the brief:
 *
 *   open the app → start the course → open "What is a Share?" →
 *   use the ownership simulator → complete the lesson → take the quiz →
 *   open Market Cap → use the calculator → check progress
 *
 * Progress lives in localStorage, so the test clears it to start from scratch.
 */
test("a beginner can work through the course and track progress", async ({ page }) => {
  // ------------------------------------------------- 1. Open the application
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  await expect(
    page.getByRole("heading", { name: /Learn the Stock Market/i }),
  ).toBeVisible();

  // ------------------------------------------------------ 2. Start the course
  await page.getByRole("link", { name: "Start Learning" }).first().click();
  await expect(page).toHaveURL(/\/learn$/);

  // ------------------------------------- 3. Open the "What Is a Share?" chapter
  await page.getByRole("link", { name: /What Is a Share\?/ }).first().click();
  await expect(page).toHaveURL(/\/learn\/chapter-3-share$/);
  await expect(page.getByRole("heading", { name: "What Is a Share?" })).toBeVisible();

  // Open its first lesson.
  await page.getByRole("link", { name: /What is ownership\?/ }).first().click();
  await expect(page).toHaveURL(/lesson-1-what-is-ownership$/);

  // ------------------------------------- 4. Use the ownership simulator
  await expect(page.getByText("Company Ownership Simulator")).toBeVisible();

  // Defaults: 1 crore shares outstanding, 0.1 crore owned → 10%.
  await expect(page.getByText("10%", { exact: true })).toBeVisible();

  await page.getByLabel("Shares you own value").fill("0.5");
  await expect(page.getByText("50%", { exact: true })).toBeVisible();

  // --------------------------------------------------- 5. Complete the lesson
  await page.getByRole("button", { name: "Complete lesson" }).click();
  await expect(page.getByText("Lesson complete")).toBeVisible();
  await expect(page.getByText("You learned:")).toBeVisible();

  // ---------------------------------------------------------- 6. Take the quiz
  await page.getByText("Check your understanding").scrollIntoViewIfNeeded();

  // Question 1 — "₹100 of value"
  await page.getByRole("button", { name: /₹100 of value/ }).click();
  await expect(page.getByText("Correct")).toBeVisible();
  await page.getByRole("button", { name: "Next question" }).click();

  // Question 2 — "5%" (option index 1, so the letter badge renders as "B")
  await page.getByRole("button", { name: /B 5%/ }).click();
  await expect(page.getByText("Correct")).toBeVisible();
  await page.getByRole("button", { name: "Next question" }).click();

  // Question 3 — "Stays the same"
  await page.getByRole("button", { name: /Stays the same/ }).click();
  await expect(page.getByText("Correct")).toBeVisible();
  await page.getByRole("button", { name: "See results" }).click();

  await expect(page.getByText("100%", { exact: true }).first()).toBeVisible();
  await expect(page.getByText("3 of 3 correct")).toBeVisible();

  // --------------------------------------- 7. Open Market Cap and use it
  await page.goto("/practice/calculators");
  const marketCap = page.locator("#market-cap");
  await marketCap.scrollIntoViewIfNeeded();

  // Default: ₹500 × 10 crore shares = ₹5,000 Cr
  await expect(marketCap.getByText("₹5,000 Cr")).toBeVisible();

  // The first number input is the share price.
  await marketCap.locator('input[type="number"]').first().fill("1000");
  await expect(marketCap.getByText("₹10,000 Cr")).toBeVisible();

  // ---------------------------------------------------- 8. Check progress
  await page.goto("/progress");
  await expect(page.getByRole("heading", { name: "Your progress" })).toBeVisible();

  // One lesson completed, with a perfect quiz average.
  await expect(page.getByText(/1 \/ \d+/).first()).toBeVisible();
  await expect(page.getByText("100%", { exact: true }).first()).toBeVisible();

  // Completing a lesson unlocks the first achievement.
  await expect(page.getByText("First Steps")).toBeVisible();

  // Progress survives a full reload (it is persisted in localStorage).
  await page.reload();
  await expect(page.getByText(/1 \/ \d+/).first()).toBeVisible();
});
