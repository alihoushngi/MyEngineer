import { BookmarkIcon, HomeIcon, MessagesSquareIcon } from "lucide-react";
import Link from "next/link";

import { RequestCreateDialog } from "@/components/store/marketplace/requestCreateDialog/requestCreateDialog";
import { Button } from "@/components/ui/button/button";

import {
  userAccountCopy,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";
import { isAccountFeatureEnabled } from "@/config/feature-flags.config/feature-flags.config";
import { siteConfig } from "@/config/site.config/site.config";

import { type City } from "@/types/store/registration.types";
import { type RequestExpertOption } from "@/types/store/service-request.types";

type UserQuickActionsProps = {
  experts: readonly RequestExpertOption[];
  cities: readonly City[];
  defaultCityId?: string;
};

export function UserQuickActions({
  experts,
  cities,
  defaultCityId,
}: UserQuickActionsProps) {
  return (
    <section className="grid gap-2 rounded-3xl border border-border-subtle bg-surface p-3 shadow-xs sm:grid-cols-2 lg:grid-cols-4">
      {isAccountFeatureEnabled("requests") ? (
        <RequestCreateDialog
          experts={experts}
          cities={cities}
          isUserAuthenticated
          nextPath={userAccountPaths.dashboard}
          defaultCityId={defaultCityId}
          triggerSize="sm"
          triggerClassName="w-full"
        />
      ) : null}

      <Button
        asChild
        variant="outline"
        size="sm"
        className="w-full justify-start"
      >
        <Link href={siteConfig.homeHref}>
          <HomeIcon aria-hidden="true" className="size-4" />
          {userAccountCopy.findExpert}
        </Link>
      </Button>

      {isAccountFeatureEnabled("messages") ? (
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full justify-start"
        >
          <Link href={userAccountPaths.messages}>
            <MessagesSquareIcon aria-hidden="true" className="size-4" />
            {userAccountCopy.viewMessages}
          </Link>
        </Button>
      ) : null}

      {isAccountFeatureEnabled("saved") ? (
        <Button
          asChild
          variant="outline"
          size="sm"
          className="w-full justify-start"
        >
          <Link href={userAccountPaths.saved}>
            <BookmarkIcon aria-hidden="true" className="size-4" />
            {userAccountCopy.viewSaved}
          </Link>
        </Button>
      ) : null}
    </section>
  );
}
