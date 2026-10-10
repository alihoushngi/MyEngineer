# Implementation report

Client alignment changes and validation are complete in scoped page content. Exact QA outcomes and environmental limits are maintained in [testing and QA](testing-and-qa.md). The comparison audit was written before implementation in [design-reference-audit.md](design-reference-audit.md).

This report records the client-alignment snapshot. Statements about unchanged auth/API code, dependencies and commit status describe that work. Subsequent security changes are documented in [security.md](security.md) and do not change its visual-design scope.

## Homepage

Mobile section order follows introduction/search → compact service categories → separate promotional banners → about narrative with retained process → popular services → drawing consultation → why → join → expert marketplace → testimonials → knowledge → retained content highlights/FAQ. The marketplace keeps its filters, cities, expert cards and pagination. The new manual promotion controls keep accessible Persian labels and avoid autoplay. Homepage categories opt into responsive pictures using already bundled client illustrations; API artwork stays on desktop and the shared grid’s default path remains unchanged for Header/other consumers. Search/city fields stack below 640px. Scoped mobile spacing/surfaces use the client teal/navy/yellow identity while desktop retains its existing photographic hero and section layouts. Desktop marketplace placement follows the requested original order.

## Content and expert profile

- Articles: restored real catalog recommendations, popular mobile rail, mobile teal introduction/search groups, category access on category pages and mobile detail; preserved featured content, search/sort, pagination, comments and related content. Supplied HTML bodies render as safe React text blocks with real headings and matching TOC anchors; Markdown examples remain literal. Card previews are compact excerpts of supplied content, and valid ISO publication dates display readable Persian dates.
- Knowledge: restored genuine supplied-tip previews and other-category navigation while keeping server filters, counts, pagination and empty states.
- FAQ: compact mobile category links and local introduction; existing search, ask-question dialog and accessible accordions remain.
- About: restored how-it-works title/introduction and adjusted only mobile image/step proportions; story, services, values, team and brands remain.
- Public expert profile: a single DOM order follows the mobile resume hierarchy, while scoped CSS keeps the existing desktop ordering/sidebar. Biography, credentials/history/certificates, cities/software, portfolio, reviews, related experts, sticky contact and authenticated actions remain.
- Forms: client title and local teal introduction/filter grouping, with compact narrow download rows. Actual filters, downloads and errors/empty states remain; CareersPage in the same file is unchanged.
- Legal: route-specific Open Graph metadata; legal wording and shared reading components remain unchanged.
- Search/contact/careers/install/offline/private workspaces: existing layouts and behavior retained after audit; no unrelated redesign.

Service pages retain distinct reference cohorts: surveying/drawing/workers place city/filter controls before the mobile scope disclosure; interior/façade, permit/completion and administration put scope first. Real child-category navigation is restored for drawing/workers, with preserved URL filter state and page reset. The scope is rendered once, collapses below 1024px with accessible controls, and is visible on desktop. The six referenced pages use the already bundled original construction banner below 1024px through a single responsive picture; desktop uses the existing API image. Desktop keeps intro → scope → recommendations/request action → marketplace → process/preparation → FAQ → related services. Existing expert listing, request action, verified recommendations, educational FAQ, process/preparation and related content remain. Unknown unreferenced services retain the prior template. See [service guide](pages/services.md).

## SEO and performance

In-scope routes gain matching Open Graph metadata; service OG images use actual catalog media. Service filtered/sorted/paginated variants use noindex/follow. Filtered content views explicitly noindex with clean canonical strategy; paginated content category titles/canonicals follow the rendered page. Nested cards use appropriate H3 under section H2. Article covers use Next Image with stable aspect ratio, responsive sizes, priority and meaningful alt.

`app/sitemap.ts` uses optional server-only `SITE_URL` and enabled public routes plus actual catalog service/article/category/FAQ/knowledge/career/expert links. Articles and experts traverse the existing backend pagination with 100 items per request; failed or non-advancing pages stop safely, and category loading fails independently. Expert inclusion does not depend on homepage visibility. Unset/invalid site origin produces an empty sitemap; authentication, account/engineer, search, filters and offline are excluded. No production domain, fake ratings or structured facts are invented. Existing staging robots/root/global-header indexing gates remain.

Global Kalameh/font configuration, CSS tokens, providers, API adapters, session guards, validation and feature flags remain unchanged. Existing Server Component/service boundaries are preserved; no dependencies were added. Reference source is excluded from lint, formatting, Git and Docker context.

## Documentation disposition

Updated: root README, canonical `ARCHITECTURE.md` and `DESIGN-SYSTEM.md`, development/Docker, mock-auth/customer-auth/account, engineer-panel, messaging, API and image-asset guides. The canonical uppercase guide names are retained to avoid ambiguous case-only unstaged renames on macOS.

Created: documentation index, full comparison audit, migration decisions, section map, responsive/SEO/accessibility/performance/QA/report guides, and dedicated documents for all major page families. API/auth/panel/PWA specifications and optional icon/iPhone-asset contracts remain available.

Moved from docs root to `docs/history/`: `LEGACY-AUDIT.md`, `INFORMATION-ARCHITECTURE.md`, `COMPONENT-ARCHITECTURE.md`, `PRODUCT-FLOWS.md`, `PHASE-1-SCOPE.md`, `STATE-MATRIX.md`, `ADMIN-PANEL-TASKS.md`. All are preserved with snapshot notices and repaired links; obsolete root planning placements were removed without discarding useful history. Four concept PNGs remain historical references.

## Verification and limits

Typecheck, all 146 repository tests, two additional slug-decoding tests, lint and production build passed. Lint reports seven existing warnings. All changed source/docs pass formatting; full-repository formatting reports 65 unchanged legacy files. Browser coverage includes 24 distinct public pages at all 11 requested widths (264 distinct combinations), with the final 143-case representative sweep refreshed after the last source changes. No overflow, H1-count, framework-overlay or page-error failures were found. Six theme/reduced-motion/keyboard cases and targeted search, filters, banner and accordion interactions passed. Documentation links and page-source paths have no missing targets. The final 275-file protected hash comparison and all 113 Design file comparisons found no changes. Details are recorded in [testing and QA](testing-and-qa.md).

The backend knowledge-category model lacks a service relation, so related-expert links are not guessed. The drawing API currently supplies only architecture/structure child categories; electrical/mechanical entries are not fabricated. Localhost backend CORS limits some client service/province lookups despite successful SSR data loading. The backend homepage slider image can be ORB-blocked; existing local fallback artwork renders. Supplied article covers can be unrelated to their subject and remain actual API data. Image LCP warnings still appear during responsive resizing; no performance score is claimed. Existing bare-IP image policy remains unoptimized. Missing/empty live content stays honest. The public site origin is deployment configuration, and staging indexing remains intentionally blocked. Real-device iPhone installation and live mutation correctness require their appropriate environment and are not certified by presentation checks.

Header, Footer, Login, Registration/Sign-up, OTP/recovery UI, Kalameh and their shared styles are unchanged against the baseline. The shared category-grid default rendering path was independently reviewed and remains identical for protected consumers. Existing translucent Header pixels can blend with changed page content beneath it; pixel identity is not claimed. No commit or push was performed, and original `Design/` bytes are unchanged.
