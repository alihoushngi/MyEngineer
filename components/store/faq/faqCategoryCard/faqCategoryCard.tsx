import Link from "next/link";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleHelpIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card/card";

import {
  faqCategoryIcons,
  normalizeFaqIconKey,
} from "@/lib/faq/faq-category-icon/faq-category-icon";
import { cn } from "@/lib/utils/cn/cn";

import { type FaqCategory } from "@/types/store/faq.types";

type FaqCategoryCardProps = {
  category: FaqCategory;
  tone?: string;
  headingLevel?: 2 | 3;
};

export function FaqCategoryCard({
  category,
  tone = "bg-primary-subtle",
  headingLevel = 2,
}: FaqCategoryCardProps) {
  const Heading = headingLevel === 3 ? "h3" : "h2";
  const Icon =
    faqCategoryIcons[normalizeFaqIconKey(category.icon)] ?? CircleHelpIcon;

  return (
    <Link
      href={category.href}
      className="group block h-full rounded-3xl outline-none transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="relative grid h-full grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 overflow-hidden rounded-3xl border border-border-subtle bg-surface p-4 shadow-xs transition-all duration-200 ease-in-out group-hover:-translate-y-1 group-hover:border-primary/20 group-hover:shadow-md motion-reduce:transform-none sm:flex sm:min-h-52 sm:flex-col sm:gap-x-0 sm:p-6">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-e-16 -top-16 size-36 rounded-full bg-primary/0 blur-3xl transition-all duration-200 ease-in-out group-hover:scale-125 group-hover:bg-primary/8"
        />

        <div className="z-10 flex items-start justify-between gap-4 sm:relative">
          <span
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-2xl text-primary-deep shadow-xs transition-all duration-200 ease-in-out group-hover:scale-105 motion-reduce:transform-none",
              tone,
            )}
          >
            <Icon aria-hidden="true" className="size-5 stroke-[1.8]" />
          </span>

          <span className="absolute inset-e-4 top-5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-foreground-muted transition-all duration-200 ease-in-out group-hover:-translate-x-1 group-hover:bg-primary group-hover:text-primary-foreground motion-reduce:transform-none sm:static">
            <ChevronLeftIcon aria-hidden="true" className="size-4 ltr:hidden" />
            <ChevronRightIcon
              aria-hidden="true"
              className="size-4 rtl:hidden"
            />
          </span>
        </div>

        <div className="relative z-10 min-w-0 pe-9 sm:mt-auto sm:pe-0 sm:pt-8">
          <Heading className="wrap-break-word type-h4 font-semibold text-foreground transition-all duration-200 ease-in-out group-hover:text-primary">
            {category.title}
          </Heading>

          {category.description ? (
            <p className="mt-2 type-body-sm leading-relaxed text-foreground-muted">
              {category.description}
            </p>
          ) : null}
        </div>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-5 bottom-0 h-px bg-linear-to-r from-transparent via-primary/0 to-transparent transition-all duration-200 ease-in-out group-hover:via-primary/35"
        />
      </Card>
    </Link>
  );
}
