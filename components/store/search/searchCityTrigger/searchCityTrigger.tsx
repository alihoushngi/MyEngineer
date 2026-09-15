"use client";

import { MapPinIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";

import { buildSearchHref } from "@/lib/search/search-params/search-params";
import { cn } from "@/lib/utils/cn/cn";

type SearchCityOption = {
  id: string;
  name: string;
};

type SearchCityTriggerProps = {
  className?: string;
  cities?: readonly string[];
  options?: readonly SearchCityOption[];
};

export function SearchCityTrigger({
  className,
  cities = [],
  options = [],
}: SearchCityTriggerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const value = cities[0] ?? "all";

  return (
    <Select
      value={value}
      onValueChange={(next) => {
        router.push(
          buildSearchHref({
            q: query,
            cities: next === "all" ? [] : [next],
          }),
        );
      }}
    >
      <SelectTrigger
        aria-label="فیلتر شهر"
        className={cn(
          "h-12 w-full min-w-0 gap-2 rounded-xl bg-surface transition-all duration-200 ease-in-out sm:w-44",
          className,
        )}
      >
        <MapPinIcon
          aria-hidden="true"
          className="size-4 shrink-0 text-primary"
        />
        <SelectValue placeholder="همه شهرها" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">همه شهرها</SelectItem>

        {options.map((city) => (
          <SelectItem key={city.id} value={city.name}>
            {city.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
