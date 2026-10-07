import Link from "next/link";
import {
  ArrowUpLeftIcon,
  FacebookIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SendIcon,
  TwitterIcon,
  YoutubeIcon,
  type LucideIcon,
} from "lucide-react";

import { NewsletterSubscribeForm } from "@/components/common/newsletterSubscribeForm/newsletterSubscribeForm";
import { BrandLogo } from "@/components/layout/brandLogo/brandLogo";
import { JoinLink } from "@/components/layout/joinLink/joinLink";

import {
  isFooterFeatureEnabled,
  isPageEnabled,
} from "@/config/feature-flags.config/feature-flags.config";
import { buildFooterNavigation } from "@/config/navigation.config/navigation.config";
import { footerDefaults, siteConfig } from "@/config/site.config/site.config";
import { listServiceCategories } from "@/services/lookup-service/lookup-service";
import { getSiteSettings } from "@/services/site-settings-service/site-settings-service";

const socialIcons: Record<string, LucideIcon> = {
  instagram: InstagramIcon,
  telegram: SendIcon,
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  x: TwitterIcon,
  linkedin: LinkedinIcon,
  youtube: YoutubeIcon,
  whatsapp: PhoneIcon,
  aparat: GlobeIcon,
};

const contactLinkClass =
  "inline-flex min-h-8 items-center gap-2 rounded-lg type-body-sm text-primary-deep-foreground/60 outline-none transition-colors duration-200 ease-in-out hover:text-primary-deep-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary-deep";

function toTelHref(number: string): string {
  return `tel:${number.replace(/[^\d+]/g, "")}`;
}

export async function StoreFooter() {
  const [serviceCategories, settings] = await Promise.all([
    listServiceCategories().catch(() => []),
    getSiteSettings(),
  ]);
  const footerNavigation = buildFooterNavigation(serviceCategories);

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
              {settings.tagline}
            </p>

            {settings.address || settings.phones.length > 0 || settings.email ? (
              <address className="mt-5 space-y-1 not-italic">
                {settings.address ? (
                  <p className="flex items-start gap-2 type-body-sm leading-relaxed text-primary-deep-foreground/60">
                    <MapPinIcon
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-primary"
                    />
                    <span>{settings.address}</span>
                  </p>
                ) : null}
                {settings.phones.map((phone) => (
                  <a
                    key={`${phone.label}-${phone.number}`}
                    href={toTelHref(phone.number)}
                    className={contactLinkClass}
                  >
                    <PhoneIcon
                      aria-hidden="true"
                      className="size-4 shrink-0 text-primary"
                    />
                    {phone.label ? <span>{phone.label}:</span> : null}
                    <span dir="ltr">{phone.number}</span>
                  </a>
                ))}
                {settings.email ? (
                  <a href={`mailto:${settings.email}`} className={contactLinkClass}>
                    <MailIcon
                      aria-hidden="true"
                      className="size-4 shrink-0 text-primary"
                    />
                    <span dir="ltr">{settings.email}</span>
                  </a>
                ) : null}
              </address>
            ) : null}

            {settings.socials.length > 0 ? (
              <ul
                aria-label="شبکه‌های اجتماعی"
                className="mt-4 flex flex-wrap items-center gap-2"
              >
                {settings.socials.map((social) => {
                  const Icon = socialIcons[social.key] ?? GlobeIcon;
                  return (
                    <li key={`${social.key}-${social.url}`}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="inline-flex size-10 items-center justify-center rounded-full border border-primary-deep-foreground/15 bg-primary-deep-foreground/5 text-primary-deep-foreground/70 outline-none transition-all duration-200 ease-in-out hover:border-primary/30 hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-primary-deep"
                      >
                        <Icon aria-hidden="true" className="size-4" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : null}

            {isPageEnabled("expertRegistration") ? (
              <JoinLink
                size="sm"
                variant="outline"
                className="mt-6 border-primary-deep-foreground/15 bg-primary-deep-foreground/5 text-primary-deep-foreground backdrop-blur-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary hover:text-primary-foreground hover:shadow-md motion-reduce:transform-none"
              />
            ) : null}

            {isFooterFeatureEnabled("newsletter") ? (
              <NewsletterSubscribeForm />
            ) : null}
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
                      <li key={`${group.id}-${item.href}`}>
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

          <div className="space-y-1 type-caption text-primary-deep-foreground/35 sm:text-end">
            <p>{settings.copyright}</p>
            <p>{footerDefaults.legalLine}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
