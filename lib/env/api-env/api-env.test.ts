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

test("joinApiUrl rejects endpoint traversal and query injection", () => {
  const base = "https://api.example/api/v1";
  for (const path of [
    "/conversations/../../auth/logout",
    "/conversations/%2e%2e/messages",
    "/conversations/..%2f..%2fauth/logout",
    "/conversations/..\\auth/logout",
    "/notifications/1?admin=true/read",
    "/notifications/1#ignored/read",
    "/user/\t..\t/engineer",
    "/user/%00/engineer",
    "/user/%252e%252e/engineer",
  ]) {
    assert.throws(() => joinApiUrl(base, path));
  }
  assert.equal(joinApiUrl(base, "/articles/a%20b"), `${base}/articles/a%20b`);
});

test("joinApiUrl accepts internal HTTP origins but rejects credentials and non-HTTP origins", () => {
  assert.equal(
    joinApiUrl("http://backend/api/v1", "/home"),
    "http://backend/api/v1/home",
  );
  for (const base of [
    "file:///etc",
    "https://user:password@api.example/api",
    "https://api.example/api?key=value",
  ]) {
    assert.throws(() => joinApiUrl(base, "/home"));
  }
});
