import Image from "next/image";
import Link from "next/link";
import { DownloadIcon } from "lucide-react";

import { ContentFilterBar } from "@/components/common/contentFilterBar/contentFilterBar";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";
import { siteConfig } from "@/config/site.config/site.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import {
  type CareerListItem,
  type DownloadableFormItem,
  type FormCategoryOption,
} from "@/services/content-service/content-service";

const loadErrorCopy = {
  title: "دریافت اطلاعات ممکن نشد",
  description: "اتصال به سرور برقرار نشد. کمی بعد دوباره تلاش کنید.",
} as const;

type CareersPageProps = {
  careers: readonly CareerListItem[];
  loadFailed?: boolean;
};

export function CareersPage({ careers, loadFailed = false }: CareersPageProps) {
  return (
    <div className="pb-section">
      <div className="container-wide py-page">
        <StoreBreadcrumb
          items={[
            { label: "خانه", href: siteConfig.homeHref },
            { label: "فرصت‌های شغلی", href: storePaths.careers },
          ]}
        />
      </div>

      <section className="container-app">
        <h1 className="type-h1 text-foreground">فرصت‌های شغلی</h1>
        <p className="mt-3 max-w-2xl type-body text-foreground-muted">
          آگهی‌های فعال همکاری در مهندس من.
        </p>

        {loadFailed ? (
          <div className="mt-10">
            <Empty
              title={loadErrorCopy.title}
              description={loadErrorCopy.description}
            />
          </div>
        ) : careers.length === 0 ? (
          <div className="mt-10">
            <Empty title="در حال حاضر آگهی فعالی نیست" />
          </div>
        ) : (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {careers.map((career) => (
              <li key={career.id}>
                <Link
                  href={career.href}
                  className="flex h-full flex-col overflow-hidden rounded-3xl border border-border-subtle bg-surface shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/20 motion-reduce:transform-none"
                >
                  {career.imageSrc ? (
                    <div className="relative aspect-16/10 bg-surface-subtle">
                      <Image
                        src={career.imageSrc}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <p className="type-caption font-semibold text-primary">
                      {career.typeLabel}
                    </p>
                    <h2 className="type-h4 text-foreground">{career.title}</h2>
                    <p className="type-body-sm text-foreground-muted">
                      {career.summary}
                    </p>
                    <p className="mt-auto pt-3 type-caption text-foreground-subtle">
                      {[career.provinceLabel, career.cityLabel]
                        .filter(Boolean)
                        .join(" · ") || "سراسر کشور"}
                      {career.salaryLabel ? ` · ${career.salaryLabel}` : ""}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

type FormsPageProps = {
  forms: readonly DownloadableFormItem[];
  loadFailed?: boolean;
  q?: string;
  category?: string;
  province?: string;
  categories?: readonly FormCategoryOption[];
  provinces?: readonly { id: string; name: string }[];
};

export function FormsPage({
  forms,
  loadFailed = false,
  q = "",
  category = "",
  province = "",
  categories = [],
  provinces = [],
}: FormsPageProps) {
  const selects = [
    ...(categories.length > 0
      ? [
          {
            param: "category",
            label: "فیلتر دسته‌بندی فرم",
            allLabel: "همه دسته‌ها",
            value: category,
            options: categories.map((item) => ({
              value: item.id,
              label: item.name,
            })),
          },
        ]
      : []),
    ...(provinces.length > 0
      ? [
          {
            param: "province",
            label: "فیلتر استان",
            allLabel: "همه استان‌ها",
            value: province,
            options: provinces.map((item) => ({
              value: item.id,
              label: item.name,
            })),
          },
        ]
      : []),
  ];

  return (
    <div className="pb-section">
      <div className="container-wide py-page">
        <StoreBreadcrumb
          items={[
            { label: "خانه", href: siteConfig.homeHref },
            { label: "فرم‌های قابل‌دانلود", href: storePaths.forms },
          ]}
        />
      </div>

      <section className="container-app">
        <h1 className="type-h1 text-foreground">فرم‌های قابل‌دانلود</h1>
        <p className="mt-3 max-w-2xl type-body text-foreground-muted">
          فرم‌های فعال برای دانلود و استفاده در فرآیندهای اداری و فنی.
        </p>

        <div className="mt-8">
          <ContentFilterBar
            q={q}
            searchLabel="جستجو در فرم‌ها"
            searchPlaceholder="جستجو در فرم‌ها..."
            selects={selects}
          />
        </div>

        {loadFailed ? (
          <div className="mt-10">
            <Empty
              title={loadErrorCopy.title}
              description={loadErrorCopy.description}
            />
          </div>
        ) : forms.length === 0 ? (
          <div className="mt-10">
            <Empty title="فرمی برای نمایش نیست" />
          </div>
        ) : (
          <ul className="mt-10 divide-y divide-border-subtle rounded-3xl border border-border-subtle bg-surface shadow-xs">
            {forms.map((form) => (
              <li
                key={form.id}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h2 className="type-h4 text-foreground">{form.name}</h2>
                  <p className="mt-1 type-caption text-foreground-muted">
                    {form.provinceName ? `${form.provinceName} · ` : ""}
                    {form.downloadsLabel} دانلود
                  </p>
                </div>
                <Button asChild variant="outline" className="min-h-11 gap-2">
                  <a href={form.downloadHref} rel="noopener noreferrer">
                    <DownloadIcon aria-hidden="true" className="size-4" />
                    دانلود
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
