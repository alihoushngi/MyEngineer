import {
  type ApiEnvelope,
  type ApiPaginationMeta,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { httpGet } from "@/lib/api/http-client/http-client";
import {
  findServiceNodeBySlug,
  flattenServiceNodes,
  mapCity,
  mapServiceTree,
} from "@/lib/api/map-backend/map-backend";
import { type ServiceCategory } from "@/config/services.config/services.config";
import {
  type BackendCity,
  type BackendField,
  type BackendServiceNode,
  type BackendSoftware,
} from "@/types/api/backend.types";
import { type City } from "@/types/store/registration.types";

const PUBLIC_REVALIDATE_SECONDS = 300;

async function getEnvelope<TData, TMeta = unknown>(
  path: string,
  query?: Record<string, string | number | boolean | undefined>,
): Promise<ApiEnvelope<TData, TMeta>> {
  return httpGet<ApiEnvelope<TData, TMeta>>(path, {
    query,
    next: { revalidate: PUBLIC_REVALIDATE_SECONDS },
  });
}

export async function listBackendServices(): Promise<
  readonly BackendServiceNode[]
> {
  const envelope = await getEnvelope<BackendServiceNode[]>("/services");
  return unwrapApiData(envelope);
}

export async function listServiceCategories(): Promise<
  readonly ServiceCategory[]
> {
  const services = await listBackendServices();
  return mapServiceTree(services);
}

export async function getBackendServiceBySlug(
  slug: string,
): Promise<BackendServiceNode | null> {
  try {
    const envelope = await getEnvelope<BackendServiceNode>(
      `/services/${encodeURIComponent(slug)}`,
    );
    return unwrapApiData(envelope);
  } catch {
    const tree = await listBackendServices();
    return findServiceNodeBySlug(tree, slug);
  }
}

export async function listFlattenedBackendServices(): Promise<
  readonly BackendServiceNode[]
> {
  return flattenServiceNodes(await listBackendServices());
}

export async function listBackendCities(options?: {
  provinceId?: string;
}): Promise<readonly City[]> {
  const envelope = await getEnvelope<BackendCity[]>("/cities", {
    province_id: options?.provinceId
      ? Number(options.provinceId)
      : undefined,
  });

  return unwrapApiData(envelope).map(mapCity);
}

export async function listBackendSoftwares(): Promise<
  readonly { id: string; label: string }[]
> {
  const envelope = await getEnvelope<BackendSoftware[]>("/softwares");
  return unwrapApiData(envelope).map((item) => ({
    id: String(item.id),
    label: item.name,
  }));
}

export async function listBackendFields(): Promise<
  readonly { id: string; label: string }[]
> {
  const envelope = await getEnvelope<BackendField[]>("/fields");
  return unwrapApiData(envelope).map((item) => ({
    id: String(item.id),
    label: item.name,
  }));
}

export async function listProfessionalsByServiceId(
  serviceId: number,
  perPage = 24,
) {
  return getEnvelope<
    import("@/types/api/backend.types").BackendProfessionalCard[],
    ApiPaginationMeta
  >("/professionals", {
    service_id: serviceId,
    per_page: perPage,
  }).then(unwrapApiData);
}
