# Testing and QA

Validation completed on 2026-10-10. Available scripts were checked in `package.json` before execution. Node >=22 and pnpm >=11 are required; the configured package manager is pnpm 11.22.0.

This is the client-alignment validation snapshot. Its test counts, protected-file comparisons and browser evidence apply to that work, before the subsequent security hardening. The [security guide](security.md) records current security controls and limitations; later changes require their own validation.

## Executed project checks

| Check                                 | Result         | Notes                                                                                                                                                                                                           |
| ------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm typecheck`                      | Passed, exit 0 | Full TypeScript check after final source changes and production build.                                                                                                                                          |
| `pnpm test`                           | Passed, exit 0 | 146 tests, 4 suites, 0 failures. Includes article HTML/Markdown/excerpt/date regressions and existing query/filter tests.                                                                                       |
| Explicit slug-decoding tests          | Passed, exit 0 | Two tests for once-only Persian decoding and malformed escapes; this new file is outside the existing enumerated test script.                                                                                   |
| `pnpm lint`                           | Passed, exit 0 | Seven existing warnings: two unused support imports, four registration `watch` incompatible-library warnings, one unused mock-article binding. Protected registration code was not changed to silence warnings. |
| `pnpm build`                          | Passed, exit 0 | Production build and standalone asset copy completed; existing middleware deprecation remains.                                                                                                                  |
| Formatting of all changed source/docs | Passed         | Read-only client Design excluded.                                                                                                                                                                               |
| `pnpm format:check`                   | Failed         | 65 existing unchanged files need formatting. Protected and unrelated files were preserved.                                                                                                                      |
| `git diff --check`                    | Passed         | No introduced whitespace errors.                                                                                                                                                                                |

Command logs and detailed browser evidence are under `/tmp/myengineer-qa/`; they are local validation artifacts, not committed product assets.

## Executed browser coverage

The root browser review and supplemental Chromium checks covered 24 distinct public pages at all eleven requested widths: 320, 360, 375, 390, 430, 640, 768, 1024, 1280, 1440 and 1920px. These are 264 distinct page/width combinations. Every checked layout has meaningful content, one visible main H1 and no document overflow. The final representative 143-case sweep was refreshed after all source changes, with no framework-overlay or page/hydration errors.

The final sweep covers home, articles, knowledge, FAQ, about, forms, public expert 22 and all six referenced service pages. Root in-app browser coverage additionally includes article category/detail, knowledge category, FAQ category, terms, privacy, contact, careers, search, iPhone installation and offline pages. Home and article detail were rechecked at all eleven widths after the last artwork/parser changes.

Six dark-mode/reduced-motion/Tab/Enter cases passed on home, surveying and FAQ at 390px and 1440px. The service scope starts collapsed on mobile, toggles with its accessible control and remains visible on desktop after resizing from a closed mobile state.

Targeted interactions also passed:

- Home search submits the actual query to `/search?q=نقشه`; marketplace category selection and clearing update the existing state.
- Manual mobile promotion next/previous controls change the selected slide and `aria-pressed` state.
- Drawing architecture navigation sets `skill=8`, preserves `cities=10` and `experience=0-5`, and removes `page=2`; the existing filter dialog opens.
- FAQ accordion expansion updates `aria-expanded`; FAQ category JSON-LD parses as `FAQPage`.
- Actual Persian article/category/knowledge/FAQ routes resolve. The article renders real paragraphs/H2 headings with matching TOC anchors, readable Persian publication date and `BlogPosting` JSON-LD, without escaped paragraph tags.

The 14-case service image check covered six referenced pages plus an unknown template at 390px/1440px. It confirmed one image element, the original local construction artwork on mobile, existing API artwork on desktop and successful image loading. Desktop screenshots were recaptured after the newly selected image finished loading. Article detail was separately captured at both sizes after its HTML fix.

Representative metadata HTTP checks returned 200 for content, filtered/paginated content and legal routes, with expected metadata and no `data-next-error`. Filtered views, paginated canonicals and inherited staging restrictions were reviewed. Sitemap output is intentionally empty without a valid configured `SITE_URL`; no production origin or fake structured facts were invented.

## Protected areas and documentation

The initial tracked Git state was clean; only `Design/` was untracked. A baseline recorded 990 tracked files and all 113 client Design files before edits. Final SHA256 comparison checked 275 protected files, including Header, Footer, authentication/registration, shared UI/global styles/font configuration, providers/session/API/validation boundaries and feature flags. It found zero protected changes. All 113 Design files are byte-identical, with no additions.

The shared category grid's default rendering branch was independently compared with the baseline and remains identical when homepage artwork is absent. Scoped page styles do not target protected regions. Header layout was visually inspected. Its existing translucent background can blend with changed page content underneath, so screenshot pixel identity is not claimed.

All 57 Markdown documents and documented file/source links were checked with zero missing targets. Seven historical planning documents remain under `docs/history/` with snapshot notices and repaired links. Autogenerated `next-env.d.ts` was restored to its initial content after build. No commit, push, reset or dependency installation was performed.

## Remaining limits

- Localhost backend CORS affects some client service/province requests; server-rendered data loads successfully. Existing API configuration and adapters were preserved.
- The backend homepage slider image can be ORB-blocked; the local fallback renders. Some supplied article images are unrelated to their subjects and remain actual API data.
- Image LCP warnings can appear during responsive resizing. The existing bare-IP configuration disables image optimization. No Lighthouse score, field-performance result or zero-layout-shift guarantee is inferred from these checks.
- Staging robots/root/global-header noindex gates remain enabled. Deployment must supply the real `SITE_URL` and address indexing policy separately.
- The drawing catalog supplies architecture/structure child categories; no electrical/mechanical categories were fabricated. Knowledge categories have no service relation, so related experts were not guessed.
- These presentation checks do not certify every filter/data combination, authenticated mutations, screen-reader conformance or real-device iPhone installation. No real public message, application or review was submitted.

PWA production/real-iPhone checks remain in [PWA.md](PWA.md). Accessibility criteria are in [accessibility.md](accessibility.md).
