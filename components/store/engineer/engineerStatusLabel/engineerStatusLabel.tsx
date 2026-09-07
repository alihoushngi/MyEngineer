import { Badge } from "@/components/ui/badge/badge";

import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";

import {
  type EngineerCredentialStatus,
  type EngineerRequestStatus,
  type EngineerVerificationStatus,
} from "@/types/store/engineer.types";

type StatusVariant = "success" | "warning" | "danger" | "info" | "outline";

type StatusBadgeData = {
  label: string;
  variant: StatusVariant;
};

export function verificationBadge(
  status: EngineerVerificationStatus,
): StatusBadgeData {
  switch (status) {
    case "verified":
      return {
        label: engineerPanelCopy.verificationVerified,
        variant: "success",
      };

    case "pending_review":
      return {
        label: engineerPanelCopy.verificationPending,
        variant: "warning",
      };

    case "needs_correction":
      return {
        label: engineerPanelCopy.verificationNeedsCorrection,
        variant: "danger",
      };

    case "incomplete":
      return {
        label: engineerPanelCopy.verificationIncomplete,
        variant: "outline",
      };
  }
}

export function requestStatusBadge(
  status: EngineerRequestStatus,
): StatusBadgeData {
  switch (status) {
    case "new":
      return {
        label: engineerPanelCopy.requestStatusNew,
        variant: "info",
      };

    case "in_review":
      return {
        label: engineerPanelCopy.requestStatusInReview,
        variant: "warning",
      };

    case "closed":
      return {
        label: engineerPanelCopy.requestStatusClosed,
        variant: "outline",
      };
  }
}

export function credentialStatusBadge(
  status: EngineerCredentialStatus,
): StatusBadgeData {
  switch (status) {
    case "verified":
      return {
        label: engineerPanelCopy.credentialVerified,
        variant: "success",
      };

    case "pending_review":
      return {
        label: engineerPanelCopy.credentialPending,
        variant: "warning",
      };

    case "needs_correction":
      return {
        label: engineerPanelCopy.credentialNeedsCorrection,
        variant: "danger",
      };

    case "submitted":
      return {
        label: engineerPanelCopy.credentialSubmitted,
        variant: "info",
      };
  }
}

export function EngineerStatusBadge({ label, variant }: StatusBadgeData) {
  return (
    <Badge
      variant={variant}
      className="shrink-0 transition-all duration-200 ease-in-out"
    >
      {label}
    </Badge>
  );
}
