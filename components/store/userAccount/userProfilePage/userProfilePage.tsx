import { InfoIcon, MapPinIcon, PhoneIcon, UserIcon } from "lucide-react";

import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar/avatar";

import {
  userAccountCopy,
  userAccountPageTitles,
} from "@/config/user-account.config/user-account.config";

import { getDisplayInitials } from "@/lib/auth/display-initials/display-initials";

import { type UserAccount } from "@/types/store/user-account.types";

type UserProfilePageProps = {
  account: UserAccount;
};

export function UserProfilePage({ account }: UserProfilePageProps) {
  const initials = getDisplayInitials(account.displayName);

  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title={userAccountPageTitles.profile}
        description={userAccountCopy.profileDescription}
      />

      <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6">
        <div className="flex flex-col gap-5 border-b border-border-subtle pb-5 sm:flex-row sm:items-center">
          <Avatar className="size-20 shrink-0 rounded-2xl">
            {account.avatarSrc ? (
              <AvatarImage src={account.avatarSrc} alt="" />
            ) : null}
            <AvatarFallback className="rounded-2xl bg-primary-subtle type-h3 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <h2 className="type-h2 text-foreground">{account.displayName}</h2>
            <p className="mt-1 type-body-sm text-foreground-muted">
              {userAccountCopy.profilePrivateNote}
            </p>
          </div>
        </div>

        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          <ProfileInfo
            icon={<UserIcon aria-hidden="true" />}
            label={userAccountCopy.displayNameLabel}
            value={account.displayName}
          />

          {account.mobileDisplay ? (
            <ProfileInfo
              icon={<PhoneIcon aria-hidden="true" />}
              label={userAccountCopy.mobileLabel}
              value={account.mobileDisplay}
              ltr
            />
          ) : null}

          {account.city ? (
            <ProfileInfo
              icon={<MapPinIcon aria-hidden="true" />}
              label={userAccountCopy.cityLabel}
              value={account.city}
            />
          ) : null}
        </dl>
      </section>

      <Alert variant="info" className="rounded-2xl">
        <InfoIcon aria-hidden="true" />
        <AlertTitle>{userAccountPageTitles.profile}</AlertTitle>
        <AlertDescription>
          {userAccountCopy.profileEditUnavailable}
        </AlertDescription>
      </Alert>
    </div>
  );
}

function ProfileInfo({
  icon,
  label,
  value,
  ltr = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  ltr?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-surface-subtle p-4">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary [&_svg]:size-4">
        {icon}
      </span>

      <div className="min-w-0">
        <dt className="type-caption text-foreground-subtle">{label}</dt>
        <dd
          className={
            ltr
              ? "mt-1 type-body-sm font-medium text-foreground ltr-data"
              : "mt-1 type-body-sm font-medium text-foreground"
          }
          dir={ltr ? "ltr" : undefined}
        >
          {value}
        </dd>
      </div>
    </div>
  );
}
