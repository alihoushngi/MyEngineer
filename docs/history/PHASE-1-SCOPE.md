# Phase 1 Scope Matrix

> Historical planning snapshot, preserved for decision context. This is not the current implementation or an instruction for active work. See the [current architecture](../ARCHITECTURE.md), [design reference audit](../design-reference-audit.md), and [documentation index](../README.md). The local client source is `Design/`; earlier absolute paths and product-scope exclusions below describe a previous phase. Header, Footer, Login, and Registration are excluded from this alignment.

Scope classification for rebuilding the Mohandes Man storefront from the
legacy audit. This is not an implementation task.

Every employer-supplied area is preserved in [LEGACY-AUDIT.md](LEGACY-AUDIT.md)
and [PRODUCT-FLOWS.md](PRODUCT-FLOWS.md). **Not every legacy control is
automatically Phase 1.**

## How to read this matrix

| Column               | Meaning                                                                    |
| -------------------- | -------------------------------------------------------------------------- |
| Area                 | Product area                                                               |
| Feature              | Concrete capability                                                        |
| Source Evidence      | Where it appears in the legacy tree                                        |
| Phase 1 Candidate    | **CORE PHASE 1** / **CONTENT SUPPORTING PHASE 1** / **NEEDS CONFIRMATION** |
| UX Completion Needed | Coherent UX missing in legacy                                              |
| API Needed           | Yes / No / Likely — **not** endpoint names (Swagger is a later task)       |
| Business Decision    | Yes if implementation cannot start safely                                  |
| Notes                | Constraints                                                                |

**CORE PHASE 1:** Strongly supported by the storefront purpose (find
specialists; specialists join) and by concrete legacy screens.

**CONTENT SUPPORTING PHASE 1:** Trust, SEO, and legal pages that support the
main product. Prefer read-only first.

**NEEDS CONFIRMATION:** Visible in legacy but not clearly contracted for a
full Phase 1 integration (chat, save, share, reviews, some content systems).

---

## Matrix

