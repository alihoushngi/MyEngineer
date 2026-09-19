// کنترل نمایش فیچرها، صفحات و سکشن‌ها.
// هر مقدار را true یا false کنید. پس از تغییر، در صورت نیاز dev server را ری‌استارت کنید.
// false یعنی لینک از منو حذف می‌شود، سکشن رندر نمی‌شود، و مسیر مستقیم هم ۴۰۴ می‌شود.

export const FEATURE_UNAVAILABLE_PATH = "/feature-unavailable";

export type FeatureFlags = {
  pages: {
    home: boolean;
    search: boolean;
    articles: boolean;
    knowledge: boolean;
    faq: boolean;
    about: boolean;
    contact: boolean;
    careers: boolean;
    forms: boolean;
    terms: boolean;
    privacy: boolean;
    iphoneInstall: boolean;
    experts: boolean;
    services: boolean;
    userLogin: boolean;
    userRegister: boolean;
    forgotPassword: boolean;
    expertRegistration: boolean;
    engineerLogin: boolean;
    userAccount: boolean;
    engineerPanel: boolean;
  };
  homeSections: {
    hero: boolean;
    serviceCategories: boolean;
    marketplace: boolean;
    narrative: boolean;
    popularServices: boolean;
    drawingConsultation: boolean;
    whyMohandesMan: boolean;
    joinCta: boolean;
    testimonials: boolean;
    knowledgeTips: boolean;
    contentHighlights: boolean;
    faqEntry: boolean;
  };
  account: {
    dashboard: boolean;
    profile: boolean;
    requests: boolean;
    messages: boolean;
    support: boolean;
    saved: boolean;
    reviews: boolean;
    notifications: boolean;
    settings: boolean;
  };
  engineer: {
    dashboard: boolean;
    profile: boolean;
    services: boolean;
    serviceAreas: boolean;
    requests: boolean;
    messages: boolean;
    support: boolean;
    portfolio: boolean;
    credentials: boolean;
    reviews: boolean;
    notifications: boolean;
    settings: boolean;
  };
  footer: {
    newsletter: boolean;
  };
};

export type PageFlag = keyof FeatureFlags["pages"];
export type HomeSectionFlag = keyof FeatureFlags["homeSections"];
export type AccountFlag = keyof FeatureFlags["account"];
export type EngineerFlag = keyof FeatureFlags["engineer"];

export const featureFlags: FeatureFlags = {
  pages: {
    // صفحه خانه (/)
    home: true,
    // صفحه جستجو، دکمه جستجوی هدر و فرم جستجوی هیرو
    search: true,
    // صفحه مقالات و جزئیات هر مقاله
    articles: true,
    // صفحه پایگاه دانش و دسته‌های آن
    knowledge: true,
    // صفحه سوالات متداول و دسته‌های آن
    faq: true,
    // صفحه درباره ما
    about: true,
    // صفحه تماس با ما
    contact: true,
    // صفحه فرصت‌های شغلی و جزئیات هر موقعیت
    careers: true,
    // صفحه فرم‌های قابل‌دانلود
    forms: true,
    // صفحه شرایط استفاده
    terms: true,
    // صفحه حریم خصوصی
    privacy: true,
    // صفحه راهنمای نصب روی آیفون
    iphoneInstall: true,
    // پروفایل عمومی متخصص (/experts/[id]) و مارکت‌پلیس خانه
    experts: true,
    // صفحات خدمات (/services/[slug]) و منوی خدمات هدر
    services: true,
    // صفحه ورود کاربر (/login)
    userLogin: true,
    // صفحه ثبت‌نام کاربر (/register)
    userRegister: true,
    // صفحه بازیابی رمز عبور
    forgotPassword: true,
    // ویزارد ثبت‌نام متخصص و دکمه‌های عضویت
    expertRegistration: true,
    // صفحه ورود مهندس (/engineer/login)
    engineerLogin: true,
    // کل پنل حساب کاربری (/account)
    userAccount: true,
    // کل پنل مهندس (/engineer) به‌جز صفحه ورود
    engineerPanel: true,
  },
  homeSections: {
    // هیرو صفحه خانه (اسلایدر، جستجو و دعوت به عضویت)
    hero: true,
    // بخش دسته‌بندی خدمات در خانه
    serviceCategories: true,
    // بخش فهرست متخصصان در خانه
    marketplace: true,
    // بخش معرفی «مهندس من چیست؟»
    narrative: true,
    // بخش خدمات پرکاربرد
    popularServices: true,
    // بخش مشاوره ترسیم نقشه
    drawingConsultation: true,
    // بخش «چرا مهندس من؟»
    whyMohandesMan: true,
    // بخش دعوت متخصصان به عضویت
    joinCta: true,
    // بخش نظرات کاربران
    testimonials: true,
    // بخش نکته‌های پایگاه دانش در خانه
    knowledgeTips: true,
    // بخش میانبر مقالات، دانش و سوالات متداول
    contentHighlights: true,
    // بخش ورود به سوالات متداول در خانه
    faqEntry: true,
  },
  account: {
    // پیشخوان حساب کاربری
    dashboard: true,
    // صفحه اطلاعات حساب
    profile: true,
    // درخواست‌های کاربر
    requests: true,
    // پیام‌های کاربر
    messages: true,
    // پشتیبانی حساب کاربری
    support: true,
    // متخصصان ذخیره‌شده
    saved: true,
    // نظرات ثبت‌شده کاربر
    reviews: true,
    // اعلان‌های کاربر
    notifications: true,
    // تنظیمات حساب کاربری
    settings: true,
  },
  engineer: {
    // پیشخوان پنل مهندس
    dashboard: true,
    // پروفایل مهندس
    profile: true,
    // خدمات مهندس
    services: true,
    // محدوده فعالیت مهندس
    serviceAreas: true,
    // درخواست‌های مهندس
    requests: true,
    // پیام‌های مهندس
    messages: true,
    // پشتیبانی پنل مهندس
    support: true,
    // نمونه‌کارهای مهندس
    portfolio: true,
    // مدارک و صلاحیت‌ها
    credentials: true,
    // نظرات پنل مهندس
    reviews: true,
    // اعلان‌های مهندس
    notifications: true,
    // تنظیمات پنل مهندس
    settings: true,
  },
  footer: {
    // فرم عضویت خبرنامه در پاورقی
    newsletter: true,
  },
};

