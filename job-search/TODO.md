JOB SEARCH TODO (keep short + actionable)

See **Portfolio & interview goals** table in [STRATEGY.md](./STRATEGY.md) — pair tasks below with those themes.

### Current sprint (resume + repo + rollout story)

Block time on the calendar like any other commitment (see weekly schedule in STRATEGY.md).

**Resume**

**Repo (contract + type safety + tests)**
- [ ] **Contract path visible:** point reviewers to `packages/contracts` + `packages/data` Zod schemas + one route that uses them end-to-end
- [ ] **Tests:** unit or integration for at least one handler path + unhappy paths (validation / 4xx)
- [ ] **README (short):** “why ts-rest + Zod,” one diagram or bullet list of request/response flow
- [ ] **README quickstart:** add explicit “how to run” in ~3 commands + expected local URL(s)
- [ ] **Coverage baseline:** run coverage once, record baseline in README/JOURNAL, and set a realistic initial target for this repo

**Non-CRUD feature ladder (priority order)**
- [ ] **P1:** Pagination + filtering + sorting with stable ordering and validation
- [ ] **P2:** Idempotent create (safe retries with idempotency key)
- [ ] **P3:** Role/authorization checks (who can do what)
- [ ] **P4:** Contract versioning / safe evolution (additive vs breaking change path)
- [ ] **P5:** Background job flow (enqueue + status + retry/error handling)

- [ ] **Update resume** — Senior/Staff-lite target; 2–3 proof bullets from video platform + 1 line pointing to this repo (contract-first / TS / tests)
- [ ] Align **LinkedIn About** with same story as resume (gap framing + skills — see [STRATEGY.md](./STRATEGY.md))
- [ ] One **PDF export** + filename convention (e.g. `LastName-Backend-Engineer-2026.pdf`)

**Rollout / change management (practice + doc)**
- [ ] Add **`docs/contract-rollout.md`** (or similar): additive vs breaking change, consumers, deprecation window, monitoring — **walk through it out loud** once (5 min) and log in JOURNAL.md
- [ ] Optional: **one concrete example** in the repo (“if we add field X / rename Y, sequence is…”)

### Now (today)
- [ ] Choose Track A + Track B targets (from STRATEGY.md) + 2 role search phrases (e.g. “Senior Backend TypeScript” / “API Platform”)
- [ ] Write a 6–8 line “About / summary” paragraph for resume + LinkedIn using STRATEGY.md positioning
- [ ] Do 1 coding interview rep (45–60m) and log in JOURNAL.md (topic + what was hard)

### Portfolio themes (tie each ship to evidence)
- [ ] **Shipping + testing + clear API/system thinking:** next feature ships with contract + tests + explicit error/status behavior
- [ ] **Scope + production judgment:** README or doc: tradeoffs, what you didn’t build and why
- [ ] **System design:** 1 mock this week (requirements → API → data → failure modes) — log topic in JOURNAL.md
- [ ] **Operational:** one of: structured logging hook, health check, idempotency sketch, or observability notes for a flow
- [ ] **Safe contract change:** short doc “how I’d roll out a breaking/additive change” (versioning, consumers, monitoring)
- [ ] **Evidence bundle:** tests + README tradeoffs + one non-trivial feature (auth | pagination | jobs | idempotency) + 2 judgment stories ready to tell

### Financial (weekly — 1–2h; blocks in [STRATEGY.md](./STRATEGY.md))
- [ ] This week’s list (pick only what matters): budget / runway | taxes | benefits (COBRA, etc.) | insurance | unemployment or paperwork | other: ___
- [ ] Tue 15m + Thu 45m + Fri 15m (or weekend Option D) — don’t skip the calendar blocks

### Next (this week)
- [ ] Create a “target companies” shortlist (20) with roles labeled Tier (A/B/C) + Track (A/B), paste into STRATEGY.md
- [ ] Apply to 10 roles (5 tailored, 5 quick) and track in JOURNAL.md
- [ ] Do 3 coding reps + 2 system design reps
- [ ] Add 1 portfolio-quality backend slice in this repo (align with row above: not just an endpoint — tests + README tradeoffs)
- [ ] Add OpenAPI/Swagger story:
      - decide: generate OpenAPI from contract OR document the contract endpoints (pick one)

### Waiting on / Follow-ups
- [ ] Person/Company:
      Date reached out:
      Next follow-up date:
      Context:

### Backlog (someday)
- [ ] Docker/Cloud: deploy a tiny version (Fly.io/Render/etc) + document steps
- [ ] Postman collection + a repeatable “smoke test” script
- [ ] Frontend: minimal UI to exercise the API (optional)

### Done (optional)
- [x] 

