"use client";

import { cn } from "@/lib/utils";

import { ConceptExplainer, type ExplainerStep } from "./explainer";

/**
 * Chapter 3 — What is a share?
 *
 * Two explainers that make proportion visible. The first cuts a company into
 * equal shares and shows that ownership is a fraction of the whole; the second
 * issues more shares and shows that fraction getting thinner while the value of
 * the holding need not fall.
 *
 * Every figure matches the prose in `lib/learning/modules/foundations.ts`.
 */

/* ------------------------------------------------------------------ shared */

/**
 * The company drawn as one whole, cut into equal shares.
 *
 * The bar's width is always 100% of the company, so issuing more shares makes
 * every share narrower rather than making the bar longer — which is precisely
 * what dilution looks like from the inside.
 *
 * `total` is how many shares the lesson ends with and `active` how many have
 * been issued so far. Shares that do not exist yet sit at zero width, so the
 * slots sum to 100% at both ends of a change; because each one interpolates
 * linearly, they sum to 100% during the transition too, and the bar never
 * overflows or leaves a gap.
 */
function SliceBar({
  total,
  active,
  mine = 0,
  issuedFrom = total,
  divided = true,
}: {
  total: number;
  active: number;
  /** How many of the earliest shares belong to the learner. */
  mine?: number;
  /** Index from which the shares are newly issued. */
  issuedFrom?: number;
  /** Off until the company has actually been cut into shares. */
  divided?: boolean;
}) {
  const width = 100 / Math.max(active, 1);

  return (
    <div className="flex h-12 w-full overflow-hidden rounded-md border border-border">
      {Array.from({ length: total }, (_, index) => {
        const issued = index < active;

        return (
          <div
            key={index}
            style={{ width: issued ? `${width}%` : "0%" }}
            className={cn(
              "h-full shrink-0 transition-all duration-700 ease-out motion-reduce:transition-none",
              // The separators are what make the shares visible as shares —
              // until they appear the bar reads as one undivided company.
              divided && issued && index < active - 1 && "border-r border-card",
              issued ? "opacity-100" : "opacity-0",
              index < mine
                ? "bg-primary"
                : index >= issuedFrom
                  ? "bg-warning/60"
                  : "bg-muted-foreground/25",
            )}
          />
        );
      })}
    </div>
  );
}

/** One figure in the strip above or below the bar. */
function Figure({
  label,
  value,
  emphasised = false,
}: {
  label: string;
  value: string;
  emphasised?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border px-2.5 py-2 text-center transition-colors duration-500 motion-reduce:transition-none",
        emphasised ? "border-primary/40 bg-primary/10" : "border-border bg-muted/30",
      )}
    >
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm font-semibold tabular-nums">{value}</p>
    </div>
  );
}

/** What each shade of the bar means. */
function Swatch({ tone, label }: { tone: "mine" | "other" | "new"; label: string }) {
  const tones = {
    mine: "bg-primary",
    other: "bg-muted-foreground/25",
    new: "bg-warning/60",
  } as const;

  return (
    <span className="flex items-center gap-1.5">
      <span className={cn("size-2.5 rounded-sm", tones[tone])} />
      {label}
    </span>
  );
}

/**
 * Fades a block in without moving it, so the stage height never changes.
 */
