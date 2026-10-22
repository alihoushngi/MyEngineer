import Link from "next/link";
import {
  FacebookIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedinIcon,
  PhoneIcon,
  SendIcon,
  TwitterIcon,
  YoutubeIcon,
  type LucideIcon,
} from "lucide-react";

import { NewsletterSubscribeForm } from "@/components/common/newsletterSubscribeForm/newsletterSubscribeForm";
import { JoinLink } from "@/components/layout/joinLink/joinLink";
import {
  isFooterFeatureEnabled,
  isPageEnabled,
} from "@/config/feature-flags.config/feature-flags.config";
import {
  buildFooterNavigation,
  legalNavigation,
  storePaths,
} from "@/config/navigation.config/navigation.config";
import { footerDefaults, siteConfig } from "@/config/site.config/site.config";
import { type ServiceCategory } from "@/config/services.config/services.config";
import {
  getSiteSettings,
  type SiteSettings,
} from "@/services/site-settings-service/site-settings-service";
import { listServiceCategories } from "@/services/lookup-service/lookup-service";

const socialIcons: Record<string, LucideIcon> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedinIcon,
  telegram: SendIcon,
  twitter: TwitterIcon,
  x: TwitterIcon,
  youtube: YoutubeIcon,
  whatsapp: PhoneIcon,
  aparat: GlobeIcon,
};

const referenceSocials = [
  { key: "telegram", label: "تلگرام مهندس من" },
  { key: "youtube", label: "یوتیوب مهندس من" },
  { key: "whatsapp", label: "واتساپ مهندس من" },
  { key: "instagram", label: "اینستاگرام مهندس من" },
  { key: "linkedin", label: "لینکدین مهندس من" },
] as const;

const contractorServiceLabels = [
  "استادکار دیوار چینی",
  "استادکار لوله کشی",
  "پیمانکار بازسازی منازل و دفاتر کار",
  "پیمانکار اجرای اسکلت بتنی",
];

const referenceServiceMatches = [
  /پروانه|permit/i,
  /طراحی[\s-]*داخلی|interior/i,
  /ترسیم[\s-]*نقشه|drawing/i,
];

const referenceSocialKeys = new Set<string>(
  referenceSocials.map(({ key }) => key),
);

const referenceSocialPaths: Record<string, string> = {
  telegram:
    "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z",
  youtube:
    "M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408z",
  whatsapp:
    "M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z",
  instagram:
    "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334",
  linkedin:
    "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4",
};

const socialColorClasses: Record<string, string> = {
  instagram: "text-[#d63384]",
  linkedin: "text-[#0d6efd]",
  telegram: "text-[var(--client-color-info)]",
  whatsapp: "text-[#198754]",
  youtube: "text-[#dc3545]",
};

export type StoreFooterPreviewData = {
  serviceCategories: readonly ServiceCategory[];
  settings: SiteSettings;
};

type StoreFooterProps = {
  previewData?: StoreFooterPreviewData;
  siteWide?: boolean;
};

function toTelHref(number: string): string {
  return `tel:${number.replace(/[^\d+]/g, "")}`;
}

function getFooterSocials(socials: SiteSettings["socials"]) {
  const referenceItems = referenceSocials.flatMap(({ key, label }) => {
    const configured = socials.filter((social) => social.key === key);
    return configured.length > 0 ? configured : [{ key, label, url: "" }];
  });

  return [
    ...referenceItems,
    ...socials.filter((social) => !referenceSocialKeys.has(social.key)),
  ];
}

function SocialIcon({ platform }: { platform: string }) {
  const className = `size-[25px] shrink-0 ${socialColorClasses[platform] ?? "text-[var(--client-color-white)]"}`;
  const referencePath = referenceSocialPaths[platform];

  if (referencePath) {
    return (
      <svg
        aria-hidden="true"
        className={className}
        fill="currentColor"
        height="25"
        viewBox="0 0 16 16"
        width="25"
      >
        <path d={referencePath} />
      </svg>
    );
  }

  const Icon = socialIcons[platform] ?? GlobeIcon;
  return <Icon aria-hidden="true" className={className} />;
}

function getReferenceServiceCategories(categories: readonly ServiceCategory[]) {
  const remaining = new Set(categories);
  const featured = referenceServiceMatches.flatMap((pattern) => {
    const category = categories.find(
      (item) =>
        remaining.has(item) &&
        pattern.test(`${item.slug} ${item.label} ${item.href}`),
    );
    if (!category) return [];
    remaining.delete(category);
    return [category];
  });

  if (featured.length === 0) {
    return { featured: categories.slice(0, 3), additional: categories.slice(3) };
  }

  return {
    featured,
    additional: categories.filter((category) => remaining.has(category)),
  };
}