type PathMatch = "exact" | "prefix";

type PathRule = {
  path: string;
  match: PathMatch;
  enabled: boolean;
};

function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

function buildPathRules(flags: FeatureFlags): PathRule[] {
  return [
    { path: "/", match: "exact", enabled: flags.pages.home },
    { path: "/search", match: "prefix", enabled: flags.pages.search },
    { path: "/articles", match: "prefix", enabled: flags.pages.articles },
    { path: "/knowledge", match: "prefix", enabled: flags.pages.knowledge },
    { path: "/faq", match: "prefix", enabled: flags.pages.faq },
    { path: "/about", match: "prefix", enabled: flags.pages.about },
    { path: "/contact", match: "prefix", enabled: flags.pages.contact },
    { path: "/careers", match: "prefix", enabled: flags.pages.careers },
    { path: "/forms", match: "prefix", enabled: flags.pages.forms },
    { path: "/terms", match: "prefix", enabled: flags.pages.terms },
    {
      path: "/privacy-policy",
      match: "prefix",
      enabled: flags.pages.privacy,
    },
    {
      path: "/install/iphone",
      match: "prefix",
      enabled: flags.pages.iphoneInstall,
    },
    { path: "/experts", match: "prefix", enabled: flags.pages.experts },
    { path: "/services", match: "prefix", enabled: flags.pages.services },
    { path: "/login", match: "prefix", enabled: flags.pages.userLogin },
    { path: "/register", match: "prefix", enabled: flags.pages.userRegister },
    {
      path: "/forgot-password",
      match: "prefix",
      enabled: flags.pages.forgotPassword,
    },
    {
      path: "/expert-registration",
      match: "prefix",
      enabled: flags.pages.expertRegistration,
    },
    {
      path: "/engineer/login",
      match: "prefix",
      enabled: flags.pages.engineerLogin,
    },
    {
      path: "/account/profile",
      match: "prefix",
      enabled: flags.pages.userAccount && flags.account.profile,
    },
    {
      path: "/account/requests",
      match: "prefix",
      enabled: flags.pages.userAccount && flags.account.requests,
    },
    {
      path: "/account/messages",
      match: "prefix",
      enabled: flags.pages.userAccount && flags.account.messages,
    },
    {
      path: "/account/support",
      match: "prefix",
      enabled: flags.pages.userAccount && flags.account.support,
    },
    {
      path: "/account/saved",
      match: "prefix",
      enabled: flags.pages.userAccount && flags.account.saved,
    },
    {
      path: "/account/reviews",
      match: "prefix",
      enabled: flags.pages.userAccount && flags.account.reviews,
    },
    {
      path: "/account/notifications",
      match: "prefix",
      enabled: flags.pages.userAccount && flags.account.notifications,
    },
    {
      path: "/account/settings",
      match: "prefix",
      enabled: flags.pages.userAccount && flags.account.settings,
    },
    {
      path: "/account",
      match: "exact",
      enabled: flags.pages.userAccount && flags.account.dashboard,
    },
    {
      path: "/account",
      match: "prefix",
      enabled: flags.pages.userAccount,
    },
    {
      path: "/engineer/profile",
      match: "prefix",
      enabled: flags.pages.engineerPanel && flags.engineer.profile,
    },
    {
      path: "/engineer/services",
      match: "prefix",
      enabled: flags.pages.engineerPanel && flags.engineer.services,
    },
    {
      path: "/engineer/service-areas",
      match: "prefix",
      enabled: flags.pages.engineerPanel && flags.engineer.serviceAreas,
    },
    {
      path: "/engineer/requests",
      match: "prefix",
      enabled: flags.pages.engineerPanel && flags.engineer.requests,
    },
    {
      path: "/engineer/messages",
      match: "prefix",
      enabled: flags.pages.engineerPanel && flags.engineer.messages,
    },
    {
      path: "/engineer/support",
      match: "prefix",
      enabled: flags.pages.engineerPanel && flags.engineer.support,
    },
    {
      path: "/engineer/portfolio",
      match: "prefix",
      enabled: flags.pages.engineerPanel && flags.engineer.portfolio,
    },
    {
      path: "/engineer/credentials",
      match: "prefix",
      enabled: flags.pages.engineerPanel && flags.engineer.credentials,
    },
    {
      path: "/engineer/reviews",
      match: "prefix",
      enabled: flags.pages.engineerPanel && flags.engineer.reviews,
    },
    {
      path: "/engineer/notifications",
      match: "prefix",
      enabled: flags.pages.engineerPanel && flags.engineer.notifications,
    },
    {
      path: "/engineer/settings",
      match: "prefix",
      enabled: flags.pages.engineerPanel && flags.engineer.settings,
    },
    {
      path: "/engineer",
      match: "exact",
      enabled: flags.pages.engineerPanel && flags.engineer.dashboard,
    },
    {
      path: "/engineer",
      match: "prefix",
      enabled: flags.pages.engineerPanel,
    },
  ];
}

