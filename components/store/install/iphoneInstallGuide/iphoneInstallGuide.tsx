import { InfoIcon, SmartphoneIcon, WifiIcon } from "lucide-react";

import { InstallStatusBanner } from "@/components/store/install/iphoneInstallGuide/installStatus";
import { IphoneInstallSteps } from "@/components/store/install/iphoneInstallGuide/iphoneInstallSteps";

export function IphoneInstallGuide() {
  return (
    <div className="relative isolate overflow-hidden bg-background-subtle py-page">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-s-48 top-10 -z-10 size-120 rounded-full bg-primary/5 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-e-48 bottom-10 -z-10 size-120 rounded-full bg-secondary/5 blur-[150px]"
      />

      <div className="container-app">
        <section className="mx-auto max-w-3xl text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-primary/10 bg-primary-subtle text-primary shadow-xs">
            <SmartphoneIcon aria-hidden="true" className="size-7" />
          </span>

          <h1 className="mt-5 type-display text-foreground">
            نصب مهندس من روی آیفون
          </h1>

          <p className="mx-auto mt-4 max-w-2xl type-body-lg leading-relaxed text-foreground-muted">
            برای دسترسی سریع‌تر، وب‌اپ مهندس من را با Safari به صفحه اصلی آیفون
            اضافه کنید. این فرایند دستی است و به App Store نیاز ندارد.
          </p>
        </section>

        <div className="mx-auto mt-8 max-w-3xl">
          <InstallStatusBanner />
        </div>

        <div className="mt-10 sm:mt-12">
          <IphoneInstallSteps />
        </div>

        <aside className="mx-auto mt-10 max-w-3xl rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary">
              <InfoIcon aria-hidden="true" className="size-5" />
            </span>
            <h2 className="type-h4 text-foreground">نکته‌های مهم</h2>
          </div>

          <ul className="mt-5 grid gap-3">
            <li className="flex items-start gap-3 rounded-xl bg-surface-subtle p-3">
              <WifiIcon
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-primary"
              />
              <p className="type-body-sm leading-relaxed text-foreground-muted">
                برای اولین بار، صفحه را با اینترنت باز کنید.
              </p>
            </li>

            <li className="relative rounded-xl bg-surface-subtle p-3 ps-8 type-body-sm leading-relaxed text-foreground-muted">
              <span
                aria-hidden="true"
                className="absolute inset-s-3 top-[1.15rem] size-1.5 rounded-full bg-primary"
              />
              ظاهر و محل گزینه‌ها ممکن است در نسخه‌های مختلف iOS کمی تغییر کند.
            </li>

            <li className="relative rounded-xl bg-surface-subtle p-3 ps-8 type-body-sm leading-relaxed text-foreground-muted">
              <span
                aria-hidden="true"
                className="absolute inset-s-3 top-[1.15rem] size-1.5 rounded-full bg-primary"
              />
              قابلیت آفلاین محدود است؛ صفحات عمومی بازدیدشده و صفحه راهنمای
              آفلاین در دسترس می‌مانند، اما جست‌وجو، API و ثبت‌نام به اینترنت
              نیاز دارند.
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
