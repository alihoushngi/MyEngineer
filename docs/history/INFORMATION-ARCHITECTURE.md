# Information Architecture

> Historical planning snapshot, preserved for decision context. This is not the current implementation or an instruction for active work. See the [current architecture](../ARCHITECTURE.md), [design reference audit](../design-reference-audit.md), and [documentation index](../README.md). The local client source is `Design/`; earlier absolute paths and product-scope exclusions below describe a previous phase. Header, Footer, Login, and Registration are excluded from this alignment.

Implementation blueprint for the Mohandes Man storefront. This document turns
[LEGACY-AUDIT.md](LEGACY-AUDIT.md), [PRODUCT-FLOWS.md](PRODUCT-FLOWS.md), and
[PHASE-1-SCOPE.md](PHASE-1-SCOPE.md) into a route, layout, and page-composition
contract.

It does **not** authorize product implementation in this task.

Related:

- [COMPONENT-ARCHITECTURE.md](COMPONENT-ARCHITECTURE.md) — components, server/client, reuse
- [STATE-MATRIX.md](STATE-MATRIX.md) — loading / empty / error / validation states
- [ARCHITECTURE.md](../ARCHITECTURE.md) — folder and coding rules
- [DESIGN-SYSTEM.md](../DESIGN-SYSTEM.md) — visual and accessibility primitives

Classification used below matches Task 01:

| Label                          | Meaning                                                         |
| ------------------------------ | --------------------------------------------------------------- |
| **SOURCE REQUIREMENT**         | Present in employer legacy files                                |
| **UX COMPLETION**              | Required for a coherent product; missing or broken in legacy    |
| **BUSINESS DECISION REQUIRED** | Cannot be decided from source                                   |
| **API CONTRACT REQUIRED**      | Backend path, payload, or pagination is unknown — do not invent |
| **NEEDS CONFIRMATION**         | Visible in legacy; not automatically Phase 1                    |

---

## 1. Product model

Mohandes Man is a Persian, RTL, mobile-first storefront that helps customers
**find building specialists** and helps specialists **join the platform**.

Primary actors:

| Actor        | Goal                                           | Auth in Phase 1                                      |
| ------------ | ---------------------------------------------- | ---------------------------------------------------- |
| Customer     | Discover a service, inspect an expert, contact | None. No customer account route                      |
| Specialist   | Complete the 9-step registration wizard        | Wizard-owned challenge (OTP), not a general auth app |
| Guest reader | Articles, FAQ, knowledge, about, legal         | Public                                               |

Product language is **متخصص / expert**, covering engineers, contractors, and
trades. Do not name routes or domain folders `engineer`.

There is **no standalone expert directory** in the legacy product. Experts
appear as **results of a service** (and, after UX completion, of search). Do
not create `/experts` as an index because a listing HTML file does not exist.

---

## 2. IA principles

1. Legacy HTML files are not a 1:1 route list. Consolidate duplicated templates.
2. One service-discovery architecture serves all six services.
3. Identity resources use `[id]`. Public SEO resources use `[slug]` or
   `[category]`.
4. City and filters on listing pages live in the **URL**, not `localStorage`
   alone ([PRODUCT-FLOWS.md](PRODUCT-FLOWS.md) migration note).
5. Customer city selection and registration service-area are **different
   products**. They do not share one component model.
6. Broken `#` links are not routes. Unmapped tiles are hidden or disabled until
   product maps them — never shipped as `href="#"`.
7. Do not invent FAQ, knowledge, article, or skill copy for contaminated pages.
8. Chat, save, share, review submission, customer accounts, payments, and
   engineering-forms download stay out of Phase 1 UI until confirmed
   ([PHASE-1-SCOPE.md](PHASE-1-SCOPE.md)).
9. `app/layout.tsx` remains a Server Component. Pages stay thin.

---

## 3. Route map

```text
app/
├── layout.tsx                          Root (html/lang/dir, fonts, providers)
├── page.tsx                            REMOVE when home moves into (shop)
├── not-found.tsx                       Site-wide 404 (Phase 1 chrome)
├── dev/                                Development only; 404 in production
│   └── design-system/
│
├── (shop)/                             Public storefront
│   ├── layout.tsx                      Store header + footer
│   ├── error.tsx
│   ├── loading.tsx
│   ├── page.tsx                        Home  /
│   ├── search/page.tsx                 Search results  /search
│   ├── services/[slug]/page.tsx        Service discovery
│   ├── experts/[id]/page.tsx           Expert profile
│   ├── articles/page.tsx               Articles hub / list
│   ├── articles/categories/[slug]/
│   ├── articles/[slug]/page.tsx        Article detail
│   ├── faq/page.tsx
│   ├── faq/[category]/page.tsx
│   ├── knowledge/page.tsx
│   ├── knowledge/[category]/page.tsx
│   ├── engineering-forms/page.tsx      Reserved; not auto Phase 1
│   ├── about/page.tsx
│   ├── terms/page.tsx
│   └── privacy-policy/page.tsx
│
└── (auth)/                             Focused flows (no store chrome)
    ├── layout.tsx                      Minimal brand chrome
    └── expert-registration/
        ├── layout.tsx                  Wizard shell + progress
        ├── page.tsx                    Step 1  /expert-registration
        ├── otp/page.tsx                Step 2
        ├── service-area/page.tsx       Step 3
        ├── expertise/page.tsx          Step 4
        ├── personal-info/page.tsx      Step 5
        ├── education/page.tsx          Step 6
        ├── engineering-organization/   Step 7
        ├── professional-resume/        Step 8
        ├── portfolio/page.tsx          Step 9
        └── complete/page.tsx           Success (UX COMPLETION)
```

Route groups `(shop)` and `(auth)` do not appear in the URL.

### 3.1 Tree (public URLs)

```text
/
├── search
├── services/[slug]
├── experts/[id]
├── articles
│   ├── categories/[slug]
│   └── [slug]
├── faq
│   └── [category]
├── knowledge
│   └── [category]
├── engineering-forms          ← reserved, NEEDS CONFIRMATION
├── about
├── terms
├── privacy-policy
└── expert-registration
    ├── otp
    ├── service-area
    ├── expertise
    ├── personal-info
    ├── education
    ├── engineering-organization
    ├── professional-resume
    ├── portfolio
    └── complete
```

