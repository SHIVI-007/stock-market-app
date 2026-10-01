"use client";

import { cn, formatIndianNumber } from "@/lib/utils";

import { ConceptExplainer, type ExplainerStep } from "./explainer";

/** The money you start with — the same figure the lesson uses. */
const PRINCIPAL = 100_000;

/**
 * The figures quoted in the lesson text, so the animation and the prose agree.
 * These are illustrative, not a forecast: 10% every year, which real markets
 * never deliver.
 */
const POINTS = [
  { label: "Start", total: 100_000 },
  { label: "1 year", total: 110_000 },
  { label: "2 years", total: 121_000 },
  { label: "5 years", total: 161_000 },
  { label: "10 years", total: 259_000 },
] as const;

const MAX = POINTS[POINTS.length - 1].total;

const STEPS: ExplainerStep[] = [
  {
    title: "Start with ₹1,00,000",
    text: "This is money sitting still. Every bar below is that same ₹1,00,000 after some number of years at 10% a year.",
  },
  {
    title: "After one year",
    text: "It has earned ₹10,000. So far this is just simple interest — exactly what you would expect.",
  },
  {
    title: "After two years: ₹1,21,000",
    text: "The second year earned ₹11,000, not ₹10,000. That extra ₹1,000 is the first year's ₹10,000 earning a return of its own. This is compounding.",
  },
  {
    title: "After five years: ₹1,61,000",
    text: "The gains are now worth more than half of what you put in. Nothing dramatic happened in any single year — the effect comes from the years stacking up.",
  },
  {
    title: "After ten years: ₹2,59,000",
    text: "Your returns, ₹1,59,000, are now larger than the ₹1,00,000 you started with. That is why time matters more than timing.",
  },
];

function GrowthStage({ step }: { step: number }) {
  return (
    <div className="space-y-3">
      <div className="flex h-36 items-end gap-2">
        {POINTS.map((point, index) => {
          const revealed = index <= step;
          const current = index === step;
          const gains = point.total - PRINCIPAL;

          const totalPct = (point.total / MAX) * 100;
          const gainsShare = (gains / point.total) * 100;
          const principalShare = 100 - gainsShare;

          return (
            <div key={point.label} className="flex h-full flex-1 items-end">
              <div
                className={cn(
                  "flex w-full flex-col justify-end overflow-hidden rounded-t-sm transition-[height,opacity] duration-500 ease-out motion-reduce:transition-none",
                  revealed ? "opacity-100" : "opacity-0",
                  current && "ring-2 ring-primary ring-offset-2 ring-offset-card",
                )}
                style={{ height: revealed ? `${totalPct}%` : "0%" }}
              >
                {gainsShare > 0 ? (
                  <div className="w-full bg-success/70" style={{ height: `${gainsShare}%` }} />
                ) : null}
                <div className="w-full bg-primary/80" style={{ height: `${principalShare}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2">
        {POINTS.map((point, index) => (
          <div key={point.label} className="flex-1 text-center">
            <p
              className={cn(
                "text-[10px] leading-tight",
                index === step ? "font-semibold text-foreground" : "text-muted-foreground",
              )}
            >
              {point.label}
            </p>
            <p
              className={cn(
                "text-[10px] tabular-nums transition-opacity motion-reduce:transition-none",
                index <= step ? "text-muted-foreground opacity-100" : "opacity-0",
              )}
            >
              {formatIndianNumber(point.total)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-border pt-3 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-primary/80" />
          Your original ₹1,00,000
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-success/70" />
          Returns earned on top
        </span>
      </div>
    </div>
  );
}

/**
 * Lesson 2: what compounding does to ₹1,00,000 at 10% a year, and why the
 * second year earns more than the first.
 */
export function CompoundingOverTime() {
  return (
    <ConceptExplainer
      label="What compounding does over ten years"
      steps={STEPS}
      renderStage={(step) => <GrowthStage step={step} />}
    />
  );
}
