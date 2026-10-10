# Component Architecture

> Historical planning snapshot, preserved for decision context. This is not the current implementation or an instruction for active work. See the [current architecture](../ARCHITECTURE.md), [design reference audit](../design-reference-audit.md), and [documentation index](../README.md). The local client source is `Design/`; earlier absolute paths and product-scope exclusions below describe a previous phase. Header, Footer, Login, and Registration are excluded from this alignment.

Domain, layout, and common component blueprint for the Mohandes Man storefront.
Routes and layouts are specified in [INFORMATION-ARCHITECTURE.md](INFORMATION-ARCHITECTURE.md).
States are specified in [STATE-MATRIX.md](STATE-MATRIX.md).

This document does **not** authorize implementation in this task.

Follow [ARCHITECTURE.md](../ARCHITECTURE.md):

- No `src/`, no barrel `index.ts`
- `components/ui/` primitives only — already shipped in TASK 00.5
- `components/store/<feature>/<componentName>/<componentName>.tsx`
- camelCase folders/files, PascalCase exports
- Server Components by default; `"use client"` only on interactive leaves

---

## 1. Classification legend

| Class                   | Meaning                                            | Location                                         |
| ----------------------- | -------------------------------------------------- | ------------------------------------------------ |
| **A. UI Primitive**     | Generic, domain-agnostic control                   | `components/ui/` — **do not add product copies** |
| **B. Layout**           | Application chrome                                 | `components/layout/`                             |
| **C. Common shared**    | Reusable, not a primitive, not owned by one domain | `components/common/`                             |
| **D. Domain**           | Store feature UI                                   | `components/store/<feature>/`                    |
| **E. Page composition** | Top-level component a thin `page.tsx` imports      | `components/store/<feature>/`                    |

A component is only justified if it has reuse, meaningful responsibility, state,
layout complexity, or semantic value. Simple static blocks stay inside a parent.

---

## 2. UI primitives — Class A (already exist)

Do **not** duplicate or wrap these into “Mohandes” variants.

Button, Input, Textarea, Label, Field, Checkbox, RadioGroup, Select, Switch,
OtpInput, FileUpload, Badge, Avatar, Card, Separator, Skeleton, Spinner,
Progress, Alert, Empty, Dialog, Sheet, Drawer, Accordion, Tabs, Tooltip,
Popover, DropdownMenu.

shadcn may be consulted for behavior of _new_ primitives only. Do not add
every shadcn component. Project tokens and folder shape override shadcn
defaults.

| Legacy pattern              | Compose                                           |
| --------------------------- | ------------------------------------------------- |
| Bootstrap modal / offcanvas | Dialog / Sheet / Drawer                           |
| Forms                       | Field + Input/Textarea/Select/Checkbox/RadioGroup |
| OTP                         | OtpInput (`length={5}` registration)              |
| Uploads                     | FileUpload                                        |
| Badges فعال / تایید شده     | Badge                                             |
| Avatar                      | Avatar                                            |
| FAQ                         | Accordion                                         |
| Service tabs                | Tabs                                              |
| Listing pending             | Skeleton                                          |
| Empty experts/search        | Empty                                             |
| Wizard bar                  | Progress                                          |
| Errors                      | Alert + Field error                               |
| Surfaces                    | Card                                              |

---

## 3. Folder map (planned)

```text
components/
├── ui/                          existing primitives only
├── layout/
│   ├── storeHeader/
│   ├── storeFooter/
│   ├── mobileNavigation/
│   ├── searchSurface/
│   └── skipLink/
├── common/
│   ├── sectionHeader/
│   ├── responsiveDialog/
│   ├── pagination/
│   ├── storeBreadcrumb/
│   ├── carousel/
│   ├── legalDocument/
│   ├── contentPageHeader/
│   └── loadMoreButton/
└── store/
    ├── home/
    ├── city/
    ├── search/
    ├── service/
    ├── expert/
    ├── registration/
    ├── article/
    ├── faq/
    ├── knowledge/
    └── engineeringForm/         only if Phase 1 confirms the feature
```

Feature name is **`expert`**, not `engineer`.

---

## 4. Layout components — Class B

### 4.1 `SkipLink`

|                 |                                                   |
| --------------- | ------------------------------------------------- |
| Responsibility  | First focusable control; jumps to `#main-content` |
| Inputs          | none (or `targetId`)                              |
| State           | none                                              |
| Server / Client | Server                                            |
| Reuse           | Shop layout only                                  |

### 4.2 `StoreHeader`

