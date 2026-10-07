export const ALL_ARTICLE_CATEGORY = "all";

export function parseArticleCategoryParam(
  value: string | string[] | undefined | null,
  categorySlugs: readonly string[],
): string {
  const raw = Array.isArray(value) ? value[0] : value;
  const slug = raw?.trim() ?? "";

  if (slug === "" || slug === ALL_ARTICLE_CATEGORY) {
    return ALL_ARTICLE_CATEGORY;
  }

  return categorySlugs.includes(slug) ? slug : ALL_ARTICLE_CATEGORY;
}

export function filterArticlesByCategory<T extends { categorySlug?: string }>(
  articles: readonly T[],
  categorySlug: string,
): readonly T[] {
  if (categorySlug === ALL_ARTICLE_CATEGORY) {
    return articles;
  }

  return articles.filter((article) => article.categorySlug === categorySlug);
}

export function buildArticleHubHref(
  pathname: string,
  categorySlug: string,
  page = 1,
): string {
  const params = new URLSearchParams();

  if (categorySlug !== ALL_ARTICLE_CATEGORY) {
    params.set("category", categorySlug);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const serialized = params.toString();
  return serialized === "" ? pathname : `${pathname}?${serialized}`;
}

export const ARTICLE_SORTS = ["newest", "popular"] as const;
export type ArticleSort = (typeof ARTICLE_SORTS)[number];
export const DEFAULT_ARTICLE_SORT: ArticleSort = "newest";
export const ARTICLES_PAGE_SIZE = 9;

export function parseArticleSortParam(
  value: string | string[] | undefined | null,
): ArticleSort {
  const raw = Array.isArray(value) ? value[0] : value;

  return (ARTICLE_SORTS as readonly string[]).includes(raw ?? "")
    ? (raw as ArticleSort)
    : DEFAULT_ARTICLE_SORT;
}

export function parseArticleSearchParam(
  value: string | string[] | undefined | null,
): string {
  const raw = Array.isArray(value) ? value[0] : value;

  return raw?.trim().slice(0, 100) ?? "";
}

/** Query string for the hub, omitting defaults. */
export function buildArticleHubQuery(state: {
  category?: string;
  q?: string;
  sort?: ArticleSort;
  page?: number;
}): string {
  const params = new URLSearchParams();

  if (state.category && state.category !== ALL_ARTICLE_CATEGORY) {
    params.set("category", state.category);
  }

  if (state.q && state.q.trim() !== "") {
    params.set("q", state.q.trim());
  }

  if (state.sort && state.sort !== DEFAULT_ARTICLE_SORT) {
    params.set("sort", state.sort);
  }

  if (state.page && state.page > 1) {
    params.set("page", String(state.page));
  }

  return params.toString();
}
