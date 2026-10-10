# Public expert profile

Purpose: Review a specialist’s real qualifications, service areas, portfolio and reviews and use existing contact actions. Route: `/experts/[id]`.

Sources:

- `app/(shop)/experts/[id]/page.tsx`
- `components/store/expert/expertProfilePage/expertProfilePage.tsx`
- `components/store/expert/expertProfilePage/expertProfilePage.module.css`
- `components/store/expert/expertProfileHero/expertProfileHero.tsx`

Client references:

- `Design/resume.html`

Original section order: Profile/information/contact → specialties → service cities → software → professional history/skills → portfolio → reviews.

Final mobile section order: Breadcrumb/preview notice when applicable → existing profile hero/contact toolbar → about → specialties → service cities → software → professional credentials → history → certificates → portfolio → reviews → quick facts/contact → related experts → sticky mobile contact. Only supplied sections render.

Desktop decisions: Scoped CSS preserves original desktop order: about → specialties → credentials → history → certificates → cities → software → portfolio → reviews, alongside the existing 20rem contact sidebar.

Preserved sections and functionality: About, credentials, certificates, related experts, contact actions, review eligibility, save/share/request actions, portfolio gallery and ratings from actual data.

Restored or added: Single-copy DOM order follows client mobile hierarchy; a component CSS module adjusts desktop order without touching shared styles.

Reused components: All existing expert components, StoreBreadcrumb and existing contact/review dialogs.

Data sources: expert-service; catalog-service cities; user-auth-service and user-account-service for authentication state, saved experts and request eligibility. Data/API flows remain unchanged.

SEO: Profile Open Graph uses real name, profession, summary/avatar; canonical remains toExpertSharePath. No invented aggregate rating/schema. Protected authentication dialogs/dependencies were not edited.

Responsive and accessibility decisions: RTL, Kalameh, design tokens and dark-mode support remain. Changes are page/component scoped. Existing touch targets, keyboard interactions and reduced-motion behavior are retained. Header, Footer, login, registration, global CSS and font loading remain excluded. Browser verification and executed project checks are recorded in [testing and QA](../testing-and-qa.md); this page does not claim unexecuted checks.
