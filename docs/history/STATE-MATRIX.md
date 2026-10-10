# State Matrix

> Historical planning snapshot, preserved for decision context. This is not the current implementation or an instruction for active work. See the [current architecture](../ARCHITECTURE.md), [design reference audit](../design-reference-audit.md), and [documentation index](../README.md). The local client source is `Design/`; earlier absolute paths and product-scope exclusions below describe a previous phase. Header, Footer, Login, and Registration are excluded from this alignment.

UX-state architecture for interactive and data-driven surfaces.

This is not an API spec. Where the backend is unknown:

**BUSINESS DECISION REQUIRED** or **API CONTRACT REQUIRED**.

Visual treatment always uses design-system primitives: Skeleton, Spinner,
Progress, Empty, Alert, Field error, disabled Button.

Related: [INFORMATION-ARCHITECTURE.md](INFORMATION-ARCHITECTURE.md),
[COMPONENT-ARCHITECTURE.md](COMPONENT-ARCHITECTURE.md).

---

## How to read a row

| Column            | Meaning                               |
| ----------------- | ------------------------------------- |
| Initial / loading | First paint or in-flight request      |
| Success           | Usable data or completed action       |
| Empty             | Successful response, nothing to show  |
| Error             | Request or action failed              |
| Retry             | How the user recovers                 |
| Disabled          | Control must not accept input         |
| Validation        | Field or step schema failure          |
| Partial           | Some sections present, others missing |
| Optimistic        | UI ahead of server — only if safe     |
| Mobile            | Differences from desktop              |

Do not invent toast copy, HTTP codes, or retry policies. Map server failures
when **API CONTRACT REQUIRED** is resolved.

---

## Global patterns

| Pattern                    | Rule                                                                                    |
| -------------------------- | --------------------------------------------------------------------------------------- |
| Route first load           | `loading.tsx` + section Skeletons that match layout                                     |
| Route failure              | `error.tsx` + retry; Persian message; link home                                         |
| Missing entity             | `notFound()` — unknown slug/id/category                                                 |
| Refetch list (city/filter) | List region `aria-busy`; do not blank the whole shop chrome                             |
| Empty                      | `Empty` + one next action (change city, clear filters, browse services)                 |
| Mutation pending           | Disable submit; Spinner on the action; prevent double submit                            |
| Validation                 | Inline `Field` errors; focus first invalid                                              |
| Partial profile            | Hide the empty section; do not show “—” placeholders unless product asks                |
| Optimistic                 | **Not used** for registration, contact, or reviews until an API contract says otherwise |
| Reduced motion             | No carousel autoplay; timers still update text                                          |

---

## Search

Covers `SearchSurface` (entry) and `/search` (results).

| State      | Entry overlay                                                    | Results page                                                                      |
| ---------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Initial    | Open with empty draft; popular tags; category grid (mapped only) | Requires `q`. If missing: prompt state, not a fake hit list                       |
| Loading    | N/A for local draft; suggestions **API CONTRACT REQUIRED**       | Skeleton list                                                                     |
| Success    | User submitted or picked a category                              | Grouped or flat hits (**BUSINESS DECISION REQUIRED**: services, experts, or both) |
| Empty      | No matching popular tag while typing (local filter only)         | `Empty`: no services/experts; offer city change + browse six services             |
| Error      | —                                                                | Alert + retry. Do not invent ranking fallbacks                                    |
| Retry      | —                                                                | Re-run the same query                                                             |
| Disabled   | Submit disabled while query is empty/whitespace                  | —                                                                                 |
| Validation | Trim empty query; do not navigate                                | Invalid/oversized query **API CONTRACT REQUIRED**                                 |
| Partial    | Unmapped `محاسبات` omitted                                       | If one group fails **API CONTRACT REQUIRED**                                      |
| Optimistic | None                                                             | None                                                                              |
| Mobile     | Drawer; sticky search field                                      | Same empty/error as listing                                                       |

Recent searches: **UX COMPLETION**. Persistence local vs server:
**BUSINESS DECISION REQUIRED**.

Copy conflict “خدمات و متخصصین” vs “خدمات، سرویس‌ها”:
**BUSINESS DECISION REQUIRED** (P0 search index).

