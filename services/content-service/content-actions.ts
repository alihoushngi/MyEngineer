"use server";

import {
  resumeUploadRule,
  validateUpload,
} from "@/lib/uploads/validate-upload/validate-upload";
import { toMutationFailure } from "@/lib/api/to-mutation-failure/to-mutation-failure";
import {
  mutationFailed,
  mutationOk,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import {
  applyCareer,
  postTestimonial,
} from "@/services/content-service/content-service";
import { type ServiceMutationResult } from "@/types/store/engineer-auth.types";

function toFailure(error: unknown, fallback: string): ServiceMutationResult {
  return toMutationFailure(error, fallback);
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

  if (resume instanceof File && resume.size > 0) {
    const resumeError = validateUpload(resume, resumeUploadRule);
    if (resumeError) {
      return mutationFailed(resumeError);
    }
  }

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

export async function submitTestimonialAction(input: {
  jobTitle: string;
  comment: string;
  name?: string;
  photoUploadId?: string;
}): Promise<ServiceMutationResult> {
  const jobTitle = input.jobTitle.trim();
  const comment = input.comment.trim();

  if (jobTitle.length < 2 || jobTitle.length > 100) {
    return mutationFailed("سمت یا شغل را وارد کنید.");
  }

  if (comment.length < 10 || comment.length > 1000) {
    return mutationFailed("متن نظر باید بین ۱۰ تا ۱۰۰۰ نویسه باشد.");
  }

  try {
    const message = await postTestimonial({
      jobTitle,
      comment,
      name: input.name?.trim(),
      photoUploadId: input.photoUploadId,
    });
    return mutationOk(message);
  } catch (error) {
    return toFailure(error, "ثبت نظر انجام نشد. دوباره تلاش کنید.");
  }
}
