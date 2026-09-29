import { fx, h, info, kv, ok, p, q, tbl, tool, warn } from "../blocks";
import type { Chapter } from "../types";

export const valuationChapters: Chapter[] = [
  /* ======================================================================== */
  /* CHAPTER 26 — Dividends                                                   */
  /* ======================================================================== */
  {
    slug: "chapter-26-dividends",
    title: "Dividends",
    subtitle: "Sharing the profits",
    chapterOrder: 26,
    difficulty: "INTERMEDIATE",
    description:
      "A dividend is a share of profit paid to owners. This chapter explains what it is, how it is measured, and what a very high or very low dividend can quietly signal.",
    lessons: [
      {
        slug: "lesson-26-1-what-a-dividend-is",
        title: "What a dividend is",
        summary: "Dividend per share, yield, payout ratio and retained earnings.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 9,
        interactive: "DividendCalculator",
        blocks: [
          p(
            "A dividend is a share of a company's profit paid out to its shareholders, usually in cash. When a company earns a profit, it can either keep the money or distribute some of it. The part it distributes is the dividend.",
          ),
          p(
            "Dividends are not guaranteed. A company's board decides whether to pay one, how much, and when — and it can reduce or stop the dividend in a weak year. In India, many companies pay an 'interim' dividend during the year and a 'final' dividend after the financial year ends.",
          ),
          h("Four ideas to hold together"),
          tbl(
            ["Term", "What it means", "How it is written"],
            [
              ["Dividend per share (DPS)", "The cash paid for each share you own", "₹ per share"],
              ["Dividend yield", "The dividend as a percentage of the share price", "DPS ÷ price × 100"],
              ["Payout ratio", "The share of profit paid out as dividend", "DPS ÷ EPS × 100"],
              ["Retained earnings", "The profit kept in the business instead of paid out", "Profit − dividends paid"],
            ],
            "Dividend numbers are always per share, or relative to profit or price.",
          ),
          fx("Dividend yield = Dividend per share ÷ Share price × 100"),
          fx("Payout ratio = Dividend per share ÷ Earnings per share × 100"),
          p(
            "Suppose Sunrise Textiles Ltd earns ₹20 per share (its EPS) and pays ₹10 per share as dividend, while the share trades at ₹500. The yield is ₹10 ÷ ₹500 = 2%, and the payout ratio is ₹10 ÷ ₹20 = 50%. The other ₹10 per share is retained in the business.",
          ),
          tool("DividendCalculator"),
          info(
            "The calculator lets you change the price, the dividend per share and the earnings per share. Notice that the payout ratio depends only on dividend and earnings — not on the share price.",
          ),
          warn(
            "A dividend is not 'free money'. On the day a share goes 'ex-dividend', the price typically adjusts by roughly the dividend, because the cash has left the company. The total value to you is broadly unchanged at that moment.",
          ),
        ],
        keyTakeaways: [
          "A dividend is a share of profit paid to shareholders, usually in cash.",
          "Dividend yield = DPS ÷ price; payout ratio = DPS ÷ EPS.",
          "Retained earnings are the profit kept in the business instead of paid out.",
          "Dividends are decided by the board and are never guaranteed.",
        ],
        quiz: [
          q(
            "A company's share trades at ₹400 and it pays ₹12 per share as dividend. What is the dividend yield?",
            ["2%", "3%", "4%", "12%"],
            1,
            "Yield = DPS ÷ price × 100 = ₹12 ÷ ₹400 × 100 = 3%. The yield expresses the dividend as a percentage of what you pay for the share.",
          ),
          q(
            "A company earns ₹25 per share and pays ₹10 per share as dividend. What is its payout ratio?",
            ["25%", "40%", "60%", "250%"],
            1,
            "Payout = DPS ÷ EPS × 100 = ₹10 ÷ ₹25 × 100 = 40%. The remaining 60% is retained in the business, so the payout and retention always add up to 100%.",
          ),
          q(
            "Which of these best describes retained earnings?",
            [
              "Profit paid out as dividend",
              "Profit kept in the business",
              "The share price rise during the year",
              "The tax paid on profits",
            ],
            1,
            "Retained earnings are the profit left in the business after dividends are paid. They can fund future growth or help repay debt.",
          ),
          q(
            "Why can a company pay no dividend in a weak year?",
            [
              "Dividends are illegal in weak years",
              "The board decides, and dividends are not guaranteed",
              "Shareholders must approve every dividend before it is paid",
              "The stock exchange sets the dividend",
            ],
            1,
            "A dividend is a discretionary decision by the board, not an obligation. If profits fall or cash is needed elsewhere, the board can reduce or skip it.",
          ),
        ],
      },
      {
        slug: "lesson-26-2-reading-a-dividend",
        title: "Reading a dividend",
        summary: "A high yield can mean a fallen price; a low payout can mean reinvestment.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 9,
        interactive: "DividendCalculator",
        blocks: [
          p(
            "Two companies can show the same dividend yield for completely different reasons. Yield is a ratio, so it moves when either the dividend changes or the share price changes.",
          ),
          p(
            "A very high yield often appears because the share price has fallen sharply, not because the company became more generous. If the market expects profits — and therefore the dividend — to shrink, the price drops and the yield shoots up.",
          ),
          tbl(
            ["Company (fictional)", "Share price", "Dividend per share", "Yield"],
            [
              ["Kaveri Agro Ltd (a year ago)", "₹500", "₹10", "2.0%"],
              ["Kaveri Agro Ltd (today)", "₹250", "₹10", "4.0%"],
              ["Meridian Pharma Ltd", "₹250", "₹10", "4.0%"],
            ],
            "The same 4% yield can mean very different things: a fallen price, or a steady payer.",
          ),
          h("What a low payout can tell you"),
          p(
            "A low payout ratio means the company keeps most of its profit. That is not a weakness. Young, fast-growing companies often pay little or nothing because they reinvest profit into the business. A high payout is more typical of mature companies with fewer growth projects.",
          ),
          fx("Retained profit = Profit − Dividends paid"),
          tool("DividendCalculator"),
          warn(
            "A yield far above the market average is a question to investigate, not a bargain to assume. Ask why. Sometimes it is a genuinely generous, stable dividend; sometimes it is a sign that the market expects trouble.",
          ),
          info(
            "Companies can also return cash by buying back their own shares instead of paying a dividend. We cover buybacks in the next chapter.",
          ),
          ok(
            "Read the yield together with the payout ratio and the company's profits. The number alone is never the whole story.",
          ),
        ],
        keyTakeaways: [
          "Yield changes when either the dividend or the share price changes.",
          "A high yield often reflects a fall in price, not a rise in the dividend.",
          "A low payout can mean the company is reinvesting in growth.",
          "Always read yield alongside payout and profits.",
        ],
        quiz: [
          q(
            "A share price falls from ₹500 to ₹250 while the dividend stays at ₹10 per share. What happens to the yield?",
            ["It falls from 4% to 2%", "It stays at 2%", "It rises from 2% to 4%", "It becomes 0%"],
            2,
            "Yield = 10 ÷ 500 = 2% before, and 10 ÷ 250 = 4% after. The dividend was unchanged; only the price moved, so the yield mechanically doubled.",
          ),
          q(
            "A young, fast-growing company pays little or no dividend. What is the most likely reason?",
            [
              "It is losing money",
              "It is reinvesting profit to grow",
              "It has no profits at all",
              "Dividends are banned for young companies",
            ],
            1,
            "A low payout is often deliberate. The company keeps profit to fund growth, which can benefit owners later through a higher share value.",
          ),
          q(
            "A yield far above the market average most often signals that:",
            [
              "The company has become more profitable",
              "The share price has fallen and the market may expect weaker dividends",
              "The dividend is guaranteed forever",
              "The stock is certainly a bargain",
            ],
            1,
            "Yield is DPS ÷ price. A very high yield usually appears because the price has dropped, which is a question worth investigating rather than a promise of returns.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 27 — Corporate Actions                                           */
  /* ======================================================================== */
  {
    slug: "chapter-27-corporate-actions",
    title: "Corporate Actions",
    subtitle: "When the company reshapes its own shares",
    chapterOrder: 27,
    difficulty: "INTERMEDIATE",
    description:
      "A corporate action is an event a company carries out that affects its shares. Splits, bonus shares, buybacks and rights issues all change the number of shares or who owns them.",
    lessons: [
      {
        slug: "lesson-27-1-splits-and-bonus-shares",
        title: "Splits and bonus shares",
        summary: "More shares, a lower price, the same conceptual value.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 9,
        interactive: "CorporateActionSimulator",
        blocks: [
          p(
            "A stock split divides each existing share into more shares, and a bonus issue gives shareholders extra shares for free. Both make each share cheaper and increase the number of shares — without changing the underlying business.",
          ),
          p(
            "In a 1-for-2 split (each existing share becomes two), 10 shares priced at ₹1,000 become 20 shares priced at about ₹500 each. Your total holding is conceptually the same: 10 × ₹1,000 = 20 × ₹500 = ₹10,000.",
          ),
          tbl(
            ["Before split", "After a 1-for-2 split"],
            [
              ["10 shares", "20 shares"],
              ["₹1,000 per share", "₹500 per share (conceptually)"],
              ["Total value ₹10,000", "Total value ₹10,000"],
            ],
            "A split changes the shape of your holding, not its conceptual value.",
          ),
          fx("New share count = Old shares × Split ratio"),
          p(
            "Bonus shares work in a similar way but come out of the company's reserves rather than a split of face value. In a 1:1 bonus issue, you receive one extra share for every share you already hold, and the face value stays the same.",
          ),
          h("Face value"),
          p(
            "Face value (or nominal value) is the original value printed on a share, such as ₹10 or ₹2. A company can 'split' a ₹10 share into two ₹5 shares. Face value is an accounting label; the market price is what buyers and sellers actually agree on.",
          ),
          tool("CorporateActionSimulator"),
          warn(
            "The prices above are conceptual. Shares do not trade at exactly half after a split — real market prices are set by buyers and sellers reacting to the news and to everything else. Treat the arithmetic as an explanation, not a prediction.",
          ),
          info(
            "A split or bonus issue is usually done to make shares more affordable and to improve liquidity — the ease with which shares can be bought and sold. By itself, it does not make a company fundamentally more valuable.",
          ),
        ],
        keyTakeaways: [
          "A split divides each share into more shares; a bonus issue gives extra free shares.",
          "Both increase the share count and lower the price per share.",
          "Total value is conceptually unchanged: 10 × ₹1,000 = 20 × ₹500.",
          "Real market prices are set by buyers and sellers, not by the arithmetic alone.",
        ],
        quiz: [
          q(
            "You hold 50 shares of Everest Steels at ₹800 each. After a 1-for-5 split (each share becomes five), how many shares do you hold, and what is the conceptual price?",
            ["10 shares at ₹4,000", "250 shares at ₹160", "250 shares at ₹800", "55 shares at ₹727"],
            1,
            "50 × 5 = 250 shares. Conceptually 50 × ₹800 = ₹40,000, so ₹40,000 ÷ 250 = ₹160 per share. More shares, a lower price, the same total.",
          ),
          q(
            "A company with 10,00,000 shares announces a 1:1 bonus issue. How many shares will exist afterwards?",
            ["5,00,000", "10,00,000", "20,00,000", "11,00,000"],
            2,
            "A 1:1 bonus gives one extra share for each existing share, so 10,00,000 + 10,00,000 = 20,00,000 shares. The count doubles, and the price per share roughly halves.",
          ),
          q(
            "What is the main conceptual effect of a 1-for-2 split on a shareholder's total holding value?",
            ["It doubles the value", "It halves the value", "It leaves total value unchanged", "It removes voting rights"],
            2,
            "The number of shares doubles and the price per share roughly halves, so total value (before any market reaction) is unchanged. A split reshapes the holding rather than creating value.",
          ),
          q(
            "Why might a company carry out a split or bonus issue?",
            [
              "To raise fresh cash from investors",
              "To make shares more affordable and improve liquidity",
              "To reduce the number of shares",
              "To increase its profits",
            ],
            1,
            "Splits and bonus issues lower the price per share, which can make the stock easier for more people to buy and improve liquidity. They do not raise cash or change profits by themselves.",
          ),
        ],
      },
      {
        slug: "lesson-27-2-buybacks-and-rights-issues",
        title: "Buybacks and rights issues",
        summary: "Returning cash by shrinking, or raising cash by growing, the share count.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 9,
        interactive: "CorporateActionSimulator",
        blocks: [
          p(
            "A buyback is when a company uses its own cash to buy back shares from the market. Those shares are usually cancelled, so the number of shares falls. A rights issue is the opposite direction: the company issues new shares and offers them to existing shareholders, usually at a discount.",
          ),
          h("Buybacks"),
          p(
            "Because there are fewer shares, each remaining share represents a larger slice of the company. If profit stays the same, earnings per share can rise. A buyback returns cash to shareholders who sell, while everyone who stays owns a bigger proportion.",
          ),
          tbl(
            ["", "Dividend", "Buyback"],
            [
              ["Cash paid", "To all shareholders", "To shareholders who sell"],
              ["Shares afterwards", "Unchanged", "Fewer"],
              ["Who chooses", "The board decides", "Shareholders decide whether to sell"],
              ["Regular or one-off", "Often regular", "Usually a one-off event"],
            ],
            "Both return cash, but they affect the share count differently.",
          ),
          h("Rights issues"),
          p(
            "In a rights issue, existing shareholders are offered the chance to buy new shares in proportion to what they already own, often at a price below the market price. They can take up the offer, sell the right to someone else, or do nothing and accept dilution.",
          ),
          fx("Your entitlement = (Shares you own ÷ Total shares) × New shares issued"),
          tool("CorporateActionSimulator"),
          info(
            "A rights issue raises fresh money for the company — for expansion, to repay debt, or to strengthen its finances. A buyback spends cash. They are almost opposite corporate actions.",
          ),
          warn(
            "A buyback is not automatically good, and a rights issue is not automatically bad. Whether each creates value depends on the price paid or received and what the company does with the money.",
          ),
        ],
        keyTakeaways: [
          "A buyback reduces the number of shares; a rights issue increases it.",
          "Buybacks spend company cash; rights issues raise new cash.",
          "Fewer shares can raise EPS and each remaining owner's proportion.",
          "Rights are offered pro-rata, usually at a discount, and ignoring them causes dilution.",
        ],
        quiz: [
          q(
            "Nova Foods Ltd has 1,00,000 shares. You own 10,000 (10%). It buys back and cancels 20,000 shares. What is your ownership now?",
            ["10%", "8%", "12.5%", "20%"],
            2,
            "Shares left = 80,000. Your 10,000 ÷ 80,000 = 12.5%. The same holding is now a larger slice because the total share count fell.",
          ),
          q(
            "A company has 4,00,000 shares and announces a 1-for-4 rights issue (one new share for every four held). How many new shares are issued?",
            ["40,000", "1,00,000", "4,00,000", "1,60,000"],
            1,
            "One new share per four existing shares: 4,00,000 ÷ 4 = 1,00,000 new shares. Rights are offered in proportion to what each shareholder already holds.",
          ),
          q(
            "What happens to a shareholder who ignores a rights issue?",
            [
              "Nothing changes at all",
              "Their ownership percentage falls (dilution)",
              "They are forced to sell their shares",
              "The company cancels their shares",
            ],
            1,
            "New shares are issued without them, so their proportional ownership falls. That is exactly why a rights issue is offered pro-rata, so existing owners can protect their slice.",
          ),
          q(
            "Which statement correctly contrasts buybacks and rights issues?",
            [
              "Both raise cash for the company",
              "Buybacks spend cash and cut the share count; rights issues raise cash and increase it",
              "Both reduce the share count",
              "Buybacks are compulsory for shareholders",
            ],
            1,
            "A buyback uses company cash to retire shares, cutting the count. A rights issue sells new shares, raising cash and increasing the count. They pull in opposite directions.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 28 — Enterprise Value                                            */
  /* ======================================================================== */
  {
    slug: "chapter-28-enterprise-value",
    title: "Enterprise Value",
    subtitle: "The price of the whole business",
    chapterOrder: 28,
    difficulty: "ADVANCED",
    description:
      "Market capitalisation values only the equity. Enterprise value values the whole business — equity plus debt minus cash — so businesses with different borrowings can be compared fairly.",
    lessons: [
      {
        slug: "lesson-28-1-market-cap-is-not-the-whole-story",
        title: "Market cap is not the whole story",
        summary: "EV adds debt and subtracts cash to value the whole business.",
        difficulty: "ADVANCED",
        estimatedMinutes: 10,
        interactive: "EnterpriseValueCalculator",
        blocks: [
          p(
            "Market capitalisation is the value of a company's shares: share price × number of shares. But it is only one part of the business. It ignores how much the company has borrowed and how much cash it holds.",
          ),
          p(
            "If you were to buy the entire business, you would pay for the shares and also take responsibility for its debt — but you would gain control of its cash. Enterprise value (EV) captures that full picture.",
          ),
          fx("Enterprise value ≈ Market cap + Total debt − Cash & equivalents"),
          p(
            "Why subtract cash? Because the buyer of the whole business effectively gets the cash, which offsets part of what they paid. Why add debt? Because the buyer must deal with the debt, so it adds to the true cost of owning the business.",
          ),
          kv([
            { label: "Market cap", value: "What the equity is worth" },
            { label: "Total debt", value: "Borrowings the business owes" },
            { label: "Cash", value: "Money the business holds" },
            { label: "Enterprise value", value: "The full cost of owning the business" },
          ]),
          tbl(
            ["Company (fictional)", "Market cap", "Debt", "Cash", "Enterprise value"],
            [
              ["Coastal Cements Ltd", "₹5,000 Cr", "₹800 Cr", "₹300 Cr", "₹5,500 Cr"],
              ["Zenith Software Ltd", "₹5,000 Cr", "₹0 Cr", "₹2,000 Cr", "₹3,000 Cr"],
            ],
            "Same market cap, very different enterprise value.",
          ),
          tool("EnterpriseValueCalculator"),
          info(
            "Two companies can have the same market capitalisation yet be very different businesses to buy. The cement maker carries debt; the software firm holds a large cash pile.",
          ),
          warn(
            "EV is an estimate, not a precise price. Cash and debt figures are read from the most recent financial statements and change over time. Minority interests and other items can complicate the simple formula.",
          ),
          ok(
            "Market cap tells you what the equity costs. Enterprise value tells you what the business costs. They answer different questions.",
          ),
        ],
        keyTakeaways: [
          "Market cap = share price × number of shares; it values only the equity.",
          "EV ≈ market cap + total debt − cash.",
          "Debt raises the cost of owning the whole business; cash offsets it.",
          "Two companies can share a market cap but differ in EV.",
        ],
        quiz: [
          q(
            "A company has a market cap of ₹4,000 crore, total debt of ₹900 crore and cash of ₹400 crore. What is its enterprise value?",
            ["₹4,500 Cr", "₹5,300 Cr", "₹3,500 Cr", "₹4,900 Cr"],
            0,
            "EV ≈ market cap + debt − cash = 4,000 + 900 − 400 = ₹4,500 crore. Debt adds to the cost of the whole business; cash reduces it.",
          ),
          q(
            "Why is cash subtracted when calculating enterprise value?",
            [
              "Cash is a liability",
              "The buyer of the whole business gains the cash, offsetting the price paid",
              "Cash reduces profits",
              "Cash is not a real asset",
            ],
            1,
            "Whoever buys the whole business gets control of the cash, so it offsets part of what they effectively paid. That is why it is taken out of the price of the business.",
          ),
          q(
            "Company A has market cap ₹6,000 Cr and debt ₹1,000 Cr, with no cash. Company B has market cap ₹6,000 Cr, no debt and ₹1,000 Cr cash. Which has the higher enterprise value?",
            ["Company A", "Company B", "They are equal", "Cannot be determined"],
            0,
            "A: 6,000 + 1,000 − 0 = ₹7,000 Cr. B: 6,000 + 0 − 1,000 = ₹5,000 Cr. Company A has the higher EV because its debt is added while its cash is not.",
          ),
          q(
            "Which is the best description of enterprise value?",
            [
              "The total value of a company's equity",
              "The cost to buy the whole business, including debt and netting off cash",
              "The company's annual revenue",
              "The company's cash balance",
            ],
            1,
            "Enterprise value estimates the cost of owning the entire business — equity plus debt, less cash — rather than just the equity portion that market cap captures.",
          ),
        ],
      },
      {
        slug: "lesson-28-2-comparing-capital-structures",
        title: "Comparing different capital structures",
        summary: "EV lets you compare operations regardless of borrowing.",
        difficulty: "ADVANCED",
        estimatedMinutes: 9,
        interactive: "EnterpriseValueCalculator",
        blocks: [
          p(
            "Capital structure describes how a company funds itself: how much comes from equity (owners) and how much from debt (borrowers). Two companies can run similar operations but choose very different mixes.",
          ),
          p(
            "Market cap alone penalises companies that use debt, because debt sits outside the equity value. Enterprise value deliberately includes debt, so it lets you compare the operating businesses more fairly.",
          ),
          tbl(
            ["Company (fictional)", "Market cap", "Debt", "Cash", "Enterprise value"],
            [
              ["Deccan Motors Ltd", "₹4,000 Cr", "₹1,500 Cr", "₹200 Cr", "₹5,300 Cr"],
              ["Pinnacle Paints Ltd", "₹5,200 Cr", "₹100 Cr", "₹900 Cr", "₹4,400 Cr"],
            ],
            "The company with the smaller market cap can have the larger enterprise value once debt is included.",
          ),
          p(
            "If you wanted to compare how expensive these two businesses are, you would normally look at enterprise value rather than market cap, because EV reflects the cost of the whole business regardless of how it is financed.",
          ),
          fx("Enterprise value ≈ Market cap + Total debt − Cash"),
          tool("EnterpriseValueCalculator"),
          info(
            "Try setting two companies to the same market cap but different debt levels. Notice how enterprise value changes even though the equity value did not.",
          ),
          warn(
            "Enterprise value makes the comparison of operations fairer, but it does not make debt harmless. A heavily indebted company still faces real obligations: interest must be paid, and that raises risk for owners.",
          ),
          ok(
            "Use EV to compare businesses; use market cap to talk about what the shares cost. Keep both in view.",
          ),
        ],
        keyTakeaways: [
          "Capital structure is the mix of debt and equity a company uses.",
          "Market cap values equity only; EV includes debt and nets off cash.",
          "EV allows fairer comparison of businesses with different borrowings.",
          "A higher EV is not automatically better or worse — and debt still carries risk.",
        ],
        quiz: [
          q(
            "Company X: market cap ₹3,000 Cr, debt ₹1,200 Cr, cash ₹200 Cr. Company Y: market cap ₹3,500 Cr, debt ₹300 Cr, cash ₹0. Which has the higher enterprise value?",
            ["Company X (₹4,000 Cr)", "Company Y (₹3,800 Cr)", "They are equal", "Cannot be determined"],
            0,
            "X = 3,000 + 1,200 − 200 = ₹4,000 Cr. Y = 3,500 + 300 − 0 = ₹3,800 Cr. X is higher, even though its market cap is smaller, because it carries more debt.",
          ),
          q(
            "Why can enterprise value give a fairer comparison between two companies with different capital structures?",
            [
              "It uses revenue instead of profit",
              "It includes debt, so the effect of borrowing is reflected consistently",
              "It ignores cash",
              "It is always a smaller number than market cap",
            ],
            1,
            "Because EV adds debt back, two businesses are compared on the cost of the whole enterprise rather than on how much of it was funded by borrowing.",
          ),
          q(
            "Two fictional companies have identical operations, but Company A is financed with far more debt than Company B. Which statement is most accurate?",
            [
              "A's enterprise value will be smaller",
              "A's market cap is likely lower than B's even though the operations are similar",
              "A's cash must be higher",
              "Debt cancels out in enterprise value",
            ],
            1,
            "Debt is not part of market cap, so a debt-heavy company can show a lower equity value for the same operations. Enterprise value adds debt back, which is exactly why it helps compare the businesses themselves.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 29 — EV/EBITDA                                                   */
  /* ======================================================================== */
  {
    slug: "chapter-29-ev-ebitda",
    title: "EV/EBITDA",
    subtitle: "A multiple that ignores how the business is funded",
    chapterOrder: 29,
    difficulty: "ADVANCED",
    description:
      "EV/EBITDA compares the value of the whole business to its operating cash earnings. It is useful because it is independent of financing, but it has important blind spots.",
    lessons: [
      {
        slug: "lesson-29-1-a-financing-neutral-multiple",
        title: "A financing-neutral multiple",
        summary: "Why EV/EBITDA lets you compare debt-heavy and cash-rich firms.",
        difficulty: "ADVANCED",
        estimatedMinutes: 10,
        interactive: "EvEbitdaCalculator",
        blocks: [
          p(
            "A valuation multiple compares the price of something to a measure of what it earns. The most common one for comparing whole businesses is EV/EBITDA.",
          ),
          fx("EV/EBITDA = Enterprise value ÷ EBITDA"),
          p(
            "EBITDA stands for earnings before interest, tax, depreciation and amortisation. Think of it as a rough measure of the cash generated by operations before accounting charges such as depreciation.",
          ),
          p(
            "Why is this multiple described as 'financing-neutral'? Because enterprise value includes debt, while EBITDA excludes interest. The interest a company pays — which depends on how much it borrowed — does not affect either number. That lets you compare a debt-heavy company with a cash-rich one.",
          ),
          tbl(
            ["Company (fictional)", "Enterprise value", "EBITDA", "EV/EBITDA"],
            [
              ["Sunrise Textiles Ltd", "₹5,500 Cr", "₹500 Cr", "11.0×"],
              ["Zenith Software Ltd", "₹3,000 Cr", "₹300 Cr", "10.0×"],
            ],
            "Expressed as a multiple ('times'), EV/EBITDA lets you compare businesses of different sizes.",
          ),
          tool("EvEbitdaCalculator"),
          info(
            "Because EBITDA is before interest, tax, depreciation and amortisation, it is closer to operating cash earnings than net profit. But 'closer' is not the same as 'the same' — that is the subject of the next lesson.",
          ),
          p(
            "A higher multiple means the market is paying more for each rupee of EBITDA. A lower multiple means it is paying less. Whether a multiple is high or low is best judged against similar companies and the company's own history.",
          ),
          warn(
            "No multiple, on its own, tells you whether a share is cheap or expensive. A company can deserve a high multiple for good reasons, or a low one for poor reasons. Multiples are tools for comparison, not verdicts.",
          ),
          ok(
            "EV/EBITDA is a starting point for comparison. It is most useful when applied to similar businesses in the same industry.",
          ),
        ],
        keyTakeaways: [
          "EV/EBITDA = enterprise value ÷ EBITDA.",
          "EBITDA is earnings before interest, tax, depreciation and amortisation.",
          "Because EV includes debt and EBITDA excludes interest, the multiple is financing-neutral.",
          "A multiple is a tool for comparison, not a verdict on value.",
        ],
        quiz: [
          q(
            "A company has an enterprise value of ₹6,000 crore and EBITDA of ₹600 crore. What is its EV/EBITDA?",
            ["0.1×", "6×", "10×", "60×"],
            2,
            "6,000 ÷ 600 = 10×. The multiple tells you the market is paying ten rupees of enterprise value for every rupee of EBITDA.",
          ),
          q(
            "Company P has EV ₹4,500 Cr and EBITDA ₹500 Cr. Company Q has EV ₹4,500 Cr and EBITDA ₹300 Cr. Which has the higher EV/EBITDA?",
            ["Company P (9×)", "Company Q (15×)", "They are equal", "Cannot be determined"],
            1,
            "P = 4,500 ÷ 500 = 9×. Q = 4,500 ÷ 300 = 15×. Q is higher because it earns less EBITDA for the same enterprise value.",
          ),
          q(
            "Why is EV/EBITDA described as financing-neutral?",
            [
              "It ignores all expenses",
              "EV includes debt and EBITDA excludes interest, so borrowing does not change either number",
              "It uses revenue instead of profit",
              "It is calculated by the government",
            ],
            1,
            "Debt appears in enterprise value, and the interest it creates is excluded from EBITDA. So a change in borrowing does not shift the ratio the way it would with metrics based on net profit.",
          ),
          q(
            "EBITDA stands for earnings before which four items?",
            [
              "Interest, tax, depreciation and amortisation",
              "Investment, tariffs, dividends and assets",
              "Income, tax, debt and accounts",
              "Interest, turnover, debt and amortisation",
            ],
            0,
            "EBITDA = Earnings Before Interest, Tax, Depreciation and Amortisation. It is designed to show operating performance before financing and accounting charges.",
          ),
        ],
      },
      {
        slug: "lesson-29-2-limitations-of-ev-ebitda",
        title: "Limitations of EV/EBITDA",
        summary: "It ignores capital expenditure and changes in working capital.",
        difficulty: "ADVANCED",
        estimatedMinutes: 9,
        interactive: "EvEbitdaCalculator",
        blocks: [
          p(
            "EBITDA has a reassuring name, but it leaves out two things that matter a great deal: capital expenditure and changes in working capital. Both can consume large amounts of cash.",
          ),
          h("It ignores capital expenditure"),
          p(
            "Capital expenditure (capex) is money spent on long-term assets — factories, machines, vehicles, technology. Businesses that need heavy capex, such as a cement maker or an airline, must keep spending just to maintain and grow. EBITDA does not subtract any of that.",
          ),
          tbl(
            ["Company (fictional)", "EBITDA", "Capex", "EBITDA − capex"],
            [
              ["Everest Steels Ltd", "₹600 Cr", "₹300 Cr", "₹300 Cr"],
              ["Zenith Software Ltd", "₹600 Cr", "₹50 Cr", "₹550 Cr"],
            ],
            "Same EBITDA, very different cash left after capital expenditure.",
          ),
          h("It ignores working capital"),
          p(
            "Working capital is the money tied up in day-to-day operations: stock waiting to be sold, and bills customers have not yet paid, minus what the company still owes suppliers. If working capital grows, cash gets absorbed — yet EBITDA does not show it. We explore this fully in the next chapter.",
          ),
          tool("EvEbitdaCalculator"),
          warn(
            "Two companies can look identical on EV/EBITDA and behave very differently once capex and working capital are considered. Use the multiple to start a comparison, never to end one.",
          ),
          info(
            "Measures that account for capex and cash generation, such as free cash flow, often tell a more complete story. EV/EBITDA is a first filter, not the final word.",
          ),
          ok(
            "A company that must spend most of its EBITDA just to keep running is not as healthy as its multiple suggests. Always ask what happens after capex and working capital.",
          ),
        ],
        keyTakeaways: [
          "EBITDA ignores capital expenditure, which can be very large.",
          "EBITDA also ignores changes in working capital, which tie up cash.",
          "Two companies with identical EV/EBITDA can need very different cash.",
          "Use EV/EBITDA as a first filter, and look beyond it before drawing conclusions.",
        ],
        quiz: [
          q(
            "Company A has EBITDA ₹600 Cr and capex ₹300 Cr. Company B has EBITDA ₹600 Cr and capex ₹50 Cr. What are their EBITDA-minus-capex figures?",
            ["A: ₹300 Cr, B: ₹550 Cr", "A: ₹900 Cr, B: ₹650 Cr", "A: ₹300 Cr, B: ₹600 Cr", "A: ₹450 Cr, B: ₹550 Cr"],
            0,
            "A = 600 − 300 = ₹300 Cr. B = 600 − 50 = ₹550 Cr. Same EBITDA, but very different cash left once capital expenditure is subtracted.",
          ),
          q(
            "A company has EV ₹7,000 Cr and EBITDA ₹700 Cr. If it spends ₹200 Cr on capex, roughly what is EV ÷ (EBITDA − capex)?",
            ["10×", "14×", "7×", "35×"],
            1,
            "EBITDA − capex = 700 − 200 = ₹500 Cr. 7,000 ÷ 500 = 14×. Once capex is considered, the business looks more expensive than the headline 10× suggested.",
          ),
          q(
            "Which of these does EBITDA fail to account for?",
            ["Interest paid", "Tax paid", "Capital expenditure and working capital changes", "Depreciation"],
            2,
            "EBITDA sits before interest and tax, and adds back depreciation and amortisation. What it does not reflect is capex and the cash tied up in working capital.",
          ),
          q(
            "Why is a high EV/EBITDA for a capex-heavy business especially misleading?",
            [
              "Capex improves EBITDA",
              "Much of the EBITDA must be spent on maintaining assets, leaving less for owners",
              "Capex is not a real cost",
              "EBITDA already subtracts capex",
            ],
            1,
            "For a capex-heavy business, a large slice of EBITDA goes straight back into maintaining and growing assets. That cash is not available to owners, yet the multiple ignores it.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 30 — Working Capital                                             */
  /* ======================================================================== */
  {
    slug: "chapter-30-working-capital",
    title: "Working Capital",
    subtitle: "The cash locked inside day-to-day operations",
    chapterOrder: 30,
    difficulty: "ADVANCED",
    description:
      "Working capital is the money tied up in running the business day to day: what customers owe, what sits in stock, and what the company still owes suppliers. It is a key link between profit and cash.",
    lessons: [
      {
        slug: "lesson-30-1-receivables-inventory-payables",
        title: "Receivables, inventory and payables",
        summary: "The three everyday items that decide how much cash is tied up.",
        difficulty: "ADVANCED",
        estimatedMinutes: 9,
        interactive: "WorkingCapitalSimulator",
        blocks: [
          p(
            "Working capital measures the short-term money a business needs to operate. It is the difference between what it expects to collect and use soon, and what it must pay soon.",
          ),
          h("Three everyday items"),
          kv([
            { label: "Receivables", value: "Money customers owe for goods or services already delivered" },
            { label: "Inventory", value: "Stock held for sale, plus raw materials and work in progress" },
            { label: "Payables", value: "Money the company owes suppliers for goods already received" },
          ]),
          fx("Working capital = Receivables + Inventory − Payables"),
          p(
            "Suppose Kaveri Agro Ltd has ₹200 crore of receivables and ₹150 crore of inventory, and owes suppliers ₹120 crore. Its working capital is ₹200 + ₹150 − ₹120 = ₹230 crore — money tied up in operations and not yet available as cash.",
          ),
          tbl(
            ["Item", "Amount", "What it represents"],
            [
              ["Receivables", "₹200 Cr", "Cash to be collected from customers"],
              ["Inventory", "₹150 Cr", "Cash already spent on stock"],
              ["Payables", "₹120 Cr", "Cash still to be paid to suppliers"],
              ["Working capital", "₹230 Cr", "Net cash tied up"],
            ],
            "Working capital in numbers for a fictional company.",
          ),
          p(
            "Positive working capital means cash is tied up in the operating cycle. Negative working capital means suppliers are, in effect, funding the business — some strong retailers and subscription businesses run this way naturally.",
          ),
          tool("WorkingCapitalSimulator"),
          info(
            "Move the sliders. Notice that raising receivables or inventory increases tied-up cash, while raising payables reduces it. The direction of each change is worth remembering.",
          ),
          warn(
            "Working capital is not simply 'bad if high and good if low'. It depends entirely on the industry. A retailer and a software company can have completely different normal patterns, and both can be healthy.",
          ),
        ],
        keyTakeaways: [
          "Working capital ≈ receivables + inventory − payables.",
          "It measures cash tied up in day-to-day operations.",
          "Higher receivables or inventory tie up more cash; higher payables tie up less.",
          "What counts as normal depends on the industry.",
        ],
        quiz: [
          q(
            "A fictional firm has receivables of ₹250 Cr, inventory of ₹100 Cr and payables of ₹130 Cr. What is its working capital?",
            ["₹220 Cr", "₹480 Cr", "₹20 Cr", "₹350 Cr"],
            0,
            "Working capital = receivables + inventory − payables = 250 + 100 − 130 = ₹220 crore of cash tied up in operations.",
          ),
          q(
            "A firm's receivables rise by ₹60 Cr while payables and inventory are unchanged. What happens to its tied-up cash?",
            ["It falls by ₹60 Cr", "It rises by ₹60 Cr", "It is unchanged", "It becomes zero"],
            1,
            "Receivables are part of working capital. More money owed by customers means more cash is tied up, so working capital rises by ₹60 crore.",
          ),
          q(
            "Which statement about payables is correct?",
            [
              "Higher payables mean more cash tied up",
              "Higher payables reduce the net cash tied up, because the company can pay suppliers later",
              "Payables are money customers owe the company",
              "Payables have no effect on working capital",
            ],
            1,
            "Working capital subtracts payables. Taking longer to pay suppliers keeps cash in the business for now, so the net cash tied up falls.",
          ),
          q(
            "Why is a high working capital not automatically a problem?",
            [
              "Because working capital is not real money",
              "Because normal levels differ by industry and can reflect healthy growth",
              "Because payables always exceed receivables",
              "Because inventory never costs cash",
            ],
            1,
            "A growing business often needs more stock and offers credit to more customers, lifting working capital. Whether that is heavy depends on the industry's normal pattern, so the number must be read in context.",
          ),
        ],
      },
      {
        slug: "lesson-30-2-why-accounting-profit-and-cash-differ",
        title: "Why accounting profit and cash differ",
        summary: "How credit sales and tied-up cash create a gap between profit and bank balance.",
        difficulty: "ADVANCED",
        estimatedMinutes: 9,
        interactive: "WorkingCapitalSimulator",
        blocks: [
          p(
            "Profit is an accounting measure of what a business earned in a period. Cash is the money actually in the bank. The two are related but not the same, and working capital is a big reason why.",
          ),
          p(
            "When a company sells on credit, it records the sale as revenue immediately — even though the customer will pay weeks or months later. That sale boosts profit today, but no cash has arrived yet.",
          ),
          tbl(
            ["Event", "Effect on profit", "Effect on cash"],
            [
              ["Cash sale of ₹1,00,000", "+₹1,00,000", "+₹1,00,000"],
              ["Credit sale of ₹1,00,000 (paid in 60 days)", "+₹1,00,000 today", "₹0 today"],
              ["Buying ₹50,000 of stock on credit", "Recorded when sold", "₹0 now, paid later"],
            ],
            "A sale can be recorded as profit well before the cash arrives.",
          ),
          p(
            "If receivables keep growing faster than sales, more and more profit is sitting with customers rather than in the bank. The business may look profitable on paper and still run short of cash.",
          ),
          fx("Cash from operations ≈ Profit − increase in working capital (+ other adjustments)"),
          p(
            "Consider Bharat Widgets Ltd, which reports ₹100 crore of profit but whose receivables grow by ₹40 crore. Broadly, about ₹60 crore of that profit has not yet turned into cash — it is owed by customers.",
          ),
          tool("WorkingCapitalSimulator"),
          info(
            "This is the single most useful bridge between the profit and loss statement and the cash flow statement: profit tells you what was earned, and working capital changes help explain when the cash actually arrives.",
          ),
          warn(
            "Never assume a profitable company is a cash-rich company. Profits can be real and still be locked up in receivables or inventory. Cash is what keeps the lights on.",
          ),
          ok(
            "Follow the cash. Profit that consistently fails to turn into cash is a question worth investigating.",
          ),
        ],
        keyTakeaways: [
          "Profit is an accounting measure; cash is what actually arrives.",
          "A credit sale is recorded as revenue before any cash is received.",
          "Rising working capital absorbs cash and can make a profitable firm short of cash.",
          "Cash from operations ≈ profit minus increases in working capital (plus other adjustments).",
        ],
        quiz: [
          q(
            "A company reports ₹200 Cr profit, and its working capital rises by ₹70 Cr during the year. Roughly how much cash did operations produce, before other adjustments?",
            ["₹270 Cr", "₹130 Cr", "₹70 Cr", "₹200 Cr"],
            1,
            "Cash from operations ≈ profit − increase in working capital = 200 − 70 = ₹130 Cr. The rest of the profit is tied up in receivables or inventory.",
          ),
          q(
            "A firm makes ₹50 lakh of credit sales that customers will pay in 90 days, with no cash sales. How much cash did those sales bring in today?",
            ["₹50 lakh", "₹0", "₹25 lakh", "₹45 lakh"],
            1,
            "Credit sales are recorded as revenue immediately, but no cash has arrived. Until customers pay, the amount sits as a receivable, not as cash.",
          ),
          q(
            "Why can a profitable company still run short of cash?",
            [
              "Profit is always fake",
              "Profit can be tied up in receivables and inventory",
              "Cash is illegal to hold",
              "Taxes are never paid in cash",
            ],
            1,
            "Profit is recognised when earned, but the cash may still be owed by customers or sitting in unsold stock. That is the working capital gap between profit and cash.",
          ),
          q(
            "What is the best way to describe the link between profit and cash?",
            [
              "They are always identical",
              "Profit records what was earned; cash records what was received, and working capital changes explain the gap",
              "Cash is a subset of profit",
              "Profit is measured only on cash sales",
            ],
            1,
            "Profit is an accounting measure and cash is a physical fact. Working capital changes — especially receivables and inventory — are the main reason the two move apart.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 31 — Economic Factors                                            */
  /* ======================================================================== */
  {
    slug: "chapter-31-economic-factors",
    title: "Economic Factors",
    subtitle: "The wider backdrop",
    chapterOrder: 31,
    difficulty: "ADVANCED",
    description:
      "Companies do not operate in a vacuum. Interest rates, inflation, the rupee, GDP growth, commodity prices and government policy all shape the environment in which businesses earn profits. This chapter explains the links — without forecasting.",
    lessons: [
      {
        slug: "lesson-31-1-interest-rates-and-inflation",
        title: "Interest rates and inflation",
        summary: "How RBI policy and rising prices shape the cost and value of money.",
        difficulty: "ADVANCED",
        estimatedMinutes: 10,
        interactive: "EconomicFactorsExplorer",
        blocks: [
          p(
            "Two of the most important economic forces in India are interest rates and inflation. Both are watched closely because they influence the cost of money and the value of money over time.",
          ),
          p(
            "Inflation is the general rise in the prices of goods and services. If inflation runs at 6% a year, a basket of goods costing ₹1,000 today would cost about ₹1,060 a year later. Money buys less over time.",
          ),
          p(
            "In India, the Reserve Bank of India (RBI) sets the repo rate — the rate at which it lends to banks. This is the main lever of monetary policy. When the repo rate changes, borrowing costs across the economy tend to move in the same direction.",
          ),
          fx("Real value = Nominal value ÷ (1 + inflation)^years"),
          tbl(
            ["Situation", "Typical pressure on", "Why"],
            [
              ["Interest rates rise", "Borrowers and indebted companies", "Loans cost more to service"],
              ["Interest rates fall", "Borrowers", "Loans cost less to service"],
              ["Inflation rises", "Savers holding idle cash", "Purchasing power falls faster"],
              ["Inflation rises", "Companies that cannot raise prices", "Costs rise but revenue may not"],
            ],
            "The direction of pressure, not a prediction for any particular company.",
          ),
          p(
            "Higher interest rates also change how future profits are valued. A rupee of profit expected many years from now is worth less today when the alternative — a safe interest rate — is higher. This is one reason share prices can respond to rate decisions.",
          ),
          tool("EconomicFactorsExplorer"),
          warn(
            "This chapter explains how economic factors are connected. It does not, and cannot, predict what interest rates, inflation or share prices will do. Nobody reliably forecasts these.",
          ),
          info(
            "Notice the two-way links: inflation influences interest rate decisions, and interest rates in turn influence inflation. The relationships are tendencies, not mechanical rules.",
          ),
          ok(
            "Understand the direction of these forces and you will understand why markets react to economic news — without needing to predict the news itself.",
          ),
        ],
        keyTakeaways: [
          "Inflation is the general rise in prices; it reduces the purchasing power of money.",
          "The RBI sets the repo rate, which influences borrowing costs across the economy.",
          "Higher interest rates raise the cost of debt and lower the present value of future profits.",
          "These relationships describe direction, not forecasts.",
        ],
        quiz: [
          q(
            "If inflation is 6% a year, roughly what is the real (inflation-adjusted) value of ₹1,00,000 after one year?",
            ["₹1,06,000", "₹94,000", "₹1,00,600", "₹1,60,000"],
            1,
            "Real value = 1,00,000 ÷ 1.06 ≈ ₹94,340, closest to ₹94,000. Prices rose, so the same money buys less than before.",
          ),
          q(
            "A company borrows ₹1 crore at a floating rate of 8%. If the rate rises to 10%, roughly how much more interest will it pay in a year?",
            ["₹2,00,000", "₹20,000", "₹10,00,000", "₹8,00,000"],
            0,
            "The rate rose by 2 percentage points. 2% of ₹1 crore = ₹2,00,000 extra interest over a year. Higher rates directly increase the cost of existing floating-rate debt.",
          ),
          q(
            "The RBI's repo rate mainly influences:",
            [
              "Income tax rates",
              "The cost at which banks can borrow, which spreads to other borrowing costs",
              "Commodity prices directly",
              "The number of shares a company issues",
            ],
            1,
            "The repo rate is the rate at which the RBI lends to banks. Changes there tend to flow through to loans and deposits across the economy.",
          ),
          q(
            "Why can share prices react to interest rate changes?",
            [
              "Because share prices are set by the RBI",
              "Because interest rates affect borrowing costs and the value placed on future profits",
              "Because shares pay no dividends when rates rise",
              "Because higher rates reduce the number of shares",
            ],
            1,
            "Rates change both the cost of servicing debt and the value investors place on profits expected in the future, so they can shift how shares are priced.",
          ),
        ],
      },
      {
        slug: "lesson-31-2-currency-gdp-commodities-policy",
        title: "Currency, GDP, commodities and policy",
        summary: "The rupee, growth, oil prices and government policy — and who feels them.",
        difficulty: "ADVANCED",
        estimatedMinutes: 10,
        interactive: "EconomicFactorsExplorer",
        blocks: [
          p(
            "Beyond interest rates and inflation, four more forces shape the business environment: the rupee's exchange rate, GDP growth, commodity prices, and government policy. Each affects different companies in different ways.",
          ),
          h("The rupee (currency)"),
          p(
            "When the rupee weakens, it takes more rupees to buy one US dollar. That can help exporters, who sell in dollars but earn rupees, and hurt importers, who must pay more rupees for the same goods. When the rupee strengthens, the effect tends to reverse.",
          ),
          h("GDP growth"),
          p(
            "GDP (gross domestic product) measures the total value of goods and services a country produces. Faster growth usually means more demand for many products — but not for all, and not equally across industries.",
          ),
          h("Commodities"),
          p(
            "Commodity prices — especially crude oil — matter a great deal to India, which imports much of its oil. High oil prices raise costs for transport, airlines and manufacturers, and can add to inflation.",
          ),
          p(
            "Finally, government policy covers taxes, subsidies, regulation and spending on infrastructure. A change in any of these can affect particular industries quickly, while having little effect on others.",
          ),
          tbl(
            ["Factor", "Who tends to feel it first", "Direction"],
            [
              ["Weaker rupee", "Exporters (help) / importers (hurt)", "Depends on the business"],
              ["Faster GDP growth", "Consumer-facing businesses", "More demand, generally"],
              ["Higher oil prices", "Transport, airlines, manufacturers", "Higher costs"],
              ["Policy change", "Targeted industries", "Varies by policy"],
            ],
            "Tendencies only — the actual effect varies by company.",
          ),
          tool("EconomicFactorsExplorer"),
          warn(
            "These are relationships, not predictions. We are not saying any of these will happen, or what any share price will do. We are explaining how the pieces fit together.",
          ),
          ok(
            "Ask 'who sells and who buys in this currency, this commodity, this policy environment?' One good question beats a forecast.",
          ),
        ],
        keyTakeaways: [
          "A weaker rupee can help exporters and hurt importers.",
          "GDP growth measures total output and usually signals demand, unevenly across industries.",
          "Commodity prices, especially oil, feed into costs and inflation in India.",
          "Government policy can affect specific industries quickly.",
        ],
        quiz: [
          q(
            "An exporter earns US$1,00,000 and converts it to rupees. If the rate moves from ₹80 to ₹84 per dollar, how much more does it receive in rupees?",
            ["₹0", "₹4,00,000", "₹40,000", "₹84,00,000"],
            1,
            "At ₹80, it gets ₹80,00,000; at ₹84, it gets ₹84,00,000. The difference is ₹4,00,000 — the weaker rupee helps the exporter.",
          ),
          q(
            "A weak rupee tends to:",
            [
              "Help importers and hurt exporters",
              "Help exporters and hurt importers",
              "Have no effect on either",
              "Help only software companies",
            ],
            1,
            "Exporters receive foreign currency and convert it to rupees, which go further when the rupee is weaker. Importers pay in foreign currency, so their rupee cost rises.",
          ),
          q(
            "Why does India pay close attention to crude oil prices?",
            [
              "Oil is an Indian export",
              "India imports much of its oil, so higher prices raise costs and inflation",
              "Oil prices are set by the RBI",
              "Oil has no effect on the economy",
            ],
            1,
            "Because India imports a large share of its oil, higher crude prices raise costs for many businesses and can feed through to broader inflation.",
          ),
          q(
            "Which statement about economic factors and forecasts is most accurate?",
            [
              "Economic factors can be forecast precisely",
              "Economic factors are linked, but their timing and size cannot be reliably predicted",
              "Only GDP matters",
              "Commodity prices never change",
            ],
            1,
            "This chapter explains how factors are connected. It deliberately avoids forecasting, because the direction is often knowable while the timing and magnitude are not.",
          ),
        ],
      },
    ],
  },
];
