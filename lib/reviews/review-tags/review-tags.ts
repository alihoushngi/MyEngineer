export type BackendReviewTags = {
  positive?: readonly string[] | null;
  negative?: readonly string[] | null;
};

export type BackendReviewReply = {
  body?: string | null;
  author?: string | null;
  created_at_label?: string | null;
};

export type ReviewTagHighlight = {
  kind: "positive" | "negative";
  label: string;
};

export function mapReviewTags(
  tags: BackendReviewTags | readonly string[] | null | undefined,
): ReviewTagHighlight[] {
  if (!tags) {
    return [];
  }

  // Legacy shape: a flat list of positive labels.
  if (Array.isArray(tags)) {
    return (tags as readonly string[])
      .filter((label) => label.trim() !== "")
      .map((label) => ({ kind: "positive", label }));
  }

  const grouped = tags as BackendReviewTags;
  const positive = (grouped.positive ?? []).map((label) => ({
    kind: "positive" as const,
    label,
  }));
  const negative = (grouped.negative ?? []).map((label) => ({
    kind: "negative" as const,
    label,
  }));

  return [...positive, ...negative].filter((item) => item.label.trim() !== "");
}

export function mapReviewReply(
  reply: BackendReviewReply | null | undefined,
  legacyReplyText?: string | null,
): { text?: string; authorName?: string; dateLabel?: string } {
  const text = reply?.body?.trim() || legacyReplyText?.trim() || undefined;

  if (!text) {
    return {};
  }

  return {
    text,
    authorName: reply?.author?.trim() || undefined,
    dateLabel: reply?.created_at_label?.trim() || undefined,
  };
}
