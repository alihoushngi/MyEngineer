import Link from "next/link";
import { Clock3Icon, InfoIcon, TriangleAlertIcon } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";

import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";

import { type EngineerShellData } from "@/types/store/engineer.types";

type EngineerStatusBannerProps = {
  shell: EngineerShellData;
};

export function EngineerStatusBanner({ shell }: EngineerStatusBannerProps) {
  if (shell.accessKind === "visual_review") {
    return (
      <Alert variant="warning" className="rounded-2xl">
        <TriangleAlertIcon aria-hidden="true" />
        <AlertTitle>{engineerPanelCopy.visualReviewTitle}</AlertTitle>
        <AlertDescription>
          {engineerPanelCopy.visualReviewDescription}
        </AlertDescription>
      </Alert>
    );
  }

  if (shell.accessKind === "registration_in_progress") {
    return (
      <Alert variant="warning" className="rounded-2xl">
        <InfoIcon aria-hidden="true" />
        <AlertTitle>{engineerPanelCopy.incompleteRegistrationTitle}</AlertTitle>

        <AlertDescription>
          <p>{engineerPanelCopy.incompleteRegistrationDescription}</p>

          {shell.continueRegistrationPath ? (
            <Button
              asChild
              size="sm"
              className="mt-3 transition-all duration-200 ease-in-out"
            >
              <Link href={shell.continueRegistrationPath}>
                {engineerPanelCopy.continueRegistrationLabel}
              </Link>
            </Button>
          ) : null}
        </AlertDescription>
      </Alert>
    );
  }

  if (shell.accessKind === "pending_review") {
    return (
      <Alert variant="info" className="rounded-2xl">
        <Clock3Icon aria-hidden="true" />
        <AlertTitle>{engineerPanelCopy.pendingReviewTitle}</AlertTitle>
        <AlertDescription>
          {engineerPanelCopy.pendingReviewDescription}
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
