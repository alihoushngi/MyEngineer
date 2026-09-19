/**
 * Server-only engineer access reads.
 * Do not import this module from Client Components.
 */

import { env } from "@/lib/env/env";
import { isEngineerAccessGranted } from "@/lib/engineer/access/access";
import { getMockEngineerWorkspace } from "@/lib/mock-data/build-engineer-workspace/build-engineer-workspace";
import { getEngineerSession } from "@/lib/auth/engineer-session/engineer-session";
import { getUserSession } from "@/lib/auth/user-session/user-session";
import { isMockAuthEnabled } from "@/config/mock-auth.config/mock-auth.config";
import { buildSessionEngineerWorkspace } from "@/lib/auth/build-session-engineer-workspace/build-session-engineer-workspace";
import { readCreatedRequests } from "@/lib/marketplace/mock-marketplace-overlay/mock-marketplace-overlay";
import { overlayEngineerRequests } from "@/lib/marketplace/overlay-engineer-requests/overlay-engineer-requests";
import { overlayEngineerMessaging } from "@/lib/messaging/overlay-engineer-messaging/overlay-engineer-messaging";
import { readMessagingSnapshot } from "@/lib/messaging/mock-messaging-overlay/mock-messaging-overlay";
import {
  toEngineerConversation,
  toEngineerMessage,
} from "@/lib/messaging/messaging-projections/messaging-projections";
import {
  overlayEngineerNotifications,
  overlayEngineerReviews,
} from "@/lib/engineer/overlay-engineer-engagement/overlay-engineer-engagement";
import { readReviewCatalog } from "@/lib/reviews/mock-review-overlay/mock-review-overlay";
import { readRecipientNotifications } from "@/lib/notifications/mock-notification-overlay/mock-notification-overlay";
import { findEngineerReview } from "@/lib/engineer/find-engineer-review/find-engineer-review";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { getConversation } from "@/services/messaging-service/messaging-api";
import {
  apiEngineerAccess,
  fetchEngineerRequest,
  fetchEngineerReview,
  fetchEngineerWorkspace,
  listEngineerReviews,
} from "@/services/engineer-service/engineer-panel-api";
import {
  type EngineerAccessResult,
  type EngineerConversation,
  type EngineerMessage,
  type EngineerNotification,
  type EngineerRequest,
  type EngineerReview,
  type EngineerWorkspace,
} from "@/types/store/engineer.types";

export async function getEngineerAccess(): Promise<EngineerAccessResult> {
  if (env.apiBaseUrl) {
    return getLiveEngineerAccess();
  }

  const extras = await readCreatedRequests();
  const messaging = await readMessagingSnapshot();
  const reviews = await readReviewCatalog();
  const session = await getEngineerSession();

  if (session) {
    const workspace = overlayEngineerMessaging(
      overlayEngineerRequests(buildSessionEngineerWorkspace(session), extras),
      messaging,
    );
    return {
      kind: session.source === "registration" ? "pending_review" : "active",
      workspace: await withEngineerEngagement(workspace, reviews),
    };
  }

  if (await getUserSession()) {
    return { kind: "forbidden" };
  }

  if (isMockAuthEnabled()) {
    return { kind: "unauthenticated" };
  }

  if (env.useMockData) {
    const workspace = overlayEngineerMessaging(
      overlayEngineerRequests(getMockEngineerWorkspace(), extras),
      messaging,
    );
    return {
      kind: "visual_review",
      workspace: await withEngineerEngagement(workspace, reviews),
    };
  }

  return { kind: "unavailable" };
}

async function getLiveEngineerAccess(): Promise<EngineerAccessResult> {
  try {
    const access = await apiEngineerAccess();

    if (access.state === "unauthenticated") {
      return { kind: "unauthenticated" };
    }

    if (access.state === "forbidden") {
      return { kind: "forbidden" };
    }

    const workspace = await fetchEngineerWorkspace().catch(() => null);

    if (!workspace) {
      if (access.state === "registration_in_progress") {
        return {
          kind: "registration_in_progress",
          workspace: minimalWorkspaceFromAccessUser(access.user),
          continueRegistrationPath: storePaths.expertRegistration,
        };
      }

      return { kind: "unavailable" };
    }

    if (access.state === "registration_in_progress") {
      return {
        kind: "registration_in_progress",
        workspace: {
          ...workspace,
          account: {
            ...workspace.account,
            accessStatus: "registration_in_progress",
            verificationStatus: "incomplete",
          },
        },
        continueRegistrationPath: storePaths.expertRegistration,
      };
    }

    return {
      kind: "active",
      workspace,
    };
  } catch {
    return { kind: "unavailable" };
  }
}

