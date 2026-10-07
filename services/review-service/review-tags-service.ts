import {
  type ApiEnvelope,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { httpGet } from "@/lib/api/http-client/http-client";
import { env } from "@/lib/env/env";

export type ReviewTagOption = { id: number; title: string };

export type ReviewTagGroups = {
  positive: readonly ReviewTagOption[];
  negative: readonly ReviewTagOption[];
};

const emptyGroups: ReviewTagGroups = { positive: [], negative: [] };

/** Public review tags (GET /review-tags). Fail-soft: empty groups on error. */
export async function getReviewTags(): Promise<ReviewTagGroups> {
  if (!env.apiBaseUrl) {
    return emptyGroups;
  }

  try {
    const envelope = await httpGet<ApiEnvelope<Partial<ReviewTagGroups>>>(
      "/review-tags",
      { next: { revalidate: 300 } },
    );
    const data = unwrapApiData(envelope);

    return {
      positive: data?.positive ?? [],
      negative: data?.negative ?? [],
    };
  } catch {
    return emptyGroups;
  }
}
