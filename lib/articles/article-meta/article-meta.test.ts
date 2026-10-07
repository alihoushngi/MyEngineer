import assert from "node:assert/strict";
import test from "node:test";

import { buildArticleMeta } from "./article-meta.ts";

test("buildArticleMeta joins author, date and views", () => {
  assert.equal(
    buildArticleMeta({ author: "علی", publishedAt: "۱ فروردین", viewCount: 12 }),
    "علی · ۱ فروردین · ۱۲ بازدید",
  );
  assert.equal(buildArticleMeta({}), "");
  assert.equal(buildArticleMeta({ viewCount: 0 }), "۰ بازدید");
});
