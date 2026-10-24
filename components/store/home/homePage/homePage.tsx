import { Suspense } from "react";
import { ContentHighlights } from "@/components/store/home/contentHighlights/contentHighlights";
import { DrawingConsultation } from "@/components/store/home/drawingConsultation/drawingConsultation";
import { HomeFaqEntry } from "@/components/store/home/homeFaqEntry/homeFaqEntry";
import { HomeHero } from "@/components/store/home/homeHero/homeHero";
import { HomeKnowledgeTips } from "@/components/store/home/homeKnowledgeTips/homeKnowledgeTips";
import { HomeMarketplace } from "@/components/store/home/homeMarketplace/homeMarketplace";
import { HomeNarrative } from "@/components/store/home/homeNarrative/homeNarrative";
import { HomePromotions } from "@/components/store/home/homePromotions/homePromotions";
import { HomeTestimonials } from "@/components/store/home/homeTestimonials/homeTestimonials";
import { JoinCtaSection } from "@/components/store/home/joinCtaSection/joinCtaSection";
import { PopularServices } from "@/components/store/home/popularServices/popularServices";
import { ServiceCategories } from "@/components/store/home/serviceCategories/serviceCategories";
import { WhyMohandesMan } from "@/components/store/home/whyMohandesMan/whyMohandesMan";
import { shouldRenderHomeSection } from "@/config/feature-flags.config/feature-flags.config";
import { type ExtendedHomeCatalogData } from "@/services/catalog-service/catalog-service";
import styles from "./homePage.module.css";

type HomePageProps = {
  catalog: ExtendedHomeCatalogData;
  isAuthenticated?: boolean;
  userName?: string;
};

export function HomePage({
  catalog,
  isAuthenticated = false,
  userName,
}: HomePageProps) {
  return (
    <div className={styles.page}>
      {shouldRenderHomeSection("hero") ? (
        <HomeHero />
      ) : null}
      {shouldRenderHomeSection("serviceCategories") ? (
        <ServiceCategories categories={catalog.serviceCategories} />
      ) : null}
      {shouldRenderHomeSection("hero") ? (
        <HomePromotions slides={catalog.heroSlides} />
      ) : null}
      {shouldRenderHomeSection("narrative") ? <HomeNarrative /> : null}
      {shouldRenderHomeSection("popularServices") ? (
        <PopularServices items={catalog.popularServices} />
      ) : null}
      {shouldRenderHomeSection("drawingConsultation") ? (
        <DrawingConsultation items={catalog.drawingServices} />
      ) : null}
      {shouldRenderHomeSection("whyMohandesMan") ? <WhyMohandesMan /> : null}
      {shouldRenderHomeSection("joinCta") ? <JoinCtaSection /> : null}
      {shouldRenderHomeSection("marketplace") ? (
        <Suspense>
          <HomeMarketplace
            experts={catalog.experts}
            cities={catalog.cities}
            serviceCategories={catalog.serviceCategories}
          />
        </Suspense>
      ) : null}
      {shouldRenderHomeSection("testimonials") ? (
        <HomeTestimonials
          items={catalog.testimonials}
          isAuthenticated={isAuthenticated}
          userName={userName}
        />
      ) : null}
      {shouldRenderHomeSection("knowledgeTips") ? (
        <HomeKnowledgeTips tips={catalog.knowledgeTips} />
      ) : null}
      {shouldRenderHomeSection("contentHighlights") ? (
        <ContentHighlights />
      ) : null}
      {shouldRenderHomeSection("faqEntry") ? (
        <HomeFaqEntry categories={catalog.faqCategories} />
      ) : null}
    </div>
  );
}
