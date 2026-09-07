import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { BrandLogo } from "@/components/layout/brandLogo/brandLogo";
import { siteConfig } from "@/config/site.config/site.config";

export function AuthHeader() {
  return (
    <header className="border-b border-primary-deep-foreground/10 bg-primary-deep/95 pt-[env(safe-area-inset-top)] text-primary-deep-foreground shadow-sm backdrop-blur-xl">
      <div className="container-app flex items-center justify-between gap-3 py-2.5 sm:gap-4">
        <BrandLogo className="min-w-0 shrink text-primary-deep-foreground focus-visible:ring-offset-primary-deep" />

        <Link
          href={siteConfig.homeHref}
          className="group inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl border border-primary-deep-foreground/10 bg-primary-deep-foreground/5 px-3 type-body-sm text-primary-deep-foreground/70 outline-none transition-all duration-200 ease-in-out hover:border-primary-deep-foreground/15 hover:bg-primary-deep-foreground/8 hover:text-primary-deep-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronRightIcon
            aria-hidden="true"
            className="size-4 transition-all duration-200 ease-in-out group-hover:translate-x-1 ltr:hidden motion-reduce:transform-none"
          />
          <ChevronLeftIcon
            aria-hidden="true"
            className="size-4 transition-all duration-200 ease-in-out group-hover:-translate-x-1 rtl:hidden motion-reduce:transform-none"
          />

          <span className="sm:hidden">فروشگاه</span>
          <span className="hidden sm:inline">بازگشت به فروشگاه</span>
        </Link>
      </div>
    </header>
  );
}
