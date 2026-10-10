# Article reading page

Purpose: Read a complete article, navigate its headings, and use relevant services or comments. Route: `/articles/[slug]`.

Sources:

- `app/(shop)/articles/[slug]/page.tsx`
- `components/store/article/articleDetailPage/articleDetailPage.tsx`
- `components/store/article/articleBody/articleBody.tsx`
- `lib/articles/parse-article-body/parse-article-body.ts`
- `lib/articles/article-meta/article-meta.ts`
- `components/store/content/contentStructuredData/contentStructuredData.tsx`
- `lib/content/decode-route-slug/decode-route-slug.ts`

Client references:

- `Design/articles/sample-article.html`

Original section order: Breadcrumb → title/meta → cover → contents → body → FAQ → related articles.

Final mobile section order: Breadcrumb → title/category/meta → cover → mobile contents → body → supplied FAQs → related-service CTA → mobile category chips → related articles → comments.

Desktop decisions: Existing sticky desktop sidebar/category/contents navigation and max-w-3xl reading column remain.

Preserved sections and functionality: Author/date/view metadata where supplied, body heading IDs, FAQ accordion, service CTA, related articles and comment forms.

Restored or added: Mobile category access below the article; Next Image cover with reserved aspect ratio, responsive sizes, priority and meaningful alt. Backend HTML paragraphs/headings/lists/quotes become text-only React blocks; their heading IDs feed the existing TOC. Attributes and active/embed content are omitted, and escaped markup stays inert text. Detection requires a supported leading HTML block (after whitespace/comments), preserving Markdown examples containing HTML. Supplied valid ISO publication dates render as readable Persian dates; existing localized labels and malformed values remain unchanged.

Reused components: ArticleSidebar, ArticleTocMobile, ArticleBody, ArticleCategoryFilter, RelatedArticles, ArticleComments and accordion.

Data sources: Article and category catalog from article-service; comments from article-comment-service.

SEO: Exactly one page H1; body headings and TOC preserve parsed semantics. Article Open Graph uses actual author/cover where supplied. Canonical remains article.href. BlogPosting JSON-LD uses only the actual headline, supplied excerpt/cover and valid supplied publication date, with escaped script content. Encoded Unicode path segments are decoded once before backend lookup; no fabricated ratings, publisher or origin.

Responsive and accessibility decisions: RTL, Kalameh, design tokens and dark-mode support remain. Changes are page/component scoped. Existing touch targets, keyboard interactions and reduced-motion behavior are retained. Header, Footer, login, registration, global CSS and font loading remain excluded. Browser verification and executed project checks are recorded in [testing and QA](../testing-and-qa.md); this page does not claim unexecuted checks.