### 3.2 Routes that must not exist

| Tempting legacy mapping        | Decision                                                  |
| ------------------------------ | --------------------------------------------------------- |
| `/resume` or `/resume.html`    | Replace with `/experts/[id]`                              |
| One page per service HTML file | One `/services/[slug]` implementation                     |
| `/articles/all`                | Consolidated into `/articles`                             |
| `/article/[slug]` (singular)   | Use `/articles/[slug]`                                    |
| `/FAQs`, `/landig-faq`         | Use `/faq`                                                |
| `/knowledge-page`              | Use `/knowledge/[category]`                               |
| `/engineers/[id]`              | Foundation example only. Product route is `/experts/[id]` |
| `/sign-in`, `/verify-otp`      | Foundation examples. No customer auth route in Phase 1    |
| `/experts` index               | Not a legacy product surface                              |
| `/services/calculations`       | Do not add until taxonomy P0 is decided                   |
| Nested drawing URLs            | Tabs stay query params until product says otherwise       |
| Chat / saved-experts / account | No routes until confirmation                              |

---

## 4. Consolidation decisions

| Legacy files                                           | Modern model                                                                              | Why                                                                               |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Six `services/*.html` (two visual generations)         | One route `/services/[slug]` + config-driven copy/filters/tabs                            | Same product: city + filters + expert list + profile. Unify on the design system. |
| `article-landing.html` + `all-articles.html`           | `/articles`                                                                               | Same list surface; hub sections are composition, not a second route.              |
| `article-sum.html`                                     | `/articles/categories/[slug]`                                                             | Distinct category chrome/SEO.                                                     |
| `sample-article.html` + broken `/article/...` cards    | `/articles/[slug]`                                                                        | Canonical slug.                                                                   |
| `landig-faq.html` + `faq-land-surveying.html`          | `/faq` + `/faq/[category]`                                                                | Generic category route; do not invent other categories’ questions.                |
| `knowledge-category.html` + `knowledge-surveying.html` | `/knowledge` + `/knowledge/[category]`                                                    | Same as FAQ.                                                                      |
| `auth/step1.html`–`step9.html`                         | Nested routes under `/expert-registration` with one wizard layout                         | One flow, shareable step URLs, shared chrome. See §8.                             |
| Search offcanvas copied onto seven pages               | One `SearchSurface` in store chrome + `/search` results                                   | Deduplicate; complete the missing results UX.                                     |
| City offcanvas copied onto seven pages                 | One `CitySelector` overlay                                                                | Deduplicate.                                                                      |
| Popular services / drawing tiles / footer contractors  | Config-mapped links into existing service routes + optional `tab` query; hide if unmapped | Do not ship `#`.                                                                  |
| Home + profile review OTP modals                       | Not a route. Deferred with the review feature                                             | Customer auth model unresolved.                                                   |

**Tabs vs nested service routes:** workers (`استادکار` / `پیمانکار`) and drawing
(معماری / سازه / برق / مکانیک) stay on the parent service URL with `?tab=`.
Do not create `/services/drawing/architecture` until product decides
([PRODUCT-FLOWS.md](PRODUCT-FLOWS.md) P0 taxonomy).

**محاسبات ساختمان:** appears in search and registration, not as a home tile.
**BUSINESS DECISION REQUIRED.** Do not add a seventh service route.

---

## 5. Service slug catalog

| Slug                      | Persian label           | Tabs (query `tab`, until nested routes are decided)           | Phase 1 |
| ------------------------- | ----------------------- | ------------------------------------------------------------- | ------- |
| `land-surveying`          | نقشه برداری             | None                                                          | CORE    |
| `construction-workers`    | استادکار و پیمانکار     | `trades` \| `contractors`                                     | CORE    |
| `drawing`                 | ترسیم نقشه              | `architecture` \| `structure` \| `electrical` \| `mechanical` | CORE    |
| `interior-design`         | طراحی نما و داخلی       | None until product splits facade/interior                     | CORE    |
| `building-permit`         | پروانه ساخت و پایان کار | None until product splits پروانه / پایان کار                  | CORE    |
| `administrative-services` | خدمات اداری             | None until product splits شهرداری / ثبت / بنیاد               | CORE    |

Tab values are URL tokens (LTR). Labels stay Persian in UI config.

Popular-service and drawing-consultation tiles must map onto these slugs
(and tabs) once product provides the mapping. **BUSINESS DECISION REQUIRED.**

---

## 6. Route table

