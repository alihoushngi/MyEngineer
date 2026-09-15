# Mohandes Man Admin — Full Build Tasks (Vite + React + TypeScript + Tailwind)

> **Product:** Staff admin / ops console for Mohandes Man (مهندس من)  
> **Stack:** **React + Vite + TypeScript + Tailwind CSS** (standalone SPA — NOT the Next.js storefront)  
> **Prompt language:** English (give each AI Prompt block to an agent)  
> **UI language:** Persian (`fa`), **RTL-first**  
> **Brand source of truth:** Mohandes Man design tokens from the marketplace (`docs/DESIGN-SYSTEM.md` / `css/globals.css` in the storefront repo)  
> **API source of truth:** storefront `docs/API-CONTRACTS.md` (Laravel Sanctum, `/api/v1`)  
> **Suggested repo name:** `mohandes-man-admin`  
> **Suggested location:** sibling folder next to the storefront, e.g. `../mohandes-man-admin`

---

## How to use

1. Create an empty folder for the admin app (do **not** scaffold inside the Next.js storefront).
2. Run tasks **in order** (Phase 0 → Phase 9). Never skip Phase 0–2.
3. Every agent chat must start with **Shared Constraints** + the task **AI Prompt**.
4. After each task: `pnpm typecheck`, `pnpm lint`, `pnpm test` (when tests exist), and visual check at 375 / 768 / 1280.
5. Tasks marked **API-GATED** must not invent write endpoints. Use honest empty / unavailable UI.

### Priority

| Priority | Meaning |
| --- | --- |
| **P0** | Blocks everything |
| **P1** | Unlocks real backend value |
| **P2** | High ops value |
| **P3** | Polish / density / shared UX |
| **P4** | Future scaffolds only |

---

## Brand design system (LOCKED — use these, not generic blue dashboards)

Agents must **port Mohandes Man organizational colors**, not invent a purple/blue SaaS theme and not use Google Fonts.

### Brand narrative

Persian professional-services marketplace identity:

- **Deep navy** chrome (`primary-deep`) for top bar / brand frame
- **Vivid teal** (`primary`) for primary actions + active nav
- **Steel-blue** (`secondary`) for supporting actions
- **Orange** (`accent`) for rare emphasis only
- White / cool mint canvas, charcoal text, restrained borders
- Dense ops UI, but same brand DNA as the storefront engineer workspace

### Canonical token → hex (approx from storefront OKLCH)

Use CSS variables in `src/styles/tokens.css`. Prefer OKLCH copies from storefront `:root` when possible; hex below is for design reviews.

| Token | Approx hex | Admin usage |
| --- | --- | --- |
| `--primary` | `#01B597` | Primary buttons, active sidebar item, links, focus ring |
| `--primary-hover` | `#009A7F` | Hover |
| `--primary-active` | `#007E68` | Pressed |
| `--primary-subtle` | `#D9F8EF` | Selected rows, soft chips |
| `--primary-deep` | `#172C38` | Top bar, login brand panel, footer strip |
| `--primary-deep-foreground` | `#FCFCFD` | Text/icons on navy |
| `--secondary` | `#66A1BE` | Secondary buttons, info accents |
| `--secondary-subtle` | `#E2F1FA` | Soft info bands |
| `--accent` | `#B15400` | Rare emphasis (export CTA optional, alerts highlight) |
| `--accent-subtle` | `#FFEED1` | Soft warning-adjacent surfaces |
| `--background` | `#FFFFFF` | Page canvas |
| `--background-subtle` | `#F1F9F7` | App body behind cards / content band |
| `--foreground` | `#1B2325` | Body text |
| `--foreground-muted` | `#596264` | Meta, helpers |
| `--surface` | `#FFFFFF` | Cards, panels, inputs |
| `--surface-muted` | `#F5F4F1` | Empty states, zebra optional |
| `--border` | cool low-contrast gray-teal | Separators |
| `--success` | `#266741` | Published / active |
| `--warning` | `#A76200` | Pending / draft |
| `--danger` | `#A43B38` | Destructive / banned / errors |
| `--ring` | `var(--primary)` | `focus-visible` |

