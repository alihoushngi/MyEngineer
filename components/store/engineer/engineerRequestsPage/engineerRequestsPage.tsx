import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { EngineerRequestList } from "@/components/store/engineer/engineerRequestList/engineerRequestList";
import { engineerPageTitles } from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerRequest } from "@/types/store/engineer.types";

type EngineerRequestsPageProps = {
  requests: readonly EngineerRequest[];
};

export function EngineerRequestsPage({ requests }: EngineerRequestsPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.requests}
        description="درخواست‌های مرتبط با خدمات شما. چرخهٔ قبول یا پیشنهاد قیمت هنوز در قرارداد محصول نیست."
      />

      <EngineerRequestList requests={requests} />
    </div>
  );
}
