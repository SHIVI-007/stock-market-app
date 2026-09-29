"use client";

import * as React from "react";
import {
  ArrowRight,
  BadgeIndianRupee,
  Building2,
  Coins,
  Landmark,
  Percent,
  PiggyBank,
  PieChart,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from "recharts";

import { MeterBar, ResultTile, SimFrame, SliderField } from "@/components/interactive/controls";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn, formatIndianNumber, formatINR, round, safeDivide } from "@/lib/utils";
import { futureValue, marketCap } from "@/lib/calculations/finance";

/* -------------------------------------------------------------------------- */
/* 1. Money flow — where does a salary go?                                    */
/* -------------------------------------------------------------------------- */

export function MoneyFlow() {
  const [salary, setSalary] = React.useState(50000);
  const [expenses, setExpenses] = React.useState(30000);
  const [savings, setSavings] = React.useState(10000);
  const [investments, setInvestments] = React.useState(10000);

  const allocated = expenses + savings + investments;
  const unallocated = salary - allocated;
  const overAllocated = unallocated < 0;

  const pct = (part: number) =>
    salary > 0 ? `${Math.round((Math.max(0, part) / salary) * 100)}%` : "—";

  return (
    <SimFrame
      title="Where does your money go?"
      description="A salary is not a single number — it is a set of choices. Move the sliders to allocate ₹"
      icon={<Wallet className="size-4 text-primary" />}
      footer={
        <>
          Money that is spent is gone. Money kept as cash is <em>safe but idle</em>. Money invested
          is <em>put to work</em> — and carries risk. This lesson is about the categories, not about
          picking one.
        </>
      }
    >
      <SliderField
        id="salary"
        label="Monthly income"
        unit="₹"
        value={salary}
        onChange={setSalary}
        min={10000}
        max={200000}
        step={1000}
        display={(v) => `₹${formatIndianNumber(v)}`}
      />

      <div className="grid gap-5 sm:grid-cols-3">
        <SliderField
          id="expenses"
          label="Expenses"
          unit="₹"
          value={expenses}
          onChange={setExpenses}
          min={0}
          max={200000}
          step={1000}
          display={(v) => `₹${formatIndianNumber(v)}`}
        />
        <SliderField
          id="savings"
          label="Savings"
          unit="₹"
          value={savings}
          onChange={setSavings}
          min={0}
          max={200000}
          step={1000}
          display={(v) => `₹${formatIndianNumber(v)}`}
        />
        <SliderField
          id="investments"
          label="Investments"
          unit="₹"
          value={investments}
          onChange={setInvestments}
          min={0}
          max={200000}
          step={1000}
          display={(v) => `₹${formatIndianNumber(v)}`}
        />
      </div>

      <MeterBar
        segments={[
          { label: `Expenses ${pct(expenses)}`, value: expenses, className: "bg-chart-3" },
          { label: `Savings ${pct(savings)}`, value: savings, className: "bg-chart-5" },
          { label: `Investments ${pct(investments)}`, value: investments, className: "bg-primary" },
          {
            label: `Unallocated ${pct(unallocated)}`,
            value: Math.max(0, unallocated),
            className: "bg-muted-foreground/40",
          },
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultTile
          label="Allocated"
          value={formatINR(allocated)}
          hint={`${pct(allocated)} of income`}
        />
        <ResultTile
          label={overAllocated ? "Overspent by" : "Still unallocated"}
          value={formatINR(Math.abs(unallocated))}
          tone={overAllocated ? "destructive" : "default"}
          emphasis={!overAllocated && unallocated > 0}
        />
      </div>
    </SimFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Saving vs investing                                                     */
/* -------------------------------------------------------------------------- */

/** Assumed rate on money kept as cash. Illustrative only. */
const CASH_RATE_PERCENT = 3;

export function SavingVsInvesting() {
  const [amount, setAmount] = React.useState(100000);
  const [invested, setInvested] = React.useState(60000);
  const [years, setYears] = React.useState(10);
  const [returnRate, setReturnRate] = React.useState(12);

  const cashKept = Math.max(0, amount - invested);

  const series = React.useMemo(() => {
    return Array.from({ length: years + 1 }, (_, year) => ({
      year,
      Cash: Math.round(futureValue(cashKept, CASH_RATE_PERCENT, year)),
      Invested: Math.round(futureValue(invested, returnRate, year)),
    }));
  }, [cashKept, invested, years, returnRate]);

  const finalCash = futureValue(cashKept, CASH_RATE_PERCENT, years);
  const finalInvested = futureValue(invested, returnRate, years);
  const totalCashPath = futureValue(amount, CASH_RATE_PERCENT, years);
  const totalInvestedPath = futureValue(amount, returnRate, years);

  return (
    <SimFrame
      title="Saving vs Investing"
      description="Split a lump sum between cash and a hypothetical investment, then see how time changes the picture."
      icon={<PiggyBank className="size-4 text-primary" />}
      footer={
        <>
          This is a <strong>hypothetical illustration</strong>, not a forecast. Real investments do
          not grow in a smooth line — they rise and fall, and can lose value. The point is the
          concept of compounding, and the trade-off between certainty and potential growth.
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <SliderField
          id="amount"
          label="Amount you have"
          unit="₹"
          value={amount}
          onChange={(v) => {
            setAmount(v);
            setInvested(Math.min(invested, v));
          }}
          min={10000}
          max={1000000}
          step={10000}
          display={(v) => `₹${formatIndianNumber(v)}`}
        />
        <SliderField
          id="invested"
          label="Amount invested"
          unit="₹"
          value={Math.min(invested, amount)}
          onChange={setInvested}
          min={0}
          max={amount}
          step={5000}
          display={(v) => `₹${formatIndianNumber(v)}`}
        />
        <SliderField
          id="years"
          label="Time horizon"
          unit="years"
          value={years}
          onChange={setYears}
          min={1}
          max={30}
        />
        <SliderField
          id="return"
          label="Assumed investment return"
          unit="% p.a."
          value={returnRate}
          onChange={setReturnRate}
          min={-5}
          max={20}
        />
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              tickFormatter={(v) => `${v}y`}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              tickFormatter={(v) => `₹${Math.round(v / 1000)}k`}
              width={56}
            />
            <RechartsTooltip
              formatter={(value) => formatINR(Number(value))}
              labelFormatter={(label) => `After ${label} years`}
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                fontSize: 12,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Line
              type="monotone"
              dataKey="Cash"
              stroke="var(--chart-5)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="Invested"
              stroke="var(--chart-1)"
              strokeWidth={2.5}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultTile
          label="Cash kept in hand today"
          value={formatINR(cashKept)}
          hint={`Grows at an assumed ${CASH_RATE_PERCENT}% p.a.`}
        />
        <ResultTile
          label="Invested portion today"
          value={formatINR(invested)}
          hint={`Assumed ${returnRate}% p.a.`}
        />
        <ResultTile
          label={`Difference after ${years} years`}
          value={formatINR(finalInvested - finalCash)}
          emphasis
          hint="Invested value minus cash value (if both assumptions held)"
        />
      </div>

      <Alert variant="warning">
        <Percent className="size-4" />
        <div>
          <AlertTitle>Use assumptions carefully</AlertTitle>
          <AlertDescription>
            A smooth {returnRate}% line is a teaching device. If this were fully invested, the
            same {formatINR(amount)} would show as {formatINR(totalInvestedPath)} versus{" "}
            {formatINR(totalCashPath)} in cash — but only under a fixed-return assumption that never
            happens in real markets.
          </AlertDescription>
        </div>
      </Alert>
    </SimFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. Asset class explorer                                                    */
/* -------------------------------------------------------------------------- */

interface AssetClass {
  id: string;
  name: string;
  blurb: string;
  characteristics: { label: string; value: string }[];
}

const ASSET_CLASSES: AssetClass[] = [
  {
    id: "stocks",
    name: "Stocks (Equity)",
    blurb:
      "A small ownership stake in a company. You share in its profits and its problems.",
    characteristics: [
      { label: "Ownership", value: "Yes — partial owner" },
      { label: "Return source", value: "Price change + dividends" },
      { label: "Typical risk", value: "Higher, can be volatile" },
      { label: "Liquidity", value: "High on listed exchanges" },
    ],
  },
  {
    id: "bonds",
    name: "Bonds (Debt)",
    blurb: "A loan you make to a government or company. They owe you interest and principal.",
    characteristics: [
      { label: "Ownership", value: "No — you are a lender" },
      { label: "Return source", value: "Interest payments" },
      { label: "Typical risk", value: "Lower than equity (issuer dependent)" },
      { label: "Liquidity", value: "Varies by instrument" },
    ],
  },
  {
    id: "mutual-funds",
    name: "Mutual Funds",
    blurb: "A pooled vehicle that invests on behalf of many investors, managed by a fund house.",
    characteristics: [
      { label: "Ownership", value: "Units in a pooled fund" },
      { label: "Return source", value: "Depends on what the fund holds" },
      { label: "Typical risk", value: "Depends on the underlying assets" },
      { label: "Liquidity", value: "Usually daily at NAV" },
    ],
  },
  {
    id: "etfs",
    name: "ETFs",
    blurb: "A basket of securities that trades on an exchange like a single share.",
    characteristics: [
      { label: "Ownership", value: "Units in a basket fund" },
      { label: "Return source", value: "Tracks an index or theme" },
      { label: "Typical risk", value: "Mirrors the underlying basket" },
      { label: "Liquidity", value: "Trades during market hours" },
    ],
  },
  {
    id: "real-estate",
    name: "Real Estate",
    blurb: "Physical property. Can produce rent and, over time, a change in value.",
    characteristics: [
      { label: "Ownership", value: "Direct ownership of an asset" },
      { label: "Return source", value: "Rent + capital appreciation" },
      { label: "Typical risk", value: "Illiquid, large ticket size" },
      { label: "Liquidity", value: "Low — selling takes time" },
    ],
  },
  {
    id: "gold",
    name: "Gold",
    blurb: "A physical commodity often held as a store of value and hedge.",
    characteristics: [
      { label: "Ownership", value: "Direct (physical or digital)" },
      { label: "Return source", value: "Price change only" },
      { label: "Typical risk", value: "Price swings, no cash flow" },
      { label: "Liquidity", value: "Generally high" },
    ],
  },
  {
    id: "cash",
    name: "Cash & Deposits",
    blurb: "Bank balances and deposits. Highly stable, low growth.",
    characteristics: [
      { label: "Ownership", value: "A claim on the bank" },
      { label: "Return source", value: "Interest" },
      { label: "Typical risk", value: "Very low nominal risk" },
      { label: "Liquidity", value: "Highest" },
    ],
  },
];

export function InvestmentTypes() {
  const [selected, setSelected] = React.useState<AssetClass>(ASSET_CLASSES[0]);

  return (
    <SimFrame
      title="Explore the main categories of investments"
      description="Select a category to understand what it is, where returns come from, and what risks it carries."
      icon={<PieChart className="size-4 text-primary" />}
      footer={
        <>
          These categories differ in <em>how</em> they generate a return and <em>what risk</em> they
          carry. Nothing here recommends one over another — understanding the categories is the goal.
        </>
      }
    >
      <div className="flex flex-wrap gap-2">
        {ASSET_CLASSES.map((asset) => (
          <button
            key={asset.id}
            type="button"
            onClick={() => setSelected(asset)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected.id === asset.id
                ? "border-primary bg-primary/15 text-primary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
            aria-pressed={selected.id === asset.id}
          >
            {asset.name}
          </button>
        ))}
      </div>

      <div className="animate-fade-in-up space-y-4 rounded-xl border border-border bg-muted/30 p-5">
        <h4 className="text-lg font-semibold">{selected.name}</h4>
        <p className="text-sm text-muted-foreground">{selected.blurb}</p>
        <dl className="grid gap-3 sm:grid-cols-2">
          {selected.characteristics.map((item) => (
            <div key={item.label} className="rounded-lg border border-border bg-card px-3 py-2">
              <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                {item.label}
              </dt>
              <dd className="text-sm font-medium">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </SimFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. How a company is formed                                                 */
/* -------------------------------------------------------------------------- */

const COMPANY_STEPS = [
  {
    title: "Founders",
    icon: <Users className="size-4" />,
    text: "One or more people have an idea and put in their own money and time to start the business.",
  },
  {
    title: "The Business",
    icon: <Building2 className="size-4" />,
    text: "The business sells a product or service. Revenue comes in, costs go out. If revenue exceeds costs, it earns a profit.",
  },
  {
    title: "Needs Capital",
    icon: <Coins className="size-4" />,
    text: "To grow — new factories, new markets, more staff — the business needs more money than it can generate internally.",
  },
  {
    title: "Investors",
    icon: <Landmark className="size-4" />,
    text: "Investors provide capital in exchange for a claim on the business. Lenders get interest; shareholders get ownership.",
  },
  {
    title: "Ownership",
    icon: <BadgeIndianRupee className="size-4" />,
    text: "That ownership is divided into shares. Each share represents a slice of the company and its future profits.",
  },
];

export function CompanyModel() {
  const [step, setStep] = React.useState(0);
  const current = COMPANY_STEPS[step];

  return (
    <SimFrame
      title="How a business turns into something you can own"
      description="Step through the journey from a founder's idea to a tradable share."
      icon={<Building2 className="size-4 text-primary" />}
      footer={
        <>
          A share is simply a unit of <strong>ownership</strong>. Everything else in this course
          builds on that one idea.
        </>
      }
    >
      <ol className="grid gap-2 sm:grid-cols-5">
        {COMPANY_STEPS.map((item, index) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => setStep(index)}
              className={cn(
                "flex w-full flex-col items-center gap-2 rounded-xl border px-3 py-3 text-center text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                index === step
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
              aria-current={index === step}
            >
              <span className="flex size-8 items-center justify-center rounded-full border border-current/30">
                {item.icon}
              </span>
              <span className="font-medium">{item.title}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="animate-fade-in-up flex items-start gap-3 rounded-xl border border-border bg-muted/30 p-5">
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
          {current.icon}
        </span>
        <div>
          <h4 className="font-semibold">
            Step {step + 1} of {COMPANY_STEPS.length}: {current.title}
          </h4>
          <p className="mt-1 text-sm text-muted-foreground">{current.text}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        {COMPANY_STEPS.map((item, index) => (
          <React.Fragment key={item.title}>
            <span className={cn(index <= step ? "text-primary" : "")}>{item.title}</span>
            {index < COMPANY_STEPS.length - 1 ? <ArrowRight className="size-3" /> : null}
          </React.Fragment>
        ))}
      </div>
    </SimFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. Ownership simulator                                                     */
/* -------------------------------------------------------------------------- */

export function OwnershipSimulator() {
  const [companyValue, setCompanyValue] = React.useState(100); // ₹ crore
  const [sharesOutstanding, setSharesOutstanding] = React.useState(1); // crore shares
  const [sharesOwned, setSharesOwned] = React.useState(0.1); // crore shares

  const ownershipPercent = safeDivide(sharesOwned, sharesOutstanding) * 100;
  const sharePrice = safeDivide(companyValue, sharesOutstanding);
  const ownedValue = companyValue * (ownershipPercent / 100);

  return (
    <SimFrame
      title="Company Ownership Simulator"
      description="Change the company's value, the total number of shares, and how many you own. Watch what happens to your slice."
      icon={<BadgeIndianRupee className="size-4 text-primary" />}
      footer={
        <>
          Ownership is about <em>proportion</em>, not price. Owning 5% of a company is the same 5%
          whether the company is worth ₹100 crore or ₹1,000 crore — what changes is the value of
          that slice.
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <SliderField
          id="companyValue"
          label="Company value"
          unit="₹ crore"
          value={companyValue}
          onChange={setCompanyValue}
          min={10}
          max={2000}
          step={10}
        />
        <SliderField
          id="sharesOutstanding"
          label="Total shares"
          unit="crore"
          value={sharesOutstanding}
          onChange={setSharesOutstanding}
          min={0.5}
          max={100}
          step={0.5}
          display={(v) => `${formatIndianNumber(v, 2)} Cr`}
        />
        <SliderField
          id="sharesOwned"
          label="Shares you own"
          unit="crore"
          value={sharesOwned}
          onChange={setSharesOwned}
          min={0}
          max={sharesOutstanding}
          step={0.05}
          display={(v) => `${formatIndianNumber(v, 2)} Cr`}
        />
      </div>

      <MeterBar
        segments={[
          {
            label: "Your ownership",
            value: ownershipPercent,
            className: "bg-primary",
          },
          {
            label: "Other shareholders",
            value: Math.max(0, 100 - ownershipPercent),
            className: "bg-muted-foreground/30",
          },
        ]}
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultTile
          label="Your ownership"
          value={`${formatIndianNumber(ownershipPercent, 2)}%`}
          emphasis
        />
        <ResultTile
          label="Theoretical value of your stake"
          value={`₹${formatIndianNumber(ownedValue, 2)} Cr`}
          hint="Company value × your ownership %"
        />
        <ResultTile
          label="Implied price per share"
          value={formatINR(sharePrice)}
          hint="Company value ÷ total shares"
        />
      </div>

      <Alert variant="info">
        <TrendingUp className="size-4" />
        <div>
          <AlertTitle>A share is a fraction of a business</AlertTitle>
          <AlertDescription>
            With {formatIndianNumber(sharesOutstanding, 2)} crore shares, each share is{" "}
            {formatIndianNumber(safeDivide(100, sharesOutstanding), 6)}% of the company. Increase
            the total shares without changing the company&apos;s value and each share represents a
            smaller slice — this is what happens during dilution.
          </AlertDescription>
        </div>
      </Alert>
    </SimFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. Marketplace simulator (bids and asks)                                   */
/* -------------------------------------------------------------------------- */

export function MarketplaceSimulator() {
  const [bid, setBid] = React.useState(100);
  const [ask, setAsk] = React.useState(102);

  const spread = ask - bid;
  const tradePossible = bid >= ask;

  return (
    <SimFrame
      title="A market is just buyers and sellers meeting"
      description="A buyer names the highest price they'll pay (the bid). A seller names the lowest price they'll accept (the ask)."
      icon={<Users className="size-4 text-primary" />}
      footer={
        <>
          When a bid meets or crosses an ask, a trade happens. The <strong>spread</strong> — the gap
          between the best bid and best ask — is a measure of how easy it is to trade.
        </>
      }
    >
      <div className="grid items-center gap-6 sm:grid-cols-[1fr_auto_1fr]">
        <div className="space-y-3 rounded-xl border border-chart-5/40 bg-chart-5/10 p-4">
          <p className="text-sm font-semibold text-foreground">Buyer</p>
          <SliderField
            id="bid"
            label="I will pay"
            unit="₹"
            value={bid}
            onChange={setBid}
            min={50}
            max={200}
          />
        </div>

        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <ArrowRight className="hidden size-5 sm:block" />
          <span className="text-xs uppercase tracking-wide">meet</span>
        </div>

        <div className="space-y-3 rounded-xl border border-chart-1/40 bg-chart-1/10 p-4">
          <p className="text-sm font-semibold text-foreground">Seller</p>
          <SliderField
            id="ask"
            label="I will sell at"
            unit="₹"
            value={ask}
            onChange={setAsk}
            min={50}
            max={200}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultTile label="Bid (best buyer)" value={formatINR(bid)} tone="default" />
        <ResultTile label="Ask (best seller)" value={formatINR(ask)} tone="default" />
        <ResultTile
          label="Spread"
          value={formatINR(spread)}
          tone={spread <= 0 ? "success" : "warning"}
          hint={spread <= 0 ? "The orders cross" : "No trade yet"}
        />
      </div>

      <Alert variant={tradePossible ? "success" : "warning"}>
        <ArrowRight className="size-4" />
        <div>
          <AlertTitle>{tradePossible ? "A trade can happen" : "No trade yet"}</AlertTitle>
          <AlertDescription>
            {tradePossible
              ? `The buyer is willing to pay at least what the seller wants, so a transaction can occur around ₹${formatIndianNumber(Math.max(bid, ask))}.`
              : `The buyer wants to pay ₹${formatIndianNumber(bid)} but the seller wants ₹${formatIndianNumber(ask)}. The gap of ₹${formatIndianNumber(spread)} is why nothing trades — one side must move.`}
          </AlertDescription>
        </div>
      </Alert>
    </SimFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* 7. Market cap & size bands                                                 */
/* -------------------------------------------------------------------------- */

export function MarketCapSimulator() {
  const [price, setPrice] = React.useState(500);
  const [shares, setShares] = React.useState(10);

  const value = marketCap(price, shares);

  return (
    <SimFrame
      title="Market Capitalisation Simulator"
      description="Market cap is the market's current price tag for the whole company."
      icon={<BadgeIndianRupee className="size-4 text-primary" />}
      footer={
        <>
          Notice that price alone says nothing about size — a ₹10,000 share with only 1 lakh shares
          is a smaller company than a ₹100 share with 50 crore shares.
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <SliderField
          id="mcap-price"
          label="Share price"
          unit="₹"
          value={price}
          onChange={setPrice}
          min={10}
          max={5000}
          step={10}
        />
        <SliderField
          id="mcap-shares"
          label="Shares outstanding"
          unit="crore"
          value={shares}
          onChange={setShares}
          min={1}
          max={100}
          step={1}
        />
      </div>

      <div className="rounded-xl border border-primary/40 bg-primary/10 p-6 text-center">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Market Cap</p>
        <p className="mt-1 text-4xl font-bold tabular-nums text-primary">
          ₹{formatIndianNumber(round(value, 2))} Cr
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {formatIndianNumber(price)} × {formatIndianNumber(shares)} crore shares
        </p>
      </div>
    </SimFrame>
  );
}
