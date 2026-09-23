export type TicketPriority = "low" | "mid" | "high";
export type TicketStatus = "answered" | "seen" | "pending" | "closed";

export type TicketMessage = {
  id: number;
  message?: string | null;
  file?: string | null;
  sender_id: number;
  created_at?: string | null;
};

export type TicketRoomDetail = {
  id: number;
  number: string;
  subject: string;
  priority: TicketPriority;
  status: TicketStatus;
  sender_id: number;
  receiver_id: number;
  created_at?: string | null;
  messages: readonly TicketMessage[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asPriority(value: unknown): TicketPriority {
  return value === "low" || value === "high" ? value : "mid";
}

function asStatus(value: unknown): TicketStatus {
  if (
    value === "answered" ||
    value === "seen" ||
    value === "pending" ||
    value === "closed"
  ) {
    return value;
  }

  return "pending";
}

function parseMessage(value: unknown): TicketMessage | null {
  if (!isRecord(value) || typeof value.id !== "number") {
    return null;
  }

  return {
    id: value.id,
    message: typeof value.message === "string" ? value.message : null,
    file: typeof value.file === "string" ? value.file : null,
    sender_id: typeof value.sender_id === "number" ? value.sender_id : 0,
    created_at: typeof value.created_at === "string" ? value.created_at : null,
  };
}

function parseRoomFields(value: Record<string, unknown>): Omit<
  TicketRoomDetail,
  "messages"
> | null {
  if (typeof value.id !== "number") {
    return null;
  }

  return {
    id: value.id,
    number: typeof value.number === "string" ? value.number : String(value.id),
    subject: typeof value.subject === "string" ? value.subject : "",
    priority: asPriority(value.priority),
    status: asStatus(value.status),
    sender_id: typeof value.sender_id === "number" ? value.sender_id : 0,
    receiver_id: typeof value.receiver_id === "number" ? value.receiver_id : 0,
    created_at: typeof value.created_at === "string" ? value.created_at : null,
  };
}

export function parseTicketRoomDetail(data: unknown): TicketRoomDetail | null {
  if (!isRecord(data)) {
    return null;
  }

  const nestedRoom = isRecord(data.room) ? data.room : data;
  const room = parseRoomFields(nestedRoom);

  if (!room) {
    return null;
  }

  const rawMessages = Array.isArray(data.messages)
    ? data.messages
    : Array.isArray(nestedRoom.messages)
      ? nestedRoom.messages
      : [];

  return {
    ...room,
    messages: rawMessages
      .map(parseMessage)
      .filter((item): item is TicketMessage => item !== null),
  };
}
