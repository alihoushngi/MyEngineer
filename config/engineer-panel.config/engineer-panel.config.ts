export const engineerPanelPaths = {
  dashboard: "/engineer",
  login: "/engineer/login",
  profile: "/engineer/profile",
  services: "/engineer/services",
  serviceAreas: "/engineer/service-areas",
  requests: "/engineer/requests",
  messages: "/engineer/messages",
  support: "/engineer/support",
  portfolio: "/engineer/portfolio",
  credentials: "/engineer/credentials",
  reviews: "/engineer/reviews",
  notifications: "/engineer/notifications",
  settings: "/engineer/settings",
} as const;

export type EngineerPanelPath =
  (typeof engineerPanelPaths)[keyof typeof engineerPanelPaths];

export type EngineerNavIconName =
  | "layoutDashboard"
  | "user"
  | "briefcase"
  | "mapPin"
  | "inbox"
  | "messageSquare"
  | "images"
  | "fileBadge"
  | "star"
  | "bell"
  | "settings";

export type EngineerNavItem = {
  id: string;
  href: EngineerPanelPath;
  label: string;
  icon: EngineerNavIconName;
};

export const engineerPrimaryNav: readonly EngineerNavItem[] = [
  {
    id: "dashboard",
    href: engineerPanelPaths.dashboard,
    label: "پیشخوان",
    icon: "layoutDashboard",
  },
  {
    id: "requests",
    href: engineerPanelPaths.requests,
    label: "درخواست‌ها",
    icon: "inbox",
  },
  {
    id: "messages",
    href: engineerPanelPaths.messages,
    label: "پیام‌ها",
    icon: "messageSquare",
  },
  {
    id: "profile",
    href: engineerPanelPaths.profile,
    label: "پروفایل",
    icon: "user",
  },
] as const;

export const engineerSecondaryNav: readonly EngineerNavItem[] = [
  {
    id: "support",
    href: engineerPanelPaths.support,
    label: "پشتیبانی",
    icon: "inbox",
  },
  {
    id: "services",
    href: engineerPanelPaths.services,
    label: "خدمات من",
    icon: "briefcase",
  },
  {
    id: "service-areas",
    href: engineerPanelPaths.serviceAreas,
    label: "محدوده فعالیت",
    icon: "mapPin",
  },
  {
    id: "portfolio",
    href: engineerPanelPaths.portfolio,
    label: "نمونه‌کارها",
    icon: "images",
  },
  {
    id: "credentials",
    href: engineerPanelPaths.credentials,
    label: "مدارک و صلاحیت‌ها",
    icon: "fileBadge",
  },
  {
    id: "reviews",
    href: engineerPanelPaths.reviews,
    label: "نظرات",
    icon: "star",
  },
  {
    id: "notifications",
    href: engineerPanelPaths.notifications,
    label: "اعلان‌ها",
    icon: "bell",
  },
  {
    id: "settings",
    href: engineerPanelPaths.settings,
    label: "تنظیمات",
    icon: "settings",
  },
] as const;

export const engineerSidebarNav: readonly EngineerNavItem[] = [
  {
    id: "dashboard",
    href: engineerPanelPaths.dashboard,
    label: "پیشخوان",
    icon: "layoutDashboard",
  },
  {
    id: "profile",
    href: engineerPanelPaths.profile,
    label: "پروفایل من",
    icon: "user",
  },
  {
    id: "services",
    href: engineerPanelPaths.services,
    label: "خدمات من",
    icon: "briefcase",
  },
  {
    id: "service-areas",
    href: engineerPanelPaths.serviceAreas,
    label: "محدوده فعالیت",
    icon: "mapPin",
  },
  {
    id: "requests",
    href: engineerPanelPaths.requests,
    label: "درخواست‌ها",
    icon: "inbox",
  },
  {
    id: "messages",
    href: engineerPanelPaths.messages,
    label: "پیام‌ها",
    icon: "messageSquare",
  },
  {
    id: "support",
    href: engineerPanelPaths.support,
    label: "پشتیبانی",
    icon: "inbox",
  },
  {
    id: "portfolio",
    href: engineerPanelPaths.portfolio,
    label: "نمونه‌کارها",
    icon: "images",
  },
  {
    id: "credentials",
    href: engineerPanelPaths.credentials,
    label: "مدارک و صلاحیت‌ها",
    icon: "fileBadge",
  },
  {
    id: "reviews",
    href: engineerPanelPaths.reviews,
    label: "نظرات",
    icon: "star",
  },
  {
    id: "notifications",
    href: engineerPanelPaths.notifications,
    label: "اعلان‌ها",
    icon: "bell",
  },
  {
    id: "settings",
    href: engineerPanelPaths.settings,
    label: "تنظیمات",
    icon: "settings",
  },
] as const;