### Visual rules for admin

```text
DO
- Navy top bar + white sidebar + teal active state (engineer-workspace pattern)
- Semantic Tailwind utilities mapped to tokens (`bg-primary`, `bg-primary-deep`, `text-muted-foreground`)
- Lucide outline icons (20–24px) with Persian labels — never emoji icons
- Kalameh FaNum local font files (copy from storefront `fonts/_Woff2` or shared package) — NEVER Google Fonts
- Dense spacing scale (8–32px); comfortable 44px touch targets on mobile
- Tables: desktop table + mobile stacked cards; overflow-x-auto only inside table wrappers
- Motion 150–300ms opacity/transform; respect prefers-reduced-motion
- One primary CTA per view; secondary = outline/ghost

DON'T
- Purple / indigo AI-default themes
- Flat gray Ant-Design clones
- Glassmorphism on every card
- Pill soup, floating promo badges, fake KPI charts without data
- Raw hex in components (tokens only)
- Dark-mode-first OLED admin (light brand UI; optional `.dark` tokens later only)
```

### Design dials (locked)

| Dial | Value | Meaning |
| --- | --- | --- |
| Variance | 3/10 | Centered, minimal, consistent |
| Motion | 3/10 | Subtle feedback only |
| Density | 8/10 | Dashboard-dense lists/forms |

### Perf / a11y assumptions

| Assumption | Value |
| --- | --- |
| Primary device | Desktop fiber (staff), mobile usable |
| LCP target | ≤ 2000ms login + shell |
| INP | ≤ 200ms |
| CLS | ≤ 0.1 |
| SEO | Auth-walled SPA — `noindex` in `index.html` |
| Bundle budget | ≤ 200KB gzip initial; ≤ 80KB gzip per lazy route |
| WCAG | AA |
| A11y owner | Frontend lead on this admin repo |

---

## Shared Constraints (prepend to EVERY AI prompt)

```text
PROJECT: Mohandes Man Admin (`mohandes-man-admin`)
STACK: Vite + React + TypeScript + Tailwind CSS + React Router + TanStack Query + React Hook Form + Zod + Lucide
PACKAGE MANAGER: pnpm only
UI: Persian, dir=rtl, lang=fa

HARD RULES
1. This is a STANDALONE Vite SPA. Do not put admin code inside the Next.js storefront repo unless the user explicitly says so.
2. Brand tokens MUST match Mohandes Man (navy + teal + steel-blue + orange). Never invent a blue/purple dashboard palette. Never load Google Fonts. Use local Kalameh FaNum.
3. Style ONLY with semantic token utilities. No raw brand hex in components.
4. Native `fetch` only — no Axios. No MUI / Ant Design / Chakra / Bootstrap / Redux.
5. Strict TypeScript. No `any`, no `@ts-ignore` without a documented reason.
6. Feature folders under `src/features/<feature>/`. Shared UI under `src/components/ui/`. Layout under `src/layouts/`. API under `src/services/` + `src/lib/api/`.
7. Prefer composition, small files, no unnecessary abstractions. No barrel `index.ts` files unless the task explicitly allows one for a feature public API (default: no barrels).
8. Auth: Laravel Sanctum Bearer token from login/role endpoints. Persist token securely (prefer memory + httpOnly cookie via future BFF; for SPA MVP use secure cookie library or sessionStorage with XSS mitigations documented — never localStorage for long-lived tokens without justification).
9. Roles allowed into app: `admin` and `assistant` only (via `/auth/me` + `/auth/role`).
10. Respect API contracts from the storefront `docs/API-CONTRACTS.md`. Do NOT invent write endpoints. For missing APIs: scaffold + "نیاز به قرارداد API" empty state.
11. Every interactive screen needs: loading, empty, error, unauthorized/forbidden, success feedback (toast or inline).
12. Accessibility: visible labels, focus-visible rings using `--ring`, keyboard nav, 44px targets on touch, contrast ≥ 4.5:1.
13. Lazy-load feature routes. Keep the shell lean.
14. After coding: pnpm typecheck && pnpm lint && pnpm test (relevant). Report commands + results.
15. Scope only to the current task. No drive-by refactors.

REFERENCE ENDPOINTS (backend)
- Auth: POST /auth/login, POST /auth/role, GET /auth/me, POST /auth/logout, sessions
- Admin: GET /admin/professionals, GET /admin/professionals/export
- Blogs: CRUD + publish/unpublish (admin/assistant, phase 2)
- Blog categories: CRUD (phase 2)
- Tickets: rooms list/detail/reply/close (admin sees all)
- Careers: CRUD + applicants (admin override)
API base: VITE_API_BASE_URL (never hardcode)
```

