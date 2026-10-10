# Install guidance and offline fallback

Purpose: help iPhone users install the existing web app and provide an honest network-failure fallback. Routes: `/install/iphone`, `/offline`. No client reference HTML; preserve existing page designs.

## Sources

- `app/(shop)/install/iphone/page.tsx`
- `components/store/install/iphoneInstallGuide/iphoneInstallGuide.tsx`
- `app/(shop)/offline/page.tsx`
- `public/sw.js`, `app/manifest.ts`

## Preserved order and decisions

Install: centered introduction/H1 → current install-status banner → five existing Safari diagrams/steps → important notes. Existing responsive step layouts, native/manual Safari guidance and icon assets remain. Optional real-device screenshots are specified in [asset guide](../IPHONE-INSTALL-GUIDE-ASSETS.md); they are not required for the current implementation.

Offline: connection icon → H1 → limited-offline explanation → retry/home actions, in a narrow centered card. No API submissions are queued or described as successful. Both routes keep their existing metadata/indexing decisions; offline is not a sitemap destination.

No new sections or presentation changes. PWA cache exclusions for authentication, account, engineer, APIs, query variants and private responses remain unchanged. See [PWA.md](../PWA.md) for production browser and real-iPhone checks; a desktop screenshot cannot certify device installation.
