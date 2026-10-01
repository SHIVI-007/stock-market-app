# Video prompts — MarketLearn explainers

One prompt per lesson, written to be pasted into a text-to-video model. They cover
the sixteen lessons that already have a concept explainer in the app
(`components/animations/`), because those are the ones whose visual sequence,
figures and wording have already been worked out and checked against the lesson
text. For any other lesson there is no agreed visual yet, so a prompt would be
guesswork.

---

## Read this before generating anything

1. **Do not let the model render numbers.** Generative video models are worst at
   exactly what this course is made of: exact typography. `10,00,000`, `6.67%`,
   `₹13.3 lakh` will come back as `10,00,00`, `6.67`, or `₹13.3` — and a wrong
   figure in a fundamentals course is worse than no video at all. Every prompt
   below therefore asks for **no text in the footage**, and lists the exact
   strings to composite in an editor afterwards (CapCut, Descript, DaVinci,
   After Effects — anything with a text layer).

2. **Do not let the model write the narration either.** Same reason, one step
   worse: it will happily produce "this could be a great investment". Record or
   TTS the scripts below verbatim. They are written to match the course rules.

3. **Keep the style block identical across all sixteen.** Generative models have
   no memory of your last prompt; paste the style block into every one, or set it
   as the project's style reference. This is the only thing that will make
   sixteen separate renders look like one series.

4. **Treat every figure as a number on a checklist.** Before publishing, compare
   each on-screen number against the list for that lesson. They are internally
   consistent and match the app's lesson text.

5. **Nothing here is advice, and the videos must not look like it.** No
   recommendations, no prediction, no upward-trending arrow implying future
   growth. The numbers marked *illustrative* are exactly that.

---

## Shared style block

> Paste this at the top of every prompt.

Flat 2D motion graphics, 16:9, 1080p. Off-white background. A deep teal accent
colour for the primary element, warm mid-grey for secondary elements, soft amber
for cautions, soft green for positive outcomes. Rounded-rectangle cards with
hairline borders and very soft shadows. Generous whitespace, one clear focal
element on screen at a time. Motion is calm and deliberate: 400–700 ms ease-out
transitions, elements fade in and slide 8–16 px, no bounce, no spin, no
zoom-punch. Keep the lower third of the frame visually quiet so a caption can
sit there. Hold the final frame for two seconds.

Do not render any text, letters, numerals or currency symbols in the footage.
Leave clean empty space where labels and numbers will be composited afterwards.

---

## Shared constraints

> Append to every prompt.

- No investment advice, no recommendations, no "best" anything.
- No price predictions, forecasts, targets, or rising charts that imply future
  growth.
- No real company names, logos, tickers, or real people. Use only the fictional
  names given in the prompt.
- Do not invent numbers. Use only the figures listed for that video.
- No mascots, no characters, no faces, no emoji, no confetti, no gimmicks.
- Nothing may imply that share prices always rise, or that investing is safe.
- No 3D, no photorealism, no live action, no stock footage of trading floors.

---

## The sixteen videos

### 01 · Chapter 1, Lesson 1 — What is Money?
**Look:** `MoneyJourney` · **Length:** 40 s

**Visual prompt**

> A single rounded card appears centre-frame and settles, labelled with the
> number 50,000. A hairline drops from beneath it and splits into three identical
> cards side by side, which rise into place one after another. The left card
> dims to about 55% opacity and goes flat, while the middle and right cards
> brighten. Then the frame clears and two stacked rows slide in — a green row and
> a red row — with a small label between them, and a wide total card slides up
> from below to sit under them.

**Narration script**

> Most money reaches you as income — here, one month of salary, ₹50,000. Every
> rupee then goes down one of three paths: spent on things you use today, set
> aside as savings, or put to work as an investment. Expenses buy you something
> now and are then gone. Savings stay available but grow slowly. Investments are
> the ones you put at risk. And what you own, minus what you owe, is your net
> worth.

**On-screen text**

| Moment | Text |
|---|---|
| 1 | `INCOME` / `₹50,000` |
| 2 | `Expenses ₹30,000` · `Savings ₹12,000` · `Investments ₹8,000` |
| 3 | `Expenses` → `Spent — gone` |
| 4 | `Savings` → `Safe and available` · `Investments` → `At risk, for growth` |
| 5 | `Assets ₹5,00,000` · `Liabilities ₹2,00,000` · `NET WORTH ₹3,00,000` |