export const engineerPanelCopy = {
  workspaceName: "فضای کاری متخصص",
  skipToContent: "پرش به محتوای اصلی",
  moreLabel: "بیشتر",
  moreTitle: "سایر بخش‌ها",
  publicProfileLabel: "مشاهده پروفایل عمومی",
  publicProfileUnavailable: "شناسه پروفایل عمومی هنوز در دسترس نیست.",
  accountMenuLabel: "حساب متخصص",
  logoutLabel: "خروج",
  settingsLabel: "تنظیمات",
  dashboardLabel: "پیشخوان",
  visualReviewTitle: "نمایش طراحی فضای کاری",
  visualReviewDescription:
    "این صفحه برای بررسی ظاهر و جریان کار متخصص است. ورود واقعی پس از اتصال سرویس احراز هویت فعال می‌شود و این داده‌ها جلسهٔ ورود نیستند.",
  continueRegistrationLabel: "ادامه ثبت‌نام",
  incompleteRegistrationTitle: "ثبت‌نام تکمیل نشده است",
  incompleteRegistrationDescription:
    "پروفایل هنوز برای فعالیت کامل آماده نیست. ثبت‌نام را از اولین گام ناتمام ادامه دهید.",
  pendingReviewTitle: "پروفایل در انتظار بررسی است",
  pendingReviewDescription:
    "اطلاعات ارسال شده است. نتیجه بررسی پس از اتصال فرآیند سرور اعلام می‌شود.",
  verifiedTitle: "پروفایل تأیید شده است",
  needsCorrectionTitle: "پروفایل نیازمند اصلاح است",
  needsCorrectionDescription:
    "جزئیات اصلاح از طرف سرور هنوز تعریف نشده است. BUSINESS DECISION REQUIRED.",
  unauthorizedTitle: "ورود به فضای کاری متخصص ممکن نیست",
  unauthorizedDescription:
    "این بخش خصوصی است. تا اتصال سرویس احراز هویت، جلسهٔ واقعی متخصص وجود ندارد.",
  unavailableTitle: "سرویس فضای کاری در دسترس نیست",
  unavailableDescription:
    "خواندن حساب متخصص هنوز به قرارداد بک‌اند متصل نشده است.",
  unauthenticatedTitle: "وارد نشده‌اید",
  unauthenticatedDescription: "برای مشاهده فضای کاری باید وارد شوید.",
  forbiddenTitle: "دسترسی مجاز نیست",
  forbiddenDescription: "این حساب اجازه ورود به فضای کاری متخصص را ندارد.",
  homeCta: "بازگشت به خانه",
  joinCta: "ثبت‌نام متخصص",
  loginCta: "ورود مهندس",
  panelCta: "پنل مهندس",
  mockModeLabel: "حالت آزمایشی",
  retryLabel: "تلاش دوباره",
  saveLabel: "ذخیره",
  cancelLabel: "لغو",
  editLabel: "ویرایش",
  addLabel: "افزودن",
  removeLabel: "حذف",
  sendLabel: "ارسال",
  mutationUnavailable:
    "این تغییر هنوز از طریق سرور در دسترس نیست و ذخیره نشده است.",
  uploadUnavailable:
    "بارگذاری پرونده پس از اتصال سرویس انجام می‌شود. فایل فقط به‌صورت محلی انتخاب شده است.",
  emptyRequests: "هنوز درخواستی برای شما ثبت نشده است.",
  emptyMessages: "هنوز گفت‌وگویی ندارید.",
  emptyPortfolio: "هنوز نمونه‌کاری اضافه نکرده‌اید.",
  emptyReviews: "هنوز نظری برای پروفایل شما ثبت نشده است.",
  backToReviews: "بازگشت به نظرات",
  emptyNotifications: "اعلانی برای نمایش وجود ندارد.",
  emptyCredentials: "مدرک یا صلاحیت ثبت‌شده‌ای برای نمایش وجود ندارد.",
  emptyServices: "خدمتی به پروفایل شما متصل نشده است.",
  requestNotFoundTitle: "درخواست پیدا نشد",
  conversationNotFoundTitle: "گفت‌وگو پیدا نشد",
  filterAll: "همه",
  filterNew: "جدید",
  filterInReview: "در حال بررسی",
  filterClosed: "بسته‌شده",
  paginationLabel: "صفحه‌بندی فهرست",
  requestStatusNew: "جدید",
  requestStatusInReview: "در حال بررسی",
  requestStatusClosed: "بسته‌شده",
  requestActionsUnavailable:
    "قبول، رد یا ارسال پیشنهاد هنوز در قرارداد محصول تعریف نشده است.",
  verificationIncomplete: "تکمیل نشده",
  verificationPending: "در انتظار بررسی",
  verificationVerified: "تأیید شده",
  verificationNeedsCorrection: "نیازمند اصلاح",
  credentialSubmitted: "ارسال شده",
  credentialPending: "در انتظار بررسی",
  credentialVerified: "تأیید شده",
  credentialNeedsCorrection: "نیازمند اصلاح",
  completionTitle: "تکمیل پروفایل",
  completionHint:
    "درصد از معیارهای ثبت‌نام موجود در محصول محاسبه می‌شود، نه از یک عدد سرور.",
  quickEditProfile: "ویرایش پروفایل",
  quickAddPortfolio: "افزودن نمونه‌کار",
  quickServiceAreas: "مدیریت محدوده فعالیت",
  quickRequests: "مشاهده درخواست‌ها",
  recentRequests: "درخواست‌های اخیر",
  unreadMessages: "پیام‌های خوانده‌نشده",
  latestReviews: "آخرین نظرات",
  portfolioStatus: "وضعیت نمونه‌کار",
  serviceCoverage: "پوشش خدمات",
  viewAll: "مشاهده همه",
  startConversationCta: "مشاهده گفتگو",
  composerPlaceholder: "پیام خود را بنویسید…",
  composerEmptyError: "متن پیام نمی‌تواند خالی باشد.",
  logoutUnavailable: "خروج از حساب پس از اتصال سرویس نشست فعال می‌شود.",
  otpAuthNote:
    "ورود این محصول می‌تواند با شماره موبایل و رمز یک‌بارمصرف یا رمز عبور انجام شود.",
  notificationPrefsUnavailable: "تنظیم اعلان‌ها هنوز در محصول تعریف نشده است.",
  accountDeletionUnavailable:
    "حذف یا غیرفعال‌سازی حساب در قرارداد فعلی پشتیبانی نمی‌شود.",
  listedOnProfile: "نمایش در پروفایل عمومی",
  notListedOnProfile: "در پروفایل عمومی نمایش داده نمی‌شود",
  documentPrivateNote:
    "پرونده‌های حساس در این پنل فقط به‌صورت وضعیت نمایش داده می‌شوند و نشانی فایل عمومی نمی‌شود.",
  noPublicProfileId: "شناسه پروفایل عمومی موجود نیست.",
  loadingLabel: "در حال بارگذاری فضای کاری…",
} as const;

