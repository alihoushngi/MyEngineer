import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";

export function EngineerPanelLoading() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-live="polite">
      <span className="sr-only">{engineerPanelCopy.loadingLabel}</span>

      <div className="space-y-3">
        <Skeleton className="h-9 w-48 max-w-full rounded-xl" />
        <Skeleton className="h-5 w-full max-w-xl rounded-lg" />
      </div>

      <Skeleton className="h-36 w-full rounded-3xl" />

      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-48 rounded-3xl" />
        <Skeleton className="h-48 rounded-3xl" />
      </div>

      <Skeleton className="h-64 rounded-3xl" />
    </div>
  );
}
