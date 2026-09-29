/**
 * Pure financial calculation helpers.
 *
 * Conventions used throughout this module:
 *  - "Rate"-like outputs (ROE, ROCE, margins, CAGR, yields) are returned as
 *    **percentages** (e.g. `14.87` means 14.87%).
 *  - "Multiple"-like outputs (P/E, P/B, D/E, EV/EBITDA) are returned as plain
 *    multiples (e.g. `25` means 25x).
 *  - A result of `null` means the metric is **not meaningful** for the given
 *    inputs (for example a P/E ratio when earnings are negative, or a margin
 *    when revenue is zero). Callers should render `null` as “—”.
 *
 * Keeping these as pure functions means they can be unit tested directly and
 * reused by any calculator, simulator, or quiz.
 */

import { safeDivide } from "@/lib/utils";

/** A ratio result: a number, or `null` when it cannot be interpreted. */
export type Ratio = number | null;

/** Percent from a part and a whole. `null` when the whole is non-positive. */
function percent(part: number, whole: number): Ratio {
  if (!Number.isFinite(part) || !Number.isFinite(whole) || whole <= 0) {
    return null;
  }
  return (part / whole) * 100;
}

/** A multiple (part / base). `null` when the base is non-positive. */
function multiple(numerator: number, base: number): Ratio {
  if (!Number.isFinite(numerator) || !Number.isFinite(base) || base <= 0) {
    return null;
  }
  return numerator / base;
}

/* -------------------------------------------------------------------------- */
/* Market capitalisation                                                      */
/* -------------------------------------------------------------------------- */

/** Market Cap = Share Price × Number of Outstanding Shares. */
export function marketCap(sharePrice: number, sharesOutstanding: number): number {
  return safeDivide(sharePrice, 1) * safeDivide(sharesOutstanding, 1);
}

/** Market capitalisation band commonly used in the Indian market. */
export type CapCategory = "Large-cap" | "Mid-cap" | "Small-cap";

/**
 * Classify a company by market capitalisation (in ₹ crore).
 *
 * These thresholds mirror the SEBI/AMFI convention used for Indian equities.
 * Bands describe *size*, not quality or attractiveness.
 */
export function capCategory(marketCapInCrore: number): CapCategory {
  if (marketCapInCrore >= 20000) return "Large-cap";
  if (marketCapInCrore >= 5000) return "Mid-cap";
  return "Small-cap";
}

/* -------------------------------------------------------------------------- */
/* Per-share metrics                                                          */
/* -------------------------------------------------------------------------- */

/** Earnings Per Share = Net Profit ÷ Number of Outstanding Shares. */
export function earningsPerShare(netProfit: number, sharesOutstanding: number): Ratio {
  return multiple(netProfit, sharesOutstanding);
}

/** Book Value Per Share = Shareholders' Equity ÷ Number of Shares. */
export function bookValuePerShare(equity: number, sharesOutstanding: number): Ratio {
  return multiple(equity, sharesOutstanding);
}

/** Dividend Per Share = Total Dividend Paid ÷ Number of Shares. */
export function dividendPerShare(totalDividend: number, sharesOutstanding: number): Ratio {
  return multiple(totalDividend, sharesOutstanding);
}

/* -------------------------------------------------------------------------- */
/* Valuation multiples                                                        */
/* -------------------------------------------------------------------------- */

/** Price-to-Earnings = Share Price ÷ EPS. `null` when EPS ≤ 0. */
export function priceToEarnings(sharePrice: number, eps: number): Ratio {
  return multiple(sharePrice, eps);
}

/**
 * Price-to-Earnings computed from totals (convenience helper).
 * `null` when net profit ≤ 0.
 */
export function priceToEarningsFromProfit(
  sharePrice: number,
  netProfit: number,
  sharesOutstanding: number,
): Ratio {
  const eps = earningsPerShare(netProfit, sharesOutstanding);
  if (eps === null) return null;
  return priceToEarnings(sharePrice, eps);
}

/** Price-to-Book = Market Price ÷ Book Value Per Share. `null` when BVPS ≤ 0. */
export function priceToBook(sharePrice: number, bookValuePerShareValue: number): Ratio {
  return multiple(sharePrice, bookValuePerShareValue);
}

