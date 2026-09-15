import { type ServiceSlug } from "@/config/services.config/services.config";
import {
  type ExpertCardData,
  type ExpertCertificate,
  type ExpertPortfolioItem,
  type ExpertProfile,
} from "@/types/store/expert.types";
import { type ExpertReview } from "@/types/store/review.types";
import { type FaqCategoryDetail } from "@/types/store/faq.types";
import { type KnowledgeCategoryDetail } from "@/types/store/knowledge.types";
import { type City, type Province } from "@/types/store/registration.types";
import { type ServiceDetailData } from "@/types/store/service.types";

/**
 * Centralized design-review fixtures. These records are display content, not
 * authentication, mutation, upload, authorization, or transaction results.
 */

export const mockProvinces: readonly Province[] = [
  { id: "tehran", name: "تهران" },
  { id: "gilan", name: "گیلان" },
  { id: "alborz", name: "البرز" },
  { id: "isfahan", name: "اصفهان" },
  { id: "fars", name: "فارس" },
];

export const mockCities: readonly City[] = [
  { id: "tehran", name: "تهران", provinceId: "tehran" },
  { id: "rasht", name: "رشت", provinceId: "gilan" },
  { id: "bandar-anzali", name: "بندر انزلی", provinceId: "gilan" },
  { id: "karaj", name: "کرج", provinceId: "alborz" },
  { id: "isfahan", name: "اصفهان", provinceId: "isfahan" },
  { id: "shiraz", name: "شیراز", provinceId: "fars" },
];

export const mockSoftware = [
  "AutoCAD",
  "Civil 3D",
  "Revit",
  "ETABS",
  "SAFE",
  "SketchUp",
  "Lumion",
] as const;

const namedExpertCards: readonly ExpertCardData[] = [
  {
    id: "amirhossein-rostami",
    href: "/experts/amirhossein-rostami",
    name: "امیرحسین رستمی",
    profession: "مهندس نقشه‌بردار",
    primarySpecialty: "نقشه UTM و جانمایی پلاک ثبتی",
    city: "تهران",
    experienceYears: 12,
    isVerified: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 28,
    specialties: ["نقشه UTM", "جانمایی پلاک ثبتی", "نقشه ازبیلت"],
    serviceSlugs: ["land-surveying", "building-permit"],
    discipline: "naghshe",
    degree: "master",
    hasLicense: true,
  },
  {
    id: "nazanin-farhadi",
    href: "/experts/nazanin-farhadi",
    name: "نازنین فرهادی",
    profession: "مهندس معماری و طراح داخلی",
    primarySpecialty: "طراحی نما و فضای داخلی",
    city: "کرج",
    experienceYears: 8,
    isVerified: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 19,
    specialties: ["طراحی داخلی", "طراحی نما", "مدل‌سازی سه‌بعدی"],
    serviceSlugs: ["interior-design", "drawing"],
    discipline: "memari",
    degree: "master",
    hasLicense: true,
  },
  {
    id: "mahdi-karimi",
    href: "/experts/mahdi-karimi",
    name: "مهدی کریمی",
    profession: "پیمانکار ساختمان",
    primarySpecialty: "اجرای سازه و بازسازی",
    city: "رشت",
    experienceYears: 15,
    isVerified: true,
    isActive: true,
    rating: 4.7,
    reviewCount: 34,
    specialties: ["اسکلت بتنی", "بازسازی", "مدیریت اجرا"],
    serviceSlugs: ["construction-workers"],
    discipline: "omran",
    degree: "bachelor",
    hasLicense: true,
    track: "contractor",
  },
  {
    id: "sara-tavakoli",
    href: "/experts/sara-tavakoli",
    name: "سارا توکلی",
    profession: "مهندس عمران",
    primarySpecialty: "پروانه ساختمان و پایان کار",
    city: "اصفهان",
    experienceYears: 9,
    isVerified: true,
    isActive: true,
    rating: 4.9,
    reviewCount: 16,
    specialties: ["پروانه ساخت", "پایان کار", "امور شهرداری"],
    serviceSlugs: ["building-permit", "administrative-services"],
    discipline: "omran",
    degree: "master",
    hasLicense: true,
  },
  {
    id: "ali-rezaei",
    href: "/experts/ali-rezaei",
    name: "علی رضایی",
    profession: "مهندس سازه",
    primarySpecialty: "طراحی و محاسبات سازه",
    city: "شیراز",
    experienceYears: 11,
    isVerified: true,
    rating: 4.6,
    reviewCount: 12,
    specialties: ["سازه بتنی", "سازه فولادی", "ETABS و SAFE"],
    serviceSlugs: ["drawing"],
    discipline: "omran",
    degree: "master",
    hasLicense: true,
  },
  {
    id: "reza-azadi",
    href: "/experts/reza-azadi",
    name: "رضا آزادی",
    profession: "کارشناس امور ثبتی ساختمان",
    primarySpecialty: "امور اداره ثبت و اسناد",
    city: "بندر انزلی",
    experienceYears: 7,
    isVerified: true,
    isActive: true,
    rating: 4.5,
    reviewCount: 9,
    specialties: ["امور ثبتی", "سند مالکیت", "تغییر کاربری"],
    serviceSlugs: ["administrative-services", "land-surveying"],
    discipline: "omran",
    degree: "bachelor",
    hasLicense: true,
  },
  {
    id: "mina-abbasi",
    href: "/experts/mina-abbasi",
    name: "مینا عباسی",
    profession: "مهندس معمار",
    primarySpecialty: "ترسیم نقشه معماری",
    city: "تهران",
    experienceYears: 10,
    isVerified: true,
    isActive: true,
    rating: 4.7,
    reviewCount: 14,
    specialties: ["نقشه معماری", "فاز دو", "جزئیات اجرایی"],
    serviceSlugs: ["drawing", "interior-design"],
    discipline: "memari",
    degree: "bachelor",
    hasLicense: true,
  },
  {
    id: "hossein-nouri",
    href: "/experts/hossein-nouri",
    name: "حسین نوری",
    profession: "استادکار تاسیسات",
    primarySpecialty: "لوله‌کشی و تاسیسات ساختمان",
    city: "شیراز",
    experienceYears: 13,
    isVerified: true,
    isActive: true,
    rating: 4.6,
    reviewCount: 21,
    specialties: ["لوله‌کشی", "تاسیسات", "بازسازی"],
    serviceSlugs: ["construction-workers"],
    discipline: "mechanic",
    degree: "associate",
    hasLicense: false,
    track: "craftsman",
  },
  {
    id: "elham-sadeghi",
    href: "/experts/elham-sadeghi",
    name: "الهام صادقی",
    profession: "کارشناس خدمات اداری ساختمان",
    primarySpecialty: "امور شهرداری و پایان کار",
    city: "کرج",
    experienceYears: 8,
    isVerified: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 11,
    specialties: ["امور شهرداری", "پایان کار", "تغییر کاربری"],
    serviceSlugs: ["administrative-services", "building-permit"],
    discipline: "omran",
    degree: "bachelor",
    hasLicense: true,
  },
  {
    id: "kamran-moradi",
    href: "/experts/kamran-moradi",
    name: "کامران مرادی",
    profession: "مهندس نقشه‌بردار",
    primarySpecialty: "نقشه ازبیلت و تفکیک آپارتمان",
    city: "رشت",
    experienceYears: 9,
    isVerified: true,
    isActive: true,
    rating: 4.5,
    reviewCount: 8,
    specialties: ["نقشه ازبیلت", "تفکیک آپارتمان", "نقشه UTM"],
    serviceSlugs: ["land-surveying"],
    discipline: "naghshe",
    degree: "bachelor",
    hasLicense: true,
  },
];

