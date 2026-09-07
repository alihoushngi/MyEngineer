"use client";

import { SparklesIcon } from "lucide-react";

import { ResponsiveDialog } from "@/components/common/responsiveDialog/responsiveDialog";
import { SearchInput } from "@/components/store/search/searchInput/searchInput";
import { ServiceCategoryGrid } from "@/components/store/service/serviceCategoryGrid/serviceCategoryGrid";

import { type SearchSurfaceProps } from "@/components/layout/searchSurface/type/searchSurface.types";

import { searchCopy } from "@/config/search.config/search.config";

export function SearchSurface({
  open,
  onOpenChange,
  id = "search-surface",
}: SearchSurfaceProps) {
  function closeSurface() {
    onOpenChange(false);
  }

  return (
    <ResponsiveDialog
      id={id}
      open={open}
      onOpenChange={onOpenChange}
      title={searchCopy.overlayTitle}
      description={searchCopy.overlayDescription}
      contentClassName="sm:max-w-3xl"
    >
      <div className="space-y-6">
        <div className="rounded-2xl border border-border-subtle bg-surface-subtle p-3 sm:p-4">
          {open ? (
            <SearchInput
              id={`${id}-query`}
              initialQuery=""
              requireQuery
              navigateOnClear={false}
              autoFocus
              labelHidden
              onSubmitted={closeSurface}
            />
          ) : null}
        </div>

        <section className="space-y-4" aria-labelledby={`${id}-services`}>
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary">
              <SparklesIcon aria-hidden="true" className="size-4" />
            </span>

            <div>
              <h3 id={`${id}-services`} className="type-h4 text-foreground">
                {searchCopy.overlayServices}
              </h3>
              <p className="mt-0.5 type-caption text-foreground-muted">
                تخصص موردنظر خود را انتخاب کنید
              </p>
            </div>
          </div>

          <ServiceCategoryGrid onServiceSelect={closeSurface} />
        </section>
      </div>
    </ResponsiveDialog>
  );
}
