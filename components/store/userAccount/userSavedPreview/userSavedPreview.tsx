import { ArrowLeftIcon, BookmarkIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";

import {
  userAccountCopy,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";
import { siteConfig } from "@/config/site.config/site.config";

import { type ExpertCardData } from "@/types/store/expert.types";

type UserSavedPreviewProps = {
  experts: readonly ExpertCardData[];
};

export function UserSavedPreview({ experts }: UserSavedPreviewProps) {
  const items = experts.slice(0, 3);

  return (
    <section className="flex h-full flex-col rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-subtle text-accent">
            <BookmarkIcon aria-hidden="true" className="size-4" />
          </span>

          <h2 className="type-h4 text-foreground">
            {userAccountCopy.savedExperts}
          </h2>
        </div>

        <Button asChild variant="ghost" size="sm">
          <Link href={userAccountPaths.saved}>
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
          title={userAccountCopy.emptySaved}
          description={userAccountCopy.emptySavedHint}
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
          {items.map((expert) => (
            <li key={expert.id}>
              <Link
                href={expert.href}
                className="group flex min-h-16 items-center gap-3 rounded-xl px-3 py-3 outline-none transition-all duration-200 ease-in-out hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary">
                  <BookmarkIcon aria-hidden="true" className="size-4" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate type-body-sm font-semibold text-foreground transition-all duration-200 ease-in-out group-hover:text-primary">
                    {expert.name}
                  </span>
                  <span className="mt-1 block truncate type-caption text-foreground-subtle">
                    {[expert.profession, expert.city]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                </span>

                <ArrowLeftIcon
                  aria-hidden="true"
                  className="size-4 shrink-0 text-foreground-subtle transition-all duration-200 ease-in-out group-hover:-translate-x-1 group-hover:text-primary motion-reduce:transform-none ltr:rotate-180"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
