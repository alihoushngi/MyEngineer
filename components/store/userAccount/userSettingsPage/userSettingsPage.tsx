import {
  BellIcon,
  InfoIcon,
  LogOutIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";

import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { UserLogoutButton } from "@/components/store/userAccount/userLogoutButton/userLogoutButton";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";

import {
  userAccountCopy,
  userAccountPageTitles,
} from "@/config/user-account.config/user-account.config";

import { type UserAccount } from "@/types/store/user-account.types";

type UserSettingsPageProps = {
  account: UserAccount;
};

export function UserSettingsPage({ account }: UserSettingsPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title={userAccountPageTitles.settings}
        description={userAccountCopy.settingsDescription}
      />

      <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary-subtle text-primary">
            <UserIcon aria-hidden="true" className="size-5" />
          </span>

          <h2 className="type-h4 text-foreground">
            {userAccountPageTitles.profile}
          </h2>
        </div>

        <dl className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-surface-subtle p-4">
            <dt className="type-caption text-foreground-subtle">
              {userAccountCopy.displayNameLabel}
            </dt>
            <dd className="mt-1 type-body-sm font-medium text-foreground">
              {account.displayName}
            </dd>
          </div>

          {account.mobileDisplay ? (
            <div className="rounded-2xl bg-surface-subtle p-4">
              <dt className="flex items-center gap-1.5 type-caption text-foreground-subtle">
                <PhoneIcon aria-hidden="true" className="size-3.5" />
                {userAccountCopy.mobileLabel}
              </dt>
              <dd
                className="mt-1 type-body-sm font-medium text-foreground ltr-data"
                dir="ltr"
              >
                {account.mobileDisplay}
              </dd>
            </div>
          ) : null}
        </dl>
      </section>

      <Alert variant="info" className="rounded-2xl">
        <BellIcon aria-hidden="true" />
        <AlertTitle>{userAccountPageTitles.notifications}</AlertTitle>
        <AlertDescription>
          {userAccountCopy.notificationPrefsUnavailable}
        </AlertDescription>
      </Alert>

      <section className="rounded-3xl border border-danger/15 bg-surface p-5 shadow-xs sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-danger/10 text-danger">
            <LogOutIcon aria-hidden="true" className="size-5" />
          </span>

          <div>
            <h2 className="type-h4 text-foreground">
              {userAccountCopy.logoutLabel}
            </h2>
            <p className="mt-1 type-caption text-foreground-muted">
              <InfoIcon aria-hidden="true" className="me-1 inline size-3.5" />
              {userAccountCopy.logoutLabel}
            </p>
          </div>
        </div>

        <UserLogoutButton />
      </section>
    </div>
  );
}
