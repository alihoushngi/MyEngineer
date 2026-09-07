import Link from "next/link";
import { type ReactNode } from "react";

import { Button } from "@/components/ui/button/button";

import { marketplaceCopy } from "@/config/marketplace.config/marketplace.config";
import { userAccountPaths } from "@/config/user-account.config/user-account.config";

import { userLoginHref } from "@/lib/auth/safe-user-next/safe-user-next";

type StartConversationButtonProps = {
  expertId: string;
  isUserAuthenticated: boolean;
  className?: string;
  variant?: "outline" | "ghost" | "primary";
  icon?: ReactNode;
};

export function startConversationHref(expertId: string): string {
  return `${userAccountPaths.messages}/start?expertId=${encodeURIComponent(expertId)}`;
}

export function StartConversationButton({
  expertId,
  isUserAuthenticated,
  className,
  variant = "outline",
  icon,
}: StartConversationButtonProps) {
  const startHref = startConversationHref(expertId);
  const href = isUserAuthenticated ? startHref : userLoginHref(startHref);

  return (
    <Button asChild variant={variant} className={className}>
      <Link href={href} className="gap-2">
        {icon}
        {marketplaceCopy.messageEngineerLabel}
      </Link>
    </Button>
  );
}
