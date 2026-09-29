import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { ProgressProvider } from "@/lib/progress/progress-provider";
import { resetProgressAction } from "@/lib/progress/progress-store";
import type { QuizQuestion } from "@/lib/learning/types";
import { Quiz } from "./quiz";

const QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    prompt: "What does EPS represent?",
    options: ["Alpha", "Beta", "Gamma", "Delta"],
    correctIndex: 1,
    explanation:
      "EPS is earnings per share — the profit attributable to each share. It is the building block of the P/E ratio.",
  },
  {
    id: "q2",
    prompt: "What is 2 + 2?",
    options: ["Three", "Five", "Four"],
    correctIndex: 2,
    explanation:
      "Two plus two is four. This question exists only to exercise the multi-question quiz flow.",
  },
];

function renderQuiz() {
  return render(
    <ProgressProvider>
      <Quiz lessonSlug="lesson-under-test" chapterSlug="chapter-1-money" questions={QUESTIONS} />
    </ProgressProvider>,
  );
}

describe("Quiz", () => {
  beforeEach(() => {
    localStorage.clear();
    resetProgressAction();
  });

  afterEach(cleanup);

  it("shows the first question and its progress", () => {
    renderQuiz();
    expect(screen.getByText("What does EPS represent?")).toBeInTheDocument();
    expect(screen.getByText("Question 1 / 2")).toBeInTheDocument();
  });

  it("reveals an explanation after answering", () => {
    renderQuiz();

    fireEvent.click(screen.getByRole("button", { name: /Beta/ }));

    expect(screen.getByText("Correct")).toBeInTheDocument();
    expect(screen.getByText(/building block of the P\/E ratio/)).toBeInTheDocument();
  });

  it("marks a wrong answer and still explains", () => {
    renderQuiz();

    fireEvent.click(screen.getByRole("button", { name: /Alpha/ }));

    expect(screen.getByText("Not quite")).toBeInTheDocument();
    expect(screen.getByText(/building block of the P\/E ratio/)).toBeInTheDocument();
  });

  it("walks through every question and reports a final score", () => {
    renderQuiz();

    // Question 1 — correct.
    fireEvent.click(screen.getByRole("button", { name: /Beta/ }));
    fireEvent.click(screen.getByRole("button", { name: "Next question" }));

    // Question 2 — correct.
    fireEvent.click(screen.getByRole("button", { name: /Four/ }));
    fireEvent.click(screen.getByRole("button", { name: "See results" }));

    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("2 of 2 correct")).toBeInTheDocument();
  });

  it("can be retried", () => {
    renderQuiz();

    fireEvent.click(screen.getByRole("button", { name: /Beta/ }));
    fireEvent.click(screen.getByRole("button", { name: "Next question" }));
    fireEvent.click(screen.getByRole("button", { name: /Four/ }));
    fireEvent.click(screen.getByRole("button", { name: "See results" }));

    fireEvent.click(screen.getByRole("button", { name: /Try again/ }));

    expect(screen.getByText("Question 1 / 2")).toBeInTheDocument();
  });
});
