import {
  type ApiEnvelope,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { authHeaders } from "@/lib/api/auth-headers/auth-headers";
import { httpPost } from "@/lib/api/http-client/http-client";
import { readAccessToken } from "@/lib/auth/access-token-cookie/access-token-cookie";

export type UploadPurpose =
  | "avatar"
  | "degree"
  | "license"
  | "portfolio_image"
  | "certificate";

export type UploadFileInput = {
  purpose: UploadPurpose;
  file: File;
};

export type UploadFileResult = {
  uploadId: string;
  path: string;
  purpose: UploadPurpose;
  originalName: string;
  size: number;
};

type BackendUploadResult = {
  upload_id: string;
  path: string;
  purpose: UploadPurpose;
  original_name: string;
  size: number;
};

export async function uploadFile(
  input: UploadFileInput,
): Promise<UploadFileResult> {
  const token = await readAccessToken();
  const form = new FormData();
  form.append("purpose", input.purpose);
  form.append("file", input.file);

  const envelope = await httpPost<ApiEnvelope<BackendUploadResult>>("/uploads", {
    body: form,
    headers: authHeaders(token),
  });

  const data = unwrapApiData(envelope);

  return {
    uploadId: data.upload_id,
    path: data.path,
    purpose: data.purpose,
    originalName: data.original_name,
    size: data.size,
  };
}
