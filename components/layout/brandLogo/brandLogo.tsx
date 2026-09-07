import Link from "next/link";
import { siteConfig } from "@/config/site.config/site.config";
import { cn } from "@/lib/utils/cn/cn";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <Link
      href={siteConfig.homeHref}
      className={cn(
        "group inline-flex min-h-11 min-w-0 items-center gap-2 rounded-xl px-1.5 py-1 type-h4 text-foreground outline-none transition-all duration-200 ease-in-out hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary shadow-xs transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:bg-primary/15 motion-reduce:transform-none">
        <svg aria-hidden="true" viewBox="0 0 36 36" className="size-7">
          <path
            fill="currentColor"
            d="M4 27V10l7-4 7 4 7-4 7 4v17h-6V14l-8 4-8-4v13H4Z"
          />
          <path fill="currentColor" d="M13 19h10v8H13z" opacity=".55" />
        </svg>
      </span>
      <span className="min-w-0 truncate whitespace-nowrap font-bold">
        {siteConfig.name}
      </span>
    </Link>
  );
}
