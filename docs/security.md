# Security architecture and audit record

Reviewed on 2026-10-10. This repository contains a Next.js App Router frontend and server actions that call a separate backend API. It contains no database, backend authorization implementation or custom API route handlers. This review covers the checked-out frontend and reachable local Git history; it does not certify the deployed API or infrastructure.

## Identity and protected resources

Live bearer tokens stay in host-only, HTTP-only cookies with `SameSite=Lax`, a root path and a 30-day client lifetime. Pending role/password-reset tokens have a shorter lifetime. Production cookies always use `Secure`; `AUTH_COOKIE_SECURE=false` cannot disable that protection in production. Production deployment must serve the website through HTTPS. Backend expiry and revocation remain authoritative.

Role/display cookies are presentation hints. Live session readers verify the bearer token and identity using uncached `/auth/me`; request-scoped memoization avoids sharing identities between requests. Customer and engineer access services also consult `/auth/user-access` and `/auth/engineer-access`. Middleware provides early navigation checks only; it does not grant authorization from cookie contents. Server actions and backend endpoints must enforce permission independently of middleware or hidden UI.

Protected resources include `/account`, `/engineer`, registration progress, profile/password changes, auth sessions, requests, saved experts, reviews, notifications, conversations/messages and support tickets. Auth-session revocation verifies that the requested session appears in the caller's own session list. This is an additional check; the backend must enforce ownership atomically. Resource IDs never grant access on their own.

Mock sessions are accepted only outside production, with explicit enabled flags and no live API. Legacy development mock actions can still run when explicitly enabled alongside a live API, but their cookies are ignored by live session readers. Mock cookies and unsigned fixture overlays are development state and provide no security boundary. Production OTP actions suppress backend debug codes even if the backend mistakenly returns them. The backend must disable OTP debug responses itself.

## Request, response and content controls

- Next.js server actions retain the framework's POST and Origin/Host CSRF checks. No permissive `allowedOrigins` or credentialed wildcard CORS is configured. Proxies must preserve the correct public host. SameSite cookies add protection; they do not replace server-side authorization or CSRF validation.
- Internal return URLs reject external/protocol-relative targets, backslashes, control characters, traversal, malformed/double encoding and disallowed route families. API URL construction rejects credentials, non-HTTP schemes, path traversal and injected query/fragment delimiters; query values use `URLSearchParams`.
- Live login, role-selection, OTP, registration and password-reset actions validate runtime input types, allowed audiences/purposes and bounded strings. New-password rules match the existing form rules; backend credential/token validation remains authoritative.
- API fetches have timeouts. Protected reads use `no-store`. TLS certificate verification stays enabled; the optional `API_TLS_SERVERNAME` override is restricted to the configured public API origin. It is not a global certificate-verification bypass.
- Upstream failures are reduced to safe error messages before reaching action results. Server failures and HTML/text error bodies must not expose stack traces, SQL, credentials or raw debug payloads. Valid structured client validation feedback remains available.
- Upload actions check purpose, size and supported filename/MIME combinations on the server. Missing browser MIME metadata is accepted only with an allowed extension; a supplied MIME must match that extension. General uploads allow a maximum of 4 MB, profile avatars and ticket attachments 2 MB. The action-body ceiling is 5 MB to allow multipart overhead. These metadata checks do not prove file content is safe; see backend obligations below.
- Backend article HTML becomes text-only React blocks; dangerous tags/attributes are not injected. JSON-LD escapes `<` before insertion in a script element. The audit found no application SQL, shell execution or dynamic code-evaluation sink.
- The image optimizer keeps private-network access disabled, permits configured hosts/ports only and uses Next.js's SVG restrictions. Direct browser image loading is retained for configured IP/localhost APIs. DNS and media hosts still need operator trust; a public allowlist does not authorize private network access.

## Browser headers and public files