|                 |                                                                                                               |
| --------------- | ------------------------------------------------------------------------------------------------------------- |
| Responsibility  | Brand, search trigger, city trigger, join CTA, menu trigger                                                   |
| Inputs          | Optional `selectedCityLabel`; join href from config                                                           |
| Children        | Composes `SearchSurface` and `CitySelector` as overlays, does not own their data fetching policy              |
| State           | Overlay open flags live in small client leaves (`HeaderSearchButton`, `HeaderCityButton`, `HeaderMenuButton`) |
| Server / Client | Server shell; client leaves for buttons/overlays                                                              |
| Responsive      | See IA §13. Sticky + `glass-surface` allowed                                                                  |
| a11y            | `banner` / `nav`; named icon buttons; `aria-expanded` on menu/search/city                                     |

Do not put expert cards or service grids in the header.

### 4.3 `MobileNavigation`

|                 |                                                                          |
| --------------- | ------------------------------------------------------------------------ |
| Responsibility  | Sheet: home, six services, articles, knowledge, FAQ, about, terms, join  |
| Inputs          | `open`, `onOpenChange`, items from `config/navigation.config`            |
| State           | Client (Sheet). Accordion only for groups that have **real** child links |
| Server / Client | Client                                                                   |
| Do not          | Reproduce the broken FAQ accordion of placeholder `#` items              |

### 4.4 `StoreFooter`

|                 |                                                                            |
| --------------- | -------------------------------------------------------------------------- |
| Responsibility  | Grouped links + contact + legal. Omit social and unmapped contractor links |
| State           | none                                                                       |
| Server / Client | Server                                                                     |
| Responsive      | Stacked columns                                                            |

### 4.5 `SearchSurface`

|                 |                                                                                                          |
| --------------- | -------------------------------------------------------------------------------------------------------- |
| Responsibility  | Global search overlay: query field, popular tags, service category grid, optional recent queries, submit |
| Inputs          | `open`, `onOpenChange`; optional `initialQuery`                                                          |
| State           | Draft query (client). Recent queries **UX COMPLETION** (local only unless **API CONTRACT REQUIRED**)     |
| Server / Client | Client                                                                                                   |
| Overlay         | `ResponsiveDialog`: Drawer on small screens, Dialog on `md+`                                             |
| Results         | Not a full page inside the overlay. Submit → `/search?q=`. Category tile → `/services/[slug]`            |
| Unmapped        | `محاسبات ساختمان` hidden or non-interactive until taxonomy P0                                            |
| Reuse           | Header + optional home hero trigger                                                                      |

Search **results** are Class E under `store/search`, not layout.

---

## 5. Common components — Class C

Create these only where two or more domains share the responsibility.

| Component           | Responsibility                                                    | Server/Client | Used by                                                     |
| ------------------- | ----------------------------------------------------------------- | ------------- | ----------------------------------------------------------- |
| `SectionHeader`     | Title + optional description + optional action                    | Server        | Home, listings, profile sections                            |
| `ResponsiveDialog`  | Desktop Dialog/Sheet, mobile Drawer bottom sheet                  | Client        | Search, city, filters, expert overlays, engineer edit       |
| `Pagination`        | Previous/next, compact page numbers, serializable URL or callback | Client        | Discovery, search, content lists, engineer lists, reviews   |
| `StoreBreadcrumb`   | Landmark nav trail                                                | Server        | Content, legal, FAQ, knowledge, article, optionally service |
| `ContentPageHeader` | Title + intro for content/legal                                   | Server        | Articles hub, FAQ, knowledge, about, legal                  |
| `LegalDocument`     | Long-form semantic article                                        | Server        | Terms, privacy                                              |
| `Carousel`          | Pause, next/prev, dots, reduced-motion = no autoplay              | Client        | Home banners; knowledge preview **if** those sections ship  |
| `LoadMoreButton`    | Pending/disabled load-more                                        | Client        | Not used for true lists; those use `Pagination`             |

**Not created:**

| Rejected                              | Reason                                                         |
| ------------------------------------- | -------------------------------------------------------------- |
| Generic `ContentCard`                 | Article, knowledge tip, and FAQ category have different fields |
| `CitySelector` in common              | Domain + API; see `store/city`                                 |
| `FaqAccordionList` as a new primitive | Use `Accordion` + a thin FAQ domain mapper                     |
| `QueryState` mega-wrapper             | Compose Skeleton / Empty / Alert at call sites                 |
| `ServiceCategoryGrid` in common       | Service IA is domain (`store/service`)                         |

---

## 6. Domain maps

Client vs Server in trees: **(c)** = Client Component. Unmarked = Server.

### 6.1 Home — `components/store/home`

