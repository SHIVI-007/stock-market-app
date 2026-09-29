"use client";

import * as React from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Circle,
  Coins,
  Compass,
  Flag,
  Globe2,
  HelpCircle,
  Lightbulb,
  Search,
  TriangleAlert,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ResultTile, SimFrame, SliderField } from "@/components/interactive/controls";
import { cn, formatIndianNumber, formatINR, safeDivide } from "@/lib/utils";
import { applyStockSplit, priceToEarnings, returnOnEquity } from "@/lib/calculations/finance";

/* -------------------------------------------------------------------------- */
/* Corporate actions                                                          */
/* -------------------------------------------------------------------------- */

type ActionKind = "split" | "bonus" | "dividend" | "buyback";

const ACTION_LABELS: Record<ActionKind, string> = {
  split: "Stock split",
  bonus: "Bonus issue",
  dividend: "Dividend",
  buyback: "Buyback",
};

export function CorporateActionSimulator() {
  const [action, setAction] = React.useState<ActionKind>("split");
  const [shares, setShares] = React.useState(100);
  const [price, setPrice] = React.useState(1000);
  const [splitFrom, setSplitFrom] = React.useState(1);
  const [splitTo, setSplitTo] = React.useState(2);

  const split = applyStockSplit(shares, price, splitFrom, splitTo);

  const summary: Record<ActionKind, { before: string[]; after: string[]; note: string }> = {
    split: {
      before: [`${shares} shares`, `${formatINR(price)} per share`, `Total ${formatINR(shares * price)}`],
      after: [
        `${formatIndianNumber(split.newShareCount, 0)} shares`,
        `${formatINR(split.newPrice)} per share`,
        `Total ≈ ${formatINR(split.totalValueAfter)}`,
      ],
      note: "A split divides each share into more shares. The share count rises, the price falls proportionally, and the total value is conceptually unchanged. Real prices are still set by the market.",
    },
    bonus: {
      before: [`${shares} shares`, `${formatINR(price)} per share`],
      after: [
        `${shares + shares} shares (1:1 bonus)`,
        `Price adjusts downward`,
        "No cash changes hands",
      ],
      note: "A bonus issue gives existing shareholders extra shares free, funded from the company's reserves rather than cash. The number of shares rises and the price adjusts.",
    },
    dividend: {
      before: [`${shares} shares`, `${formatINR(price)} per share`],
      after: [
        `You receive cash: ${formatINR(shares * 10)} at ₹10/share`,
        "Share price typically adjusts by the dividend on the ex-date",
        "The company's cash reduces",
      ],
      note: "A dividend moves cash from the company to shareholders. It is not 'free money' — the company is worth less by the amount paid out, all else equal.",
    },
    buyback: {
      before: [`${shares} shares outstanding`, `${formatINR(price)} per share`],
      after: [
        "Fewer shares outstanding",
        "Existing holders own a larger proportion",
        "Company spends cash",
      ],
      note: "In a buyback the company purchases its own shares. Fewer shares remain, so each remaining share represents a larger slice of the company.",
    },
  };

  const current = summary[action];

  return (
    <SimFrame
      title="Corporate action simulator"
      description="See the conceptual before-and-after of the actions companies take that affect their shares."
      icon={<Coins className="size-4 text-primary" />}
      footer={
        <>
          These illustrations show the <strong>conceptual</strong> mechanics. They do not imply any
          particular price will occur — actual market prices reflect everything else happening too.
        </>
      }
    >
      <div className="flex flex-wrap gap-2">
        {(Object.keys(ACTION_LABELS) as ActionKind[]).map((kind) => (
          <Button
            key={kind}
            size="sm"
            variant={action === kind ? "default" : "outline"}
            onClick={() => setAction(kind)}
          >
            {ACTION_LABELS[kind]}
          </Button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <SliderField id="ca-shares" label="Shares you hold" value={shares} onChange={setShares} min={1} max={1000} step={10} />
        <SliderField
          id="ca-price"
          label="Share price"
          unit="₹"
          value={price}
          onChange={setPrice}
          min={10}
          max={5000}
          step={10}
        />
        {action === "split" ? (
          <>
            <SliderField id="ca-from" label="Split ratio — from" value={splitFrom} onChange={setSplitFrom} min={1} max={5} />
            <SliderField id="ca-to" label="Split ratio — to" value={splitTo} onChange={setSplitTo} min={1} max={10} />
          </>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Before
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            {current.before.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-primary/40 bg-primary/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Conceptually after
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            {current.after.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>

      <Alert variant="info">
        <Lightbulb className="size-4" />
        <div>
          <AlertTitle>{ACTION_LABELS[action]}</AlertTitle>
          <AlertDescription>{current.note}</AlertDescription>
        </div>
      </Alert>
    </SimFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* Economic factors                                                           */
/* -------------------------------------------------------------------------- */

const ECONOMIC_FACTORS = [
  {
    id: "rates",
    name: "Interest rates",
    text: "When rates rise, borrowing costs more. Companies with heavy debt feel it first, and future profits are worth less when discounted back. Rate changes also influence where investors are willing to put money.",
  },
  {
    id: "inflation",
    name: "Inflation",
    text: "Rising prices can help businesses that can pass costs on to customers, and hurt those that cannot. It also affects how far a rupee goes for consumers.",
  },
  {
    id: "currency",
    name: "Currency (₹ vs other currencies)",
    text: "A weaker rupee can help exporters (their goods look cheaper abroad) and hurt importers (their inputs cost more). Many large Indian companies earn in dollars and spend in rupees, or the reverse.",
  },
  {
    id: "gdp",
    name: "GDP and economic growth",
    text: "A growing economy usually means more demand for goods and services. A slowdown can show up as weaker volumes and slower revenue growth.",
  },
  {
    id: "commodities",
    name: "Commodity prices",
    text: "The price of oil, metals and agricultural inputs directly affects cost structures. Airlines and paints companies, for example, are sensitive to crude oil prices.",
  },
  {
    id: "employment",
    name: "Employment and wages",
    text: "Jobs and wage growth influence how much households can spend, which feeds into demand for many consumer businesses.",
  },
  {
    id: "policy",
    name: "Government policy and regulation",
    text: "Taxes, subsidies, tariffs and regulation can reshape an industry's economics. Policy changes are often company- or sector-specific.",
  },
  {
    id: "global",
    name: "Global markets",
    text: "Capital and sentiment move across borders. Global risk appetite can influence how foreign investors allocate to Indian equities.",
  },
];

export function EconomicFactorsExplorer() {
  const [activeId, setActiveId] = React.useState(ECONOMIC_FACTORS[0].id);
  const active = ECONOMIC_FACTORS.find((factor) => factor.id === activeId) ?? ECONOMIC_FACTORS[0];

  return (
    <SimFrame
      title="Economic factors explorer"
      description="Broad forces that can affect companies. Select one to see how it can transmit into a business."
      icon={<Globe2 className="size-4 text-primary" />}
      footer={
        <>
          These are <em>channels of influence</em>, not predictions. The direction and size of any
          effect depends on the specific business and the circumstances.
        </>
      }
    >
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {ECONOMIC_FACTORS.map((factor) => (
          <button
            key={factor.id}
            type="button"
            onClick={() => setActiveId(factor.id)}
            aria-pressed={factor.id === activeId}
            className={cn(
              "rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              factor.id === activeId
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:bg-muted/50",
            )}
          >
            {factor.name}
          </button>
        ))}
      </div>

      <div className="animate-fade-in-up rounded-xl border border-border bg-muted/30 p-5">
        <h4 className="font-semibold">{active.name}</h4>
        <p className="mt-1 text-sm text-muted-foreground">{active.text}</p>
      </div>

      <Alert variant="warning">
        <TriangleAlert className="size-4" />
        <div>
          <AlertTitle>No forecasting here</AlertTitle>
          <AlertDescription>
            This lesson teaches how economic factors <em>can</em> flow through to businesses. It does
            not attempt to predict what will happen next.
          </AlertDescription>
        </div>
      </Alert>
    </SimFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* Business model explorer                                                    */
/* -------------------------------------------------------------------------- */

interface BusinessQuestion {
  id: string;
  question: string;
  guidance: string;
  fictional: string;
}

const BUSINESS_QUESTIONS: BusinessQuestion[] = [
  {
    id: "sells",
    question: "What does the company sell?",
    guidance:
      "Describe the product or service in one sentence a ten-year-old would understand. If you cannot, you probably do not understand the business yet.",
    fictional:
      "ABC Manufacturing sells industrial fasteners — bolts, screws and fittings — to construction firms and vehicle makers.",
  },
  {
    id: "pays",
    question: "Who pays?",
    guidance:
      "Identify the actual customer. In business-to-business companies the payer is often not the end user.",
    fictional:
      "ABC sells to other businesses, not to consumers. Its customers are construction contractors and auto-component makers.",
  },
  {
    id: "earns",
    question: "How does it make money?",
    guidance:
      "Is it a one-off sale, a subscription, a fee per transaction, a spread, or a markup on goods?",
    fictional:
      "ABC earns a markup on each shipment of fasteners. Revenue is recognised when goods are delivered to the customer.",
  },
  {
    id: "costs",
    question: "What are its costs?",
    guidance:
      "Separate fixed costs (rent, plant) from variable costs (raw material, freight). Which dominate?",
    fictional:
      "Raw steel is ABC's largest cost and it moves with steel prices. Plant and machinery is a large fixed cost.",
  },
  {
    id: "stay",
    question: "What makes customers stay?",
    guidance:
      "Look for switching costs, long contracts, brand, distribution reach or technical lock-in.",
    fictional:
      "ABC's fasteners are specified into customers' designs, so switching supplier requires re-certification — a mild switching cost.",
  },
  {
    id: "hurt",
    question: "What could hurt the business?",
    guidance:
      "Think about competition, customer concentration, regulation, input prices and technology shifts.",
    fictional:
      "Rising steel prices, a slowdown in construction, or losing a large customer would all hurt ABC. Its top five customers are a significant share of sales.",
  },
];

export function BusinessModelExplorer() {
  const [activeId, setActiveId] = React.useState(BUSINESS_QUESTIONS[0].id);
  const active =
    BUSINESS_QUESTIONS.find((item) => item.id === activeId) ?? BUSINESS_QUESTIONS[0];

  return (
    <SimFrame
      title="Questions to ask about any business"
      description="Six questions that apply to every company, from a street stall to a multinational."
      icon={<Building2 className="size-4 text-primary" />}
      footer={
        <>
          Try answering these for any company you read about. If a question is hard to answer, that
          itself is useful information — it tells you where to dig next.
        </>
      }
    >
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {BUSINESS_QUESTIONS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveId(item.id)}
            aria-pressed={item.id === activeId}
            className={cn(
              "rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              item.id === activeId
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:bg-muted/50",
            )}
          >
            {item.question}
          </button>
        ))}
      </div>

      <div className="animate-fade-in-up space-y-3 rounded-xl border border-border bg-muted/30 p-5">
        <h4 className="font-semibold">{active.question}</h4>
        <p className="text-sm text-muted-foreground">{active.guidance}</p>
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Applied to a fictional company
          </p>
          <p className="mt-1 text-sm">{active.fictional}</p>
        </div>
      </div>
    </SimFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* Fundamental analysis process                                               */
/* -------------------------------------------------------------------------- */

const ANALYSIS_STEPS = [
  { title: "Understand the business", text: "What does it sell, to whom, and how does it earn money?" },
  { title: "Understand the industry", text: "Who are its competitors? What drives demand? Is the industry growing?" },
  { title: "Read the financial statements", text: "Income statement, balance sheet and cash flow, over several years." },
  { title: "Examine growth", text: "Are revenue, profit and EPS growing? For how long, and how steadily?" },
  { title: "Examine profitability", text: "What are the margins and returns on capital? Are they stable or drifting?" },
  { title: "Examine debt", text: "How much debt is there, at what cost, and can cash flows service it?" },
  { title: "Examine cash flow", text: "Does profit convert into cash? What is the free cash flow picture?" },
  { title: "Understand valuation", text: "What is the market already assuming, given the current price?" },
  { title: "Identify risks", text: "What could go wrong, and how would you know it was happening?" },
  { title: "Form an independent view", text: "Write down your own conclusion and the reasoning behind it." },
];

export function AnalysisProcess() {
  const [done, setDone] = React.useState<string[]>([]);

  const toggle = (title: string) =>
    setDone((current) =>
      current.includes(title) ? current.filter((item) => item !== title) : [...current, title],
    );

  const progress = Math.round((done.length / ANALYSIS_STEPS.length) * 100);

  return (
    <SimFrame
      title="A ten-step analysis process"
      description="Tick each step as you work through it. This is a thinking discipline, not an automatic ranking."
      icon={<Compass className="size-4 text-primary" />}
      footer={
        <>
          The process ends with <strong>your own independent view</strong> — not a recommendation
          from an app. Two people can follow the same steps and reasonably reach different
          conclusions.
        </>
      }
    >
      <div className="space-y-2">
        {ANALYSIS_STEPS.map((step, index) => {
          const isDone = done.includes(step.title);
          return (
            <button
              key={step.title}
              type="button"
              onClick={() => toggle(step.title)}
              aria-pressed={isDone}
              className={cn(
                "flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isDone ? "border-success/40 bg-success/10" : "border-border hover:bg-muted/50",
              )}
            >
              {isDone ? (
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" />
              ) : (
                <Circle className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
              )}
              <span>
                <span className="text-sm font-semibold">
                  {index + 1}. {step.title}
                </span>
                <span className="mt-0.5 block text-sm text-muted-foreground">{step.text}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultTile label="Steps completed" value={`${done.length} / ${ANALYSIS_STEPS.length}`} emphasis />
        <ResultTile
          label="Process progress"
          value={`${progress}%`}
          hint={progress === 100 ? "You have a complete draft view" : "Keep going"}
        />
      </div>
    </SimFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* Red flags                                                                  */
/* -------------------------------------------------------------------------- */

const RED_FLAGS = [
  {
    id: "debt",
    name: "Rapid debt growth",
    looks: "Borrowings rising much faster than revenue or profits.",
    matters: "More debt means more interest to service, and less resilience if business slows.",
    investigate: "Why is the company borrowing? Is the new capital earning a return? Can cash flows cover interest?",
  },
  {
    id: "cash",
    name: "Falling cash flow",
    looks: "Operating cash flow declining while the business still reports profits.",
    matters: "Cash pays the bills. Persistent gaps between profit and cash can indicate strain.",
    investigate: "Is cash trapped in receivables or inventory? Are customers paying more slowly?",
  },
  {
    id: "profit-cash",
    name: "Profit rising while cash flow deteriorates",
    looks: "Net profit grows each year but operating cash flow shrinks.",
    matters: "The two should broadly move together over time. A widening gap deserves explanation.",
    investigate: "Look at receivables days, inventory days and revenue-recognition policies.",
  },
  {
    id: "receivables",
    name: "Increasing receivables",
    looks: "Money owed by customers growing faster than sales.",
    matters: "It can mean looser credit to win sales, or difficulty collecting.",
    investigate: "Compare receivable days over several years and read the notes to the accounts.",
  },
  {
    id: "margins",
    name: "Declining margins",
    looks: "Gross or operating margins trending down over several periods.",
    matters: "It may signal rising competition, cost inflation or a changing product mix.",
    investigate: "Is it the whole industry, or just this company? What does management say?",
  },
  {
    id: "dilution",
    name: "Excessive dilution",
    looks: "Share count rising substantially year after year.",
    matters: "Existing holders own a smaller slice, and per-share measures are diluted.",
    investigate: "What was the capital raised used for, and did it produce a return?",
  },
  {
    id: "related-party",
    name: "Large related-party transactions",
    looks: "Significant dealings with businesses connected to promoters or directors.",
    matters: "These are legal and often routine, but they warrant scrutiny of terms and pricing.",
    investigate: "Are transactions at arm's length? Are they disclosed clearly?",
  },
  {
    id: "accounting",
    name: "Unusual accounting changes",
    looks: "Frequent changes in accounting policy, auditors, or a qualified audit opinion.",
    matters: "Changes can be legitimate — or can make comparisons across years unreliable.",
    investigate: "Read the auditor's report and the notes explaining the change.",
  },
  {
    id: "fcf",
    name: "Persistent negative free cash flow",
    looks: "Free cash flow negative for many years without a clear payoff.",
    matters: "A business that continually consumes cash must keep raising more.",
    investigate: "Is the spending building a valuable asset, or merely keeping the lights on?",
  },
];

export function RedFlagsExplorer() {
  const [activeId, setActiveId] = React.useState(RED_FLAGS[0].id);
  const active = RED_FLAGS.find((flag) => flag.id === activeId) ?? RED_FLAGS[0];

  return (
    <SimFrame
      title="Red flags explorer"
      description="Patterns that may warrant further investigation. Click one to see what it looks like and what to check."
      icon={<Flag className="size-4 text-warning" />}
      footer={
        <>
          A flag is a <strong>prompt to investigate</strong>, not proof of wrongdoing. Healthy
          companies sometimes show these patterns for perfectly good reasons.
        </>
      }
    >
      <Alert variant="warning">
        <TriangleAlert className="size-4" />
        <div>
          <AlertTitle>Signals, not verdicts</AlertTitle>
          <AlertDescription>
            Nothing on this list means something is wrong. It means a question is worth asking.
          </AlertDescription>
        </div>
      </Alert>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {RED_FLAGS.map((flag) => (
          <button
            key={flag.id}
            type="button"
            onClick={() => setActiveId(flag.id)}
            aria-pressed={flag.id === activeId}
            className={cn(
              "rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              flag.id === activeId
                ? "border-warning bg-warning/10 text-warning"
                : "border-border hover:bg-muted/50",
            )}
          >
            {flag.name}
          </button>
        ))}
      </div>

      <div className="animate-fade-in-up grid gap-3 rounded-xl border border-border bg-muted/30 p-5 sm:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            What it looks like
          </p>
          <p className="mt-1 text-sm">{active.looks}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Why it may matter
          </p>
          <p className="mt-1 text-sm">{active.matters}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            What to investigate
          </p>
          <p className="mt-1 text-sm">{active.investigate}</p>
        </div>
      </div>
    </SimFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* Case study                                                                 */
/* -------------------------------------------------------------------------- */

const CASE_YEARS = [
  { year: "FY22", revenue: 1000, netProfit: 90, debt: 300, cash: 80, receivables: 150, operatingCashFlow: 110, equity: 500 },
  { year: "FY23", revenue: 1200, netProfit: 110, debt: 420, cash: 70, receivables: 210, operatingCashFlow: 95, equity: 560 },
  { year: "FY24", revenue: 1350, netProfit: 120, debt: 600, cash: 60, receivables: 300, operatingCashFlow: 60, equity: 610 },
];

const CASE_SHARES = 12; // crore shares
const CASE_PRICE = 150; // ₹ per share

interface CaseQuestion {
  id: string;
  question: string;
  answer: string;
}

function buildCaseQuestions(): CaseQuestion[] {
  const first = CASE_YEARS[0];
  const last = CASE_YEARS[CASE_YEARS.length - 1];

  const revenueGrowth =
    ((last.revenue - first.revenue) / first.revenue) * 100;
  const profitGrowth = ((last.netProfit - first.netProfit) / first.netProfit) * 100;
  const debtGrowth = ((last.debt - first.debt) / first.debt) * 100;
  const eps = safeDivide(last.netProfit, CASE_SHARES);
  const pe = priceToEarnings(CASE_PRICE, eps);
  const roe = returnOnEquity(last.netProfit, last.equity);

  return [
    {
      id: "revenue",
      question: "What happened to revenue?",
      answer: `Revenue rose from ₹${first.revenue} crore in FY22 to ₹${last.revenue} crore in FY24 — about ${formatIndianNumber(revenueGrowth, 0)}% over two years. Growth is healthy, and that is the most encouraging line in this data set.`,
    },
    {
      id: "profit",
      question: "Is profit growing?",
      answer: `Net profit rose from ₹${first.netProfit} crore to ₹${last.netProfit} crore (about ${formatIndianNumber(profitGrowth, 0)}%). But notice it is growing more slowly than revenue — revenue grew ${formatIndianNumber(revenueGrowth, 0)}% while profit grew ${formatIndianNumber(profitGrowth, 0)}%. Costs or other charges are taking a larger bite. Worth investigating.`,
    },
    {
      id: "debt",
      question: "What happened to debt?",
      answer: `Debt climbed from ₹${first.debt} crore to ₹${last.debt} crore — about ${formatIndianNumber(debtGrowth, 0)}%. That is much faster than revenue growth. It is not proof of a problem, but it raises a question: what is the borrowed money funding, and is that money earning a return greater than the interest cost?`,
    },
    {
      id: "cash",
      question: "What happened to cash flow?",
      answer: `Operating cash flow fell from ₹${first.operatingCashFlow} crore to ₹${last.operatingCashFlow} crore — while profit rose. Cash going down as profit goes up is one of the classic signals worth investigating. Receivables also rose from ₹${first.receivables} crore to ₹${last.receivables} crore, which may explain part of the gap.`,
    },
    {
      id: "roe",
      question: "What is the company's ROE?",
      answer: `ROE = net profit ÷ shareholders' equity = ₹${last.netProfit} crore ÷ ₹${last.equity} crore = ${roe === null ? "—" : `${formatIndianNumber(roe, 1)}%`}. That looks strong — but remember that rising debt can flatter ROE by shrinking the equity base relative to the business. Read it alongside the debt trend.`,
    },
    {
      id: "pe",
      question: "What is the P/E?",
      answer: `EPS = ₹${last.netProfit} crore ÷ ${CASE_SHARES} crore shares = ₹${eps === null ? "—" : formatIndianNumber(eps, 1)}. P/E = share price ÷ EPS = ₹${CASE_PRICE} ÷ ₹${eps === null ? "—" : formatIndianNumber(eps, 1)} = ${pe === null ? "—" : formatIndianNumber(pe, 1)}x. The number itself tells you nothing until you ask what growth and risk the market might be assuming at that price.`,
    },
    {
      id: "risks",
      question: "What risks should be investigated?",
      answer:
        "Several threads stand out: (1) debt rising far faster than revenue, (2) receivables growing sharply, (3) operating cash flow falling while profit rises. None of these is proof of anything. Each is a question to take to the annual report — read the notes, the auditor's report, and management's commentary on why cash generation is lagging profit.",
    },
  ];
}

export function CaseStudySimulator() {
  const questions = React.useMemo(() => buildCaseQuestions(), []);
  const [revealed, setRevealed] = React.useState<string[]>([]);

  const reveal = (id: string) =>
    setRevealed((current) => (current.includes(id) ? current : [...current, id]));

  const eps = safeDivide(CASE_YEARS[CASE_YEARS.length - 1].netProfit, CASE_SHARES);
  const marketCapValue = CASE_PRICE * CASE_SHARES;

  return (
    <SimFrame
      title="Case study: ABC Manufacturing"
      description="A fictional company with three years of numbers. Investigate it yourself before revealing each answer."
      icon={<Search className="size-4 text-primary" />}
      footer={
        <>
          There is deliberately <strong>no buy/sell conclusion</strong>. The goal is to practise
          asking the right questions and doing the arithmetic, not to be told what to do.
        </>
      }
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>₹ crore</TableHead>
            {CASE_YEARS.map((row) => (
              <TableHead key={row.year} className="text-right">
                {row.year}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {(
            [
              ["Revenue", "revenue"],
              ["Net profit", "netProfit"],
              ["Total debt", "debt"],
              ["Cash", "cash"],
              ["Receivables", "receivables"],
              ["Operating cash flow", "operatingCashFlow"],
              ["Shareholders' equity", "equity"],
            ] as const
          ).map(([label, key]) => (
            <TableRow key={key}>
              <TableCell className="font-medium">{label}</TableCell>
              {CASE_YEARS.map((row) => (
                <TableCell key={row.year} className="text-right font-mono tabular-nums">
                  {formatIndianNumber(row[key], 0)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultTile label="Shares outstanding" value={`${CASE_SHARES} crore`} />
        <ResultTile label="Share price" value={formatINR(CASE_PRICE)} />
        <ResultTile
          label="Market capitalisation"
          value={`₹${formatIndianNumber(marketCapValue, 0)} Cr`}
          hint={`EPS ≈ ₹${eps === null ? "—" : formatIndianNumber(eps, 1)}`}
        />
      </div>

      <div className="space-y-3">
        {questions.map((item) => {
          const isRevealed = revealed.includes(item.id);
          return (
            <div key={item.id} className="rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex items-start justify-between gap-4">
                <p className="flex items-start gap-2 text-sm font-medium">
                  <HelpCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                  {item.question}
                </p>
                {!isRevealed ? (
                  <Button size="sm" variant="secondary" onClick={() => reveal(item.id)}>
                    <ArrowRight className="size-3.5" /> Investigate
                  </Button>
                ) : (
                  <Badge variant="success">Revealed</Badge>
                )}
              </div>
              {isRevealed ? (
                <p className="animate-fade-in-up mt-3 text-sm text-muted-foreground">{item.answer}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </SimFrame>
  );
}
