import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  type PreferredCity,
  readPreferredCityFromCookieHeader,
} from "./preferred-city.ts";

describe("preferred-city cookie parse", () => {
  it("reads a valid preferred city from Cookie header", () => {
    const city: PreferredCity = {
      id: "12",
      name: "تبریز",
      provinceId: "1",
      provinceName: "آذربایجان شرقی",
    };
    const encoded = encodeURIComponent(JSON.stringify(city));
    const parsed = readPreferredCityFromCookieHeader(
      `mm_preferred_city=${encoded}; path=/`,
    );

    assert.deepEqual(parsed, city);
  });

  it("returns null for missing or invalid cookie", () => {
    assert.equal(readPreferredCityFromCookieHeader(undefined), null);
    assert.equal(readPreferredCityFromCookieHeader("other=1"), null);
    assert.equal(
      readPreferredCityFromCookieHeader("mm_preferred_city=not-json"),
      null,
    );
  });
});
