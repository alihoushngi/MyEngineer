# FAQ landing

Purpose: Find answers by service category or search and submit a new question. Route: `/faq`.

Sources:

- `app/(shop)/faq/page.tsx`
- `components/store/faq/faqLandingPage/faqLandingPage.tsx`
- `components/store/faq/faqCategoryCard/faqCategoryCard.tsx`

Client references:

- `Design/FAQs/landig-faq.html`

Original section order: Teal introduction/search → icon category links.

Final mobile section order: Breadcrumb → mobile teal introduction/search/ask group → matched question accordion when searching → category links.

Desktop decisions: Existing desktop category cards and 2-column grid remain; mobile cards become compact icon/text/arrow rows.

Preserved sections and functionality: Question submission dialog, server search, matched accordion and empty states.

Restored or added: Compact mobile category links and local teal introduction.

Reused components: FaqCategoryCard, FaqAskDialog, FaqAccordion, ContentFilterBar, ContentPageHeader.

Data sources: faq-service listFaqCategories/searchFaq; no reference dummy questions.

SEO: Open Graph/canonical /faq; search views explicitly noindex. Accordions keep existing Radix keyboard/expanded semantics.

Responsive and accessibility decisions: RTL, Kalameh, design tokens and dark-mode support remain. Changes are page/component scoped. Existing touch targets, keyboard interactions and reduced-motion behavior are retained. Header, Footer, login, registration, global CSS and font loading remain excluded. Browser verification and executed project checks are recorded in [testing and QA](../testing-and-qa.md); this page does not claim unexecuted checks.
