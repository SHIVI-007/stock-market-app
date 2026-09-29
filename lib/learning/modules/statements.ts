import { fx, h, info, kv, ok, p, q, tbl, tool, ul, warn } from "../blocks";
import type { Chapter } from "../types";

export const statementsChapters: Chapter[] = [
  /* ======================================================================== */
  /* CHAPTER 13 — Understanding financial statements                          */
  /* ======================================================================== */
  {
    slug: "chapter-13-statements",
    title: "Understanding Financial Statements",
    subtitle: "The three reports a company publishes",
    chapterOrder: 13,
    difficulty: "INTERMEDIATE",
    description:
      "Every listed company reports its numbers three ways: what it earned, what it owns, and where its cash went. This chapter is your map to all three.",
    lessons: [
      {
        slug: "lesson-1-the-three-statements",
        title: "The three statements",
        summary: "Income statement, balance sheet and cash flow — what each one shows.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 9,
        interactive: "FinancialStatementsDiagram",
        blocks: [
          p(
            "A company reports its results in a set of financial statements — standard tables that investors, lenders and regulators all read. There are three main ones, and each answers a different question.",
          ),
          h("Three reports, three questions"),
          tbl(
            ["Statement", "The question it answers", "Time view"],
            [
              ["Income statement", "Did the business earn a profit this period?", "A period (a year or a quarter)"],
              ["Balance sheet", "What does it own and owe right now?", "A point in time (the last day)"],
              ["Cash flow statement", "Where did cash come from and go?", "A period (a year or a quarter)"],
            ],
            "Each statement looks at the same business from a different angle.",
          ),
          p(
            "Notice the third column: two of the statements cover a span of time, while the balance sheet is a single moment. This difference is one of the most useful ideas to hold on to.",
          ),
          info(
            "In India a financial year (FY) runs from 1 April to 31 March. So 'FY25' means the year ending 31 March 2025. Companies publish results every quarter and a full set at year end.",
            "Indian financial year",
          ),
          h("A video and a photograph"),
          p(
            "Think of the income statement and cash flow statement as short videos of the year: they show what happened across the period. The balance sheet is a photograph taken on the last day, freezing the position at that instant.",
          ),
          ul([
            "The income statement is like a report card for the period: revenue earned, costs, and profit.",
            "The balance sheet is like a snapshot of everything owned and owed on one date.",
            "The cash flow statement is like a bank passbook: real money moving in and out.",
          ]),
          tool("FinancialStatementsDiagram"),
          ok(
            "You do not need to memorise every line of a statement to start. Knowing what each of the three is for already puts you ahead of most beginners.",
          ),
        ],
        keyTakeaways: [
          "The three main financial statements are the income statement, the balance sheet and the cash flow statement.",
          "The income statement and cash flow statement cover a period; the balance sheet is a point in time.",
          "Each statement answers a different question about the same business.",
          "In India the financial year runs April to March.",
        ],
        quiz: [
          q(
            "Which statement shows a company's position on a single date?",
            ["The income statement", "The cash flow statement", "The balance sheet", "None of them"],
            2,
            "The balance sheet is a snapshot at one moment — usually the last day of the financial year. The other two statements summarise activity across a period.",
          ),
          q(
            "Why do we say the income statement covers a period rather than a point in time?",
            [
              "Because it lists assets and liabilities",
              "Because it records activity across a span of time, such as a full year",
              "Because it is prepared only once",
              "Because it shows cash balances",
            ],
            1,
            "An income statement accumulates revenue and expenses throughout a period, so it describes what happened over time rather than on one date.",
          ),
        ],
      },
      {
        slug: "lesson-2-how-they-connect",
        title: "How they connect",
        summary: "Net profit feeds equity, and cash movement links opening to closing cash.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 10,
        interactive: "FinancialStatementsDiagram",
        blocks: [
          p(
            "The three statements are not three separate stories — they are a linked set. A figure that changes in one appears somewhere in the others. Understanding these links is what turns a pile of numbers into a picture of the business.",
          ),
          h("Link 1: profit flows into equity"),
          p(
            "When a company earns a net profit, it does not simply disappear. Whatever is not paid out to shareholders as dividends is kept in the business as retained earnings, which sits inside equity on the balance sheet.",
          ),
          fx(
            "Closing retained earnings = Opening retained earnings + Net profit − Dividends",
            "Profit left in the business adds to equity; dividends reduce it.",
          ),
          h("Link 2: cash reconciles"),
          p(
            "The cash flow statement starts with the cash the company held at the beginning of the period and ends with the cash it holds at the end. The closing figure is the same cash you see as an asset on the balance sheet.",
          ),
          fx(
            "Closing cash = Opening cash + Operating + Investing + Financing cash flows",
            "The three cash flows together explain the whole change in cash.",
          ),
          tool(
            "FinancialStatementsDiagram",
            "Follow the arrows: profit links to equity, and closing cash links to the balance sheet.",
          ),
          warn(
            "Because the statements are linked, they are prepared together and must agree. If the numbers do not tie up, something has been recorded wrongly — which is one reason auditors spend so long on them.",
          ),
          info(
            "A useful habit: whenever you see net profit, ask two follow-up questions — how much of it became cash, and how much of it stayed inside the business?",
            "A habit worth building",
          ),
        ],
        keyTakeaways: [
          "The three statements are connected, not independent.",
          "Undistributed net profit flows into retained earnings, which is part of equity.",
          "Closing cash on the cash flow statement equals the cash shown on the balance sheet.",
          "The statements must agree because they describe the same business.",
        ],
        quiz: [
          q(
            "A company began the year with retained earnings of ₹400 crore. It earned a net profit of ₹150 crore and paid dividends of ₹50 crore. What are its closing retained earnings?",
            ["₹450 crore", "₹500 crore", "₹550 crore", "₹600 crore"],
            1,
            "Closing retained earnings = opening + net profit − dividends = ₹400 + ₹150 − ₹50 = ₹500 crore. Profit not paid out stays in the business and adds to equity.",
          ),
          q(
            "Which figure on the cash flow statement should match the balance sheet?",
            [
              "Operating cash flow",
              "Total revenue",
              "Closing cash",
              "Dividends paid",
            ],
            2,
            "Both statements describe the same company on the same date, so the cash balance at the end of the cash flow statement must equal the cash asset on the balance sheet.",
          ),
          q(
            "Why is it useful to ask how much profit became cash?",
            [
              "Because profit is always wrong",
              "Because profit is recorded when earned, but the cash may arrive later",
              "Because cash earns no interest",
              "Because dividends are compulsory",
            ],
            1,
            "Accounting records profit when it is earned. The customer may pay much later, so a profitable year does not guarantee cash in the bank.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 14 — Income statement                                            */
  /* ======================================================================== */
  {
    slug: "chapter-14-income-statement",
    title: "Income Statement",
    subtitle: "Following revenue down to profit",
    chapterOrder: 14,
    difficulty: "INTERMEDIATE",
    description:
      "The income statement shows how much a company earned over a period, and how much of it survived costs, interest and tax.",
    lessons: [
      {
        slug: "lesson-1-revenue-to-net-profit",
        title: "Revenue to net profit",
        summary: "The journey from the top line all the way down to the bottom line.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 10,
        interactive: "IncomeStatementSimulator",
        blocks: [
          p(
            "The income statement is the report that starts with everything a company sold and subtracts, one layer at a time, until only the final profit is left. Reading it is simply following that journey downwards.",
          ),
          h("Start with revenue"),
          p(
            "Revenue — also called sales or the 'top line' — is the total value of goods or services sold during the period, before any costs are removed. A company that sells ₹1,200 crore of products has revenue of ₹1,200 crore.",
          ),
          h("Subtract the direct cost of what was sold"),
          p(
            "Cost of goods sold (for a manufacturer) or cost of services (for a service business) is the direct cost of producing what was sold: raw materials, wages on the factory floor, and similar. Remove it and you reach gross profit.",
          ),
          fx("Gross profit = Revenue − Cost of goods / services"),
          h("Subtract the operating costs"),
          p(
            "Running the business costs money beyond making the product. Subtract these operating expenses and you arrive at EBITDA.",
          ),
          ul([
            "Salaries of office staff and managers",
            "Rent, electricity and administration",
            "Marketing and advertising",
            "Research and development",
          ]),
          tool("IncomeStatementSimulator"),
          p(
            "Below EBITDA the statement continues: depreciation and amortisation bring you to EBIT (operating profit), then interest on borrowings, then tax, and finally net profit — the bottom line belonging to shareholders.",
          ),
          kv([
            {
              label: "Net profit",
              value: "What remains after every cost, including interest and tax — the 'bottom line'.",
            },
            {
              label: "EPS (earnings per share)",
              value: "Net profit ÷ number of shares — the same profit expressed per share.",
            },
          ]),
          ok(
            "Move the sliders and watch how a change near the top — like slower sales — ripples all the way down to net profit.",
          ),
        ],
        keyTakeaways: [
          "Revenue is the top line; net profit is the bottom line.",
          "Cost of goods or services is the direct cost of what was sold.",
          "Operating expenses cover the wider running of the business.",
          "Interest and tax are subtracted after operating profit to reach net profit.",
          "EPS expresses net profit on a per-share basis.",
        ],
        quiz: [
          q(
            "ABC Manufacturing reported revenue of ₹1,200 crore and a cost of goods sold of ₹720 crore. What is its gross profit?",
            ["₹480 crore", "₹720 crore", "₹1,920 crore", "₹580 crore"],
            0,
            "Gross profit = revenue − cost of goods sold = ₹1,200 − ₹720 = ₹480 crore. This is profit before operating expenses, interest and tax.",
          ),
          q(
            "What sits immediately below EBITDA on the income statement?",
            [
              "Revenue",
              "Depreciation and amortisation, giving EBIT",
              "Tax",
              "Dividends",
            ],
            1,
            "EBITDA stands for earnings before interest, tax, depreciation and amortisation. Removing depreciation and amortisation takes you to EBIT, the operating profit.",
          ),
          q(
            "Why is the gap between gross profit and net profit important?",
            [
              "It shows how much operating, financing and tax costs consume",
              "It is always zero",
              "It only matters for banks",
              "It equals revenue",
            ],
            0,
            "The difference tells you how much of the gross profit is eaten up by running the business, paying interest and paying tax before anything reaches shareholders.",
          ),
        ],
      },
      {
        slug: "lesson-2-profit-layers",
        title: "The layers: gross, EBITDA, EBIT, net",
        summary: "Why profit is measured at several levels — and what margins reveal.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 9,
        interactive: "IncomeStatementSimulator",
        blocks: [
          p(
            "A single 'profit' number hides a lot. That is why the income statement reports profit at several levels, each one stripping out a different kind of cost. Each layer tells you something the others do not.",
          ),
          h("Four levels of profit"),
          tbl(
            ["Level", "What it still subtracts", "Why people look at it"],
            [
              ["Gross profit", "Cost of goods / services", "The basic economics of what is sold"],
              [
                "EBITDA",
                "Also operating expenses (salaries, rent, marketing)",
                "Operating performance before accounting and financing effects",
              ],
              ["EBIT", "Also depreciation and amortisation", "Operating profit of the business itself"],
              ["Net profit", "Also interest and tax", "The bottom line available to shareholders"],
            ],
            "Each level removes a different kind of cost.",
          ),
          p(
            "Analysts often turn these levels into margins — the profit at each level as a percentage of revenue. Margins let you compare companies of very different sizes on equal terms.",
          ),
          fx("Margin = (Profit at that level ÷ Revenue) × 100"),
          p(
            "Suppose ABC Manufacturing has revenue of ₹1,500 crore and a net profit of ₹90 crore. Its net margin is ₹90 ÷ ₹1,500 = 6%. Another company with the same 6% margin is earning the same profit on every rupee of sales, whatever its size.",
          ),
          tool("IncomeStatementSimulator"),
          ul([
            "Gross margin shows pricing power and production efficiency.",
            "EBITDA margin shows how lean the core operations are.",
            "Net margin shows what is finally left for owners after everything.",
          ]),
          warn(
            "EBITDA is popular because it is simple, but it is not 'real' cash profit — depreciation reflects real assets wearing out. Never treat EBITDA as money in the bank.",
            "A caution about EBITDA",
          ),
          ok(
            "When margins fall while revenue rises, costs are usually growing faster than sales. It is a signal to look closer, not a verdict on its own.",
          ),
        ],
        keyTakeaways: [
          "Profit is reported at several layers: gross, EBITDA, EBIT and net.",
          "Each layer subtracts a different type of cost.",
          "Margins express profit as a percentage of revenue and allow fair comparison.",
          "EBITDA is not the same as cash profit because it ignores depreciation.",
        ],
        quiz: [
          q(
            "A company has revenue of ₹1,500 crore and a net profit of ₹90 crore. What is its net margin?",
            ["0.6%", "6%", "16.7%", "60%"],
            1,
            "Net margin = net profit ÷ revenue × 100 = ₹90 ÷ ₹1,500 × 100 = 6%. It means 6 rupees of profit survive for every 100 rupees of sales.",
          ),
          q(
            "Why can comparing gross margins be more useful than comparing raw gross profit?",
            [
              "Because margins are always larger",
              "Because margins put companies of different sizes on the same footing",
              "Because gross profit is not a real number",
              "Because margins ignore costs",
            ],
            1,
            "A large company will almost always have larger raw profit. A percentage of revenue lets you compare efficiency fairly across companies of any size.",
          ),
          q(
            "What does EBITDA fail to reflect that net profit does reflect?",
            [
              "Revenue",
              "Depreciation, interest and tax",
              "The number of shares",
              "Dividends",
            ],
            1,
            "EBITDA ignores depreciation and amortisation, and it also sits above interest and tax. Net profit includes all of these, so it is a fuller picture.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 15 — Balance sheet                                               */
  /* ======================================================================== */
  {
    slug: "chapter-15-balance-sheet",
    title: "Balance Sheet",
    subtitle: "A snapshot of what a company owns and owes",
    chapterOrder: 15,
    difficulty: "INTERMEDIATE",
    description:
      "The balance sheet freezes a moment in time and answers two questions at once: what does the company own, and who financed it?",
    lessons: [
      {
        slug: "lesson-1-balance-sheet-equation",
        title: "Assets = Liabilities + Equity",
        summary: "The idea that every rupee owned was funded somehow.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 9,
        interactive: "BalanceSheetBuilder",
        blocks: [
          p(
            "The balance sheet is a photograph of a company's finances on one date. It lists everything the company owns on one side and everything it owes, plus the owners' stake, on the other. The two sides must always be equal.",
          ),
          h("The accounting equation"),
          fx(
            "Assets = Liabilities + Equity",
            "Everything owned was funded either by borrowing or by the owners.",
          ),
          p(
            "This is not a rule invented for exams — it simply reflects reality. A company's factory, stock and cash had to be paid for. Whatever was not funded by borrowing was funded by shareholders, directly or through profits kept in the business.",
          ),
          h("Assets: what the company owns"),
          ul([
            "Cash and bank balances",
            "Inventory — goods held for sale, or raw materials to make them",
            "Receivables — money customers owe but have not yet paid",
            "Property, plant and equipment — buildings, machinery, vehicles",
            "Investments — shares or deposits held by the company",
          ]),
          tool("BalanceSheetBuilder"),
          p(
            "Liabilities are what the company owes to outsiders: bank loans, bonds, and payables (bills from suppliers not yet paid). These are claims that must be settled before shareholders get anything.",
          ),
          p(
            "Equity is the owners' stake: the money shareholders put in, plus reserves built up over the years, plus retained earnings kept from past profits. It is the value that belongs to shareholders after all debts are set aside.",
          ),
          info(
            "The balance sheet is called a 'balance' sheet precisely because the two sides always balance. Add up what is owned and it will equal what is owed plus the owners' stake.",
          ),
        ],
        keyTakeaways: [
          "The balance sheet shows the position on a single date.",
          "Assets = liabilities + equity, and it always balances.",
          "Assets are what the company owns; liabilities are what it owes to outsiders.",
          "Equity is the owners' stake after debts.",
        ],
        quiz: [
          q(
            "A company has total assets of ₹900 crore and total liabilities of ₹350 crore. What is its equity?",
            ["₹350 crore", "₹550 crore", "₹1,250 crore", "₹900 crore"],
            1,
            "From assets = liabilities + equity, equity = assets − liabilities = ₹900 − ₹350 = ₹550 crore. This is the owners' stake after all debts.",
          ),
          q(
            "Which of these is a liability?",
            ["Inventory held for sale", "A bank loan", "Cash in the bank", "A factory building"],
            1,
            "A bank loan is money the company owes to an outsider, so it is a liability. The others are assets the company owns.",
          ),
          q(
            "Why must the two sides of a balance sheet always be equal?",
            [
              "Because a regulator forces it",
              "Because everything owned was funded by borrowing or by owners",
              "Because profits are always positive",
              "It is a coincidence in well-run companies",
            ],
            1,
            "Every asset had to be paid for somehow — either with borrowed money (a liability) or with owners' money (equity). That is why the equation can never fall out of balance.",
          ),
        ],
      },
      {
        slug: "lesson-2-reading-the-two-sides",
        title: "Reading the two sides",
        summary: "Current versus non-current, and what equity really tells you.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 9,
        interactive: "BalanceSheetBuilder",
        blocks: [
          p(
            "To read a balance sheet well, you group its lines by timing. Some items will turn into cash or be paid within a year; others stretch much further out. This split is the key to judging short-term strength.",
          ),
          h("Current versus non-current"),
          tbl(
            ["Group", "Meaning", "Examples"],
            [
              ["Current assets", "Will be used or converted to cash within a year", "Cash, inventory, receivables"],
              ["Non-current assets", "Held for the long term", "Property, plant, machinery"],
              ["Current liabilities", "Must be paid within a year", "Payables, short-term loans"],
              ["Non-current liabilities", "Due after more than a year", "Long-term loans, bonds"],
            ],
            "Timing, not size, is what separates the groups.",
          ),
          p(
            "The difference between current assets and current liabilities is working capital. It is a rough measure of whether a company can meet its near-term bills.",
          ),
          ul([
            "Positive working capital suggests short-term bills can be covered.",
            "Negative working capital can be a warning sign, though some strong businesses run this way on purpose.",
            "Large inventory that is not selling can quietly tie up cash.",
          ]),
          h("Equity tells you the owners' stake"),
          p(
            "Equity has three common parts: share capital (money originally raised from shareholders), reserves (amounts set aside over time) and retained earnings (past profits kept in the business). Together they are the shareholders' claim.",
          ),
          tool(
            "BalanceSheetBuilder",
            "Build up the assets and watch how the liabilities and equity side adjusts to keep the sheet balanced.",
          ),
          fx(
            "Equity = Assets − Liabilities",
            "This is the book value of the company — what would be left for owners if debts were cleared.",
          ),
          warn(
            "Book value is not the same as market value. The balance sheet records assets at historical cost, not at what the market would pay for the business today.",
          ),
        ],
        keyTakeaways: [
          "Balance sheet items are grouped by timing: current (within a year) and non-current.",
          "Working capital = current assets − current liabilities.",
          "Equity = assets − liabilities, and represents the owners' book value.",
          "Book value and market value can differ widely.",
        ],
        quiz: [
          q(
            "A company has current assets of ₹300 crore and current liabilities of ₹200 crore. What is its working capital?",
            ["₹100 crore", "₹500 crore", "₹200 crore", "Negative ₹100 crore"],
            0,
            "Working capital = current assets − current liabilities = ₹300 − ₹200 = ₹100 crore. It suggests the company can cover bills due within a year.",
          ),
          q(
            "Why is a large pile of unsold inventory a concern?",
            [
              "Because inventory is never an asset",
              "Because it ties up cash that could be used elsewhere",
              "Because it always means fraud",
              "Because it reduces revenue directly",
            ],
            1,
            "Inventory counts as an asset, but cash has already been spent to buy it. If it does not sell, that cash stays locked up and cannot be used for other needs.",
          ),
          q(
            "Why can book value differ from a company's market value?",
            [
              "Because the balance sheet records assets at historical cost",
              "Because market value ignores equity",
              "Because book value is always higher",
              "Because they are the same number by definition",
            ],
            0,
            "The balance sheet carries assets at what was paid in the past. The market, by contrast, prices in future expectations, so the two figures often diverge.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 16 — Cash flow statement                                         */
  /* ======================================================================== */
  {
    slug: "chapter-16-cash-flow",
    title: "Cash Flow Statement",
    subtitle: "Following the actual money",
    chapterOrder: 16,
    difficulty: "INTERMEDIATE",
    description:
      "The cash flow statement ignores accounting estimates and tracks real cash. It shows whether a business is generating money or burning it.",
    lessons: [
      {
        slug: "lesson-1-three-cash-flows",
        title: "The three cash flows",
        summary: "Operating, investing and financing — and how opening cash reconciles to closing cash.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 9,
        interactive: "CashFlowExplorer",
        blocks: [
          p(
            "The cash flow statement tracks real money moving in and out during a period. Unlike profit, which can be recorded before cash arrives, this statement only counts cash when it actually changes hands.",
          ),
          h("Three buckets of cash"),
          tbl(
            ["Activity", "What it covers", "What it usually tells you"],
            [
              ["Operating", "Day-to-day business: cash from customers, paid to suppliers and staff", "Whether the core business generates cash"],
              ["Investing", "Buying or selling long-term assets and investments", "Whether the company is growing or shrinking"],
              ["Financing", "Borrowing, repaying loans, issuing shares, paying dividends", "How the business is funded"],
            ],
            "Every cash movement belongs to exactly one of these three groups.",
          ),
          p(
            "Operating cash flow is the one most people watch first. A healthy business should usually generate positive cash from its daily operations, because that is the money that keeps it alive.",
          ),
          ul([
            "Operating: cash collected from customers minus cash paid to suppliers and employees.",
            "Investing: cash spent on new machinery or received from selling assets.",
            "Financing: cash raised from lenders or shareholders, and cash returned to them.",
          ]),
          h("Reconciling opening to closing cash"),
          p(
            "The statement is a simple bridge. It starts with the cash the company began the period with, adds the three cash flows, and lands on the cash it holds at the end.",
          ),
          fx(
            "Closing cash = Opening cash + Operating + Investing + Financing cash flows",
            "This closing figure also appears as the cash asset on the balance sheet.",
          ),
          tool(
            "CashFlowExplorer",
            "Adjust each activity and watch how the closing cash balance moves.",
          ),
          ok(
            "A strong operating number paired with heavy investing often signals a business expanding. Heavy financing to cover weak operations is usually a warning sign instead.",
          ),
        ],
        keyTakeaways: [
          "The cash flow statement tracks real cash over a period.",
          "Cash movements are grouped into operating, investing and financing activities.",
          "Operating cash flow shows whether the core business generates cash.",
          "Closing cash = opening cash + the three cash flows, and it ties to the balance sheet.",
        ],
        quiz: [
          q(
            "A company starts the year with ₹50 crore of cash. Operating cash flow is +₹120 crore, investing is −₹80 crore and financing is +₹30 crore. What is its closing cash?",
            ["₹90 crore", "₹120 crore", "₹200 crore", "₹280 crore"],
            1,
            "Closing cash = ₹50 + ₹120 − ₹80 + ₹30 = ₹120 crore. Adding the three flows to the opening balance bridges to the closing figure.",
          ),
          q(
            "Buying a new factory would appear under which activity?",
            ["Operating", "Investing", "Financing", "None of these"],
            1,
            "Long-term assets are an investing activity. It is money spent to build the business for the future, not to run today's operations.",
          ),
          q(
            "Why is operating cash flow often watched more closely than the other two?",
            [
              "Because it is the cash generated by the day-to-day business itself",
              "Because it never changes",
              "Because it excludes all costs",
              "Because lenders ignore it",
            ],
            0,
            "Operating cash shows whether the core business produces cash without relying on borrowing or selling assets. That is what funds the company over the long run.",
          ),
        ],
      },
      {
        slug: "lesson-2-why-cash-flow-matters",
        title: "Why cash flow matters",
        summary: "A profitable company can still run out of money — here is how.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 8,
        interactive: "CashFlowExplorer",
        blocks: [
          p(
            "There is an old saying in finance: profit is an opinion, but cash is a fact. Profit depends on accounting choices and timing; cash is simply money that arrived or left. And it is cash that pays salaries, suppliers and lenders.",
          ),
          p(
            "This is why a company can report a healthy profit and still fail. If customers pay late and the company must still pay its own bills on time, it can run short of cash even while its income statement looks strong.",
          ),
          h("Warning signs to look for"),
          ul([
            "Profit rising while operating cash flow falls — a sign that cash is getting stuck elsewhere.",
            "Persistently negative operating cash flow, funded by borrowing.",
            "Heavy investing paid for entirely with new debt.",
            "Cash needed for daily operations shrinking year after year.",
          ]),
          tool(
            "CashFlowExplorer",
            "Try making operating cash negative while investing stays heavy, and see how the business must lean on financing.",
          ),
          fx(
            "Cash flow from operations roughly = Net profit + non-cash expenses − increase in working capital",
            "We explore this link fully in the next chapter.",
          ),
          info(
            "A company with strong operating cash flow has more freedom: it can invest, repay debt or reward shareholders without constantly asking others for money.",
          ),
          ok(
            "When you study any business, read the cash flow statement alongside the profit figure. The two together tell a far more honest story than profit alone.",
          ),
        ],
        keyTakeaways: [
          "Cash, not profit, is what pays a company's bills.",
          "A profitable company can still run out of cash if money is stuck in receivables or inventory.",
          "Weak or negative operating cash flow funded by borrowing is a warning sign.",
          "Cash flow and profit should be read together, never in isolation.",
        ],
        quiz: [
          q(
            "Why can a company show a profit yet struggle to pay its bills?",
            [
              "Because profit is always fake",
              "Because profit is recorded when earned, but the cash may not have arrived yet",
              "Because bills are not real costs",
              "Because profit excludes revenue",
            ],
            1,
            "Revenue and profit can be recorded before customers pay. Until that cash arrives, the company may still have to pay suppliers and staff, creating a cash squeeze.",
          ),
          q(
            "Which pattern is the clearest warning sign?",
            [
              "Rising profit with rising operating cash flow",
              "Rising profit with falling operating cash flow, funded by borrowing",
              "Steady operating cash flow with modest investing",
              "Negative investing with strong operating cash",
            ],
            1,
            "Profit growing while operating cash shrinks suggests earnings are not turning into cash, and leaning on borrowing to fill the gap is unsustainable if it continues.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 17 — Profit vs cash flow                                         */
  /* ======================================================================== */
  {
    slug: "chapter-17-profit-vs-cash",
    title: "Profit vs Cash Flow",
    subtitle: "Why two reports can tell different stories",
    chapterOrder: 17,
    difficulty: "ADVANCED",
    description:
      "A company can report a healthy profit and still run short of cash. This advanced chapter explains why profit and cash flow differ, and how to bridge the two.",
    lessons: [
      {
        slug: "lesson-1-why-profit-and-cash-differ",
        title: "Why profit and cash differ",
        summary: "Receivables, inventory and working capital create the gap.",
        difficulty: "ADVANCED",
        estimatedMinutes: 10,
        interactive: "ProfitVsCashFlowSimulator",
        blocks: [
          p(
            "Profit and cash are measured differently. Profit uses accrual accounting: revenue is recorded when it is earned and expenses when they are incurred, whether or not cash has moved. Cash flow records money only when it actually changes hands.",
          ),
          h("Timing differences are the whole story"),
          p(
            "Receivables: a company sells goods on credit in March and records the revenue immediately. But the customer may pay in June. Profit rises in March; cash arrives later.",
          ),
          p(
            "Inventory: a company pays cash for stock in January, but does not sell it until April. The cash has left, yet profit is only recorded when the sale happens.",
          ),
          p(
            "Payables: a company receives goods in February and records the expense, but pays the supplier in April. The expense reduces profit now, while the cash leaves later — which actually helps cash in the short term.",
          ),
          fx(
            "Cash flow from operations = Net profit + non-cash expenses − increase in working capital",
            "This bridges the profit figure to the cash the business actually generated.",
          ),
          h("Working capital is the bridge"),
          p(
            "Working capital is current assets minus current liabilities — mostly receivables, inventory and payables. When working capital grows, cash is being tied up; when it shrinks, cash is released. This is why a rise in working capital reduces operating cash flow.",
          ),
          tool(
            "ProfitVsCashFlowSimulator",
            "Change the working capital line and watch profit stay put while cash flow moves.",
          ),
          warn(
            "Growth often consumes cash. A company selling more must usually hold more inventory and carry more receivables, so a fast-growing, profitable business can still need outside funding.",
          ),
        ],
        keyTakeaways: [
          "Profit uses accrual accounting; cash flow records actual money movement.",
          "Receivables, inventory and payables are the main timing differences.",
          "An increase in working capital reduces operating cash flow.",
          "Fast growth can consume cash even when profits are healthy.",
        ],
        quiz: [
          q(
            "A company reports a net profit of ₹100 crore, depreciation of ₹30 crore and an increase in working capital of ₹40 crore. What is its operating cash flow?",
            ["₹70 crore", "₹90 crore", "₹130 crore", "₹170 crore"],
            1,
            "Operating cash flow = net profit + non-cash expenses − increase in working capital = ₹100 + ₹30 − ₹40 = ₹90 crore. Rising working capital absorbs cash.",
          ),
          q(
            "A company sells goods on credit in March and the customer pays in June. What happens?",
            [
              "Profit falls in March",
              "Profit rises in March, but the cash arrives in June",
              "Cash rises in March",
              "Neither profit nor cash changes",
            ],
            1,
            "Under accrual accounting the sale is recorded when earned, so profit rises in March. Cash only appears when the customer actually pays in June.",
          ),
          q(
            "Why does an increase in working capital reduce operating cash flow?",
            [
              "Because it increases profit",
              "Because cash is being tied up in receivables and inventory",
              "Because it is a non-cash expense",
              "Because it reduces revenue",
            ],
            1,
            "Growing receivables and inventory mean cash has gone out but has not yet returned. That ties up money and lowers the cash the operations actually generated.",
          ),
        ],
      },
      {
        slug: "lesson-2-non-cash-expenses",
        title: "Non-cash expenses",
        summary: "Depreciation and amortisation reduce profit without using cash.",
        difficulty: "ADVANCED",
        estimatedMinutes: 9,
        interactive: "ProfitVsCashFlowSimulator",
        blocks: [
          p(
            "A non-cash expense reduces reported profit without any cash leaving the company in that period. The clearest example is depreciation. Because it lowers profit but not cash, it is one reason the two figures drift apart.",
          ),
          h("Depreciation and amortisation"),
          p(
            "Depreciation spreads the cost of a physical asset — a machine, a building, a vehicle — across the years it is used. Instead of recording the whole cost at once, the company charges a portion each year.",
          ),
          p(
            "Amortisation does the same job for intangible assets, such as a patent or software, which have no physical form but still lose value over time.",
          ),
          ul([
            "Provisions for doubtful debts set aside an estimate for customers who may not pay.",
            "Write-downs reduce the value of an asset that has fallen in worth.",
            "Employee stock options can be recorded as an expense without cash leaving.",
          ]),
          fx(
            "Cash flow from operations starts from net profit and adds back non-cash expenses",
            "Adding back removes charges that did not use cash during the period.",
          ),
          p(
            "Suppose ABC Manufacturing reports a net profit of ₹200 crore and depreciation of ₹50 crore. The depreciation reduced profit, but no cash was paid for it this year, so operating cash flow starts by adding it back.",
          ),
          tool(
            "ProfitVsCashFlowSimulator",
            "Raise depreciation and watch profit fall while operating cash flow rises by the same amount.",
          ),
          info(
            "This is why the cash flow statement is often prepared by starting with net profit and adjusting for non-cash items. It reverses accounting entries that never touched cash.",
          ),
          warn(
            "Adding back depreciation does not create cash. It simply removes a non-cash charge. The machines still wear out and will eventually need replacing with real money.",
            "Do not be fooled",
          ),
        ],
        keyTakeaways: [
          "Non-cash expenses reduce profit without using cash in that period.",
          "Depreciation spreads the cost of physical assets over their useful life.",
          "Amortisation does the same for intangible assets.",
          "Cash flow from operations adds non-cash expenses back to net profit.",
          "Adding depreciation back removes a charge; it does not create cash.",
        ],
        quiz: [
          q(
            "Why is depreciation added back when calculating operating cash flow?",
            [
              "Because it increases revenue",
              "Because it reduced profit but no cash was paid for it this period",
              "Because it is a tax",
              "Because it is always small",
            ],
            1,
            "Depreciation lowered reported profit without any cash leaving the company, so reversing it restores the cash figure to what the operations truly generated.",
          ),
          q(
            "Which of these is a non-cash expense?",
            ["Salaries paid in cash", "Rent paid monthly", "Amortisation of a patent", "Interest paid on a loan"],
            2,
            "Amortisation spreads the cost of an intangible asset over time. No cash leaves in that period, so it reduces profit without affecting cash flow.",
          ),
          q(
            "A company adds back ₹50 crore of depreciation. What does this tell you?",
            [
              "The company received ₹50 crore of extra cash",
              "It removed a non-cash charge from profit, not created cash",
              "Its revenue rose by ₹50 crore",
              "Its tax bill fell to zero",
            ],
            1,
            "Adding back depreciation corrects for a charge that used no cash. It does not generate money; the real spending on assets happened earlier or will happen later.",
          ),
        ],
      },
    ],
  },
];
