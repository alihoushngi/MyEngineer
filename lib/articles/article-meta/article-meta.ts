type ArticleMetaSource = {
  author?: string;
  publishedAt?: string;
  viewCount?: number;
};

const publicationDateFormatter = new Intl.DateTimeFormat("fa-IR", {
  calendar: "persian",
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

function formatPublicationDate(value?: string): string | undefined {
  if (!value) {
    return value;
  }

  const isoDate =
    /^(\d{4}-\d{2}-\d{2})(?:T(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)?)?$/.exec(
      value,
    );
  if (!isoDate) {
    return value;
  }

  const calendarDate = new Date(`${isoDate[1]}T00:00:00.000Z`);
  if (
    Number.isNaN(calendarDate.getTime()) ||
    calendarDate.toISOString().slice(0, 10) !== isoDate[1]
  ) {
    return value;
  }

  // Treat date-only and timezone-free ISO values consistently on every server.
  const normalizedValue =
    value.length === 10
      ? `${value}T00:00:00.000Z`
      : /(?:Z|[+-]\d{2}:\d{2})$/.test(value)
        ? value
        : `${value}Z`;
  const date = new Date(normalizedValue);
  return Number.isNaN(date.getTime())
    ? value
    : publicationDateFormatter.format(date);
}

/** "author · date · N بازدید" line shown on cards and the detail page. */
export function buildArticleMeta(article: ArticleMetaSource): string {
  const views =
    typeof article.viewCount === "number" && article.viewCount >= 0
      ? `${new Intl.NumberFormat("fa-IR").format(article.viewCount)} بازدید`
      : undefined;

  return [article.author, formatPublicationDate(article.publishedAt), views]
    .filter(Boolean)
    .join(" · ");
}
