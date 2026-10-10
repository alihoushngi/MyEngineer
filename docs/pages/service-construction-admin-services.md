# Administrative building service

This page introduces the service and helps visitors find and compare available specialists.

- Route inspected: `/services/خدمات-اداری`; implementation: `/services/[slug]`.
- Client reference: `Design/services/construction-admin-services.html`.
- Original mobile order: Introduction → administrative service scope → filters/results → expert cards → administrative education.
- Final mobile order: Introduction/search/banner → collapsed scope → city/filter controls → request action/results/list → live FAQs → verified recommendations → process/preparation → related services.

Administrative services keep the scope-before-filters hierarchy and authentic backend descriptions. Search/filter query state, specialist links, request action, and useful process/preparation content are preserved.

Desktop retains the existing navy split introduction, expanded specialty content, professional expert grids, and recommendations → marketplace → process → FAQ sequence. The scope content is rendered once, collapsed on mobile and always visible at 1024px and above. Additional request, pagination, retry, process, preparation, FAQ, and related-service features remain available.

Sources: `app/(shop)/services/[slug]/page.tsx`, `ServiceDiscoveryPage`, `ServiceDiscoveryHero`, `ServiceExpertMarketplace`, `ServiceScopeSection`, and the existing catalog/professional services. Common data flow, reusable components, page-specific metadata, filtered-page indexing, optimized images, accessibility, responsive behavior, validation, and protected-area exclusions are described in [Service discovery](services.md).
