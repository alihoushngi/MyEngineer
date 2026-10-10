import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { ArticleCard } from "@/components/store/article/articleCard/articleCard";

import { articlesCopy } from "@/config/articles.config/articles.config";

import { type ArticleCardData } from "@/types/store/article.types";

type RelatedArticlesProps = {
  items: readonly ArticleCardData[];
  heading?: string;
  headingId?: string;
  description?: string;
  layout?: "grid" | "rail";
  prioritizeImages?: boolean;
};

export function RelatedArticles({
  items,
  heading = articlesCopy.relatedHeading,
  headingId = "related-articles-heading",
  description,
  layout = "grid",
  prioritizeImages = false,
}: RelatedArticlesProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className="border-t border-border-subtle pt-10"
      aria-labelledby={headingId}
    >
      <SectionHeader
        eyebrow="مطالب پیشنهادی"
        titleId={headingId}
        title={heading}
        description={description}
      />

      <ul
        className={
          layout === "rail"
            ? "mt-5 grid auto-cols-[minmax(15rem,80%)] grid-flow-col items-stretch gap-4 overflow-x-auto pb-3 sm:mt-7 sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3"
            : "mt-5 grid items-stretch gap-4 sm:mt-7 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {items.map((article, index) => (
          <li key={article.id} className="h-full">
            <ArticleCard
              article={article}
              headingLevel={3}
              priority={prioritizeImages && index < 3}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