---

## City selection (customer discovery)

Not registration step 3.

| State      | Behavior                                                                                                                                                   |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initial    | Overlay closed. Trigger: `انتخاب شهر` or summary (`نام` / `N شهر`)                                                                                         |
| Loading    | City tree loading inside overlay (Skeleton accordion). **API CONTRACT REQUIRED** for full Iran dataset — do not ship the two-province sample as production |
| Success    | Provinces + cities; popular shortcuts work; search filters the tree                                                                                        |
| Empty      | Search with no city hits: empty inside overlay, keep popular/confirm                                                                                       |
| Error      | Tree failed: Alert + retry inside overlay; do not close                                                                                                    |
| Retry      | Reload tree                                                                                                                                                |
| Disabled   | Confirm disabled when draft is empty **unless** product allows nationwide results without a city — **BUSINESS DECISION REQUIRED** (P0)                     |
| Validation | None beyond selection rules (max cities **BUSINESS DECISION REQUIRED**)                                                                                    |
| Partial    | Some provinces missing: show returned data; do not invent cities                                                                                           |
| Optimistic | Trigger label may update on confirm before navigation completes; listing must then refetch                                                                 |
| Mobile     | Sticky `تایید (N)`; chips wrap; search field at top                                                                                                        |

AND vs OR matching, max cities, results without a city: **BUSINESS DECISION REQUIRED**.

On listing pages, confirmed cities write search params and **must** refetch.
Home confirm writes a preference applied on the next service navigation.

---

## Service discovery

`/services/[slug]`

| State             | Behavior                                                                                                  |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| Initial / loading | Hero skeleton + card skeletons; keep header/footer                                                        |
| Success           | Count + list; filters reflect URL                                                                         |
| Empty             | Shared `ServiceEmptyState` (including building-permit). CTA: change city; secondary: clear filters if any |
| Error             | Alert in list region + retry; invalid slug → not found                                                    |
| Retry             | Re-fetch current URL                                                                                      |
| Disabled          | Load more disabled while pending; filters disabled while first load                                       |
| Validation        | Unknown filter query: ignore or drop — **API CONTRACT REQUIRED**                                          |
| Partial           | Info/FAQ omitted when copy is not real; suggested rail omitted unless confirmed                           |
| Optimistic        | Chip can look selected as URL updates; list waits for data                                                |
| Mobile            | Sticky city/filter bar; load-more full width                                                              |

Tabs (workers, drawing): changing `tab` is a new listing request, with its
own loading/empty/error. Do not show surveying skills on other slugs.

Pagination: load-more button (legacy). Page vs cursor:
**API CONTRACT REQUIRED**. No infinite scroll until decided.

Live region: announce count on success (`N متخصص…`) once per completed fetch.

---

## Expert discovery (listing card)

There is no `/experts` index. This section is the card-in-list states.

| State    | Behavior                                                                             |
| -------- | ------------------------------------------------------------------------------------ |
| Success  | All sourced fields that exist; CTA to `/experts/[id]`                                |
| Partial  | Missing rating/skills/city: omit that fragment, do not fake `5.0` or surveying chips |
| Disabled | None on the card                                                                     |
| Error    | Card-level errors do not exist; list error is the parent                             |
| Loading  | Skeleton cards in the parent list                                                    |
| Empty    | Parent empty state                                                                   |
| Mobile   | Full-width CTA                                                                       |

Do not use `/resume.html` or placeholder names as fallbacks.

---

## Expert profile

`/experts/[id]`