function comparePathRules(left: PathRule, right: PathRule): number {
  if (right.path.length !== left.path.length) {
    return right.path.length - left.path.length;
  }

  if (left.match === right.match) {
    return 0;
  }

  return left.match === "exact" ? -1 : 1;
}

function matchesPathRule(pathname: string, rule: PathRule): boolean {
  if (rule.match === "exact") {
    return pathname === rule.path;
  }

  return pathname === rule.path || pathname.startsWith(`${rule.path}/`);
}

export function isPathEnabledWith(
  pathname: string,
  flags: FeatureFlags,
): boolean {
  const normalized = normalizePathname(pathname);
  const rules = buildPathRules(flags).sort(comparePathRules);
  const rule = rules.find((item) => matchesPathRule(normalized, item));

  return rule ? rule.enabled : true;
}

export function isPathEnabled(pathname: string): boolean {
  return isPathEnabledWith(pathname, featureFlags);
}

export function isPageEnabled(
  page: PageFlag,
  flags: FeatureFlags = featureFlags,
): boolean {
  return flags.pages[page];
}

export function isAccountFeatureEnabled(
  feature: AccountFlag,
  flags: FeatureFlags = featureFlags,
): boolean {
  return flags.pages.userAccount && flags.account[feature];
}

export function isEngineerFeatureEnabled(
  feature: EngineerFlag,
  flags: FeatureFlags = featureFlags,
): boolean {
  return flags.pages.engineerPanel && flags.engineer[feature];
}

export function isFooterFeatureEnabled(
  feature: keyof FeatureFlags["footer"],
  flags: FeatureFlags = featureFlags,
): boolean {
  return flags.footer[feature];
}

export function shouldRenderHomeSection(
  section: HomeSectionFlag,
  flags: FeatureFlags = featureFlags,
): boolean {
  if (!flags.homeSections[section]) {
    return false;
  }

  switch (section) {
    case "marketplace":
      return flags.pages.experts;
    case "serviceCategories":
    case "popularServices":
    case "drawingConsultation":
      return flags.pages.services;
    case "knowledgeTips":
      return flags.pages.knowledge;
    case "faqEntry":
      return flags.pages.faq;
    case "joinCta":
      return flags.pages.expertRegistration;
    case "contentHighlights":
      return flags.pages.articles || flags.pages.knowledge || flags.pages.faq;
    default:
      return true;
  }
}

export function enabledLinks<T extends { href: string }>(
  items: readonly T[],
  flags: FeatureFlags = featureFlags,
): T[] {
  return items.filter((item) => isPathEnabledWith(item.href, flags));
}