| Area              | Feature                                                                           | Source Evidence                               | Phase 1 Candidate          | UX Completion Needed                   | API Needed | Business Decision                    | Notes                                                          |
| ----------------- | --------------------------------------------------------------------------------- | --------------------------------------------- | -------------------------- | -------------------------------------- | ---------- | ------------------------------------ | -------------------------------------------------------------- |
| Home              | Landing sections (hero, six services, what/why, join CTA, footer chrome)          | `index.html`                                  | CORE PHASE 1               | Loading/error for any dynamic blocks   | Likely     | No                                   | Do not copy Bootstrap visuals                                  |
| Home              | Specialist registration entry                                                     | Navbar, hero, join, menu → `auth/step1.html`  | CORE PHASE 1               | —                                      | No         | No                                   | Static navigation                                              |
| Home              | Popular services tiles                                                            | `خدمات پرکاربرد` all `href="#"`               | CORE PHASE 1               | Real destinations                      | No         | Yes                                  | Map tiles to services/subtypes                                 |
| Home              | Drawing consultation tiles                                                        | All `href="#"`                                | CORE PHASE 1               | Real destinations                      | No         | Yes                                  | Likely drawing tabs                                            |
| Home              | Banner carousel                                                                   | Three unlinked images                         | CONTENT SUPPORTING PHASE 1 | Optional click-through                 | Likely     | Yes                                  | Campaign URLs unknown                                          |
| Home              | Expert showcase                                                                   | Duplicate demo → `resume.html`                | NEEDS CONFIRMATION         | Pause control; real data               | Likely     | Yes                                  | Featured-expert source unknown                                 |
| Home              | Testimonials + home review form                                                   | Duplicate slides + auth modal                 | NEEDS CONFIRMATION         | Working submit/auth                    | Yes        | Yes                                  | Distinct from profile reviews?                                 |
| Home              | Knowledge tips strip                                                              | Three slides → surveying only                 | CONTENT SUPPORTING PHASE 1 | Mixed categories when content exists   | Likely     | No                                   | Do not invent tips                                             |
| Navigation        | Header, mobile menu, footer                                                       | Home + implied globally                       | CORE PHASE 1               | Wire `#` / href-less items             | No         | Yes for social and contractor footer | Legal/about/articles/FAQ/knowledge entries exist               |
| Search            | Search entry + offcanvas shell                                                    | Home + all services                           | CORE PHASE 1               | Results, empty, grouping               | Yes        | Yes                                  | Services vs experts unresolved                                 |
| City              | Customer multi-city selector                                                      | `#cityCanvas` + `localStorage.selectedCities` | CORE PHASE 1               | Search, popular, confirm, full dataset | Yes        | Yes                                  | Matching rules unknown; not the same as registration city      |
| Services          | Shared discovery layout                                                           | Six `services/*.html`                         | CORE PHASE 1               | Loading, empty, error, load more       | Yes        | No                                   | One architecture; two legacy generations                       |
| Services          | Land surveying page                                                               | `land-surveying.html`                         | CORE PHASE 1               | Live count/list                        | Yes        | No                                   | Best content template                                          |
| Services          | Construction workers page + tabs                                                  | `construction-workers.html`                   | CORE PHASE 1               | Real skills/FAQ; tabbed results        | Yes        | Yes                                  | Tabs vs two routes; cloned surveying copy                      |
| Services          | Drawing page + discipline tabs                                                    | `drawing.html`                                | CORE PHASE 1               | Real skills/FAQ per tab                | Yes        | Yes                                  | `محاسبات` IA conflict                                          |
| Services          | Interior / facade                                                                 | `interior-design.html`                        | CORE PHASE 1               | Real copy/filters                      | Yes        | Yes                                  | Combined vs split                                              |
| Services          | Building permit                                                                   | `building-permit.html`                        | CORE PHASE 1               | Empty state                            | Yes        | Yes                                  | Subtypes پروانه / پایان کار                                    |
| Services          | Administrative services                                                           | `construction-admin-services.html`            | CORE PHASE 1               | Real filters                           | Yes        | Yes                                  | شهرداری / ثبت / بنیاد tracks                                   |
| Services          | Filters (experience, license, discipline, degree, skills)                         | Filter offcanvases                            | CORE PHASE 1               | Bind to listing                        | Yes        | Yes                                  | Skill options are wrong on most pages                          |
| Services          | Suggested experts rail                                                            | Surveying only, `href="#"`                    | NEEDS CONFIRMATION         | Profile links                          | Likely     | Yes                                  | Not on other services                                          |
| Experts           | Result card                                                                       | All service listings                          | CORE PHASE 1               | Contextual skills                      | Yes        | No                                   | Reusable card; no implementation in TASK 01                    |
| Experts           | Public profile identity, specialties, cities, software, history, portfolio viewer | `resume.html`                                 | CORE PHASE 1               | Empty/unverified/inactive/error        | Yes        | No                                   | Replace `/resume.html` with `/experts/[id]`                    |
| Experts           | Phone / SMS contact                                                               | Call offcanvas                                | CORE PHASE 1               | Hidden/unavailable contact             | Yes        | No                                   | Fix placeholder `tel:09...`                                    |
| Experts           | Chat                                                                              | `#chatModal` DOM mock                         | NEEDS CONFIRMATION         | Real thread, auth, errors              | Yes        | Yes                                  | Not a complete product                                         |
| Experts           | Save / bookmark                                                                   | Label only                                    | NEEDS CONFIRMATION         | Toggle, list, auth                     | Yes        | Yes                                  |                                                                |
| Experts           | Share                                                                             | Label only                                    | NEEDS CONFIRMATION         | Share sheet / copy                     | Likely     | Yes                                  |                                                                |
| Experts           | Reviews display                                                                   | Sample reviews + tags + replies               | NEEDS CONFIRMATION         | Empty, load more                       | Yes        | Yes                                  | Rating counts conflict                                         |
| Experts           | Review submission + implied auth                                                  | Comment modal → phone OTP                     | NEEDS CONFIRMATION         | Valid OTP, legal links, errors         | Yes        | Yes                                  | 4-digit vs 5-digit OTP                                         |
| Registration      | Wizard as one flow (9 steps)                                                      | `auth/step1.html`–`step9.html` + `auth.js`    | CORE PHASE 1               | Progress, back, errors                 | Yes        | Yes                                  | Drafts and completion destination unknown                      |
| Registration      | Step 1 mobile + national ID + terms                                               | `step1.html`                                  | CORE PHASE 1               | Duplicate/API errors                   | Yes        | Yes                                  | Shahkar match unknown; checkbox unknown                        |
| Registration      | Step 2 five-digit OTP                                                             | `step2.html`                                  | CORE PHASE 1               | Resend, expire, edit phone             | Yes        | No                                   | Do not keep `step3.html` resend                                |
| Registration      | Step 3 primary city + nearby                                                      | `step3.html`                                  | CORE PHASE 1               | Cascade, radius list                   | Yes        | Yes                                  | Limits unknown                                                 |
| Registration      | Step 4 expertise + software                                                       | `step4.html`                                  | CORE PHASE 1               | Catalog completeness, min selection    | Yes        | Yes                                  | Major feature; incomplete trees                                |
| Registration      | Step 5 name, national ID display, avatar, expertise summary                       | `step5.html`                                  | CORE PHASE 1               | Sync expertise edits; location meaning | Yes        | Yes                                  | Duplicated location                                            |
| Registration      | Step 6 education branches + uploads                                               | `step6.html`                                  | CORE PHASE 1               | File required?, wire next              | Yes        | Yes                                  | Dead continue                                                  |
| Registration      | Step 7 nezam / license / qualifications                                           | `step7.html`                                  | CORE PHASE 1               | Wire next; ترافیک/شهرسازی              | Yes        | Yes                                  | Use source discipline rules only                               |
| Registration      | Step 8 years + resume text                                                        | `step8.html`                                  | CORE PHASE 1               | Wire to step 9                         | Yes        | Yes                                  | Min 10 chars in client JS                                      |
| Registration      | Step 9 portfolio, certificates, rules, submit                                     | `step9.html`                                  | CORE PHASE 1               | Upload/submit errors                   | Yes        | Yes                                  | Min images unknown                                             |
| Registration      | Success / completion                                                              | Absent                                        | CORE PHASE 1               | Confirmation screen                    | Likely     | Yes                                  | **UX COMPLETION**; no redirect in source                       |
| Articles          | Read landing, list, category, detail                                              | Four article HTML files                       | CONTENT SUPPORTING PHASE 1 | Search/sort/related wiring             | Likely     | Yes                                  | Broken relative URLs; demo duplication                         |
| FAQ               | Landing + surveying category                                                      | `landig-faq.html`, `faq-land-surveying.html`  | CONTENT SUPPORTING PHASE 1 | Generic category route                 | Likely     | Yes                                  | Do not invent other categories’ questions                      |
| FAQ               | Ask-a-question modal                                                              | `#entryQuestion`                              | NEEDS CONFIRMATION         | Submit + auth                          | Yes        | Yes                                  | Shell only                                                     |
| Knowledge         | Landing + surveying tips                                                          | Two knowledge HTML files                      | CONTENT SUPPORTING PHASE 1 | Pagination, other categories           | Likely     | Yes                                  | Most links `#`                                                 |
| Engineering forms | Catalog + download                                                                | `knowledge/forms.html` stub                   | NEEDS CONFIRMATION         | Loading/empty/error/file               | Yes        | Yes                                  | No files or metadata in tree                                   |
| About             | Story, how it works, service CTAs, values                                         | `about-us.html`                               | CONTENT SUPPORTING PHASE 1 | Correct non-survey blurbs              | No         | No                                   | Preserve meaning; fix copied surveying text with employer copy |
| Legal             | Terms                                                                             | `terms.html`                                  | CONTENT SUPPORTING PHASE 1 | Cross-link privacy                     | No         | Yes for implied features             | Do not build payment/complaints from this page                 |
| Legal             | Privacy                                                                           | `privacy-policy.html`                         | CONTENT SUPPORTING PHASE 1 | Cross-link terms                       | No         | Yes for panel/deletion/cookies       | Contact block exists                                           |
| Legal-implied     | User panel, password account, deletion, payment, complaints                       | Terms/privacy text only                       | NEEDS CONFIRMATION         | Entire product surfaces                | Yes        | Yes                                  | **Not** auto Phase 1                                           |
| Infra             | Bootstrap, `main.css`, `auth.js`, `main.js`, IRANSansWeb                          | All legacy pages                              | Not in Phase 1 product     | —                                      | No         | No                                   | Must not be imported                                           |

