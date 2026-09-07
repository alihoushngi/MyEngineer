import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { UserRequestStatusBadge } from "@/components/store/userAccount/userRequestStatusBadge/userRequestStatusBadge";

import { userAccountPaths } from "@/config/user-account.config/user-account.config";

import { type UserRequest } from "@/types/store/user-account.types";

type UserRequestRowProps = {
  request: UserRequest;
};

export function UserRequestRow({ request }: UserRequestRowProps) {
  return (
    <Link
      href={`${userAccountPaths.requests}/${request.id}`}
      className="group flex min-h-20 flex-col gap-3 rounded-xl px-3 py-3 outline-none transition-all duration-200 ease-in-out hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-ring sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="min-w-0 flex-1">
        <p className="type-body-sm font-semibold text-foreground transition-all duration-200 ease-in-out group-hover:text-primary">
          {request.title}
        </p>
        <p className="mt-1 line-clamp-2 type-body-sm text-foreground-muted">
          {request.summary}
        </p>
        <p className="mt-1.5 truncate type-caption text-foreground-subtle">
          {[
            request.serviceLabel,
            request.expertName,
            request.city,
            request.latestActivityLabel ?? request.createdAtLabel,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <UserRequestStatusBadge status={request.status} />
        <ArrowLeftIcon
          aria-hidden="true"
          className="size-4 text-foreground-subtle transition-all duration-200 ease-in-out group-hover:-translate-x-1 group-hover:text-primary motion-reduce:transform-none ltr:rotate-180"
        />
      </div>
    </Link>
  );
}
