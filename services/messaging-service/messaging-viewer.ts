import {
  isMockAuthEnabled,
  isMockUserAuthEnabled,
} from "@/config/mock-auth.config/mock-auth.config";
import { getEngineerSession } from "@/lib/auth/engineer-session/engineer-session";
import { getUserSession } from "@/lib/auth/user-session/user-session";
import { env } from "@/lib/env/env";
import { mockEngineerPublicExpertId } from "@/lib/mock-data/engineer-workspace-mock-data";
import { mockCurrentUser } from "@/lib/mock-data/user-workspace-mock-data";
import {
  type Conversation,
  type ParticipantRole,
} from "@/types/store/messaging.types";

export type MessagingViewer =
  | { kind: "ok"; role: ParticipantRole; actorId: string }
  | { kind: "unauthorized" }
  | { kind: "unavailable" };

export async function resolveMessagingViewer(): Promise<MessagingViewer> {
  const userSession = await getUserSession();

  if (userSession) {
    if (env.apiBaseUrl) {
      return {
        kind: "ok",
        role: "user",
        actorId: userSession.profile?.displayName ?? "user",
      };
    }

    if (!isMockUserAuthEnabled()) {
      return { kind: "unavailable" };
    }

    return { kind: "ok", role: "user", actorId: mockCurrentUser.id };
  }

  const engineerSession = await getEngineerSession();

  if (engineerSession) {
    if (env.apiBaseUrl) {
      return {
        kind: "ok",
        role: "engineer",
        actorId: engineerSession.profile?.firstName ?? "engineer",
      };
    }

    if (!isMockAuthEnabled()) {
      return { kind: "unavailable" };
    }

    return {
      kind: "ok",
      role: "engineer",
      actorId: mockEngineerPublicExpertId,
    };
  }

  return { kind: "unauthorized" };
}

export function canAccessConversation(
  conversation: Conversation,
  viewer: Extract<MessagingViewer, { kind: "ok" }>,
): boolean {
  if (env.apiBaseUrl) {
    return true;
  }

  if (viewer.role === "user") {
    return conversation.relatedCustomerId === viewer.actorId;
  }

  return conversation.relatedEngineerId === viewer.actorId;
}
