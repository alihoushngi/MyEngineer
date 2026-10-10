# Surveying service

This page introduces the service and helps visitors find and compare available specialists.

- Route inspected: `/services/نقشه-برداری`; implementation: `/services/[slug]`.
- Client reference: `Design/services/land-surveying.html`.
- Original mobile order: Introduction/search/banner → filters → scope → specialist results → educational questions → recommended experts.
- Final mobile order: Introduction/search/banner → city/filter controls → collapsed scope → request action/results/list → live FAQs → verified recommendations → process/preparation → related services.

The surveying reference places recommendations after its educational questions. The mobile order restores that placement; the same existing verified-only recommendation condition is retained.

Desktop retains the existing navy split introduction, expanded specialty content, professional expert grids, and recommendations → marketplace → process → FAQ sequence. The scope content is rendered once, collapsed on mobile and always visible at 1024px and above. Additional request, pagination, retry, process, preparation, FAQ, and related-service features remain available.

Sources: `app/(shop)/services/[slug]/page.tsx`, `ServiceDiscoveryPage`, `ServiceDiscoveryHero`, `ServiceExpertMarketplace`, `ServiceScopeSection`, and the existing catalog/professional services. Common data flow, reusable components, page-specific metadata, filtered-page indexing, optimized images, accessibility, responsive behavior, validation, and protected-area exclusions are described in [Service discovery](services.md).
