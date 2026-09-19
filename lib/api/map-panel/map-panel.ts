import { mapProfessionalCard } from "@/lib/api/map-backend/map-backend";
import { resolveMediaUrl } from "@/lib/api/resolve-media-url/resolve-media-url";
import { userAccountPaths } from "@/config/user-account.config/user-account.config";
import {
  toEngineerRequest,
  toUserRequest,
} from "@/lib/marketplace/request-projections/request-projections";
import {
  engineerMessagingViews,
  userMessagingViews,
} from "@/lib/messaging/messaging-projections/messaging-projections";
import {
  engineerNotificationViews,
  userNotificationViews,
} from "@/lib/notifications/notification-projections/notification-projections";
import {
  toPublicExpertReview,
  toUserReviewItem,
} from "@/lib/reviews/review-projections/review-projections";
import {
  type Conversation,
  type ConversationLatestMessage,
  type ConversationParticipant,
  type Message,
  type ParticipantRole,
} from "@/types/store/messaging.types";
import { type AppNotification, type NotificationKind } from "@/types/store/notification.types";
import { type ServiceRequest, type ServiceRequestStatus } from "@/types/store/service-request.types";
import { type ServiceReview } from "@/types/store/review.types";
import {
  type EngineerAccount,
  type EngineerCredential,
  type EngineerWorkspace,
} from "@/types/store/engineer.types";
import { type ExpertPortfolioItem } from "@/types/store/expert.types";
import {
  type UserAccount,
  type UserWorkspace,
} from "@/types/store/user-account.types";
import { type BackendProfessionalCard } from "@/types/api/backend.types";

export type BackendPanelUser = {
  id: number;
  name?: string | null;
  family?: string | null;
  full_name?: string | null;
  mobile?: string | null;
  image?: string | null;
  city?: { id: number; name: string } | null;
};

export type BackendServiceRequest = {
  id: number;
  title?: string | null;
  service_slug?: string | null;
  service_label?: string | null;
  city?: string | null;
  city_id?: number;
  created_at_label?: string;
  summary?: string;
  description?: string;
  status?: string;
  expert_id?: number;
  expert_name?: string;
  expert_href?: string;
  customer_id?: number;
  customer_display_name?: string;
  conversation_id?: number | null;
};

export type BackendConversationParticipant = {
  role: ParticipantRole;
  id: number;
  display_name?: string;
  avatar?: string | null;
};

export type BackendConversationMessage = {
  id: number;
  conversation_id: number;
  sender_role: ParticipantRole;
  sender_id: number;
  content?: string;
  created_at_label?: string;
  created_at_ms?: number;
  status?: "sent";
};

export type BackendConversation = {
  id: number;
  participants?: readonly BackendConversationParticipant[];
  related_request_id?: number | null;
  related_service_label?: string | null;
  related_engineer_id?: number;
  related_customer_id?: number;
  latest_message?: BackendConversationMessage | null;
  unread_by_role?: { user?: number; engineer?: number };
  created_at_label?: string;
  updated_at_label?: string;
  updated_at_ms?: number;
};

export type BackendAppNotification = {
  id: number;
  recipient_role: "user" | "engineer";
  recipient_id: number;
  kind: "service_request" | "message" | "review";
  title?: string;
  body?: string | null;
  created_at_label?: string;
  created_at_ms?: number;
  is_read?: boolean;
  href?: string | null;
};

export type BackendServiceReview = {
  id: number;
  expert_id?: number;
  expert_name?: string;
  expert_href?: string | null;
  author_customer_id?: number;
  author_display_name?: string;
  related_request_id?: number | null;
  related_service_label?: string | null;
  rating?: number;
  text?: string;
  date_label?: string;
  created_at_ms?: number;
  highlights?: readonly string[];
  reply_text?: string | null;
};

export type BackendUserWorkspace = {
  account?: BackendPanelUser;
  requests?: readonly BackendServiceRequest[];
  conversations?: readonly BackendConversation[];
  messages_by_conversation_id?: Readonly<
    Record<string, readonly BackendConversationMessage[]>
  >;
  saved_experts?: readonly BackendProfessionalCard[];
  reviews?: readonly BackendServiceReview[];
  notifications?: readonly BackendAppNotification[];
};

export function mapServiceRequestStatus(status: string | undefined): ServiceRequestStatus {
  switch (status) {
    case "pending":
      return "sent";
    case "in_progress":
    case "in_review":
      return "in_review";
    case "closed":
    case "done":
      return "closed";
    default:
      return "sent";
  }
}

