# User Account

Private customer workspace for Mohandes Man. This is **not** the engineer
panel and not a generic SaaS dashboard. Visual identity follows
[DESIGN-SYSTEM.md](DESIGN-SYSTEM.md). Folder rules follow
[ARCHITECTURE.md](ARCHITECTURE.md). Authentication remains in
[USER-AUTH.md](USER-AUTH.md).

Current live integration uses `services/user-account-service/user-panel-api.ts`
and `services/profile-service/profile-service.ts` when an API base is configured.
The detailed overlay-cookie notes below apply only to explicit development mode.
No account or auth implementation is changed by the design alignment.

Normal-user account data is private. There is no public `/users/[id]` profile.

---

## Route map

Canonical family: `/account`. Layouts live under `app/(account)/account/`.
The `(account)` group does not appear in the URL. Shop header and footer are
not used.

| Path                      | Purpose                                      |
| ------------------------- | -------------------------------------------- |
| `/account`                | Customer dashboard                           |
| `/account/profile`        | Private identity (name, masked mobile, city) |
| `/account/requests`       | Requests the user sent to specialists        |
| `/account/requests/[id]`  | Request detail                               |
| `/account/messages`       | Conversation list                            |
| `/account/messages/start` | Open or create a thread (`?expertId=`)       |
| `/account/messages/[id]`  | Conversation thread + composer               |
| `/account/saved`          | Saved specialists (`ExpertCard` / same ids)  |
| `/account/reviews`        | Reviews the user wrote                       |
| `/account/reviews/[id]`   | Review detail (full text, related request)   |
| `/account/notifications`  | Notification list                            |
| `/account/support`        | Support ticket list                          |
| `/account/support/new`    | Create support ticket                        |
| `/account/support/[id]`   | Ticket thread                                |
| `/account/settings`       | Session display and logout                   |

Pages are private: `noindex`, `X-Robots-Tag`, `Cache-Control: private,
no-store`. They are not in the sitemap. Messaging compose, uniqueness, and
the shared conversation model are documented in
[MESSAGING.md](MESSAGING.md).

---

## Shell

Desktop (lg+): RTL right-side sidebar, full-height grid
(`min-h-dvh`, `lg:grid-rows-[minmax(100dvh,auto)]`), sticky navy topbar.

Mobile: bottom navigation for پیشخوان، درخواست‌ها، پیام‌ها، ذخیره‌ها, plus a
More drawer for نظرات، اعلان‌ها، اطلاعات حساب، تنظیمات. The desktop sidebar
is not forced onto small screens.

---

## Access

Workspace data is returned only when `getUserAccess().kind === "authenticated"`.
This is **session-gated**. Visual-review mock catalog flags do not open the
customer workspace.

| Kind               | UI                                                   |
| ------------------ | ---------------------------------------------------- |
| `unauthenticated`  | Redirect to `/login?next=` when mock user auth is on |
| `engineer_session` | Honest “not a customer account”                      |
| `expired`          | Re-login                                             |
| `unavailable`      | Service unavailable                                  |
| `error`            | Error copy                                           |
| `authenticated`    | Account shell + private lists                        |

Loading, empty, and `error.tsx` / `not-found.tsx` cover in-workspace states.

---

## Public / private boundary

Public storefront may show:

- specialist cards and `/experts/[id]`
- reviews the specialist chose to display on that public profile

Private to `/account/*` only:

- full customer identity beyond what the user typed into a public review
- masked or full mobile numbers
- request titles, bodies, and statuses
- conversation participants and message bodies
- notification payloads
- saved-list membership as an account fact (the specialist card itself is public)

Do not render a full mobile number. Display values are already masked.
Do not create `/users/[id]`.

---

## Dashboard

The dashboard prioritizes work, not vanity statistics:

- active requests
- recent messages
- saved specialists
- notification summary

Quick actions: ثبت درخواست (requires a selected specialist, typically from
saved experts), find a specialist (`/`), open messages, open saved specialists.
There is no bidding, budget, escrow, or quotation form.

---

## Shared request entity

Customer `/account/requests` and engineer `/engineer/requests` are opposite
views of the same `ServiceRequest` (`types/store/service-request.types.ts`).

Supported create fields: service, city, description, selected engineer.
Attachments, budget, bidding deadline, escrow, payment, and price quotation
are **not** in this product.

Statuses are scanning labels only: `sent`, `in_review`, `closed`. Engineer
list UI maps `sent` → `new`. **API CONTRACT REQUIRED / BUSINESS DECISION
REQUIRED** for accept, reject, quote, or any richer lifecycle.

Create entry points: expert profile, service page, customer dashboard. A
request always has a selected engineer (no broadcast-to-all).

If a conversation is linked, request detail shows «مشاهده گفتگو». Otherwise
it offers «پیام به مهندس», which reuses an existing pair thread when one
exists. See [MESSAGING.md](MESSAGING.md).

Closed requests without a review show «ثبت نظر». After submit, the same
review id appears on `/account/reviews/[id]`, `/engineer/reviews/[id]`, and
`/experts/[id]`.

---

## Shared review entity

Canonical record: `ServiceReview` in `types/store/review.types.ts`.

