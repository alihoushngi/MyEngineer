# Legacy Frontend Audit

> Historical planning snapshot, preserved for decision context. This is not the current implementation or an instruction for active work. See the [current architecture](../ARCHITECTURE.md), [design reference audit](../design-reference-audit.md), and [documentation index](../README.md). The local client source is `Design/`; earlier absolute paths and product-scope exclusions below describe a previous phase. Header, Footer, Login, and Registration are excluded from this alignment.

## Purpose

The employer-provided legacy frontend is used as a:

- content reference
- product behavior reference
- flow reference

It is **not** a visual design target.

Phase 0 and TASK 00.5 already define architecture and the Mohandes Man design
system. This audit extracts product meaning from the legacy HTML/CSS/JS so later
implementation can rebuild a coherent storefront without copying Bootstrap
markup, IRANSansWeb, or legacy JavaScript.

**Legacy root (not in this repository):**
`/Users/ali/Desktop/Personal/Project/Mohandesi/New folder/`

The legacy tree is incomplete, duplicated, and partly placeholder-based. This
document classifies every finding as one of:

| Classification                 | Meaning                                                              |
| ------------------------------ | -------------------------------------------------------------------- |
| **SOURCE REQUIREMENT**         | Explicitly present in employer files                                 |
| **UX COMPLETION**              | Not completed in legacy, but required for a coherent user experience |
| **BUSINESS DECISION REQUIRED** | Cannot be determined safely from source                              |
| **LEGACY ISSUE**               | Broken, contradictory, duplicated, placeholder, or obsolete          |
| **TECHNICAL MIGRATION NOTE**   | Concern for later Next.js implementation, not a product invention    |

Do not treat a legacy `href` as an API contract. Do not invent backend rules,
ranking, or missing FAQ/knowledge copy.

---

## Source Inventory

Every meaningful employer page in the legacy tree:

| Legacy File                                 | Product Area          | Purpose                                      | Main Interactions                                      | Proposed Future Route                                 | Notes                                                             |
| ------------------------------------------- | --------------------- | -------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------- | ----------------------------------------------------------------- |
| `index.html`                                | Home                  | Storefront landing and discovery entry       | Nav, search offcanvas, city offcanvas, service tiles   | `/`                                                   | Complete marketing shell; many CTAs are `#`                       |
| `resume.html`                               | Expert profile        | Public specialist resume                     | Contact, chat mock, gallery, reviews, auth modal       | `(shop)/experts/[id]`                                 | Single demo profile; no expert id                                 |
| `auth/step1.html`                           | Expert registration   | Identity (mobile + national code)            | Client validation, terms link                          | `(auth)/expert-registration`                          | Laravel `{{ route }}` placeholder                                 |
| `auth/step2.html`                           | Expert registration   | Five-digit OTP                               | Digit boxes, timer, resend, edit phone                 | `(auth)/expert-registration/otp`                      | Resend `href` is `step3.html` (**LEGACY ISSUE**)                  |
| `auth/step3.html`                           | Expert registration   | Service area                                 | Province, city, nearby-city tags                       | `(auth)/expert-registration/service-area`             | Nearby list is static; no cascade                                 |
| `auth/step4.html`                           | Expert registration   | Expertise and software                       | Category offcanvases, multi-select                     | `(auth)/expert-registration/expertise`                | Major feature; incomplete catalogs                                |
| `auth/step5.html`                           | Expert registration   | Personal info + expertise summary            | Remove expertise, avatar preview                       | `(auth)/expert-registration/personal-info`            | Re-asks location from step 3                                      |
| `auth/step6.html`                           | Expert registration   | Education                                    | Level → degrees → generated uploads                    | `(auth)/expert-registration/education`                | Next button is dead                                               |
| `auth/step7.html`                           | Expert registration   | Engineering organization                     | Membership, license, qualifications                    | `(auth)/expert-registration/engineering-organization` | Fields have no `name`; no navigation                              |
| `auth/step8.html`                           | Expert registration   | Professional resume                          | Years + text                                           | `(auth)/expert-registration/professional-resume`      | Submit posts to `/submit-resume`, not step 9                      |
| `auth/step9.html`                           | Expert registration   | Portfolio, certificates, rules, submit       | Multi image, cert rows, checkbox                       | `(auth)/expert-registration/portfolio`                | No success screen                                                 |
| `services/land-surveying.html`              | Service discovery     | Find land-surveying specialists              | Search, city, filters, listing, FAQ, suggested experts | `(shop)/services/land-surveying`                      | Most complete service template                                    |
| `services/construction-workers.html`        | Service discovery     | Find workers and contractors                 | Dual tabs, dual filter bars                            | `(shop)/services/construction-workers`                | Surveying copy cloned onto both tabs                              |
| `services/drawing.html`                     | Service discovery     | Find drawing specialists                     | Four discipline tabs                                   | `(shop)/services/drawing`                             | Tabs exist; FAQ/cards still surveying                             |
| `services/interior-design.html`             | Service discovery     | Find facade/interior designers               | Filters, listing, placeholder info                     | `(shop)/services/interior-design`                     | Older visual generation                                           |
| `services/building-permit.html`             | Service discovery     | Find permit/completion specialists           | Filters, listing                                       | `(shop)/services/building-permit`                     | No empty-result block                                             |
| `services/construction-admin-services.html` | Service discovery     | Find administrative-service specialists      | Filters, listing                                       | `(shop)/services/administrative-services`             | Surveying filters copied                                          |
| `articles/article-landing.html`             | Articles              | Blog home                                    | Search UI, sort UI, popular/recommended/newest         | `(shop)/articles`                                     | Broken relative link to all-articles                              |
| `articles/all-articles.html`                | Articles              | Full article list                            | Same search/filters, grid                              | `(shop)/articles` (list view)                         | Cards point at non-existent `/article/...` paths                  |
| `articles/article-sum.html`                 | Articles              | Category listing                             | Banner + cards                                         | `(shop)/articles/categories/[slug]`                   | Category title does not match filters                             |
| `articles/sample-article.html`              | Articles              | Article detail                               | TOC, FAQs, related, service CTA                        | `(shop)/articles/[slug]`                              | Related/category links are `#`                                    |
| `FAQs/landig-faq.html`                      | FAQ                   | FAQ landing                                  | Category cards, search UI                              | `(shop)/faq`                                          | Filename typo `landig`; most cards have no destination            |
| `FAQs/faq-land-surveying.html`              | FAQ                   | Surveying FAQ category                       | Accordion, service CTA                                 | `(shop)/faq/land-surveying`                           | Only concrete FAQ category page                                   |
| `knowledge/knowledge-category.html`         | Knowledge             | Knowledge landing                            | Category cards, search/filter UI                       | `(shop)/knowledge`                                    | Only surveying card has a (wrong) destination                     |
| `knowledge/knowledge-surveying.html`        | Knowledge             | Surveying tips list                          | Tip list, load more, sidebar                           | `(shop)/knowledge/land-surveying`                     | Load more unwired; other categories `#`                           |
| `knowledge/forms.html`                      | Engineering forms     | Form catalog stub                            | Search, province/category selects, one download icon   | `(shop)/engineering-forms`                            | Incomplete placeholder page                                       |
| `about-us/about-us.html`                    | About                 | Platform story                               | Service CTAs                                           | `(shop)/about`                                        | Non-survey cards reuse surveying blurbs                           |
| `about-us/terms.html`                       | Legal                 | Terms of use                                 | Long-form legal                                        | `(shop)/terms`                                        | Mentions accounts/payments not in UI                              |
| `about-us/privacy-policy.html`              | Legal                 | Privacy policy                               | Long-form legal + contact                              | `(shop)/privacy-policy`                               | Mentions panel, deletion, cookies                                 |
| `assets/js/auth.js`                         | Legacy behavior       | Registration wizard client logic             | Validation, education, nezam, uploads                  | —                                                     | Do not migrate as-is                                              |
| `assets/js/main.js`                         | Legacy behavior       | Storefront interactions                      | Filters, tabs, city, gallery, chat, reviews            | —                                                     | Do not migrate as-is                                              |
| `assets/css/main.css`                       | Legacy CSS            | Custom visual layer (~4724 lines)            | —                                                      | —                                                     | **Not** part of the new design system                             |
| `assets/css/bss-overrides.css`              | Legacy CSS            | Bootstrap Studio spacing/color overrides     | —                                                      | —                                                     | Do not import                                                     |
| `assets/css/IRANSansWeb.css`                | Legacy CSS            | IRANSansWeb `@font-face`                     | —                                                      | —                                                     | New app uses local Kalameh                                        |
| `assets/bootstrap/*`                        | Legacy infrastructure | Bootstrap CSS/JS                             | Offcanvas, modal, accordion, carousel                  | —                                                     | Do not import                                                     |
| `assets/fonts/*`                            | Legacy infrastructure | IRANSansWeb, Font Awesome, Ionicons          | Icons, type                                            | —                                                     | New app uses lucide-react + Kalameh                               |
| `assets/img/*`                              | Assets                | Banners, persons, service icons, sample work | —                                                      | —                                                     | Content/reference only; folder names include garbage (`wfscvfvc`) |

