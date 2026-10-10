import {
  apiErrorCodeFromStatus,
  type ApiErrorCode,
} from "@/lib/api/api-error-code/api-error-code";
import {
  parsePublicApiError,
  publicValidationErrors,
  safePublicErrorMessage,
  type PublicValidationError,
} from "@/lib/api/api-error/public-api-error";

export type ApiValidationError = PublicValidationError;

type ApiErrorInput = {
  status: number;
  message: string;
  code?: ApiErrorCode;
  payload?: unknown;
  validationErrors?: readonly ApiValidationError[];
};

export class ApiError extends Error {
  readonly status: number;
  readonly code: ApiErrorCode;
  readonly payload: unknown;
  readonly validationErrors: readonly ApiValidationError[];

  constructor({ status, message, code, validationErrors = [] }: ApiErrorInput) {
    super(
      status >= 500
        ? `Request failed with status ${status}`
        : (safePublicErrorMessage(message) ??
            `Request failed with status ${status}`),
    );
    this.name = "ApiError";
    this.status = status;
    // Never retain arbitrary upstream bodies, tokens or diagnostic payloads.
    this.payload = null;
    this.validationErrors =
      status >= 400 && status < 500
        ? publicValidationErrors(validationErrors)
        : [];
    this.code =
      code ?? apiErrorCodeFromStatus(status, this.validationErrors.length > 0);
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export async function apiErrorFromResponse(
  response: Response,
): Promise<ApiError> {
  const { message, validationErrors } = parsePublicApiError(
    response.status,
    await response.text(),
  );

  return new ApiError({
    status: response.status,
    message,
    validationErrors,
  });
}

export function apiErrorFromFetchFailure(
  error: unknown,
  timedOut: boolean,
  abortedByCaller: boolean,
): ApiError {
  if (abortedByCaller) {
    return new ApiError({
      status: 0,
      code: "aborted",
      message: "Request was aborted",
    });
  }

  if (timedOut || isTimeoutFailure(error)) {
    return new ApiError({
      status: 0,
      code: "timeout",
      message: "Request timed out",
    });
  }

  return new ApiError({
    status: 0,
    code: "network",
    message: "Network request failed",
  });
}

function isTimeoutFailure(error: unknown): boolean {
  return error instanceof DOMException && error.name === "TimeoutError";
}
