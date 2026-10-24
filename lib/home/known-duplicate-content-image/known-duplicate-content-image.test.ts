import assert from "node:assert/strict";
import test from "node:test";

import { isKnownDuplicateContentImage } from "./known-duplicate-content-image.ts";

test("identifies only verified duplicate API media paths", () => {
  assert.equal(
    isKnownDuplicateContentImage(
      "https://cdn.example.test/public/front/upload/users/84/profile/84.jpg?width=96",
    ),
    true,
  );
  assert.equal(
    isKnownDuplicateContentImage(
      "http://89.42.208.70:8080/front/upload/testimonials/2/2.jpg",
    ),
    true,
  );
  assert.equal(
    isKnownDuplicateContentImage(
      "https://cdn.example.test/public/front/upload/users/49/profile/49.jpg",
    ),
    false,
  );
  assert.equal(isKnownDuplicateContentImage(undefined), false);
});