export async function StoreFooter({
  previewData,
  siteWide = true,
}: StoreFooterProps = {}) {
  const [serviceCategories, settings] = previewData
    ? [previewData.serviceCategories, previewData.settings]
    : await Promise.all([
        listServiceCategories().catch(() => []),
        getSiteSettings(),
      ]);
  const footerNavigation = buildFooterNavigation(serviceCategories).filter(
    (group) => group.id !== "legal",
  );
  const serviceGroup = footerNavigation.find((group) => group.id === "services");
  const contentGroup = footerNavigation.find((group) => group.id === "content");
  const companyGroup = footerNavigation.find((group) => group.id === "company");
  const { featured: referenceServiceCategories, additional: additionalServiceCategories } =
    getReferenceServiceCategories(serviceGroup?.items.length ? serviceCategories : []);
  const aboutLink = companyGroup?.items.find((item) => item.href === storePaths.about);
  const visibleCompanyLink = aboutLink ?? companyGroup?.items[0];
  const additionalCompanyLinks = companyGroup?.items.filter(
    (item) => item !== visibleCompanyLink,
  ) ?? [];
  const contentLabels: Record<string, string> = {
    [storePaths.articles]: "وبلاگ مهندس من",
    [storePaths.faq]: "سوالات متداول",
    [storePaths.knowledge]: "پایگاه دانش",
  };
  const contentLinks = (contentGroup?.items ?? []).map((item) => ({
    ...item,
    label: contentLabels[item.href] ?? item.label,
  }));
  const legalLabels: Record<string, string> = {
    [storePaths.privacy]: "سیاست حفظ حریم خصوصی",
    [storePaths.terms]: "شرایط استفاده",
  };
  const legalLinks = [...legalNavigation].reverse().map((item) => ({
    ...item,
    label: legalLabels[item.href] ?? item.label,
  }));
  const allFooterSocials = getFooterSocials(settings.socials);
  const featuredSocials = referenceSocials.map(
    ({ key, label }) =>
      allFooterSocials.find((social) => social.key === key) ?? {
        key,
        label,
        url: "",
      },
  );
  const additionalSocials = allFooterSocials.filter(
    (social) => !featuredSocials.includes(social),
  );
  const newsletterEnabled = isFooterFeatureEnabled("newsletter");
  const hasFooterDetails =
    additionalServiceCategories.length > 0 ||
    additionalCompanyLinks.length > 0 ||
    additionalSocials.length > 0 ||
    Boolean(settings.email) ||
    newsletterEnabled ||
    Boolean(footerDefaults.legalLine);
  const footerSectionId = (name: string) =>
    `${siteWide ? "" : "preview-"}footer-${name}`;
  const renderSocial = (social: (typeof allFooterSocials)[number], index: number) => {
    const label = social.label || `${social.key} مهندس من`;
    return (
      <li key={`${social.key}-${social.url}-${index}`}>
        {social.url ? (
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex size-[25px] items-center justify-center rounded-full outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--client-color-focus)] sm:size-8"
          >
            <SocialIcon platform={social.key} />
          </a>
        ) : (
          <span role="img" aria-label={label} className="flex size-[25px] items-center justify-center sm:size-8">
            <SocialIcon platform={social.key} />
          </span>
        )}
      </li>
    );
  };
  const footerDetails = hasFooterDetails ? (
    <details className="inline-block min-w-0 text-[length:var(--client-font-size-12)] leading-[var(--client-line-height-body)] [&[open]]:basis-full md:basis-full md:mb-2">
      <summary className="min-h-6 cursor-pointer rounded-sm px-2 text-[length:var(--client-font-size-12)] leading-[var(--client-line-height-body)] text-[var(--client-color-white)] marker:text-[var(--client-color-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--client-color-focus)]">
        خدمات و اطلاعات بیشتر
      </summary>
      <div className="mt-2">
        {additionalServiceCategories.length ? (
          <section aria-labelledby={footerSectionId("additional-services")}>
            <h3
              id={footerSectionId("additional-services")}
              className="mb-[0.2rem] text-[length:var(--client-font-size-14)] leading-[1.2] text-[var(--client-color-primary)]"
            >
              سایر خدمات
            </h3>
            <ul className="mb-[var(--client-space-md)] list-none ps-10 pe-8">
              {additionalServiceCategories.map((item) => (
                <li key={`additional-service-${item.href}`}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-6 max-w-full items-center justify-center break-words rounded-sm px-2 text-[length:var(--client-font-size-12)] leading-[var(--client-line-height-body)] text-[var(--client-color-white)] outline-none hover:text-[var(--client-color-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--client-color-focus)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {additionalCompanyLinks.length || isPageEnabled("expertRegistration") ? (
          <section aria-labelledby={footerSectionId("additional-company")}>
            <h3
              id={footerSectionId("additional-company")}
              className="mb-[0.2rem] text-[length:var(--client-font-size-14)] leading-[1.2] text-[var(--client-color-primary)]"
            >
              پیوندهای بیشتر
            </h3>
            <ul className="mb-[var(--client-space-md)] list-none ps-10 pe-8">
              {additionalCompanyLinks.map((item) => (
                <li key={`company-${item.href}`}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-6 max-w-full items-center justify-center break-words rounded-sm px-2 text-[length:var(--client-font-size-12)] leading-[var(--client-line-height-body)] text-[var(--client-color-white)] outline-none hover:text-[var(--client-color-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--client-color-focus)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {isPageEnabled("expertRegistration") ? (
                <li>
                  <JoinLink
                    size="sm"
                    variant="ghost"
                    className="min-h-6 rounded-sm px-2 text-[length:var(--client-font-size-12)] text-[var(--client-color-white)] hover:bg-transparent hover:text-[var(--client-color-primary)] focus-visible:ring-[var(--client-color-focus)]"
                  />
                </li>
              ) : null}
            </ul>
          </section>
        ) : null}
        {additionalSocials.length ? (
          <ul aria-label="شبکه‌های اجتماعی بیشتر" className="my-2 flex flex-wrap justify-center gap-2">
            {additionalSocials.map(renderSocial)}
          </ul>
        ) : null}
        {settings.email ? (
          <p className="my-2">
            <a href={`mailto:${settings.email}`} dir="ltr" className="break-all">
              {settings.email}
            </a>
          </p>
        ) : null}
        {newsletterEnabled ? (
          <div className="mx-auto w-full max-w-md text-start">
            <NewsletterSubscribeForm />
          </div>
        ) : null}
        {footerDefaults.legalLine ? (
          <p className="my-2 break-words text-[length:var(--client-font-size-8)]">
            {footerDefaults.legalLine}
          </p>
        ) : null}
      </div>
    </details>
  ) : null;

  return (
    <footer
      id={siteWide ? "site-footer" : undefined}
      aria-label="اطلاعات پایانی سایت"
      className="mt-auto w-full shrink-0 bg-[var(--client-color-secondary)] px-2 text-center text-[var(--client-color-white)]"
      dir="rtl"
    >
      <h2 className="mb-2 px-2 py-4 text-[length:var(--client-font-size-18)] leading-[1.2]">
        {settings.name || siteConfig.name}
      </h2>

      <p className="mx-4 my-2 break-words text-[length:var(--client-font-size-12)] leading-[var(--client-line-height-body)]">
        {settings.tagline || footerDefaults.tagline}
      </p>

      <nav aria-label="پیوندهای پاورقی">
        {referenceServiceCategories.length ? (
          <section aria-labelledby={footerSectionId("nav-services")}>
            <h3
              id={footerSectionId("nav-services")}
              className="mb-[0.2rem] text-[length:var(--client-font-size-14)] leading-[1.2] text-[var(--client-color-primary)]"
            >
              خدمات مهندسی
            </h3>
            <ul className="mb-[var(--client-space-md)] list-none ps-10 pe-8">
              {referenceServiceCategories.map((item) => (
                <li key={`services-${item.href}`}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-6 max-w-full items-center justify-center break-words rounded-sm px-2 text-[length:var(--client-font-size-12)] leading-[var(--client-line-height-body)] text-[var(--client-color-white)] outline-none transition-colors duration-200 hover:text-[var(--client-color-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--client-color-focus)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section aria-labelledby={footerSectionId("nav-contractors")}>
          <h3
            id={footerSectionId("nav-contractors")}
            className="mb-[0.2rem] text-[length:var(--client-font-size-14)] leading-[1.2] text-[var(--client-color-primary)]"
          >
            خدمات استادکاری و پیمانکاری
          </h3>
          <ul className="mb-[var(--client-space-md)] list-none ps-10 pe-8 text-[length:var(--client-font-size-12)] leading-[var(--client-line-height-body)]">
            {contractorServiceLabels.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        </section>

        {contentLinks.length ? (
          <section aria-labelledby={footerSectionId("nav-content")}>
            <h3
              id={footerSectionId("nav-content")}
              className="mb-[0.2rem] text-[length:var(--client-font-size-14)] leading-[1.2] text-[var(--client-color-primary)]"
            >
              منابع
            </h3>
            <ul className="mb-[var(--client-space-md)] list-none ps-10 pe-8">
              {contentLinks.map((item) => (
                <li key={`content-${item.href}`}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-6 max-w-full items-center justify-center break-words rounded-sm px-2 text-[length:var(--client-font-size-12)] leading-[var(--client-line-height-body)] text-[var(--client-color-white)] outline-none transition-colors duration-200 hover:text-[var(--client-color-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--client-color-focus)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {visibleCompanyLink ? (
          <section aria-labelledby={footerSectionId("nav-company")}>
            <h3
              id={footerSectionId("nav-company")}
              className="mb-[0.2rem] text-[length:var(--client-font-size-14)] leading-[1.2] text-[var(--client-color-primary)]"
            >
              شرکت
            </h3>
            <ul className="mb-[var(--client-space-md)] list-none ps-10 pe-8">
              <li className="flex flex-wrap items-center justify-center gap-x-2">
                <Link
                  href={visibleCompanyLink.href}
                  className="inline-flex min-h-6 max-w-full items-center justify-center break-words rounded-sm px-2 text-[length:var(--client-font-size-12)] leading-[var(--client-line-height-body)] text-[var(--client-color-white)] outline-none transition-colors duration-200 hover:text-[var(--client-color-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--client-color-focus)]"
                >
                  {visibleCompanyLink.label}
                </Link>
                {footerDetails}
              </li>
            </ul>
          </section>
        ) : null}
      </nav>

      {!visibleCompanyLink ? footerDetails : null}

      <ul
        aria-label="شبکه‌های اجتماعی"
        className="my-4 grid grid-cols-5 justify-items-center gap-x-2 px-8"
      >
        {featuredSocials.map(renderSocial)}
      </ul>

      <section aria-labelledby={footerSectionId("contact-heading")}>
        <h3
          id={footerSectionId("contact-heading")}
          className="text-[length:var(--client-font-size-14)] leading-[1.2]"
        >
          آدرس
        </h3>
        {settings.address ? (
          <address className="mx-4 break-words not-italic text-[length:var(--client-font-size-8)]">
            <p className="mt-2 mb-0 break-words py-[0.1rem] text-[length:var(--client-font-size-12)] leading-[var(--client-line-height-body)]">
              {settings.address}
            </p>
          </address>
        ) : null}
        <p className="mt-2 mb-0 py-[0.1rem] text-[length:var(--client-font-size-12)] leading-[var(--client-line-height-body)]">
          تماس با واحد پشتیبانی پلتفرم
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-4">
          {settings.phones.map((phone) => (
            <a
              key={`${phone.label}-${phone.number}`}
              href={toTelHref(phone.number)}
              aria-label={phone.label ? `${phone.label}: ${phone.number}` : phone.number}
              className="inline-flex min-h-6 max-w-full flex-wrap items-center justify-center gap-x-1 rounded-sm px-2 text-[length:var(--client-font-size-10)] leading-[1.8] text-[var(--client-color-white)] outline-none hover:text-[var(--client-color-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--client-color-focus)]"
            >
              <bdi dir="ltr">{phone.number}</bdi>
            </a>
          ))}
        </div>
      </section>

      <section aria-label="پیوندهای قانونی و حقوق سایت" className="py-2">
        <nav
          aria-label="پیوندهای قانونی"
          className="flex flex-wrap items-center justify-center gap-x-6"
        >
          {legalLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-6 items-center rounded-sm px-2 text-[length:var(--client-font-size-10)] leading-[1.8] text-[var(--client-color-white)] outline-none hover:text-[var(--client-color-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--client-color-focus)] lg:px-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="mt-2 mb-4 break-words text-[length:var(--client-font-size-8)] leading-[1.8]">
          {settings.copyright || footerDefaults.copyright}
        </p>
      </section>
    </footer>
  );
}
