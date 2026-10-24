import assert from "node:assert/strict";
import test from "node:test";

import {
  getPopularServicesPreview,
  parsePopularServicesPreviewMode,
} from "./popular-services-preview.ts";

const items = [
  {
    id: "1",
    title: "خدمت",
    description: "شرح",
    href: "/services/service",
    imageSrc: "https://media.example.com/services/1.jpg",
  },
];

test("keeps production data by default and exposes isolated edge-case modes", () => {
  assert.equal(parsePopularServicesPreviewMode(undefined), "demo");
  assert.equal(parsePopularServicesPreviewMode("unknown"), "demo");
  assert.equal(getPopularServicesPreview(items, "demo"), items);
  assert.equal(getPopularServicesPreview(items, "empty").length, 0);
  assert.equal(getPopularServicesPreview(items, "one").length, 1);
  assert.equal(getPopularServicesPreview(items, "many").length, 1000);
  const worst = getPopularServicesPreview(items, "worst");
  assert.equal(worst[3]?.href, undefined);
  assert.equal(
    worst[2]?.imageSrc,
    "https://media.example.com/services/1.jpg.missing-preview",
  );
});
