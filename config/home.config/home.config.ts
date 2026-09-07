import { storePaths } from "@/config/navigation.config/navigation.config";

export { homeHeroSlides } from "@/lib/home/hero-slides/hero-slides";

export const homeHeroCopy = {
  title: "پلتفرم جامع خدمات ساختمانی در سراسر کشور",
  description: "ارتباط رایگان با مهندسان، پیمانکاران و متخصصان ساخت‌وساز",
  supporting:
    "از نقشه‌برداری و طراحی تا اخذ مجوز و اجرای پروژه در کنار شما هستیم",
  searchLabel: "جستجو در خدمات و متخصصین",
  cityLabel: "انتخاب شهر",
  joinCta: "شما هم یکی از هزاران عضو سایت مهندس من شوید",
  startCta: "شروع جستجو",
  sliderLabel: "بنرهای معرفی خدمات مهندس من",
} as const;

export const homeServicesCopy = {
  title: "به‌دنبال چه خدمتی هستید؟",
  description: "بهترین مهندسان و متخصصان خدمات ساختمانی در مهندس من!",
  faqLabel: "سوالات متداول",
} as const;

export const homeMarketplaceCopy = {
  eyebrow: "متخصصین ما",
  title: "متخصص مناسب پروژه را پیدا کنید",
  description:
    "تخصص، شهر و سابقه حرفه‌ای را مقایسه کنید و با انتخاب آگاهانه وارد پروفایل متخصص شوید.",
  foundSuffix: "متخصص یافت شد",
  emptyTitle: "متخصصی با این ترکیب فیلتر پیدا نشد",
  emptyDescription:
    "یک شهر یا تخصص دیگر را امتحان کنید، یا همه فیلترها را پاک کنید.",
  resetLabel: "نمایش همه متخصصان",
  clearFiltersLabel: "پاک‌کردن فیلترها",
  serviceFilterLabel: "فیلتر گروه خدمات",
  paginationLabel: "صفحه‌بندی متخصصان",
  previousLabel: "قبلی",
  nextLabel: "بعدی",
} as const;

export const homeNarrativeCopy = {
  title: "مهندس من چیست؟",
  description:
    "«مهندس من» یک پلتفرم جامع آنلاین است که به کاربران امکان می‌دهد به‌راحتی مهندسان، کارشناسان و متخصصان تایید شده حوزه ساختمان را پیدا کنند و رایگان با آن‌ها تماس بگیرند.",
} as const;

export const homeWhyCopy = {
  title: "چرا مهندس من؟",
  intro:
    "سایت مهندس من با هدف ایجاد یک مرجع اختصاصی از مهندسان و متخصصان حوزه ساخت‌وساز در کشور در کنار شما همواره خواهد بود.",
  items: [
    {
      title: "خدمات جامع ساختمانی",
      description: "از نقشه‌برداری تا پیمانکاری",
    },
    {
      title: "دسترسی سریع و رایگان",
      description: "مهندس دلخواهت را بدون هزینه پیدا کن",
    },
    {
      title: "شفافیت و اعتماد",
      description: "مشاهده سوابق و امتیاز متخصصان",
    },
    {
      title: "تایید صلاحیت",
      description: "فقط افراد تایید صلاحیت شده فعالیت می‌کنند",
    },
  ],
} as const;

export const homeContentCopy = {
  title: "محتوا و راهنما",
  description:
    "مطالب، نکته‌ها و پرسش‌های رایج را از مسیرهای اصلی سایت بخوانید.",
  items: [
    {
      href: storePaths.articles,
      title: "مقالات",
      description: "مطالب خواندنی درباره خدمات ساختمانی.",
    },
    {
      href: storePaths.knowledge,
      title: "دانش",
      description: "نکته‌ها و راهنمایی‌های کاربردی.",
    },
    {
      href: storePaths.faq,
      title: "سوالات متداول",
      description: "پاسخ پرسش‌های رایج کاربران.",
    },
  ],
} as const;

export const homeFaqCopy = {
  title: "سوالات متداول",
  description:
    "با انتخاب هر موضوع به پرسش‌های همان بخش بروید تا با اطلاعات کامل‌تر خدمت مناسب را انتخاب کنید.",
  actionLabel: "مشاهده همه سوالات متداول",
  href: storePaths.faq,
} as const;

export const homeJoinCopy = {
  title: "پیوستن متخصصان",
  description:
    "اگر در حوزه ساخت‌وساز اعم از مهندسی و استادکاری تخصص دارید، به مجموعه بزرگ مهندس من بپیوندید.",
} as const;

export const homeKnowledgeCopy = {
  title: "پایگاه دانش مهندس من",
  didYouKnow: "آیا می‌دانستید؟",
  sliderLabel: "نکته‌های پایگاه دانش",
} as const;

export const homeTestimonialCopy = {
  eyebrow: "تجربه کاربران",
  title: "نظر کاربران",

  submitNote: "ارسال نظر پس از اتصال سرویس نظرات و احراز هویت فعال می‌شود.",

  items: [
    {
      id: "mahan-karamati",
      quote:
        "جامع‌ترین خدمات مهندسی و بهترین مهندسان ایران بدون شک در اینجا جمع هستند و من واقعاً با این سایت مشکلاتم حل شده.",
      author: "آقای ماهان کرامتی",
      role: "رییس هیئت مدیره شرکت برق آسا",
    },

    // Placeholder — replace with a real verified testimonial before production.
    {
      id: "sample-01",
      quote:
        "پیدا کردن متخصص مناسب برای پروژه قبلاً زمان زیادی از ما می‌گرفت. اینجا توانستیم خیلی سریع تخصص‌ها را مقایسه کنیم و با فرد مناسب ارتباط بگیریم.",
      author: "کاربر نمونه",
      role: "مدیر پروژه — متن نمونه",
    },

    // Placeholder — replace with a real verified testimonial before production.
    {
      id: "sample-02",
      quote:
        "چیزی که برای من ارزشمند بود، دسترسی مستقیم به اطلاعات تخصصی مهندسان و امکان انتخاب آگاهانه‌تر قبل از شروع همکاری بود.",
      author: "کاربر نمونه",
      role: "کارفرمای پروژه ساختمانی — متن نمونه",
    },

    // Placeholder — replace with a real verified testimonial before production.
    {
      id: "sample-03",
      quote:
        "برای مشاوره فنی پروژه به چند تخصص مختلف نیاز داشتیم. ساختار سایت باعث شد مسیر پیدا کردن متخصص و بررسی گزینه‌ها خیلی ساده‌تر شود.",
      author: "کاربر نمونه",
      role: "مدیر اجرایی — متن نمونه",
    },
  ],
} as const;

export const homePopularCopy = {
  title: "خدمات پرکاربرد",
  description: "مسیرهای پرتکرار کاربران، از مسئله ملک تا طراحی و اجرای پروژه.",
} as const;

export const homeDrawingCopy = {
  title: "مشاوره ترسیم نقشه",
  description:
    "برای هماهنگی بهتر میان رشته‌ها، نوع نقشه مورد نیاز پروژه را انتخاب کنید.",
} as const;
