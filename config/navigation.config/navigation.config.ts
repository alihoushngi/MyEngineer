import { siteConfig } from "@/config/site.config/site.config";
import { type ServiceCategory } from "@/config/services.config/services.config";

export const storePaths = {
  home: "/",
  search: "/search",
  articles: "/articles",
  knowledge: "/knowledge",
  faq: "/faq",
  about: "/about",
  contact: "/contact",
  careers: "/careers",
  forms: "/forms",
  terms: "/terms",
  privacy: "/privacy-policy",
  iphoneInstall: "/install/iphone",
  expertRegistration: siteConfig.joinHref,
  engineerLogin: "/engineer/login",
  engineerPanel: "/engineer",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  account: "/account",
} as const;

export type NavigationLink = {
  href: string;
  label: string;
};

export type NavigationGroup = {
  id: string;
  label: string;
  items: readonly NavigationLink[];
};

export const primaryNavigation: readonly NavigationLink[] = [
  { href: storePaths.home, label: "خانه" },
  { href: storePaths.articles, label: "مقالات" },
  { href: storePaths.knowledge, label: "دانش" },
  { href: storePaths.faq, label: "سوالات متداول" },
  { href: storePaths.about, label: "درباره ما" },
];

export const legalNavigation: readonly NavigationLink[] = [
  { href: storePaths.terms, label: "شرایط استفاده" },
  { href: storePaths.privacy, label: "حریم خصوصی" },
];

export const contentNavigation: readonly NavigationLink[] = [
  { href: storePaths.articles, label: "مقالات" },
  { href: storePaths.knowledge, label: "دانش" },
  { href: storePaths.faq, label: "سوالات متداول" },
];

export const companyNavigation: readonly NavigationLink[] = [
  { href: storePaths.about, label: "درباره ما" },
  { href: storePaths.contact, label: "تماس با ما" },
  { href: storePaths.careers, label: "فرصت‌های شغلی" },
  { href: storePaths.forms, label: "فرم‌های قابل‌دانلود" },
  { href: storePaths.iphoneInstall, label: "نصب روی آیفون" },
];

export function buildServicesNavigation(
  categories: readonly ServiceCategory[],
): NavigationGroup {
  return {
    id: "services",
    label: "خدمات",
    items: categories.map((service) => ({
      href: service.href,
      label: service.label,
    })),
  };
}

export function buildFooterNavigation(
  categories: readonly ServiceCategory[],
): readonly NavigationGroup[] {
  return [
    {
      id: "services",
      label: "خدمات",
      items: buildServicesNavigation(categories).items,
    },
    {
      id: "content",
      label: "محتوا",
      items: contentNavigation,
    },
    {
      id: "company",
      label: "درباره ما",
      items: companyNavigation,
    },
    {
      id: "legal",
      label: "قوانین",
      items: legalNavigation,
    },
  ];
}

export const mobileUtilityNavigation: readonly NavigationLink[] = [
  ...legalNavigation,
];

export const joinNavigation: NavigationLink = {
  href: siteConfig.joinHref,
  label: siteConfig.joinLabel,
};

export const engineerLoginNavigation: NavigationLink = {
  href: storePaths.engineerLogin,
  label: "ورود مهندس",
};

export const engineerPanelNavigation: NavigationLink = {
  href: storePaths.engineerPanel,
  label: "پنل مهندس",
};

export const userLoginNavigation: NavigationLink = {
  href: storePaths.login,
  label: "ورود / ثبت‌نام",
};

export const userAccountNavigation: NavigationLink = {
  href: storePaths.account,
  label: "حساب من",
};

export function isActivePath(pathname: string, href: string): boolean {
  if (href === storePaths.home) {
    return pathname === storePaths.home;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function isServicesPath(pathname: string): boolean {
  return pathname === "/services" || pathname.startsWith("/services/");
}