const extraListingExperts: readonly ExpertCardData[] = [
  {
    id: "navid-salehi",
    href: "/experts/navid-salehi",
    name: "نوید صالحی",
    profession: "مهندس نقشه‌بردار",
    primarySpecialty: "نقشه UTM",
    city: "تهران",
    experienceYears: 4,
    isVerified: true,
    rating: 4.4,
    reviewCount: 6,
    specialties: ["نقشه UTM", "شمیم"],
    serviceSlugs: ["land-surveying"],
    discipline: "naghshe",
    degree: "associate",
    hasLicense: false,
  },
  {
    id: "parisa-mohammadi",
    href: "/experts/parisa-mohammadi",
    name: "پریسا محمدی",
    profession: "مهندس نقشه‌بردار",
    primarySpecialty: "نقشه‌برداری با پهپاد",
    city: "کرج",
    experienceYears: 8,
    isVerified: true,
    isActive: true,
    rating: 4.7,
    reviewCount: 11,
    specialties: ["پهپاد", "نقشه UTM"],
    serviceSlugs: ["land-surveying"],
    discipline: "naghshe",
    degree: "master",
    hasLicense: true,
  },
  {
    id: "farhad-akbari",
    href: "/experts/farhad-akbari",
    name: "فرهاد اکبری",
    profession: "مهندس نقشه‌بردار",
    primarySpecialty: "جانمایی و نقشه‌برداری ثبتی",
    city: "اصفهان",
    experienceYears: 18,
    isVerified: true,
    rating: 4.8,
    reviewCount: 22,
    specialties: ["نقشه UTM", "جانمایی پلاک ثبتی"],
    serviceSlugs: ["land-surveying"],
    discipline: "naghshe",
    degree: "doctorate",
    hasLicense: true,
  },
  {
    id: "zahra-nemati",
    href: "/experts/zahra-nemati",
    name: "زهرا نعمتی",
    profession: "مهندس نقشه‌بردار",
    primarySpecialty: "تفکیک آپارتمان",
    city: "شیراز",
    experienceYears: 2,
    isVerified: true,
    rating: 4.3,
    reviewCount: 4,
    specialties: ["تفکیک آپارتمان"],
    serviceSlugs: ["land-surveying"],
    discipline: "naghshe",
    degree: "bachelor",
    hasLicense: true,
  },
  {
    id: "saeed-jafari",
    href: "/experts/saeed-jafari",
    name: "سعید جعفری",
    profession: "مهندس نقشه‌بردار",
    primarySpecialty: "شبکه شمیم",
    city: "رشت",
    experienceYears: 14,
    isVerified: true,
    isActive: true,
    rating: 4.6,
    reviewCount: 13,
    specialties: ["شمیم", "نقشه UTM"],
    serviceSlugs: ["land-surveying"],
    discipline: "naghshe",
    degree: "master",
    hasLicense: true,
  },
  {
    id: "maryam-kazemi",
    href: "/experts/maryam-kazemi",
    name: "مریم کاظمی",
    profession: "مهندس نقشه‌بردار",
    primarySpecialty: "برداشت پهپادی",
    city: "بندر انزلی",
    experienceYears: 6,
    isVerified: true,
    rating: 4.5,
    reviewCount: 7,
    specialties: ["پهپاد"],
    serviceSlugs: ["land-surveying"],
    discipline: "omran",
    degree: "bachelor",
    hasLicense: false,
  },
  {
    id: "bahram-yousefi",
    href: "/experts/bahram-yousefi",
    name: "بهرام یوسفی",
    profession: "مهندس نقشه‌بردار",
    primarySpecialty: "نقشه UTM و ازبیلت",
    city: "تهران",
    experienceYears: 22,
    isVerified: true,
    rating: 4.9,
    reviewCount: 31,
    specialties: ["نقشه UTM", "نقشه ازبیلت"],
    serviceSlugs: ["land-surveying"],
    discipline: "other",
    degree: "master",
    hasLicense: true,
  },
  {
    id: "neda-sharifi",
    href: "/experts/neda-sharifi",
    name: "ندا شریفی",
    profession: "مهندس نقشه‌بردار",
    primarySpecialty: "تفکیک آپارتمان و UTM",
    city: "کرج",
    experienceYears: 11,
    isVerified: true,
    isActive: true,
    rating: 4.6,
    reviewCount: 10,
    specialties: ["تفکیک آپارتمان", "نقشه UTM"],
    serviceSlugs: ["land-surveying"],
    discipline: "naghshe",
    degree: "master",
    hasLicense: true,
  },
  {
    id: "javad-amini",
    href: "/experts/javad-amini",
    name: "جواد امینی",
    profession: "استادکار نازک‌کاری",
    primarySpecialty: "نازک‌کاری ساختمان",
    city: "تهران",
    experienceYears: 16,
    isVerified: true,
    rating: 4.5,
    reviewCount: 18,
    specialties: ["نازک‌کاری"],
    serviceSlugs: ["construction-workers"],
    discipline: "omran",
    degree: "associate",
    hasLicense: false,
    track: "craftsman",
  },
  {
    id: "leila-hosseini",
    href: "/experts/leila-hosseini",
    name: "لیلا حسینی",
    profession: "استادکار بازسازی",
    primarySpecialty: "بازسازی ساختمان",
    city: "رشت",
    experienceYears: 4,
    isVerified: true,
    rating: 4.4,
    reviewCount: 8,
    specialties: ["بازسازی"],
    serviceSlugs: ["construction-workers"],
    discipline: "memari",
    hasLicense: false,
    track: "craftsman",
  },
  {
    id: "milad-rahimi",
    href: "/experts/milad-rahimi",
    name: "میلاد رحیمی",
    profession: "استادکار تأسیسات",
    primarySpecialty: "تأسیسات مکانیکی",
    city: "شیراز",
    experienceYears: 8,
    isVerified: true,
    rating: 4.6,
    reviewCount: 12,
    specialties: ["تأسیسات", "لوله‌کشی"],
    serviceSlugs: ["construction-workers"],
    discipline: "mechanic",
    degree: "associate",
    hasLicense: false,
    track: "craftsman",
  },
  {
    id: "fatemeh-karami",
    href: "/experts/fatemeh-karami",
    name: "فاطمه کرمی",
    profession: "استادکار سازه",
    primarySpecialty: "اجرای اسکلت بتنی",
    city: "اصفهان",
    experienceYears: 12,
    isVerified: true,
    rating: 4.7,
    reviewCount: 15,
    specialties: ["اسکلت بتنی"],
    serviceSlugs: ["construction-workers"],
    discipline: "omran",
    degree: "associate",
    hasLicense: false,
    track: "craftsman",
  },
  {
    id: "omid-safari",
    href: "/experts/omid-safari",
    name: "امید صفری",
    profession: "استادکار نازک‌کاری",
    primarySpecialty: "نازک‌کاری و تکمیل",
    city: "کرج",
    experienceYears: 19,
    isVerified: true,
    rating: 4.8,
    reviewCount: 24,
    specialties: ["نازک‌کاری"],
    serviceSlugs: ["construction-workers"],
    discipline: "other",
    hasLicense: false,
    track: "craftsman",
  },
  {
    id: "shirin-amini",
    href: "/experts/shirin-amini",
    name: "شیرین امینی",
    profession: "استادکار بازسازی",
    primarySpecialty: "بازسازی داخلی",
    city: "تهران",
    experienceYears: 7,
    isVerified: true,
    rating: 4.5,
    reviewCount: 9,
    specialties: ["بازسازی", "نازک‌کاری"],
    serviceSlugs: ["construction-workers"],
    discipline: "memari",
    degree: "bachelor",
    hasLicense: false,
    track: "craftsman",
  },
  {
    id: "hamid-zare",
    href: "/experts/hamid-zare",
    name: "حمید زارع",
    profession: "استادکار تأسیسات",
    primarySpecialty: "لوله‌کشی ساختمان",
    city: "شیراز",
    experienceYears: 3,
    isVerified: true,
    rating: 4.2,
    reviewCount: 5,
    specialties: ["لوله‌کشی", "تأسیسات"],
    serviceSlugs: ["construction-workers"],
    discipline: "mechanic",
    hasLicense: false,
    track: "craftsman",
  },
  {
    id: "narges-fallah",
    href: "/experts/narges-fallah",
    name: "نرگس فلاح",
    profession: "استادکار سازه",
    primarySpecialty: "اجرای اسکلت",
    city: "رشت",
    experienceYears: 14,
    isVerified: true,
    rating: 4.6,
    reviewCount: 16,
    specialties: ["اسکلت بتنی", "بازسازی"],
    serviceSlugs: ["construction-workers"],
    discipline: "omran",
    degree: "associate",
    hasLicense: false,
    track: "craftsman",
  },
  {
    id: "pouya-naseri",
    href: "/experts/pouya-naseri",
    name: "پویا ناصری",
    profession: "استادکار نازک‌کاری",
    primarySpecialty: "نازک‌کاری ساختمان",
    city: "اصفهان",
    experienceYears: 21,
    isVerified: true,
    rating: 4.7,
    reviewCount: 27,
    specialties: ["نازک‌کاری"],
    serviceSlugs: ["construction-workers"],
    discipline: "omran",
    hasLicense: false,
    track: "craftsman",
  },
  {
    id: "kian-mokhtari",
    href: "/experts/kian-mokhtari",
    name: "کیان مختاری",
    profession: "پیمانکار ساختمان",
    primarySpecialty: "مدیریت اجرای سازه",
    city: "تهران",
    experienceYears: 17,
    isVerified: true,
    rating: 4.8,
    reviewCount: 29,
    specialties: ["اسکلت بتنی", "مدیریت اجرا"],
    serviceSlugs: ["construction-workers"],
    discipline: "omran",
    degree: "bachelor",
    hasLicense: true,
    track: "contractor",
  },
  {
    id: "arezoo-taheri",
    href: "/experts/arezoo-taheri",
    name: "آرزو طاهری",
    profession: "پیمانکار بازسازی",
    primarySpecialty: "بازسازی و تکمیل",
    city: "کرج",
    experienceYears: 9,
    isVerified: true,
    rating: 4.6,
    reviewCount: 14,
    specialties: ["بازسازی", "نازک‌کاری"],
    serviceSlugs: ["construction-workers"],
    discipline: "memari",
    degree: "master",
    hasLicense: true,
    track: "contractor",
  },
  {
    id: "siavash-nouri",
    href: "/experts/siavash-nouri",
    name: "سیاوش نوری",
    profession: "مهندس برق",
    primarySpecialty: "ترسیم نقشه برق",
    city: "تهران",
    experienceYears: 9,
    isVerified: true,
    rating: 4.5,
    reviewCount: 8,
    specialties: ["نقشه برق"],
    serviceSlugs: ["drawing"],
    discipline: "bargh",
    degree: "bachelor",
    hasLicense: true,
  },
  {
    id: "yalda-heydari",
    href: "/experts/yalda-heydari",
    name: "یلدا حیدری",
    profession: "مهندس مکانیک",
    primarySpecialty: "ترسیم نقشه مکانیک",
    city: "شیراز",
    experienceYears: 7,
    isVerified: true,
    rating: 4.4,
    reviewCount: 6,
    specialties: ["نقشه مکانیک", "تهویه"],
    serviceSlugs: ["drawing"],
    discipline: "mechanic",
    degree: "master",
    hasLicense: true,
  },
  {
    id: "roya-ghasemi",
    href: "/experts/roya-ghasemi",
    name: "رویا قاسمی",
    profession: "مهندس معماری",
    primarySpecialty: "محوطه و فضای سبز",
    city: "اصفهان",
    experienceYears: 6,
    isVerified: true,
    rating: 4.5,
    reviewCount: 7,
    specialties: ["محوطه", "فضای سبز", "طراحی نما"],
    serviceSlugs: ["interior-design"],
    discipline: "memari",
    degree: "bachelor",
    hasLicense: true,
  },
  {
    id: "hassan-maleki",
    href: "/experts/hassan-maleki",
    name: "حسن ملکی",
    profession: "کارشناس بنیاد مسکن",
    primarySpecialty: "پیگیری پرونده بنیاد مسکن",
    city: "رشت",
    experienceYears: 11,
    isVerified: true,
    rating: 4.4,
    reviewCount: 9,
    specialties: ["بنیاد مسکن", "امور شهرداری"],
    serviceSlugs: ["administrative-services"],
    discipline: "shahrsazi",
    degree: "bachelor",
    hasLicense: false,
  },
];