| Route                                           | Purpose                                | Layout                   | Access                  | Main composition         | Phase                                                                  |
| ----------------------------------------------- | -------------------------------------- | ------------------------ | ----------------------- | ------------------------ | ---------------------------------------------------------------------- |
| `/`                                             | Discovery landing and join entry       | Shop                     | Public                  | `HomePage`               | CORE PHASE 1                                                           |
| `/search`                                       | Full search results after query submit | Shop                     | Public                  | `SearchResultsPage`      | CORE PHASE 1 (**UX COMPLETION**; legacy had no results)                |
| `/services/[slug]`                              | Find experts for one service           | Shop                     | Public                  | `ServiceDiscoveryPage`   | CORE PHASE 1                                                           |
| `/experts/[id]`                                 | Public specialist profile + contact    | Shop                     | Public                  | `ExpertProfilePage`      | CORE PHASE 1                                                           |
| `/articles`                                     | Articles hub and full list             | Shop                     | Public                  | `ArticlesPage`           | CONTENT SUPPORTING                                                     |
| `/articles/categories/[slug]`                   | Articles in one category               | Shop                     | Public                  | `ArticleCategoryPage`    | CONTENT SUPPORTING                                                     |
| `/articles/[slug]`                              | Long-form article                      | Shop                     | Public                  | `ArticleDetailPage`      | CONTENT SUPPORTING                                                     |
| `/faq`                                          | FAQ category index                     | Shop                     | Public                  | `FaqLandingPage`         | CONTENT SUPPORTING                                                     |
| `/faq/[category]`                               | FAQ accordion for one category         | Shop                     | Public                  | `FaqCategoryPage`        | CONTENT SUPPORTING                                                     |
| `/knowledge`                                    | Knowledge category index               | Shop                     | Public                  | `KnowledgeLandingPage`   | CONTENT SUPPORTING                                                     |
| `/knowledge/[category]`                         | Tips for one category                  | Shop                     | Public                  | `KnowledgeCategoryPage`  | CONTENT SUPPORTING                                                     |
| `/engineering-forms`                            | Named-form catalog + download          | Shop                     | Public                  | `EngineeringFormsPage`   | **NEEDS CONFIRMATION** — reserve the URL, do not build until confirmed |
| `/about`                                        | Platform story and values              | Shop                     | Public                  | `AboutPage`              | CONTENT SUPPORTING                                                     |
| `/terms`                                        | Terms of use                           | Shop                     | Public                  | `LegalPage`              | CONTENT SUPPORTING                                                     |
| `/privacy-policy`                               | Privacy policy                         | Shop                     | Public                  | `LegalPage`              | CONTENT SUPPORTING                                                     |
| `/expert-registration`                          | Wizard step 1 — identity               | Auth + wizard            | Public entry            | `IdentityStep`           | CORE PHASE 1                                                           |
| `/expert-registration/otp`                      | Step 2 — OTP                           | Auth + wizard            | Wizard-gated            | `OtpStep`                | CORE PHASE 1                                                           |
| `/expert-registration/service-area`             | Step 3                                 | Auth + wizard            | Wizard-gated            | `ServiceAreaStep`        | CORE PHASE 1                                                           |
| `/expert-registration/expertise`                | Step 4                                 | Auth + wizard            | Wizard-gated            | `ExpertiseStep`          | CORE PHASE 1                                                           |
| `/expert-registration/personal-info`            | Step 5                                 | Auth + wizard            | Wizard-gated            | `PersonalInfoStep`       | CORE PHASE 1                                                           |
| `/expert-registration/education`                | Step 6                                 | Auth + wizard            | Wizard-gated            | `EducationStep`          | CORE PHASE 1                                                           |
| `/expert-registration/engineering-organization` | Step 7                                 | Auth + wizard            | Wizard-gated            | `OrganizationStep`       | CORE PHASE 1                                                           |
| `/expert-registration/professional-resume`      | Step 8                                 | Auth + wizard            | Wizard-gated            | `ProfessionalResumeStep` | CORE PHASE 1                                                           |
| `/expert-registration/portfolio`                | Step 9                                 | Auth + wizard            | Wizard-gated            | `PortfolioStep`          | CORE PHASE 1                                                           |
| `/expert-registration/complete`                 | Success                                | Auth (progress complete) | After successful submit | `RegistrationComplete`   | CORE PHASE 1 (**UX COMPLETION**)                                       |
| `/dev/design-system`                            | Primitive gallery                      | Dev                      | Local/dev only          | existing preview         | Not product                                                            |

**Wizard-gated** means the user may not skip ahead without proof that earlier
steps succeeded. Proof mechanism is **BUSINESS DECISION REQUIRED** /
**API CONTRACT REQUIRED** (session, signed cookie, or draft). Until that
contract exists, the wizard provider must still _attempt_ forward-guards in
the client and send users back to the first incomplete step.

---

## 7. Per-route specification

Each route below is the contract for a thin `page.tsx` that composes domain UI.
Required states are named; behavior is in [STATE-MATRIX.md](STATE-MATRIX.md).

### 7.1 Home — `/`

| Field           | Specification                                                                                                                                                                                                                                                                                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Path            | `/`                                                                                                                                                                                                                                                                                                                                                                           |
| File            | `app/(shop)/page.tsx` (move off current root `app/page.tsx`)                                                                                                                                                                                                                                                                                                                  |
| Purpose         | Enter discovery or specialist registration                                                                                                                                                                                                                                                                                                                                    |
| Page type       | Marketing + discovery hub                                                                                                                                                                                                                                                                                                                                                     |
| Access          | Public                                                                                                                                                                                                                                                                                                                                                                        |
| Layout          | Shop                                                                                                                                                                                                                                                                                                                                                                          |
| Phase           | CORE PHASE 1                                                                                                                                                                                                                                                                                                                                                                  |
| Container       | Full-bleed hero; `container-app` for sections                                                                                                                                                                                                                                                                                                                                 |
| Major sections  | Swiper hero (headline, search, city, join); six glass service categories; marketplace discovery with pagination when results exceed 9; popular services (mapped tiles only); drawing consultation (mapped tiles only); platform intro + why-us; join CTA; preserved testimonial (no submit form); knowledge-tip slider; editorial learning grid; FAQ category entry to `/faq` |
| Interactions    | Open search; open city selector; navigate to services/registration/content; carousel pause/next if banners exist                                                                                                                                                                                                                                                              |
| Required states | Static success; loading/error only for dynamic blocks (banners, knowledge, featured experts)                                                                                                                                                                                                                                                                                  |
| Mobile          | Hero stacks; city + search as icon/text triggers; category grid 2 columns; no hover-only CTAs; join visible in header menu and in-page CTA                                                                                                                                                                                                                                    |
| Data            | Static IA from `config/`. Dynamic blocks **API CONTRACT REQUIRED**. Contact in footer from site config until API exists                                                                                                                                                                                                                                                       |
| API             | Likely for banners / featured experts / knowledge strip. Services grid is config                                                                                                                                                                                                                                                                                              |

**Home article strip** is P2 in Task 01 — do not add unless product asks.

### 7.2 Search results — `/search`

