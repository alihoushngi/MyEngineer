"use server";

import { revalidatePath } from "next/cache";

import { isApiError } from "@/lib/api/api-error/api-error";
import {
  mutationFailed,
  mutationOk,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import { userAccountPaths } from "@/config/user-account.config/user-account.config";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import {
  updateCurrentPassword,
  updateCurrentProfile,
  uploadCurrentAvatar,
  type ProfileUpdateInput,
} from "@/services/profile-service/profile-service";
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

function revalidateProfilePaths() {
  revalidatePath(userAccountPaths.profile);
  revalidatePath(userAccountPaths.settings);
  revalidatePath(userAccountPaths.dashboard);
  revalidatePath(engineerPanelPaths.profile);
  revalidatePath(engineerPanelPaths.dashboard);
}

export async function updateProfileAction(
  input: ProfileUpdateInput,
): Promise<ServiceMutationResult> {
  try {
    await updateCurrentProfile(input);
    revalidateProfilePaths();
    return mutationOk();
  } catch (error) {
    return toFailure(error, "به‌روزرسانی پروفایل انجام نشد.");
  }
}

export async function updatePasswordAction(input: {
  current_password: string;
  password: string;
  password_confirmation: string;
}): Promise<ServiceMutationResult> {
  try {
    await updateCurrentPassword(input);
    return mutationOk();
  } catch (error) {
    return toFailure(error, "تغییر رمز عبور انجام نشد.");
  }
}

export async function uploadAvatarAction(
  formData: FormData,
): Promise<ServiceMutationResult> {
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) {
    return mutationFailed("یک تصویر معتبر انتخاب کنید.");
  }

  try {
    await uploadCurrentAvatar(file);
    revalidateProfilePaths();
    return mutationOk();
  } catch (error) {
    return toFailure(error, "آپلود تصویر انجام نشد.");
  }
}