export function mapBackendServiceRequest(
  request: BackendServiceRequest,
): ServiceRequest {
  const expertId = String(request.expert_id ?? 0);
  const expertHref =
    (request.expert_href as `/experts/${string}` | undefined) ??
    (`/experts/${expertId}` as const);

  return {
    id: String(request.id),
    title: request.title?.trim() || request.service_label?.trim() || "درخواست",
    serviceSlug: request.service_slug as ServiceRequest["serviceSlug"],
    serviceLabel: request.service_label?.trim() || "خدمت",
    city: request.city ?? undefined,
    cityId: request.city_id != null ? String(request.city_id) : undefined,
    createdAtLabel: request.created_at_label ?? "",
    summary: request.summary ?? "",
    description: request.description,
    status: mapServiceRequestStatus(request.status),
    expertId,
    expertName: request.expert_name?.trim() || "متخصص",
    expertHref,
    customerId: String(request.customer_id ?? 0),
    customerDisplayName: request.customer_display_name?.trim() || "کاربر",
    conversationId:
      request.conversation_id != null
        ? String(request.conversation_id)
        : undefined,
  };
}

function mapParticipant(
  participant: BackendConversationParticipant,
): ConversationParticipant {
  return {
    role: participant.role,
    id: String(participant.id),
    displayName: participant.display_name?.trim() || "کاربر",
    avatarSrc: resolveMediaUrl(participant.avatar),
  };
}

function mapLatestMessage(
  message: BackendConversationMessage,
): ConversationLatestMessage {
  return {
    id: String(message.id),
    preview: message.content?.trim() ?? "",
    createdAtLabel: message.created_at_label ?? "",
    senderRole: message.sender_role,
  };
}

export function mapBackendConversation(
  conversation: BackendConversation,
): Conversation {
  return {
    id: String(conversation.id),
    participants: (conversation.participants ?? []).map(mapParticipant),
    relatedRequestId:
      conversation.related_request_id != null
        ? String(conversation.related_request_id)
        : undefined,
    relatedServiceLabel: conversation.related_service_label ?? undefined,
    relatedEngineerId: String(conversation.related_engineer_id ?? 0),
    relatedCustomerId: String(conversation.related_customer_id ?? 0),
    latestMessage: conversation.latest_message
      ? mapLatestMessage(conversation.latest_message)
      : undefined,
    unreadByRole: {
      user: conversation.unread_by_role?.user ?? 0,
      engineer: conversation.unread_by_role?.engineer ?? 0,
    },
    createdAtLabel: conversation.created_at_label ?? "",
    updatedAtLabel: conversation.updated_at_label ?? "",
    updatedAtMs: conversation.updated_at_ms ?? 0,
  };
}

export function mapBackendMessage(message: BackendConversationMessage): Message {
  return {
    id: String(message.id),
    conversationId: String(message.conversation_id),
    senderRole: message.sender_role,
    senderId: String(message.sender_id),
    content: message.content?.trim() ?? "",
    createdAtLabel: message.created_at_label ?? "",
    createdAtMs: message.created_at_ms ?? 0,
    status: "sent",
  };
}

function mapNotificationKind(
  kind: BackendAppNotification["kind"],
): NotificationKind {
  if (kind === "service_request") {
    return "request";
  }

  return kind;
}

export function mapBackendNotification(
  notification: BackendAppNotification,
): AppNotification {
  return {
    id: String(notification.id),
    recipientRole: notification.recipient_role,
    recipientId: String(notification.recipient_id),
    kind: mapNotificationKind(notification.kind),
    title: notification.title?.trim() || "اعلان",
    body: notification.body?.trim() ?? "",
    createdAtLabel: notification.created_at_label ?? "",
    createdAtMs: notification.created_at_ms ?? 0,
    isRead: notification.is_read ?? false,
    href: notification.href?.trim() || userAccountPaths.notifications,
  };
}

export function mapBackendServiceReview(review: BackendServiceReview): ServiceReview {
  const expertId = String(review.expert_id ?? 0);

  return {
    id: String(review.id),
    expertId,
    expertName: review.expert_name?.trim() || "متخصص",
    authorCustomerId: String(review.author_customer_id ?? 0),
    authorDisplayName: review.author_display_name?.trim() || "کاربر",
    relatedRequestId: String(review.related_request_id ?? 0),
    relatedServiceLabel: review.related_service_label?.trim() || "خدمت",
    rating: review.rating ?? 0,
    text: review.text?.trim() ?? "",
    dateLabel: review.date_label ?? "",
    createdAtMs: review.created_at_ms ?? 0,
    replyText: review.reply_text ?? undefined,
  };
}

function maskMobile(mobile: string): string {
  const digits = mobile.replace(/\D/g, "");
  if (digits.length < 7) {
    return mobile;
  }

  return `${digits.slice(0, 4)}***${digits.slice(-3)}`;
}

