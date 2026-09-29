import type { GlossaryEntry } from "./types";

/**
 * The glossary is authored as data so it can power the searchable UI, the
 * Prisma seed, and inline tooltips.
 */
export const glossary: GlossaryEntry[] = [
  /* ------------------------------- Basics -------------------------------- */
  {
    slug: "share",
    term: "Share",
    category: "Basics",
    definition:
      "One unit of ownership in a company. Owning shares makes you a part-owner with a claim on the company's profits.",
    formula: "Ownership % = Shares owned ÷ Total shares × 100",
    example: "Owning 5,000 of a company's 1,00,000 shares is 5% ownership.",
    related: ["equity", "stock", "dilution"],
  },
  {
    slug: "equity",
    term: "Equity",
    category: "Basics",
    definition:
      "Two related meanings: ownership in a company, and the owners' stake shown on the balance sheet.",
    formula: "Shareholders' equity = Total assets − Total liabilities",
    related: ["balance-sheet", "roe", "share"],
  },
  {
    slug: "stock",
    term: "Stock",
    category: "Basics",
    definition: "A general term for shares of a company. In everyday use, 'stock' and 'share' mean the same thing.",
    related: ["share"],
  },
  {
    slug: "asset",
    term: "Asset",
    category: "Basics",
    definition: "Something of value that a person or company owns — cash, inventory, property, investments.",
    related: ["liability", "balance-sheet"],
  },
  {
    slug: "liability",
    term: "Liability",
    category: "Basics",
    definition: "Something owed to someone else — loans, payables and other obligations.",
    related: ["asset", "balance-sheet"],
  },
  {
    slug: "revenue",
    term: "Revenue",
    category: "Basics",
    definition: "The total money a company brings in from selling goods or services, before any costs are subtracted.",
    formula: "Revenue − Costs = Profit",
    related: ["profit", "net-profit", "income-statement"],
  },
  {
    slug: "profit",
    term: "Profit",
    category: "Basics",
    definition:
      "What remains of revenue after costs. Measured at several levels: gross, EBITDA, operating (EBIT) and net.",
    related: ["net-profit", "ebitda", "ebit", "gross-profit"],
  },
  {
    slug: "gross-profit",
    term: "Gross Profit",
    category: "Statements",
    definition: "Revenue minus the direct cost of the goods or services sold.",
    formula: "Gross profit = Revenue − Cost of goods / services",
    related: ["gross-margin", "income-statement"],
  },
  {
    slug: "ebitda",
    term: "EBITDA",
    category: "Statements",
    definition:
      "Earnings Before Interest, Tax, Depreciation and Amortisation. A view of operating performance before financing and accounting effects.",
    formula: "EBITDA = Gross profit − Operating expenses",
    related: ["ebit", "ev-ebitda", "income-statement"],
  },
  {
    slug: "ebit",
    term: "EBIT (Operating Profit)",
    category: "Statements",
    definition:
      "Earnings Before Interest and Tax — EBITDA less depreciation and amortisation. Used to judge the business itself, before how it is financed.",
    formula: "EBIT = EBITDA − Depreciation & amortisation",
    related: ["ebitda", "operating-margin", "roce"],
  },
  {
    slug: "net-profit",
    term: "Net Profit",
    category: "Statements",
    definition: "The bottom line: profit after every expense, including interest and tax.",
    formula: "Net profit = EBIT − Interest − Tax",
    related: ["profit", "net-margin", "eps"],
  },

  /* -------------------------------- Market -------------------------------- */
  {
    slug: "stock-market",
    term: "Stock Market",
    category: "Market",
    definition:
      "The overall system where shares of companies are bought and sold — comprising exchanges, brokers, depositories and investors.",
    related: ["stock-exchange", "nse", "bse"],
  },
  {
    slug: "stock-exchange",
    term: "Stock Exchange",
    category: "Market",
    definition:
      "An organised marketplace that brings buyers and sellers together, matches their orders and publishes prices.",
    related: ["nse", "bse", "stock-market"],
  },
  {
    slug: "nse",
    term: "NSE",
    category: "Market",
    definition:
      "The National Stock Exchange of India, one of India's two main stock exchanges, based in Mumbai. Its flagship index is the Nifty 50.",
    related: ["bse", "index", "stock-exchange"],
  },
  {
    slug: "bse",
    term: "BSE",
    category: "Market",
    definition:
      "The Bombay Stock Exchange, Asia's oldest stock exchange. Its flagship index is the Sensex.",
    related: ["nse", "index", "stock-exchange"],
  },
  {
    slug: "sebi",
    term: "SEBI",
    category: "Market",
    definition:
      "The Securities and Exchange Board of India — the statutory regulator that oversees India's securities markets and protects investors.",
    related: ["stock-market", "stock-exchange"],
  },
  {
    slug: "nsdl",
    term: "NSDL",
    category: "Market",
    definition:
      "National Securities Depository Limited — one of India's two depositories, holding securities in electronic form.",
    related: ["cdsl", "demat-account"],
  },
  {
    slug: "cdsl",
    term: "CDSL",
    category: "Market",
    definition:
      "Central Depository Services (India) Limited — India's other depository, holding securities electronically.",
    related: ["nsdl", "demat-account"],
  },
  {
    slug: "demat-account",
    term: "Demat Account",
    category: "Market",
    definition:
      "An account that holds your securities electronically, much as a bank account holds your money.",
    related: ["trading-account", "nsdl", "cdsl"],
  },
  {
    slug: "trading-account",
    term: "Trading Account",
    category: "Market",
    definition: "An account used to place buy and sell orders through a broker. It is separate from the demat account that holds the securities.",
    related: ["demat-account", "broker"],
  },
  {
    slug: "broker",
    term: "Broker",
    category: "Market",
    definition:
      "A registered intermediary that places orders on an exchange on your behalf.",
    related: ["trading-account", "stock-exchange"],
  },
  {
    slug: "index",
    term: "Index",
    category: "Market",
    definition:
      "A basket of securities used to track a market or segment. The Nifty 50 and Sensex summarise large Indian companies.",
    related: ["nse", "bse"],
  },
  {
    slug: "volume",
    term: "Volume",
    category: "Market",
    definition: "The number of shares traded over a period. High volume usually means an active market.",
    related: ["liquidity"],
  },
  {
    slug: "liquidity",
    term: "Liquidity",
    category: "Market",
    definition:
      "How easily something can be bought or sold without moving its price much. Large, heavily traded shares are usually more liquid.",
    related: ["volume", "spread"],
  },
  {
    slug: "volatility",
    term: "Volatility",
    category: "Market",
    definition:
      "How much a price swings around over time. High volatility means bigger up-and-down moves, which is a source of uncertainty.",
    related: ["liquidity"],
  },
  {
    slug: "bid",
    term: "Bid",
    category: "Market",
    definition: "The highest price a buyer is currently willing to pay for a share.",
    related: ["ask", "spread", "order-book"],
  },
  {
    slug: "ask",
    term: "Ask (Offer)",
    category: "Market",
    definition: "The lowest price a seller is currently willing to accept.",
    related: ["bid", "spread", "order-book"],
  },
  {
    slug: "spread",
    term: "Spread",
    category: "Market",
    definition: "The gap between the best bid and the best ask — a simple measure of trading cost and liquidity.",
    formula: "Spread = Ask − Bid",
    related: ["bid", "ask", "liquidity"],
  },
  {
    slug: "order-book",
    term: "Order Book",
    category: "Market",
    definition: "The live list of resting buy and sell orders at various prices.",
    related: ["bid", "ask", "market-order", "limit-order"],
  },
  {
    slug: "market-order",
    term: "Market Order",
    category: "Market",
    definition:
      "An instruction to buy or sell immediately at the best available price. Prioritises execution over price.",
    related: ["limit-order"],
  },
  {
    slug: "limit-order",
    term: "Limit Order",
    category: "Market",
    definition:
      "An instruction to buy or sell only at a specified price or better. Prioritises price over certainty of execution.",
    related: ["market-order"],
  },
  {
    slug: "ipo",
    term: "IPO (Initial Public Offering)",
    category: "Market",
    definition:
      "The first time a company offers its shares to the public, raising money in the primary market.",
    related: ["primary-market", "secondary-market", "rights-issue"],
  },
  {
    slug: "primary-market",
    term: "Primary Market",
    category: "Market",
    definition:
      "Where securities are created and sold by the issuer. Money raised here goes to the company.",
    related: ["ipo", "secondary-market"],
  },
  {
    slug: "secondary-market",
    term: "Secondary Market",
    category: "Market",
    definition:
      "Where already-issued securities trade between investors. Money changes hands between investors, not with the company.",
    related: ["primary-market", "stock-exchange"],
  },
  {
    slug: "circuit",
    term: "Circuit Limit",
    category: "Market",
    definition:
      "A price band within which a share is allowed to move in a session. Exchanges apply these to temper extreme moves.",
    related: ["volatility", "stock-exchange"],
  },

  /* ----------------------------- Statements ------------------------------ */
  {
    slug: "income-statement",
    term: "Income Statement",
    category: "Statements",
    definition:
      "A statement covering a period that starts with revenue and subtracts costs step by step to reach net profit.",
    related: ["revenue", "net-profit", "cash-flow-statement"],
  },
  {
    slug: "balance-sheet",
    term: "Balance Sheet",
    category: "Statements",
    definition:
      "A snapshot on a single date of what a company owns (assets) and what it owes (liabilities) plus owners' equity.",
    formula: "Assets = Liabilities + Equity",
    related: ["asset", "liability", "equity"],
  },
  {
    slug: "cash-flow-statement",
    term: "Cash Flow Statement",
    category: "Statements",
    definition:
      "A statement covering a period that shows actual cash movements, split into operating, investing and financing activities.",
    related: ["operating-cash-flow", "free-cash-flow", "income-statement"],
  },
  {
    slug: "operating-cash-flow",
    term: "Operating Cash Flow",
    category: "Statements",
    definition: "Cash generated by the normal running of the business — selling goods and paying suppliers and staff.",
    related: ["cash-flow-statement", "free-cash-flow"],
  },
  {
    slug: "free-cash-flow",
    term: "Free Cash Flow",
    category: "Statements",
    definition: "Operating cash flow left after capital expenditure. The cash available to repay debt, pay dividends or reinvest.",
    formula: "Free cash flow = Operating cash flow − Capital expenditure",
    related: ["operating-cash-flow", "cash-flow-statement"],
  },
  {
    slug: "working-capital",
    term: "Working Capital",
    category: "Statements",
    definition: "Short-term money tied up in running the business: receivables and inventory, less what suppliers are owed.",
    formula: "Working capital = Current assets − Current liabilities",
    related: ["receivables", "inventory", "payables"],
  },
  {
    slug: "receivables",
    term: "Receivables",
    category: "Statements",
    definition:
      "Money customers owe the company for goods or services already delivered and recorded as revenue.",
    related: ["working-capital", "revenue"],
  },
  {
    slug: "inventory",
    term: "Inventory",
    category: "Statements",
    definition: "Stock held for sale or use. Cash spent on inventory has left the business before the sale is made.",
    related: ["working-capital"],
  },
  {
    slug: "payables",
    term: "Payables",
    category: "Statements",
    definition: "Money the company owes to its suppliers. It effectively funds part of the business.",
    related: ["working-capital", "liability"],
  },
  {
    slug: "depreciation",
    term: "Depreciation",
    category: "Statements",
    definition:
      "An accounting charge that spreads the cost of a long-lived asset over its useful life. It reduces profit but does not use cash.",
    related: ["ebitda", "cash-flow-statement"],
  },
  {
    slug: "retained-earnings",
    term: "Retained Earnings",
    category: "Statements",
    definition:
      "Profits kept in the business rather than paid out as dividends. It accumulates within shareholders' equity.",
    related: ["dividend", "equity", "balance-sheet"],
  },

  /* ------------------------------- Ratios -------------------------------- */
  {
    slug: "eps",
    term: "EPS (Earnings Per Share)",
    category: "Ratios",
    definition: "The profit attributable to each share, and the building block of the P/E ratio.",
    formula: "EPS = Net profit ÷ Shares outstanding",
    example: "₹100 crore profit ÷ 10 crore shares = ₹10 EPS",
    related: ["pe-ratio", "net-profit", "dilution"],
  },
  {
    slug: "pe-ratio",
    term: "P/E Ratio",
    category: "Ratios",
    definition:
      "How many rupees the market pays per rupee of annual earnings. Useful only in context — the company's history, its sector, growth, and risk.",
    formula: "P/E = Share price ÷ EPS",
    example: "₹500 ÷ ₹20 = 25",
    related: ["eps", "enterprise-value", "ev-ebitda"],
  },
  {
    slug: "pb-ratio",
    term: "P/B Ratio",
    category: "Ratios",
    definition:
      "Market price compared with the accounting net worth per share. More informative for asset-heavy businesses such as banks.",
    formula: "P/B = Share price ÷ Book value per share",
    related: ["book-value-per-share", "equity"],
  },
  {
    slug: "book-value-per-share",
    term: "Book Value Per Share",
    category: "Ratios",
    definition: "Shareholders' equity divided by the number of shares — an accounting, not a market, value.",
    formula: "Book value per share = Shareholders' equity ÷ Shares outstanding",
    related: ["pb-ratio", "equity"],
  },
  {
    slug: "roe",
    term: "ROE (Return on Equity)",
    category: "Ratios",
    definition:
      "Profit generated for each ₹100 of shareholders' money. High ROE can come from real strength — or from heavy borrowing.",
    formula: "ROE = Net profit ÷ Shareholders' equity × 100",
    related: ["roce", "debt-to-equity"],
  },
  {
    slug: "roce",
    term: "ROCE (Return on Capital Employed)",
    category: "Ratios",
    definition:
      "Operating profit measured against all long-term capital, so companies with different debt levels can be compared.",
    formula: "ROCE = EBIT ÷ (Equity + Debt) × 100",
    related: ["roe", "ebit"],
  },
  {
    slug: "debt-to-equity",
    term: "Debt-to-Equity",
    category: "Ratios",
    definition: "How much borrowed money the company uses for each rupee of owners' money.",
    formula: "D/E = Total debt ÷ Shareholders' equity",
    example: "₹500 crore debt ÷ ₹1,000 crore equity = 0.5",
    related: ["roe", "interest-coverage"],
  },
  {
    slug: "interest-coverage",
    term: "Interest Coverage",
    category: "Ratios",
    definition: "How many times operating profit covers the interest bill. A rough gauge of debt comfort.",
    formula: "Interest coverage = EBIT ÷ Interest expense",
    related: ["debt-to-equity", "ebit"],
  },
  {
    slug: "gross-margin",
    term: "Gross Margin",
    category: "Ratios",
    definition: "Gross profit as a percentage of revenue — the basic economics of what is sold.",
    formula: "Gross margin = Gross profit ÷ Revenue × 100",
    related: ["gross-profit", "operating-margin"],
  },
  {
    slug: "operating-margin",
    term: "Operating Margin",
    category: "Ratios",
    definition: "Operating profit (EBIT) as a percentage of revenue.",
    formula: "Operating margin = EBIT ÷ Revenue × 100",
    related: ["ebit", "net-margin"],
  },
  {
    slug: "net-margin",
    term: "Net Profit Margin",
    category: "Ratios",
    definition: "Net profit as a percentage of revenue — what is left at the very bottom.",
    formula: "Net margin = Net profit ÷ Revenue × 100",
    related: ["net-profit", "operating-margin"],
  },
  {
    slug: "dividend-yield",
    term: "Dividend Yield",
    category: "Returns",
    definition:
      "The annual dividend as a percentage of the share price. A very high yield can reflect a fallen price.",
    formula: "Dividend yield = Dividend per share ÷ Share price × 100",
    related: ["dividend", "payout-ratio"],
  },
  {
    slug: "payout-ratio",
    term: "Payout Ratio",
    category: "Returns",
    definition: "The share of earnings paid out as dividends rather than retained in the business.",
    formula: "Payout ratio = Dividend per share ÷ EPS × 100",
    related: ["dividend", "retained-earnings"],
  },
  {
    slug: "dividend",
    term: "Dividend",
    category: "Returns",
    definition: "A share of profit paid to shareholders, usually as cash per share, decided by the board.",
    related: ["dividend-yield", "payout-ratio", "retained-earnings"],
  },
  {
    slug: "cagr",
    term: "CAGR",
    category: "Returns",
    definition:
      "Compound Annual Growth Rate — the smoothed annual rate between a starting and ending value. A description of the past.",
    formula: "CAGR = (End ÷ Begin)^(1 / Years) − 1",
    example: "₹100 crore to ₹200 crore over 5 years ≈ 14.87%",
    related: ["revenue", "net-profit"],
  },

  /* ------------------------------ Valuation ------------------------------ */
  {
    slug: "market-cap",
    term: "Market Capitalisation",
    category: "Valuation",
    definition: "The market's price tag for the whole company.",
    formula: "Market cap = Share price × Shares outstanding",
    example: "₹500 × 10 crore shares = ₹5,000 crore",
    related: ["share", "enterprise-value"],
  },
  {
    slug: "enterprise-value",
    term: "Enterprise Value",
    category: "Valuation",
    definition:
      "The cost of buying the whole business and taking on its debt, net of its cash. Useful when comparing companies financed differently.",
    formula: "EV ≈ Market cap + Total debt − Cash",
    related: ["ev-ebitda", "market-cap"],
  },
  {
    slug: "ev-ebitda",
    term: "EV/EBITDA",
    category: "Valuation",
    definition:
      "Enterprise value measured against EBITDA. Financing-neutral, but it ignores capital expenditure and working-capital changes.",
    formula: "EV/EBITDA = Enterprise value ÷ EBITDA",
    related: ["enterprise-value", "ebitda"],
  },
  {
    slug: "dilution",
    term: "Dilution",
    category: "Valuation",
    definition:
      "The reduction in existing owners' percentage when a company issues new shares.",
    related: ["share", "eps"],
  },
  {
    slug: "stock-split",
    term: "Stock Split",
    category: "Valuation",
    definition:
      "Dividing each existing share into more shares. The number of shares rises and the price falls proportionally; total value is conceptually unchanged.",
    example: "1:2 split turns 10 shares at ₹1,000 into 20 shares at ₹500",
    related: ["bonus-shares", "share"],
  },
  {
    slug: "bonus-shares",
    term: "Bonus Shares",
    category: "Valuation",
    definition:
      "Free additional shares issued to existing shareholders, funded from reserves rather than cash.",
    related: ["stock-split", "retained-earnings"],
  },
  {
    slug: "buyback",
    term: "Buyback",
    category: "Valuation",
    definition: "A company buying back its own shares, which reduces the number of shares outstanding.",
    related: ["dilution", "share"],
  },
  {
    slug: "rights-issue",
    term: "Rights Issue",
    category: "Valuation",
    definition:
      "An offer of new shares to existing shareholders, usually at a discount, in proportion to their holding.",
    related: ["ipo", "dilution"],
  },
];

export const glossaryCategories = Array.from(
  new Set(glossary.map((entry) => entry.category)),
).sort();

export function searchGlossary(query: string): GlossaryEntry[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return glossary;

  return glossary.filter((entry) => {
    const haystack = [
      entry.term,
      entry.definition,
      entry.formula ?? "",
      entry.example ?? "",
      entry.category,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}

export function getGlossaryTerm(slug: string): GlossaryEntry | undefined {
  return glossary.find((entry) => entry.slug === slug);
}
