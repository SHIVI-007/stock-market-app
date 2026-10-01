import { anim, fx, h, info, p, q, steps, tbl, tool, ul, warn } from "../blocks";
import type { Chapter } from "../types";

export const marketsChapters: Chapter[] = [
  /* ======================================================================== */
  /* CHAPTER 4 — What is the stock market?                                    */
  /* ======================================================================== */
  {
    slug: "chapter-4-market",
    title: "What Is the Stock Market?",
    subtitle: "Where buyers and sellers meet",
    chapterOrder: 4,
    difficulty: "INTERMEDIATE",
    description:
      "A stock market is a marketplace: an organised set of rules and systems where people buy and sell shares of companies.",
    lessons: [
      {
        slug: "lesson-1-what-is-a-stock-market",
        title: "What is a stock market?",
        summary: "A marketplace for buying and selling shares.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 8,
        interactive: "MarketplaceSimulator",
        blocks: [
          p(
            "A stock market is a marketplace — a set of rules and systems where people buy and sell shares. A share is a small unit of ownership in a company, so owning a share means owning a tiny slice of that business.",
          ),
          p(
            "Long ago, buying a share meant physically meeting a seller and agreeing a price. That is slow, and it is hard to know whether the price is fair. A stock market solves both problems by bringing many buyers and sellers to one organised place with shared rules.",
          ),
          h("What a market gives you"),
          ul([
            "Liquidity — you can usually find a buyer or seller quickly, instead of waiting for one.",
            "Price discovery — many competing bids and offers produce a single visible price at any moment.",
            "Standard rules — everyone follows the same contract, settlement and disclosure rules.",
            "Access to capital — companies can raise money from the public, and savers can put money to work.",
          ]),
          info(
            "'Liquidity' describes how easily something can be bought or sold without moving its price much. A busy market is liquid; a rare collector's item is not.",
          ),
          anim(
            "WhyMarketsExist",
            "One owner, no buyer — then see what changes once every buyer and seller is gathered in one place.",
          ),
          p(
            "Imagine a fictional company, Nimbus Technologies Ltd. Thousands of investors may want to own a small piece of it. In a market, a seller who wants cash can sell to one of those investors within seconds. Without a market, the same seller might wait months and accept a poor price.",
          ),
          tool("MarketplaceSimulator", "Step through the marketplace and watch how buyers and sellers find each other."),
          warn(
            "A market does not promise that a price is 'correct' or that it will rise. It simply brings buyers and sellers together and records the price they agree on.",
            "Educational only",
          ),
        ],
        keyTakeaways: [
          "A stock market is an organised marketplace for buying and selling shares.",
          "Markets provide liquidity, price discovery and shared rules.",
          "A share is a unit of ownership; the market lets owners trade that ownership.",
          "A market records agreed prices — it does not guarantee they are 'correct'.",
        ],
        quiz: [
          q(
            "What is the main purpose of a stock market?",
            [
              "To guarantee profits",
              "To bring buyers and sellers of shares together under shared rules",
              "To set the 'correct' price of every company",
              "To lend money to companies",
            ],
            1,
            "A market is a meeting place with rules. It lets buyers and sellers trade; it does not guarantee profits or a 'correct' price.",
          ),
          q(
            "'Liquidity' in a market means:",
            [
              "The market is open only on some days",
              "How easily something can be bought or sold without sharply moving its price",
              "The number of brokers in a city",
              "The total profit of listed companies",
            ],
            1,
            "Liquidity measures how quickly and cheaply you can trade. High liquidity usually means narrow gaps between the best buy and sell prices.",
          ),
          q(
            "Why do shared rules matter in a stock market?",
            [
              "They make every share the same price",
              "They let everyone trade fairly, with agreed contracts and disclosure",
              "They prevent prices from ever falling",
              "They remove the need for brokers",
            ],
            1,
            "Common rules mean participants can trust the process: the same contract, settlement and disclosure standards apply to everyone.",
          ),
        ],
      },
      {
        slug: "lesson-2-buyers-sellers-and-brokers",
        title: "Buyers, sellers and brokers",
        summary: "How an order actually reaches the exchange.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 8,
        interactive: "MarketplaceSimulator",
        blocks: [
          p(
            "Every trade has two sides: a buyer who wants to own the share, and a seller who wants to give it up. The market's job is to match them. But buyers and sellers rarely meet in person — they act through brokers.",
          ),
          p(
            "A broker is a registered intermediary that lets you place orders on an exchange. You tell your broker what you want to buy or sell; the broker sends that order to the market and reports back what happened.",
          ),
          h("The journey of an order"),
          anim(
            "OrderJourney",
            "Follow one order from you, through your broker, to the exchange that matches it with an opposing order.",
          ),
          steps([
            {
              title: "Place the order",
              text: "You choose a company, a quantity and a price (or 'market' price) in your broker's app.",
            },
            {
              title: "Broker checks",
              text: "The broker verifies you have the funds or shares and passes the order to the exchange.",
            },
            {
              title: "Matching",
              text: "The exchange's system matches your order with an opposing order — a willing buyer for a seller, or vice versa.",
            },
            {
              title: "Trade confirmed",
              text: "A trade is recorded at the agreed price. Settlement then moves money one way and shares the other.",
            },
          ]),
          p(
            "Fictional example: you want 100 shares of GreenLeaf Foods Ltd. Another investor wants to sell 100 shares. Your broker and theirs send orders to the exchange. The moment the prices agree, a trade happens — and the market reports the new price to everyone.",
          ),
          info(
            "You normally cannot trade on an exchange directly. You connect through a broker because brokers are regulated, keep records and handle settlement.",
          ),
          tool("MarketplaceSimulator", "Watch buyers' and sellers' orders interact and form a price."),
          warn(
            "This describes the process, not a recommendation. Whether any share suits you depends on your goals, time horizon and tolerance for risk — something no lesson or simulator can decide for you.",
          ),
        ],
        keyTakeaways: [
          "Every trade has a buyer and a seller; the market matches them.",
          "A broker is a regulated intermediary that places your orders on the exchange.",
          "An order moves from you to the broker, to the exchange, and is matched with an opposing order.",
          "Settlement is the separate step that moves money and shares between the two sides.",
        ],
        quiz: [
          q(
            "What is the role of a broker?",
            [
              "To decide which shares you should buy",
              "To act as a regulated intermediary that places your orders on the exchange",
              "To hold your money permanently",
              "To guarantee your investment grows",
            ],
            1,
            "A broker is your regulated gateway to the exchange. It transmits orders and handles records and settlement — it does not tell you what to buy.",
          ),
          q(
            "After you place an order, what happens next?",
            [
              "The exchange directly phones the seller",
              "The broker checks it and sends it to the exchange, which matches it with an opposing order",
              "The company issues you new shares",
              "The regulator approves your trade",
            ],
            1,
            "Orders flow from you to the broker, then to the exchange's matching system, which pairs a buy with a sell at an agreed price.",
          ),
          q(
            "In the fictional example, when does a trade happen?",
            [
              "As soon as you decide to buy",
              "When the buyer's and seller's prices agree and an order is matched",
              "Only at the end of the day",
              "When a broker approves it",
            ],
            1,
            "A trade occurs at the moment an opposing order is matched at a common price — that matched price becomes the latest traded price.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 5 — NSE and BSE                                                  */
  /* ======================================================================== */
  {
    slug: "chapter-5-exchanges",
    title: "NSE and BSE",
    subtitle: "India's main stock exchanges",
    chapterOrder: 5,
    difficulty: "INTERMEDIATE",
    description:
      "The NSE and BSE are India's two main stock exchanges. Learn what an exchange does, how companies get listed, and when the market trades.",
    lessons: [
      {
        slug: "lesson-1-what-is-a-stock-exchange",
        title: "What is a stock exchange?",
        summary: "The organised venue where trades are matched.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 8,
        interactive: "ExchangeDiagram",
        blocks: [
          p(
            "A stock exchange is an organised marketplace with a specific job: it runs the systems and rules that let shares be bought and sold. People often use 'market' and 'exchange' almost interchangeably, but the exchange is the infrastructure behind the market.",
          ),
          h("What an exchange actually does"),
          ul([
            "Matches orders — pairs buy orders with sell orders to create trades.",
            "Publishes prices — shows the latest traded price and the best bids and offers.",
            "Lists companies — decides which companies may have their shares traded, under listing rules.",
            "Monitors trading — watches for unusual activity and reports concerns to the regulator.",
          ]),
          p(
            "An exchange also sets standards for the companies it lists: things like regular financial reporting and timely disclosure of important news. These standards are one reason investors are willing to trade on an exchange they have never visited.",
          ),
          info(
            "'Listing' means a company's shares are admitted to trade on an exchange. A fictional example: Nimbus Technologies Ltd 'lists' on an exchange, and from then on its shares can change hands among investors.",
          ),
          tbl(
            ["Exchange's role", "What it means for an investor"],
            [
              ["Order matching", "Your order can be filled quickly if someone takes the other side."],
              ["Price publication", "You can see the current price and how actively a share trades."],
              ["Listing rules", "Listed companies must follow disclosure and reporting standards."],
              ["Surveillance", "Unusual trading is monitored and reported to the regulator."],
            ],
          ),
          tool("ExchangeDiagram", "Follow how orders, prices and listings flow through an exchange."),
          warn(
            "An exchange is a venue, not an adviser. It does not tell anyone what to buy or sell, and listing on an exchange is not a judgement that a company is a 'good' investment.",
          ),
        ],
        keyTakeaways: [
          "An exchange is the organised infrastructure that matches orders and sets rules.",
          "Exchanges publish prices and monitor trading activity.",
          "Listing means a company's shares are admitted to trade on an exchange.",
          "Listing brings disclosure duties, but it is not a quality guarantee.",
        ],
        quiz: [
          q(
            "Which of these is a core job of a stock exchange?",
            [
              "Advising investors on what to buy",
              "Matching buy and sell orders and publishing prices",
              "Guaranteeing that shares rise in value",
              "Setting tax rates on profits",
            ],
            1,
            "An exchange's core work is matching orders and publishing prices, alongside listing standards and surveillance. It does not advise or guarantee returns.",
          ),
          q(
            "What does 'listing' mean?",
            [
              "The exchange buying a company's shares",
              "A company's shares being admitted to trade on an exchange",
              "A company publishing its first advertisement",
              "A broker opening your trading account",
            ],
            1,
            "Listing means the exchange admits a company's shares for trading, which comes with ongoing disclosure and reporting duties.",
          ),
          q(
            "Why do listing rules matter to an investor?",
            [
              "They make the company profitable",
              "They require companies to disclose financial results and important events, improving transparency",
              "They fix the share price",
              "They remove all risk",
            ],
            1,
            "Listing rules oblige companies to report results and material news, so investors can make decisions with better information. They do not remove risk or fix prices.",
          ),
        ],
      },
      {
        slug: "lesson-2-nse-and-bse",
        title: "NSE and BSE in India",
        summary: "India's two main exchanges and how listing works.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 8,
        interactive: "ExchangeDiagram",
        blocks: [
          p(
            "India has two main stock exchanges: the National Stock Exchange (NSE) and the Bombay Stock Exchange (BSE). You will see their short names everywhere, along with well-known indices such as the Nifty 50 (NSE) and the Sensex (BSE).",
          ),
          info(
            "An 'index' is a single number that tracks the average movement of a chosen group of shares. The Nifty 50 tracks 50 large NSE-listed companies; the Sensex tracks a group of large BSE-listed companies. Indices summarise the market; they are not themselves something you buy.",
          ),
          h("A company can list on one or both"),
          p(
            "Listing is decided exchange by exchange. A company might be listed only on the BSE, only on the NSE, or on both. When a company's shares trade on more than one exchange, its price stays broadly similar on each, because traders quickly act on any gap.",
          ),
          tbl(
            ["", "National Stock Exchange (NSE)", "Bombay Stock Exchange (BSE)"],
            [
              ["Common short name", "NSE", "BSE"],
              ["Well-known index", "Nifty 50", "Sensex"],
              ["Listing", "A company may or may not be listed here", "A company may or may not be listed here"],
            ],
          ),
          p(
            "Fictional example: Sunrise Motors Ltd chooses to list on both the NSE and the BSE. Investors can trade its shares on either exchange, and a broker's app may show a single combined price.",
          ),
          tool("ExchangeDiagram", "See how a single company's shares can appear on more than one exchange."),
          info(
            "Regulation covers both exchanges. The Securities and Exchange Board of India (SEBI) oversees them, a topic we look at in the next chapter.",
            "Where regulation fits in",
          ),
        ],
        keyTakeaways: [
          "India's two main stock exchanges are the NSE and the BSE.",
          "Well-known indices include the Nifty 50 (NSE) and the Sensex (BSE).",
          "A company can be listed on one exchange or both.",
          "A share trading on two exchanges tends to have a broadly similar price on each.",
        ],
        quiz: [
          q(
            "Which are India's two main stock exchanges?",
            [
              "NSE and NASDAQ",
              "NSE and BSE",
              "BSE and NYSE",
              "Sensex and Nifty",
            ],
            1,
            "The two main Indian exchanges are the National Stock Exchange (NSE) and the Bombay Stock Exchange (BSE). The Sensex and Nifty are indices, not exchanges.",
          ),
          q(
            "What is the Nifty 50?",
            [
              "A stock exchange",
              "A broker",
              "An index that tracks 50 large NSE-listed companies",
              "A government regulator",
            ],
            2,
            "An index tracks the average movement of a chosen group of shares. The Nifty 50 tracks 50 large companies listed on the NSE.",
          ),
          q(
            "Can a company be listed on both the NSE and the BSE?",
            [
              "No, a company must choose one exchange forever",
              "Yes, a company may list on one exchange or both",
              "Only if it is a government company",
              "Only after ten years of trading",
            ],
            1,
            "Listing is decided exchange by exchange, so a company can appear on one exchange or on both. When it trades on two, arbitrage keeps the prices broadly aligned.",
          ),
        ],
      },
      {
        slug: "lesson-3-symbols-and-sessions",
        title: "Stock symbols and trading sessions",
        summary: "Ticker symbols and the trading day.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 7,
        interactive: "ExchangeDiagram",
        blocks: [
          p(
            "Every listed company has a short code called a ticker symbol (or just a 'symbol'). It is how the exchange identifies the company in its systems — much easier to type than a full legal name.",
          ),
          tbl(
            ["Fictional company", "Possible symbol", "Exchange"],
            [
              ["Nimbus Technologies Ltd", "NIMBUS", "NSE"],
              ["GreenLeaf Foods Ltd", "GREENLEAF", "BSE"],
              ["Bharat Widgets Ltd", "BWIDGET", "NSE and BSE"],
            ],
            "Illustrative symbols for fictional companies only.",
          ),
          p(
            "Symbols are decided by the exchange and are unique within it. The same company may have a slightly different symbol on each exchange where it is listed.",
          ),
          h("When does the market trade?"),
          p(
            "As a standard convention, Indian equity markets trade on weekdays, roughly from 9:15 am to 3:30 pm India Standard Time (IST), with a short pre-open session before the normal session begins. Markets are closed on weekends and on declared public holidays.",
          ),
          ul([
            "Pre-open session — around 9:00–9:15 am: orders are collected and an opening price is discovered.",
            "Normal session — roughly 9:15 am to 3:30 pm: continuous trading.",
            "After hours — the closing price is finalised and post-market settlement continues.",
          ]),
          tool("ExchangeDiagram", "See where symbols and the trading session fit into the exchange's day."),
          warn(
            "Trading hours, holidays and session timings are conventions that can change and can differ by exchange. Always treat the exchange's own published timings as the current authority; the times here are for learning the idea.",
          ),
        ],
        keyTakeaways: [
          "A ticker symbol is a short code that identifies a listed company on an exchange.",
          "Symbols are unique within an exchange and can differ between exchanges.",
          "As a standard convention, Indian equity markets trade roughly 9:15 am–3:30 pm IST on weekdays.",
          "A pre-open session runs shortly before the normal session.",
        ],
        quiz: [
          q(
            "What is a ticker symbol?",
            [
              "The full legal name of a company",
              "A short code that identifies a listed company on an exchange",
              "The price of a share",
              "A type of broker",
            ],
            1,
            "A ticker symbol is a short code (like 'NIMBUS') that the exchange uses to identify a company, and that investors use to look it up.",
          ),
          q(
            "As a standard convention, when do Indian equity markets trade?",
            [
              "24 hours a day, every day",
              "Roughly 9:15 am to 3:30 pm IST on weekdays",
              "Only on weekends",
              "Roughly 6:00 am to 9:00 am IST on weekdays",
            ],
            1,
            "The standard convention is weekday trading from about 9:15 am to 3:30 pm IST, with a pre-open session beforehand. Actual timings can change, so the exchange's published schedule is the authority.",
          ),
          q(
            "Why keep in mind that trading hours can change?",
            [
              "Because prices never change",
              "Because exchanges may revise timings and holidays, so published schedules should be checked",
              "Because only brokers are allowed to know the timings",
              "Because markets trade without any schedule",
            ],
            1,
            "Timings and holidays are conventions set and revised by exchanges. Treating the exchange's published schedule as the current authority avoids acting on outdated information.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 6 — SEBI and market structure                                    */
  /* ======================================================================== */
  {
    slug: "chapter-6-sebi",
    title: "SEBI and Market Structure",
    subtitle: "Who regulates, and who keeps the plumbing running",
    chapterOrder: 6,
    difficulty: "INTERMEDIATE",
    description:
      "SEBI regulates India's securities market. Behind the scenes, brokers, depositories and clearing corporations keep trading safe and settled.",
    lessons: [
      {
        slug: "lesson-1-who-regulates-the-market",
        title: "Who regulates the market?",
        summary: "SEBI's role as market regulator.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 8,
        interactive: "MarketStructureDiagram",
        blocks: [
          p(
            "Markets need someone to enforce the rules and protect participants who know less than others. In India that job belongs to the Securities and Exchange Board of India, known as SEBI.",
          ),
          p(
            "SEBI is the regulator for India's securities market — the market for shares, bonds, mutual funds and similar instruments. It is a statutory body, meaning its powers come from law, not from the exchanges themselves.",
          ),
          h("What SEBI does"),
          ul([
            "Protects investors — for example, by requiring clear disclosure from companies.",
            "Regulates intermediaries — brokers, exchanges, depositories and others must meet standards and be registered.",
            "Sets conduct rules — including prohibitions on insider trading and market manipulation.",
            "Oversees disclosure — listed companies must report financial results and important events on time.",
          ]),
          info(
            "'Insider trading' is trading on important information that is not yet public. It is prohibited because it lets a few people profit at the expense of everyone else.",
          ),
          p(
            "Fictional example: if rumours spread that Nimbus Technologies Ltd has won a large contract, SEBI's rules require the company to disclose material news in a timely and equal way, so that all investors learn it at the same time.",
          ),
          tool("MarketStructureDiagram", "See SEBI sitting above the exchanges and intermediaries it regulates."),
          warn(
            "SEBI's role is to protect the integrity and fairness of the market. It does not tell investors what to buy, and it does not guarantee that any investment will make money.",
          ),
        ],
        keyTakeaways: [
          "SEBI (Securities and Exchange Board of India) is India's securities-market regulator.",
          "It protects investors and regulates exchanges, brokers and other intermediaries.",
          "It prohibits practices like insider trading and market manipulation.",
          "Regulation supports fair markets; it does not eliminate risk or guarantee returns.",
        ],
        quiz: [
          q(
            "What is SEBI?",
            [
              "A stock exchange",
              "India's securities-market regulator",
              "A type of demat account",
              "A mutual fund",
            ],
            1,
            "SEBI — the Securities and Exchange Board of India — is the statutory regulator of India's securities market.",
          ),
          q(
            "Which of these is a SEBI responsibility?",
            [
              "Telling investors which shares to buy",
              "Regulating intermediaries and prohibiting insider trading",
              "Setting the daily price of every share",
              "Guaranteeing profits for retail investors",
            ],
            1,
            "SEBI sets and enforces rules for intermediaries and market conduct, including bans on insider trading. It does not pick investments or set prices.",
          ),
          q(
            "Why is insider trading prohibited?",
            [
              "It is too slow",
              "It lets a few people profit from non-public information at others' expense, undermining fairness",
              "It lowers tax revenue",
              "It is allowed, but discouraged",
            ],
            1,
            "Insider trading gives an unfair advantage to those with information everyone else lacks, which damages trust in the market — so it is banned.",
          ),
        ],
      },
      {
        slug: "lesson-2-the-plumbing",
        title: "The plumbing: depositories, brokers, clearing",
        summary: "Depositories, brokers and clearing corporations.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 9,
        interactive: "MarketStructureDiagram",
        blocks: [
          p(
            "Behind every trade is a small chain of institutions that move money and shares safely. Beginners rarely see them, but they are why buying a share does not require trusting the stranger on the other side.",
          ),
          steps([
            {
              title: "Broker",
              text: "Your regulated gateway to the exchange. You place orders through the broker.",
            },
            {
              title: "Exchange",
              text: "Matches your order with an opposing order and records the trade.",
            },
            {
              title: "Clearing corporation",
              text: "Confirms the trade, manages risk, and guarantees settlement between the two sides.",
            },
            {
              title: "Depositories",
              text: "NSDL and CDSL hold shares electronically and move them between accounts.",
            },
            {
              title: "Demat account",
              text: "Your own account where your shares are recorded in electronic form.",
            },
          ]),
          p(
            "A depository is an institution that holds securities electronically, much like a bank holds money. India has two main depositories: NSDL (National Securities Depository Limited) and CDSL (Central Depository Services Limited). Your shares are not a paper certificate; a record at a depository shows that you own them.",
          ),
          tbl(
            ["Institution", "What it does"],
            [
              ["Broker", "Lets you place trades on an exchange"],
              ["Exchange", "Matches orders and publishes prices"],
              ["Clearing corporation", "Confirms trades and guarantees settlement"],
              ["NSDL / CDSL", "Hold securities electronically as depositories"],
            ],
          ),
          info(
            "'Settlement' is the final step where payment moves one way and shares move the other. The clearing corporation stands in the middle so neither side has to trust the other.",
          ),
          p(
            "Fictional example: you buy 100 shares of GreenLeaf Foods Ltd. Your money leaves your bank account, the clearing corporation confirms the trade, and 100 shares appear in your demat account — a single connected process.",
          ),
          tool("MarketStructureDiagram", "Trace one trade through the broker, exchange, clearing and depository."),
          warn(
            "These institutions keep the market working, but they do not make investments safe. Shares can still fall in value. Their role is safe transfer of ownership, not protection from losses.",
          ),
        ],
        keyTakeaways: [
          "A broker is your regulated gateway to place trades on an exchange.",
          "The exchange matches orders; the clearing corporation confirms and guarantees settlement.",
          "NSDL and CDSL are India's two main depositories, holding shares electronically.",
          "Your demat account is where your shares are recorded as belonging to you.",
        ],
        quiz: [
          q(
            "What is a depository?",
            [
              "A broker that places your orders",
              "An institution that holds securities electronically, like NSDL and CDSL",
              "A government regulator",
              "A type of bank loan",
            ],
            1,
            "A depository holds securities electronically. India's two main depositories are NSDL and CDSL, and your shares are recorded there.",
          ),
          q(
            "What does the clearing corporation do?",
            [
              "Decides which shares to buy",
              "Confirms trades and guarantees settlement between the two sides",
              "Prints share certificates",
              "Sets the market's trading hours",
            ],
            1,
            "The clearing corporation confirms trades, manages risk, and stands in the middle so that settlement of money and shares happens reliably.",
          ),
          q(
            "In the fictional example, where do your 100 shares end up after settlement?",
            [
              "In your bank account",
              "In your demat account",
              "With the exchange permanently",
              "In a physical certificate",
            ],
            1,
            "After settlement, ownership is recorded electronically in your demat account. Your bank account handles the money side, not the shares.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 7 — Demat and trading accounts                                   */
  /* ======================================================================== */
  {
    slug: "chapter-7-accounts",
    title: "Demat and Trading Accounts",
    subtitle: "The accounts you need to buy shares",
    chapterOrder: 7,
    difficulty: "BEGINNER",
    description:
      "To buy and hold shares in India you generally need a trading account and a demat account, alongside your ordinary bank account.",
    lessons: [
      {
        slug: "lesson-1-your-three-accounts",
        title: "Your three accounts",
        summary: "Bank, trading and demat — what each one does.",
        difficulty: "BEGINNER",
        estimatedMinutes: 7,
        interactive: "AccountStructureDiagram",
        blocks: [
          p(
            "To buy and hold shares in India, you generally use more than one account. People often confuse them, so it helps to see what each one is for. There are three to know: a bank account, a trading account and a demat account.",
          ),
          tbl(
            ["Account", "What it holds", "What it is for"],
            [
              ["Bank account", "Money", "Storing your cash and moving money in and out"],
              ["Trading account", "No money or shares are 'stored' here", "Placing buy and sell orders through a broker"],
              ["Demat account", "Securities, in electronic form", "Holding the shares you own"],
            ],
          ),
          h("In plain words"),
          ul([
            "A bank account stores money — it is where your rupees live.",
            "A trading account is a doorway for placing trades — it reaches the exchange through your broker.",
            "A demat account is a locker for securities — it records the shares you own electronically.",
          ]),
          p(
            "Fictional example: you want to buy 50 shares of Nimbus Technologies Ltd. You keep money for the purchase in your bank account, you place the order using your trading account, and once the trade settles, the 50 shares are held for you in your demat account.",
          ),
          info(
            "'Demat' stands for 'dematerialised'. It simply means your shares exist as electronic records rather than paper certificates.",
          ),
          tool("AccountStructureDiagram", "See how money and shares move between the three accounts."),
          warn(
            "Opening accounts and completing KYC (identity verification) is a necessary step, but it is not an endorsement of any investment. Having a trading account does not mean you should trade frequently — that depends on your own plan and goals.",
          ),
        ],
        keyTakeaways: [
          "A bank account stores your money.",
          "A trading account is used to place buy and sell orders through a broker.",
          "A demat account holds your securities in electronic form.",
          "Demat means 'dematerialised' — shares as electronic records, not paper.",
        ],
        quiz: [
          q(
            "Which account is used to place buy and sell orders?",
            [
              "The bank account",
              "The trading account",
              "The demat account",
              "The savings account",
            ],
            1,
            "The trading account is the doorway for placing orders through a broker. Money usually sits in the bank account, and shares are held in the demat account.",
          ),
          q(
            "What does a demat account hold?",
            [
              "Your cash",
              "Your securities, in electronic form",
              "Your loan balance",
              "Your trading history only",
            ],
            1,
            "A demat account holds your shares and other securities electronically, analogous to how a bank holds your money.",
          ),
          q(
            "What does 'demat' mean?",
            [
              "Daily market timing",
              "Dematerialised — securities held as electronic records",
              "Debt management",
              "Direct market access",
            ],
            1,
            "'Demat' is short for dematerialised: shares are recorded electronically instead of as physical certificates.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 8 — IPO and the primary market                                   */
  /* ======================================================================== */
  {
    slug: "chapter-8-ipo",
    title: "IPO and Primary Market",
    subtitle: "How companies sell shares to the public for the first time",
    chapterOrder: 8,
    difficulty: "INTERMEDIATE",
    description:
      "An IPO is when a company offers its shares to the public for the first time. This is the primary market, where new shares are created and sold.",
    lessons: [
      {
        slug: "lesson-1-what-is-an-ipo",
        title: "What is an IPO?",
        summary: "A company's first public share sale.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 9,
        interactive: "IpoSimulator",
        blocks: [
          p(
            "An IPO — Initial Public Offering — is the first time a company offers its shares to the general public. Before an IPO, a company's shares are usually held by a small group: founders and early investors. After an IPO, anyone can buy them on an exchange.",
          ),
          p(
            "The money raised in an IPO goes to the company (for new shares it issues) and sometimes to existing owners who are selling part of their stake. This is the primary market, where shares are created and sold by the company itself.",
          ),
          h("How an IPO usually works"),
          anim(
            "IpoJourney",
            "Five stages, from deciding to go public to the shares trading on an exchange — and the money that reaches the company along the way.",
          ),
          steps([
            {
              title: "Decide to go public",
              text: "The company, with advisers, prepares to offer shares to the public.",
            },
            {
              title: "Set a price band",
              text: "A price range is announced; the final issue price is decided after seeing demand.",
            },
            {
              title: "The public applies",
              text: "Investors apply for shares during a set window, often through their broker or bank.",
            },
            {
              title: "Allotment",
              text: "If demand exceeds supply, shares are allotted, sometimes by a lottery-like process.",
            },
            {
              title: "Listing",
              text: "The shares begin trading on an exchange, where the market sets the price from then on.",
            },
          ]),
          fx("Money raised = Issue price × Number of shares offered"),
          info(
            "'Issue price' is the price at which the company sells its shares in the IPO. It is not the same as the price the shares trade at after listing — the market decides that separately.",
          ),
          p(
            "Fictional example: Sunrise Motors Ltd offers 1 crore shares at an issue price of ₹100 each. That would raise ₹100 crore before costs. Once listed, the shares trade at whatever buyers and sellers agree — which could be higher or lower than ₹100.",
          ),
          tool("IpoSimulator", "Step through an offering and watch how issue price and demand shape the outcome."),
          warn(
            "An IPO is a sale of shares, not a promise about the future. A new listing can rise or fall, and a popular offer is not evidence that it will be a good investment. This is education, not advice.",
          ),
        ],
        keyTakeaways: [
          "An IPO is a company's first sale of shares to the general public.",
          "IPO money is raised in the primary market, directly from the company.",
          "A price band is set, demand is gathered, shares are allotted, then the shares list and trade.",
          "The issue price is fixed by the offer; the market sets the price afterwards.",
        ],
        quiz: [
          q(
            "What does IPO stand for?",
            [
              "Indian Price Offer",
              "Initial Public Offering",
              "Index Price Option",
              "Immediate Purchase Order",
            ],
            1,
            "IPO stands for Initial Public Offering — the first time a company offers its shares to the public.",
          ),
          q(
            "Where does the money raised in a fresh IPO go?",
            [
              "To the exchange",
              "To the company (for new shares it issues)",
              "To other investors",
              "To SEBI",
            ],
            1,
            "New shares sold by the company bring money to the company itself. In some offerings, existing owners also sell part of their stake, in which case they receive that portion.",
          ),
          q(
            "After listing, what decides the share price?",
            [
              "The issue price is fixed forever",
              "The exchange sets it daily",
              "Buyers and sellers trading in the market",
              "The company's founder",
            ],
            2,
            "The issue price applies only to the offer. Once the shares list, buyers and sellers in the market determine the price.",
          ),
        ],
      },
      {
        slug: "lesson-2-primary-vs-secondary-market",
        title: "Primary vs secondary market",
        summary: "New shares vs shares traded between investors.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 8,
        interactive: "IpoSimulator",
        blocks: [
          p(
            "The market has two layers. In the primary market, a company issues new shares and receives the money. In the secondary market, investors trade those shares among themselves, and the company is not involved.",
          ),
          anim(
            "PrimaryVsSecondary",
            "The same share, two markets — and only one of them sends any money to the company.",
          ),
          tbl(
            ["", "Primary market", "Secondary market"],
            [
              ["Who sells?", "The company (or selling shareholders)", "An investor who already owns the shares"],
              ["Who receives the money?", "The company (or the selling shareholder)", "The selling investor"],
              ["Typical event", "IPO, FPO, rights issue", "Everyday trading on the NSE and BSE"],
            ],
          ),
          h("More ways to raise money in the primary market"),
          ul([
            "IPO — the first public offer of shares by a company.",
            "FPO (Follow-on Public Offer) — a further public offer by a company that is already listed.",
            "Rights issue — an offer of new shares to existing shareholders, usually at a set ratio and price.",
          ]),
          info(
            "'FPO' simply means a company that is already public issues more shares. A 'rights issue' gives existing owners the first chance to buy new shares, so they can avoid being diluted.",
          ),
          p(
            "Fictional example: after its IPO, Sunrise Motors Ltd later needs more money and makes a follow-on public offer. Both the IPO and the FPO happen in the primary market. Trading of its shares the next day on the NSE or BSE happens in the secondary market.",
          ),
          tool("IpoSimulator", "Compare raising money in the primary market with trading in the secondary market."),
          warn(
            "A company raising money does not tell you whether its shares are good value. That judgement depends on the business, the price and your own goals — always educational context here, never a recommendation.",
          ),
        ],
        keyTakeaways: [
          "In the primary market, companies issue new shares and receive the money.",
          "In the secondary market, investors trade existing shares among themselves.",
          "An FPO is a further public offer by an already-listed company.",
          "A rights issue offers new shares to existing shareholders, often to avoid dilution.",
        ],
        quiz: [
          q(
            "In the secondary market, from whom do you buy shares?",
            [
              "Directly from the company",
              "From another investor who already owns them",
              "From SEBI",
              "From the exchange's own account",
            ],
            1,
            "In the secondary market, investors trade existing shares among themselves; the company is not involved and receives none of that money.",
          ),
          q(
            "What is an FPO?",
            [
              "A company's very first share sale",
              "A further public offer by a company that is already listed",
              "A fee paid to brokers",
              "A type of bank deposit",
            ],
            1,
            "A Follow-on Public Offer (FPO) is another public offering of shares by a company that is already listed on an exchange.",
          ),
          q(
            "Why might existing shareholders value a rights issue?",
            [
              "It guarantees a profit",
              "It lets them buy new shares first, helping them avoid being diluted",
              "It reduces the number of shares",
              "It is free of any price",
            ],
            1,
            "A rights issue offers new shares to existing owners first. By buying their share of the new issue, they can keep their ownership proportion from shrinking.",
          ),
        ],
      },
    ],
  },

  /* ======================================================================== */
  /* CHAPTER 9 — How stock prices move                                        */
  /* ======================================================================== */
  {
    slug: "chapter-9-price-movement",
    title: "How Stock Prices Move",
    subtitle: "Supply, demand and everything that shifts them",
    chapterOrder: 9,
    difficulty: "INTERMEDIATE",
    description:
      "Prices change when buyers and sellers disagree about value. Supply, demand, expectations, news and the wider economy all play a part.",
    lessons: [
      {
        slug: "lesson-1-supply-and-demand",
        title: "Supply and demand",
        summary: "Why prices rise and fall in an auction.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 8,
        interactive: "SupplyDemandSimulator",
        blocks: [
          p(
            "A share price is simply the price at which the most recent trade happened. It is not calculated by a formula — it emerges from an ongoing auction between buyers who want to own the share and sellers who want to give it up.",
          ),
          p(
            "When more people want to buy than sell at the current price, buyers must offer more to win the share, so the price tends to rise. When more want to sell than buy, sellers must accept less, so the price tends to fall. This is supply and demand.",
          ),
          h("A tug of war"),
          ul([
            "Buyers compete on price to attract sellers — that pushes prices up.",
            "Sellers compete on price to attract buyers — that pushes prices down.",
            "The current price is where the two sides last agreed.",
          ]),
          info(
            "'Demand' means how many shares buyers want at a given price. 'Supply' means how many sellers are willing to part with at that price. As the price moves, both quantities change.",
          ),
          p(
            "Fictional example: if positive news makes many investors want GreenLeaf Foods Ltd at once, but few owners want to sell, the eager buyers bid higher and the price rises. If owners rush to sell while buyers hold back, the price falls. The company itself did not change — only the balance of buyers and sellers did.",
          ),
          tool("SupplyDemandSimulator", "Shift the balance of buyers and sellers and watch the price respond."),
          warn(
            "This shows the mechanism, not a forecast. Predicting tomorrow's price is not something a simulator — or this course — can do. Prices overshoot and reverse for reasons nobody fully anticipates.",
            "No predictions",
          ),
        ],
        keyTakeaways: [
          "A share price is the price of the most recent trade, set by buyers and sellers.",
          "More eager buyers than sellers tends to push prices up; the reverse pushes them down.",
          "The current price is where supply and demand last agreed.",
          "A simulation explains the mechanism; it does not predict where prices will go.",
        ],
        quiz: [
          q(
            "What is a share price?",
            [
              "A value calculated by the company each morning",
              "The price at which the most recent trade took place",
              "A number fixed by SEBI",
              "The average of all past prices",
            ],
            1,
            "A share price is the price of the latest trade agreed between a buyer and a seller. It updates as new trades happen.",
          ),
          q(
            "If many buyers want a share but few owners are willing to sell, what tends to happen?",
            [
              "The price falls",
              "The price rises as buyers offer more",
              "The price stays exactly the same",
              "Trading stops forever",
            ],
            1,
            "When demand outpaces supply at the current price, buyers must offer more to win the shares, which pushes the price up.",
          ),
          q(
            "Does a supply-and-demand simulation tell you where a price will go next?",
            [
              "Yes, it predicts future prices accurately",
              "No — it shows the mechanism, not a forecast",
              "Yes, if you run it long enough",
              "Only for large companies",
            ],
            1,
            "The simulator teaches how prices respond to buyers and sellers. It is a teaching device, not a forecasting tool — real prices depend on countless unpredictable factors.",
          ),
        ],
      },
      {
        slug: "lesson-2-what-else-moves-prices",
        title: "What else moves prices?",
        summary: "Expectations, earnings, news, interest rates and the economy.",
        difficulty: "INTERMEDIATE",
        estimatedMinutes: 9,
        interactive: "SupplyDemandSimulator",
        blocks: [
          p(
            "Supply and demand explains how prices change, but not why buyers and sellers change their minds. Several forces shift how people feel about a company and its future.",
          ),
          h("Five forces to know"),
          anim(
            "WhatMovesPrices",
            "Expectations, earnings, news, interest rates and the economy — and the one door they all come through.",
          ),
          p(
            "Expectations — Prices reflect what investors expect a company to earn in the future, not just what it earned last year. If those expectations change, prices move.",
          ),
          p(
            "Earnings — When a company reports its financial results, investors compare them with what they expected. Better-than-expected results often lift sentiment; worse-than-expected results often hurt it.",
          ),
          p(
            "News — A new product, a big contract, a lawsuit, a change in leadership or a scandal can all change how investors value the business.",
          ),
          p(
            "Interest rates — When interest rates rise, borrowing costs more and alternative investments offer better returns, which can make shares less attractive. When rates fall, the reverse can happen.",
          ),
          p(
            "The economy — Growth, inflation, jobs and government policy shape how much money people have and how confident they feel, which affects the whole market, not just one company.",
          ),
          tbl(
            ["Force", "Why it matters"],
            [
              ["Expectations", "Prices reflect the future, not the past"],
              ["Earnings", "Actual results are compared with expectations"],
              ["News", "New information changes how the business is valued"],
              ["Interest rates", "They change borrowing costs and the appeal of alternatives"],
              ["The economy", "It affects overall demand, profits and confidence"],
            ],
          ),
          info(
            "These forces often work together. A strong economy, low interest rates and rising expectations can all lift prices at once — and the reverse can pull them down together.",
          ),
          p(
            "None of this makes prices predictable. The market is where millions of opinions meet, and any single piece of news can be read in different ways.",
          ),
          tool("SupplyDemandSimulator", "See how shifting expectations and news move the balance of buyers and sellers."),
          warn(
            "Understanding what moves prices is not the same as predicting them. This course never predicts prices or suggests what to buy or sell.",
            "Educational only",
          ),
        ],
        keyTakeaways: [
          "Prices reflect expectations about the future, not just past results.",
          "Earnings compared with expectations can move a share sharply.",
          "News, interest rates and the wider economy all influence prices.",
          "These forces interact, which is one reason prices are hard to predict.",
        ],
        quiz: [
          q(
            "Why can a share fall even if the company's profits grew?",
            [
              "Profits are irrelevant to prices",
              "Investors may have expected even more, so the result fell short of expectations",
              "The exchange lowers prices randomly",
              "Falling profits always follow rising ones",
            ],
            1,
            "Prices already reflect expectations. If results are good but less good than investors expected, the price can still fall.",
          ),
          q(
            "How do rising interest rates tend to affect shares?",
            [
              "They always push prices up",
              "They can make shares less attractive, because borrowing costs more and alternatives pay better",
              "They have no effect at all",
              "They only affect banks",
            ],
            1,
            "Higher rates raise borrowing costs and improve the returns on alternatives like deposits, which can reduce the appeal of shares.",
          ),
          q(
            "What is the best summary of why prices are hard to predict?",
            [
              "Markets are closed most days",
              "Many forces interact, and millions of opinions can interpret the same news differently",
              "Prices never change",
              "Only experts are allowed to trade",
            ],
            1,
            "Expectations, earnings, news, rates and the economy all interact, and different investors read the same information differently — so prices are genuinely hard to forecast.",
          ),
        ],
      },
    ],
  },
];