---

### 02 · Chapter 1, Lesson 2 — Saving vs Investing
**Look:** `CompoundingOverTime` · **Length:** 40 s

**Visual prompt**

> Five bar columns grow up from a baseline, one at a time, left to right, each
> taller than the last. Every column is divided near its base into a solid lower
> section and a lighter upper section, and the upper section grows
> disproportionately as the columns progress. A thin ring highlights each column
> as it appears. A legend of two small squares sits underneath.

**Narration script**

> Suppose ₹1,00,000 earns 10% a year. After one year it is ₹1,10,000 — so far,
> simple interest. After two years it is ₹1,21,000: the second year earned
> ₹11,000, not ₹10,000, because the first year's gain was earning too. That is
> compounding. By ten years the returns, ₹1,59,000, are larger than the money you
> started with. Time, not timing, is what does this — and no real market
> delivers 10% every year.

**On-screen text**

| Moment | Text |
|---|---|
| 1 | `₹1,00,000` |
| 2 | `1 year ₹1,10,000` |
| 3 | `2 years ₹1,21,000` |
| 4 | `5 years ₹1,61,000` |
| 5 | `10 years ₹2,59,000` |
| Legend | `Your original ₹1,00,000` · `Returns earned on top` |
| Always on screen | `Illustrative — 10% a year, which real markets do not deliver` |

---

### 03 · Chapter 1, Lesson 3 — What is an Investment?
**Look:** `OwnershipOrLending` · **Length:** 40 s

**Visual prompt**

> Two tall panels fade in side by side, the left one tinted teal and the right
> tinted green. Small rounded chips drop into the left panel one at a time, each
> landing with a soft settle. Chips then drop into the right panel in the same
> way. Two of the chips in each panel have dashed outlines instead of solid ones.
> Finally a wide, low panel slides up beneath both, and two more chips drop into
> it. Each panel has a faint sub-label at the top.

**Narration script**

> Almost every investment answers one question: are you owning something, or
> lending to someone? A share of a company is ownership — you share in the
> profit, and in the loss. A bond or a fixed deposit is a loan, where interest is
> promised but the upside is not yours. A mutual fund or an ETF is not a third
> kind of asset; it is a container that holds others, and takes its character
> from what is inside. Gold and property fit neither: they pay no interest and
> share in no profit.

**On-screen text**

| Moment | Text |
|---|---|
| 1 | `Ownership` / `EQUITY` / `Return: profit and price growth` |
| 2 | `Lending` / `DEBT` / `Return: interest` |
| 3 | Left: `Shares of a company` · Right: `Bonds`, `Fixed deposits` |
| 4 | `Equity mutual funds & ETFs` (dashed) · `Debt mutual funds` (dashed) |
| 5 | `NEITHER — REAL ASSETS` / `Gold`, `Real estate` |

---

### 04 · Chapter 2, Lesson 1 — What is a company?
**Look:** `CompanyJourney` · **Length:** 40 s

**Visual prompt**

> Five wide bands fade in from the top of the frame downwards, one at a time,
> each connected by a short vertical hairline. As each new band arrives it is
> highlighted in teal, and the one above it settles back to a neutral grey. The
> final band settles into a soft green and holds.

**Narration script**

> A company is a legal entity, separate from the people who own it — it can sign
> contracts, own property and be sued. That separation is why its owners can only
> lose what they invested, not their own assets. A company starts as an idea, and
> becomes a business. Growth needs more money than the business generates, so it
> takes on investors, and in exchange it gives them a stake. That stake is
> divided into shares, and shares can be bought and sold.

**On-screen text**

| Moment | Text |
|---|---|
| 1 | `Idea — a problem worth solving` |
| 2 | `Business — a legal entity, separate from its owners` |
| 3 | `Capital needed — more than the business generates` |
| 4 | `Investors — money in exchange for a stake` |
| 5 | `Ownership — divided into shares` |

---

### 05 · Chapter 2, Lesson 2 — How companies make money
**Look:** `BusinessLoop` · **Length:** 35 s

**Visual prompt**

> Three cards appear across the frame, one after another, left to right: a teal
> one, an amber one, and a green one. Each card is centred in the gap left by the
> others. Once all three are up, a thin circular arrow sweeps around behind them
> from the green card back to the teal one, closing the loop, and a small
> circular-arrow glyph fades in below the frame.

