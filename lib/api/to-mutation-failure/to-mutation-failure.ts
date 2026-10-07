import { isApiError, type ApiError } from "@/lib/api/api-error/api-error";
import { mutationFailed } from "@/lib/auth/service-mutation-result/service-mutation-result";
import { type ServiceMutationFailure } from "@/types/store/engineer-auth.types";

/** Maps a thrown error from a server action into a serialisable failure. */
function toFieldErrors(
  error: ApiError,
): Record<string, string> | undefined {
  const entries = error.validationErrors
    .filter((item) => item.field)
    .map((item) => [item.field as string, item.message] as const);

  return entries.length > 0 ? Object.fromEntries(entries) : undefined;
}

export function toMutationFailure(
  error: unknown,
  fallback: string,
): ServiceMutationFailure {
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
      fieldErrors: toFieldErrors(error),
    };
  }

  return mutationFailed(fallback);
}
