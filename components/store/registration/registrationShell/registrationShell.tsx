"use client";

import { type ReactNode, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CheckIcon } from "lucide-react";
import { RegistrationProgress } from "@/components/store/registration/registrationProgress/registrationProgress";
import { RegistrationFooterSlotContext } from "@/components/store/registration/registrationShell/registrationShellContext";
import {
  registrationCopy,
  REGISTRATION_STEPS,
  TOTAL_REGISTRATION_STEPS,
} from "@/config/registration.config/registration.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { cn } from "@/lib/utils/cn/cn";

type RegistrationShellProps = { children: ReactNode };

export function RegistrationShell({ children }: RegistrationShellProps) {
  const pathname = usePathname();
  const current = REGISTRATION_STEPS.find((step) => step.path === pathname);
  const isComplete = pathname.endsWith("/complete");
  const contentScrollRef = useRef<HTMLDivElement>(null);
  const [footerSlot, setFooterSlot] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTop = 0;
    }
  }, [pathname]);

  return (
    <RegistrationFooterSlotContext.Provider value={footerSlot}>
      <div
        className="grid h-full min-h-0 w-full max-w-6xl overflow-hidden border border-border bg-surface shadow-lg sm:h-[80%] sm:rounded-2xl [@media(max-height:800px)]:sm:h-full lg:grid-cols-[15rem_minmax(0,1fr)]"
        data-registration-workspace
      >
        <aside
          className="hidden min-h-0 overflow-hidden bg-primary-deep px-4 py-5 text-primary-deep-foreground lg:flex lg:flex-col"
          aria-label="مراحل ثبت‌نام"
        >
          <div className="shrink-0 border-b border-primary-deep-foreground/10 px-2 pb-4">
            <p className="type-label text-primary">پروفایل حرفه‌ای</p>
            <p className="mt-1 type-h3">{registrationCopy.wizardTitle}</p>
          </div>

          <ol className="mt-3 min-h-0 space-y-0.5 overflow-y-auto overscroll-contain pe-1">
            {REGISTRATION_STEPS.map((step) => {
              const active = step.index === current?.index;
              const passed = current ? step.index < current.index : isComplete;

              return (
                <li
                  key={step.index}
                  aria-current={active ? "step" : undefined}
                  className={cn(
                    "flex min-h-8 items-center gap-2.5 rounded-lg px-2.5 py-1 type-caption transition-all duration-200 ease-in-out",
                    active
                      ? "bg-primary-deep-foreground/10 font-semibold text-primary-deep-foreground"
                      : passed
                        ? "text-primary-deep-foreground/80"
                        : "text-primary-deep-foreground/50",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border text-[0.6875rem] tabular-nums",
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : passed
                          ? "border-primary/40 bg-primary/10 text-primary"
                          : "border-primary-deep-foreground/25",
                    )}
                  >
                    {passed ? (
                      <CheckIcon className="size-3.5" aria-hidden="true" />
                    ) : (
                      formatFaNumber(step.index)
                    )}
                  </span>
                  <span className="min-w-0 truncate">{step.label}</span>
                </li>
              );
            })}
          </ol>
        </aside>

        <section className="flex min-h-0 min-w-0 flex-col bg-surface">
          <header className="shrink-0 border-b border-border-subtle bg-surface px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
            <div className="mb-3 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h1 className="type-h3 text-foreground sm:type-h2">
                  {registrationCopy.wizardTitle}
                </h1>
                <p className="mt-0.5 truncate type-body-sm font-medium text-primary lg:hidden">
                  {current?.label ?? registrationCopy.completeTitle}
                </p>
              </div>
              <span className="shrink-0 type-caption font-medium text-foreground-muted lg:hidden">
                {current
                  ? registrationCopy.stepOf(
                      current.index,
                      TOTAL_REGISTRATION_STEPS,
                    )
                  : registrationCopy.completeTitle}
              </span>
            </div>
            <RegistrationProgress currentStep={current?.index ?? 9} />
          </header>

          <div
            ref={contentScrollRef}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-6 sm:py-6 lg:px-8"
            data-registration-scroll-container
            role="region"
            aria-label="محتوای مرحله ثبت‌نام"
            tabIndex={-1}
          >
            <div className="mx-auto min-h-full w-full max-w-3xl">
              {children}
            </div>
          </div>

          <footer
            ref={setFooterSlot}
            className="shrink-0 border-t border-border-subtle bg-surface px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] empty:hidden sm:px-6 lg:px-8"
            data-registration-action-footer
          />
        </section>
      </div>
    </RegistrationFooterSlotContext.Provider>
  );
}
