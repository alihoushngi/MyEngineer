import {
  type ApiEnvelope,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { authHeaders } from "@/lib/api/auth-headers/auth-headers";
import {
  mapBackendEngineerCredential,
  mapBackendEngineerPortfolio,
  mapBackendEngineerWorkspace,
  mapBackendServiceRequest,
  mapBackendServiceReview,
  type BackendEngineerCredential,
  type BackendEngineerPortfolio,
  type BackendEngineerWorkspace,
  type BackendServiceRequest,
  type BackendServiceReview,
} from "@/lib/api/map-panel/map-panel";
import {
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
} from "@/lib/api/http-client/http-client";
import { mapCity, mapProvince } from "@/lib/api/map-backend/map-backend";
import { readAccessToken } from "@/lib/auth/access-token-cookie/access-token-cookie";
import { toEngineerRequest } from "@/lib/marketplace/request-projections/request-projections";
import { toPublicExpertReview } from "@/lib/reviews/review-projections/review-projections";
import { type BackendCity, type BackendProvince } from "@/types/api/backend.types";
import {
  type EngineerCredential,
  type EngineerPortfolioItem,
  type EngineerRequest,
  type EngineerReview,
  type EngineerWorkspace,
} from "@/types/store/engineer.types";
import { type City, type Province } from "@/types/store/registration.types";

async function authorizedHeaders(): Promise<HeadersInit | undefined> {
  const token = await readAccessToken();
  return authHeaders(token);
}

export type EngineerAccessState =
  | "active"
  | "registration_in_progress"
  | "forbidden"
  | "unauthenticated";

export type EngineerAccessPayload = {
  state: EngineerAccessState;
  user: {
    id: number;
    name?: string;
    family?: string;
    full_name?: string;
    mobile?: string;
    image?: string | null;
    status?: { value?: string; label?: string } | null;
  } | null;
};

export async function apiEngineerAccess(): Promise<EngineerAccessPayload> {
  const envelope = await httpGet<ApiEnvelope<EngineerAccessPayload>>(
    "/auth/engineer-access",
    {
      headers: await authorizedHeaders(),
      cache: "no-store",
    },
  );
  return unwrapApiData(envelope);
}

export async function fetchEngineerWorkspace(): Promise<EngineerWorkspace> {
  const envelope = await httpGet<ApiEnvelope<BackendEngineerWorkspace>>(
    "/engineer/workspace",
    {
      headers: await authorizedHeaders(),
      cache: "no-store",
    },
  );
  return mapBackendEngineerWorkspace(unwrapApiData(envelope));
}

export async function fetchEngineerRequest(
  id: string,
): Promise<EngineerRequest | null> {
  const envelope = await httpGet<ApiEnvelope<BackendServiceRequest | null>>(
    `/engineer/requests/${encodeURIComponent(id)}`,
    {
      headers: await authorizedHeaders(),
      cache: "no-store",
    },
  );
  const data = unwrapApiData(envelope);
  return data ? toEngineerRequest(mapBackendServiceRequest(data)) : null;
}

export async function listEngineerReviews(): Promise<readonly EngineerReview[]> {
  const envelope = await httpGet<ApiEnvelope<readonly BackendServiceReview[]>>(
    "/engineer/reviews",
    {
      headers: await authorizedHeaders(),
      cache: "no-store",
    },
  );
  return unwrapApiData(envelope)
    .map(mapBackendServiceReview)
    .map(toPublicExpertReview);
}

export async function fetchEngineerReview(
  id: string,
): Promise<EngineerReview | null> {
  const envelope = await httpGet<ApiEnvelope<BackendServiceReview | null>>(
    `/engineer/reviews/${encodeURIComponent(id)}`,
    {
      headers: await authorizedHeaders(),
      cache: "no-store",
    },
  );
  const data = unwrapApiData(envelope);
  return data ? toPublicExpertReview(mapBackendServiceReview(data)) : null;
}

export async function updateEngineerProfileApi(input: {
  firstName: string;
  lastName: string;
  profession: string;
  about?: string | null;
}): Promise<void> {
  await httpPut<ApiEnvelope<unknown>>("/engineer/profile", {
    headers: await authorizedHeaders(),
    body: {
      first_name: input.firstName,
      last_name: input.lastName,
      profession: input.profession,
      about: input.about ?? null,
    },
  });
}

export async function updateEngineerSpecialtiesApi(input: {
  serviceIds: readonly number[];
  softwareIds: readonly number[];
}): Promise<void> {
  await httpPut<ApiEnvelope<unknown>>("/engineer/specialties", {
    headers: await authorizedHeaders(),
    body: {
      service_ids: [...input.serviceIds],
      software_ids: [...input.softwareIds],
    },
  });
}

export async function updateEngineerServiceAreaApi(input: {
  provinceId: number;
  cityId: number;
  nearbyCityIds: readonly number[];
}): Promise<void> {
  await httpPut<ApiEnvelope<unknown>>("/engineer/service-area", {
    headers: await authorizedHeaders(),
    body: {
      province_id: input.provinceId,
      city_id: input.cityId,
      nearby_city_ids: [...input.nearbyCityIds],
    },
  });
}

export type EngineerLocationCatalog = {
  provinces: readonly Province[];
  cities: readonly City[];
  selected: {
    provinceId: string | null;
    cityId: string | null;
    cityIds: readonly string[];
  };
};

export async function fetchEngineerLocationCatalog(): Promise<EngineerLocationCatalog> {
  const envelope = await httpGet<
    ApiEnvelope<{
      provinces: readonly BackendProvince[];
      cities: readonly BackendCity[];
      selected?: {
        province_id?: number | null;
        city_id?: number | null;
        city_ids?: readonly number[];
      };
    }>
  >("/engineer/location-catalog", {
    headers: await authorizedHeaders(),
    cache: "no-store",
  });

  const data = unwrapApiData(envelope);

  return {
    provinces: data.provinces.map(mapProvince),
    cities: data.cities.map(mapCity),
    selected: {
      provinceId:
        data.selected?.province_id != null
          ? String(data.selected.province_id)
          : null,
      cityId:
        data.selected?.city_id != null ? String(data.selected.city_id) : null,
      cityIds: (data.selected?.city_ids ?? []).map(String),
    },
  };
}

export async function listEngineerPortfolio(): Promise<
  readonly EngineerPortfolioItem[]
> {
  const envelope = await httpGet<
    ApiEnvelope<readonly BackendEngineerPortfolio[]>
  >("/engineer/portfolio", {
    headers: await authorizedHeaders(),
    cache: "no-store",
  });
  return unwrapApiData(envelope).map(mapBackendEngineerPortfolio);
}

export async function createEngineerPortfolioItem(input: {
  title: string;
  description?: string | null;
  imageUploadId?: string | null;
}): Promise<EngineerPortfolioItem> {
  const envelope = await httpPost<ApiEnvelope<BackendEngineerPortfolio>>(
    "/engineer/portfolio",
    {
      headers: await authorizedHeaders(),
      body: {
        title: input.title,
        description: input.description ?? null,
        image_upload_id: input.imageUploadId ?? null,
      },
    },
  );
  return mapBackendEngineerPortfolio(unwrapApiData(envelope));
}

export async function updateEngineerPortfolioItem(
  id: string,
  input: {
    title?: string;
    description?: string | null;
    imageUploadId?: string | null;
  },
): Promise<EngineerPortfolioItem> {
  const envelope = await httpPut<ApiEnvelope<BackendEngineerPortfolio>>(
    `/engineer/portfolio/${encodeURIComponent(id)}`,
    {
      headers: await authorizedHeaders(),
      body: {
        title: input.title,
        description: input.description,
        image_upload_id: input.imageUploadId,
      },
    },
  );
  return mapBackendEngineerPortfolio(unwrapApiData(envelope));
}

export async function deleteEngineerPortfolioItem(id: string): Promise<void> {
  await httpDelete<ApiEnvelope<null>>(
    `/engineer/portfolio/${encodeURIComponent(id)}`,
    {
      headers: await authorizedHeaders(),
    },
  );
}

export async function listEngineerCredentials(): Promise<
  readonly EngineerCredential[]
> {
  const envelope = await httpGet<
    ApiEnvelope<readonly BackendEngineerCredential[]>
  >("/engineer/credentials", {
    headers: await authorizedHeaders(),
    cache: "no-store",
  });
  return unwrapApiData(envelope).map(mapBackendEngineerCredential);
}

export type CreateEngineerCredentialInput = {
  kind: "degree" | "certificate" | "license";
  level?: string;
  fieldId?: number;
  university?: string | null;
  title?: string;
  licenseNumber?: string;
  uploadId?: string;
};

export async function createEngineerCredential(
  input: CreateEngineerCredentialInput,
): Promise<EngineerCredential> {
  const envelope = await httpPost<ApiEnvelope<BackendEngineerCredential>>(
    "/engineer/credentials",
    {
      headers: await authorizedHeaders(),
      body: {
        kind: input.kind,
        level: input.level,
        field_id: input.fieldId,
        university: input.university,
        title: input.title,
        license_number: input.licenseNumber,
        upload_id: input.uploadId,
      },
    },
  );
  return mapBackendEngineerCredential(unwrapApiData(envelope));
}

export async function updateEngineerCredential(
  kind: "degree" | "certificate" | "license",
  id: string,
  input: Omit<CreateEngineerCredentialInput, "kind">,
): Promise<EngineerCredential> {
  const envelope = await httpPut<ApiEnvelope<BackendEngineerCredential>>(
    `/engineer/credentials/${encodeURIComponent(kind)}/${encodeURIComponent(id)}`,
    {
      headers: await authorizedHeaders(),
      body: {
        level: input.level,
        field_id: input.fieldId,
        university: input.university,
        title: input.title,
        license_number: input.licenseNumber,
        upload_id: input.uploadId,
      },
    },
  );
  return mapBackendEngineerCredential(unwrapApiData(envelope));
}
