import Link from "next/link";
import { ArrowLeftIcon, FileTextIcon } from "lucide-react";
import { ContentPageHeader } from "@/components/common/contentPageHeader/contentPageHeader";
import { LegalDocument } from "@/components/common/legalDocument/legalDocument";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { type LegalPageProps } from "@/components/store/legal/legalPage/type/legalPage.types";
import { siteConfig } from "@/config/site.config/site.config";

export function LegalPage({
  title,
  intro,
  breadcrumbLabel,
  document,
  relatedHref,
  relatedLabel,
}: LegalPageProps) {
  return (
    <div className="relative isolate overflow-hidden py-page">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-48 top-24 -z-10 size-112 rounded-full bg-primary/5 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-e-48 bottom-10 -z-10 size-112 rounded-full bg-secondary/5 blur-[140px]"
      />

      <div className="container-narrow flex flex-col gap-10">
        <StoreBreadcrumb
          items={[
            { label: "خانه", href: siteConfig.homeHref },
            { label: breadcrumbLabel },
          ]}
        />

        <ContentPageHeader title={title} description={intro} />

        <LegalDocument document={document} />

        <nav
          aria-label="اسناد مرتبط"
          className="border-t border-border-subtle pt-8"
        >
          <Link
            href={relatedHref}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-border-subtle bg-surface p-4 shadow-xs outline-none transition-all duration-200 ease-in-out hover:border-primary/20 hover:bg-primary-subtle/40 hover:shadow-sm focus-visible:ring-2 focus-visible:ring-ring sm:p-5"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary transition-all duration-200 ease-in-out group-hover:bg-primary group-hover:text-primary-foreground">
                <FileTextIcon aria-hidden="true" className="size-5" />
              </span>

              <span className="min-w-0">
                <span className="block type-caption text-foreground-subtle">
                  سند مرتبط
                </span>
                <span className="mt-0.5 block type-body font-semibold text-foreground transition-all duration-200 ease-in-out group-hover:text-primary">
                  {relatedLabel}
                </span>
              </span>
            </span>

            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-foreground-muted transition-all duration-200 ease-in-out group-hover:-translate-x-1 group-hover:bg-primary group-hover:text-primary-foreground motion-reduce:transform-none">
              <ArrowLeftIcon
                aria-hidden="true"
                className="size-4 ltr:rotate-180"
              />
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