---

## Phase 0 — Product & repo bootstrap

### TASK 0.1 — Product brief + IA + route map
**Priority:** P0 · **Estimate:** M

#### AI Prompt

```text
GOAL
Create `docs/PRODUCT.md` and `docs/IA.md` for Mohandes Man Admin (Vite SPA).

INCLUDE
1. Purpose / non-goals (not storefront, not engineer panel, not customer account).
2. Actors: admin vs assistant RBAC matrix (what is known from API; mark unknowns).
3. Full route map:
   /login
   /
   /professionals
   /blogs
   /blogs/new
   /blogs/:id/edit
   /blog-categories
   /tickets
   /tickets/:id
   /careers
   /careers/:id
   /settings/sessions
   + future placeholders: /users, /services, /moderation, /requests
4. Navigation groups (Overview, Professionals, Content, Support, Careers, Account).
5. Brand summary (navy/teal tokens) and density rules.
6. API mapping table per route.
7. Out-of-scope / API-gated list.

Do not write application code.
```

---

### TASK 0.2 — Scaffold Vite + React + TS + Tailwind
**Priority:** P0 · **Depends on:** 0.1 · **Estimate:** M

#### AI Prompt

```text
GOAL
Scaffold `mohandes-man-admin` from zero with pnpm.

REQUIREMENTS
1. `pnpm create vite@latest` → React + TypeScript template (or equivalent current Vite React-TS).
2. Tailwind CSS (v4 preferred if stable with Vite; otherwise v3) + PostCSS setup.
3. Path alias `@/` → `src/`.
4. ESLint + Prettier + `typescript` strict.
5. Scripts: `dev`, `build`, `preview`, `lint`, `typecheck`, `test`.
6. Vitest + Testing Library for unit/component tests.
7. `index.html`: lang=fa, dir=rtl, meta robots noindex.
8. Folder skeleton:
   src/
     app/ (router, providers)
     components/ui/
     components/common/
     features/
     layouts/
     lib/ (cn, env, api, utils)
     services/
     hooks/
     types/
     styles/ (tokens.css, globals.css)
     assets/fonts/ (placeholder for Kalameh)
   docs/
   public/
9. README: setup, env vars (`VITE_API_BASE_URL`, `VITE_MEDIA_BASE_URL`), scripts.
10. `.env.example` with those vars.
11. Do NOT install MUI/Ant/Axios/Redux.

ACCEPTANCE
- `pnpm install && pnpm dev` runs.
- `pnpm typecheck` and `pnpm lint` pass on empty app shell.
- RTL Persian hello page placeholder visible.
```

---

### TASK 0.3 — Brand tokens, Kalameh font, Tailwind semantic theme
**Priority:** P0 · **Depends on:** 0.2 · **Estimate:** M

#### AI Prompt

