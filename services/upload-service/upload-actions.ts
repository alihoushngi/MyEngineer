"use server";

import { toMutationFailure } from "@/lib/api/to-mutation-failure/to-mutation-failure";
import {
  mutationFailed,
  mutationOk,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import {
  purposeUploadRules,
  validateUpload,
} from "@/lib/uploads/validate-upload/validate-upload";
import {
  uploadFile,
  type UploadPurpose,
} from "@/services/upload-service/upload-service";
import { type ServiceMutationResult } from "@/types/store/engineer-auth.types";

const PURPOSES: readonly UploadPurpose[] = [
  "avatar",
  "degree",
  "license",
  "portfolio_image",
  "certificate",
  "testimonial",
];

function isUploadPurpose(value: string): value is UploadPurpose {
  return PURPOSES.includes(value as UploadPurpose);
}

export async function uploadFileAction(
  formData: FormData,
): Promise<ServiceMutationResult & { uploadId?: string }> {
  const purposeValue = String(formData.get("purpose") ?? "").trim();
  const file = formData.get("file");

  if (!isUploadPurpose(purposeValue)) {
    return mutationFailed("نوع فایل نامعتبر است.");
  }

  if (!(file instanceof File) || file.size === 0) {
    return mutationFailed("یک فایل معتبر انتخاب کنید.");
  }

  const validationError = validateUpload(
    file,
    purposeUploadRules[purposeValue],
  );
  if (validationError) {
    return mutationFailed(validationError);
  }

  try {
    const uploaded = await uploadFile({
      purpose: purposeValue,
      file,
    });
    return { ...mutationOk(), uploadId: uploaded.uploadId };
  } catch (error) {
    return toMutationFailure(error, "بارگذاری فایل انجام نشد.");
  }
}
