"use server";

import { isApiError } from "@/lib/api/api-error/api-error";
import {
  mutationFailed,
  mutationOk,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import { applyCareer } from "@/services/content-service/content-service";
import { type ServiceMutationResult } from "@/types/store/engineer-auth.types";

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

export async function applyCareerAction(
  formData: FormData,
): Promise<ServiceMutationResult> {
  const careerId = String(formData.get("careerId") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const family = String(formData.get("family") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const mobile = String(formData.get("mobile") ?? "").trim();
  const ageRaw = String(formData.get("age") ?? "").trim();
  const gender = String(formData.get("gender") ?? "").trim();
  const provinceId = String(formData.get("provinceId") ?? "").trim();
  const cityId = String(formData.get("cityId") ?? "").trim();
  const resume = formData.get("resume");

  const age = Number(ageRaw);

  if (
    !careerId ||
    name.length < 2 ||
    family.length < 2 ||
    !email.includes("@") ||
    !/^09\d{9}$/.test(mobile) ||
    !Number.isFinite(age) ||
    age < 18 ||
    age > 80 ||
    (gender !== "male" && gender !== "female") ||
    !provinceId ||
    !cityId
  ) {
    return mutationFailed("لطفاً همه فیلدهای ضروری را به‌درستی پر کنید.");
  }

  try {
    await applyCareer(careerId, {
      name,
      family,
      email,
      mobile,
      age,
      gender,
      provinceId,
      cityId,
      resume: resume instanceof File && resume.size > 0 ? resume : null,
    });
    return mutationOk();
  } catch (error) {
    return toFailure(error, "ارسال درخواست همکاری انجام نشد.");
  }
}
