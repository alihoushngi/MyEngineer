"use server";

import { isApiError } from "@/lib/api/api-error/api-error";
import {
  mutationFailed,
  mutationOk,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
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

  try {
    const uploaded = await uploadFile({
      purpose: purposeValue,
      file,
    });
    return { ...mutationOk(), uploadId: uploaded.uploadId };
  } catch (error) {
    if (isApiError(error)) {
      return mutationFailed(error.message || "بارگذاری فایل انجام نشد.");
    }

    return mutationFailed("بارگذاری فایل انجام نشد.");
  }
}
