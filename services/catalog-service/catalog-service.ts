import {
  type ApiEnvelope,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { httpGet } from "@/lib/api/http-client/http-client";
import {
  buildKnowledgeCategories,
  flattenServiceNodes,
  groupFaqsByService,
  mapCity,
  mapFaqItem,
  mapKnowledgeTipsForHome,
  mapPopularFromServices,
  mapProfessionalCard,
  mapServiceCategory,
  mapServiceDetail,
  mapSliderToHeroSlide,
  mapTestimonial,
  toFaqCategorySummary,
} from "@/lib/api/map-backend/map-backend";
import { type ServiceCategory } from "@/config/services.config/services.config";
import { env } from "@/lib/env/env";
import {
  type BackendCity,
  type BackendFaq,
  type BackendKnowledge,
  type BackendKnowledgeCategory,
  type BackendProfessionalCard,
  type BackendServiceNode,
  type BackendSlider,
  type BackendTestimonial,
} from "@/types/api/backend.types";
import { resolveMediaUrl } from "@/lib/api/resolve-media-url/resolve-media-url";
import { stripHtml } from "@/lib/api/strip-html/strip-html";
import {
  type HomeCatalogData,
  type HomeHeroSlide,
} from "@/types/store/home.types";
import { type City } from "@/types/store/registration.types";
import { type ServiceDetailData } from "@/types/store/service.types";
import {
  getBackendServiceBySlug,
  listBackendServices,
} from "@/services/lookup-service/lookup-service";

const PUBLIC_REVALIDATE_SECONDS = 300;

async function getEnvelope<TData>(
  path: string,
  query?: Record<string, string | number | boolean | undefined>,
): Promise<ApiEnvelope<TData>> {
  return httpGet<ApiEnvelope<TData>>(path, {
    query,
    next: { revalidate: PUBLIC_REVALIDATE_SECONDS },
  });
}

export type { HomeCatalogData };

export type HomeTestimonialItem = {
  id: string;
  quote: string;
  author: string;
  role?: string;
};

export type ExtendedHomeCatalogData = HomeCatalogData & {
  serviceCategories: readonly ServiceCategory[];
  heroSlides: readonly HomeHeroSlide[];
  testimonials: readonly HomeTestimonialItem[];
};

const emptyHomeCatalog: ExtendedHomeCatalogData = {
  experts: [],
  cities: [],
  popularServices: [],
  drawingServices: [],
  faqCategories: [],
  knowledgeTips: [],
  serviceCategories: [],
  heroSlides: [],
  testimonials: [],
};

export async function getHomeCatalog(): Promise<ExtendedHomeCatalogData> {
  if (!env.apiBaseUrl) {
    return emptyHomeCatalog;
  }

  try {
    const homeEnvelope = await getEnvelope<{
      experts?: BackendProfessionalCard[];
      cities?: (BackendCity & { experts_count?: number })[];
      popular_services?: BackendServiceNode[];
      drawing_services?: BackendServiceNode[];
      faq_categories?: {
        slug: string;
        title: string;
        description?: string | null;
        service_id?: number | null;
      }[];
      knowledge_tips?: BackendKnowledge[];
    }>("/home").catch(() => null);

    if (homeEnvelope) {
      const home = unwrapApiData(homeEnvelope);
      const services = await listBackendServices().catch(() => []);
      const flat = flattenServiceNodes(services);

      const [slidersEnvelope, testimonialsEnvelope] = await Promise.all([
        getEnvelope<BackendSlider[]>("/sliders").catch(
          (): ApiEnvelope<BackendSlider[]> => ({ success: true, data: [] }),
        ),
        getEnvelope<BackendTestimonial[]>("/testimonials").catch(
          (): ApiEnvelope<BackendTestimonial[]> => ({
            success: true,
            data: [],
          }),
        ),
      ]);

      const faqCategories = (home.faq_categories ?? []).map((category) => ({
        slug: category.slug,
        href: `/faq/${category.slug}` as const,
        title: category.title,
        description: category.description ?? undefined,
      }));

      const knowledgeTips = (home.knowledge_tips ?? []).map((tip) => ({
        id: String(tip.id),
        title: tip.title,
        body: tip.description?.trim() || tip.title,
        categoryTitle: tip.category?.name ?? "دانش",
        href: tip.category?.slug
          ? `/knowledge/${tip.category.slug}`
          : "/knowledge",
      }));

      const popularFromHome = (home.popular_services ?? []).map((service) => {
        const title = service.short_title || service.title;
        return {
          id: String(service.id),
          title,
          description: stripHtml(service.description) || title,
          href: `/services/${service.slug}`,
          imageSrc:
            resolveMediaUrl(service.image) ?? "/images/services/surveying.png",
        };
      });

      const drawingFromHome = (home.drawing_services ?? []).map((service) => {
        const title = service.short_title || service.title;
        return {
          id: String(service.id),
          title,
          description: stripHtml(service.description) || title,
          href: `/services/${service.slug}`,
        };
      });

      const { popularServices, drawingServices } =
        popularFromHome.length > 0 || drawingFromHome.length > 0
          ? {
              popularServices: popularFromHome,
              drawingServices: drawingFromHome,
            }
          : mapPopularFromServices(services);

      return {
        experts: (home.experts ?? []).map(mapProfessionalCard),
        cities: (home.cities ?? []).map(mapCity),
        popularServices,
        drawingServices,
        faqCategories,
        knowledgeTips,
        serviceCategories: services.map(mapServiceCategory),
        heroSlides: unwrapApiData(slidersEnvelope).map((slider) => {
          const linked = flat.find((service) => service.id === slider.service_id);
          return mapSliderToHeroSlide(slider, linked?.slug);
        }),
        testimonials: unwrapApiData(testimonialsEnvelope)
          .map(mapTestimonial)
          .filter((item) => item.quote.trim() !== ""),
      };
    }

    const [
      services,
      professionalsEnvelope,
      cities,
      faqsEnvelope,
      knowledgeCategoriesEnvelope,
      knowledgesEnvelope,
      slidersEnvelope,
      testimonialsEnvelope,
    ] = await Promise.all([
      listBackendServices(),
      getEnvelope<BackendProfessionalCard[]>("/professionals", {
        per_page: 48,
      }),
      listCatalogCities(),
      getEnvelope<BackendFaq[]>("/faqs"),
      getEnvelope<BackendKnowledgeCategory[]>("/knowledge-categories"),
      getEnvelope<BackendKnowledge[]>("/knowledges", { per_page: 50 }),
      getEnvelope<BackendSlider[]>("/sliders"),
      getEnvelope<BackendTestimonial[]>("/testimonials"),
    ]);

    const faqCategories = groupFaqsByService(
      unwrapApiData(faqsEnvelope),
      services,
    );
    const knowledgeCategories = buildKnowledgeCategories(
      unwrapApiData(knowledgeCategoriesEnvelope),
      unwrapApiData(knowledgesEnvelope),
    );
    const { popularServices, drawingServices } =
      mapPopularFromServices(services);
    const flat = flattenServiceNodes(services);

    const experts = unwrapApiData(professionalsEnvelope).map(
      mapProfessionalCard,
    );
    const expertCities = [
      ...new Map(
        experts
          .filter((expert) => Boolean(expert.city))
          .map((expert) => [
            expert.city as string,
            {
              id: expert.city as string,
              name: expert.city as string,
              provinceId: "",
            } satisfies City,
          ]),
      ).values(),
    ];

    return {
      experts,
      cities: expertCities.length > 0 ? expertCities : cities,
      popularServices,
      drawingServices,
      faqCategories: toFaqCategorySummary(faqCategories),
      knowledgeTips: mapKnowledgeTipsForHome(knowledgeCategories),
      serviceCategories: services.map(mapServiceCategory),
      heroSlides: unwrapApiData(slidersEnvelope).map((slider) => {
        const linked = flat.find((service) => service.id === slider.service_id);
        return mapSliderToHeroSlide(slider, linked?.slug);
      }),
      testimonials: unwrapApiData(testimonialsEnvelope)
        .map(mapTestimonial)
        .filter((item) => item.quote.trim() !== ""),
    };
  } catch {
    return emptyHomeCatalog;
  }
}

export async function getServiceDetail(
  slug: string,
): Promise<ServiceDetailData | null> {
  if (!env.apiBaseUrl) {
    return null;
  }

  const service = await getBackendServiceBySlug(slug);
  if (!service) {
    return null;
  }

  const [faqsEnvelope, professionalsEnvelope] = await Promise.all([
    getEnvelope<BackendFaq[]>("/faqs", { service_id: service.id }).catch(
      (): ApiEnvelope<BackendFaq[]> => ({ success: true, data: [] }),
    ),
    getEnvelope<BackendProfessionalCard[]>("/professionals", {
      service_id: service.id,
      per_page: 24,
    }).catch(
      (): ApiEnvelope<BackendProfessionalCard[]> => ({
        success: true,
        data: [],
      }),
    ),
  ]);

  return mapServiceDetail(
    service,
    unwrapApiData(faqsEnvelope).map(mapFaqItem),
    unwrapApiData(professionalsEnvelope).map(mapProfessionalCard),
  );
}

export async function getServiceCategoryBySlug(
  slug: string,
): Promise<ServiceCategory | null> {
  if (!env.apiBaseUrl) {
    return null;
  }

  const service = await getBackendServiceBySlug(slug);
  return service ? mapServiceCategory(service) : null;
}

export async function listCatalogCities(): Promise<readonly City[]> {
  if (!env.apiBaseUrl) {
    return [];
  }

  try {
    const envelope = await getEnvelope<BackendCity[]>("/cities");
    return unwrapApiData(envelope).map(mapCity);
  } catch {
    return [];
  }
}

export async function listHeroSlides(): Promise<readonly HomeHeroSlide[]> {
  if (!env.apiBaseUrl) {
    return [];
  }

  try {
    const [slidersEnvelope, services] = await Promise.all([
      getEnvelope<BackendSlider[]>("/sliders"),
      listBackendServices(),
    ]);
    const flat = flattenServiceNodes(services);

    return unwrapApiData(slidersEnvelope).map((slider) => {
      const linked = flat.find((service) => service.id === slider.service_id);
      return mapSliderToHeroSlide(slider, linked?.slug);
    });
  } catch {
    return [];
  }
}

export async function listTestimonials(): Promise<
  readonly HomeTestimonialItem[]
> {
  if (!env.apiBaseUrl) {
    return [];
  }

  try {
    const envelope = await getEnvelope<BackendTestimonial[]>("/testimonials");
    return unwrapApiData(envelope)
      .map(mapTestimonial)
      .filter((item) => item.quote.trim() !== "");
  } catch {
    return [];
  }
}
