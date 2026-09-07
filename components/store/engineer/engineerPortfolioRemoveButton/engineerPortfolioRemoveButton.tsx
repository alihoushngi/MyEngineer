"use client";

import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { EngineerActionError } from "@/components/layout/engineerLogoutItem/engineerLogoutItem";
import { Button } from "@/components/ui/button/button";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { removeEngineerPortfolioItem } from "@/services/engineer-service/engineer-service";

type EngineerPortfolioRemoveButtonProps = {
  id: string;
};

export function EngineerPortfolioRemoveButton({
  id,
}: EngineerPortfolioRemoveButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const mutation = useApiMutation(removeEngineerPortfolioItem);

  async function handleRemove() {
    setError(null);

    try {
      await mutation.mutateAsync(id);
    } catch (err) {
      setError(toUserErrorMessage(err, engineerPanelCopy.mutationUnavailable));
    }
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        loading={mutation.isPending}
        icon={<Trash2Icon aria-hidden="true" />}
        className="text-danger transition-all duration-200 ease-in-out hover:bg-danger/10 hover:text-danger"
        onClick={() => void handleRemove()}
      >
        {engineerPanelCopy.removeLabel}
      </Button>

      <EngineerActionError
        message={error}
        onRetry={() => void handleRemove()}
      />
    </div>
  );
}
