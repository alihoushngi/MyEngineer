import { StoreHeaderContent } from "@/components/layout/storeHeader/storeHeaderContent";
import { type StoreHeaderProps } from "@/components/layout/storeHeader/type/storeHeader.types";
import { getEngineerSession } from "@/lib/auth/engineer-session/engineer-session";
import { toStoreAuthChrome } from "@/lib/auth/store-auth-chrome/store-auth-chrome";
import { getUserSession } from "@/lib/auth/user-session/user-session";
import { mockCurrentUser } from "@/lib/mock-data/user-workspace-mock-data";
import { readRecipientNotifications } from "@/lib/notifications/mock-notification-overlay/mock-notification-overlay";
import { unreadCount } from "@/lib/user-account/workspace-selectors/workspace-selectors";

export async function StoreHeader({ selectedCityLabel }: StoreHeaderProps) {
  const [userSession, engineerSession] = await Promise.all([
    getUserSession(),
    getEngineerSession(),
  ]);

  const unreadNotificationCount = userSession
    ? unreadCount(await readRecipientNotifications("user", mockCurrentUser.id))
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
