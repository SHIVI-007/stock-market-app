"use client";

import * as React from "react";
import { CheckCircle2, RotateCcw, XCircle } from "lucide-react";

import { AnimatedNumber } from "@/components/motion/animated-number";
import { Celebrate } from "@/components/motion/celebrate";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useProgress } from "@/lib/progress/progress-provider";
import type { QuizQuestion } from "@/lib/learning/types";

export interface QuizProps {
  lessonSlug: string;
  chapterSlug: string;
  questions: QuizQuestion[];
}

/**
 * End-of-lesson quiz.
 *
 * Records the attempt (score + XP) as soon as the learner finishes, so progress
 * and achievements update immediately. Every answer reveals an explanation.
 */
export function Quiz({ lessonSlug, chapterSlug, questions }: QuizProps) {
  const { recordQuizScore } = useProgress();

  const [index, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [correctCount, setCorrectCount] = React.useState(0);
  const [finished, setFinished] = React.useState(false);
  const [attemptKey, setAttemptKey] = React.useState(0);

  const question = questions[index];
  const total = questions.length;
  const answered = selected !== null;

  if (!question || total === 0) return null;

  const handleSelect = (optionIndex: number) => {
    if (answered) return;
    setSelected(optionIndex);
    if (optionIndex === question.correctIndex) {
      setCorrectCount((count) => count + 1);
    }
  };

  const handleNext = () => {
    if (index + 1 < total) {
      setIndex((current) => current + 1);
      setSelected(null);
      return;
    }

    // Finish: record the attempt once, using the final tallies.
    const finalCorrect = correctCount;
    const percent = Math.round((finalCorrect / total) * 100);
    recordQuizScore({
      lessonSlug,
      chapterSlug,
      percent,
      correctCount: finalCorrect,
    });
    setFinished(true);
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setCorrectCount(0);
    setFinished(false);
    setAttemptKey((key) => key + 1);
  };

  if (finished) {
    const percent = Math.round((correctCount / total) * 100);
    const message =
      percent === 100
        ? "Perfect score — you have this concept solid."
        : percent >= 70
          ? "Good understanding. Review the explanations for anything you missed."
          : "Worth revisiting this lesson before moving on — that is exactly what the review is for.";

    return (
      <div key={attemptKey} className="animate-fade-in-up space-y-4">
        <div className="relative rounded-xl border border-primary/40 bg-primary/10 p-6 text-center">
          {percent === 100 ? <Celebrate /> : null}
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Quiz complete
          </p>
          <p className="mt-1 text-4xl font-bold tabular-nums text-primary">
            <AnimatedNumber value={percent} suffix="%" />
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {correctCount} of {total} correct
          </p>
          <p className="mt-3 text-sm">{message}</p>
        </div>
        <div className="flex justify-center">
          <Button variant="secondary" onClick={restart}>
            <RotateCcw className="size-4" /> Try again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Progress through the quiz */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Question {index + 1} / {total}
          </span>
          <span>{Math.round(((index + (answered ? 1 : 0)) / total) * 100)}%</span>
        </div>
        <Progress value={((index + (answered ? 1 : 0)) / total) * 100} />
      </div>

      <p className="text-base font-medium">{question.prompt}</p>

      <div className="space-y-2">
        {question.options.map((option, optionIndex) => {
          const isCorrect = optionIndex === question.correctIndex;
          const isChosen = optionIndex === selected;

          return (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(optionIndex)}
              disabled={answered}
              aria-pressed={isChosen}
              className={cn(
                "flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                !answered && "border-border hover:bg-muted/60",
                answered && isCorrect && "animate-pop border-success/50 bg-success/10",
                answered && isChosen && !isCorrect && "animate-shake border-destructive/50 bg-destructive/10",
                answered && !isCorrect && !isChosen && "border-border opacity-60",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold",
                  answered && isCorrect
                    ? "border-success bg-success text-success-foreground"
                    : answered && isChosen
                      ? "border-destructive bg-destructive text-destructive-foreground"
                      : "border-border text-muted-foreground",
                )}
              >
                {String.fromCharCode(65 + optionIndex)}
              </span>
              <span className="flex-1">{option}</span>
              {answered && isCorrect ? (
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
              ) : null}
              {answered && isChosen && !isCorrect ? (
                <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
              ) : null}
            </button>
          );
        })}
      </div>

      {answered ? (
        <div
          className={cn(
            "animate-fade-in-up rounded-xl border p-4",
            selected === question.correctIndex
              ? "border-success/40 bg-success/10"
              : "border-warning/40 bg-warning/10",
          )}
        >
          <p className="text-sm font-semibold">
            {selected === question.correctIndex ? "Correct" : "Not quite"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{question.explanation}</p>
        </div>
      ) : null}

      <div className="flex justify-end">
        <Button onClick={handleNext} disabled={!answered}>
          {index + 1 < total ? "Next question" : "See results"}
        </Button>
      </div>
    </div>
  );
}
