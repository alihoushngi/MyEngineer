"use client";

import { ChevronDownIcon, MapPinIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import { CityUnavailableDialog } from "@/components/common/cityUnavailableDialog/cityUnavailableDialog";
import { type HeaderCityButtonProps } from "@/components/layout/storeHeader/headerCityButton/type/headerCityButton.types";

const defaultCityLabel = "انتخاب شهر";

export function HeaderCityButton({ selectedCityLabel }: HeaderCityButtonProps) {
  const [open, setOpen] = useState(false);
  const label = selectedCityLabel ?? defaultCityLabel;

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        className="group hidden min-h-10 max-w-36 rounded-xl px-3 text-primary-deep-foreground/70 transition-all duration-200 ease-in-out hover:bg-primary-deep-foreground/8 hover:text-primary-deep-foreground focus-visible:ring-offset-primary-deep md:inline-flex xl:max-w-44"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="city-selector-surface"
        onClick={() => setOpen(true)}
      >
        <MapPinIcon aria-hidden="true" className="size-4 text-primary" />
        <span className="min-w-0 truncate">{label}</span>
        <ChevronDownIcon
          aria-hidden="true"
          className="size-3.5 shrink-0 text-primary-deep-foreground/45 transition-all duration-200 ease-in-out group-hover:text-primary-deep-foreground/80"
        />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="rounded-xl text-primary-deep-foreground/75 transition-all duration-200 ease-in-out hover:bg-primary-deep-foreground/8 hover:text-primary-deep-foreground focus-visible:ring-offset-primary-deep md:hidden"
        aria-label={label}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="city-selector-surface"
        onClick={() => setOpen(true)}
      >
        <MapPinIcon aria-hidden="true" className="size-5" />
      </Button>

      <CityUnavailableDialog
        id="city-selector-surface"
        open={open}
        onOpenChange={setOpen}
        title={defaultCityLabel}
        description="انتخاب شهر برای مشاهده متخصصان به‌زودی فعال می‌شود."
      />
    </>
  );
}
