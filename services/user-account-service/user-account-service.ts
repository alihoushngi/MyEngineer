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
import { readNotificationCatalog } from "@/lib/notifications/mock-notification-overlay/mock-notification-overlay";
import { readReviewCatalog } from "@/lib/reviews/mock-review-overlay/mock-review-overlay";
import { findById } from "@/lib/user-account/workspace-selectors/workspace-selectors";
import {
  getCurrentProfile,
  profileToUserAccount,
} from "@/services/profile-service/profile-service";
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

export async function getCurrentSavedExpertIds(): Promise<readonly string[]> {
  if (!(await isUserAuthenticated())) {
    return [];
  }

  if (!env.useMockData) {
    return [];
  }

  return readSavedExpertIds();
}

export async function getUserWorkspace(): Promise<UserWorkspace | null> {
  const access = await getUserAccess();

  if (access.kind !== "authenticated") {
    return null;
  }

  const profile = await getCurrentProfile().catch(() => null);
  const workspace = buildUserWorkspace(access.session, {
    savedExpertIds: env.useMockData ? await readSavedExpertIds() : [],
    extraRequests: env.useMockData ? await readCreatedRequests() : [],
    messaging: env.useMockData ? await readMessagingSnapshot() : emptyMessaging,
    reviews: env.useMockData ? await readReviewCatalog() : [],
    notifications: env.useMockData ? await readNotificationCatalog() : [],
  });

  if (profile) {
    return {
      ...workspace,
      account: profileToUserAccount(profile),
      conversations: [],
      messagesByConversationId: {},
    };
  }

  return workspace;
}

export async function getUserRequest(id: string): Promise<UserRequest | null> {
  const workspace = await getUserWorkspace();
  return workspace ? findById(workspace.requests, id) : null;
}

export async function getUserConversation(
  id: string,
): Promise<UserConversation | null> {
  const workspace = await getUserWorkspace();
  return workspace ? findById(workspace.conversations, id) : null;
}

export async function getUserMessages(
  conversationId: string,
): Promise<readonly UserMessage[]> {
  const workspace = await getUserWorkspace();
  return workspace?.messagesByConversationId[conversationId] ?? [];
}

export async function getUserReview(
  id: string,
): Promise<UserReviewItem | null> {
  const workspace = await getUserWorkspace();
  return workspace ? findById(workspace.reviews, id) : null;
}
