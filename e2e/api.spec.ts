import { expect, test } from "@playwright/test";

/**
 * Runtime checks for the API routes.
 *
 * These are deliberately tolerant about the database: the app is designed to
 * work with or without PostgreSQL, so the assertions verify the *shape* of the
 * response rather than requiring a particular storage mode.
 */

test("health endpoint reports the app and database status", async ({ request }) => {
  const response = await request.get("/api/health");

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(["ok", "degraded"]).toContain(body.status);
  expect(["connected", "not-configured", "unavailable", "unreachable"]).toContain(
    body.database,
  );
});

test("catalogue endpoint serves the whole course", async ({ request }) => {
  const response = await request.get("/api/catalogue");

  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(["database", "authored-content"]).toContain(body.source);

  // The full curriculum must be present whichever source served it.
  expect(body.course.chapterCount).toBeGreaterThanOrEqual(35);
  expect(body.course.lessonCount).toBeGreaterThanOrEqual(35);

  const firstChapter = body.chapters[0];
  expect(firstChapter.slug).toBe("chapter-1-money");
  expect(firstChapter.lessons.length).toBeGreaterThan(0);
});
