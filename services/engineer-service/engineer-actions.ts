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
import {
  listBackendServices,
  listBackendSoftwares,
} from "@/services/lookup-service/lookup-service";
import {
  updateEngineerProfileApi,
  updateEngineerServiceAreaApi,
  updateEngineerSpecialtiesApi,
} from "@/services/engineer-service/engineer-panel-api";
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

function resolveLabeledIds(
  labels: readonly string[],
  catalog: readonly { id: number | string; label: string; slug?: string }[],
): number[] {
  const ids: number[] = [];

  for (const label of labels) {
    const normalized = label.trim().toLowerCase();
    if (!normalized) {
      continue;
    }

    const asNumber = Number(normalized);
    if (Number.isFinite(asNumber) && asNumber > 0) {
      if (!ids.includes(asNumber)) {
        ids.push(asNumber);
      }
      continue;
    }

    const match = catalog.find((item) => {
      const title = item.label.trim().toLowerCase();
      const slug = item.slug?.trim().toLowerCase() ?? "";
      return title === normalized || slug === normalized;
    });

    if (match) {
      const id = Number(match.id);
      if (Number.isFinite(id) && id > 0 && !ids.includes(id)) {
        ids.push(id);
      }
    }
  }

  return ids;
}

export async function updateEngineerProfileAction(
  request: UpdateEngineerProfileRequest,
): Promise<ServiceMutationResult> {
  if (!env.apiBaseUrl) {
    return mutationFailed("API پیکربندی نشده است.");
  }

  try {
    await updateEngineerProfileApi({
      firstName: request.firstName.trim(),
      lastName: request.lastName.trim(),
      profession: request.profession.trim(),
      about: request.about?.trim() || null,
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
    const [services, software] = await Promise.all([
      listBackendServices(),
      listBackendSoftwares(),
    ]);
    const flatServices = flattenServiceNodes(services).map((service) => ({
      id: service.id,
      label: service.short_title?.trim() || service.title,
      slug: service.slug,
    }));
    const softwareCatalog = software.map((item) => ({
      id: item.id,
      label: item.label,
    }));

    const serviceIds = resolveLabeledIds(request.specialties, flatServices);
    const softwareIds = resolveLabeledIds(request.software, softwareCatalog);

    if (serviceIds.length === 0) {
      return mutationFailed(
        "هیچ تخصص معتبری با سرویس‌های سامانه مطابقت نداشت. عنوان دقیق سرویس را وارد کنید.",
      );
    }

    await updateEngineerSpecialtiesApi({ serviceIds, softwareIds });
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

  const provinceId = Number(request.provinceId);
  const cityId = Number(request.cityId);
  const nearbyCityIds = request.nearbyCityIds
    .map((id) => Number(id))
    .filter((id) => Number.isFinite(id) && id > 0);

  if (!Number.isFinite(provinceId) || provinceId <= 0) {
    return mutationFailed("استان معتبر انتخاب کنید.");
  }

  if (!Number.isFinite(cityId) || cityId <= 0) {
    return mutationFailed("شهر معتبر انتخاب کنید.");
  }

  try {
    await updateEngineerServiceAreaApi({
      provinceId,
      cityId,
      nearbyCityIds,
    });
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
