import { describe, expect, it } from "vitest";

import { chapters, flatLessons, totalChapters, totalLessons } from "./curriculum";
import type { InteractiveKey } from "./types";

/** Kept in sync with `InteractiveKey` in ./types. */
const ALLOWED_INTERACTIVE_KEYS: InteractiveKey[] = [
  "MoneyFlow",
  "SavingVsInvesting",
  "InvestmentTypes",
  "CompanyModel",
  "OwnershipSimulator",
  "MarketplaceSimulator",
  "ExchangeDiagram",
  "MarketStructureDiagram",
  "AccountStructureDiagram",
  "IpoSimulator",
  "SupplyDemandSimulator",
  "OrderBookSimulator",
  "TermExplorer",
  "MarketCapCalculator",
  "FinancialStatementsDiagram",
  "IncomeStatementSimulator",
  "BalanceSheetBuilder",
  "CashFlowExplorer",
  "ProfitVsCashFlowSimulator",
  "EpsCalculator",
  "PeCalculator",
  "PbCalculator",
  "RoeCalculator",
  "RoceCalculator",
  "DebtEquityCalculator",
  "MarginWaterfall",
  "CagrCalculator",
  "DividendCalculator",
  "CorporateActionSimulator",
  "EnterpriseValueCalculator",
  "EvEbitdaCalculator",
  "WorkingCapitalSimulator",
  "EconomicFactorsExplorer",
  "BusinessModelExplorer",
  "AnalysisProcess",
  "RedFlagsExplorer",
  "CaseStudySimulator",
];

describe("curriculum structure", () => {
  it("contains the full course", () => {
    expect(totalChapters).toBe(35);
    expect(totalLessons).toBeGreaterThanOrEqual(35);
  });

  it("numbers chapters sequentially starting at 1", () => {
    chapters.forEach((chapter, index) => {
      expect(chapter.chapterOrder).toBe(index + 1);
    });
  });

  it("uses unique slugs for chapters and lessons", () => {
    const chapterSlugs = chapters.map((chapter) => chapter.slug);
    expect(new Set(chapterSlugs).size).toBe(chapterSlugs.length);

    const lessonSlugs = flatLessons.map((entry) => entry.lesson.slug);
    expect(new Set(lessonSlugs).size).toBe(lessonSlugs.length);
  });

  it("gives every chapter a title, description and at least one lesson", () => {
    for (const chapter of chapters) {
      expect(chapter.title.length).toBeGreaterThan(0);
      expect(chapter.description.length).toBeGreaterThan(0);
      expect(chapter.lessons.length).toBeGreaterThan(0);
    }
  });
});

describe("lesson content", () => {
  it("uses only known interactive keys", () => {
    for (const { lesson } of flatLessons) {
      expect(ALLOWED_INTERACTIVE_KEYS).toContain(lesson.interactive);
    }
  });

  it("embeds at least one interactive block matching the lesson's key", () => {
    for (const { lesson } of flatLessons) {
      const interactiveBlocks = lesson.blocks.filter((block) => block.type === "interactive");
      expect(interactiveBlocks.length).toBeGreaterThan(0);
      expect(
        interactiveBlocks.some(
          (block) => block.type === "interactive" && block.key === lesson.interactive,
        ),
      ).toBe(true);
    }
  });

  it("gives every lesson takeaways, a summary and a realistic duration", () => {
    for (const { lesson } of flatLessons) {
      expect(lesson.keyTakeaways.length).toBeGreaterThanOrEqual(3);
      expect(lesson.summary.length).toBeGreaterThan(10);
      expect(lesson.estimatedMinutes).toBeGreaterThan(0);
    }
  });

  it("gives every lesson a quiz whose answers are valid and explained", () => {
    for (const { lesson } of flatLessons) {
      expect(lesson.quiz.length).toBeGreaterThan(0);

      for (const question of lesson.quiz) {
        expect(question.options.length).toBeGreaterThanOrEqual(2);
        expect(question.correctIndex).toBeGreaterThanOrEqual(0);
        expect(question.correctIndex).toBeLessThan(question.options.length);
        // Explanations must teach, not just mark right/wrong.
        expect(question.explanation.length).toBeGreaterThan(20);
      }
    }
  });
});
