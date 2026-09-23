import {
  type TicketPriority,
  type TicketStatus,
} from "@/lib/tickets/parse-ticket-room/parse-ticket-room";

export type { TicketPriority, TicketStatus };

export const ticketStatusLabels: Record<TicketStatus, string> = {
  answered: "پاسخ داده‌شده",
  seen: "دیده‌شده",
  pending: "در انتظار",
  closed: "بسته‌شده",
};

export const ticketPriorityLabels: Record<TicketPriority, string> = {
  low: "کم",
  mid: "متوسط",
  high: "بالا",
};

export function formatFaDate(value?: string | null): string {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
