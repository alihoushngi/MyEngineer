import assert from "node:assert/strict";
import test from "node:test";

import { mapReviewReply, mapReviewTags } from "./review-tags.ts";

test("mapReviewTags flattens grouped and legacy tags", () => {
  assert.deepEqual(
    mapReviewTags({ positive: ["دقیق"], negative: ["دیر"] }),
    [
      { kind: "positive", label: "دقیق" },
      { kind: "negative", label: "دیر" },
    ],
  );
  assert.deepEqual(mapReviewTags(["خوب", " "]), [
    { kind: "positive", label: "خوب" },
  ]);
  assert.deepEqual(mapReviewTags(null), []);
});

test("mapReviewReply prefers the reply object over legacy text", () => {
  assert.deepEqual(
    mapReviewReply({ body: "ممنون", author: "مهندس", created_at_label: "دیروز" }, "old"),
    { text: "ممنون", authorName: "مهندس", dateLabel: "دیروز" },
  );
  assert.deepEqual(mapReviewReply(null, "قدیمی"), {
    text: "قدیمی",
    authorName: undefined,
    dateLabel: undefined,
  });
  assert.deepEqual(mapReviewReply(null), {});
});