| Field           | Specification                                                                                                                                               |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Path            | `/search?q=&cities=`                                                                                                                                        |
| Purpose         | Complete the legacy search shell with real results (**UX COMPLETION**)                                                                                      |
| Page type       | Results                                                                                                                                                     |
| Access          | Public                                                                                                                                                      |
| Layout          | Shop                                                                                                                                                        |
| Phase           | CORE PHASE 1                                                                                                                                                |
| Container       | `container-wide`                                                                                                                                            |
| Major sections  | Query echo; optional grouping (services vs experts — **BUSINESS DECISION REQUIRED**); result lists using `ServiceTile` / `ExpertCard`; empty; city reminder |
| Interactions    | Refine query (surface or in-page); change city; open a service or profile                                                                                   |
| Required states | Loading, success, empty, error, retry, no-query (prompt to type)                                                                                            |
| Mobile          | Same as service listing; groups as stacked sections not side-by-side                                                                                        |
| Data            | Search hits. **API CONTRACT REQUIRED.** Do not invent ranking                                                                                               |
| API             | Yes. Index contents (services, experts, or both) is **BUSINESS DECISION REQUIRED**                                                                          |

**Search entry** remains a global overlay (`SearchSurface`): popular tags,
category grid, recent searches (**UX COMPLETION**), and submit. Submitting a
non-empty query navigates to `/search`. Choosing a known service category
navigates directly to `/services/[slug]` and does not require `/search`.

`محاسبات ساختمان` in the category grid is **unmapped** until taxonomy P0.

### 7.3 Service discovery — `/services/[slug]`

| Field           | Specification                                                                                                                                                                                                                                            |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Path            | `/services/[slug]?cities=&tab=&experience=&license=&discipline=&degree=&skill=&page=` Query names are front-end until **API CONTRACT REQUIRED** maps them                                                                                                |
| Purpose         | List experts for one service, with city and filters                                                                                                                                                                                                      |
| Page type       | Listing                                                                                                                                                                                                                                                  |
| Access          | Public                                                                                                                                                                                                                                                   |
| Layout          | Shop                                                                                                                                                                                                                                                     |
| Phase           | CORE PHASE 1                                                                                                                                                                                                                                             |
| Container       | `container-wide`                                                                                                                                                                                                                                         |
| Major sections  | Service title/intro; city + filter chips; subtype tabs if config says so; filter sheet/drawer; result count; paginated expert list; service info/FAQ **only when real copy exists**; suggested-experts rail on surveying with real `/experts/[id]` links |
| Interactions    | Change city (URL, refetch/filter); apply/clear filters (URL); switch tab (URL); open profile; paginate while preserving filters                                                                                                                          |
| Required states | Loading, success, empty (change-city CTA — included on every slug including building-permit), error, retry, unknown slug → `notFound()`                                                                                                                  |
| Mobile          | Sticky compact bar (city + filters + count) below header; chips wrap; filters open `Drawer`; list is one column; pagination is full-width controls                                                                                                       |
| Data            | Service metadata (config + optional API); expert list; **API CONTRACT REQUIRED** for list, count, filters, pagination                                                                                                                                    |
| API             | Yes                                                                                                                                                                                                                                                      |

Unknown or unimplemented slugs: `notFound()`, not an empty list.

**Copied surveying FAQ/skills on non-survey pages must not ship.** If real copy
is missing, omit the info/FAQ block rather than showing wrong content.
**BUSINESS DECISION REQUIRED** / content for replacement copy.

### 7.4 Expert profile — `/experts/[id]`

| Field           | Specification                                                                                                                                                                                                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Path            | `/experts/[id]`                                                                                                                                                                                                                                                                   |
| Purpose         | Inspect a specialist and contact them                                                                                                                                                                                                                                             |
| Page type       | Entity detail                                                                                                                                                                                                                                                                     |
| Access          | Public                                                                                                                                                                                                                                                                            |
| Layout          | Shop                                                                                                                                                                                                                                                                              |
| Phase           | CORE PHASE 1 (view + phone/SMS). Chat, save, share, review submit: **NEEDS CONFIRMATION**                                                                                                                                                                                         |
| Container       | `container-app`                                                                                                                                                                                                                                                                   |
| Major sections  | Header (avatar, name, profession, verification, active, views, experience, city); credentials (degree, license, nezam membership); specialties; service cities; software; history; portfolio gallery; ratings/reviews **display if API returns them**; contact sheet (phone, SMS) |
| Interactions    | Open contact; open portfolio viewer; load more reviews if confirmed; **do not render** chat/save/share/review-form controls in Phase 1                                                                                                                                            |
| Required states | Loading, success, not found, error, retry, unverified, inactive, hidden/unavailable contact, empty sections (portfolio, reviews, tags, history)                                                                                                                                   |
| Mobile          | Identity stacks; primary contact CTA sticky at bottom (`Drawer` for call/SMS choices); gallery tap → full-screen dialog; generous `pb` so sticky CTA does not cover reviews                                                                                                       |
| Data            | Expert profile. **API CONTRACT REQUIRED.** Do not use placeholder `tel:09...`                                                                                                                                                                                                     |
| API             | Yes                                                                                                                                                                                                                                                                               |

### 7.5 Articles — `/articles`, `/articles/categories/[slug]`, `/articles/[slug]`

| Field           | Specification                                                                                                                                                                                           |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Purpose         | Read editorial content; optional CTA into a related service                                                                                                                                             |
| Page type       | Hub / list / long-form                                                                                                                                                                                  |
| Access          | Public                                                                                                                                                                                                  |
| Layout          | Shop                                                                                                                                                                                                    |
| Phase           | CONTENT SUPPORTING PHASE 1                                                                                                                                                                              |
| Container       | Hub/list: `container-app` or `container-wide`. Detail: `container-app` with a reading column (`max-w-3xl`) plus RTL-right sidebar on large screens                                                      |
| Hub `/articles` | Title; category chips from catalog (`?category=`); curated recommended block; `ArticleCard` grid; pagination above nine results. Search/sort stay omitted until a content API exists.                   |
| Category        | Banner/title from content; same card grid; breadcrumb                                                                                                                                                   |
| Detail          | Breadcrumb; title; meta; body with `h2–h5` anchors; RTL-right sticky categories + TOC on desktop; mobile TOC accordion; related by tags; comments with required mobile; related service CTA when tagged |
| Interactions    | Open detail; category browse; TOC jump; service CTA                                                                                                                                                     |
| Required states | Loading, success, empty (no articles / empty category), error, not found                                                                                                                                |
| Mobile          | Accordion TOC in flow; no desktop sidebar; readable measure; comments and related stack                                                                                                                 |
| Data            | **API CONTRACT REQUIRED** / content source **BUSINESS DECISION REQUIRED**. Do not invent bodies. Demo duplication must not ship                                                                         |
| API             | Likely                                                                                                                                                                                                  |

