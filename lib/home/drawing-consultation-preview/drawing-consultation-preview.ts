import type { HomeDrawingService } from "../../../types/store/home.types.js";

export const drawingConsultationPreviewModes = [
  "demo",
  "worst",
  "empty",
  "one",
] as const;

export type DrawingConsultationPreviewMode =
  (typeof drawingConsultationPreviewModes)[number];

export function parseDrawingConsultationPreviewMode(
  value: string | string[] | undefined,
): DrawingConsultationPreviewMode {
  const candidate = Array.isArray(value) ? value[0] : value;
  return drawingConsultationPreviewModes.includes(
    candidate as DrawingConsultationPreviewMode,
  )
    ? (candidate as DrawingConsultationPreviewMode)
    : "demo";
}

export function getDrawingConsultationPreview(
  items: readonly HomeDrawingService[],
  mode: DrawingConsultationPreviewMode,
): readonly HomeDrawingService[] {
  if (mode === "empty") return [];
  if (mode === "one") return items.slice(0, 1);
  if (mode === "worst") {
    const architecture =
      items.find((item) => item.title.includes("معماری")) ?? items[0];
    const structural = items.find((item) => item.title.includes("سازه"));
    const brokenImageSrc = architecture?.imageSrc?.replace(
      /([?#].*)?$/,
      ".missing-preview$1",
    );

    return items.map((item) => {
      if (item === architecture) {
        return {
          ...item,
          title: `${item.title}؛ با جزئیات اجرایی برای ساختمان‌های مسکونی و اداری`,
          href: undefined,
          imageSrc: brokenImageSrc,
        };
      }
      if (item === structural) return { ...item, imageSrc: undefined };
      return item;
    });
  }
  return items;
}
