import { articlesCopy } from "@/config/articles.config/articles.config";

import { cn } from "@/lib/utils/cn/cn";

import { type ArticleTocItem } from "@/types/store/article.types";

type ArticleTocProps = {
  items: readonly ArticleTocItem[];
  headingHidden?: boolean;
};

const LEVEL_PADDING: Record<ArticleTocItem["level"], string> = {
  2: "ps-0",
  3: "ps-3",
  4: "ps-6",
  5: "ps-9",
};

export function ArticleToc({ items, headingHidden = false }: ArticleTocProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-labelledby={headingHidden ? undefined : "article-toc-heading"}>
      {headingHidden ? (
        <h2 className="sr-only">{articlesCopy.tocHeading}</h2>
      ) : (
        <h2
          id="article-toc-heading"
          className="mb-3 px-1 type-h4 text-foreground"
        >
          {articlesCopy.tocHeading}
        </h2>
      )}

      <ol className="space-y-0.5">
        {items.map((item) => (
          <li key={item.id} className={LEVEL_PADDING[item.level]}>
            <a
              href={`#${item.id}`}
              className={cn(
                "flex min-h-10 items-center rounded-lg px-2 type-body-sm text-foreground-muted outline-none transition-all duration-200 ease-in-out hover:bg-primary-subtle hover:text-primary focus-visible:ring-2 focus-visible:ring-ring",
                item.level === 2 && "font-semibold text-foreground",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