```text
HomePage                          E
├── HomeHero                      D  server shell + client Swiper/search/city children
│   ├── headline / join link / search
│   └── HomeHeroSlider            (c) Swiper + pagination
├── ServiceCategoryGrid           D  (shared with About; glass-card)
├── HomeMarketplace               D  (c) filters + paginated expert results
├── HomeNarrative                 D  “مهندس من چیست؟”
├── PopularServicesSection        D  mapped tiles only
├── DrawingConsultationSection    D  mapped tiles only
├── WhyMohandesMan                D
├── JoinCtaSection                D
├── HomeTestimonials              D  unique quote; no OTP form
├── HomeKnowledgeTips             D  (c) Swiper of catalog tips
├── ContentHighlights             D
└── HomeFaqEntry                  D  real FAQ categories + /faq CTA
```

| Component                    | Props (conceptual)             | State | Server/Client            | Notes                               |
| ---------------------------- | ------------------------------ | ----- | ------------------------ | ----------------------------------- |
| `HomePage`                   | optional dynamic blocks        | none  | Server                   | Page composition                    |
| `HomeHero`                   | title, subtitle, joinHref      | none  | Server + client triggers | Layout complexity                   |
| `PopularServicesSection`     | items `{ label, href }[]`      | none  | Server                   | Empty array → section hidden        |
| `DrawingConsultationSection` | items `{ label, href }[]`      | none  | Server                   | Same hide rule                      |
| `HomeNarrative`              | static copy                    | none  | Server                   | Do not over-split                   |
| `JoinCtaSection`             | href                           | none  | Server                   |                                     |
| `HomeBannerCarousel`         | slides `{ src, alt, href? }[]` | index | Client                   | href **BUSINESS DECISION REQUIRED** |
| `KnowledgePreviewSection`    | tips                           | none  | Server                   |                                     |

Do not put `HomePage` JSX in `app/(shop)/page.tsx`.

### 6.2 City — `components/store/city`

Customer discovery city **only**. Registration uses `ServiceAreaStep`.

```text
CitySelector                      D  (c)
├── search field
├── popular city shortcuts
├── province accordion + city checkboxes
├── CitySelectedChips
└── confirm / clear
```

|                 |                                                                                      |
| --------------- | ------------------------------------------------------------------------------------ |
| Responsibility  | Multi-select cities for discovery; confirm writes URL (listing) or preference (home) |
| Inputs          | `open`, `onOpenChange`, `selectedIds`, `onConfirm(ids)`, city tree                   |
| State           | Draft selection until confirm; search query                                          |
| Server / Client | Client overlay; tree data passed from server parent when possible                    |
| Responsive      | Sticky confirm; large checkboxes                                                     |
| a11y            | `dialog`; fieldset per province; announce selected count                             |
| Distinct from   | Step 3 primary + nearby                                                              |

Do not reuse `CitySelector` inside registration.

### 6.3 Search — `components/store/search`

```text
SearchResultsPage                 E
├── query summary
├── SearchResultGroups            D  grouping **BUSINESS DECISION REQUIRED**
│   ├── ServiceTile(s)
│   └── ExpertCard(s)
├── Empty (with city change)
└── error Alert + retry
```

|                 |                                                |
| --------------- | ---------------------------------------------- |
| Responsibility  | Render a submitted query’s hits                |
| Inputs          | `query`, `cities`, `results` or async children |
| Server / Client | Server page composition; client retry on error |
| API             | **API CONTRACT REQUIRED**                      |

### 6.4 Service — `components/store/service`

One architecture for all six slugs.

```text
ServiceDiscoveryPage              E
├── ServiceDiscoveryHero          D  title, intro, jump to experts
├── ServiceScopeSection           D  specialties + real scope accordion
├── ServiceSuggestedExperts       D  surveying-only, real profile links
├── ServiceExpertMarketplace      D  (c)
│   ├── subtype tabs (URL `tab`)
│   ├── city select + compact filter trigger
│   ├── ServiceFilterOverlay      D  (c) ResponsiveDialog: Sheet desktop, Drawer mobile
│   ├── ServiceActiveFilters      D  (c) chips, clear, reset
│   ├── result count (live region)
│   ├── ExpertCard grid
│   ├── Pagination                 C  when more than 9 results
│   └── Empty + change-city
├── ServiceProcessSection         D
├── FaqAccordion                  D  only with real per-service copy
└── ServiceRelatedSection         D
```

