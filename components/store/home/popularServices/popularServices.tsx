import Link from "next/link";

import { ServiceContentImage } from "@/components/store/home/serviceContentImage/serviceContentImage";
import { homePopularCopy } from "@/config/home.config/home.config";
import {
  popularServicesPreviewModes,
  type PopularServicesPreviewMode,
} from "@/lib/home/popular-services-preview/popular-services-preview";
import { type HomePopularService } from "@/types/store/home.types";
import styles from "./popularServices.module.css";

type PopularServicesProps = {
  items: readonly HomePopularService[];
  previewMode?: PopularServicesPreviewMode;
};

export function PopularServices({ items, previewMode }: PopularServicesProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="popular-services-heading"
      data-home-part="popular-services"
      className={styles.section}
    >
      <div className={styles.container}>
        <h2 id="popular-services-heading" className={styles.heading}>
          {homePopularCopy.title}
        </h2>

        <ul
          aria-labelledby="popular-services-heading"
          className={styles.list}
        >
          {items.map((item) => (
            <li key={item.id} className={styles.card}>
              {item.href ? (
                <Link href={item.href} className={styles.link}>
                  <span className={styles.media}>
                    <ServiceContentImage
                      key={`${item.id}-${item.imageSrc ?? "missing"}`}
                      src={item.imageSrc}
                      alt={item.title}
                    />
                  </span>
                  <span className={styles.title}>{item.title}</span>
                </Link>
              ) : (
                <article className={styles.unavailable} data-disabled="true">
                  <span className={styles.media}>
                    <ServiceContentImage src={item.imageSrc} alt={item.title} />
                  </span>
                  <span className={styles.title}>{item.title}</span>
                </article>
              )}
            </li>
          ))}
        </ul>
      </div>

      {process.env.NODE_ENV === "development" && previewMode ? (
        <nav className={styles.previewToggle} aria-label="Popular services demo data">
          {popularServicesPreviewModes.map((mode) => (
            <Link
              key={mode}
              href={mode === "demo" ? "/" : `/?popularData=${mode}`}
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
