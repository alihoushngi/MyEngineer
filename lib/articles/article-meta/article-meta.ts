type ArticleMetaSource = {
  author?: string;
  publishedAt?: string;
  viewCount?: number;
};

/** "author · date · N بازدید" line shown on cards and the detail page. */
export function buildArticleMeta(article: ArticleMetaSource): string {
  const views =
    typeof article.viewCount === "number" && article.viewCount >= 0
      ? `${new Intl.NumberFormat("fa-IR").format(article.viewCount)} بازدید`
      : undefined;

  return [article.author, article.publishedAt, views]
    .filter(Boolean)
    .join(" · ");
}
