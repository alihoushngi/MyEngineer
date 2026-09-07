"use client";

import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, ImageIcon } from "lucide-react";
import { useState } from "react";
import { ResponsiveDialog } from "@/components/common/responsiveDialog/responsiveDialog";
import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { Button } from "@/components/ui/button/button";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { hasItems } from "@/lib/experts/expert-profile/expert-profile";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { cn } from "@/lib/utils/cn/cn";
import { type ExpertPortfolioItem } from "@/types/store/expert.types";

type ExpertPortfolioProps = {
  items?: readonly ExpertPortfolioItem[];
};

export function ExpertPortfolio({ items }: ExpertPortfolioProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const portfolio = items ?? [];
  const selected = openIndex === null ? undefined : portfolio[openIndex];

  function move(delta: number) {
    setOpenIndex((current) => {
      if (current === null || portfolio.length === 0) {
        return current;
      }

      return (current + delta + portfolio.length) % portfolio.length;
    });
  }

  return (
    <section
      aria-labelledby="expert-portfolio-heading"
      className="py-8 first:pt-0"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <SectionHeader
          titleId="expert-portfolio-heading"
          title={expertProfileCopy.portfolioTitle}
        />
        {hasItems(portfolio) ? (
          <p className="type-caption text-foreground-muted">
            {formatFaNumber(portfolio.length)}{" "}
            {expertProfileCopy.portfolioCountLabel}
          </p>
        ) : null}
      </div>

      {hasItems(portfolio) ? (
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {portfolio.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface text-start shadow-xs outline-none transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-primary/20 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transform-none"
                onClick={() => setOpenIndex(index)}
              >
                <PortfolioMedia
                  item={item}
                  className="aspect-4/3 w-full transition-all duration-200 ease-in-out group-hover:scale-[1.02] motion-reduce:transform-none"
                />
                <span className="block p-3 type-body-sm font-semibold text-foreground">
                  {item.title ?? expertProfileCopy.portfolioOpen}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-6 rounded-2xl bg-surface-subtle p-4 type-body text-foreground-muted">
          {expertProfileCopy.portfolioEmpty}
        </p>
      )}

      <ResponsiveDialog
        open={openIndex !== null}
        title={selected?.title ?? expertProfileCopy.portfolioViewerTitle}
        description={selected?.description ?? expertProfileCopy.portfolioOpen}
        contentClassName="sm:max-w-3xl"
        onOpenChange={(open) => {
          if (!open) {
            setOpenIndex(null);
          }
        }}
      >
        {selected ? (
          <div
            className="space-y-4 outline-none"
            tabIndex={0}
            onKeyDown={(event) => {
              if (portfolio.length < 2) {
                return;
              }

              if (event.key === "ArrowRight") {
                event.preventDefault();
                move(-1);
              }

              if (event.key === "ArrowLeft") {
                event.preventDefault();
                move(1);
              }
            }}
          >
            <PortfolioMedia
              item={selected}
              className="aspect-video w-full rounded-2xl"
            />

            {portfolio.length > 1 ? (
              <div className="flex justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => move(-1)}
                >
                  <ChevronRightIcon aria-hidden="true" className="ltr:hidden" />
                  <ChevronLeftIcon aria-hidden="true" className="rtl:hidden" />
                  {expertProfileCopy.portfolioPrevious}
                </Button>

                <Button type="button" variant="outline" onClick={() => move(1)}>
                  {expertProfileCopy.portfolioNext}
                  <ChevronLeftIcon aria-hidden="true" className="ltr:hidden" />
                  <ChevronRightIcon aria-hidden="true" className="rtl:hidden" />
                </Button>
              </div>
            ) : null}

            <ul className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {portfolio.map((item, index) => (
                <li key={`${item.id}-thumb`}>
                  <button
                    type="button"
                    aria-current={index === openIndex ? "true" : undefined}
                    className={cn(
                      "w-full overflow-hidden rounded-xl border-2 outline-none transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-ring",
                      index === openIndex
                        ? "border-primary shadow-sm"
                        : "border-transparent opacity-60 hover:opacity-100",
                    )}
                    onClick={() => setOpenIndex(index)}
                  >
                    <PortfolioMedia
                      item={item}
                      className="aspect-square w-full"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </ResponsiveDialog>
    </section>
  );
}

function PortfolioMedia({
  item,
  className,
}: {
  item: ExpertPortfolioItem;
  className?: string;
}) {
  if (item.imageSrc) {
    return (
      <span
        className={cn(
          "relative block overflow-hidden bg-surface-subtle",
          className,
        )}
      >
        <Image
          src={item.imageSrc}
          alt={item.imageAlt ?? item.title ?? ""}
          fill
          sizes="(min-width: 1024px) 33vw, 50vw"
          className="object-cover"
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2 bg-surface-subtle type-caption text-foreground-muted",
        className,
      )}
    >
      <ImageIcon aria-hidden="true" className="size-6 text-foreground-subtle" />
      {item.title ?? expertProfileCopy.portfolioTitle}
    </span>
  );
}
