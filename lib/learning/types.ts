/**
 * Content model for the course.
 *
 * Lessons are authored as plain, serialisable data. Anything that needs to be
 * interactive is referenced by a *key* and resolved to a React component at
 * render time (see `components/interactive/registry.tsx`). Keeping content as
 * data means the same source can drive the UI, the Prisma seed, and tests.
 */

export type Difficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

/** Identifiers for the interactive components a lesson can embed. */
export type InteractiveKey =
  | "MoneyFlow"
  | "SavingVsInvesting"
  | "InvestmentTypes"
  | "CompanyModel"
  | "OwnershipSimulator"
  | "MarketplaceSimulator"
  | "ExchangeDiagram"
  | "MarketStructureDiagram"
  | "AccountStructureDiagram"
  | "IpoSimulator"
  | "SupplyDemandSimulator"
  | "OrderBookSimulator"
  | "TermExplorer"
  | "MarketCapCalculator"
  | "FinancialStatementsDiagram"
  | "IncomeStatementSimulator"
  | "BalanceSheetBuilder"
  | "CashFlowExplorer"
  | "ProfitVsCashFlowSimulator"
  | "EpsCalculator"
  | "PeCalculator"
  | "PbCalculator"
  | "RoeCalculator"
  | "RoceCalculator"
  | "DebtEquityCalculator"
  | "MarginWaterfall"
  | "CagrCalculator"
  | "DividendCalculator"
  | "CorporateActionSimulator"
  | "EnterpriseValueCalculator"
  | "EvEbitdaCalculator"
  | "WorkingCapitalSimulator"
  | "EconomicFactorsExplorer"
  | "BusinessModelExplorer"
  | "AnalysisProcess"
  | "RedFlagsExplorer"
  | "CaseStudySimulator";

/**
 * Identifiers for the animated concept explainers a lesson can embed.
 *
 * These are the short, animated walk-throughs that introduce a concept before
 * the learner manipulates it — deliberately separate from `InteractiveKey`,
 * which is for tools the learner drives with their own numbers.
 *
 * Resolved to components by `components/animations/registry.tsx`.
 */
export type ConceptAnimationKey =
  | "MoneyJourney"
  | "CompoundingOverTime"
  | "OwnershipOrLending"
  | "CompanyJourney"
  | "BusinessLoop"
  | "WhenRevenueLands"
  | "HowCostsBehave"
  | "ProfitLayers"
  | "WhyCapital"
  | "OwnershipSlices"
  | "DilutionSlices"
  | "WhyMarketsExist"
  | "OrderJourney"
  | "IpoJourney"
  | "PrimaryVsSecondary"
  | "WhatMovesPrices";

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  /** Index into `options` of the correct answer. */
  correctIndex: number;
  /** Shown after answering — always explains *why*, never just right/wrong. */
  explanation: string;
}

export type LessonBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "numbered"; items: string[] }
  | {
      type: "callout";
      variant?: "info" | "warning" | "success" | "destructive";
      title?: string;
      text: string;
    }
  | { type: "formula"; expression: string; note?: string }
  | {
      type: "table";
      caption?: string;
      headers: string[];
      rows: string[][];
    }
  | {
      type: "steps";
      items: { title: string; text: string }[];
    }
  | {
      type: "interactive";
      key: InteractiveKey;
      title?: string;
      caption?: string;
    }
  | {
      type: "animation";
      key: ConceptAnimationKey;
      caption?: string;
    }
  | { type: "kv"; items: { label: string; value: string }[] };

export interface Lesson {
  slug: string;
  title: string;
  /** One-line summary used on cards and in the sidebar. */
  summary: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  /** The headline interactive component for this lesson. */
  interactive: InteractiveKey;
  blocks: LessonBlock[];
  keyTakeaways: string[];
  quiz: QuizQuestion[];
}

export interface Chapter {
  slug: string;
  title: string;
  subtitle: string;
  chapterOrder: number;
  difficulty: Difficulty;
  description: string;
  lessons: Lesson[];
}

export interface Course {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  chapters: Chapter[];
}

export type GlossaryCategory =
  | "Basics"
  | "Market"
  | "Statements"
  | "Ratios"
  | "Valuation"
  | "Returns";

export interface GlossaryEntry {
  slug: string;
  term: string;
  definition: string;
  formula?: string;
  example?: string;
  related?: string[];
  category: GlossaryCategory;
}

export interface AchievementDefinition {
  slug: string;
  name: string;
  description: string;
  /** Emoji used as the badge icon. */
  icon: string;
  /** Human readable description of how it is earned. */
  requirement: string;
}

/** Convenience type used by the progress layer. */
export interface LessonProgressRecord {
  lessonSlug: string;
  chapterSlug: string;
  completed: boolean;
  /** Best quiz score achieved, 0–100. */
  bestScore: number;
  xpEarned: number;
  updatedAt: string;
}
