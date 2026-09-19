import {
  type ApiEnvelope,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { httpGet } from "@/lib/api/http-client/http-client";
import { env } from "@/lib/env/env";
import { listBackendServices } from "@/services/lookup-service/lookup-service";
import { listBackendSoftwares } from "@/services/lookup-service/lookup-service";

export type ExpertiseCatalogItem = {
  id: string;
  label: string;
};

export type ExpertiseCatalog = {
  expertise: readonly ExpertiseCatalogItem[];
  software: readonly ExpertiseCatalogItem[];
};

/** @deprecated Prefer ExpertiseCatalog */
export type MockExpertiseCatalog = ExpertiseCatalog;
/** @deprecated Prefer ExpertiseCatalogItem */
export type MockExpertiseCatalogItem = ExpertiseCatalogItem;

export async function getExpertiseCatalog(): Promise<ExpertiseCatalog> {
  if (env.apiBaseUrl) {
    try {
      const envelope = await httpGet<
        ApiEnvelope<{
          expertise?: readonly { id: number; label: string }[];
          software?: readonly { id: number; label: string }[];
        }>
      >("/expertise-catalog", {
        next: { revalidate: 300 },
      });
      const data = unwrapApiData(envelope);

      return {
        expertise: (data.expertise ?? []).map((item) => ({
          id: String(item.id),
          label: item.label,
        })),
        software: (data.software ?? []).map((item) => ({
          id: String(item.id),
          label: item.label,
        })),
      };
    } catch {
      // Fall through to services/softwares composition.
    }
  }

  const [services, software] = await Promise.all([
    listBackendServices(),
    listBackendSoftwares(),
  ]);

  const expertise = services.flatMap((service) => {
    const children = service.children ?? [];
    if (children.length === 0) {
      return [
        {
          id: String(service.id),
          label: service.short_title || service.title,
        },
      ];
    }

    return children.map((child) => ({
      id: String(child.id),
      label: child.short_title || child.title,
    }));
  });

  return {
    expertise,
    software,
  };
}

/** @deprecated Use getExpertiseCatalog */
export async function getMockExpertiseCatalog(): Promise<ExpertiseCatalog> {
  return getExpertiseCatalog();
}
