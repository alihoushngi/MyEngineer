"use client";

import Link from "next/link";
import { type ReactNode } from "react";

import { cn } from "@/lib/utils/cn/cn";

import { markNotificationRead } from "@/services/notification-service/notification-service";

type NotificationLinkProps = {
  id: string;
  href: string;
  isRead: boolean;
  children: ReactNode;
  className?: string;
};

export function NotificationLink({
  id,
  href,
  isRead,
  children,
  className,
}: NotificationLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex min-h-16 flex-col gap-1.5 rounded-xl px-3 py-3 outline-none transition-all duration-200 ease-in-out hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-ring sm:px-4 sm:py-4",
        !isRead && "bg-primary-subtle/60 hover:bg-primary-subtle",
        className,
      )}
      onClick={() => {
        if (!isRead) {
          void markNotificationRead(id);
        }
      }}
    >
      {!isRead ? (
        <span
          aria-hidden="true"
          className="absolute inset-y-3 inset-s-0 w-0.5 rounded-full bg-primary"
        />
      ) : null}

      {children}
    </Link>
  );
}
