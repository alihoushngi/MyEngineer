export const userAuthPaths = {
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  account: "/account",
} as const;

export type UserAuthPath = (typeof userAuthPaths)[keyof typeof userAuthPaths];

export const userAuthCopy = {
  loginTitle: "ورود",
  loginDescription: "برای ورود به حساب کاربری، شماره موبایل خود را وارد کنید.",
  registerTitle: "ثبت‌نام",
  registerDescription:
    "با شماره موبایل حساب بسازید تا بتوانید با متخصصان گفتگو کنید و درخواست ثبت کنید.",
  otpMethod: "ورود با کد یکبار مصرف",
  passwordMethod: "ورود با رمز عبور",
  phoneLabel: "شماره موبایل",
  phonePlaceholder: "09xxxxxxxxx",
  requestOtpLabel: "دریافت کد تأیید",
  otpLabel: "کد تأیید",
  otpHelp: "کد شش‌رقمی ارسال‌شده را وارد کنید.",
  verifyLabel: "ورود",
  passwordLabel: "رمز عبور",
  passwordPlaceholder: "رمز عبور",
  submitPassword: "ورود",
  resendLabel: "ارسال مجدد کد",
  editPhoneLabel: "ویرایش شماره موبایل",
  registerPrefix: "حساب کاربری ندارید؟",
  registerAction: "ثبت‌نام کنید",
  loginPrefix: "قبلاً ثبت‌نام کرده‌اید؟",
  loginAction: "وارد شوید",
  engineerEntryPrefix: "متخصص هستید؟",
  engineerLoginAction: "ورود مهندس",
  displayNameLabel: "نام",
  displayNamePlaceholder: "نام نمایشی",
  completeRegisterLabel: "ایجاد حساب",
  registerPasswordHelp: "حداقل ۸ نویسه. برای ورود بعدی با رمز عبور لازم است.",
  accountTitle: "حساب من",
  accountGreeting: "خوش آمدید",
  logoutLabel: "خروج",
  loginCta: "ورود / ثبت‌نام",
  accountCta: "حساب من",
  upcomingTitle: "امکان‌های حساب",
  upcomingHint:
    "این بخش‌ها پس از اتصال سرویس حساب مشتری فعال می‌شوند و در این نسخه فقط مسیر ورود آماده است.",
  upcomingConversations: "گفتگو با متخصصان",
  upcomingRequests: "درخواست‌های خدمات",
  upcomingSaved: "متخصصان ذخیره‌شده",
  upcomingReviews: "نظرها",
  upcomingNotifications: "اعلان‌ها",
  checkingTitle: "در حال بررسی نشست",
  checkingDescription: "لطفاً صبر کنید. اطلاعات حساب هنوز آماده نمایش نیست.",
  unauthenticatedTitle: "وارد نشده‌اید",
  unauthenticatedDescription: "برای مشاهده حساب کاربری باید وارد شوید.",
  expiredTitle: "نشست منقضی شده است",
  expiredDescription: "لطفاً دوباره وارد شوید.",
  engineerSessionTitle: "این حساب مخصوص مشتری نیست",
  engineerSessionDescription:
    "با نشست متخصص وارد شده‌اید. حساب مشتری جدا است و داده‌های آن نمایش داده نمی‌شود.",
  unavailableTitle: "سرویس حساب در دسترس نیست",
  unavailableDescription:
    "ورود مشتری پس از اتصال سرویس احراز هویت فعال می‌شود.",
  errorTitle: "خطا در خواندن نشست",
  errorDescription: "بررسی حساب انجام نشد. دوباره تلاش کنید.",
  homeCta: "بازگشت به خانه",
  engineerPanelCta: "پنل مهندس",
  retryLabel: "تلاش دوباره",
  logoutUnavailable: "خروج از حساب پس از اتصال سرویس نشست فعال می‌شود.",
  authRequiredHint: "برای ادامه باید وارد حساب کاربری شوید.",
} as const;

export function isAccountPath(pathname: string): boolean {
  return (
    pathname === userAuthPaths.account ||
    pathname.startsWith(`${userAuthPaths.account}/`)
  );
}

export function isUserAuthEntryPath(pathname: string): boolean {
  return (
    pathname === userAuthPaths.login ||
    pathname === userAuthPaths.register ||
    pathname === userAuthPaths.forgotPassword
  );
}
