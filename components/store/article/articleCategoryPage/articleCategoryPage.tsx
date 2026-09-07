import Link from "next/link";
import { NewspaperIcon } from "lucide-react";

import { ContentPageHeader } from "@/components/common/contentPageHeader/contentPageHeader";
import { Pagination } from "@/components/common/pagination/pagination";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { ArticleCard } from "@/components/store/article/articleCard/articleCard";
import { RelatedArticles } from "@/components/store/article/relatedArticles/relatedArticles";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";

import { articlesCopy } from "@/config/articles.config/articles.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { siteConfig } from "@/config/site.config/site.config";

import { type PaginatedItems } from "@/lib/pagination/paginate-items/paginate-items";

import {
  type ArticleCardData,
  type ArticleCategory,
} from "@/types/store/article.types";

type ArticleCategoryPageProps = {
  category: ArticleCategory;
  articles: readonly ArticleCardData[];
  recommended: readonly ArticleCardData[];
  pagination: PaginatedItems<ArticleCardData>;
  pathname: string;
};

export function ArticleCategoryPage({
  category,
  articles,
  recommended,
  pagination,
  pathname,
}: ArticleCategoryPageProps) {
  return (
    <div className="relative isolate overflow-hidden py-page">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-48 top-20 -z-10 size-120 rounded-full bg-primary/5 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-e-48 bottom-0 -z-10 size-120 rounded-full bg-secondary/5 blur-[150px]"
      />

      <div className="container-app flex flex-col gap-10">
        <StoreBreadcrumb
          items={[
            { label: "خانه", href: siteConfig.homeHref },
            { label: articlesCopy.hubBreadcrumb, href: storePaths.articles },
            { label: category.title },
          ]}
        />

        <ContentPageHeader
          title={category.title}
          description={category.description}
        />

        {pagination.total > 0 ? (
          <>
            <ul className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <li key={article.id} className="h-full">
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>

            <Pagination
              page={pagination.page}
              pageCount={pagination.pageCount}
              ariaLabel={articlesCopy.paginationLabel}
              pathname={pathname}
            />

            <RelatedArticles
              items={recommended}
              heading={articlesCopy.recommendedHeading}
              headingId="recommended-articles-heading"
              description={articlesCopy.recommendedDescription}
            />
          </>
        ) : (
          <Empty
            icon={<NewspaperIcon aria-hidden="true" />}
            title={articlesCopy.emptyCategoryTitle}
            description={articlesCopy.emptyCategoryDescription}
            action={
              <Button asChild variant="outline">
                <Link href={storePaths.articles}>{articlesCopy.browseCta}</Link>
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
}
