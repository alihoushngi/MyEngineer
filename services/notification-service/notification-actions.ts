"use server";

import { revalidatePath } from "next/cache";
import {
  isMockAuthEnabled,
  isMockUserAuthEnabled,
} from "@/config/mock-auth.config/mock-auth.config";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import { userAccountPaths } from "@/config/user-account.config/user-account.config";
import { isApiError } from "@/lib/api/api-error/api-error";
import {
  mutationFailed,
  mutationUnauthorized,
  mutationUnavailable,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import { getEngineerSession } from "@/lib/auth/engineer-session/engineer-session";
import { getUserSession } from "@/lib/auth/user-session/user-session";
import { env } from "@/lib/env/env";
import { mockEngineerPublicExpertId } from "@/lib/mock-data/engineer-workspace-mock-data";
import { mockCurrentUser } from "@/lib/mock-data/user-workspace-mock-data";
import {
  readNotificationCatalog,
  readNotificationOverlay,
  writeNotificationOverlay,
} from "@/lib/notifications/mock-notification-overlay/mock-notification-overlay";
import { applyMarkNotificationRead } from "@/lib/notifications/notification-store/notification-store";
import { markNotificationRead as markNotificationReadApi } from "@/services/notification-service/notification-api";
import { type NotificationRecipientRole } from "@/types/store/notification.types";
import { type ServiceMutationResult } from "@/types/store/engineer-auth.types";

const UNAVAILABLE = "علامت‌خواندن اعلان پس از اتصال سرویس اعلان فعال می‌شود.";
const UNAUTHORIZED = "برای ادامه باید وارد حساب شوید.";

export async function markNotificationReadAction(input: {
  notificationId: string;
}): Promise<ServiceMutationResult> {
  const viewer = await resolveNotificationViewer();

  if (viewer.kind === "unavailable") {
    return mutationUnavailable(UNAVAILABLE);
  }

  if (viewer.kind === "unauthorized") {
    return mutationUnauthorized(UNAUTHORIZED);
  }

  if (env.apiBaseUrl) {
    try {
      await markNotificationReadApi(input.notificationId);
      revalidatePath(
        viewer.role === "user"
          ? userAccountPaths.notifications
          : engineerPanelPaths.notifications,
      );
      revalidatePath(viewer.role === "user" ? "/account" : "/engineer");
      return { ok: true };
    } catch (error) {
      if (isApiError(error)) {
        if (error.status === 401) {
          return mutationUnauthorized(UNAUTHORIZED);
        }

        return mutationFailed(error.message || UNAVAILABLE);
      }

      return mutationFailed(UNAVAILABLE);
    }
  }

  const catalog = await readNotificationCatalog();
  await writeNotificationOverlay(
    applyMarkNotificationRead(
      await readNotificationOverlay(),
      catalog,
      input.notificationId,
      viewer.role,
      viewer.recipientId,
    ),
  );
  revalidatePath(
    viewer.role === "user"
      ? userAccountPaths.notifications
      : engineerPanelPaths.notifications,
  );
  revalidatePath(viewer.role === "user" ? "/account" : "/engineer");
  return { ok: true };
}

async function resolveNotificationViewer(): Promise<
  | {
      kind: "ok";
      role: NotificationRecipientRole;
      recipientId: string;
    }
  | { kind: "unauthorized" }
  | { kind: "unavailable" }
> {
  const userSession = await getUserSession();

  if (userSession) {
    if (env.apiBaseUrl) {
      return {
        kind: "ok",
        role: "user",
        recipientId: "live",
      };
    }

    if (!isMockUserAuthEnabled()) {
      return { kind: "unavailable" };
    }

    return {
      kind: "ok",
      role: "user",
      recipientId: mockCurrentUser.id,
    };
  }

  const engineerSession = await getEngineerSession();

  if (engineerSession) {
    if (env.apiBaseUrl) {
      return {
        kind: "ok",
        role: "engineer",
        recipientId: "live",
      };
    }

    if (!isMockAuthEnabled()) {
      return { kind: "unavailable" };
    }

    return {
      kind: "ok",
      role: "engineer",
      recipientId: mockEngineerPublicExpertId,
    };
  }

  return { kind: "unauthorized" };
}
