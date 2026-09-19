/**
 * Registration service — API integration layer.
 *
 * Live mode: env.apiBaseUrl → /auth/engineer-registration/* and
 * /profile/registration/*.
 * Mock mode: explicit mockRegister flags only when API is unset.
 */

import { ApiError } from "@/lib/api/api-error/api-error";
import { throwIfMutationFailed } from "@/lib/auth/service-mutation-result/service-mutation-result";
import {
  getExpertiseCatalogAction,
  saveEducationAction,
  saveExpertiseAction,
  saveOrganizationAction,
  savePersonalInfoAction,
  saveResumeAction,
  saveServiceAreaAction,
  sendOtpAction,
  submitRegistrationAction,
  verifyOtpAction,
} from "@/services/registration-service/registration-actions";
import {
  type ExpertiseCatalogResult,
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

export type {
  SaveEducationRequest,
  SaveExpertiseRequest,
  SaveOrganizationRequest,
  SavePersonalInfoRequest,
  SaveResumeRequest,
  SaveServiceAreaRequest,
  SendOtpRequest,
  SubmitRegistrationRequest,
  VerifyOtpRequest,
};

export async function sendOtp(request: SendOtpRequest): Promise<void> {
  throwIfMutationFailed(await sendOtpAction(request));
}

export async function verifyOtp(request: VerifyOtpRequest): Promise<void> {
  throwIfMutationFailed(await verifyOtpAction(request));
}

export async function saveServiceArea(
  request: SaveServiceAreaRequest,
): Promise<void> {
  throwIfMutationFailed(await saveServiceAreaAction(request));
}

export async function saveExpertise(
  request: SaveExpertiseRequest,
): Promise<void> {
  throwIfMutationFailed(await saveExpertiseAction(request));
}

export async function getExpertiseCatalog(): Promise<ExpertiseCatalogResult> {
  const result = await getExpertiseCatalogAction();

  if (!result.ok) {
    throw new ApiError({
      status: result.status,
      code: result.code,
      message: result.message,
    });
  }

  return result.catalog;
}

export async function savePersonalInfo(
  request: SavePersonalInfoRequest,
): Promise<void> {
  throwIfMutationFailed(await savePersonalInfoAction(request));
}

export async function saveEducation(
  request: SaveEducationRequest,
): Promise<void> {
  throwIfMutationFailed(await saveEducationAction(request));
}

export async function saveOrganization(
  request: SaveOrganizationRequest,
): Promise<void> {
  throwIfMutationFailed(await saveOrganizationAction(request));
}

export async function saveResume(request: SaveResumeRequest): Promise<void> {
  throwIfMutationFailed(await saveResumeAction(request));
}

export async function submitRegistration(
  request: SubmitRegistrationRequest,
): Promise<void> {
  throwIfMutationFailed(await submitRegistrationAction(request));
}
