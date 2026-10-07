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
import { parsePageParam } from "@/lib/pagination/page-param/page-param";
import {
  listArticleCategories,
  listArticlesPage,
  listPopularArticles,
} from "@/services/article-service/article-service";

export const metadata: Metadata = {
  title: articlesCopy.hubTitle,
  description: articlesCopy.metadataDescription,
  alternates: {
    canonical: storePaths.articles,
  },
};

type ArticlesRouteProps = {
  searchParams: Promise<{
    page?: string | string[];
    category?: string | string[];
    q?: string | string[];
    sort?: string | string[];
  }>;
};

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
    page === 1 && q === "" && sort === "newest" && activeCategory === ALL_ARTICLE_CATEGORY;

  const [result, popular] = await Promise.all([
    listArticlesPage({
      q,
      sort,
      category:
        activeCategory === ALL_ARTICLE_CATEGORY ? undefined : activeCategory,
      page,
      perPage: ARTICLES_PAGE_SIZE,
    }),
    isDefaultView ? listPopularArticles(4).catch(() => []) : Promise.resolve([]),
  ]);

  const query = buildArticleHubQuery({ category: activeCategory, q, sort });

  return (
    <ArticlesPage
      articles={result.articles}
      categories={categories}
      activeCategory={activeCategory}
      popular={popular}
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
