import assert from "node:assert/strict";
import test from "node:test";
import { decodeRouteSlug } from "./decode-route-slug.ts";

test("matches encoded Persian path segments to backend slugs", () => {
  assert.equal(
    decodeRouteSlug(encodeURIComponent("نقشه-برداری")),
    "نقشه-برداری",
  );
  assert.equal(decodeRouteSlug("ساختمان"), "ساختمان");
  assert.equal(decodeRouteSlug("utm-map"), "utm-map");
});

test("malformed escapes are retained and nested encoding is decoded once", () => {
  assert.equal(decodeRouteSlug("%E0%A4"), "%E0%A4");
  assert.equal(decodeRouteSlug("%25D8%25B3"), "%D8%B3");
});
