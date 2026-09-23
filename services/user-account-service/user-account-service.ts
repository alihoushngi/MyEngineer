/**
 * Server-only customer workspace reads.
 * Do not import this module from Client Components.
 */

import { env } from "@/lib/env/env";
import { buildUserWorkspace } from "@/lib/user-account/build-user-workspace/build-user-workspace";
import {
  readCreatedRequests,
  readSavedExpertIds,
} from "@/lib/marketplace/mock-marketplace-overlay/mock-marketplace-overlay";
import { readMessagingSnapshot } from "@/lib/messaging/mock-messaging-overlay/mock-messaging-overlay";
import {
  toUserConversation,
  toUserMessage,
} from "@/lib/messaging/messaging-projections/messaging-projections";
import { readNotificationCatalog } from "@/lib/notifications/mock-notification-overlay/mock-notification-overlay";
import { readReviewCatalog } from "@/lib/reviews/mock-review-overlay/mock-review-overlay";
import { findById } from "@/lib/user-account/workspace-selectors/workspace-selectors";
import {
  getCurrentProfile,
  profileToUserAccount,
} from "@/services/profile-service/profile-service";
import { getConversation } from "@/services/messaging-service/messaging-api";
import {
  fetchSavedExpertIds,
  fetchUserRequest,
  fetchUserWorkspace,
} from "@/services/user-account-service/user-panel-api";
import {
  getUserAccess,
  isUserAuthenticated,
} from "@/services/user-auth-service/user-access-service";
import { type MessagingSnapshot } from "@/types/store/messaging.types";
import {
  type UserConversation,
  type UserMessage,
  type UserRequest,
  type UserReviewItem,
  type UserWorkspace,
} from "@/types/store/user-account.types";

const emptyMessaging: MessagingSnapshot = {
  conversations: [],
  messages: [],
};

function canUseMockOverlays(): boolean {
  return !env.apiBaseUrl && env.useMockData;
}

export async function getCurrentSavedExpertIds(): Promise<readonly string[]> {
  if (!(await isUserAuthenticated())) {
    return [];
  }

  if (env.apiBaseUrl) {
    try {
      return await fetchSavedExpertIds();
    } catch {
      return [];
    }
  }

  if (!canUseMockOverlays()) {
    return [];
  }

  return readSavedExpertIds();
}

export async function getUserWorkspace(): Promise<UserWorkspace | null> {
  const access = await getUserAccess();

  if (access.kind !== "authenticated") {
    return null;
  }

  if (env.apiBaseUrl) {
    try {
      const workspace = await fetchUserWorkspace();
      const profile = await getCurrentProfile().catch(() => null);

      if (profile) {
        return {
          ...workspace,
          account: profileToUserAccount(profile),
        };
      }

      return workspace;
    } catch {
      return null;
    }
  }

  const useMocks = canUseMockOverlays();
  const workspace = buildUserWorkspace(access.session, {
    savedExpertIds: useMocks ? await readSavedExpertIds() : [],
    extraRequests: useMocks ? await readCreatedRequests() : [],
    messaging: useMocks ? await readMessagingSnapshot() : emptyMessaging,
    reviews: useMocks ? await readReviewCatalog() : [],
    notifications: useMocks ? await readNotificationCatalog() : [],
  });

  return workspace;
}

export async function getUserRequest(id: string): Promise<UserRequest | null> {
  if (env.apiBaseUrl) {
    try {
      return await fetchUserRequest(id);
    } catch {
      return null;
    }
  }

  const workspace = await getUserWorkspace();
  return workspace ? findById(workspace.requests, id) : null;
}

export async function getUserConversation(
  id: string,
): Promise<UserConversation | null> {
  if (env.apiBaseUrl) {
    try {
      const { conversation } = await getConversation(id);
      return toUserConversation(conversation);
    } catch {
      return null;
    }
  }

  const workspace = await getUserWorkspace();
  return workspace ? findById(workspace.conversations, id) : null;
}

export async function getUserMessages(
  conversationId: string,
): Promise<readonly UserMessage[]> {
  if (env.apiBaseUrl) {
    try {
      const { messages } = await getConversation(conversationId);
      return messages.map(toUserMessage);
    } catch {
      return [];
    }
  }

  const workspace = await getUserWorkspace();
  return workspace?.messagesByConversationId[conversationId] ?? [];
}

export async function getUserReview(
  id: string,
): Promise<UserReviewItem | null> {
  const workspace = await getUserWorkspace();
  return workspace ? findById(workspace.reviews, id) : null;
}
