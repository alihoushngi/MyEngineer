# Knowledge category

Purpose: Read practical tips for a specific construction subject and discover related categories. Route: `/knowledge/[category]`.

Sources:

- `lib/content/decode-route-slug/decode-route-slug.ts`
- `app/(shop)/knowledge/[category]/page.tsx`
- `components/store/knowledge/knowledgeCategoryPage/knowledgeCategoryPage.tsx`
- `components/store/knowledge/knowledgeTipList/knowledgeTipList.tsx`

Client references:

- `Design/knowledge/knowledge-surveying.html`

Original section order: Introduction → numbered tips → related-service CTA → other categories.

Final mobile section order: Breadcrumb → category H1/description → numbered tip cards → pagination → related-service CTA when supplied → other-category navigation.

Desktop decisions: Existing narrow reading width and tip cards remain.

Preserved sections and functionality: Pagination, empty state, conditional service CTA and content.

Restored or added: Crawlable other-category links after tips and CTA.

Reused components: KnowledgeTipList, Pagination, ContentPageHeader, Button and StoreBreadcrumb.

Data sources: knowledge-service listKnowledgeCategories provides category and all sibling categories in one route fetch; getKnowledgeCategory remains for metadata.

SEO: Encoded Unicode category paths are decoded once before lookup. Category Open Graph, canonical and page-specific title/canonical for pagination; unavailable category remains 404. No unsupported FAQ schema.

Responsive and accessibility decisions: RTL, Kalameh, design tokens and dark-mode support remain. Changes are page/component scoped. Existing touch targets, keyboard interactions and reduced-motion behavior are retained. Header, Footer, login, registration, global CSS and font loading remain excluded. Browser verification and executed project checks are recorded in [testing and QA](../testing-and-qa.md); this page does not claim unexecuted checks.