| State                        | Behavior                                                                                                                                                               |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Initial / loading            | Header + section skeletons                                                                                                                                             |
| Success                      | Render sections that have data                                                                                                                                         |
| Empty sections               | Hide specialties / cities / software / history / portfolio / reviews independently                                                                                     |
| Not found                    | `notFound()`                                                                                                                                                           |
| Error                        | Route error + retry                                                                                                                                                    |
| Retry                        | Re-fetch profile                                                                                                                                                       |
| Unverified                   | Show identity; verification badge absent or “unverified” **only if** copy is provided — **API CONTRACT REQUIRED** / **BUSINESS DECISION REQUIRED** for exact treatment |
| Inactive                     | Badge `فعال` absent; contact may be unavailable                                                                                                                        |
| Contact hidden / unavailable | Hide phone/SMS or show an explanation — **API CONTRACT REQUIRED**. Never `tel:09...`                                                                                   |
| Reviews empty                | Hide list or Empty “هنوز نظری ثبت نشده” if the section ships                                                                                                           |
| Reviews load more            | Button pending; **API CONTRACT REQUIRED**                                                                                                                              |
| Chat unavailable             | Do not show chat in Phase 1                                                                                                                                            |
| Partial                      | Portfolio count UI must match items (legacy 14 vs 9 is a **LEGACY ISSUE**)                                                                                             |
| Optimistic                   | None                                                                                                                                                                   |
| Mobile                       | Sticky contact; if contact unavailable, no sticky bar                                                                                                                  |

Save / share / review submit: **NEEDS CONFIRMATION** — no Phase 1 states
beyond “feature absent”.

Rating count conflicts (`۳۰ نظر` vs `۱۹ نظر`): display one value from API;
do not average legacy HTML.

---

## Registration — cross-cutting

Applies to every step unless overridden.

| State                 | Behavior                                                                                                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Guard (skip ahead)    | Redirect to first incomplete step. Proof: **BUSINESS DECISION REQUIRED** / **API CONTRACT REQUIRED** (P0 draft/session)                                                    |
| Refresh without draft | Return to step 1 or last server-acknowledged step — **BUSINESS DECISION REQUIRED**                                                                                         |
| Back                  | Always enabled except step 1 (link home) and complete                                                                                                                      |
| Continue disabled     | Schema invalid or mutation pending                                                                                                                                         |
| Network error         | Alert; stay on step; retry continue                                                                                                                                        |
| Double submit         | Blocked while pending                                                                                                                                                      |
| Optimistic            | Do not skip to the next route before API success when the step requires API. If a step is local-only until contract exists, still commit to the provider before navigation |

Completion redirect after `/complete`: **BUSINESS DECISION REQUIRED** (P0).

---

## Registration step 1 — identity

| State                         | Behavior                                                                                                                                |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Initial                       | Empty mobile + national ID; terms copy + links to `/terms` (and privacy if required)                                                    |
| Loading                       | Continue pending after submit                                                                                                           |
| Success                       | API accepted → navigate OTP. **API CONTRACT REQUIRED**                                                                                  |
| Empty                         | N/A                                                                                                                                     |
| Error                         | Alert for unknown failure                                                                                                               |
| Retry                         | Resubmit                                                                                                                                |
| Disabled                      | Continue until both fields valid (client)                                                                                               |
| Validation                    | Required; mobile `09` + 11 digits; national ID 10 digits + checksum (legacy client rules). Server duplicates: **API CONTRACT REQUIRED** |
| Duplicate phone / national ID | Inline or alert — **UX COMPLETION**, **API CONTRACT REQUIRED**                                                                          |
| Shahkar / ownership mismatch  | **BUSINESS DECISION REQUIRED**                                                                                                          |
| Terms checkbox                | **BUSINESS DECISION REQUIRED**; if yes, continue disabled until checked                                                                 |
| Partial                       | N/A                                                                                                                                     |
| Optimistic                    | None                                                                                                                                    |
| Mobile                        | `type="tel"`; Latin digits via existing Input                                                                                           |

---

## OTP step

| State          | Behavior                                                                            |
| -------------- | ----------------------------------------------------------------------------------- |
| Initial        | Five empty boxes; focus first; masked phone; timer 120s (legacy)                    |
| Loading        | Verify pending; resend pending                                                      |
| Success        | Navigate service-area                                                               |
| Empty          | Incomplete code: continue disabled                                                  |
| Error          | Wrong or expired code: **UX COMPLETION**, **API CONTRACT REQUIRED** for distinction |
| Retry          | Clear code; keep phone; resend after timer                                          |
| Disabled       | Resend disabled during timer; verify disabled until 5 digits                        |
| Validation     | `/^\d{5}$/`                                                                         |
| Edit phone     | Navigate step 1 with previous mobile (do not keep `href="#"`)                       |
| Resend success | Stay on OTP; restart timer. **Never** navigate to step 3                            |
| Resend failure | Alert; timer policy **API CONTRACT REQUIRED**                                       |
| Partial        | N/A                                                                                 |
| Optimistic     | None                                                                                |
| Mobile         | Large OTP; LTR island; `one-time-code` autocomplete if supported                    |