**Narration script**

> Every business is ultimately a loop: sell something to customers for more than
> it costs you to provide it. Customers pay, and that is revenue — the top line,
> before anything is taken out. Providing the product costs money: materials,
> staff, rent, marketing. Those costs were necessary to earn the revenue; they
> are not optional extras. What remains is profit, which can go back into the
> business or out to the people who own it. Then the loop begins again.

**On-screen text**

| Moment | Text |
|---|---|
| 1 | `Customers pay` / `Revenue` |
| 2 | `Cost of providing` / `Expenses` |
| 3 | `What is left` / `Profit` |
| 4 | `↻ and the loop begins again` |

---

### 06 · Chapter 2, Lesson 3 — Revenue
**Look:** `WhenRevenueLands` · **Length:** 40 s

**Visual prompt**

> A wide card appears at the top of the frame. Beneath it a vertical timeline
> draws downwards: a dot appears at the top, a label settles beside it, then a
> short amber segment stretches down from that dot, and a second dot appears at
> the bottom of the amber segment with its own label. The two dots are joined by
> a continuous thin line. A caption line fades in at the very bottom, centred.

**Narration script**

> Revenue is the top line — the total earned from selling goods or services in a
> period, before any cost is subtracted. Here is a ₹10 lakh order. Companies use
> accrual accounting, so revenue is recorded when the goods are delivered, not
> when the customer pays. Deliver the order today and ₹10 lakh of revenue is
> recorded today. The customer pays ninety days later, and only then does the
> cash arrive. For three months the company has the revenue but not the cash —
> and that unpaid amount has a name: a receivable.

**On-screen text**

| Moment | Text |
|---|---|
| 1 | `ORDER VALUE` / `₹10,00,000` |
| 2 | `Day 0 — Goods delivered` / `₹10,00,000 of revenue recorded today` |
| 3 | `90 days pass` |
| 4 | `Day 90 — Customer pays` / `₹10,00,000 of cash finally arrives` |
| 5 | `For three months the company has the revenue but not the cash — a receivable` |

---

### 07 · Chapter 2, Lesson 4 — Expenses
**Look:** `HowCostsBehave` · **Length:** 40 s

**Visual prompt**

> Two panels side by side. In each panel a single bar stands upright from a
> baseline. Both bars begin at the same height. On cue both bars drop at the same
> moment, but the right-hand bar falls much further than the left-hand one, and a
> small percentage tag fades in under each. The left bar is green, the right bar
> is red. Both panels carry identical sub-text.

**Narration script**

> Two businesses, identical today: the same sales, the same ₹20 lakh of profit.
> Now sales fall 10%, and nothing else changes. The first business buys most of
> what it sells, so its costs fall with its sales — its profit slips only a
> little, to ₹18 lakh. The second carries rent, plant and salaried staff, and
> none of that shrinks when sales do. The same 10% fall in sales takes a far
> bigger bite out of its profit, down to ₹12 lakh. That is operating leverage.

**On-screen text**

| Moment | Text |
|---|---|
| 1 | `Mostly variable costs` / `buys what it sells` · `High fixed costs` / `rent, plant, salaries` |
| 2 | `₹20 lakh profit` on both bars |
| 3 | Left: `₹18 lakh profit` / `−10%` |
| 4 | Right: `₹12 lakh profit` / `−40%` |
| Footer | `Revenue ₹100 lakh · profit ₹20 lakh before the fall` |

---

### 08 · Chapter 2, Lesson 5 — Profit
**Look:** `ProfitLayers` · **Length:** 45 s

**Visual prompt**

> A single tall vertical bar stands on the left of the frame, divided into five
> stacked horizontal bands. A list of five rows sits to the right of the bar. The
> bar and its list are revealed together, one band at a time from the bottom
> upwards, each band briefly brightening as it appears. By the end the whole bar
> is visible and the last two bottom bands are the brightest.

**Narration script**

> Start with ₹1,000 crore of revenue — nothing taken out yet. Subtract the cost
> of what was sold, ₹600 crore, and you have gross profit. Subtract operating
> expenses, ₹250 crore for salaries, marketing and rent, and you have EBITDA.
> Subtract depreciation, ₹30 crore, and you have EBIT — operating profit, the
> number used to judge the business itself. Finally subtract interest and tax.
> What survives is net profit, ₹75 crore, the bottom line. A company can look
> healthy at one level and unhealthy at another.