### Duplicates, variants, placeholders, incomplete pages

| Kind                         | Evidence                                                                                                | Classification              |
| ---------------------------- | ------------------------------------------------------------------------------------------------------- | --------------------------- |
| Duplicate chrome             | Search + city offcanvas copied onto home and all six service pages                                      | **LEGACY ISSUE**            |
| Duplicate visual generations | Service Gen A (`header-services`) vs Gen B (`color-header`)                                             | **LEGACY ISSUE**            |
| Duplicate demo experts       | Home showcase repeats `مهندس احمد رضایی`; listings repeat one card                                      | **LEGACY ISSUE**            |
| Duplicate legal/auth shells  | Phone/OTP auth modal on home and resume                                                                 | **LEGACY ISSUE**            |
| Variant of same screen       | `article-landing.html` vs `all-articles.html` share search/filter/card markup                           | **SOURCE REQUIREMENT** (IA) |
| Placeholder pages            | `knowledge/forms.html`; popular-service tiles `href="#"`; most FAQ/knowledge categories                 | **LEGACY ISSUE**            |
| Incomplete pages             | Registration steps 6–7 do not advance; step 9 has no success UI; building-permit has no empty state     | **UX COMPLETION**           |
| Missing files referenced     | `knowledge-page.html`, `FAQs.html`, `#offcanvas-phone-authentication`, `#entryQuestion` on FAQ category | **LEGACY ISSUE**            |

Do not blindly reuse legacy filenames (`landig-faq.html`, `construction-admin-services.html`, `resume.html`).

---

## Home

**File:** `index.html`

Home is the customer discovery entry and specialist-join entry. Visual appearance
is not a requirement.

### Navigation

| Item                | Purpose                 | User action      | Destination                            | Content dependency | Complete? | Classification                                                                            |
| ------------------- | ----------------------- | ---------------- | -------------------------------------- | ------------------ | --------- | ----------------------------------------------------------------------------------------- |
| Brand               | Return home             | Click logo       | `/` and `index.html`                   | Static             | Yes       | **SOURCE REQUIREMENT**                                                                    |
| Menu button         | Open site menu          | Open `#mainMenu` | Offcanvas                              | Static             | Partial   | **SOURCE REQUIREMENT**; `aria-controls="mobileMenu"` vs `#mainMenu` is a **LEGACY ISSUE** |
| `عضویت متخصصان`     | Start specialist signup | Navigate         | `auth/step1.html`                      | Static             | Yes       | **SOURCE REQUIREMENT**                                                                    |
| Menu: home          | Return home             | Navigate         | `index.html`                           | Static             | Yes       | **SOURCE REQUIREMENT**                                                                    |
| Menu: six services  | Enter a service         | Navigate         | Matching `services/*.html`             | Static             | Yes       | **SOURCE REQUIREMENT**                                                                    |
| Menu: articles      | Open blog               | Navigate         | `articles/article-landing.html`        | Static             | Yes       | **SOURCE REQUIREMENT**                                                                    |
| Menu: knowledge     | Open knowledge          | Navigate         | `knowledge/knowledge-category.html`    | Static             | Yes       | **SOURCE REQUIREMENT**                                                                    |
| Menu: terms / about | Legal / about           | Navigate         | `about-us/terms.html`, `about-us.html` | Static             | Yes       | **SOURCE REQUIREMENT**                                                                    |
| Menu: FAQ accordion | FAQ by topic            | Navigate         | Only surveying is real; rest `#`       | Incomplete         | No        | **LEGACY ISSUE**                                                                          |

Menu logo uses `https://via.placeholder.com/120x40?text=Logo` — **LEGACY ISSUE**.

### Specialist registration entry

Present in navbar, hero (`شما هم یکی از هزاران عضو سایت مهندس من شوید`), join
section, and menu. All go to `auth/step1.html`.

**SOURCE REQUIREMENT.** Interaction is complete as navigation.

### Search

