import type { ServiceCategory } from "../../../config/services.config/services.config";

export const homeServiceCategoryArtworkBySlug: Readonly<Record<string, string>> = {
  "نقشه-برداری": "/images/services/surveying.png",
  "استادکار-ساختمان": "/images/services/contractor.png",
  "ترسیم-نقشه": "/images/services/engineeringservice.png",
  "طراحی-داخلی-طراحی-نما": "/images/services/designer.png",
  "اخذ-پروانه-ساخت-اخد-پایان-کار": "/images/services/license.png",
  "خدمات-اداری": "/images/services/adminastrative.png",
};

const referencePosition = new Map(
  Object.keys(homeServiceCategoryArtworkBySlug).map((slug, index) => [
    slug,
    index,
  ]),
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
  const presentationFallback = homeServiceCategoryArtworkBySlug[category.slug];

  if (serverSource && serverSource !== failedSource) {
    return serverSource;
  }

  if (presentationFallback && presentationFallback !== failedSource) {
    return presentationFallback;
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
