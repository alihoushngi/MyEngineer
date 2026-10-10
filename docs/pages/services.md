# Service discovery

Service pages introduce a building service, explain its scope, and help visitors compare and contact real specialists. The dynamic route is `/services/[slug]`; the catalog supplies actual slugs, labels, child IDs, and images. Reference filenames are not an assumed backend route catalog.

## References and live routes

| Client HTML reference                              | Live route inspected locally              | Original hierarchy                                                                                 |
| -------------------------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `Design/services/land-surveying.html`              | `/services/نقشه-برداری`                   | Intro/search/banner → filters → scope → results/list → educational questions → recommended experts |
| `Design/services/construction-workers.html`        | `/services/استادکار-ساختمان`              | Intro/search/banner → role navigation → corresponding filters/scope → listing → education          |
| `Design/services/drawing.html`                     | `/services/ترسیم-نقشه`                    | Intro/search/banner → discipline navigation → corresponding filters/scope → listing → education    |
| `Design/services/interior-design.html`             | `/services/طراحی-داخلی-طراحی-نما`         | Introduction → scope → filters/results → expert cards → education                                  |
| `Design/services/building-permit.html`             | `/services/اخذ-پروانه-ساخت-اخد-پایان-کار` | Introduction → scope → filters/results → expert cards → education                                  |
| `Design/services/construction-admin-services.html` | `/services/خدمات-اداری`                   | Introduction → scope → filters/results → expert cards → education                                  |

These live routes were available during local QA. The route implementation continues to accept catalog slugs dynamically.

## Source files

- `app/(shop)/services/[slug]/page.tsx`: service resolution, server data loading, preferred-city handling, and metadata.
- `components/store/service/serviceDiscoveryPage/serviceDiscoveryPage.tsx`: reference matching and single-instance section composition.
- `components/store/service/serviceDiscoveryHero/serviceDiscoveryHero.tsx`: page introduction, breadcrumb, service image, and search/expert entry points.
- `components/store/service/serviceExpertMarketplace/serviceExpertMarketplace.tsx`: existing result/filter controls and responsive section placement.
- `components/store/service/serviceScopeSection/serviceScopeSection.tsx` and `serviceScopeDisclosure.tsx`: server-rendered service content inside an accessible mobile disclosure.
- Existing `serviceSuggestedExperts`, `serviceProcessSection`, `serviceRelatedSection`, `ServiceRequestCta`, `FaqAccordion`, and `ExpertCard` components remain reused.

## Final mobile order

Surveying, drawing, and worker pages use introduction/search/banner → actual child navigation where applicable → city/filter controls → collapsed service scope → existing request action → result count, active filters, experts/empty/error state and pagination → live FAQ education → verified recommendations when available → collaboration process and preparation guidance → related services.

Interior/façade, permit/completion, and administrative pages place their scope before city/filter controls, matching their different references. All other sections follow the same preserved functional path. Unknown services without an identifiable reference retain the previous template rather than receiving a new design.

The scope disclosure renders its content once. It starts collapsed below 1024px and expands by keyboard or touch with `aria-expanded` and `aria-controls`. The same content is always displayed on desktop, including after a visitor resizes from a collapsed mobile view. Service content and specialty cards remain available; they were not deleted to reduce mobile height.

## Desktop decisions

At 1024px and above, the original navy two-column introduction, image proportions, specialty grids, card grids, and section sequence remain: introduction → scope → verified recommendations/request action → marketplace → process/preparation → FAQs → related services. Responsive ordering moves existing section instances; it does not duplicate entire content structures for different viewports.

Drawing and worker mobile navigation uses real catalog child IDs and the existing `skill` query parameter. Existing cities, experience, license, discipline, degree, and sort values are preserved; selecting a category resets pagination to page one. The category links are crawlable and announce the selected entry. At the time of QA, the drawing API exposed architecture and structure only. Electrical/mechanical entries and duplicate role-specific listings were not fabricated.

## Data and preserved behavior

`getServiceDetail` obtains service content, `/faqs?service_id=…`, and professionals. The main listing still uses `searchProfessionals` and `buildProfessionalsQuery`. `useServiceFilters` continues to manage URL replacement, preferred cities, active chips, filter drafts, reset, retry, loading state, and pagination. API services, hooks, query serialization, authentication dialogs, and request creation logic were not changed.

Educational content uses real descriptions and FAQs. The original drawing/worker references repeat surveying questions, and other references contain placeholder paragraphs; these were not copied over useful live content. Recommendations still require verified specialists and are omitted when none are available. Related services retain their existing live lookup behavior.

## SEO, images, and accessibility

The introduction retains exactly one H1, page-specific title/description, and a canonical service URL. The service route now supplies Open Graph title, description, URL, locale, and actual catalog image when available. Filtered, sorted, and paginated variants use `noindex,follow`. Unfiltered pages inherit the application's deliberate staging `noindex` policy; this work does not enable production indexing. No ratings, review counts, expert records, or unsupported structured data were invented.

Reference pages use one `next/image` element inside a responsive `picture`. Below 1024px its source is the existing `/images/services/service-banner.png` construction artwork, which is byte-identical to the banner used by all six original HTML files. At desktop widths the same image element keeps the existing API image and region. `getImageProps` supplies an optimized mobile `srcSet` where available, with the local asset path as a fallback under the current unoptimized deployment policy. Eager loading with high fetch priority requests the selected picture source without preloading an unused desktop portrait on mobile; the desktop `sizes` hint is capped. Unknown services keep their original image template. Assets, Kalameh, global CSS/tokens, shared UI primitives, Header, Footer, Login, and Registration implementations are unchanged.

Scope controls have at least 48px height, category/filter actions have at least 44px targets, and the added search link has a keyboard focus ring. The specialist heading remains the target of the introduction's expert link. The scope chevron respects reduced motion, and service skeletons disable animation for reduced-motion users.

## Validation and limits

Targeted ESLint, `pnpm typecheck`, and the service Prettier check passed after the final service changes. Existing service-query tests passed (5/5). The final independent Chromium sweep covered all six live service pages at 320, 360, 375, 390, 430, 640, 768, 1024, 1280, 1440, and 1920px (66 service cases within the project's 143-case sweep): exactly one H1, meaningful content, no framework overlay, no page errors, and no document overflow. Fresh representative screenshots were captured at 390px and 1440px.

Interaction checks confirmed that selecting architecture changed the URL to `skill=8`, preserved `cities=10` and `experience=0-5`, and removed `page=2`. The filter dialog opened with existing real options. The scope control changed `aria-expanded` from `false` to `true` and closed again. No page/hydration errors occurred in that run.

The final banner check covered six reference services and one unknown service at 390px and 1440px (14 cases). Each hero contained one loaded image: mobile reference pages selected the original construction artwork; desktop selected its existing catalog image with the same dimensions and Open Graph image. Unknown-service rendering stayed unchanged. No overflow, page errors, or image warnings occurred. The bundled and original banners have matching SHA-256 checksums.

Local browser API calls to service/province endpoints reported CORS failures because the backend allowed the production frontend origin rather than `http://localhost:3000`. This pre-existing environment restriction affects client related-service and city lookup data; server-rendered service descriptions, FAQs, and listings loaded. Successful authenticated request submission and every possible filter combination were not claimed as tested. Full-project responsive QA and final quality-check results belong in the implementation report.
