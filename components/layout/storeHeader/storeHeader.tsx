import { StoreHeaderContent } from "@/components/layout/storeHeader/storeHeaderContent";
import { type StoreHeaderProps } from "@/components/layout/storeHeader/type/storeHeader.types";
import { getEngineerSession } from "@/lib/auth/engineer-session/engineer-session";
import { toStoreAuthChrome } from "@/lib/auth/store-auth-chrome/store-auth-chrome";
import { getUserSession } from "@/lib/auth/user-session/user-session";
import { env } from "@/lib/env/env";
import { mockCurrentUser } from "@/lib/mock-data/user-workspace-mock-data";
import { readRecipientNotifications } from "@/lib/notifications/mock-notification-overlay/mock-notification-overlay";
import { userNotificationViews } from "@/lib/notifications/notification-projections/notification-projections";
import {
  headerUnreadCount,
} from "@/lib/user-account/workspace-selectors/workspace-selectors";
import { listNotifications } from "@/services/notification-service/notification-api";

export async function StoreHeader({ selectedCityLabel }: StoreHeaderProps) {
  const [userSession, engineerSession] = await Promise.all([
    getUserSession(),
    getEngineerSession(),
  ]);

  const apiConfigured = Boolean(env.apiBaseUrl);
  const apiNotifications = userSession && apiConfigured
    ? userNotificationViews(await listNotifications().catch(() => []))
    : [];
  const mockNotifications = userSession && !apiConfigured
    ? await readRecipientNotifications("user", mockCurrentUser.id)
    : [];
  const unreadNotificationCount = userSession
    ? headerUnreadCount(apiConfigured, apiNotifications, mockNotifications)
    : 0;

  const authChrome = toStoreAuthChrome({
    userSession,
    engineerSession,
    unreadNotificationCount,
  });

  return (
    <StoreHeaderContent
      authChrome={authChrome}
      selectedCityLabel={selectedCityLabel}
    />
  );
}
