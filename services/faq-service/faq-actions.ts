"use server";

import {
  type ApiEnvelope,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { httpPost } from "@/lib/api/http-client/http-client";
import { toMutationFailure } from "@/lib/api/to-mutation-failure/to-mutation-failure";
import {
  mutationFailed,
  mutationOk,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import { type ServiceMutationResult } from "@/types/store/engineer-auth.types";

export type FaqQuestionInput = {
  question: string;
  name?: string;
  mobile?: string;
};

export async function submitFaqQuestionAction(
  input: FaqQuestionInput,
): Promise<ServiceMutationResult> {
  const question = input.question.trim();
  const name = input.name?.trim();
  const mobile = input.mobile?.trim();

  if (question.length < 10 || question.length > 1000) {
    return mutationFailed("متن سوال باید بین ۱۰ تا ۱۰۰۰ نویسه باشد.");
  }

  if (mobile && !/^09\d{9}$/.test(mobile)) {
    return mutationFailed("شماره موبایل معتبر نیست.");
  }

  try {
    const envelope = await httpPost<ApiEnvelope<unknown>>("/faq-questions", {
      body: {
        question,
        name: name || undefined,
        mobile: mobile || undefined,
      },
    });
    unwrapApiData(envelope);
    return mutationOk(envelope.message ?? undefined);
  } catch (error) {
    return toMutationFailure(error, "ثبت سوال انجام نشد. دوباره تلاش کنید.");
  }
}
