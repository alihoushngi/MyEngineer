import {
  type ApiEnvelope,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { httpGet } from "@/lib/api/http-client/http-client";
import {
  buildKnowledgeCategories,
  mapKnowledgeCategory,
} from "@/lib/api/map-backend/map-backend";
import { env } from "@/lib/env/env";
import {
  type BackendKnowledge,
  type BackendKnowledgeCategory,
} from "@/types/api/backend.types";
import {
  type KnowledgeCategory,
  type KnowledgeCategoryDetail,
} from "@/types/store/knowledge.types";

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

export async function listKnowledgeCategories(): Promise<
  readonly KnowledgeCategoryDetail[]
> {
  if (!env.apiBaseUrl) {
    return [];
  }

  const [categoriesEnvelope, itemsEnvelope] = await Promise.all([
    getEnvelope<BackendKnowledgeCategory[]>("/knowledge-categories"),
    getEnvelope<BackendKnowledge[]>("/knowledges", { per_page: 100 }),
  ]);

  return buildKnowledgeCategories(
    unwrapApiData(categoriesEnvelope),
    unwrapApiData(itemsEnvelope),
  );
}

export async function listKnowledgeCategorySummaries(): Promise<
  readonly KnowledgeCategory[]
> {
  const details = await listKnowledgeCategories();
  return details.map((category) => ({
    slug: category.slug,
    href: category.href,
    title: category.title,
    description: category.description,
    relatedServiceHref: category.relatedServiceHref,
    relatedServiceLabel: category.relatedServiceLabel,
  }));
}

export async function getKnowledgeCategory(
  slug: string,
): Promise<KnowledgeCategoryDetail | null> {
  const categories = await listKnowledgeCategories();
  return categories.find((category) => category.slug === slug) ?? null;
}

/**
 * Landing-page categories with item counts, filtered on the server by
 * `q` (GET /knowledges?q=) and/or a category slug.
 */
export async function listKnowledgeLanding(options: {
  q?: string;
  category?: string;
}): Promise<readonly KnowledgeCategory[]> {
  if (!env.apiBaseUrl) {
    return [];
  }

  const envelope = await getEnvelope<BackendKnowledgeCategory[]>(
    "/knowledge-categories",
  );
  let categories = unwrapApiData(envelope);

  if (options.category) {
    categories = categories.filter(
      (category) => category.slug === options.category,
    );
  }

  const q = options.q?.trim();
  if (q) {
    const matches = await getEnvelope<BackendKnowledge[]>("/knowledges", {
      q,
      per_page: 100,
    })
      .then(unwrapApiData)
      .catch((): BackendKnowledge[] => []);
    const matchedIds = new Set(
      matches.map((item) => item.category?.id).filter(Boolean),
    );

    categories = categories.filter(
      (category) => matchedIds.has(category.id) || category.name.includes(q),
    );
  }

  return categories.map((category) => {
    const detail = mapKnowledgeCategory(category);
    return {
      slug: detail.slug,
      href: detail.href,
      title: detail.title,
      description: detail.description,
      itemsCount: detail.itemsCount,
    };
  });
}
