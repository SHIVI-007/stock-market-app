import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { flatLessons } from "@/lib/learning/curriculum";

import { ConceptExplainer } from "./explainer";
import { animationRegistry } from "./registry";

const STEPS = [
  { title: "First step", text: "The first explanation." },
  { title: "Second step", text: "The second explanation." },
  { title: "Third step", text: "The third explanation." },
];

function renderExplainer() {
  return render(
    <ConceptExplainer
      label="Test explainer"
      steps={STEPS}
      renderStage={(step) => <p>stage {step}</p>}
      stepDurationMs={1000}
    />,
  );
}

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("ConceptExplainer", () => {
  it("opens on the first step, with its narration", () => {
    renderExplainer();

    expect(screen.getByText("First step")).toBeInTheDocument();
    expect(screen.getByText("The first explanation.")).toBeInTheDocument();
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("advances and rewinds with the step controls", () => {
    renderExplainer();

    fireEvent.click(screen.getByRole("button", { name: "Next step" }));
    expect(screen.getByText("Second step")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Previous step" }));
    expect(screen.getByText("First step")).toBeInTheDocument();
  });

  it("cannot step back from the first step", () => {
    renderExplainer();

    expect(screen.getByRole("button", { name: "Previous step" })).toBeDisabled();
  });

  it("jumps straight to a step when its marker is clicked", () => {
    renderExplainer();

    fireEvent.click(screen.getByRole("button", { name: "Step 3: Third step" }));

    expect(screen.getByText("Third step")).toBeInTheDocument();
    expect(screen.getByText("3 / 3")).toBeInTheDocument();
  });

  it("plays the steps on its own", () => {
    vi.useFakeTimers();
    renderExplainer();

    act(() => {
      vi.advanceTimersByTime(1100);
    });
    expect(screen.getByText("Second step")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1100);
    });
    expect(screen.getByText("Third step")).toBeInTheDocument();
  });

  it("stops at the last step and offers to replay", () => {
    vi.useFakeTimers();
    renderExplainer();

    // Advance one step at a time: React re-runs the step effect after each
    // flush, which is what schedules the following timer.
    act(() => {
      vi.advanceTimersByTime(1100);
    });
    act(() => {
      vi.advanceTimersByTime(1100);
    });

    // More time passes, but there is nowhere left to go.
    act(() => {
      vi.advanceTimersByTime(30_000);
    });

    expect(screen.getByText("3 / 3")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Watch again" })).toBeInTheDocument();
  });

  it("starts over when replayed", () => {
    renderExplainer();

    fireEvent.click(screen.getByRole("button", { name: "Step 3: Third step" }));
    fireEvent.click(screen.getByRole("button", { name: "Watch again" }));

    expect(screen.getByText("First step")).toBeInTheDocument();
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("pauses when the learner takes over by hand", () => {
    renderExplainer();

    // It opens playing, so this control reads "Pause".
    fireEvent.click(screen.getByRole("button", { name: "Next step" }));

    expect(screen.getByRole("button", { name: "Play" })).toBeInTheDocument();
  });
});

describe("animation registry", () => {
  it("resolves every animation referenced by a lesson", () => {
    const referenced = flatLessons.flatMap(({ lesson }) =>
      lesson.blocks.filter((block) => block.type === "animation").map((block) => block.key),
    );

    expect(referenced.length).toBeGreaterThan(0);

    for (const key of referenced) {
      // A missing entry renders as a blank gap in the lesson, so this is the
      // invariant worth guarding.
      expect(animationRegistry[key], `no component registered for "${key}"`).toBeTruthy();
    }
  });

  it("registers a component for every key", () => {
    for (const [key, component] of Object.entries(animationRegistry)) {
      expect(typeof component, `"${key}" is not a component`).toBe("function");
    }
  });
});
