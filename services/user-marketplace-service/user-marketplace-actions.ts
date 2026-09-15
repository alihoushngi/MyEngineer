"use server";

import { revalidatePath } from "next/cache";
import { isMockUserAuthEnabled } from "@/config/mock-auth.config/mock-auth.config";
import { getServiceCategoryBySlug } from "@/services/catalog-service/catalog-service";
import { listCatalogCities } from "@/services/catalog-service/catalog-service";
import { getExpertCardData } from "@/services/expert-service/expert-service";
import { mockExpertCards } from "@/lib/mock-data/mock-data";
import {
  excerptRequestSummary,
  toggleSavedId,
} from "@/lib/marketplace/request-selectors/request-selectors";
import {
  readCreatedRequests,
  readSavedExpertIds,
  writeCreatedRequests,
  writeSavedExpertIds,
} from "@/lib/marketplace/mock-marketplace-overlay/mock-marketplace-overlay";
import {
  mutationFailed,
  mutationUnauthorized,
  mutationUnavailable,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import { getUserSession } from "@/lib/auth/user-session/user-session";
import { mockCurrentUser } from "@/lib/mock-data/user-workspace-mock-data";
import { createServiceRequestSchema } from "@/lib/validation/marketplace/create-service-request.schema";
import { type ServiceMutationResult } from "@/types/store/engineer-auth.types";
import { type CreateServiceRequestInput } from "@/types/store/service-request.types";

const MARKETPLACE_UNAVAILABLE =
  "ذخیره متخصص و ثبت درخواست پس از اتصال سرویس حساب فعال می‌شود.";
const MARKETPLACE_UNAUTHORIZED = "برای ادامه باید وارد حساب کاربری شوید.";

export async function toggleSavedExpertAction(input: {
  expertId: string;
}): Promise<ServiceMutationResult & { saved?: boolean }> {
  if (!isMockUserAuthEnabled()) {
    return mutationUnavailable(MARKETPLACE_UNAVAILABLE);
  }

  const session = await getUserSession();

  if (!session) {
    return mutationUnauthorized(MARKETPLACE_UNAUTHORIZED);
  }

  const expertId = input.expertId.trim();

  if (!expertId || !mockExpertCards.some((expert) => expert.id === expertId)) {
    return mutationFailed("متخصص معتبر نیست.");
  }

  const nextIds = toggleSavedId(await readSavedExpertIds(), expertId);
  await writeSavedExpertIds(nextIds);
  revalidatePath("/account");
  revalidatePath("/account/saved");
  revalidatePath(`/experts/${expertId}`);
  return { ok: true, saved: nextIds.includes(expertId) };
}

export async function createServiceRequestAction(
  input: CreateServiceRequestInput,
): Promise<ServiceMutationResult & { requestId?: string }> {
  if (!isMockUserAuthEnabled()) {
    return mutationUnavailable(MARKETPLACE_UNAVAILABLE);
  }

  const session = await getUserSession();

  if (!session) {
    return mutationUnauthorized(MARKETPLACE_UNAUTHORIZED);
  }

  try {
    await createServiceRequestSchema.validate(input, { abortEarly: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "اطلاعات درخواست کامل نیست.";
    return mutationFailed(message);
  }

  const expert =
    (await getExpertCardData(input.expertId)) ??
    mockExpertCards.find((item) => item.id === input.expertId) ??
    null;

  if (!expert) {
    return mutationFailed("متخصص معتبر نیست.");
  }

  const [service, cities] = await Promise.all([
    getServiceCategoryBySlug(input.serviceSlug),
    listCatalogCities(),
  ]);
  const city = cities.find((item) => item.id === input.cityId);

  if (!service || !city) {
    return mutationFailed("خدمت یا شهر معتبر نیست.");
  }

  const requestId = `req-mock-${Date.now()}`;
  const description = input.description.trim();
  const created = {
    id: requestId,
    title: `${service.label} در ${city.name}`,
    serviceSlug: service.slug,
    serviceLabel: service.label,
    city: city.name,
    cityId: city.id,
    createdAtLabel: "همین الان",
    summary: excerptRequestSummary(description),
    description,
    status: "sent" as const,
    expertId: expert.id,
    expertName: expert.name,
    expertHref: expert.href,
    customerId: mockCurrentUser.id,
    customerDisplayName:
      session.profile?.displayName ?? mockCurrentUser.displayName,
  };

  const existing = await readCreatedRequests();
  await writeCreatedRequests([created, ...existing]);
  revalidatePath("/account");
  revalidatePath("/account/requests");
  revalidatePath(`/account/requests/${requestId}`);
  revalidatePath("/engineer/requests");
  revalidatePath(`/engineer/requests/${requestId}`);
  return { ok: true, requestId };
}