Search/sort on articles stay unwired until a content API exists. Do not fake them.

### 7.6 FAQ — `/faq`, `/faq/[category]`

| Field           | Specification                                                                                                                         |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Purpose         | Browse questions by category; CTA into the matching service                                                                           |
| Access          | Public                                                                                                                                |
| Layout          | Shop                                                                                                                                  |
| Phase           | CONTENT SUPPORTING                                                                                                                    |
| Container       | `container-app`; category reading `container-narrow`                                                                                  |
| Landing         | Category cards **only for categories that have questions**                                                                            |
| Category        | Accordion of real questions; related service CTA; related categories that exist                                                       |
| Interactions    | Expand/collapse; navigate to service                                                                                                  |
| Required states | Loading, success, empty category, error, not found                                                                                    |
| Mobile          | Accordion full width; comfortable tap targets                                                                                         |
| Data            | Only surveying questions exist in source. Do not invent others. **API CONTRACT REQUIRED** if not statically copied from employer text |
| API             | Likely                                                                                                                                |

Ask-a-question modal: **NEEDS CONFIRMATION**. Do not implement.

Home FAQ entry opens `/faq` (or a small dialog listing **real** categories).
Do not copy the broken `#faqCategoryModal` placeholder grid.

### 7.7 Knowledge — `/knowledge`, `/knowledge/[category]`

| Field           | Specification                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------------- |
| Purpose         | Short tips by service-related category                                                               |
| Access          | Public                                                                                               |
| Layout          | Shop                                                                                                 |
| Phase           | CONTENT SUPPORTING                                                                                   |
| Container       | `container-app`                                                                                      |
| Landing         | Category cards with real destinations only                                                           |
| Category        | Tip list; load more when API exists; related service CTA                                             |
| Required states | Loading, success, empty, error, not found, pagination loading                                        |
| Data            | Only surveying tips exist. Do not invent tips or counts (`۵۰ نکته` vs 4 items is a **LEGACY ISSUE**) |
| API             | Likely. Pagination vs infinite scroll is **BUSINESS DECISION REQUIRED**                              |

### 7.8 Engineering forms — `/engineering-forms`

Reserved URL matching the legacy catalog concept (search, province, category,
named form, download). **NEEDS CONFIRMATION.** Do not implement the page in
Phase 1. If later confirmed, states are in [STATE-MATRIX.md](STATE-MATRIX.md).
Do not invent file metadata.

### 7.9 About — `/about`

| Field     | Specification                                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Purpose   | Story, how it works, six service CTAs, values                                                                                                     |
| Access    | Public                                                                                                                                            |
| Layout    | Shop                                                                                                                                              |
| Phase     | CONTENT SUPPORTING                                                                                                                                |
| Container | `container-narrow` for prose; `container-app` for service grid                                                                                    |
| Data      | Employer meaning from `about-us.html`. **Do not** reuse surveying blurbs on every service card — omit or wait for correct copy (**LEGACY ISSUE**) |
| API       | No                                                                                                                                                |

### 7.10 Terms — `/terms` and Privacy — `/privacy-policy`

| Field       | Specification                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
| Purpose     | Long-form legal; cross-link each other (**UX COMPLETION**)                                                   |
| Access      | Public                                                                                                       |
| Layout      | Shop                                                                                                         |
| Phase       | CONTENT SUPPORTING                                                                                           |
| Container   | `container-narrow`                                                                                           |
| Composition | Shared `LegalPage` + `LegalDocument`                                                                         |
| Data        | Employer legal text. Do not build UI for accounts, payments, complaints, deletion, or cookies from this copy |
| API         | No                                                                                                           |

Registration and any future review modal must link these routes, not `#`.

### 7.11 Expert registration — `/expert-registration/*`

See §8 for the wizard decision. Shared fields:

| Field                                | Specification                                                                                                                                                              |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Access                               | Public to start. Later steps wizard-gated                                                                                                                                  |
| Layout                               | Auth layout + registration layout                                                                                                                                          |
| Phase                                | CORE PHASE 1                                                                                                                                                               |
| Container                            | `container-form`                                                                                                                                                           |
| Chrome                               | No store header/footer. Brand, home link, progress, step title, back/continue                                                                                              |
| API                                  | Yes for every advancing step. **API CONTRACT REQUIRED.** Do not treat Laravel `{{ route }}` placeholders as endpoints                                                      |
| Completion destination after success | **BUSINESS DECISION REQUIRED** (P0). The `/complete` route is the **in-wizard** confirmation. Post-complete redirect (home vs profile vs login) is unknown — do not invent |

Step responsibilities:

| Step | Path                           | Responsibility                                                                                                                                    |
| ---- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | `/expert-registration`         | Iranian mobile + national ID; terms acceptance copy (checkbox **BUSINESS DECISION REQUIRED**); Shahkar-style match **BUSINESS DECISION REQUIRED** |
| 2    | `.../otp`                      | 5-digit OTP (`OtpInput` `length={5}`); 120s timer; resend stays on this step; edit phone returns to step 1                                        |
| 3    | `.../service-area`             | Single primary province + city; optional nearby cities. Rules (radius, max, required) **BUSINESS DECISION REQUIRED**                              |
| 4    | `.../expertise`                | Category → multi expertise → optional software. Catalog completeness **BUSINESS DECISION REQUIRED**                                               |
| 5    | `.../personal-info`            | First/last name, national ID display, avatar, expertise summary (edit → step 4). Location vs step 3 is **BUSINESS DECISION REQUIRED** (P0)        |
| 6    | `.../education`                | Diploma-or-lower vs above; degree multi-select; per-degree uploads. File required? label copy? **BUSINESS DECISION REQUIRED**                     |
| 7    | `.../engineering-organization` | Membership → license → discipline → qualifications using **source rules only** (ترافیک/شهرسازی **BUSINESS DECISION REQUIRED**)                    |
| 8    | `.../professional-resume`      | Years + resume text (legacy client min 10 chars). Bounds **BUSINESS DECISION REQUIRED**                                                           |
| 9    | `.../portfolio`                | Portfolio images, certificate rows, accept-rules, final submit. Min/max images **BUSINESS DECISION REQUIRED**                                     |
| —    | `.../complete`                 | Success message + next action once product defines it                                                                                             |

