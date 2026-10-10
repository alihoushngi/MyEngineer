# MyEngineer documentation

Current implementation guidance for the Persian RTL Next.js marketplace. The local read-only `Design/` tree is the client reference; source code and actual service responses define current behavior. Header, Footer, Login, Registration, OTP/recovery UI, global CSS and Kalameh configuration are protected during the alignment.

`Design/` is a local-only reference and may be absent from a fresh checkout. Its page mappings and verification records describe the original client-alignment audit; do not treat missing local reference files as missing application source.

## Security and repository maintenance

- [Security architecture, controls and verified limitations](security.md)
- [Environment variables, secrets and safe Git practices](repository-guidelines.md)
- [Development setup and configured validation commands](DEVELOPMENT.md)
- [Docker deployment and runtime configuration](DOCKER.md)

The design QA and implementation reports below record the separate client-alignment work. Their test counts and browser results describe that snapshot; rerun the configured checks after later security or application changes.

## Current design and implementation

- [Architecture and module boundaries](ARCHITECTURE.md)
- [Design system and scoped alignment policy](DESIGN-SYSTEM.md)
- [Full client comparison audit](design-reference-audit.md)
- [Design migration decisions](design-migration-plan.md)
- [Page section map](page-section-map.md)
- [Responsive guidelines](responsive-guidelines.md)
- [SEO and staging indexing policy](seo-guidelines.md)
- [Accessibility](accessibility.md)
- [Performance](performance-guidelines.md)
- [Testing and QA record](testing-and-qa.md)
- [Implementation report](implementation-report.md)

## Page documentation

- [Homepage](pages/homepage.md)
- [Service discovery shared behavior and six reference mappings](pages/services.md)
- [Land surveying](pages/service-land-surveying.md), [construction workers](pages/service-construction-workers.md), [drawing](pages/service-drawing.md), [interior/facade](pages/service-interior-design.md), [building permit](pages/service-building-permit.md) and [administration](pages/service-construction-admin-services.md)
- [Article hub](pages/articles.md), [category](pages/article-category.md) and [reading page](pages/article-detail.md)
- [Knowledge hub](pages/knowledge.md) and [category](pages/knowledge-category.md)
- [FAQ hub](pages/faq.md) and [category](pages/faq-category.md)
- [About](pages/about.md), [terms](pages/terms.md) and [privacy policy](pages/privacy-policy.md)
- [Public expert profile](pages/expert-profile.md)
- [Engineering forms](pages/forms.md)
- [Search](pages/search.md)
- [Contact](pages/contact.md)
- [Careers and job applications](pages/careers.md)
- [Install guidance and offline fallback](pages/install-and-offline.md)
- [Private customer and engineer workspaces](pages/private-workspaces.md)

## Integration and operations

- [API contracts and schema snapshot](API-CONTRACTS.md)
- [Customer authentication boundaries](USER-AUTH.md)
- [Development mock authentication](MOCK-AUTH.md)
- [Customer account domain](USER-ACCOUNT.md)
- [Engineer workspace domain](ENGINEER-PANEL.md)
- [Shared messaging domain](MESSAGING.md)
- [Progressive Web App and device QA](PWA.md)
- [Image provenance and optional production assets](IMAGE-ASSET-PLAN.md)
- [PWA icon replacement contract](PWA-ASSET-PLAN.md)
- [Optional iPhone screenshots](IPHONE-INSTALL-GUIDE-ASSETS.md)

## Historical records

These preserve earlier product and architecture decisions, including scope assumptions that no longer match shipped functionality. They are labelled snapshots and do not override current instructions, actual APIs or page docs.

The distinct historical records and active design audit/migration notes remain useful context. New maintenance guides use lowercase kebab-case filenames; established guide names are retained so existing links and macOS checkouts stay stable.

- [Original legacy audit](history/LEGACY-AUDIT.md)
- [Pre-implementation information architecture](history/INFORMATION-ARCHITECTURE.md)
- [Component blueprint](history/COMPONENT-ARCHITECTURE.md)
- [Legacy product flows](history/PRODUCT-FLOWS.md)
- [Old Phase-1 scope matrix](history/PHASE-1-SCOPE.md)
- [Old state matrix](history/STATE-MATRIX.md)
- [Separate future admin-project plan](history/ADMIN-PANEL-TASKS.md)

Historical concept images are retained under `docs/design-concepts/`: [home sections](design-concepts/home-sections.png), [home marketplace](design-concepts/home-marketplace.png), [service/profile](design-concepts/service-profile.png) and [registration concept](design-concepts/registration-editorial.png). They are reference artifacts, not shipped UI or authorization to change protected registration.