Hero trigger text: `جستجو در خدمات و متخصصین...`. Opens `#searchCanvas`.
See [Global Search](#global-search).

### City selection

Trigger label default: `انتخاب شهر`. Opens `#cityCanvas`.
See [City Selection](#city-selection).

### Main service categories

Heading: `بدنبال چه خدمتی هستید؟`

| Label                       | Destination                                 | Complete? |
| --------------------------- | ------------------------------------------- | --------- |
| نقشه برداری                 | `services/land-surveying.html`              | Yes       |
| استادکار و پیمانکار ساختمان | `services/construction-workers.html`        | Yes       |
| ترسیم نقشه                  | `services/drawing.html`                     | Yes       |
| طراحی نما و داخلی           | `services/interior-design.html`             | Yes       |
| پروانه ساخت و پایان کار     | `services/building-permit.html`             | Yes       |
| خدمات اداری                 | `services/construction-admin-services.html` | Yes       |

Side control `سوالات متداول` opens `#faqCategoryModal`. Only surveying has a
destination. Other category buttons have no `href`. Ask-question CTA opens
`#entryQuestion` (textarea + send; no API).

**SOURCE REQUIREMENT** for the six categories. FAQ modal is **UX COMPLETION** /
**LEGACY ISSUE**.

### Hero / intro

Heading: `پلتفرم جامع خدمات ساختمانی در سراسر کشور`.
Subcopy: free connection with engineers, contractors, and building specialists.
Read-only plus join link.

**SOURCE REQUIREMENT.**

### Banners / carousel

Bootstrap `#carousel-slider`, 4s interval, three images, no click-through.
All alts say surveying.

**SOURCE REQUIREMENT** (section exists). Banner destinations are
**BUSINESS DECISION REQUIRED**. Duplicate alts are a **LEGACY ISSUE**.

### Popular services

Heading: `خدمات پرکاربرد`. Six tiles, all `href="#"`, same surveying image.

| Label                   |
| ----------------------- |
| نقشه برداری(سند مالکیت) |
| بنای سیمانکار           |
| خدمات اداری اداره ثبت   |
| پیمانکار اسکلت ساختمان  |
| طراحی نمای ساختمان      |
| دریافت پروانه ساخت      |

**SOURCE REQUIREMENT** (section). Destinations are **UX COMPLETION** and
**BUSINESS DECISION REQUIRED** (map to service or subcategory).

### Drawing consultation

Heading: `مشاوره ترسیم نقشه`. Four tiles, all `href="#"`: معماری، سازه، برق،
مکانیک. Likely should open drawing service tabs — **BUSINESS DECISION REQUIRED**.

### Platform explanation

`مهندس من چیست ؟` — verified specialists, free phone contact. Read-only.
**SOURCE REQUIREMENT.**

### Why Mohandes Man

`چرا مهندس من؟` — comprehensive services, fast free access, transparency,
qualification verification. Read-only. **SOURCE REQUIREMENT.**

### Specialist join CTA

`پیوستن متخصصان` → `auth/step1.html`. **SOURCE REQUIREMENT.**

### Expert showcase

`متخصصین ما` — repeating cards, all `resume.html`, same name/image.
Pause control `#toggleScroll` has **no JS**. **SOURCE REQUIREMENT** (showcase)

- **LEGACY ISSUE** (duplicate demo data, dead pause) + **BUSINESS DECISION REQUIRED**
  (featured-expert source).

### Testimonials / reviews

Three identical slides (`آقای ماهان کرامتی`). `ثبت نظر` opens a comment form;
submit opens `#modal-authentication` (phone + 4-digit OTP shell). Home OTP is
four boxes; expert registration OTP is five. Phone-edit target
`#offcanvas-phone-authentication` is missing.

**SOURCE REQUIREMENT** (social proof). Submit/auth is **UX COMPLETION** /
**LEGACY ISSUE**. Customer review-on-home vs expert-profile reviews is
**BUSINESS DECISION REQUIRED**.

### Article / knowledge / FAQ links

- Articles: menu + footer only (no home article strip) — **BUSINESS DECISION REQUIRED** whether home needs one.
- Knowledge carousel: three slides, all `knowledge/knowledge-surveying.html`.
- FAQ: footer → `FAQs/landig-faq.html`; menu/modal mostly placeholders.

### Footer

| Block                       | Destinations                                               | Complete? |
| --------------------------- | ---------------------------------------------------------- | --------- |
| خدمات مهندسی                | permit, interior, drawing pages                            | Yes       |
| خدمات استادکاری و پیمانکاری | Four items with **no `href`**                              | No        |
| منابع                       | articles, FAQ, knowledge                                   | Yes       |
| شرکت                        | about                                                      | Yes       |
| Social                      | Telegram, YouTube, WhatsApp, Instagram, LinkedIn — all `#` | No        |
| Contact                     | `tel:01332442501`, `tel:09965794766`, Rasht address        | Yes       |
| Legal                       | privacy, terms                                             | Yes       |

Copyright: Hyrcan, 2025. **SOURCE REQUIREMENT** for contact/legal.
Social URLs and contractor footer links are **LEGACY ISSUE** /
**BUSINESS DECISION REQUIRED**.

---

## Global Search

Search is a **shell**, not a working product.

| Question            | Evidence                                                                                                                            | Classification                     |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Services vs experts | Trigger: `جستجو در خدمات و متخصصین...`; input: `جستجو در خدمات، سرویس‌ها...`; popular tags and category grid are service names only | **BUSINESS DECISION REQUIRED**     |
| What opens          | Bootstrap offcanvas `#searchCanvas`                                                                                                 | **SOURCE REQUIREMENT**             |
| Result destination  | None. Tags are `<span>`. Categories are `<div>`. No results list                                                                    | **UX COMPLETION**                  |
| Recent searches     | Absent                                                                                                                              | **UX COMPLETION**                  |
| Popular             | Hardcoded: نقشه برداری، طراحی نما، ترسیم نقشه معماری، بنای ساختمان                                                                  | **SOURCE REQUIREMENT** (static IA) |
| No-result           | Absent on search surface                                                                                                            | **UX COMPLETION**                  |
| Category grouping   | Visual grid of six groups; `محاسبات ساختمان` is in search but not a home tile                                                       | **BUSINESS DECISION REQUIRED**     |
| JS                  | None in `main.js` / `auth.js`                                                                                                       | **LEGACY ISSUE**                   |

Do not invent ranking, fuzzy matching, or backend search algorithms.

**TECHNICAL MIGRATION NOTE:** Compose the existing design-system Input + Sheet/Drawer.
Deduplicate the offcanvas currently copied onto seven pages.

---

## City Selection

Customer search city and registration city are **different product concepts**.
Do not force one component model onto both.

### Customer discovery city (`#cityCanvas` on home + services)

| Concern           | Legacy behavior                                                                     | Classification                                                      |
| ----------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Cardinality       | **Multiple** cities via `.city-checkbox`                                            | **SOURCE REQUIREMENT**                                              |
| Province grouping | Accordion; only East/West Azerbaijan sample (+ Tehran misplaced under East)         | **UX COMPLETION** / **LEGACY ISSUE**                                |
| City search       | `#citySearch` present; **no filter JS**                                             | **UX COMPLETION** / **LEGACY ISSUE**                                |
| Popular cities    | تهران، مشهد، اصفهان، شیراز — **no click handlers**                                  | **UX COMPLETION** / **LEGACY ISSUE**                                |
| Selected display  | Chips in `#selectedCities`; trigger shows city name or `N شهر`                      | **SOURCE REQUIREMENT**                                              |
| Clear             | Per-chip `×` and `#clearCities` work                                                | **SOURCE REQUIREMENT**                                              |
| Confirm           | `تایید (N)` does not close canvas; counters never updated                           | **LEGACY ISSUE**                                                    |
| Persistence       | `localStorage.selectedCities` = JSON string array of city **names**                 | **SOURCE REQUIREMENT**                                              |
| Nearby cities     | Not in customer UI                                                                  | Contrast with registration                                          |
| Expert results    | Service pages show `.selectedCityDisplay`; default HTML `رشت`; count `23` is static | **SOURCE REQUIREMENT** (intent) / **LEGACY ISSUE** (no real filter) |

### Registration city (`auth/step3.html`)

| Concern      | Registration behavior                                                      | vs customer       |
| ------------ | -------------------------------------------------------------------------- | ----------------- |
| Pattern      | Full-page wizard step                                                      | Not an offcanvas  |
| Primary city | **Single** required province + city                                        | Customer is multi |
| Nearby       | Optional multi-check, copy claims ~30 km radius                            | Customer has none |
| Persistence  | Form POST only; no `localStorage`                                          | Isolated          |
| Cascade      | Not implemented; nearby list is Gilan towns unrelated to selected province | **LEGACY ISSUE**  |

**BUSINESS DECISION REQUIRED:** customer match logic (AND/OR), max selected
cities, geolocation, whether changing city reloads expert results immediately.

**TECHNICAL MIGRATION NOTE:** two modes — discovery multi-select vs registration
primary + nearby.

---

## Service Discovery

Six pages share one product model: **choose a service → optionally set city and
filters → browse experts → open profile**.

Future implementation should use a reusable service-discovery architecture.
This task does not implement it.

### Shared model

| Block                    | Presence                      | Notes                                                 |
| ------------------------ | ----------------------------- | ----------------------------------------------------- |
| Service identity         | All                           | Unique title + meta; OG often incomplete              |
| Title / intro            | All; intro line on Gen A only | Shared intro about rated, identity-verified engineers |
| Search                   | All                           | Opens `#searchCanvas` (same shell as home)            |
| City                     | All                           | Opens `#cityCanvas`; display default `رشت`            |
| Filters                  | All                           | Chip row + offcanvas radios                           |
| Service-specific filters | Varies                        | Skill options often wrongly copied from surveying     |
| Subcategories / tabs     | Workers + drawing only        | Body-class CSS in `main.js`                           |
| Result count             | All                           | Hardcoded `23 متخصص در دسته بندی زیر یافت شد`         |
| Expert listing           | All                           | Demo cards                                            |
| Expert card              | All                           | CTA `/resume.html`                                    |
| No-result                | 5 of 6                        | Missing on building-permit                            |
| Load more                | All                           | Button present; **no JS**                             |
| Service information      | All                           | FAQ (Gen A) or short Q&A (Gen B)                      |
| Related articles         | None                          | —                                                     |
| Suggested experts        | Surveying only                | Links are `#`                                         |

Shared filter chips (when present): دسته بندی خدمات، سابقه کار، پروانه نظام
مهندسی، رشته تحصیلی، مدرک تحصیلی.

Shared JS: chip active state, radio → close offcanvas, remove filter, drawing
tabs, worker tabs. **Radios do not filter the listing.** Load more is unwired.

**TECHNICAL MIGRATION NOTE:** replace Bootstrap Offcanvas + body-class tabs
with Sheet/Drawer + Tabs + server-filtered lists.

Two visual generations exist (Gen A: surveying, workers, drawing; Gen B:
interior, permit, admin). Unify on the design system later — not a TASK 01
redesign.

### Expert Result Card

Do not create `ExpertCard` in this task.

| Field        | Consistent? | Evidence                                          |
| ------------ | ----------- | ------------------------------------------------- |
| Rating       | Yes         | `5.0`                                             |
| Review count | Yes         | `(12 نظر)`                                        |
| Activity     | Yes         | Badge `فعال`                                      |
| Avatar       | Yes         | Demo person image                                 |
| Name         | Varies      | Gen A `حمید جبلبی` (typo); Gen B `ابوذر حسن زاده` |
| Profession   | Yes         | `مهندس عمران` on every service — often wrong      |
| Specialties  | Varies      | Surveying chips on **all** pages                  |
| Experience   | Yes         | `تجربه : 10 سال`                                  |
| Verification | Yes         | `تایید شده`                                       |
| City         | Varies      | بندر انزلی vs بندر کیاشهر                         |
| CTA          | Yes         | `مشاهده پروفایل و تماس` → `/resume.html`          |

Suggested-expert card (surveying only): name, role, specialty, rating, review
count, `مشاهده پروفایل` → `#`.

Reusable implication: one listing card; optional suggested variant. Skills must
be service-contextual. Profile URL must become `/experts/[id]`.

### Land Surveying

Unique and appropriate content: UTM / شمیم / تفکیک skills, surveying accordion,
five real FAQs, suggested-expert rail. Experience filter is 3-band (0–5 / 5–15 /
15+), unlike the 4-band used elsewhere.

Skill typo: `نقشه بردای`. Radio values include leftover `steel` / `industrial`.
Suggested experts are four identical cards with `#` links.

**SOURCE REQUIREMENT** for this service’s identity and surveying FAQ copy.
Suggested-expert destination is **UX COMPLETION**.

### Construction Workers / Contractors

Tabs: `استادکار ساختمان` / `پیمانکار ساختمان`. Ostadkar omits license and
degree filters; peymankar includes them.

**LEGACY ISSUE:** skill options, accordion, FAQ bodies, and card skills are
surveying copy. Duplicate `#accordion-survey` ids. Meta mentions برق‌کار،
گچ‌کار، آجرکار — not in the skill list.

**BUSINESS DECISION REQUIRED:** taxonomy of worker vs contractor specialties;
whether tabs are subtypes of one route or two routes.

### Drawing

Tabs: معماری / سازه / برق / مکانیک (`darw-arc` typo ids). Only سازه shows a
skill chip (concrete / steel / industrial calculations).

**LEGACY ISSUE:** all four accordion/FAQ bodies are surveying UTM questions;
listing cards still show surveying skills. Malformed `og:url`.

**BUSINESS DECISION REQUIRED:** tabs vs nested routes; whether `محاسبات
ساختمان` is a drawing subtype or a seventh top-level service (it appears in
registration step 4 and search categories).

### Interior / Facade Design

Gen B. Combined category `طراحی داخلی - طراحی نما`. Info blocks use repeated
placeholder Persian. Skill filter and card skills are surveying.

**LEGACY ISSUE** (copied content + placeholder copy).
**BUSINESS DECISION REQUIRED:** one list vs facade/interior subtypes.

### Building Permit / Completion Certificate

Gen B. Category `پروانه ساخت-پایان کار`. **No no-result block** —
**UX COMPLETION**. Skill filter/cards are surveying. Info bodies are
placeholder.

### Administrative Services

Gen B. Meta mentions شهرداری، ثبت، بخشداری، بنیاد مسکن — not in filters.
Skill filter/cards are surveying. Placeholder info copy.

**BUSINESS DECISION REQUIRED:** admin sub-tracks.

### Surveying-content contamination

| Page            | Accordion   | FAQ / info  | Skill filter | Card skills |
| --------------- | ----------- | ----------- | ------------ | ----------- |
| Land surveying  | Intentional | Intentional | Intentional  | Intentional |
| Workers         | Copied      | Copied      | Copied       | Copied      |
| Drawing         | Copied      | Copied      | Calc options | Copied      |
| Interior        | Copied      | Placeholder | Copied       | Copied      |
| Building permit | Copied      | Placeholder | Copied       | Copied      |
| Administrative  | Copied      | Placeholder | Copied       | Copied      |

Copied surveying content on non-survey pages is a **LEGACY ISSUE**. Do not
fabricate replacement FAQ copy in this task.

---

## Expert Profile

**File:** `resume.html`. Demo person: `ابوذر حسن زاده`.

### Fields and interactions

| Field / action                          | Legacy                                                                                              | Classification                                     |
| --------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Name, avatar, profession                | Present                                                                                             | **SOURCE REQUIREMENT**                             |
| Degree                                  | `کارشناسی ارشد` (no school name)                                                                    | **SOURCE REQUIREMENT**                             |
| License                                 | `پروانه اشتغال` + طراحی / نظارت / اجرا                                                              | **SOURCE REQUIREMENT**                             |
| Organization membership                 | `عضو نظام مهندسی استان گیلان`                                                                       | **SOURCE REQUIREMENT**                             |
| Verification / active                   | `تایید شده` / `فعال`                                                                                | **SOURCE REQUIREMENT**                             |
| Views                                   | `287` display only                                                                                  | **SOURCE REQUIREMENT**                             |
| Save                                    | Label `ذخیره` + bookmark; not a control                                                             | **UX COMPLETION** + **BUSINESS DECISION REQUIRED** |
| Share                                   | Label only; no sheet                                                                                | **UX COMPLETION**                                  |
| Experience / city                       | `10سال` / `بندر کیاشهر`                                                                             | **SOURCE REQUIREMENT**                             |
| Contact                                 | Offcanvas: `tel:+989112327619`; SMS quoted malformed; button also `tel:09...`                       | **SOURCE REQUIREMENT** + **LEGACY ISSUE**          |
| Chat                                    | Local DOM mock; header name `علی رضایی` ≠ profile; no API                                           | **LEGACY ISSUE** + **BUSINESS DECISION REQUIRED**  |
| Specialties / service cities / software | Lists present; `civil-3d` duplicated                                                                | **SOURCE REQUIREMENT** + **LEGACY ISSUE**          |
| History                                 | Free text, duplicated paragraph                                                                     | **SOURCE REQUIREMENT** + **LEGACY ISSUE**          |
| Portfolio                               | UI says 14 photos; 9 items; viewer works; some image paths omit `assets/img/`                       | **SOURCE REQUIREMENT** + **LEGACY ISSUE**          |
| Rating                                  | `4.5 از 30 نظر` and also `از 19 نظر`                                                                | **LEGACY ISSUE**                                   |
| Reviews                                 | Two identical samples + tags + expert reply                                                         | **SOURCE REQUIREMENT**                             |
| Review submit                           | Stars, tags, name, anonymous; then auth modal                                                       | **SOURCE REQUIREMENT** (intent)                    |
| Auth for review                         | Phone then 4-digit OTP; `Offcanvas` API used on a modal; legal links `#`; phone-edit target missing | **LEGACY ISSUE** + **UX COMPLETION**               |
| Load more reviews                       | Button, no JS                                                                                       | **UX COMPLETION**                                  |

Review OTP is four digits; registration OTP is five.
**LEGACY ISSUE** / **BUSINESS DECISION REQUIRED**.

### Missing profile states

| State                                     | Classification    |
| ----------------------------------------- | ----------------- |
| Unavailable / hidden contact              | **UX COMPLETION** |
| Unverified expert                         | **UX COMPLETION** |
| Inactive expert                           | **UX COMPLETION** |
| No portfolio                              | **UX COMPLETION** |
| No reviews                                | **UX COMPLETION** |
| Failed data load                          | **UX COMPLETION** |
| Empty specialties/cities/software/history | **UX COMPLETION** |
| Chat unavailable                          | **UX COMPLETION** |

Do not invent backend rules for those states.

---

## Expert Registration

Treat registration as **one wizard**, not nine unrelated pages. Legacy
implementation is nine HTML files plus `auth.js`. There is no shared client
store, step guard, or draft.

Laravel Blade placeholders (`{{ route('expert.register') }}`, `@csrf`) appear
in HTML. No backend lives in this tree. Validation observed here is
**client-side only**. Do not infer server rules.

### Step 1 — Identity

**File:** `auth/step1.html`  
**Purpose:** Collect Iranian mobile and national ID; imply terms acceptance;
warn that phone ownership must match national ID.

| Field           | Type | Required | Notes                                      |
| --------------- | ---- | -------- | ------------------------------------------ |
| `mobile`        | tel  | Yes      | 11 digits, `09…`, digits-only sanitization |
| `national_code` | text | Yes      | 10 digits + Iranian checksum               |

Terms: no checkbox. Copy says filling the form accepts `../about-us/terms.html`.
**SOURCE REQUIREMENT.** Explicit checkbox is **BUSINESS DECISION REQUIRED**.

Phone-ownership warning is copy only. Shahkar-style match is
**BUSINESS DECISION REQUIRED**.

Client validation messages: required mobile, invalid mobile, required national
code, length, checksum (reject all-same-digit codes). `novalidate` on form.
Submit posts to `{{ route('expert.register') }}` — no next href.

**UX COMPLETION:** duplicate phone, duplicate national code, network error,
loading.

### Step 2 — OTP

**File:** `auth/step2.html` (inline script; `auth.js` unused here)

**SOURCE REQUIREMENT:** five digit-only boxes, autofocus, advance, Backspace to
previous, paste digits, 120s timer, submit requires `/^\d{5}$/`.

Displayed number is hardcoded `0911213232`. Form `action=""`.

| Control       | Problem                                                     | Classification    |
| ------------- | ----------------------------------------------------------- | ----------------- |
| Resend        | After timer, `href="step3.html"` navigates to location step | **LEGACY ISSUE**  |
| Edit phone    | `href="#"`; no return to step 1                             | **UX COMPLETION** |
| Wrong/expired | No UI                                                       | **UX COMPLETION** |
| Resend API    | Does not exist; do not treat `step3.html` as resend design  | **LEGACY ISSUE**  |

### Step 3 — Service area

**File:** `auth/step3.html`

| Field             | Required | Notes                           |
| ----------------- | -------- | ------------------------------- |
| `province_id`     | Yes      | Sample East/West Azerbaijan     |
| `city_id`         | Yes      | Sample نقده / تبریز; no cascade |
| `nearby_cities[]` | No       | Five static Gilan towns         |

Copy: nearby cities within 30 km; “بدون محدودیت”. List does not depend on the
selected city. **LEGACY ISSUE.**

**BUSINESS DECISION REQUIRED:** exact radius, max nearby count, whether nearby
is optional, whether main city is included, reset-on-change.

POST has no `action`. Implied next is step 4. No back control.

### Step 4 — Expertise

**File:** `auth/step4.html`  
Major feature.

Conceptual relationship from **source only** (no invented IDs or schemas):

```text
ServiceCategory
  → Expertise (multi-select, `expertise_ids[]`)
  → Optional Software (category-scoped, `software_ids[]`, not nested under a single expertise)
```

| Category UI             | `data-category` | Software | Nested subcategory in UI |
| ----------------------- | --------------- | -------- | ------------------------ |
| نقشه برداری             | survey          | No       | No                       |
| دریافت پروانه ساخت      | licence         | No       | No                       |
| ترسیم نقشه              | drawing         | Yes      | No                       |
| محاسبات ساختمان         | calculate       | Yes      | No                       |
| استادکار ساختمان        | ostadkar        | No       | ساخت اسکلت بتنی          |
| پیمانکار ساختمان        | peymankar       | No       | عملیات خاکی و فونداسیون  |
| طراحی نما - طراحی داخلی | design          | Yes      | No                       |
| انجام خدمات اداری       | edari           | No       | No                       |

Expertise values 1–17 and 19–24 exist. **Value 18 is missing** — **LEGACY ISSUE**.
Ostadkar/peymankar trees show only one subcategory each —
**BUSINESS DECISION REQUIRED** (incomplete catalog?).
Licence vs edari overlap semantically — **BUSINESS DECISION REQUIRED**.

Software is optional and not coupled in JS to expertise. V-Ray value `6`
appears in both drawing and design. **BUSINESS DECISION REQUIRED:** may software
be submitted without an expertise in that category?

Confirm buttons only dismiss offcanvas. No minimum-expertise check.
Footer copy claims unlimited selection — **BUSINESS DECISION REQUIRED**.

POST `action="{{ route('...') }}"`.

### Step 5 — Personal information

**File:** `auth/step5.html`

| Field          | Required | Notes                                                      |
| -------------- | -------- | ---------------------------------------------------------- |
| Expertise list | UI only  | Hardcoded sample items; remove / show more / count         |
| `first_name`   | Yes      |                                                            |
| `last_name`    | Yes      |                                                            |
| `national_id`  | Hidden   | Display `265646476`; Step 1 used `national_code`           |
| `province_id`  | Yes      | IDs `birthProvince` / `birthCity` but labels are work city |
| `city_id`      | Yes      | Different option values than step 3                        |
| `avatar`       | No       | Image preview; non-image silently cleared                  |

`#goToPreviousStepBtn` looks for same-document `.step-4` then `history.back()`
— does not go to `step4.html`. **LEGACY ISSUE.**

Duplicated location vs step 3 is a **LEGACY ISSUE** and
**BUSINESS DECISION REQUIRED** (confirmation vs birth place vs second source of
truth). Form `action=""`.

### Step 6 — Education

**File:** `auth/step6.html` + `auth.js`

| Branch           | Flow                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------ |
| `diplomaOrLower` | Skip degree cards → generate «دیپلم» upload                                          |
| `aboveDiploma`   | Multi-select کاردانی / کارشناسی / کارشناسی ارشد / دکتری → one upload card per degree |

Both card labels include «دیپلم» — likely a copy error (**LEGACY ISSUE** /
**BUSINESS DECISION REQUIRED**).

Uploads: `education_files[]` + hidden `education_degrees[]`,
`accept=".pdf,.jpg,.jpeg,.png"`. Files are **not** required in JS. Need ≥1
degree if above diploma (alert).

Continue on upload step is `type="button"` with **no handler** — dead end.
**LEGACY ISSUE** / **UX COMPLETION**. Mini 1–3 circles are education-only, not
the global wizard.

### Step 7 — Engineering organization

**File:** `auth/step7.html` + `auth.js`

Flow: member yes/no → if yes, membership number + has license yes/no → if
license yes, number, file, discipline, qualifications.

**Discipline → qualifications (source only):**

| Discipline                     | Qualifications               |
| ------------------------------ | ---------------------------- |
| omran, bargh, mechanic, memari | طراحی، نظارت، اجرا           |
| naghshe                        | طراحی، نظارت (no اجرا)       |
| traffic, shahrsazi             | Select exists; no UI options |

Do not expand those rules. ترافیک / شهرسازی qualifications are
**BUSINESS DECISION REQUIRED**.

Almost no `name` attributes — values live in JS variables only.
**TECHNICAL MIGRATION NOTE.** `hyrcan_validateNezam()` does not navigate on
success. **LEGACY ISSUE.**

### Step 8 — Professional resume

**File:** `auth/step8.html`

| Field              | Rule in `goToStepTwo` (unused on this page) |
| ------------------ | ------------------------------------------- |
| `experience_years` | Required, numeric, ≥ 0                      |
| `resume_text`      | Trimmed length ≥ 10                         |

Button is `type="submit"` to `/submit-resume` and does **not** call
`goToStepTwo`. `#resumeStepTwo` lives on step 9. **LEGACY ISSUE.**

**BUSINESS DECISION REQUIRED:** max years, max text, whether 0 years is allowed.

### Step 9 — Portfolio and certificates

**File:** `auth/step9.html`

- Multiple portfolio images, preview, remove, image-only, client-side dedupe.
- Certificate rows: title + file; add row; confirm builds preview; remove-by-index is fragile.
- `accept_rules` checkbox required.
- POST `{{ route('resume.final.store') }}` multipart.

No certificate required. No min/max image count in source —
**BUSINESS DECISION REQUIRED**.

**UX COMPLETION:** confirmation / success state after submit. Do **not** invent
a redirect destination.

### Wizard-level missing states

| State                           | Classification                                     | Legacy              |
| ------------------------------- | -------------------------------------------------- | ------------------- |
| Global progress 1–9             | **UX COMPLETION**                                  | Absent              |
| Current step identity           | **UX COMPLETION**                                  | CSS class only      |
| Back navigation                 | **UX COMPLETION** / **LEGACY ISSUE**               | Almost none         |
| Refresh / draft recovery        | **UX COMPLETION** / **BUSINESS DECISION REQUIRED** | Absent              |
| Browser Back                    | **UX COMPLETION**                                  | Multipage data loss |
| Invalid deep-link to later step | **UX COMPLETION** / **BUSINESS DECISION REQUIRED** | No guards           |
| Already-completed steps         | **BUSINESS DECISION REQUIRED**                     | Absent              |
| Expired OTP / resend failure    | **UX COMPLETION**                                  | Resend is miswired  |
| Upload / network / final fail   | **UX COMPLETION**                                  | Absent              |
| Duplicate phone / national ID   | **UX COMPLETION**                                  | Absent              |
| Successful completion           | **UX COMPLETION**                                  | Absent              |

---

## Articles

| Page                   | Role             |
| ---------------------- | ---------------- |
| `article-landing.html` | Blog home        |
| `all-articles.html`    | Full list        |
| `article-sum.html`     | Category listing |
| `sample-article.html`  | Detail           |

| Feature                | Status                                                                 | Classification                                          |
| ---------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------- |
| Search                 | Form, no action/JS                                                     | **UX COMPLETION**                                       |
| Category filter        | همه / آموزش عمومی / پیمانکاری — unwired                                | **UX COMPLETION**                                       |
| Sort                   | newest, most-viewed; “recommended” is a **section**, not a sort option | **SOURCE REQUIREMENT** / **BUSINESS DECISION REQUIRED** |
| Cards                  | Cover, title, author (some views), date; views mainly on detail        | **SOURCE REQUIREMENT**                                  |
| Breadcrumb / TOC       | Detail TOC `#q-1`…`#q-5` works; breadcrumb category/current are `#`    | **LEGACY ISSUE**                                        |
| Article FAQs           | Present on detail                                                      | **SOURCE REQUIREMENT**                                  |
| Internal / related     | `#`                                                                    | **LEGACY ISSUE**                                        |
| Service CTA            | `../services/land-surveying.html`                                      | **SOURCE REQUIREMENT**                                  |
| Landing → all articles | `href="articles/all-articles.html"` from inside `articles/`            | **LEGACY ISSUE** (broken path)                          |
| Card URLs              | `/article/utm-map-difference` style paths, not `sample-article.html`   | **LEGACY ISSUE** / **TECHNICAL MIGRATION NOTE**         |

Proposed content flow:

```text
Articles home → (search / category / sort)
  → all articles OR category listing
    → article detail
      → TOC / FAQs / related articles / category
      → CTA to related service
```

Do not invent article bodies. Demo cards repeat the same UTM title/image.

---

## FAQ

Landing filename `landig-faq.html` is a typo — **LEGACY ISSUE**.

| Category card          | Destination               | Status        |
| ---------------------- | ------------------------- | ------------- |
| نقشه برداری-سند مالکیت | `faq-land-surveying.html` | Real page     |
| ترسیم نقشه ساختمان     | `#surveying-1`            | Dead fragment |
| استادکاری ساختمان      | `#surveying-1`            | Dead fragment |
| Remaining seven cards  | **no href**               | Incomplete    |

**Do not invent FAQ content for missing categories.** Only surveying has a
concrete category page (10 accordion items + CTA to land-surveying).

Related tags on the surveying page are `#`. Back link `FAQs.html` does not
exist. Ask-question button targets `#entryQuestion` missing on that page.
`lang="en"` on Persian page — **LEGACY ISSUE**.

A generic FAQ category route is the correct IA. Missing content must not be
fabricated.

---

## Knowledge Base

Expected conceptual flow:

```text
Knowledge → Category → Tips → More results → Related service
```

Landing: six teaser cards. Only surveying “نکات بیشتر” has a destination, and
it points at missing `knowledge-page.html` (real file is
`knowledge-surveying.html`). Other tip/expert links are `#`. Filter `<select>`
values are empty. Tip text is often mismatched to the badge —
**LEGACY ISSUE**.

Surveying list: breadcrumb all `#`; claims `۵۰ نکته` but renders 4; «مشاهده
نکات بیشتر» has no JS; sidebar categories `#` with static counts.

**UX COMPLETION:** search, load-more/pagination, empty/error.
**BUSINESS DECISION REQUIRED:** whether load more is page size or infinite
scroll; data source for counts.

---

## Engineering Forms

**File:** `knowledge/forms.html` (60 lines). Stub.

Present: title, unwired search, category select (duplicate `value="13"`),
partial province select (many empty values), one group «خدمات مهندسی» / «ثبت
نقشه», download **icon with no URL**.

Do not invent document metadata.

**UX COMPLETION** for later: loading, empty, error, unavailable file, search
no-hits.

**SOURCE REQUIREMENT:** the catalog concept (search + province + category +
named form + download). Data and files are not in this tree.

---

## About

**File:** `about-us/about-us.html`

Preserve employer meaning; do not rewrite copy in this task.

Structure: breadcrumb → H1/tagline (تخصص، شفافیت، ۱۶ سال تجربه) → چرا مهندس من
→ داستان از اجرا تا پلتفرم → چگونه کار می‌کند (جستجو → بررسی و مقایسه → ارتباط
مستقیم) → six service domains + CTAs → ارزش‌های سازمانی (شفافیت، تخصص‌گرایی،
ارتباط بدون واسطه).

**LEGACY ISSUE:** every service card description repeats surveying blurb;
typo `پبمانکار`; current breadcrumb crumb is `#`.

Service CTAs point at the six real service files.

---

## Terms + Privacy

### Terms (`about-us/terms.html`)

Breadcrumb home + `#`. H1 + acceptance intro. مواد 1–10: definitions, account,
use, fees/payment, platform liability, disputes, IP, UGC, account restriction,
remote agreement.

No privacy cross-link. No contact block.

Legal text mentions capabilities with **no matching UI**:

| Mention                               | Classification                 |
| ------------------------------------- | ------------------------------ |
| Account create; username/password     | **BUSINESS DECISION REQUIRED** |
| Optional platform fees / «پرداخت امن» | **BUSINESS DECISION REQUIRED** |
| Complaint / mediation intake          | **BUSINESS DECISION REQUIRED** |
| Account suspension messaging          | **BUSINESS DECISION REQUIRED** |

Do **not** automatically add these to Phase 1.

### Privacy (`about-us/privacy-policy.html`)

مواد 1–7 + contact (incomplete email `@info-mohandeseman`, phone `09215386912`,
Rasht address). Breadcrumb typo `سیسات`. No terms cross-link.

| Mention                            | Classification                 |
| ---------------------------------- | ------------------------------ |
| User panel access / edit           | **BUSINESS DECISION REQUIRED** |
| Account deletion / فراموشی         | **BUSINESS DECISION REQUIRED** |
| Cookies (described, no consent UI) | **BUSINESS DECISION REQUIRED** |
| Payment-gateway data sharing       | **BUSINESS DECISION REQUIRED** |

---

## Legacy Behavior Inventory

Do not copy DOM-mutation patterns into the Next.js app.

| Behavior                         | Legacy Area         | Product Meaning                      | Future Type                     | Notes                                   |
| -------------------------------- | ------------------- | ------------------------------------ | ------------------------------- | --------------------------------------- |
| National-code checksum           | `auth.js` step 1    | Iranian ID format check              | domain interaction              | Re-validate on server                   |
| Mobile `09` + 11 digits          | `auth.js` step 1    | Iranian mobile format                | domain interaction              | Client UX only                          |
| OTP boxes / paste / timer        | `step2.html` inline | Verify SMS code                      | reusable UI interaction         | Use design-system `OtpInput`; 5 digits  |
| OTP resend href                  | `step2.html`        | Intended resend                      | obsolete / broken               | Not an API                              |
| Expertise remove / show more     | `auth.js` step 5    | Edit selected expertise              | domain interaction              | Wire to step 4 state                    |
| Profile image preview            | `auth.js` step 5    | Avatar preview                       | reusable UI interaction         | FileUpload + Avatar                     |
| Education mini-wizard            | `auth.js` step 6    | Conditional uploads                  | domain interaction              | Dead continue button                    |
| Nezam / license / salahiyat      | `auth.js` step 7    | Conditional organization data        | domain interaction              | Discipline rules from source only       |
| Resume years/text gate           | `auth.js` unused    | Min resume text                      | domain interaction              | Not hooked on step 8                    |
| Portfolio previews               | `auth.js` step 9    | Multi image add/remove               | reusable UI interaction         |                                         |
| Certificate rows                 | `auth.js` step 9    | Repeatable title+file                | domain interaction              | Index-based remove is fragile           |
| Service filter chips             | `main.js`           | Apply/clear a filter                 | reusable UI interaction         | Must actually query                     |
| Drawing / worker tabs            | `main.js`           | Switch subtype listing               | domain interaction              | Replace body classes                    |
| Review stars/tags/anonymous      | `main.js`           | Submit review                        | domain interaction              | Auth requirement implied                |
| City multi-select + localStorage | `main.js`           | Persist discovery cities             | domain interaction              | Key `selectedCities`                    |
| Gallery viewer                   | `main.js`           | Portfolio lightbox                   | reusable UI interaction         | Dialog/Sheet                            |
| Chat send/file                   | `main.js`           | In-page messaging mock               | business clarification required | No backend                              |
| Mobile menu                      | `main.js`           | Open site navigation                 | reusable UI interaction         | Sheet; aria mismatch                    |
| Carousels                        | Bootstrap           | Banners, comments, knowledge         | reusable UI interaction         | Do not import Bootstrap                 |
| Offcanvas search/city/filters    | Bootstrap           | Overlay surfaces                     | reusable UI interaction         | Sheet / Drawer                          |
| Navbar toggler → Modal           | `main.js`           | Sometimes opens `#modal-1-menuModal` | obsolete Bootstrap behavior     | Inconsistent with `#mainMenu` offcanvas |

---

## Legacy CSS / UI Audit

Do not list thousands of CSS rules.

| Topic       | Summary                                                                                                       |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| Bootstrap   | Required on every page (CSS + JS). Offcanvas, modal, accordion, carousel, grid                                |
| Custom CSS  | `main.css` ~4724 lines of page-specific rules                                                                 |
| Overrides   | `bss-overrides.css` Bootstrap Studio utility restyles                                                         |
| Typography  | IRANSansWeb; fluid `--font-8`…`--font-18` that **scale up on larger breakpoints** (including 8px-class sizes) |
| Colors      | `--primary-color: #01BFA6`; `--secondary-color: #24313E`; Bootstrap info cyan; danger red                     |
| Spacing     | Inconsistent rem/px; many `!important` overrides                                                              |
| Radius      | Mix of 3px, 8px, 10px, 12px, `.35rem`–`1rem`, pills, circles                                                  |
| Cards       | Bootstrap `.card` (Gen B) vs custom `.card-expert` (Gen A)                                                    |
| Offcanvas   | Search, city, filters, gallery, call, menus                                                                   |
| Breakpoints | Ad-hoc 300 / 450 / 500 / 576 / 600 / 650 / 750 / 768 / 900 / 1000                                             |
| Mobile      | Offcanvas-first; mixed touch targets                                                                          |
| Debt        | Duplicated chrome, two service generations, magic body classes, placeholder.com                               |

**Legacy CSS is not part of the new design system.**

The new application must not import:

- Bootstrap CSS
- Bootstrap JS
- `main.css`
- `bss-overrides.css`
- `auth.js`
- `main.js`

unless an explicit future task reverses this decision.

Retheme only via `css/globals.css` tokens already defined in TASK 00.5.

---

## Future Component Candidates

Do **not** implement these in TASK 01. Do not duplicate TASK 00.5 primitives.

### Layout

- `StoreHeader` — brand, menu, specialist-join entry
- `StoreFooter` — service/content/legal/contact
- `MobileNavigation` — sheet menu with service and FAQ accordions
- `StoreBreadcrumb` — about, articles, FAQ, knowledge, legal

### Common

- `SectionHeader`
- `SearchSurface` — floating/offcanvas search shell
- `CitySelector` — discovery multi-select (not the same as registration location)
- `ContentHeader` — articles/FAQ/knowledge/forms titles + search
- `ContentCard` — generic cover + title + meta for articles/knowledge teasers
- `FaqAccordionList`
- `ServiceCategoryGrid`
- `LegalDocument` — terms/privacy long-form
- `Carousel` / `Slider` — banners, testimonials, knowledge tips

### Domain

- `ServiceCard` / `ServiceTile`
- `ExpertCard` / `ExpertList` / `SuggestedExpertCard`
- `FilterBar` / `FilterChip` / `FilterSheet`
- `ServiceDiscoveryLayout`
- `ServiceSubtypeTabs`
- `ExpertProfileHeader`
- `ExpertContactSheet`
- `ReviewCard` / `ReviewForm`
- `PortfolioGallery`
- `ArticleCard` / `ArticleToc`
- `KnowledgeCard` / `KnowledgeTipList`
- `EngineeringFormRow`
- `RegistrationWizard` / `RegistrationProgress`
- `ExpertisePicker` (category → expertise → optional software)
- `EducationStep` / `OrganizationStep` / `CertificateFields`

### UI primitives already available (TASK 00.5)

Button, Input, Textarea, Label, Field, Checkbox, RadioGroup, Select, Switch,
OtpInput, FileUpload, Badge, Avatar, Card, Separator, Skeleton, Spinner,
Progress, Alert, Empty, Dialog, Sheet, Drawer, Accordion, Tabs, Tooltip,
Popover, DropdownMenu.

Compose these. Do not restyle them to match Bootstrap.
