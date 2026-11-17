# AGENTS.md

Conventions for this repository. Keep changes small and consistent with what is
already here.

## Stack

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4.
- Supabase (Postgres + Auth) through `@supabase/ssr`.
- Resend for email, Zod for validation, Vitest for tests.
- No extra frameworks or services unless a real requirement justifies them.

## Structure

```text
src/app/               routes, admin, login, API handlers
src/components/        shared UI (layout/, ui/)
src/features/<name>/   schema, server/, components/ per feature
src/lib/               Supabase clients and shared infrastructure
src/content/           site copy and content
src/proxy.ts           auth guard for /admin
supabase/migrations/   SQL migrations, applied by hand
```

- Server code lives in `features/<name>/server/` and is imported by pages and
  route handlers. Keep database access server-side.
- Site copy goes in `src/content/`, not inline in components.
- New features follow the existing `features/contact` and `features/clients`
  layout: `schema.ts`, `server/`, `components/`.

## Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
```

Run `lint`, `typecheck` and `test` before considering a change done.

## Conventions

- Validate all input on the server with Zod; never trust the client.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` or any secret to the client.
- Do not collect clinical or sensitive health data; the contact form asks only
  for what is needed to reply.
- Prefer small components and functions, strong types, and no premature
  abstractions.
- Use conventional commit prefixes (`feat:`, `fix:`, `docs:`, `chore:`,
  `test:`).
- Do not rewrite unrelated code or discard existing work.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
