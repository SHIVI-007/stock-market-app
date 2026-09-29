"use client";

import { FormulaCalculator } from "@/components/calculators/formula-calculator";
import {
  bookValuePerShare,
  cagr,
  capCategory,
  debtToEquity,
  dividendYield,
  earningsPerShare,
  enterpriseValue,
  evToEbitda,
  grossMargin,
  marketCap,
  netProfitMargin,
  operatingMargin,
  payoutRatio,
  priceToBook,
  priceToEarnings,
  returnOnCapitalEmployed,
  returnOnEquity,
  ebitdaMargin,
} from "@/lib/calculations/finance";

/* -------------------------------------------------------------------------- */
/* Market capitalisation                                                      */
/* -------------------------------------------------------------------------- */

export function MarketCapCalculator() {
  return (
    <FormulaCalculator
      title="Market Capitalisation Calculator"
      description="See how share price and the number of shares combine into the size of a company."
      formula="Market Cap = Share Price × Shares Outstanding"
      inputs={[
        { id: "price", label: "Share Price", unit: "₹", min: 10, max: 5000, step: 10, defaultValue: 500 },
        { id: "shares", label: "Shares Outstanding", unit: "crore", min: 1, max: 100, step: 1, defaultValue: 10 },
      ]}
      compute={(v) => {
        const value = marketCap(v.price, v.shares);
        return [
          {
            id: "mcap",
            label: "Market Cap",
            value,
            unit: "₹ Cr",
            emphasis: true,
            hint: `Size band: ${capCategory(value)}`,
          },
        ];
      }}
      footer={
        <>
          Market cap tells you the <em>size</em> of a company in the market. Large-, mid- and
          small-cap describe size, not quality: each band has well-run and poorly-run companies.
        </>
      }
    />
  );
}

/* -------------------------------------------------------------------------- */
/* EPS                                                                        */
/* -------------------------------------------------------------------------- */

export function EpsCalculator() {
  return (
    <FormulaCalculator
      title="Earnings Per Share (EPS)"
      description="The profit attributable to each single share."
      formula="EPS = Net Profit ÷ Shares Outstanding"
      inputs={[
        { id: "profit", label: "Net Profit", unit: "₹ Cr", min: -100, max: 1000, step: 10, defaultValue: 100 },
        { id: "shares", label: "Shares Outstanding", unit: "crore", min: 1, max: 50, step: 1, defaultValue: 10 },
      ]}
      compute={(v) => [
        { id: "eps", label: "Earnings Per Share", value: earningsPerShare(v.profit, v.shares), unit: "₹", emphasis: true },
      ]}
      footer={
        <>
          EPS is a per-share view of profit. It rises when profit grows, and it falls if the
          company issues many new shares (dilution) faster than profit grows.
        </>
      }
    />
  );
}

/* -------------------------------------------------------------------------- */
/* P/E                                                                        */
/* -------------------------------------------------------------------------- */

export function PeCalculator() {
  return (
    <FormulaCalculator
      title="Price-to-Earnings (P/E) Ratio"
      description="How many rupees the market pays for each rupee of annual earnings."
      formula="P/E = Share Price ÷ EPS"
      inputs={[
        { id: "price", label: "Share Price", unit: "₹", min: 10, max: 3000, step: 10, defaultValue: 500 },
        { id: "eps", label: "Earnings Per Share", unit: "₹", min: -20, max: 100, step: 1, defaultValue: 20 },
      ]}
      compute={(v) => [
        { id: "pe", label: "P/E Ratio", value: priceToEarnings(v.price, v.eps), unit: "x", emphasis: true },
      ]}
      footer={
        <>
          A P/E is not “cheap” or “expensive” on its own. To interpret one, investigate the
          company&apos;s growth, the industry it operates in, its history, and how much debt it
          carries. A high P/E often reflects expectations of future growth; a low P/E can reflect
          doubt, a slow-growing industry, or simply a temporary jump in earnings. Change the
          numbers above and notice how small changes in EPS move the ratio a lot.
        </>
      }
    />
  );
}

/* -------------------------------------------------------------------------- */
/* P/B                                                                        */
/* -------------------------------------------------------------------------- */

