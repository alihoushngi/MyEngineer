export type ServiceSlug = string;

export type ServiceCategory = {
  slug: ServiceSlug;
  label: string;
  href: `/services/${string}`;
  description: string;
  id?: number;
  imageSrc?: string;
};

/**
 * Static storefront taxonomy kept as a visual/design fallback only when the
 * live `/services` tree is unavailable. Prefer `listServiceCategories()`.
 */
export const serviceCategories: readonly ServiceCategory[] = [];

export function getServiceCategory(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((service) => service.slug === slug);
}

export const serviceDiscoveryCopy = {
  breadcrumb: "خدمات",
  emptyTitle: "متخصصی برای این خدمت پیدا نشد.",
  emptyDescription: "شهر را تغییر دهید یا یکی از خدمات دیگر را ببینید.",
  homeCta: "بازگشت به خانه",
  expertsCta: "مشاهده متخصصان",
  scopeLabel: "دامنه خدمت",
  scopeTitle: "این خدمت چه مسئله‌ای را حل می‌کند؟",
  processLabel: "مسیر همکاری",
  processTitle: "از تعریف نیاز تا شروع کار",
  prepareTitle: "پیش از تماس آماده باشید",
  prepareBody:
    "موقعیت پروژه، مرحله فعلی، مدارک موجود و خروجی مورد انتظار را کوتاه و روشن بنویسید؛ این اطلاعات مقایسه متخصصان را دقیق‌تر می‌کند.",
  faqLabel: "پرسش‌های متداول",
  faqTitle: "پیش از انتخاب متخصص",
  relatedTitle: "خدمات مرتبط",
} as const;