/** Total earnings yield (%) = EPS ÷ Share Price × 100 (the inverse of P/E). */
export function earningsYield(sharePrice: number, eps: number): Ratio {
  if (!Number.isFinite(sharePrice) || sharePrice <= 0) return null;
  return (eps / sharePrice) * 100;
}

/* -------------------------------------------------------------------------- */
/* Return / profitability ratios                                              */
/* -------------------------------------------------------------------------- */

/** Return on Equity (%) = Net Profit ÷ Shareholders' Equity × 100. */
export function returnOnEquity(netProfit: number, equity: number): Ratio {
  return percent(netProfit, equity);
}

/**
 * Capital Employed = Shareholders' Equity + Total Debt.
 * (Total assets − current liabilities is equivalent.)
 */
export function capitalEmployed(equity: number, totalDebt: number): number {
  return equity + totalDebt;
}

/** Return on Capital Employed (%) = EBIT ÷ Capital Employed × 100. */
export function returnOnCapitalEmployed(ebit: number, capitalEmployedValue: number): Ratio {
  return percent(ebit, capitalEmployedValue);
}

/** Return on Assets (%) = Net Profit ÷ Total Assets × 100. */
export function returnOnAssets(netProfit: number, totalAssets: number): Ratio {
  return percent(netProfit, totalAssets);
}

/* -------------------------------------------------------------------------- */
/* Margins                                                                    */
/* -------------------------------------------------------------------------- */

/** Gross Margin (%) = (Revenue − Cost of Goods Sold) ÷ Revenue × 100. */
export function grossMargin(revenue: number, costOfGoods: number): Ratio {
  return percent(revenue - costOfGoods, revenue);
}

/** Operating (EBIT) Margin (%) = EBIT ÷ Revenue × 100. */
export function operatingMargin(ebit: number, revenue: number): Ratio {
  return percent(ebit, revenue);
}

/** EBITDA Margin (%) = EBITDA ÷ Revenue × 100. */
export function ebitdaMargin(ebitda: number, revenue: number): Ratio {
  return percent(ebitda, revenue);
}

/** Net Profit Margin (%) = Net Profit ÷ Revenue × 100. */
export function netProfitMargin(netProfit: number, revenue: number): Ratio {
  return percent(netProfit, revenue);
}

/* -------------------------------------------------------------------------- */
/* Debt & leverage                                                            */
/* -------------------------------------------------------------------------- */

/** Debt-to-Equity = Total Debt ÷ Shareholders' Equity. */
export function debtToEquity(totalDebt: number, equity: number): Ratio {
  return multiple(totalDebt, equity);
}

/** Interest Coverage = EBIT ÷ Interest Expense. */
export function interestCoverage(ebit: number, interestExpense: number): Ratio {
  return multiple(ebit, interestExpense);
}

/** Net Debt = Total Debt − Cash & Equivalents. */
export function netDebt(totalDebt: number, cash: number): number {
  return totalDebt - cash;
}

/* -------------------------------------------------------------------------- */
/* Enterprise value                                                           */
/* -------------------------------------------------------------------------- */

/** Enterprise Value ≈ Market Cap + Total Debt − Cash. */
export function enterpriseValue(
  marketCapValue: number,
  totalDebt: number,
  cash: number,
): number {
  return marketCapValue + totalDebt - cash;
}

/** EV / EBITDA multiple. `null` when EBITDA ≤ 0. */
export function evToEbitda(enterpriseValueValue: number, ebitda: number): Ratio {
  return multiple(enterpriseValueValue, ebitda);
}

/* -------------------------------------------------------------------------- */
/* Working capital                                                            */
/* -------------------------------------------------------------------------- */

/** Working Capital = Current Assets − Current Liabilities. */
export function workingCapital(currentAssets: number, currentLiabilities: number): number {
  return currentAssets - currentLiabilities;
}

/** Current Ratio = Current Assets ÷ Current Liabilities. */
export function currentRatio(currentAssets: number, currentLiabilities: number): Ratio {
  return multiple(currentAssets, currentLiabilities);
}

/** Cash Conversion Cycle (days) = DIO + DSO − DPO. */
export function cashConversionCycle(
  daysInventoryOutstanding: number,
  daysSalesOutstanding: number,
  daysPayablesOutstanding: number,
): number {
  return daysInventoryOutstanding + daysSalesOutstanding - daysPayablesOutstanding;
}