function Reveal({
  shown,
  className,
  children,
}: {
  shown: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "transition-opacity duration-500 motion-reduce:transition-none",
        shown ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------ 1. A company, cut into shares */

/** The company is divided into 20 shares of 5% each — 50,000 of 10,00,000. */
const SLICES = 20;

const OWNERSHIP_STEPS: ExplainerStep[] = [
  {
    title: "Start with the whole company",
    text: "₹10 crore of value, and no shares yet. The bar below is the entire business — one block, not yet divided.",
  },
  {
    title: "Cut it into equal shares",
    text: "Split the company into 10,00,000 equal shares. Each one is company value ÷ number of shares: ₹10 crore ÷ 10,00,000 = ₹100.",
  },
  {
    title: "Your 50,000 shares are 5%",
    text: "Own 50,000 of those 10,00,000 shares and you own 5% of the company, worth ₹50 lakh. Ownership is a proportion, not a price.",
  },
  {
    title: "Double the company, keep the 5%",
    text: "Suppose the company becomes worth ₹20 crore. Each share is now ₹200 and your 5% is worth ₹1 crore — but the shaded slice of the bar has not moved. Only its value changed.",
  },
];

function OwnershipStage({ step }: { step: number }) {
  const divided = step >= 1;
  const owned = step >= 2;
  const doubled = step >= 3;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2.5">
        <Figure label="Company value" value={doubled ? "₹20 crore" : "₹10 crore"} />
        <Figure label="Price per share" value={doubled ? "₹200" : "₹100"} />
      </div>

      <SliceBar total={SLICES} active={SLICES} mine={owned ? 1 : 0} divided={divided} />

      <Reveal shown={owned} className="space-y-2">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
          <Swatch tone="mine" label="Your 50,000 shares" />
          <Swatch tone="other" label="The rest of the company" />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <Figure label="Your ownership" value="5%" emphasised />
          <Figure label="Your slice is worth" value={doubled ? "₹1 crore" : "₹50 lakh"} emphasised />
        </div>
      </Reveal>
    </div>
  );
}

export function OwnershipSlices() {
  return (
    <ConceptExplainer
      label="A company divided into shares"
      steps={OWNERSHIP_STEPS}
      renderStage={(step) => <OwnershipStage step={step} />}
    />
  );
}

/* ------------------------------------------------------- 2. Dilution */

/** Each slice is 10,000 shares, so the counts stay whole numbers. */
const DILUTION_SLICES = 15;
const YOUR_SLICES = 1;
const SHARES_BEFORE = 10;

const DILUTION_STEPS: ExplainerStep[] = [
  {
    title: "1,00,000 shares, and 10,000 are yours",
    text: "The company has 1,00,000 shares outstanding and you own 10,000 of them — 10% of the business, shown as one share of the ten.",
  },
  {
    title: "The company issues 50,000 new shares",
    text: "It sells 50,000 new shares to raise ₹50 lakh. Shares outstanding rise from 1,00,000 to 1,50,000, and the same company now has to be divided into more pieces.",
  },
  {
    title: "Your 10,000 shares have not shrunk",
    text: "You still own exactly 10,000 shares. But they are now 10,000 ÷ 1,50,000 = 6.67% of the company. Your slice is thinner because the whole is cut into more shares — that is dilution.",
  },
  {
    title: "The money raised has to earn its keep",
    text: "Put the ₹50 lakh to work and the company is worth ₹1.5 crore. At ₹100 a share your 10,000 shares are still worth ₹10 lakh: the percentage fell, the value did not.",
  },
  {
    title: "Dilution is a cost, not a verdict",
    text: "If that capital builds something worth more than it cost, a smaller slice can be worth more than the old one — ₹13.3 lakh rather than ₹10 lakh here. The test is what the money earns.",
  },
];

function DilutionStage({ step }: { step: number }) {
  const issued = step >= 1;
  const diluted = step >= 2;
  const valued = step >= 3;
  const richer = step >= 4;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <Figure label="Shares out" value={issued ? "1,50,000" : "1,00,000"} />
        <Figure label="Your shares" value="10,000" />
        <Figure label="Your ownership" value={issued ? "6.67%" : "10%"} emphasised={diluted} />
      </div>

      <SliceBar
        total={DILUTION_SLICES}
        active={issued ? DILUTION_SLICES : SHARES_BEFORE}
        mine={YOUR_SLICES}
        issuedFrom={SHARES_BEFORE}
      />

      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
        <Swatch tone="mine" label="Your 10,000 shares" />
        <Swatch tone="other" label="Other owners" />
        <Reveal shown={issued} className="leading-none">
          <Swatch tone="new" label="Newly issued shares" />
        </Reveal>
      </div>

      <Reveal shown={valued} className="space-y-1.5">
        <div className="grid grid-cols-2 gap-2.5">
          <Figure label="Company value" value={richer ? "₹2 crore" : "₹1.5 crore"} />
          <Figure
            label="Value of your holding"
            value={richer ? "₹13.3 lakh" : "₹10 lakh"}
            emphasised={richer}
          />
        </div>
      </Reveal>

      <Reveal shown={richer}>
        <p className="text-center text-[10px] italic text-muted-foreground">
          illustrative — only if the ₹50 lakh raised earns more than it cost
        </p>
      </Reveal>
    </div>
  );
}

export function DilutionSlices() {
  return (
    <ConceptExplainer
      label="What dilution does to your slice"
      steps={DILUTION_STEPS}
      renderStage={(step) => <DilutionStage step={step} />}
    />
  );
}
