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
import { authHeaders } from "@/lib/api/auth-headers/auth-headers";
import {
  parseTicketRoomDetail,
  type TicketPriority,
  type TicketRoomDetail,
  type TicketStatus,
} from "@/lib/tickets/parse-ticket-room/parse-ticket-room";
import {
  formatFaDate,
  ticketPriorityLabels,
  ticketStatusLabels,
} from "@/lib/tickets/ticket-labels/ticket-labels";

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

export type { TicketPriority, TicketStatus, TicketRoomDetail };
export type { TicketMessage } from "@/lib/tickets/parse-ticket-room/parse-ticket-room";

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

export {
  ticketStatusLabels as statusLabels,
  ticketPriorityLabels as priorityLabels,
  formatFaDate,
};

export function toTicketListItem(
  room: TicketRoom,
  basePath: string = "/account/support",
): TicketListItem {
  return {
    id: String(room.id),
    number: room.number,
    subject: room.subject,
    statusLabel: ticketStatusLabels[room.status] ?? room.status,
    priorityLabel: ticketPriorityLabels[room.priority] ?? room.priority,
    createdAtLabel: formatFaDate(room.created_at),
    href: `${basePath}/${room.id}`,
    isClosed: room.status === "closed",
  };
}

export async function listTicketRooms(
  basePath: string = "/account/support",
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
    const envelope = await httpGet<ApiEnvelope<unknown>>(
      `/tickets/rooms/${id}`,
      {
        headers: authHeaders(token),
        cache: "no-store",
      },
    );
    return parseTicketRoomDetail(unwrapApiData(envelope));
  } catch {
    return null;
  }
}

export async function createTicketRoom(input: {
  subject: string;
  message: string;
  priority?: TicketPriority;
  file?: File;
}): Promise<TicketRoom> {
  const token = await readAccessToken();
  const form = new FormData();
  form.append("subject", input.subject);
  if (input.message.trim()) {
    form.append("message", input.message);
  }
  if (input.priority) {
    form.append("priority", input.priority);
  }
  if (input.file) {
    form.append("file", input.file);
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
  file?: File;
}): Promise<void> {
  const token = await readAccessToken();
  const form = new FormData();
  if (input.message.trim()) {
    form.append("message", input.message);
  }
  if (input.file) {
    form.append("file", input.file);
  }

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
