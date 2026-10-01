"use client";

import { cn } from "@/lib/utils";

import { ConceptExplainer, type ExplainerStep } from "./explainer";

const STEPS: ExplainerStep[] = [
  {
    title: "Money arrives as income",
    text: "Most money reaches you as income — a salary, fees, or business profit. Here it is one month of salary: ₹50,000.",
  },
  {
    title: "It splits three ways",
    text: "Every rupee you receive then goes down one of three paths: spent on things you consume now, set aside as savings, or put to work as an investment.",
  },
  {
    title: "Expenses are consumed",
    text: "Expenses buy you something today — rent, food, travel, an EMI. Once spent, that money is gone. It has bought you something, but it no longer belongs to you.",
  },
  {
    title: "Savings and investments are different",
    text: "Savings stay safe and available, and grow slowly. Investments are put at risk in the hope of growing faster — which is exactly where shares come in.",
  },
  {
    title: "What you own minus what you owe",
    text: "Assets are things you own that have value; liabilities are things you owe. Subtract one from the other and you have your net worth.",
  },
];

/** Stage steps 0–3: income splitting into its three destinations. */
function MoneySplitStage({ step }: { step: number }) {
  const branchesVisible = step >= 1;
  const expensesSpent = step >= 2;
  const contrasted = step >= 3;

  const branches = [
    {
      label: "Expenses",
      amount: "₹30,000",
      status: expensesSpent ? "Spent — gone" : "Things you use today",
      dimmed: expensesSpent,
      emphasised: false,
    },
    {
      label: "Savings",
      amount: "₹12,000",
      status: contrasted ? "Safe and available" : "Set aside",
      dimmed: false,
      emphasised: contrasted,
    },
    {
      label: "Investments",
      amount: "₹8,000",
      status: contrasted ? "At risk, for growth" : "Put to work",
      dimmed: false,
      emphasised: contrasted,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="mx-auto w-fit rounded-lg border border-primary/40 bg-primary/10 px-5 py-2 text-center">
        <p className="text-[11px] font-medium uppercase tracking-wide text-primary">Income</p>
        <p className="text-lg font-semibold tabular-nums">₹50,000</p>
      </div>

      <div
        aria-hidden="true"
        className={cn(
          "mx-auto h-5 w-px bg-border transition-opacity duration-500 motion-reduce:transition-none",
          branchesVisible ? "opacity-100" : "opacity-0",
        )}
      />

      <div className="grid grid-cols-3 gap-2">
        {branches.map((branch, index) => (
          <div
            key={branch.label}
            style={{ transitionDelay: branchesVisible ? `${index * 130}ms` : "0ms" }}
            className={cn(
              "rounded-lg border p-2.5 text-center transition-all duration-500 motion-reduce:transition-none",
              // One opacity at a time: two competing `opacity-*` utilities would
              // be resolved by stylesheet order, not by intent, and the spent
              // card would not actually dim.
              !branchesVisible && "translate-y-2 opacity-0",
              branchesVisible &&
                (branch.dimmed ? "translate-y-0 opacity-50" : "translate-y-0 opacity-100"),
              branch.emphasised
                ? "border-primary/40 bg-primary/5"
                : "border-border bg-muted/30",
            )}
          >
            <p className="text-[11px] font-medium text-muted-foreground">{branch.label}</p>
            <p className="mt-0.5 text-sm font-semibold tabular-nums">{branch.amount}</p>
            <p className="mt-1 text-[10px] leading-tight text-muted-foreground">{branch.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Stage step 4: the assets-and-liabilities view that leads to net worth. */
function NetWorthStage() {
  return (
    <div className="space-y-2.5">
      <BalanceRow
        label="Assets"
        note="cash, bank balance, shares, gold"
        value="₹5,00,000"
        className="border-success/40 bg-success/5"
      />
      <BalanceRow
        label="Liabilities"
        note="home loan, car loan, card dues"
        value="₹2,00,000"
        className="border-destructive/40 bg-destructive/5"
      />

      <p className="pt-1 text-center text-[11px] uppercase tracking-wide text-muted-foreground">
        assets − liabilities
      </p>

      <div className="rounded-lg border border-primary/40 bg-primary/10 px-4 py-3 text-center">
        <p className="text-[11px] font-medium uppercase tracking-wide text-primary">Net worth</p>
        <p className="text-xl font-semibold tabular-nums">₹3,00,000</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">what is actually yours</p>
      </div>
    </div>
  );
}

function BalanceRow({
  label,
  note,
  value,
  className,
}: {
  label: string;
  note: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between rounded-lg border px-3 py-2", className)}>
      <span>
        <span className="block text-sm font-medium">{label}</span>
        <span className="block text-[11px] text-muted-foreground">{note}</span>
      </span>
      <span className="text-sm font-semibold tabular-nums">{value}</span>
    </div>
  );
}

/**
 * Lesson 1: follows one month of income from arriving, to being split three
 * ways, to the assets-and-liabilities view of net worth.
 */
export function MoneyJourney() {
  return (
    <ConceptExplainer
      label="Where your income goes"
      steps={STEPS}
      renderStage={(step) => (step >= 4 ? <NetWorthStage /> : <MoneySplitStage step={step} />)}
    />
  );
}
