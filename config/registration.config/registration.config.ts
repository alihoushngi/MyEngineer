export const REGISTRATION_STEPS = [
  { index: 1, label: "اطلاعات اولیه", path: "/expert-registration" },
  { index: 2, label: "تأیید شماره", path: "/expert-registration/otp" },
  {
    index: 3,
    label: "منطقه خدمات",
    path: "/expert-registration/service-area",
  },
  { index: 4, label: "تخصص", path: "/expert-registration/expertise" },
  {
    index: 5,
    label: "اطلاعات شخصی",
    path: "/expert-registration/personal-info",
  },
  { index: 6, label: "تحصیلات", path: "/expert-registration/education" },
  {
    index: 7,
    label: "سازمان نظام",
    path: "/expert-registration/engineering-organization",
  },
  {
    index: 8,
    label: "سوابق",
    path: "/expert-registration/professional-resume",
  },
  { index: 9, label: "نمونه‌کار", path: "/expert-registration/portfolio" },
] as const;

export const TOTAL_REGISTRATION_STEPS = 9;

/** Cooldown seconds between OTP resend requests. SOURCE: legacy step2 timer = 120s */
export const OTP_RESEND_COOLDOWN_SECONDS = 120;

export const OTP_LENGTH = 5;

export const registrationCopy = {
  // Wizard chrome
  wizardTitle: "ثبت‌نام متخصص",
  stepOf: (current: number, total: number) => `مرحله ${current} از ${total}`,
  backLabel: "بازگشت",
  continueLabel: "ادامه",
  submitLabel: "ثبت",
  errorGenericTitle: "خطا در ارسال اطلاعات",
  errorGenericDescription:
    "لطفاً دوباره تلاش کنید. اگر مشکل ادامه داشت با پشتیبانی تماس بگیرید.",
  retryLabel: "تلاش دوباره",
  // Step 1
  step1Title: "اطلاعات اولیه",
  step1Description:
    "شماره موبایل و کد ملی خود را وارد کنید. این اطلاعات برای تأیید هویت استفاده می‌شود.",
  mobileLabel: "شماره موبایل",
  mobilePlaceholder: "09xxxxxxxxx",
  mobileHelp:
    "شماره موبایل باید به نام شما باشد. پیامک تأیید به همین شماره ارسال می‌شود.",
  nationalIdLabel: "کد ملی",
  nationalIdPlaceholder: "xxxxxxxxxx",
  termsLabel: "شرایط استفاده و حریم خصوصی را خواندم و می‌پذیرم",
  termsLink: "شرایط استفاده",
  privacyLink: "حریم خصوصی",
  // Step 2
  step2Title: "تأیید شماره موبایل",
  step2Description: (phone: string) =>
    `کد پنج‌رقمی ارسال‌شده به شماره ${phone} را وارد کنید.`,
  otpLabel: "کد تأیید",
  otpInvalidError: "کد وارد‌شده صحیح نیست.",
  otpExpiredError: "کد منقضی شده است. لطفاً کد جدید بخواهید.",
  resendLabel: "ارسال مجدد کد",
  resendCooldown: (seconds: number) => `ارسال مجدد (${seconds} ثانیه)`,
  editPhoneLabel: "ویرایش شماره موبایل",
  verifyLabel: "تأیید و ادامه",
  // Step 3
  step3Title: "منطقه خدمات",
  step3Description: "استان و شهر اصلی ارائه خدمات خود را انتخاب کنید.",
  provinceLabel: "استان",
  provincePlaceholder: "انتخاب استان",
  cityLabel: "شهر",
  cityPlaceholder: "انتخاب شهر",
  nearbyCitiesLabel: "شهرهای مجاور (اختیاری)",
  nearbyCitiesHelp:
    "شهرهای دیگری که در آن‌ها هم خدمات ارائه می‌دهید را انتخاب کنید.",
  cityLoadingMessage: "در حال بارگذاری شهرها...",
  cityEmptyMessage: "هیچ شهری برای این استان یافت نشد.",
  cityErrorMessage: "بارگذاری شهرها ناموفق بود.",
  provinceLoadingMessage: "در حال بارگذاری استان‌ها...",
  provinceErrorMessage: "بارگذاری استان‌ها ناموفق بود.",
  nearbyCitiesApiNote:
    "انتخاب شهرهای مجاور پس از اتصال سرویس در این مرحله فعال می‌شود.",
  // Step 4
  step4Title: "تخصص‌ها",
  step4Description:
    "حوزه‌های تخصصی خود را انتخاب کنید. می‌توانید چندین تخصص و نرم‌افزار مرتبط را انتخاب کنید.",
  expertiseCatalogLoading: "در حال بارگذاری تخصص‌ها...",
  expertiseCatalogApiNote:
    "فهرست تخصص‌ها پس از اتصال سرویس در دسترس خواهد بود.",
  expertiseCatalogErrorTitle: "خطا در بارگذاری تخصص‌ها",
  expertiseCatalogErrorDescription:
    "بارگذاری فهرست تخصص‌ها ناموفق بود. لطفاً دوباره تلاش کنید.",
  expertiseSelectedLabel: "تخصص‌های انتخاب‌شده",
  expertiseNoneSelected: "هنوز تخصصی انتخاب نشده است.",
  expertiseSelectPlaceholder: "انتخاب تخصص‌ها",
  expertiseSearchPlaceholder: "جست‌وجوی تخصص",
  expertiseSheetTitle: (category: string) => `انتخاب تخصص — ${category}`,
  expertiseSheetConfirm: "تأیید",
  expertiseSheetCancel: "لغو",
  removeExpertiseLabel: (label: string) => `حذف ${label}`,
  softwareLabel: "نرم‌افزارهای مرتبط",
  softwareSelectPlaceholder: "انتخاب نرم‌افزارها",
  softwareSearchPlaceholder: "جست‌وجوی نرم‌افزار",
  softwareNoneSelected: "هنوز نرم‌افزاری انتخاب نشده است.",
  selectedItemsLabel: "موارد انتخاب‌شده",
  selectedCount: (count: number) => `${count} مورد انتخاب شده`,
  catalogNoResults: "موردی با این عبارت پیدا نشد.",
  // Step 5
  step5Title: "اطلاعات شخصی",
  step5Description: "اطلاعات شخصی خود را وارد کنید.",
  firstNameLabel: "نام",
  firstNamePlaceholder: "نام",
  lastNameLabel: "نام خانوادگی",
  lastNamePlaceholder: "نام خانوادگی",
  nationalIdDisplayLabel: "کد ملی (از مرحله ۱)",
  avatarLabel: "تصویر پروفایل (اختیاری)",
  avatarHelp: "تصویر پروفایل باید فرمت JPG، JPEG یا PNG داشته باشد.",
  avatarInvalidFormat:
    "فرمت فایل انتخابی پشتیبانی نمی‌شود. JPG، JPEG یا PNG انتخاب کنید.",
  avatarUploadApiNote:
    "آپلود تصویر پس از اتصال سرویس فعال می‌شود. تصویر انتخابی پس از اتصال آپلود خواهد شد.",
  expertiseSummaryLabel: "تخصص‌های انتخاب‌شده",
  expertiseSummaryEmpty: "تخصصی انتخاب نشده است.",
  backToExpertise: "بازگشت به مرحله تخصص",
  // Step 6
  step6Title: "تحصیلات",
  step6Description:
    "سطح تحصیلات و مدرک خود را مشخص کنید و در صورت امکان مدارک مربوطه را بارگذاری کنید.",
  educationLevelLabel: "سطح تحصیلات",
  educationLevelDiplomaOrLower: "دیپلم یا پایین‌تر",
  educationLevelAboveDiploma: "بالاتر از دیپلم",
  degreeSelectionLabel: "مقاطع تحصیلی",
  degreeSelectionHelp: "مقاطعی که مدرک دارید را انتخاب کنید.",
  degreeAssociate: "کاردانی",
  degreeBachelor: "کارشناسی",
  degreeMaster: "کارشناسی ارشد",
  degreeDoctorate: "دکتری",
  degreeDiploma: "دیپلم",
  degreeRequiredError:
    "برای سطح بالاتر از دیپلم، حداقل یک مقطع تحصیلی انتخاب کنید.",
  uploadDegreeLabel: (degree: string) => `بارگذاری مدرک ${degree}`,
  uploadDegreeAccept: ".pdf,.jpg,.jpeg,.png",
  uploadDegreeDescription: "PDF، JPG، JPEG یا PNG",
  uploadApiNote:
    "بارگذاری مدارک پس از اتصال سرویس انجام خواهد شد. فایل‌ها به صورت محلی انتخاب شده‌اند.",
  fileSelected: (name: string) => `فایل انتخاب‌شده: ${name}`,
  fileRemoveLabel: "حذف فایل",
  fileChangeLabel: "تغییر فایل",
  // Step 7
  step7Title: "سازمان نظام مهندسی",
  step7Description:
    "اگر عضو سازمان نظام مهندسی هستید، اطلاعات عضویت و پروانه اشتغال را وارد کنید.",
  isMemberLabel: "آیا عضو سازمان نظام مهندسی هستید؟",
  yesLabel: "بله",
  noLabel: "خیر",
  membershipNumberLabel: "شماره عضویت",
  membershipNumberPlaceholder: "شماره عضویت",
  membershipNumberRequired: "شماره عضویت الزامی است.",
  hasLicenseLabel: "آیا پروانه اشتغال به کار دارید؟",
  licenseNumberLabel: "شماره پروانه",
  licenseNumberPlaceholder: "شماره پروانه",
  licenseNumberRequired: "شماره پروانه الزامی است.",
  licenseFileLabel: "تصویر یا فایل پروانه (اختیاری تا اتصال سرویس آپلود)",
  disciplineLabel: "رشته",
  disciplinePlaceholder: "انتخاب رشته",
  disciplineRequired: "انتخاب رشته الزامی است.",
  qualificationsLabel: "صلاحیت‌ها",
  qualificationsRequired: "حداقل یک صلاحیت انتخاب کنید.",
  qualificationsUnavailable:
    "صلاحیت‌های این رشته هنوز از طرف محصول تعریف نشده است و در این مرحله انتخاب نمی‌شود.",
  licenseUploadApiNote:
    "آپلود فایل پروانه پس از اتصال سرویس انجام خواهد شد. فایل انتخابی فقط به‌صورت محلی نگه داشته می‌شود.",
  // Step 8
  step8Title: "سوابق حرفه‌ای",
  step8Description: "سابقه کار و شرح فعالیت حرفه‌ای خود را وارد کنید.",
  experienceYearsLabel: "سال‌های سابقه",
  experienceYearsPlaceholder: "۰",
  experienceYearsRequired: "سابقه کار الزامی است.",
  experienceYearsInvalid: "سابقه کار باید عدد صفر یا بزرگ‌تر باشد.",
  resumeTextLabel: "شرح سوابق",
  resumeTextPlaceholder: "خلاصه‌ای از سوابق حرفه‌ای خود بنویسید.",
  resumeTextRequired: "شرح سوابق باید حداقل ۱۰ نویسه باشد.",
  resumeTextHelp: "حداقل ۱۰ نویسه.",
  // Step 9
  step9Title: "نمونه‌کار و مدارک",
  step9Description:
    "تصاویر نمونه‌کار و در صورت تمایل مدارک گواهی را اضافه کنید و قوانین را بپذیرید.",
  portfolioImagesLabel: "تصاویر نمونه‌کار",
  portfolioImagesHelp: "فقط تصویر. فایل تکراری اضافه نمی‌شود.",
  portfolioImageInvalid: "فقط فایل تصویری قابل انتخاب است.",
  addPortfolioImageLabel: "افزودن تصویر",
  removePortfolioImageLabel: "حذف تصویر",
  certificatesLabel: "گواهی‌ها (اختیاری)",
  certificateTitleLabel: "عنوان گواهی",
  certificateTitlePlaceholder: "عنوان",
  certificateFileLabel: "فایل گواهی",
  addCertificateLabel: "افزودن گواهی",
  removeCertificateLabel: "حذف گواهی",
  acceptRulesLabel: "قوانین و شرایط ثبت نمونه‌کار را می‌پذیرم",
  acceptRulesRequired: "پذیرش قوانین الزامی است.",
  portfolioUploadApiNote:
    "آپلود تصاویر و مدارک پس از اتصال سرویس انجام می‌شود. فایل‌ها تا آن زمان فقط به‌صورت محلی انتخاب شده‌اند.",
  finalSubmitLabel: "ارسال ثبت‌نام",
  // Complete
  completeTitle: "درخواست ثبت‌نام دریافت شد",
  completeDescription:
    "اطلاعات شما ثبت شد. نتیجه بررسی پس از اتصال فرآیند سرور اعلام می‌شود.",
  completeHomeCta: "بازگشت به خانه",
  completeWorkspaceCta: "ورود به پنل مهندس",
  completeRedirecting: "در حال انتقال به پنل مهندس…",
  loginCrossLinkPrefix: "قبلاً ثبت‌نام کرده‌اید؟",
  loginCrossLinkAction: "ورود مهندس",
  completeDestinationNote:
    "پس از ارسال موفق، به فضای کاری متخصص منتقل می‌شوید.",
} as const;

