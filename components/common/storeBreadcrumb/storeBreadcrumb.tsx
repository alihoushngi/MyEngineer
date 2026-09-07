import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon, HouseIcon } from "lucide-react";

import { type StoreBreadcrumbItem } from "@/components/common/storeBreadcrumb/type/storeBreadcrumb.types";

import { cn } from "@/lib/utils/cn/cn";

type StoreBreadcrumbProps = {
  items: readonly StoreBreadcrumbItem[];
  className?: string;
};

export function StoreBreadcrumb({ items, className }: StoreBreadcrumbProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="مسیر صفحه" className={cn(className)}>
      <ol className="flex min-w-0 flex-wrap items-center gap-1.5 type-body-sm text-foreground-muted">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li
              key={`${item.label}-${index}`}
              className="flex min-w-0 items-center gap-1.5"
            >
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="inline-flex shrink-0 text-border-strong"
                >
                  <ChevronLeftIcon className="size-3.5 ltr:hidden" />
                  <ChevronRightIcon className="size-3.5 rtl:hidden" />
                </span>
              ) : null}

              {isCurrent || !item.href ? (
                <span
                  aria-current={isCurrent ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-9 min-w-0 items-center gap-1.5 rounded-lg px-2",
                    isCurrent && "bg-surface-muted font-medium text-foreground",
                  )}
                >
                  {isFirst ? (
                    <HouseIcon
                      aria-hidden="true"
                      className="size-3.5 shrink-0"
                    />
                  ) : null}
                  <span className="truncate">{item.label}</span>
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 outline-none transition-all duration-200 ease-in-out hover:bg-surface-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {isFirst ? (
                    <HouseIcon
                      aria-hidden="true"
                      className="size-3.5 shrink-0"
                    />
                  ) : null}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
