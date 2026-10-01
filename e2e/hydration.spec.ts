import { expect, test } from "@playwright/test";

/**
 * Guards against React hydration mismatches.
 *
 * A mismatch is easy to miss: the page usually still works, so it only shows up
 * as a console error during development. The risk is concentrated in the client
 * components whose rendered output depends on state — the concept explainers,
 * the simulators, the quiz and the progress widgets — so those pages are the
 * ones worth loading for real.
 *
 * Only hydration errors are asserted. Other console output can legitimately vary
 * with the environment (a missing database, an offline fetch), and failing on
 * those would make this suite flaky rather than useful.
 */
const PAGES = [
  "/",
  "/learn",
  "/learn/chapter-1-money/lesson-1-what-is-money",
  "/learn/chapter-1-money/lesson-2-saving-vs-investing",
  "/learn/chapter-1-money/lesson-3-types-of-investments",
  "/learn/chapter-2-company/lesson-1-what-is-a-company",
  "/learn/chapter-2-company/lesson-2-how-companies-make-money",
  "/learn/chapter-2-company/lesson-3-revenue",
  "/learn/chapter-2-company/lesson-4-expenses",
  "/learn/chapter-2-company/lesson-5-profit",
  "/learn/chapter-2-company/lesson-6-why-companies-need-capital",
  "/learn/chapter-3-share/lesson-1-what-is-ownership",
  "/learn/chapter-3-share/lesson-2-dilution",
  "/learn/chapter-4-market/lesson-1-what-is-a-stock-market",
  "/learn/chapter-4-market/lesson-2-buyers-sellers-and-brokers",
  "/learn/chapter-8-ipo/lesson-1-what-is-an-ipo",
  "/learn/chapter-8-ipo/lesson-2-primary-vs-secondary-market",
  "/learn/chapter-9-price-movement/lesson-2-what-else-moves-prices",
  "/learn/chapter-15-balance-sheet/lesson-1-balance-sheet-equation",
  "/practice/calculators",
  "/practice/simulations",
  "/glossary",
  "/progress",
];

for (const path of PAGES) {
  test(`${path} hydrates without a mismatch`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message));

    await page.goto(path, { waitUntil: "networkidle" });
    // Let autoplay and the client-side data fetches settle, since a mismatch can
    // also surface on a re-render shortly after hydration.
    await page.waitForTimeout(2000);

    const hydrationErrors = consoleErrors.filter((text) => /hydrat/i.test(text));

    expect(
      hydrationErrors,
      `Hydration mismatch on ${path}:\n\n${hydrationErrors.join("\n\n")}`,
    ).toEqual([]);
  });
}
