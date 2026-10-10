# Engineer Panel

Private specialist workspace for Mohandes Man. This is not an admin dashboard
and not a customer account. Visual identity follows
[DESIGN-SYSTEM.md](DESIGN-SYSTEM.md). Architecture follows
[ARCHITECTURE.md](ARCHITECTURE.md).

Current live integration uses `services/engineer-service/engineer-panel-api.ts`,
`engineer-access-service.ts` and existing mutation actions. The mock fixture
notes below describe explicit local-development behavior. Engineer review
reply and support are implemented through their existing adapters.

Public product language remains **متخصص / expert**. The URL family is
`/engineer` because this task defined that canonical route.

---

## Route map

| Path                      | Purpose                          |
| ------------------------- | -------------------------------- |
| `/engineer`               | Workspace dashboard              |
| `/engineer/profile`       | Edit public-profile information  |
| `/engineer/services`      | Services and specialties         |
| `/engineer/service-areas` | Primary city and nearby cities   |
| `/engineer/requests`      | Incoming work requests           |
| `/engineer/requests/[id]` | Request detail                   |
| `/engineer/messages`      | Conversation list                |
| `/engineer/messages/[id]` | Conversation view + composer     |
| `/engineer/portfolio`     | Public work samples              |
| `/engineer/credentials`   | Education, licence, documents    |
| `/engineer/reviews`       | Review list                      |
| `/engineer/reviews/[id]`  | Review detail                    |
| `/engineer/notifications` | Notification center              |
| `/engineer/support`       | Support ticket list              |
| `/engineer/support/new`   | Create support ticket            |
| `/engineer/support/[id]`  | Ticket thread                    |
| `/engineer/settings`      | Account display, logout boundary |

Layouts live under `app/(engineer)/engineer/`. The group does not appear in
the URL. Pages are private: `noindex`, `X-Robots-Tag`, `Cache-Control: private,
no-store`. They are not in the sitemap.

---

## Access model

Configured API access uses `getLiveEngineerAccess()` and returns the current
workspace only for permitted engineer states. Without an API, session/mock
access may return `active`, `pending_review`, `forbidden`, `unauthenticated`,
`visual_review` or `unavailable`. Public display fixtures are disabled by live
API configuration and do not become customer authentication.

All mock auth flags are false by default. Explicit catalog fixtures may support
visual review with a clear banner when no API is configured. Existing session
and role guards remain authoritative. Authentication and registration UI are
protected and unchanged by this alignment.

---

## Public / private boundary

Public (`/experts/[id]`): name, profession, specialties, cities, software,
history, portfolio images, reviews, verification badge when provided.

Private (engineer panel only): masked mobile display, incoming requests,
conversations, notifications, credential document _status_, account actions.

Do not render national ID, raw document URLs, tokens, or full phone numbers.
Credential files are represented as `hasDocument` only.

---

## Dashboard modules

1. Identity and verification badge
2. Honest access/status banner
3. Profile completion (derived)
4. Recent requests
5. Unread conversations
6. Latest review
7. Portfolio and service coverage
8. Quick actions that route to real panel pages

No revenue, conversion, or analytics cards.

### Profile completion derivation (development fixtures)

Nine product areas from registration/public profile:

avatar, personal info, specialties, resume, education, organization, service
areas, portfolio, credentials (at least one document attached).

`percent = round(completedCount / 9 * 100)`. Not a backend field.

---

## Shared requests

`/engineer/requests` is the engineer view of the same `ServiceRequest` entity
used by `/account/requests`. Shared ids such as `req-utm-niavaran` appear on
both sides. The engineer sees `customerDisplayName` only — never a mobile
number or other customer-private fields.

Canonical status values: `sent`, `in_review`, `closed`. The engineer list
maps `sent` to the existing `new` filter. **API CONTRACT REQUIRED /
BUSINESS DECISION REQUIRED** for accept, reject, quote, or a richer
lifecycle. Do not invent bidding.

