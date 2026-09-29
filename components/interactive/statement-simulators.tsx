"use client";

import * as React from "react";
import {
  ArrowDown,
  BadgeCheck,
  Banknote,
  FileSpreadsheet,
  Landmark,
  PiggyBank,
  Scale,
  TriangleAlert,
  Wallet,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ResultTile, SimFrame, SliderField } from "@/components/interactive/controls";
import { cn, formatIndianNumber, formatINR, round } from "@/lib/utils";
import { buildBalanceSheet, buildIncomeStatement } from "@/lib/calculations/finance";

/* -------------------------------------------------------------------------- */
/* 1. Income statement simulator                                              */
/* -------------------------------------------------------------------------- */

function StatementRow({
  label,
  value,
  strong,
  indent,
  tone = "default",
  formula,
}: {
  label: string;
  value: number;
  strong?: boolean;
  indent?: boolean;
  tone?: "default" | "success" | "destructive";
  formula?: string;
}) {
  return (
    <TableRow className={cn(strong ? "bg-muted/50" : "")}>
      <TableCell className={cn(indent ? "pl-6" : "", strong ? "font-semibold" : "")}>
        {label}
        {formula ? (
          <span className="ml-2 font-mono text-xs text-muted-foreground">{formula}</span>
        ) : null}
      </TableCell>
      <TableCell
        className={cn(
          "text-right font-mono tabular-nums",
          strong ? "font-semibold" : "",
          tone === "success" ? "text-success" : tone === "destructive" ? "text-destructive" : "",
        )}
      >
        {formatIndianNumber(round(value, 1), 1)}
      </TableCell>
    </TableRow>
  );
}

