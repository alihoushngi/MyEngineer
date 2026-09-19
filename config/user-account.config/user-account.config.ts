export const userAccountPaths = {
  dashboard: "/account",
  profile: "/account/profile",
  requests: "/account/requests",
  messages: "/account/messages",
  support: "/account/support",
  saved: "/account/saved",
  reviews: "/account/reviews",
  notifications: "/account/notifications",
  settings: "/account/settings",
} as const;

export type UserAccountPath =
  (typeof userAccountPaths)[keyof typeof userAccountPaths];

export type UserAccountNavIconName =
  | "layoutDashboard"
  | "inbox"
  | "messageSquare"
  | "bookmark"
  | "star"
  | "bell"
  | "user"
  | "settings";

export type UserAccountNavItem = {
  id: string;
  href: UserAccountPath;
  label: string;
  icon: UserAccountNavIconName;
};

export const userAccountPrimaryNav: readonly UserAccountNavItem[] = [
  {
    id: "dashboard",
    href: userAccountPaths.dashboard,
    label: "پیشخوان",
    icon: "layoutDashboard",
  },
  {
    id: "requests",
    href: userAccountPaths.requests,
    label: "درخواست‌ها",
    icon: "inbox",
  },
  {
    id: "messages",
    href: userAccountPaths.messages,
    label: "پیام‌ها",
    icon: "messageSquare",
  },
  {
    id: "saved",
    href: userAccountPaths.saved,
    label: "ذخیره‌ها",
    icon: "bookmark",
  },
] as const;

export const userAccountSecondaryNav: readonly UserAccountNavItem[] = [
  {
    id: "support",
    href: userAccountPaths.support,
    label: "پشتیبانی",
    icon: "inbox",
  },
  {
    id: "reviews",
    href: userAccountPaths.reviews,
    label: "نظرات من",
    icon: "star",
  },
  {
    id: "notifications",
    href: userAccountPaths.notifications,
    label: "اعلان‌ها",
    icon: "bell",
  },
  {
    id: "profile",
    href: userAccountPaths.profile,
    label: "اطلاعات حساب",
    icon: "user",
  },
  {
    id: "settings",
    href: userAccountPaths.settings,
    label: "تنظیمات",
    icon: "settings",
  },
] as const;

export const userAccountSidebarNav: readonly UserAccountNavItem[] = [
  ...userAccountPrimaryNav,
  ...userAccountSecondaryNav,
];

export const userAccountCopy = {
  workspaceName: "حساب کاربری",
  skipToContent: "پرش به محتوای اصلی",
  moreLabel: "بیشتر",
  moreTitle: "سایر بخش‌ها",
  accountMenuLabel: "حساب من",
  storefrontLabel: "بازگشت به فروشگاه",
  logoutLabel: "خروج",
  settingsLabel: "تنظیمات",
  dashboardLabel: "پیشخوان",
  dashboardDescription:
    "درخواست‌های فعال، پیام‌های اخیر و متخصصانی که ذخیره کرده‌اید.",
  profileDescription: "اطلاعات هویتی حساب شما. این صفحه عمومی نیست.",
  requestsDescription: "درخواست‌هایی که برای متخصصان ثبت کرده‌اید.",
  requestDetailDescription: "جزئیات درخواست و وضعیت بررسی.",
  messagesDescription:
    "گفتگو با متخصصان درباره درخواست‌ها و پیگیری کار.",
  conversationDescription: "پیام‌های این گفتگو.",
  savedDescription: "متخصصانی که برای مراجعه بعدی ذخیره کرده‌اید.",
  reviewsDescription: "نظرهایی که برای متخصصان ثبت کرده‌اید.",
  notificationsDescription:
    "اعلان‌های پیام، درخواست، نظر و حساب. فقط دسته‌های پشتیبانی‌شده نمایش داده می‌شود.",
  settingsDescription: "خروج از حساب و اطلاعات نمایشی نشست.",
  welcomeGreeting: "خوش آمدید",
  findExpert: "پیدا کردن مهندس",
  viewMessages: "مشاهده پیام‌ها",
  viewSaved: "مشاهده مهندس‌های ذخیره‌شده",
  viewAll: "مشاهده همه",
  openConversation: "مشاهده گفتگو",
  unreadLabel: "خوانده‌نشده",
  displayNameLabel: "نام",
  mobileLabel: "موبایل",
  cityLabel: "شهر",
  emptySavedHint:
    "از پروفایل متخصص می‌توانید او را برای مراجعه بعدی ذخیره کنید.",
  recentRequests: "درخواست‌های فعال",
  recentMessages: "پیام‌های اخیر",
  savedExperts: "مهندس‌های ذخیره‌شده",
  notificationSummary: "اعلان‌ها",
  unreadNotifications: "اعلان خوانده‌نشده",
  emptyRequests: "هنوز درخواستی ثبت نکرده‌اید.",
  emptyRequestsHint: "از پروفایل یک متخصص می‌توانید درخواست خدمات بفرستید.",
  emptyMessages: "هنوز گفتگویی ندارید.",
  emptySaved: "هنوز متخصصی ذخیره نکرده‌اید.",
  emptyReviews: "هنوز نظری ثبت نکرده‌اید.",
  emptyNotifications: "اعلانی برای نمایش وجود ندارد.",
  requestNotFoundTitle: "درخواست پیدا نشد",
  conversationNotFoundTitle: "گفتگو پیدا نشد",
  reviewNotFoundTitle: "نظر پیدا نشد",
  filterAll: "همه",
  filterSent: "ارسال‌شده",
  filterInReview: "در حال بررسی",
  filterClosed: "بسته‌شده",
  requestStatusSent: "ارسال‌شده",
  requestStatusInReview: "در حال بررسی",
  requestStatusClosed: "بسته‌شده",
  paginationLabel: "صفحه‌بندی فهرست",
  loadingLabel: "در حال بارگذاری حساب…",
  profilePrivateNote:
    "شماره موبایل کامل، گفتگو و درخواست در صفحات عمومی نمایش داده نمی‌شود.",
  profileEditUnavailable:
    "برای ویرایش حساب باید با توکن معتبر وارد شده باشید.",
  notificationPrefsUnavailable: "تنظیم اعلان‌ها هنوز در محصول تعریف نشده است.",
  openPublicProfile: "مشاهده پروفایل عمومی",
  relatedExpert: "متخصص",
} as const;

export const userAccountPageTitles = {
  dashboard: "پیشخوان",
  profile: "اطلاعات حساب",
  requests: "درخواست‌های من",
  requestDetail: "جزئیات درخواست",
  messages: "پیام‌ها",
  conversation: "گفتگو",
  support: "پشتیبانی",
  saved: "مهندس‌های ذخیره‌شده",
  reviews: "نظرات من",
  reviewDetail: "جزئیات نظر",
  notifications: "اعلان‌ها",
  settings: "تنظیمات",
} as const;

export function isUserAccountNavActive(
  pathname: string,
  href: UserAccountPath,
): boolean {
  if (href === userAccountPaths.dashboard) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
