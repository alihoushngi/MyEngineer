import Link from "next/link";

import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { ContactMessageForm } from "@/components/store/contact/contactMessageForm/contactMessageForm";
import { siteConfig } from "@/config/site.config/site.config";
import { storePaths } from "@/config/navigation.config/navigation.config";

export function ContactPage() {
  return (
    <div className="pb-section">
      <div className="container-wide py-page">
        <StoreBreadcrumb
          items={[
            { label: "خانه", href: siteConfig.homeHref },
            { label: "تماس با ما", href: storePaths.contact },
          ]}
        />
      </div>

      <section className="container-app grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
        <div className="max-w-xl">
          <p className="type-caption font-semibold text-primary">ارتباط</p>
          <h1 className="mt-3 type-h1 text-foreground">تماس با ما</h1>
          <p className="mt-4 type-body leading-relaxed text-foreground-muted">
            پیام خود را از این فرم بفرستید. برای پیگیری پس از ورود، از بخش
            پشتیبانی حساب هم می‌توانید تیکت ثبت کنید.
          </p>
          <p className="mt-6 type-body-sm text-foreground-muted">
            یا به{" "}
            <Link
              href={storePaths.about}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              درباره ما
            </Link>{" "}
            سر بزنید.
          </p>
        </div>

        <ContactMessageForm />
      </section>
    </div>
  );
}
