import { Skeleton } from "@/components/ui/skeleton/skeleton";

import { userAccountCopy } from "@/config/user-account.config/user-account.config";

export function AccountPanelLoading() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">{userAccountCopy.loadingLabel}</span>

      <div className="space-y-3 border-b border-border-subtle pb-5">
        <Skeleton className="h-9 w-48 max-w-full rounded-xl" />
        <Skeleton className="h-5 w-full max-w-xl rounded-lg" />
      </div>

      <Skeleton className="h-28 w-full rounded-3xl" />

      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-64 rounded-3xl" />
        <Skeleton className="h-64 rounded-3xl" />
        <Skeleton className="h-64 rounded-3xl" />
        <Skeleton className="h-64 rounded-3xl" />
      </div>
    </div>
  );
}
