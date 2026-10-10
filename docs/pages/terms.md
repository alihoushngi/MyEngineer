# Terms of use

Purpose: Present the existing terms of platform use in a readable ordered document. Route: `/terms`.

Sources:

- `app/(shop)/terms/page.tsx`
- `components/store/legal/legalPage/legalPage.tsx`
- `config/legal.config/legal.config.ts`
- `components/common/legalDocument/legalDocument.tsx`

Client references:

- `Design/about-us/terms.html`

Original section order: Introduction → ten numbered clauses.

Final mobile section order: Breadcrumb → H1/introduction → same ten legal clauses → related privacy-document link.

Desktop decisions: Existing narrow prose layout remains unchanged.

Preserved sections and functionality: Exact current legal content, clause order and related document navigation.

Restored or added: Route-local Open Graph metadata only; no legal wording changes.

Reused components: LegalPage, LegalDocument, ContentPageHeader, StoreBreadcrumb.

Data sources: termsCopy and termsDocument from legal.config.

SEO: Unique metadata and canonical; numbered H2 clauses retain accessible reading hierarchy. Shared LegalDocument and protected auth consumers are unchanged.

Responsive and accessibility decisions: RTL, Kalameh, design tokens and dark-mode support remain. Changes are page/component scoped. Existing touch targets, keyboard interactions and reduced-motion behavior are retained. Header, Footer, login, registration, global CSS and font loading remain excluded. Browser verification and executed project checks are recorded in [testing and QA](../testing-and-qa.md); this page does not claim unexecuted checks.
