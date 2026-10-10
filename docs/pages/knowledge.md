# Knowledge landing

Purpose: Discover short practical construction tips by category and search. Route: `/knowledge`.

Sources:

- `app/(shop)/knowledge/page.tsx`
- `components/store/knowledge/knowledgeLandingPage/knowledgeLandingPage.tsx`
- `components/store/knowledge/knowledgeCategoryCard/knowledgeCategoryCard.tsx`

Client references:

- `Design/knowledge/knowledge-category.html`

Original section order: Teal introduction/search → category filter → category cards with did-you-know preview → more tips → related experts.

Final mobile section order: Breadcrumb → mobile teal introduction/search/filter group → category cards with description, genuine did-you-know preview when available, count when supplied, and more-tips link.

Desktop decisions: Existing 2-column tablet and 3-column desktop grid remain.

Preserved sections and functionality: Backend category filtering, search, category description and item counts.

Restored or added: Preview of the first genuine supplied category tip, fetched on the server; no reference dummy fact.

Reused components: ContentPageHeader, ContentFilterBar, KnowledgeCategoryCard and StoreBreadcrumb.

Data sources: knowledge-service listKnowledgeLanding preserves server q/category filtering; listKnowledgeCategories supplies cached real tip data. Preview fetch failure does not remove category cards.

SEO: Open Graph and canonical /knowledge. Search/category-filter views explicitly noindex. Related-expert per-category link cannot be populated from the current backend category model because it has no service relation; no link is guessed.

Responsive and accessibility decisions: RTL, Kalameh, design tokens and dark-mode support remain. Changes are page/component scoped. Existing touch targets, keyboard interactions and reduced-motion behavior are retained. Header, Footer, login, registration, global CSS and font loading remain excluded. Browser verification and executed project checks are recorded in [testing and QA](../testing-and-qa.md); this page does not claim unexecuted checks.
