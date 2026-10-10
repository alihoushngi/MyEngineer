import assert from "node:assert/strict";
import test from "node:test";
import { shouldUseSecureAuthCookies } from "./secure-auth-cookie.ts";

test("production cookie security cannot be disabled by a local override", () => {
  for (const override of [undefined, "", "false", "true", "invalid"]) {
    assert.equal(shouldUseSecureAuthCookies("production", override), true);
  }
});

test("plain HTTP development remains usable and can opt into HTTPS", () => {
  assert.equal(shouldUseSecureAuthCookies("development", "false"), false);
  assert.equal(shouldUseSecureAuthCookies("test", "true"), true);
});