| Component                  | Responsibility             | Props                    | Server/Client | Reuse                             |
| -------------------------- | -------------------------- | ------------------------ | ------------- | --------------------------------- |
| `ServiceDiscoveryPage`     | Compose listing            | service, detail, cities  | Server        | All six services                  |
| `ServiceDiscoveryHero`     | Identity + jump to experts | service, detail          | Server        |                                   |
| `ServiceCategoryGrid`      | Six top-level tiles        | items                    | Server        | Home, About, SearchSurface        |
| `ServiceTile`              | One category/subtype tile  | label, href, icon?       | Server        | Grid, popular, drawing, search    |
| `ServiceExpertMarketplace` | Tabs, filters, results     | slug, experts, cities    | Client        | All six services                  |
| `ServiceFilterOverlay`     | Filter form                | definition, draft values | Client        | `ResponsiveDialog` Sheet / Drawer |
| `ServiceEmptyState`        | No hits + change-city CTA  | via marketplace Empty    | Client        | Building-permit included          |
| `ServiceSuggestedExperts`  | Featured surveying experts | experts                  | Server        | Surveying only                    |

**Do not** create `LandSurveyingPage`, `DrawingPage`, etc.

Filter option lists that are cloned surveying skills must not appear on other
services until a real catalog exists (**BUSINESS DECISION REQUIRED**). Safer
Phase 1: shared filters only when they are actually shared (experience bands
may still differ — surveying is 3-band vs 4-band in legacy). Drive from
per-slug config, not one hardcoded chip row.

### 6.5 Expert — `components/store/expert`

```text
ExpertCard                        D
  avatar, name, profession, badges, rating?, specialties (contextual),
  experience, city, CTA → /experts/[id]

ExpertProfilePage                 E
├── ExpertProfileHero             D  navy identity: photo, views, badges, degree, license, city, CTA
│   ├── ExpertAvatarPreview       D  (c) enlarge photo
│   └── ExpertProfileToolbar      D  (c) contact, chat, share, save
├── ExpertQuickFacts              D  sidebar
├── ExpertContactCta              D  (c) ResponsiveDialog phone/SMS
├── ExpertStickyContactBar        D  (c) mobile
├── ExpertAbout / Specialties / ProfessionalInfo / Experience
├── ExpertCertificates            D  text credentials when present
├── ExpertTagSection              D  cities, software
├── ExpertPortfolio               D  (c) grid + ResponsiveDialog viewer, thumbs
├── ExpertReviews                 D  (c) stars, tags, reply, paginate >9, honest submit
└── RelatedExperts
```

| Component                | Responsibility                         | Server/Client                                 | Phase 1                                            |
| ------------------------ | -------------------------------------- | --------------------------------------------- | -------------------------------------------------- |
| `ExpertCard`             | Listing card                           | Server (link); rating display if data present | CORE                                               |
| `ExpertProfilePage`      | Profile composition                    | Server                                        | CORE                                               |
| `ExpertProfileHero`      | Navy identity band                     | Server + client islands                       | CORE                                               |
| `ExpertContactDrawer`    | Phone & SMS via `ResponsiveDialog`     | Client                                        | CORE                                               |
| `ExpertProfessionalInfo` | Education / license / membership       | Server                                        | CORE                                               |
| `ExpertCertificates`     | Named credentials without fake scans   | Server                                        | CORE                                               |
| `ExpertTagSection`       | Titled chip list; empty → hide section | Server                                        | CORE                                               |
| `ExpertExperience`       | Prose; empty → hide                    | Server                                        | CORE                                               |
| `ExpertPortfolio`        | Thumbnails + `ResponsiveDialog` viewer | Client                                        | CORE                                               |
| `ExpertReviews`          | Display list, paginate >9              | Client                                        | Display from catalog; submit is honest unavailable |

**Do not** split Avatar/Badge into domain wrappers. **Do not** create
`SuggestedExpertCard` — use `ExpertCard` with a compact variant if the rail is
confirmed.

**Do not** implement `ExpertChatPanel`, `ExpertSaveButton`, `ExpertShareButton`,
`ReviewForm` in Phase 1. Leave documented gaps, not disabled fake controls.

`ExpertCard` specialties must be **service-contextual** (legacy showed surveying
chips everywhere — **LEGACY ISSUE**).

#### ExpertCard fields (from source, not invented API)

Name, avatar, profession, activity badge, verification badge, rating and review
count **when provided**, specialties, experience years, city, profile href.

### 6.6 Registration — `components/store/registration`

