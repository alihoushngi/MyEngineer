"use client";

import { SendIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field/field";
import { Textarea } from "@/components/ui/textarea/textarea";

import { messagingCopy } from "@/config/messaging.config/messaging.config";

import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";

import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";

import { sendMessage } from "@/services/messaging-service/messaging-service";

type MessagingComposerProps = {
  conversationId: string;
};

export function MessagingComposer({ conversationId }: MessagingComposerProps) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const mutation = useApiMutation(sendMessage);

  async function handleSubmit() {
    const trimmed = body.trim();

    setFieldError(null);
    setSendError(null);

    if (trimmed === "") {
      setFieldError(messagingCopy.composerEmptyError);
      return;
    }

    try {
      await mutation.mutateAsync({
        conversationId,
        body: trimmed,
      });

      setBody("");
      router.refresh();
    } catch (error) {
      setSendError(toUserErrorMessage(error, messagingCopy.sendFailed));
    }
  }

  return (
    <form
      className="shrink-0 border-t border-border-subtle bg-surface-elevated p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4"
      onSubmit={(event) => {
        event.preventDefault();
        void handleSubmit();
      }}
    >
      <Field invalid={Boolean(fieldError)}>
        <FieldLabel htmlFor="messaging-composer">
          {messagingCopy.sendLabel}
        </FieldLabel>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
          <Textarea
            id="messaging-composer"
            value={body}
            onChange={(event) => {
              setBody(event.target.value);

              if (fieldError) {
                setFieldError(null);
              }

              if (sendError) {
                setSendError(null);
              }
            }}
            placeholder={messagingCopy.composerPlaceholder}
            rows={3}
            className="min-h-24 flex-1 resize-none sm:min-h-20"
          />

          <Button
            type="submit"
            loading={mutation.isPending}
            disabled={mutation.isPending}
            className="w-full shrink-0 gap-2 sm:w-auto"
          >
            <SendIcon aria-hidden="true" className="size-4" />
            {messagingCopy.sendLabel}
          </Button>
        </div>

        <FieldError>{fieldError}</FieldError>
      </Field>

      {sendError ? (
        <div
          className="mt-3 flex flex-col gap-2 rounded-xl bg-danger/10 p-3 sm:flex-row sm:items-center sm:justify-between"
          role="alert"
        >
          <p className="type-caption leading-relaxed text-danger">
            {sendError}
          </p>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="shrink-0"
            onClick={() => void handleSubmit()}
          >
            {messagingCopy.retryLabel}
          </Button>
        </div>
      ) : null}
    </form>
  );
}