Created-request mock overlay cookies are visual testing only and are not
cleared on customer→engineer role switch so the same browser can inspect both
views. They are not production persistence.

If a conversation is linked, request detail shows «مشاهده گفتگو». Messaging
is the shared domain in [MESSAGING.md](MESSAGING.md).

---

## Feature notes

### Profile

Section display + focused edit dialogs. Reuses registration field meaning.
Does not reopen the nine-step wizard.

### Services / areas

Services come from the expert’s existing `serviceSlugs`. Nearby cities reuse
registration location concepts. Radius control is omitted
(**BUSINESS DECISION REQUIRED**).

### Requests

Statuses `new` | `in_review` | `closed` are integration-ready scanning labels.
Accept / reject / quote actions are omitted and documented as unavailable.

### Messages

Shared with the customer account. List and thread routes; desktop detail may
split list + thread. Composer sends through the shared messaging service.
No WebSocket, polling, attachments, or fake read-receipts. Bottom navigation
is hidden on the thread so the composer stays reachable. See
[MESSAGING.md](MESSAGING.md).

### Portfolio / credentials

Local file selection is not upload success. Existing live portfolio and credential mutations use their API adapters;
local selection alone does not establish upload success. Sensitive documents are not exposed as public URLs.

### Reviews

Read-only list at `/engineer/reviews`. Each item links to
`/engineer/reviews/[id]`. Unknown ids use the panel `not-found` page.
Customer-authored reviews use the same `ServiceReview` entity as
`/account/reviews` and `/experts/[id]`. Live engineer replies use `submitReviewReplyAction` and
`replyToEngineerReviewApi`; displayed reply text remains supplied by the data source.

Desktop sidebar: the panel shell is a two-column grid with a
`minmax(100dvh, auto)` row. The sidebar surface fills that row (viewport
minimum, then content height). Navigation inside the sidebar may stay sticky
within `max-h-dvh`. Mobile keeps the five-item bottom navigation and must not
inherit the desktop column height.

### Notifications

Shared `AppNotification` records filtered by `recipientRole: "engineer"` and
the public expert id. Unread styling and destination links. Mark-read is
recipient-scoped. No push.

### Settings

Masked mobile, OTP-auth explanation, logout boundary. No password UI, no fake
preference toggles, no account deletion.

---

## Mock-data behavior

Fixtures: `lib/mock-data/engineer-workspace-mock-data.ts`, assembled with the
public expert `amirhossein-rostami` in
`lib/mock-data/build-engineer-workspace/build-engineer-workspace.ts`.

Allowed: visual review, lists, detail, empty/error UI, mock messaging overlay
sends (shared with the customer account), mock review submit from the
customer account, and mock notification mark-read.

Not allowed: fake profile save success, upload completion, logout success,
request acceptance.

Review overlay cookie: `mm_mock_reviews`. Notification overlay cookie:
`mm_mock_notifications`. Both are kept across a customer↔engineer role
switch so the same browser can inspect both views. Visual testing only.

---

## Live API boundaries

Current adapters cover engineer workspace/profile, specialties, areas,
requests, portfolio, credentials, reviews and replies, notifications,
settings and support. Shared messaging uses the same conversation domain as
customer accounts. Real endpoint/response contracts are documented in
[API-CONTRACTS.md](API-CONTRACTS.md); preserve recipient/role permissions and
do not invent paths or expand workflow rules.

---

## Business decisions required

- Can engineers accept, reject, or quote on requests?
- Can engineers disable an individual service?
- Are notifications configurable?
- Can engineers delete or deactivate accounts?
- Are portfolio items sortable?
- What happens after verification rejection?
- Nearby-city radius / max count?
- Post-registration destination (home vs panel vs pending review)?

---

## Mobile and PWA

Bottom navigation: dashboard, requests, messages, profile, more.
Conversation list and thread are separate routes.
Safe-area insets on top bar, bottom nav, and composer.
Service worker never caches `/engineer` HTML or private API responses.
