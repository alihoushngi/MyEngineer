export function findById<T extends { id: string }>(
  items: readonly T[],
  id: string,
): T | null {
  return items.find((item) => item.id === id) ?? null;
}

export function unreadCount(items: readonly { isRead: boolean }[]): number {
  return items.filter((item) => !item.isRead).length;
}

export function headerUnreadCount(
  apiConfigured: boolean,
  apiNotifications: readonly { isRead: boolean }[],
  mockNotifications: readonly { isRead: boolean }[],
): number {
  return unreadCount(apiConfigured ? apiNotifications : mockNotifications);
}

export function unreadMessageTotal(
  items: readonly { unreadCount: number }[],
): number {
  return items.reduce((total, item) => total + item.unreadCount, 0);
}

export type UserRequestFilterId = "all" | "sent" | "in_review" | "closed";

export function activeRequests<T extends { status: string }>(
  items: readonly T[],
): readonly T[] {
  return items.filter(
    (item) => item.status === "sent" || item.status === "in_review",
  );
}

export function parseUserRequestFilter(
  value: string | null,
): UserRequestFilterId {
  if (value === "sent" || value === "in_review" || value === "closed") {
    return value;
  }

  return "all";
}

export function filterRequestsByStatus<T extends { status: string }>(
  items: readonly T[],
  filter: UserRequestFilterId,
): readonly T[] {
  if (filter === "all") {
    return items;
  }

  return items.filter((item) => item.status === filter);
}
