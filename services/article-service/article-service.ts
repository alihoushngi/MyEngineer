import {
  type ApiEnvelope,
  type ApiPaginationMeta,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { httpGet } from "@/lib/api/http-client/http-client";
import {
  mapBlogCard,
  mapBlogCategory,
  mapBlogDetail,
} from "@/lib/api/map-backend/map-backend";
import { env } from "@/lib/env/env";
import {
  type BackendBlog,
  type BackendBlogCategory,
} from "@/types/api/backend.types";
import {
  type Article,
  type ArticleCardData,
  type ArticleCategory,
} from "@/types/store/article.types";

const PUBLIC_REVALIDATE_SECONDS = 300;

async function getEnvelope<TData>(
  path: string,
  query?: Record<string, string | number | boolean | undefined>,
): Promise<ApiEnvelope<TData>> {
  return httpGet<ApiEnvelope<TData>>(path, {
    query,
    next: { revalidate: PUBLIC_REVALIDATE_SECONDS },
  });
}

export async function listArticles(): Promise<readonly ArticleCardData[]> {
  if (!env.apiBaseUrl) {
    return [];
  }

  const envelope = await getEnvelope<BackendBlog[]>("/blogs", {
    per_page: 100,
  });
  return unwrapApiData(envelope).map(mapBlogCard);
}

export async function listArticleCategories(): Promise<
  readonly ArticleCategory[]
> {
  if (!env.apiBaseUrl) {
    return [];
  }

  const envelope = await getEnvelope<BackendBlogCategory[]>("/blog-categories");
  return unwrapApiData(envelope).map(mapBlogCategory);
}

export async function getArticleCategory(
  slug: string,
): Promise<ArticleCategory | null> {
  const categories = await listArticleCategories();
  return categories.find((category) => category.slug === slug) ?? null;
}

export async function listArticlesByCategory(
  slug: string,
): Promise<readonly ArticleCardData[]> {
  const [categories, articles] = await Promise.all([
    listArticleCategories(),
    listArticles(),
  ]);
  const category = categories.find((item) => item.slug === slug);
  if (!category) {
    return [];
  }

  return articles.filter((article) => article.categorySlug === slug);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!env.apiBaseUrl) {
    return null;
  }

  try {
    const envelope = await getEnvelope<BackendBlog>(
      `/blogs/${encodeURIComponent(slug)}`,
    );
    return mapBlogDetail(unwrapApiData(envelope));
  } catch {
    return null;
  }
}

export type ArticlesPageResult = {
  articles: readonly ArticleCardData[];
  total: number;
  page: number;
  pageCount: number;
  failed: boolean;
};

/** Server-side search/sort/pagination (GET /blogs?q=&sort=&category=&page=). */
export async function listArticlesPage(options: {
  q?: string;
  sort?: string;
  category?: string;
  page?: number;
  perPage?: number;
}): Promise<ArticlesPageResult> {
  const page = options.page ?? 1;
  const empty: ArticlesPageResult = {
    articles: [],
    total: 0,
    page,
    pageCount: 1,
    failed: false,
  };

  if (!env.apiBaseUrl) {
    return empty;
  }

  try {
    const envelope = await httpGet<
      ApiEnvelope<BackendBlog[], ApiPaginationMeta>
    >("/blogs", {
      query: {
        q: options.q || undefined,
        sort: options.sort,
        category: options.category,
        page,
        per_page: options.perPage ?? 9,
      },
      next: { revalidate: 60 },
    });
    const articles = unwrapApiData(envelope).map(mapBlogCard);

    return {
      articles,
      total: envelope.meta?.total ?? articles.length,
      page: envelope.meta?.current_page ?? page,
      pageCount: Math.max(1, envelope.meta?.last_page ?? 1),
      failed: false,
    };
  } catch {
    return { ...empty, failed: true };
  }
}

export async function listPopularArticles(
  limit = 4,
): Promise<readonly ArticleCardData[]> {
  const result = await listArticlesPage({
    sort: "popular",
    perPage: limit,
  });
  return result.articles;
}