export function mapBackendUserAccount(user: BackendPanelUser): UserAccount {
  const displayName =
    user.full_name?.trim() ||
    [user.name, user.family].filter(Boolean).join(" ").trim() ||
    "کاربر";

  return {
    id: String(user.id),
    displayName,
    avatarSrc: resolveMediaUrl(user.image),
    mobileDisplay: user.mobile ? maskMobile(user.mobile) : undefined,
    city: user.city?.name,
    cityId: user.city ? String(user.city.id) : undefined,
  };
}

export function mapBackendUserWorkspace(data: BackendUserWorkspace): UserWorkspace {
  const account = data.account ? mapBackendUserAccount(data.account) : {
    id: "0",
    displayName: "کاربر",
  };
  const customerId = account.id;
  const requests = (data.requests ?? []).map(mapBackendServiceRequest);
  const conversations = (data.conversations ?? []).map(mapBackendConversation);
  const messages = Object.entries(data.messages_by_conversation_id ?? {}).flatMap(
    ([conversationId, items]) =>
      items.map((message) => ({
        ...mapBackendMessage(message),
        conversationId,
      })),
  );
  const messaging = userMessagingViews({ conversations, messages }, customerId);
  const reviewItems = (data.reviews ?? []).map(mapBackendServiceReview);
  const notifications = userNotificationViews(
    (data.notifications ?? []).map(mapBackendNotification),
  );

  const mappedRequests = requests.map((request) => {
    const userRequest = toUserRequest(request);
    const conversation = messaging.conversations.find(
      (item) => item.relatedRequestId === request.id,
    );
    const review = reviewItems.find(
      (item) => item.relatedRequestId === request.id,
    );

    return {
      ...userRequest,
      conversationId: userRequest.conversationId ?? conversation?.id,
      latestActivityLabel:
        conversation?.lastMessageAtLabel ?? userRequest.createdAtLabel,
      reviewId: review?.id,
    };
  });

  return {
    account,
    requests: mappedRequests,
    conversations: messaging.conversations,
    messagesByConversationId: messaging.messagesByConversationId,
    savedExperts: (data.saved_experts ?? []).map(mapProfessionalCard),
    reviews: reviewItems.map(toUserReviewItem),
    notifications,
  };
}

export type BackendEngineerProfile = {
  id?: number;
  name?: string | null;
  family?: string | null;
  full_name?: string | null;
  image?: string | null;
  bio?: string | null;
  profession?: string | null;
  working_years?: string | number | null;
  province?: { id: number; name: string } | null;
  city?: { id: number; name: string; province_id?: number } | null;
};

export type BackendEngineerServiceArea = {
  province_id?: number | null;
  city_id?: number | null;
  nearby_city_ids?: readonly number[];
  cities?: readonly {
    id: number;
    name: string;
    province_id?: number;
  }[];
};

export type BackendEngineerCredential = {
  id?: string;
  record_id?: number;
  kind?: "degree" | "certificate" | "license";
  title?: string | null;
  status?: "submitted" | "pending_review" | "verified" | "needs_correction";
  file?: string | null;
  metadata?: Record<string, unknown>;
  created_at_label?: string | null;
};

export type BackendEngineerPortfolio = {
  id: number;
  title?: string | null;
  description?: string | null;
  image?: string | null;
  status?: "published" | "pending_review";
  created_at_label?: string | null;
};

export type BackendEngineerWorkspace = {
  account?: BackendPanelUser & {
    status?: { value?: string; label?: string } | null;
  };
  profile?: BackendEngineerProfile | null;
  services?: readonly BackendServiceNode[];
  service_area?: BackendEngineerServiceArea | null;
  requests?: readonly BackendServiceRequest[];
  conversations?: readonly BackendConversation[];
  messages_by_conversation_id?: Readonly<
    Record<string, readonly BackendConversationMessage[]>
  >;
  portfolio?: readonly BackendEngineerPortfolio[];
  credentials?: readonly BackendEngineerCredential[];
  reviews?: readonly BackendServiceReview[];
  notifications?: readonly BackendAppNotification[];
};

type BackendServiceNode = {
  id: number;
  title: string;
  short_title?: string | null;
  slug: string;
  description?: string | null;
  parent_id?: number | null;
  children?: readonly BackendServiceNode[];
};

function mapCredentialKind(
  kind: BackendEngineerCredential["kind"],
): EngineerCredential["kind"] {
  switch (kind) {
    case "degree":
      return "education";
    case "license":
      return "license";
    case "certificate":
      return "certificate";
    default:
      return "certificate";
  }
}

function mapCredentialStatus(
  status: BackendEngineerCredential["status"],
): EngineerCredential["status"] {
  switch (status) {
    case "verified":
      return "verified";
    case "needs_correction":
      return "needs_correction";
    case "pending_review":
      return "pending_review";
    case "submitted":
      return "submitted";
    default:
      return "submitted";
  }
}

