import { type ExpertCardData } from "@/types/store/expert.types";
import { type FaqCategory } from "@/types/store/faq.types";
import { type City } from "@/types/store/registration.types";

export type HomePopularService = {
  id: string;
  title: string;
  description: string;
  href?: string;
  imageSrc?: string;
};

export type HomeDrawingService = {
  id: string;
  title: string;
  description: string;
  href?: string;
  imageSrc?: string;
};

export type HomeKnowledgeTip = {
  id: string;
  title: string;
  body: string;
  categoryTitle: string;
  href: string;
};

export type HomeHeroSlide = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  headline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export type HomeCatalogData = {
  experts: readonly ExpertCardData[];
  cities: readonly City[];
  popularServices: readonly HomePopularService[];
  drawingServices: readonly HomeDrawingService[];
  faqCategories: readonly FaqCategory[];
  knowledgeTips: readonly HomeKnowledgeTip[];
};
