# Skills stack: modern & marketable? (reference)

Honest framing for **Senior** vs **Staff** — useful when doubting whether TS/Nest/Zod/ts-rest/turbo/hex is “enough.”

## Short answer

- The stack and patterns you’re building are **modern and widely used** in the market.
- For **Senior**, they’re **directly relevant** if you pair them with shipping, testing, and clear API/system thinking.
- For **Staff**, they’re **necessary but not sufficient**: interviewers still look for **scope, influence, and production judgment** beyond “I used Nest + Zod + ts-rest.”

## What’s genuinely marketable today

- **TypeScript on the backend** (Node/Nest or similar) is standard at a huge slice of product companies and “modern” enterprise teams.
- **Contract-first APIs** (OpenAPI, Zod, codegen, ts-rest-style boundaries) are **real selling points** for platform/API teams and any org that cares about reliability and cross-team contracts.
- **Monorepo + tooling** (pnpm, Turbo, Biome) matters for **platform / DX / internal tools** roles and reads as current.
- **Clear layering** (ports/adapters, boundaries) maps well to how Staff engineers talk about **maintainability and evolution**.

## Where Staff / Senior+ interviews often diverge

- They’ll still probe **system design**, **operational concerns** (errors, idempotency, queues, observability, security), and **how you’d evolve systems under constraints** — not which framework you picked.
- **Staff** often means **cross-team** work: standards, migrations, mentoring, incident patterns, roadmap tradeoffs. Your principal + coaching story helps here; the repo should **illustrate** one or two of those themes (e.g. “how I’d roll out a contract change safely”).

## Honest framing

- Your skills are **not** a fad or “tutorial stack” — they’re **aligned with how a lot of teams build APIs in 2024–2026**.
- To feel **Staff-level marketable**, the differentiator is usually **evidence**: tests, a crisp README on tradeoffs, one non-trivial feature (auth, pagination, jobs, idempotency), and **stories** that show judgment, not just features.

## One-line takeaway

- **Marketable for Senior — very plausibly yes.**
- **Credible for Staff — yes if** you connect this work to **ownership, scale, and cross-team impact** (your past role + a tight portfolio narrative), not only to the toolchain.

---

**Action plan:** See [STRATEGY.md](./STRATEGY.md) → section **“Portfolio & interview goals (paired)”** for a theme → ship/practice/evidence table you can work through week by week (also mirrored in [TODO.md](./TODO.md) under **Portfolio themes**).