**On-screen text**

| Moment | Text |
|---|---|
| Header | `Revenue ₹1,000 crore` |
| 1 | `Cost of goods ₹600 crore` |
| 2 | `Operating expenses ₹250 crore` |
| 3 | `Depreciation ₹30 crore` |
| 4 | `Interest & tax ₹45 crore` |
| 5 | `Net profit ₹75 crore` |
| Footer | `Each layer is what the one above it leaves behind` |

---

### 09 · Chapter 2, Lesson 6 — Why companies need capital
**Look:** `WhyCapital` · **Length:** 45 s

**Visual prompt**

> Two vertical bars rise side by side. The left one stops short and is solid
> green. The right one is taller: its lower portion matches the height of the
> left bar exactly and is the same green, and a separate amber block sits on top
> of it, representing the extra. Then both bars clear and two equal panels slide
> in side by side — one warm-amber tinted, one teal-tinted — with a short list of
> lines in each.

**Narration script**

> A profitable business can still run short of cash: it may pay suppliers today
> while customers pay in ninety days, or want to build a plant that takes years
> to repay. Here it generates ₹100 crore but needs ₹180 crore. That ₹80 crore gap
> is what raising capital means. There are two ways to close it. Borrow it from
> lenders, who take no ownership but must be repaid with interest whatever
> happens. Or sell a share of the business to new owners, who are never repaid
> and who share in the profits and the losses.

**On-screen text**

| Moment | Text |
|---|---|
| 1 | `₹100 cr` / `cash it generates` |
| 2 | `₹180 cr` / `cash it needs` |
| Footer | `the amber slice — ₹80 crore — is the gap capital has to fill` |
| 3 | `Debt` / `Borrowed from a lender` · `Repaid, with interest` · `No ownership given up` |
| 4 | `Equity` / `Money from shareholders` · `Never repaid` · `Ownership shared permanently` |

---

### 10 · Chapter 3, Lesson 1 — What is ownership?
**Look:** `OwnershipSlices` · **Length:** 45 s

**Visual prompt**

> A single wide horizontal bar appears centre-frame, then thin vertical lines
> cut it into twenty equal sections, like a loaf being sliced. One single section
> near the left becomes solid teal while the remaining nineteen stay pale grey.
> Then the entire bar brightens as a whole, without any of the sections changing
> width, and two small figures above it update as it brightens.

**Narration script**

> A company worth ₹10 crore, divided into 10,00,000 equal shares. Each share is
> the company's value divided by the number of shares: ₹100. Own 50,000 of them
> and you own 5% of the company, worth ₹50 lakh. Now suppose the company becomes
> worth ₹20 crore. Each share is ₹200, and your 5% is worth ₹1 crore. But look at
> the bar: the shaded slice has not moved. Ownership is a proportion — the price
> only tells you what that proportion is worth.

**On-screen text**

| Moment | Text |
|---|---|
| 1 | `COMPANY VALUE ₹10 crore` · `PRICE PER SHARE ₹100` |
| 2 | `10,00,000 equal shares` |
| 3 | `YOUR OWNERSHIP 5%` / `Your 50,000 shares` · `The rest of the company` |
| 4 | `YOUR SLICE IS WORTH ₹50 lakh` |
| 5 | `COMPANY VALUE ₹20 crore` · `PRICE PER SHARE ₹200` · `YOUR SLICE IS WORTH ₹1 crore` |

---

### 11 · Chapter 3, Lesson 2 — The effect of issuing more shares
**Look:** `DilutionSlices` · **Length:** 45 s

**Visual prompt**

> A wide horizontal bar divided into ten equal sections, the leftmost one solid
> teal. Five additional amber sections then grow into the right-hand end of the
> bar while every existing section narrows smoothly to make room — the bar's
> overall width does not change. The teal section is now visibly thinner. Two
> small figures below the bar then update, and a final caption line fades in.

**Narration script**

> The company has 1,00,000 shares and you own 10,000 of them — 10% of the
> business. Now it issues 50,000 new shares to raise ₹50 lakh. Shares outstanding
> rise to 1,50,000. You still own exactly 10,000 shares, but they are now 6.67%
> of the company: your slice is thinner because the whole is cut into more
> pieces. That is dilution. Put that ₹50 lakh to work and the company is worth
> ₹1.5 crore — at ₹100 a share, your holding is still worth ₹10 lakh. The
> percentage fell; the value did not. If the capital earns more than it cost, the
> smaller slice can even be worth more.

