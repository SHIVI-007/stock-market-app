import { describe, expect, it } from "vitest";

import {
  applyStockSplit,
  bookValuePerShare,
  buildBalanceSheet,
  buildIncomeStatement,
  cagr,
  capCategory,
  dividendYield,
  earningsPerShare,
  enterpriseValue,
  evToEbitda,
  freeCashFlow,
  futureValue,
  marketCap,
  netProfitMargin,
  payoutRatio,
  priceToBook,
  priceToEarnings,
  realValue,
  returnOnCapitalEmployed,
  returnOnEquity,
  sipFutureValue,
  debtToEquity,
  workingCapital,
} from "./finance";

describe("market capitalisation", () => {
  it("multiplies share price by shares outstanding", () => {
    // ₹500 × 10 crore shares = ₹5,000 crore
    expect(marketCap(500, 10)).toBe(5000);
  });

  it("classifies size bands without implying quality", () => {
    expect(capCategory(50000)).toBe("Large-cap");
    expect(capCategory(20000)).toBe("Large-cap");
    expect(capCategory(19999)).toBe("Mid-cap");
    expect(capCategory(5000)).toBe("Mid-cap");
    expect(capCategory(4999)).toBe("Small-cap");
  });
});

describe("earnings per share", () => {
  it("divides net profit by shares outstanding", () => {
    // ₹100 crore ÷ 10 crore shares = ₹10 per share
    expect(earningsPerShare(100, 10)).toBe(10);
  });

  it("is null when there are no shares", () => {
    expect(earningsPerShare(100, 0)).toBeNull();
  });
});

describe("price to earnings", () => {
  it("divides price by EPS", () => {
    // ₹500 ÷ ₹20 = 25x
    expect(priceToEarnings(500, 20)).toBe(25);
  });

  it("is not meaningful when earnings are negative or zero", () => {
    expect(priceToEarnings(500, 0)).toBeNull();
    expect(priceToEarnings(500, -5)).toBeNull();
  });
});

describe("price to book", () => {
  it("divides market price by book value per share", () => {
    expect(priceToBook(500, 250)).toBe(2);
  });

  it("computes book value per share from equity", () => {
    // ₹1,000 crore equity ÷ 10 crore shares = ₹100
    expect(bookValuePerShare(1000, 10)).toBe(100);
  });

  it("is null when book value is non-positive", () => {
    expect(priceToBook(500, 0)).toBeNull();
  });
});

describe("return on equity", () => {
  it("expresses net profit as a percentage of equity", () => {
    // ₹100 crore profit on ₹1,000 crore equity = 10%
    expect(returnOnEquity(100, 1000)).toBeCloseTo(10, 6);
  });

  it("is null when equity is zero", () => {
    expect(returnOnEquity(100, 0)).toBeNull();
  });
});

describe("return on capital employed", () => {
  it("expresses EBIT as a percentage of capital employed", () => {
    // ₹300 crore EBIT on ₹1,500 crore capital = 20%
    expect(returnOnCapitalEmployed(300, 1500)).toBeCloseTo(20, 6);
  });

  it("can produce a negative figure when EBIT is negative", () => {
    expect(returnOnCapitalEmployed(-100, 1000)).toBeCloseTo(-10, 6);
  });
});

describe("debt to equity", () => {
  it("divides total debt by equity", () => {
    // ₹500 crore debt ÷ ₹1,000 crore equity = 0.5
    expect(debtToEquity(500, 1000)).toBe(0.5);
  });

  it("is null when equity is zero", () => {
    expect(debtToEquity(500, 0)).toBeNull();
  });
});

describe("CAGR", () => {
  it("computes the compound annual growth rate", () => {
    // ₹100 crore to ₹200 crore over 5 years = 14.87%
    expect(cagr(100, 200, 5)).toBeCloseTo(14.8698, 3);
  });

  it("returns zero growth for unchanged values", () => {
    expect(cagr(100, 100, 5)).toBeCloseTo(0, 6);
  });

  it("is null for non-positive endpoints or periods", () => {
    expect(cagr(0, 200, 5)).toBeNull();
    expect(cagr(100, -50, 5)).toBeNull();
    expect(cagr(100, 200, 0)).toBeNull();
  });
});

describe("dividend metrics", () => {
  it("computes dividend yield as a percentage of price", () => {
    // ₹10 dividend on a ₹500 share = 2%
    expect(dividendYield(10, 500)).toBeCloseTo(2, 6);
  });

  it("computes the payout ratio", () => {
    // ₹5 dividend on ₹20 EPS = 25%
    expect(payoutRatio(5, 20)).toBeCloseTo(25, 6);
  });

  it("is null for a non-positive price or EPS", () => {
    expect(dividendYield(10, 0)).toBeNull();
    expect(payoutRatio(5, 0)).toBeNull();
  });
});