const expertCards: readonly ExpertCardData[] = [
  ...namedExpertCards,
  ...extraListingExperts,
];

const degreeLabels: Record<string, string> = {
  associate: "فوق دیپلم",
  bachelor: "لیسانس",
  master: "فوق لیسانس",
  doctorate: "دکتری",
};

const disciplineLabels: Record<string, string> = {
  omran: "عمران",
  bargh: "برق",
  mechanic: "مکانیک",
  memari: "معماری",
  naghshe: "نقشه‌برداری",
  traffic: "ترافیک",
  shahrsazi: "شهرسازی",
  other: "سایر",
};

const organizationByCity: Record<string, string> = {
  تهران: "عضو سازمان نظام مهندسی استان تهران",
  کرج: "عضو سازمان نظام مهندسی استان البرز",
  رشت: "عضو سازمان نظام مهندسی استان گیلان",
  "بندر انزلی": "عضو سازمان نظام مهندسی استان گیلان",
  اصفهان: "عضو سازمان نظام مهندسی استان اصفهان",
  شیراز: "عضو سازمان نظام مهندسی استان فارس",
};

const portfolioAssets = [
  {
    src: "/images/portfolio/project-01.jpg",
    alt: "نمونه پروژه ساختمانی اجراشده",
  },
  {
    src: "/images/portfolio/project-02.jpg",
    alt: "نمونه مستندات یک پروژه مهندسی",
  },
  {
    src: "/images/portfolio/project-03.jpg",
    alt: "جزئیات نمونه‌کار مهندسی",
  },
  {
    src: "/images/portfolio/project-04.jpg",
    alt: "نمونه کار پیمانکاری ساختمان",
  },
] as const;

