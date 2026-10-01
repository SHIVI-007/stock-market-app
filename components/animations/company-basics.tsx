"use client";

import { cn } from "@/lib/utils";

import { ConceptExplainer, type ExplainerStep } from "./explainer";

/**
 * Chapter 2 — What is a Company?
 *
 * Six explainers covering the chapter's spine: how a company comes to exist,
 * how it earns, how revenue is recorded, how costs behave, how profit is layered,
 * and why a growing business needs outside capital.
 *
 * Every figure here is illustrative and matches the prose in
 * `lib/learning/modules/foundations.ts`.
 */

/* ------------------------------------------------------------------ shared */

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

function Band({
  label,
  detail,
  visible,
  active,
  tone = "muted",
}: {
  label: string;
  detail?: string;
  visible: boolean;
  active?: boolean;
  tone?: "muted" | "primary" | "success" | "warning";
}) {
  const tones = {
    muted: "border-border bg-muted/40",
    primary: "border-primary/40 bg-primary/10",
    success: "border-success/40 bg-success/10",
    warning: "border-warning/40 bg-warning/10",
  } as const;

  return (
    <div
      className={cn(
        "rounded-lg border px-3 py-2 transition-all duration-500 motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
        active ? tones[tone] : "border-border bg-muted/25",
        active && "ring-1 ring-inset ring-current/20",
      )}
    >
      <p className="text-xs font-semibold">{label}</p>
      {detail ? <p className="mt-0.5 text-[11px] text-muted-foreground">{detail}</p> : null}
    </div>
  );
}

/* ------------------------------------------------- 1. How a company is born */

const COMPANY_STEPS: ExplainerStep[] = [
  {
    title: "It starts with an idea",
    text: "A founder sees a problem worth solving. At this point there is no business — only a plan.",
  },
  {
    title: "The idea becomes a business",
    text: "A company is a legal entity, separate from the people who own it. It can sign contracts, own property, hire people, borrow money — and be sued.",
  },
  {
    title: "Growth needs money",
    text: "Expanding usually costs more than the business generates. Factories, hiring and marketing all need cash before they produce any.",
  },
  {
    title: "So it brings in investors",
    text: "People provide that money in exchange for a stake in the business. Because the company is a separate legal entity, their loss is usually capped at what they put in.",
  },
  {
    title: "The stake becomes shares",
    text: "That ownership is divided into shares, which can be bought and sold. Everything that follows in this course builds on this one step.",
  },
];

function CompanyStage({ step }: { step: number }) {
  const stages = [
    { label: "Idea", detail: "a problem worth solving" },
    { label: "Business", detail: "a legal entity, separate from its owners" },
    { label: "Capital needed", detail: "more than the business generates" },
    { label: "Investors", detail: "money in exchange for a stake" },
    { label: "Ownership", detail: "divided into shares" },
  ];

  return (
    <div className="space-y-1">
      {stages.map((stage, index) => (
        <div key={stage.label}>
          {index > 0 ? <Arrow visible={index <= step} /> : null}
          <Band
            label={stage.label}
            detail={stage.detail}
            visible={index <= step}
            active={index === step}
            tone={index === 4 ? "success" : "primary"}
          />
        </div>
      ))}
    </div>
  );
}

export function CompanyJourney() {
  return (
    <ConceptExplainer
      label="From an idea to shares"
      steps={COMPANY_STEPS}
      renderStage={(step) => <CompanyStage step={step} />}
    />
  );
}

/* ------------------------------------------------------- 2. The business loop */

const LOOP_STEPS: ExplainerStep[] = [
  {
    title: "A business is a loop",
    text: "In its simplest form: sell something to customers for more than it costs you to provide it. The detail inside that loop is what makes companies different.",
  },
  {
    title: "Customers pay — that is revenue",
    text: "Revenue is the total collected from customers. It is the top of the income statement, before anything is taken out.",
  },
  {
    title: "Providing it costs money",
    text: "Materials, staff, rent, marketing. These costs were necessary to earn the revenue — they are not optional extras.",
  },
  {
    title: "What remains is profit",
    text: "Revenue minus costs leaves profit, and what is left over can go back into the business or out to the people who own it.",
  },
];

