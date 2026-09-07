import { type ReactNode } from "react";

type EngineerProfileSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
};

export function EngineerProfileSection({
  title,
  description,
  children,
  action,
}: EngineerProfileSectionProps) {
  return (
    <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="type-h4 text-foreground">{title}</h2>

          {description ? (
            <p className="mt-1 max-w-2xl type-caption leading-relaxed text-foreground-muted">
              {description}
            </p>
          ) : null}
        </div>

        {action ? (
          <div className="shrink-0 *:w-full sm:*:w-auto">{action}</div>
        ) : null}
      </div>

      {children}
    </section>
  );
}