Customer review OTP (4 digits) is a **different** product and is not this step.

---

## Registration step 3 — service area

| State      | Behavior                                                                                                                                |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Initial    | Province/city unset; nearby empty                                                                                                       |
| Loading    | Catalog loading; continue pending                                                                                                       |
| Success    | Cascade city list from province — **UX COMPLETION** (legacy had none)                                                                   |
| Empty      | Province with no cities: Empty + change province                                                                                        |
| Error      | Catalog or save failure + retry                                                                                                         |
| Retry      | Reload catalogs / resubmit                                                                                                              |
| Disabled   | Continue until required province+city set                                                                                               |
| Validation | Required primary city                                                                                                                   |
| Nearby     | Optional. Radius, max, include-primary, reset-on-change: **BUSINESS DECISION REQUIRED**. Do not use the static Gilan list as production |
| Partial    | Nearby failed: still allow continue with primary if product allows — **API CONTRACT REQUIRED**                                          |
| Optimistic | None                                                                                                                                    |
| Mobile     | Nearby as checkbox list; not the discovery `CitySelector`                                                                               |

---

## Registration step 4 — expertise

| State         | Behavior                                                                                                        |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| Initial       | No selections; category entry points                                                                            |
| Loading       | Catalog loading; confirm-in-sheet pending                                                                       |
| Success       | Chips for expertise ± software                                                                                  |
| Empty catalog | Alert; cannot continue — **API CONTRACT REQUIRED**                                                              |
| Error         | Save failure                                                                                                    |
| Retry         | Reopen sheet / resubmit                                                                                         |
| Disabled      | Continue until minimum selection — **BUSINESS DECISION REQUIRED** (legacy had no minimum; copy said unlimited)  |
| Validation    | Software without parent expertise: **BUSINESS DECISION REQUIRED**                                               |
| Partial       | Incomplete trees (missing value 18, thin ostadkar/peymankar): show API catalog only; do not fill from surveying |
| Optimistic    | Sheet confirm updates chips locally then persists on Continue                                                   |
| Mobile        | One `ExpertiseCategorySheet` at a time                                                                          |

Licence vs edari overlap: **BUSINESS DECISION REQUIRED**. Do not hide
categories without product instruction.

---

## Registration step 5 — personal information

| State            | Behavior                                                                                                                          |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Initial          | Names empty; national ID read-only from step 1; expertise summary from step 4                                                     |
| Loading          | Avatar preview local; continue pending                                                                                            |
| Success          | Navigate education                                                                                                                |
| Empty expertise  | Must not happen if step 4 guarded; if it does, CTA back to step 4                                                                 |
| Error            | Save / upload avatar failure                                                                                                      |
| Retry            | Resubmit; replace avatar                                                                                                          |
| Disabled         | Continue until required names (+ location if P0 keeps it)                                                                         |
| Validation       | Required first/last name; avatar optional; non-image rejected (legacy)                                                            |
| Location fields  | Duplicate of step 3 vs birth vs confirmation: **BUSINESS DECISION REQUIRED** (P0). Until decided, architecture allows hiding them |
| Remove expertise | Updates summary; syncing source of truth is step 4 data                                                                           |
| Partial          | Avatar fail should not wipe names                                                                                                 |
| Optimistic       | Avatar preview local                                                                                                              |
| Mobile           | File picker; preview in `Avatar`                                                                                                  |

---

## Registration step 6 — education