Do not keep the legacy bug where resend navigates to step 3.

---

## 8. Registration architecture decision

**Decision: hybrid nested routes** — one wizard layout, one route per step.

Rejected alternatives:

| Option                             | Rejected because                                                                                                                         |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Single route + internal step state | Browser Back does not match user expectation; OTP and success URLs disappear; refresh recovery is worse; nine large branches in one page |
| Nine unrelated top-level routes    | Duplicates chrome; no shared guard; same legacy failure mode                                                                             |
| Query-only `?step=` on one URL     | Weaker deep links; easier to spoof; worse analytics than real paths                                                                      |

Chosen:

```text
app/(auth)/layout.tsx
  └── app/(auth)/expert-registration/layout.tsx   ← Server layout wrapping a Client wizard provider
        ├── progress, title, children slot
        └── one page.tsx per step
```

Why this fits the criteria:

| Concern              | How the hybrid addresses it                                                                                                                                                                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Refresh / recovery   | Layout + provider stay mounted on client navigations. Full refresh needs draft/session — **BUSINESS DECISION REQUIRED** (P0). Architecture accepts a server/session draft when the API exists; until then, guard back to step 1 or last server-acknowledged step |
| Deep-linking         | URLs exist for support and analytics. Forward skips are blocked without proof                                                                                                                                                                                    |
| Browser Back/Forward | Native. Back from OTP → identity is correct; Back from step 4 → 3 is correct                                                                                                                                                                                     |
| Mobile UX            | Sticky progress + sticky back/continue; no full store chrome; one focused column                                                                                                                                                                                 |
| Validation           | Zod + RHF **per step**. Wizard context stores **committed** values only after the step succeeds (client schema, then API when contracted)                                                                                                                        |
| Maintainability      | Thin pages; shared nav/progress; no duplicated next/back logic                                                                                                                                                                                                   |

**State ownership** (no Redux/Zustand):

1. `RegistrationWizardProvider` (Client) in the wizard layout — committed step data, current allowed step, submission flags.
2. Each step page — `useForm` with `defaultValues` from the provider.
3. Server session / draft API — **API CONTRACT REQUIRED**. When it exists, the layout hydrates the provider from the server.

**OTP** is a route, not a modal: the SMS challenge is a primary task, needs the
timer, resend, and edit-phone flows, and must not sit under store chrome.

**Completion** is a route so success cannot be confused with a failed submit,
and so refresh does not resubmit step 9.

---

## 9. Layout architecture

Do not implement these files in this task.

### 9.1 Root layout — `app/layout.tsx`

|                  |                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------- |
| Responsibility   | Document shell: `lang="fa"`, `dir="rtl"`, Kalameh, `globals.css`, `AppProvider`, metadata |
| Header / footer  | None                                                                                      |
| Container        | None                                                                                      |
| Server Component | **Must remain Server.** Already true                                                      |
| Owns             | Font variable, providers composition only                                                 |

### 9.2 Shop layout — `app/(shop)/layout.tsx`

|                  |                                                                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Responsibility   | Public storefront chrome                                                                                                                |
| Header           | `StoreHeader`: brand, search trigger, city trigger, specialist-join, menu. Sticky. `glass-surface` allowed                              |
| Navigation       | Desktop: primary services + content as appropriate density; overflow in menu. Mobile: `MobileNavigation` Sheet                          |
| Footer           | `StoreFooter`: mapped service links, content, company, contact, legal. Hide social until URLs exist. Hide contractor links until mapped |
| Container        | `main` with skip link target `id="main-content"`. Pages choose `container-*`                                                            |
| Responsive       | Header compresses to icon triggers; footer stacks; safe-area padding                                                                    |
| Server Component | **Yes.** Header/footer split: server wrappers, client islands for menu/search/city                                                      |
| Owns             | Skip link, header, footer, shop `loading.tsx` / `error.tsx`                                                                             |

Home currently lives at `app/page.tsx` (Phase 0). Phase 1 must move it under
`(shop)` so it receives this chrome.

### 9.3 Auth layout — `app/(auth)/layout.tsx`

|                  |                                                                |
| ---------------- | -------------------------------------------------------------- |
| Responsibility   | Focused, non-store chrome for the wizard (and any future auth) |
| Header           | Compact: logo → `/`, optional “بازگشت به فروشگاه”              |
| Footer           | Minimal legal links to `/terms` and `/privacy-policy` only     |
| Navigation       | None of the shop menu / search / city                          |
| Container        | Centered `container-form`                                      |
| Responsive       | Full width on small screens with page padding                  |
| Server Component | **Yes**                                                        |

### 9.4 Registration layout — `app/(auth)/expert-registration/layout.tsx`

|                  |                                                                              |
| ---------------- | ---------------------------------------------------------------------------- |
| Responsibility   | Wizard shell: progress, step heading, provider, children                     |
| Header           | Inherits auth; adds `RegistrationProgress`                                   |
| Footer           | Step navigation lives in the step UI (sticky on mobile), not the site footer |
| Server Component | Layout may be Server and render a Client `RegistrationShell` child           |

Complete step may hide back/continue and show a finished progress state.

### 9.5 Dev layout

Existing `app/dev/layout.tsx`. Not product. Keep out of shop navigation.

### 9.6 Layouts not created

