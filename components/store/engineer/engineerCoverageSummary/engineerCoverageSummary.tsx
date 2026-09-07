import Link from "next/link";
import {
  ArrowLeftIcon,
  BriefcaseBusinessIcon,
  Layers3Icon,
} from "lucide-react";
import {
  engineerPanelCopy,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { deriveProfileCompletion } from "@/lib/engineer/profile-completion/profile-completion";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { type EngineerWorkspace } from "@/types/store/engineer.types";

type EngineerCoverageSummaryProps = {
  workspace: EngineerWorkspace;
};

export function EngineerCoverageSummary({
  workspace,
}: EngineerCoverageSummaryProps) {
  const completion = deriveProfileCompletion(workspace);
  const activeServices = workspace.services.filter(
    (service) => service.isListedOnProfile,
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      <section className="group flex min-h-48 flex-col rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs transition-all duration-200 ease-in-out hover:border-primary/15 hover:shadow-sm">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary-subtle text-primary">
          <Layers3Icon aria-hidden="true" className="size-5" />
        </span>

        <div className="mt-auto pt-6">
          <h2 className="type-h4 text-foreground">
            {engineerPanelCopy.portfolioStatus}
          </h2>

          <p className="mt-2 type-body-sm text-foreground-muted">
            {formatFaNumber(workspace.portfolio.length)} نمونه‌کار در پروفایل
          </p>

          <Link
            href={engineerPanelPaths.portfolio}
            className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-lg type-body-sm font-medium text-primary outline-none transition-all duration-200 ease-in-out hover:gap-3 focus-visible:ring-2 focus-visible:ring-ring"
          >
            {engineerPanelCopy.viewAll}
            <ArrowLeftIcon aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      <section className="group flex min-h-48 flex-col rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs transition-all duration-200 ease-in-out hover:border-primary/15 hover:shadow-sm">
        <span className="flex size-10 items-center justify-center rounded-xl bg-secondary-subtle text-secondary">
          <BriefcaseBusinessIcon aria-hidden="true" className="size-5" />
        </span>

        <div className="mt-auto pt-6">
          <h2 className="type-h4 text-foreground">
            {engineerPanelCopy.serviceCoverage}
          </h2>

          <p className="mt-2 type-body-sm text-foreground-muted">
            {formatFaNumber(activeServices)} خدمت فعال ·{" "}
            {formatFaNumber(completion.percent)}٪ تکمیل پروفایل
          </p>

          <Link
            href={engineerPanelPaths.services}
            className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-lg type-body-sm font-medium text-primary outline-none transition-all duration-200 ease-in-out hover:gap-3 focus-visible:ring-2 focus-visible:ring-ring"
          >
            {engineerPanelCopy.viewAll}
            <ArrowLeftIcon aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
