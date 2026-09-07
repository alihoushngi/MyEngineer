import { BriefcaseBusinessIcon } from "lucide-react";
import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { EngineerSpecialtiesForm } from "@/components/store/engineer/engineerSpecialtiesForm/engineerSpecialtiesForm";
import { Badge } from "@/components/ui/badge/badge";
import { Empty } from "@/components/ui/empty/empty";
import {
  engineerPageTitles,
  engineerPanelCopy,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerWorkspace } from "@/types/store/engineer.types";

type EngineerServicesPageProps = {
  workspace: EngineerWorkspace;
};

export function EngineerServicesPage({ workspace }: EngineerServicesPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.services}
        description="خدمات و تخصص‌های متصل به پروفایل عمومی. قیمت‌گذاری و کمیسیون در محصول تعریف نشده است."
        actions={
          <EngineerSpecialtiesForm
            specialties={workspace.profile.specialties}
            software={workspace.profile.software}
          />
        }
      />

      {workspace.services.length === 0 ? (
        <Empty
          icon={<BriefcaseBusinessIcon aria-hidden="true" />}
          title={engineerPanelCopy.emptyServices}
        />
      ) : (
        <ul className="grid items-stretch gap-4 md:grid-cols-2">
          {workspace.services.map((service) => (
            <li
              key={service.slug}
              className="group flex min-h-48 flex-col rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs transition-all duration-200 ease-in-out hover:border-primary/15 hover:shadow-sm sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-subtle text-primary">
                  <BriefcaseBusinessIcon
                    aria-hidden="true"
                    className="size-5"
                  />
                </span>

                <Badge
                  variant={service.isListedOnProfile ? "success" : "outline"}
                >
                  {service.isListedOnProfile
                    ? engineerPanelCopy.listedOnProfile
                    : engineerPanelCopy.notListedOnProfile}
                </Badge>
              </div>

              <div className="mt-auto pt-6">
                <h2 className="type-h4 text-foreground transition-all duration-200 ease-in-out group-hover:text-primary">
                  {service.label}
                </h2>

                {service.specialties.length > 0 ? (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {service.specialties.map((item) => (
                      <li key={item}>
                        <Badge variant="outline">{item}</Badge>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 type-body-sm text-foreground-muted">
                    تخصصی برای این خدمت ثبت نشده است.
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
