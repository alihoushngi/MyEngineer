import Link from "next/link";

import { articlesCopy } from "@/config/articles.config/articles.config";

import { cn } from "@/lib/utils/cn/cn";

import { type ArticleCategory } from "@/types/store/article.types";

type ArticleCategoryNavProps = {
  categories: readonly ArticleCategory[];
  currentSlug?: string;
};

export function ArticleCategoryNav({
  categories,
  currentSlug,
}: ArticleCategoryNavProps) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <nav aria-labelledby="article-categories-heading">
      <h2
        id="article-categories-heading"
        className="mb-3 px-2 type-h4 text-foreground"
      >
        {articlesCopy.categoriesHeading}
      </h2>

      <ul className="space-y-1">
        {categories.map((category) => {
          const current = category.slug === currentSlug;

          return (
            <li key={category.slug}>
              <Link
                href={category.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "relative flex min-h-11 items-center rounded-xl px-3 type-body-sm outline-none transition-all duration-200 ease-in-out hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-ring",
                  current
                    ? "bg-primary-subtle font-semibold text-primary"
                    : "text-foreground-muted hover:text-foreground",
                )}
              >
                {current ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-3 inset-s-0 w-0.5 rounded-full bg-primary"
                  />
                ) : null}
                {category.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
