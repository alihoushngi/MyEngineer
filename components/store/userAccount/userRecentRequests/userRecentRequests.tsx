import { ArrowLeftIcon, ClipboardListIcon } from "lucide-react";
import Link from "next/link";

import { UserRequestRow } from "@/components/store/userAccount/userRequestRow/userRequestRow";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";

import {
  userAccountCopy,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";
import { siteConfig } from "@/config/site.config/site.config";

import { type UserRequest } from "@/types/store/user-account.types";

type UserRecentRequestsProps = {
  requests: readonly UserRequest[];
};

export function UserRecentRequests({ requests }: UserRecentRequestsProps) {
  const items = requests.slice(0, 3);

  return (
    <section className="flex h-full flex-col rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary-subtle text-secondary">
            <ClipboardListIcon aria-hidden="true" className="size-4" />
          </span>

          <h2 className="type-h4 text-foreground">
            {userAccountCopy.recentRequests}
          </h2>
        </div>

        <Button asChild variant="ghost" size="sm">
          <Link href={userAccountPaths.requests}>
            {userAccountCopy.viewAll}
            <ArrowLeftIcon
              aria-hidden="true"
              className="size-3.5 ltr:rotate-180"
            />
          </Link>
        </Button>
      </div>

      {items.length === 0 ? (
        <Empty
          title={userAccountCopy.emptyRequests}
          description={userAccountCopy.emptyRequestsHint}
          action={
            <Button asChild variant="outline" size="sm">
              <Link href={siteConfig.homeHref}>
                {userAccountCopy.findExpert}
              </Link>
            </Button>
          }
          className="my-auto py-8"
        />
      ) : (
        <ul className="grid gap-1">
          {items.map((request) => (
            <li key={request.id}>
              <UserRequestRow request={request} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
