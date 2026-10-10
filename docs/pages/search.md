# Search results

Purpose: find public services and experts with query and city filters. Route: `/search`. There is no dedicated client results-page HTML; original home/service overlays only establish discovery entry. Preserve the independently completed results design.

## Source and data

- `app/(shop)/search/page.tsx`
- `components/store/search/searchResultsPage/searchResultsPage.tsx`
- `components/store/search/searchHeader/searchHeader.tsx`
- `services/search-service/search-service.ts`

The route parses URL `q`, cities and page, loads `searchCatalog` and catalog cities, and renders actual service/expert results. Results use shared expert cards and pagination. Search/city UI also used by the protected header is unchanged.

## Preserved order and layout

Breadcrumb → query/city region with H1 → result summary → active city chips → grouped service/expert results plus pagination, or no-query/no-results state. Mobile controls stack; `sm+` search controls share a row and existing result grids remain. No section added, removed or redesigned during alignment.

Keep city removal/reset links and pagination query preservation. Search is noindex to avoid duplicate query content; retain existing metadata. Shared focus, empty/error/loading behavior and keyboard interactions remain. API availability and live-result correctness need configured backend data; do not fabricate matches for visual review.
