"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button/button";
import { useRegistrationFooterSlot } from "@/components/store/registration/registrationShell/registrationShellContext";
import { registrationCopy } from "@/config/registration.config/registration.config";

type RegistrationStepNavProps = {
  onBack?: () => void;
  onContinue: () => void;
  continueLabel?: string;
  backLabel?: string;
  isBackDisabled?: boolean;
  isPending?: boolean;
  isContinueDisabled?: boolean;
};

export function RegistrationStepNav({
  onBack,
  onContinue,
  continueLabel = registrationCopy.continueLabel,
  backLabel = registrationCopy.backLabel,
  isBackDisabled = false,
  isPending = false,
  isContinueDisabled = false,
}: RegistrationStepNavProps) {
  const footerSlot = useRegistrationFooterSlot();
  const navigation = (
    <div className="flex w-full flex-row-reverse gap-3">
      <Button
        type="button"
        onClick={onContinue}
        loading={isPending}
        disabled={isContinueDisabled || isPending}
        className="min-w-0 flex-1 sm:max-w-64"
      >
        {continueLabel}
        <ChevronLeftIcon aria-hidden="true" className="ltr:hidden" />
        <ChevronRightIcon aria-hidden="true" className="rtl:hidden" />
      </Button>
      {onBack ? (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isBackDisabled || isPending}
          className="min-w-28 shrink-0"
        >
          <ChevronRightIcon aria-hidden="true" className="ltr:hidden" />
          <ChevronLeftIcon aria-hidden="true" className="rtl:hidden" />
          {backLabel}
        </Button>
      ) : null}
    </div>
  );

  if (footerSlot === undefined) {
    return navigation;
  }

  return footerSlot ? createPortal(navigation, footerSlot) : null;
}
