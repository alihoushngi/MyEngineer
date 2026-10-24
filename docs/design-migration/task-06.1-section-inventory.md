# Task 06.1 homepage section inventory

Reference order and app state checked against `design-reference/index.html`, the rendered reference at `127.0.0.1:8000/index.html`, the Next.js homepage, and the live homepage payload.

| Reference section / DOM position | Next.js component | Status and required visual work | Interaction | Verified API source | Image provenance / gaps |
|---|---|---|---|---|---|
| Header and service search / 1 | Shared store shell, `HomeHero` | Completed in earlier tasks; retained | Search, preferred city, mobile menu | Existing search and city services | Existing hero artwork remains API-backed with prior fallback behavior |
| Service directory / 2 | `ServiceCategories` | Completed in Task 05; retained | Service links, FAQ link | `/services` | The six current service-category records return the same portrait content at distinct URLs; existing section preserved and issue remains |
| Promotions / 3 | `HomePromotions` | Completed in Task 04; retained | Swiper controls | `/sliders` | Previously observed backend 404 images; not changed here |
| “What is Mohandes Man?” / 4 | `HomeNarrative` | Completed in Task 06; retained | None | Approved static explanatory copy | No content image |
| Popular services / 5 | `PopularServices` | Reworked to the reference’s compact, horizontally scrollable image-and-title strip; API order and all returned records retained | Service links, touch/trackpad scroll, keyboard focus | `/home.popular_services`; `/services` fallback | The eight live popular-service image URLs returned identical JPEG bytes (SHA-256 prefix `0904783239ba`); neutral accessible image state shown pending corrected API media |
| Drawing consultation / 6 | `DrawingConsultation` | Reworked as four ordered discipline cards | Links only where an API service record exists | `/home.drawing_services`; `/services` fallback | Architecture and structure have records; electrical and mechanical records/routes are absent. No records or IDs were fabricated. The verified service image path currently has duplicate portrait media, so a neutral state is shown |
| “Why Mohandes Man?” benefits / 7 | `WhyMohandesMan` | Reworked to the reference’s centered heading and four unboxed icon-and-copy items | None | Approved static `homeWhyCopy` | UI icons only; no content images |
| Expert registration CTA / 8 | `JoinCtaSection` | Reworked to the reference’s light bordered panel and preserved `JoinLink` route/access behavior | `/expert-registration` through `JoinLink` | Approved static explanatory copy; no artwork endpoint | Reference artwork has no verified backend source; accessible missing-art state shown |
| Expert showcase / 9 | `HomeMarketplace`, `ExpertCard` | Reused live expert records in an RTL Swiper carousel; existing filters, query state, cards, empty state, and pagination retained | Touch, keyboard, previous/next controls, service/city/expertise filters, pagination, profile links | `/home.experts`, `/services`, `/home.cities` | Expert photos come from API fields. Six known expert image URLs return identical JPEG bytes and are suppressed to initials. `/home.experts` omits service associations and specialties; those filters cannot narrow the current records |
| Testimonials / 10 | `HomeTestimonials` | Reworked to the reference’s compact, manually controlled quote carousel | Keyboard, touch, previous/next, pagination, authenticated submit dialog | `/testimonials` | Four live records currently repeat the same quote. Two have no photo; duplicate photo URLs use initials fallback |
| Knowledge tips / 11 | `HomeKnowledgeTips` | Reworked to a compact reference-style tip carousel | Touch, keyboard, previous/next, clickable pagination, reduced-motion-aware autoplay | `/home.knowledge_tips` | Current homepage tip contract supplies text/category/slug but no article thumbnail; reference cards are text-only |
| Site footer / 12 | Shared store footer | Completed earlier; retained | Existing footer links and disclosures | Existing site settings/content services | Previously observed empty social/email settings remain unchanged |
| FAQ modal and question panel / hidden states | `ServiceCategories`, `HomeFaqEntry`, shared dialogs | The reference FAQ categories are modal states, not another visible reference section. Existing API-backed `HomeFaqEntry` remains as app functionality. | FAQ navigation, existing dialogs/auth flow | `/home.faq_categories` and existing FAQ routes | No reference homepage article images |
| App-only content highlights / after reference tips | `ContentHighlights` | Retained to preserve app functionality; absent from reference DOM | Existing content routes | Existing app routes | No image substitution |

## Verified live gaps

- `/home` returned 8 popular services, 2 drawing services, 8 experts, 5 cities, 9 FAQ categories, and 6 knowledge tips during this audit.
- `/services` exposed architecture and structure drawing services only. Electrical and mechanical records were not present.
- The 8 popular-service URLs returned identical JPEG bytes despite distinct IDs/URLs. The frontend therefore does not present the portrait as service artwork.
- Expert API records did not include service associations or specialties. City filtering works (8 records narrowed to 5 for Tehran); service and expertise filters cannot narrow records without those backend fields.
- Four live testimonial records currently return identical quote text despite their distinct author records. Image deduplication prevents six duplicated expert photos and two duplicated testimonial photos from appearing as content artwork.
- The CTA artwork has no verified API capability. The page keeps the route and exposes a neutral accessible missing-art state.

## Rendered QA evidence

- Full-page CUA screenshots were compared against the supplied reference. The open browser exposed 1440×723 (app), 1280×720 (reference), and 372×984 (app mobile) viewports. The mobile document width matched its viewport (372px), with no horizontal page overflow.
- Required 1440×900, 768×1024, and 390×844 samples could not be set in the available browser session; Chrome remote debugging was disabled. Do not claim 99% measured parity from these captures.
- The API-backed hero banners, service artwork, and CTA image remain visibly empty because their backend media is missing, broken, or duplicated. No reference/local content images are substituted.

The reference’s hidden FAQ modal, site footer, and app-only sections are kept distinct. No route, auth flow, or footer/header implementation was changed by Task 06.1.
