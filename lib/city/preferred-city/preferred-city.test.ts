import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  type PreferredCity,
  formatPreferredCitiesLabel,
  readPreferredCitiesFromCookieHeader,
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

describe("preferred-city multi-city cookie", () => {
  const a: PreferredCity = {
    id: "1",
    name: "تهران",
    provinceId: "10",
    provinceName: "تهران",
  };
  const b: PreferredCity = {
    id: "2",
    name: "مشهد",
    provinceId: "11",
    provinceName: "خراسان رضوی",
  };

  it("reads a list of cities from the compact array format", () => {
    const encoded = encodeURIComponent(
      JSON.stringify([
        [a.id, a.name, a.provinceId, a.provinceName],
        [b.id, b.name, b.provinceId, b.provinceName],
      ]),
    );

    assert.deepEqual(
      readPreferredCitiesFromCookieHeader(`mm_preferred_city=${encoded}`),
      [a, b],
    );
  });

  it("treats the legacy single object as a one-item list", () => {
    const encoded = encodeURIComponent(JSON.stringify(a));

    assert.deepEqual(
      readPreferredCitiesFromCookieHeader(`x=1; mm_preferred_city=${encoded}`),
      [a],
    );
  });

  it("drops duplicates and invalid entries", () => {
    const encoded = encodeURIComponent(
      JSON.stringify([a, a, { id: 5 }, "nope"]),
    );

    assert.deepEqual(
      readPreferredCitiesFromCookieHeader(`mm_preferred_city=${encoded}`),
      [a],
    );
  });

  it("formats a selection label", () => {
    assert.equal(formatPreferredCitiesLabel([], "انتخاب شهر"), "انتخاب شهر");
    assert.equal(formatPreferredCitiesLabel([a], "x"), "تهران");
    assert.equal(formatPreferredCitiesLabel([a, b], "x"), "تهران و ۱ شهر دیگر");
  });
});