const portfolioTitles = [
  "نمونه پروژه اجرایی",
  "برداشت و مستندسازی پروژه",
  "جزئیات نهایی پروژه",
  "مرحله سازه و اجرا",
  "بازدید کارگاهی",
  "تحویل و مستندسازی",
] as const;

const reviewSeed: readonly Omit<ExpertReview, "id">[] = [
  {
    authorName: "امین قیاسی",
    authorRole: "مشتری",
    dateLabel: "۴ مرداد ۱۴۰۴",
    rating: 5,
    text: "با حوصله محدوده کار را توضیح دادند و زمان بازدید را دقیق رعایت کردند.",
    highlights: [
      { kind: "positive", label: "اشراف کامل به مسائل فنی" },
      { kind: "positive", label: "وقت‌شناسی" },
    ],
    replyText: "از اعتماد شما سپاسگزارم.",
  },
  {
    authorName: "مالک پروژه",
    authorRole: "مشتری",
    dateLabel: "هفته گذشته",
    rating: 4,
    text: "بازدید در زمان وعده‌داده‌شده انجام شد و گزارش کار برای ادامه پرونده قابل استفاده بود.",
    highlights: [{ kind: "positive", label: "تحویل کار طبق زمان توافق‌شده" }],
  },
  {
    authorName: "همکار ساختمانی",
    authorRole: "همکار",
    dateLabel: "ماه گذشته",
    rating: 5,
    text: "توضیح محدوده خدمت شفاف بود و هماهنگی بدون رفت‌وبرگشت اضافه پیش رفت.",
    highlights: [{ kind: "positive", label: "توضیح حین کار" }],
  },
  {
    authorName: "زهرا محمدی",
    authorRole: "مشتری",
    dateLabel: "۱۲ تیر ۱۴۰۴",
    rating: 5,
    text: "مدارک مورد نیاز را از همان ابتدا فهرست کردند و مسیر کار روشن بود.",
    highlights: [{ kind: "positive", label: "مهارت بالا" }],
    replyText: "موفقیت پروژه برای ما هم مهم است.",
  },
  {
    authorName: "کامران نوری",
    authorRole: "مشتری",
    dateLabel: "۲ خرداد ۱۴۰۴",
    rating: 4,
    text: "خروجی قابل استفاده بود؛ فقط هماهنگی مراجعه کمی بیشتر از انتظار طول کشید.",
    highlights: [
      { kind: "positive", label: "مهارت بالا" },
      { kind: "negative", label: "تأخیر در حضور" },
    ],
  },
  {
    authorName: "لیلا حسینی",
    authorRole: "مشتری",
    dateLabel: "۱۸ اردیبهشت ۱۴۰۴",
    rating: 5,
    text: "پاسخ‌گویی منظم بود و برای انتخاب مرحله بعدی کار خیال‌مان راحت شد.",
    highlights: [{ kind: "positive", label: "وقت‌شناسی" }],
  },
  {
    authorName: "سعید اکبری",
    authorRole: "مشتری",
    dateLabel: "۹ فروردین ۱۴۰۴",
    rating: 5,
    text: "گزارش نهایی مرتب و قابل ارائه به مرجع مربوط بود.",
    highlights: [{ kind: "positive", label: "اشراف کامل به مسائل فنی" }],
  },
  {
    authorName: "نرگس رضایی",
    authorRole: "مشتری",
    dateLabel: "۲۵ اسفند ۱۴۰۳",
    rating: 4,
    text: "مسیر کار را مرحله‌به‌مرحله گفتند و ابهام پرونده کمتر شد.",
    highlights: [{ kind: "positive", label: "توضیح حین کار" }],
  },
  {
    authorName: "بهرام یوسفی",
    authorRole: "مشتری",
    dateLabel: "۱۴ بهمن ۱۴۰۳",
    rating: 5,
    text: "بازدید میدانی دقیق انجام شد و نتیجه با مدارک ملک هم‌خوان بود.",
    highlights: [{ kind: "positive", label: "مهارت بالا" }],
  },
  {
    authorName: "مریم کاظمی",
    authorRole: "مشتری",
    dateLabel: "۳۰ دی ۱۴۰۳",
    rating: 5,
    text: "زمان‌بندی روشن بود و پس از اتمام کار جمع‌بندی شفافی دریافت کردیم.",
    highlights: [{ kind: "positive", label: "تحویل کار طبق زمان توافق‌شده" }],
  },
  {
    authorName: "جواد امینی",
    authorRole: "مشتری",
    dateLabel: "۸ آذر ۱۴۰۳",
    rating: 4,
    text: "برای مقایسه چند مسیر اجرایی توضیح کافی دادند و انتخاب ساده‌تر شد.",
    highlights: [{ kind: "positive", label: "اشراف کامل به مسائل فنی" }],
  },
];

function buildServiceCities(city?: string): readonly string[] {
  if (!city) {
    return [];
  }

  if (city === "رشت" || city === "بندر انزلی") {
    return [
      city,
      "رشت",
      "خمام",
      "فومن",
      "شفت",
      "لاهیجان",
      "لنگرود",
      "بندر انزلی",
    ].filter((item, index, items) => items.indexOf(item) === index);
  }

  if (city === "تهران" || city === "کرج") {
    return city === "تهران" ? ["تهران", "کرج"] : ["کرج", "تهران"];
  }

  return [city];
}

function buildPortfolio(expertId: string): readonly ExpertPortfolioItem[] {
  return portfolioTitles.map((title, index) => {
    const asset = portfolioAssets[index % portfolioAssets.length];

    return {
      id: `${expertId}-p${index + 1}`,
      title,
      imageSrc: asset?.src ?? "/images/portfolio/project-01.jpg",
      imageAlt: asset?.alt ?? "نمونه پروژه ساختمانی اجراشده",
    };
  });
}

function buildReviews(
  expertId: string,
  count: number,
): readonly ExpertReview[] {
  return reviewSeed.slice(0, count).map((review, index) => ({
    ...review,
    id: `${expertId}-r${index + 1}`,
  }));
}

function buildCertificates(
  expertId: string,
  hasLicense: boolean | undefined,
): readonly ExpertCertificate[] {
  if (hasLicense === false) {
    return [
      {
        id: `${expertId}-tvto`,
        title: "مدارک فنی و حرفه‌ای",
        issuer: "سازمان آموزش فنی و حرفه‌ای",
      },
    ];
  }

  return [
    {
      id: `${expertId}-license`,
      title: "پروانه اشتغال به کار مهندسی",
      issuer: "سازمان نظام مهندسی ساختمان",
    },
  ];
}