export function IncomeStatementSimulator() {
  const [revenue, setRevenue] = React.useState(1000);
  const [costOfGoods, setCostOfGoods] = React.useState(400);
  const [operatingExpenses, setOperatingExpenses] = React.useState(200);
  const [depreciation, setDepreciation] = React.useState(100);
  const [interest, setInterest] = React.useState(50);
  const [taxRate, setTaxRate] = React.useState(25);

  const result = buildIncomeStatement({
    revenue,
    costOfGoods,
    operatingExpenses,
    depreciation,
    interest,
    taxRatePercent: taxRate,
  });

  return (
    <SimFrame
      title="Build an income statement"
      description="Change any input and watch the whole statement — and every margin — recalculate."
      icon={<FileSpreadsheet className="size-4 text-primary" />}
      footer={
        <>
          Notice how each layer subtracts a different kind of cost. A company can be profitable at
          the operating level yet lose money at the net level once interest and tax are paid.
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <SliderField id="is-revenue" label="Revenue" unit="₹ Cr" value={revenue} onChange={setRevenue} min={100} max={5000} step={50} />
        <SliderField id="is-cogs" label="Cost of goods / services" unit="₹ Cr" value={costOfGoods} onChange={setCostOfGoods} min={0} max={4000} step={50} />
        <SliderField id="is-opex" label="Operating expenses" unit="₹ Cr" value={operatingExpenses} onChange={setOperatingExpenses} min={0} max={3000} step={25} />
        <SliderField id="is-dep" label="Depreciation" unit="₹ Cr" value={depreciation} onChange={setDepreciation} min={0} max={500} step={10} />
        <SliderField id="is-interest" label="Interest" unit="₹ Cr" value={interest} onChange={setInterest} min={0} max={500} step={10} />
        <SliderField id="is-tax" label="Tax rate" unit="%" value={taxRate} onChange={setTaxRate} min={0} max={40} step={1} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Line item</TableHead>
            <TableHead className="text-right">₹ crore</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <StatementRow label="Revenue" value={result.revenue} strong />
          <StatementRow label="Cost of goods / services" value={-result.costOfGoods} indent tone="destructive" />
          <StatementRow label="Gross profit" value={result.grossProfit} strong formula="Revenue − COGS" />
          <StatementRow label="Operating expenses" value={-result.operatingExpenses} indent tone="destructive" />
          <StatementRow label="EBITDA" value={result.ebitda} strong formula="Gross profit − Opex" />
          <StatementRow label="Depreciation & amortisation" value={-result.depreciation} indent tone="destructive" />
          <StatementRow label="EBIT (operating profit)" value={result.ebit} strong formula="EBITDA − D&A" />
          <StatementRow label="Interest" value={-result.interest} indent tone="destructive" />
          <StatementRow label="Profit before tax" value={result.profitBeforeTax} strong />
          <StatementRow label={`Tax @ ${taxRate}%`} value={-result.tax} indent tone="destructive" />
          <StatementRow label="Net profit" value={result.netProfit} strong tone="success" />
        </TableBody>
      </Table>

      <div className="grid gap-4 sm:grid-cols-4">
        <ResultTile label="Gross margin" value={result.grossMargin === null ? "—" : `${formatIndianNumber(result.grossMargin, 1)}%`} />
        <ResultTile label="EBITDA margin" value={result.ebitdaMargin === null ? "—" : `${formatIndianNumber(result.ebitdaMargin, 1)}%`} />
        <ResultTile label="Operating margin" value={result.operatingMargin === null ? "—" : `${formatIndianNumber(result.operatingMargin, 1)}%`} />
        <ResultTile label="Net margin" value={result.netProfitMargin === null ? "—" : `${formatIndianNumber(result.netProfitMargin, 1)}%`} emphasis />
      </div>
    </SimFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Balance sheet builder                                                   */
/* -------------------------------------------------------------------------- */

export function BalanceSheetBuilder() {
  const [cash, setCash] = React.useState(150);
  const [inventory, setInventory] = React.useState(200);
  const [receivables, setReceivables] = React.useState(150);
  const [property, setProperty] = React.useState(500);
  const [loans, setLoans] = React.useState(300);
  const [payables, setPayables] = React.useState(100);
  const [shareCapital, setShareCapital] = React.useState(100);
  const [reserves, setReserves] = React.useState(500);

  const sheet = buildBalanceSheet({
    cash,
    inventory,
    receivables,
    property,
    investments: 0,
    loans,
    payables,
    otherLiabilities: 0,
    shareCapital,
    reserves,
  });

  const autoBalance = () => {
    // Adjust reserves so that Assets = Liabilities + Equity exactly.
    const requiredEquity = sheet.totalAssets - sheet.liabilities;
    setReserves(Math.max(0, round(requiredEquity - shareCapital, 2)));
  };

  return (
    <SimFrame
      title="Balance sheet builder"
      description="Assets must always equal liabilities plus equity. Move the sliders and try to keep it balanced."
      icon={<Scale className="size-4 text-primary" />}
      footer={
        <>
          The accounting equation — <span className="font-mono">Assets = Liabilities + Equity</span>{" "}
          — is not a rule companies may choose to follow. It is what the terms <em>mean</em>. A sheet
          that does not balance is not a real statement; it signals an error or an omission.
        </>
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-5">
          <h4 className="flex items-center gap-2 text-sm font-semibold">
            <Wallet className="size-4 text-primary" /> Assets
          </h4>
          <SliderField id="bs-cash" label="Cash" unit="₹ Cr" value={cash} onChange={setCash} min={0} max={1000} step={10} />
          <SliderField id="bs-inventory" label="Inventory" unit="₹ Cr" value={inventory} onChange={setInventory} min={0} max={1000} step={10} />
          <SliderField id="bs-recv" label="Receivables" unit="₹ Cr" value={receivables} onChange={setReceivables} min={0} max={1000} step={10} />
          <SliderField id="bs-property" label="Property & equipment" unit="₹ Cr" value={property} onChange={setProperty} min={0} max={2000} step={25} />
        </div>

        <div className="space-y-5">
          <h4 className="flex items-center gap-2 text-sm font-semibold">
            <Landmark className="size-4 text-primary" /> Liabilities & equity
          </h4>
          <SliderField id="bs-loans" label="Loans (debt)" unit="₹ Cr" value={loans} onChange={setLoans} min={0} max={2000} step={25} />
          <SliderField id="bs-payables" label="Payables" unit="₹ Cr" value={payables} onChange={setPayables} min={0} max={1000} step={10} />
          <SliderField id="bs-capital" label="Share capital" unit="₹ Cr" value={shareCapital} onChange={setShareCapital} min={0} max={1000} step={10} />
          <SliderField id="bs-reserves" label="Reserves & retained earnings" unit="₹ Cr" value={reserves} onChange={setReserves} min={0} max={2000} step={10} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultTile label="Total assets" value={`₹${formatIndianNumber(sheet.totalAssets)} Cr`} />
        <ResultTile
          label="Liabilities + equity"
          value={`₹${formatIndianNumber(sheet.liabilitiesPlusEquity)} Cr`}
        />
        <ResultTile
          label={sheet.balanced ? "Balanced" : "Out of balance by"}
          value={sheet.balanced ? "✓ Balanced" : `₹${formatIndianNumber(Math.abs(sheet.imbalance))} Cr`}
          tone={sheet.balanced ? "success" : "destructive"}
          emphasis
        />
      </div>

      {!sheet.balanced ? (
        <Alert variant="warning">
          <TriangleAlert className="size-4" />
          <div className="flex w-full items-start justify-between gap-4">
            <div>
              <AlertTitle>Assets ≠ Liabilities + Equity</AlertTitle>
              <AlertDescription>
                The two sides differ by {formatINR(Math.abs(sheet.imbalance))} crore. In a real
                statement this cannot happen — something would have to change elsewhere.
              </AlertDescription>
            </div>
            <Button size="sm" variant="secondary" onClick={autoBalance}>
              <BadgeCheck className="size-3.5" /> Auto-balance
            </Button>
          </div>
        </Alert>
      ) : (
        <Alert variant="success">
          <BadgeCheck className="size-4" />
          <div>
            <AlertTitle>Balanced</AlertTitle>
            <AlertDescription>
              Assets of ₹{formatIndianNumber(sheet.totalAssets)} crore are exactly funded by ₹
              {formatIndianNumber(sheet.liabilities)} crore of liabilities and ₹
              {formatIndianNumber(sheet.equity)} crore of equity.
            </AlertDescription>
          </div>
        </Alert>
      )}
    </SimFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Cash flow explorer                                                      */
/* -------------------------------------------------------------------------- */

export function CashFlowExplorer() {
  const [operating, setOperating] = React.useState(300);
  const [capex, setCapex] = React.useState(120);
  const [investments, setInvestments] = React.useState(-50);
  const [debtRaised, setDebtRaised] = React.useState(100);
  const [dividendsPaid, setDividendsPaid] = React.useState(-40);
  const [openingCash, setOpeningCash] = React.useState(150);

  const investing = -capex + investments;
  const financing = debtRaised + dividendsPaid;
  const netChange = operating + investing + financing;
  const closingCash = openingCash + netChange;

  const sections = [
    {
      title: "Operating activities",
      icon: <Banknote className="size-4" />,
      value: operating,
      description: "Cash from the everyday running of the business — selling goods, paying suppliers and staff.",
    },
    {
      title: "Investing activities",
      icon: <PiggyBank className="size-4" />,
      value: investing,
      description: "Cash used to buy or sell long-term assets and investments — like building a factory.",
    },
    {
      title: "Financing activities",
      icon: <Landmark className="size-4" />,
      value: financing,
      description: "Cash from or returned to lenders and shareholders — debt, equity, dividends.",
    },
  ];

  return (
    <SimFrame
      title="Cash flow explorer"
      description="Profit is an opinion; cash is a fact. See how the three cash flow sections combine."
      icon={<Banknote className="size-4 text-primary" />}
      footer={
        <>
          A business can be profitable on paper yet run short of cash — for example if customers pay
          late, or if it has spent heavily on new equipment. This is why the cash flow statement
          matters alongside the income statement.
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <SliderField id="cf-op" label="Operating cash flow" unit="₹ Cr" value={operating} onChange={setOperating} min={-200} max={1000} step={10} />
        <SliderField id="cf-capex" label="Capital expenditure" unit="₹ Cr" value={capex} onChange={setCapex} min={0} max={800} step={10} />
        <SliderField id="cf-inv" label="Other investments (net)" unit="₹ Cr" value={investments} onChange={setInvestments} min={-500} max={500} step={10} />
        <SliderField id="cf-debt" label="Debt raised (net)" unit="₹ Cr" value={debtRaised} onChange={setDebtRaised} min={-500} max={800} step={10} />
        <SliderField id="cf-div" label="Dividends paid" unit="₹ Cr" value={dividendsPaid} onChange={setDividendsPaid} min={-500} max={0} step={10} />
        <SliderField id="cf-open" label="Opening cash" unit="₹ Cr" value={openingCash} onChange={setOpeningCash} min={0} max={1000} step={10} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {sections.map((section) => (
          <div key={section.title} className="rounded-xl border border-border bg-muted/30 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <span className="text-primary">{section.icon}</span>
              {section.title}
            </div>
            <p
              className={cn(
                "mt-2 text-2xl font-semibold tabular-nums",
                section.value >= 0 ? "text-success" : "text-destructive",
              )}
            >
              {section.value >= 0 ? "+" : "−"}₹{formatIndianNumber(Math.abs(section.value))} Cr
            </p>
            <p className="mt-2 text-xs text-muted-foreground">{section.description}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultTile label="Opening cash" value={`₹${formatIndianNumber(openingCash)} Cr`} />
        <ResultTile
          label="Net change in cash"
          value={`${netChange >= 0 ? "+" : "−"}₹${formatIndianNumber(Math.abs(netChange))} Cr`}
          tone={netChange >= 0 ? "success" : "destructive"}
        />
        <ResultTile label="Closing cash" value={`₹${formatIndianNumber(closingCash)} Cr`} emphasis />
      </div>

      {closingCash < 0 ? (
        <Alert variant="destructive">
          <TriangleAlert className="size-4" />
          <div>
            <AlertTitle>Cash went negative</AlertTitle>
            <AlertDescription>
              In reality a company cannot hold negative cash — it would need to borrow more, raise
              money, or delay payments. This is precisely how cash-flow trouble begins.
            </AlertDescription>
          </div>
        </Alert>
      ) : null}
    </SimFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Profit vs cash flow                                                     */
/* -------------------------------------------------------------------------- */

export function ProfitVsCashFlowSimulator() {
  const [creditSales, setCreditSales] = React.useState(800);
  const [collectedPercent, setCollectedPercent] = React.useState(40);
  const [costsPaid, setCostsPaid] = React.useState(500);
  const [depreciation, setDepreciation] = React.useState(80);

  // --- Accounting view ---
  const revenue = creditSales;
  const accountingExpenses = costsPaid + depreciation;
  const profit = revenue - accountingExpenses;

  // --- Cash view ---
  const cashCollected = creditSales * (collectedPercent / 100);
  const cashFlow = cashCollected - costsPaid;

  const receivables = creditSales - cashCollected;

  return (
    <SimFrame
      title="Why profit and cash flow differ"
      description="Sell on credit and you can record revenue now while the cash arrives much later."
      icon={<Scale className="size-4 text-primary" />}
      footer={
        <>
          Profit is recorded when the sale happens (accrual accounting). Cash is recorded when money
          actually moves. Neither is “wrong” — but a business survives on cash, so the gap between
          the two deserves attention.
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <SliderField id="pvcf-sales" label="Sales made on credit" unit="₹ Cr" value={creditSales} onChange={setCreditSales} min={0} max={2000} step={50} />
        <SliderField id="pvcf-collected" label="Amount collected from customers" unit="%" value={collectedPercent} onChange={setCollectedPercent} min={0} max={100} step={5} />
        <SliderField id="pvcf-costs" label="Costs actually paid in cash" unit="₹ Cr" value={costsPaid} onChange={setCostsPaid} min={0} max={2000} step={50} />
        <SliderField id="pvcf-dep" label="Depreciation (non-cash)" unit="₹ Cr" value={depreciation} onChange={setDepreciation} min={0} max={300} step={10} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-chart-2/40 bg-chart-2/10 p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Accounting view</p>
          <p className="mt-1 text-3xl font-semibold tabular-nums">
            ₹{formatIndianNumber(profit)} Cr
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Revenue {formatIndianNumber(revenue)} − expenses {formatIndianNumber(accountingExpenses)}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Profit is recorded as soon as the sale is made, whether or not cash has arrived.
          </p>
        </div>

        <div className="rounded-xl border border-chart-1/40 bg-chart-1/10 p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Cash view</p>
          <p
            className={cn(
              "mt-1 text-3xl font-semibold tabular-nums",
              cashFlow >= 0 ? "text-success" : "text-destructive",
            )}
          >
            ₹{formatIndianNumber(cashFlow)} Cr
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Collected {formatIndianNumber(cashCollected)} − paid {formatIndianNumber(costsPaid)}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Depreciation is subtracted from profit, but no cash actually left the business.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultTile
          label="Difference between profit and cash"
          value={`₹${formatIndianNumber(profit - cashFlow)} Cr`}
          emphasis
        />
        <ResultTile
          label="Stuck in receivables"
          value={`₹${formatIndianNumber(receivables)} Cr`}
          hint="Sales recorded but not yet collected"
        />
      </div>

      <Alert variant="info">
        <ArrowDown className="size-4" />
        <div>
          <AlertTitle>The three classic reasons for a profit–cash gap</AlertTitle>
          <AlertDescription>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              <li>
                <strong>Receivables:</strong> sales recorded, cash not yet collected.
              </li>
              <li>
                <strong>Inventory:</strong> cash spent building stock that has not been sold yet.
              </li>
              <li>
                <strong>Depreciation:</strong> a non-cash expense that lowers profit without using cash.
              </li>
            </ul>
          </AlertDescription>
        </div>
      </Alert>
    </SimFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Working capital simulator                                               */
/* -------------------------------------------------------------------------- */

export function WorkingCapitalSimulator() {
  const [receivables, setReceivables] = React.useState(200);
  const [inventory, setInventory] = React.useState(150);
  const [payables, setPayables] = React.useState(120);

  const currentAssetsExCash = receivables + inventory;
  const workingCapital = currentAssetsExCash - payables;

  return (
    <SimFrame
      title="Working capital simulator"
      description="Working capital is the money tied up in the day-to-day running of a business."
      icon={<Wallet className="size-4 text-primary" />}
      footer={
        <>
          A business that ties up a lot of cash in receivables and inventory needs funding to bridge
          the gap. A business that collects quickly (and pays suppliers slowly) needs less.
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <SliderField id="wc-recv" label="Receivables (owed to you)" unit="₹ Cr" value={receivables} onChange={setReceivables} min={0} max={800} step={10} />
        <SliderField id="wc-inv" label="Inventory (stock held)" unit="₹ Cr" value={inventory} onChange={setInventory} min={0} max={800} step={10} />
        <SliderField id="wc-pay" label="Payables (you owe)" unit="₹ Cr" value={payables} onChange={setPayables} min={0} max={800} step={10} />
      </div>

      <div className="space-y-4 rounded-xl border border-border bg-muted/30 p-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Money tied up in the business</span>
          <span className="font-mono font-medium">₹{formatIndianNumber(currentAssetsExCash)} Cr</span>
        </div>
        <Progress
          value={Math.min(100, (currentAssetsExCash / (currentAssetsExCash + payables || 1)) * 100)}
          className="h-3"
          indicatorClassName="bg-chart-3"
        />
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Funded by suppliers (payables)</span>
          <span className="font-mono font-medium">₹{formatIndianNumber(payables)} Cr</span>
        </div>
        <Progress
          value={Math.min(100, (payables / (currentAssetsExCash + payables || 1)) * 100)}
          className="h-3"
          indicatorClassName="bg-chart-1"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultTile
          label="Working capital"
          value={`₹${formatIndianNumber(workingCapital)} Cr`}
          emphasis
          tone={workingCapital < 0 ? "warning" : "default"}
        />
        <ResultTile
          label="Interpretation"
          value={workingCapital >= 0 ? "Cash tied up" : "Suppliers fund operations"}
          hint="Receivables + inventory − payables"
        />
      </div>

      <Alert variant="info">
        <Badge variant="secondary" className="mt-0.5">Note</Badge>
        <div>
          <AlertTitle>Sell now, get paid later</AlertTitle>
          <AlertDescription>
            When a company sells on credit, revenue is recorded immediately, but the cash sits in
            receivables until the customer pays. Rising receivables without rising sales is one of
            the signals worth investigating in later chapters.
          </AlertDescription>
        </div>
      </Alert>
    </SimFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. How the three statements connect                                        */
/* -------------------------------------------------------------------------- */

const STATEMENTS = [
  {
    id: "income",
    title: "Income statement",
    question: "Did the business make a profit this period?",
    details: [
      "Covers a period of time (e.g. a quarter or a year).",
      "Starts with revenue and subtracts costs step by step.",
      "Ends at net profit — which flows into retained earnings on the balance sheet.",
    ],
  },
  {
    id: "balance",
    title: "Balance sheet",
    question: "What does the business own and owe at a point in time?",
    details: [
      "A snapshot on a single date, not a period.",
      "Assets = Liabilities + Equity, always.",
      "Retained earnings from the income statement increase equity.",
    ],
  },
  {
    id: "cash",
    title: "Cash flow statement",
    question: "Where did the cash actually come from and go?",
    details: [
      "Covers the same period as the income statement.",
      "Split into operating, investing and financing activities.",
      "Ends by reconciling opening cash to closing cash on the balance sheet.",
    ],
  },
];

export function FinancialStatementsDiagram() {
  const [active, setActive] = React.useState("income");
  const current = STATEMENTS.find((item) => item.id === active) ?? STATEMENTS[0];

  return (
    <SimFrame
      title="The three statements are one story"
      description="Each statement answers a different question — together they describe the whole business."
      icon={<FileSpreadsheet className="size-4 text-primary" />}
      footer={
        <>
          A single statement in isolation can mislead. Read the three together and they cross-check
          each other.
        </>
      }
    >
      <div className="grid gap-3 sm:grid-cols-3">
        {STATEMENTS.map((statement) => (
          <button
            key={statement.id}
            type="button"
            onClick={() => setActive(statement.id)}
            className={cn(
              "rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active === statement.id
                ? "border-primary bg-primary/10"
                : "border-border hover:bg-muted/50",
            )}
            aria-pressed={active === statement.id}
          >
            <p className="font-semibold">{statement.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{statement.question}</p>
          </button>
        ))}
      </div>

      <div className="animate-fade-in-up rounded-xl border border-border bg-muted/30 p-5">
        <h4 className="font-semibold">{current.title}</h4>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
          {current.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground sm:flex-row sm:justify-center sm:gap-4">
        <span>Net profit</span>
        <ArrowDown className="size-4 sm:-rotate-90" />
        <span>Retained earnings (equity)</span>
        <ArrowDown className="size-4 sm:-rotate-90" />
        <span>Cash flow reconciliation</span>
      </div>
    </SimFrame>
  );
}
