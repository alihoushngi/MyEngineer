# Design migration decisions

This alignment merges the client mobile structure into the existing Next.js application. The client source is the local read-only `Design/` tree; production services and modern desktop layouts remain authoritative for behavior.

## Sequence and boundaries

1. Audit all reference pages, current routes, existing documentation and protected dependencies; record the comparison before implementation.
2. Align homepage mobile section order, category layout, separate banners and narrative surface; preserve process steps, expert discovery and editorial extras.
3. Align six service pages using page-specific content and tabs, preserving filters, city selection, pagination, profiles and desktop layouts.
4. Align articles, knowledge, FAQ, about/legal and expert resume while preserving existing forms, reviews and reading functionality.
5. Audit pages without references; preserve their current design and make changes only for demonstrated defects.
6. Improve page metadata, supported structured data, headings and images; preserve staging indexing restrictions and privacy boundaries.
7. Consolidate documentation and verify available scripts/browser behavior/protected hashes.

Header, Footer, Login, Registration, OTP, recovery UI, global CSS and Kalameh configuration are excluded. Shared primitives, navigation/auth config, providers and search/city overlays are unchanged when they affect those areas. Page-scoped presentation is the preferred implementation.

## Preservation decisions

Original mobile section order is the structural baseline, with all valuable extra current sections retained. Desktop keeps existing grids, component proportions, bounded containers and interaction strategy. Missing client-required content is supported by actual page data; duplicated demo cards and copied irrelevant surveying text do not justify fabricated production content.

Page-specific final decisions are in [page documents](README.md#page-documentation). [Implementation report](implementation-report.md) distinguishes completed changes from limitations. Historical plans in [history](README.md#historical-records) are retained for reasoning context and are not current task instructions.
