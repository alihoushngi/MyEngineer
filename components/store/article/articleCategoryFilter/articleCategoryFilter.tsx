import Link from "next/link";

import { articlesCopy } from "@/config/articles.config/articles.config";
import { storePaths } from "@/config/navigation.config/navigation.config";

import {
  ALL_ARTICLE_CATEGORY,
  buildArticleHubHref,
} from "@/lib/articles/article-query/article-query";
import { cn } from "@/lib/utils/cn/cn";

import { type ArticleCategory } from "@/types/store/article.types";

type ArticleCategoryFilterProps = {
  categories: readonly ArticleCategory[];
  activeSlug: string;
};

export function ArticleCategoryFilter({
  categories,
  activeSlug,
}: ArticleCategoryFilterProps) {
  if (categories.length === 0) {
    return null;
  }

  const options = [
    {
      slug: ALL_ARTICLE_CATEGORY,
      label: articlesCopy.allCategoriesLabel,
    },
    ...categories.map((category) => ({
      slug: category.slug,
      label: category.title,
    })),
  ];

  return (
    <nav
      aria-label={articlesCopy.categoryFilterLabel}
      className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
    >
      <ul className="flex w-max min-w-full gap-2 sm:w-full sm:flex-wrap">
        {options.map((option) => {
          const selected = option.slug === activeSlug;

          return (
            <li key={option.slug} className="shrink-0">
              <Link
                href={buildArticleHubHref(storePaths.articles, option.slug)}
                scroll={false}
                aria-current={selected ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full border px-4 type-button outline-none transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-ring",
                  selected
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border-subtle bg-surface text-foreground hover:border-primary/25 hover:bg-primary-subtle hover:text-primary",
                )}
              >
                {option.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
