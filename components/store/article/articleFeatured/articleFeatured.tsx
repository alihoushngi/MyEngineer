import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, NewspaperIcon } from "lucide-react";

import { articlesCopy } from "@/config/articles.config/articles.config";

import { type ArticleCardData } from "@/types/store/article.types";

type ArticleFeaturedProps = {
  article: ArticleCardData;
};

export function ArticleFeatured({ article }: ArticleFeaturedProps) {
  const meta = [article.author, article.publishedAt]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      href={article.href}
      className="group relative isolate grid overflow-hidden rounded-4xl border border-primary-deep-foreground/10 bg-primary-deep text-primary-deep-foreground shadow-lg outline-none transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transform-none lg:grid-cols-[1.1fr_.9fr]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -inset-e-32 -z-10 size-80 rounded-full bg-primary/15 blur-[110px]"
      />

      <div className="relative min-h-64 overflow-hidden bg-primary-deep lg:min-h-96">
        {article.coverSrc ? (
          <Image
            src={article.coverSrc}
            alt={`تصویر مقاله ${article.title}`}
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover transition-all duration-200 ease-in-out group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex size-full min-h-64 items-center justify-center text-primary-deep-foreground/50 lg:min-h-96"
          >
            <NewspaperIcon className="size-12" />
          </div>
        )}

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-primary-deep/65 via-primary-deep/10 to-transparent lg:bg-linear-to-s lg:from-primary-deep/70 lg:via-primary-deep/10 lg:to-transparent"
        />
      </div>

      <div className="relative flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12">
        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-primary-deep-foreground/10 bg-primary-deep-foreground/6 px-3 py-1 type-caption font-semibold text-primary backdrop-blur-md">
          <NewspaperIcon aria-hidden="true" className="size-3.5" />
          {article.categoryLabel
            ? `${articlesCopy.featuredLabel} · ${article.categoryLabel}`
            : articlesCopy.featuredLabel}
        </p>

        <h2 className="mt-5 type-h1 text-primary-deep-foreground">
          {article.title}
        </h2>

        {article.excerpt ? (
          <p className="mt-4 type-body leading-relaxed text-primary-deep-foreground/65">
            {article.excerpt}
          </p>
        ) : null}

        {meta ? (
          <p className="mt-4 type-caption text-primary-deep-foreground/45">
            {meta}
          </p>
        ) : null}

        <span className="mt-7 inline-flex min-h-11 items-center gap-2 type-button text-primary-deep-foreground">
          {articlesCopy.readMoreCta}
          <ArrowLeftIcon
            aria-hidden="true"
            className="size-4 transition-all duration-200 ease-in-out group-hover:-translate-x-1 motion-reduce:transform-none"
          />
        </span>
      </div>
    </Link>
  );
}
