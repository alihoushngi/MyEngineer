import { BellIcon } from "lucide-react";

import { Pagination } from "@/components/common/pagination/pagination";
import { NotificationLink } from "@/components/store/notifications/notificationLink/notificationLink";
import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { Empty } from "@/components/ui/empty/empty";

import {
  userAccountCopy,
  userAccountPageTitles,
} from "@/config/user-account.config/user-account.config";

import { type PaginatedItems } from "@/lib/pagination/paginate-items/paginate-items";

import { type UserNotification } from "@/types/store/user-account.types";

type UserNotificationsPageProps = {
  notifications: readonly UserNotification[];
  pagination: PaginatedItems<UserNotification>;
  pathname: string;
};

export function UserNotificationsPage({
  notifications,
  pagination,
  pathname,
}: UserNotificationsPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title={userAccountPageTitles.notifications}
        description={userAccountCopy.notificationsDescription}
      />

      {pagination.total === 0 ? (
        <div className="rounded-3xl border border-border-subtle bg-surface p-3 shadow-xs">
          <Empty
            icon={<BellIcon aria-hidden="true" />}
            title={userAccountCopy.emptyNotifications}
          />
        </div>
      ) : (
        <>
          <ul className="rounded-3xl border border-border-subtle bg-surface p-2 shadow-xs">
            {notifications.map((item) => (
              <li key={item.id}>
                <NotificationLink
                  id={item.id}
                  href={item.href}
                  isRead={item.isRead}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="type-body-sm font-semibold text-foreground">
                      {item.title}
                    </p>
                    <p className="type-caption text-foreground-subtle">
                      {item.createdAtLabel}
                    </p>
                  </div>

                  <p className="type-body-sm leading-relaxed text-foreground-muted">
                    {item.body}
                  </p>

                  {!item.isRead ? (
                    <span className="type-caption font-medium text-primary">
                      {userAccountCopy.unreadLabel}
                    </span>
                  ) : null}
                </NotificationLink>
              </li>
            ))}
          </ul>

          <Pagination
            page={pagination.page}
            pageCount={pagination.pageCount}
            ariaLabel={userAccountCopy.paginationLabel}
            pathname={pathname}
          />
        </>
      )}
    </div>
  );
}
