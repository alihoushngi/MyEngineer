"use server";

import { revalidatePath } from "next/cache";

import { isApiError } from "@/lib/api/api-error/api-error";
import {
  mutationFailed,
  mutationOk,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import { userAccountPaths } from "@/config/user-account.config/user-account.config";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import {
  readTicketFile,
  ticketFileError,
} from "@/lib/tickets/ticket-attachment/ticket-attachment";
import {
  closeTicketRoom,
  createTicketRoom,
  replyTicketRoom,
  type TicketPriority,
} from "@/services/ticket-service/ticket-service";
import { type ServiceMutationResult } from "@/types/store/engineer-auth.types";

function toFailure(error: unknown, fallback: string): ServiceMutationResult {
  if (isApiError(error)) {
    return {
      ok: false,
      status: error.status,
      code:
        error.status === 401 || error.status === 403
          ? "unauthorized"
          : error.status >= 500
            ? "server"
            : "validation",
      message: error.message || fallback,
    };
  }

  return mutationFailed(fallback);
}

function revalidateTickets(roomId?: string) {
  revalidatePath(userAccountPaths.support);
  revalidatePath(engineerPanelPaths.support);
  if (roomId) {
    revalidatePath(`${userAccountPaths.support}/${roomId}`);
    revalidatePath(`${engineerPanelPaths.support}/${roomId}`);
  }
}

function parsePriority(value: string): TicketPriority | undefined {
  if (value === "low" || value === "mid" || value === "high") {
    return value;
  }
  return undefined;
}

function attachmentError(file: File | undefined): ServiceMutationResult | null {
  const message = ticketFileError(file);
  return message ? mutationFailed(message) : null;
}

export async function createTicketAction(
  formData: FormData,
): Promise<ServiceMutationResult & { roomId?: string }> {
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const priority = parsePriority(String(formData.get("priority") ?? ""));
  const file = readTicketFile(formData.get("file"));
  const fileError = attachmentError(file);

  if (fileError) {
    return fileError;
  }

  if (subject.length < 3 || (message.length < 5 && !file)) {
    return mutationFailed("موضوع و متن پیام یا پیوست تصویر را کامل وارد کنید.");
  }

  try {
    const room = await createTicketRoom({
      subject,
      message,
      priority,
      file,
    });
    revalidateTickets(String(room.id));
    return { ...mutationOk(), roomId: String(room.id) };
  } catch (error) {
    return toFailure(error, "ثبت تیکت انجام نشد.");
  }
}

export async function replyTicketAction(
  formData: FormData,
): Promise<ServiceMutationResult> {
  const roomId = String(formData.get("roomId") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const file = readTicketFile(formData.get("file"));
  const fileError = attachmentError(file);

  if (!roomId) {
    return mutationFailed("شناسه تیکت نامعتبر است.");
  }

  if (fileError) {
    return fileError;
  }

  if (message.length < 2 && !file) {
    return mutationFailed("متن پاسخ یا پیوست تصویر را وارد کنید.");
  }

  try {
    await replyTicketRoom({ roomId, message, file });
    revalidateTickets(roomId);
    return mutationOk();
  } catch (error) {
    return toFailure(error, "ارسال پاسخ انجام نشد.");
  }
}

export async function closeTicketAction(
  roomId: string,
): Promise<ServiceMutationResult> {
  try {
    await closeTicketRoom(roomId);
    revalidateTickets(roomId);
    return mutationOk();
  } catch (error) {
    return toFailure(error, "بستن تیکت انجام نشد.");
  }
}