| State      | Behavior                                                                      |
| ---------- | ----------------------------------------------------------------------------- |
| Initial    | Choose diploma-or-lower vs above                                              |
| Loading    | Upload pending per file; continue pending                                     |
| Success    | Navigate organization                                                         |
| Empty      | Above-diploma with zero degrees: block (legacy alert)                         |
| Error      | Upload/save failure per file + retry that file                                |
| Retry      | Re-pick file / continue                                                       |
| Disabled   | Continue until branch complete; file required? **BUSINESS DECISION REQUIRED** |
| Validation | Degree multi-select; accept `.pdf,.jpg,.jpeg,.png`                            |
| Labels     | «دیپلم و بالاتر» copy error: **BUSINESS DECISION REQUIRED**                   |
| Partial    | One of several uploads failed: show failed card, keep others                  |
| Optimistic | Local preview; do not mark uploaded until **API CONTRACT REQUIRED**           |
| Mobile     | One upload card per degree, stacked                                           |

Continue must work (legacy dead button — **LEGACY ISSUE**).

---

## Registration step 7 — engineering organization

| State                | Behavior                                                                                     |
| -------------------- | -------------------------------------------------------------------------------------------- |
| Initial              | Member yes/no                                                                                |
| Loading              | File pending; continue pending                                                               |
| Success              | Navigate resume                                                                              |
| Empty qualifications | ترافیک / شهرسازی: **BUSINESS DECISION REQUIRED**; do not invent options                      |
| Error                | Save/upload failure                                                                          |
| Retry                | Resubmit                                                                                     |
| Disabled             | Continue until the visible required branch is filled                                         |
| Validation           | Membership number, license number/file, discipline, qualifications per **source table only** |
| Partial              | Non-member skips license UI                                                                  |
| Optimistic           | None                                                                                         |
| Mobile               | Radio branches stacked; file input                                                           |

Continue must work (legacy did not navigate — **LEGACY ISSUE**).

Discipline → qualifications (source): omran/bargh/mechanic/memari =
طراحی، نظارت، اجرا; naghshe = طراحی، نظارت. Do not expand.

---

## Registration step 8 — professional resume

| State      | Behavior                                                                                                                                      |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Initial    | Empty years + text                                                                                                                            |
| Loading    | Continue pending                                                                                                                              |
| Success    | Navigate portfolio (**not** `/submit-resume`)                                                                                                 |
| Empty      | —                                                                                                                                             |
| Error      | Save failure                                                                                                                                  |
| Retry      | Resubmit                                                                                                                                      |
| Disabled   | Continue until valid                                                                                                                          |
| Validation | Years required, numeric, ≥ 0 (legacy). Max years, max text, whether 0 allowed: **BUSINESS DECISION REQUIRED**. Text min 10 chars in legacy JS |
| Partial    | N/A                                                                                                                                           |
| Optimistic | None                                                                                                                                          |
| Mobile     | Textarea comfortable size; numeric years `ltr-data`                                                                                           |

---

## Registration step 9 — portfolio and certificates

| State           | Behavior                                                                     |
| --------------- | ---------------------------------------------------------------------------- |
| Initial         | No images; no certificate rows; rules unchecked                              |
| Loading         | Per-file upload pending; final submit pending                                |
| Success         | Navigate `/expert-registration/complete`                                     |
| Empty portfolio | Allowed? Min/max images **BUSINESS DECISION REQUIRED**                       |
| Error           | Upload error per item; final submit error Alert                              |
| Retry           | Retry failed file or submit                                                  |
| Disabled        | Submit until `accept_rules` checked and min images (if any) met              |
| Validation      | Images only, client dedupe (legacy); certificate title+file optional per row |
| Partial         | Some images ok, one failed: keep good ones                                   |
| Optimistic      | Local previews with remove                                                   |
| Mobile          | Preview grid; sticky submit                                                  |

Certificates: add row, preview, remove by stable id (not fragile index).

---

## Registration completion

| State             | Behavior                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------- |
| Initial / success | Confirmation that submit was received. No second submit                                                             |
| Loading           | Should not re-hit submit on refresh — **API CONTRACT REQUIRED** / idempotency                                       |
| Error             | If the user lands here without a successful submit, redirect to step 9 or an error — **BUSINESS DECISION REQUIRED** |
| Empty             | N/A                                                                                                                 |
| Retry             | N/A on success                                                                                                      |
| Disabled          | No continue                                                                                                         |
| Validation        | N/A                                                                                                                 |
| Next CTA          | Home vs pending-review vs login vs profile — **BUSINESS DECISION REQUIRED** (P0)                                    |
| Mobile            | Single column; primary CTA                                                                                          |

