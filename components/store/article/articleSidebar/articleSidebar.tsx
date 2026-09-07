import { ArticleCategoryNav } from "@/components/store/article/articleCategoryNav/articleCategoryNav";
import { ArticleToc } from "@/components/store/article/articleToc/articleToc";

import {
  type ArticleCategory,
  type ArticleTocItem,
} from "@/types/store/article.types";

type ArticleSidebarProps = {
  categories: readonly ArticleCategory[];
  currentCategorySlug?: string;
  toc: readonly ArticleTocItem[];
};

export function ArticleSidebar({
  categories,
  currentCategorySlug,
  toc,
}: ArticleSidebarProps) {
  if (categories.length === 0 && toc.length === 0) {
    return null;
  }

  return (
    <aside className="hidden space-y-4 lg:sticky lg:top-[calc(5.75rem+env(safe-area-inset-top))] lg:block lg:self-start">
      {categories.length > 0 ? (
        <div className="rounded-2xl border border-border-subtle bg-surface p-3 shadow-xs">
          <ArticleCategoryNav
            categories={categories}
            currentSlug={currentCategorySlug}
          />
        </div>
      ) : null}

      {toc.length > 0 ? (
        <div className="rounded-2xl border border-border-subtle bg-surface p-4 shadow-xs">
          <ArticleToc items={toc} />
        </div>
      ) : null}
    </aside>
  );
}
