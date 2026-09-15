import { type ServiceSlug } from "@/config/services.config/services.config";
import {
  type ExperienceBand,
  type FilterKey,
  type FilterOption,
  type ServiceTabOption,
} from "@/lib/service/filter-experts/filter-experts";

export const serviceFilterCopy = {
  expertsHeading: "متخصصان این حوزه",
  foundSuffix: "متخصص متناسب با انتخاب شما",
  filtersLabel: "فیلترها",
  applyLabel: "اعمال فیلتر",
  resetLabel: "حذف فیلترها",
  allCitiesLabel: "همه شهرها",
  cityFilterLabel: "فیلتر شهر",
  resultCountLabel: "تعداد نتایج",
  paginationLabel: "صفحه‌بندی متخصصان",
  previousLabel: "قبلی",
  nextLabel: "بعدی",
  emptyTitle: "متخصصی با این ترکیب پیدا نشد",
  emptyDescription: "شهر یا فیلترها را تغییر دهید تا متخصصان بیشتری دیده شوند.",
  changeCityLabel: "تغییر شهر",
  suggestedTitle: "متخصصان پیشنهادی مهندس من",
  scopeAccordionTitle: "خدمات این حوزه شامل",
  overlayTitle: "فیلتر متخصصان",
  overlayDescription: "شهر، تخصص، سابقه و مدارک را محدود کنید.",
  skillLabel: "دسته‌بندی خدمات",
  experienceLabel: "سابقه کار",
  licenseLabel: "پروانه نظام مهندسی",
  disciplineLabel: "رشته تحصیلی",
  degreeLabel: "مدرک تحصیلی",
  allOptionLabel: "همه",
} as const;

const threeBandExperience: readonly ExperienceBand[] = [
  { id: "0-5", label: "۰ تا ۵ سال", min: 0, max: 5 },
  { id: "5-15", label: "۵ تا ۱۵ سال", min: 6, max: 15 },
  { id: "15+", label: "بیش از ۱۵ سال", min: 16, max: null },
];

const fourBandExperience: readonly ExperienceBand[] = [
  { id: "0-5", label: "۰ تا ۵ سال", min: 0, max: 5 },
  { id: "5-10", label: "۵ تا ۱۰ سال", min: 6, max: 10 },
  { id: "10-15", label: "۱۰ تا ۱۵ سال", min: 11, max: 15 },
  { id: "15+", label: "بیش از ۱۵ سال", min: 16, max: null },
];

export const licenseFilterOptions: readonly FilterOption[] = [
  { id: "licensed", label: "دارای پروانه اشتغال" },
  { id: "unlicensed", label: "بدون پروانه" },
];

export const disciplineFilterOptions: readonly FilterOption[] = [
  { id: "omran", label: "عمران" },
  { id: "memari", label: "معماری" },
  { id: "naghshe", label: "نقشه‌برداری" },
  { id: "bargh", label: "برق" },
  { id: "mechanic", label: "مکانیک" },
  { id: "shahrsazi", label: "شهرسازی" },
  { id: "traffic", label: "ترافیک" },
  { id: "other", label: "سایر" },
];

export const degreeFilterOptions: readonly FilterOption[] = [
  { id: "associate", label: "فوق دیپلم" },
  { id: "bachelor", label: "لیسانس" },
  { id: "master", label: "فوق لیسانس" },
  { id: "doctorate", label: "دکتری" },
];

const allFilterKeys: readonly FilterKey[] = [
  "city",
  "skill",
  "experience",
  "license",
  "discipline",
  "degree",
];

export type ServiceFilterDefinition = {
  keys: readonly FilterKey[];
  skills: readonly FilterOption[];
  experienceBands: readonly ExperienceBand[];
  tabs: readonly ServiceTabOption[];
};

export const serviceFilterDefinitions: Partial<
  Record<ServiceSlug, ServiceFilterDefinition>
