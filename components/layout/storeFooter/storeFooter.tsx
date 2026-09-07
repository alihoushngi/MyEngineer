import Link from "next/link";
import { ArrowUpLeftIcon } from "lucide-react";

import { BrandLogo } from "@/components/layout/brandLogo/brandLogo";
import { JoinLink } from "@/components/layout/joinLink/joinLink";

import { footerNavigation } from "@/config/navigation.config/navigation.config";
import { siteConfig } from "@/config/site.config/site.config";

export function StoreFooter() {
  return (
    <footer className="relative isolate mt-auto overflow-hidden border-t border-primary-deep-foreground/10 bg-primary-deep text-primary-deep-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-48 -top-48 -z-10 size-120 rounded-full bg-primary/12 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-56 -inset-e-44 -z-10 size-128 rounded-full bg-secondary/10 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary-deep-foreground/20 to-transparent"
      />

      <div className="container-app pt-section pb-[max(var(--space-section-y),env(safe-area-inset-bottom))]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.4fr)] lg:gap-16 xl:gap-20">
          <div className="max-w-sm">
            <BrandLogo className="text-primary-deep-foreground" />

            <p className="mt-4 type-body-sm leading-relaxed text-primary-deep-foreground/60">
              بازار تخصصی معرفی و مقایسه متخصصان ساختمان، بر پایه تخصص، شهر و
              سابقه حرفه‌ای.
            </p>

            <JoinLink
              size="sm"
              variant="outline"
              className="mt-6 border-primary-deep-foreground/15 bg-primary-deep-foreground/5 text-primary-deep-foreground backdrop-blur-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary hover:text-primary-foreground hover:shadow-md motion-reduce:transform-none"
            />
          </div>

          <nav aria-label="پیوندهای پاورقی">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-4 lg:gap-x-8">
              {footerNavigation.map((group) => (
                <div key={group.id} className="min-w-0">
                  <h2 className="type-label font-semibold text-primary-deep-foreground">
                    {group.label}
                  </h2>

                  <ul className="mt-3 space-y-1">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="group inline-flex min-h-10 items-center gap-1.5 wrap-break-word rounded-lg type-body-sm text-primary-deep-foreground/55 outline-none transition-all duration-200 ease-in-out hover:text-primary-deep-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary-deep"
                        >
                          <span>{item.label}</span>
                          <ArrowUpLeftIcon
                            aria-hidden="true"
                            className="size-3.5 shrink-0 translate-x-1 translate-y-1 text-primary-deep-foreground/0 transition-all duration-200 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-primary motion-reduce:transform-none"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-primary-deep-foreground/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-caption text-primary-deep-foreground/45">
            {siteConfig.name} — انتخاب آگاهانه برای پروژه‌های ساختمانی
          </p>

          <p className="type-caption text-primary-deep-foreground/35">
            تمامی حقوق برای {siteConfig.name} محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}
