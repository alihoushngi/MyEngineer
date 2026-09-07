import { type ReactNode } from "react";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { type StoreBreadcrumbItem } from "@/components/common/storeBreadcrumb/type/storeBreadcrumb.types";

type EngineerPageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  breadcrumbs?: readonly StoreBreadcrumbItem[];
};

export function EngineerPageHeader({
  title,
  description,
  actions,
  breadcrumbs,
}: EngineerPageHeaderProps) {
  return (
    <header>
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <StoreBreadcrumb items={breadcrumbs} className="mb-4" />
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="relative min-w-0 max-w-3xl ps-5">
          <span
            aria-hidden="true"
            className="absolute inset-y-1 inset-s-0 w-1 rounded-full bg-primary"
          />

          <h1 className="type-h1 text-foreground">{title}</h1>

          {description ? (
            <p className="mt-2 max-w-2xl type-body leading-relaxed text-foreground-muted">
              {description}
            </p>
          ) : null}
        </div>

        {actions ? (
          <div className="flex w-full shrink-0 flex-wrap gap-2 *:w-full sm:w-auto sm:*:w-auto">
            {actions}
          </div>
        ) : null}
      </div>
    </header>
  );
}