/** SOURCE: legacy step7 discipline keys and qualification table. */
export const ENGINEERING_DISCIPLINES = [
  { id: "omran", label: "عمران" },
  { id: "bargh", label: "برق" },
  { id: "mechanic", label: "مکانیک" },
  { id: "memari", label: "معماری" },
  { id: "naghshe", label: "نقشه" },
  { id: "traffic", label: "ترافیک" },
  { id: "shahrsazi", label: "شهرسازی" },
] as const;

export const ENGINEERING_QUALIFICATIONS = [
  { id: "design", label: "طراحی" },
  { id: "supervision", label: "نظارت" },
  { id: "execution", label: "اجرا" },
] as const;

/**
 * SOURCE: omran/bargh/mechanic/memari → طراحی، نظارت، اجرا
 * naghshe → طراحی، نظارت
 * traffic/shahrsazi → select exists, no options (BUSINESS DECISION REQUIRED)
 */
export const QUALIFICATIONS_BY_DISCIPLINE: Record<
  (typeof ENGINEERING_DISCIPLINES)[number]["id"],
  readonly (typeof ENGINEERING_QUALIFICATIONS)[number]["id"][]
> = {
  omran: ["design", "supervision", "execution"],
  bargh: ["design", "supervision", "execution"],
  mechanic: ["design", "supervision", "execution"],
  memari: ["design", "supervision", "execution"],
  naghshe: ["design", "supervision"],
  traffic: [],
  shahrsazi: [],
};
