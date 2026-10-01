import type {
  ConceptAnimationKey,
  InteractiveKey,
  LessonBlock,
  QuizQuestion,
} from "./types";

/**
 * Tiny builders that keep lesson content readable.
 *
 * Lessons are written as data (not JSX) so the same source can drive the UI,
 * the Prisma seed and the tests. These helpers remove the repetitive object
 * literals that would otherwise bury the actual teaching content.
 */

export const p = (text: string): LessonBlock => ({ type: "paragraph", text });

export const h = (text: string): LessonBlock => ({ type: "heading", text });

export const ul = (items: string[]): LessonBlock => ({ type: "bullets", items });

export const ol = (items: string[]): LessonBlock => ({ type: "numbered", items });

export const info = (text: string, title?: string): LessonBlock => ({
  type: "callout",
  variant: "info",
  title,
  text,
});

export const warn = (text: string, title?: string): LessonBlock => ({
  type: "callout",
  variant: "warning",
  title,
  text,
});

export const ok = (text: string, title?: string): LessonBlock => ({
  type: "callout",
  variant: "success",
  title,
  text,
});

export const danger = (text: string, title?: string): LessonBlock => ({
  type: "callout",
  variant: "destructive",
  title,
  text,
});

export const fx = (expression: string, note?: string): LessonBlock => ({
  type: "formula",
  expression,
  note,
});

export const tool = (key: InteractiveKey, caption?: string): LessonBlock => ({
  type: "interactive",
  key,
  caption,
});

export const anim = (key: ConceptAnimationKey, caption?: string): LessonBlock => ({
  type: "animation",
  key,
  caption,
});

export const tbl = (
  headers: string[],
  rows: string[][],
  caption?: string,
): LessonBlock => ({ type: "table", headers, rows, caption });

export const steps = (
  items: { title: string; text: string }[],
): LessonBlock => ({ type: "steps", items });

export const kv = (items: { label: string; value: string }[]): LessonBlock => ({
  type: "kv",
  items,
});

/** Builds a quiz question. Ids are unique within a lesson. */
let questionCounter = 0;
export const q = (
  prompt: string,
  options: string[],
  correctIndex: number,
  explanation: string,
): QuizQuestion => {
  questionCounter += 1;
  return { id: `q${questionCounter}`, prompt, options, correctIndex, explanation };
};