> = {
  "land-surveying": {
    keys: allFilterKeys,
    experienceBands: threeBandExperience,
    tabs: [],
    skills: [
      {
        id: "utm",
        label: "نقشه UTM، شمیم و تفکیک",
        matchTerms: ["نقشه UTM", "شمیم"],
      },
      {
        id: "apartment",
        label: "تفکیک آپارتمان",
        matchTerms: ["تفکیک آپارتمان"],
      },
      {
        id: "drone",
        label: "نقشه‌برداری با پهپاد",
        matchTerms: ["پهپاد"],
      },
    ],
  },
  "construction-workers": {
    keys: allFilterKeys,
    experienceBands: fourBandExperience,
    tabs: [
      {
        id: "craftsman",
        label: "استادکار ساختمان",
        matchBy: "track",
        hiddenFilters: ["license", "degree"],
      },
      {
        id: "contractor",
        label: "پیمانکار ساختمان",
        matchBy: "track",
      },
    ],
    skills: [
      {
        id: "structure",
        label: "اجرای سازه",
        matchTerms: ["اسکلت", "سازه"],
      },
      {
        id: "renovation",
        label: "بازسازی",
        matchTerms: ["بازسازی"],
      },
      {
        id: "utilities",
        label: "تأسیسات",
        matchTerms: ["تأسیسات", "تاسیسات", "لوله‌کشی"],
      },
      {
        id: "finishing",
        label: "نازک‌کاری",
        matchTerms: ["نازک‌کاری"],
      },
    ],
  },
  drawing: {
    keys: allFilterKeys,
    experienceBands: fourBandExperience,
    tabs: [
      {
        id: "architecture",
        label: "معماری",
        matchBy: "skill",
        matchTerms: ["نقشه معماری", "طراحی داخلی", "طراحی نما", "فاز دو"],
        hiddenFilters: ["skill"],
      },
      {
        id: "structure",
        label: "سازه",
        matchBy: "skill",
        matchTerms: ["سازه بتنی", "سازه فولادی", "ETABS", "صنعتی"],
      },
      {
        id: "electrical",
        label: "برق",
        matchBy: "skill",
        matchTerms: ["برق"],
        hiddenFilters: ["skill"],
      },
      {
        id: "mechanical",
        label: "مکانیک",
        matchBy: "skill",
        matchTerms: ["مکانیک", "تهویه"],
        hiddenFilters: ["skill"],
      },
    ],
    skills: [
      {
        id: "concrete",
        label: "سازه بتنی",
        matchTerms: ["سازه بتنی", "بتنی"],
      },
      {
        id: "steel",
        label: "سازه فولادی",
        matchTerms: ["سازه فولادی", "فولادی"],
      },
      {
        id: "industrial",
        label: "سازه صنعتی",
        matchTerms: ["صنعتی"],
      },
    ],
  },
  "interior-design": {
    keys: allFilterKeys,
    experienceBands: fourBandExperience,
    tabs: [],
    skills: [
      {
        id: "facade",
        label: "طراحی نما",
        matchTerms: ["طراحی نما"],
      },
      {
        id: "interior",
        label: "طراحی داخلی",
        matchTerms: ["طراحی داخلی"],
      },
      {
        id: "landscape",
        label: "محوطه و فضای سبز",
        matchTerms: ["محوطه", "فضای سبز"],
      },
    ],
  },
  "building-permit": {
    keys: allFilterKeys,
    experienceBands: fourBandExperience,
    tabs: [],
    skills: [
      {
        id: "permit",
        label: "پروانه ساخت",
        matchTerms: ["پروانه ساخت"],
      },
      {
        id: "completion",
        label: "پایان کار",
        matchTerms: ["پایان کار"],
      },
      {
        id: "as-built",
        label: "نقشه ازبیلت",
        matchTerms: ["ازبیلت"],
      },
    ],
  },
  "administrative-services": {
    keys: allFilterKeys,
    experienceBands: fourBandExperience,
    tabs: [],
    skills: [
      {
        id: "registry",
        label: "امور ثبتی و سند",
        matchTerms: ["ثبتی", "سند مالکیت"],
      },
      {
        id: "municipality",
        label: "امور شهرداری",
        matchTerms: ["امور شهرداری"],
      },
      {
        id: "land-use",
        label: "تغییر کاربری",
        matchTerms: ["تغییر کاربری"],
      },
      {
        id: "housing",
        label: "بنیاد مسکن",
        matchTerms: ["بنیاد مسکن"],
      },
    ],
  },
};

export const defaultServiceFilterDefinition: ServiceFilterDefinition = {
  keys: ["city", "experience"],
  skills: [],
  experienceBands: threeBandExperience,
  tabs: [],
};

export function getServiceFilterDefinition(
  slug: ServiceSlug,
): ServiceFilterDefinition {
  return serviceFilterDefinitions[slug] ?? defaultServiceFilterDefinition;
}
