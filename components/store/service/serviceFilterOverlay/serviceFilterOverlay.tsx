"use client";

import { ResponsiveDialog } from "@/components/common/responsiveDialog/responsiveDialog";
import {
  ServiceFilterFields,
  type ServiceFilterOptionMap,
} from "@/components/store/service/serviceFilterFields/serviceFilterFields";
import { Button } from "@/components/ui/button/button";

import { serviceFilterCopy } from "@/config/service-filters.config/service-filters.config";

import {
  type FilterKey,
  type ServiceFilterValues,
} from "@/lib/service/service-query/service-query";

type ServiceFilterOverlayProps = {
  open: boolean;
  options: ServiceFilterOptionMap;
  values: ServiceFilterValues;
  overlayKeys: readonly FilterKey[];
  onOpenChange: (open: boolean) => void;
  onChange: (key: Exclude<FilterKey, "city">, value: string) => void;
  onApply: () => void;
  onReset: () => void;
};

export function ServiceFilterOverlay({
  open,
  options,
  values,
  overlayKeys,
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
            {serviceFilterCopy.applyLabel}
          </Button>

          <Button variant="ghost" className="w-full" onClick={onReset}>
            {serviceFilterCopy.resetLabel}
          </Button>
        </div>
      }
    >
      <ServiceFilterFields
        options={options}
        values={values}
        overlayKeys={overlayKeys}
        onChange={onChange}
      />
    </ResponsiveDialog>
  );
}
