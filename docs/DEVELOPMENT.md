# Development Guide

Practical setup and contribution guide for the Mohandes Man frontend.

## Requirements

- Node.js 22 or later (see `.nvmrc`)
- pnpm 11 or later

This repository uses pnpm only. Do not use npm or yarn to install or run scripts.

pnpm 11 reads project settings from `pnpm-workspace.yaml`. This repository sets `verifyDepsBeforeRun: false` so `pnpm dev`, `pnpm lint`, and other scripts do not auto-run install. After pulling lockfile or `package.json` changes, run `pnpm install` yourself.

Confirm versions:

```bash
node -v
pnpm -v
```

## Installation

```bash
pnpm install
```

## Environment setup

Copy the example environment file, then edit the copy:

```bash
cp .env.example .env.local
```

`.env.local` is gitignored and is what `pnpm dev` reads. Compose reads a sibling `.env` next to `compose.yaml` (also gitignored). `.env.example` is tracked and must contain only safe variable names, defaults and documented examples. See [repository guidelines](repository-guidelines.md) for secrets, tracking checks and local reference files.

After changing env files, restart the development process. Production `NEXT_PUBLIC_*` values are inlined into browser code at build time; changing them requires a new build. Never put credentials, bearer tokens or private keys in those variables.

Do not hardcode API hosts in source. Read them through `lib/env/env.ts`. Endpoint contracts live in [API-CONTRACTS.md](API-CONTRACTS.md). Docker build-time notes are in [DOCKER.md](DOCKER.md).

### `NEXT_PUBLIC_API_BASE_URL`

Base URL of the Mohandes Man HTTP API, **including** `/api/v1`. Do not use the site origin alone. Do not add a trailing slash.

Current test API:

```bash
NEXT_PUBLIC_API_BASE_URL=https://test.kbdcland.ir/api/v1
```

Local backend example:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api/v1
```

`lib/env/api-env/api-env.ts` trims the value and strips trailing slashes. `lib/api/http-client/http-client.ts` then joins it with paths such as `/home` and `/services` (`https://test.kbdcland.ir/api/v1/home`).

When an API base is set, the app is live-first: catalog and content come from the API, and `NEXT_PUBLIC_USE_MOCK_DATA` is ignored.

With neither API base configured, public pages still render. Lists stay empty by default; explicit `NEXT_PUBLIC_USE_MOCK_DATA=true` selects development catalog fixtures. Catalog fixtures do not grant authentication.

### `API_INTERNAL_BASE_URL`

Optional server-only API base, also including `/api/v1`. It takes precedence over `NEXT_PUBLIC_API_BASE_URL` for server rendering and Server Actions. For example, a container can use `http://backend/api/v1` while browsers use a public HTTPS API origin. The internal address is not a `NEXT_PUBLIC_*` value and must never be exposed through client props or public configuration.

Keep the public API/media origin configured for browser calls and uploaded media. Media resolution uses the public API origin or `NEXT_PUBLIC_MEDIA_BASE_URL`, not the internal origin. Configuring the internal API also disables server-side catalog fixtures. Compose does not currently forward this variable; supply it explicitly in deployment configuration as described in [DOCKER.md](DOCKER.md).

### `SITE_URL`

Optional server-only public website origin for `/sitemap.xml`, for example `https://your-site.example`. This is separate from the API and must be an origin you control. Missing or invalid values produce an empty sitemap. Configuring this value does not remove the existing staging noindex restrictions; coordinate any production indexing change with [seo-guidelines.md](seo-guidelines.md).

### `API_TLS_SERVERNAME`

If an API certificate does not match its configured hostname, Node `fetch` fails with `ERR_TLS_CERT_ALTNAME_INVALID`. A previously observed test-API mismatch used this valid certificate name:

```bash
API_TLS_SERVERNAME=kbdcland.ir
```

Verify the certificate and intended deployment before using this override. The Node process uses that server name only for TLS connections to the configured API origin. Certificate verification remains enabled, and other HTTPS requests keep their normal dispatcher. Never use `NODE_TLS_REJECT_UNAUTHORIZED=0`.

Leave this unset for a host whose certificate already matches its hostname. The durable fix is a certificate whose SAN includes the actual API hostname.

Server Components, Server Actions, and server-side image requests can load data with this setting. Browser requests that go **directly** to `https://test.kbdcland.ir` can still fail TLS in the user’s browser.

### `NEXT_PUBLIC_MEDIA_BASE_URL`

Optional absolute base for relative upload paths such as `front/upload/...`. If unset, the app uses `{apiOrigin}/public` (for the test API: `https://test.kbdcland.ir/public`).

### Mock data and mock auth

`NEXT_PUBLIC_USE_MOCK_DATA=true` is only read when `NEXT_PUBLIC_API_BASE_URL` is empty. Keep it `false` while talking to the live API.

Development-only mock engineer login/registration is documented in
[MOCK-AUTH.md](MOCK-AUTH.md). Customer mock login is documented in
[USER-AUTH.md](USER-AUTH.md). Do not enable either in production.