**On-screen text**

| Moment | Text |
|---|---|
| 1 | `SHARES OUT 1,00,000` · `YOUR SHARES 10,000` · `YOUR OWNERSHIP 10%` |
| 2 | `SHARES OUT 1,50,000` · `YOUR OWNERSHIP 6.67%` |
| Legend | `Your 10,000 shares` · `Other owners` · `Newly issued shares` |
| 3 | `COMPANY VALUE ₹1.5 crore` · `VALUE OF YOUR HOLDING ₹10 lakh` |
| 4 | `COMPANY VALUE ₹2 crore` · `VALUE OF YOUR HOLDING ₹13.3 lakh` |
| 4, small print | `Illustrative — only if the ₹50 lakh raised earns more than it cost` |

---

### 12 · Chapter 4, Lesson 1 — What is a stock market?
**Look:** `WhyMarketsExist` · **Length:** 40 s

**Visual prompt**

> Two labelled columns. The left column holds one card; the right column is
> empty. A wide flat strip sits below them. Then three cards appear in the right
> column, one after another, and the strip below changes colour. A short row of
> four small pill shapes fades in beneath the strip, appearing one at a time in
> pairs. The right-hand cards and the strip use teal and then green as the scene
> progresses.

**Narration script**

> An owner wants cash and has shares to sell — but there is no obvious place to
> look for a buyer. The single buyer they find knows they are the only option, so
> the owner waits, and takes what is offered. A stock exchange changes that. It
> brings many buyers and sellers together under one set of rules, so the same
> owner has an audience instead of one counterparty. A match happens in seconds —
> that is liquidity. And with many competing bids and offers, one visible price
> emerges: price discovery. The market records the price buyers and sellers
> agreed on. It does not declare that price correct.

**On-screen text**

| Moment | Text |
|---|---|
| 1 | Columns `SELLERS` / `BUYERS`; card `Nimbus owner — wants cash for their shares` |
| 2 | Strip `No buyer to be found — the owner is on their own` |
| 3 | Cards `Investor A — wants to buy`, `Investor B — wants to buy`; strip `Buyers and sellers are now in one place` |
| 4 | Strip `Matched: 100 shares change hands in seconds`; pills `Shared rules`, `Access to capital`, `Liquidity` |
| 5 | Strip `Traded at ₹248 — one visible price`; pill `Price discovery` |

---

### 13 · Chapter 4, Lesson 2 — Buyers, sellers and brokers
**Look:** `OrderJourney` · **Length:** 45 s

**Visual prompt**

> Two cards sit side by side at the top. Every stage below them is a full-width
> card, and the two top cards are joined into the full width by short vertical
> hairlines that merge, so the two lanes visibly become one. Stage by stage a new
> card drops in and brightens, while the card above it settles back to neutral.
> The second-to-last card is green; the last card is green and holds.

**Narration script**

> You want 100 shares of GreenLeaf Foods Ltd. Another investor wants to sell 100
> shares. You never contact each other — the market is what puts the two
> together. You place the order in your broker's app; you cannot reach the
> exchange directly, because the broker is your regulated gateway. The broker
> checks that you have the funds, and passes the order on. The exchange matches
> your buy order against their sell order at a price you both accept — 100 shares
> at ₹248. Then settlement moves the money one way and the shares the other,
> usually completing the next working day.

**On-screen text**

| Moment | Text |
|---|---|
| 1 | `You — buy 100 shares` · `Another investor — sell 100 shares` |
| 2 | `Your broker — checks your funds` · `Their broker — checks the shares` |
| 3 | `The exchange — matches a buy with a sell` |
| 4 | `Trade: 100 shares at ₹248` / `the matched price is reported to everyone` |
| 5 | `Settlement — money one way, shares the other, usually the next working day` |

---

### 14 · Chapter 8, Lesson 1 — What is an IPO?
**Look:** `IpoJourney` · **Length:** 45 s

**Visual prompt**

> Five wide bands stack down the frame, joined by short vertical hairlines, each
> one brightening as it arrives while the band above settles back to neutral.
> When the fourth band arrives, two small figures appear side by side below the
> stack, and a caption line fades in under them. The fifth band settles into a
> soft green and holds.

**Narration script**

