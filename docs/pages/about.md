# About MyEngineer

Purpose: Explain the platform’s background, how it works, services and values. Route: `/about`.

Sources:

- `app/(shop)/about/page.tsx`
- `components/store/about/aboutPage/aboutPage.tsx`
- `components/store/about/aboutServicesSection/aboutServicesSection.tsx`
- `components/store/about/aboutPartnersSections/aboutPartnersSections.tsx`

Client references:

- `Design/about-us/about-us.html`

Original section order: Introduction → why → story → how it works → services/illustrations → values.

Final mobile section order: Breadcrumb → hero → why → story → how heading/intro and step cards → service domains/category grid → values → team → brands.

Desktop decisions: Existing navy image hero, two-column story/steps composition and service/value grids remain. The how heading is restored in the existing step column.

Preserved sections and functionality: Team and brand sections remain conditional on backend data; all story, service and value content remains.

Restored or added: Broken introductory image replaced with the existing bundled `public/images/home/slide 2.png`, with an accurate alt description. Previously omitted how-title and how-intro from aboutCopy are displayed; mobile hero image and step minimum heights are smaller.

Reused components: AboutServicesSection, AboutTeamSection, AboutBrandsSection, StoreBreadcrumb and existing cards.

Data sources: about.config authored content; content-service listTeamMembers/listBrands.

SEO: One H1 and explicit H2 for how it works, H3 step titles; route-specific Open Graph/canonical. Existing sourced legal/business statements are not rewritten.

Responsive and accessibility decisions: RTL, Kalameh, design tokens and dark-mode support remain. Changes are page/component scoped. Existing touch targets, keyboard interactions and reduced-motion behavior are retained. Header, Footer, login, registration, global CSS and font loading remain excluded. Browser verification and executed project checks are recorded in [testing and QA](../testing-and-qa.md); this page does not claim unexecuted checks.