export const mockExperts: readonly ExpertProfile[] = expertCards.map(
  (expert, index) => {
    const degreeLabel = expert.degree
      ? (degreeLabels[expert.degree] ?? "کارشناسی")
      : "کارشناسی";
    const competencies =
      expert.hasLicense === false
        ? undefined
        : expert.discipline === "naghshe"
          ? (["طراحی", "نظارت"] as const)
          : (["طراحی", "نظارت", "اجرا"] as const);
    const reviewCount = expert.id === "amirhossein-rostami" ? 11 : 3;
    const reviews = buildReviews(expert.id, reviewCount);

    return {
      ...expert,
      viewCount: 180 + index * 17,
      shortIntroduction: `${expert.primarySpecialty ?? expert.profession}؛ آماده بررسی نیاز پروژه و ارائه مسیر اجرایی روشن.`,
      about:
        "این پروفایل نمایشی برای بررسی تجربه کاربری بازار متخصصان مهندس من است. اطلاعات واقعی متخصصان پس از اتصال سرویس عمومی پروفایل نمایش داده خواهد شد.",
      discipline: expert.discipline
        ? (disciplineLabels[expert.discipline] ?? expert.discipline)
        : expert.profession.includes("معماری")
          ? "معماری"
          : "عمران",
      serviceCities: buildServiceCities(expert.city),
      software:
        expert.track === "craftsman"
          ? undefined
          : expert.discipline === "memari"
            ? ["AutoCAD", "Revit", "SketchUp", "Lumion"]
            : expert.discipline === "omran"
              ? ["AutoCAD", "ETABS", "SAFE"]
              : ["AutoCAD", "Civil 3D"],
      education:
        expert.track === "craftsman" && !expert.degree
          ? undefined
          : [
              {
                degree: degreeLabel,
                field: expert.profession,
              },
            ],
      organizationMembership:
        expert.hasLicense === false
          ? undefined
          : {
              label: expert.city
                ? (organizationByCity[expert.city] ??
                  "عضو سازمان نظام مهندسی ساختمان")
                : "عضو سازمان نظام مهندسی ساختمان",
            },
      license:
        expert.hasLicense === false
          ? undefined
          : { title: "پروانه اشتغال", competencies },
      qualifications: competencies,
      certificates: buildCertificates(expert.id, expert.hasLicense),
      history: [
        `بیش از ${expert.experienceYears ?? 0} سال تجربه در پروژه‌های مرتبط با ${expert.primarySpecialty ?? expert.profession}.`,
        "مسیر کار، مدارک مورد نیاز و خروجی قابل ارائه را پیش از شروع همکاری روشن می‌کند.",
        expert.hasLicense === false
          ? "دارای سوابق اجرایی و مدارک فنی مرتبط با حوزه فعالیت."
          : "عضویت و صلاحیت حرفه‌ای بر اساس اطلاعات ثبت‌شده در پروفایل عمومی نمایش داده می‌شود.",
      ].join("\n\n"),
      portfolio: buildPortfolio(expert.id),
      reviews,
      reviewCount,
      relatedExperts: expertCards
        .filter(
          (item) =>
            item.id !== expert.id &&
            item.serviceSlugs?.some((slug) =>
              expert.serviceSlugs?.includes(slug),
            ),
        )
        .slice(0, 3),
    };
  },
);

const defaultProcess = [
  {
    id: "request",
    title: "نیازتان را مشخص کنید",
    description: "خدمت و شهر مورد نظر را انتخاب کنید.",
  },
  {
    id: "compare",
    title: "متخصصان را مقایسه کنید",
    description: "تخصص، سابقه و نمونه‌کارها را کنار هم ببینید.",
  },
  {
    id: "contact",
    title: "مستقیم ارتباط بگیرید",
    description: "پس از انتخاب، از راه تماس عمومی پروفایل گفتگو را شروع کنید.",
  },
] as const;

const surveyingFaqs = [
  {
    id: "survey-use",
    question: "نقشه‌برداری دقیقاً چه کاربردی دارد؟",
    answer:
      "نقشه‌برداری برای تعیین موقعیت، ابعاد، حدود و تراز ملک یا پروژه به‌کار می‌رود و مبنای بسیاری از تصمیم‌های ثبتی و اجرایی است.",
  },
  {
    id: "utm",
    question: "نقشه UTM چیست و چرا به آن نیاز داریم؟",
    answer:
      "نقشه UTM مختصات دقیق ملک را در یک سامانه مختصات مشخص ثبت می‌کند و در فرایندهایی مانند جانمایی، سند و بررسی حدود کاربرد دارد.",
  },
  {
    id: "documents",
    question: "برای تهیه نقشه UTM چه مدارکی لازم است؟",
    answer:
      "مدارک دقیق به نوع ملک و مرجع درخواست‌کننده بستگی دارد؛ تصویر سند و اطلاعات موقعیت ملک معمولاً نقطه شروع بررسی متخصص است.",
  },
  {
    id: "duration",
    question: "انجام خدمات نقشه‌برداری چقدر زمان می‌برد؟",
    answer:
      "زمان به مساحت، دسترسی، نوع برداشت و خروجی مورد نیاز وابسته است و پس از بررسی اولیه مشخص می‌شود.",
  },
  {
    id: "price",
    question: "هزینه خدمات نقشه‌برداری چگونه محاسبه می‌شود؟",
    answer:
      "مساحت، محل ملک، پیچیدگی سوابق و نوع خروجی در برآورد اثر دارند؛ برای عدد دقیق باید مدارک و موقعیت بررسی شود.",
  },
  {
    id: "as-built",
    question: "نقشه ازبیلت چیست؟",
    answer:
      "نقشه ازبیلت وضعیت اجراشده بنا یا تأسیسات را ثبت می‌کند تا تفاوت آن با نقشه طراحی مشخص شود.",
  },
  {
    id: "boundary",
    question: "جانمایی پلاک ثبتی چه زمانی لازم است؟",
    answer:
      "وقتی حدود ملک روی زمین با سند یا نقشه موجود هم‌خوانی ندارد، جانمایی پلاک ثبتی محل دقیق پلاک را مشخص می‌کند.",
  },
  {
    id: "access",
    question: "برای برداشت میدانی چه آمادگی لازم است؟",
    answer:
      "مسیر دسترسی، هماهنگی با ساکنان یا نگهبانی و تصویر مدارک ملک معمولاً زمان حضور در محل را کوتاه‌تر می‌کند.",
  },
  {
    id: "output",
    question: "خروجی نقشه‌برداری در چه قالبی تحویل می‌شود؟",
    answer:
      "قالب فایل به درخواست مرجع بستگی دارد؛ پیش از سفارش، فرمت مورد قبول همان مرجع را با متخصص هماهنگ کنید.",
  },
  {
    id: "apartment-split",
    question: "تفکیک آپارتمان با نقشه UTM چه تفاوتی دارد؟",
    answer:
      "تفکیک آپارتمان حدود واحدها را در ساختمان مشخص می‌کند؛ نقشه UTM بیشتر برای موقعیت و مختصات ملک به‌کار می‌رود.",
  },
  {
    id: "weather",
    question: "شرایط جوی روی زمان برداشت اثر دارد؟",
    answer:
      "بارندگی، پوشش گیاهی متراکم یا محدودیت دید می‌تواند زمان حضور در محل را جابه‌جا کند و باید در برنامه‌ریزی دیده شود.",
  },
] as const;

