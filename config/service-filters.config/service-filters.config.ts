import { EDUCATION_API_LEVELS } from "@/lib/registration/education-levels/education-levels";
import { type FilterOption } from "@/lib/service/service-query/service-query";

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
  errorTitle: "دریافت فهرست متخصصان ممکن نشد",
  errorDescription: "اتصال به سرور برقرار نشد. کمی بعد دوباره تلاش کنید.",
  retryLabel: "تلاش مجدد",
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
  sortLabel: "مرتب‌سازی",
  allOptionLabel: "همه",
  defaultSortLabel: "پیش‌فرض",
} as const;

export const licenseFilterOptions: readonly FilterOption[] = [
  { id: "licensed", label: "دارای پروانه اشتغال" },
];

/** Degree ids are the backend's education level codes. */
export const degreeFilterOptions: readonly FilterOption[] =
  EDUCATION_API_LEVELS.map((level) => ({ id: level.id, label: level.label }));

export const sortFilterOptions: readonly FilterOption[] = [
  { id: "newest", label: "جدیدترین" },
  { id: "rating", label: "بیشترین امتیاز" },
  { id: "popular", label: "پربازدیدترین" },
  { id: "experience", label: "بیشترین سابقه" },
];
