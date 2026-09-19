import {
  type ApiEnvelope,
  unwrapApiData,
} from "@/lib/api/api-envelope/api-envelope";
import { authHeaders } from "@/lib/api/auth-headers/auth-headers";
import {
  mapBackendNotification,
  type BackendAppNotification,
} from "@/lib/api/map-panel/map-panel";
import { httpGet, httpPost } from "@/lib/api/http-client/http-client";
import { readAccessToken } from "@/lib/auth/access-token-cookie/access-token-cookie";
import { type AppNotification } from "@/types/store/notification.types";

async function authorizedHeaders(): Promise<HeadersInit | undefined> {
  const token = await readAccessToken();
  return authHeaders(token);
}

export async function listNotifications(): Promise<readonly AppNotification[]> {
  const envelope = await httpGet<
    ApiEnvelope<readonly BackendAppNotification[]>
  >("/notifications", {
    headers: await authorizedHeaders(),
    cache: "no-store",
  });

  return unwrapApiData(envelope).map(mapBackendNotification);
}

export async function markNotificationRead(
  notificationId: string,
): Promise<void> {
  await httpPost<ApiEnvelope<null>>(`/notifications/${notificationId}/read`, {
    headers: await authorizedHeaders(),
  });
}