```text
RegistrationShell                 E  (c) provider + chrome
├── RegistrationProgress          D  (c) step i of 9 + Progress
├── step page slot
└── RegistrationStepNav           D  (c) back / continue / submit
      validation + pending + error Alert

IdentityStep                      D  (c)
OtpStep                           D  (c)
ServiceAreaStep                   D  (c)
ExpertiseStep                     D  (c)
  └── ExpertiseCategorySheet      D  (c)
PersonalInfoStep                  D  (c)
EducationStep                     D  (c)
OrganizationStep                  D  (c)
ProfessionalResumeStep            D  (c)
PortfolioStep                     D  (c)
  └── CertificateFields           D  (c)
RegistrationComplete              D
```

| Component                | Responsibility                                               | Inputs                                         | State owner                   | Server/Client             |
| ------------------------ | ------------------------------------------------------------ | ---------------------------------------------- | ----------------------------- | ------------------------- |
| `RegistrationShell`      | Provider, progress, children                                 | `currentStep`                                  | Wizard committed values       | Client                    |
| `RegistrationProgress`   | Visual step                                                  | index, total, labels                           | none                          | Client ok (reads context) |
| `RegistrationStepNav`    | Back/continue, disable while invalid/pending                 | labels, `isLast`                               | form + mutation pending       | Client                    |
| `IdentityStep`           | Mobile, national ID, terms text/link                         | defaults                                       | RHF                           | Client                    |
| `OtpStep`                | 5-digit OTP, timer, resend, edit phone                       | masked phone                                   | RHF + timer                   | Client                    |
| `ServiceAreaStep`        | Province, city, nearby                                       | catalogs                                       | RHF                           | Client                    |
| `ExpertiseStep`          | Selected chips + category sheets                             | catalogs                                       | RHF + sheet                   | Client                    |
| `ExpertiseCategorySheet` | Multi-select expertise ± software                            | category                                       | local until confirm into form | Client                    |
| `PersonalInfoStep`       | Name, avatar, summary; location **only if P0 says it stays** | defaults                                       | RHF                           | Client                    |
| `EducationStep`          | Branching level → degrees → files                            | defaults                                       | RHF                           | Client                    |
| `OrganizationStep`       | Conditional membership/license/qualifications                | defaults                                       | RHF                           | Client                    |
| `ProfessionalResumeStep` | Years + text                                                 | defaults                                       | RHF                           | Client                    |
| `PortfolioStep`          | Images, certificates, rules, submit                          | defaults                                       | RHF                           | Client                    |
| `CertificateFields`      | Repeatable title + file                                      | array fields                                   | RHF                           | Client                    |
| `RegistrationComplete`   | Success copy + CTA                                           | **BUSINESS DECISION REQUIRED** for destination | none                          | Server                    |

Shared registration logic (guard, commit, go next, map server errors) lives in
`hooks/use-registration-wizard/` plus the provider. **Do not** copy next/back
into each step.

Each step is a route file that renders one step component — not nine copies of
the shell.

### 6.7 Articles — `components/store/article`

```text
ArticlesPage                      E  hub + category chips + list
├── ArticleCategoryFilter         D  همه + categories from catalog
├── ArticleFeatured               D  page 1 editorial lead
├── ArticleCard grid
├── Pagination
└── RelatedArticles               D  recommended by tag/category/featured
ArticleCategoryPage               E
ArticleDetailPage                 E
├── StoreBreadcrumb
├── ArticleSidebar                D  RTL-right: categories + derived TOC (lg sticky)
├── article header / cover
├── ArticleTocMobile              (c) Accordion — not a desktop sidebar
├── ArticleBody                   D  semantic h2–h5 with stable ids
├── article FAQs → Accordion
├── related service CTA → Button link
├── RelatedArticles               D  shared tags, then same category
└── ArticleComments               (c) list, form, mock-only submit, pagination
ArticleCard                       D  image, category, title, summary, meta, read-more
```

Category chips on `/articles` use `?category=` and reset `page`. Search/sort controls: omit until content API exists (do not ship inert UI).

### 6.8 FAQ — `components/store/faq`

```text
FaqLandingPage                    E
  └── FaqCategoryCard             D  only categories with content
FaqCategoryPage                   E
  └── Accordion of questions
      + service CTA
```

No `FaqAskDialog` in Phase 1.

### 6.9 Knowledge — `components/store/knowledge`

```text
KnowledgeLandingPage              E
  └── KnowledgeCategoryCard       D
KnowledgeCategoryPage             E
  ├── KnowledgeTipList            D
  │     KnowledgeTipItem          D  (only if item markup is non-trivial)
  └── LoadMoreButton              C  when API exists
```

Do not fabricate counts or extra categories.

### 6.10 Engineering forms — `components/store/engineeringForm`

