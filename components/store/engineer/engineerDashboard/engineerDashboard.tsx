import { EngineerCoverageSummary } from "@/components/store/engineer/engineerCoverageSummary/engineerCoverageSummary";
import { EngineerLatestReviews } from "@/components/store/engineer/engineerLatestReviews/engineerLatestReviews";
import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { EngineerProfileCompletion } from "@/components/store/engineer/engineerProfileCompletion/engineerProfileCompletion";
import { EngineerQuickActions } from "@/components/store/engineer/engineerQuickActions/engineerQuickActions";
import { EngineerRecentMessages } from "@/components/store/engineer/engineerRecentMessages/engineerRecentMessages";
import { EngineerRecentRequests } from "@/components/store/engineer/engineerRecentRequests/engineerRecentRequests";
import { EngineerWelcome } from "@/components/store/engineer/engineerWelcome/engineerWelcome";
import { engineerPageTitles } from "@/config/engineer-panel.config/engineer-panel.config";
import { deriveProfileCompletion } from "@/lib/engineer/profile-completion/profile-completion";
import { type EngineerWorkspace } from "@/types/store/engineer.types";

type EngineerDashboardProps = {
  workspace: EngineerWorkspace;
};

export function EngineerDashboard({ workspace }: EngineerDashboardProps) {
  const completion = deriveProfileCompletion(workspace);

  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.dashboard}
        description="وضعیت پروفایل، درخواست‌ها و پیام‌های فضای کاری متخصص."
      />

      <EngineerWelcome workspace={workspace} />
      <EngineerQuickActions workspace={workspace} />

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,.85fr)]">
        <div className="flex min-w-0 flex-col gap-6">
          <EngineerRecentRequests requests={workspace.requests} />
          <EngineerRecentMessages conversations={workspace.conversations} />
          <EngineerLatestReviews reviews={workspace.reviews} />
        </div>

        <div className="flex min-w-0 flex-col gap-6 lg:sticky lg:top-24">
          <EngineerProfileCompletion completion={completion} />
          <EngineerCoverageSummary workspace={workspace} />
        </div>
      </div>
    </div>
  );
}
