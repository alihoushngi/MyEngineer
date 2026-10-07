export type KnowledgeCategory = {
  slug: string;
  href: `/knowledge/${string}`;
  title: string;
  description?: string;
  itemsCount?: number;
  relatedServiceHref?: string;
  relatedServiceLabel?: string;
};

export type KnowledgeTip = {
  id: string;
  title: string;
  body?: string;
};

export type KnowledgeCategoryDetail = KnowledgeCategory & {
  tips: readonly KnowledgeTip[];
};
