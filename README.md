# Contract-First Monorepo with ts-rest, NestJS, and React + Vite

A monorepo that showcases a contract-first full-stack architecture built around shared API contracts and end-to-end type safety.

> [!WARNING]
> Personal portfolio sandbox—exploring contract-first architecture and end-to-end TypeScript; not intended as generic production guidance.

- `ts-rest` and `Zod` define the contract and validation layer between client and server
- `NestJS` implements the API as defined by the shared `ts-rest` contracts
- `React + Vite` UI app interfaces with the API via a `ts-rest/react-query` client derived from the shared contracts with types for routes, request bodies, and responses
- `Drizzle ORM` and `PostgreSQL` provide data access and persistence

---

## Philosophy

- **Contracts are the source of truth.** Shared `ts-rest` contracts keep client and server aligned with end-to-end types -- using plain JSON/REST rather than a framework-srecific RPC protocol.
- **Zod at the boundary.** Shared data schemas validate and describe payloads so that both the API and UI can rely on the same definitions.

---

## What’s inside

### Apps & Packages

- `apps/nest` - NestJS API implementing shared ts-rest contracts
- `apps/ui` - React + Vite SPA using a ts-rest client with react-query for type-safe API calls
- `@repo/contracts` - Shared ts-rest contract definitions
- `@repo/data` - Shared Zod schemas and related type definitions for describing and validating data across client and server
- `@repo/typescript-config` - Shared TypeScript bases

### Tooling

- **TypeScript** — strict type checking
- **Biome** — format and lint
- **syncpack** — keep dependency versions aligned across the workspace
- **Drizzle** — database ORM
- **PostgreSQL** — database

---

## Architecture (mental map)

```
┌─────────────┐     HTTP /api      ┌──────────────┐
│  apps/ui    │  ◄──────────────►  │  apps/nest  │
│  React+Vite │   ts-rest client   │  Nest+ts-rest│
└──────┬──────┘                    └──────┬──────┘
       │                                  │
       └──────────┬───────────────────────┘
                  │
         @repo/contracts  ← shared route contracts
         @repo/data      ← shared Zod schemas
```

In development, the Vite dev server listens on **port 3000** and proxies **`/api`** to the API on **port 3030** (configurable via env).

---

## Get started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Environment

Copy the Nest example env and adjust if needed:

```bash
cp apps/nest/.env.example apps/nest/.env
```

### 3. Database

Start Postgres:

```bash
docker compose up -d
```

### 4. Migrations (Drizzle)

Generate SQL after schema changes, then apply migrations from the Nest app (where `drizzle.config.ts` lives):

```bash
pnpm --filter nest exec drizzle-kit generate
pnpm --filter nest exec drizzle-kit migrate
```

Drizzle Studio (optional):

```bash
pnpm --filter nest exec drizzle-kit studio
```

### 5. Develop

```bash
pnpm dev
```

Runs the Turborepo `dev` pipeline so the API and UI start together.

---

## Common tasks

| Goal | Command |
| --- | --- |
| Build everything | `pnpm build` |
| Lint | `pnpm lint` |
| Format + lint (root) | `pnpm format-and-lint` / `pnpm format-and-lint:fix` |
| Typecheck | `pnpm check-types` |
| Tests (Nest) | `pnpm --filter nest test` |

Filter or scope with pnpm when you only need one app:

```bash
pnpm --filter nest dev
pnpm --filter ui dev
```

---

## Extending the repo

- **New endpoints** — extend `@repo/contracts` and `@repo/data`, implement the router in `apps/nest`, call from `apps/ui` with the generated client contract.
- **Persistence** — add or change Drizzle schema in Nest, generate migrations, keep DB env in sync with `docker-compose.yaml`.
- **UI** — prefer shared pieces in `@repo/ui` when they are reused across routes or future apps.

---