export const engineerPageTitles = {
  dashboard: "پیشخوان",
  profile: "پروفایل من",
  services: "خدمات من",
  serviceAreas: "محدوده فعالیت",
  requests: "درخواست‌ها",
  requestDetail: "جزئیات درخواست",
  messages: "پیام‌ها",
  conversation: "گفتگو",
  support: "پشتیبانی",
  portfolio: "نمونه‌کارها",
  credentials: "مدارک و صلاحیت‌ها",
  reviews: "نظرات",
  reviewDetail: "جزئیات نظر",
  notifications: "اعلان‌ها",
  settings: "تنظیمات",
} as const;

export const profileCompletionLabels: Record<string, string> = {
  avatar: "تصویر پروفایل",
  personalInfo: "اطلاعات فردی",
  specialties: "تخصص‌ها",
  resume: "سوابق",
  education: "تحصیلات",
  organization: "اطلاعات نظام مهندسی",
  serviceAreas: "مناطق فعالیت",
  portfolio: "نمونه‌کار",
  credentials: "مدارک",
};

export function isEngineerPanelPath(pathname: string): boolean {
  if (pathname === engineerPanelPaths.login) {
    return false;
  }

  if (pathname.startsWith(`${engineerPanelPaths.login}/`)) {
    return false;
  }

  return (
    pathname === engineerPanelPaths.dashboard ||
    pathname.startsWith(`${engineerPanelPaths.dashboard}/`)
  );
}

export function isEngineerNavActive(
  pathname: string,
  href: EngineerPanelPath,
): boolean {
  if (href === engineerPanelPaths.dashboard) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
