"use client";

import { ResponsiveDialog } from "@/components/common/responsiveDialog/responsiveDialog";
import { ServiceFilterFields } from "@/components/store/service/serviceFilterFields/serviceFilterFields";
import { Button } from "@/components/ui/button/button";

import {
  serviceFilterCopy,
  type ServiceFilterDefinition,
} from "@/config/service-filters.config/service-filters.config";

import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import {
  type FilterKey,
  type ServiceFilterValues,
} from "@/lib/service/filter-experts/filter-experts";

type ServiceFilterOverlayProps = {
  open: boolean;
  definition: ServiceFilterDefinition;
  values: ServiceFilterValues;
  overlayKeys: readonly FilterKey[];
  draftCount: number;
  onOpenChange: (open: boolean) => void;
  onChange: (key: FilterKey, value: string) => void;
  onApply: () => void;
  onReset: () => void;
};

export function ServiceFilterOverlay({
  open,
  definition,
  values,
  overlayKeys,
  draftCount,
  onOpenChange,
  onChange,
  onApply,
  onReset,
}: ServiceFilterOverlayProps) {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onOpenChange}
      title={serviceFilterCopy.overlayTitle}
      description={serviceFilterCopy.overlayDescription}
      desktopVariant="sheet"
      contentClassName="sm:max-w-md"
      footer={
        <div className="grid w-full gap-2">
          <Button className="w-full" onClick={onApply}>
            {serviceFilterCopy.applyLabel} ({formatFaNumber(draftCount)})
          </Button>

          <Button variant="ghost" className="w-full" onClick={onReset}>
            {serviceFilterCopy.resetLabel}
          </Button>
        </div>
      }
    >
      <ServiceFilterFields
        definition={definition}
        values={values}
        overlayKeys={overlayKeys}
        onChange={onChange}
      />
    </ResponsiveDialog>
  );
}
