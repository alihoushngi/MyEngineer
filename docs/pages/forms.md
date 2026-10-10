# Engineering forms

Purpose: Find and download engineering forms using category, province and search filters. Route: `/forms`.

Sources:

- `app/(shop)/forms/page.tsx`
- `components/store/content/careersAndFormsPages/careersAndFormsPages.tsx`

Client references:

- `Design/knowledge/forms.html`

Original section order: Teal introduction/search → category/province selection → engineering download list.

Final mobile section order: Breadcrumb → mobile teal page introduction/search/category/province filters → form download rows, or existing error/empty state.

Desktop decisions: Existing desktop rows and filters remain; mobile introduction uses a local token surface and download rows retain 44px controls.

Preserved sections and functionality: Category/province/search query filtering, real download URLs and counts, errors/empty states.

Restored or added: Original reference title restored in page content; local teal grouping and narrow-width row padding/min-width.

Reused components: ContentFilterBar, StoreBreadcrumb, Button and Empty. CareersPage in the same source file is unchanged.

Data sources: content-service listDownloadableForms/listFormCategories; city-service getProvinces.

SEO: Unique Open Graph/canonical; filtered views explicitly noindex. One H1; form names remain H2. No auth/registration changes.

Responsive and accessibility decisions: RTL, Kalameh, design tokens and dark-mode support remain. Changes are page/component scoped. Existing touch targets, keyboard interactions and reduced-motion behavior are retained. Header, Footer, login, registration, global CSS and font loading remain excluded. Browser verification and executed project checks are recorded in [testing and QA](../testing-and-qa.md); this page does not claim unexecuted checks.
