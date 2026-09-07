import Link from "next/link";
import { ArrowLeftIcon, SearchXIcon } from "lucide-react";

import { Button } from "@/components/ui/button/button";

import { siteConfig } from "@/config/site.config/site.config";

export function StoreNotFound() {
  return (
    <div className="container-narrow flex min-h-[65dvh] items-center py-section">
      <div className="relative w-full overflow-hidden rounded-4xl border border-border-subtle bg-surface px-5 py-10 text-center shadow-md sm:px-8 sm:py-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-s-16 -top-20 size-40 rounded-full bg-primary/8 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -inset-e-16 size-40 rounded-full bg-secondary/8 blur-3xl"
        />

        <span className="relative mx-auto flex size-14 items-center justify-center rounded-2xl border border-primary/10 bg-primary-subtle text-primary shadow-xs">
          <SearchXIcon aria-hidden="true" className="size-6" />
        </span>

        <p className="relative mt-5 type-display font-bold tabular-nums text-primary">
          <span className="ltr-data">404</span>
        </p>

        <h1 className="relative mt-2 type-h1 text-foreground">صفحه پیدا نشد</h1>

        <p className="relative mx-auto mt-3 max-w-md type-body leading-relaxed text-foreground-muted">
          این صفحه وجود ندارد یا جابه‌جا شده است. می‌توانید به صفحه اصلی
          برگردید.
        </p>

        <Button asChild className="relative mt-7 gap-2">
          <Link href={siteConfig.homeHref}>
            بازگشت به خانه
            <ArrowLeftIcon aria-hidden="true" className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
