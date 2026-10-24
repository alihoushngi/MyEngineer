import type { ServiceCategory } from "../../../config/services.config/services.config";

const referenceCategoryOrder = [
  "نقشه-برداری",
  "استادکار-ساختمان",
  "ترسیم-نقشه",
  "طراحی-داخلی-طراحی-نما",
  "اخذ-پروانه-ساخت-اخد-پایان-کار",
  "خدمات-اداری",
] as const;

const referencePosition = new Map<string, number>(
  referenceCategoryOrder.map((slug, index) => [slug, index]),
);

export function orderHomeServiceCategories(
  categories: readonly ServiceCategory[],
): readonly ServiceCategory[] {
  return categories
    .map((category, index) => ({
      category,
      index,
      order: referencePosition.get(category.slug) ?? Number.MAX_SAFE_INTEGER,
    }))
    .sort((a, b) => a.order - b.order || a.index - b.index)
    .map(({ category }) => category);
}

export function getHomeServiceCategoryImageSource(
  category: ServiceCategory,
  failedSource?: string,
): string | undefined {
  const serverSource = category.imageSrc?.trim();

  if (serverSource && serverSource !== failedSource) {
    return serverSource;
  }

  return undefined;
}

export function getHomeServiceCategoryLabel(category: ServiceCategory): string {
  return category.label?.trim() || category.slug?.trim() || "خدمت بدون نام";
}

export function getHomeServiceCategoryHref(
  category: ServiceCategory,
): string | undefined {
  const slug = category.slug?.trim();
  return slug && category.href === `/services/${slug}`
    ? category.href
    : undefined;
}
