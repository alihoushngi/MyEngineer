"use server";

import { isApiError } from "@/lib/api/api-error/api-error";
import {
  mutationFailed,
  mutationOk,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import {
  apiSendContactMessage,
  apiSubscribeNewsletter,
} from "@/services/auth-api-service/auth-api-service";
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

export async function sendContactMessageAction(input: {
  name: string;
  family: string;
  mobile: string;
  email?: string;
  subject: string;
  message: string;
}): Promise<ServiceMutationResult> {
  try {
    await apiSendContactMessage(input);
    return mutationOk();
  } catch (error) {
    return toFailure(error, "ارسال پیام انجام نشد.");
  }
}

export async function subscribeNewsletterAction(
  contact: string,
): Promise<ServiceMutationResult> {
  const trimmed = contact.trim();
  if (trimmed.length < 5) {
    return mutationFailed("ایمیل یا شماره موبایل معتبر وارد کنید.");
  }

  try {
    await apiSubscribeNewsletter(trimmed);
    return mutationOk();
  } catch (error) {
    return toFailure(error, "عضویت در خبرنامه انجام نشد.");
  }
}
