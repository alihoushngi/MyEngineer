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
  type BackendSlider,
  type BackendTestimonial,
} from "@/types/api/backend.types";
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
