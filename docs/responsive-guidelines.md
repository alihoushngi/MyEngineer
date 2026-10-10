# Responsive guidelines

Use the client references for mobile structure and preserve current professional desktop layouts. Page composition must use a single semantic content tree; do not duplicate whole pages for viewport sizes.

## Viewports

Validate widths 320, 360, 375, 390, 430, 640, 768, 1024, 1280, 1440 and 1920px. Small phones test long Persian names, city chips, filter labels, empty/error copy, image ratios and action wrapping. Tablets test transitions around `sm` (640), `md` (768) and `lg` (1024); large screens test bounded containers rather than stretched content.

## Existing layout foundation

- `container-app`: 76rem; `container-wide`: 80rem; reading: 46rem; forms: 36rem.
- Page gutters are 16px below 640px and 24px above.
- Use `min-w-0`, flexible tracks, wrapping and logical `ps`, `pe`, `ms`, `me`, `start`, `end` classes. Avoid hiding layout defects with document overflow clipping.
- Touch controls should be at least 44px; existing form controls use 16px text.
- Preserve image aspect ratios, `next/image` sizing, safe-area padding and fixed-action clearance.
- Overlays reuse the existing responsive dialog: mobile Drawer, desktop Dialog/Sheet. Shared overlays and primitives affecting protected UI are unchanged.

Homepage categories use the client compact mobile grid; promotional media appears after categories. Desktop retains the hero grid and independent existing section layouts. Services retain their desktop filters and page-specific tabs while mobile order follows applicable reference sections. Reading pages remain bounded and use natural Persian paragraph wrapping.

Header, Footer and all authentication UI are excluded. Changes to global font, tokens, shared spacing or shell sizing are prohibited during this alignment. See [page section map](page-section-map.md) and [QA record](testing-and-qa.md) for actual coverage.