```text
GOAL
Implement the Mohandes Man brand design system in the Vite admin app.

REQUIREMENTS
1. Copy/port OKLCH semantic tokens from storefront `css/globals.css` `:root` into `src/styles/tokens.css`.
2. Map Tailwind theme to semantic colors: background, foreground, primary, primary-deep, secondary, accent, muted, border, success, warning, danger, ring, surface*.
3. Add typography utilities inspired by storefront type scale (type-h1…type-caption, type-button) adapted for dense admin.
4. Install local Kalameh FaNum woff2 files under `src/assets/fonts/` (obtain from storefront `fonts/_Woff2`). Wire `@font-face`. Set `font-family` on `html`.
5. Implement `cn()` helper (`clsx` + `tailwind-merge`).
6. Base styles: smooth focus rings, selection color using primary-subtle, reduced-motion media query.
7. Create a temporary `/design-lab` route (dev-only or linked from README) showing:
   - Color swatches for all tokens
   - Button variants
   - Text samples
   - Status badges
8. Document in `docs/DESIGN.md` the locked brand rules (navy chrome, teal actions, no Google Fonts).

ACCEPTANCE
- No component uses raw hex for brand colors.
- Primary button is teal; top-bar preview is navy.
- Font renders Persian numbers correctly (FaNum).
```

---

## Phase 1 — App shell & design system primitives

### TASK 1.1 — UI primitive kit
**Priority:** P0 · **Depends on:** 0.3 · **Estimate:** L

#### AI Prompt

```text
GOAL
Build accessible UI primitives under `src/components/ui/` using Radix primitives where helpful + CVA + brand tokens.

AUTHORIZED DEPS (install only if missing): `radix-ui` or individual `@radix-ui/react-*`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `sonner` (toasts).

PRIMITIVES (minimum)
Button, Input, Textarea, Label, Checkbox, Switch, Select, Dialog, DropdownMenu, Sheet/Drawer, Tabs, Badge, Skeleton, Spinner, Separator, Tooltip, Avatar, Table, Pagination, EmptyState, Alert, Card (restrained — border, no heavy shadow).

RULES
- Folder per component: `components/ui/button/button.tsx` (no barrels).
- Variants use semantic tokens only.
- Default button height comfortable (≥40–44px).
- Table includes overflow wrapper guidance in docs comment.
- Write light Vitest a11y/behavior tests for Button + Dialog focus trap basics if practical.

OUT: no feature screens yet.
```

---

### TASK 1.2 — App providers, router, query client
**Priority:** P0 · **Depends on:** 0.2 · **Estimate:** M

#### AI Prompt

```text
GOAL
Wire application infrastructure.

REQUIREMENTS
1. React Router v7 (or v6) with lazy routes.
2. TanStack Query client with sensible defaults (retry policy, staleTime).
3. Toast provider (sonner) styled with tokens.
4. Direction provider forcing RTL.
5. Env module `src/lib/env/env.ts` reading `import.meta.env.VITE_*` with Zod validation.
6. ErrorBoundary + fallback UI.
7. 404 page in Persian.

ACCEPTANCE
- Navigating unknown path shows branded 404.
- QueryProvider wraps app without prop-drilling hacks.
```

---

### TASK 1.3 — Admin layout chrome (professional design)
**Priority:** P0 · **Depends on:** 1.1, 1.2, 0.3 · **Estimate:** L

#### AI Prompt

```text
GOAL
Build the authenticated admin shell with premium Mohandes Man branding.

LAYOUT
- Desktop: sticky navy top bar (`bg-primary-deep text-primary-deep-foreground`) + white sidebar + content on `bg-background-subtle`.
- Sidebar: brand mark + Persian nav labels + Lucide icons; active item `bg-primary-subtle text-primary` + teal indicator bar (RTL logical).
- Top bar: page title slot, user menu (name/role), logout.
- Mobile: top bar + Sheet sidebar OR bottom nav ≤5 primary destinations + "بیشتر" sheet.
- Content: `container` max width ~80rem, padding 16/24.

NAV ITEMS (Persian labels)
داشبورد، متخصصان، مقالات، دسته‌بندی مقالات، تیکت‌ها، فرصت‌های شغلی، نشست‌ها

DESIGN QUALITY BAR
- Feels like a real product ops console, not a template.
- No glass cards in shell.
- Subtle transitions 150–200ms on nav active/hover.
- Safe-area padding for mobile notches.

Include a placeholder Outlet dashboard page.
```

---

## Phase 2 — Auth & HTTP