const serviceBase: Record<ServiceSlug, Omit<ServiceDetailData, "experts">> = {
  "land-surveying": {
    slug: "land-surveying",
    title: "شبکه مهندسان نقشه‌بردار ایران",
    eyebrow: "مهندس من",
    description:
      "برای برداشت دقیق، نقشه UTM، جانمایی پلاک ثبتی و نقشه ازبیلت، متخصص مناسب شهر خود را پیدا کنید.",
    longDescription:
      "از تعیین مختصات و حدود ملک تا مستندسازی وضعیت اجراشده، اطلاعات متخصصان را شفاف مقایسه کنید و مسیر مناسب پروژه را بشناسید.",
    imageSrc: "/images/home/hero-construction.png",
    imageAlt: "متخصصان در حال بررسی نقشه در کارگاه ساختمانی",
    accent: "teal",
    showSuggestedExperts: true,
    scopeItems: [
      "انجام خدمات نقشه‌برداری دقیق برای انواع املاک شامل اراضی مسکونی، تجاری و کشاورزی",
      "تهیه نقشه UTM ملک برای ارائه به اداره ثبت، دریافت سند تک‌برگ و تعیین مختصات دقیق ملک",
      "تهیه نقشه ازبیلت ساختمان جهت اخذ پایان کار",
      "تهیه نقشه تفکیک آپارتمان برای دریافت سند تفکیکی",
    ],
    specialties: [
      {
        id: "utm",
        title: "نقشه UTM",
        description:
          "تعیین مختصات دقیق و آماده‌سازی خروجی مورد نیاز فرایندهای ثبتی.",
      },
      {
        id: "cadastral",
        title: "جانمایی پلاک ثبتی",
        description: "بررسی سوابق و تطبیق موقعیت ملک با اطلاعات ثبتی.",
      },
      {
        id: "as-built",
        title: "نقشه ازبیلت",
        description:
          "ثبت وضعیت اجراشده ساختمان برای کنترل و پیگیری مراحل بعدی.",
      },
      {
        id: "apartment",
        title: "تفکیک آپارتمان",
        description: "برداشت و ترسیم بخش‌های مستقل و مشترک ساختمان.",
      },
    ],
    process: defaultProcess,
    faqs: surveyingFaqs,
  },
  "construction-workers": {
    slug: "construction-workers",
    title: "لیست استادکاران و پیمانکاران برتر کشور",
    eyebrow: "مهندس من",
    description:
      "از گودبرداری و سازه تا تأسیسات، نازک‌کاری و بازسازی، مجری مناسب پروژه را پیدا کنید.",
    longDescription:
      "پروفایل استادکاران و پیمانکاران را بر اساس حوزه اجرا، شهر و سابقه بررسی کنید؛ سپس برای ارزیابی دقیق محدوده کار مستقیم گفتگو کنید.",
    imageSrc: "/images/home/project-engineer.png",
    imageAlt: "مهندس در کارگاه در حال بررسی نقشه پروژه",
    accent: "orange",
    specialties: [
      {
        id: "structure",
        title: "اجرای سازه",
        description: "آرماتوربندی، قالب‌بندی و اجرای اسکلت بتنی یا فولادی.",
      },
      {
        id: "renovation",
        title: "بازسازی",
        description: "هماهنگی عملیات تخریب کنترل‌شده، اصلاح و تکمیل فضا.",
      },
      {
        id: "utilities",
        title: "تأسیسات",
        description: "اجرای برق، مکانیک و لوله‌کشی توسط نیروی متخصص.",
      },
      {
        id: "finishing",
        title: "نازک‌کاری",
        description: "اجرای دیوار، کف، رنگ و جزئیات پایانی ساختمان.",
      },
    ],
    process: defaultProcess,
    faqs: [
      {
        id: "contractor-choice",
        question: "چطور پیمانکار مناسب را انتخاب کنیم؟",
        answer:
          "حوزه تخصص، سابقه پروژه‌های مشابه، محدوده مسئولیت و شیوه گزارش‌دهی را پیش از شروع همکاری مقایسه کنید.",
      },
      {
        id: "scope",
        question: "چه اطلاعاتی برای برآورد اولیه لازم است؟",
        answer:
          "موقعیت پروژه، مرحله فعلی، نقشه‌ها، حجم تقریبی کار و زمان مورد انتظار به ارزیابی اولیه کمک می‌کند.",
      },
    ],
  },
  drawing: {
    slug: "drawing",
    title: "شبکه بزرگ مهندسان ترسیم نقشه کشور",
    eyebrow: "مهندس من",
    description:
      "برای نقشه‌های معماری، سازه، برق و مکانیک با متخصص همان رشته ارتباط بگیرید.",
    longDescription:
      "هر بخش از نقشه ساختمان مسئولیت و خروجی متفاوتی دارد. تخصص و نرم‌افزارهای مورد استفاده مهندسان را ببینید و فرد متناسب با مرحله پروژه را انتخاب کنید.",
    imageSrc: "/images/articles/surveying.jpg",
    imageAlt: "نقشه‌ها و ابزار بررسی پروژه مهندسی",
    accent: "blue",
    specialties: [
      {
        id: "architecture",
        title: "نقشه معماری",
        description: "پلان، نما، مقطع و جزئیات معماری.",
      },
      {
        id: "structure",
        title: "نقشه سازه",
        description: "طراحی و ترسیم سازه بتنی، فولادی و صنعتی.",
      },
      {
        id: "electrical",
        title: "نقشه برق",
        description: "جانمایی و مسیرهای برق و سیستم‌های مرتبط.",
      },
      {
        id: "mechanical",
        title: "نقشه مکانیک",
        description: "تأسیسات مکانیکی، لوله‌کشی و تهویه.",
      },
    ],
    process: defaultProcess,
    faqs: [
      {
        id: "drawing-types",
        question: "کدام نقشه‌ها برای پروژه لازم است؟",
        answer:
          "نیاز پروژه به مرحله طراحی، ضوابط محل و نوع بنا وابسته است؛ معماری، سازه، برق و مکانیک معمولاً باید هماهنگ بررسی شوند.",
      },
      {
        id: "software",
        question: "نرم‌افزار متخصص چه اهمیتی دارد؟",
        answer:
          "نرم‌افزار ابزار تولید است؛ مهم‌تر از آن، تسلط متخصص، هماهنگی بین رشته‌ها و انطباق خروجی با نیاز پروژه است.",
      },
    ],
  },
  "interior-design": {
    slug: "interior-design",
    title: "سامانه ارتباط رایگان با متخصصین طراحی نما و داخلی",
    eyebrow: "مهندس من",
    description:
      "طراح مناسب را برای نمای ساختمان، فضای داخلی یا محوطه پروژه پیدا کنید.",
    longDescription:
      "طراحی حرفه‌ای باید زیبایی، عملکرد، بودجه و امکان اجرا را کنار هم ببیند. نمونه‌کارها و رویکرد هر طراح را پیش از ارتباط بررسی کنید.",
    imageSrc: "/images/home/interior-design.png",
    imageAlt: "فضای داخلی روشن و معاصر",
    accent: "violet",
    specialties: [
      {
        id: "facade",
        title: "طراحی نما",
        description: "هویت بیرونی ساختمان با توجه به زمینه و امکان اجرا.",
      },
      {
        id: "interior",
        title: "طراحی داخلی",
        description: "سازمان‌دهی فضا، نور، متریال و جزئیات داخلی.",
      },
      {
        id: "landscape",
        title: "محوطه‌سازی",
        description: "طراحی مسیر، فضای سبز و ارتباط فضای باز با بنا.",
      },
    ],
    process: defaultProcess,
    faqs: [
      {
        id: "designer",
        question: "طراح داخلی چه کمکی به پروژه می‌کند؟",
        answer:
          "طراح نیازهای فضایی، نور، متریال، مبلمان و جزئیات اجرا را در یک راه‌حل هماهنگ جمع می‌کند.",
      },
      {
        id: "brief",
        question: "پیش از شروع طراحی چه چیزهایی آماده کنیم؟",
        answer:
          "ابعاد یا نقشه وضع موجود، نیازهای کاربران، محدودیت بودجه و نمونه‌های سلیقه‌ای نقطه شروع مناسبی هستند.",
      },
    ],
  },
  "building-permit": {
    slug: "building-permit",
    title: "سامانه ارتباط رایگان با مهندسین دریافت پروانه ساخت",
    eyebrow: "مهندس من",
    description:
      "برای بررسی مدارک، نقشه‌ها و مراحل فنی پروانه یا پایان کار، متخصص مرتبط را پیدا کنید.",
    longDescription:
      "فرایند دقیق به موقعیت و مرجع محلی وابسته است. متخصص می‌تواند مدارک موجود را بررسی کند، نیازهای فنی را توضیح دهد و مسیر اقدام را شفاف سازد.",
    imageSrc: "/images/home/hero-construction.png",
    imageAlt: "بررسی نقشه‌های ساختمانی در پروژه",
    accent: "green",
    specialties: [
      {
        id: "permit",
        title: "پروانه ساخت",
        description: "بررسی نیازهای فنی و مدارک مرحله صدور پروانه.",
      },
      {
        id: "completion",
        title: "پایان کار",
        description: "هماهنگی مدارک و نقشه‌های لازم برای پایان کار.",
      },
      {
        id: "as-built",
        title: "نقشه وضع موجود",
        description: "مستندسازی وضعیت اجرا برای مقایسه و پیگیری.",
      },
    ],
    process: defaultProcess,
    faqs: [
      {
        id: "permit-what",
        question: "پروانه ساخت چیست؟",
        answer:
          "پروانه ساخت مجوز شروع عملیات ساختمانی در محدوده ضوابط مرجع محلی است و مشخصات اصلی پروژه را ثبت می‌کند.",
      },
      {
        id: "completion-what",
        question: "پایان کار چه کاربردی دارد؟",
        answer:
          "پایان کار وضعیت اتمام ساختمان و بررسی آن در چارچوب فرایند مرجع محلی را مشخص می‌کند.",
      },
    ],
  },
  "administrative-services": {
    slug: "administrative-services",
    title: "سامانه ارتباط رایگان با متخصصین انجام خدمات اداری",
    eyebrow: "مهندس من",
    description:
      "برای امور ثبتی، شهرداری، بنیاد مسکن و تغییر کاربری، کارشناس آشنا به فرایند را پیدا کنید.",
    longDescription:
      "کارشناس خدمات اداری مسیر پرونده، مدارک و مراجعات را روشن می‌کند. جزئیات هر پرونده باید با توجه به مرجع و وضعیت واقعی آن بررسی شود.",
    imageSrc: "/images/home/project-engineer.png",
    imageAlt: "کارشناس پروژه در حال بررسی مدارک و نقشه",
    accent: "rose",
    specialties: [
      {
        id: "registry",
        title: "امور ثبتی و سند",
        description: "پیگیری مدارک مرتبط با اداره ثبت و سند مالکیت.",
      },
      {
        id: "municipality",
        title: "امور شهرداری",
        description: "هماهنگی فرایندهای اداری پروانه و پایان کار.",
      },
      {
        id: "land-use",
        title: "تغییر کاربری",
        description: "بررسی مسیر اداری و مدارک اولیه تغییر کاربری.",
      },
      {
        id: "housing",
        title: "بنیاد مسکن",
        description: "پیگیری امور مرتبط با پرونده‌های بنیاد مسکن.",
      },
    ],
    process: defaultProcess,
    faqs: [
      {
        id: "admin-what",
        question: "خدمات اداری ساختمان شامل چه کارهایی است؟",
        answer:
          "بسته به پرونده می‌تواند شامل پیگیری ثبتی، شهرداری، پروانه، پایان کار، تغییر کاربری یا امور بنیاد مسکن باشد.",
      },
      {
        id: "documents",
        question: "چه مدارکی باید آماده باشد؟",
        answer:
          "مدارک به نوع پرونده وابسته است. متخصص پس از بررسی اولیه، فهرست مورد نیاز همان مسیر را مشخص می‌کند.",
      },
    ],
  },
};

