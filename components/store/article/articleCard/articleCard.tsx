import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, NewspaperIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge/badge";
import { Card } from "@/components/ui/card/card";

import { articlesCopy } from "@/config/articles.config/articles.config";

import { cn } from "@/lib/utils/cn/cn";

import { type ArticleCardData } from "@/types/store/article.types";

type ArticleCardProps = {
  article: ArticleCardData;
  className?: string;
};

export function ArticleCard({ article, className }: ArticleCardProps) {
  const meta = [article.author, article.publishedAt]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className={cn("h-full", className)}>
      <Link
        href={article.href}
        className="group block h-full rounded-3xl outline-none transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Card className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-border-subtle bg-surface p-0 shadow-xs transition-all duration-200 ease-in-out group-hover:-translate-y-1 group-hover:border-primary/20 group-hover:shadow-md motion-reduce:transform-none">
          <div className="relative aspect-16/10 overflow-hidden bg-secondary-subtle">
            {article.coverSrc ? (
              <Image
                src={article.coverSrc}
                alt={`تصویر مقاله ${article.title}`}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-all duration-200 ease-in-out group-hover:scale-[1.03] motion-reduce:transform-none"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex size-full items-center justify-center bg-secondary-subtle text-secondary"
              >
                <NewspaperIcon className="size-9" />
              </div>
            )}

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-primary-deep/25 via-transparent to-transparent opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-100"
            />
          </div>

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            {article.categoryLabel ? (
              <Badge variant="secondary" className="w-fit">
                {article.categoryLabel}
              </Badge>
            ) : null}

            <h2 className="mt-4 wrap-break-word type-h3 text-foreground transition-all duration-200 ease-in-out group-hover:text-primary">
              {article.title}
            </h2>

            {article.excerpt ? (
              <p className="mt-3 type-body-sm leading-relaxed text-foreground-muted">
                {article.excerpt}
              </p>
            ) : null}

            {meta ? (
              <p className="mt-4 type-caption text-foreground-subtle">{meta}</p>
            ) : null}

            <span className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 type-button text-primary">
              {articlesCopy.readMoreCta}
              <ArrowLeftIcon
                aria-hidden="true"
                className="size-4 transition-all duration-200 ease-in-out group-hover:-translate-x-1 motion-reduce:transform-none"
              />
            </span>
          </div>
        </Card>
      </Link>
    </article>
  );
}
