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
  revalidatePath(userAccountPaths.messages);
  revalidatePath(engineerPanelPaths.messages);
  if (roomId) {
    revalidatePath(`${userAccountPaths.messages}/${roomId}`);
    revalidatePath(`${engineerPanelPaths.messages}/${roomId}`);
  }
}

export async function createTicketAction(input: {
  subject: string;
  message: string;
  priority?: TicketPriority;
}): Promise<ServiceMutationResult & { roomId?: string }> {
  try {
    const room = await createTicketRoom(input);
    revalidateTickets(String(room.id));
    return { ...mutationOk(), roomId: String(room.id) };
  } catch (error) {
    return toFailure(error, "ثبت تیکت انجام نشد.");
  }
}

export async function replyTicketAction(input: {
  roomId: string;
  message: string;
}): Promise<ServiceMutationResult> {
  try {
    await replyTicketRoom(input);
    revalidateTickets(input.roomId);
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
