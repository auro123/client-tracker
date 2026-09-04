# Project: Client Onboarding & Delivery Tracker

Single-user internal tracker. No authentication, no multi-tenancy.
The owner is non-technical: explain what you changed in plain English after
every task, and never leave the repo in a non-building state.

## Stack — do not propose alternatives
- Next.js (App Router) + React + TypeScript
- Tailwind CSS + shadcn/ui + lucide-react
- Prisma + PostgreSQL on Neon, via the Neon serverless driver adapter
- Server Actions for all mutations
- Deployed on Vercel
- Windows / PowerShell. Never write bash-only commands (no `&&` chains, no `rm -rf`).

## Versions
<!-- FILL THESE IN after Phase 1, from the numbers Claude Code prints. Keep current. -->
next: 16.3.4 | react: 19.2.8 | typescript: 5.9.3 | tailwindcss: 4.3.3 | prisma: 7.10.0

Version traps to respect regardless of what you remember:
- `params` and `searchParams` in pages and layouts are Promises. Await them.
- Tailwind v4 is configured in CSS (`@import "tailwindcss"` + `@theme`), not in a
  `tailwind.config.js` with `@tailwind base/components/utilities`. Check which
  version is installed before writing any Tailwind config.
- shadcn/ui may need `--legacy-peer-deps` on install. Use it rather than downgrading React.
- Prisma 7 no longer allows `url`/`directUrl` in the schema's `datasource` block, and
  `driverAdapters` is no longer a preview feature (it's built in) — do not add either back.
  Connection config for CLI commands (`migrate`, `db push`, `validate`) lives in
  `prisma.config.ts` at the repo root, which loads `.env.local` itself via `dotenv`
  (Next.js's own env loading does not extend to the standalone Prisma CLI process).
  `prisma.config.ts` points `datasource.url` at `DIRECT_URL` (unpooled), while the
  runtime `PrismaClient` in `src/lib/db.ts` builds a `PrismaNeon` adapter from
  `DATABASE_URL` (pooled). Keep that split — don't collapse it to one URL.
- If installed versions disagree with these notes, trust `package.json` and update this file.

## Architecture rules
- All mutations are Server Actions in `src/app/actions/*.ts`, first line `"use server"`.
- Every mutating action: validate with Zod → write via Prisma → `revalidatePath(...)`.
- One Prisma client only, from `src/lib/db.ts`, cached on `globalThis`.
- Never import `@/lib/db` into a `"use client"` file.
- Default to server components. Add `"use client"` only for interactivity, at the
  smallest possible leaf component.

## The configuration seam — most important rule in this file
All pipeline stages and task statuses live in `src/config/pipelines/`.
- Adding, renaming, reordering or removing a stage must require editing only
  a file in that directory.
- Never hard-code a stage id, stage label or status colour anywhere else.
- Never create a database table for stages or statuses.
- `Project.stageId` and `Task.statusId` are strings validated against config at write time.
- Order columns and dropdowns by the config's `order` field, never alphabetically.

## Data rules
- `Task.dueDate` is a calendar date (`@db.Date`). Never apply timezone conversion to it.
  Display and compare it as a date only, in Europe/Paris.
- Every project stage change also writes a `StageEvent` row.
- Deleting a project is a soft delete: set `archivedAt`. Never hard-delete a Project.
- Every task list query orders by `sortOrder` then `createdAt`.

## Never do
- Never add authentication, users, assignees, tags, priorities, comments, file uploads,
  notifications, time tracking or drag-and-drop unless I ask in that message.
- Never run `prisma migrate reset` or any destructive database command without asking first.
- Never edit `.env.local` or print the contents of `DATABASE_URL`.
- Never install a package without telling me what it is for in one sentence.
- Never use the words "simply" or "just" in explanations.
- Never refactor files I did not ask about in the same change.

## Verify before saying you are done
1. `npx tsc --noEmit` — zero errors.
2. `npm run build` — succeeds. A passing `npm run dev` is not sufficient evidence.
3. `npx prisma validate` if the schema changed.
4. State the exact thing I should click in the browser to confirm it works.