### TASK 2.1 — API client (envelope + Bearer + binary)
**Priority:** P0 · **Depends on:** 1.2 · **Estimate:** M

#### AI Prompt

```text
GOAL
Implement `src/lib/api/http-client.ts` and helpers.

REQUIREMENTS
1. Base URL from env.
2. JSON helpers: get/post/put/patch/delete.
3. Unwrap `{ success, message, data, meta }` envelope; typed errors.
4. Attach `Authorization: Bearer <token>` from auth session module.
5. Binary download helper for Excel export (blob).
6. Timeout + AbortSignal support.
7. Unit tests for URL building, header merge, envelope unwrap, error mapping.

NO Axios.
```

---

### TASK 2.2 — Auth domain (login, role, me, logout, guards)
**Priority:** P0 · **Depends on:** 2.1 · **Estimate:** L

#### AI Prompt

```text
GOAL
Full auth for `admin` / `assistant`.

FLOWS
1. Login: national ID + password → POST /auth/login
2. If multi-role: role picker → POST /auth/role with admin|assistant
3. Hydrate user via GET /auth/me
4. Reject non-staff roles with forbidden screen
5. Logout current + logout all
6. Sessions list/delete for settings page (can stub UI later in 2.4)

SESSION
- Provide `AuthProvider` + `useAuth`.
- Route guards: `PublicOnlyRoute`, `ProtectedStaffRoute`.
- Persist token with documented strategy (prefer httpOnly via lightweight Vite proxy later; MVP: in-memory + sessionStorage with clear security notes in docs/SECURITY.md).

TESTS
- Role gate unit tests.
- Safe redirect helper (open-redirect prevention).
```

---

### TASK 2.3 — Login page (branded)
**Priority:** P0 · **Depends on:** 2.2, 0.3 · **Estimate:** M

#### AI Prompt

```text
GOAL
Design and implement `/login` as a premium staff gate.

DESIGN
- Split layout desktop: navy brand panel (logo, product name «پنل مدیریت مهندس من», one short trust line) + white form column.
- Mobile: stacked navy header band + form.
- Fields: کد ملی، گذرواژه؛ show/hide password; submit loading state.
- Optional second step: انتخاب نقش.
- Errors inline near fields + form-level alert.
- No marketing clutter. No fake stats.

A11Y
- Labels visible; Enter submits; focus order correct.

ACCEPTANCE
- Successful staff login enters shell.
- Engineer/user-only accounts see forbidden message.
```

---

### TASK 2.4 — Sessions settings page
**Priority:** P2 · **Depends on:** 2.2, 1.3 · **Estimate:** S

#### AI Prompt

```text
GOAL
`/settings/sessions` list devices from GET /auth/sessions and allow DELETE /auth/sessions/{token} + logout-all.

Persian copy, confirm dialogs, empty/loading/error states.
```

---

## Phase 3 — Shared admin patterns

### TASK 3.1 — DataTable + FilterBar + PageHeader + ConfirmDialog
**Priority:** P1 · **Depends on:** 1.1, 1.3 · **Estimate:** L

#### AI Prompt

```text
GOAL
Build reusable admin patterns under `src/components/common/`.

1. PageHeader: title, description, primary/secondary actions
2. FilterBar: search + selects + clear; sync with URL search params
3. DataTable: columns, sorting slot, row actions, selection checkbox slot, loading skeleton, empty
4. MobileList: card rows alternative used below md
5. ConfirmDialog: destructive/neutral
6. StatusBadge mapping: success/warning/danger/info using tokens
7. QueryState: standardized loading/empty/error wrappers

UX RULES from ui-ux-pro-max:
- Tables must not break viewport; use overflow-x-auto
- Bulk action bar when selection > 0 (even if features adopt later)
- Debounce search with useDeferredValue or 300ms debounce
- Submit feedback always visible

Add Story-less demo usage on a hidden `/dev/patterns` route (optional, remove before prod).
```

---

### TASK 3.2 — Form kit standards
**Priority:** P1 · **Depends on:** 1.1 · **Estimate:** M

