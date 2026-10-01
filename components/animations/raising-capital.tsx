"use client";

import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

import { ConceptExplainer, type ExplainerStep } from "./explainer";

/**
 * Chapter 8 — IPO and the primary market.
 *
 * The first explainer walks the offer from the decision to go public through to
 * listing; the second is the one that matters most, because it is the idea
 * learners most often get wrong: in the secondary market the company receives
 * nothing.
 *
 * Figures match the Sunrise Motors example in `lib/learning/modules/markets.ts`.
 */

/* ------------------------------------------------------------------ shared */

/** One step of a chain, or one party in a trade. */
function Node({
  label,
  detail,
  visible = true,
  active = false,
  className,
}: {
  label: string;
  detail?: string;
  visible?: boolean;
  active?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border px-2.5 py-2 transition-all duration-500 motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
        active ? "border-primary/40 bg-primary/10" : "border-border bg-muted/25",
        className,
      )}
    >
      <p className="text-[11px] font-semibold">{label}</p>
      {detail ? (
        <p className="mt-0.5 text-[10px] leading-tight text-muted-foreground">{detail}</p>
      ) : null}
    </div>
  );
}

function Arrow({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "mx-auto h-4 w-px bg-border transition-opacity duration-500 motion-reduce:transition-none",
        visible ? "opacity-100" : "opacity-0",
      )}
    />
  );
}

function Figure({
  label,
  value,
  shown = true,
}: {
  label: string;
  value: string;
  shown?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-muted/30 px-2.5 py-2 text-center transition-all duration-500 motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
      )}
    >
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-sm font-semibold tabular-nums">{value}</p>
    </div>
  );
}

/* ---------------------------------------------------------- 1. What is an IPO */

const IPO_STEPS: ExplainerStep[] = [
  {
    title: "The company decides to go public",
    text: "Until now its shares have been held by founders and early investors. With advisers, it prepares to offer shares to the general public for the first time.",
  },
  {
    title: "A price band is announced",
    text: "The company sets a range rather than a single price. The final issue price is decided after seeing how much demand the offer attracts.",
  },
  {
    title: "The public applies",
    text: "During a set window, investors apply for shares — usually through a broker or a bank.",
  },
  {
    title: "Allotment",
    text: "If demand exceeds the shares on offer, the issue is allotted. Investors may receive fewer shares than they applied for, sometimes decided by a lottery-like process.",
  },
  {
    title: "Listing",
    text: "The shares begin trading on an exchange. From this point the market — not the company — sets the price, which can be higher or lower than the price at which the shares were issued.",
  },
];

function IpoStage({ step }: { step: number }) {
  const allotted = step >= 3;

  return (
    <div className="space-y-2">
      <div className="space-y-0.5">
        {IPO_STEPS.map((stage, index) => (
          <div key={stage.title}>
            {index > 0 ? <Arrow visible={step >= index} /> : null}
            <Node label={stage.title} visible={step >= index} active={step === index} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <Figure label="Issue price" value="₹100" shown={allotted} />
        <Figure label="Money raised" value="₹100 crore" shown={allotted} />
      </div>

      <p
        className={cn(
          "text-center text-[10px] text-muted-foreground transition-opacity duration-500 motion-reduce:transition-none",
          step >= 4 ? "opacity-100" : "opacity-0",
        )}
      >
        1 crore shares sold at ₹100 each — the money goes to the company
      </p>
    </div>
  );
}

export function IpoJourney() {
  return (
    <ConceptExplainer
      label="How an IPO works"
      steps={IPO_STEPS}
      renderStage={(step) => <IpoStage step={step} />}
    />
  );
}

/* --------------------------------------------- 2. Primary vs secondary market */

const MARKET_LAYER_STEPS: ExplainerStep[] = [
  {
    title: "The same share, two very different transactions",
    text: "A share can change hands in two ways: the company can create new shares and sell them, or an investor can sell shares they already own. Only one of those brings any money to the company.",
  },
  {
    title: "Primary market: the company issues new shares",
    text: "In an IPO, a follow-on public offer or a rights issue, new shares are created and sold. The money paid for them goes to the company, which can spend it on the business.",
  },
  {
    title: "Secondary market: investors trade shares they already own",
    text: "When you buy on the NSE or BSE, you are buying from another investor. Nothing is created — the same shares simply change hands.",
  },
  {
    title: "In a secondary trade, the company receives nothing",
    text: "Sunrise Motors Ltd is not a party to that trade and receives none of the money. The investor who sold the shares receives it.",
  },
  {
    title: "So the two markets do different jobs",
    text: "The primary market funds the company itself. The secondary market gives owners a way to sell and a price they can see every day — capital formation on one side, liquidity on the other.",
  },
];

/** One party in a trade. */
function Party({
  label,
  detail,
  receiving = false,
}: {
  label: string;
  detail: string;
  receiving?: boolean;
}) {
  return (
    <div
      className={cn(
        "min-w-0 flex-1 rounded-md border px-2 py-1.5",
        receiving ? "border-success/50 bg-success/10" : "border-border bg-card",
      )}
    >
      <p className="truncate text-[11px] font-medium">{label}</p>
      <p className="truncate text-[9px] text-muted-foreground">{detail}</p>
    </div>
  );
}

/** The money moving between the two parties. */
function Payment({ visible, label }: { visible: boolean; label: string }) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center gap-0.5 transition-opacity duration-500 motion-reduce:transition-none",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <span className="text-[9px] leading-none text-muted-foreground">{label}</span>
      <span className="flex w-full items-center">
        <span className="h-px flex-1 bg-success/60" />
        <ArrowRight className="size-3 shrink-0 text-success" />
      </span>
    </div>
  );
}

function Lane({
  title,
  source,
  children,
  active,
}: {
  title: string;
  source: string;
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-2.5 transition-colors duration-500 motion-reduce:transition-none",
        active ? "border-primary/40 bg-primary/5" : "border-border bg-muted/25",
      )}
    >
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-xs font-semibold">{title}</p>
        <p className="text-[9px] uppercase tracking-wide text-muted-foreground">{source}</p>
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function PrimarySecondaryStage({ step }: { step: number }) {
  const primary = step >= 1;
  const secondary = step >= 2;
  const companyExcluded = step >= 3;

  return (
    <div className="space-y-2.5">
      <Lane title="Primary market" source="new shares" active={step === 1}>
        <div className="flex items-center gap-2">
          <Party label="Investors" detail="pay for new shares" />
          <Payment visible={primary} label="money" />
          <Party label="The company" detail="keeps the money" receiving={primary} />
        </div>
      </Lane>

      <Lane title="Secondary market" source="shares already owned" active={step === 2 || step === 3}>
        <div className="flex items-center gap-2">
          <Party label="Investor B" detail="buys the shares" />
          <Payment visible={secondary} label="money" />
          <Party
            label="Investor A"
            detail="sells — and is paid"
            receiving={secondary}
          />
        </div>

        <p
          className={cn(
            "mt-2 text-[10px] leading-tight text-muted-foreground transition-opacity duration-500 motion-reduce:transition-none",
            companyExcluded ? "opacity-100" : "opacity-0",
          )}
        >
          Sunrise Motors Ltd is not part of this trade and receives nothing — the seller keeps the
          money.
        </p>
      </Lane>
    </div>
  );
}

export function PrimaryVsSecondary() {
  return (
    <ConceptExplainer
      label="Primary and secondary market"
      steps={MARKET_LAYER_STEPS}
      renderStage={(step) => <PrimarySecondaryStage step={step} />}
    />
  );
}