| Idea                          | Why not                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------- |
| Separate legal Next.js layout | About/terms/privacy still need shop header/footer. Use `LegalPage` composition instead |
| Dashboard / account layout    | No customer panel in Phase 1                                                           |
| Chat layout                   | Feature not confirmed                                                                  |

---

## 10. URL and client state

| Concern                               | Source of truth                                            | Notes                                                                                                           |
| ------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Service slug, expert id, article slug | Route params                                               |                                                                                                                 |
| Discovery cities                      | Search params on `/services/[slug]` and `/search`          | IDs when API provides them — **API CONTRACT REQUIRED**. Do not keep names-only `localStorage` as the only store |
| City preference on Home               | Cookie or equivalent, applied when navigating to a service | **UX COMPLETION**. Optional `?cities=` on home is unnecessary                                                   |
| Filters, tab, page                    | Search params                                              | Shareable, SSR-friendly                                                                                         |
| Search query                          | `/search?q=`                                               | Overlay may hold draft input before submit                                                                      |
| Registration committed steps          | Wizard provider + later server draft                       | **BUSINESS DECISION REQUIRED**                                                                                  |
| UI overlays                           | Local component state                                      | Search, city, filters, gallery, contact, mobile menu                                                            |

Changing city on a service page **must refetch** the list (legacy did not).

---

## 11. Content vs API boundaries

| Kind                           | Examples                                                                                       | Rule                                                                                            |
| ------------------------------ | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Static IA / copy               | Six service labels, nav, about/legal text, surveying FAQ that exists in source, footer contact | `config/` or MD/content modules. No fake API                                                    |
| Catalog that must stay current | Cities of Iran, expertise tree, software, filter option lists                                  | **API CONTRACT REQUIRED**. Do not hardcode the incomplete legacy city sample as production data |
| Entity data                    | Experts, lists, counts, phones, portfolios, articles                                           | Services layer. **API CONTRACT REQUIRED**                                                       |
| Unknown                        | Banner destinations, featured experts, search index, registration draft, review auth           | **BUSINESS DECISION REQUIRED** and/or **API CONTRACT REQUIRED**                                 |

Do not invent endpoints, payloads, or ranking.

---

## 12. API integration boundaries (route level)

Follow [ARCHITECTURE.md](../ARCHITECTURE.md): `services/` own domain calls,
`lib/api/` is HTTP, `hooks/` wrap client server-state, `providers/query-provider`
stays generic.

| Domain                     | Likely service module                       | Server vs client                                                    | Loading/error owner                                                   |
| -------------------------- | ------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Cities                     | `services/city-service`                     | Server-fetch tree passed into Client selector; or one client query  | Selector owns empty/error inside overlay; listing owns result refetch |
| Search                     | `services/search-service`                   | `/search` page server-fetches; overlay suggestions client if needed | Page + `SearchResultsPage`                                            |
| Service listing            | `services/expert-service` (list by service) | Server Component for first paint; load-more may be client           | Route `loading.tsx` + list region                                     |
| Expert profile             | `services/expert-service`                   | Server Component                                                    | Route loading/error; `notFound()`                                     |
| Registration               | `services/registration-service`             | Client mutations per step                                           | Step + wizard alert                                                   |
| Articles / FAQ / knowledge | matching `*-service`                        | Server Component                                                    | Route + empty                                                         |
| Reviews submit             | `services/review-service`                   | Client mutation                                                     | **NEEDS CONFIRMATION**                                                |
| Engineering forms          | `services/engineering-form-service`         | —                                                                   | **NEEDS CONFIRMATION**                                                |

Every module above is **API CONTRACT REQUIRED**. Do not create URL strings now.

TanStack Query is for: registration mutations, OTP resend, load-more append,
typeahead, client cache after interaction. It is **not** for about/legal or
the first SSR of a public profile.

---

## 13. Responsive architecture (IA level)

Breakpoints follow Tailwind. Design is mobile-first. Meaningful behaviors:

| Surface      | Mobile                                                                                                | Desktop                                                    |
| ------------ | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Header       | Logo, search, city, menu. Join in menu + in-page CTAs                                                 | Search field, city label, join button, fuller nav          |
| Search       | `Drawer` full-screen or bottom sheet                                                                  | `Sheet` / large overlay. `glass-surface` allowed           |
| City         | Same overlay family; sticky confirm; search field                                                     | Wider two-pane province/city if needed                     |
| Service list | 1 column cards; horizontal filter chips; filter `Drawer`                                              | 2 columns optional; filter bar more visible                |
| Profile      | Sticky contact bar; stacked sections                                                                  | Side-by-side header meta; gallery grid                     |
| Registration | Sticky progress (step i of 9 + bar, not 9 overflowing dots); sticky back/continue; native file picker | Same column, more padding; sheets for expertise categories |
| Gallery      | Full-screen dialog, swipe **UX COMPLETION** if cheap                                                  | Dialog with next/prev                                      |
| Content      | Single column; TOC in flow                                                                            | Narrow measure; TOC may sit aside from `md:`               |
| Footer       | Stacked groups                                                                                        | Multi-column                                               |

Touch targets: default controls stay in the 44px class from the design system.

RTL: logical properties only. Nested `dir="ltr"` for OTP, phone, national ID,
and URLs.

Sticky header + sticky profile CTA + sticky registration nav must not stack
into an unusable content well. Profile sticky CTA is **only** on
`/experts/[id]`. Registration sticky nav is **only** in the auth wizard.

---

## 14. Accessibility architecture (IA level)

Component-level rules live in [COMPONENT-ARCHITECTURE.md](COMPONENT-ARCHITECTURE.md)
and [DESIGN-SYSTEM.md](../DESIGN-SYSTEM.md). Route-level requirements:

