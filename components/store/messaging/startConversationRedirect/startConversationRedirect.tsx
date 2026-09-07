"use client";

import Link from "next/link";
import { MessageSquareIcon, RotateCcwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button/button";
import { Spinner } from "@/components/ui/spinner/spinner";

import { messagingCopy } from "@/config/messaging.config/messaging.config";
import {
  userAccountCopy,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";

import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";

import { startOrOpenConversation } from "@/services/messaging-service/messaging-service";

type StartConversationRedirectProps = {
  expertId: string;
};

export function StartConversationRedirect({
  expertId,
}: StartConversationRedirectProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    void startOrOpenConversation(expertId)
      .then((conversationId) => {
        if (!cancelled) {
          router.replace(`${userAccountPaths.messages}/${conversationId}`);
        }
      })
      .catch((caught: unknown) => {
        if (!cancelled) {
          setError(toUserErrorMessage(caught, messagingCopy.startUnavailable));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [attempt, expertId, router]);

  if (error) {
    return (
      <div className="mx-auto flex w-full max-w-lg flex-col items-center rounded-3xl border border-danger/15 bg-surface p-6 text-center shadow-xs sm:p-8">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-danger/10 text-danger">
          <MessageSquareIcon aria-hidden="true" className="size-5" />
        </span>

        <p className="mt-4 type-body leading-relaxed text-danger" role="alert">
          {error}
        </p>

        <div className="mt-5 flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
          <Button
            type="button"
            className="gap-2"
            onClick={() => {
              setError(null);
              setAttempt((value) => value + 1);
            }}
          >
            <RotateCcwIcon aria-hidden="true" className="size-4" />
            {messagingCopy.retryLabel}
          </Button>

          <Button asChild variant="outline">
            <Link href={userAccountPaths.messages}>
              {userAccountCopy.viewMessages}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center rounded-3xl border border-border-subtle bg-surface p-8 text-center shadow-xs">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-primary-subtle text-primary">
        <Spinner />
      </span>

      <p className="mt-4 type-body text-foreground-muted">
        {userAccountCopy.loadingLabel}
      </p>
    </div>
  );
}
