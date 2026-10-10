# Private workspaces

Purpose: preserve the existing customer and engineer task environments. Routes: `/account/*`, `/engineer/*` excluding protected login. No client HTML references. No workspace presentation or authentication changes are required by reference alignment.

## Source and data

- `app/(account)/account/` and `components/store/userAccount/`
- `app/(engineer)/engineer/` and `components/store/engineer/`
- `services/user-account-service/user-account-service.ts`
- `services/engineer-service/engineer-access-service.ts`
- [Customer domain guide](../USER-ACCOUNT.md), [engineer domain guide](../ENGINEER-PANEL.md), [messaging](../MESSAGING.md)

Live API access is preferred when configured. Customer workspace data renders only for authenticated customer access. Engineer access applies its existing role/session guard and workspace states. Display fixtures are explicit development behavior and do not become authentication.

## Preserved layout and functionality

Desktop retains the existing right sidebar, navy topbar, viewport-height grid and sticky navigation; mobile retains bottom navigation and More drawer. Conversations keep separate list/detail navigation on mobile, responsive split layout at large widths and safe-area composer clearance.

Customer pages retain dashboard, profile, requests/detail, messages/start/thread, support/list/new/thread, saved specialists, reviews/detail, notifications and settings. Engineer pages retain dashboard, profile, services, areas, requests/detail, messages/thread, support/list/new/thread, portfolio, credentials, reviews/detail, notifications and settings.

No original sections are restored and no sections are added/deleted. Existing shared request/review/message/notification entities, server actions, pagination, loading/error/empty states and form validation remain unchanged. Private HTML retains noindex and private/no-store HTTP headers, is excluded from sitemap and PWA caching. Login, registration, OTP, password recovery, session/auth UI and global shared styles remain protected.
