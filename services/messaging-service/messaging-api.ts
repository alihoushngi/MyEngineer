import {
  type ApiEnvelope,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { authHeaders } from "@/lib/api/auth-headers/auth-headers";
import {
  mapBackendConversation,
  mapBackendMessage,
  type BackendConversation,
  type BackendConversationMessage,
} from "@/lib/api/map-panel/map-panel";
import { httpGet, httpPost } from "@/lib/api/http-client/http-client";
import { readAccessToken } from "@/lib/auth/access-token-cookie/access-token-cookie";
import {
  type Conversation,
  type Message,
} from "@/types/store/messaging.types";

type CreateConversationResponse = {
  conversation_id: number;
  conversation: BackendConversation;
};

type ConversationDetailResponse = {
  conversation: BackendConversation;
  messages: readonly BackendConversationMessage[];
};

async function authorizedHeaders(): Promise<HeadersInit | undefined> {
  const token = await readAccessToken();
  return authHeaders(token);
}

export async function listConversations(input?: {
  page?: number;
  perPage?: number;
}): Promise<readonly Conversation[]> {
  const envelope = await httpGet<ApiEnvelope<readonly BackendConversation[]>>(
    "/conversations",
    {
      headers: await authorizedHeaders(),
      query: {
        page: input?.page,
        per_page: input?.perPage,
      },
      cache: "no-store",
    },
  );

  return unwrapApiData(envelope).map(mapBackendConversation);
}

export async function createConversation(input: {
  expertId: string;
}): Promise<{ conversationId: string; conversation: Conversation }> {
  const expertId = Number.parseInt(input.expertId, 10);

  const envelope = await httpPost<
    ApiEnvelope<CreateConversationResponse>
  >("/conversations", {
    headers: await authorizedHeaders(),
    body: { expert_id: expertId },
  });

  const data = unwrapApiData(envelope);

  return {
    conversationId: String(data.conversation_id),
    conversation: mapBackendConversation(data.conversation),
  };
}

export async function getConversation(
  conversationId: string,
): Promise<{ conversation: Conversation; messages: readonly Message[] }> {
  const envelope = await httpGet<ApiEnvelope<ConversationDetailResponse>>(
    `/conversations/${conversationId}`,
    {
      headers: await authorizedHeaders(),
      cache: "no-store",
    },
  );

  const data = unwrapApiData(envelope);

  return {
    conversation: mapBackendConversation(data.conversation),
    messages: data.messages.map(mapBackendMessage),
  };
}

export async function postMessage(
  conversationId: string,
  body: string,
): Promise<Message> {
  const envelope = await httpPost<
    ApiEnvelope<BackendConversationMessage>
  >(`/conversations/${conversationId}/messages`, {
    headers: await authorizedHeaders(),
    body: { body },
  });

  return mapBackendMessage(unwrapApiData(envelope));
}

export async function markRead(conversationId: string): Promise<void> {
  await httpPost<ApiEnvelope<null>>(`/conversations/${conversationId}/read`, {
    headers: await authorizedHeaders(),
  });
}
