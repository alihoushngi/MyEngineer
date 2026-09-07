import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { ArticleBody } from "@/components/store/article/articleBody/articleBody";
import { ArticleComments } from "@/components/store/article/articleComments/articleComments";
import { ArticleSidebar } from "@/components/store/article/articleSidebar/articleSidebar";
import { ArticleTocMobile } from "@/components/store/article/articleTocMobile/articleTocMobile";
import { RelatedArticles } from "@/components/store/article/relatedArticles/relatedArticles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion/accordion";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";

import { articlesCopy } from "@/config/articles.config/articles.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { siteConfig } from "@/config/site.config/site.config";

import {
  parseArticleBody,
  tocFromArticleBlocks,
} from "@/lib/articles/parse-article-body/parse-article-body";

import {
  type Article,
  type ArticleCardData,
  type ArticleCategory,
  type ArticleComment,
} from "@/types/store/article.types";

type ArticleDetailPageProps = {
  article: Article;
  categories: readonly ArticleCategory[];
  related: readonly ArticleCardData[];
  comments: readonly ArticleComment[];
};

export function ArticleDetailPage({
  article,
  categories,
  related,
  comments,
}: ArticleDetailPageProps) {
  const meta = [article.author, article.publishedAt]
    .filter(Boolean)
    .join(" · ");
  const faqs = article.faqs ?? [];
  const blocks = parseArticleBody(article.body ?? "");
  const toc = tocFromArticleBlocks(blocks);

  const categoryHref = article.categorySlug
    ? (`/articles/categories/${article.categorySlug}` as const)
    : undefined;

  return (
    <div className="relative isolate overflow-hidden py-page">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-48 top-16 -z-10 size-120 rounded-full bg-primary/5 blur-[140px]"
      />

      <div className="container-app flex flex-col gap-10">
        <StoreBreadcrumb
          items={[
            { label: "خانه", href: siteConfig.homeHref },
            { label: articlesCopy.hubBreadcrumb, href: storePaths.articles },
            ...(article.categoryLabel && categoryHref
              ? [{ label: article.categoryLabel, href: categoryHref }]
              : []),
            { label: article.title },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(15rem,18rem)_minmax(0,1fr)] lg:items-start">
          <ArticleSidebar
            categories={categories}
            currentCategorySlug={article.categorySlug}
            toc={toc}
          />

          <article className="min-w-0 max-w-3xl">
            <header className="border-b border-border-subtle pb-8">
              {article.categoryLabel && categoryHref ? (
                <Badge asChild variant="secondary">
                  <Link href={categoryHref}>{article.categoryLabel}</Link>
                </Badge>
              ) : null}

              <h1 className="mt-4 type-h1 text-foreground">{article.title}</h1>

              {meta ? (
                <p className="mt-4 type-body-sm text-foreground-muted">
                  {meta}
                </p>
              ) : null}
            </header>

            {article.coverSrc ? (
              <div className="mt-8 overflow-hidden rounded-3xl border border-border-subtle bg-surface shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.coverSrc}
                  alt=""
                  className="aspect-video w-full object-cover"
                />
              </div>
            ) : null}

            <div className="mt-8">
              <ArticleTocMobile items={toc} />
            </div>

            {article.body ? (
              <div className="mt-8">
                <ArticleBody markdown={article.body} />
              </div>
            ) : null}

            {faqs.length > 0 ? (
              <section
                className="mt-10 border-t border-border-subtle pt-8"
                aria-labelledby="article-faqs-heading"
              >
                <h2
                  id="article-faqs-heading"
                  className="mb-5 type-h3 text-foreground"
                >
                  {articlesCopy.faqsHeading}
                </h2>

                <Accordion type="single" collapsible className="grid gap-3">
                  {faqs.map((item) => (
                    <AccordionItem
                      key={item.id}
                      value={item.id}
                      className="overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-xs transition-all duration-200 ease-in-out data-[state=open]:border-primary/15 data-[state=open]:shadow-sm"
                    >
                      <AccordionTrigger className="px-4 py-4 text-start transition-all duration-200 ease-in-out hover:bg-surface-muted sm:px-5">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="border-t border-border-subtle px-4 py-4 leading-loose text-foreground-muted sm:px-5">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ) : null}

            {article.relatedServiceHref && article.relatedServiceLabel ? (
              <div className="mt-8 rounded-3xl border border-primary/10 bg-primary-subtle/60 p-4 sm:p-5">
                <Button
                  asChild
                  variant="outline"
                  className="max-w-full min-w-0 gap-2 whitespace-normal"
                >
                  <Link href={article.relatedServiceHref}>
                    <span className="min-w-0">
                      {articlesCopy.serviceCtaPrefix}:{" "}
                      {article.relatedServiceLabel}
                    </span>
                    <ArrowLeftIcon
                      aria-hidden="true"
                      className="size-4 shrink-0"
                    />
                  </Link>
                </Button>
              </div>
            ) : null}
          </article>
        </div>

        <RelatedArticles
          items={related}
          heading={articlesCopy.relatedHeading}
          description={articlesCopy.relatedDescription}
        />

        <ArticleComments articleId={article.id} comments={comments} />
      </div>
    </div>
  );
}
