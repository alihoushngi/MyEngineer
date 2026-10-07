import { cookies } from "next/headers";

import {
  PREFERRED_CITY_COOKIE,
  decodePreferredCities,
  type PreferredCity,
} from "@/lib/city/preferred-city/preferred-city";

/** Server-only: reads the saved multi-city preference. */
export async function readPreferredCitiesFromRequest(): Promise<
  PreferredCity[]
> {
  const store = await cookies();
  return decodePreferredCities(store.get(PREFERRED_CITY_COOKIE)?.value);
}