Customer `/account/reviews`, engineer `/engineer/reviews`, and public
`/experts/[id]` project that same entity. Do not keep three catalogs.

Article comments are a different domain. Engineer reviews do **not** ask for
a phone number. The article-comment phone rule stays on the article task.

### Eligibility (mock frontend rule)

A customer may submit a review when:

- they are authenticated as a normal user (never via `/engineer/login`)
- they own a **closed** request with that engineer
- they have not already reviewed that `relatedRequestId`

Guests do not see a review CTA. Arbitrary users cannot review a random
engineer. «ثبت نظر» is not in the profile toolbar; it appears on the closed
request detail and, when eligible, in the public profile reviews section.

**API CONTRACT REQUIRED / BUSINESS DECISION REQUIRED** if production uses a
different rule (completed job, time window, paid invoice, and so on).

Form fields: rating 1–5 and comment. Min comment length is 10. Failed submit
keeps the form visible for retry.

---

## Shared notifications

Canonical record: `AppNotification` in `types/store/notification.types.ts`.

Each notification has `recipientRole: "user" | "engineer"` and a
`recipientId`. Private recipients are never mixed.

Customer kinds shown today: `message`, `request`, `review`, `account`.
Engineer kinds: `message`, `request`, `review`, `verification`, `credential`.

Route: `/account/notifications`. Desktop storefront header (`lg+`) shows a
subtle bell for an authenticated customer. Mobile uses account navigation
(More drawer), not an extra header icon.

---

## Saved specialists

Route: `/account/saved`. Cards reuse public `ExpertCard`. Each card also has:

- remove from saved
- open public profile (the card itself)
- پیام به مهندس (open existing thread, or `/account/messages/start?expertId=`)

Saving from `/experts/[id]` uses «ذخیره مهندس» with a selected state. Guests
are sent to `/login?next=` (customer login, never `/engineer/login`). In development mock mode, save
state uses one overlay cookie (`mm_mock_user_saved`) across expert profile,
search, service results, home discovery, and `/account/saved`. `ExpertCard`
does not expose Save; the profile is the interaction surface.

When the list is longer than 9, shared pagination is used. The same control
applies to requests, reviews, notifications, and conversation lists.

---

## Mock data

Central files:

- [`lib/mock-data/service-request-mock-data.ts`](../lib/mock-data/service-request-mock-data.ts)
  — canonical request catalog
- [`lib/mock-data/messaging-mock-data.ts`](../lib/mock-data/messaging-mock-data.ts)
  — canonical shared conversations and messages
- [`lib/mock-data/review-mock-data.ts`](../lib/mock-data/review-mock-data.ts)
  — canonical customer-authored `ServiceReview` rows
- [`lib/mock-data/notification-mock-data.ts`](../lib/mock-data/notification-mock-data.ts)
  — canonical `AppNotification` rows for both recipient roles
- [`lib/mock-data/user-workspace-mock-data.ts`](../lib/mock-data/user-workspace-mock-data.ts)
  — customer identity; reviews and notifications are projected from the
  shared catalogs

| Export               | Use                                      |
| -------------------- | ---------------------------------------- |
| `currentUser`        | Private identity                         |
| `userRequests`       | Derived customer view of shared requests |
| `userSavedExperts()` | Same `ExpertCardData` as `/experts/[id]` |
| `userReviews`        | Projected from `ServiceReview`           |
| `userNotifications`  | Projected from `AppNotification`         |

Saved specialists are looked up from `mockExpertCards` by public expert id.
Do not invent a second expert model.

Session `displayName` / `phoneMasked` overlay `currentUser` in
`buildUserWorkspace(session, overlay)`.

Visual-testing overlays (not production persistence). They are kept across a
customer↔engineer role switch in the same browser:

- `mm_mock_user_saved` — saved expert ids (defaults when the cookie is absent)
- `mm_mock_service_requests` — customer-created requests
- `mm_mock_conversations` — shared messaging overlay
- `mm_mock_reviews` — customer-authored reviews overlay
- `mm_mock_notifications` — notification overlay including mark-read

Saved cookie is cleared on user logout / engineer session write. Review and
notification cookies are not.

---

## Public actions and login

Logged-out customers who start پیام، ذخیره، or درخواست are sent to
`/login?next=` (normal user login). They are never sent to `/engineer/login`.

---

## PWA

`/account` and descendants are sensitive paths in `public/sw.js`. The worker
must not cache private account HTML or future user API responses. HTTP headers
send `Cache-Control: private, no-store` and `X-Robots-Tag: noindex, nofollow`.
Installed (standalone) sessions still use the network for these routes.

---

## Live API boundaries

The existing user-panel adapter covers workspace/profile, requests, saved
specialists, reviews and notifications. Messaging uses the shared live
conversation adapter, and support uses ticket-room services. Mutations are
recipient/role scoped and retain pending/error/retry handling. Actual endpoint
contracts are in [API-CONTRACTS.md](API-CONTRACTS.md); do not invent paths.

Cookie persistence and closed-request review eligibility described above are
explicit mock rules. Production eligibility/status semantics follow the
backend response and existing service adapters; catalog fixtures do not
replace private live data. This alignment preserves all workspace behavior.
