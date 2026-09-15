"use server";

import { revalidatePath } from "next/cache";

import { isApiError } from "@/lib/api/api-error/api-error";
import {
  mutationFailed,
  mutationOk,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import { postProfessionalComment } from "@/services/expert-service/expert-service";
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

export async function submitProfessionalCommentAction(input: {
  professionalId: string;
  title: string;
  comment: string;
  rate: number;
}): Promise<ServiceMutationResult> {
  const title = input.title.trim();
  const comment = input.comment.trim();
  const rate = input.rate;

  if (
    !input.professionalId ||
    title.length < 2 ||
    comment.length < 5 ||
    !Number.isInteger(rate) ||
    rate < 1 ||
    rate > 5
  ) {
    return mutationFailed("عنوان، متن و امتیاز ۱ تا ۵ را کامل کنید.");
  }

  try {
    await postProfessionalComment(input.professionalId, {
      title,
      comment,
      rate,
    });
    revalidatePath(`/experts/${input.professionalId}`);
    return mutationOk();
  } catch (error) {
    return toFailure(error, "ثبت دیدگاه انجام نشد.");
  }
}
