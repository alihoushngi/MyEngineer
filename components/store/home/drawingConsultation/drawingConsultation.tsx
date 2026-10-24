import Link from "next/link";
import { ServiceContentImage } from "@/components/store/home/serviceContentImage/serviceContentImage";
import { homeDrawingCopy } from "@/config/home.config/home.config";
import {
  drawingConsultationPreviewModes,
  type DrawingConsultationPreviewMode,
} from "@/lib/home/drawing-consultation-preview/drawing-consultation-preview";
import {
  mapDrawingConsultationCards,
  type DrawingConsultationDiscipline,
} from "@/lib/home/drawing-consultation-cards/drawing-consultation-cards";
import { type HomeDrawingService } from "@/types/store/home.types";
import styles from "./drawingConsultation.module.css";

type DrawingConsultationProps = {
  items: readonly HomeDrawingService[];
  previewMode?: DrawingConsultationPreviewMode;
};

const disciplines = [
  {
    title: "ترسیم نقشه معماری",
    matches: ["معماری"],
  },
  {
    title: "ترسیم نقشه سازه",
    matches: ["سازه"],
  },
  {
    title: "ترسیم نقشه برق",
    matches: ["برق", "الکت"],
  },
  {
    title: "ترسیم نقشه مکانیک",
    matches: ["مکانیک"],
  },
] as const satisfies readonly DrawingConsultationDiscipline[];

export function DrawingConsultation({
  items,
  previewMode,
}: DrawingConsultationProps) {
  const cards = mapDrawingConsultationCards(disciplines, items);

  return (
    <section
      aria-labelledby="drawing-consultation-heading"
      className={styles.section}
      data-home-part="drawing-consultation"
    >
      <h2 id="drawing-consultation-heading" className={styles.heading}>
        {homeDrawingCopy.title}
      </h2>

      <ul
        aria-labelledby="drawing-consultation-heading"
        className={styles.list}
      >
        {cards.map(({ disciplineTitle, item }, index) => {
          const label = item?.title ?? disciplineTitle;
          const card = (
            <article className={styles.card}>
              <ServiceContentImage
                key={`${item?.id ?? disciplineTitle}-${item?.imageSrc ?? "missing"}`}
                src={item?.imageSrc}
                alt={label}
                variant="drawing"
              />
              <h3 className={styles.title}>{label}</h3>
            </article>
          );

          return (
            <li
              key={item ? `${item.id}-${index}` : `empty-${disciplineTitle}`}
              className={styles.item}
            >
              {item?.href ? (
                <Link href={item.href} aria-label={label} className={styles.link}>
                  {card}
                </Link>
              ) : (
                <div
                  role="group"
                  aria-label={`${label}؛ ${item ? "پیوند" : "اطلاعات خدمت"} در دسترس نیست`}
                  aria-disabled="true"
                  className={styles.unavailable}
                >
                  {card}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {process.env.NODE_ENV === "development" && previewMode ? (
        <nav
          className={styles.previewToggle}
          aria-label="Drawing consultation demo data"
        >
          {drawingConsultationPreviewModes.map((mode) => (
            <Link
              key={mode}
              href={mode === "demo" ? "/" : `/?drawingData=${mode}`}
              aria-current={previewMode === mode ? "page" : undefined}
              className={`${styles.previewLink} ${
                previewMode === mode ? styles.previewLinkActive : ""
              }`}
            >
              {mode}
            </Link>
          ))}
        </nav>
      ) : null}
    </section>
  );
}
