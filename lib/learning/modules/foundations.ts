import { anim, fx, h, info, kv, ol, ok, p, q, steps, tbl, tool, ul, warn } from "../blocks";
import type { Chapter } from "../types";

export const foundationsChapters: Chapter[] = [
  /* ======================================================================== */
  /* CHAPTER 1 — Money and investing                                          */
  /* ======================================================================== */
  {
    slug: "chapter-1-money",
    title: "Introduction to Money and Investing",
    subtitle: "Start at the very beginning",
    chapterOrder: 1,
    difficulty: "BEGINNER",
    description:
      "Before shares or stock markets, we need a shared vocabulary: money, income, savings, investing, assets and liabilities.",
    lessons: [
      {
        slug: "lesson-1-what-is-money",
        title: "What is Money?",
        summary: "The building blocks: income, expenses, savings, assets and liabilities.",
        difficulty: "BEGINNER",
        estimatedMinutes: 8,
        interactive: "MoneyFlow",
        blocks: [
          p(
            "Money is a medium of exchange — something everyone accepts in return for goods and services. In India that means the rupee (₹). Because everyone accepts it, we can compare the value of wildly different things: an hour of work, a bag of rice, a phone.",
          ),
          h("Where does your money go?"),
          p(
            "Most people receive money as income (a salary, fees, or business profit) and then decide how to use it. Every rupee follows one of a few broad paths.",
          ),
          anim(
            "MoneyJourney",
            "Watch one month of salary split into expenses, savings and investments — then see how assets and liabilities give you a net worth.",
          ),
          steps([
            { title: "Income", text: "Money coming in — salary, business profit, interest, rent." },
            {
              title: "Expenses",
              text: "Money spent on things you consume today: rent, food, travel, EMIs.",
            },
            {
              title: "Savings",
              text: "Money set aside and kept safe, usually in a bank. Available when needed, but growing slowly.",
            },
            {
              title: "Investments",
              text: "Money put to work in something expected to grow or produce income — this is where shares come in.",
            },
          ]),
          info(
            "Savings and investments are not the same thing. Savings protect money you may need soon. Investments accept some risk in exchange for the possibility of growth.",
            "A small but important distinction",
          ),
          h("Assets and liabilities"),
          p(
            "Two words run through the whole of finance. An asset is something you own that has value. A liability is something you owe.",
          ),
          kv([
            { label: "Asset", value: "Cash, bank balance, shares, mutual funds, property, gold" },
            { label: "Liability", value: "Home loan, car loan, credit card dues, unpaid bills" },
          ]),
          fx("Net worth = Total assets − Total liabilities"),
          p(
            "Net worth is the simplest measure of financial position. It rises when you save or invest successfully, and falls when you borrow more than you own.",
          ),
          tool("MoneyFlow"),
          warn(
            "Net worth is not a measure of happiness or success — it is simply a tool for understanding where you stand. We use it here only to introduce the idea of assets and liabilities.",
          ),
        ],
        keyTakeaways: [
          "Money is a medium of exchange that lets us value very different things in one unit.",
          "Income flows into expenses, savings and investments.",
          "An asset is something you own; a liability is something you owe.",
          "Net worth = assets − liabilities.",
        ],
        quiz: [
          q(
            "Which of the following is an asset?",
            ["A monthly salary", "A home loan", "A bank fixed deposit", "Monthly rent"],
            2,
            "A fixed deposit is something you own and that has value, so it is an asset. Salary is income; a home loan is a liability; rent is an expense.",
          ),
          q(
            "Which best describes the difference between saving and investing?",
            [
              "Saving is for the long term; investing is for the short term",
              "Saving keeps money safe; investing accepts risk for potential growth",
              "Saving earns more than investing",
              "They are exactly the same thing",
            ],
            1,
            "Saving prioritises safety and availability. Investing deliberately accepts risk in the hope of growth or income.",
          ),
          q(
            "You own ₹5,00,000 in assets and owe ₹2,00,000. What is your net worth?",
            ["₹7,00,000", "₹3,00,000", "₹2,00,000", "₹5,00,000"],
            1,
            "Net worth = assets − liabilities = ₹5,00,000 − ₹2,00,000 = ₹3,00,000.",
          ),
        ],
      },
      {
        slug: "lesson-2-saving-vs-investing",
        title: "Saving vs Investing",
        summary: "Why time changes the picture — and what compounding does.",
        difficulty: "BEGINNER",
        estimatedMinutes: 9,
        interactive: "SavingVsInvesting",
        blocks: [
          p(
            "Imagine you have ₹1,00,000. You could keep all of it as cash, or put part of it to work. Both choices are reasonable — they simply trade certainty against potential growth.",
          ),
          h("The idea of compounding"),
          p(
            "When money earns a return, that return can itself earn a return in the following period. Growth builds on growth. Over long periods this effect is dramatic, which is why time matters so much.",
          ),
          fx("Future value = Present value × (1 + rate)^years"),
          anim(
            "CompoundingOverTime",
            "₹1,00,000 at 10% a year — and why the second year earns more than the first.",
          ),
          p(
            "At 10% a year, ₹1,00,000 becomes roughly ₹1,61,000 in five years and ₹2,59,000 in ten years — assuming the rate is steady, which in real markets it never is.",
          ),
          h("Why cash alone can quietly lose ground"),
          p(
            "Prices rise over time — that is inflation. If prices rise 5% a year but your money grows at 3%, your money buys less next year than it does today, even though the number in your account went up.",
          ),
          fx("Real (inflation-adjusted) value = Nominal value ÷ (1 + inflation)^years"),
          tool("SavingVsInvesting"),
          warn(
            "The smooth growth line in the simulator is a teaching device, not a forecast. Real investments rise and fall, sometimes sharply, and can lose money.",
            "Hypothetical calculations only",
          ),
          ok(
            "The concept to remember: time in the market matters, and the return you earn has to be judged against inflation, not against zero.",
          ),
        ],
        keyTakeaways: [
          "Saving prioritises safety; investing accepts risk for potential growth.",
          "Compounding means returns earn returns — time amplifies it.",
          "Inflation erodes the purchasing power of idle cash.",
          "Always compare a return against inflation, not against zero.",
        ],
        quiz: [
          q(
            "Why can holding all your money as cash be risky over long periods?",
            [
              "Cash can be stolen",
              "Inflation reduces what the cash can buy",
              "Banks charge you to hold cash",
              "Cash cannot be deposited",
            ],
            1,
            "Nominal cash does not fall, but inflation raises prices. Over time the same amount of cash buys less.",
          ),
          q(
            "₹1,00,000 grows at 10% a year for two years. What is it worth (approximately)?",
            ["₹1,10,000", "₹1,20,000", "₹1,21,000", "₹1,21,100"],
            2,
            "Compounding: ₹1,00,000 × 1.10 × 1.10 = ₹1,21,000. The second year's return is earned on the first year's gain too.",
          ),
          q(
            "What is the core trade-off between saving and investing?",
            [
              "Certainty versus potential growth",
              "Taxes versus fees",
              "Short term versus long term only",
              "There is no trade-off",
            ],
            0,
            "Saving offers more certainty; investing offers higher potential returns in exchange for accepting uncertainty.",
          ),
        ],
      },
      {
        slug: "lesson-3-types-of-investments",
        title: "What is an Investment?",
        summary: "Stocks, bonds, mutual funds, ETFs, real estate, gold and cash.",
        difficulty: "BEGINNER",
        estimatedMinutes: 8,
        interactive: "InvestmentTypes",
        blocks: [
          p(
            "An investment is money committed to something with the expectation of a future benefit — income, growth, or both. Different investments generate that benefit in very different ways.",
          ),
          tbl(
            ["Category", "What it is", "Where return comes from"],
            [
              ["Stocks (equity)", "Ownership in a company", "Price change and dividends"],
              ["Bonds (debt)", "A loan to a government or company", "Interest payments"],
              ["Mutual funds", "A pooled fund managed professionally", "Whatever the fund invests in"],
              ["ETFs", "A basket of securities trading like a share", "Tracks an index or theme"],
              ["Real estate", "Physical property", "Rent and price appreciation"],
              ["Gold", "A physical commodity", "Price change only"],
              ["Cash & deposits", "Bank balances and deposits", "Interest"],
            ],
            "The categories differ in how they create a return and what risks they carry.",
          ),
          h("Two big families: ownership and lending"),
          ul([
            "Equity is ownership. You share in profit and growth — and in losses.",
            "Debt is lending. You are promised interest and repayment, but you do not share in the upside.",
          ]),
          anim(
            "OwnershipOrLending",
            "Sort the categories into the two families — and see why a mutual fund is a wrapper, not a kind of asset.",
          ),
          tool("InvestmentTypes"),
          info(
            "Notice that each category above can have very different risk inside it. One bond can be far safer than another. Understanding the category is the first step, not the last.",
          ),
        ],
        keyTakeaways: [
          "Investments differ in how they generate returns and what risks they carry.",
          "Equity means ownership; debt means lending.",
          "Mutual funds and ETFs are wrappers around underlying assets.",
          "Understanding categories comes before understanding individual products.",
        ],
        quiz: [
          q(
            "Which investment represents ownership rather than lending?",
            ["A government bond", "A bank fixed deposit", "A share of a company", "A corporate debenture"],
            2,
            "A share is a unit of ownership. The others are forms of lending, where you are promised interest.",
          ),
          q(
            "Where does the return on a bond primarily come from?",
            ["Dividends", "Interest payments", "Rent", "Capital appreciation only"],
            1,
            "A bond is debt: the issuer pays you interest and returns your principal.",
          ),
          q(
            "An ETF differs from a single share mainly because it:",
            [
              "Cannot be sold easily",
              "Holds a basket of securities",
              "Always pays dividends",
              "Is issued only by governments",
            ],
            1,
            "An ETF holds a basket of securities and trades on an exchange like a single share, so it spreads exposure across many holdings.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 2 — What is a company?                                           */
  /* ======================================================================== */
  {
    slug: "chapter-2-company",
    title: "What Is a Company?",
    subtitle: "From an idea to an organisation that earns money",
    chapterOrder: 2,
    difficulty: "BEGINNER",
    description:
      "A company turns an idea into a business that earns revenue, incurs costs, and hopefully makes a profit.",
    lessons: [
      {
        slug: "lesson-1-what-is-a-company",
        title: "What is a company?",
        summary: "A legal entity that exists to do business.",
        difficulty: "BEGINNER",
        estimatedMinutes: 7,
        interactive: "CompanyModel",
        blocks: [
          p(
            "A company is a legal entity — separate from the people who own it — that carries on a business. It can sign contracts, own property, hire people, borrow money, and be sued.",
          ),
          p(
            "That separation matters. If the company fails, its owners (shareholders) can generally lose only what they invested, not their personal assets. This is called limited liability, and it is one reason people are willing to invest in businesses they do not run.",
          ),
          h("From idea to ownership"),
          anim(
            "CompanyJourney",
            "Idea → business → capital → investors → ownership: the journey that ends in shares.",
          ),
          steps([
            { title: "Idea", text: "A founder sees a problem worth solving." },
            { title: "Business", text: "The idea becomes operations: product, customers, costs." },
            { title: "Capital", text: "Growth needs money — more than the business generates." },
            { title: "Investors", text: "People provide that money in exchange for a stake." },
            { title: "Ownership", text: "The stake is divided into shares, which can be bought and sold." },
          ]),
          tool("CompanyModel"),
          info(
            "Not every company has shareholders. A small shop run by one person may be a sole proprietorship. But once a business wants money from outside investors, it usually becomes a company and issues shares.",
          ),
        ],
        keyTakeaways: [
          "A company is a legal entity separate from its owners.",
          "Limited liability caps what owners can lose at their investment.",
          "Companies need capital to grow beyond what they generate internally.",
        ],
        quiz: [
          q(
            "What does 'limited liability' mean for a shareholder?",
            [
              "The company cannot borrow money",
              "A shareholder can lose only what they invested",
              "The company has a limited lifespan",
              "Shares cannot be sold",
            ],
            1,
            "Limited liability means the shareholder's loss is generally capped at their investment; personal assets are protected.",
          ),
          q(
            "Why does a growing company usually need outside capital?",
            [
              "Companies are legally required to raise capital",
              "Growth often costs more than current profits can fund",
              "Investors demand it",
              "It has no relation to growth",
            ],
            1,
            "Expansion — factories, hiring, marketing — usually requires more money than the business generates in the short term.",
          ),
        ],
      },
      {
        slug: "lesson-2-how-companies-make-money",
        title: "How companies make money",
        summary: "Revenue, costs, and the path to profit.",
        difficulty: "BEGINNER",
        estimatedMinutes: 9,
        interactive: "IncomeStatementSimulator",
        blocks: [
          p(
            "Every business is ultimately a simple loop: sell something to customers for more than it costs you to provide it. What makes companies different is the detail inside that loop.",
          ),
          anim(
            "BusinessLoop",
            "The loop every business runs: customers pay, costs are met, profit is what remains.",
          ),
          ol([
            "Revenue is the total money collected from customers.",
            "Costs are what had to be spent to earn that revenue.",
            "Profit is what remains — and there are several levels of it.",
          ]),
          h("The layers of profit"),
          tbl(
            ["Level", "What it subtracts", "Why people look at it"],
            [
              ["Gross profit", "Cost of goods / services", "Shows the basic economics of what is sold"],
              [
                "EBITDA",
                "Also operating expenses (salaries, marketing, rent)",
                "Shows operating performance before accounting and financing effects",
              ],
              ["EBIT", "Also depreciation and amortisation", "Operating profit used to judge the business itself"],
              ["Net profit", "Also interest and tax", "The bottom line available to shareholders"],
            ],
          ),
          fx("Revenue − Costs = Profit (measured at several levels)"),
          p(
            "A company can look healthy at one level and unhealthy at another. Plenty of businesses earn a good gross profit but lose money once interest and tax are paid.",
          ),
          tool("IncomeStatementSimulator"),
          ok(
            "Change the sliders above and watch the margins move. A company with high revenue but a thin net margin is far more fragile than it first appears.",
          ),
        ],
        keyTakeaways: [
          "Revenue is the top line; profit is what remains after costs.",
          "Profit is measured at several levels: gross, EBITDA, EBIT and net.",
          "Margins express profit as a percentage of revenue.",
          "A healthy top line does not guarantee a healthy bottom line.",
        ],
        quiz: [
          q(
            "Revenue of ₹1,000 crore with costs of ₹700 crore leaves:",
            ["₹300 crore of revenue", "₹300 crore of profit before other items", "₹1,700 crore", "A loss"],
            1,
            "Revenue − costs = ₹1,000 − ₹700 = ₹300 crore. Whether that becomes net profit depends on interest and tax.",
          ),
          q(
            "What does EBITDA exclude that EBIT includes?",
            ["Interest and tax", "Depreciation and amortisation", "Cost of goods sold", "Revenue"],
            1,
            "EBITDA = earnings before interest, tax, depreciation and amortisation. EBIT (operating profit) sits below depreciation.",
          ),
          q(
            "A company has strong revenue growth but its net margin is falling. What does this suggest?",
            [
              "Costs are growing faster than revenue",
              "The company is definitely in trouble",
              "Revenue is being overstated",
              "Nothing — margins always fall",
            ],
            0,
            "Falling margins alongside rising revenue usually points to costs rising faster than sales. It is a signal to investigate, not proof of a problem.",
          ),
        ],
      },
      {
        slug: "lesson-3-revenue",
        title: "Revenue",
        summary: "The top line: what it is, how it is recognised, and why growth alone is not enough.",
        difficulty: "BEGINNER",
        estimatedMinutes: 8,
        interactive: "IncomeStatementSimulator",
        blocks: [
          p(
            "Revenue is the total money a company earns from selling its goods or services in a period. It sits at the very top of the income statement, before any cost is subtracted — which is why it is often called the top line.",
          ),
          h("When is revenue recorded?"),
          p(
            "Companies use accrual accounting: revenue is recorded when the goods or service have been delivered, not necessarily when the cash arrives. Deliver a ₹10 lakh order to a customer who pays in 90 days, and revenue of ₹10 lakh is recorded today while the cash shows up much later.",
          ),
          anim(
            "WhenRevenueLands",
            "Revenue is recorded when the goods are delivered — the cash can turn up three months later.",
          ),
          p("That single rule explains a lot of the difference between profit and cash, which we return to later in the course."),
          h("Different businesses earn revenue differently"),
          ul([
            "One-off sales: a machine-tool maker sells an order and moves on.",
            "Repeat sales: a food brand sells the same products week after week.",
            "Subscriptions: a software company bills monthly or annually.",
            "Per-transaction: a payments company earns a small fee on each transaction.",
          ]),
          fx("Revenue growth (%) = (This period − Last period) ÷ Last period × 100"),
          h("Why growth alone is not enough"),
          p(
            "Revenue can rise for several different reasons, and they are not equal in quality. A price rise, a volume increase, a new product, or buying another company all show up as growth — but they mean different things for the future.",
          ),
          tbl(
            ["What drove the growth", "What to ask next"],
            [
              ["Higher prices", "Can customers be charged more again next year without losing them?"],
              ["More volume", "Is there capacity to keep growing, and is competition limited by price?"],
              ["New products", "Do they carry the same margin as the core business?"],
              ["An acquisition", "Was the purchase paid for with cash or with new shares?"],
            ],
            "Two companies can report the same revenue growth and be in very different health.",
          ),
          tool("IncomeStatementSimulator"),
          warn(
            "High revenue says nothing about whether the company keeps any of it. A business can grow its top line for years while losing money at the bottom.",
            "The top line is not the bottom line",
          ),
        ],
        keyTakeaways: [
          "Revenue is the top line — earnings before any costs are subtracted.",
          "Revenue is recorded when goods or services are delivered, not when cash arrives.",
          "Growth can come from price, volume, new products or acquisitions — with different implications.",
          "Revenue growth alone does not tell you whether the company is profitable.",
        ],
        quiz: [
          q(
            "A company delivers goods worth ₹10 lakh and the customer will pay in 90 days. What is recorded today?",
            [
              "No revenue, because cash has not been received",
              "₹10 lakh of revenue, with a receivable on the balance sheet",
              "₹10 lakh of cash",
              "A liability of ₹10 lakh",
            ],
            1,
            "Under accrual accounting, revenue is recognised when the goods are delivered. The unpaid amount sits on the balance sheet as a receivable until the customer pays.",
          ),
          q(
            "A company's revenue rises from ₹800 crore to ₹1,000 crore. What is the growth rate?",
            ["20%", "25%", "12.5%", "125%"],
            1,
            "Growth = (1,000 − 800) ÷ 800 × 100 = 200 ÷ 800 × 100 = 25%.",
          ),
          q(
            "Which is the most reliable reason to want to understand quickly?",
            [
              "Whether growth came from prices, volumes, new products or an acquisition",
              "Whether revenue crossed a round number",
              "Whether the company published a press release",
              "Whether the share price rose",
            ],
            0,
            "The source of growth determines whether it is likely to continue and whether it carries the same profitability as the existing business.",
          ),
        ],
      },
      {
        slug: "lesson-4-expenses",
        title: "Expenses",
        summary: "Fixed, variable and one-off costs — and why the mix matters more than the total.",
        difficulty: "BEGINNER",
        estimatedMinutes: 8,
        interactive: "IncomeStatementSimulator",
        blocks: [
          p(
            "If revenue is the money coming in, expenses are the money consumed to earn it. But not all costs behave the same way — and understanding how they behave is what tells you how a business will react when sales change.",
          ),
          h("Three families of cost"),
          tbl(
            ["Type of cost", "What it means", "Examples"],
            [
              ["Variable", "Rises and falls with sales volume", "Raw materials, packaging, freight, sales commission"],
              ["Fixed", "Stays broadly the same regardless of volume", "Factory rent, plant depreciation, salaried staff"],
              ["One-off (exceptional)", "A cost that should not repeat", "Restructuring, a lawsuit settlement, an asset write-down"],
            ],
          ),
          p(
            "On the income statement, the direct costs of what was sold are usually called cost of goods (or cost of services), and everything else in the ordinary running of the business is grouped as operating expenses.",
          ),
          h("Why the mix matters: operating leverage"),
          p(
            "A business with mostly variable costs sees profits move roughly in step with sales. A business with high fixed costs sees profits move much more sharply: once the fixed base is covered, each extra sale drops more profit to the bottom line — but a fall in sales hurts just as forcefully.",
          ),
          anim(
            "HowCostsBehave",
            "Why the same 10% fall in sales can cost one business ₹2 lakh of profit and another ₹8 lakh.",
          ),
          kv([
            {
              label: "High fixed costs",
              value: "Profits are volatile. Airlines, steel plants and hotels behave like this.",
            },
            {
              label: "Mostly variable costs",
              value: "Profits are steadier. Trading and distribution businesses often behave like this.",
            },
          ]),
          tool("IncomeStatementSimulator"),
          info(
            "When reading an income statement, scan for anything labelled 'exceptional', 'one-off' or 'other income'. These lines can make a weak year look strong, or a strong year look weak.",
            "Watch the exceptional items",
          ),
        ],
        keyTakeaways: [
          "Costs are variable, fixed, or one-off — and the mix shapes how profits respond to sales.",
          "Direct costs of what was sold are separated from general operating expenses.",
          "High fixed costs mean higher operating leverage: bigger swings in profit.",
          "One-off items can distort a single year's profit, so they deserve a second look.",
        ],
        quiz: [
          q(
            "Which of these is a variable cost for a furniture maker?",
            ["Factory rent", "Timber bought for each order", "Depreciation of machinery", "The finance director's salary"],
            1,
            "Timber scales with how much furniture is produced, so it is variable. Rent, depreciation and salaried staff are broadly fixed.",
          ),
          q(
            "A company has high fixed costs. If its sales fall by 10%, its profit will most likely:",
            [
              "Fall by about 10%",
              "Fall by more than 10%",
              "Fall by less than 10%",
              "Not change",
            ],
            1,
            "The fixed cost base does not shrink with sales, so profit falls proportionally more. This is operating leverage working in reverse.",
          ),
          q(
            "Why should a one-off restructuring charge be looked at separately?",
            [
              "Because it is illegal to record it",
              "Because it is not expected to repeat, so it distorts year-to-year comparison",
              "Because it does not affect profit",
              "Because it always signals fraud",
            ],
            1,
            "One-off items are not expected to recur. Separating them helps you see the underlying, repeatable profitability of the business.",
          ),
        ],
      },
      {
        slug: "lesson-5-profit",
        title: "Profit",
        summary: "Gross, operating and net profit — and what each margin reveals.",
        difficulty: "BEGINNER",
        estimatedMinutes: 8,
        interactive: "MarginWaterfall",
        blocks: [
          p(
            "Profit is what remains of revenue once costs are subtracted — but there is not one profit figure. There are several, each subtracting a different kind of cost. Reading them in order is like peeling an onion.",
          ),
          anim(
            "ProfitLayers",
            "One revenue figure, five layers — each layer is what the one above it leaves behind.",
          ),
          tbl(
            ["Profit measure", "What it subtracts from revenue", "What it tells you"],
            [
              ["Gross profit", "Cost of goods / services", "The basic economics of what is sold"],
              ["EBITDA", "Also operating expenses", "Operating performance before accounting and financing effects"],
              ["EBIT (operating profit)", "Also depreciation and amortisation", "The profit the business itself generates"],
              ["Net profit", "Also interest and tax", "What is left for shareholders"],
            ],
          ),
          h("From profit to margin"),
          p(
            "Absolute profit numbers are hard to compare — a ₹500 crore profit sounds large until you learn it came from ₹50,000 crore of revenue. Turning profit into a percentage of revenue gives you a margin, which travels much better between companies and across years.",
          ),
          fx("Margin (%) = Profit measure ÷ Revenue × 100"),
          p(
            "A gross profit of ₹300 crore on revenue of ₹1,000 crore is a 30% gross margin. A net profit of ₹100 crore on the same revenue is a 10% net margin.",
          ),
          ul([
            "A falling gross margin suggests input costs are rising faster than prices can be raised.",
            "A falling operating margin suggests the cost of running the business is growing.",
            "A gap between operating and net margin usually points to interest costs or tax.",
          ]),
          tool("MarginWaterfall"),
          warn(
            "Profit is an accounting measure, not cash. A company can report a healthy profit while its bank balance falls, because revenue may be recorded before the cash arrives. Chapter 17 is devoted to exactly this.",
            "Profit is not the same as cash",
          ),
        ],
        keyTakeaways: [
          "Profit is measured at several levels, each subtracting a different class of cost.",
          "Margins (profit as a percentage of revenue) make companies comparable.",
          "Compare margins with a company's own history and with close competitors, not across unrelated industries.",
          "Accounting profit is not the same thing as cash.",
        ],
        quiz: [
          q(
            "Revenue of ₹1,000 crore, cost of goods of ₹700 crore and operating expenses of ₹200 crore. What is EBITDA?",
            ["₹300 crore", "₹100 crore", "₹500 crore", "₹800 crore"],
            1,
            "Gross profit = ₹1,000 − ₹700 = ₹300 crore. EBITDA = ₹300 − ₹200 = ₹100 crore.",
          ),
          q(
            "Net profit of ₹150 crore on revenue of ₹1,000 crore is a net margin of:",
            ["15%", "1.5%", "150%", "6.7%"],
            0,
            "₹150 ÷ ₹1,000 × 100 = 15%.",
          ),
          q(
            "Which comparison makes the most sense for a margin?",
            [
              "A software company against a steel plant",
              "A company against its own history and its closest competitors",
              "Any two companies on the same exchange",
              "A company against the Nifty 50 index",
            ],
            1,
            "Margins differ enormously by industry, so cross-industry comparisons mislead. Use the company's own history and its direct competitors.",
          ),
        ],
      },
      {
        slug: "lesson-6-why-companies-need-capital",
        title: "Why companies need capital",
        summary: "Growth costs money — before it earns any.",
        difficulty: "BEGINNER",
        estimatedMinutes: 8,
        interactive: "CompanyModel",
        blocks: [
          p(
            "A profitable business still needs cash. It may have to pay suppliers and salaries today while customers pay in ninety days. Or it may want to build a new plant that takes years to repay.",
          ),
          anim(
            "WhyCapital",
            "Why a profitable business still raises money — and the two very different ways it can.",
          ),
          h("Two ways to raise money"),
          kv([
            { label: "Debt", value: "Borrowed money. Must be repaid with interest. Lenders do not get ownership." },
            { label: "Equity", value: "Money from shareholders. Never repaid. Shareholders get ownership and a share of profit." },
          ]),
          p(
            "Debt is cheaper if the business can comfortably service it, and the lender has no claim on future profits beyond the interest. Equity costs no cash but permanently dilutes ownership.",
          ),
          warn(
            "Capital is not free. Debt carries an obligation to pay interest whatever happens. Equity permanently shares your future success. Choosing between them is one of management's most consequential decisions.",
          ),
          p(
            "This is why a company's first outside funding is a milestone: it marks the point where the business is no longer just the founder's.",
          ),
          tool("CompanyModel", "Revisit the journey — the 'Needs Capital' step is where investors enter."),
        ],
        keyTakeaways: [
          "Profitable businesses can still run short of cash.",
          "Capital comes as debt (repaid with interest) or equity (permanent ownership).",
          "Debt carries a fixed obligation; equity shares in profits and losses.",
          "Raising capital changes who owns the business.",
        ],
        quiz: [
          q(
            "Which is true of equity capital?",
            [
              "It must be repaid with interest",
              "It never has to be repaid, but it dilutes ownership",
              "It is always cheaper than debt",
              "It gives lenders a claim on profits",
            ],
            1,
            "Equity is permanent capital. The company does not repay it, but the investor receives ownership and a share of profits.",
          ),
          q(
            "Why might a profitable company still need to raise money?",
            [
              "Profit is not real",
              "Cash may be tied up in receivables, inventory or expansion",
              "Regulations require it",
              "It always needs to raise money",
            ],
            1,
            "Profit is recorded when earned, but cash may arrive later or be consumed by investment in the business.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 3 — What is a share?                                             */
  /* ======================================================================== */
  {
    slug: "chapter-3-share",
    title: "What Is a Share?",
    subtitle: "Ownership, divided into units",
    chapterOrder: 3,
    difficulty: "BEGINNER",
    description:
      "A share is a unit of ownership. This chapter makes proportion, value and dilution completely concrete.",
    lessons: [
      {
        slug: "lesson-1-what-is-ownership",
        title: "What is ownership?",
        summary: "Your slice of the company, not a price on a screen.",
        difficulty: "BEGINNER",
        estimatedMinutes: 8,
        interactive: "OwnershipSimulator",
        blocks: [
          p(
            "Suppose a company is worth ₹10 crore and it has issued 10,00,000 shares. Each share then represents ₹100 of company value. That is the entire idea behind a share: a company's ownership divided into equal units.",
          ),
          anim(
            "OwnershipSlices",
            "Cut a ₹10 crore company into 10,00,000 shares — then watch a 5% holding keep its proportion while its value doubles.",
          ),
          fx("Value per share = Company value ÷ Number of shares"),
          p(
            "Own 50,000 of those shares and you own 5% of the company — regardless of what the share price later does. Ownership is about proportion; price is about the value of that proportion.",
          ),
          h("Proportion, not price"),
          ul([
            "If the company doubles in value, your 5% is still 5% — but it is now worth twice as much.",
            "If the company issues many new shares, your 5% falls unless you buy more.",
            "Owning shares makes you a part-owner, with a claim on the company's profits.",
          ]),
          tool("OwnershipSimulator"),
          info(
            "Move the sliders and notice the 'implied price per share'. Then change only the number of shares while leaving the company value alone, and watch how each share represents a smaller slice.",
            "Try this",
          ),
        ],
        keyTakeaways: [
          "A share is a unit of ownership in a company.",
          "Value per share = company value ÷ number of shares.",
          "Ownership percentage is independent of the share price.",
        ],
        quiz: [
          q(
            "A company worth ₹10 crore has 10,00,000 shares. What does each share represent?",
            ["₹1,000 of value", "₹100 of value", "₹10 of value", "Cannot be determined"],
            1,
            "₹10,00,00,000 ÷ 10,00,000 = ₹100 per share.",
          ),
          q(
            "You own 40,000 of a company's 8,00,000 shares. What is your ownership?",
            ["4%", "5%", "8%", "0.5%"],
            1,
            "40,000 ÷ 8,00,000 = 0.05 = 5%.",
          ),
          q("If the company's value doubles, your ownership percentage:", [
            "Doubles",
            "Halves",
            "Stays the same",
            "Depends on the share price",
          ], 2, "Ownership is a proportion. Its value doubles, but the percentage does not change."),
        ],
      },
      {
        slug: "lesson-2-dilution",
        title: "The effect of issuing more shares",
        summary: "What dilution is and why it matters.",
        difficulty: "BEGINNER",
        estimatedMinutes: 7,
        interactive: "OwnershipSimulator",
        blocks: [
          p(
            "When a company issues new shares, the total number of shares rises. Unless you buy some of those new shares, your slice of the company shrinks. This is dilution.",
          ),
          p(
            "Companies issue new shares to raise money — for expansion, to repay debt, or to fund an acquisition. That is not automatically bad. The test is whether the money raised creates more value than the ownership it costs.",
          ),
          anim(
            "DilutionSlices",
            "Watch a 10% holding fall to 6.67% as new shares are issued — and why that is not the same as losing money.",
          ),
          tbl(
            ["Before", "After issuing new shares"],
            [
              ["1,00,000 shares outstanding", "1,50,000 shares outstanding"],
              ["You own 10,000 shares = 10%", "You own 10,000 shares = 6.67%"],
              ["Company value ₹1 crore", "Company value ₹1.5 crore (if the new money is invested)"],
            ],
            "Dilution in numbers: your percentage falls even though your share count has not changed.",
          ),
          tool(
            "OwnershipSimulator",
            "Increase the total shares while keeping your holding the same, and watch your percentage fall.",
          ),
          warn(
            "Dilution is not automatically harmful. If ₹50 lakh of new capital builds a business worth far more than ₹50 lakh, existing owners can end up better off despite owning a smaller share.",
            "Read this carefully",
          ),
        ],
        keyTakeaways: [
          "Issuing new shares dilutes existing owners' percentage.",
          "Dilution is only harmful if the money raised fails to create value.",
          "EPS is a per-share measure, so dilution tends to reduce it unless profit grows too.",
        ],
        quiz: [
          q(
            "You own 10,000 of 1,00,000 shares (10%). The company issues 1,00,000 new shares. Your ownership is now:",
            ["10%", "6.67%", "5%", "20%"],
            2,
            "Total shares become 2,00,000. 10,000 ÷ 2,00,000 = 5%. The percentage halves when the share count doubles.",
          ),
          q(
            "When is dilution most acceptable to existing shareholders?",
            [
              "When the money raised creates more value than the ownership given up",
              "Always, since more capital is better",
              "Never, since dilution is always bad",
              "Only when the share price falls",
            ],
            0,
            "The test is whether the capital produces value greater than the ownership cost. Growth capital can benefit everyone.",
          ),
        ],
      },
    ],
  },
];
