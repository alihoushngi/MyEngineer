import { Badge } from "@/components/ui/badge/badge";

import { userAccountCopy } from "@/config/user-account.config/user-account.config";

import { type UserRequestStatus } from "@/types/store/user-account.types";

export function userRequestStatusBadge(status: UserRequestStatus): {
  label: string;
  variant: "info" | "warning" | "outline";
} {
  switch (status) {
    case "sent":
      return {
        label: userAccountCopy.requestStatusSent,
        variant: "info",
      };

    case "in_review":
      return {
        label: userAccountCopy.requestStatusInReview,
        variant: "warning",
      };

    case "closed":
      return {
        label: userAccountCopy.requestStatusClosed,
        variant: "outline",
      };
  }
}

export function UserRequestStatusBadge({
  status,
}: {
  status: UserRequestStatus;
}) {
  const badge = userRequestStatusBadge(status);

  return (
    <Badge variant={badge.variant} className="rounded-lg">
      {badge.label}
    </Badge>
  );
}