> An IPO is the first time a company offers its shares to the general public.
> Until then they are held by founders and early investors. The company prepares
> the offer with advisers and announces a price band rather than a single price.
> The public applies during a set window. If demand exceeds the shares on offer,
> the issue is allotted — investors may receive fewer shares than they applied
> for, sometimes decided by a lottery-like process. Then the shares list and
> begin trading. One crore shares at ₹100 each raises ₹100 crore, and that money
> goes to the company. From listing onwards, the market sets the price — which
> can be higher or lower than the issue price.

**On-screen text**

| Moment | Text |
|---|---|
| 1 | `The company decides to go public` |
| 2 | `A price band is announced` |
| 3 | `The public applies` |
| 4 | `Allotment` · figures `ISSUE PRICE ₹100`, `MONEY RAISED ₹100 crore` |
| 5 | `Listing` · caption `1 crore shares sold at ₹100 each — the money goes to the company` |

---

### 15 · Chapter 8, Lesson 2 — Primary vs secondary market
**Look:** `PrimaryVsSecondary` · **Length:** 40 s

**Visual prompt**

> Two wide panels, one above the other. Each panel holds two boxes with a short
> arrow between them. In the top panel the arrow lights up and the right-hand box
> glows green. Then in the bottom panel the arrow lights up and its right-hand
> box glows green. Finally a small caption line fades in beneath the bottom
> panel. No barbed or downward arrows anywhere.

**Narration script**

> A share can change hands in two very different ways. In the primary market the
> company creates new shares and sells them — in an IPO, a follow-on offer or a
> rights issue — and the money goes to the company. In the secondary market, when
> you buy on an exchange, you are buying from another investor. Nothing is
> created: the same shares simply change hands, and the money goes to the
> investor who sold. The company is not part of that trade and receives nothing.
> So the primary market funds the company, and the secondary market gives owners
> a way to sell and a price they can see every day.

**On-screen text**

| Moment | Text |
|---|---|
| 1 | `Primary market` / `NEW SHARES` · `Investors — pay for new shares` → `The company — keeps the money` |
| 2 | `Secondary market` / `SHARES ALREADY OWNED` · `Investor B — buys the shares` → `Investor A — sells, and is paid` |
| 3 | `Sunrise Motors Ltd is not part of this trade and receives nothing — the seller keeps the money.` |
| 4 | `The primary market funds the company. The secondary market gives owners liquidity.` |

---

### 16 · Chapter 9, Lesson 2 — What else moves prices?
**Look:** `WhatMovesPrices` · **Length:** 50 s

**Visual prompt**

> Five wide bands stack down the frame. They appear one at a time, each
> brightening briefly as it arrives and then settling to neutral while the
> earlier ones stay visible. When all five are present, a short vertical hairline
> drops from beneath the stack to a single wide card, which fades up and holds in
> teal.

**Narration script**

> Supply and demand explains how prices change, but not why buyers and sellers
> change their minds. Five things do. Expectations — a price reflects what
> investors expect a company to earn, not only what it earned last year. Earnings
> — results are compared against what was expected, and a good result that is
> worse than expected can still move the price. News. Interest rates — higher
> rates make borrowing dearer and alternatives more attractive. And the economy.
> None of these moves a price directly. Each one works by changing how many
> people want to buy and how many want to sell — and that balance is the price.

**On-screen text**

| Moment | Text |
|---|---|
| 1 | `Expectations — prices reflect what investors expect a company to earn` |
| 2 | `Earnings — reported results are measured against what was expected` |
| 3 | `News — a product, a contract, a lawsuit or a change of leadership` |
| 4 | `Interest rates — borrowing costs rise, and deposits pay more` |
| 5 | `The economy — growth, inflation, jobs and government policy` |
| 6 | `The balance of buyers and sellers` / `every force above arrives here — and that balance is the price` |

---

## Before you publish any of these

- [ ] Every number on screen matches the table for that video, digit for digit.
- [ ] No narration or visual suggests buying, selling, or that a price will rise.
- [ ] Anything marked *illustrative* carries its label on screen.
- [ ] No real company, logo, ticker or person appears.
- [ ] The style block was used, so the video matches the other fifteen.
- [ ] Captions/subtitles exist — these will be watched with the sound off.
- [ ] If it goes in the app: no autoplay, and the interactive explainer is served
      instead when the visitor prefers reduced motion.