---

## Phase 1 reading of controversial features

These appear in legacy files and must not be silently dropped **or** silently
fully built:

| Feature           | Recommendation until product confirms                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| Chat              | Keep as a documented gap. Do not build messaging infrastructure in Phase 1 without confirmation.                  |
| Save expert       | Keep as a documented gap. Header affordance can wait.                                                             |
| Share             | Native share/copy is small if confirmed; not required to ship discovery.                                          |
| Reviews           | Display of ratings on cards is CORE if the API returns them. Submission + customer OTP is **NEEDS CONFIRMATION**. |
| Article system    | Read-only content routes are CONTENT SUPPORTING. Interactive search/sort can follow content API.                  |
| FAQ               | Landing + surveying category are CONTENT SUPPORTING. Other categories wait for content.                           |
| Knowledge         | Same pattern as FAQ.                                                                                              |
| Engineering forms | Treat as **NEEDS CONFIRMATION**; the legacy page is not a complete product.                                       |

---

## Suggested Phase 1 delivery slices (documentation only)

1. **Chrome:** header, footer, mobile nav, legal/about static pages.
2. **Discovery:** home + city + search shell + six service routes + expert card + profile (view + contact).
3. **Join:** registration wizard including completion UX, with P0 decisions resolved.
4. **Content (if contracted):** articles/FAQ/knowledge read paths using only existing copy.

Slices 2 and 3 require APIs. Slice 4 requires a content source decision.

---

## Out of scope for TASK 01

This matrix does not authorize:

- product routes
- domain components
- layout implementation
- API services
- mock data
- design-system restyle
- package installs
