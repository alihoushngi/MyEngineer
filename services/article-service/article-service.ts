import {
  type ApiEnvelope,
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
