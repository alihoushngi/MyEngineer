# FAQ category

Purpose: Read questions and answers for one service category. Route: `/faq/[category]`.

Sources:

- `app/(shop)/faq/[category]/page.tsx`
- `components/store/faq/faqCategoryPage/faqCategoryPage.tsx`
- `components/store/faq/faqAccordion/faqAccordion.tsx`
- `components/store/content/contentStructuredData/contentStructuredData.tsx`
- `lib/content/decode-route-slug/decode-route-slug.ts`

Client references:

- `Design/FAQs/faq-land-surveying.html`

Original section order: Category title/intro → questions/answers → other FAQ categories.

Final mobile section order: Breadcrumb → category H1/description → accessible question accordion → pagination → supplied service CTA → related categories when supplied.

Desktop decisions: Existing narrow reading width, accordions and desktop related cards remain.

Preserved sections and functionality: All supplied question answers, service CTA, pagination and related categories.

Restored or added: An accessible question-group H2 precedes question H3s. Related-card headings use H3 beneath the related section H2; mobile links inherit compact scoped cards.

Reused components: FaqAccordion, Pagination, FaqCategoryCard, ContentPageHeader.

Data sources: faq-service getFaqCategory. Related-category content remains conditional on actual API data.

SEO: Category Open Graph and page-specific canonical/title. FAQPage JSON-LD includes only questions and answers on the current visible page, with escaped script content. Encoded Unicode category paths are decoded once before backend lookup. No questions, ratings or structured facts are fabricated.

Responsive and accessibility decisions: RTL, Kalameh, design tokens and dark-mode support remain. Changes are page/component scoped. Existing touch targets, keyboard interactions and reduced-motion behavior are retained. Header, Footer, login, registration, global CSS and font loading remain excluded. Browser verification and executed project checks are recorded in [testing and QA](../testing-and-qa.md); this page does not claim unexecuted checks.
