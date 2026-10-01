"use client";

import { cn } from "@/lib/utils";

import { ConceptExplainer, type ExplainerStep } from "./explainer";

const STEPS: ExplainerStep[] = [
  {
    title: "Two ways to put money to work",
    text: "Almost every investment answers one question: are you owning something, or lending to someone? The two behave very differently.",
  },
  {
    title: "Ownership: you share in the profit — and the loss",
    text: "A share of a company is ownership. If the business does well, you benefit. If it does badly, you are not promised anything back.",
  },
  {
    title: "Lending: interest is promised; the upside is not",
    text: "A bond or a fixed deposit is a loan. You are promised interest and the return of your money — but if the borrower prospers, you do not share in it.",
  },
  {
    title: "Funds and ETFs are wrappers, not a third kind of asset",
    text: "A mutual fund or an ETF is a container that holds other investments. It takes its character from what is inside, so the same wrapper can be equity or debt.",
  },
  {
    title: "Some fit neither",
    text: "Gold and property are neither ownership nor lending. They pay no interest and share in no profit — their return comes from price change, and from rent in the case of property.",
  },
];

function Chip({
  label,
  visible,
  wrapper,
  delayMs = 0,
}: {
  label: string;
  visible: boolean;
  /** Wrapper holdings are dashed, because they hold assets rather than being one. */
  wrapper?: boolean;
  delayMs?: number;
}) {
  return (
    <li
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
      className={cn(
        "rounded-md border px-2 py-1.5 text-[11px] leading-tight transition-all duration-500 motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
        wrapper ? "border-dashed border-primary/50 bg-primary/5" : "border-border bg-muted/40",
      )}
    >
      {label}
    </li>
  );
}

function Column({
  title,
  kind,
  source,
  className,
  children,
}: {
  title: string;
  kind: string;
  source: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("rounded-lg border p-3", className)}>
      <p className="text-xs font-semibold">{title}</p>
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{kind}</p>
      <p className="mt-1 text-[10px] leading-tight text-muted-foreground">{source}</p>
      <ul className="mt-2 space-y-1.5">{children}</ul>
    </div>
  );
}

function SortingStage({ step }: { step: number }) {
  const ownershipVisible = step >= 1;
  const lendingVisible = step >= 2;
  const wrappersVisible = step >= 3;
  const neitherVisible = step >= 4;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2.5">
        <Column
          title="Ownership"
          kind="Equity"
          source="Return: profit and price growth"
          className="border-primary/40 bg-primary/5"
        >
          <Chip label="Shares of a company" visible={ownershipVisible} delayMs={0} />
          <Chip label="Equity mutual funds & ETFs" visible={wrappersVisible} wrapper delayMs={0} />
        </Column>

        <Column
          title="Lending"
          kind="Debt"
          source="Return: interest"
          className="border-success/40 bg-success/5"
        >
          <Chip label="Bonds" visible={lendingVisible} delayMs={0} />
          <Chip label="Fixed deposits" visible={lendingVisible} delayMs={110} />
          <Chip label="Debt mutual funds" visible={wrappersVisible} wrapper delayMs={110} />
        </Column>
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-2.5">
        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
          Neither — real assets
        </p>
        <div className="mt-1.5 flex gap-1.5">
          {["Gold", "Real estate"].map((label, index) => (
            <span
              key={label}
              style={{ transitionDelay: neitherVisible ? `${index * 110}ms` : "0ms" }}
              className={cn(
                "rounded-md border border-border px-2 py-1 text-[11px] transition-all duration-500 motion-reduce:transition-none",
                neitherVisible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
              )}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Lesson 3: sorting the investment categories into the two families that
 * matter — ownership and lending — and showing that funds are wrappers.
 */
export function OwnershipOrLending() {
  return (
    <ConceptExplainer
      label="Ownership or lending?"
      steps={STEPS}
      renderStage={(step) => <SortingStage step={step} />}
    />
  );
}