**NEEDS CONFIRMATION.** If built later:

```text
EngineeringFormsPage              E
├── filters (search, province, category)
└── EngineeringFormRow            D  name + download
```

Do not invent rows or file URLs now.

### 6.11 Legal / about

```text
AboutPage                         E  store/about/aboutPage
  ├── ContentPageHeader
  ├── prose sections
  └── ServiceCategoryGrid         (omit blurbs if still surveying clones)
LegalPage                         E  store/legal/legalPage
  └── LegalDocument
```

About is domain (`store/about`) because of service CTAs. Legal is thin enough
to live in `store/legal` or even `common` + page composition; keep
`store/legal/legalPage` so `app/` stays thin.

---

## 7. Page composition vs routes

| Route file                                | Imports                            |
| ----------------------------------------- | ---------------------------------- |
| `app/(shop)/page.tsx`                     | `HomePage`                         |
| `app/(shop)/search/page.tsx`              | `SearchResultsPage`                |
| `app/(shop)/services/[slug]/page.tsx`     | `ServiceDiscoveryPage`             |
| `app/(shop)/experts/[id]/page.tsx`        | `ExpertProfilePage`                |
| `app/(shop)/articles/page.tsx`            | `ArticlesPage`                     |
| `app/(shop)/articles/[slug]/page.tsx`     | `ArticleDetailPage`                |
| `app/(shop)/faq/page.tsx`                 | `FaqLandingPage`                   |
| `app/(auth)/expert-registration/page.tsx` | `IdentityStep` (shell from layout) |
| …other wizard pages                       | matching `*Step`                   |

Route files may: read params, fetch on the server, wrap `Suspense`. They may
not: own form state, drawers, or large markup.

---

## 8. Server vs Client strategy

Default: Server.

| Needs Client                        | Examples                                                        |
| ----------------------------------- | --------------------------------------------------------------- |
| Overlays                            | Search, city, filters, menu, contact, gallery, expertise sheets |
| Forms                               | Entire registration steps, not the shop layout                  |
| URL tabs/chips that `router.push`   | Subtype tabs, filter chips                                      |
| Carousel / OTP timer / file preview | Home banners, `OtpStep`, avatar/portfolio previews              |
| TanStack Query mutations            | Registration, resend OTP, load-more                             |

Keep client boundaries **small**:

```text
ServiceDiscoveryPage (Server)
  ServiceHero (Server)
  ServiceFilterBar (Client) ← only the bar
  ServiceExpertList (Server) ← cards stay server
```

Do not mark `HomePage`, `ExpertProfilePage`, or shop `layout.tsx` as Client
because a child overlay is interactive.

Root `app/layout.tsx` stays Server.

---

## 9. Form architecture

Stack already in the repo: **React Hook Form**, **Zod**, **@hookform/resolvers**,
design-system Field / Input / FileUpload / OtpInput.

### 9.1 Patterns

- One Zod schema per registration step in `lib/validation/` or colocated under
  `components/store/registration/*/type/` if the schema is step-only.
- Shared field error display: `Field` `error` + `aria-invalid`.
- Required indicator via `Field` (legacy step 1 had no terms checkbox —
  **BUSINESS DECISION REQUIRED**).
- Optional copy uses explicit helper text, not color alone.
- Async issues (duplicate phone, wrong OTP, upload fail) map through
  `setError` / `Alert` — **API CONTRACT REQUIRED** for codes.
- File inputs: RHF values are `File` / `File[]`; upload progress is local UI
  state around `FileUpload`. Do not invent upload endpoints.
- OTP: `Controller` wrapping `OtpInput`; digits converted by the primitive.
- Multi-step: **not** one giant `useForm` across routes. Each step has its own
  `useForm`. `RegistrationWizardProvider` holds committed snapshots.
- Do not duplicate schema checks in `onClick` handlers when Zod already owns
  them.

### 9.2 Wizard navigation

```text
onContinue:
  validate step schema
  → optional API persist (API CONTRACT REQUIRED)
  → commit into provider
  → router.push(nextPath)

onBack:
  router.push(previousPath)  // no re-validation

onEditPhone (OTP):
  router.push('/expert-registration')

onResend:
  mutation; stay on OTP; restart timer
```

Step 6–7 branching stays inside those step components (education level,
nezam yes/no). The route does not change per branch.

### 9.3 Non-registration forms

| Form                         | Phase 1                                      |
| ---------------------------- | -------------------------------------------- |
| Home review / profile review | **NEEDS CONFIRMATION** — do not build        |
| FAQ ask-a-question           | **NEEDS CONFIRMATION**                       |
| Engineering forms download   | **NEEDS CONFIRMATION**                       |
| Search field                 | Not RHF; controlled input in `SearchSurface` |
| City search filter           | Local state in `CitySelector`                |
| Filters                      | Local draft in sheet; commit to URL          |

