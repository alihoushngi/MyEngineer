# Performance guidelines

Preserve Server Components, thin routes and existing native fetch/service boundaries. Add client code only to the interactive leaf that requires it. Do not replace existing API behavior, TanStack Query, providers or protected auth/session infrastructure.

## Images and layout

Use `next/image` for real optimized image slots, meaningful dimensions or stable aspect ratios, and `sizes` matching the responsive container. Prioritize only actual above-the-fold hero media; below-the-fold media stays lazy. Shared carousel media retains its existing dimensions and reduced-motion behavior. Avoid duplicate data/content trees just to produce mobile and desktop layouts.

Missing live images use existing guarded fallbacks; do not generate invented expert portraits or broken image URLs. Existing backend image configuration may use unoptimized media with bare public IPv4 API origins; keep that limitation documented until deployment networking is addressed.

## Runtime

Keep URL-driven filters and pagination; avoid unnecessary local stores, re-renders, dependencies and decorative animation. Preserve error/loading/empty states to avoid layout jumps and hydration mismatch. Do not place page UI in `useEffect` if it can render on the server.

The client reference `Design/` is ignored by Git, ESLint, Prettier and Docker context. It is not served or bundled; reuse only approved assets copied into `public/` by the existing project. Kalameh loading and global CSS remain unchanged.

`pnpm build` creates standalone output and copies `public/` plus `.next/static/` through `scripts/prepare-standalone.mjs`. PWA behavior and conservative private-cache boundaries remain documented in [PWA.md](PWA.md). The [QA record](testing-and-qa.md) identifies actual checks; no Lighthouse or field-performance score is inferred from a passing build.
