import assert from "node:assert/strict";
import test from "node:test";

import { buildArticleMeta } from "./article-meta.ts";

test("buildArticleMeta joins author, date and views", () => {
  assert.equal(
    buildArticleMeta({
      author: "علی",
      publishedAt: "۱ فروردین",
      viewCount: 12,
    }),
    "علی · ۱ فروردین · ۱۲ بازدید",
  );
  assert.equal(buildArticleMeta({}), "");
  assert.equal(buildArticleMeta({ viewCount: 0 }), "۰ بازدید");
});

test("buildArticleMeta formats ISO publication dates in the Persian calendar", () => {
  for (const publishedAt of [
    "2025-03-21",
    "2025-03-21T08:15:00.000000Z",
    "2025-03-21T08:15:00",
    "2025-03-21T08:15:00+03:30",
  ]) {
    assert.equal(
      buildArticleMeta({ author: "علی", publishedAt, viewCount: 12 }),
      "علی · ۱ فروردین ۱۴۰۴ · ۱۲ بازدید",
    );
  }
});

test("buildArticleMeta preserves supplied date labels and malformed dates", () => {
  for (const publishedAt of [
    "۱ فروردین ۱۴۰۴",
    "۱۴۰۴/۰۱/۰۱",
    "به‌زودی",
    "March 21, 2025",
    "2025-02-30",
    "2025-13-01",
    "2025-03-21T25:00:00Z",
    "2025-03-21T08:15:00+99:00",
  ]) {
    assert.equal(buildArticleMeta({ publishedAt }), publishedAt);
  }
});
