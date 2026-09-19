import {
  type ApiEnvelope,
  type ApiPaginationMeta,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { httpGet, httpPost } from "@/lib/api/http-client/http-client";
import {
  mapProfessionalCard,
  mapProfessionalDetail,
} from "@/lib/api/map-backend/map-backend";
import { readAccessToken } from "@/lib/auth/access-token-cookie/access-token-cookie";
import { env } from "@/lib/env/env";
import {
  type BackendPortfolio,
  type BackendProfessionalCard,
  type BackendProfessionalComment,
  type BackendProfessionalDetail,
} from "@/types/api/backend.types";
import {
  type ExpertCardData,
  type ExpertProfile,
} from "@/types/store/expert.types";

const PUBLIC_REVALIDATE_SECONDS = 120;

type ListProfessionalsOptions = {
  perPage?: number;
  serviceId?: number;
  cityIds?: readonly number[];
  provinceId?: number;
  role?: string;
};

export async function listProfessionals(
  options: ListProfessionalsOptions = {},
): Promise<readonly ExpertCardData[]> {
  if (!env.apiBaseUrl) {
    return [];
  }

  const envelope = await httpGet<
    ApiEnvelope<BackendProfessionalCard[], ApiPaginationMeta>
  >("/professionals", {
    query: {
      per_page: options.perPage ?? 48,
      service_id: options.serviceId,
      province_id: options.provinceId,
      role: options.role,
      "city_ids[]": options.cityIds ? [...options.cityIds] : undefined,
    },
    next: { revalidate: PUBLIC_REVALIDATE_SECONDS },
  });

  return unwrapApiData(envelope).map(mapProfessionalCard);
}

export async function getExpertProfile(
  id: string,
): Promise<ExpertProfile | null> {
  if (!env.apiBaseUrl) {
    return null;
  }

  try {
    const [detailEnvelope, portfoliosEnvelope, commentsEnvelope, related] =
      await Promise.all([
        httpGet<ApiEnvelope<BackendProfessionalDetail>>(
          `/professionals/${encodeURIComponent(id)}`,
          { next: { revalidate: PUBLIC_REVALIDATE_SECONDS } },
        ),
        httpGet<ApiEnvelope<BackendPortfolio[]>>(
          `/professionals/${encodeURIComponent(id)}/portfolios`,
          { next: { revalidate: PUBLIC_REVALIDATE_SECONDS } },
        ).catch(
          (): ApiEnvelope<BackendPortfolio[]> => ({ success: true, data: [] }),
        ),
        httpGet<ApiEnvelope<BackendProfessionalComment[]>>(
          `/professionals/${encodeURIComponent(id)}/comments`,
          { next: { revalidate: PUBLIC_REVALIDATE_SECONDS } },
        ).catch(
          (): ApiEnvelope<BackendProfessionalComment[]> => ({
            success: true,
            data: [],
          }),
        ),
        listProfessionals({ perPage: 6 }).catch(() => []),
      ]);

    const detail = unwrapApiData(detailEnvelope);
    const relatedCards = related
      .filter((expert) => expert.id !== String(detail.id))
      .slice(0, 4);

    return mapProfessionalDetail(
      detail,
      unwrapApiData(portfoliosEnvelope),
      unwrapApiData(commentsEnvelope),
      relatedCards,
    );
  } catch {
    return null;
  }
}

export async function getExpertCardData(
  id: string,
): Promise<ExpertCardData | null> {
  if (env.apiBaseUrl) {
    try {
      const envelope = await httpGet<ApiEnvelope<BackendProfessionalCard>>(
        `/professionals/${encodeURIComponent(id)}/card`,
        { next: { revalidate: PUBLIC_REVALIDATE_SECONDS } },
      );
      return mapProfessionalCard(unwrapApiData(envelope));
    } catch {
      // Fall through to detail-based card.
    }
  }

  const profile = await getExpertProfile(id);
  if (!profile) {
    return null;
  }

  return {
    id: profile.id,
    href: `/experts/${profile.id}`,
    name: profile.name,
    profession: profile.profession,
    avatarSrc: profile.avatarSrc,
    primarySpecialty: profile.primarySpecialty,
    city: profile.city,
    experienceYears: profile.experienceYears,
    isVerified: profile.isVerified,
    isActive: profile.isActive,
    rating: profile.rating,
    reviewCount: profile.reviewCount,
    specialties: profile.specialties,
  };
}

function authHeaders(token?: string): HeadersInit | undefined {
  if (!token) {
    return undefined;
  }
  return { Authorization: `Bearer ${token}` };
}

export async function postProfessionalComment(
  professionalId: string,
  input: { title: string; comment: string; rate: number },
): Promise<void> {
  const token = await readAccessToken();
  await httpPost<ApiEnvelope<BackendProfessionalComment>>(
    `/professionals/${encodeURIComponent(professionalId)}/comments`,
    {
      body: {
        title: input.title,
        comment: input.comment,
        rate: input.rate,
      },
      headers: authHeaders(token),
    },
  );
}
