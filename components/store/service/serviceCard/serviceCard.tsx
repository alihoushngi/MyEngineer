import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { type MouseEventHandler, type ReactNode } from "react";

import { cn } from "@/lib/utils/cn/cn";

export type ServiceCardProps = {
  href: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

export function ServiceCard({
  href,
  title,
  description,
  icon,
  className,
  onClick,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative flex h-full min-w-0 items-start gap-4 overflow-hidden rounded-2xl border border-border-subtle bg-surface p-4 shadow-xs outline-none transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-ring sm:p-5 motion-reduce:transform-none",
        className,
      )}
    >
      {icon ? (
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary transition-all duration-200 ease-in-out group-hover:bg-primary group-hover:text-primary-foreground [&_svg]:size-5 [&_svg]:stroke-[1.7]">
          {icon}
        </span>
      ) : null}

      <div className="min-w-0 flex-1">
        <h3 className="type-h4 text-foreground transition-all duration-200 ease-in-out group-hover:text-primary">
          {title}
        </h3>

        {description ? (
          <p className="mt-2 type-body-sm leading-relaxed text-foreground-muted">
            {description}
          </p>
        ) : null}
      </div>

      <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-foreground-muted transition-all duration-200 ease-in-out group-hover:-translate-x-1 group-hover:bg-primary group-hover:text-primary-foreground motion-reduce:transform-none">
        <ArrowLeftIcon aria-hidden="true" className="size-4 ltr:rotate-180" />
      </span>
    </Link>
  );
}
