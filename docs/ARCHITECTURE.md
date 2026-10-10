# Architecture

Rulebook for the Mohandes Man frontend. Follow these rules in human and AI-assisted changes unless a later task explicitly changes the architecture.

## Purpose

This frontend is a Next.js App Router application. The storefront, public content routes, private customer/engineer workspaces, and API adapters are implemented. Architecture exists to keep routes thin, server rendering the default, and domain UI isolated from primitives.

Current route behavior is documented in the [page guides](README.md#page-documentation) and the [customer](USER-ACCOUNT.md), [engineer](ENGINEER-PANEL.md), and [messaging](MESSAGING.md) guides. Security boundaries and deployment limitations are documented in [security.md](security.md).

The original route, layout, and component plans remain available as historical context:

- [INFORMATION-ARCHITECTURE.md](history/INFORMATION-ARCHITECTURE.md)
- [COMPONENT-ARCHITECTURE.md](history/COMPONENT-ARCHITECTURE.md)
- [STATE-MATRIX.md](history/STATE-MATRIX.md)

## No `src/` directory

Application code lives at the repository root. Routes belong in `app/`. Do not create `src/`.

## Pages stay thin

`app/**/page.tsx` files are composition roots.

They may:

- read route params and search params
- fetch data on the server
- compose layout and feature components
- wrap sections in `Suspense`

They must not:

- contain large JSX implementations
- define domain UI inline
- own form state, drawers, tables, or cards that belong in `components/store/`

Thin pages make routes easy to scan and keep UI reusable across routes.

## Server Components by default

Every component is a Server Component unless it needs client capabilities.

Server Components can:

- fetch data on the server
- read secrets that are not `NEXT_PUBLIC_*`
- render Client Components as children
- reduce JavaScript shipped to the browser

## When Client Components are appropriate

Add `"use client"` only when the module needs at least one of:

- event handlers (`onClick`, `onChange`, `onSubmit`)
- React state or effects (`useState`, `useReducer`, `useEffect`)
- browser-only APIs (`window`, `document`, `localStorage`)
- client libraries such as TanStack Query or React Hook Form

Do not mark a parent as a Client Component just because one child needs interactivity. Split the interactive leaf instead.

The root `app/layout.tsx` must remain a Server Component. Compose client providers under `providers/` and import them from the layout.

## Folder responsibilities

### `app/`

Routes, layouts, loading UI, error UI, and Route Handlers. Nothing else.

Route groups:

- `(auth)` — authentication and expert-registration routes
- `(shop)` — storefront routes
- `(engineer)` — private specialist workspace at `/engineer`
- `(account)` — private customer workspace at `/account`

Route names are kebab-case. Dynamic segments use `[id]` for opaque identity (experts). Public SEO resources use `[slug]` or `[category]` (services, articles, FAQ, knowledge). See [INFORMATION-ARCHITECTURE.md](history/INFORMATION-ARCHITECTURE.md).

### `components/ui/`

Design-system primitives only: Button, Input, Textarea, Checkbox, Modal, Skeleton, Spinner, and similar.

Do not place feature screens, store cards, headers, or page sections here.

### `components/layout/`

Global application chrome: header, footer, navigation, search shell, and layout-related UI.

### `components/common/`

Reusable UI that is not a primitive and does not belong to one business domain.

### `components/store/`

All store/domain feature UI.

Feature UI path:

```text
components/store/<feature>/<componentName>/<componentName>.tsx
```

Examples:

```text
components/store/home/homeHero/homeHero.tsx
components/store/expert/expertCard/expertCard.tsx
```

### `hooks/`

Reusable React hooks. One kebab-case folder per hook.

### `lib/`

Pure utilities, helpers, and framework-independent infrastructure. One kebab-case folder per module.

`cn()` lives at `lib/utils/cn/cn.ts` and is the shared className helper.

### `services/`

External/server integration and domain API access. Services call APIs. They do not render UI.

### `providers/`

React providers. Query setup lives in `providers/query-provider/`. Application-level composition lives in `providers/app-provider/`.

Do not put application-specific queries inside the query provider.

### `config/`

Static application configuration. One kebab-case folder per config module.

### `types/`

Shared cross-feature TypeScript domain types. Store types belong in `types/store/*.types.ts`.

Component-specific types stay next to the component:

```text
components/store/cartDrawer/type/cartDrawer.types.ts
```

### `css/`

Global styles only. `css/globals.css` is imported from `app/layout.tsx`. Do not scatter global CSS files.

### `i18n/`

Reserved for localization. Do not invent a translation system until that phase starts.

## Services vs lib

| `lib/`                                                     | `services/`                                |
| ---------------------------------------------------------- | ------------------------------------------ |
| Pure helpers, formatting, HTTP client plumbing, env access | Domain API functions (`getUser`, `signIn`) |
| Framework-independent when possible                        | Knows endpoints and response contracts     |
| No product workflow                                        | Orchestrates backend access                |

## Local component types vs shared types

- If a type is used by one component or feature, colocate it under that component’s `type/` folder.
- If a type is a shared domain contract used across features, put it in `types/store/`.
- Do not duplicate the same domain type in multiple component folders.

## No barrel files

Do not create `index.ts` or `index.tsx` re-export files.

Import the concrete module:

```tsx
import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/utils/cn/cn";
```

Barrel files hide the real dependency graph, encourage circular imports, and conflict with the naming conventions in this project.

## Naming conventions

| Area       | Folder and file names        | Exports                     |
| ---------- | ---------------------------- | --------------------------- |
| Components | camelCase                    | PascalCase                  |
| Hooks      | kebab-case folder per hook   | camelCase `use*`            |
| Lib        | kebab-case folder per module | camelCase functions         |
| Providers  | kebab-case                   | PascalCase                  |
| Config     | kebab-case                   | camelCase constants         |
| Services   | kebab-case                   | camelCase functions         |
| Routes     | kebab-case                   | default page/layout exports |

Wrong:

```text
components/store/cart-drawer.tsx
components/ui/Button.tsx
hooks/use-cart.ts
lib/cn.ts
```

## Path aliases

Use `@/*` for project-root imports. Prefer the alias over deep relative paths.

Next.js `agentRules` is disabled. Project rules live in `.cursor/rules/project-ARCHITECTURE.mdc`.

## Environment and API boundaries

- Read API configuration through `lib/env/env.ts`. `NEXT_PUBLIC_API_BASE_URL` includes `/api/v1`; optional server-only `API_INTERNAL_BASE_URL` takes precedence for server calls. Media URLs derive from the public origin or `NEXT_PUBLIC_MEDIA_BASE_URL`. Live API configuration disables public mock data.
- Do not hardcode production or test API origins.
- Use native fetch through `lib/api/http-client/http-client.ts`.
- Do not add Axios.
- Typed failures use `ApiError` from `lib/api/api-error/api-error.ts`.
- Keep types explicit at API boundaries.
- Do not use `any`, `@ts-ignore`, or unsafe assertions unless there is a documented technical reason.

## API strategy

Services own domain API operations and call the shared HTTP client. Existing live contracts are documented in [API-CONTRACTS.md](API-CONTRACTS.md); do not invent endpoints or silently substitute fixtures after live API errors.

The HTTP client:

- reads the normalized API base including `/api/v1` through the environment module
- supports GET, POST, PUT, PATCH, DELETE
- accepts headers, JSON bodies, query parameters, and `AbortSignal`
- throws `ApiError` for non-OK responses
- forwards Next.js fetch options (`cache`, `next.revalidate`, `next.tags`) when the caller provides them

Do not force one cache policy on every request. Server callers opt into caching per request. Client callers stay compatible with TanStack Query.

## Server data vs client data

Use Server Components and native fetch for data that can be loaded on the server.

Use TanStack Query when client-side server-state behavior is required:

- interactive refetch
- mutations
- polling
- client cache
- dependent interactive requests

Do not put every API request in TanStack Query.

## RTL and Persian

The application is Persian and RTL.

- `html` uses `lang="fa"` and `dir="rtl"`
- Kalameh (FaNum) is loaded locally with `next/font/local` and exposed as `--font-kalameh`
- Prefer logical CSS properties
- Do not set `dir` on individual components unless a nested LTR island is required

## Styling

- Tailwind utilities are the default. Page-scoped CSS modules may isolate client-reference mobile styling or desktop ordering without changing protected shared styles; avoid new global CSS.
- Use `cn()` from `lib/utils/cn/cn.ts` for conditional classes.
- Global tokens live in `css/globals.css`.
- Visual language, semantic tokens, and UI primitives are documented in [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md). Domain components compose those primitives; they do not duplicate them.

## State

- Server Components and TanStack Query cover server state.
- Do not add Redux, Zustand, or other client stores unless a later task explicitly requires them.
- Colocate local UI state in the Client Component that needs it.

## Dependencies

Do not install new dependencies without a clear need. Do not introduce a UI framework without explicit permission.

## Changing this architecture

Do not change folder structure, naming conventions, or these rules unless a task explicitly instructs the change.

## Alignment boundaries

The 2026-10-10 alignment changes page composition and isolated domain presentation. Header, Footer, Login, Registration, OTP and password-recovery UI, global CSS and font loading remain unchanged. Shared dependencies preserve protected default rendering; the service category grid adds an opt-in homepage mobile-artwork branch while its default image/DOM path remains unchanged. Preserve feature flags, URL filters, native API adapters, session guards, TanStack Query, forms and validation. [Page documentation](README.md#page-documentation) describes final section ordering.

The local `Design/` source is read-only, ignored by Git, formatting, lint and Docker context; never import its Bootstrap, fonts or scripts. The site currently has deliberate staging noindex restrictions. Optional server-only `SITE_URL` supplies public sitemap URLs when configured; it is distinct from the backend API URL.
