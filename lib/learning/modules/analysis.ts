import {
  danger,
  fx,
  h,
  info,
  kv,
  ol,
  ok,
  p,
  q,
  steps,
  tbl,
  tool,
  ul,
  warn,
} from "../blocks";
import type { Chapter } from "../types";

export const analysisChapters: Chapter[] = [
  /* ======================================================================== */
  /* CHAPTER 32 — Understanding business models                               */
  /* ======================================================================== */
  {
    slug: "chapter-32-business-models",
    title: "Understanding Business Models",
    subtitle: "How a business actually makes money",
    chapterOrder: 32,
    difficulty: "ADVANCED",
    description:
      "Before any numbers, understand the business itself: what it sells, who pays, how it earns money, what it costs to run, and what could go wrong.",
    lessons: [
      {
        slug: "lesson-1-questions-about-any-business",
        title: "Questions to ask about any business",
        summary: "Six questions that reveal how a business works.",
        difficulty: "ADVANCED",
        estimatedMinutes: 11,
        interactive: "BusinessModelExplorer",
        blocks: [
          p(
            "A business model is simply the answer to one question: how does this company make money, and why do customers keep coming back? Long before you look at a share price, you can learn a great deal by asking a handful of plain questions.",
          ),
          h("Six questions that open up any business"),
          steps([
            {
              title: "What does it sell?",
              text: "A product, a service, or both? Is it a one-time sale, a subscription, a fee for a service, or space for advertising?",
            },
            {
              title: "Who pays?",
              text: "The person who uses the product is not always the person who pays for it. A website may be free to users and funded by advertisers; a hospital bill may be settled by an insurer.",
            },
            {
              title: "How does it make money?",
              text: "One sale at a time, a monthly subscription, a commission, interest, or advertising? This is the engine that drives everything else.",
            },
            {
              title: "What are its costs?",
              text: "Fixed costs stay roughly the same whether it sells one unit or a lakh (such as rent and salaries). Variable costs rise with every sale (such as raw material, packaging and delivery).",
            },
            {
              title: "What keeps customers?",
              text: "Brand, habit, a long contract, or the inconvenience of switching. Something has to make leaving unattractive, or customers drift away.",
            },
            {
              title: "What could hurt it?",
              text: "A new competitor, a change in rules, the loss of one big customer, a supplier failing, or a shift in what customers want.",
            },
          ]),
          tool(
            "BusinessModelExplorer",
            "Work through the six questions for a company of your choice in the explorer.",
          ),
          info(
            "The reason customers stay is sometimes called a moat — a lasting advantage that protects a business, such as a trusted brand, a patent, or a large base of users who would lose something by leaving. Not every company has one.",
            "A word you will meet often",
          ),
          p(
            "Costs are worth a second look. A company with high fixed costs must sell a lot before it earns anything, so a small drop in sales can turn a profit into a loss. A company with mostly variable costs bends more easily when demand falls.",
          ),
          warn(
            "A business can be easy to understand and still carry real risks, just as a complicated one can turn out fine. Understanding the model is the starting point of analysis, not its conclusion.",
          ),
          ok(
            "If you cannot explain in three plain sentences how a company makes money, treat that as a signal to keep learning before you go further.",
          ),
        ],
        keyTakeaways: [
          "A business model describes what a company sells, who pays, how it earns, and what it costs.",
          "The user of a product is not always the one who pays for it.",
          "Fixed costs do not change with sales; variable costs rise with each sale.",
          "Something must make customers stay — a brand, a habit, a contract or a network.",
          "Understanding the model is a starting point, not a conclusion.",
        ],
        quiz: [
          q(
            "Which question gets most directly at a company's business model?",
            [
              "What is its share price today?",
              "How does it make money, and who pays?",
              "What is the name of its managing director?",
              "How many offices does it have?",
            ],
            1,
            "A business model is about how money comes in and from whom. Share price, leadership and offices can matter later, but they do not explain how the business earns a living.",
          ),
          q(
            "A company's rent and salaried staff cost the same whether it sells 100 units or 1,000. These costs are:",
            ["Variable costs", "Fixed costs", "Revenue", "Taxes"],
            1,
            "Fixed costs do not change with the number of units sold. Variable costs — raw material, packaging, delivery — rise with each sale.",
          ),
          q(
            "The person who uses a product is not always the person who pays for it. Why does this matter?",
            [
              "It changes nothing about the business",
              "It can change who the real customer is and what risks the business faces",
              "It means the product must be free",
              "It only matters for government companies",
            ],
            1,
            "Knowing who actually pays tells you where the money really comes from and what could interrupt it — for example, an advertising business depends on its advertisers, not its users.",
          ),
        ],
      },
      {
        slug: "lesson-2-fictional-company-exercise",
        title: "A fictional company exercise",
        summary: "Practise the six questions on a made-up company.",
        difficulty: "ADVANCED",
        estimatedMinutes: 10,
        interactive: "BusinessModelExplorer",
        blocks: [
          p(
            "Let us practise. Meet GreenLeaf Foods Ltd — a made-up company that sells packaged snacks through shops and online. It is fictional, but a real business of this kind would have to answer exactly these questions.",
          ),
          tbl(
            ["Question", "GreenLeaf Foods"],
            [
              ["What does it sell?", "Packaged snacks sold through shops and online"],
              ["Who pays?", "Shoppers at the counter, and shopkeepers who buy in bulk at a discount"],
              ["How does it make money?", "A small profit on each packet, repeated across millions of packets"],
              [
                "What are its costs?",
                "Raw materials and packaging (variable); factories and salaries (fixed); distribution and advertising",
              ],
              ["What keeps customers?", "Brand recognition, a familiar taste, and wide availability in nearby shops"],
              [
                "What could hurt it?",
                "A price war, rising sugar and packaging costs, a health trend away from snacks, or loss of shelf space",
              ],
            ],
            "The six questions applied to one fictional company.",
          ),
          tool(
            "BusinessModelExplorer",
            "Model a company like GreenLeaf in the explorer and change its costs and customers.",
          ),
          h("What could hurt this business?"),
          ol([
            "Input costs: sugar, oil and packaging prices can rise faster than the company can raise its own selling prices.",
            "Competition: a rival can cut prices or win the best shelf space in the most-visited shops.",
            "Changing tastes: customers may slowly move towards healthier snacks.",
            "Distribution: if a large shop chain stops stocking the product, sales fall quickly.",
          ]),
          warn(
            "GreenLeaf Foods is invented for practice. Real businesses are messier, and their models often change over time.",
          ),
          ok(
            "The habit of asking these six questions works on any company, in any industry, whether it is listed on an exchange or not.",
          ),
        ],
        keyTakeaways: [
          "A snack business earns money through many small margins repeated at high volume.",
          "Raw materials and packaging are variable costs; factories and salaries are fixed costs.",
          "Brand and distribution are often what keep a consumer business strong.",
          "Practising on a fictional company builds a habit you can apply to real ones.",
        ],
        quiz: [
          q(
            "GreenLeaf earns only a small profit on each packet. What does this tell you about the business?",
            [
              "It must sell a large number of packets to do well",
              "Each packet makes a large profit",
              "It has no costs to worry about",
              "It cannot grow",
            ],
            0,
            "A thin margin per unit only becomes meaningful money when it is multiplied by a large volume, so scale is central to this kind of business.",
          ),
          q(
            "Rising sugar and packaging prices are an example of:",
            ["Higher revenue", "Higher variable costs", "Lower debt", "Dilution"],
            1,
            "These costs rise as more snacks are produced, so they are variable costs. They eat into profit unless the company can raise prices or find savings elsewhere.",
          ),
          q(
            "Why might losing shelf space in a large shop chain hurt GreenLeaf?",
            [
              "Because shops are its route to customers, so sales would fall",
              "Because shelf space is a type of tax",
              "Because packaging costs would rise",
              "It would have no effect at all",
            ],
            0,
            "For a consumer brand, shops are where selling actually happens. Losing that access cuts sales directly, which is why distribution is part of the business model.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 33 — The fundamental analysis process                            */
  /* ======================================================================== */
  {
    slug: "chapter-33-analysis-process",
    title: "Fundamental Analysis Process",
    subtitle: "A repeatable way to study a company",
    chapterOrder: 33,
    difficulty: "ADVANCED",
    description:
      "A ten-step habit for studying any company — a thinking process, not an automatic ranking or a recommendation.",
    lessons: [
      {
        slug: "lesson-1-ten-step-process",
        title: "A structured ten-step process",
        summary: "Ten steps from understanding the business to forming your own view.",
        difficulty: "ADVANCED",
        estimatedMinutes: 12,
        interactive: "AnalysisProcess",
        blocks: [
          p(
            "Fundamental analysis is the work of understanding a business well enough to form your own view of what it is worth. It is a process, not a single number, and it is far more useful when you follow the same steps every time.",
          ),
          info(
            "Be clear about what this is. It is a thinking process, not an automatic ranking system. It will not sort companies into a list and it will not tell you what to buy or sell.",
            "What this process is — and is not",
          ),
          h("The ten steps"),
          steps([
            {
              title: "1. Understand the business",
              text: "What does it sell, who pays, and how does it make money? Start with the business model.",
            },
            {
              title: "2. Understand the industry",
              text: "Who are its competitors, how big is the market, and is the industry growing or shrinking? Rules and cycles can shape a whole sector.",
            },
            {
              title: "3. Read the financial statements",
              text: "The income statement, balance sheet and cash flow statement are the company's report card. Read them together.",
            },
            {
              title: "4. Examine growth",
              text: "Have revenue and profit grown over time? Did that growth come from selling more, raising prices, or buying other businesses?",
            },
            {
              title: "5. Examine profitability",
              text: "Look at margins at each level. Do they hold steady, rise, or fall? Compare them with similar companies.",
            },
            {
              title: "6. Examine debt",
              text: "How much does it owe, and can it comfortably pay the interest? Debt magnifies both good years and bad ones.",
            },
            {
              title: "7. Examine cash flow",
              text: "Is profit turning into cash? A business that reports profit but collects little cash is worth a closer look.",
            },
            {
              title: "8. Understand valuation",
              text: "What are you paying for that profit and those assets? A price only means something once you understand the business.",
            },
            {
              title: "9. Identify risks",
              text: "What could go wrong: competition, rules, debt, customers, suppliers or management?",
            },
            {
              title: "10. Form an independent view",
              text: "Write down what you understand, what you expect, and what would change your mind. This is your own view, not a buy or sell call.",
            },
          ]),
          tool("AnalysisProcess", "Move through the ten steps in the explorer."),
          p(
            "The order matters. If you start with valuation you are judging a price without knowing what you are paying for. The first steps give you the context that makes every later number mean something.",
          ),
          warn(
            "A process makes your thinking more reliable; it does not remove uncertainty or guarantee an outcome.",
          ),
          ok(
            "The output of this process is your own understanding of a business — a view you can explain and defend, not a recommendation.",
          ),
        ],
        keyTakeaways: [
          "Fundamental analysis is a structured process for understanding a business.",
          "Understand the business and its industry before studying the numbers.",
          "Growth, profitability, debt and cash flow are examined separately, because each can tell a different story.",
          "Valuation makes sense only after you understand what you are valuing.",
          "The process ends in an independent view, not a recommendation.",
        ],
        quiz: [
          q(
            "Why is it better to study the business before valuing it?",
            [
              "Because valuation is unimportant",
              "Because a price is only meaningful once you understand what is being sold and how it earns",
              "Because businesses never change",
              "Because valuation is illegal before reading the news",
            ],
            1,
            "A price on its own says nothing about value. Only after understanding the business and its numbers can you judge whether a price is high, low or fair for what you are getting.",
          ),
          q(
            "Which of these belongs in the step 'examine cash flow'?",
            [
              "Whether reported profit is turning into actual cash",
              "The current share price",
              "The managing director's salary alone",
              "The number of shops in the country",
            ],
            0,
            "Cash flow examines whether the profit shown in the accounts is backed by real cash coming in. Profit and cash are different things, and the gap between them matters.",
          ),
          q(
            "What is the final step of the process meant to produce?",
            [
              "A buy or sell recommendation",
              "A price target",
              "Your own independent view of the business",
              "A list of the best stocks",
            ],
            2,
            "The process ends in understanding. It deliberately does not produce recommendations or price targets — those would be a decision, not an analysis.",
          ),
        ],
      },
      {
        slug: "lesson-2-using-the-process",
        title: "Using the process",
        summary: "How to move through the steps without skipping or rushing.",
        difficulty: "ADVANCED",
        estimatedMinutes: 10,
        interactive: "AnalysisProcess",
        blocks: [
          p(
            "Knowing the ten steps is the easy part. Using them well means resisting the pull to skip ahead to a conclusion, and paying attention when different steps disagree.",
          ),
          h("The same business, four angles"),
          tbl(
            ["Angle", "What to look at", "What can go wrong"],
            [
              ["Growth", "Revenue and profit over several years", "Growth bought with heavy discounting or debt may not last"],
              ["Profitability", "Margins at gross, operating and net level", "Rising revenue with falling margins means costs are outrunning sales"],
              ["Debt", "Total borrowings and the debt-to-equity ratio", "Debt funds growth but demands interest in bad years too"],
              ["Cash flow", "Operating cash flow and free cash flow", "Profit on paper that never turns into cash"],
            ],
          ),
          tool(
            "AnalysisProcess",
            "Work the same company through several steps and note where the answers differ.",
          ),
          p(
            "Notice that these four angles can disagree. A company may be growing but burning cash, or profitable but heavily indebted. The process does not hide these clashes — it makes them visible.",
          ),
          danger(
            "Watch out for the urge to reach a conclusion too early. If you decide first and then hunt for numbers that agree, the process stops being analysis and becomes justification.",
          ),
          info(
            "Write your view down, together with the reasons and the facts behind it. Months later you can compare your reasoning with what actually happened — that is how the skill improves.",
            "Keep a record",
          ),
          ok(
            "A view you can explain — including what would change your mind — is far more useful than a quick opinion you cannot defend.",
          ),
        ],
        keyTakeaways: [
          "Growth, profitability, debt and cash flow each tell a different part of the story.",
          "The angles can disagree, and the disagreement is itself informative.",
          "Deciding first and collecting evidence later is a trap to avoid.",
          "Writing down your reasons lets you review your thinking over time.",
        ],
        quiz: [
          q(
            "A company's revenue is growing, but its operating cash flow is shrinking. What does this disagreement mean for the process?",
            [
              "One of the numbers must be wrong",
              "Different steps are telling different stories, which is worth investigating",
              "Growth should be ignored",
              "Cash flow does not matter if revenue is rising",
            ],
            1,
            "The process is designed to surface exactly this kind of tension. When growth and cash flow point in different directions, it is a prompt to look closer, not to pick the number you prefer.",
          ),
          q(
            "Why keep a written record of your view and reasons?",
            [
              "So you can review your reasoning later and learn from it",
              "Because the law requires it",
              "So you never have to read the accounts again",
              "To guarantee a profit",
            ],
            0,
            "Writing down the reasons lets you compare your reasoning with what actually happened. That feedback loop is how judgement improves over time.",
          ),
          q(
            "Which habit does the most to keep the process honest?",
            [
              "Deciding early, then finding evidence",
              "Following the steps in order and noting disagreements",
              "Skipping the business and going straight to the price",
              "Copying someone else's conclusion",
            ],
            1,
            "Working in order and recording where the steps disagree keeps the analysis about the business rather than about confirming a decision you have already made.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 34 — Red flags                                                   */
  /* ======================================================================== */
  {
    slug: "chapter-34-red-flags",
    title: "Red Flags",
    subtitle: "Patterns that deserve a closer look",
    chapterOrder: 34,
    difficulty: "ADVANCED",
    description:
      "Patterns in the accounts that are worth investigating, and why none of them is proof on its own.",
    lessons: [
      {
        slug: "lesson-1-signals-worth-investigating",
        title: "Signals worth investigating",
        summary: "Patterns that deserve a closer look — never automatic proof.",
        difficulty: "ADVANCED",
        estimatedMinutes: 12,
        interactive: "RedFlagsExplorer",
        blocks: [
          p(
            "A red flag is a pattern in the numbers that deserves a closer look. It is a clue that something might need explaining — it is not a verdict. Experienced analysts treat red flags as questions to ask, not as proof of anything.",
          ),
          danger(
            "This is the single most important idea in this chapter: a red flag is a signal for further investigation, not automatic proof that anything is wrong. Most of these patterns have innocent explanations.",
            "Read this first",
          ),
          h("Signals worth investigating"),
          tbl(
            ["Signal", "What it looks like", "Why it is worth a look"],
            [
              ["Rapid debt growth", "Borrowings rising much faster than profits", "Interest costs can squeeze profit if the business slows"],
              ["Falling cash flow", "Operating cash flow shrinking year after year", "The business may be collecting less or spending more"],
              ["Profit up, cash flow down", "Net profit rising while operating cash flow falls", "Profits may be on paper rather than in the bank"],
              ["Increasing receivables", "Money owed by customers growing faster than revenue", "Some sales may be hard to collect"],
              ["Declining margins", "Net margin falling even as revenue rises", "Costs are rising faster than prices"],
              ["Excessive dilution", "Many new shares issued over a short period", "Existing owners' slice shrinks; may signal a cash shortage"],
              ["Large related-party transactions", "Big deals with companies linked to owners or managers", "Terms may not be fair to all shareholders"],
              ["Unusual accounting changes", "Changing how revenue or costs are recorded", "Can make one year hard to compare with the last"],
              ["Persistent negative free cash flow", "Spending more on long-term assets than the business generates", "The company keeps needing outside money to continue"],
            ],
            "Nine patterns that analysts flag for a closer look.",
          ),
          tool(
            "RedFlagsExplorer",
            "Explore each signal and note why it could be innocent — or not.",
          ),
          p(
            "Take increasing receivables as an example. Receivables are the money customers owe the company for goods already delivered. If they grow faster than revenue, it may mean customers are paying more slowly — but it may also mean a few large, reliable customers were given longer credit terms to win their business.",
          ),
          p(
            "Large related-party transactions are another. A company dealing with firms connected to its own owners can be perfectly normal, but the terms should be clear and fair to all shareholders. That standard is sometimes called dealing at arm's length.",
          ),
          warn(
            "No single signal should ever be read on its own. One can have a simple explanation; several appearing together is what makes them worth studying carefully.",
          ),
          ok(
            "The healthy response to a red flag is a question — what is causing this? — rather than a conclusion.",
          ),
        ],
        keyTakeaways: [
          "Red flags are signals to investigate, not automatic proof of wrongdoing.",
          "Debt rising faster than profits, and profit rising while cash flow falls, are classic patterns to examine.",
          "Receivables growing much faster than revenue can suggest sales that are hard to collect.",
          "A single signal usually has an innocent explanation; several together deserve study.",
          "A good question beats a quick conclusion.",
        ],
        quiz: [
          q(
            "What does it mean when a company shows a red flag?",
            [
              "The company is definitely in trouble",
              "Something deserves a closer look, but nothing is proven yet",
              "The shares should be avoided",
              "The accounts are certainly false",
            ],
            1,
            "A red flag is a prompt to investigate, not a conclusion. It marks a pattern worth explaining, and it may well have a perfectly ordinary explanation.",
          ),
          q(
            "A company's net profit is rising while its operating cash flow is falling. What should this prompt you to do?",
            [
              "Assume the profit is fake",
              "Investigate why cash is not following profit, for example whether receivables are building up",
              "Ignore it, since profit is rising",
              "Conclude the shares are cheap",
            ],
            1,
            "Profit is recorded when a sale is made; cash arrives when the customer pays. The gap is worth investigating — perhaps collections have slowed — but it is not proof of anything until you look.",
          ),
          q(
            "Receivables are growing much faster than revenue. Why is this worth a look?",
            [
              "It always means fraud",
              "Sales may be harder to collect, or slower-paying customers may have been offered long credit",
              "It shows the company has too much cash",
              "It has no meaning",
            ],
            1,
            "Faster-growing receivables can mean collections are slowing, which strains cash — or it can reflect a deliberate decision to give big customers longer to pay. Only investigation tells you which.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 35 — Case study: ABC Manufacturing                               */
  /* ======================================================================== */
  {
    slug: "chapter-35-case-study",
    title: "Case Study: ABC Manufacturing",
    subtitle: "Put the whole process to work",
    chapterOrder: 35,
    difficulty: "ADVANCED",
    description:
      "Apply the process to ABC Manufacturing, a fictional Indian company, and form your own independent view.",
    lessons: [
      {
        slug: "lesson-1-investigate-a-fictional-company",
        title: "Investigate a fictional company",
        summary: "Work through a fictional company's numbers.",
        difficulty: "ADVANCED",
        estimatedMinutes: 13,
        interactive: "CaseStudySimulator",
        blocks: [
          p(
            "Meet ABC Manufacturing Ltd — a fictional Indian company that makes industrial components and sells them to other businesses. Its financial year runs from April to March, like most Indian companies, and all figures below are in ₹ crore unless stated otherwise.",
          ),
          h("The numbers"),
          p(
            "The table gives ABC's figures for three financial years: FY22, FY23 and FY24. Read across each row and notice the direction of travel, not just a single year.",
          ),
          tbl(
            ["Item (₹ crore unless stated)", "FY22", "FY23", "FY24"],
            [
              ["Revenue", "1,000", "1,250", "1,500"],
              ["Total expenses (before interest and tax)", "900", "1,132", "1,362"],
              ["Operating profit (EBIT)", "100", "118", "138"],
              ["Net profit", "80", "95", "110"],
              ["Net profit margin", "8.0%", "7.6%", "7.3%"],
              ["Operating cash flow", "90", "40", "−20"],
              ["Capital expenditure", "60", "120", "150"],
              ["Free cash flow", "30", "−80", "−170"],
              ["Trade receivables", "150", "250", "420"],
              ["Total debt", "300", "550", "900"],
              ["Cash and equivalents", "120", "80", "30"],
              ["Total assets", "900", "1,150", "1,550"],
              ["Shareholders' equity", "500", "560", "610"],
              ["Shares outstanding (crore)", "10", "10", "11"],
              ["Earnings per share (₹)", "8.0", "9.5", "10.0"],
            ],
            "ABC Manufacturing — three years of figures. The share price in FY24 is ₹150.",
          ),
          p(
            "Two measures deserve a quick explanation. Return on equity (ROE) shows the profit earned on the money shareholders have put into the business. The price-to-earnings ratio (P/E) compares the share price with the earnings per share, and is one way people describe how a price relates to profit.",
          ),
          fx(
            "Free cash flow = Operating cash flow − Capital expenditure",
            "The cash left after money spent on long-term assets such as plant and machinery.",
          ),
          fx(
            "Return on equity = Net profit ÷ Shareholders' equity",
            "Profit measured against the shareholders' money in the business.",
          ),
          tool(
            "CaseStudySimulator",
            "Load ABC Manufacturing and explore how the figures move together.",
          ),
          h("What to investigate"),
          ul([
            "What happened to revenue over the three years? Did it grow, and by how much?",
            "Is profit growing at a similar pace? Are the margins holding steady?",
            "What happened to total debt, and how does it compare with shareholders' equity?",
            "What happened to operating cash flow and free cash flow? Are they rising or falling?",
            "What is the return on equity for FY24?",
            "What is the price-to-earnings ratio at a share price of ₹150?",
            "How did the number of shares change, and what might that suggest?",
            "Which of the red flags from the earlier chapter appear in these numbers?",
          ]),
          warn(
            "ABC Manufacturing is fictional and the numbers are rounded for practice. Nothing here is a recommendation to buy or sell anything.",
          ),
          ok(
            "Work through the questions yourself before moving on. In the next lesson we organise those observations into a careful, independent view.",
          ),
        ],
        keyTakeaways: [
          "ABC's revenue grew from ₹1,000 crore to ₹1,500 crore over three years.",
          "Net profit rose, but operating cash flow fell and turned negative.",
          "Total debt grew faster than equity, lifting the debt-to-equity ratio.",
          "Free cash flow was persistently negative and worsening.",
          "Several red flags appear together, which is what makes the numbers worth studying.",
        ],
        quiz: [
          q(
            "By how much did ABC's revenue grow from FY22 to FY24?",
            ["₹100 crore", "₹300 crore", "₹500 crore", "₹1,500 crore"],
            2,
            "Revenue rose from ₹1,000 crore to ₹1,500 crore, a rise of ₹500 crore — about 50%. Reading the change, not just the latest number, is the point.",
          ),
          q(
            "What is ABC's return on equity for FY24?",
            ["10.0%", "18.0%", "33.0%", "1.48"],
            1,
            "ROE = net profit ÷ shareholders' equity = ₹110 crore ÷ ₹610 crore = about 18.0%. It measures profit against the shareholders' money in the business.",
          ),
          q(
            "What is ABC's P/E ratio at a share price of ₹150 and FY24 earnings per share of ₹10?",
            ["₹150", "15", "1.5", "10"],
            1,
            "P/E = share price ÷ earnings per share = ₹150 ÷ ₹10 = 15. It expresses the share price as a multiple of one year's earnings per share.",
          ),
          q(
            "Which pattern in the table is the clearest signal to investigate?",
            [
              "Revenue rising each year",
              "Net profit rising while operating cash flow fell and turned negative",
              "The company is named ABC",
              "Earnings per share rising",
            ],
            1,
            "Profit rising while cash flow falls is a classic signal to investigate the gap between accounting profit and real cash. The other options are either neutral facts or trends that are not, on their own, warning signs.",
          ),
        ],
      },
      {
        slug: "lesson-2-forming-an-independent-view",
        title: "Forming an independent view",
        summary: "Turn observations into your own reasoned view.",
        difficulty: "ADVANCED",
        estimatedMinutes: 12,
        interactive: "CaseStudySimulator",
        blocks: [
          p(
            "Now organise the observations. The goal is not a verdict on whether to invest, but a clear, reasoned understanding of what the numbers show and what still needs explaining.",
          ),
          h("Work through the calculations"),
          kv([
            {
              label: "Return on equity (ROE), FY24",
              value: "Net profit ÷ shareholders' equity = ₹110 crore ÷ ₹610 crore = 18.0%",
            },
            {
              label: "Earnings per share (EPS), FY24",
              value: "Net profit ÷ shares = ₹110 crore ÷ 11 crore shares = ₹10.0",
            },
            {
              label: "Price-to-earnings (P/E), FY24",
              value: "Share price ÷ EPS = ₹150 ÷ ₹10 = 15",
            },
            {
              label: "Debt-to-equity, FY24",
              value: "Total debt ÷ shareholders' equity = ₹900 crore ÷ ₹610 crore = 1.48",
            },
          ]),
          tool(
            "CaseStudySimulator",
            "Re-run the investigation in the simulator and compare your reasoning with the explanations.",
          ),
          tbl(
            ["Observation", "What the numbers show", "What is worth investigating"],
            [
              ["Revenue", "Grew from ₹1,000 to ₹1,500 crore, about 50%", "Whether growth came from selling more or from heavy discounting"],
              ["Profit versus cash", "Net profit rose ₹80 to ₹110 crore, but operating cash flow fell from ₹90 to −₹20 crore", "Why cash is not following profit — are receivables building up?"],
              ["Debt", "Debt rose ₹300 to ₹900 crore; debt-to-equity rose 0.60 to 1.48", "Whether interest can be paid comfortably if the business slows"],
              ["Margins", "Net margin slipped from 8.0% to 7.3%", "Which costs are rising faster than revenue"],
              ["Cash cushion", "Cash fell from ₹120 to ₹30 crore", "How the company would manage if lenders became cautious"],
              ["Shares", "Share count rose from 10 to 11 crore (dilution)", "Why new shares were issued and what the money funded"],
            ],
            "Observations from ABC's numbers, and the questions they raise.",
          ),
          info(
            "Any one of these on its own can have an innocent explanation. It is the combination — rising profit, falling cash, rising debt and a thinner margin — that makes these numbers worth studying carefully.",
          ),
          warn(
            "This lesson deliberately stops at understanding. It offers no view on whether the shares are attractive and no price target. This process describes the business; it does not tell anyone what to do.",
            "Where the analysis ends",
          ),
          ok(
            "You reached these observations by calculating and comparing, not by guessing. That is exactly the skill this course is building — and it is a skill you can apply to any company.",
          ),
        ],
        keyTakeaways: [
          "ROE (net profit ÷ equity) was about 18% in FY24.",
          "The P/E ratio (share price ÷ EPS) was 15 at a share price of ₹150.",
          "Profit rose while cash flow fell — the gap is what deserves attention.",
          "Rising debt and a falling cash balance increase the company's reliance on outside money.",
          "A careful view sets out observations and open questions, not a recommendation.",
        ],
        quiz: [
          q(
            "ABC's net margin fell from 8.0% to 7.3% while revenue grew about 50%. This most likely means:",
            [
              "Revenue was overstated",
              "Costs grew faster than revenue",
              "The company issued too few shares",
              "Margins always fall when revenue rises",
            ],
            1,
            "A falling margin alongside rising revenue points to costs climbing faster than sales. It is a signal to look at which costs are rising — not proof of a problem on its own.",
          ),
          q(
            "Which pair of measures would help you judge whether ABC can handle its debt?",
            [
              "Revenue growth and P/E",
              "Interest costs and cash flow",
              "The company's name and listing date",
              "The number of employees",
            ],
            1,
            "Debt is only a problem if the interest cannot be paid. Interest costs show what the debt demands, and cash flow shows whether the cash is there to meet it.",
          ),
          q(
            "What is the right conclusion of a fundamental analysis exercise like this?",
            [
              "A definite buy or sell decision",
              "A price target for the shares",
              "An independent view supported by observations and open questions",
              "A list of the best stocks",
            ],
            2,
            "The process produces understanding: what the numbers show, and what still needs explaining. Buying or selling is a separate decision that is not part of the analysis itself.",
          ),
        ],
      },
    ],
  },
];
