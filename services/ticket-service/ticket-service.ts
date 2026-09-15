import {
  type ApiEnvelope,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import {
  httpGet,
  httpPost,
  httpPut,
} from "@/lib/api/http-client/http-client";
import { readAccessToken } from "@/lib/auth/access-token-cookie/access-token-cookie";
import { env } from "@/lib/env/env";
import { userAccountPaths } from "@/config/user-account.config/user-account.config";

export type TicketPriority = "low" | "mid" | "high";
export type TicketStatus = "answered" | "seen" | "pending" | "closed";

export type TicketRoom = {
  id: number;
  number: string;
  subject: string;
  priority: TicketPriority;
  status: TicketStatus;
  sender_id: number;
  receiver_id: number;
  created_at?: string | null;
};

export type TicketMessage = {
  id: number;
  message?: string | null;
  file?: string | null;
  sender_id: number;
  created_at?: string | null;
};

export type TicketRoomDetail = TicketRoom & {
  messages?: readonly TicketMessage[];
};

export type TicketListItem = {
  id: string;
  number: string;
  subject: string;
  statusLabel: string;
  priorityLabel: string;
  createdAtLabel: string;
  href: string;
  isClosed: boolean;
};

const statusLabels: Record<TicketStatus, string> = {
  answered: "پاسخ داده‌شده",
  seen: "دیده‌شده",
  pending: "در انتظار",
  closed: "بسته‌شده",
};

const priorityLabels: Record<TicketPriority, string> = {
  low: "کم",
  mid: "متوسط",
  high: "بالا",
};

function authHeaders(token?: string): HeadersInit | undefined {
  if (!token) {
    return undefined;
  }
  return { Authorization: `Bearer ${token}` };
}

function formatFaDate(value?: string | null): string {
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

export function toTicketListItem(
  room: TicketRoom,
  basePath: string = userAccountPaths.messages,
): TicketListItem {
  return {
    id: String(room.id),
    number: room.number,
    subject: room.subject,
    statusLabel: statusLabels[room.status] ?? room.status,
    priorityLabel: priorityLabels[room.priority] ?? room.priority,
    createdAtLabel: formatFaDate(room.created_at),
    href: `${basePath}/${room.id}`,
    isClosed: room.status === "closed",
  };
}

export async function listTicketRooms(
  basePath: string = userAccountPaths.messages,
): Promise<readonly TicketListItem[]> {
  if (!env.apiBaseUrl) {
    return [];
  }

  const token = await readAccessToken();
  if (!token) {
    return [];
  }

  const envelope = await httpGet<ApiEnvelope<TicketRoom[]>>("/tickets/rooms", {
    headers: authHeaders(token),
    cache: "no-store",
  });

  return unwrapApiData(envelope).map((room) =>
    toTicketListItem(room, basePath),
  );
}

export async function getTicketRoom(
  id: string,
): Promise<TicketRoomDetail | null> {
  if (!env.apiBaseUrl) {
    return null;
  }

  const token = await readAccessToken();
  if (!token) {
    return null;
  }

  try {
    const envelope = await httpGet<ApiEnvelope<TicketRoomDetail>>(
      `/tickets/rooms/${id}`,
      {
        headers: authHeaders(token),
        cache: "no-store",
      },
    );
    return unwrapApiData(envelope);
  } catch {
    return null;
  }
}

export async function createTicketRoom(input: {
  subject: string;
  message: string;
  priority?: TicketPriority;
}): Promise<TicketRoom> {
  const token = await readAccessToken();
  const form = new FormData();
  form.append("subject", input.subject);
  form.append("message", input.message);
  if (input.priority) {
    form.append("priority", input.priority);
  }

  const envelope = await httpPost<ApiEnvelope<TicketRoom>>("/tickets/rooms", {
    body: form,
    headers: authHeaders(token),
  });
  return unwrapApiData(envelope);
}

export async function replyTicketRoom(input: {
  roomId: string;
  message: string;
}): Promise<void> {
  const token = await readAccessToken();
  const form = new FormData();
  form.append("message", input.message);

  await httpPost<ApiEnvelope<null>>(`/tickets/rooms/${input.roomId}/reply`, {
    body: form,
    headers: authHeaders(token),
  });
}

export async function closeTicketRoom(roomId: string): Promise<void> {
  const token = await readAccessToken();
  await httpPut<ApiEnvelope<null>>(`/tickets/rooms/${roomId}/close`, {
    headers: authHeaders(token),
  });
}

export { statusLabels, priorityLabels, formatFaDate };
