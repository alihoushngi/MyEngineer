import { FileBadgeIcon, GraduationCapIcon, InfoIcon } from "lucide-react";
import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { credentialStatusBadge } from "@/components/store/engineer/engineerStatusLabel/engineerStatusLabel";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Badge } from "@/components/ui/badge/badge";
import { Empty } from "@/components/ui/empty/empty";
import {
  engineerPageTitles,
  engineerPanelCopy,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerWorkspace } from "@/types/store/engineer.types";

type EngineerCredentialsPageProps = {
  workspace: EngineerWorkspace;
};

export function EngineerCredentialsPage({
  workspace,
}: EngineerCredentialsPageProps) {
  const { credentials, profile } = workspace;

  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.credentials}
        description="تحصیلات، نظام مهندسی و مدارک حرفه‌ای. فایل خام مدارک در صفحات عمومی نمایش داده نمی‌شود."
      />

      <Alert variant="info" className="rounded-2xl">
        <InfoIcon aria-hidden="true" />
        <AlertTitle>حریم مدارک</AlertTitle>
        <AlertDescription>
          {engineerPanelCopy.documentPrivateNote}
        </AlertDescription>
      </Alert>

      {profile.education.length > 0 ? (
        <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary-subtle text-primary">
              <GraduationCapIcon aria-hidden="true" className="size-5" />
            </span>
            <h2 className="type-h4 text-foreground">تحصیلات</h2>
          </div>

          <ul className="grid gap-3">
            {profile.education.map((item) => (
              <li
                key={`${item.degree}-${item.field ?? ""}`}
                className="rounded-2xl bg-surface-subtle px-4 py-3 type-body text-foreground"
              >
                {[item.degree, item.field, item.institution]
                  .filter(Boolean)
                  .join("، ")}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {credentials.length === 0 ? (
        <Empty
          icon={<FileBadgeIcon aria-hidden="true" />}
          title={engineerPanelCopy.emptyCredentials}
        />
      ) : (
        <ul className="grid gap-3">
          {credentials.map((item) => {
            const status = credentialStatusBadge(item.status);

            return (
              <li
                key={item.id}
                className="flex flex-col gap-4 rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs transition-all duration-200 ease-in-out hover:border-primary/15 hover:shadow-sm sm:flex-row sm:items-start sm:justify-between sm:p-6"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary">
                      <FileBadgeIcon aria-hidden="true" className="size-4.5" />
                    </span>
                    <h2 className="type-h4 text-foreground">{item.title}</h2>
                  </div>

                  {item.description ? (
                    <p className="mt-3 type-body-sm leading-relaxed text-foreground-muted">
                      {item.description}
                    </p>
                  ) : null}

                  <p className="mt-2 type-caption text-foreground-subtle">
                    {item.hasDocument
                      ? "پرونده ارسال شده است"
                      : "پرونده‌ای پیوست نشده است"}
                  </p>
                </div>

                <Badge variant={status.variant}>{status.label}</Badge>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