Global responses set `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, and CSP directives for `base-uri`, `object-src` and `frame-ancestors`. Production sets one-year HSTS for the current host, without subdomain/preload enrollment. `X-Powered-By` is disabled. The service worker has a stricter script/connect policy.

The page CSP deliberately does not yet restrict scripts or styles: a nonce/hash rollout requires separate compatibility testing for Next.js hydration and current inline styles. Do not describe the current policy as comprehensive XSS protection. Existing staging `noindex` headers remain independent of access control.

Private workspaces use private/no-store cache headers. The service worker caches allowlisted public pages/assets only, skips auth-header requests and sensitive workspace routes, and respects private/no-store response headers. No environment files, docs or internal configuration were found under `public/`; future private uploads must never be placed there.

## Repository and history findings

Tracked `.env` and `.env.local` were removed from the Git index while preserving their local copies. They contained deployment origin/TLS and mock configuration; no confirmed credentials were found. All 100 tracked `tmp/api-doc/` intermediates were likewise untracked and preserved locally. The useful final API DOCX/PDF exports remain tracked under `output/`; Docker excludes exports, temporary files, reference sources, local env and key material.

A redacted heuristic scan covered 76 reachable local commits, 2,832 unique Git blobs and 1,034 initially tracked files. Provider tokens, private keys, JWTs and credential-bearing URL rules found no confirmed real secrets. Generic assignment matches were reviewed as fixtures, cookie names, routes, UI labels or API examples. DOCX XML was inspected; other binary image/font/PDF contents were not scanned. There was no installed gitleaks/trufflehog scanner, and unreachable objects, remote-only refs, forks and deployed logs were not reviewed. No specific credential rotation is indicated by these findings. Any later confirmed credential exposure requires owner-led rotation and coordinated history remediation; this task does not rewrite history.

## Dependency remediation

The initial live `pnpm audit` reported 16 advisory entries (one critical, eight high, six moderate and one low). Next.js and its ESLint config were patched from 16.3.4 to 16.3.8, with compatible transitive patches for sharp, source-map-js and brace-expansion. A narrow pnpm override replaces minimatch's pinned brace-expansion 5.0.9 with 5.0.12. The image-fetch fixes address the risk described in the [Next.js SSRF advisory](https://github.com/vercel/next.js/security/advisories/GHSA-cjq9-62q9-8jv4); package audit ranges determine the patched versions.

After remediation, `pnpm audit --prod` reports no known vulnerabilities. The full audit still reports one high-severity [braces stack-exhaustion advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) for development-only braces 3.0.3 through ESLint's fast-glob/micromatch chain. The registry currently has no 3.0.4 release despite that being the advisory's patched range. No unreviewed major upgrade or custom dependency patch was introduced. Recheck for a compatible published fix and avoid processing untrusted glob patterns with the development tooling. These audit results are a dated advisory snapshot, not a permanent security guarantee.

## Backend and deployment actions still required

1. Verify distributed rate limiting for login, OTP send/verify, recovery, public contact/newsletter/testimonial/career submissions and uploads. This frontend has no durable shared limiter or deployment configuration proving such protection; a process-local counter would give misleading coverage. Enforce limits at the backend/gateway, including direct API traffic, with account/IP/device signals and OTP retry controls.
2. Verify backend ownership/role checks for every object endpoint (requests, sessions, conversations, notifications, reviews, tickets, portfolio, credentials and upload IDs). Frontend checks cannot establish that the remote API is free of IDOR. Test cross-account and wrong-role access with authorized test accounts.
3. Verify upload content signatures, filename normalization, malware/active-content handling, private document access, safe content disposition, quotas and storage outside executable/public paths. Browser-provided MIME/extension can be forged. Keep degree/license/private documents access-controlled.
4. Serve the website and public API/media over HTTPS with matching certificates. Internal HTTP API overrides are acceptable only inside a trusted isolated deployment network. A configured TLS server name does not fix an operator's public certificate/DNS configuration.
5. Validate real deployment CORS, CSRF/proxy host forwarding, cache behavior and login/registration flows. No authenticated live-account or deployment penetration test was performed.

See [repository guidelines](repository-guidelines.md) for secrets, ignored files and explicit staging; see the [documentation index](README.md) for integration contracts and retained history.
