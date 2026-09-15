import { ApiError } from "@/lib/api/api-error/api-error";
import {
  type ServiceMutationFailure,
  type ServiceMutationResult,
} from "@/types/store/engineer-auth.types";

export function throwIfMutationFailed(result: ServiceMutationResult): void {
  if (result.ok) {
    return;
  }

  throw new ApiError({
    status: result.status,
    code: result.code,
    message: result.message,
  });
}

export function mutationUnavailable(message: string): ServiceMutationFailure {
  return {
    ok: false,
    status: 0,
    code: "unavailable",
    message,
  };
}

export function mutationUnauthorized(message: string): ServiceMutationFailure {
  return {
    ok: false,
    status: 401,
    code: "unauthorized",
    message,
  };
}

export function mutationFailed(message: string): ServiceMutationFailure {
  return {
    ok: false,
    status: 400,
    code: "validation",
    message,
  };
}

export function mutationOk(): { ok: true } {
  return { ok: true };
}
