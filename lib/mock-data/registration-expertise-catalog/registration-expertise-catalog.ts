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
