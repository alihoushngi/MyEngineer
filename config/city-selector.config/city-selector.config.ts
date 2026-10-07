export const popularCityNames: readonly string[] = [
  "تهران",
  "مشهد",
  "اصفهان",
  "شیراز",
];

export const citySelectorCopy = {
  title: "انتخاب شهر",
  description:
    "یک یا چند شهر را انتخاب کنید تا متخصصان همان شهرها نمایش داده شوند.",
  searchLabel: "جستجوی شهر",
  searchPlaceholder: "جستجوی شهر...",
  provinceLabel: "استان",
  provincePlaceholder: "استان را انتخاب کنید",
  allProvincesLabel: "همه استان‌ها",
  citiesLabel: "شهرها",
  popularTitle: "شهرهای پرکاربرد",
  selectedTitle: "شهرهای انتخاب‌شده",
  clearAllLabel: "حذف همه",
  cancelLabel: "انصراف",
  confirmLabel: "تأیید",
  emptyHint: "استان را انتخاب کنید یا نام شهر را جستجو کنید.",
  noResults: "شهری یافت نشد.",
  loading: "در حال بارگذاری…",
  retryLabel: "تلاش مجدد",
  limitReached: (max: string) => `حداکثر ${max} شهر قابل انتخاب است.`,
  removeCity: (name: string) => `حذف ${name}`,
  selectionLabel: (count: string) => `تأیید (${count})`,
} as const;
