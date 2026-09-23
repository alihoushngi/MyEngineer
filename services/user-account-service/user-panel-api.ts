import {
  type ApiEnvelope,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { authHeaders } from "@/lib/api/auth-headers/auth-headers";
import { httpGet, httpPost } from "@/lib/api/http-client/http-client";
import {
  mapBackendServiceRequest,
  mapBackendUserWorkspace,
  type BackendServiceRequest,
  type BackendUserWorkspace,
} from "@/lib/api/map-panel/map-panel";
import { readAccessToken } from "@/lib/auth/access-token-cookie/access-token-cookie";
import { toUserRequest } from "@/lib/marketplace/request-projections/request-projections";
import { type UserRequest, type UserWorkspace } from "@/types/store/user-account.types";

type SavedExpertsResponse = {
  ids: readonly number[];
};

async function authorizedHeaders(): Promise<HeadersInit | undefined> {
  const token = await readAccessToken();
  return authHeaders(token);
}

export async function fetchUserWorkspace(): Promise<UserWorkspace> {
  const envelope = await httpGet<ApiEnvelope<BackendUserWorkspace>>(
    "/user/workspace",
    {
      headers: await authorizedHeaders(),
      cache: "no-store",
    },
  );

  return mapBackendUserWorkspace(unwrapApiData(envelope));
}

export async function fetchSavedExpertIds(): Promise<readonly string[]> {
  const envelope = await httpGet<ApiEnvelope<SavedExpertsResponse>>(
    "/user/saved-experts",
    {
      headers: await authorizedHeaders(),
      cache: "no-store",
    },
  );

  return unwrapApiData(envelope).ids.map(String);
}

export type ReviewEligibility = {
  eligible: boolean;
  reason?: "already_reviewed" | "expert_unavailable" | null;
  reviewId?: string;
};

export async function fetchUserRequest(
  requestId: string,
): Promise<UserRequest | null> {
  const envelope = await httpGet<ApiEnvelope<BackendServiceRequest | null>>(
    `/user/requests/${encodeURIComponent(requestId)}`,
    {
      headers: await authorizedHeaders(),
      cache: "no-store",
    },
  );

  const data = unwrapApiData(envelope);
  return data ? toUserRequest(mapBackendServiceRequest(data)) : null;
}

export async function fetchReviewEligibility(
  requestId: string,
): Promise<ReviewEligibility> {
  const envelope = await httpGet<
    ApiEnvelope<{
      eligible: boolean;
      reason?: "already_reviewed" | "expert_unavailable" | null;
      review_id?: number | null;
    }>
  >(`/user/requests/${requestId}/review-eligibility`, {
    headers: await authorizedHeaders(),
    cache: "no-store",
  });

  const data = unwrapApiData(envelope);

  return {
    eligible: data.eligible,
    reason: data.reason ?? undefined,
    reviewId: data.review_id != null ? String(data.review_id) : undefined,
  };
}

export async function submitUserReview(input: {
  requestId: string;
  rating: number;
  body: string;
}): Promise<string> {
  const envelope = await httpPost<ApiEnvelope<{ review_id: number }>>(
    "/user/reviews",
    {
      headers: await authorizedHeaders(),
      body: {
        request_id: Number.parseInt(input.requestId, 10),
        rating: input.rating,
        body: input.body,
      },
    },
  );

  return String(unwrapApiData(envelope).review_id);
}

export async function toggleSavedExpert(expertId: string): Promise<boolean> {
  const envelope = await httpPost<ApiEnvelope<{ saved: boolean }>>(
    `/user/saved-experts/${expertId}/toggle`,
    {
      headers: await authorizedHeaders(),
    },
  );

  return unwrapApiData(envelope).saved;
}

export async function createServiceRequest(input: {
  expertId: string;
  serviceSlug: string;
  cityId: string;
  description: string;
}): Promise<string> {
  const envelope = await httpPost<ApiEnvelope<{ request_id: number }>>(
    "/service-requests",
    {
      headers: await authorizedHeaders(),
      body: {
        expert_id: Number.parseInt(input.expertId, 10),
        service_slug: input.serviceSlug,
        city_id: Number.parseInt(input.cityId, 10),
        description: input.description,
      },
    },
  );

  return String(unwrapApiData(envelope).request_id);
}
