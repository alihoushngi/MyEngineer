import Link from "next/link";
import { NewspaperIcon } from "lucide-react";

import { ContentPageHeader } from "@/components/common/contentPageHeader/contentPageHeader";
import { Pagination } from "@/components/common/pagination/pagination";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { ArticleCard } from "@/components/store/article/articleCard/articleCard";
import { ArticleCategoryFilter } from "@/components/store/article/articleCategoryFilter/articleCategoryFilter";
import { ArticleFeatured } from "@/components/store/article/articleFeatured/articleFeatured";
import { RelatedArticles } from "@/components/store/article/relatedArticles/relatedArticles";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";

import { articlesCopy } from "@/config/articles.config/articles.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { siteConfig } from "@/config/site.config/site.config";

import { ALL_ARTICLE_CATEGORY } from "@/lib/articles/article-query/article-query";
import { type PaginatedItems } from "@/lib/pagination/paginate-items/paginate-items";

import {
  type ArticleCardData,
  type ArticleCategory,
} from "@/types/store/article.types";

type ArticlesPageProps = {
  articles: readonly ArticleCardData[];
  categories: readonly ArticleCategory[];
  activeCategory: string;
  recommended: readonly ArticleCardData[];
  pagination: PaginatedItems<ArticleCardData>;
  pathname: string;
  query?: string;
};

export function ArticlesPage({
  articles,
  categories,
  activeCategory,
  recommended,
  pagination,
  pathname,
  query,
}: ArticlesPageProps) {
  const featured = pagination.page === 1 ? articles[0] : undefined;
  const list = featured ? articles.slice(1) : articles;

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

        <ArticleCategoryFilter
          categories={categories}
          activeSlug={activeCategory}
        />

        {pagination.total > 0 ? (
          <>
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
              activeCategory === ALL_ARTICLE_CATEGORY
                ? articlesCopy.emptyTitle
                : articlesCopy.emptyCategoryTitle
            }
            description={
              activeCategory === ALL_ARTICLE_CATEGORY
                ? articlesCopy.emptyDescription
                : articlesCopy.emptyCategoryDescription
            }
            action={
              <Button asChild variant="outline">
                <Link
                  href={
                    activeCategory === ALL_ARTICLE_CATEGORY
                      ? storePaths.home
                      : storePaths.articles
                  }
                >
                  {activeCategory === ALL_ARTICLE_CATEGORY
                    ? articlesCopy.homeCta
                    : articlesCopy.browseCta}
                </Link>
              </Button>
            }
          />
        )}

        <RelatedArticles
          items={recommended}
          heading={articlesCopy.recommendedHeading}
          headingId="recommended-articles-heading"
          description={articlesCopy.recommendedDescription}
        />
      </div>
    </div>
  );
}
