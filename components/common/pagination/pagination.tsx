"use client";

import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button/button";

import { type PaginationProps } from "@/components/common/pagination/type/pagination.types";

import { paginationCopy } from "@/config/pagination.config/pagination.config";

import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { buildPagedHref } from "@/lib/pagination/page-param/page-param";
import { getVisiblePages } from "@/lib/pagination/visible-pages/visible-pages";
import { cn } from "@/lib/utils/cn/cn";

export function Pagination({
  page,
  pageCount,
  ariaLabel,
  pathname,
  query,
  hash,
  onPageChange,
}: PaginationProps) {
  if (pageCount <= 1) {
    return null;
  }

  const status = paginationCopy.pageStatus(
    formatFaNumber(page),
    formatFaNumber(pageCount),
  );

  const hrefFor = (target: number) =>
    pathname ? buildPagedHref(pathname, target, query, hash) : undefined;

  return (
    <nav
      aria-label={ariaLabel}
      className="
        flex
        w-full
        items-center
        justify-between
        gap-3

        rounded-2xl
        border
        border-border-subtle

        bg-surface

        p-2

        shadow-xs

        sm:w-fit
        sm:self-center
        sm:justify-center
      "
    >
      <p className="sr-only" aria-live="polite">
        {status}
      </p>

      <PaginationControl
        label={paginationCopy.previousLabel}
        disabled={page <= 1}
        href={hrefFor(page - 1)}
        onClick={onPageChange ? () => onPageChange(page - 1) : undefined}
        icon="previous"
      />

      <p
        className="
          flex
          min-h-10
          items-center
          justify-center

          px-2

          type-caption
          font-medium
          text-foreground-muted

          sm:hidden
        "
      >
        {status}
      </p>

      <ol
        className="
          hidden
          flex-wrap
          items-center
          justify-center
          gap-1

          sm:flex
        "
      >
        {getVisiblePages(page, pageCount).map((token) =>
          token.type === "ellipsis" ? (
            <li key={token.key}>
              <span
                aria-label={paginationCopy.ellipsisLabel}
                className="
                  flex
                  size-10
                  items-center
                  justify-center

                  type-caption
                  text-foreground-muted
                "
              >
                …
              </span>
            </li>
          ) : (
            <li key={token.page}>
              <PaginationControl
                label={formatFaNumber(token.page)}
                ariaLabel={`${paginationCopy.pageNumberLabel} ${formatFaNumber(token.page)}`}
                current={token.page === page}
                href={hrefFor(token.page)}
                onClick={
                  onPageChange ? () => onPageChange(token.page) : undefined
                }
                compact
              />
            </li>
          ),
        )}
      </ol>

      <PaginationControl
        label={paginationCopy.nextLabel}
        disabled={page >= pageCount}
        href={hrefFor(page + 1)}
        onClick={onPageChange ? () => onPageChange(page + 1) : undefined}
        icon="next"
      />
    </nav>
  );
}

function PaginationControl({
  label,
  ariaLabel,
  href,
  current = false,
  disabled = false,
  onClick,
  icon,
  compact = false,
}: {
  label: string;
  ariaLabel?: string;
  href?: string;
  current?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  icon?: "previous" | "next";
  compact?: boolean;
}) {
  const className = cn(
    `
      shadow-none

      sm:min-w-10
    `,
    compact && "size-10 min-h-10 px-0",
    current &&
      `
        pointer-events-none
        shadow-sm
      `,
  );

  const content = (
    <>
      {icon === "previous" ? (
        <ChevronRightIcon
          aria-hidden="true"
          className="
            size-4
            ltr:rotate-180
          "
        />
      ) : null}

      <span className={cn(icon && "hidden sm:inline")}>{label}</span>

      {icon === "next" ? (
        <ChevronLeftIcon
          aria-hidden="true"
          className="
            size-4
            ltr:rotate-180
          "
        />
      ) : null}

      {icon ? <span className="sr-only sm:hidden">{label}</span> : null}
    </>
  );

  if (href && !disabled) {
    return (
      <Button
        asChild
        variant={current ? "primary" : "ghost"}
        size={compact ? "icon-sm" : "sm"}
        className={className}
      >
        <Link
          href={href}
          aria-label={ariaLabel}
          aria-current={current ? "page" : undefined}
        >
          {content}
        </Link>
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant={current ? "primary" : "ghost"}
      size={compact ? "icon-sm" : "sm"}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={current ? "page" : undefined}
      className={className}
      onClick={onClick}
    >
      {content}
    </Button>
  );
}
