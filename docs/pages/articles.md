# Article hub

Purpose: Browse and search building and engineering articles, with selected, popular and latest material. Route: `/articles`.

Sources:

- `app/(shop)/articles/page.tsx`
- `components/store/article/articlesPage/articlesPage.tsx`
- `components/store/article/relatedArticles/relatedArticles.tsx`

Client references:

- `Design/articles/article-landing.html`
- `Design/articles/all-articles.html`

Original section order: Introduction/search → category/sort → popular articles → recommended articles → latest articles/list.

Final mobile section order: Breadcrumb → mobile teal introduction/search-sort group → category chips → popular rail → recommended grid → latest heading → featured article → remaining list → pagination. Popular/recommended are shown only on the unfiltered first/default view.

Desktop decisions: Existing desktop featured presentation, card grids, category chips, search/sort and pagination remain; wrappers use sm:contents to retain desktop layout.

Preserved sections and functionality: Featured article, filter/search/sort query behavior, pagination and loading/error/empty states.

Restored or added: Real catalog recommendation block between popular and latest; compact mobile teal introduction and popular rail. First-row popular images use priority loading; the later featured image keeps lazy loading when preceding sections exist. Card and featured previews abbreviate supplied content to 180 characters without changing full article data. Valid supplied ISO publication dates use readable Persian formatting; localized labels are preserved.

Reused components: ArticleSearchBar, ArticleCategoryFilter, ArticleFeatured, ArticleCard, RelatedArticles, Pagination, StoreBreadcrumb.

Data sources: article-service backend listArticlesPage/listArticleCategories/listPopularArticles/listArticles. Recommendation selection uses recommendArticles and excludes popular slugs. No copied reference dummy articles.

SEO: Route-local Open Graph; filtered/search/sorted views explicitly keep noindex; unfiltered pagination has distinct page title and canonical. Nested listing cards use H3 beneath section H2. The staging root noindex policy is inherited.

Responsive and accessibility decisions: RTL, Kalameh, design tokens and dark-mode support remain. Changes are page/component scoped. Existing touch targets, keyboard interactions and reduced-motion behavior are retained. Header, Footer, login, registration, global CSS and font loading remain excluded. Browser verification and executed project checks are recorded in [testing and QA](../testing-and-qa.md); this page does not claim unexecuted checks.
