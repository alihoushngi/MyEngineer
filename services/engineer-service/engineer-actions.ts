"use server";

import { revalidatePath } from "next/cache";

import { isApiError } from "@/lib/api/api-error/api-error";
import { flattenServiceNodes } from "@/lib/api/map-backend/map-backend";
import {
  mutationFailed,
  mutationOk,
  throwIfMutationFailed,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import { env } from "@/lib/env/env";
import { listBackendServices } from "@/services/lookup-service/lookup-service";
import {
  updateCurrentProfile,
  updateProfileCities,
  updateProfileServices,
} from "@/services/profile-service/profile-service";
import { type ServiceMutationResult } from "@/types/store/engineer-auth.types";

export type UpdateEngineerProfileRequest = {
  firstName: string;
  lastName: string;
  profession: string;
  about?: string;
};

export type UpdateEngineerSpecialtiesRequest = {
  specialties: readonly string[];
  software: readonly string[];
};

export type UpdateEngineerServiceAreaRequest = {
  provinceId: string;
  cityId: string;
  nearbyCityIds: readonly string[];
};

function toFailure(error: unknown, fallback: string): ServiceMutationResult {
  if (isApiError(error)) {
    return {
      ok: false,
      status: error.status,
      code:
        error.status === 401 || error.status === 403
          ? "unauthorized"
          : error.status >= 500
            ? "server"
            : "validation",
      message: error.message || fallback,
    };
  }

  return mutationFailed(fallback);
}

function revalidateEngineerProfile() {
  revalidatePath(engineerPanelPaths.profile);
  revalidatePath(engineerPanelPaths.services);
  revalidatePath(engineerPanelPaths.serviceAreas);
  revalidatePath(engineerPanelPaths.dashboard);
}

export async function updateEngineerProfileAction(
  request: UpdateEngineerProfileRequest,
): Promise<ServiceMutationResult> {
  if (!env.apiBaseUrl) {
    return mutationFailed("API پیکربندی نشده است.");
  }

  const bio = [request.profession.trim(), request.about?.trim()]
    .filter(Boolean)
    .join("\n\n");

  try {
    await updateCurrentProfile({
      name: request.firstName.trim(),
      family: request.lastName.trim(),
      bio: bio || null,
    });
    revalidateEngineerProfile();
    return mutationOk();
  } catch (error) {
    return toFailure(error, "ذخیره اطلاعات پایه انجام نشد.");
  }
}

export async function updateEngineerSpecialtiesAction(
  request: UpdateEngineerSpecialtiesRequest,
): Promise<ServiceMutationResult> {
  if (!env.apiBaseUrl) {
    return mutationFailed("API پیکربندی نشده است.");
  }

  try {
    const services = flattenServiceNodes(await listBackendServices());
    const serviceIds: number[] = [];

    for (const label of request.specialties) {
      const normalized = label.trim().toLowerCase();
      if (!normalized) {
        continue;
      }

      const match = services.find((service) => {
        const title = service.title.trim().toLowerCase();
        const shortTitle = service.short_title?.trim().toLowerCase() ?? "";
        const slug = service.slug.trim().toLowerCase();
        return (
          title === normalized ||
          shortTitle === normalized ||
          slug === normalized
        );
      });

      if (match && !serviceIds.includes(match.id)) {
        serviceIds.push(match.id);
      }
    }

    if (serviceIds.length === 0) {
      return mutationFailed(
        "هیچ تخصص معتبری با سرویس‌های سامانه مطابقت نداشت. عنوان دقیق سرویس را وارد کنید.",
      );
    }

    await updateProfileServices(serviceIds);
    revalidateEngineerProfile();
    return mutationOk();
  } catch (error) {
    return toFailure(error, "ذخیره تخصص‌ها انجام نشد.");
  }
}

export async function updateEngineerServiceAreaAction(
  request: UpdateEngineerServiceAreaRequest,
): Promise<ServiceMutationResult> {
  if (!env.apiBaseUrl) {
    return mutationFailed("API پیکربندی نشده است.");
  }

  const cityIds = [
    Number(request.cityId),
    ...request.nearbyCityIds.map((id) => Number(id)),
  ].filter((id) => Number.isFinite(id) && id > 0);

  const uniqueCityIds = [...new Set(cityIds)];
  if (uniqueCityIds.length === 0) {
    return mutationFailed("حداقل یک شهر معتبر انتخاب کنید.");
  }

  const provinceId = Number(request.provinceId);

  try {
    await Promise.all([
      updateProfileCities(uniqueCityIds),
      updateCurrentProfile({
        province_id: Number.isFinite(provinceId) ? provinceId : undefined,
        city_id: uniqueCityIds[0],
      }),
    ]);
    revalidateEngineerProfile();
    return mutationOk();
  } catch (error) {
    return toFailure(error, "ذخیره محدوده خدمات انجام نشد.");
  }
}

export async function updateEngineerProfile(
  request: UpdateEngineerProfileRequest,
): Promise<void> {
  throwIfMutationFailed(await updateEngineerProfileAction(request));
}

export async function updateEngineerSpecialties(
  request: UpdateEngineerSpecialtiesRequest,
): Promise<void> {
  throwIfMutationFailed(await updateEngineerSpecialtiesAction(request));
}

export async function updateEngineerServiceArea(
  request: UpdateEngineerServiceAreaRequest,
): Promise<void> {
  throwIfMutationFailed(await updateEngineerServiceAreaAction(request));
}
