JOB SEARCH STRATEGY (living doc)

Last updated: 2026-03-06

Related:

- [Skills stack — modern & marketable (Senior vs Staff)](./SKILLS-MARKETABILITY.md)
- [Company & role targeting (reference — tiers, examples, JERB notes)](./COMPANY-TARGETS-REFERENCE.md)

**Split of labor:** this file = **how you run the search** (tracks, cadence, story). [COMPANY-TARGETS-REFERENCE.md](./COMPANY-TARGETS-REFERENCE.md) = **archetypes** (ranked options, example employers, game/city notes). Overlap on purpose; reference stays the long-form shelf.

### North star
- Target role(s): Backend / Full-stack (backend-leaning) Principal / Staff / Senior (flexible)
- Target location/timezone: (fill in) | Remote OK: (fill in)
- Target compensation band: (fill in)
- Target company stage/size: (fill in)
- Non-negotiables:
  - A team that values engineering practices (testing, design, maintainability)
  - Modern TypeScript backend (or willingness to hire into it)
- Nice-to-haves:
  - Contract-first APIs / type-safe boundaries (OpenAPI / ts-rest / similar)
  - Monorepo / platform work / developer experience ownership

### Leveling strategy (two-track)
- Track A (default / faster): Senior + “Staff-lite” roles
  - Goal: maximize interview volume + land quickly without a principal-level loop.
  - Titles to target:
    - Senior Software Engineer
    - Senior Backend Engineer
    - Senior Platform Engineer
    - Software Engineer III / IV (depends on company)
    - Lead Engineer (IC, no direct reports)
- Track B (selective reach): Staff/Principal roles (apply only when the description fits)
  - Goal: keep a “reach lane” open where leadership + modernization + coaching is a first-class need.
  - Filter: only pursue if the JD clearly signals ownership, cross-team influence, and platform/architecture work.

### Option landscape (speed-ranked, executive summary)

