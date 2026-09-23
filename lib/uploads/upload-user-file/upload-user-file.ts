import { throwIfMutationFailed } from "@/lib/auth/service-mutation-result/service-mutation-result";
import { uploadFileAction } from "@/services/upload-service/upload-actions";
import { type UploadPurpose } from "@/services/upload-service/upload-service";

export async function uploadUserFile(
  purpose: UploadPurpose,
  file: File,
): Promise<string> {
  const form = new FormData();
  form.append("purpose", purpose);
  form.append("file", file);

  const result = await uploadFileAction(form);
  throwIfMutationFailed(result);

  if (!result.uploadId) {
    throw new Error("بارگذاری فایل شناسه برنگرداند.");
  }

  return result.uploadId;
}
