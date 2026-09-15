import { SearchCityTrigger } from "@/components/store/search/searchCityTrigger/searchCityTrigger";

type SearchCityOption = {
  id: string;
  name: string;
};

type SearchFiltersProps = {
  cities?: readonly string[];
  cityOptions?: readonly SearchCityOption[];
};

export function SearchFilters({
  cities,
  cityOptions = [],
}: SearchFiltersProps) {
  return (
    <div className="w-full shrink-0 sm:w-auto">
      <SearchCityTrigger cities={cities} options={cityOptions} />
    </div>
  );
}
