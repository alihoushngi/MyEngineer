import Link from "next/link";
import { ArrowLeftIcon, ClipboardListIcon } from "lucide-react";
import { EngineerRequestRow } from "@/components/store/engineer/engineerRequestRow/engineerRequestRow";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";
import {
  engineerPanelCopy,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerRequest } from "@/types/store/engineer.types";

type EngineerRecentRequestsProps = {
  requests: readonly EngineerRequest[];
};

export function EngineerRecentRequests({
  requests,
}: EngineerRecentRequestsProps) {
  const items = requests.slice(0, 3);

  return (
    <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-secondary-subtle text-secondary">
            <ClipboardListIcon aria-hidden="true" className="size-4.5" />
          </span>

          <h2 className="type-h4 text-foreground">
            {engineerPanelCopy.recentRequests}
          </h2>
        </div>

        <Button asChild variant="link" size="sm">
          <Link href={engineerPanelPaths.requests} className="gap-1.5">
            {engineerPanelCopy.viewAll}
            <ArrowLeftIcon aria-hidden="true" className="size-4" />
          </Link>
        </Button>
      </div>

      {items.length === 0 ? (
        <Empty title={engineerPanelCopy.emptyRequests} className="py-8" />
      ) : (
        <ul className="grid gap-1">
          {items.map((request) => (
            <li key={request.id}>
              <EngineerRequestRow request={request} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
