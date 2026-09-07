import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { ArticleCard } from "@/components/store/article/articleCard/articleCard";

import { articlesCopy } from "@/config/articles.config/articles.config";

import { type ArticleCardData } from "@/types/store/article.types";

type RelatedArticlesProps = {
  items: readonly ArticleCardData[];
  heading?: string;
  headingId?: string;
  description?: string;
};

export function RelatedArticles({
  items,
  heading = articlesCopy.relatedHeading,
  headingId = "related-articles-heading",
  description,
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

      <ul className="mt-7 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((article) => (
          <li key={article.id} className="h-full">
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </section>
  );
}
