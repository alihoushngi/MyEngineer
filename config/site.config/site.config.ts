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
  tagline: "ساده سازی ارتباط با مهندسین و متخصصین حوزه ساخت و ساز کشور",
  address:
    "گیلان - رشت - پیاده راه فرهنگی شهرداری رشت - کوچه مهربان - ساختمان احمد پناه - واحد 1",
  phones: [
    { label: "", number: "013-32442501" },
    { label: "", number: "0996-5794766" },
  ] as readonly { label: string; number: string }[],
  email: null as string | null,
  socials: [] as readonly { key: string; label: string; url: string }[],
  copyright:
    "تمام حقوق این سایت متعلق به شرکت هیرکان است و هرگونه کپی برداری و استفاده از داده های سایت پیگرد قانونی دارد © 2025",
  legalLine:
    "استفاده از مطالب و خدمات سایت مشمول قوانین و مقررات مهندس من است.",
} as const;
