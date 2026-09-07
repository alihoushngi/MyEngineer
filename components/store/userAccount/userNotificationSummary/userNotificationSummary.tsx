import { BellIcon, ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { NotificationLink } from "@/components/store/notifications/notificationLink/notificationLink";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";

import {
  userAccountCopy,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";

import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { unreadCount } from "@/lib/user-account/workspace-selectors/workspace-selectors";

import { type UserNotification } from "@/types/store/user-account.types";

type UserNotificationSummaryProps = {
  notifications: readonly UserNotification[];
};

export function UserNotificationSummary({
  notifications,
}: UserNotificationSummaryProps) {
  const unread = unreadCount(notifications);
  const items = notifications.slice(0, 3);

  return (
    <section className="flex h-full flex-col rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-info/10 text-info">
            <BellIcon aria-hidden="true" className="size-4" />
          </span>

          <div className="flex min-w-0 items-center gap-2">
            <h2 className="type-h4 text-foreground">
              {userAccountCopy.notificationSummary}
            </h2>

            {unread > 0 ? (
              <Badge variant="info">
                {formatFaNumber(unread)} {userAccountCopy.unreadLabel}
              </Badge>
            ) : null}
          </div>
        </div>

        <Button asChild variant="ghost" size="sm">
          <Link href={userAccountPaths.notifications}>
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
          title={userAccountCopy.emptyNotifications}
          className="my-auto py-8"
        />
      ) : (
        <ul className="grid gap-1">
          {items.map((item) => (
            <li key={item.id}>
              <NotificationLink
                id={item.id}
                href={item.href}
                isRead={item.isRead}
              >
                <p className="type-body-sm font-semibold text-foreground">
                  {item.title}
                </p>
                <p className="line-clamp-2 type-body-sm text-foreground-muted">
                  {item.body}
                </p>
                <p className="type-caption text-foreground-subtle">
                  {item.createdAtLabel}
                </p>
              </NotificationLink>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
