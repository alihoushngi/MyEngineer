"use client";

import { BookmarkIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthRequiredAction } from "@/components/store/auth/authRequiredAction/authRequiredAction";
import { marketplaceCopy } from "@/config/marketplace.config/marketplace.config";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { toggleSavedExpert } from "@/services/user-marketplace-service/user-marketplace-service";

type ExpertSaveButtonProps = {
  expertId: string;
  isSaved: boolean;
  isUserAuthenticated: boolean;
  nextPath: string;
  className?: string;
  savedLabel?: string;
  unsavedLabel?: string;
};

export function ExpertSaveButton({
  expertId,
  isSaved,
  isUserAuthenticated,
  nextPath,
  className,
  savedLabel = marketplaceCopy.savedEngineerLabel,
  unsavedLabel = marketplaceCopy.saveEngineerLabel,
}: ExpertSaveButtonProps) {
  const router = useRouter();
  const [optimisticSaved, setOptimisticSaved] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mutation = useApiMutation((id: string) => toggleSavedExpert(id));
  const saved = optimisticSaved ?? isSaved;
  const label = saved ? savedLabel : unsavedLabel;

  return (
    <div className={className}>
      <AuthRequiredAction
        isAuthenticated={isUserAuthenticated}
        nextPath={nextPath}
        label={label}
        variant="ghost"
        className="w-full transition-all duration-200 ease-in-out border-white text-white"
        pressed={saved}
        loading={mutation.isPending}
        icon={
          <BookmarkIcon
            aria-hidden="true"
            className={saved ? "fill-current" : undefined}
          />
        }
        onAuthenticatedClick={() => {
          setError(null);
          setOptimisticSaved(!saved);

          void mutation
            .mutateAsync(expertId)
            .then((result) => {
              setOptimisticSaved(result.saved);
              router.refresh();
            })
            .catch((err: unknown) => {
              setOptimisticSaved(null);
              setError(
                toUserErrorMessage(err, marketplaceCopy.mutationErrorFallback),
              );
            });
        }}
      />

      {error ? (
        <p
          className="mt-2 rounded-lg bg-danger/10 px-2.5 py-2 type-caption text-danger"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
