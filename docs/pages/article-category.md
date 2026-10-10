# Article category

Purpose: Browse one article topic and move to other topics or related reading. Route: `/articles/categories/[slug]`.

Sources:

- `lib/content/decode-route-slug/decode-route-slug.ts`
- `app/(shop)/articles/categories/[slug]/page.tsx`
- `components/store/article/articleCategoryPage/articleCategoryPage.tsx`

Client references:

- `Design/articles/article-sum.html`

Original section order: Blog introduction → category navigation → article list.

Final mobile section order: Breadcrumb → category H1/description → category navigation → article grid → pagination → recommended articles.

Desktop decisions: Existing responsive article grid and recommended block remain. Category navigation is added without replacing the grid.

Preserved sections and functionality: Recommendations, empty state and page query handling.

Restored or added: Crawlable cross-topic category chips.

Reused components: ArticleCategoryFilter, ArticleCard, RelatedArticles, Pagination, ContentPageHeader.

Data sources: article-service category, listArticlesByCategory, listArticles and listArticleCategories.

SEO: Encoded Unicode category paths are decoded once before lookup. Category title/description/Open Graph; paginated self canonical with page-specific title. Missing category retains notFound metadata/404.

Responsive and accessibility decisions: RTL, Kalameh, design tokens and dark-mode support remain. Changes are page/component scoped. Existing touch targets, keyboard interactions and reduced-motion behavior are retained. Header, Footer, login, registration, global CSS and font loading remain excluded. Browser verification and executed project checks are recorded in [testing and QA](../testing-and-qa.md); this page does not claim unexecuted checks.