- One `h1` per page (service title, expert name, article title, “ثبت‌نام متخصص”, etc.).
- Skip link as the first focusable control in the shop layout.
- Route `loading.tsx` sets a coherent pending UI; list regions use `aria-busy` when refetching.
- `error.tsx` offers retry and a path home; do not dump raw exceptions.
- `not-found.tsx` in Persian, with links to home and main services.
- Search results and expert counts announced via polite live region.
- Overlays (menu, search, city, filters, contact, gallery) use existing Dialog/Sheet/Drawer focus traps.
- Legal and article pages are real landmarks (`main`, `nav` breadcrumbs, `article`).
- Do not ship icon-only header controls without accessible names (`جستجو`, `انتخاب شهر`, `منو`).
- Reduced motion is global in `globals.css`; carousels must pause and must not auto-advance when reduced motion is set.

WCAG target: **AA**, matching the design-system primitives already shipped.

---

## 15. Legacy gap handling (IA)

| Problem                                                                                   | Handling                                                                               |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `#` popular services, drawing tiles, social, FAQ cards, knowledge cards, related articles | **Remove** from nav until mapped; **redesign** destinations via config; never copy `#` |
| Two service HTML generations                                                              | **Consolidate** to one discovery architecture                                          |
| Surveying copy cloned onto other services                                                 | **Remove** wrong copy; **clarify** content with employer                               |
| `localStorage` city names, listings ignore city                                           | **Redesign**: URL ids + refetch                                                        |
| `/resume.html` without id                                                                 | **Redesign**: `/experts/[id]`                                                          |
| Search shell without results                                                              | **Redesign**: overlay + `/search`                                                      |
| Registration dead ends, wrong resend, missing success                                     | **Redesign** wizard; **preserve** 9-step meaning                                       |
| Article URL 404s                                                                          | **Consolidate** to `/articles/[slug]`                                                  |
| Missing FAQ/knowledge files                                                               | **Consolidate** generic routes; **do not** invent content                              |
| Forms stub                                                                                | **Defer** until confirmation                                                           |
| Chat / save / share / review OTP                                                          | **Defer** (document, do not build)                                                     |
| Terms mention accounts/payments                                                           | **Defer** — do not add routes                                                          |
| Footer contractors without href                                                           | **Clarify** mapping; hide until then                                                   |
| Home expert showcase duplicates                                                           | **Defer** until featured source exists                                                 |
| Building-permit missing empty state                                                       | **Redesign** shared empty pattern                                                      |
| Menu aria-controls mismatch                                                               | **Redesign** with Sheet `id` + `aria-controls`                                         |
| Placeholder.com logo                                                                      | **Replace** with real brand asset when provided                                        |

---

## 16. Phase 1 implementation sequence

Dependency order (documentation only):

1. **Foundation / design system** — done (Phase 0 / TASK 00.5).
2. **Move home under `(shop)`** and add shop + auth layouts, skip link, `not-found`.
3. **Chrome:** `StoreHeader`, `StoreFooter`, `MobileNavigation`, navigation config (only real hrefs).
4. **Legal/about** — static, unblocks footer. Task 01 slice 1; adjusted earlier than the generic “legal last” list because these pages have no API and make navigation honest.
5. **City selector + search surface** (overlays). City persistence + URL contract.
6. **Home** — static sections, mapped tiles, join CTA. Dynamic blocks behind data.
7. **Service discovery architecture** — one page, six slugs, filters, empty/error, `ExpertCard`.
8. **Expert profile + contact sheet**.
9. **Search results page** — after list/profile cards exist.
10. **Registration wizard** — shell, progress, steps 1–9, complete. Blocked on P0 product answers for draft/guards/location/taxonomy/completion redirect.
11. **Content routes** — articles / FAQ / knowledge if contracted, using only real copy.
12. **Engineering forms** — only if confirmed.
13. **Polish** — responsive QA, a11y pass, empty/error consistency, hide remaining gaps.

Slices 7–10 require APIs. Slice 11 requires a content-source decision.

---

## 17. Conflicts with previous documentation

| Source                                                                     | Conflict                                  | Resolution in this blueprint                                                          |
| -------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------- |
| [DEVELOPMENT.md](../DEVELOPMENT.md) examples `/sign-in`, `/engineers/[id]` | Foundation placeholders                   | Product routes are `/expert-registration` and `/experts/[id]`. No customer sign-in    |
| [ARCHITECTURE.md](../ARCHITECTURE.md) example `engineerCard`               | Product language is expert                | Domain folder is `components/store/expert/`. Rulebook example should say `expertCard` |
| [ARCHITECTURE.md](../ARCHITECTURE.md) “dynamic segments use `[id]`”        | SEO resources need slugs                  | `[id]` for experts; `[slug]` / `[category]` for public content                        |
| Task 18 “legal last” vs Task 01 slice 1                                    | Legal is static                           | Implement legal/about with chrome (step 4 above)                                      |
| Task 01 candidate `ContentCard` in common                                  | Article vs knowledge vs FAQ shapes differ | Do not create a generic content card (see component doc)                              |
| Task 01 `CitySelector` listed under common                                 | It is a product concept with API          | Lives under `components/store/city/`                                                  |
| Search as overlay-only in flows vs need for results                        | Legacy never had a results URL            | Add `/search` as UX completion                                                        |

---

## 18. Acceptance criteria (architecture)

```gherkin
Feature: Storefront information architecture
  Background:
    Given the design system primitives already exist
    And Task 01 audit, flows, and phase matrix are the product specification

  Scenario: Service pages share one route architecture
    Given six employer services
    When the storefront is implemented
    Then a single /services/[slug] page composition is used
    And no per-file Bootstrap template is reproduced

  Scenario: Experts are addressable
    When a customer opens a specialist from a listing
    Then the URL is /experts/[id]
    And /resume is not a product route

  Scenario: Search is completable
    When a customer submits a query
    Then they reach a results state (overlay completion or /search)
    And empty and error states exist
    And ranking is not invented client-side

  Scenario: Registration is one guarded wizard
    Given nine source steps plus a missing success state
    Then routes live under /expert-registration
    And resend OTP does not navigate to service-area
    And a complete route exists after successful submit

  Scenario: Broken legacy links are not shipped
    Then href="#" is not used as a product destination
    And unmapped tiles are omitted until product maps them

  Scenario: Unconfirmed features have no routes
    Then chat, saved experts, customer account, payments, and forms download
    are absent from the route map until confirmed
```
