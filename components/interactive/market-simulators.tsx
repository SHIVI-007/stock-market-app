"use client";

import * as React from "react";
import {
  ArrowDownUp,
  ArrowRight,
  BookOpen,
  Gauge,
  Landmark,
  Scale,
  ShoppingCart,
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
import { cn, formatIndianNumber, formatINR, round, safeDivide } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/* 1. Supply & demand pressure                                                */
/* -------------------------------------------------------------------------- */

export function SupplyDemandSimulator() {
  const [buyers, setBuyers] = React.useState(120);
  const [sellers, setSellers] = React.useState(80);
  const [demandStrength, setDemandStrength] = React.useState(60);
  const [supplyPressure, setSupplyPressure] = React.useState(40);

  // A deliberately simple, transparent model of *pressure* — not a price forecast.
  const demandScore = buyers * (demandStrength / 100);
  const supplyScore = sellers * (supplyPressure / 100);
  const total = demandScore + supplyScore || 1;
  const balance = ((demandScore - supplyScore) / total) * 100; // −100..100

  const label =
    balance > 25
      ? "Upward pressure"
      : balance < -25
        ? "Downward pressure"
        : "Roughly balanced";

  const barPercent = Math.min(100, Math.abs(balance));

  return (
    <SimFrame
      title="Supply, demand and price pressure"
      description="Prices move when the balance between willing buyers and willing sellers shifts. Explore how each side affects that balance."
      icon={<Scale className="size-4 text-primary" />}
      footer={
        <>
          This is a <strong>conceptual model of pressure</strong>, not a price predictor. Real prices
          also depend on news, expectations, earnings, interest rates and much more — which is why
          this lesson is about <em>understanding</em> the forces, not forecasting them.
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <SliderField id="buyers" label="Number of buyers" value={buyers} onChange={setBuyers} min={0} max={300} />
        <SliderField id="sellers" label="Number of sellers" value={sellers} onChange={setSellers} min={0} max={300} />
        <SliderField
          id="demandStrength"
          label="How eager buyers are"
          unit="%"
          value={demandStrength}
          onChange={setDemandStrength}
          min={0}
          max={100}
        />
        <SliderField
          id="supplyPressure"
          label="How eager sellers are"
          unit="%"
          value={supplyPressure}
          onChange={setSupplyPressure}
          min={0}
          max={100}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Selling pressure</span>
          <span>Balanced</span>
          <span>Buying pressure</span>
        </div>
        <div className="relative flex h-6 w-full overflow-hidden rounded-full border border-border bg-muted">
          <div className="h-full flex-1 bg-destructive/40" />
          <div className="h-full w-px bg-border" />
          <div className="h-full flex-1 bg-success/40" />
          <div
            className="absolute top-0 h-full w-1 -translate-x-1/2 rounded-full bg-foreground transition-all duration-500"
            style={{ left: `${50 + balance / 2}%` }}
            aria-hidden
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-muted-foreground">
            Supply score {round(supplyScore, 0)}
          </span>
          <Badge
            variant={balance > 25 ? "success" : balance < -25 ? "destructive" : "secondary"}
          >
            {label}
          </Badge>
          <span className="font-medium text-muted-foreground">
            Demand score {round(demandScore, 0)}
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ResultTile
          label="Net pressure"
          value={`${balance > 0 ? "+" : ""}${formatIndianNumber(balance, 1)}%`}
          emphasis
          hint={label}
        />
        <ResultTile
          label="Strength of the tilt"
          value={`${formatIndianNumber(barPercent, 0)} / 100`}
          hint="How far the marker sits from the centre"
        />
      </div>
    </SimFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. Order book simulator                                                    */
/* -------------------------------------------------------------------------- */

interface Order {
  price: number;
  quantity: number;
}

const SELL_BOOK: Order[] = [
  { price: 103, quantity: 200 },
  { price: 104, quantity: 300 },
  { price: 105, quantity: 500 },
];

const BUY_BOOK: Order[] = [
  { price: 102, quantity: 400 },
  { price: 101, quantity: 700 },
  { price: 100, quantity: 900 },
];

type OrderSide = "buy" | "sell";
type OrderType = "market" | "limit";

interface FillResult {
  filledQuantity: number;
  remainingQuantity: number;
  averagePrice: number | null;
  fills: { price: number; quantity: number }[];
}

function simulateOrder(
  side: OrderSide,
  type: OrderType,
  limitPrice: number,
  quantity: number,
): FillResult {
  // A buy consumes sell orders from the lowest price up; a sell consumes buy
  // orders from the highest price down. A market order accepts any price.
  const book = (side === "buy" ? SELL_BOOK : BUY_BOOK)
    .slice()
    .sort((a, b) => (side === "buy" ? a.price - b.price : b.price - a.price));

  const fills: { price: number; quantity: number }[] = [];
  let remaining = quantity;

  for (const order of book) {
    if (remaining <= 0) break;

    const acceptable =
      type === "market" ||
      (side === "buy" ? order.price <= limitPrice : order.price >= limitPrice);

    if (!acceptable) break;

    const take = Math.min(order.quantity, remaining);
    fills.push({ price: order.price, quantity: take });
    remaining -= take;
  }

  const filledQuantity = quantity - remaining;
  const notional = fills.reduce((sum, fill) => sum + fill.price * fill.quantity, 0);

  return {
    filledQuantity,
    remainingQuantity: remaining,
    averagePrice: filledQuantity > 0 ? notional / filledQuantity : null,
    fills,
  };
}

export function OrderBookSimulator() {
  const [side, setSide] = React.useState<OrderSide>("buy");
  const [type, setType] = React.useState<OrderType>("market");
  const [limitPrice, setLimitPrice] = React.useState(103);
  const [quantity, setQuantity] = React.useState(500);

  const result = React.useMemo(
    () => simulateOrder(side, type, limitPrice, quantity),
    [side, type, limitPrice, quantity],
  );

  const bestAsk = Math.min(...SELL_BOOK.map((o) => o.price));
  const bestBid = Math.max(...BUY_BOOK.map((o) => o.price));

  return (
    <SimFrame
      title="Order book simulator"
      description="See how a hypothetical order would be filled against the resting buy and sell orders."
      icon={<ArrowDownUp className="size-4 text-primary" />}
      footer={
        <>
          This is an <strong>educational simulation</strong> with a fixed, made-up order book. A
          market order prioritises getting filled; a limit order prioritises price and may only
          fill partially — or not at all.
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* The book */}
        <div className="space-y-4">
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-destructive">
              <ArrowDownUp className="size-4" /> Sellers (asks)
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SELL_BOOK.slice().reverse().map((order) => (
                  <TableRow key={`ask-${order.price}`}>
                    <TableCell className="font-mono text-destructive">
                      {formatINR(order.price)}
                    </TableCell>
                    <TableCell className="text-right font-mono">{order.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-center gap-3 rounded-lg border border-dashed border-border py-2 text-xs text-muted-foreground">
            <span>Spread</span>
            <span className="font-mono text-foreground">{formatINR(bestAsk - bestBid)}</span>
          </div>

          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-success">
              <ShoppingCart className="size-4" /> Buyers (bids)
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {BUY_BOOK.map((order) => (
                  <TableRow key={`bid-${order.price}`}>
                    <TableCell className="font-mono text-success">
                      {formatINR(order.price)}
                    </TableCell>
                    <TableCell className="text-right font-mono">{order.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Order entry + outcome */}
        <div className="space-y-5">
          <div className="space-y-3">
            <p className="text-sm font-medium">Place a hypothetical order</p>
            <div className="flex gap-2">
              {(["buy", "sell"] as OrderSide[]).map((option) => (
                <Button
                  key={option}
                  variant={side === option ? (option === "buy" ? "success" : "destructive") : "outline"}
                  size="sm"
                  className="flex-1 capitalize"
                  onClick={() => setSide(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              {(["market", "limit"] as OrderType[]).map((option) => (
                <Button
                  key={option}
                  variant={type === option ? "default" : "outline"}
                  size="sm"
                  className="flex-1 capitalize"
                  onClick={() => setType(option)}
                >
                  {option} order
                </Button>
              ))}
            </div>
          </div>

          {type === "limit" ? (
            <SliderField
              id="limit"
              label="Limit price"
              unit="₹"
              value={limitPrice}
              onChange={setLimitPrice}
              min={95}
              max={110}
            />
          ) : null}

          <SliderField
            id="qty"
            label="Quantity"
            value={quantity}
            onChange={setQuantity}
            min={100}
            max={2000}
            step={100}
          />

          <div className="grid gap-3">
            <ResultTile
              label="Filled quantity"
              value={`${result.filledQuantity} shares`}
              tone={result.filledQuantity > 0 ? "success" : "warning"}
              emphasis={result.filledQuantity > 0}
            />
            <div className="grid grid-cols-2 gap-3">
              <ResultTile
                label="Average fill price"
                value={result.averagePrice ? formatINR(result.averagePrice) : "—"}
              />
              <ResultTile label="Unfilled" value={`${result.remainingQuantity} shares`} />
            </div>
          </div>

          {result.fills.length > 0 ? (
            <div className="rounded-lg border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
              <p className="mb-2 font-medium text-foreground">Fill breakdown</p>
              <ul className="space-y-1 font-mono">
                {result.fills.map((fill) => (
                  <li key={fill.price}>
                    {fill.quantity} @ {formatINR(fill.price)}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Alert variant="warning">
              <Gauge className="size-4" />
              <div>
                <AlertTitle>No fill</AlertTitle>
                <AlertDescription>
                  Your limit price never overlaps with the other side of the book, so nothing
                  trades. Try a more aggressive limit price, or switch to a market order.
                </AlertDescription>
              </div>
            </Alert>
          )}
        </div>
      </div>
    </SimFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. IPO simulator                                                           */
/* -------------------------------------------------------------------------- */

export function IpoSimulator() {
  const [capitalNeeded, setCapitalNeeded] = React.useState(100); // ₹ crore
  const [sharesOffered, setSharesOffered] = React.useState(1); // crore shares
  const [demandMultiple, setDemandMultiple] = React.useState(3);
  const [appliedShares, setAppliedShares] = React.useState(500);

  const issuePrice = safeDivide(capitalNeeded, sharesOffered);
  const demandShares = sharesOffered * demandMultiple * 100; // crore shares demanded
  const subscriptionRatio = demandMultiple;
  const allotmentRatio = subscriptionRatio > 1 ? 1 / subscriptionRatio : 1;
  const expectedAllotment = Math.floor(appliedShares * allotmentRatio);

  return (
    <SimFrame
      title="IPO simulator"
      description="A company raises money by selling new shares to the public at a fixed issue price."
      icon={<Landmark className="size-4 text-primary" />}
      footer={
        <>
          An IPO moves money <em>into the company</em> — this is the <strong>primary market</strong>.
          Once the shares list and trade between investors, that is the{" "}
          <strong>secondary market</strong>.
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <SliderField
          id="ipo-capital"
          label="Capital the company wants to raise"
          unit="₹ crore"
          value={capitalNeeded}
          onChange={setCapitalNeeded}
          min={10}
          max={2000}
          step={10}
        />
        <SliderField
          id="ipo-shares"
          label="New shares offered"
          unit="crore"
          value={sharesOffered}
          onChange={setSharesOffered}
          min={0.1}
          max={20}
          step={0.1}
          display={(v) => `${formatIndianNumber(v, 1)} Cr`}
        />
        <SliderField
          id="ipo-demand"
          label="Investor demand"
          unit="× the offer"
          value={demandMultiple}
          onChange={setDemandMultiple}
          min={0.2}
          max={20}
          step={0.2}
          display={(v) => `${formatIndianNumber(v, 1)}×`}
        />
        <SliderField
          id="ipo-applied"
          label="Shares you applied for"
          value={appliedShares}
          onChange={setAppliedShares}
          min={0}
          max={5000}
          step={100}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultTile
          label="Issue price per share"
          value={formatINR(issuePrice)}
          hint="Capital wanted ÷ shares offered"
          emphasis
        />
        <ResultTile
          label="Total demand"
          value={`${formatIndianNumber(demandShares, 1)} Cr shares`}
          hint={`Subscription: ${formatIndianNumber(subscriptionRatio, 1)}×`}
        />
        <ResultTile
          label="Your expected allotment"
          value={`${formatIndianNumber(expectedAllotment)} shares`}
          hint={
            subscriptionRatio > 1
              ? `Oversubscribed ${formatIndianNumber(subscriptionRatio, 1)}×, so allotment is scaled back`
              : "Fully subscribed or undersubscribed"
          }
        />
      </div>

      {subscriptionRatio > 1 ? (
        <Alert variant="info">
          <ArrowRight className="size-4" />
          <div>
            <AlertTitle>Why you may not get all the shares you asked for</AlertTitle>
            <AlertDescription>
              When an issue is oversubscribed, shares are allotted proportionally. Here you applied
              for {appliedShares} shares but demand was {formatIndianNumber(subscriptionRatio, 1)}×
              the supply, so roughly {formatIndianNumber(allotmentRatio * 100, 0)}% of applications
              are met.
            </AlertDescription>
          </div>
        </Alert>
      ) : (
        <Alert variant="warning">
          <ArrowRight className="size-4" />
          <div>
            <AlertTitle>Undersubscribed</AlertTitle>
            <AlertDescription>
              Demand is below the number of shares offered. An issue can still go ahead, but this is
              a signal worth understanding rather than acting on.
            </AlertDescription>
          </div>
        </Alert>
      )}
    </SimFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. Terminology explorer                                                    */
/* -------------------------------------------------------------------------- */

interface Term {
  term: string;
  short: string;
  detail: string;
}

const TERMS: Term[] = [
  {
    term: "Share",
    short: "One unit of ownership in a company.",
    detail:
      "If a company has 1 crore shares and you own 1 lakh of them, you own 1% of the company.",
  },
  {
    term: "Equity",
    short: "Another word for ownership — and for the owners' stake on the balance sheet.",
    detail:
      "Shareholders' equity = total assets − total liabilities. It is the accounting value of the owners' stake.",
  },
  {
    term: "Stock",
    short: "A general term for shares of a company.",
    detail: "In everyday usage, 'stock' and 'share' are used interchangeably.",
  },
  {
    term: "Market Cap",
    short: "The market's price tag for the whole company.",
    detail: "Market cap = share price × number of outstanding shares.",
  },
  {
    term: "Volume",
    short: "The number of shares traded in a period.",
    detail: "High volume means many shares changed hands — often a sign of active interest.",
  },
  {
    term: "Liquidity",
    short: "How easily something can be bought or sold without moving the price.",
    detail: "Large, heavily traded companies are usually more liquid than small ones.",
  },
  {
    term: "Volatility",
    short: "How much a price swings around over time.",
    detail: "High volatility means bigger up-and-down moves — more uncertainty, not necessarily more risk.",
  },
  {
    term: "Index",
    short: "A basket of securities tracking a market or segment.",
    detail: "The Nifty 50 and Sensex are indices that summarise how a group of large companies is doing.",
  },
  {
    term: "Dividend",
    short: "A share of profit paid out to shareholders.",
    detail: "Dividends are usually a cash payment per share, decided by the board.",
  },
  {
    term: "Dividend Yield",
    short: "Dividend per share as a percentage of the price.",
    detail: "Yield = dividend per share ÷ share price × 100.",
  },
  {
    term: "EPS",
    short: "Earnings attributable to each share.",
    detail: "EPS = net profit ÷ number of outstanding shares.",
  },
  {
    term: "Revenue",
    short: "Total money a company brings in from sales.",
    detail: "Revenue is the top line — before any costs are subtracted.",
  },
  {
    term: "Profit",
    short: "What is left of revenue after costs.",
    detail: "Profit has several layers: gross, operating, and net profit.",
  },
  {
    term: "Debt",
    short: "Money borrowed that must be repaid, usually with interest.",
    detail: "Debt appears on the balance sheet as a liability.",
  },
];

export function TermExplorer() {
  const [activeTerm, setActiveTerm] = React.useState<Term>(TERMS[0]);

  return (
    <SimFrame
      title="Terminology explorer"
      description="Tap any term to see a plain-English explanation."
      icon={<BookOpen className="size-4 text-primary" />}
      footer={<>Every term here also appears in the searchable Glossary.</>}
    >
      <div className="flex flex-wrap gap-2">
        {TERMS.map((item) => (
          <button
            key={item.term}
            type="button"
            onClick={() => setActiveTerm(item)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              activeTerm.term === item.term
                ? "border-primary bg-primary/15 text-primary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
            aria-pressed={activeTerm.term === item.term}
          >
            {item.term}
          </button>
        ))}
      </div>

      <div className="animate-fade-in-up space-y-2 rounded-xl border border-border bg-muted/30 p-5">
        <h4 className="text-lg font-semibold">{activeTerm.term}</h4>
        <p className="text-sm font-medium">{activeTerm.short}</p>
        <p className="text-sm text-muted-foreground">{activeTerm.detail}</p>
      </div>
    </SimFrame>
  );
}