function minimalWorkspaceFromAccessUser(
  user: Awaited<ReturnType<typeof apiEngineerAccess>>["user"],
): EngineerWorkspace {
  const publicExpertId = String(user?.id ?? 0);
  const firstName = user?.name?.trim() || "";
  const lastName = user?.family?.trim() || "";
  const displayName =
    user?.full_name?.trim() ||
    [firstName, lastName].filter(Boolean).join(" ").trim() ||
    "متخصص";

  return {
    account: {
      id: publicExpertId,
      publicExpertId,
      displayName,
      profession: "متخصص",
      accessStatus: "registration_in_progress",
      verificationStatus: "incomplete",
    },
    profile: {
      publicExpertId,
      firstName: firstName || displayName,
      lastName,
      profession: "متخصص",
      specialties: [],
      software: [],
      education: [],
      serviceCities: [],
    },
    services: [],
    serviceArea: {
      provinceId: "",
      provinceName: "",
      cityId: "",
      cityName: "",
      nearbyCities: [],
    },
    requests: [],
    conversations: [],
    messagesByConversationId: {},
    portfolio: [],
    credentials: [],
    reviews: [],
    notifications: [],
  };
}

async function withEngineerEngagement(
  workspace: EngineerWorkspace,
  reviews: Awaited<ReturnType<typeof readReviewCatalog>>,
): Promise<EngineerWorkspace> {
  const notifications = await readRecipientNotifications(
    "engineer",
    workspace.account.publicExpertId,
  );

  return overlayEngineerNotifications(
    overlayEngineerReviews(workspace, reviews),
    notifications,
  );
}

export async function getEngineerWorkspace(): Promise<EngineerWorkspace | null> {
  const access = await getEngineerAccess();

  if (!isEngineerAccessGranted(access)) {
    return null;
  }

  return access.workspace;
}

export async function getEngineerRequest(
  id: string,
): Promise<EngineerRequest | null> {
  if (env.apiBaseUrl) {
    try {
      return await fetchEngineerRequest(id);
    } catch {
      return null;
    }
  }

  const workspace = await getEngineerWorkspace();
  return workspace?.requests.find((request) => request.id === id) ?? null;
}

export async function getEngineerConversation(
  id: string,
): Promise<EngineerConversation | null> {
  if (env.apiBaseUrl) {
    try {
      const { conversation } = await getConversation(id);
      return toEngineerConversation(conversation);
    } catch {
      return null;
    }
  }

  const workspace = await getEngineerWorkspace();
  return (
    workspace?.conversations.find((conversation) => conversation.id === id) ??
    null
  );
}

export async function getEngineerMessages(
  conversationId: string,
): Promise<readonly EngineerMessage[]> {
  if (env.apiBaseUrl) {
    try {
      const { messages } = await getConversation(conversationId);
      return messages.map(toEngineerMessage);
    } catch {
      return [];
    }
  }

  const workspace = await getEngineerWorkspace();
  return workspace?.messagesByConversationId[conversationId] ?? [];
}

export async function getEngineerReview(
  id: string,
): Promise<EngineerReview | null> {
  if (env.apiBaseUrl) {
    try {
      return await fetchEngineerReview(id);
    } catch {
      return null;
    }
  }

  const workspace = await getEngineerWorkspace();
  return findEngineerReview(workspace?.reviews ?? [], id);
}

export async function listEngineerPanelReviews(): Promise<
  readonly EngineerReview[]
> {
  if (env.apiBaseUrl) {
    try {
      return await listEngineerReviews();
    } catch {
      return [];
    }
  }

  const workspace = await getEngineerWorkspace();
  return workspace?.reviews ?? [];
}

export async function getEngineerNotifications(): Promise<
  readonly EngineerNotification[]
> {
  const workspace = await getEngineerWorkspace();
  return workspace?.notifications ?? [];
}
