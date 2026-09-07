import { type ReactNode } from "react";

import { MockModeBadge } from "@/components/store/auth/mockModeBadge/mockModeBadge";

import { authUiCopy } from "@/config/auth-ui.config/auth-ui.config";

type AuthLoginCardProps = {
  title: string;
  description: string;
  isMockMode: boolean;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthLoginCard({
  title,
  description,
  isMockMode,
  children,
  footer,
}: AuthLoginCardProps) {
  return (
    <div className="relative isolate mx-auto w-full max-w-md overflow-hidden rounded-4xl border border-border-subtle bg-surface p-5 shadow-lg sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-e-20 -top-20 -z-10 size-48 rounded-full bg-primary/8 blur-3xl"
      />

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="type-h1 text-foreground">{title}</h1>
          <MockModeBadge visible={isMockMode} />
        </div>

        <p className="mt-2 type-body leading-relaxed text-foreground-muted">
          {description}
        </p>
      </div>

      <div className="mt-7">{children}</div>

      {footer ? (
        <div className="mt-7 border-t border-border-subtle pt-5">
          <div className="space-y-3">{footer}</div>

          {isMockMode ? (
            <p className="mt-4 rounded-xl bg-warning/8 px-3 py-2 text-center type-caption leading-relaxed text-foreground-muted">
              {authUiCopy.mockModeHint}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
