import { SearchCityTrigger } from "@/components/store/search/searchCityTrigger/searchCityTrigger";

type SearchFiltersProps = {
  cities?: readonly string[];
};

export function SearchFilters({ cities }: SearchFiltersProps) {
  return (
    <div className="w-full shrink-0 sm:w-auto">
      <SearchCityTrigger cities={cities} />
    </div>
  );
}
