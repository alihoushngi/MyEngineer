import assert from "node:assert/strict";
import test from "node:test";
import { resolveMediaUrl } from "../resolve-media-url/resolve-media-url.ts";

test("resolveMediaUrl leaves absolute urls untouched", () => {
  assert.equal(
    resolveMediaUrl("https://cdn.example.com/a.jpg"),
    "https://cdn.example.com/a.jpg",
  );
});

test("strip empty media paths", async () => {
  const { stripHtml } = await import("../strip-html/strip-html.ts");
  assert.equal(stripHtml("<p>سلام&nbsp;دنیا</p>"), "سلام دنیا");
});

// Keep a lightweight presence check for the media helper module.
test("resolveMediaUrl handles empty", () => {
  assert.equal(resolveMediaUrl(""), undefined);
  assert.equal(resolveMediaUrl(null), undefined);
});
