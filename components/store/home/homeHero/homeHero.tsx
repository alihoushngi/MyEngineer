import Link from "next/link";

import { HomeCityTrigger } from "@/components/store/home/homeHero/homeCityTrigger/homeCityTrigger";
import { SearchInput } from "@/components/store/search/searchInput/searchInput";
import { homeHeroCopy } from "@/config/home.config/home.config";
import { isPageEnabled } from "@/config/feature-flags.config/feature-flags.config";
import { joinNavigation } from "@/config/navigation.config/navigation.config";

import styles from "./homeHero.module.css";

export function HomeHero() {
  return (
    <section
      aria-labelledby="home-hero-title"
      className={styles.hero}
      dir="rtl"
    >
      <div className={`${styles.content} container-wide`}>
        <h1 className={styles.title} id="home-hero-title">
          {homeHeroCopy.title}
        </h1>
        <p className={styles.description}>{homeHeroCopy.description}</p>

        <div className={styles.card}>
          <div
            aria-label="جستجو بر اساس خدمت و شهر"
            className={styles.searchControls}
            role="group"
          >
            {isPageEnabled("search") ? (
              <div className={styles.searchField}>
                <SearchInput id="home-search" initialQuery="" labelHidden />
              </div>
            ) : null}
            <HomeCityTrigger className={styles.cityTrigger} />
          </div>

          <div
            aria-label={homeHeroCopy.supporting}
            className={styles.supporting}
          >
            <p>از نقشه‌برداری و طراحی</p>
            <p>تا اخذ مجوز و اجرای پروژه</p>
            <p>در کنار شما هستیم</p>
          </div>

          {isPageEnabled("expertRegistration") ? (
            <Link className={styles.joinLink} href={joinNavigation.href}>
              <span>شما هم یکی از هزاران عضو سایت&nbsp;</span>
              <span>مهندس من</span>
              <span>&nbsp;شوید</span>
            </Link>
          ) : null}
        </div>
      </div>
      <a
        className={`sr-only focus:not-sr-only ${styles.scrollLink}`}
        href="#service-categories"
      >
        {homeHeroCopy.startCta}
      </a>
    </section>
  );
}
