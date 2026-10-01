"use client";

import * as React from "react";
import { Pause, Play, RotateCcw, SkipBack, SkipForward } from "lucide-react";

import { useHydrated } from "@/lib/hydration";
import { cn } from "@/lib/utils";

export interface ExplainerStep {
  /** Short label, shown above the narration. */
  title: string;
  /** One or two sentences explaining what just changed on screen. */
  text: string;
}

export interface ConceptExplainerProps {
  /** Names the explainer for screen readers. */
  label: string;
  steps: ExplainerStep[];
  /** Draws the visual for a step. Animations pass this rather than markup. */
  renderStage: (step: number) => React.ReactNode;
  /** How long each step is shown while playing. */
  stepDurationMs?: number;
  className?: string;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * The player behind every concept explainer.
 *
 * These stand in for what would otherwise be a video: instead of a file we
 * could not theme, caption or restyle, each explainer is a sequence of steps
 * drawn from markup. The learner can sit back and watch it play, or step
 * through at their own pace — which is the part a video cannot do.
 *
 * Autoplay is skipped entirely when the learner has asked for reduced motion.
 * The steps still work; they simply wait to be advanced.
 */
export function ConceptExplainer({
  label,
  steps,
  renderStage,
  stepDurationMs = 4200,
  className,
}: ConceptExplainerProps) {
  const [step, setStep] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);

  const lastStep = steps.length - 1;
  const atEnd = step >= lastStep;
  const current = steps[Math.min(step, lastStep)];

  // One timeout per step rather than a single interval: each step then gets the
  // full duration, and playback stops on its own once the last step has no
  // further timer to schedule.
  React.useEffect(() => {
    if (!playing || atEnd || prefersReducedMotion()) return;

    const timer = window.setTimeout(() => setStep((value) => value + 1), stepDurationMs);
    return () => window.clearTimeout(timer);
  }, [playing, atEnd, step, stepDurationMs]);

  /** Stepping by hand always takes manual control. */
  const goTo = (next: number) => {
    setPlaying(false);
    setStep(Math.max(0, Math.min(next, lastStep)));
  };

  const togglePlay = () => {
    // Pressing play at the end really means "watch it again".
    if (atEnd) {
      setStep(0);
      setPlaying(true);
      return;
    }
    setPlaying((value) => !value);
  };

  return (
    <div
      className={cn("overflow-hidden rounded-xl border border-border bg-card shadow-sm", className)}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-2.5">
        <p className="text-sm font-semibold">{label}</p>

        <div className="flex items-center gap-1">
          <ControlButton label="Previous step" onClick={() => goTo(step - 1)} disabled={step === 0}>
            <SkipBack className="size-4" />
          </ControlButton>

          <ControlButton
            label={atEnd ? "Watch again" : playing ? "Pause" : "Play"}
            onClick={togglePlay}
          >
            {atEnd ? (
              <RotateCcw className="size-4" />
            ) : playing ? (
              <Pause className="size-4" />
            ) : (
              <Play className="size-4" />
            )}
          </ControlButton>

          <ControlButton label="Next step" onClick={() => goTo(step + 1)} disabled={atEnd}>
            <SkipForward className="size-4" />
          </ControlButton>
        </div>
      </div>

      {/* A fixed height stops the page jumping about as steps change. */}
      <div className="flex min-h-[15rem] items-center justify-center px-4 py-6 sm:min-h-[16rem]">
        <div aria-hidden="true" className="w-full max-w-md">
          {renderStage(step)}
        </div>
      </div>

      <div className="space-y-3 border-t border-border bg-muted/20 px-4 py-4">
        <div className="min-h-[3.5rem]">
          <p className="text-sm font-semibold">{current.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{current.text}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center gap-1.5">
            {steps.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Step ${index + 1}: ${item.title}`}
                aria-current={index === step ? "step" : undefined}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors motion-reduce:transition-none",
                  index <= step ? "bg-primary" : "bg-border hover:bg-muted-foreground/40",
                )}
              />
            ))}
          </div>

          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
            {Math.min(step + 1, steps.length)} / {steps.length}
          </span>
        </div>
      </div>
    </div>
  );
}

function ControlButton({
  label,
  onClick,
  disabled = false,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const hydrated = useHydrated();

  return (
    <button
      type="button"
      onClick={() => {
        if (disabled) return;
        onClick();
      }}
      // `disabled` only reaches the DOM once the browser owns the markup. See
      // `useHydrated`: this is the one boolean attribute the player toggles, and
      // extensions and translation tools add or strip it before React hydrates,
      // which React reports as a mismatch even though server and client agree.
      disabled={hydrated ? disabled : undefined}
      aria-disabled={disabled || undefined}
      aria-label={label}
      title={label}
      className={cn(
        "flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors",
        "hover:bg-muted hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        // Styled from the prop rather than the `disabled:` variant, so the
        // control looks the same from the first paint as it does afterwards.
        disabled && "pointer-events-none opacity-40",
      )}
    >
      {children}
    </button>
  );
}
