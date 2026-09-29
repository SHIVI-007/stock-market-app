import { fx, h, info, kv, ok, ol, p, q, steps, tbl, tool, ul, warn } from "../blocks";
import type { Chapter } from "../types";

export const ratiosChapters: Chapter[] = [
  /* ======================================================================== */
  /* CHAPTER 18 — Earnings per share                                          */
  /* ======================================================================== */
  {
    slug: "chapter-18-eps",
    title: "Earnings Per Share (EPS)",
    subtitle: "Profit expressed one share at a time",
    chapterOrder: 18,
    difficulty: "INTERMEDIATE",
    description:
      "EPS turns a company's total profit into a per-share number, so profit can be compared with the share price — and so dilution becomes visible.",
    lessons: [
      {
        slug: "lesson-1-what-eps-measures",
        title: "What EPS measures",
        summary: "Net profit divided by the number of shares — profit on a per-share basis.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 9,
        interactive: "EpsCalculator",
        blocks: [
          p(
            "Earnings per share, or EPS, is one of the most quoted numbers in investing. It answers a simple question: how much profit did the company earn for each share?",
          ),
          p(
            "A company's total profit is called net profit — the money left after all costs, interest and tax. EPS spreads that profit across the shares investors hold. 'Outstanding shares' simply means the shares currently owned by investors.",
          ),
          fx("EPS = Net profit ÷ Number of outstanding shares"),
          h("A worked example"),
          p(
            "Suppose Nova Industries reports a net profit of ₹120 crore and has 24 crore shares outstanding. Divide the two: ₹120 crore ÷ 24 crore = ₹5. Each share therefore represents ₹5 of profit earned in that year.",
          ),
          kv([
            { label: "Net profit", value: "₹120 crore" },
            { label: "Shares outstanding", value: "24 crore" },
            { label: "EPS", value: "₹5.00" },
          ]),
          p(
            "Notice that EPS does not tell you whether the share is expensive. Two shares with an EPS of ₹5 could trade at ₹50 or at ₹300. To judge price you need the next ratio in this course: the P/E ratio.",
          ),
          tool("EpsCalculator"),
          info(
            "EPS is a per-share figure, so it lets you compare a very large company with a small one on the same footing.",
            "Why per-share?",
          ),
          warn(
            "EPS is an accounting number. It can be lifted by one-off gains — like selling a building — that will not repeat. Always check whether the profit came from normal operations.",
            "Read the fine print",
          ),
        ],
        keyTakeaways: [
          "EPS = net profit ÷ number of outstanding shares.",
          "EPS expresses total profit on a per-share basis so it can be compared with the share price.",
          "A higher EPS does not automatically mean a better or cheaper investment.",
          "One-off gains can flatter EPS, so check where the profit came from.",
        ],
        quiz: [
          q(
            "ABC Manufacturing earns a net profit of ₹100 crore and has 50 crore shares outstanding. What is its EPS?",
            ["₹0.50", "₹2", "₹5", "₹50"],
            1,
            "EPS = net profit ÷ shares = ₹100 crore ÷ 50 crore = ₹2 per share.",
          ),
          q(
            "What does a company's EPS tell you?",
            [
              "Whether the share is cheap or expensive",
              "The profit earned for each share",
              "The dividend the company will pay",
              "The total value of the company",
            ],
            1,
            "EPS only expresses profit per share. Price is separate: to judge whether the price is high or low, you compare it with earnings using the P/E ratio.",
          ),
          q(
            "EPS is calculated using:",
            ["Revenue ÷ shares", "Net profit ÷ shares", "Share price ÷ profit", "Dividends ÷ shares"],
            1,
            "EPS uses net profit — the bottom line after costs, interest and tax — divided by outstanding shares. Revenue is the top line, before any costs, so it would overstate what each share really earns.",
          ),
        ],
      },
      {
        slug: "lesson-2-dilution-and-eps",
        title: "Dilution and EPS",
        summary: "How issuing new shares changes EPS, and why the reason matters.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 9,
        interactive: "EpsCalculator",
        blocks: [
          p(
            "Shares outstanding do not stay fixed. When a company issues new shares to raise money — for a factory, an acquisition, or to repay debt — the total share count rises.",
          ),
          p(
            "If profit stays the same but there are more shares to divide it among, EPS falls. This is called dilution.",
          ),
          fx("New EPS = Net profit ÷ New (larger) number of shares"),
          p(
            "Example: ABC Manufacturing earned ₹100 crore with 50 crore shares, so its EPS was ₹2. Now imagine it issues 25 crore new shares, taking the total to 75 crore, while profit stays at ₹100 crore. The new EPS is ₹100 crore ÷ 75 crore ≈ ₹1.33 — lower simply because there are more shares.",
          ),
          tbl(
            ["Before", "After issuing 25 crore new shares"],
            [
              ["Net profit ₹100 crore", "Net profit ₹100 crore"],
              ["50 crore shares", "75 crore shares"],
              ["EPS ₹2.00", "EPS ≈ ₹1.33"],
            ],
            "Dilution lowers EPS when profit does not grow.",
          ),
          tool("EpsCalculator"),
          p(
            "Dilution is not automatically bad. If the money raised is invested in something that eventually earns more profit, EPS can recover and grow beyond its old level. The key question is what the company does with the new money.",
          ),
          ok(
            "A fall in EPS after issuing shares is a prompt to ask: what did the company buy with the cash, and is it likely to earn a good return?",
          ),
          info(
            "The reverse also happens. A company can shrink its share count by buying back shares. With profit unchanged, fewer shares mean a higher EPS.",
            "Buybacks do the opposite",
          ),
        ],
        keyTakeaways: [
          "Issuing new shares increases the share count and dilutes EPS if profit does not grow.",
          "Dilution is only harmful if the money raised fails to create more profit.",
          "Buybacks reduce the share count and can raise EPS.",
          "Always ask what the new capital was used for.",
        ],
        quiz: [
          q(
            "Nova Industries earned ₹150 crore with 30 crore shares (EPS ₹5). It issues 20 crore new shares, taking the total to 50 crore, with profit unchanged. The new EPS is:",
            ["₹5.00", "₹3.00", "₹4.00", "₹2.50"],
            1,
            "₹150 crore ÷ 50 crore = ₹3. The same profit is now divided among more shares, so EPS falls.",
          ),
          q(
            "When does dilution most likely hurt existing shareholders?",
            [
              "When it is used to buy back shares",
              "When the new money earns a poor return",
              "Whenever a company issues shares",
              "When profit rises",
            ],
            1,
            "Dilution always costs some ownership. It only damages value when the capital raised earns less than the ownership given up.",
          ),
          q(
            "A share buyback tends to:",
            ["Reduce EPS", "Increase the number of shares", "Raise EPS if profit is unchanged", "Have no effect on EPS"],
            2,
            "A buyback reduces the number of shares, so the same profit is spread over fewer shares and EPS rises.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 19 — The P/E ratio                                               */
  /* ======================================================================== */
  {
    slug: "chapter-19-pe",
    title: "The P/E Ratio",
    subtitle: "Putting a price on earnings",
    chapterOrder: 19,
    difficulty: "INTERMEDIATE",
    description:
      "The P/E ratio links share price to earnings. Learn what it means, why companies differ, and why it is a question to investigate rather than a verdict.",
    lessons: [
      {
        slug: "lesson-1-what-pe-represents",
        title: "What P/E represents",
        summary: "The number of rupees paid for each rupee of annual earnings.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 9,
        interactive: "PeCalculator",
        blocks: [
          p(
            "The price-to-earnings ratio, or P/E, connects the price of a share with the profit that share earns. It is the most common way people put a price tag on a company's earnings.",
          ),
          fx("P/E = Share price ÷ Earnings per share (EPS)"),
          p(
            "If a share trades at ₹150 and its EPS is ₹10, the P/E is 150 ÷ 10 = 15. Read it as: the market is paying ₹15 for every ₹1 of annual profit.",
          ),
          h("What the number means"),
          p(
            "A P/E of 15 says the price is fifteen times the annual profit per share. A higher P/E means the market is paying more for each rupee of current earnings; a lower P/E means paying less. That is all the ratio states — it is not a verdict.",
          ),
          steps([
            { title: "Find the share price", text: "The current market price of one share." },
            { title: "Find the EPS", text: "The company's net profit divided by its shares." },
            { title: "Divide", text: "Price ÷ EPS gives the P/E." },
          ]),
          tool("PeCalculator"),
          info(
            "Flipping the ratio gives the 'earnings yield' — EPS ÷ price. A P/E of 20 is an earnings yield of 5%. This lets you compare earnings with other kinds of return.",
            "A useful trick",
          ),
          warn(
            "When EPS is negative or close to zero, P/E becomes meaningless or wildly misleading. A company making a loss has no usable P/E.",
          ),
        ],
        keyTakeaways: [
          "P/E = share price ÷ EPS.",
          "It states how many rupees the market pays for each rupee of annual earnings.",
          "A high or low P/E is not by itself good or bad.",
          "P/E is unusable when earnings are negative or near zero.",
        ],
        quiz: [
          q(
            "A share trades at ₹200 and its EPS is ₹8. What is the P/E?",
            ["25", "8", "200", "0.04"],
            0,
            "P/E = ₹200 ÷ ₹8 = 25. The price is 25 times the annual earnings per share.",
          ),
          q(
            "A P/E of 20 means:",
            [
              "The share price is ₹20",
              "The market pays ₹20 for each ₹1 of annual earnings",
              "The company earns ₹20 per share",
              "The share will rise 20%",
            ],
            1,
            "P/E compares price with earnings. A P/E of 20 means each ₹1 of earnings is priced at ₹20.",
          ),
          q(
            "When is P/E not useful?",
            ["When EPS is negative", "When the share price is high", "When a company pays dividends", "Never"],
            0,
            "Dividing a price by a negative or near-zero EPS produces a number with no meaning, so P/E cannot be used for loss-making companies.",
          ),
        ],
      },
      {
        slug: "lesson-2-why-pe-ratios-differ",
        title: "Why P/E ratios differ",
        summary: "Growth, sector and history — and the limits of a single ratio.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 10,
        interactive: "PeCalculator",
        blocks: [
          p(
            "Two companies can report the same EPS and still trade at very different P/Es. The ratio differs because the market is weighing several things at once.",
          ),
          ul([
            "Growth expectations — a company expected to grow profits quickly often carries a higher P/E.",
            "The sector it belongs to — different industries habitually trade on different multiples.",
            "The company's own history — today's P/E compared with its own past range.",
            "Risk and quality — debt, how stable profits are, and how predictable the business is.",
          ]),
          tbl(
            ["Fictional company", "Share price", "EPS", "P/E"],
            [
              ["Nova Industries", "₹220", "₹10", "22"],
              ["ABC Manufacturing", "₹120", "₹10", "12"],
            ],
            "Same EPS, different P/E — the difference raises questions, not answers.",
          ),
          p(
            "Looking at this table, it is tempting to call ABC 'cheap' and Nova 'expensive'. Resist that. The gap may reflect faster expected growth at Nova, the habits of the sectors they operate in, or different levels of risk and debt. The ratio is a starting point for investigation, not a conclusion.",
          ),
          h("How to investigate a P/E"),
          ol([
            "Compare it with the company's own P/E over the last 5–10 years.",
            "Compare it with close competitors in the same industry.",
            "Ask what growth the market might be assuming at this price.",
            "Check debt, cash flow and how stable profits have been.",
          ]),
          warn(
            "P/E has limits: it ignores debt, uses accounting profit that can be smoothed, and looks backwards at the last year. A single year of unusual profit can distort it badly.",
            "Limitations of P/E",
          ),
          tool("PeCalculator"),
          info(
            "A high P/E is not automatically bad and a low P/E is not automatically good. Each is a question: what does the market expect, and does the evidence support it?",
          ),
          p(
            "Whenever you see a P/E, turn it into questions: what has this company's P/E been historically? How does it compare with peers? Is profit growing, flat or falling?",
          ),
        ],
        keyTakeaways: [
          "Growth expectations, sector and risk all influence a company's P/E.",
          "Compare a P/E with the company's own history and with close peers — never with an arbitrary number.",
          "A high or low P/E is a question to investigate, not a judgement.",
          "P/E ignores debt and can be distorted by one-off events.",
        ],
        quiz: [
          q(
            "A company's share price is ₹450 and its EPS is ₹18. Its P/E is:",
            ["25", "18", "450", "4"],
            0,
            "P/E = ₹450 ÷ ₹18 = 25.",
          ),
          q(
            "A lower P/E than its close peers most likely means:",
            [
              "The company is definitely a bargain",
              "It is a question to investigate — possibly slower growth or higher risk",
              "The share cannot fall",
              "The company makes more profit",
            ],
            1,
            "A lower P/E may reflect genuine value, slower expected growth, or higher risk. The ratio points you toward the question but does not answer it.",
          ),
          q(
            "Which is a genuine limitation of the P/E ratio?",
            ["It ignores a company's debt", "It cannot be calculated", "It always overstates value", "It only works for banks"],
            0,
            "P/E looks at earnings and price; it says nothing about how much debt the company carries, so a low P/E can still sit on a heavily indebted business.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 20 — The P/B ratio                                               */
  /* ======================================================================== */
  {
    slug: "chapter-20-pb",
    title: "The P/B Ratio",
    subtitle: "Price compared with accounting net worth",
    chapterOrder: 20,
    difficulty: "INTERMEDIATE",
    description:
      "The price-to-book ratio compares the market price of a share with the accounting net worth behind it. Useful for some businesses, misleading for others.",
    lessons: [
      {
        slug: "lesson-1-price-versus-book-value",
        title: "Price versus book value",
        summary: "Book value per share, and what P/B compares.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 9,
        interactive: "PbCalculator",
        blocks: [
          p(
            "Book value is the accounting value of what a company's shareholders own. It is calculated as total assets minus total liabilities — the same figure as shareholders' equity on the balance sheet.",
          ),
          fx("Book value per share = Shareholders' equity ÷ Number of shares"),
          p(
            "Book value per share divides that equity among the shares. It represents the accounting net worth sitting behind each share.",
          ),
          p(
            "The price-to-book ratio, or P/B, compares the market price with that book value.",
          ),
          fx("P/B = Share price ÷ Book value per share"),
          p(
            "Example: ABC Manufacturing has shareholders' equity of ₹400 crore and 40 crore shares, so book value per share is ₹10. If the share trades at ₹30, its P/B is 3 — the market values the company at three times its accounting net worth.",
          ),
          tool("PbCalculator"),
          info(
            "Book value is based on accounting records, largely at historical cost. It does not reflect what assets would fetch if sold today, nor the value of brands or know-how.",
            "What book value is and is not",
          ),
        ],
        keyTakeaways: [
          "Book value per share = shareholders' equity ÷ number of shares.",
          "P/B = share price ÷ book value per share.",
          "Book value is an accounting measure, largely at historical cost.",
          "P/B compares the market's price with that accounting net worth.",
        ],
        quiz: [
          q(
            "Nova Industries has shareholders' equity of ₹500 crore and 25 crore shares. Its book value per share is:",
            ["₹10", "₹20", "₹25", "₹5"],
            1,
            "Book value per share = ₹500 crore ÷ 25 crore = ₹20.",
          ),
          q(
            "P/B compares:",
            ["Profit with price", "Price with book value per share", "Dividends with profit", "Debt with equity"],
            1,
            "P/B = price ÷ book value per share. It relates the market price to the accounting net worth behind each share.",
          ),
          q(
            "Book value mainly reflects:",
            [
              "Today's market price of assets",
              "Accounting net worth, largely at historical cost",
              "Future growth",
              "The share price",
            ],
            1,
            "Book value comes from the balance sheet at historical cost. It is not a current market valuation of the assets.",
          ),
        ],
      },
      {
        slug: "lesson-2-when-pb-is-useful",
        title: "When P/B is useful",
        summary: "Asset-heavy businesses such as banks — and where P/B breaks down.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 9,
        interactive: "PbCalculator",
        blocks: [
          p(
            "P/B is most informative for businesses whose value is tied to physical, balance-sheet assets — banks, lenders, manufacturers with large plants, and utilities, among others.",
          ),
          ul([
            "Banks and financial firms: loans and investments sit on the balance sheet, so book value is a meaningful anchor.",
            "Asset-heavy manufacturers: factories, machinery and inventory dominate the balance sheet.",
            "Utilities and infrastructure: large, long-lived assets.",
          ]),
          p(
            "For these businesses, comparing price with book value can show whether the market is valuing the net assets far above or below their accounting worth.",
          ),
          p(
            "For others, P/B tells you much less. A software or consulting firm may create most of its value from people, brands and ideas — which are largely absent from book value. A high P/B there is not a warning by itself.",
          ),
          tool("PbCalculator", "Change the equity, share count and price to see how P/B moves."),
          h("Limitations to keep in mind"),
          ul([
            "Intangibles are often missing from book value.",
            "Asset values are historical and may be outdated.",
            "Write-downs can shrink book value suddenly.",
            "Buybacks shrink equity, which can raise P/B without any change in the underlying business.",
          ]),
          warn(
            "As with every ratio, P/B is a question, not an answer. A low P/B can reflect a cheap asset base — or a business whose assets are quietly losing value. Always ask why.",
          ),
        ],
        keyTakeaways: [
          "P/B is most useful for asset-heavy businesses such as banks and utilities.",
          "For asset-light firms, book value misses the things that create the value.",
          "Intangibles and outdated asset values limit what book value captures.",
          "A low P/B is a question to investigate, not a sign of a bargain.",
        ],
        quiz: [
          q(
            "A bank has book value per share of ₹40 and its share trades at ₹60. Its P/B is:",
            ["1.5", "0.67", "40", "2.5"],
            0,
            "P/B = ₹60 ÷ ₹40 = 1.5. The price is 1.5 times book value.",
          ),
          q(
            "P/B is most useful for:",
            [
              "Software firms with few physical assets",
              "Banks and asset-heavy businesses",
              "Companies with no debt",
              "Loss-making start-ups",
            ],
            1,
            "When a business's value sits in balance-sheet assets, book value is a meaningful anchor for comparison.",
          ),
          q(
            "Why can P/B be misleading for a software company?",
            [
              "Its value comes largely from intangibles not captured in book value",
              "Software firms have no assets at all",
              "P/B cannot be calculated",
              "Its profits are too high",
            ],
            0,
            "Brands, skilled people and software itself are often not fully on the balance sheet, so book value understates what creates the value.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 21 — Return on equity                                            */
  /* ======================================================================== */
  {
    slug: "chapter-21-roe",
    title: "Return on Equity (ROE)",
    subtitle: "How hard the company works with owners' money",
    chapterOrder: 21,
    difficulty: "INTERMEDIATE",
    description:
      "ROE measures profit as a share of shareholders' equity. It is powerful, widely used, and easy to misread without context.",
    lessons: [
      {
        slug: "lesson-1-what-roe-measures",
        title: "What ROE measures",
        summary: "Net profit as a percentage of shareholders' equity.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 9,
        interactive: "RoeCalculator",
        blocks: [
          p(
            "Return on equity, or ROE, measures how much profit a company generates for every rupee of shareholders' equity. In effect it asks: how hard is the company working with the owners' money?",
          ),
          fx("ROE = (Net profit ÷ Shareholders' equity) × 100"),
          p(
            "Example: Nova Industries earns a net profit of ₹120 crore on shareholders' equity of ₹800 crore. ROE = (120 ÷ 800) × 100 = 15%. For every ₹100 of owners' money, the company earned ₹15 of profit that year.",
          ),
          p(
            "Notice this is a rate, not an amount. That lets you compare companies of very different sizes on the same basis.",
          ),
          steps([
            { title: "Find net profit", text: "The bottom line after costs, interest and tax." },
            { title: "Find shareholders' equity", text: "Total assets minus total liabilities, from the balance sheet." },
            { title: "Divide and convert to a percentage", text: "(Net profit ÷ Equity) × 100." },
          ]),
          tool("RoeCalculator"),
          info(
            "ROE links the income statement (profit) with the balance sheet (equity). That is why it is often described as a measure of how well management uses capital.",
          ),
          warn(
            "A rising ROE is not automatically good. It can rise because profit grew — or because equity shrank. The next lesson shows why that distinction matters.",
          ),
        ],
        keyTakeaways: [
          "ROE = (net profit ÷ shareholders' equity) × 100.",
          "It expresses profit as a rate, so companies of different sizes can be compared.",
          "ROE links the income statement with the balance sheet.",
          "A rising ROE can come from higher profit or from a smaller equity base.",
        ],
        quiz: [
          q(
            "ABC Manufacturing earns ₹90 crore with shareholders' equity of ₹600 crore. Its ROE is:",
            ["6.7%", "15%", "9%", "90%"],
            1,
            "ROE = (90 ÷ 600) × 100 = 15%.",
          ),
          q(
            "ROE measures:",
            [
              "Profit as a share of revenue",
              "Profit as a share of shareholders' equity",
              "Price as a share of earnings",
              "Debt as a share of equity",
            ],
            1,
            "ROE compares net profit with the money owners have in the business, not with revenue or price.",
          ),
          q(
            "ROE is useful for comparing companies because it:",
            ["Is a rate, not an absolute amount", "Ignores profit", "Uses only the share price", "Is fixed by regulation"],
            0,
            "Because it is a percentage, a large company and a small one can be compared on the same footing.",
          ),
        ],
      },
      {
        slug: "lesson-2-why-roe-needs-context",
        title: "Why ROE needs context",
        summary: "Debt inflates ROE — read it alongside other measures.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 10,
        interactive: "RoeCalculator",
        blocks: [
          p(
            "Two companies can report the same ROE for very different reasons. Understanding those reasons is what turns a number into an insight.",
          ),
          p(
            "Consider two fictional firms. Nova Industries earns ₹100 crore on equity of ₹1,000 crore — an ROE of 10% — using almost no debt. ABC Manufacturing also earns ₹100 crore, but on equity of only ₹500 crore because it has borrowed heavily — an ROE of 20%.",
          ),
          tbl(
            ["Fictional company", "Net profit", "Equity", "Debt", "ROE"],
            [
              ["Nova Industries", "₹100 crore", "₹1,000 crore", "Low", "10%"],
              ["ABC Manufacturing", "₹100 crore", "₹500 crore", "High", "20%"],
            ],
            "Higher ROE can come from leverage, not from a better business.",
          ),
          p(
            "ABC's higher ROE comes mainly from using borrowed money, which reduces the equity base. That can magnify profits in good times — and magnify losses in bad ones. Debt inflates ROE.",
          ),
          tool("RoeCalculator"),
          h("How to read ROE responsibly"),
          ol([
            "Check whether profit or equity is driving the change.",
            "Look at how much debt the company carries.",
            "Compare ROE with the company's own history and with close peers.",
            "Read it alongside ROCE, debt levels and cash flow.",
          ]),
          warn(
            "Never judge a company on ROE alone. A high ROE built on heavy debt carries risk that the single number hides.",
          ),
        ],
        keyTakeaways: [
          "The same ROE figure can come from a strong business or a heavily indebted one.",
          "Debt reduces the equity base and can inflate ROE.",
          "Compare ROE with its own history and close peers, not in isolation.",
          "Read ROE alongside ROCE, debt and cash flow.",
        ],
        quiz: [
          q(
            "A company earns ₹40 crore on equity of ₹400 crore. Its ROE is:",
            ["10%", "40%", "4%", "1%"],
            0,
            "ROE = (40 ÷ 400) × 100 = 10%.",
          ),
          q(
            "How can debt make ROE look higher?",
            [
              "It always increases net profit",
              "It reduces the equity base, so the same profit divides over less equity",
              "It raises revenue",
              "It lowers taxes to zero",
            ],
            1,
            "Borrowing replaces some equity with debt, shrinking the denominator. The same profit then produces a larger ROE — but with added risk.",
          ),
          q(
            "The most complete way to read ROE is:",
            [
              "On its own",
              "Alongside debt, ROCE, history and cash flow",
              "Only against last year",
              "Only against the share price",
            ],
            1,
            "ROE tells one part of the story. Debt, ROCE, history and cash flow together show whether the profit is durable and how it is being financed.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 22 — Return on capital employed                                  */
  /* ======================================================================== */
  {
    slug: "chapter-22-roce",
    title: "Return on Capital Employed (ROCE)",
    subtitle: "How well all the capital is put to work",
    chapterOrder: 22,
    difficulty: "ADVANCED",
    description:
      "ROCE measures operating profit against all the long-term capital a business uses — both equity and debt — making it a fairer lens across different financing choices.",
    lessons: [
      {
        slug: "lesson-1-capital-efficiency",
        title: "Capital efficiency",
        summary: "EBIT divided by equity plus debt.",
        difficulty: "ADVANCED",
        estimatedMinutes: 10,
        interactive: "RoceCalculator",
        blocks: [
          p(
            "Return on capital employed, or ROCE, measures how efficiently a company uses all the long-term capital it has — both the owners' equity and the money it has borrowed.",
          ),
          fx("ROCE = (EBIT ÷ Capital employed) × 100", "Capital employed = shareholders' equity + interest-bearing debt."),
          p(
            "EBIT means earnings before interest and tax — the operating profit, before the effects of how the company is financed. Using EBIT makes ROCE a fairer comparison across companies with different amounts of debt than ROE is.",
          ),
          p(
            "Example: Nova Industries has EBIT of ₹150 crore, shareholders' equity of ₹500 crore and debt of ₹500 crore. Capital employed is ₹1,000 crore, so ROCE = (150 ÷ 1,000) × 100 = 15%.",
          ),
          kv([
            { label: "EBIT", value: "₹150 crore" },
            { label: "Equity", value: "₹500 crore" },
            { label: "Debt", value: "₹500 crore" },
            { label: "Capital employed", value: "₹1,000 crore" },
            { label: "ROCE", value: "15%" },
          ]),
          tool("RoceCalculator"),
          info(
            "Because ROCE uses EBIT (before interest), it looks at the profitability of the business itself rather than the way it happens to be funded.",
          ),
        ],
        keyTakeaways: [
          "ROCE = (EBIT ÷ capital employed) × 100.",
          "Capital employed = shareholders' equity + interest-bearing debt.",
          "Using EBIT removes the effect of financing choices.",
          "ROCE measures how well all the capital is put to work.",
        ],
        quiz: [
          q(
            "A company has EBIT of ₹120 crore, equity of ₹400 crore and debt of ₹400 crore. Its ROCE is:",
            ["30%", "15%", "12%", "20%"],
            1,
            "Capital employed = 400 + 400 = ₹800 crore. ROCE = (120 ÷ 800) × 100 = 15%.",
          ),
          q(
            "ROCE differs from ROE mainly because it:",
            [
              "Uses revenue instead of profit",
              "Includes debt in the capital base and uses EBIT",
              "Ignores profit",
              "Uses the share price",
            ],
            1,
            "By adding debt to the capital base and using profit before interest, ROCE measures the whole business rather than just the owners' slice.",
          ),
          q(
            "ROCE is especially useful when comparing:",
            ["Only companies with no debt", "Companies that are financed differently", "Only banks", "Only start-ups"],
            1,
            "Because it is neutral to financing, ROCE lets you compare a debt-heavy firm with a debt-light one more fairly than ROE allows.",
          ),
        ],
      },
      {
        slug: "lesson-2-why-capital-employed-matters",
        title: "Why capital employed matters",
        summary: "Judging how well a business turns capital into operating profit.",
        difficulty: "ADVANCED",
        estimatedMinutes: 9,
        interactive: "RoceCalculator",
        blocks: [
          p(
            "Some businesses need a great deal of capital to operate — power plants, cement makers, telecom networks. Others need very little. ROCE lets you judge how well each turns that capital into operating profit.",
          ),
          p(
            "A ROCE figure tells you how many rupees of operating profit each ₹100 of capital employed is producing. But what counts as healthy depends entirely on the business and its industry.",
          ),
          ul([
            "Capital-intensive industries often carry lower ROCE because their asset base is large.",
            "Asset-light businesses can post higher ROCE with far fewer assets.",
            "Comparing ROCE across unrelated industries is rarely meaningful.",
          ]),
          p(
            "The most useful comparisons are with the company's own history and with close competitors that face similar economics.",
          ),
          tool("RoceCalculator", "Adjust equity and debt to see how the capital base changes ROCE."),
          h("Questions to ask"),
          ol([
            "Is ROCE rising or falling over several years?",
            "How does it compare with close peers?",
            "Is the company investing capital at a good return, or slowly destroying value?",
            "How does it sit alongside growth and cash flow?",
          ]),
          warn(
            "ROCE is a powerful lens but not a verdict. A high past ROCE does not guarantee the future, and a low one calls for investigation rather than dismissal.",
          ),
        ],
        keyTakeaways: [
          "Capital needs differ enormously between industries.",
          "A ROCE figure is only meaningful against history and close peers.",
          "Rising or falling ROCE over time hints at how well capital is being invested.",
          "High past ROCE does not guarantee future returns.",
        ],
        quiz: [
          q(
            "A firm has EBIT of ₹90 crore and capital employed (equity + debt) of ₹600 crore. Its ROCE is:",
            ["15%", "9%", "6.7%", "90%"],
            0,
            "ROCE = (90 ÷ 600) × 100 = 15%.",
          ),
          q(
            "Why is ROCE often fairer than ROE when comparing companies?",
            [
              "It ignores profit",
              "It uses EBIT and includes debt, so financing choices matter less",
              "It uses the share price",
              "It only works for banks",
            ],
            1,
            "Because debt is part of the capital base and EBIT is before interest, companies with different borrowing levels can be compared more fairly.",
          ),
          q(
            "Comparing ROCE across two unrelated industries is:",
            ["Always meaningful", "Rarely meaningful, because capital needs differ", "Required by law", "The main use of ROCE"],
            1,
            "A capital-heavy industry and an asset-light one face completely different asset bases, so their ROCE levels are not directly comparable.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 23 — Debt and debt/equity                                        */
  /* ======================================================================== */
  {
    slug: "chapter-23-debt",
    title: "Debt and Debt/Equity",
    subtitle: "Borrowing, leverage and the risks that come with them",
    chapterOrder: 23,
    difficulty: "INTERMEDIATE",
    description:
      "Borrowing can fund growth, but it also creates obligations. Debt-to-equity shows how much of a company's funding comes from lenders versus owners.",
    lessons: [
      {
        slug: "lesson-1-debt-to-equity",
        title: "Debt-to-equity",
        summary: "How much a company owes versus what owners have put in.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 9,
        interactive: "DebtEquityCalculator",
        blocks: [
          p(
            "Companies can be funded by owners' money (equity) or by borrowing (debt). The debt-to-equity ratio compares how much the company owes with how much the owners have put in.",
          ),
          fx("Debt-to-equity = Total debt ÷ Shareholders' equity"),
          p(
            "Example: ABC Manufacturing has total debt of ₹400 crore and shareholders' equity of ₹500 crore, giving a debt-to-equity ratio of 0.8. It owes 80 paise for every ₹1 of owners' money.",
          ),
          p(
            "A lower ratio means less reliance on borrowing; a higher ratio means more. But whether a given level is comfortable depends on the business, its industry and how stable its cash flows are.",
          ),
          steps([
            { title: "Find total debt", text: "Usually short-term plus long-term borrowings." },
            { title: "Find shareholders' equity", text: "Total assets minus total liabilities." },
            { title: "Divide debt by equity", text: "The result is often written as a decimal or a multiple." },
          ]),
          tool("DebtEquityCalculator"),
          info(
            "Debt is not inherently bad. Borrowing can fund growth that owners' money alone could not. The question is whether the company can comfortably service the interest and repay the principal.",
          ),
        ],
        keyTakeaways: [
          "Debt-to-equity = total debt ÷ shareholders' equity.",
          "It compares how much the company owes with owners' money.",
          "A lower ratio means less reliance on borrowing.",
          "Whether a level is comfortable depends on the business and its cash flows.",
        ],
        quiz: [
          q(
            "Nova Industries has debt of ₹300 crore and equity of ₹600 crore. Its debt-to-equity ratio is:",
            ["0.5", "2.0", "0.3", "3.0"],
            0,
            "Debt-to-equity = ₹300 crore ÷ ₹600 crore = 0.5.",
          ),
          q(
            "Debt-to-equity measures:",
            [
              "Profit as a share of revenue",
              "How much the company owes versus owners' money",
              "Price versus earnings",
              "Dividends versus profit",
            ],
            1,
            "The ratio compares debt with shareholders' equity, showing how the company is funded.",
          ),
          q(
            "A higher debt-to-equity ratio means:",
            ["More reliance on borrowing", "The company is definitely in trouble", "Lower risk always", "Higher profit always"],
            0,
            "A higher ratio simply means a larger share of funding comes from lenders. Whether that is risky depends on the business and its cash flows.",
          ),
        ],
      },
      {
        slug: "lesson-2-leverage-interest-and-risk",
        title: "Leverage, interest and risk",
        summary: "Why the same ratio means different things in different industries.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 10,
        interactive: "DebtEquityCalculator",
        blocks: [
          p(
            "Borrowed money is called leverage. Used well, it can increase the return to owners. Used badly, it can magnify losses and, in the worst case, threaten the company's survival.",
          ),
          p(
            "The obligation to pay interest does not pause when business slows. A company with heavy debt must keep paying whether sales are strong or weak — that is the core risk.",
          ),
          h("Why industries differ"),
          tbl(
            ["Type of business", "Typical relationship with debt"],
            [
              ["Banks and lenders", "Borrowing is central to the business model; their ratios are judged differently"],
              ["Stable utilities", "Often carry more debt because cash flows are predictable"],
              ["Cyclical manufacturers", "Heavy debt can be risky when demand swings"],
              ["Asset-light services", "Often carry little debt"],
            ],
            "What is normal depends on the industry, not a single rule.",
          ),
          p(
            "This is why comparing one company's debt-to-equity with a firm in a different industry tells you very little. Compare it with close peers and with its own history.",
          ),
          tool("DebtEquityCalculator"),
          warn(
            "Watch the trend, not just the level. A rising debt-to-equity ratio alongside flat profits is a prompt to ask how the interest will be paid.",
            "Look at the direction",
          ),
          info(
            "It also helps to check interest coverage — how many times operating profit covers the interest bill — because that shows how comfortably the debt is being serviced.",
          ),
        ],
        keyTakeaways: [
          "Leverage can raise returns to owners but magnifies losses when business slows.",
          "Interest must be paid regardless of how sales are doing.",
          "Normal debt levels differ greatly between industries.",
          "Judge the trend and interest coverage, not just the ratio.",
        ],
        quiz: [
          q(
            "A company has debt of ₹800 crore and equity of ₹400 crore. Its debt-to-equity ratio is:",
            ["0.5", "2.0", "4.0", "8.0"],
            1,
            "Debt-to-equity = ₹800 crore ÷ ₹400 crore = 2.0.",
          ),
          q(
            "Why should debt-to-equity be compared within an industry?",
            [
              "Debt is illegal in some industries",
              "Normal debt levels differ greatly because business models differ",
              "All industries have the same ratio",
              "Ratios are set by law",
            ],
            1,
            "A utility with steady, predictable cash flows can comfortably carry far more debt than a cyclical manufacturer, so a single number cannot judge both.",
          ),
          q(
            "The main risk of high leverage is:",
            [
              "Interest must be paid even when profits fall",
              "Shares become cheaper",
              "Taxes rise",
              "The company cannot grow at all",
            ],
            0,
            "Debt carries a fixed obligation. If profits fall, the interest bill still has to be paid, which can strain the business.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 24 — Margins                                                     */
  /* ======================================================================== */
  {
    slug: "chapter-24-margins",
    title: "Margins",
    subtitle: "How much of each sale the company keeps",
    chapterOrder: 24,
    difficulty: "INTERMEDIATE",
    description:
      "Margins show profit as a percentage of revenue at each stage of the income statement. Comparing them like with like reveals pricing power and cost pressure.",
    lessons: [
      {
        slug: "lesson-1-gross-operating-ebitda-and-net-margins",
        title: "Gross, operating, EBITDA and net margins",
        summary: "The four main margins and what each one subtracts.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 10,
        interactive: "MarginWaterfall",
        blocks: [
          p(
            "A margin measures profit as a percentage of revenue. Instead of looking at profit in rupees, margins show how much of every ₹100 of sales the company keeps at each stage.",
          ),
          fx("Gross margin = (Gross profit ÷ Revenue) × 100"),
          fx("Operating margin = (Operating profit ÷ Revenue) × 100"),
          fx("Net margin = (Net profit ÷ Revenue) × 100"),
          p(
            "Gross profit is revenue minus the direct cost of what was sold. Operating profit subtracts running costs such as salaries and rent. Net profit subtracts interest and tax as well. Each margin shows where money is being lost or kept.",
          ),
          tbl(
            ["Margin", "Fictional company example"],
            [
              ["Gross margin", "40%"],
              ["Operating margin", "18%"],
              ["Net margin", "12%"],
            ],
            "The margins shrink as more costs are deducted at each stage.",
          ),
          p(
            "EBITDA margin is a related measure: earnings before interest, tax, depreciation and amortisation, as a percentage of revenue. It sits between gross and operating margin and is often used to compare operating performance before accounting and financing effects.",
          ),
          tool("MarginWaterfall"),
          info(
            "The interactive chart shows how revenue flows down through costs to each profit line. Move the amounts and watch how each margin responds.",
          ),
        ],
        keyTakeaways: [
          "A margin is profit expressed as a percentage of revenue.",
          "Gross, operating and net margins subtract progressively more costs.",
          "EBITDA margin measures operating performance before interest, tax and depreciation.",
          "Each margin shows where money is kept or lost along the way.",
        ],
        quiz: [
          q(
            "A company has revenue of ₹1,000 crore and gross profit of ₹400 crore. Its gross margin is:",
            ["40%", "60%", "4%", "25%"],
            0,
            "Gross margin = (400 ÷ 1,000) × 100 = 40%.",
          ),
          q(
            "Net margin differs from gross margin because it also subtracts:",
            ["Only revenue", "Operating costs, interest and tax", "Only the share price", "Nothing"],
            1,
            "Net profit sits at the very bottom of the income statement, after operating costs, interest and tax have all been deducted.",
          ),
          q(
            "A margin expresses profit:",
            ["In rupees", "As a percentage of revenue", "As a percentage of share price", "As a multiple of debt"],
            1,
            "Margins scale profit to revenue so that businesses of different sizes can be compared.",
          ),
        ],
      },
      {
        slug: "lesson-2-reading-margins",
        title: "Reading margins",
        summary: "Compare with history and close competitors — not across unrelated industries.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 9,
        interactive: "MarginWaterfall",
        blocks: [
          p(
            "Margins are most useful when compared like with like. Two comparisons are genuinely informative: a company against its own past, and a company against close competitors in the same industry.",
          ),
          ul([
            "Against its own history: is the margin stable, rising or falling over several years?",
            "Against close competitors: is it in line with firms doing similar work?",
          ]),
          p(
            "These comparisons reveal whether pricing power or costs are changing. A slowly falling margin can signal rising competition or cost pressure long before it appears in headlines.",
          ),
          warn(
            "Do not compare margins across unrelated industries. A grocery retailer may run on thin margins by the very nature of its business, while a software firm may carry far higher ones. That difference reflects the industry, not quality.",
            "An important caution",
          ),
          p(
            "Even within an industry, margins can differ for good reasons: a premium brand may earn more on each sale, while a low-cost operator may earn less per sale but sell far more.",
          ),
          tbl(
            ["Fictional company", "Sector", "Net margin"],
            [
              ["Nova Industries", "Speciality manufacturing", "14%"],
              ["ABC Manufacturing", "Bulk commodities", "5%"],
            ],
            "Different sectors naturally carry different margins — this is why industry matters.",
          ),
          tool("MarginWaterfall", "Watch how each cost layer pulls the margin down toward net profit."),
          h("Questions to ask"),
          ol([
            "Has the margin trended up or down over several years?",
            "How does it compare with close peers?",
            "Is a change driven by pricing, costs, or a one-off item?",
            "Is it consistent with the cash the business generates?",
          ]),
        ],
        keyTakeaways: [
          "Compare margins with the company's own history and with close competitors.",
          "Never compare margins across unrelated industries.",
          "A falling margin can be an early signal of competition or cost pressure.",
          "Different business models naturally produce different margin levels.",
        ],
        quiz: [
          q(
            "Revenue is ₹500 crore and net profit is ₹50 crore. The net margin is:",
            ["10%", "5%", "50%", "1%"],
            0,
            "Net margin = (50 ÷ 500) × 100 = 10%.",
          ),
          q(
            "The most meaningful margin comparison is:",
            [
              "Any two companies in any industries",
              "A company with its own history and close competitors",
              "Only with last year",
              "Only with the share price",
            ],
            1,
            "A business's own trend and its close peers share similar economics, so the comparison is informative rather than misleading.",
          ),
          q(
            "Why is comparing margins across unrelated industries unhelpful?",
            [
              "All industries have identical margins",
              "Business models differ so much that the comparison loses meaning",
              "Margins are secret",
              "It is against the rules",
            ],
            1,
            "A low-margin, high-volume business and a high-margin, specialised one are built differently, so their margin levels are not comparable.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 25 — Growth                                                      */
  /* ======================================================================== */
  {
    slug: "chapter-25-growth",
    title: "Growth",
    subtitle: "Measuring how fast a business is expanding",
    chapterOrder: 25,
    difficulty: "INTERMEDIATE",
    description:
      "Growth can be measured in revenue, profit or EPS. Learn to read year-on-year growth and to summarise several years with CAGR — and why the past is not a promise.",
    lessons: [
      {
        slug: "lesson-1-revenue-profit-and-eps-growth",
        title: "Revenue, profit and EPS growth",
        summary: "How to calculate growth, and why the levels can diverge.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 9,
        interactive: "CagrCalculator",
        blocks: [
          p(
            "Growth tells you how fast a business is expanding. It can be measured at several levels — revenue, profit, or earnings per share — and each tells a slightly different story.",
          ),
          fx("Growth % = ((Current − Previous) ÷ Previous) × 100"),
          p(
            "Example: Nova Industries had revenue of ₹800 crore last year and ₹920 crore this year. Growth = ((920 − 800) ÷ 800) × 100 = 15%.",
          ),
          p(
            "The same idea applies to profit or EPS. Comparing them is revealing: if revenue grows 15% but profit grows only 5%, costs may be rising faster than sales.",
          ),
          tbl(
            ["Measure", "Last year", "This year", "Growth"],
            [
              ["Revenue", "₹800 crore", "₹920 crore", "15%"],
              ["Net profit", "₹100 crore", "₹105 crore", "5%"],
              ["EPS", "₹5.00", "₹5.25", "5%"],
            ],
            "Revenue and profit can grow at different rates — watch the gap.",
          ),
          tool("CagrCalculator"),
          info(
            "Growth never travels in a straight line. A single year can flatter or distort the picture, so look at several years together.",
          ),
        ],
        keyTakeaways: [
          "Growth % = ((current − previous) ÷ previous) × 100.",
          "Growth can be measured in revenue, profit or EPS.",
          "If profit grows slower than revenue, costs may be rising faster than sales.",
          "Judge growth over several years, not one.",
        ],
        quiz: [
          q(
            "Revenue rises from ₹200 crore to ₹250 crore. The growth rate is:",
            ["25%", "20%", "50%", "5%"],
            0,
            "Growth = ((250 − 200) ÷ 200) × 100 = 25%.",
          ),
          q(
            "If revenue grows faster than profit, this suggests:",
            [
              "Costs may be rising faster than sales",
              "The company is more profitable",
              "Nothing at all",
              "Revenue is wrong",
            ],
            0,
            "When sales rise but profit lags, more of each rupee of revenue is being consumed by costs — a signal worth investigating.",
          ),
          q(
            "To judge growth fairly, you should look at:",
            ["One year only", "Several years together", "The share price only", "The dividend only"],
            1,
            "A single year can be distorted by one-offs or a weak base. A run of years gives a steadier picture.",
          ),
        ],
      },
      {
        slug: "lesson-2-compound-annual-growth-rate",
        title: "Compound Annual Growth Rate",
        summary: "Summarising several years of growth in one number — and its caveats.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 10,
        interactive: "CagrCalculator",
        blocks: [
          p(
            "Simple year-on-year growth compares one year with the next. To summarise growth across several years in a single number, investors use the compound annual growth rate, or CAGR.",
          ),
          fx("CAGR = (End value ÷ Begin value)^(1 ÷ Number of years) − 1"),
          p(
            "CAGR is the steady yearly rate that would take the beginning value to the ending value, as if growth happened smoothly. It is a smoothing device — real growth never moves in a smooth line.",
          ),
          p(
            "Example: ABC Manufacturing's revenue grew from ₹100 crore to ₹121 crore over two years. CAGR = (121 ÷ 100)^(1 ÷ 2) − 1 = 1.10 − 1 = 10%. A steady 10% a year would produce the same result.",
          ),
          steps([
            { title: "Divide the end value by the begin value", text: "121 ÷ 100 = 1.21." },
            { title: "Take the root for the number of years", text: "For two years, the square root of 1.21 is 1.10." },
            { title: "Subtract 1", text: "1.10 − 1 = 10% CAGR." },
          ]),
          tool("CagrCalculator"),
          warn(
            "Historical growth does not guarantee future growth. CAGR describes what has already happened; it says nothing certain about what comes next. A company that grew quickly in the past can slow or decline.",
            "The most important caveat",
          ),
          info(
            "CAGR also hides the path taken. Two companies with the same 10% CAGR might have travelled very differently — one steadily, another through painful ups and downs.",
          ),
        ],
        keyTakeaways: [
          "CAGR = (end ÷ begin)^(1 ÷ years) − 1.",
          "It expresses several years of growth as one steady yearly rate.",
          "CAGR smooths over the path and hides volatility along the way.",
          "Historical growth does not guarantee future growth.",
        ],
        quiz: [
          q(
            "Revenue grows from ₹100 crore to ₹144 crore over two years. The CAGR is:",
            ["44%", "22%", "20%", "10%"],
            2,
            "CAGR = (144 ÷ 100)^(1 ÷ 2) − 1 = 1.20 − 1 = 20% per year.",
          ),
          q(
            "CAGR is best described as:",
            [
              "A guarantee of future growth",
              "The steady yearly rate that links a beginning and ending value over time",
              "The share price change",
              "A measure of debt",
            ],
            1,
            "CAGR is the constant rate that would connect the two values; it is a way of summarising change, not a prediction.",
          ),
          q(
            "Which is the most important limitation of using past growth?",
            [
              "It is hard to calculate",
              "Past growth does not guarantee future growth",
              "It always understates",
              "It only applies to revenue",
            ],
            1,
            "Businesses can slow, stall or decline for many reasons, so what has happened so far is a starting point for investigation, not a promise.",
          ),
        ],
      },
    ],
  },
];
