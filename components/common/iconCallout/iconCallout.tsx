import { type ReactNode } from "react";

type IconCalloutProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export function IconCallout({ icon, title, description }: IconCalloutProps) {
  return (
    <div className="group flex h-full items-start gap-4 rounded-2xl border border-border-subtle bg-surface p-4 shadow-xs transition-all duration-200 ease-in-out hover:border-primary/15 hover:shadow-sm sm:p-5">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-primary-subtle text-primary transition-all duration-200 ease-in-out group-hover:bg-primary group-hover:text-primary-foreground [&_svg]:size-5">
        {icon}
      </span>

      <div className="min-w-0">
        <h3 className="wrap-break-word type-h4 text-foreground transition-all duration-200 ease-in-out group-hover:text-primary">
          {title}
        </h3>
        <p className="mt-2 type-body-sm leading-relaxed text-foreground-muted">
          {description}
        </p>
      </div>
    </div>
  );
}
