import Link from "next/link";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleHelpIcon,
} from "lucide-react";

import { Card } from "@/components/ui/card/card";

import { cn } from "@/lib/utils/cn/cn";

import { type FaqCategory } from "@/types/store/faq.types";

type FaqCategoryCardProps = {
  category: FaqCategory;
  tone?: string;
};

export function FaqCategoryCard({
  category,
  tone = "bg-primary-subtle",
}: FaqCategoryCardProps) {
  return (
    <Link
      href={category.href}
      className="group block h-full rounded-3xl outline-none transition-all duration-200 ease-in-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="relative flex h-full min-h-48 flex-col overflow-hidden rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs transition-all duration-200 ease-in-out group-hover:-translate-y-1 group-hover:border-primary/20 group-hover:shadow-md motion-reduce:transform-none sm:min-h-52 sm:p-6">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-e-16 -top-16 size-36 rounded-full bg-primary/0 blur-3xl transition-all duration-200 ease-in-out group-hover:scale-125 group-hover:bg-primary/8"
        />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <span
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-2xl text-primary-deep shadow-xs transition-all duration-200 ease-in-out group-hover:scale-105 motion-reduce:transform-none",
              tone,
            )}
          >
            <CircleHelpIcon
              aria-hidden="true"
              className="size-5 stroke-[1.8]"
            />
          </span>

          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-foreground-muted transition-all duration-200 ease-in-out group-hover:-translate-x-1 group-hover:bg-primary group-hover:text-primary-foreground motion-reduce:transform-none">
            <ChevronLeftIcon aria-hidden="true" className="size-4 ltr:hidden" />
            <ChevronRightIcon
              aria-hidden="true"
              className="size-4 rtl:hidden"
            />
          </span>
        </div>

        <div className="relative z-10 mt-auto pt-8">
          <h2 className="wrap-break-word type-h4 font-semibold text-foreground transition-all duration-200 ease-in-out group-hover:text-primary">
            {category.title}
          </h2>

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
