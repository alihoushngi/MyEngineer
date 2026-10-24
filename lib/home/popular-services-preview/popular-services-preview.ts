type PopularServicePreviewItem = {
  id: string;
  title: string;
  description: string;
  href?: string;
  imageSrc?: string;
};

export const popularServicesPreviewModes = [
  "demo",
  "worst",
  "empty",
  "one",
  "many",
] as const;

export type PopularServicesPreviewMode =
  (typeof popularServicesPreviewModes)[number];

export function parsePopularServicesPreviewMode(
  value: string | string[] | undefined,
): PopularServicesPreviewMode {
  const candidate = Array.isArray(value) ? value[0] : value;
  return popularServicesPreviewModes.includes(
    candidate as PopularServicesPreviewMode,
  )
    ? (candidate as PopularServicesPreviewMode)
    : "demo";
}

export function getPopularServicesPreview(
  items: readonly PopularServicePreviewItem[],
  mode: PopularServicesPreviewMode,
): readonly PopularServicePreviewItem[] {
  if (mode === "empty") return [];
  if (mode === "one") return items.slice(0, 1);
  if (mode === "many") {
    if (items.length === 0) return [];
    return Array.from({ length: 1000 }, (_, index) => {
      const item = items[index % items.length];
      if (!item) return null;
      return { ...item, id: `preview-${index}` };
    }).filter((item): item is PopularServicePreviewItem => item !== null);
  }
  if (mode === "worst") {
    const brokenImageSrc = items
      .find((item) => item.imageSrc)
      ?.imageSrc?.replace(/([?#].*)?$/, ".missing-preview$1");

    return [
      {
        id: "preview-long-title",
        title: "خدمات تخصصی نقشه برداری ثبتی و جانمایی دقیق املاک دارای اسناد قدیمی",
        description: "عنوان بلند واقعی",
        href: items[0]?.href,
        imageSrc: items[0]?.imageSrc,
      },
      {
        id: "preview-missing-image",
        title: "بنایی",
        description: "تصویر خالی",
        href: items[1]?.href,
      },
      {
        id: "preview-broken-image",
        title: "خدمات اداری اداره ثبت اسناد و املاک",
        description: "تصویر خراب",
        href: items[2]?.href,
        imageSrc: brokenImageSrc,
      },
      {
        id: "preview-missing-route",
        title: "پیمانکار اجرای اسکلت ساختمان",
        description: "مسیر ناموجود",
        imageSrc: items[3]?.imageSrc,
      },
      {
        id: "preview-short-title",
        title: "گچ",
        description: "عنوان کوتاه",
        href: items[4]?.href,
        imageSrc: items[4]?.imageSrc,
      },
      ...items.slice(5),
    ];
  }
  return items;
}