---

## File uploads (shared)

Used by avatar, education, license, portfolio, certificates.

| State      | Behavior                                                  |
| ---------- | --------------------------------------------------------- |
| Idle       | FileUpload primitive                                      |
| Selected   | Local name + preview when image                           |
| Uploading  | Progress on that item; disable remove optional            |
| Success    | Checkmark / replace action                                |
| Empty      | No file                                                   |
| Error      | Type/size/network — size limits **API CONTRACT REQUIRED** |
| Retry      | Replace file                                              |
| Disabled   | While parent submit pending                               |
| Validation | Accept list from the step                                 |
| Partial    | Sibling files independent                                 |
| Optimistic | Preview before server ack                                 |
| Mobile     | Native picker; no drag-and-drop requirement               |

Do not invent multipart endpoints.

---

## Portfolio upload (profile vs registration)

| Context                | Phase 1                                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Registration step 9    | Full add/remove/preview as above                                                                                            |
| Public profile gallery | Read-only viewer; loading skeleton; empty hides section; error in dialog if an image 404s (skip/broken image, do not crash) |

Viewer: Dialog; keyboard next/prev; close restores focus.

---

## Article listing

`/articles`, `/articles/categories/[slug]`

| State      | Behavior                                                                                                  |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| Loading    | Card skeletons                                                                                            |
| Success    | Category chips; featured lead on page 1; `ArticleCard` grid; recommended block; pagination when total > 9 |
| Empty      | Empty: no articles yet / empty category. Do not repeat the same demo UTM card                             |
| Error      | Alert + retry                                                                                             |
| Retry      | Re-fetch                                                                                                  |
| Disabled   | Inert search/sort must **not** ship                                                                       |
| Validation | Unknown category slug → not found                                                                         |
| Partial    | Hub curated sections omitted independently if empty                                                       |
| Optimistic | None                                                                                                      |
| Mobile     | 1 column                                                                                                  |

Content source: **BUSINESS DECISION REQUIRED** / **API CONTRACT REQUIRED**.

---

## Article detail

| State             | Behavior                                                       |
| ----------------- | -------------------------------------------------------------- |
| Loading           | Title + body skeleton                                          |
| Success           | Article; derived TOC; categories; related by tags; comments    |
| Empty related     | Hide related block                                             |
| Empty comments    | Empty + form                                                   |
| Comment submit    | Mock: local append, honest non-persistence copy. No API: error |
| Error / not found | Error or `notFound()`                                          |
| Retry             | Re-fetch                                                       |
| Partial           | Missing author/views: omit meta bits                           |
| Mobile            | Accordion TOC in flow                                          |

---

## FAQ

| State     | Landing                        | Category                                        |
| --------- | ------------------------------ | ----------------------------------------------- |
| Loading   | Card skeletons                 | Accordion skeletons                             |
| Success   | Cards with real questions only | Accordion                                       |
| Empty     | No categories: Empty + home    | Category without items: Empty; do not invent Qs |
| Error     | Retry                          | Retry                                           |
| Not found | —                              | Unknown category                                |
| Disabled  | Ask-question absent in Phase 1 | —                                               |
| Partial   | Surveying-only is acceptable   | Related tags omitted if `#`                     |
| Mobile    | Full-width cards               | Accordion                                       |

---

## Knowledge

| State      | Landing                                        | Category                                                                                      |
| ---------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Loading    | Skeletons                                      | Tip skeletons                                                                                 |
| Success    | Real categories only                           | Tips                                                                                          |
| Empty      | Empty                                          | Empty                                                                                         |
| Error      | Retry                                          | Retry                                                                                         |
| Pagination | —                                              | Load-more pending; end of list hides button. Page vs infinite: **BUSINESS DECISION REQUIRED** |
| Partial    | Do not show `۵۰ نکته` unless API count is real | Mismatched badge/text must not be copied from legacy                                          |
| Mobile     | Stacked                                        | Stacked                                                                                       |

---

## Review submission

**NEEDS CONFIRMATION.** Not a Phase 1 flow.

