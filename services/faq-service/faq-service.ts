import {
  type ApiEnvelope,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { httpGet } from "@/lib/api/http-client/http-client";
import {
  groupFaqsByService,
  toFaqCategorySummary,
} from "@/lib/api/map-backend/map-backend";
import { env } from "@/lib/env/env";
import { type BackendFaq } from "@/types/api/backend.types";
import {
  type FaqCategory,
  type FaqCategoryDetail,
} from "@/types/store/faq.types";
import { listBackendServices } from "@/services/lookup-service/lookup-service";

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

export async function listFaqCategoryDetails(): Promise<
  readonly FaqCategoryDetail[]
> {
  if (!env.apiBaseUrl) {
    return [];
  }

  const [faqsEnvelope, services] = await Promise.all([
    getEnvelope<BackendFaq[]>("/faqs"),
    listBackendServices(),
  ]);

  const categories = groupFaqsByService(unwrapApiData(faqsEnvelope), services);

  return categories.map((category, index, all) => ({
    ...category,
    relatedCategories: toFaqCategorySummary(
      all.filter((item) => item.slug !== category.slug).slice(0, 3),
    ),
  }));
}

export async function listFaqCategories(): Promise<readonly FaqCategory[]> {
  const details = await listFaqCategoryDetails();
  return toFaqCategorySummary(details);
}

export async function getFaqCategory(
  slug: string,
): Promise<FaqCategoryDetail | null> {
  const details = await listFaqCategoryDetails();
  return details.find((category) => category.slug === slug) ?? null;
}