Same ideas as the long-form [Option landscape in COMPANY-TARGETS-REFERENCE.md](./COMPANY-TARGETS-REFERENCE.md#option-landscape-ranked-by-realistic-speed-to-employment), kept here so **Track A/B** and **application tiers** have a clear “why.”

| Priority | Lane (speed / hire-ability) | How it maps here |
| --- | --- | --- |
| **1** | **Senior / Staff-lite** at product or stable tech (not necessarily Staff title) | **Track A** = default funnel — fastest re-entry, strong pay, least “principal loop” pressure |
| **2** | **Public sector / healthcare / university / nonprofit** tech (often city, state, hospital systems, etc.) | **Tier B** energy — high probability, stable, often gap-friendly; may trade peak comp |
| **2.5** | Recruiters you **already know** | **Lane B** — batch outreach early |
| **3** | Remote **Staff-lite** at boring-but-stable employers | Still **Track A**; good if “cool cos” are slow |
| **3.5** | Recruiters on **LinkedIn** | **Lane B** — volume + clear pitch |
| **4** | Startups **A–C** | **Tier C** — selective; don’t depend on as only pipe |
| **5** | Tech **support / helpdesk** | **Avoid** unless emergency (not a path back to IC engineering) |

**Sweet spot (plain language):** overweight **Senior-shaped roles** for callback velocity and dignity; keep **Staff/Principal** as **Track B** cherry-picks. Full prose + examples: [COMPANY-TARGETS-REFERENCE.md](./COMPANY-TARGETS-REFERENCE.md).

### Gap / pivot framing (script)
- LinkedIn / headline one-liner:
  - Principal-level full-stack engineer (video platform) now focused on backend-leaning TS/Node/Nest and contract-first APIs (Zod/ts-rest), returning after a caregiving period with targeted upskilling.
- Recruiter screen one-liner:
  - After my principal role ended, I took time for family caregiving and kept my skills current through focused modern backend TypeScript project work and interview prep. I’m now fully available and actively interviewing for backend/platform senior/staff roles.
- Interview-safe version (30–45s):
  - I spent years as a principal full-stack engineer on a large video platform, with a lot of modernization and team coaching work. After that role ended, I took time for family caregiving. During that period I kept my skills current with focused TypeScript backend project work and structured interview prep, including contract-first APIs and modern tooling. I’m now fully available and targeting backend-leaning senior/staff roles where modernization, reliability, and clean architecture matter.
- If asked “why 2 years?” (short, calm):
  - Caregiving responsibilities were my priority for that period. I kept my technical skills current with focused project work and practice, and I’m now fully available.

### Role search keywords (copy/paste)
- Senior Backend Engineer TypeScript
- Senior Software Engineer Node.js TypeScript
- Platform Engineer API platform
- Developer Platform / Internal Tools
- Backend Engineer “NestJS” (optional)
- API Infrastructure / API Platform
- Service Reliability / Observability (if interested)

### Positioning (your story)
- 1-liner:
  - Principal full-stack engineer (recently laid off) who modernized and scaled a large video platform while coaching teams, now pivoting hard into modern TypeScript backend with contract-first APIs and clean architecture.
- 3-bullet value proposition:
  - Led and coached engineers in a 1K-employee environment; strong at unblocking teams and raising the engineering bar.
  - Deep experience maintaining/modernizing legacy systems (PHP) and translating good patterns into pragmatic, shippable improvements.
  - Actively leveling up in modern TS backend: monorepo tooling (pnpm/turbo), NestJS, hex layering, contract-first API typing/validation.
- Proof points (projects, metrics, impact):
  - Video platform: (add 2–4 bullets with outcomes + numbers if possible)
  - Internal PHP framework: built/maintained patterns + coached staff on usage (impact: productivity, consistency, fewer regressions)
  - This repo: end-to-end-ish type safety via contract-first + ts-rest; Zod schemas; Nest module boundaries

### Portfolio & interview goals (paired — ship + practice + evidence)

Use this to align **what you build** with **what Senior vs Staff loops probe**. Details: [SKILLS-MARKETABILITY.md](./SKILLS-MARKETABILITY.md).

| Theme | What it signals | Ship / practice (concrete) |
| --- | --- | --- |
| **Shipping + testing + API/system thinking** | Senior: you deliver safely and reason about boundaries | Every meaningful change: contract (Zod) + handler + tests; name errors and status codes; one short “why this shape” note in README or PR description |
| **Scope, influence, production judgment** | Staff: tradeoffs under constraints | README section: options you rejected and why; if you add a feature, note blast radius, rollout, and rollback story |
| **System design** | End-to-end reasoning | Weekly: 1 design mock (requirements → API → data → failure modes). Tie portfolio to one diagram or bullet list in repo docs |
| **Operational concerns** | Runs in production, not just demos | Pick **one** vertical slice: structured errors, logging hooks, idempotency key or safe retries, or health/readiness; document assumptions |
| **Errors, idempotency, queues, observability, security** | Production hygiene | Non-trivial feature choice: e.g. pagination + stable sorting; or job/outbox sketch; or auth boundary with least privilege — plus how you’d observe/debug it |
| **Evolve systems under constraints** | Maturity | Doc: “If we had 10× traffic / new consumer / breaking change, I’d…” (short, specific) |
| **Standards, migrations, mentoring, incidents, roadmap** | Staff narrative | Mostly **behavioral STAR stories** from past role + 1 repo story: e.g. “how I’d roll out a contract change safely” (versioning, dual-write, deprecation window) |
| **Roll out a contract change safely** | Platform/API credibility | Mini-doc: additive fields first, consumers, cutover, monitoring; optional: v2 route or `Accept-Version` — match what you’d say in interview |
| **Evidence bundle** | Credibility | **Tests** + **README tradeoffs** + **one non-trivial feature** (auth, pagination, jobs, idempotency) + **2–3 judgment stories** (resume or spoken) |

**Minimum viable Staff-oriented portfolio story (one paragraph you can say):**  
“I shipped X behind contract-first schemas, tested Y, documented Z tradeoffs, and here’s how I’d migrate consumers / run safely in prod.”

### Resume + portfolio bundle (this sprint)

Tie these together so **paper, repo, and interview** tell one story:

1. **Resume / LinkedIn** — update in parallel with repo work; link or name the repo + one line on contract-first + TS.
2. **Repo** — contract + types visible in code; **tests** on at least one route; **README** for reviewers who have 2 minutes.
3. **Rollout** — a short **`docs/contract-rollout.md`** (or similar) + **practice saying it aloud** (additive vs breaking, consumers, monitoring). Checklist: [TODO.md](./TODO.md) **Current sprint**.

### Non-CRUD showcase roadmap (priority)

Build these in order unless a target job description suggests a different order:

1. **Pagination + filtering + sorting** with stable ordering + validation (fastest “real API” signal)
2. **Idempotent create** (safe retries with idempotency key)
3. **Role/authorization checks** (who can do what)
4. **Contract versioning / safe evolution** (additive vs breaking path + rollout notes)
5. **Background job flow** (enqueue + status + retry/error handling)

Why this order: first two give quick, high-signal backend credibility; middle two show product/platform judgment; jobs are excellent but heavier, so better after core evidence is in place.

### Search lanes (where you’ll look)
- Lane A (warm network):
- Former coworkers/managers + cross-functional partners (PM, design, data) from video platform
- “I’m targeting TS backend / platform work; here’s a 1-paragraph update + what I’m looking for”
- Lane B (inbound recruiters):
- Tight pitch + clear target roles/comp/location; respond with availability + 2–3 proof points
- Lane C (target companies outbound):
- Curate a list of 20–40 companies where “platform + modernization + TS backend” is valued
- Lane D (job boards):
- Use selectively; optimize for roles aligned to TS backend and senior scope
- Lane E (optional — game studios / game-adjacent): web, backend, online services, platform — see [COMPANY-TARGETS-REFERENCE.md](./COMPANY-TARGETS-REFERENCE.md) (section *Video game studios & game-adjacent tech*); keep as a small slice of applications so your main funnel stays broad

### Weekly operating system
- Minimum weekly outputs:
  - Applications sent: 10–20 (quality > volume)
  - Warm outreaches: 5–10
  - Recruiter follow-ups: 10–20 short pings
  - Interview practice hours: 5–8 (coding + system design + behavioral)
  - **Financial admin:** 1–2h (budget, taxes, benefits, insurance, claims, unemployment paperwork — whatever is on your plate)
- Calendar blocks:
  - 3x (60–90m) coding practice
  - 2x (60m) system design reps
  - 2x (45m) applications + tailoring
  - 2x (30m) networking/outreach
  - **1–2x (30–45m) financial** (see weekly schedule — fixed slot or weekend batch)

### Financial admin (weekly — plug in your real tasks)
- Keep a **single list** (see [TODO.md](./TODO.md) “Financial”) so you don’t burn mental energy re-deciding.
- **Default:** one **30–45m** block mid-week + optional **45–60m** batch on the weekend if something needs focus (forms, calls during business hours).
- **Rule:** financial time is **calendar-blocked like an interview** — not “when I’m tired at the end of the day” unless that’s truly the only option.

### Weekly schedule (4h most days, 8h Thursday)
*Job search + skills + **financial** — if a day feels tight, shorten the lightest block that day (often “skills light” or 15m off job hunt) rather than skipping financial entirely.*

- Mon (4h) – Skills-heavy
  - 2h: coding interview reps (1 problem + review)
  - 1h: system design/architecture notes (1 topic)
  - 1h: job hunt (2–3 apps + 2 outreaches)
- Tue (4h) – Job-hunt-heavy
  - 2h: applications + tailoring (4–6 apps)
  - 1h: outreach + follow-ups (5–10 messages)
  - 45m: skills (light rep or flashcards/notes)
  - **15m: financial** (quick inbox: queue tasks, pay one bill, one form step)
- Wed (4h) – Skills-heavy
  - 1h45: coding reps
  - 1h: portfolio increment (one small “shippable” slice)
  - 1h: job hunt (apps/follow-ups)
  - **15m: financial** (or move to Thu/weekend if you need a longer block)
- Thu (8h) – Deep work day (split)
  - 3h: portfolio “big rock” (endpoint + tests + docs)
  - 2h: system design (1 full mock: requirements → API → data model → tradeoffs)
  - 2h: job hunt pipeline (8–12 apps + outreach + follow-ups)
  - 45m: interview prep admin (resume tweaks, story bank, scheduling)
  - **45m: financial** (deeper tasks: calls, forms, tax docs, benefits comparisons)
- Fri (4h) – Close loops
  - 1h: follow-ups + recruiter pings + update tracking
  - 2h: coding rep + review (focus weaknesses)
  - 45m: retrospective + plan next week (update [TODO.md](./TODO.md) / [JOURNAL.md](./JOURNAL.md))
  - **15m: financial** (close the week: what’s done, what’s next week)
- Weekend (flex)
  - Option A (2–4h): portfolio polish + README + deploy/doc
  - Option B (1–2h): light practice + batching applications (if weekday volume slips)
  - Option C: rest/reset (protect energy; consistency beats burnout)
  - **Option D (1–2h): financial batch** — anything that needs quiet focus or daytime hours you couldn’t hit during the week

### Target company list
- Company | role | link | tier(A/B) | track(A/B) | status | next action | notes
- Longer notes on **where to apply** (A/B/C tiers, example companies): [COMPANY-TARGETS-REFERENCE.md](./COMPANY-TARGETS-REFERENCE.md)

### Application tiers (guidelines)
- Tier A: modern product companies / dev tooling / strong eng culture (higher bar, still worth it) — aligns with option **1** + part of **3** in [reference option landscape](./COMPANY-TARGETS-REFERENCE.md#option-landscape-ranked-by-realistic-speed-to-employment)
- Tier B: **high-probability landings** — enterprise / scaled SaaS *and* **city & state / local gov** tech, healthcare IT, universities, large nonprofit engineering (reference option **2**); often gap-friendly; comp may trail Tier A peaks
- Tier C: selective startups (A–C) where experienced modernization/ownership is valued — reference option **4**

### Message templates
- Outreach (warm):
- Hey <name> — quick update: I was laid off from <company> where I was a principal full-stack engineer on a video platform. I’m now targeting backend-leaning Staff/Senior roles (TypeScript/Nest or similar), especially teams doing platform/modernization work. If you hear of anything that fits, I’d love an intro — happy to share a resume and a short portfolio repo link.
- Outreach (cold):
- Recruiter response:
- Follow-up:

### Interview loop prep
- Resume story bank (STAR):
- 6–10 stories: modernization, incident/bug, cross-team influence, mentoring, delivery under ambiguity, refactor, stakeholder conflict, scope trade-offs
- System design topics:
- Auth/session, rate limiting, queues, caching, multi-tenant, observability, video/media basics (if relevant), schema design + migrations
- Coding topics:
- Arrays/strings/hashmaps; BFS/DFS; binary search; two pointers; sorting; intervals; basic DP; data modeling + validation
- Behavioral themes:
- “Modernize legacy safely”, “coach and scale impact”, “pragmatic architecture”, “own outcomes”

### Review + iteration notes
- What’s working:
- What’s not:
- Next experiment:

