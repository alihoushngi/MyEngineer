import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";
import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { EngineerProfileBasicsForm } from "@/components/store/engineer/engineerProfileBasicsForm/engineerProfileBasicsForm";
import { EngineerProfileSection } from "@/components/store/engineer/engineerProfileSection/engineerProfileSection";
import { EngineerSpecialtiesForm } from "@/components/store/engineer/engineerSpecialtiesForm/engineerSpecialtiesForm";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import {
  engineerPageTitles,
  engineerPanelCopy,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerWorkspace } from "@/types/store/engineer.types";

type EngineerProfilePageProps = {
  workspace: EngineerWorkspace;
};

export function EngineerProfileManagePage({
  workspace,
}: EngineerProfilePageProps) {
  const { profile, account } = workspace;

  const publicHref = account.publicExpertId
    ? `/experts/${account.publicExpertId}`
    : undefined;

  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.profile}
        description="اطلاعاتی که در پروفایل عمومی متخصص نمایش داده می‌شود."
        actions={
          publicHref ? (
            <Button asChild variant="outline">
              <Link href={publicHref} className="gap-2">
                {engineerPanelCopy.publicProfileLabel}
                <ExternalLinkIcon aria-hidden="true" className="size-4" />
              </Link>
            </Button>
          ) : null
        }
      />

      <EngineerProfileSection
        title="نام و عنوان حرفه‌ای"
        action={<EngineerProfileBasicsForm profile={profile} />}
      >
        <dl className="grid gap-3 sm:grid-cols-2">
          <InfoCell label="نام" value={profile.firstName} />
          <InfoCell label="نام خانوادگی" value={profile.lastName} />

          <div className="rounded-xl bg-surface-subtle p-3 sm:col-span-2">
            <dt className="type-caption text-foreground-subtle">
              عنوان حرفه‌ای
            </dt>
            <dd className="mt-1 type-body font-medium text-foreground">
              {profile.profession}
            </dd>
          </div>

          {profile.about ? (
            <div className="rounded-xl bg-surface-subtle p-3 sm:col-span-2">
              <dt className="type-caption text-foreground-subtle">درباره من</dt>
              <dd className="mt-1 type-body leading-loose text-foreground-muted">
                {profile.about}
              </dd>
            </div>
          ) : null}
        </dl>
      </EngineerProfileSection>

      <EngineerProfileSection
        title="تخصص‌ها و نرم‌افزارها"
        action={
          <EngineerSpecialtiesForm
            specialties={profile.specialties}
            software={profile.software}
          />
        }
      >
        <TagList items={profile.specialties} empty="تخصصی ثبت نشده است." />

        <p className="mt-5 type-caption font-medium text-foreground-subtle">
          نرم‌افزارها
        </p>

        <TagList items={profile.software} empty="نرم‌افزاری ثبت نشده است." />
      </EngineerProfileSection>

      <EngineerProfileSection
        title="سوابق"
        description="ویرایش کامل سوابق از همین بخش انجام می‌شود؛ ثبت‌نام برای ورود اولیه است."
        action={
          <Button asChild variant="outline" size="sm">
            <Link href={engineerPanelPaths.credentials}>مدارک مرتبط</Link>
          </Button>
        }
      >
        <p className="type-body leading-loose text-foreground-muted">
          {profile.history ?? "شرح سوابق هنوز تکمیل نشده است."}
        </p>
      </EngineerProfileSection>

      <EngineerProfileSection title="شهرهای فعالیت">
        <TagList
          items={profile.serviceCities}
          empty="محدوده فعالیت ثبت نشده است."
        />

        <Button asChild variant="link" size="sm" className="mt-3 px-0">
          <Link href={engineerPanelPaths.serviceAreas}>
            مدیریت محدوده فعالیت
          </Link>
        </Button>
      </EngineerProfileSection>
    </div>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-surface-subtle p-3">
      <dt className="type-caption text-foreground-subtle">{label}</dt>
      <dd className="mt-1 type-body font-medium text-foreground">{value}</dd>
    </div>
  );
}

function TagList({
  items,
  empty,
}: {
  items: readonly string[];
  empty: string;
}) {
  if (items.length === 0) {
    return <p className="type-body-sm text-foreground-muted">{empty}</p>;
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <Badge variant="outline">{item}</Badge>
        </li>
      ))}
    </ul>
  );
}
