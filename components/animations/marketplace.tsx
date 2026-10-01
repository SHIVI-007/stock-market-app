"use client";

import { cn } from "@/lib/utils";

import { ConceptExplainer, type ExplainerStep } from "./explainer";

/**
 * Chapter 4 — What is the stock market?
 *
 * The first explainer answers why a market exists at all: a lone seller has
 * nobody to trade with. The second follows one order from the learner, through
 * a broker, to the exchange that matches it.
 *
 * Companies named here match the fictional examples in
 * `lib/learning/modules/markets.ts`.
 */

/* ------------------------------------------------------------------ shared */

const TONES = {
  muted: "border-border bg-muted/30",
  primary: "border-primary/40 bg-primary/10",
  success: "border-success/40 bg-success/10",
  warning: "border-warning/40 bg-warning/10",
} as const;

type Tone = keyof typeof TONES;

/** A participant, or one step of the chain. */
function Node({
  label,
  detail,
  tone = "primary",
  visible = true,
  active = false,
  className,
}: {
  label: string;
  detail?: string;
  tone?: Tone;
  visible?: boolean;
  active?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border px-2.5 py-2 transition-all duration-500 motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
        active ? TONES[tone] : "border-border bg-muted/25",
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

/** A short vertical link between two rows of nodes. */
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

/** One of the things a market gives you — mirrors the lesson's bullet list. */
function Benefit({ label, shown }: { label: string; shown: boolean }) {
  return (
    <span
      className={cn(
        "rounded-md border border-primary/40 bg-primary/5 px-2 py-1 text-[10px] transition-all duration-500 motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
      )}
    >
      {label}
    </span>
  );
}

/* ------------------------------------------------- 1. Why a market exists */

const MARKET_STEPS: ExplainerStep[] = [
  {
    title: "One owner wants to sell",
    text: "An owner of Nimbus Technologies Ltd wants cash and has shares to sell. To sell them, they must first find somebody who wants to buy — and there is no obvious place to look.",
  },
  {
    title: "A lone sale is slow, and one-sided",
    text: "The single buyer they do find knows they are the only option. The owner waits, and accepts what is offered. Trading one-to-one is slow, and it is hard to know whether the price is fair.",
  },
  {
    title: "A market gathers everyone in one place",
    text: "An exchange brings many buyers and many sellers together under one set of rules. The same owner now has an audience of buyers instead of one counterparty.",
  },
  {
    title: "Liquidity: a match in seconds",
    text: "The market pairs the selling owner with a buyer almost immediately. That ease of finding somebody to trade with is what liquidity means.",
  },
  {
    title: "Price discovery: one price everyone can see",
    text: "With many competing bids and offers, a single visible price emerges — here ₹248. The market records the price buyers and sellers agreed on; it does not declare that price correct.",
  },
];

const BENEFITS = [
  { label: "Shared rules", from: 2 },
  { label: "Access to capital", from: 2 },
  { label: "Liquidity", from: 3 },
  { label: "Price discovery", from: 4 },
];

function MarketStage({ step }: { step: number }) {
  const gathered = step >= 2;
  const matched = step >= 3;
  const priced = step >= 4;

  const status = priced
    ? { text: "Traded at ₹248 — one visible price", tone: "success" as Tone }
    : matched
      ? { text: "Matched: 100 shares change hands in seconds", tone: "primary" as Tone }
      : gathered
        ? { text: "Buyers and sellers are now in one place", tone: "primary" as Tone }
        : { text: "No buyer to be found — the owner is on their own", tone: "warning" as Tone };

  return (
    <div className="space-y-2.5">
      <div className="grid grid-cols-2 gap-2.5">
        <div className="space-y-1.5">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Sellers</p>
          <Node label="Nimbus owner" detail="wants cash for their shares" active={!gathered} />
        </div>

        <div className="space-y-1.5">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Buyers</p>
          <Node label="Investor A" detail="wants to buy" visible={gathered} active={gathered && !matched} />
          <Node
            label="Investor B"
            detail="wants to buy"
            visible={gathered}
            tone="muted"
          />
        </div>
      </div>

      <p
        className={cn(
          "rounded-lg border px-3 py-2 text-center text-[11px] font-medium transition-colors duration-500 motion-reduce:transition-none",
          TONES[status.tone],
        )}
      >
        {status.text}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        {BENEFITS.map((benefit) => (
          <Benefit key={benefit.label} label={benefit.label} shown={step >= benefit.from} />
        ))}
      </div>
    </div>
  );
}

export function WhyMarketsExist() {
  return (
    <ConceptExplainer
      label="Why a market exists"
      steps={MARKET_STEPS}
      renderStage={(step) => <MarketStage step={step} />}
    />
  );
}

/* -------------------------------------------------- 2. The journey of an order */

const ORDER_STEPS: ExplainerStep[] = [
  {
    title: "Two sides want the same trade",
    text: "You want 100 shares of GreenLeaf Foods Ltd. Another investor wants to sell 100 shares. You never contact each other — the market is what puts the two together.",
  },
  {
    title: "You place the order with your broker",
    text: "You choose the company, the quantity and a price in your broker's app. You cannot reach the exchange directly: the broker is your regulated gateway.",
  },
  {
    title: "The broker checks it, then passes it on",
    text: "The broker verifies that you have the funds, or that the seller has the shares, and sends the order to the exchange.",
  },
  {
    title: "The exchange matches the two orders",
    text: "A buy order and a sell order meet at a price they both accept — 100 shares at ₹248. The moment they match, a trade has happened.",
  },
  {
    title: "Then settlement moves each side",
    text: "The trade is confirmed, and settlement moves the money one way and the shares the other. In India that normally completes on the next working day.",
  },
];

function OrderStage({ step }: { step: number }) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2.5">
        <Node label="You" detail="buy 100 shares" active={step === 0} />
        <Node label="Another investor" detail="sell 100 shares" tone="warning" active={step === 0} />
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <Arrow visible={step >= 1} />
        <Arrow visible={step >= 1} />
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <Node label="Your broker" detail="checks your funds" visible={step >= 1} active={step === 1} />
        <Node
          label="Their broker"
          detail="checks the shares"
          visible={step >= 1}
          active={step === 1}
        />
      </div>

      <Arrow visible={step >= 2} />
      <Node
        label="The exchange"
        detail="matches a buy with a sell"
        visible={step >= 2}
        active={step === 2}
        className="text-center"
      />

      <Arrow visible={step >= 3} />
      <Node
        label="Trade: 100 shares at ₹248"
        detail="the matched price is reported to everyone"
        tone="success"
        visible={step >= 3}
        active={step === 3}
        className="text-center"
      />

      <Arrow visible={step >= 4} />
      <Node
        label="Settlement"
        detail="money one way, shares the other — usually the next working day"
        tone="success"
        visible={step >= 4}
        active={step === 4}
        className="text-center"
      />
    </div>
  );
}

export function OrderJourney() {
  return (
    <ConceptExplainer
      label="The journey of an order"
      steps={ORDER_STEPS}
      renderStage={(step) => <OrderStage step={step} />}
    />
  );
}
