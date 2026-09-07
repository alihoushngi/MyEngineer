import { type ReactNode } from "react";

import { cn } from "@/lib/utils/cn/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  titleId?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  titleId,
  description,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div
      data-slot="section-header"
      className={cn(
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8",
        className,
      )}
    >
      <div data-slot="section-header-content" className="min-w-0 max-w-2xl">
        {eyebrow ? (
          <p
            data-slot="section-header-eyebrow"
            className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-primary/10 bg-primary-subtle px-3 py-1 type-caption font-semibold text-primary"
          >
            <span
              aria-hidden="true"
              className="size-1.5 shrink-0 rounded-full bg-primary"
            />
            {eyebrow}
          </p>
        ) : null}

        <h2
          id={titleId}
          data-slot="section-header-title"
          className="type-h2 text-foreground"
        >
          {title}
        </h2>

        {description ? (
          <p
            data-slot="section-header-description"
            className="mt-2 max-w-xl type-body leading-relaxed text-foreground-muted sm:mt-3"
          >
            {description}
          </p>
        ) : null}
      </div>

      {action ? (
        <div
          data-slot="section-header-action"
          className="flex w-full shrink-0 items-center *:w-full sm:w-auto sm:*:w-auto"
        >
          {action}
        </div>
      ) : null}
    </div>
  );
}
