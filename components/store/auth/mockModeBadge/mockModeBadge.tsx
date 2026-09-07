import { FlaskConicalIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge/badge";

import { authUiCopy } from "@/config/auth-ui.config/auth-ui.config";

type MockModeBadgeProps = {
  visible: boolean;
};

export function MockModeBadge({ visible }: MockModeBadgeProps) {
  if (!visible) {
    return null;
  }

  return (
    <Badge variant="warning" className="gap-1.5 font-normal">
      <FlaskConicalIcon aria-hidden="true" className="size-3.5" />
      {authUiCopy.mockModeLabel}
    </Badge>
  );
}
