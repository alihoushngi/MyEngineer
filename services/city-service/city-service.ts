import {
  type ApiEnvelope,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { httpGet } from "@/lib/api/http-client/http-client";
import { mapCity, mapProvince } from "@/lib/api/map-backend/map-backend";
import { env } from "@/lib/env/env";
import { type BackendCity, type BackendProvince } from "@/types/api/backend.types";
import { type City, type Province } from "@/types/store/registration.types";
import { throwApiUnavailable } from "@/lib/api/throw-api-unavailable/throw-api-unavailable";

const API_NOT_AVAILABLE_MESSAGE =
  "فهرست استان‌ها و شهرها پس از اتصال سرویس در دسترس خواهد بود.";

const PUBLIC_REVALIDATE_SECONDS = 600;

async function getEnvelope<TData>(
  path: string,
  query?: Record<string, string | number | boolean | undefined>,
): Promise<ApiEnvelope<TData>> {
  return httpGet<ApiEnvelope<TData>>(path, {
    query,
    next: { revalidate: PUBLIC_REVALIDATE_SECONDS },
  });
}

export async function getProvinces(): Promise<readonly Province[]> {
  if (!env.apiBaseUrl) {
    throwApiUnavailable(API_NOT_AVAILABLE_MESSAGE);
  }

  const envelope = await getEnvelope<BackendProvince[]>("/provinces");
  return unwrapApiData(envelope).map(mapProvince);
}

export async function getCitiesByProvince(
  provinceId: string,
): Promise<readonly City[]> {
  if (!env.apiBaseUrl) {
    throwApiUnavailable(API_NOT_AVAILABLE_MESSAGE);
  }

  if (!provinceId) {
    return [];
  }

  const envelope = await getEnvelope<BackendCity[]>(
    `/provinces/${encodeURIComponent(provinceId)}/cities`,
  );
  return unwrapApiData(envelope).map(mapCity);
}

export async function getNearbyCities(
  cityId: string,
  radiusKm?: number,
): Promise<readonly City[]> {
  if (!env.apiBaseUrl) {
    throwApiUnavailable(API_NOT_AVAILABLE_MESSAGE);
  }

  if (!cityId) {
    return [];
  }

  const envelope = await getEnvelope<BackendCity[]>(
    `/cities/${encodeURIComponent(cityId)}/nearby`,
    {
      radius_km: radiusKm,
    },
  );
  return unwrapApiData(envelope).map(mapCity);
}
