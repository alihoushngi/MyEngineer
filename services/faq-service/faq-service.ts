import {
  type ApiEnvelope,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { httpGet } from "@/lib/api/http-client/http-client";
import {
  groupFaqsByService,
  mapFaqItem,
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

type BackendFaqCategory = {
  slug: string;
  key?: string | null;
  title: string;
  description?: string | null;
  service_id?: number | null;
  items_count?: number;
  items?: readonly BackendFaq[];
  related_categories?: readonly BackendFaqCategory[];
};

async function getEnvelope<TData>(
  path: string,
  query?: Record<string, string | number | boolean | undefined>,
): Promise<ApiEnvelope<TData>> {
  return httpGet<ApiEnvelope<TData>>(path, {
    query,
    next: { revalidate: PUBLIC_REVALIDATE_SECONDS },
  });
}

function mapFaqCategorySummary(category: BackendFaqCategory): FaqCategory {
  return {
    slug: category.slug,
    href: `/faq/${category.slug}`,
    title: category.title,
    description: category.description ?? undefined,
  };
}

function mapFaqCategoryDetail(category: BackendFaqCategory): FaqCategoryDetail {
  return {
    ...mapFaqCategorySummary(category),
    items: (category.items ?? []).map(mapFaqItem),
    relatedCategories: (category.related_categories ?? []).map(
      mapFaqCategorySummary,
    ),
  };
}

export async function listFaqCategoryDetails(): Promise<
  readonly FaqCategoryDetail[]
> {
  if (!env.apiBaseUrl) {
    return [];
  }

  try {
    const categoriesEnvelope = await getEnvelope<BackendFaqCategory[]>(
      "/faq-categories",
    );
    const summaries = unwrapApiData(categoriesEnvelope);

    const details = await Promise.all(
      summaries.map(async (summary) => {
        try {
          const detailEnvelope = await getEnvelope<BackendFaqCategory>(
            `/faq-categories/${encodeURIComponent(summary.slug)}`,
          );
          return mapFaqCategoryDetail(unwrapApiData(detailEnvelope));
        } catch {
          return {
            ...mapFaqCategorySummary(summary),
            items: [],
          } satisfies FaqCategoryDetail;
        }
      }),
    );

    return details;
  } catch {
    const [faqsEnvelope, services] = await Promise.all([
      getEnvelope<BackendFaq[]>("/faqs"),
      listBackendServices(),
    ]);

    const categories = groupFaqsByService(
      unwrapApiData(faqsEnvelope),
      services,
    );

    return categories.map((category, _index, all) => ({
      ...category,
      relatedCategories: toFaqCategorySummary(
        all.filter((item) => item.slug !== category.slug).slice(0, 3),
      ),
    }));
  }
}

export async function listFaqCategories(): Promise<readonly FaqCategory[]> {
  if (env.apiBaseUrl) {
    try {
      const envelope = await getEnvelope<BackendFaqCategory[]>(
        "/faq-categories",
      );
      return unwrapApiData(envelope).map(mapFaqCategorySummary);
    } catch {
      // Fall through to detail-based summary.
    }
  }

  const details = await listFaqCategoryDetails();
  return toFaqCategorySummary(details);
}

export async function getFaqCategory(
  slug: string,
): Promise<FaqCategoryDetail | null> {
  if (env.apiBaseUrl) {
    try {
      const envelope = await getEnvelope<BackendFaqCategory>(
        `/faq-categories/${encodeURIComponent(slug)}`,
      );
      return mapFaqCategoryDetail(unwrapApiData(envelope));
    } catch {
      // Fall through.
    }
  }

  const details = await listFaqCategoryDetails();
  return details.find((category) => category.slug === slug) ?? null;
}
