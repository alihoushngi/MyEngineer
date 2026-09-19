import { Suspense } from "react";
import { ContentHighlights } from "@/components/store/home/contentHighlights/contentHighlights";
import { DrawingConsultation } from "@/components/store/home/drawingConsultation/drawingConsultation";
import { HomeFaqEntry } from "@/components/store/home/homeFaqEntry/homeFaqEntry";
import { HomeHero } from "@/components/store/home/homeHero/homeHero";
import { HomeKnowledgeTips } from "@/components/store/home/homeKnowledgeTips/homeKnowledgeTips";
import { HomeMarketplace } from "@/components/store/home/homeMarketplace/homeMarketplace";
import { HomeNarrative } from "@/components/store/home/homeNarrative/homeNarrative";
import { HomeTestimonials } from "@/components/store/home/homeTestimonials/homeTestimonials";
import { JoinCtaSection } from "@/components/store/home/joinCtaSection/joinCtaSection";
import { PopularServices } from "@/components/store/home/popularServices/popularServices";
import { ServiceCategories } from "@/components/store/home/serviceCategories/serviceCategories";
import { WhyMohandesMan } from "@/components/store/home/whyMohandesMan/whyMohandesMan";
import { shouldRenderHomeSection } from "@/config/feature-flags.config/feature-flags.config";
import { homeHeroSlides } from "@/lib/home/hero-slides/hero-slides";
import { type ExtendedHomeCatalogData } from "@/services/catalog-service/catalog-service";

type HomePageProps = { catalog: ExtendedHomeCatalogData };

export function HomePage({ catalog }: HomePageProps) {
  return (
    <>
      {shouldRenderHomeSection("hero") ? (
        <HomeHero slides={homeHeroSlides} />
      ) : null}
      {shouldRenderHomeSection("serviceCategories") ? (
        <ServiceCategories categories={catalog.serviceCategories} />
      ) : null}
      {shouldRenderHomeSection("marketplace") ? (
        <Suspense>
          <HomeMarketplace
            experts={catalog.experts}
            cities={catalog.cities}
            serviceCategories={catalog.serviceCategories}
          />
        </Suspense>
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
      {shouldRenderHomeSection("testimonials") ? (
        <HomeTestimonials items={catalog.testimonials} />
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
    </>
  );
}
