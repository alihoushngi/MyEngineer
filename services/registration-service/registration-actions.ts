"use server";

import { isMockRegisterEnabled } from "@/config/mock-auth.config/mock-auth.config";
import {
  mockRegistrationStep,
  mockVerifyRegistrationOtp,
} from "@/lib/auth/mock-registration-adapter/mock-registration-adapter";
import { serializeMockEngineerProfileCookie } from "@/lib/auth/mock-engineer-profile-cookie/mock-engineer-profile-cookie";
import {
  clearMockEngineerSession,
  writeMockEngineerSession,
} from "@/lib/auth/engineer-session/engineer-session";
import {
  getExpertiseCatalog,
  type ExpertiseCatalog,
} from "@/lib/mock-data/registration-expertise-catalog/registration-expertise-catalog";
import {
  mutationFailed,
  mutationOk,
  mutationUnavailable,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import { isApiError } from "@/lib/api/api-error/api-error";
import { mapEducationToApi } from "@/lib/registration/education-levels/education-levels";
import { type ServiceMutationFailure } from "@/types/store/engineer-auth.types";
import { type ServiceMutationResult } from "@/types/store/engineer-auth.types";
import {
  createEngineerCredential,
  createEngineerPortfolioItem,
} from "@/services/engineer-service/engineer-panel-api";
import {
  type SaveEducationRequest,
  type SaveExpertiseRequest,
  type SaveOrganizationRequest,
  type SavePersonalInfoRequest,
  type SaveResumeRequest,
  type SaveServiceAreaRequest,
  type SendOtpRequest,
  type SubmitRegistrationRequest,
  type VerifyOtpRequest,
} from "@/services/registration-service/registration-service.types";
import { env } from "@/lib/env/env";
import {
  apiEngineerRegistrationOtp,
  apiSaveRegistrationEducation,
  apiSaveRegistrationExpertise,
  apiSaveRegistrationOrganization,
  apiSaveRegistrationPersonalInfo,
  apiSaveRegistrationResume,
  apiSaveRegistrationServiceArea,
  apiSubmitRegistration,
  apiVerifyOtp,
  type LoginData,
} from "@/services/auth-api-service/auth-api-service";
import { clearMockUserSession } from "@/lib/auth/user-session/user-session";
import {
  isEngineerPanelRole,
  writeAccessSession,
} from "@/lib/auth/access-token-cookie/access-token-cookie";

const API_NOT_AVAILABLE_MESSAGE =
  "این عملیات هنوز از طریق سرور در دسترس نیست. پس از آماده‌شدن API فعال می‌شود.";

function realUnavailable(): ServiceMutationFailure {
  return mutationUnavailable(API_NOT_AVAILABLE_MESSAGE);
}

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

async function persistRegistrationAssets(
  request: SubmitRegistrationRequest,
): Promise<void> {
  for (const [index, uploadId] of (request.imageUploadIds ?? []).entries()) {
    try {
      await createEngineerPortfolioItem({
        title: `نمونه‌کار ${index + 1}`,
        imageUploadId: uploadId,
      });
    } catch {
      continue;
    }
  }

  for (const certificate of request.certificates ?? []) {
    if (!certificate.uploadId && certificate.title.trim() === "") {
      continue;
    }

    try {
      await createEngineerCredential({
        kind: "certificate",
        title: certificate.title.trim() || "گواهی",
        uploadId: certificate.uploadId,
      });
    } catch {
      continue;
    }
  }
}

async function persistEngineerLogin(data: LoginData): Promise<ServiceMutationResult> {
  if (data.requires_role_selection) {
    return mutationFailed(
      "پس از تأیید کد، نقش متخصص به‌صورت خودکار انتخاب نشد. دوباره وارد شوید.",
    );
  }

  const roleName = data.user.role?.name ?? "engineer";
  if (!isEngineerPanelRole(roleName)) {
    return mutationFailed("حساب ساخته‌شده نقش متخصص ندارد.");
  }

  await clearMockUserSession();
  await clearMockEngineerSession();
  await writeAccessSession({
    token: data.token,
    role: roleName,
    displayName:
      data.user.full_name?.trim() ||
      [data.user.name, data.user.family].filter(Boolean).join(" ").trim(),
  });

  return mutationOk();
}

export async function sendOtpAction(
  request: SendOtpRequest,
): Promise<ServiceMutationResult> {
  if (env.apiBaseUrl) {
    try {
      await apiEngineerRegistrationOtp({
        mobile: request.phone.trim(),
        national_id: request.nationalId.trim(),
      });
      return mutationOk();
    } catch (error) {
      return toFailure(error, "ارسال کد تأیید ناموفق بود.");
    }
  }

  if (!isMockRegisterEnabled()) {
    return realUnavailable();
  }

  return mockRegistrationStep();
}

export async function verifyOtpAction(
  request: VerifyOtpRequest,
): Promise<ServiceMutationResult> {
  if (env.apiBaseUrl) {
    try {
      const data = await apiVerifyOtp({
        mobile: request.phone.trim(),
        purpose: "account_activation",
        code: request.code.trim(),
        device_name: "web",
      });
      return persistEngineerLogin(data as LoginData);
    } catch (error) {
      return toFailure(error, "کد واردشده معتبر نیست.");
    }
  }

  if (!isMockRegisterEnabled()) {
    return realUnavailable();
  }

  return mockVerifyRegistrationOtp({ code: request.code });
}

export async function saveServiceAreaAction(
  request: SaveServiceAreaRequest,
): Promise<ServiceMutationResult> {
  if (env.apiBaseUrl) {
    const provinceId = Number(request.provinceId);
    const cityId = Number(request.cityId);
    const nearbyCityIds = request.nearbyCityIds
      .map((id) => Number(id))
      .filter((id) => Number.isFinite(id) && id > 0);

    if (!Number.isFinite(provinceId) || !Number.isFinite(cityId)) {
      return mutationFailed("استان و شهر معتبر انتخاب کنید.");
    }

    try {
      await apiSaveRegistrationServiceArea({
        province_id: provinceId,
        city_id: cityId,
        nearby_city_ids: nearbyCityIds,
      });
      return mutationOk();
    } catch (error) {
      return toFailure(error, "ذخیره محدوده خدمت ناموفق بود.");
    }
  }

  if (!isMockRegisterEnabled()) {
    return realUnavailable();
  }

  return mockRegistrationStep();
}

export async function saveExpertiseAction(
  request: SaveExpertiseRequest,
): Promise<ServiceMutationResult> {
  if (env.apiBaseUrl) {
    const serviceIds = request.expertiseIds
      .map((id) => Number(id))
      .filter((id) => Number.isFinite(id) && id > 0);
    const softwareIds = request.softwareIds
      .map((id) => Number(id))
      .filter((id) => Number.isFinite(id) && id > 0);

    if (serviceIds.length === 0) {
      return mutationFailed("حداقل یک تخصص انتخاب کنید.");
    }

    try {
      await apiSaveRegistrationExpertise({
        service_ids: serviceIds,
        software_ids: softwareIds,
      });
      return mutationOk();
    } catch (error) {
      return toFailure(error, "ذخیره تخصص‌ها ناموفق بود.");
    }
  }

  if (!isMockRegisterEnabled()) {
    return realUnavailable();
  }

  return mockRegistrationStep();
}

export async function savePersonalInfoAction(
  request: SavePersonalInfoRequest,
): Promise<ServiceMutationResult> {
  if (env.apiBaseUrl) {
    try {
      await apiSaveRegistrationPersonalInfo({
        first_name: request.firstName.trim(),
        last_name: request.lastName.trim(),
        avatar_upload_id: request.avatarUploadId?.trim() || null,
      });
      return mutationOk();
    } catch (error) {
      return toFailure(error, "ذخیره اطلاعات شخصی ناموفق بود.");
    }
  }

  if (!isMockRegisterEnabled()) {
    return realUnavailable();
  }

  return mockRegistrationStep();
}

export async function saveEducationAction(
  request: SaveEducationRequest,
): Promise<ServiceMutationResult> {
  if (env.apiBaseUrl) {
    let payload;
    try {
      payload = mapEducationToApi({
        level: request.level,
        fieldIds: request.fieldIds,
        university: request.university,
        uploadIds: request.degreeFileUploadIds,
      });
    } catch {
      return mutationFailed("مقطع تحصیلی معتبر انتخاب کنید.");
    }

    if (payload.degrees.length === 0) {
      return mutationFailed("حداقل یک رشته تحصیلی از فهرست سامانه انتخاب کنید.");
    }

    try {
      await apiSaveRegistrationEducation({
        level: payload.level,
        degrees: payload.degrees,
        degree_file_upload_ids: payload.degree_file_upload_ids,
      });
      return mutationOk();
    } catch (error) {
      return toFailure(error, "ذخیره تحصیلات ناموفق بود.");
    }
  }

  if (!isMockRegisterEnabled()) {
    return realUnavailable();
  }

  return mockRegistrationStep();
}

export async function saveOrganizationAction(
  request: SaveOrganizationRequest,
): Promise<ServiceMutationResult> {
  if (env.apiBaseUrl) {
    const disciplineId = request.disciplineId
      ? Number(request.disciplineId)
      : null;
    const qualificationIds = (request.qualificationIds ?? [])
      .map((id) => Number(id))
      .filter((id) => Number.isFinite(id) && id > 0);

    try {
      await apiSaveRegistrationOrganization({
        is_member: request.isMember,
        membership_number: request.membershipNumber,
        has_license: request.hasLicense ?? false,
        license_number: request.licenseNumber,
        discipline_id:
          disciplineId != null && Number.isFinite(disciplineId)
            ? disciplineId
            : null,
        qualification_ids: qualificationIds,
        license_upload_id: request.licenseUploadId,
      });
      return mutationOk();
    } catch (error) {
      return toFailure(error, "ذخیره اطلاعات سازمان ناموفق بود.");
    }
  }

  if (!isMockRegisterEnabled()) {
    return realUnavailable();
  }

  return mockRegistrationStep();
}

export async function saveResumeAction(
  request: SaveResumeRequest,
): Promise<ServiceMutationResult> {
  if (env.apiBaseUrl) {
    try {
      await apiSaveRegistrationResume({
        experience_years: request.experienceYears,
        resume_text: request.resumeText.trim(),
      });
      return mutationOk();
    } catch (error) {
      return toFailure(error, "ذخیره رزومه ناموفق بود.");
    }
  }

  if (!isMockRegisterEnabled()) {
    return realUnavailable();
  }

  return mockRegistrationStep();
}

/** @deprecated Prefer typed save*Action helpers. Kept for transitional callers. */
export async function saveRegistrationStepAction(): Promise<ServiceMutationResult> {
  if (!isMockRegisterEnabled()) {
    return realUnavailable();
  }

  return mockRegistrationStep();
}

export async function submitRegistrationAction(
  request: SubmitRegistrationRequest,
): Promise<ServiceMutationResult> {
  if (env.apiBaseUrl) {
    try {
      await apiSubmitRegistration({
        accept_rules: request.acceptRules,
        image_count: request.imageCount,
        certificate_count: request.certificateCount,
      });
      await persistRegistrationAssets(request);
      return mutationOk();
    } catch (error) {
      return toFailure(error, "ارسال نهایی ثبت‌نام ناموفق بود.");
    }
  }

  if (!isMockRegisterEnabled()) {
    return realUnavailable();
  }

  const result = await mockRegistrationStep();

  if (!result.ok) {
    return result;
  }

  await writeMockEngineerSession({
    source: "registration",
    profileCookieValue: request.profile
      ? serializeMockEngineerProfileCookie(request.profile)
      : undefined,
  });

  return { ok: true };
}

export async function getExpertiseCatalogAction(): Promise<
  { ok: true; catalog: ExpertiseCatalog } | ServiceMutationFailure
> {
  if (!env.apiBaseUrl) {
    return realUnavailable();
  }

  try {
    const catalog = await getExpertiseCatalog();
    return { ok: true, catalog };
  } catch {
    return realUnavailable();
  }
}
