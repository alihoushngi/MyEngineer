# Mohandes Man Frontend

Customer-facing storefront for **Mohandes Man** (مهندس من), rebuilt as a modern Next.js App Router frontend.

This is a **Persian, RTL**, API-driven frontend. The public marketplace, editorial content, customer account and engineer workspaces use live API adapters, with explicit development mock modes.

## Current implementation

Public routes cover home, service discovery, expert profiles, search, articles,
FAQ, knowledge, downloadable forms, about/legal, contact, careers and PWA guides.
Private customer and engineer workspaces preserve separate session guards.
The UI is Persian RTL with local Kalameh, semantic Tailwind tokens and server
rendering by default. The [documentation index](docs/README.md) records client
alignment, exclusions, migration decisions and actual validation results.

## Technology stack

| Area            | Choice                           |
| --------------- | -------------------------------- |
| Framework       | Next.js (App Router)             |
| UI library      | React 19                         |
| Language        | TypeScript (strict)              |
| Styling         | Tailwind CSS                     |
| Package manager | pnpm only                        |
| Server state    | TanStack Query                   |
| Forms           | React Hook Form + Yup / Zod      |
| Icons           | lucide-react                     |
| HTTP            | native fetch                     |
| Linting         | ESLint                           |
| Formatting      | Prettier                         |
| Runtime         | Node.js 22, Docker               |
| PWA             | Native manifest + Service Worker |

Do not add Redux, Zustand, Material UI, Ant Design, Chakra UI, or Bootstrap. shadcn/ui may be used for accessible primitives; project architecture and Mohandes Man tokens override its defaults.

## High-level architecture

Routes live in `app/` and stay thin. Route files compose domain UI; they do not own it.

- **Server Components by default.** Add `"use client"` only when browser APIs, event handlers, or React state/effects are required.
- **Domain UI** lives under `components/store/`.
- **Design-system primitives** live under `components/ui/`.
- **Application chrome** lives under `components/layout/`.
- **API access** lives under `services/`.
- **Pure helpers** live under `lib/`.
- **React providers** live under `providers/`.
- **Shared domain types** live under `types/`.

Path alias `@/*` points at the project root. There is no `src/` directory.

```
app/            routes, layouts, loading/error boundaries
components/     UI, grouped by layout / ui / common / store
config/         static application configuration
hooks/          reusable React hooks
lib/            pure utilities and framework-independent helpers
providers/      React context providers
services/       API and external integrations
types/          shared cross-feature types
i18n/           localization (not implemented in this phase)
css/            global styles only
public/         static assets
docs/           project documentation
```

## Main architectural conventions

- Never create `src/`.
- Never create `index.ts` barrel files.
- Pages stay thin and compose components from `components/`.
- Component folders and files use camelCase; component exports use PascalCase.
- `hooks/`, `lib/`, `providers/`, `config/`, and `services/` use kebab-case folders and files.
- Routes use kebab-case. Route groups are `(auth)`, `(shop)`, `(account)` and `(engineer)`.
- Do not place domain screens in `components/ui/`.
- Do not hardcode API base URLs. Read `NEXT_PUBLIC_API_BASE_URL` from the environment.
- Use native fetch through `lib/api/http-client`. Do not add Axios.
- The application is Persian and RTL (`lang="fa"`, `dir="rtl"`).

## Development principles

- Prefer readable, maintainable code over clever abstractions.
- Keep functions and files small. Keep components under 150 lines.
- Reuse existing modules before adding new ones.
- Do not install dependencies unless there is a clear need.
- Validate input at API boundaries with Zod when forms and requests are implemented.
- Keep TypeScript strict. Do not use `any` unless a documented technical reason exists.

## Environment configuration

Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_API_BASE_URL=
```

This base includes `/api/v1`, with no trailing slash. Optional `API_INTERNAL_BASE_URL` is server-only; `SITE_URL` is the separate public site origin used by the sitemap. Do not commit secrets. See [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) for setup commands.

## Development mock authentication

Local engineer registration and login can run without a backend. See
[docs/MOCK-AUTH.md](docs/MOCK-AUTH.md). Do not enable mock auth in production.

## Production test

`pnpm build` prepares the complete standalone output, including `public/` and
`.next/static/`. Run it with `HOSTNAME=127.0.0.1 PORT=3000 pnpm start`. PWA
implementation and browser validation are documented in [docs/PWA.md](docs/PWA.md).

## Documentation

Start with [docs/README.md](docs/README.md). It links the current architecture,
design system, page guides, QA record, API contracts, operational guides and
preserved historical decisions. Cursor architecture rules remain in
`.cursor/rules/project-ARCHITECTURE.mdc`.
