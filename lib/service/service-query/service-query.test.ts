import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  ALL_FILTER,
  buildProfessionalsQuery,
  createEmptyFilters,
  getActiveFilterChips,
  getOverlayFilterKeys,
  parseServiceFilterParams,
  serializeServiceFilterParams,
} from "./service-query.ts";

describe("service query", () => {
  it("parses city ids, filters and page", () => {
    const parsed = parseServiceFilterParams({
      cities: "3,x,5,3",
      experience: "5-10",
      sort: "bogus",
      page: "2",
    });

    assert.deepEqual(parsed.filters.cities, ["3", "5"]);
    assert.equal(parsed.filters.experience, "5-10");
    assert.equal(parsed.filters.sort, ALL_FILTER);
    assert.equal(parsed.page, 2);
    assert.equal(parsed.citiesExplicit, true);
  });

  it("serializes filters and keeps an explicit empty city list", () => {
    const filters = {
      ...createEmptyFilters(),
      cities: ["1", "2"],
      degree: "arshad",
    };
    assert.equal(
      serializeServiceFilterParams(filters, 3).toString(),
      "cities=1%2C2&degree=arshad&page=3",
    );
    assert.equal(
      serializeServiceFilterParams(createEmptyFilters(), 1, {
        explicitCities: true,
      }).toString(),
      "cities=",
    );
    assert.equal(parseServiceFilterParams({}).citiesExplicit, false);
  });

  it("builds the API query with experience buckets", () => {
    const query = buildProfessionalsQuery(
      {
        ...createEmptyFilters(),
        experience: "15+",
        license: "licensed",
        cities: ["4"],
      },
      2,
      { serviceId: 9 },
    );
    assert.equal(query.service_id, 9);
    assert.equal(query.min_experience, 15);
    assert.equal(query.max_experience, undefined);
    assert.equal(query.has_license, 1);
    assert.deepEqual(query["city_ids[]"], [4]);
    assert.equal(query.page, 2);
    assert.equal(query.per_page, 12);
  });

  it("prefers the selected skill as service_id", () => {
    const query = buildProfessionalsQuery(
      { ...createEmptyFilters(), skill: "21", experience: "0-5" },
      1,
      { serviceId: 9 },
    );
    assert.equal(query.service_id, 21);
    assert.equal(query.min_experience, 0);
    assert.equal(query.max_experience, 5);
  });

  it("derives chips and overlay keys generically", () => {
    const chips = getActiveFilterChips(
      { ...createEmptyFilters(), cities: ["1"], skill: "7" },
      {
        cities: [{ id: "1", name: "تهران" }],
        skills: [{ id: "7", label: "تفکیک" }],
        disciplines: [],
        licenses: [],
        degrees: [],
      },
    );
    assert.deepEqual(
      chips.map((chip) => chip.label),
      ["تهران", "تفکیک"],
    );
    assert.deepEqual(
      getOverlayFilterKeys({ hasSkills: false, hasDisciplines: true }),
      ["experience", "license", "discipline", "degree", "sort"],
    );
  });
});