If later confirmed, minimum states to design (do not implement now):

| State           | Note                                                                                    |
| --------------- | --------------------------------------------------------------------------------------- |
| Unauthenticated | Customer auth model **BUSINESS DECISION REQUIRED** (password vs 4-digit OTP vs 5-digit) |
| Form validation | Stars, optional tags, name, anonymous                                                   |
| Pending         | Disable submit                                                                          |
| Success         | List refresh; close dialog                                                              |
| Error           | Alert + retry                                                                           |
| Legal           | Links to `/terms` and `/privacy-policy`, not `#`                                        |

Home testimonials vs profile reviews: **BUSINESS DECISION REQUIRED**.

Display of ratings on cards/profile remains allowed when the API returns them.

---

## Contact / chat entry points

| Entry              | Phase 1                | States                                                                           |
| ------------------ | ---------------------- | -------------------------------------------------------------------------------- |
| Profile phone      | CORE                   | Sheet open; `tel:` with real number; unavailable → no fake number                |
| Profile SMS        | CORE                   | `sms:` with real number; malformed legacy quote is not copied                    |
| Sticky mobile call | CORE                   | Hidden when contact unavailable                                                  |
| Chat               | **NEEDS CONFIRMATION** | No UI. Do not ship the DOM mock or wrong header name                             |
| Save               | **NEEDS CONFIRMATION** | No UI                                                                            |
| Share              | **NEEDS CONFIRMATION** | Native share/copy is small if later confirmed: idle / copied / share-unavailable |

---

## Engineering forms (deferred)

If confirmed later:

| State            | Behavior                                                                |
| ---------------- | ----------------------------------------------------------------------- |
| Loading          | Table/row skeletons                                                     |
| Success          | Named forms + download                                                  |
| Empty            | No forms for filters                                                    |
| Error            | Retry                                                                   |
| File unavailable | Row visible, download disabled or explained — **API CONTRACT REQUIRED** |
| Search no-hits   | Empty                                                                   |

Do not invent metadata now.

---

## Home dynamic blocks

| Block                      | Loading         | Empty                         | Error | Phase                                                           |
| -------------------------- | --------------- | ----------------------------- | ----- | --------------------------------------------------------------- |
| Service grid               | Static config   | —                             | —     | CORE                                                            |
| Popular / drawing tiles    | —               | Hide section if mapping empty | —     | CORE after mapping **BUSINESS DECISION REQUIRED**               |
| Banners                    | Skeleton / omit | Hide                          | Hide  | CONTENT SUPPORTING; destinations **BUSINESS DECISION REQUIRED** |
| Knowledge preview          | Skeleton        | Hide                          | Hide  | CONTENT SUPPORTING                                              |
| Expert showcase            | —               | —                             | —     | **NEEDS CONFIRMATION** — omit                                   |
| Testimonials + home review | —               | —                             | —     | **NEEDS CONFIRMATION** — omit                                   |

---

## Chrome

| Surface     | Open  | Error | Empty                            | a11y                        |
| ----------- | ----- | ----- | -------------------------------- | --------------------------- |
| Mobile menu | Sheet | —     | Hide groups with zero real links | Focus trap, `aria-expanded` |
| Footer      | —     | —     | Omit social/unmapped             | Landmark `contentinfo`      |

---

## Mapping to primitives

| UX state              | Primitive                           |
| --------------------- | ----------------------------------- |
| Loading list/profile  | Skeleton                            |
| Inline pending        | Spinner on Button                   |
| Wizard progress       | Progress                            |
| No results            | Empty                               |
| Page/section failure  | Alert `variant="error"`             |
| Field issues          | Field error                         |
| Info (OTP sent)       | Alert `variant="success"` or `info` |
| Unverified / inactive | Badge                               |
| Overlay               | Dialog / Sheet / Drawer             |

---

## Quality check

- Loading, empty, error, success, retry exist for search, city, services, profile, each registration step, articles, FAQ, knowledge.
- Registration completion is an explicit success state (legacy had none).
- OTP resend cannot be implemented as navigation to step 3.
- Building-permit empty is included.
- Unconfirmed features are absent, not disabled fakes.
- No backend response shapes invented.
