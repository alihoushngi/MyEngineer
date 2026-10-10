# SEO guidelines

Public pages use their existing Persian titles, descriptions, canonicals and semantic content. Keep metadata tied to actual service/article/profile/category data. Do not invent ratings, reviews, statistics, authors, legal text or a production domain.

## Deployment state

This repository deliberately blocks staging indexing at three layers: root metadata `index:false, follow:false`, `app/robots.ts` disallow `/`, and global `X-Robots-Tag: noindex,nofollow,noarchive` in `next.config.ts`. Those gates remain unchanged. The alignment improves page-level metadata/semantics but does not constitute a production indexing launch.

`SITE_URL` is a server-only optional **public website origin**, separate from API configuration. The sitemap must produce absolute public URLs only when that origin is valid. Missing origin must not create API-host URLs or a guessed domain. Sitemap content follows enabled public paths and actual catalog data; exclude authentication, private workspaces, internal search, filtered variants, offline and developer routes. The implemented sitemap traverses article/expert pagination using existing API adapters and stops at reported last page or failure/non-advancing response; other catalogs use their existing list services. Expert inclusion is independent of the homepage flag, and article/category failures are isolated. Failed backend catalogs can therefore produce partial dynamic coverage.

Before a later production release, deliberately configure the public origin, review root metadata/metadataBase, robots and global staging headers together, and verify canonical/OG URLs. Removing staging restrictions is outside this alignment.

## Page rules

- Use one H1 and natural H2/H3 hierarchy in crawlable server-rendered content.
- Metadata should be unique per route. Unknown dynamic entities use `notFound()` and noindex metadata.
- Preserve clean canonical destinations for filtered service/article lists; indexing decisions must consider duplicate query variants and pagination.
- Structured data must describe visible content. Article data uses supplied title, summary, dates, image/author where present; FAQ uses displayed questions/answers; BreadcrumbList uses actual navigation.
- Escape JSON-LD safely. Avoid fake aggregate ratings, business addresses or unavailable facts.
- Internal links use real service/category/expert/article destinations. Client-reference `#` placeholders are not product routes.
- Keep meaningful alt text and responsive images. Decorative duplicates need no repeated descriptions.

Private account and engineer routes retain noindex and private/no-store headers, and are excluded from sitemap/cache. Authentication, Header and Footer implementation stays unchanged. See [design audit](design-reference-audit.md), [page documents](README.md#page-documentation) and [validation record](testing-and-qa.md).
