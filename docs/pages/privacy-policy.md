# Privacy policy

Purpose: Present the existing privacy policy and contact information. Route: `/privacy-policy`.

Sources:

- `app/(shop)/privacy-policy/page.tsx`
- `components/store/legal/legalPage/legalPage.tsx`
- `config/legal.config/legal.config.ts`
- `components/common/legalDocument/legalDocument.tsx`

Client references:

- `Design/about-us/privacy-policy.html`

Original section order: Introduction → definitions → collection → purposes → security → sharing → rights → retention → contact.

Final mobile section order: Breadcrumb → H1/introduction → same seven clauses → existing contact information → related terms link.

Desktop decisions: Existing constrained reading width and legal layout remain unchanged.

Preserved sections and functionality: Exact policy text, contact values and related document link.

Restored or added: Route-local Open Graph metadata only.

Reused components: LegalPage, LegalDocument, ContentPageHeader, StoreBreadcrumb.

Data sources: privacyCopy/privacyDocument in legal.config.

SEO: Unique metadata/canonical and existing H2 clause/contact hierarchy. Contact/legal text is preserved verbatim from current project; authentication legal components are unchanged.

Responsive and accessibility decisions: RTL, Kalameh, design tokens and dark-mode support remain. Changes are page/component scoped. Existing touch targets, keyboard interactions and reduced-motion behavior are retained. Header, Footer, login, registration, global CSS and font loading remain excluded. Browser verification and executed project checks are recorded in [testing and QA](../testing-and-qa.md); this page does not claim unexecuted checks.