export function mapBackendEngineerCredential(
  credential: BackendEngineerCredential,
): EngineerCredential {
  const recordId = credential.record_id ?? 0;
  const kind = credential.kind ?? "certificate";

  return {
    id: credential.id?.trim() || `${kind}:${recordId}`,
    kind: mapCredentialKind(kind),
    title: credential.title?.trim() || "مدرک",
    description:
      typeof credential.metadata?.description === "string"
        ? credential.metadata.description
        : undefined,
    status: mapCredentialStatus(credential.status),
    hasDocument: Boolean(credential.file),
  };
}

export function mapBackendEngineerPortfolio(
  item: BackendEngineerPortfolio,
): ExpertPortfolioItem {
  return {
    id: String(item.id),
    title: item.title ?? undefined,
    description: item.description ?? undefined,
    imageSrc: resolveMediaUrl(item.image),
    imageAlt: item.title ?? undefined,
  };
}

function mapAccessStatus(
  statusValue: string | undefined,
): EngineerAccount["accessStatus"] {
  if (statusValue === "inactive") {
    return "registration_in_progress";
  }

  return "active";
}

export function mapBackendEngineerWorkspace(
  data: BackendEngineerWorkspace,
): EngineerWorkspace {
  const accountUser = data.account;
  const profile = data.profile;
  const publicExpertId = String(accountUser?.id ?? profile?.id ?? 0);
  const firstName =
    profile?.name?.trim() || accountUser?.name?.trim() || "";
  const lastName =
    profile?.family?.trim() || accountUser?.family?.trim() || "";
  const displayName =
    accountUser?.full_name?.trim() ||
    profile?.full_name?.trim() ||
    [firstName, lastName].filter(Boolean).join(" ").trim() ||
    "متخصص";
  const profession =
    profile?.profession?.trim() || "متخصص";
  const avatarSrc =
    resolveMediaUrl(profile?.image) ?? resolveMediaUrl(accountUser?.image);
  const specialtyLabels = (data.services ?? []).map(
    (service) => service.short_title?.trim() || service.title,
  );
  const serviceArea = data.service_area;
  const primaryCity =
    serviceArea?.cities?.find((city) => city.id === serviceArea.city_id) ??
    serviceArea?.cities?.[0] ??
    profile?.city ??
    null;
  const nearbyCities = (serviceArea?.cities ?? [])
    .filter((city) => city.id !== serviceArea?.city_id)
    .map((city) => ({ id: String(city.id), name: city.name }));

  const requests = (data.requests ?? []).map(mapBackendServiceRequest);
  const conversations = (data.conversations ?? []).map(mapBackendConversation);
  const messages = Object.entries(data.messages_by_conversation_id ?? {}).flatMap(
    ([conversationId, items]) =>
      items.map((message) => ({
        ...mapBackendMessage(message),
        conversationId,
      })),
  );
  const messaging = engineerMessagingViews(
    { conversations, messages },
    publicExpertId,
  );
  const reviewItems = (data.reviews ?? []).map(mapBackendServiceReview);

  return {
    account: {
      id: publicExpertId,
      publicExpertId,
      displayName,
      profession,
      avatarSrc,
      mobileDisplay: accountUser?.mobile
        ? maskMobile(accountUser.mobile)
        : undefined,
      accessStatus: mapAccessStatus(accountUser?.status?.value),
      verificationStatus:
        accountUser?.status?.value === "active" ? "verified" : "pending_review",
    },
    profile: {
      publicExpertId,
      firstName: firstName || displayName,
      lastName,
      profession,
      about: profile?.bio ?? undefined,
      avatarSrc,
      specialties: specialtyLabels,
      software: [],
      history: profile?.bio ?? undefined,
      experienceYears:
        profile?.working_years != null
          ? Number(profile.working_years) || undefined
          : undefined,
      education: [],
      serviceCities: (serviceArea?.cities ?? []).map((city) => city.name),
    },
    services: (data.services ?? []).map((service) => ({
      slug: service.slug,
      label: service.short_title?.trim() || service.title,
      specialties: specialtyLabels,
      isListedOnProfile: true,
    })),
    serviceArea: {
      provinceId: String(
        serviceArea?.province_id ??
          profile?.province?.id ??
          primaryCity?.province_id ??
          "",
      ),
      provinceName: profile?.province?.name ?? "",
      cityId: String(serviceArea?.city_id ?? primaryCity?.id ?? ""),
      cityName: primaryCity?.name ?? "",
      nearbyCities,
    },
    requests: requests.map(toEngineerRequest),
    conversations: messaging.conversations,
    messagesByConversationId: messaging.messagesByConversationId,
    portfolio: (data.portfolio ?? []).map(mapBackendEngineerPortfolio),
    credentials: (data.credentials ?? []).map(mapBackendEngineerCredential),
    reviews: reviewItems.map(toPublicExpertReview),
    notifications: engineerNotificationViews(
      (data.notifications ?? []).map(mapBackendNotification),
    ),
  };
}