function LoopStage({ step }: { step: number }) {
  const nodes = [
    { label: "Customers pay", detail: "Revenue", tone: "primary" as const },
    { label: "Cost of providing", detail: "Expenses", tone: "warning" as const },
    { label: "What is left", detail: "Profit", tone: "success" as const },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {nodes.map((node, index) => (
          <div
            key={node.label}
            style={{ transitionDelay: `${index * 120}ms` }}
            className={cn(
              "rounded-lg border p-2.5 text-center transition-all duration-500 motion-reduce:transition-none",
              index <= step ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              index === step
                ? "border-primary/40 bg-primary/10"
                : "border-border bg-muted/30",
            )}
          >
            <p className="text-[11px] font-medium">{node.label}</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">{node.detail}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
        <span
          className={cn(
            "transition-opacity duration-500 motion-reduce:transition-none",
            step >= 3 ? "opacity-100" : "opacity-0",
          )}
        >
          ↻ and the loop begins again
        </span>
      </div>
    </div>
  );
}

export function BusinessLoop() {
  return (
    <ConceptExplainer
      label="The business loop"
      steps={LOOP_STEPS}
      renderStage={(step) => <LoopStage step={step} />}
    />
  );
}

/* ------------------------------------------------------ 3. When revenue lands */

const REVENUE_STEPS: ExplainerStep[] = [
  {
    title: "Revenue is the top line",
    text: "It is the total earned from selling goods or services in a period, and it sits at the very top of the income statement — before any cost is subtracted.",
  },
  {
    title: "It is recorded on delivery, not on payment",
    text: "Companies use accrual accounting. Deliver the goods and the revenue is recorded then, whether or not the customer has paid.",
  },
  {
    title: "So revenue can arrive long before the cash",
    text: "Deliver a ₹10 lakh order to a customer who pays in 90 days, and ₹10 lakh of revenue is recorded today while the cash turns up much later.",
  },
  {
    title: "That gap has a name: a receivable",
    text: "The unpaid amount sits on the balance sheet as a receivable. This one rule explains much of the difference between profit and cash, which we return to later.",
  },
];

/** A single dated event on the timeline. */
function TimelineEvent({
  label,
  title,
  note,
  visible,
  labelClass,
  dotClass,
}: {
  label: string;
  title: string;
  note: string;
  visible: boolean;
  labelClass: string;
  dotClass: string;
}) {
  return (
    <div
      className={cn(
        "flex gap-3 transition-all duration-500 motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
      )}
    >
      <span className={cn("mt-1.5 size-2.5 shrink-0 rounded-full", dotClass)} />
      <div className="min-w-0">
        <p className={cn("text-[11px] font-semibold", labelClass)}>{label}</p>
        <p className="text-[11px]">{title}</p>
        <p className="text-[10px] text-muted-foreground">{note}</p>
      </div>
    </div>
  );
}

/**
 * The stretch of time between the two events, drawn as part of the timeline
 * rather than placed alongside it — absolute-positioned labels collide as soon
 * as the stage narrows.
 */
function TimelineGap({ visible }: { visible: boolean }) {
  return (
    <div
      className={cn(
        "flex gap-3 transition-opacity duration-500 motion-reduce:transition-none",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <span className="ml-1 w-0.5 shrink-0 self-stretch bg-warning/60" />
      <p className="self-center py-2 text-[10px] italic text-warning">90 days pass</p>
    </div>
  );
}

function RevenueStage({ step }: { step: number }) {
  const delivered = step >= 1;
  const gapShown = step >= 2;

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-center">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Order value</p>
        <p className="text-lg font-semibold tabular-nums">₹10,00,000</p>
      </div>

      <div className="space-y-1">
        <TimelineEvent
          label="Day 0"
          title="Goods delivered"
          note="₹10,00,000 of revenue recorded today"
          visible={delivered}
          labelClass="text-primary"
          dotClass="bg-primary"
        />

        <TimelineGap visible={gapShown} />

        <TimelineEvent
          label="Day 90"
          title="Customer pays"
          note="₹10,00,000 of cash finally arrives"
          visible={gapShown}
          labelClass="text-foreground"
          dotClass="bg-muted-foreground"
        />
      </div>

      <p
        className={cn(
          "text-center text-[11px] text-muted-foreground transition-opacity duration-500 motion-reduce:transition-none",
          step >= 3 ? "opacity-100" : "opacity-0",
        )}
      >
        For three months the company has the revenue but not the cash — a receivable
      </p>
    </div>
  );
}

export function WhenRevenueLands() {
  return (
    <ConceptExplainer
      label="When revenue is recorded"
      steps={REVENUE_STEPS}
      renderStage={(step) => <RevenueStage step={step} />}
    />
  );
}

/* --------------------------------------------------- 4. How costs behave */

const COST_STEPS: ExplainerStep[] = [
  {
    title: "Two businesses, identical today",
    text: "Same sales, same profit. But one buys most of what it needs as it sells, and the other carries a large fixed cost base.",
  },
  {
    title: "Sales fall 10% in both",
    text: "Nothing else changes. This alone is enough to separate the two businesses very sharply.",
  },
  {
    title: "The variable-cost business barely notices",
    text: "Its costs fall with its sales, because it only buys what it sells. Profit drops only a little.",
  },
  {
    title: "The fixed-cost business is hit hard",
    text: "Rent, plant and salaried staff do not shrink when sales do. The same 10% fall in sales takes a far bigger bite out of profit. This is operating leverage.",
  },
];

function CostStage({ step }: { step: number }) {
  const dropApplied = step >= 1;

  const panels = [
    {
      label: "Mostly variable costs",
      note: "buys what it sells",
      before: 20,
      after: 18,
      change: "−10%",
      tone: "success" as const,
    },
    {
      label: "High fixed costs",
      note: "rent, plant, salaries",
      before: 20,
      after: 12,
      change: "−40%",
      tone: "destructive" as const,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {panels.map((panel, index) => {
          const revealed = index === 0 ? step >= 2 : step >= 3;
          const value = dropApplied ? panel.after : panel.before;

          return (
            <div key={panel.label} className="rounded-lg border border-border bg-muted/25 p-2.5">
              <p className="text-[11px] font-semibold">{panel.label}</p>
              <p className="text-[10px] text-muted-foreground">{panel.note}</p>

              <div className="mt-2 flex h-20 items-end justify-center">
                <div
                  className={cn(
                    "w-10 rounded-t-sm transition-[height] duration-700 motion-reduce:transition-none",
                    panel.tone === "success" ? "bg-success/70" : "bg-destructive/60",
                  )}
                  style={{ height: `${(value / 20) * 100}%` }}
                />
              </div>

              <p className="mt-1.5 text-center text-[11px] font-semibold tabular-nums">
                ₹{value} lakh profit
              </p>

              <p
                className={cn(
                  "text-center text-[10px] font-medium transition-opacity duration-500 motion-reduce:transition-none",
                  revealed ? "opacity-100" : "opacity-0",
                  panel.tone === "success" ? "text-success" : "text-destructive",
                )}
              >
                {panel.change}
              </p>
            </div>
          );
        })}
      </div>

      <p className="text-center text-[11px] text-muted-foreground">
        Revenue ₹100 lakh · profit ₹20 lakh before the fall
      </p>
    </div>
  );
}

export function HowCostsBehave() {
  return (
    <ConceptExplainer
      label="Why the cost mix matters"
      steps={COST_STEPS}
      renderStage={(step) => <CostStage step={step} />}
    />
  );
}

/* --------------------------------------------------- 5. The layers of profit */

const PROFIT_STEPS: ExplainerStep[] = [
  {
    title: "Start with the whole top line",
    text: "₹1,000 crore of revenue. Nothing has been taken out yet. The bar below is that revenue, waiting to be divided.",
  },
  {
    title: "Take out the cost of what was sold",
    text: "Raw materials and direct costs come off the top. What is left is gross profit — it shows the basic economics of what the company sells.",
  },
  {
    title: "Take out operating expenses",
    text: "Salaries, marketing and rent are costs of running the business rather than making the product. What remains is EBITDA, a rough view of operating performance.",
  },
  {
    title: "Take out depreciation",
    text: "Depreciation spreads the cost of long-lived assets over their useful life. Subtracting it gives EBIT — operating profit, the number used to judge the business itself.",
  },
  {
    title: "Finally, interest and tax",
    text: "What survives is net profit — the bottom line available to shareholders. A company can look healthy at one level and unhealthy at another.",
  },
];

function ProfitStage({ step }: { step: number }) {
  // Bottom-to-top, so the bar reads like an income statement worked upwards.
  const bands = [
    { label: "Net profit", share: 7.5, detail: "₹75 crore", revealedAt: 4 },
    { label: "Interest & tax", share: 4.5, detail: "₹45 crore", revealedAt: 4 },
    { label: "Depreciation", share: 3, detail: "₹30 crore", revealedAt: 3 },
    { label: "Operating expenses", share: 25, detail: "₹250 crore", revealedAt: 2 },
    { label: "Cost of goods", share: 60, detail: "₹600 crore", revealedAt: 1 },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-stretch gap-3">
        <div className="flex h-44 w-16 flex-col-reverse overflow-hidden rounded-md border border-border">
          {bands.map((band) => {
            const shown = step >= band.revealedAt;
            const active = step === band.revealedAt;

            return (
              <div
                key={band.label}
                style={{ height: `${band.share}%` }}
                className={cn(
                  "w-full border-t border-background/40 transition-opacity duration-500 motion-reduce:transition-none",
                  active
                    ? "bg-primary"
                    : shown
                      ? "bg-primary/25"
                      : "bg-muted-foreground/15",
                )}
              />
            );
          })}
        </div>

        <div className="flex-1 space-y-1.5">
          {bands
            .slice()
            .reverse()
            .map((band) => (
              <div
                key={band.label}
                className={cn(
                  "flex items-baseline justify-between gap-2 rounded-md px-2 py-1 transition-all duration-500 motion-reduce:transition-none",
                  step === band.revealedAt ? "bg-primary/10" : "bg-transparent",
                  step >= band.revealedAt ? "opacity-100" : "opacity-35",
                )}
              >
                <span className="text-[11px]">{band.label}</span>
                <span className="text-[11px] tabular-nums text-muted-foreground">
                  {band.detail}
                </span>
              </div>
            ))}
        </div>
      </div>

      <p className="text-center text-[11px] text-muted-foreground">
        Revenue ₹1,000 crore — each layer is what the one above it leaves behind
      </p>
    </div>
  );
}

export function ProfitLayers() {
  return (
    <ConceptExplainer
      label="The layers of profit"
      steps={PROFIT_STEPS}
      renderStage={(step) => <ProfitStage step={step} />}
    />
  );
}

/* ------------------------------------------------ 6. Why companies need capital */

const CAPITAL_STEPS: ExplainerStep[] = [
  {
    title: "A profitable business can still run short of cash",
    text: "It may have to pay suppliers and salaries today while customers pay in ninety days. Or it may want to build a plant that takes years to repay. Being profitable and having cash are not the same thing.",
  },
  {
    title: "So the money has to come from somewhere",
    text: "What the business generates is not always enough for what it wants to do next. Closing that gap is what raising capital means.",
  },
  {
    title: "There are two ways to raise it",
    text: "Borrow it from lenders, or sell a share of the business to new owners. The two behave very differently, and choosing between them is one of management's most consequential decisions.",
  },
  {
    title: "Debt is borrowed money",
    text: "It must be repaid with interest, whatever happens to the business. Lenders take no ownership, and have no claim on profits beyond the interest they are owed.",
  },
  {
    title: "Equity is permanent ownership",
    text: "Money from shareholders is never repaid. In exchange they receive a share of the business and of its future profits — including a share of its losses.",
  },
];

/** The shortfall that makes the whole question necessary. */
function CapitalGap() {
  const generated = 100;
  const needed = 180;

  // Percentages of the taller bar, so the green slice of "cash it needs" ends up
  // exactly level with the bar for "cash it generates".
  const generatedHeight = `${(generated / needed) * 100}%`;
  const gapHeight = `${((needed - generated) / needed) * 100}%`;

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-center gap-8">
        <div className="flex flex-col items-center">
          {/* A fixed-height track, so the percentage height below has something
              definite to resolve against and both bars share one scale. */}
          <div className="flex h-36 w-16 items-end">
            <div
              className="w-full rounded-t-sm bg-success/60"
              style={{ height: generatedHeight }}
            />
          </div>
          <p className="mt-1.5 text-[11px] font-semibold tabular-nums">₹{generated} cr</p>
          <p className="text-[10px] text-muted-foreground">cash it generates</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex h-36 w-16 flex-col overflow-hidden rounded-t-sm">
            <div className="w-full bg-warning/60" style={{ height: gapHeight }} />
            <div className="w-full bg-success/60" style={{ height: generatedHeight }} />
          </div>
          <p className="mt-1.5 text-[11px] font-semibold tabular-nums">₹{needed} cr</p>
          <p className="text-[10px] text-muted-foreground">cash it needs</p>
        </div>
      </div>

      <p className="text-center text-[11px] text-muted-foreground">
        the orange slice — ₹80 crore — is the gap capital has to fill
      </p>
    </div>
  );
}

function FundingChoices({ step }: { step: number }) {
  const choices = [
    {
      label: "Debt",
      revealsAt: 3,
      points: ["Borrowed from a lender", "Repaid, with interest", "No ownership given up"],
      tone: "warning" as const,
    },
    {
      label: "Equity",
      revealsAt: 4,
      points: ["Money from shareholders", "Never repaid", "Ownership shared permanently"],
      tone: "primary" as const,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {choices.map((choice) => {
        const shown = step >= choice.revealsAt;

        return (
          <div
            key={choice.label}
            className={cn(
              "rounded-lg border p-3 transition-all duration-500 motion-reduce:transition-none",
              shown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              step === choice.revealsAt
                ? choice.tone === "warning"
                  ? "border-warning/50 bg-warning/5"
                  : "border-primary/50 bg-primary/5"
                : "border-border bg-muted/25",
            )}
          >
            <p className="text-xs font-semibold">{choice.label}</p>
            <ul className="mt-1.5 space-y-1">
              {choice.points.map((point) => (
                <li key={point} className="text-[10px] leading-tight text-muted-foreground">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function CapitalStage({ step }: { step: number }) {
  if (step >= 2) return <FundingChoices step={step} />;
  return <CapitalGap />;
}

export function WhyCapital() {
  return (
    <ConceptExplainer
      label="Why companies need capital"
      steps={CAPITAL_STEPS}
      renderStage={(step) => <CapitalStage step={step} />}
    />
  );
}