/* -------------------------------------------------------------------------- */
/* Cash flow                                                                  */
/* -------------------------------------------------------------------------- */

/** Free Cash Flow = Operating Cash Flow − Capital Expenditure. */
export function freeCashFlow(operatingCashFlow: number, capitalExpenditure: number): number {
  return operatingCashFlow - capitalExpenditure;
}

/* -------------------------------------------------------------------------- */
/* Dividends                                                                  */
/* -------------------------------------------------------------------------- */

/** Dividend Yield (%) = Dividend Per Share ÷ Share Price × 100. */
export function dividendYield(dividendPerShareValue: number, sharePrice: number): Ratio {
  if (!Number.isFinite(sharePrice) || sharePrice <= 0) return null;
  return (dividendPerShareValue / sharePrice) * 100;
}

/** Dividend Payout Ratio (%) = Dividend Per Share ÷ EPS × 100. */
export function payoutRatio(dividendPerShareValue: number, eps: number): Ratio {
  return percent(dividendPerShareValue, eps);
}

/** Retention Ratio (%) = 100 − Payout Ratio. */
export function retentionRatio(dividendPerShareValue: number, eps: number): Ratio {
  const payout = payoutRatio(dividendPerShareValue, eps);
  if (payout === null) return null;
  return 100 - payout;
}

/* -------------------------------------------------------------------------- */
/* Growth                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Compound Annual Growth Rate (%) between two positive values.
 * `null` when either endpoint is ≤ 0 or the period is ≤ 0.
 */
export function cagr(beginValue: number, endValue: number, years: number): Ratio {
  if (
    !Number.isFinite(beginValue) ||
    !Number.isFinite(endValue) ||
    !Number.isFinite(years) ||
    beginValue <= 0 ||
    endValue <= 0 ||
    years <= 0
  ) {
    return null;
  }
  return ((endValue / beginValue) ** (1 / years) - 1) * 100;
}

/** Year-over-year simple growth (%). `null` when the base is ≤ 0. */
export function simpleGrowth(previousValue: number, currentValue: number): Ratio {
  return percent(currentValue - previousValue, previousValue);
}

/* -------------------------------------------------------------------------- */
/* Compounding (used by the "saving vs investing" style simulations)          */
/* -------------------------------------------------------------------------- */

/** Future value of a lump sum compounded annually. */
export function futureValue(
  principal: number,
  annualRatePercent: number,
  years: number,
): number {
  const rate = annualRatePercent / 100;
  return principal * (1 + rate) ** years;
}

/**
 * Future value of a monthly SIP (investment at the end of each month).
 * Used purely for illustrative, hypothetical projections.
 */
export function sipFutureValue(
  monthlyInvestment: number,
  annualRatePercent: number,
  years: number,
): number {
  const months = Math.round(years * 12);
  const monthlyRate = annualRatePercent / 100 / 12;
  if (months <= 0) return 0;
  if (monthlyRate === 0) return monthlyInvestment * months;
  return monthlyInvestment * (((1 + monthlyRate) ** months - 1) / monthlyRate);
}

/** Inflation-adjusted (real) value of a nominal amount. */
export function realValue(
  nominalAmount: number,
  inflationPercent: number,
  years: number,
): number {
  const rate = inflationPercent / 100;
  return nominalAmount / (1 + rate) ** years;
}

/** The "Rule of 72" estimate: years for money to double at a given rate. */
export function ruleOf72(annualRatePercent: number): Ratio {
  if (!Number.isFinite(annualRatePercent) || annualRatePercent <= 0) return null;
  return 72 / annualRatePercent;
}

/* -------------------------------------------------------------------------- */
/* Income statement                                                           */
/* -------------------------------------------------------------------------- */

export interface IncomeStatementInput {
  revenue: number;
  costOfGoods: number;
  operatingExpenses: number;
  depreciation: number;
  interest: number;
  /** Corporate tax rate as a percentage, e.g. 25.17. */
  taxRatePercent: number;
}

export interface IncomeStatementResult {
  revenue: number;
  costOfGoods: number;
  grossProfit: number;
  operatingExpenses: number;
  ebitda: number;
  depreciation: number;
  ebit: number;
  interest: number;
  profitBeforeTax: number;
  tax: number;
  netProfit: number;
  grossMargin: Ratio;
  ebitdaMargin: Ratio;
  operatingMargin: Ratio;
  netProfitMargin: Ratio;
}