## Development

```bash
pnpm dev
```

The App Router application starts in development mode.

If the chrome renders but experts, services, articles, or FAQ stay empty, check `.env.local`: the API URL must include `/api/v1`, and the process must have been restarted after the change. Inspect the API connection error and certificate before applying the scoped TLS workaround above.

A development-only design system preview is available at `/dev/design-system`. It is not linked in product navigation and returns 404 in production builds. Visual rules are documented in [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).

## Production build

```bash
pnpm build
HOSTNAME=127.0.0.1 PORT=3000 pnpm start
```

`pnpm build` creates the standalone production server and copies `public/` and
`.next/static/` into `.next/standalone/`. `pnpm start` launches that standalone
server; it does not use `next start`. See [PWA.md](PWA.md) for service-worker and
offline validation.

## Lint

```bash
pnpm lint
```

ESLint uses `eslint-config-next` plus `eslint-config-prettier` so formatting rules do not conflict with Prettier.

## TypeScript check

```bash
pnpm typecheck
```

This runs `tsc --noEmit` with strict TypeScript.

## Formatting

Format the repository:

```bash
pnpm format
```

Check formatting without writing files:

```bash
pnpm format:check
```

## Installing dependencies

Add a runtime dependency:

```bash
pnpm add <package>
```

Add a development dependency:

```bash
pnpm add -D <package>
```

Remove a package:

```bash
pnpm remove <package>
```

Update dependencies:

```bash
pnpm update
```

### Lockfile

`pnpm-lock.yaml` is the source of truth for installed versions. Commit it. Do not delete it to “fix” install issues unless you are intentionally regenerating the lockfile.

## Clean/reinstall dependencies

Safe commands for a fresh install:

```bash
rm -rf node_modules .next
pnpm install
```

If the lockfile is intact, this restores the same dependency tree. Do not delete `pnpm-lock.yaml` unless you intend to regenerate it.

## Project structure

| Location             | What belongs here                                                    |
| -------------------- | -------------------------------------------------------------------- |
| `app/`               | Routes, layouts, loading/error boundaries, and thin page composition |
| `app/(auth)/`        | Auth route group                                                     |
| `app/(shop)/`        | Shop route group                                                     |
| `app/(engineer)/`    | Private specialist workspace                                         |
| `app/(account)/`     | Private customer workspace                                           |
| `app/api/`           | Next.js Route Handlers                                               |
| `components/ui/`     | Design-system primitives only                                        |
| `components/layout/` | Header, footer, navigation, search shell, and other chrome           |
| `components/common/` | Reusable UI that is not a primitive and not domain-specific          |
| `components/store/`  | Store/domain feature UI                                              |
| `hooks/`             | Reusable React hooks                                                 |
| `lib/`               | Pure utilities, helpers, and API infrastructure                      |
| `services/`          | Domain API access and external integrations                          |
| `types/store/`       | Shared store/domain types                                            |
| `config/`            | Static application configuration                                     |
| `providers/`         | React providers                                                      |
| `css/`               | Global styles only                                                   |
| `i18n/`              | Localization files (not implemented in this phase)                   |
| `public/`            | Static assets                                                        |
| `docs/`              | Project documentation                                                |

There is no `src/` directory. Do not create one.

## Naming conventions

### Components

Folders and files under `components/` use camelCase.

```text
components/store/cartDrawer/cartDrawer.tsx
components/store/cartDrawer/type/cartDrawer.types.ts
components/store/cartDrawer/test/cartDrawer.test.tsx
components/layout/storeHeader/storeHeader.tsx
components/ui/button/button.tsx
```

Exports use PascalCase:

```tsx
export function CartDrawer() {}
export function StoreHeader() {}
export function Button() {}
```

Do not use kebab-case component filenames. Do not create `index.ts` files for components.

### Hooks

Each hook gets its own kebab-case folder. Do not place hook files directly in `hooks/`.

```text
hooks/use-cart/use-cart.ts
hooks/use-auth/use-auth.ts
```

### Lib

Each lib module gets its own kebab-case folder.

```text
lib/api/http-client/http-client.ts
lib/utils/cn/cn.ts
lib/utils/to-latin-digits/to-latin-digits.ts
```

### Providers

```text
providers/query-provider/query-provider.tsx
providers/app-provider/app-provider.tsx
```

### Config

```text
config/site.config/site.config.ts
config/menu.config/menu.config.ts
```

### Services

```text
services/auth-service/auth-service.ts
services/user-service/user-service.ts
```

### Types

Shared store/domain types:

```text
types/store/*.types.ts
```

Feature/component-specific types stay next to the component:

```text
components/store/cartDrawer/type/cartDrawer.types.ts
```

### Routes

Routes use kebab-case. Dynamic segments use `[id]`. Route groups are `(auth)`, `(shop)`, `(engineer)`, and `(account)`.