---

## 10. Data / type boundaries

### Shared domain — `types/store/`

Create types only for product concepts that Task 01 supports. Fields are
front-end domain fields, **not** invented backend columns.

| File                    | Types (conceptual)                                                            |
| ----------------------- | ----------------------------------------------------------------------------- |
| `expert.types.ts`       | `Expert`, `ExpertCardData`, `ExpertProfile`, `PortfolioItem`                  |
| `service.types.ts`      | `ServiceCategory`, `ServiceSlug`, `ServiceFilters`                            |
| `city.types.ts`         | `Province`, `City`                                                            |
| `search.types.ts`       | `SearchQuery`, result union **after** index decision                          |
| `registration.types.ts` | `RegistrationData` aggregate, `EducationEntry`, `License`, `CertificateEntry` |
| `article.types.ts`      | `Article`, `ArticleCardData`                                                  |
| `faq.types.ts`          | `FaqCategory`, `FaqItem`                                                      |
| `knowledge.types.ts`    | `KnowledgeCategory`, `KnowledgeTip`                                           |
| `review.types.ts`       | `Review` — only if display ships                                              |

Do not create giant `types/index.ts`. Do not add payment, chat-thread, or
user-account types until those products exist.

### Colocated — `components/.../type/`

Props: `expertCard.types.ts`, `registrationShell.types.ts`, etc.

If `Expert` is used by card, profile, and search, it belongs in `types/store`,
not copied in three `type/` folders.

### Config — `config/`

| Module                | Role                                            |
| --------------------- | ----------------------------------------------- |
| `site.config`         | Exists. Expand with contact when appropriate    |
| `navigation.config`   | Header/footer/menu: real hrefs only             |
| `services.config`     | Slugs, labels, tabs, which filters apply, intro |
| `registration.config` | Step order, titles, paths                       |

---

## 11. API module map (no URLs)

| Module                              | Owns                                             | Hooks (client, only if needed)                    |
| ----------------------------------- | ------------------------------------------------ | ------------------------------------------------- |
| `services/city-service`             | Province/city tree                               | `hooks/use-city-selection` for applying selection |
| `services/search-service`           | Query → hits                                     | typeahead later                                   |
| `services/expert-service`           | List by service, get by id                       | load-more query                                   |
| `services/registration-service`     | Each step persist, OTP send/verify, final submit | `use-registration-wizard`                         |
| `services/article-service`          | List/detail                                      | —                                                 |
| `services/faq-service`              | Categories/items                                 | —                                                 |
| `services/knowledge-service`        | Categories/tips                                  | load-more                                         |
| `services/review-service`           | **NEEDS CONFIRMATION**                           | —                                                 |
| `services/engineering-form-service` | **NEEDS CONFIRMATION**                           | —                                                 |

`lib/api/http-client` remains the only HTTP. Native fetch only.

Listings: first page in a Server Component. Load-more: TanStack Query or
`page` searchParam — **API CONTRACT REQUIRED** for cursor vs page.

---

## 12. Reuse matrix

| Component                             | Used by                                                                       | Shared?                    |
| ------------------------------------- | ----------------------------------------------------------------------------- | -------------------------- |
| `ExpertCard`                          | Service list, search results, optional home showcase, optional suggested rail | Yes — real reuse           |
| `ServiceTile` / `ServiceCategoryGrid` | Home, about, search surface                                                   | Yes                        |
| `CitySelector`                        | Header, home, service empty, search                                           | Yes (discovery only)       |
| `SearchSurface`                       | Header, home hero                                                             | Yes                        |
| `ArticleCard`                         | Hub, category, related                                                        | Yes                        |
| `SectionHeader`                       | Many                                                                          | Yes                        |
| `StoreBreadcrumb`                     | Content/legal/detail                                                          | Yes                        |
| `Carousel`                            | Banners, optional knowledge                                                   | Yes if two+ carousels ship |
| `LoadMoreButton`                      | Lists                                                                         | Yes                        |
| `ExpertTagSection`                    | Profile lists                                                                 | Feature-internal reuse     |
| `RegistrationStepNav`                 | All wizard steps                                                              | Feature-internal           |
| `LegalDocument`                       | Terms + privacy                                                               | Yes                        |
| `ServiceAreaStep` city UI             | Registration only                                                             | **Not** `CitySelector`     |