export const mockServiceDetails: readonly ServiceDetailData[] = Object.values(
  serviceBase,
).map((service) => ({
  ...service,
  experts: expertCards.filter((expert) =>
    expert.serviceSlugs?.includes(service.slug),
  ),
}));

export {
  mockArticleCategories,
  mockArticles,
} from "@/lib/mock-data/articles-mock-data/articles-mock-data";

export const mockFaqCategories: readonly FaqCategoryDetail[] = [
  {
    slug: "land-surveying",
    href: "/faq/land-surveying",
    title: "نقشه‌برداری و سند مالکیت",
    description: "پرسش‌های رایج درباره UTM، مدارک، زمان و کاربرد نقشه‌ها.",
    relatedServiceHref: "/services/land-surveying",
    relatedServiceLabel: "نقشه‌برداری",
    items: surveyingFaqs,
  },
  {
    slug: "construction",
    href: "/faq/construction",
    title: "پیمانکاری و استادکاری",
    description: "شروع همکاری، محدوده کار و انتخاب مجری.",
    relatedServiceHref: "/services/construction-workers",
    relatedServiceLabel: "استادکار و پیمانکار",
    items: serviceBase["construction-workers"]?.faqs ?? [],
  },
  {
    slug: "drawing",
    href: "/faq/drawing",
    title: "ترسیم نقشه ساختمان",
    description: "معماری، سازه، برق، مکانیک و هماهنگی نقشه‌ها.",
    relatedServiceHref: "/services/drawing",
    relatedServiceLabel: "ترسیم نقشه",
    items: serviceBase.drawing?.faqs ?? [],
  },
  {
    slug: "permit",
    href: "/faq/permit",
    title: "پروانه ساخت و پایان کار",
    description: "مفاهیم اولیه و مسیر بررسی مدارک.",
    relatedServiceHref: "/services/building-permit",
    relatedServiceLabel: "پروانه ساخت",
    items: serviceBase["building-permit"]?.faqs ?? [],
  },
  {
    slug: "registration",
    href: "/faq/registration",
    title: "ثبت‌نام متخصصان",
    description: "اطلاعات لازم برای ساخت پروفایل حرفه‌ای.",
    items: [
      {
        id: "registration-data",
        question: "برای ثبت‌نام چه اطلاعاتی لازم است؟",
        answer:
          "هویت، محدوده خدمت، تخصص‌ها، اطلاعات حرفه‌ای، تحصیلات و نمونه‌کارها طی چند مرحله دریافت می‌شوند. ثبت نهایی به اتصال سرویس ثبت‌نام وابسته است.",
      },
    ],
  },
];

