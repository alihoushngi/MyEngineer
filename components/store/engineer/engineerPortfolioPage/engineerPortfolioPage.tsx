import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Pagination } from "@/components/common/pagination/pagination";
import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { EngineerPortfolioAddForm } from "@/components/store/engineer/engineerPortfolioAddForm/engineerPortfolioAddForm";
import { EngineerPortfolioRemoveButton } from "@/components/store/engineer/engineerPortfolioRemoveButton/engineerPortfolioRemoveButton";
import { Empty } from "@/components/ui/empty/empty";
import {
  engineerPageTitles,
  engineerPanelCopy,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type PaginatedItems } from "@/lib/pagination/paginate-items/paginate-items";
import { type EngineerPortfolioItem } from "@/types/store/engineer.types";

type EngineerPortfolioPageProps = {
  items: readonly EngineerPortfolioItem[];
  pagination: PaginatedItems<EngineerPortfolioItem>;
  pathname: string;
};

export function EngineerPortfolioPage({
  items,
  pagination,
  pathname,
}: EngineerPortfolioPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.portfolio}
        description="نمونه‌کارهای پروفایل عمومی. ترتیب‌دهی با کشیدن و رها کردن پشتیبانی نمی‌شود."
      />

      {pagination.total === 0 ? (
        <Empty
          icon={<ImageIcon aria-hidden="true" />}
          title={engineerPanelCopy.emptyPortfolio}
        />
      ) : (
        <>
          <ul className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border-subtle bg-surface shadow-xs transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-primary/15 hover:shadow-md motion-reduce:transform-none"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-surface-subtle">
                  {item.imageSrc ? (
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt ?? item.title ?? "نمونه‌کار"}
                      fill
                      className="object-cover transition-all duration-200 ease-in-out group-hover:scale-[1.03] motion-reduce:transform-none"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center text-foreground-subtle">
                      <ImageIcon aria-hidden="true" className="size-8" />
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h2 className="type-h4 text-foreground">
                    {item.title ?? "نمونه‌کار"}
                  </h2>

                  {item.description ? (
                    <p className="mt-2 type-body-sm leading-relaxed text-foreground-muted">
                      {item.description}
                    </p>
                  ) : null}

                  <div className="mt-auto pt-5">
                    <EngineerPortfolioRemoveButton id={item.id} />
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <Pagination
            page={pagination.page}
            pageCount={pagination.pageCount}
            ariaLabel={engineerPanelCopy.paginationLabel}
            pathname={pathname}
          />
        </>
      )}

      <EngineerPortfolioAddForm />
    </div>
  );
}