```text
app/(auth)/login/page.tsx
app/(auth)/forgot-password/page.tsx
app/(shop)/experts/[id]/page.tsx
```

## Creating a new component

Create the component in the correct family folder (`ui`, `layout`, `common`, or `store`).

Example — a store feature component:

```text
components/store/engineer/engineerCard/engineerCard.tsx
components/store/engineer/engineerCard/type/engineerCard.types.ts
```

```tsx
import { cn } from "@/lib/utils/cn/cn";
import { type EngineerCardProps } from "@/components/store/engineer/engineerCard/type/engineerCard.types";

export function EngineerCard({ className, children }: EngineerCardProps) {
  return <article className={cn(className)}>{children}</article>;
}
```

Import it from a thin route:

```tsx
import { EngineerCard } from "@/components/store/engineer/engineerCard/engineerCard";
```

## Creating a new hook

```text
hooks/use-cart/use-cart.ts
```

```ts
export function useCart() {
  throw new Error("Not implemented");
}
```

## Creating a new service

Place the module under `services/<domain>-service/` and reuse the shared HTTP client. Existing examples include `apiMe` in `services/auth-api-service/auth-api-service.ts` for authenticated `/auth/me`, and `getExpertProfile` in `services/expert-service/expert-service.ts` for public specialist data. Reuse their typed envelope, authentication and error handling where applicable.

Do not hardcode the API origin or invent a `/users/[id]` endpoint. Follow [API-CONTRACTS.md](API-CONTRACTS.md) and actual live `/api/v1` contracts; customer identity stays private.

## Creating a new route

Keep the page thin. Put UI in `components/`.

```text
app/(shop)/experts/[id]/page.tsx
```

```tsx
import { EngineerCard } from "@/components/store/engineer/engineerCard/engineerCard";

type EngineerPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EngineerPage({ params }: EngineerPageProps) {
  const { id } = await params;

  return <EngineerCard />;
}
```

The `id` argument is shown only to illustrate the route contract. Do not invent product data in route files.

## Adding a UI primitive

```text
components/ui/button/button.tsx
```

Primitives belong in `components/ui/` only. They must not contain domain logic. Follow [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) for tokens, variants, and accessibility.

## Adding a utility

```text
lib/utils/example/example.ts
```

Each lib module gets its own kebab-case folder. Do not put files directly in `lib/`.

## RTL development

- The root document is `lang="fa"` and `dir="rtl"`.
- Components should not set `dir` or force RTL unless a nested island must be LTR.
- Prefer logical CSS (`ms`, `me`, `ps`, `pe`, `start`, `end`) over `left` / `right`.
- Body text uses local Kalameh (FaNum) through `--font-kalameh`.

## Current integration and alignment notes

- **API adapters:** live API base includes `/api/v1`. Existing public catalog/content, authentication/registration, uploads, user/engineer workspaces, reviews, notifications, messaging and support adapters are documented in [API-CONTRACTS.md](API-CONTRACTS.md). Do not treat older Phase-1 plans as proof an endpoint is absent.
- **Server API origin:** optional `API_INTERNAL_BASE_URL` overrides the public API base for server calls, useful inside Docker. The media base still derives from the public origin. API failures remain real errors; do not add silent fixture fallbacks.
- **Mock modes:** public catalog fixtures require explicit `NEXT_PUBLIC_USE_MOCK_DATA=true` with no configured live API. All four mock auth config flags are currently false. Explicit development overrides cannot enable mock auth in production. See [MOCK-AUTH.md](MOCK-AUTH.md).
- **HTTP errors:** shared `ApiError` and Persian user-error mapping classify request failures. Preserve input validation, loading, pending, retry and role/session boundaries.
- **Forms:** `/forms` is implemented with real catalog filters and downloads. The original `Design/knowledge/forms.html` is a stub and does not define new categories or calculators.
- **Public services:** `/services/[slug]` uses the live service tree, actual URL filters and pagination; unknown slugs return not-found. Home experts come from `/home` and related professional endpoints. No invented specialists fill an empty API response.
- **Content:** articles, FAQ, knowledge, careers and about/legal retain their existing API/static data sources. Unknown entities return not-found. Preserve approved legal text and avoid fake statistics.
- **SEO:** staging currently has noindex metadata, robots disallow `/`, and global noindex HTTP headers. Optional server-only `SITE_URL` supplies the public origin for sitemap generation; it is separate from the API base. Production indexing is intentionally not enabled by the alignment.
- **Protected UI:** Header, Footer, Login, Registration, OTP and recovery UI, global CSS, font loading and shared protected dependencies remain unchanged. Kalameh FaNum weights 400–700 are retained.
- **Reference safety:** `Design/` is read-only and excluded from Git, ESLint, Prettier and Docker context. Never run whole-reference formatting or import legacy fonts/Bootstrap/scripts.

See [documentation index](README.md), [implementation report](implementation-report.md) and [testing record](testing-and-qa.md). Docker usage is documented in [DOCKER.md](DOCKER.md).
