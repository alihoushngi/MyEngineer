import assert from "node:assert/strict";
import test from "node:test";
import { joinApiUrl, normalizeApiBaseUrl } from "./api-env.ts";

test("normalizeApiBaseUrl trims and strips trailing slashes", () => {
  assert.equal(
    normalizeApiBaseUrl(" https://test.kbdcland.ir/api/v1/ "),
    "https://test.kbdcland.ir/api/v1",
  );
  assert.equal(normalizeApiBaseUrl(""), "");
  assert.equal(normalizeApiBaseUrl(undefined), "");
});

test("joinApiUrl avoids a double slash when the base has a trailing slash", () => {
  assert.equal(
    joinApiUrl("https://test.kbdcland.ir/api/v1/", "/home"),
    "https://test.kbdcland.ir/api/v1/home",
  );
  assert.equal(
    joinApiUrl("https://test.kbdcland.ir/api/v1", "services"),
    "https://test.kbdcland.ir/api/v1/services",
  );
});
