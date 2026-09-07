import { type ReactNode } from "react";

type AccountPageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function AccountPageHeader({
  title,
  description,
  actions,
}: AccountPageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-border-subtle pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="relative min-w-0 ps-4">
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
        <div className="flex w-full shrink-0 flex-wrap gap-2 sm:w-auto">
          {actions}
        </div>
      ) : null}
    </header>
  );
}
