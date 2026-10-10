# Building permit and completion service

This page introduces the service and helps visitors find and compare available specialists.

- Route inspected: `/services/اخذ-پروانه-ساخت-اخد-پایان-کار`; implementation: `/services/[slug]`.
- Client reference: `Design/services/building-permit.html`.
- Original mobile order: Introduction → permit/completion scope → filters/results → expert cards → permit/completion education.
- Final mobile order: Introduction/search/banner → collapsed scope → city/filter controls → request action/results/list → live FAQs → verified recommendations → process/preparation → related services.

The reference places scope before filtering. Existing API text, FAQs, loading, retry, and change-city empty state remain available. Placeholder source paragraphs and new legal requirements were not introduced.

Desktop retains the existing navy split introduction, expanded specialty content, professional expert grids, and recommendations → marketplace → process → FAQ sequence. The scope content is rendered once, collapsed on mobile and always visible at 1024px and above. Additional request, pagination, retry, process, preparation, FAQ, and related-service features remain available.

Sources: `app/(shop)/services/[slug]/page.tsx`, `ServiceDiscoveryPage`, `ServiceDiscoveryHero`, `ServiceExpertMarketplace`, `ServiceScopeSection`, and the existing catalog/professional services. Common data flow, reusable components, page-specific metadata, filtered-page indexing, optimized images, accessibility, responsive behavior, validation, and protected-area exclusions are described in [Service discovery](services.md).
