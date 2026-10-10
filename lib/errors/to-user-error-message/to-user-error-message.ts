import { isApiError } from "@/lib/api/api-error/api-error";
import { type ApiErrorCode } from "@/lib/api/api-error-code/api-error-code";
import { safePublicErrorMessage } from "@/lib/api/api-error/public-api-error";

const REQUEST_FAILED_PREFIX = /^Request failed with status/i;
const PERSIAN_LETTER = /[\u0600-\u06FF]/;

const CODE_MESSAGES: Partial<Record<ApiErrorCode, string>> = {
  network: "اتصال به سرور برقرار نشد. اتصال اینترنت را بررسی کنید.",
  timeout: "پاسخ سرور بیش از حد طول کشید. دوباره تلاش کنید.",
  unauthorized: "برای ادامه این عملیات مجوز لازم است.",
  forbidden: "دسترسی به این بخش مجاز نیست.",
  not_found: "مورد درخواستی پیدا نشد.",
  conflict: "اطلاعات ارسال‌شده با وضعیت فعلی سازگار نیست.",
  server: "خطای داخلی سرور رخ داد. لطفاً بعداً دوباره تلاش کنید.",
  unconfigured: "اتصال به سرویس در این محیط تنظیم نشده است.",
};

export function toUserErrorMessage(error: unknown, fallback: string): string {
  if (isApiError(error)) {
    const validationMessage =
      error.status >= 400 && error.status < 500
        ? firstSafeValidationMessage(error.validationErrors)
        : null;

    if (validationMessage) {
      return validationMessage;
    }

    if (error.code === "unavailable" && isSafeUserMessage(error.message)) {
      return error.message.trim();
    }

    const mapped = CODE_MESSAGES[error.code];

    if (mapped) {
      return mapped;
    }

    if (isSafeUserMessage(error.message)) {
      return error.message.trim();
    }

    return fallback;
  }

  if (!(error instanceof Error)) {
    return fallback;
  }

  const message = error.message.trim();

  if (!isSafeUserMessage(message)) {
    return fallback;
  }

  return message;
}

function firstSafeValidationMessage(
  errors: readonly { message: string }[],
): string | null {
  const message = errors[0]?.message.trim() ?? "";

  if (!isSafeUserMessage(message)) {
    return null;
  }

  return message;
}

function isSafeUserMessage(message: string): boolean {
  if (!safePublicErrorMessage(message) || REQUEST_FAILED_PREFIX.test(message)) {
    return false;
  }

  return PERSIAN_LETTER.test(message);
}