Avoid premature generics (`MediaCard`, `CatalogLayout`) until a second real
consumer exists.

---

## 13. Responsibility rules (summary)

1. Primitives never learn about experts, services, or OTP product rules
   (`OtpInput` stays generic `length`).
2. Layout never renders `ExpertCard` or registration fields.
3. Common never owns API calls.
4. Domain components call hooks/services; they do not call `fetch` directly.
5. Page composition components may be async Server Components that await
   services and pass data down.
6. Files stay under ~150 lines; split when a step (education, organization,
   expertise) grows — split by branch UI, not by visual atom (no
   `ExpertName.tsx`).
7. Prefer one `ExpertTagSection` over `ExpertSpecialtyList` +
   `ExpertCityList` + `ExpertSoftwareList` unless their empty/error behavior
   diverges.

---

## 14. Accessibility requirements (components)

| Topic           | Requirement                                                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Keyboard        | All overlays, tabs, chips, gallery, filters operable without a pointer                                                        |
| Focus           | Open overlay → move focus in; close → restore trigger. Wizard continue errors → focus first invalid field                     |
| Dialogs/drawers | Modal-like UI uses `ResponsiveDialog` (Drawer below `md`). Label with `title`. Menu `aria-controls` must match the overlay id |
| Forms           | Visible `Label`; errors in `Field`; required announced; do not rely on placeholder-as-label                                   |
| Headings        | Card names are headings inside `article`; page `h1` once                                                                      |
| Images          | Meaningful alt for portfolio/work; decorative icons `aria-hidden`                                                             |
| Loading         | Skeleton that mirrors layout; `aria-busy` on lists; Spinner has accessible name                                               |
| Validation      | Text + `aria-describedby`; color not the only signal                                                                          |
| Reduced motion  | Carousel autoplay off; progress/OTP timer still updates                                                                       |
| Contrast        | Semantic tokens only                                                                                                          |
| Screen readers  | Live region for result counts, OTP timer remaining, city confirm count                                                        |
| LTR islands     | OTP, tel, national ID, `ltr-data`                                                                                             |

---

## 15. Responsive requirements (components)

| Component                                  | Mobile behavior                                                      |
| ------------------------------------------ | -------------------------------------------------------------------- |
| `StoreHeader`                              | 44px-class icon buttons; no truncated unlabelled icons               |
| `SearchSurface` / `CitySelector` / filters | `ResponsiveDialog` Drawer; sticky primary action                     |
| `ExpertCard`                               | Full-width; specialties wrap; CTA full-width                         |
| `ExpertProfileHeader`                      | Stack; stats as a simple list                                        |
| `ExpertContactBar`                         | Position sticky bottom; `padding-bottom` on profile main             |
| `ExpertPortfolioGallery`                   | 2-col grid; tap to expand                                            |
| `RegistrationProgress`                     | Text “گام ۳ از ۹” + bar; do not force 9 circles                      |
| `RegistrationStepNav`                      | Sticky bottom, two buttons, safe-area                                |
| `ExpertiseCategorySheet`                   | One category at a time; confirm commits; no nested offcanvas stack   |
| `FileUpload`                               | Tap to native picker; preview list with remove                       |
| `ServiceExpertMarketplace`                 | Sticky city/filter bar; chips wrap; Drawer filters; one-column cards |
| `ServiceFilterOverlay`                     | `ResponsiveDialog`: Drawer below `md`, start Sheet from `md`         |
| `ArticleToc`                               | In-flow list, not a sticky unused sidebar                            |

---

## 16. Design-system usage

Visual source of truth is [DESIGN-SYSTEM.md](../DESIGN-SYSTEM.md) and
`css/globals.css`.

- Semantic utilities only (`bg-primary`, `text-muted-foreground`, `border-border`).
- Containers: `container-app`, `container-narrow`, `container-form`, `container-wide`.
- Type: `type-*` utilities.
- Glass only on sticky header, search overlay, hero overlay if needed, modal/sheet.
- Cards stay light-bordered, not floating.
- Pill radius for chips/filters/badges, not expert cards.

No new styling system. No Bootstrap. No extra UI kit.

---

## 17. Quality check

- Domain components are not planned under `components/ui/`.
- No second Button/Input/Dialog family. Modal product UI composes Dialog/Sheet/Drawer through `ResponsiveDialog`.
- Pages are not planned as `"use client"` roots.
- No duplicated service page components.
- Registration covers nine steps + completion with shared shell/nav.
- City selector is not the registration location step.
- Chat/save/share/review-form are not fake disabled buttons in Phase 1.
- `engineer` naming from foundation examples is not used.
