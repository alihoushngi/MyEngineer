import { type ReactNode } from "react";

import { UserUnauthorized } from "@/components/store/userAccount/userUnauthorized/userUnauthorized";

import { userAuthPaths } from "@/config/user-auth.config/user-auth.config";

import { type UserAccessResult } from "@/types/store/user-auth.types";

type UserAuthGuardProps = {
  access: UserAccessResult;
  nextPath?: string;
  children: ReactNode;
};

export function UserAuthGuard({
  access,
  nextPath = userAuthPaths.account,
  children,
}: UserAuthGuardProps) {
  if (access.kind === "authenticated") {
    return children;
  }

  return <UserUnauthorized access={access} nextPath={nextPath} />;
}
