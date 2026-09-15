"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDownIcon, MapPinIcon } from "lucide-react";

import { CitySelectorDialog } from "@/components/common/citySelectorDialog/citySelectorDialog";
import { Button } from "@/components/ui/button/button";

import { homeHeroCopy } from "@/config/home.config/home.config";
import {
  type PreferredCity,
  readPreferredCityFromDocumentCookie,
} from "@/lib/city/preferred-city/preferred-city";
import { buildSearchHref } from "@/lib/search/search-params/search-params";
import { cn } from "@/lib/utils/cn/cn";

type HomeCityTriggerProps = {
  className?: string;
};

export function HomeCityTrigger({ className }: HomeCityTriggerProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<PreferredCity | null>(null);

  useEffect(() => {
    setSelected(readPreferredCityFromDocumentCookie());
  }, []);

  const label = selected?.name ?? homeHeroCopy.cityLabel;

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        className={cn(
          `
            group/city
            h-14
            w-full
            justify-between
            gap-3
            rounded-2xl
            bg-transparent
            px-4
            text-foreground
            transition-all
            duration-200
            hover:bg-muted/50
            sm:h-full
            sm:min-h-14
            sm:min-w-44
          `,
          className,
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="home-city-selector-surface"
        onClick={() => setOpen(true)}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span
            className="
              flex size-9 shrink-0 items-center justify-center rounded-xl
              bg-primary/10 text-primary transition-colors duration-200
              group-hover/city:bg-primary/15
            "
          >
            <MapPinIcon aria-hidden="true" className="size-4.5" />
          </span>
          <span className="min-w-0 truncate type-body-sm font-medium">
            {label}
          </span>
        </span>
        <ChevronDownIcon
          aria-hidden="true"
          className="
            size-4 shrink-0 text-muted-foreground transition-transform duration-200
            group-hover/city:translate-y-0.5
          "
        />
      </Button>

      <CitySelectorDialog
        id="home-city-selector-surface"
        open={open}
        onOpenChange={setOpen}
        title={homeHeroCopy.cityLabel}
        description="استان و شهر را انتخاب کنید تا متخصصان همان شهر نمایش داده شوند."
        onSelected={(city) => {
          setSelected(city);
          router.push(buildSearchHref({ cities: [city.name] }));
          router.refresh();
        }}
      />
    </>
  );
}
