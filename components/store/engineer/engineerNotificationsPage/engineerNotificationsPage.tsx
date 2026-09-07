import { BellIcon } from "lucide-react";
import { Pagination } from "@/components/common/pagination/pagination";
import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { NotificationLink } from "@/components/store/notifications/notificationLink/notificationLink";
import { Empty } from "@/components/ui/empty/empty";
import {
  engineerPageTitles,
  engineerPanelCopy,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type PaginatedItems } from "@/lib/pagination/paginate-items/paginate-items";
import { type EngineerNotification } from "@/types/store/engineer.types";

type EngineerNotificationsPageProps = {
  notifications: readonly EngineerNotification[];
  pagination: PaginatedItems<EngineerNotification>;
  pathname: string;
};

export function EngineerNotificationsPage({
  notifications,
  pagination,
  pathname,
}: EngineerNotificationsPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.notifications}
        description="اعلان‌های فضای کاری. ارسال لحظه‌ای و اعلان پوش فعال نیست."
      />

      {pagination.total === 0 ? (
        <Empty
          icon={<BellIcon aria-hidden="true" />}
          title={engineerPanelCopy.emptyNotifications}
        />
      ) : (
        <>
          <ul className="grid gap-2 rounded-3xl border border-border-subtle bg-surface p-2 shadow-xs sm:p-3">
            {notifications.map((item) => (
              <li key={item.id}>
                <NotificationLink
                  id={item.id}
                  href={item.href}
                  isRead={item.isRead}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      {!item.isRead ? (
                        <span
                          aria-hidden="true"
                          className="size-2 shrink-0 rounded-full bg-primary"
                        />
                      ) : null}

                      <p className="type-body font-semibold text-foreground">
                        {item.title}
                      </p>
                    </div>

                    <p className="type-caption text-foreground-subtle">
                      {item.createdAtLabel}
                    </p>
                  </div>

                  <p className="mt-1.5 type-body-sm leading-relaxed text-foreground-muted">
                    {item.body}
                  </p>

                  {!item.isRead ? (
                    <span className="mt-2 inline-flex type-caption font-medium text-primary">
                      خوانده‌نشده
                    </span>
                  ) : null}
                </NotificationLink>
              </li>
            ))}
          </ul>

          <Pagination
            page={pagination.page}
            pageCount={pagination.pageCount}
            ariaLabel={engineerPanelCopy.paginationLabel}
            pathname={pathname}
          />
        </>
      )}
    </div>
  );
}
