import { type Metadata } from "next";
import { ArticlesPage } from "@/components/store/article/articlesPage/articlesPage";
import { articlesCopy } from "@/config/articles.config/articles.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import {
  ALL_ARTICLE_CATEGORY,
  ARTICLES_PAGE_SIZE,
  buildArticleHubQuery,
  parseArticleCategoryParam,
  parseArticleSearchParam,
  parseArticleSortParam,
} from "@/lib/articles/article-query/article-query";
import { recommendArticles } from "@/lib/articles/recommend-articles/recommend-articles";
import { parsePageParam } from "@/lib/pagination/page-param/page-param";
import {
  listArticleCategories,
  listArticles,
  listArticlesPage,
  listPopularArticles,
} from "@/services/article-service/article-service";

type ArticlesRouteProps = {
  searchParams: Promise<{
    page?: string | string[];
    category?: string | string[];
    q?: string | string[];
    sort?: string | string[];
  }>;
};

export async function generateMetadata({
  searchParams,
}: ArticlesRouteProps): Promise<Metadata> {
  const params = await searchParams;
  const page = parsePageParam(params.page);
  const category =
    (Array.isArray(params.category)
      ? params.category[0]
      : params.category
    )?.trim() ?? "";
  const filtered =
    parseArticleSearchParam(params.q) !== "" ||
    parseArticleSortParam(params.sort) !== "newest" ||
    (category !== "" && category !== ALL_ARTICLE_CATEGORY);
  const title =
    page > 1
      ? `${articlesCopy.hubTitle} — صفحه ${page}`
      : articlesCopy.hubTitle;
  return {
    title,
    description: articlesCopy.metadataDescription,
    alternates: {
      canonical:
        page > 1 && !filtered
          ? `${storePaths.articles}?page=${page}`
          : storePaths.articles,
    },
    ...(filtered ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description: articlesCopy.metadataDescription,
      type: "website",
      locale: "fa_IR",
      siteName: "مهندس من",
    },
  };
}

export default async function ArticlesRoutePage({
  searchParams,
}: ArticlesRouteProps) {
  const params = await searchParams;
  const categories = await listArticleCategories().catch(() => []);
  const activeCategory = parseArticleCategoryParam(
    params.category,
    categories.map((category) => category.slug),
  );
  const q = parseArticleSearchParam(params.q);
  const sort = parseArticleSortParam(params.sort);
  const page = parsePageParam(params.page);
  const isDefaultView =
    page === 1 &&
    q === "" &&
    sort === "newest" &&
    activeCategory === ALL_ARTICLE_CATEGORY;

  const [result, popular, catalog] = await Promise.all([
    listArticlesPage({
      q,
      sort,
      category:
        activeCategory === ALL_ARTICLE_CATEGORY ? undefined : activeCategory,
      page,
      perPage: ARTICLES_PAGE_SIZE,
    }),
    isDefaultView
      ? listPopularArticles(4).catch(() => [])
      : Promise.resolve([]),
    isDefaultView ? listArticles().catch(() => []) : Promise.resolve([]),
  ]);
  const recommended = recommendArticles(catalog, {
    excludeSlugs: popular.map((article) => article.slug),
    limit: 3,
  });

  const query = buildArticleHubQuery({ category: activeCategory, q, sort });

  return (
    <ArticlesPage
      articles={result.articles}
      categories={categories}
      activeCategory={activeCategory}
      popular={popular}
      recommended={recommended}
      pagination={{
        page: result.page,
        pageCount: result.pageCount,
        total: result.total,
      }}
      q={q}
      sort={sort}
      loadFailed={result.failed}
      pathname={storePaths.articles}
      query={query === "" ? undefined : query}
    />
  );
}
