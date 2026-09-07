import { CircleAlertIcon, RotateCcwIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";

type EngineerActionErrorProps = {
  message: string | null;
  onRetry?: () => void;
};

export function EngineerActionError({
  message,
  onRetry,
}: EngineerActionErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <Alert variant="danger" className="rounded-2xl">
      <CircleAlertIcon aria-hidden="true" />
      <AlertTitle>عملیات انجام نشد</AlertTitle>

      <AlertDescription>
        <p>{message}</p>

        {onRetry ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3 gap-2 transition-all duration-200 ease-in-out"
            onClick={onRetry}
          >
            <RotateCcwIcon aria-hidden="true" className="size-4" />
            {engineerPanelCopy.retryLabel}
          </Button>
        ) : null}
      </AlertDescription>
    </Alert>
  );
}