export const mockKnowledgeCategories: readonly KnowledgeCategoryDetail[] = [
  {
    slug: "land-surveying",
    href: "/knowledge/land-surveying",
    title: "نقشه‌برداری و سند مالکیت",
    description: "نکته‌های کوتاه پیش از برداشت و پیگیری امور ملک.",
    relatedServiceHref: "/services/land-surveying",
    relatedServiceLabel: "نقشه‌برداری",
    tips: [
      {
        id: "survey-tip-1",
        title: "نکته ۱",
        body: "پیش از حضور نقشه‌بردار، تصویر مدارک ملک و موقعیت دسترسی را آماده کنید تا نوع برداشت بهتر مشخص شود.",
      },
      {
        id: "survey-tip-2",
        title: "نکته ۲",
        body: "در پروژه‌های اجرایی، نقاط مبنای ارتفاعی باید در محل امن و خارج از محدوده عملیات تثبیت شوند.",
      },
      {
        id: "survey-tip-3",
        title: "نکته ۳",
        body: "نام خروجی مورد درخواست مرجع اداری را دقیق بپرسید؛ UTM، ازبیلت و تفکیک آپارتمان کاربرد یکسان ندارند.",
      },
      {
        id: "survey-tip-4",
        title: "مدارک را یک‌جا جمع کنید",
        body: "تصویر سند، قبوض یا نقشه‌های قبلی را پیش از تماس آماده کنید تا نوع برداشت روشن‌تر شود.",
      },
      {
        id: "survey-tip-5",
        title: "مسیر دسترسی را شرح دهید",
        body: "آدرس دقیق، محدودیت پارک و هماهنگی با نگهبانی زمان حضور در محل را کوتاه می‌کند.",
      },
      {
        id: "survey-tip-6",
        title: "حدود ملک را روی زمین مشخص کنید",
        body: "اگر دیوار، پرچین یا نشانه قدیمی دارید، محل آن را به نقشه‌بردار نشان دهید.",
      },
      {
        id: "survey-tip-7",
        title: "مرجع درخواست‌کننده را نام ببرید",
        body: "شهرداری، ثبت یا بانک ممکن است قالب فایل متفاوتی بخواهند.",
      },
      {
        id: "survey-tip-8",
        title: "خروجی را با نیاز پرونده بسنجید",
        body: "نقشه UTM، جانمایی و ازبیلت جایگزین یکدیگر نیستند.",
      },
      {
        id: "survey-tip-9",
        title: "شرایط جوی را در برنامه ببینید",
        body: "بارندگی یا پوشش گیاهی متراکم می‌تواند زمان برداشت را جابه‌جا کند.",
      },
      {
        id: "survey-tip-10",
        title: "پس از تحویل فایل را بازبینی کنید",
        body: "نام مالک، پلاک و مقیاس را با مدارک موجود تطبیق دهید.",
      },
      {
        id: "survey-tip-11",
        title: "نسخه قابل چاپ را جداگانه بخواهید",
        body: "اگر مرجع اداری نسخه کاغذی می‌خواهد، این نیاز را هنگام سفارش اعلام کنید.",
      },
    ],
  },
  {
    slug: "permit",
    href: "/knowledge/permit",
    title: "پروانه ساخت",
    description: "آمادگی مدارک و هماهنگی مراحل فنی.",
    relatedServiceHref: "/services/building-permit",
    relatedServiceLabel: "پروانه ساخت",
    tips: [
      {
        id: "permit-tip-1",
        title: "مدارک را مرحله‌بندی کنید",
        body: "مدارک مالکیت، نقشه‌ها و مکاتبات را بر اساس مرحله پرونده مرتب کنید تا بررسی اولیه سریع‌تر انجام شود.",
      },
    ],
  },
  {
    slug: "design",
    href: "/knowledge/design",
    title: "طراحی نما و داخلی",
    description: "نکته‌های تعریف نیاز، نور، متریال و اجرا.",
    relatedServiceHref: "/services/interior-design",
    relatedServiceLabel: "طراحی نما و داخلی",
    tips: [
      {
        id: "design-tip-1",
        title: "شرح نیاز را پیش از طرح آماده کنید",
        body: "نیازهای کاربران، محدودیت بودجه و اولویت‌های عملکردی را پیش از انتخاب سبک ثبت کنید.",
      },
    ],
  },
  {
    slug: "execution",
    href: "/knowledge/execution",
    title: "نکات اجرایی و فنی",
    description: "یادآوری‌های کوتاه برای هماهنگی بهتر در کارگاه.",
    relatedServiceHref: "/services/construction-workers",
    relatedServiceLabel: "پیمانکاری و اجرا",
    tips: [
      {
        id: "execution-tip-1",
        title: "تحویل هر مرحله را ثبت کنید",
        body: "پیش از شروع مرحله بعد، وضعیت اجرای فعلی و موارد نیازمند اصلاح را مستند کنید.",
      },
    ],
  },
];

export const mockHomePopularServices = [
  {
    id: "utm",
    title: "نقشه‌برداری (سند مالکیت)",
    description: "برداشت دقیق و خروجی مناسب پیگیری ملک",
    href: "/services/land-surveying",
    imageSrc: "/images/articles/surveying.jpg",
  },
  {
    id: "mason",
    title: "بنای سیمانکار",
    description: "انتخاب استادکار اجرای بنا و نازک‌کاری",
    href: "/services/construction-workers",
    imageSrc: "/images/home/hero-construction.png",
  },
  {
    id: "registry",
    title: "خدمات اداری اداره ثبت",
    description: "امور ثبتی، سند و پیگیری پرونده ملک",
    href: "/services/administrative-services",
    imageSrc: "/images/portfolio/project-02.jpg",
  },
  {
    id: "structure",
    title: "پیمانکار اسکلت ساختمان",
    description: "مقایسه مجریان سازه و اسکلت",
    href: "/services/construction-workers",
    imageSrc: "/images/home/project-engineer.png",
  },
  {
    id: "facade",
    title: "طراحی نمای ساختمان",
    description: "انتخاب طراح بر اساس رویکرد و نمونه‌کار",
    href: "/services/interior-design",
    imageSrc: "/images/home/interior-design.png",
  },
  {
    id: "permit",
    title: "دریافت پروانه ساخت",
    description: "مسیر بررسی مدارک و پروانه ساختمان",
    href: "/services/building-permit",
    imageSrc: "/images/portfolio/project-01.jpg",
  },
] as const;

export const mockDrawingServices = [
  {
    id: "architectural",
    title: "ترسیم نقشه معماری",
    description: "پلان، نما، مقطع و جزئیات",
    href: "/services/drawing",
  },
  {
    id: "structural",
    title: "ترسیم نقشه سازه",
    description: "بتنی، فولادی و صنعتی",
    href: "/services/drawing",
  },
  {
    id: "electrical",
    title: "ترسیم نقشه برق",
    description: "برق و سیستم‌های مرتبط",
    href: "/services/drawing",
  },
  {
    id: "mechanical",
    title: "ترسیم نقشه مکانیک",
    description: "تهویه، لوله‌کشی و تأسیسات",
    href: "/services/drawing",
  },
] as const;

export const mockExpertCards = expertCards;

export {
  mockEngineerConversations,
  mockEngineerCredentials,
  mockEngineerMessagesByConversation,
  mockEngineerNotifications,
  mockEngineerPublicExpertId,
  mockEngineerRequests,
} from "@/lib/mock-data/engineer-workspace-mock-data";