#### AI Prompt

```text
GOAL
Standardize forms with React Hook Form + Zod.

- Field wrapper with label, hint, error
- Disable submit while pending; prevent double submit
- Persian validation messages
- Document patterns in `docs/FORMS.md`

Build one example schema test.
```

---

## Phase 4 — Dashboard

### TASK 4.1 — Overview dashboard
**Priority:** P1 · **Depends on:** 1.3, 2.2 · **Estimate:** M

#### AI Prompt

```text
GOAL
`/` dashboard — orientation, not fake analytics.

CONTENT
- Greeting + role chip
- Shortcut tiles to Professionals, Blogs, Tickets, Careers (teal icon wells on white cards, navy titles)
- Optional live counts ONLY if cheap authenticated GETs exist; otherwise qualitative CTAs
- Recent shortcuts / empty honest states

DESIGN
- One composition, generous whitespace still dense enough for ops
- No charts library unless real metrics API exists (it does not — do not add Recharts)
```

---

## Phase 5 — Professionals (API ready)

### TASK 5.1 — Professionals service
**Priority:** P1 · **Depends on:** 2.1 · **Estimate:** M

#### AI Prompt

```text
GOAL
`src/services/professionals-admin-service/` for:
- GET /admin/professionals (filters/pagination per OpenAPI)
- GET /admin/professionals/export (blob)

Strict types + mappers + Vitest for query serialization.
```

---

### TASK 5.2 — Professionals directory UI + export
**Priority:** P1 · **Depends on:** 5.1, 3.1 · **Estimate:** L

#### AI Prompt

```text
GOAL
`/professionals` staff directory.

FEATURES
- Search/filter/paginate
- Show mobile numbers (admin-only intentional)
- Status badges
- Detail drawer or `/professionals/:id` read-only summary (may enrich via public professional GET if useful)
- Export Excel for current filters with loading toast
- NO ban/activate mutations unless API exists (read-only status)

DESIGN
- Desktop DataTable; mobile cards
- Export button uses primary or accent sparingly
```

---

## Phase 6 — Content CMS (API ready)

### TASK 6.1 — Blog + category services
**Priority:** P1 · **Depends on:** 2.1 · **Estimate:** M

#### AI Prompt

```text
GOAL
Services for blogs + blog-categories phase-2 admin endpoints (create/update/delete/publish/unpublish).

XSS rule: never dangerouslySetInnerHTML unsanitized; if preview needed, sanitize or render plaintext/Markdown subset only.
```

---

### TASK 6.2 — Blog categories CRUD UI
**Priority:** P1 · **Depends on:** 6.1, 3.1, 3.2 · **Estimate:** M

#### AI Prompt

```text
GOAL
`/blog-categories` list + create/edit dialog + delete confirm.
Persian forms, RBAC staff-only, full query states.
```

---

### TASK 6.3 — Blog posts CMS UI
**Priority:** P1 · **Depends on:** 6.1, 6.2 · **Estimate:** L

#### AI Prompt

```text
GOAL
Routes `/blogs`, `/blogs/new`, `/blogs/:id/edit`.

FEATURES
- List with status chips (draft/published)
- Editor form fields matching API schema (no fake WYSIWYG scope creep unless API stores HTML and you use a lightweight controlled textarea first)
- Publish / Unpublish actions
- Delete confirm
- Category select
- Sticky action bar on desktop

DESIGN
- Calm editor, navy page header, teal primary save
- Success toasts on publish
```

---

## Phase 7 — Tickets & Careers

### TASK 7.1 — Tickets service + inbox/thread UI
**Priority:** P2 · **Depends on:** 2.1, 3.1 · **Estimate:** L

#### AI Prompt

```text
GOAL
`/tickets` and `/tickets/:id` using:
GET/POST rooms, reply, close.

UI
- Inbox list (admin sees all)
- Thread + composer sticky bottom
- Close ticket with confirm
- Closed threads: composer disabled

Mobile conversation pattern; Lucide icons; tokenized bubbles (staff vs user) without neon colors — use surface-muted + primary-subtle.
```

