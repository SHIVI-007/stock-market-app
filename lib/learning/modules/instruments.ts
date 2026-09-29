import { danger, fx, h, info, ok, p, q, steps, tbl, tool, ul, warn } from "../blocks";
import type { Chapter } from "../types";

export const instrumentsChapters: Chapter[] = [
  /* ======================================================================== */
  /* CHAPTER 10 — Orders                                                       */
  /* ======================================================================== */
  {
    slug: "chapter-10-orders",
    title: "Market Orders",
    subtitle: "The instructions you give to buy or sell",
    chapterOrder: 10,
    difficulty: "INTERMEDIATE",
    description:
      "An order is your instruction to the market. This chapter explains how market, limit, stop-loss and stop-limit orders differ, and why none of them is a guarantee.",
    lessons: [
      {
        slug: "lesson-1-market-and-limit-orders",
        title: "Market and limit orders",
        summary: "One order chases execution, the other chases price.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 9,
        interactive: "OrderBookSimulator",
        blocks: [
          p(
            "To buy or sell a share you place an order through a broker registered with SEBI. That broker is connected to an exchange such as the NSE or the BSE, which matches buyers with sellers. The order is simply your instruction — and the type of order decides what you are asking the market to do.",
          ),
          p(
            "Two everyday order types sit at opposite ends of one trade-off: certainty about whether the trade happens, versus certainty about the price you get. You cannot have both at once.",
          ),
          h("A market order prioritises execution"),
          p(
            "A market order says: 'buy (or sell) this many shares right now, at whatever price is available.' It is matched against the best prices currently sitting in the order book — the queue of standing buy and sell orders. The priority is that the trade completes; the price is whatever the market offers at that moment.",
          ),
          h("A limit order prioritises price"),
          p(
            "A limit order says: 'only trade at this price or better.' A buy limit sits at or below a price you choose; a sell limit sits at or above it. The price is under your control, but the trade only happens if the market reaches your price while your order is waiting. If it never gets there, nothing happens.",
          ),
          h("The trade-off in one table"),
          tbl(
            ["Order type", "What you control", "What is uncertain", "When it tends to suit"],
            [
              ["Market", "How many shares", "The exact price you will get", "When completing the trade matters most"],
              ["Limit", "The price you will accept", "Whether the trade happens at all", "When the price matters most"],
            ],
            "Neither order is better — they simply prioritise different things.",
          ),
          tool("OrderBookSimulator"),
          info(
            "The price you see on your screen is usually the last traded price, not a promise. By the time a market order reaches the exchange, the best available price may already have moved — most noticeably in shares that trade thinly.",
          ),
          warn(
            "In a share that trades only a few times a day, a market order can fill at a surprisingly different price from the last one you saw. A limit order protects the price, but in exchange it may never fill.",
            "Liquidity matters",
          ),
        ],
        keyTakeaways: [
          "A market order prioritises execution at whatever price is available.",
          "A limit order prioritises a chosen price and may never fill.",
          "Every order is an instruction to a broker, not a promise about price.",
          "Thinly traded shares can move sharply between the screen price and the fill.",
        ],
        quiz: [
          q(
            "What does a market order prioritise?",
            [
              "Getting the best possible price",
              "Completing the trade quickly at the best available price",
              "Trading only at a chosen price",
              "Trading only after a trigger is reached",
            ],
            1,
            "A market order asks for execution now, at the best prices in the order book. Getting the trade done is the priority, so the price is not guaranteed.",
          ),
          q(
            "What does a limit order prioritise?",
            ["Speed of execution", "A chosen price or better", "Guaranteed dividend income", "Avoiding all risk"],
            1,
            "A limit order fixes a price and only trades at that price or better. You keep control of the price, but the trade may never happen.",
          ),
          q(
            "You place a buy limit order at ₹95 for a share currently trading at ₹100. What happens?",
            [
              "It buys immediately at ₹100",
              "It waits until the share is offered at ₹95 or lower",
              "It buys at ₹95 instantly",
              "It triggers a stop",
            ],
            1,
            "A buy limit at ₹95 only executes when the market offers the share at ₹95 or lower. Until then the order waits, and it may never fill at all.",
          ),
        ],
      },
      {
        slug: "lesson-2-stop-orders",
        title: "Stop-loss and stop-limit orders",
        summary: "Conditional instructions — useful, but never a guarantee.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 10,
        interactive: "OrderBookSimulator",
        blocks: [
          p(
            "A stop order is not a different way of pricing a trade — it is a way of delaying one. You choose a trigger price, called the stop. Nothing happens while the market stays away from that level. Only when the price reaches the stop does the order wake up and become a live order sent to the exchange.",
          ),
          h("Stop-loss orders"),
          p(
            "A stop-loss is usually set to limit a loss. Imagine you hold shares and have decided you would rather exit if the price falls to a certain level. You place a stop-loss sell with the stop at that level. When the share trades at or below the stop, the order triggers and is sent to the exchange as a market order to sell.",
          ),
          h("Stop-limit orders"),
          p(
            "A stop-limit order adds a price limit to the triggered order. When the stop is reached, the order becomes a limit order instead of a market order. That gives you control over the worst price you will accept — but the trade may not happen at all if the price races straight past your limit.",
          ),
          tbl(
            ["Order", "Trigger", "What happens after the trigger", "Main risk"],
            [
              ["Stop-loss", "Price reaches the stop", "Becomes a market order", "The fill price can be worse than the stop"],
              ["Stop-limit", "Price reaches the stop", "Becomes a limit order", "It may not fill if the price jumps past the limit"],
            ],
          ),
          steps([
            { title: "Set the stop", text: "You choose the trigger price and place the order with your broker." },
            { title: "Wait", text: "While the market is away from the stop, no order reaches the exchange." },
            { title: "Trigger", text: "When the price touches the stop, the order activates automatically." },
            { title: "Send", text: "It is sent as a market order or a limit order, depending on the type." },
          ]),
          tool("OrderBookSimulator"),
          danger(
            "A stop order is an instruction to a broker, not a guarantee. It depends on the broker and exchange systems working, and on trades actually happening near your stop. Prices can also jump straight past a stop — overnight, or on sudden news — so the price you get can be well away from the level you set.",
            "This is important",
          ),
          p(
            "That jump is called a gap. If a share closes at ₹100 and opens at ₹92 the next morning, a stop set at ₹98 does not fill at ₹98 — it fills somewhere around ₹92 or lower, because there was no trading in between at your level.",
          ),
          ok(
            "Use stop orders as a planned way to act on a rule you have already decided. Just remember that the plan is executed by a broker and the market, and neither can promise a specific price.",
          ),
        ],
        keyTakeaways: [
          "A stop order lies dormant until the price reaches a chosen trigger.",
          "A stop-loss becomes a market order; a stop-limit becomes a limit order.",
          "Stops are instructions to a broker, not guarantees of price.",
          "A price gap can cause the fill to be far from the stop level.",
        ],
        quiz: [
          q(
            "What causes a stop-loss order to become a live order?",
            ["A dividend payment", "The price reaching the stop level", "The end of the trading day", "A change in market cap"],
            1,
            "The stop is a trigger, not a price. Once the share trades at the stop level, the order activates and is sent to the exchange.",
          ),
          q(
            "Why is a stop-loss not a guarantee of the price you will get?",
            [
              "Brokers quietly change the level",
              "The market can gap past the stop, so the fill may be worse than expected",
              "Stops only work at weekends",
              "Regulators cancel them",
            ],
            1,
            "After triggering, the order behaves like a market order and fills at whatever price is available. If the price jumps past the stop, the fill can be well beyond it.",
          ),
          q(
            "How does a stop-limit order differ from a stop-loss order?",
            [
              "It triggers earlier",
              "After triggering, it becomes a limit order with a price limit",
              "It never triggers",
              "It guarantees a fill",
            ],
            1,
            "A stop-limit converts the triggered order into a limit order, giving you control over the worst price. The trade-off is that it may not fill if the price races past your limit.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 11 — Important stock market terms                                 */
  /* ======================================================================== */
  {
    slug: "chapter-11-terms",
    title: "Important Stock Market Terms",
    subtitle: "The shorthand you will meet everywhere",
    chapterOrder: 11,
    difficulty: "BEGINNER",
    description:
      "Market writing is full of shorthand. This chapter untangles the words you will meet constantly, one plain-English definition at a time.",
    lessons: [
      {
        slug: "lesson-1-vocabulary",
        title: "The vocabulary you need",
        summary: "Share, equity, stock, market cap, volume, liquidity, volatility and index.",
        difficulty: "BEGINNER",
        estimatedMinutes: 8,
        interactive: "TermExplorer",
        blocks: [
          p(
            "Financial writing uses so much shorthand that beginners often nod along without a clear picture. None of it is complicated once it is untangled. Here are eight words you will meet almost every day.",
          ),
          tbl(
            ["Term", "Plain-English meaning"],
            [
              ["Share", "One unit of ownership in a company."],
              ["Equity", "Another word for ownership in a company."],
              ["Stock", "A general word for a company's shares, or a collection of them."],
              ["Market cap", "The total value of a company's shares — share price × shares outstanding."],
              ["Volume", "The number of shares traded in a period."],
              ["Liquidity", "How easily a share can be bought or sold without moving its price."],
              ["Volatility", "How much a share's price swings up and down."],
              ["Index", "A basket of shares tracked as one number to represent a market or segment."],
            ],
            "Eight words that make most market headlines readable.",
          ),
          tool("TermExplorer"),
          h("Volume, liquidity and volatility"),
          p(
            "These three describe how a share trades, and they are easy to confuse. Volume is how many shares changed hands — a count of activity. Liquidity is how easily you can trade without shifting the price — a measure of the depth of standing orders. Volatility is how much the price swings — a measure of how restless it is.",
          ),
          p(
            "They can move independently. A share can see high volume on one frantic day and still be illiquid on quiet days. A calm, liquid share can be volatile for a week around a results announcement.",
          ),
          info(
            "An index is simply a basket of shares used as a yardstick — for example, a basket chosen to represent the largest companies on the NSE or the BSE. When people say 'the market was up today', they usually mean an index was up.",
          ),
          ok(
            "Learn these eight and most headlines stop being noise. If a word still feels fuzzy, it is worth pausing to pin down before reading further.",
          ),
        ],
        keyTakeaways: [
          "A share is a unit of ownership; equity and stock are related words for the same idea.",
          "Market cap is the total value of a company's shares.",
          "Volume counts trades; liquidity measures how easily a share trades; volatility measures price swings.",
          "An index tracks a basket of shares as a single number.",
        ],
        quiz: [
          q(
            "Which term measures how easily a share can be bought or sold without moving its price?",
            ["Volume", "Liquidity", "Volatility", "Market cap"],
            1,
            "Liquidity is about depth in the order book — the ability to trade without shifting the price. Volume counts trades, and volatility measures how much the price swings.",
          ),
          q(
            "What is an index?",
            ["One company's share price", "A basket of shares tracked as one number", "A type of bond", "A government tax"],
            1,
            "An index tracks a basket of shares chosen to represent a market or a segment, reporting their combined movement as one number.",
          ),
          q(
            "A share has a very high price per share. Does that mean it is a large company?",
            [
              "Yes, always",
              "No — size needs both the share price and the number of shares",
              "Only on the NSE",
              "Only if it pays a dividend",
            ],
            1,
            "Size is market cap = price × shares outstanding. A high price with very few shares can still be a small company.",
          ),
        ],
      },
      {
        slug: "lesson-2-more-terms",
        title: "More essential terms",
        summary: "Dividend, yield, EPS, earnings, revenue, profit and debt.",
        difficulty: "BEGINNER",
        estimatedMinutes: 9,
        interactive: "TermExplorer",
        blocks: [
          p(
            "The next set of words comes from company results and valuations. They describe what a business earned, what it paid out to owners, and what it owes.",
          ),
          tbl(
            ["Term", "Plain-English meaning"],
            [
              ["Revenue", "The total money a company collected from customers."],
              ["Profit", "What is left after costs are subtracted from revenue."],
              ["Earnings", "Another word for a company's net profit — the bottom line."],
              ["EPS", "Earnings per share — net profit divided by the number of shares."],
              ["Dividend", "A share of profit paid out in cash to shareholders."],
              ["Yield", "The dividend expressed as a percentage of the share price."],
              ["Debt", "Money a company has borrowed and must repay, usually with interest."],
            ],
            "Seven more words that turn up in almost every set of results.",
          ),
          tool("TermExplorer"),
          h("Revenue, profit and earnings"),
          p(
            "Revenue is the top line — money collected from customers before any costs. Profit is what remains after costs are subtracted, and it is measured at several levels. Earnings usually means net profit, the very bottom line after interest and tax. A company can grow revenue quickly and still see earnings fall if its costs rise faster.",
          ),
          h("Dividend and yield"),
          p(
            "A dividend is a share of profit that a company chooses to pay out in cash to its owners. Many companies keep part of their profit to reinvest instead. Yield expresses the dividend as a percentage of the share price, so you can compare income from different shares.",
          ),
          fx(
            "Dividend yield = Annual dividend per share ÷ Share price × 100",
            "A ₹4 dividend on a ₹100 share is a 4% yield.",
          ),
          info(
            "Earnings per share (EPS) divides net profit by the number of shares, so you can compare earnings on a per-share basis. If a company issues more shares without growing profit, EPS falls — that is dilution showing up in the numbers.",
          ),
          warn(
            "A very high dividend yield can be a warning sign, not a bargain. Because yield is dividend ÷ price, a sharply fallen share price makes the yield look large — even when the dividend itself may not be sustainable.",
            "High yield is not always good news",
          ),
        ],
        keyTakeaways: [
          "Revenue is the top line; profit and earnings are what remain after costs.",
          "Earnings usually means net profit — the bottom line.",
          "A dividend is profit paid out in cash; yield is the dividend as a percentage of price.",
          "Debt is borrowed money that must be repaid, usually with interest.",
        ],
        quiz: [
          q(
            "Which is the 'top line' of a company's results?",
            ["Net profit", "Revenue", "Dividend", "Debt"],
            1,
            "Revenue is the money collected from customers before any costs are subtracted, so it sits at the top. Profit is what remains further down.",
          ),
          q(
            "Dividend yield is best described as:",
            [
              "Total debt divided by equity",
              "Annual dividend per share as a percentage of the share price",
              "Revenue minus profit",
              "Shares traded in a day",
            ],
            1,
            "Yield expresses the dividend as a percentage of the share price, which lets you compare the income different shares would provide.",
          ),
          q(
            "Why can a very high dividend yield be a warning sign?",
            [
              "High yields are illegal",
              "The share price may have fallen sharply, making the yield look large",
              "Dividends are always taxed",
              "It means the company has no debt",
            ],
            1,
            "Because yield = dividend ÷ price, a falling price raises the yield. A very high yield can reflect a weak share price or a dividend that is not sustainable.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 12 — Market capitalisation                                        */
  /* ======================================================================== */
  {
    slug: "chapter-12-market-cap",
    title: "Market Capitalization",
    subtitle: "Putting a price tag on a whole company",
    chapterOrder: 12,
    difficulty: "BEGINNER",
    description:
      "Market cap is the market's price tag for a company's shares. This chapter shows how it is calculated and what the large, mid and small cap bands really mean.",
    lessons: [
      {
        slug: "lesson-1-what-is-market-cap",
        title: "What market cap means",
        summary: "Market cap = share price × shares outstanding.",
        difficulty: "BEGINNER",
        estimatedMinutes: 8,
        interactive: "MarketCapCalculator",
        blocks: [
          p(
            "Market capitalisation, or market cap, is the total value the market places on a company's shares all together. It answers a simple question: if you could buy every share at the current price, what would the whole company cost?",
          ),
          fx(
            "Market capitalisation = Share price × Shares outstanding",
            "Shares outstanding = all the shares the company has issued that are held by investors.",
          ),
          p(
            "Suppose a fictional company, Meridian Tools Ltd, has 2 crore shares outstanding and each share trades at ₹150. Its market cap is 2 crore × ₹150 = ₹300 crore. That single number is far more useful than the share price alone.",
          ),
          h("A high share price is not the same as a big company"),
          p(
            "Share price by itself tells you almost nothing about size. A company with a ₹5,000 share price but only 1 lakh shares outstanding is worth ₹50 crore, while a company with a ₹20 share price and 50 crore shares is worth ₹1,000 crore. The price tag depends on both numbers, not just one.",
          ),
          tbl(
            ["Company (fictional)", "Share price", "Shares outstanding", "Market cap"],
            [
              ["Meridian Tools Ltd", "₹150", "2,00,00,000", "₹300 crore"],
              ["Blue Harbour Foods Ltd", "₹5,000", "1,00,000", "₹50 crore"],
              ["Nova Retail Ltd", "₹20", "50,00,00,000", "₹1,000 crore"],
            ],
            "Same market, three very different sizes — note how the ₹5,000 share is the smallest company of the three.",
          ),
          tool("MarketCapCalculator"),
          info(
            "Market cap changes every second, because the share price changes every second. It is a live market value, not a fixed number or a 'true' worth sitting somewhere waiting to be discovered.",
          ),
          warn(
            "Market cap is what the market currently thinks the equity is worth. It is not the same as the company's intrinsic worth, and it is not the same as the value of its factories, cash or brand.",
            "A price tag, not a verdict",
          ),
          ok(
            "When you read about a company being 'worth ₹X', you are almost always reading its market cap — size measured through the share price.",
          ),
        ],
        keyTakeaways: [
          "Market cap = share price × shares outstanding.",
          "It values the whole company, not a single share.",
          "A high share price does not by itself mean a large company.",
          "Market cap is a live market value, not the company's intrinsic worth.",
        ],
        quiz: [
          q(
            "A company has 1 crore shares outstanding and a share price of ₹200. What is its market cap?",
            ["₹200 crore", "₹2 crore", "₹20 crore", "₹2,000 crore"],
            0,
            "Market cap = price × shares = ₹200 × 1,00,00,000 = ₹200,00,00,000 = ₹200 crore.",
          ),
          q(
            "Two companies have the same share price. Does that mean they are the same size?",
            [
              "Yes, always",
              "No — size also depends on the number of shares outstanding",
              "Only if they pay the same dividend",
              "Only on the BSE",
            ],
            1,
            "Market cap depends on both the price and the number of shares. The same price with different share counts means very different company sizes.",
          ),
          q(
            "What does market cap represent?",
            [
              "The company's cash balance",
              "The market's current value for all its shares",
              "Its total debt",
              "Its annual revenue",
            ],
            1,
            "Market cap is price × shares outstanding — the live value the market places on the equity, not the company's cash, debt or revenue.",
          ),
        ],
      },
      {
        slug: "lesson-2-cap-bands",
        title: "Large, mid and small cap",
        summary: "These bands describe size, never quality.",
        difficulty: "BEGINNER",
        estimatedMinutes: 8,
        interactive: "MarketCapCalculator",
        blocks: [
          p(
            "Investors group companies by size. Large-cap, mid-cap and small-cap are simply bands of market capitalisation. The single most important thing to understand is that these labels describe how big a company is — not how good it is.",
          ),
          h("The bands"),
          tbl(
            ["Band", "Rough market cap (Indian convention)", "What it usually means"],
            [
              ["Large cap", "Roughly ₹20,000 crore and above", "Among the largest, most established listed companies."],
              ["Mid cap", "Roughly ₹5,000–20,000 crore", "Established but smaller than the giants; often still growing."],
              ["Small cap", "Below roughly ₹5,000 crore", "Smaller companies; can grow fast, but more fragile."],
            ],
            "The crore figures are a common teaching simplification, not a fixed rule.",
          ),
          info(
            "SEBI's official classification is based on a company's rank by market cap among listed companies, not on fixed rupee cut-offs. The crore figures above are an educational convention to help you picture the sizes — useful for intuition, but not the formal definition.",
          ),
          h("Size is not quality"),
          p(
            "Every band contains both well-run and poorly-run companies. A large-cap business can be badly managed and expensive; a small-cap business can be brilliantly run and undervalued. The band tells you about scale, and nothing more.",
          ),
          ul([
            "Large caps are usually more liquid, and their prices often move less sharply day to day.",
            "Mid caps often sit in the growth stage — more room to expand, but also more to prove.",
            "Small caps can grow faster, but they are generally more fragile, less liquid and more easily shaken.",
          ]),
          tool("MarketCapCalculator"),
          warn(
            "Do not read 'large cap' as a label of safety, or 'small cap' as a reflection of quality. A band describes size. Judging a company needs its financials, its industry and its valuation, which later chapters explore.",
          ),
          ok(
            "Size is a starting point for organising what you look at — not a shortcut to a judgement about whether a company is any good.",
          ),
        ],
        keyTakeaways: [
          "Large, mid and small cap are bands of market capitalisation — they describe size.",
          "Every band contains both well-run and poorly-run companies.",
          "Indian teaching convention: roughly ₹20,000 crore+ is large cap and ₹5,000–20,000 crore is mid cap.",
          "SEBI's official classification uses market-cap rank, not fixed rupee cut-offs.",
        ],
        quiz: [
          q(
            "Large, mid and small cap describe:",
            ["A company's quality", "A company's size", "A company's debt level", "A company's dividend policy"],
            1,
            "The bands are ranges of market capitalisation, so they describe size. Quality is a separate judgement that needs the financials.",
          ),
          q(
            "Which statement best reflects the trading differences between the bands?",
            [
              "Small caps are always safe",
              "Large caps usually trade more liquidly and move less sharply",
              "Mid caps never lose money",
              "Size says nothing about trading at all",
            ],
            1,
            "Larger companies are generally more liquid and less volatile day to day, though they can still be poor businesses. Band and quality are different things.",
          ),
          q(
            "Do all large-cap companies necessarily run well?",
            [
              "Yes, size proves quality",
              "No — every band contains both well-run and poorly-run companies",
              "Only in India",
              "Only if they join an index",
            ],
            1,
            "Size and quality are independent. A large company can be badly managed and overpriced, and a small company can be efficiently run.",
          ),
        ],
      },
    ],
  },
];
