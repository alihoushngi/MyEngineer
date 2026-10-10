# Construction workers service

This page introduces the service and helps visitors find and compare available specialists.

- Route inspected: `/services/استادکار-ساختمان`; implementation: `/services/[slug]`.
- Client reference: `Design/services/construction-workers.html`.
- Original mobile order: Introduction/search/banner → worker/contractor tabs → active filters/scope → active expert listing → education.
- Final mobile order: Introduction/search/banner → actual child-category links → city/filter controls → collapsed scope → request action/results/list → live FAQs → verified recommendations → process/preparation → related services.

The live root service is استادکار ساختمان. Category navigation uses actual catalog child IDs; it does not fabricate a separate contractor listing or copy the unrelated surveying questions from the original worker template.

Desktop retains the existing navy split introduction, expanded specialty content, professional expert grids, and recommendations → marketplace → process → FAQ sequence. The scope content is rendered once, collapsed on mobile and always visible at 1024px and above. Additional request, pagination, retry, process, preparation, FAQ, and related-service features remain available.

Sources: `app/(shop)/services/[slug]/page.tsx`, `ServiceDiscoveryPage`, `ServiceDiscoveryHero`, `ServiceExpertMarketplace`, `ServiceScopeSection`, and the existing catalog/professional services. Common data flow, reusable components, page-specific metadata, filtered-page indexing, optimized images, accessibility, responsive behavior, validation, and protected-area exclusions are described in [Service discovery](services.md).
