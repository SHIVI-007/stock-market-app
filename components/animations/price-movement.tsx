"use client";

import { cn } from "@/lib/utils";

import { ConceptExplainer, type ExplainerStep } from "./explainer";

/**
 * Chapter 9, lesson 2 — what else moves prices.
 *
 * The lesson lists five forces, and the risk in animating them is that it turns
 * into "this force pushes the price up", which is a forecast. So the stage ends
 * where the previous lesson did: every one of these forces works by changing
 * how many people want to buy and how many want to sell.
 */

const FORCES = [
  {
    label: "Expectations",
    detail: "prices reflect what investors expect a company to earn",
  },
  {
    label: "Earnings",
    detail: "reported results are measured against what was expected",
  },
  {
    label: "News",
    detail: "a product, a contract, a lawsuit or a change of leadership",
  },
  {
    label: "Interest rates",
    detail: "borrowing costs rise, and deposits pay more",
  },
  {
    label: "The economy",
    detail: "growth, inflation, jobs and government policy",
  },
];

const STEPS: ExplainerStep[] = [
  {
    title: "Expectations",
    text: "A price reflects what investors expect a company to earn in the future, not only what it earned last year. When those expectations change, so does the price.",
  },
  {
    title: "Earnings",
    text: "When results are published, investors compare them with what they expected. A good result that is worse than the expectation can still move the price — the comparison is what counts.",
  },
  {
    title: "News",
    text: "A new product, a large contract, a lawsuit, a new chief executive or a scandal all change how investors value the business.",
  },
  {
    title: "Interest rates",
    text: "Higher rates make borrowing more expensive and make alternatives such as deposits more attractive, which can make shares less appealing. Lower rates can do the reverse.",
  },
  {
    title: "The economy",
    text: "Growth, inflation, employment and government policy affect how much money people have and how confident they feel. These move whole markets, not just one company.",
  },
  {
    title: "Every one of them works through the same door",
    text: "None of these forces moves a price directly. Each one works by changing how many people want to buy and how many want to sell — the tug of war from the previous lesson. They also arrive together, which is one reason prices are so hard to predict.",
  },
];

function ForceStage({ step }: { step: number }) {
  const converged = step >= FORCES.length;

  return (
    <div className="space-y-1.5">
      {FORCES.map((force, index) => (
        <div
          key={force.label}
          className={cn(
            "rounded-lg border px-2.5 py-1.5 transition-all duration-500 motion-reduce:transition-none",
            step >= index ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
            step === index ? "border-primary/40 bg-primary/10" : "border-border bg-muted/25",
          )}
        >
          <p className="text-[11px] font-semibold">{force.label}</p>
          <p className="text-[10px] leading-tight text-muted-foreground">{force.detail}</p>
        </div>
      ))}

      <div
        aria-hidden="true"
        className={cn(
          "mx-auto h-4 w-px bg-border transition-opacity duration-500 motion-reduce:transition-none",
          converged ? "opacity-100" : "opacity-0",
        )}
      />

      <div
        className={cn(
          "rounded-lg border px-3 py-2 text-center transition-all duration-500 motion-reduce:transition-none",
          converged
            ? "translate-y-0 border-primary/40 bg-primary/10 opacity-100"
            : "translate-y-1 opacity-0",
        )}
      >
        <p className="text-[11px] font-semibold">The balance of buyers and sellers</p>
        <p className="mt-0.5 text-[10px] text-muted-foreground">
          every force above arrives here — and that balance is the price
        </p>
      </div>
    </div>
  );
}

export function WhatMovesPrices() {
  return (
    <ConceptExplainer
      label="What moves a share price"
      steps={STEPS}
      renderStage={(step) => <ForceStage step={step} />}
    />
  );
}
