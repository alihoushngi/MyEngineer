import { BrandLogo } from "@/components/layout/brandLogo/brandLogo";
import { HeaderAuthActions } from "@/components/layout/headerAuthActions/headerAuthActions";
import { HeaderCityButton } from "@/components/layout/storeHeader/headerCityButton/headerCityButton";
import { HeaderMenuButton } from "@/components/layout/storeHeader/headerMenuButton/headerMenuButton";
import { HeaderNavigation } from "@/components/layout/storeHeader/headerNavigation/headerNavigation";
import { HeaderSearchButton } from "@/components/layout/storeHeader/headerSearchButton/headerSearchButton";
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
    <header className="sticky top-0 z-40 border-b border-primary-deep-foreground/10 bg-primary-deep/95 pt-[env(safe-area-inset-top)] text-primary-deep-foreground shadow-sm backdrop-blur-xl">
      <div className="container-app flex min-w-0 items-center gap-1.5 py-2 sm:gap-2 sm:py-2.5 lg:gap-4">
        <BrandLogo className="min-w-0 max-w-34 text-primary-deep-foreground sm:max-w-none" />
        <HeaderNavigation />
        <div className="ms-auto flex min-w-0 items-center gap-1 sm:gap-1.5">
          <HeaderSearchButton />
          <HeaderCityButton selectedCityLabel={selectedCityLabel} />
          <HeaderAuthActions chrome={authChrome} />
          <HeaderMenuButton authChrome={authChrome} />
        </div>
      </div>
    </header>
  );
}