export function PbCalculator() {
  return (
    <FormulaCalculator
      title="Price-to-Book (P/B) Ratio"
      description="Compares the market price with the accounting net worth per share."
      formula="P/B = Share Price ÷ Book Value Per Share"
      inputs={[
        { id: "price", label: "Share Price", unit: "₹", min: 10, max: 2000, step: 10, defaultValue: 500 },
        { id: "equity", label: "Shareholders' Equity", unit: "₹ Cr", min: 100, max: 5000, step: 100, defaultValue: 1000 },
        { id: "shares", label: "Shares Outstanding", unit: "crore", min: 1, max: 50, step: 1, defaultValue: 10 },
      ]}
      compute={(v) => {
        const bvps = bookValuePerShare(v.equity, v.shares);
        return [
          { id: "bvps", label: "Book Value Per Share", value: bvps, unit: "₹" },
          { id: "pb", label: "P/B Ratio", value: priceToBook(v.price, bvps ?? 0), unit: "x", emphasis: true },
        ];
      }}
      footer={
        <>
          Book value is an <em>accounting</em> figure — it reflects historical costs, not what the
          business could fetch today. Asset-light businesses (like software or services) often
          trade well above book value because their main assets never appear on the balance sheet.
          P/B tends to be more informative for asset-heavy businesses such as banks.
        </>
      }
    />
  );
}

/* -------------------------------------------------------------------------- */
/* ROE                                                                        */
/* -------------------------------------------------------------------------- */

export function RoeCalculator() {
  return (
    <FormulaCalculator
      title="Return on Equity (ROE)"
      description="How much profit the company generates for every ₹100 of shareholders' money."
      formula="ROE = Net Profit ÷ Shareholders' Equity × 100"
      inputs={[
        { id: "profit", label: "Net Profit", unit: "₹ Cr", min: -100, max: 1000, step: 10, defaultValue: 150 },
        { id: "equity", label: "Shareholders' Equity", unit: "₹ Cr", min: 50, max: 5000, step: 50, defaultValue: 1000 },
      ]}
      compute={(v) => [
        { id: "roe", label: "Return on Equity", value: returnOnEquity(v.profit, v.equity), unit: "%", emphasis: true },
      ]}
      footer={
        <>
          A high ROE is encouraging, but it should never be read in isolation. Debt can inflate ROE
          (less equity funds the same profit), and a shrinking equity base can do the same. Check{" "}
          <strong>how</strong> the ROE is being generated before drawing conclusions.
        </>
      }
    />
  );
}

/* -------------------------------------------------------------------------- */
/* ROCE                                                                       */
/* -------------------------------------------------------------------------- */

