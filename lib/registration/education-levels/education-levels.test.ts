import assert from "node:assert/strict";
import test from "node:test";
import {
  isEducationApiLevel,
  mapEducationToApi,
} from "./education-levels.ts";

test("isEducationApiLevel accepts only backend enum values", () => {
  assert.equal(isEducationApiLevel("karshenasi"), true);
  assert.equal(isEducationApiLevel("bachelor"), false);
  assert.equal(isEducationApiLevel("aboveDiploma"), false);
});

test("mapEducationToApi sends field_id and aligned upload ids", () => {
  const payload = mapEducationToApi({
    level: "karshenasi",
    fieldIds: ["1", "bad", "5"],
    university: "  تهران  ",
    uploadIds: { "1": "up-1", "5": "  " },
  });

  assert.deepEqual(payload, {
    level: "karshenasi",
    degrees: [
      { field_id: 1, university: "تهران" },
      { field_id: 5, university: "تهران" },
    ],
    degree_file_upload_ids: ["up-1", null],
  });
});

test("mapEducationToApi rejects unknown levels", () => {
  assert.throws(() =>
    mapEducationToApi({
      level: "bachelor",
      fieldIds: ["1"],
    }),
  );
});