/**
 * Build a simple income statement and derive every subtotal plus margins.
 * Tax is only applied to positive pre-tax profit (a simplification that keeps
 * the learning example intuitive).
 */
export function buildIncomeStatement(input: IncomeStatementInput): IncomeStatementResult {
  const {
    revenue,
    costOfGoods,
    operatingExpenses,
    depreciation,
    interest,
    taxRatePercent,
  } = input;

  const grossProfit = revenue - costOfGoods;
  const ebitda = grossProfit - operatingExpenses;
  const ebit = ebitda - depreciation;
  const profitBeforeTax = ebit - interest;
  const tax = profitBeforeTax > 0 ? profitBeforeTax * (taxRatePercent / 100) : 0;
  const netProfit = profitBeforeTax - tax;

  return {
    revenue,
    costOfGoods,
    grossProfit,
    operatingExpenses,
    ebitda,
    depreciation,
    ebit,
    interest,
    profitBeforeTax,
    tax,
    netProfit,
    grossMargin: grossMargin(revenue, costOfGoods),
    ebitdaMargin: ebitdaMargin(ebitda, revenue),
    operatingMargin: operatingMargin(ebit, revenue),
    netProfitMargin: netProfitMargin(netProfit, revenue),
  };
}

/* -------------------------------------------------------------------------- */
/* Balance sheet                                                              */
/* -------------------------------------------------------------------------- */

export interface BalanceSheetInput {
  cash: number;
  inventory: number;
  receivables: number;
  property: number;
  investments: number;
  loans: number;
  payables: number;
  otherLiabilities: number;
  shareCapital: number;
  reserves: number;
}

export interface BalanceSheetResult {
  currentAssets: number;
  nonCurrentAssets: number;
  totalAssets: number;
  liabilities: number;
  equity: number;
  liabilitiesPlusEquity: number;
  /** totalAssets − (liabilities + equity). Zero means the sheet balances. */
  imbalance: number;
  balanced: boolean;
}

/** Aggregate a balance sheet and report whether Assets = Liabilities + Equity. */
export function buildBalanceSheet(input: BalanceSheetInput): BalanceSheetResult {
  const currentAssets = input.cash + input.inventory + input.receivables;
  const nonCurrentAssets = input.property + input.investments;
  const totalAssets = currentAssets + nonCurrentAssets;

  const liabilities = input.loans + input.payables + input.otherLiabilities;
  const equity = input.shareCapital + input.reserves;

  const liabilitiesPlusEquity = liabilities + equity;
  const imbalance = totalAssets - liabilitiesPlusEquity;

  return {
    currentAssets,
    nonCurrentAssets,
    totalAssets,
    liabilities,
    equity,
    liabilitiesPlusEquity,
    imbalance,
    // Allow a tiny tolerance so floating point noise doesn't break the check.
    balanced: Math.abs(imbalance) < 0.01,
  };
}

/* -------------------------------------------------------------------------- */
/* Corporate actions                                                          */
/* -------------------------------------------------------------------------- */

export interface SplitResult {
  newShareCount: number;
  newPrice: number;
  totalValueBefore: number;
  totalValueAfter: number;
}

/**
 * Apply an `n:m` stock split (e.g. 1:2 means each share becomes two).
 * The *conceptual* total value is preserved; real prices are set by the market.
 */
export function applyStockSplit(
  shareCount: number,
  pricePerShare: number,
  ratioFrom: number,
  ratioTo: number,
): SplitResult {
  const totalValueBefore = shareCount * pricePerShare;
  const factor = safeDivide(ratioTo, ratioFrom, 1);
  const newShareCount = shareCount * factor;
  const newPrice = safeDivide(pricePerShare, factor, pricePerShare);

  return {
    newShareCount,
    newPrice,
    totalValueBefore,
    totalValueAfter: newShareCount * newPrice,
  };
}

/** Bonus issue in the `n:m` form (e.g. 1:1 gives one bonus share per held share). */
export function applyBonusIssue(
  shareCount: number,
  bonusFor: number,
  bonusOn: number,
): number {
  return shareCount * safeDivide(bonusFor + bonusOn, bonusOn, 1);
}
