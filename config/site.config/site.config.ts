export const siteConfig = {
  name: "مهندس من",
  homeHref: "/",
  joinHref: "/expert-registration",
  joinLabel: "ثبت‌نام متخصص",
  engineerLoginHref: "/engineer/login",
  engineerLoginLabel: "ورود مهندس",
  engineerPanelHref: "/engineer",
  engineerPanelLabel: "پنل مهندس",
  userLoginHref: "/login",
  userRegisterHref: "/register",
  userAccountHref: "/account",
  userLoginLabel: "ورود / ثبت‌نام",
  userAccountLabel: "حساب من",
} as const;

export type SiteConfig = typeof siteConfig;

export const footerDefaults = {
  name: siteConfig.name,
  tagline:
    "بازار تخصصی معرفی و مقایسه متخصصان ساختمان، بر پایه تخصص، شهر و سابقه حرفه‌ای.",
  address: "",
  phones: [] as readonly { label: string; number: string }[],
  email: null as string | null,
  socials: [] as readonly { key: string; label: string; url: string }[],
  copyright: `تمامی حقوق برای ${siteConfig.name} محفوظ است.`,
  legalLine: "استفاده از مطالب و خدمات سایت مشمول قوانین و مقررات مهندس من است.",
} as const;