---

### TASK 7.2 — Careers admin
**Priority:** P2 · **Depends on:** 2.1, 3.1, 3.2 · **Estimate:** L

#### AI Prompt

```text
GOAL
`/careers` + `/careers/:id` (+ applicants section) using careers endpoints with admin privileges.

List/create/edit/delete + view applicants read-only.
Full states + Persian copy + confirm destructive actions.
```

---

## Phase 8 — API-gated scaffolds (future)

### TASK 8.1 — Placeholder modules
**Priority:** P4 · **Depends on:** 1.3 · **Estimate:** M

#### AI Prompt

```text
GOAL
Add nav + placeholder pages that clearly state missing backend contracts:

- `/users` — customer directory/ban/activate
- `/services` — service taxonomy CMS (optional read-only tree via public GET /services)
- `/content-hub` — FAQ/knowledge/sliders/testimonials/brands/teams (read-only GETs optional)
- `/moderation` — comments/reviews approval queues
- `/requests` — marketplace service-request ops

Each page: Persian explanation, required endpoint checklist, disabled primary actions.
Update `docs/PRODUCT.md` future section.
Do not fake mutations.
```

---

## Phase 9 — Hardening, QA, release

### TASK 9.1 — Security hardening
**Priority:** P1 · **Depends on:** Phases 2–7 · **Estimate:** M

#### AI Prompt

```text
GOAL
Ship `docs/SECURITY.md` and fix gaps.

CHECKLIST
- Route guards on all private pages
- Token not logged; no national ID in analytics
- Open redirect prevention
- Generic login errors
- RBAC assistant vs admin enforced in UI AND query layer if permissions differ
- Export requires auth header
- Dependency audit `pnpm audit` (report only; fix high if straightforward)
- CSP recommendations for Vite deploy

Implement fixes, not only notes.
```

---

### TASK 9.2 — Automated tests + Manual QA
**Priority:** P2 · **Depends on:** 5.2, 6.3, 7.1 · **Estimate:** M

#### AI Prompt

```text
GOAL
1. Unit tests for api client, auth gates, mappers, zod schemas.
2. Component tests for DataTable empty/loading and Login validation.
3. `docs/QA.md` manual checklist (login, forbidden role, professionals+export, blog publish flow, ticket reply/close, careers, mobile RTL, keyboard).
4. Do not add Playwright unless user approves — propose as optional follow-up.
```

---

### TASK 9.3 — Performance pass
**Priority:** P3 · **Depends on:** 1.3 · **Estimate:** S

#### AI Prompt

```text
GOAL
- Confirm route-level code splitting
- Analyze bundle (`pnpm build` + rollup visualizer ONLY if authorized; otherwise report Vite chunk sizes from build output)
- Meet budgets: ≤200KB gzip initial, ≤80KB per lazy page (best-effort; report real numbers)
- Ensure Kalameh subset/files don’t block LCP excessively (font-display: swap)
- Images via optimized tags if any
```

---

### TASK 9.4 — Visual polish & design QA (final)
**Priority:** P1 · **Depends on:** all feature phases · **Estimate:** M

#### AI Prompt

```text
GOAL
Final professional design pass across the entire admin app using Mohandes Man brand.

CHECK AGAINST
- docs/DESIGN.md + brand table in ADMIN-PANEL-TASKS.md
- ui-ux-pro-max pre-delivery: no emoji icons, cursor-pointer, hover 150–300ms, contrast, focus visible, reduced-motion, breakpoints 375/768/1024/1440
- Consistent page headers, filter bars, table densities
- Login + shell feel cohesive (navy/teal)
- Empty/error illustrations restrained (Lucide + short Persian copy) — no generic undraw clutter unless branded

DELIVER
- Fix inconsistencies
- Screenshots list in docs/QA.md (paths staff should capture)
- Mark tracking checklist complete for design rows
```

---

### TASK 9.5 — Production build & deploy docs
**Priority:** P2 · **Depends on:** 9.1–9.4 · **Estimate:** S

