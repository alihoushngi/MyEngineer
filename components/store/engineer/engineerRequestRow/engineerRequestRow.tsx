import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { requestStatusBadge } from "@/components/store/engineer/engineerStatusLabel/engineerStatusLabel";
import { Badge } from "@/components/ui/badge/badge";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerRequest } from "@/types/store/engineer.types";

type EngineerRequestRowProps = {
  request: EngineerRequest;
};

export function EngineerRequestRow({ request }: EngineerRequestRowProps) {
  const status = requestStatusBadge(request.status);

  return (
    <Link
      href={`${engineerPanelPaths.requests}/${request.id}`}
      className="group flex min-h-20 flex-col gap-3 rounded-xl px-3 py-3 outline-none transition-all duration-200 ease-in-out hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-ring sm:flex-row sm:items-start sm:justify-between"
    >
      <div className="min-w-0 flex-1">
        <p className="type-body font-semibold text-foreground transition-all duration-200 ease-in-out group-hover:text-primary">
          {request.title}
        </p>

        <p className="mt-1 line-clamp-2 type-body-sm leading-relaxed text-foreground-muted">
          {request.summary}
        </p>

        <p className="mt-1.5 type-caption text-foreground-subtle">
          {[request.serviceLabel, request.city, request.createdAtLabel]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {request.isNew ? <Badge variant="info">جدید</Badge> : null}
        <Badge variant={status.variant}>{status.label}</Badge>

        <ChevronLeftIcon
          aria-hidden="true"
          className="size-4 text-foreground-subtle transition-all duration-200 ease-in-out group-hover:-translate-x-0.5 group-hover:text-primary motion-reduce:transform-none"
        />
      </div>
    </Link>
  );
}