export function RoceCalculator() {
  return (
    <FormulaCalculator
      title="Return on Capital Employed (ROCE)"
      description="How efficiently all long-term capital — equity and debt — is being used."
      formula="ROCE = EBIT ÷ (Equity + Debt) × 100"
      inputs={[
        { id: "ebit", label: "EBIT (Operating Profit)", unit: "₹ Cr", min: -100, max: 1000, step: 10, defaultValue: 300 },
        { id: "equity", label: "Shareholders' Equity", unit: "₹ Cr", min: 100, max: 5000, step: 100, defaultValue: 1000 },
        { id: "debt", label: "Total Debt", unit: "₹ Cr", min: 0, max: 3000, step: 50, defaultValue: 500 },
      ]}
      compute={(v) => [
        {
          id: "roce",
          label: "Return on Capital Employed",
          value: returnOnCapitalEmployed(v.ebit, v.equity + v.debt),
          unit: "%",
          emphasis: true,
        },
        { id: "capital", label: "Capital Employed", value: v.equity + v.debt, unit: "₹ Cr" },
      ]}
      footer={
        <>
          ROCE lets you compare businesses with different mixes of debt and equity, because it
          measures profit against <em>all</em> the capital used. A ROCE consistently above the cost
          of borrowing is one sign a business creates value as it grows.
        </>
      }
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Debt / Equity                                                              */
/* -------------------------------------------------------------------------- */

export function DebtEquityCalculator() {
  return (
    <FormulaCalculator
      title="Debt-to-Equity Ratio"
      description="How much borrowed money the company uses for every rupee of owners' money."
      formula="Debt / Equity = Total Debt ÷ Shareholders' Equity"
      inputs={[
        { id: "debt", label: "Total Debt", unit: "₹ Cr", min: 0, max: 3000, step: 50, defaultValue: 500 },
        { id: "equity", label: "Shareholders' Equity", unit: "₹ Cr", min: 100, max: 5000, step: 100, defaultValue: 1000 },
      ]}
      compute={(v) => [
        { id: "de", label: "Debt / Equity", value: debtToEquity(v.debt, v.equity), unit: "x", emphasis: true },
      ]}
      footer={
        <>
          Debt is not automatically bad — it can fund growth more cheaply than issuing shares.
          What matters is whether the business earns more on that capital than the interest it
          pays, and whether its cash flows can comfortably service the debt. Capital-intensive
          industries tend to carry more debt than asset-light ones.
        </>
      }
    />
  );
}

/* -------------------------------------------------------------------------- */
/* CAGR                                                                       */
/* -------------------------------------------------------------------------- */

export function CagrCalculator() {
  return (
    <FormulaCalculator
      title="Compound Annual Growth Rate (CAGR)"
      description="The smoothed annual growth rate between a starting and ending value."
      formula="CAGR = (End ÷ Begin)^(1 / Years) − 1"
      inputs={[
        { id: "begin", label: "Beginning Value", unit: "₹ Cr", min: 10, max: 1000, step: 10, defaultValue: 100 },
        { id: "end", label: "Ending Value", unit: "₹ Cr", min: 10, max: 5000, step: 10, defaultValue: 200 },
        { id: "years", label: "Period", unit: "years", min: 1, max: 20, step: 1, defaultValue: 5 },
      ]}
      compute={(v) => [
        { id: "cagr", label: "CAGR", value: cagr(v.begin, v.end, v.years), unit: "%", emphasis: true },
      ]}
      footer={
        <>
          CAGR smooths out the bumps to give a single average rate. It is a description of the{" "}
          <em>past</em>. A strong historical CAGR does not guarantee future growth — the conditions
          that produced it may change.
        </>
      }
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Dividends                                                                  */
/* -------------------------------------------------------------------------- */

export function DividendCalculator() {
  return (
    <FormulaCalculator
      title="Dividend Yield & Payout"
      description="What a dividend returns relative to the price, and how much of profit is paid out."
      formula="Yield = DPS ÷ Price × 100   •   Payout = DPS ÷ EPS × 100"
      inputs={[
        { id: "price", label: "Share Price", unit: "₹", min: 10, max: 2000, step: 10, defaultValue: 500 },
        { id: "dps", label: "Dividend Per Share", unit: "₹", min: 0, max: 50, step: 1, defaultValue: 10 },
        { id: "eps", label: "Earnings Per Share", unit: "₹", min: -20, max: 100, step: 1, defaultValue: 20 },
      ]}
      compute={(v) => [
        { id: "yield", label: "Dividend Yield", value: dividendYield(v.dps, v.price), unit: "%", emphasis: true },
        { id: "payout", label: "Payout Ratio", value: payoutRatio(v.dps, v.eps), unit: "%" },
        { id: "retained", label: "Retained (per share)", value: v.eps - v.dps, unit: "₹" },
      ]}
      footer={
        <>
          A very high yield can mean a generous company — or a share price that has fallen sharply.
          A low payout means more profit is retained to reinvest, which can be appropriate for a
          fast-growing business. Neither is inherently better; context decides.
        </>
      }
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Margins                                                                    */
/* -------------------------------------------------------------------------- */

export function MarginCalculator() {
  return (
    <FormulaCalculator
      title="Profit Margin Explorer"
      description="How much of each rupee of revenue survives at each stage of the income statement."
      formula="Margin = Profit measure ÷ Revenue × 100"
      inputs={[
        { id: "revenue", label: "Revenue", unit: "₹ Cr", min: 100, max: 5000, step: 50, defaultValue: 1000 },
        { id: "cogs", label: "Cost of Goods / Services", unit: "₹ Cr", min: 0, max: 4000, step: 50, defaultValue: 400 },
        { id: "opex", label: "Operating Expenses", unit: "₹ Cr", min: 0, max: 3000, step: 25, defaultValue: 200 },
        { id: "depreciation", label: "Depreciation", unit: "₹ Cr", min: 0, max: 500, step: 10, defaultValue: 100 },
        { id: "interest", label: "Interest", unit: "₹ Cr", min: 0, max: 500, step: 10, defaultValue: 50 },
        { id: "tax", label: "Tax Rate", unit: "%", min: 0, max: 40, step: 1, defaultValue: 25 },
      ]}
      compute={(v) => {
        const grossProfit = v.revenue - v.cogs;
        const ebitda = grossProfit - v.opex;
        const ebit = ebitda - v.depreciation;
        const pbt = ebit - v.interest;
        const tax = pbt > 0 ? pbt * (v.tax / 100) : 0;
        const net = pbt - tax;

        return [
          { id: "gross", label: "Gross Margin", value: grossMargin(v.revenue, v.cogs), unit: "%" },
          { id: "ebitda", label: "EBITDA Margin", value: ebitdaMargin(ebitda, v.revenue), unit: "%" },
          { id: "operating", label: "Operating Margin", value: operatingMargin(ebit, v.revenue), unit: "%" },
          { id: "net", label: "Net Profit Margin", value: netProfitMargin(net, v.revenue), unit: "%", emphasis: true },
          { id: "netProfit", label: "Net Profit", value: net, unit: "₹ Cr" },
        ];
      }}
      footer={
        <>
          Margins reveal the shape of a business. Compare a company&apos;s margins with its own past
          and with close competitors — margins differ enormously by industry, so cross-industry
          comparisons mislead.
        </>
      }
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Enterprise value & EV/EBITDA                                               */
/* -------------------------------------------------------------------------- */

export function EnterpriseValueCalculator() {
  return (
    <FormulaCalculator
      title="Enterprise Value (EV)"
      description="What it would cost to buy the whole business and take on its debt."
      formula="EV ≈ Market Cap + Total Debt − Cash"
      inputs={[
        { id: "mcap", label: "Market Capitalisation", unit: "₹ Cr", min: 100, max: 10000, step: 100, defaultValue: 5000 },
        { id: "debt", label: "Total Debt", unit: "₹ Cr", min: 0, max: 5000, step: 50, defaultValue: 500 },
        { id: "cash", label: "Cash & Equivalents", unit: "₹ Cr", min: 0, max: 2000, step: 25, defaultValue: 200 },
      ]}
      compute={(v) => [
        { id: "ev", label: "Enterprise Value", value: enterpriseValue(v.mcap, v.debt, v.cash), unit: "₹ Cr", emphasis: true },
        { id: "netdebt", label: "Net Debt", value: v.debt - v.cash, unit: "₹ Cr" },
      ]}
      footer={
        <>
          Two companies with the same market cap but different debt loads are not equally priced.
          EV accounts for that, which is why it is useful when comparing companies with different
          capital structures.
        </>
      }
    />
  );
}

export function EvEbitdaCalculator() {
  return (
    <FormulaCalculator
      title="EV / EBITDA"
      description="A valuation multiple that is independent of how the business is financed."
      formula="EV / EBITDA = Enterprise Value ÷ EBITDA"
      inputs={[
        { id: "mcap", label: "Market Capitalisation", unit: "₹ Cr", min: 100, max: 10000, step: 100, defaultValue: 5000 },
        { id: "debt", label: "Total Debt", unit: "₹ Cr", min: 0, max: 5000, step: 50, defaultValue: 500 },
        { id: "cash", label: "Cash & Equivalents", unit: "₹ Cr", min: 0, max: 2000, step: 25, defaultValue: 200 },
        { id: "ebitda", label: "EBITDA", unit: "₹ Cr", min: 0, max: 2000, step: 10, defaultValue: 500 },
      ]}
      compute={(v) => {
        const ev = enterpriseValue(v.mcap, v.debt, v.cash);
        return [
          { id: "ev", label: "Enterprise Value", value: ev, unit: "₹ Cr" },
          { id: "multiple", label: "EV / EBITDA", value: evToEbitda(ev, v.ebitda), unit: "x", emphasis: true },
        ];
      }}
      footer={
        <>
          Because EV/EBITDA sits above interest and tax, it lets you compare a heavily indebted
          company with a debt-free one. It still ignores capital expenditure, which can be large
          for capital-intensive businesses — so pair it with a look at cash flow.
        </>
      }
    />
  );
}

/** Convenience registry so other modules can look a calculator up by name. */
export const RATIO_CALCULATORS = {
  MarketCapCalculator,
  EpsCalculator,
  PeCalculator,
  PbCalculator,
  RoeCalculator,
  RoceCalculator,
  DebtEquityCalculator,
  CagrCalculator,
  DividendCalculator,
  MarginCalculator,
  EnterpriseValueCalculator,
  EvEbitdaCalculator,
} as const;