#### AI Prompt

```text
GOAL
- `pnpm build` succeeds
- `docs/DEPLOY.md`: static hosting (Nginx/Cloudflare Pages), env vars, API CORS notes for admin origin, cache headers for hashed assets, noindex
- Optional Dockerfile (nginx serving `dist/`) — only if useful; keep simple
- Version badge / app version from package.json in shell footer quietly
```

---

## Suggested sprints (RICE-aware)

| Sprint | Tasks | Outcome |
| --- | --- | --- |
| **S0** | 0.1 → 0.3 | Branded Vite foundation |
| **S1** | 1.1 → 1.3, 2.1 → 2.3 | Shell + auth login |
| **S2** | 3.1 → 3.2, 4.1, 5.1 → 5.2 | Patterns + professionals |
| **S3** | 6.1 → 6.3 | Blog CMS |
| **S4** | 7.1 → 7.2, 2.4 | Tickets + careers + sessions |
| **S5** | 8.1, 9.1 → 9.5 | Scaffolds + harden + ship |

---

## Meta-prompt (start any task)

```text
Implement TASK <ID> from docs/ADMIN-PANEL-TASKS.md for mohandes-man-admin (Vite + React + TS + Tailwind).

Prepend Shared Constraints from that file.
Follow the locked Mohandes Man brand tokens (navy primary-deep, teal primary) — never a generic blue/purple admin theme.
Read docs/PRODUCT.md, docs/DESIGN.md, and the storefront API contracts as needed.
Before coding: restate acceptance in Gherkin; list files to add/change.
After coding: run pnpm typecheck && pnpm lint && relevant pnpm test; report results, risks, and manual QA steps.
```

---

## Tracking checklist

| ID | Task | P | Status |
| --- | --- | --- | --- |
| 0.1 | Product + IA docs | P0 | ☐ |
| 0.2 | Vite/React/TS/Tailwind scaffold | P0 | ☐ |
| 0.3 | Brand tokens + Kalameh + theme | P0 | ☐ |
| 1.1 | UI primitives | P0 | ☐ |
| 1.2 | Router + Query + providers | P0 | ☐ |
| 1.3 | Admin shell chrome | P0 | ☐ |
| 2.1 | HTTP client | P0 | ☐ |
| 2.2 | Auth domain + guards | P0 | ☐ |
| 2.3 | Branded login page | P0 | ☐ |
| 2.4 | Sessions settings | P2 | ☐ |
| 3.1 | DataTable/Filter/Header patterns | P1 | ☐ |
| 3.2 | Form kit standards | P1 | ☐ |
| 4.1 | Dashboard | P1 | ☐ |
| 5.1 | Professionals service | P1 | ☐ |
| 5.2 | Professionals UI + export | P1 | ☐ |
| 6.1 | Blog services | P1 | ☐ |
| 6.2 | Blog categories UI | P1 | ☐ |
| 6.3 | Blog CMS UI | P1 | ☐ |
| 7.1 | Tickets console | P2 | ☐ |
| 7.2 | Careers admin | P2 | ☐ |
| 8.1 | API-gated scaffolds | P4 | ☐ |
| 9.1 | Security hardening | P1 | ☐ |
| 9.2 | Tests + QA doc | P2 | ☐ |
| 9.3 | Performance pass | P3 | ☐ |
| 9.4 | Final visual/design QA | P1 | ☐ |
| 9.5 | Build + deploy docs | P2 | ☐ |

---

## Relationship to the Next.js storefront

| Concern | Storefront (`MyEnginner`) | Admin (this task set) |
| --- | --- | --- |
| Stack | Next.js App Router | **Vite + React SPA** |
| Audience | Guests, customers, engineers | Staff (`admin` / `assistant`) |
| Brand | Mohandes Man tokens | **Same tokens** (ported) |
| API | Public + mock panels | Sanctum staff endpoints |
| Coupling | — | Share OpenAPI contracts + fonts/tokens only |

Do **not** implement `/admin` inside the Next.js app unless product explicitly changes this decision.
