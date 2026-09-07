import {
  BellIcon,
  LogOutIcon,
  ShieldCheckIcon,
  Trash2Icon,
  UserRoundIcon,
} from "lucide-react";
import { EngineerLogoutButton } from "@/components/store/engineer/engineerLogoutButton/engineerLogoutButton";
import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import {
  engineerPageTitles,
  engineerPanelCopy,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerWorkspace } from "@/types/store/engineer.types";

type EngineerSettingsPageProps = {
  workspace: EngineerWorkspace;
};

export function EngineerSettingsPage({ workspace }: EngineerSettingsPageProps) {
  const { account } = workspace;

  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.settings}
        description="تنظیمات حساب متخصص. گزینه‌هایی که محصول پشتیبانی نمی‌کند نمایش داده نمی‌شوند."
      />

      <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary-subtle text-primary">
            <UserRoundIcon aria-hidden="true" className="size-5" />
          </span>
          <h2 className="type-h4 text-foreground">اطلاعات حساب</h2>
        </div>

        <dl className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-surface-subtle p-3">
            <dt className="type-caption text-foreground-subtle">نام نمایشی</dt>
            <dd className="mt-1 type-body text-foreground">
              {account.displayName}
            </dd>
          </div>

          {account.mobileDisplay ? (
            <div className="rounded-xl bg-surface-subtle p-3">
              <dt className="type-caption text-foreground-subtle">موبایل</dt>
              <dd className="mt-1 type-body text-foreground ltr-data" dir="ltr">
                {account.mobileDisplay}
              </dd>
            </div>
          ) : null}
        </dl>
      </section>

      <div className="grid gap-3">
        <Alert variant="info" className="rounded-2xl">
          <ShieldCheckIcon aria-hidden="true" />
          <AlertTitle>ورود با رمز یک‌بارمصرف</AlertTitle>
          <AlertDescription>{engineerPanelCopy.otpAuthNote}</AlertDescription>
        </Alert>

        <Alert variant="info" className="rounded-2xl">
          <BellIcon aria-hidden="true" />
          <AlertTitle>ترجیحات اعلان</AlertTitle>
          <AlertDescription>
            {engineerPanelCopy.notificationPrefsUnavailable}
          </AlertDescription>
        </Alert>

        <Alert variant="info" className="rounded-2xl">
          <Trash2Icon aria-hidden="true" />
          <AlertTitle>حذف حساب</AlertTitle>
          <AlertDescription>
            {engineerPanelCopy.accountDeletionUnavailable}
          </AlertDescription>
        </Alert>
      </div>

      <section className="rounded-3xl border border-danger/15 bg-surface p-5 shadow-xs sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-danger/10 text-danger">
            <LogOutIcon aria-hidden="true" className="size-5" />
          </span>

          <div>
            <h2 className="type-h4 text-foreground">
              {engineerPanelCopy.logoutLabel}
            </h2>
            <p className="mt-0.5 type-caption text-foreground-muted">
              با خروج از حساب، برای ورود دوباره نیاز به احراز هویت دارید.
            </p>
          </div>
        </div>

        <EngineerLogoutButton />
      </section>
    </div>
  );
}
