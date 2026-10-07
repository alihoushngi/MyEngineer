import Link from "next/link";
import { NewspaperIcon } from "lucide-react";

import { ContentPageHeader } from "@/components/common/contentPageHeader/contentPageHeader";
import { Pagination } from "@/components/common/pagination/pagination";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { ArticleCard } from "@/components/store/article/articleCard/articleCard";
import { ArticleCategoryFilter } from "@/components/store/article/articleCategoryFilter/articleCategoryFilter";
import { ArticleFeatured } from "@/components/store/article/articleFeatured/articleFeatured";
import { ArticleSearchBar } from "@/components/store/article/articleSearchBar/articleSearchBar";
import { RelatedArticles } from "@/components/store/article/relatedArticles/relatedArticles";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";

import { articlesCopy } from "@/config/articles.config/articles.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { siteConfig } from "@/config/site.config/site.config";

import {
  ALL_ARTICLE_CATEGORY,
  type ArticleSort,
} from "@/lib/articles/article-query/article-query";

import {
  type ArticleCardData,
  type ArticleCategory,
} from "@/types/store/article.types";

type ArticlesPageProps = {
  articles: readonly ArticleCardData[];
  categories: readonly ArticleCategory[];
  activeCategory: string;
  popular: readonly ArticleCardData[];
  pagination: { page: number; pageCount: number; total: number };
  q: string;
  sort: ArticleSort;
  loadFailed: boolean;
  pathname: string;
  query?: string;
};

export function ArticlesPage({
  articles,
  categories,
  activeCategory,
  popular,
  pagination,
  q,
  sort,
  loadFailed,
  pathname,
  query,
}: ArticlesPageProps) {
  const featured =
    pagination.page === 1 && q === "" && sort === "newest"
      ? articles[0]
      : undefined;
  const list = featured ? articles.slice(1) : articles;
  const filtered = q !== "" || activeCategory !== ALL_ARTICLE_CATEGORY;

  return (
    <div className="relative isolate overflow-hidden py-page">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-48 top-20 -z-10 size-120 rounded-full bg-primary/5 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-e-48 bottom-20 -z-10 size-128 rounded-full bg-secondary/5 blur-[150px]"
      />

      <div className="container-app flex flex-col gap-10">
        <StoreBreadcrumb
          items={[
            { label: "خانه", href: siteConfig.homeHref },
            { label: articlesCopy.hubBreadcrumb },
          ]}
        />

        <ContentPageHeader
          title={articlesCopy.hubTitle}
          description={articlesCopy.hubDescription}
        />

        <ArticleSearchBar q={q} sort={sort} category={activeCategory} />

        <ArticleCategoryFilter
          categories={categories}
          activeSlug={activeCategory}
          q={q}
          sort={sort}
        />

        {popular.length > 0 ? (
          <RelatedArticles
            items={popular}
            heading={articlesCopy.popularHeading}
            headingId="popular-articles-heading"
            description={articlesCopy.popularDescription}
          />
        ) : null}

        {loadFailed ? (
          <Empty
            icon={<NewspaperIcon aria-hidden="true" />}
            title={articlesCopy.errorTitle}
            description={articlesCopy.errorDescription}
          />
        ) : pagination.total > 0 ? (
          <>
            <h2 className="type-h2 text-foreground">
              {articlesCopy.latestHeading}
            </h2>

            {featured ? <ArticleFeatured article={featured} /> : null}

            {list.length > 0 ? (
              <ul className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((article) => (
                  <li key={article.id} className="h-full">
                    <ArticleCard article={article} />
                  </li>
                ))}
              </ul>
            ) : null}

            <Pagination
              page={pagination.page}
              pageCount={pagination.pageCount}
              ariaLabel={articlesCopy.paginationLabel}
              pathname={pathname}
              query={query}
            />
          </>
        ) : (
          <Empty
            icon={<NewspaperIcon aria-hidden="true" />}
            title={
              q !== ""
                ? articlesCopy.searchEmptyTitle
                : activeCategory === ALL_ARTICLE_CATEGORY
                  ? articlesCopy.emptyTitle
                  : articlesCopy.emptyCategoryTitle
            }
            description={
              q !== ""
                ? articlesCopy.searchEmptyDescription
                : activeCategory === ALL_ARTICLE_CATEGORY
                  ? articlesCopy.emptyDescription
                  : articlesCopy.emptyCategoryDescription
            }
            action={
              <Button asChild variant="outline">
                <Link href={filtered ? storePaths.articles : storePaths.home}>
                  {q !== ""
                    ? articlesCopy.clearSearchCta
                    : filtered
                      ? articlesCopy.browseCta
                      : articlesCopy.homeCta}
                </Link>
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
}
