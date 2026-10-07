export type FaqCategory = {
  slug: string;
  href: `/faq/${string}`;
  title: string;
  description?: string;
  /** Backend icon key, resolved by resolveFaqCategoryIcon. */
  icon?: string;
  relatedServiceHref?: string;
  relatedServiceLabel?: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqCategoryDetail = FaqCategory & {
  items: readonly FaqItem[];
  relatedCategories?: readonly FaqCategory[];
};
