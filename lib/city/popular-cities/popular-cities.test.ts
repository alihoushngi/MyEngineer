import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { matchesCityQuery, resolvePopularCities } from "./popular-cities.ts";

const cities = [
  { id: "1", name: "تهران" },
  { id: "2", name: "مشهد" },
  { id: "3", name: "شیراز" },
];

describe("popular cities", () => {
  it("resolves names in order and ignores unknown ones", () => {
    const result = resolvePopularCities(cities, [
      "تهران",
      "اصفهان",
      "شيراز",
    ]);

    assert.deepEqual(
      result.map((city) => city.id),
      ["1", "3"],
    );
  });

  it("matches city queries loosely", () => {
    assert.equal(matchesCityQuery("شیراز", "شيرا"), true);
    assert.equal(matchesCityQuery("شیراز", ""), true);
    assert.equal(matchesCityQuery("شیراز", "مشه"), false);
  });
});
