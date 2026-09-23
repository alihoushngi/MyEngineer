"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { MonitorSmartphoneIcon } from "lucide-react";

import { Button } from "@/components/ui/button/button";
import { FieldError } from "@/components/ui/field/field";
import { siteConfig } from "@/config/site.config/site.config";
import { formatFaDate } from "@/lib/tickets/ticket-labels/ticket-labels";
import {
  logoutAllSessionsAction,
  revokeSessionAction,
} from "@/services/session-service/session-actions";
import { type AuthSession } from "@/services/session-service/session-service";

type AuthSessionsPanelProps = {
  sessions: readonly AuthSession[];
};

export function AuthSessionsPanel({ sessions }: AuthSessionsPanelProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<"all" | number | null>(null);

  function redirectHome() {
    router.replace(siteConfig.homeHref);
    router.refresh();
  }

  function onRevoke(session: AuthSession) {
    setError(null);
    setActiveAction(session.id);
    startTransition(async () => {
      const result = await revokeSessionAction(session.id);
      setActiveAction(null);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      if (result.signedOut) {
        redirectHome();
        return;
      }
      router.refresh();
    });
  }

  function onLogoutAll() {
    setError(null);
    setActiveAction("all");
    startTransition(async () => {
      const result = await logoutAllSessionsAction();
      setActiveAction(null);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      redirectHome();
    });
  }

  return (
    <section className="rounded-3xl border border-border-subtle bg-surface p-5 shadow-xs sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary-subtle text-primary">
          <MonitorSmartphoneIcon aria-hidden="true" className="size-5" />
        </span>
        <div>
          <h2 className="type-h4 text-foreground">دستگاه‌های واردشده</h2>
          <p className="mt-0.5 type-caption text-foreground-muted">
            نشست‌های فعال این حساب را ببینید یا پایان دهید.
          </p>
        </div>
      </div>

      {sessions.length === 0 ? (
        <p className="type-body-sm text-foreground-muted">
          نشست فعالی برای نمایش وجود ندارد.
        </p>
      ) : (
        <ul className="grid gap-3">
          {sessions.map((session) => (
            <li
              key={session.id}
              className="flex flex-col gap-3 rounded-2xl bg-surface-subtle p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="type-body-sm font-medium text-foreground">
                  {session.device}
                  {session.current ? " · این دستگاه" : ""}
                </p>
                <p className="mt-1 type-caption text-foreground-muted">
                  آخرین استفاده: {formatFaDate(session.lastUsedAt) || "نامشخص"}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                className="min-h-11"
                disabled={pending}
                onClick={() => onRevoke(session)}
              >
                {pending && activeAction === session.id
                  ? "در حال خروج…"
                  : session.current
                    ? "خروج از این دستگاه"
                    : "پایان نشست"}
              </Button>
            </li>
          ))}
        </ul>
      )}

      {error ? <FieldError className="mt-4">{error}</FieldError> : null}

      {sessions.length > 0 ? (
        <Button
          type="button"
          variant="outline"
          className="mt-5 min-h-11 border-danger/20 text-danger hover:bg-danger/10 hover:text-danger"
          disabled={pending}
          onClick={onLogoutAll}
        >
          {pending && activeAction === "all"
            ? "در حال خروج…"
            : "خروج از همه دستگاه‌ها"}
        </Button>
      ) : null}
    </section>
  );
}
