import assert from "node:assert/strict";
import test from "node:test";
import {
  applyApiTlsPolicy,
  isApiTlsInsecure,
  joinApiUrl,
  normalizeApiBaseUrl,
} from "./api-env.ts";

test("normalizeApiBaseUrl trims and strips trailing slashes", () => {
  assert.equal(
    normalizeApiBaseUrl(" https://test.kbdcland.ir/api/v1/ "),
    "https://test.kbdcland.ir/api/v1",
  );
  assert.equal(normalizeApiBaseUrl(""), "");
  assert.equal(normalizeApiBaseUrl(undefined), "");
});

test("isApiTlsInsecure is true only for the string true", () => {
  assert.equal(isApiTlsInsecure("true"), true);
  assert.equal(isApiTlsInsecure("false"), false);
  assert.equal(isApiTlsInsecure(undefined), false);
  assert.equal(isApiTlsInsecure("1"), false);
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

test("applyApiTlsPolicy disables Node TLS verification only when enabled", () => {
  const previous = process.env.NODE_TLS_REJECT_UNAUTHORIZED;

  applyApiTlsPolicy(false);
  assert.equal(process.env.NODE_TLS_REJECT_UNAUTHORIZED, previous);

  applyApiTlsPolicy(true);
  assert.equal(process.env.NODE_TLS_REJECT_UNAUTHORIZED, "0");

  if (previous === undefined) {
    delete process.env.NODE_TLS_REJECT_UNAUTHORIZED;
  } else {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = previous;
  }
});
