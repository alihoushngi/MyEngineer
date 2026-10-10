# Interior and façade service

This page introduces the service and helps visitors find and compare available specialists.

- Route inspected: `/services/طراحی-داخلی-طراحی-نما`; implementation: `/services/[slug]`.
- Client reference: `Design/services/interior-design.html`.
- Original mobile order: Introduction → service-scope accordion → filters/results → expert cards → educational definitions.
- Final mobile order: Introduction/search/banner → collapsed scope → city/filter controls → request action/results/list → live FAQs → verified recommendations → process/preparation → related services.

This reference belongs to the scope-before-filters group. Real backend descriptions and FAQs replace the repeated placeholder educational paragraphs; existing façade/interior specialty information is retained.

Desktop retains the existing navy split introduction, expanded specialty content, professional expert grids, and recommendations → marketplace → process → FAQ sequence. The scope content is rendered once, collapsed on mobile and always visible at 1024px and above. Additional request, pagination, retry, process, preparation, FAQ, and related-service features remain available.

Sources: `app/(shop)/services/[slug]/page.tsx`, `ServiceDiscoveryPage`, `ServiceDiscoveryHero`, `ServiceExpertMarketplace`, `ServiceScopeSection`, and the existing catalog/professional services. Common data flow, reusable components, page-specific metadata, filtered-page indexing, optimized images, accessibility, responsive behavior, validation, and protected-area exclusions are described in [Service discovery](services.md).
