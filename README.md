# MarketLearn — Stock Market Fundamentals

An interactive course that takes an absolute beginner from *"what is money?"* to
*"I understand a company's financial statements and can form my own view."*

It is built like an interactive textbook: **every important concept has a slider,
a simulation, a calculator, a diagram or a quiz** — not just a paragraph of text.

> **Educational Use Only.** This application is designed to teach stock-market
> concepts and fundamental analysis. Examples and simulations may use hypothetical
> data. Nothing here constitutes investment, financial, tax, or legal advice. It
> contains no buy/sell recommendations, price targets, predictions, or return
> guarantees.

---

## Contents

- [What is in the app](#what-is-in-the-app)
- [Tech stack](#tech-stack)
- [Running it locally](#running-it-locally)
- [Available scripts](#available-scripts)
- [Database & Prisma](#database--prisma)
- [Accounts and progress sync](#accounts-and-progress-sync)
- [Administration](#administration)
- [API routes](#api-routes)
- [Docker](#docker)
- [Project structure](#project-structure)
- [How progress is stored](#how-progress-is-stored)

---

## What is in the app

| Area | What you get |
| --- | --- |
| **Curriculum** | 35 chapters, ~70 lessons, from money and companies through to ratios, valuation, working capital and a case study |
| **Interactives** | ~37 components: ownership & dilution simulator, order-book simulator, supply/demand pressure, IPO simulator, income-statement builder, balance-sheet builder (with a balance check), cash-flow explorer, corporate-action simulator and more |
| **Calculators** | Market cap, EPS, P/E, P/B, ROE, ROCE, debt/equity, margins, CAGR, dividend yield, EV, EV/EBITDA — all live and themed |
| **Quizzes** | Every lesson ends with a quiz where each answer comes with an explanation |
| **Progress** | Lesson completion, XP, streak, quiz average, per-chapter progress and 13 learning achievements |
| **Glossary** | A searchable glossary of ~70 terms with formulas and worked examples |
| **Accounts** | Optional email sign-in. Your lessons, quiz scores, streak and theme sync to your email across devices |
| **Password reset** | Single-use, 30-minute reset links stored only as hashes. No mail provider is bundled — see below |
| **Lesson ratings** | Learners rate each lesson 1–5 stars with an optional comment; the lesson page shows the running average |
| **Feedback** | A public feedback form (account optional) with a category and optional rating, triaged from the dashboard |
| **Admin dashboard** | `/admin` — users, progress, quiz averages, lesson analytics (most completed, hardest quizzes, lowest rated) and a feedback inbox |
| **Indian context** | ₹, crore, NSE, BSE, SEBI, NSDL, CDSL and Indian financial years throughout |
| **Theming** | Dark, Light and System appearance, saved to your account when signed in |
| **Motion** | Purposeful animation throughout — page reveals, counting numbers, hover lift, confetti on completion — all disabled under `prefers-reduced-motion` |

---

## Tech stack

- **Next.js 16** (App Router, Turbopack) with **React 19** and **TypeScript**
- **Tailwind CSS v4** with a token-based design system
- shadcn/ui-style component primitives, **Lucide** icons, **Recharts** charts
- **PostgreSQL** with **Prisma 7** (schema, migrations and seed)
- **Vitest** + Testing Library for unit and component tests

> **Note on Prisma 7:** the connection URL now lives in `prisma.config.ts` rather
> than in `schema.prisma`, and the runtime connects through the
> `@prisma/adapter-pg` driver adapter. See `prisma.config.ts` and `lib/db/prisma.ts`.

---

## Running it locally

### Prerequisites

- **Node.js 22+** (this project was developed on Node 22.23)
- **PostgreSQL 16+** (or Docker, see below)

### 1. Install dependencies

```bash
npm install
```

> If your npm cache is read-only (for example in a restricted sandbox), use a
> project-local cache: `npm install --cache ./.npm-cache`

### 2. Configure the database

Copy the example environment file and adjust the credentials:

```bash
cp .env.example .env
```

Then edit `.env`:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/stock_market_app"
```

Make sure the database named in the URL actually exists. If you have `psql`:

```bash
createdb stock_market_app
```

Then add a session secret so email sign-in works properly:

```bash
node -e "const fs=require('fs');const c=require('crypto');fs.appendFileSync('.env','\nAUTH_SECRET=\"'+c.randomBytes(32).toString('hex')+'\"\n')"
```

(When `AUTH_SECRET` is missing the app still runs, using an insecure development
fallback for signing sessions.)

### 3. Generate the Prisma client

```bash
npm run db:generate
```

### 4. Create the tables

```bash
npm run db:deploy
```

This applies the migrations in `prisma/migrations`. On a fresh database it creates
every table; afterwards it applies only what is pending, which is what makes it
safe to run on each deploy.

### 5. Seed the course content (optional)

```bash
npm run db:seed
```

This mirrors the authored curriculum, glossary and achievements into PostgreSQL.
**The app renders fully without this step** — the content is authored in
TypeScript and the UI does not depend on the database (see
[How progress is stored](#how-progress-is-stored)).

> Run this on a fresh database only. It clears `lesson`, `lesson_progress`,
> `quiz_attempts` and `course` before re-inserting, and `lesson_ratings` are
> removed along with the lessons by `onDelete: Cascade` — so re-seeding after
> learners have progress will erase it.

### 6. Start the dev server

```bash
npm run dev
```

Open <http://localhost:3000>.

---

## Available scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run `tsc --noEmit` |
| `npm run test` | Run the Vitest suite once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run test:e2e` | Run the Playwright end-to-end tests |
| `npm run db:generate` | Generate the Prisma client |
| `npm run db:push` | Push the schema to the database (local iteration only) |
| `npm run db:deploy` | Apply pending migrations — use this in production |
| `npm run db:migrate` | Create a migration from schema changes (development) |
| `npm run db:status` | Show whether migrations are applied |
| `npm run db:seed` | Seed course content into the database |
| `npm run db:studio` | Open Prisma Studio |
| `npm run admin:promote` | Grant admin to an email: `npm run admin:promote -- someone@example.com` |
| `npm run admin:demote` | Revoke admin from an email: `npm run admin:demote -- someone@example.com` |
| `npm run mail:verify` | Send one real reset email to check the mail setup: `npm run mail:verify -- you@example.com` |

### Verifying a change

```bash
npm run typecheck && npm run lint && npm run test
```

The test suite covers:

- **Calculations** (`lib/calculations/finance.test.ts`) — 39 tests for market cap,
  EPS, P/E, P/B, ROE, ROCE, debt/equity, CAGR, dividend yield, margins, EV,
  EV/EBITDA, income statement, balance sheet and corporate actions
- **Curriculum integrity** (`lib/learning/curriculum.test.ts`) — every lesson has
  an interactive component matching its declared key, valid quizzes with
  explanations, and unique slugs
- **Progress store** (`lib/progress/progress-store.test.ts`) — completion, quiz
  scoring, persistence and subscriptions
- **Rate limiting** (`lib/rate-limit.test.ts`) — window accounting, key isolation,
  window reset, and the disabled path
- **Components** — the ownership simulator and the quiz flow
- **Authentication** — password hashing, session-token signing/expiry/tamper
  checks, and password-reset token hashing/expiry/single-use rules
- **Mail** (`lib/auth/mailer.test.ts`) — transport selection, the Resend request
  payload, HTML escaping, and how a missing key, a rejected send, a non-JSON error
  body and an unreachable API each degrade
- **End-to-end** (`e2e/`) — Playwright journeys through a real browser:
  - the course journey: open the app → start the course → open “What is a Share?” →
    use the ownership simulator → complete the lesson → take the quiz → open Market
    Cap → use the calculator → check progress
  - the account journey: sign up → choose a theme → complete a lesson → sign out →
    **wipe the browser**, then sign back in and confirm both progress and theme are
    restored from the account alone
  - the password-reset journey: request a link → set a new password → the new
    password works and the old one does not → a link cannot be reused
  - the admin journey: a signed-out visitor is redirected to `/signin` and a
    signed-in learner sees an explanation; an admin triages feedback and saves a
    note; a learner rates a lesson and sees the average
  - plus specs for the API routes and a rejected-password check

The end-to-end tests need a browser once:

```bash
npx playwright install chromium
```

Playwright starts its **own** dev server on **port 3100**, not the one you develop
against on 3000, and forces `AUTH_MAIL_TRANSPORT=console` for it. That is
intentional: the reset specs read the link out of the UI, which only happens when
nothing was delivered. Running them against a real mail transport would send live
email to `@example.com` addresses, and those hard bounces would damage the sending
domain's reputation. Because the port is dedicated, an already-running dev server
cannot leak its own `.env` into a test run.

---

## Database & Prisma

```bash
npm install                     # installs prisma + @prisma/client
npm run db:generate             # generate the client from prisma/schema.prisma
npm run db:deploy               # apply migrations (creates the tables on a fresh database)
npm run db:seed                 # populate course content
npm run db:studio               # inspect the data
```

Schema changes are versioned in `prisma/migrations`. While iterating, edit
`prisma/schema.prisma` and run `npm run db:migrate` to record a migration;
`npm run db:push` syncs the schema without recording anything, which is fine
locally but has no history to review or roll forward in production.

Models: `User`, `Course`, `Chapter`, `Lesson`, `LessonProgress`, `Quiz`,
`Question`, `Answer`, `QuizAttempt`, `GlossaryTerm`, `Achievement`.

### Verifying the connection

```bash
curl -s http://localhost:3000/api/health
# {"status":"ok","database":"connected","seeded":{"chapters":35,"lessons":74}}
```

`database` will read `not-configured` when `DATABASE_URL` is unset, or
`unreachable` when it is set but cannot be contacted. In both cases the app keeps
working — it simply serves the authored content instead.

---

## Accounts and progress sync

An account is **optional**. The course is fully usable with no sign-in: progress
lives in the browser and nothing is sent anywhere.

Signing in with an email address additionally saves progress, the learning streak
and the theme to your account so they follow you between devices.

**How it works**

- **Passwords** are hashed with Node's built-in `scrypt` and a per-password salt
  (`lib/auth/password.ts`). The plain password is never stored.
- **Sessions** are a signed, httpOnly cookie — there is no session table. The token
  is `base64url(payload).HMAC-SHA256(payload)`, so it cannot be tampered with, and
  it carries a 30-day expiry (`lib/auth/session-token.ts`). Unrecognised emails and
  wrong passwords return the same message, so the API cannot be used to discover
  which addresses have accounts.
- **Progress sync** is a *union* merge (`lib/progress/progress-store.ts`): a lesson
  counts as complete if either the browser or the account says so, and the best
  quiz score and XP always win. Signing in on a new device therefore never loses
  work done before signing in.
- **Theme** is applied before first paint by an inline script, so there is no flash
  of the wrong theme, and switching between Light, Dark and System is saved to the
  account when signed in.

### Password reset

`/forgot-password` takes an email address and issues a reset link;
`/reset-password?token=…` sets the new password and signs the learner straight in.

- The link is **single-use** and expires after **30 minutes**.
- Only a **SHA-256 hash** of the token is stored (`lib/auth/reset-token.ts`), so a
  leaked database cannot be used to take over accounts.
- Requesting a new link invalidates any earlier unused ones for that account.
- The response is identical whether or not the address has an account, so the page
  cannot be used to discover registered emails.

**Two mail transports ship with the app** (`lib/auth/mailer.ts`):

| `AUTH_MAIL_TRANSPORT` | Behaviour |
| --- | --- |
| `console` (default) | Writes the message to the server log and reports that nothing was delivered. Because of that, the UI also shows the link directly so the flow is usable locally — guarded so it is **impossible to enable in production**. |
| `resend` | Sends through the [Resend](https://resend.com) API. Requires `RESEND_API_KEY`; set `AUTH_MAIL_FROM` to a sender on a verified domain. Called with `fetch`, so no SDK dependency. |

On the `resend` transport the link is **never** returned to the browser, because the
message was actually delivered. If Resend rejects the send, the failure is logged
with Resend's own error message and the page still reports success — so it cannot
be used to enumerate accounts.

Because the reset email is HTML **and** plain text, and a failure to send is never
fatal, nothing else in the flow changes when you switch transports.

```bash
# Send one real email to check the configuration end to end. The link in it is
# deliberately not a valid token.
npm run mail:verify -- you@example.com
```

**Required environment variables**

```bash
# Signs session cookies. Generate with:
#   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
AUTH_SECRET="..."

# Set to "true" only when served over HTTPS.
AUTH_COOKIE_SECURE="false"

# Password reset transport: "console" logs the link, "resend" emails it.
AUTH_MAIL_TRANSPORT="console"
AUTH_DEV_SHOW_RESET_LINK="true"

# Only read when AUTH_MAIL_TRANSPORT="resend". Keep it out of git.
RESEND_API_KEY="re_..."
AUTH_MAIL_FROM="MarketLearn <no-reply@your-domain.com>"

# Administrator access. Accounts with a listed email get the admin role at
# sign-up and sign-in. Comma-separated.
ADMIN_EMAILS="you@example.com"
```

Without `AUTH_SECRET` the app still runs, but sessions fall back to a development
value and a warning is logged. Always set it before deploying.

---

## Administration

### Becoming an administrator

Three ways in, and all of them still require the correct password to sign in:

1. **Allowlist** — put your email in `ADMIN_EMAILS` (comma-separated). It is
   applied at sign-up *and* at sign-in, which is how the very first admin exists
   without editing the database by hand. An account that appears in the list later
   is upgraded the next time it signs in.
2. **Promotion from the dashboard** — once you have one admin, promote anyone else
   with **Make admin** in the user table.
3. **Command line** — for an account that has not signed in since the allowlist
   changed, or when the dashboard is unreachable:

   ```bash
   npm run admin:promote -- someone@example.com
   npm run admin:demote  -- someone@example.com
   ```

   The script refuses to demote the last remaining admin, and warns you if the
   address is still in `ADMIN_EMAILS` (which would promote it again at its next
   sign-in). Role changes take effect on the account's next request — no sign-out
   needed.

An admin cannot remove their own rights, so one click cannot lock you out of the
dashboard.

### The dashboard — `/admin`

Signed-out visitors are sent to `/signin`, and a signed-in learner gets a short
explanation of how to get access — neither is a dead end. The route is kept out of
search engines via `robots: { index: false }`.

| Section | What it shows |
| --- | --- |
| Headline numbers | Registered users (and how many are admins), new users in 7/30 days, lessons completed, average quiz score, average lesson rating, feedback totals |
| Lesson analytics | **Most completed**, **hardest quizzes** (lowest average score) and **lowest rated** lessons — each linking to the lesson |
| Feedback inbox | Every submission with category, status, rating and sender. Change status, add an internal note |
| Users | Every account with role, lessons completed, XP, quiz average, ratings given, join date and last sign-in, plus role management |

Every admin action re-checks the caller's role **server-side**; hiding a button in
the UI is never the security boundary.

### Ratings and feedback

- **Lesson ratings** — one per learner per lesson (re-rating replaces it), left on
  the lesson page after the quiz. Stored in `LessonRating`.
- **Feedback** — `/feedback`, linked from the footer. Works signed out; signed-in
  submissions link to the account, while anonymous ones may leave an email or stay
  fully anonymous. Stored in `Feedback` with a category, optional 1–5 stars and a
  triage status.

---

## API routes

| Route | Purpose |
| --- | --- |
| `GET /api/catalogue` | The full course structure. Served from PostgreSQL when seeded, otherwise from the authored content — always the same shape. |
| `GET /api/health` | App and database status, including seeded row counts. |
| `GET /api/me` | The signed-in learner, or `null`. Read by the client so pages stay statically rendered. |
| `GET /api/progress` | The signed-in learner's saved lesson progress. |
| `POST /api/progress` | Upserts a batch of lesson progress records. |

---

## Docker

Start PostgreSQL only, and run the app on the host:

```bash
docker compose up -d db
npm run db:deploy && npm run db:seed
npm run dev
```

Or run the whole stack in containers:

```bash
docker compose up --build
```

The multi-stage `Dockerfile` generates the Prisma client, builds Next.js with
`output: "standalone"`, and runs a slim runtime image as a non-root user.

The `db` service uses the **named volume `db_data`**, so your data survives
`docker compose down`, restarts and reboots.

### Required configuration

`.dockerignore` keeps `.env` out of the image — `next build` copies it into
`.next/standalone`, which the runtime stage would otherwise copy in, baking your
`AUTH_SECRET` into a published image. Secrets therefore have to be passed in at
run time, which Compose does from the `.env` file next to `docker-compose.yml`:

```bash
AUTH_SECRET="<64-char hex>"        # required — Compose refuses to start without it
ADMIN_EMAILS="you@example.com"     # optional
AUTH_COOKIE_SECURE="true"          # set this when serving over HTTPS
```

If `AUTH_SECRET` is missing, the app falls back to a **publicly known**
development secret and anyone could forge a session cookie. Compose is configured
to fail loudly instead, but check this when deploying anywhere real.

### Sizing a VPS

Measured on this project (production image, seeded catalogue):

| Resource | Measured |
| --- | --- |
| App image | ~263 MB |
| PostgreSQL image | ~297 MB |
| Database (seeded) | ~9 MB |
| App container, at rest | ~90 MB RAM |
| Database container, at rest | ~38 MB RAM |
| **`next build` peak** | **~2.1 GB RAM** |

Because the runtime footprint is tiny and the build is not, the right size depends
entirely on *where you build*:

| | Build on the VPS | Build in CI, ship the image |
| --- | --- | --- |
| RAM | **4 GB** (2 GB is the measured floor; 1 GB is OOM-killed) | **1 GB** |
| Disk | **20 GB+** (`npm ci` + build output is transiently ~2–3 GB) | **10 GB** |

The build peak is the constraint: `next build` for these 121 routes was killed at a
1 GB limit and completed at 2 GB. If you must build on a small box, add swap or
build the image elsewhere and `docker save`/`load` it, or push it to a registry.

Only the app's port 3000 needs to be public. The database port is bound to
loopback, and it needs no published port at all in production.

### Using Podman instead of Docker

The compose file works with Podman too. Podman's Compose support needs its
Docker-compatible API socket, which the Compose CLI plugin talks to:

```bash
systemctl --user enable --now podman.socket
DOCKER_HOST=unix:///run/user/1000/podman/podman.sock podman compose up -d db
```

Handy commands:

```bash
podman volume ls                                  # confirm stock-market-app_db_data exists
podman exec stock-market-db pg_isready -U postgres -d stock_market_app
podman compose down                               # stops containers, KEEPS the volume
podman compose down -v                            # also deletes the volume (destructive)
```

---

## Deploying to production

### Quick start on a fresh VPS

```bash
# 1. Prerequisites: Docker (or Podman) and the code, e.g.
#      git clone <your-repo> && cd stock-market-app

# 2. Configure. Replace every "change-me" - APP_DOMAIN, POSTGRES_PASSWORD
#    and AUTH_SECRET are the ones that matter.
cp .env.production.example .env

# 3. Point DNS for APP_DOMAIN at this server and open ports 80 and 443.

# 4. Create the schema, then load the course content once.
docker compose -f docker-compose.yml -f docker-compose.prod.yml --profile tools run --rm migrate
docker compose -f docker-compose.yml -f docker-compose.prod.yml --profile tools run --rm migrate npx prisma db seed

# 5. Start the app behind Caddy (which gets the TLS certificate itself).
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

Then open `https://APP_DOMAIN`, go to **/signin**, choose **Sign up**, and register
the address in `ADMIN_EMAILS` with a password of your choosing. **There is no
default admin account and no default password** — the role is granted at sign-up.
Do this before sharing the URL, because sign-up does not verify addresses.

On Podman, prefix the compose commands with
`DOCKER_HOST=unix:///run/user/1000/podman/podman.sock podman`.

### Environment

Compose refuses to start until the values marked **required** are set, so a
mistyped deployment fails immediately instead of quietly running with an insecure
default.

| Variable | Production value |
| --- | --- |
| `AUTH_SECRET` | **required** — 64 hex characters, unique per deployment |
| `AUTH_COOKIE_SECURE` | **required** — `"true"` whenever the site answers on HTTPS |
| `POSTGRES_PASSWORD` | **required** — change it before the volume is first created |
| `APP_URL` | Set automatically to `https://APP_DOMAIN` by `docker-compose.prod.yml` |
| `APP_DOMAIN` | The hostname users visit; Caddy gets its TLS certificate |
| `ADMIN_EMAILS` | your administrator address(es) |
| `AUTH_MAIL_TRANSPORT` | `resend` |
| `RESEND_API_KEY` | a **send-only** key |
| `AUTH_MAIL_FROM` | a sender on your verified domain |
| `AUTH_RATE_LIMIT_ENABLED` | leave `true` |

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"   # AUTH_SECRET
```

### Migrations

Schema changes are versioned in `prisma/migrations`, and the initial migration is
already baselined against a database that was created with `db push`.

The Prisma CLI is a dev dependency, so it is **not** in the runtime image. There
are two ways to apply migrations:

**From the container stack** (nothing to install on the server):

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml --profile tools run --rm migrate
docker compose -f docker-compose.yml -f docker-compose.prod.yml --profile tools run --rm migrate npx prisma db seed
```

**From your machine or CI**, with Node installed and the database reachable:

```bash
DATABASE_URL="postgresql://postgres:PASSWORD@db-host:5432/stock_market_app" npm run db:deploy
```

> **`db:seed` is destructive.** It empties `lesson`, `lesson_progress`,
> `quiz_attempts` and `course`, and the `lesson_ratings` rows go with them via
> `onDelete: Cascade`. It is safe on a brand-new database and **loses every
> learner's progress, scores and ratings on a database that already has users**.
> Run it once, at first deploy, and not again.

Use `npm run db:push` only while iterating locally: it has no history and cannot
be reviewed.

### TLS

`docker-compose.prod.yml` adds a Caddy container in front of the app. It obtains
and renews a Let's Encrypt certificate for `APP_DOMAIN` by itself and redirects
plain HTTP to HTTPS, so there is nothing to configure beyond pointing DNS at the
server and opening ports 80 and 443. `reverse_proxy` sets the headers the app
needs (`X-Forwarded-For` for rate limiting, `X-Forwarded-Proto` and
`X-Forwarded-Host` for reset links), and the same file forces
`AUTH_COOKIE_SECURE="true"` so an insecure production deployment is not possible.

The app's own port is published on loopback only, in every environment, so it is
never reachable directly. If you use nginx or Traefik instead of Caddy, replicate
those two things: terminate TLS, forward those headers, and keep the app off the
public interface.

### Already handled

- Passwords hashed with scrypt and a per-password salt; reset tokens stored only as
  SHA-256 hashes, single-use, 30-minute expiry
- Sessions are signed httpOnly cookies — there is no session table to leak
- Rate limits on sign-in (per email **and** per address), sign-up and password reset
- Security headers: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy`, `Cross-Origin-Opener-Policy` and HSTS
- Admin actions re-check the role server-side; `/admin` is `noindex`
- Secrets never enter the image (`.dockerignore`); the app runs as a non-root user
- The database port is bound to loopback only

### Not included

Worth knowing before this faces the public internet:

- **No email verification.** Sign-up accepts any address, so claim an address listed
  in `ADMIN_EMAILS` promptly — until that account exists, anyone could register it
  and be granted admin.
- **No 2FA.**
- **No Content-Security-Policy** — skipped deliberately, see `next.config.js`.
- **Rate-limit counters are per process.** Right for one container; several replicas
  would each keep their own.
- **No audit log** of admin actions.
- **No automated backups** — `pg_dump` the `db_data` volume on a schedule.

### Never point the test suite at production

The end-to-end suite allowlists `admin@marketlearn.test` in its own environment,
creates accounts freely, and writes progress, ratings and feedback. Point it only at
a disposable database.

---

## Project structure

```text
app/
├── page.tsx                     # home dashboard
├── learn/
│   ├── page.tsx                 # curriculum overview
│   └── [chapter]/
│       ├── page.tsx             # chapter + lesson list
│       └── [lesson]/page.tsx    # lesson, quiz and completion
├── practice/
│   ├── page.tsx
│   ├── calculators/page.tsx
│   ├── simulations/page.tsx
│   └── case-studies/page.tsx
├── glossary/page.tsx
├── signin/page.tsx                    # email sign-in / sign-up
├── forgot-password/page.tsx           # request a reset link
├── reset-password/page.tsx            # set a new password
├── profile/page.tsx                   # account, theme and progress dashboard
├── feedback/page.tsx                  # public feedback form
├── admin/page.tsx                     # admin dashboard (404 for everyone else)
├── progress/page.tsx
└── api/                               # catalogue, health, me, progress

components/
├── admin/                       # user table + feedback inbox
├── auth/                        # session provider, auth + profile forms
├── calculators/                 # formula engine + ratio calculators
├── diagrams/                    # exchange / market structure / accounts
├── feedback/                    # public feedback form
├── interactive/                 # simulators, analysis tools, registry
├── layout/                      # header, footer, theme menu
├── learning/                    # lesson blocks, quiz glue, ratings, glossary
├── motion/                      # animated number, confetti
├── progress/                    # stats, achievements, chapter progress
├── quizzes/                     # the quiz engine
└── ui/                          # design-system primitives

lib/
├── admin/                       # dashboard queries + admin-only actions
├── auth/                        # passwords, sessions, roles, server actions
├── calculations/finance.ts      # pure, tested financial functions
├── db/prisma.ts                 # Prisma client (driver adapter)
├── feedback/                    # feedback action
├── learning/                    # types, block helpers, curriculum, glossary
├── progress/                    # progress store + React provider
├── ratings/                     # lesson rating action + summary
├── theme/                       # theme preference helpers + store
└── utils.ts

prisma/
├── schema.prisma
└── seed.ts
```

### How the content is authored

Lessons are **plain data**, not JSX. Each lesson declares its blocks
(paragraphs, callouts, formulas, tables, steps) and an `interactive` key that is
resolved to a React component at render time by
`components/interactive/registry.tsx`.

This means one source of truth drives the UI, the Prisma seed and the tests — and
adding a lesson never means touching a component.

---

## How progress is stored

Progress (completion, quiz scores, XP, streak) is stored in the browser via a small
external store (`lib/progress/progress-store.ts`) read through
`useSyncExternalStore`. This keeps the course fully usable with **no account and no
database**.

The store deliberately mirrors the `LessonProgress` Prisma model, so the same data
can be synced to PostgreSQL later without changing any UI. `lib/db/prisma.ts` and
`prisma/schema.prisma` provide the server-side layer, and the app degrades
gracefully when `DATABASE_URL` is not set.

---

*Built for learners — not for trading.*
