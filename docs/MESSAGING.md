# Messaging

Existing live adapters are `services/messaging-service/messaging-api.ts` and
`messaging-actions.ts`; configured API reads/mutations use these before local
overlays. The cookie and synthetic login sequence below apply only to explicit
development mock mode.

Shared customer ↔ engineer conversations. Both panels render opposite views
of the **same** `Conversation` and `Message` records. Do not maintain a second
chat catalog per panel.

Visual language follows [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md). Architecture
follows [ARCHITECTURE.md](ARCHITECTURE.md). Account and engineer shells stay
separate except for this shared domain.

---

## Domain model

Types: [`types/store/messaging.types.ts`](../types/store/messaging.types.ts)

### Conversation

| Field                                               | Meaning                                                  |
| --------------------------------------------------- | -------------------------------------------------------- |
| `id`                                                | Stable conversation id                                   |
| `participants`                                      | Explicit `{ role, id, displayName, avatarSrc? }` entries |
| `relatedRequestId?`                                 | Optional linked `ServiceRequest`                         |
| `relatedServiceLabel?`                              | Display label for that request/service                   |
| `relatedEngineerId`                                 | Public expert id                                         |
| `relatedCustomerId`                                 | Customer account id (not a phone number)                 |
| `latestMessage?`                                    | Preview derived from the last stored message             |
| `unreadByRole`                                      | `{ user, engineer }` unread counts for list UI           |
| `createdAtLabel` / `updatedAtLabel` / `updatedAtMs` | Display + sort                                           |

### Message

| Field                            | Meaning                                                    |
| -------------------------------- | ---------------------------------------------------------- |
| `id`                             | Stable message id                                          |
| `conversationId`                 | Parent conversation                                        |
| `senderRole`                     | `"user"` or `"engineer"` — never inferred from bubble side |
| `senderId`                       | Actor id for that role                                     |
| `content`                        | Plain text only                                            |
| `createdAtLabel` / `createdAtMs` | Display + order                                            |
| `status`                         | `"sent"` for stored messages                               |

Failed sends are **not** stored as delivered. The composer keeps the text,
shows an error, and offers retry.

Read receipts are not a product contract. Unread is a per-role list badge
only. Opening a thread marks that viewer’s unread count to zero in mock mode.

---

## Roles

`ParticipantRole`: `user` | `engineer`.

Customer UI treats `senderRole === "user"` as own messages. Engineer UI treats
`senderRole === "engineer"` as own. Own bubbles use `self-start` in RTL. A
visually hidden sender label is included so placement is not the only cue.

---

## Routes

### Customer

| Path                                | Purpose                                          |
| ----------------------------------- | ------------------------------------------------ |
| `/account/messages`                 | Conversation list (paginated when longer than 9) |
| `/account/messages/start?expertId=` | Open-or-create, then redirect to the thread      |
| `/account/messages/[id]`            | Thread + composer                                |

### Engineer

| Path                      | Purpose                                          |
| ------------------------- | ------------------------------------------------ |
| `/engineer/messages`      | Conversation list (paginated when longer than 9) |
| `/engineer/messages/[id]` | Same conversation, opposite viewer               |

Canonical detail URLs always work. On `lg+`, the detail route may also show a
list sidebar. Mobile is list route → detail route, not a cramped split pane.

Guest «پیام به مهندس» on `/experts/[id]` goes to customer
`/login?next=/account/messages/start?expertId=…` — never `/engineer/login`.

---

## Request association

A conversation may point at `relatedRequestId` (for example
`conv-utm-niavaran` ↔ `req-utm-niavaran`). Request detail can open the
thread. Profile start does **not** create a new thread when a pair already
exists.

**Current mock uniqueness:** one conversation per
`(relatedCustomerId, relatedEngineerId)` pair.

**API CONTRACT REQUIRED / BUSINESS DECISION REQUIRED:** whether production
should use one thread per pair, or one thread per request.

---

## Mock behavior

Single seed catalog:

[`lib/mock-data/messaging-mock-data.ts`](../lib/mock-data/messaging-mock-data.ts)

Merge + mutations:

[`lib/messaging/messaging-store/messaging-store.ts`](../lib/messaging/messaging-store/messaging-store.ts)

Development overlay cookie: `mm_mock_conversations` (`MOCK_MESSAGING_COOKIE`).
HttpOnly, same-site, not production chat storage. It is **not** cleared on
customer ↔ engineer role switch so the mandatory E2E can inspect both sides
in one browser. Do not persist real production message bodies in
`localStorage` or other unsafe browser storage.

When mock user auth is on, send / mark-read / start succeed against this
overlay. Without an API and with mock auth off, mutations return unavailable. No Socket.IO,
WebSocket, Supabase realtime, or Firebase.

Reviews and notifications are separate shared domains. See
[USER-ACCOUNT.md](USER-ACCOUNT.md) and [ENGINEER-PANEL.md](ENGINEER-PANEL.md).
They must not be mixed with article comments.

Mandatory mock path:

1. Customer login (`09121112233` / OTP `65432` or password `user1234`)
2. `/experts/amirhossein-rostami` → «پیام به مهندس»
3. Existing thread `conv-utm-niavaran` opens (no duplicate)
4. Send «سلام»
5. Engineer login (`09115447316` / OTP `12345` or password `admin1234`)
6. `/engineer/messages` → same conversation
7. Same body appears as a customer (`senderRole: "user"`) message
8. Engineer replies
9. Customer account shows the reply

---

## API contracts

Live `/conversations` and message adapters are integrated; do **not** invent endpoint paths in the frontend.

Workspace reads today:

- customer list/detail/messages via `getUserWorkspace` /
  `getUserConversation` / `getUserMessages`
- engineer list/detail/messages via `getEngineerWorkspace` /
  `getEngineerConversation` / `getEngineerMessages`

Integration-ready mutations in
[`services/messaging-service/messaging-service.ts`](../services/messaging-service/messaging-service.ts):

- `sendMessage({ conversationId, body })`
- `markConversationRead(conversationId)`
- `startOrOpenConversation(expertId)`

Existing live adapter responsibilities (see [API-CONTRACTS.md](API-CONTRACTS.md)):

- `listConversations` for the authenticated party
- `getConversation(id)` including messages (cursor/older-page, not numbered
  site pagination)
- `sendMessage`
- `markConversationRead`
- start/open uniqueness rules
- 401 vs 403 when the other role hits the wrong panel
- authorization so a user cannot read another customer’s thread (BOLA)

---

## Realtime limitations

The UI works with request/response only. `router.refresh()` after a successful
send. There is no live typing, presence, or push. Do not pretend otherwise.

---

## Privacy

Chat UI must not show:

- customer phone numbers (full or masked) as a chat identity
- engineer private credentials, national ID, raw document URLs, or session
  secrets

Customer display name and engineer public name/avatar are enough.

---

## Pagination

Conversation **lists** longer than 9 use the shared website pagination
control.

Message **history** does not. The thread shows a recent window and «پیام‌های
قدیمی‌تر» to reveal earlier messages in the loaded snapshot.

---

## Mobile composer

On a thread, account and engineer bottom navigation are hidden so the
composer stays reachable above the keyboard, PWA safe area, and home
indicator. Composer padding includes `env(safe-area-inset-bottom)`.

Attachments are out of scope.
