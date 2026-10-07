"use client";

import { useId } from "react";

import { Checkbox } from "@/components/ui/checkbox/checkbox";
import { Label } from "@/components/ui/label/label";

import { reviewsCopy } from "@/config/reviews.config/reviews.config";

type ReviewAnonymousCheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
};

export function ReviewAnonymousCheckbox({
  checked,
  onChange,
  disabled = false,
}: ReviewAnonymousCheckboxProps) {
  const id = useId();

  return (
    <div className="flex items-center gap-3">
      <Checkbox
        id={id}
        checked={checked}
        disabled={disabled}
        onCheckedChange={(next) => {
          onChange(next === true);
        }}
      />
      <Label htmlFor={id} className="cursor-pointer type-body-sm">
        {reviewsCopy.anonymousLabel}
      </Label>
    </div>
  );
}