describe("margins", () => {
  it("computes the net profit margin", () => {
    // ₹200 crore profit on ₹1,000 crore revenue = 20%
    expect(netProfitMargin(200, 1000)).toBeCloseTo(20, 6);
  });

  it("is null when revenue is zero", () => {
    expect(netProfitMargin(200, 0)).toBeNull();
  });
});

describe("enterprise value", () => {
  it("adds debt and subtracts cash from market cap", () => {
    // 5,000 + 500 − 200 = 5,300
    expect(enterpriseValue(5000, 500, 200)).toBe(5300);
  });

  it("computes EV/EBITDA as a multiple", () => {
    expect(evToEbitda(5300, 500)).toBeCloseTo(10.6, 6);
  });

  it("is null when EBITDA is non-positive", () => {
    expect(evToEbitda(5300, 0)).toBeNull();
  });
});

describe("working capital", () => {
  it("subtracts current liabilities from current assets", () => {
    expect(workingCapital(800, 500)).toBe(300);
  });

  it("can be negative", () => {
    expect(workingCapital(400, 500)).toBe(-100);
  });
});

describe("free cash flow", () => {
  it("subtracts capital expenditure from operating cash flow", () => {
    expect(freeCashFlow(300, 120)).toBe(180);
  });
});

describe("compounding helpers", () => {
  it("grows a lump sum at a compound rate", () => {
    // ₹1,00,000 at 10% for 2 years = ₹1,21,000
    expect(futureValue(100000, 10, 2)).toBeCloseTo(121000, 6);
  });

  it("accumulates a monthly SIP", () => {
    const result = sipFutureValue(10000, 12, 10);
    expect(result).toBeGreaterThan(10000 * 12 * 10);
  });

  it("discounts for inflation", () => {
    // ₹1,00,000 after one year of 5% inflation ≈ ₹95,238 of today's money
    expect(realValue(100000, 5, 1)).toBeCloseTo(95238.095, 2);
  });

  it("returns zero SIP for a zero period", () => {
    expect(sipFutureValue(10000, 12, 0)).toBe(0);
  });
});

describe("income statement", () => {
  it("derives every subtotal from the inputs", () => {
    const result = buildIncomeStatement({
      revenue: 1000,
      costOfGoods: 700,
      operatingExpenses: 0,
      depreciation: 0,
      interest: 50,
      taxRatePercent: 0,
    });

    expect(result.grossProfit).toBe(300);
    expect(result.ebitda).toBe(300);
    expect(result.ebit).toBe(300);
    expect(result.profitBeforeTax).toBe(250);
    expect(result.netProfit).toBe(250);
  });

  it("computes EBITDA, EBIT and net profit with depreciation and tax", () => {
    const result = buildIncomeStatement({
      revenue: 1000,
      costOfGoods: 400,
      operatingExpenses: 200,
      depreciation: 100,
      interest: 50,
      taxRatePercent: 25,
    });

    expect(result.grossProfit).toBe(600);
    expect(result.ebitda).toBe(400);
    expect(result.ebit).toBe(300);
    expect(result.profitBeforeTax).toBe(250);
    expect(result.tax).toBeCloseTo(62.5, 6);
    expect(result.netProfit).toBeCloseTo(187.5, 6);
  });

  it("does not tax a loss", () => {
    const result = buildIncomeStatement({
      revenue: 100,
      costOfGoods: 80,
      operatingExpenses: 40,
      depreciation: 10,
      interest: 5,
      taxRatePercent: 30,
    });

    expect(result.profitBeforeTax).toBeLessThan(0);
    expect(result.tax).toBe(0);
  });
});

describe("balance sheet", () => {
  it("reports a balanced sheet when assets equal liabilities plus equity", () => {
    const result = buildBalanceSheet({
      cash: 100,
      inventory: 100,
      receivables: 100,
      property: 500,
      investments: 200,
      loans: 200,
      payables: 100,
      otherLiabilities: 50,
      shareCapital: 100,
      reserves: 550,
    });

    expect(result.totalAssets).toBe(1000);
    expect(result.liabilities).toBe(350);
    expect(result.equity).toBe(650);
    expect(result.balanced).toBe(true);
  });

  it("detects an imbalanced sheet", () => {
    const result = buildBalanceSheet({
      cash: 100,
      inventory: 0,
      receivables: 0,
      property: 0,
      investments: 0,
      loans: 0,
      payables: 0,
      otherLiabilities: 0,
      shareCapital: 0,
      reserves: 0,
    });

    expect(result.balanced).toBe(false);
    expect(result.imbalance).toBe(100);
  });
});

describe("corporate actions", () => {
  it("preserves total value through a stock split", () => {
    const result = applyStockSplit(10, 1000, 1, 2);

    expect(result.newShareCount).toBe(20);
    expect(result.newPrice).toBe(500);
    expect(result.totalValueAfter).toBeCloseTo(result.totalValueBefore, 6);
  });
});
