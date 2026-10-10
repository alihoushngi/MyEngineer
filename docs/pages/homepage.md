# Homepage

Purpose: introduce the platform and connect customers with services and experts. Route: `/`. Structural reference: `Design/index.html`.

## Source and data

- `app/(shop)/page.tsx`
- `components/store/home/homePage/homePage.tsx`
- `components/store/home/homePage/homePage.module.css`
- `components/store/home/homeHero/homeHero.tsx`
- `components/store/home/homePromotions/homePromotions.tsx`
- `components/store/home/serviceCategories/serviceCategories.tsx`
- `components/store/service/serviceCategoryGrid/serviceCategoryGrid.tsx`
- `components/store/home/homeSlideImage/homeSlideImage.tsx`
- `services/catalog-service/catalog-service.ts`

The route keeps existing catalog/session reads. Actual API catalog content supplies services, cities, experts, popular/drawing services, testimonials, knowledge and FAQ categories. Existing configured local slide fallbacks are retained. Every existing homepage feature flag remains respected; promotions use the existing hero flag.

## Original and final mobile section order

1. Introduction and page-content search/city actions.
2. Service categories — «بدنبال چه خدمتی هستید؟».
3. Separate promotional banners.
4. «مهندس من چیست؟» with retained current process steps.
5. Popular services.
6. Drawing consultation.
7. «چرا مهندس من؟».
8. Join specialists.
9. Experts marketplace.
10. Testimonials and existing submission affordance.
11. Knowledge tips.
12. Preserved editorial content highlights and FAQ entry.

Baseline had the background slider in the introduction, marketplace before narrative and no separate mobile banner section. The final single content tree moves the intact marketplace after join so original required sections maintain relative order. Process steps, URL filters, city selection, expert cards, pagination, testimonial forms, content highlights and FAQ entry remain.

## Desktop and responsive decisions

From 768px, existing photographic hero and its proportions/interactions remain; the separate mobile promotion section is hidden. Existing desktop category, popular-service, drawing, trust, join and marketplace grids remain. The marketplace relocation follows the explicitly requested original section order on the same semantic tree.

Below 768px, page-scoped styles provide a light introduction, compact three-column category grid, teal/yellow discovery actions, shorter section rhythm, light narrative panel and two-column compact popular/drawing/trust items. Search and city controls remain stacked below 640px for usability. Desktop global tokens and Kalameh typography are unchanged. The page wrapper contains only content, so scoped selectors cannot alter Header, Footer or portal authentication UI.

Promotions use manual previous/next and 44px slide buttons with Persian accessible labels and live slide text; no autoplay dependency. Responsive `sizes` on hero/promotion media reduce unnecessary offscreen image sizing. The existing carousel remains responsible for desktop motion preferences. Homepage service categories opt into responsive `<picture>` artwork using existing client-derived bundled illustrations, with `getImageProps` responsive sources and a direct local source fallback when the existing bare-IP image policy disables optimization. API artwork remains on desktop, and the shared grid’s default image/DOM path is unchanged for Header and other consumers. Shared search, city, JoinLink, primitives and global CSS are unchanged.

## SEO, accessibility and limits

Keep one introduction H1 and existing section headings, real destinations and actual catalog content. The route retains its title/description/canonical and adds matching Open Graph metadata; no ratings or statistics are invented. The sitemap uses explicitly configured public `SITE_URL`; staging noindex gates remain.

API catalogs may be empty or unavailable; page sections honor current feature flags and data rather than cloning demo reference experts. See [QA record](../testing-and-qa.md) for actual visual coverage. Header, Footer, Login and Registration remain excluded.
