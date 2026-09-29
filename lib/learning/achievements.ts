import { chapters, flatLessons, totalLessons } from "./curriculum";
import type { AchievementDefinition } from "./types";

/**
 * Achievements are *learning milestones*, never investment ratings.
 * Each one is awarded for progress through the course.
 */
export const achievements: AchievementDefinition[] = [
  {
    slug: "first-steps",
    name: "First Steps",
    icon: "🌱",
    description: "You completed your very first lesson.",
    requirement: "Complete 1 lesson",
  },
  {
    slug: "market-beginner",
    name: "Market Beginner",
    icon: "🎓",
    description: "You understand money, income, saving and investing.",
    requirement: "Complete Chapter 1",
  },
  {
    slug: "company-explorer",
    name: "Company Explorer",
    icon: "🏢",
    description: "You understand what a company is and how it earns money.",
    requirement: "Complete Chapter 2",
  },
  {
    slug: "ownership-understood",
    name: "Ownership Understood",
    icon: "🧩",
    description: "You can explain what a share is and what dilution does.",
    requirement: "Complete Chapter 3",
  },
  {
    slug: "market-explorer",
    name: "Market Explorer",
    icon: "📈",
    description: "You understand exchanges, regulation, accounts and how prices move.",
    requirement: "Complete Chapters 4–9",
  },
  {
    slug: "financial-statement-explorer",
    name: "Financial Statement Explorer",
    icon: "📊",
    description: "You can read an income statement, balance sheet and cash flow statement.",
    requirement: "Complete Chapters 13–17",
  },
  {
    slug: "ratio-learner",
    name: "Ratio Learner",
    icon: "🧮",
    description: "You can calculate and interpret the core fundamental ratios.",
    requirement: "Complete Chapters 18–25",
  },
  {
    slug: "valuation-explorer",
    name: "Valuation Explorer",
    icon: "💰",
    description: "You understand dividends, corporate actions and valuation multiples.",
    requirement: "Complete Chapters 26–31",
  },
  {
    slug: "fundamental-analyst",
    name: "Fundamental Analyst",
    icon: "🔍",
    description: "You can follow a structured process and form your own independent view.",
    requirement: "Complete Chapters 32–35",
  },
  {
    slug: "quiz-ace",
    name: "Quiz Ace",
    icon: "✅",
    description: "You are averaging 90% or more across your quizzes.",
    requirement: "Quiz average ≥ 90%",
  },
  {
    slug: "consistent-learner",
    name: "Consistent Learner",
    icon: "🔥",
    description: "You came back to learn on three days in a row.",
    requirement: "3-day learning streak",
  },
  {
    slug: "half-way",
    name: "Halfway There",
    icon: "🚀",
    description: "You have completed half of the course.",
    requirement: "Complete 50% of lessons",
  },
  {
    slug: "course-complete",
    name: "Course Complete",
    icon: "🏆",
    description: "You finished every lesson in the course.",
    requirement: "Complete 100% of lessons",
  },
];

export interface AchievementInput {
  completedLessonSlugs: string[];
  quizAverage: number | null;
  streak: number;
}

function chapterFullyCompleted(chapterSlug: string, completed: Set<string>): boolean {
  const chapter = chapters.find((entry) => entry.slug === chapterSlug);
  if (!chapter || chapter.lessons.length === 0) return false;
  return chapter.lessons.every((lesson) => completed.has(lesson.slug));
}

function rangeCompleted(
  fromOrder: number,
  toOrder: number,
  completed: Set<string>,
): boolean {
  const inRange = chapters.filter(
    (chapter) => chapter.chapterOrder >= fromOrder && chapter.chapterOrder <= toOrder,
  );
  if (inRange.length === 0) return false;
  return inRange.every((chapter) =>
    chapter.lessons.every((lesson) => completed.has(lesson.slug)),
  );
}

/** Returns the slugs of every achievement the learner has currently earned. */
export function evaluateAchievements(input: AchievementInput): string[] {
  const completed = new Set(input.completedLessonSlugs);
  const earned: string[] = [];
  const completionRatio = totalLessons > 0 ? completed.size / totalLessons : 0;

  const check = (slug: string, condition: boolean) => {
    if (condition) earned.push(slug);
  };

  check("first-steps", completed.size >= 1);
  check("market-beginner", chapterFullyCompleted("chapter-1-money", completed));
  check("company-explorer", chapterFullyCompleted("chapter-2-company", completed));
  check("ownership-understood", chapterFullyCompleted("chapter-3-share", completed));
  check("market-explorer", rangeCompleted(4, 9, completed));
  check("financial-statement-explorer", rangeCompleted(13, 17, completed));
  check("ratio-learner", rangeCompleted(18, 25, completed));
  check("valuation-explorer", rangeCompleted(26, 31, completed));
  check("fundamental-analyst", rangeCompleted(32, 35, completed));
  check("quiz-ace", (input.quizAverage ?? 0) >= 90);
  check("consistent-learner", input.streak >= 3);
  check("half-way", completionRatio >= 0.5);
  check("course-complete", completionRatio >= 1 && flatLessons.length > 0);

  return earned;
}

export function getAchievement(slug: string): AchievementDefinition | undefined {
  return achievements.find((entry) => entry.slug === slug);
}
