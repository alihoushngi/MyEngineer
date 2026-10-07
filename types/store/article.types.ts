export type ArticleSlug = string;

export type ArticleCardData = {
  id: string;
  slug: ArticleSlug;
  href: `/articles/${string}`;
  title: string;
  excerpt?: string;
  coverSrc?: string;
  author?: string;
  viewCount?: number;
  publishedAt?: string;
  categorySlug?: string;
  categoryLabel?: string;
  tags?: readonly string[];
  featured?: boolean;
};

export type ArticleFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type ArticleTocItem = {
  id: string;
  label: string;
  level: 2 | 3 | 4 | 5;
};

export type Article = ArticleCardData & {
  body?: string;
  viewCount?: number;
  faqs?: readonly ArticleFaqItem[];
  relatedServiceHref?: string;
  relatedServiceLabel?: string;
};

export type ArticleCategory = {
  slug: string;
  href: `/articles/categories/${string}`;
  title: string;
  description?: string;
};

export type ArticleComment = {
  id: string;
  articleId: string;
  authorName: string;
  body: string;
  createdAtLabel: string;
};

export type SubmitArticleCommentInput = {
  articleId: string;
  authorName: string;
  phone: string;
  body: string;
};
