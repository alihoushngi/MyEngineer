"use client";

import { ChevronDownIcon, MapPinIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CitySelectorDialog } from "@/components/common/citySelectorDialog/citySelectorDialog";
import { Button } from "@/components/ui/button/button";
import { type HeaderCityButtonProps } from "@/components/layout/storeHeader/headerCityButton/type/headerCityButton.types";
import {
  type PreferredCity,
  readPreferredCityFromDocumentCookie,
} from "@/lib/city/preferred-city/preferred-city";
import { buildSearchHref } from "@/lib/search/search-params/search-params";

const defaultCityLabel = "انتخاب شهر";

export function HeaderCityButton({ selectedCityLabel }: HeaderCityButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<PreferredCity | null>(null);

  useEffect(() => {
    setSelected(readPreferredCityFromDocumentCookie());
  }, []);

  const label =
    selected?.name ?? selectedCityLabel ?? defaultCityLabel;

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

      <CitySelectorDialog
        id="city-selector-surface"
        open={open}
        onOpenChange={setOpen}
        title={defaultCityLabel}
        description="استان و شهر خود را برای فیلتر متخصصان انتخاب کنید."
        onSelected={(city) => {
          setSelected(city);
          router.push(buildSearchHref({ cities: [city.name] }));
          router.refresh();
        }}
      />
    </>
  );
}
