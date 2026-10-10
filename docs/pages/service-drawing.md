# Drawing service

This page introduces the service and helps visitors find and compare available specialists.

- Route inspected: `/services/ترسیم-نقشه`; implementation: `/services/[slug]`.
- Client reference: `Design/services/drawing.html`.
- Original mobile order: Introduction/search/banner → architecture/structure/electrical/mechanical tabs → active filters/scope → active expert listing → education.
- Final mobile order: Introduction/search/banner → actual discipline-category links → city/filter controls → collapsed scope → request action/results/list → live FAQs → verified recommendations → process/preparation → related services.

The inspected API exposes only ترسیم نقشه معماری and ترسیم نقشه سازه. Electrical/mechanical categories from the original reference are a backend content gap; navigation or expert records were not fabricated. Architecture selection was verified to set skill=8 while retaining city/experience filters and resetting pagination.

Desktop retains the existing navy split introduction, expanded specialty content, professional expert grids, and recommendations → marketplace → process → FAQ sequence. The scope content is rendered once, collapsed on mobile and always visible at 1024px and above. Additional request, pagination, retry, process, preparation, FAQ, and related-service features remain available.

Sources: `app/(shop)/services/[slug]/page.tsx`, `ServiceDiscoveryPage`, `ServiceDiscoveryHero`, `ServiceExpertMarketplace`, `ServiceScopeSection`, and the existing catalog/professional services. Common data flow, reusable components, page-specific metadata, filtered-page indexing, optimized images, accessibility, responsive behavior, validation, and protected-area exclusions are described in [Service discovery](services.md).
