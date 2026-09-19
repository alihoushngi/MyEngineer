"use server";

import { revalidatePath } from "next/cache";
import { isMockUserAuthEnabled } from "@/config/mock-auth.config/mock-auth.config";
import { mockExpertCards } from "@/lib/mock-data/mock-data";
import { mockCurrentUser } from "@/lib/mock-data/user-workspace-mock-data";
import {
  applyMarkRead,
  applySendMessage,
  findConversationForPair,
} from "@/lib/messaging/messaging-store/messaging-store";
import {
  readMessagingOverlay,
  readMessagingSnapshot,
  writeMessagingOverlay,
} from "@/lib/messaging/mock-messaging-overlay/mock-messaging-overlay";
import {
  mutationFailed,
  mutationUnauthorized,
  mutationUnavailable,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import { getUserSession } from "@/lib/auth/user-session/user-session";
import { isApiError } from "@/lib/api/api-error/api-error";
import { env } from "@/lib/env/env";
import {
  createConversation,
  markRead,
  postMessage,
} from "@/services/messaging-service/messaging-api";
import {
  canAccessConversation,
  resolveMessagingViewer,
} from "@/services/messaging-service/messaging-viewer";
import { type ServiceMutationResult } from "@/types/store/engineer-auth.types";
import { type Conversation, type Message } from "@/types/store/messaging.types";

const UNAVAILABLE =
  "گفتگو پس از اتصال سرویس پیام‌رسانی فعال می‌شود. مسیر API هنوز تعریف نشده است.";
const UNAUTHORIZED = "برای ادامه باید وارد حساب شوید.";

function mutationFromApiError(error: unknown): ServiceMutationResult {
  if (isApiError(error)) {
    if (error.status === 401) {
      return mutationUnauthorized(UNAUTHORIZED);
    }

    return mutationFailed(error.message || UNAVAILABLE);
  }

  return mutationFailed(UNAVAILABLE);
}

export async function sendMessageAction(input: {
  conversationId: string;
  body: string;
}): Promise<ServiceMutationResult> {
  const content = input.body.trim();

  if (content.length === 0) {
    return mutationFailed("متن پیام نمی‌تواند خالی باشد.");
  }

  if (env.apiBaseUrl) {
    const viewer = await resolveMessagingViewer();

    if (viewer.kind === "unauthorized") {
      return mutationUnauthorized(UNAUTHORIZED);
    }

    if (viewer.kind === "unavailable") {
      return mutationUnavailable(UNAVAILABLE);
    }

    try {
      await postMessage(input.conversationId, content);
      revalidateMessaging(input.conversationId);
      return { ok: true };
    } catch (error) {
      return mutationFromApiError(error);
    }
  }

  const viewer = await resolveMessagingViewer();

  if (viewer.kind === "unavailable") {
    return mutationUnavailable(UNAVAILABLE);
  }

  if (viewer.kind === "unauthorized") {
    return mutationUnauthorized(UNAUTHORIZED);
  }

  const snapshot = await readMessagingSnapshot();
  const conversation = snapshot.conversations.find(
    (item) => item.id === input.conversationId,
  );

  if (!conversation || !canAccessConversation(conversation, viewer)) {
    return mutationFailed("گفتگو پیدا نشد.");
  }

  const message: Message = {
    id: `msg-mock-${Date.now()}`,
    conversationId: conversation.id,
    senderRole: viewer.role,
    senderId: viewer.actorId,
    content,
    createdAtLabel: "همین الان",
    createdAtMs: Date.now(),
    status: "sent",
  };
  await writeMessagingOverlay(
    applySendMessage(await readMessagingOverlay(), {
      conversation,
      message,
      viewerRole: viewer.role,
    }),
  );
  revalidateMessaging(conversation.id);
  return { ok: true };
}

export async function markConversationReadAction(input: {
  conversationId: string;
}): Promise<ServiceMutationResult> {
  if (env.apiBaseUrl) {
    const viewer = await resolveMessagingViewer();

    if (viewer.kind === "unauthorized") {
      return mutationUnauthorized(UNAUTHORIZED);
    }

    if (viewer.kind === "unavailable") {
      return mutationUnavailable(UNAVAILABLE);
    }

    try {
      await markRead(input.conversationId);
      revalidateMessaging(input.conversationId);
      return { ok: true };
    } catch (error) {
      return mutationFromApiError(error);
    }
  }

  const viewer = await resolveMessagingViewer();

  if (viewer.kind === "unavailable") {
    return mutationUnavailable(UNAVAILABLE);
  }

  if (viewer.kind === "unauthorized") {
    return mutationUnauthorized(UNAUTHORIZED);
  }

  const snapshot = await readMessagingSnapshot();
  const conversation = snapshot.conversations.find(
    (item) => item.id === input.conversationId,
  );

  if (!conversation || !canAccessConversation(conversation, viewer)) {
    return mutationFailed("گفتگو پیدا نشد.");
  }

  await writeMessagingOverlay(
    applyMarkRead(await readMessagingOverlay(), conversation, viewer.role),
  );
  revalidateMessaging(conversation.id);
  return { ok: true };
}

export async function startConversationAction(input: {
  expertId: string;
}): Promise<ServiceMutationResult & { conversationId?: string }> {
  if (env.apiBaseUrl) {
    const session = await getUserSession();

    if (!session) {
      return mutationUnauthorized(UNAUTHORIZED);
    }

    try {
      const result = await createConversation({ expertId: input.expertId });
      revalidateMessaging(result.conversationId);
      return { ok: true, conversationId: result.conversationId };
    } catch (error) {
      return mutationFromApiError(error);
    }
  }

  if (!isMockUserAuthEnabled()) {
    return mutationUnavailable(UNAVAILABLE);
  }

  const session = await getUserSession();

  if (!session) {
    return mutationUnauthorized(UNAUTHORIZED);
  }

  const expert = mockExpertCards.find(
    (item) => item.id === input.expertId.trim(),
  );

  if (!expert) {
    return mutationFailed("متخصص معتبر نیست.");
  }

  const snapshot = await readMessagingSnapshot();
  const existing = findConversationForPair(
    snapshot.conversations,
    mockCurrentUser.id,
    expert.id,
  );

  if (existing) {
    return { ok: true, conversationId: existing.id };
  }

  const conversation: Conversation = {
    id: `conv-mock-${Date.now()}`,
    participants: [
      {
        role: "user",
        id: mockCurrentUser.id,
        displayName:
          session.profile?.displayName ?? mockCurrentUser.displayName,
      },
      {
        role: "engineer",
        id: expert.id,
        displayName: expert.name,
        avatarSrc: expert.avatarSrc,
      },
    ],
    relatedEngineerId: expert.id,
    relatedCustomerId: mockCurrentUser.id,
    unreadByRole: { user: 0, engineer: 0 },
    createdAtLabel: "همین الان",
    updatedAtLabel: "همین الان",
    updatedAtMs: Date.now(),
  };
  const overlay = await readMessagingOverlay();
  await writeMessagingOverlay({
    conversations: [conversation, ...overlay.conversations],
    messages: overlay.messages,
  });
  revalidateMessaging(conversation.id);
  return { ok: true, conversationId: conversation.id };
}

function revalidateMessaging(conversationId: string): void {
  revalidatePath("/account");
  revalidatePath("/account/messages");
  revalidatePath(`/account/messages/${conversationId}`);
  revalidatePath("/engineer");
  revalidatePath("/engineer/messages");
  revalidatePath(`/engineer/messages/${conversationId}`);
}
