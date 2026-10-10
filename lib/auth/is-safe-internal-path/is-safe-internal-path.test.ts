import assert from "node:assert/strict";
import test from "node:test";
import {
  getSafeInternalNext,
  isEngineerFamilyPath,
  isSafeInternalPath,
  pathWithoutSearch,
} from "./is-safe-internal-path.ts";

test("isSafeInternalPath allows internal paths and rejects external tricks", () => {
  assert.equal(isSafeInternalPath("/experts/123"), true);
  assert.equal(isSafeInternalPath("/search?q=map"), true);
  assert.equal(isSafeInternalPath("https://evil.example"), false);
  assert.equal(isSafeInternalPath("//evil.example"), false);
  assert.equal(isSafeInternalPath("/\\evil"), false);
  assert.equal(isSafeInternalPath("/%2f%2fevil.example"), false);
  assert.equal(isSafeInternalPath("/experts 123"), false);
  assert.equal(isSafeInternalPath(""), false);
});

test("pathWithoutSearch strips query and hash", () => {
  assert.equal(pathWithoutSearch("/experts/123?tab=a"), "/experts/123");
  assert.equal(pathWithoutSearch("/account#profile"), "/account");
});

test("redirects reject browser-normalized traversal, separators and controls", () => {
  for (const value of [
    "/account/../../outside",
    "/engineer/%2e%2e/login",
    "/account/%252e%252e/login",
    "/account%2f..%2flogin",
    "/account/%5cevil",
    "/account\u0000",
    "/account/%00",
    "/account\n",
    "/account/%zz",
  ]) {
    assert.equal(isSafeInternalPath(value), false, value);
  }
});

test("encoded route names cannot bypass forbidden destination families", () => {
  const reject = (pathname: string) =>
    isEngineerFamilyPath(pathname) || pathname === "/login";
  assert.equal(
    getSafeInternalNext("/%65ngineer/profile", "/account", reject),
    "/account",
  );
  assert.equal(getSafeInternalNext("/%6cogin", "/account", reject), "/account");
  assert.equal(
    getSafeInternalNext("/search?q=%2Fsomewhere", "/account", reject),
    "/search?q=%2Fsomewhere",
  );
});

test("isEngineerFamilyPath covers the engineer workspace tree", () => {
  assert.equal(isEngineerFamilyPath("/engineer"), true);
  assert.equal(isEngineerFamilyPath("/engineer/profile"), true);
  assert.equal(isEngineerFamilyPath("/engineer/login"), true);
  assert.equal(isEngineerFamilyPath("/login"), false);
  assert.equal(isEngineerFamilyPath("/account"), false);
});

test("getSafeInternalNext rejects external, engineer, and auth-entry paths", () => {
  const fallback = "/account";
  const reject = (pathname: string) =>
    isEngineerFamilyPath(pathname) ||
    pathname === "/login" ||
    pathname === "/register";

  assert.equal(
    getSafeInternalNext("/experts/123", fallback, reject),
    "/experts/123",
  );
  assert.equal(
    getSafeInternalNext("/search?q=map", fallback, reject),
    "/search?q=map",
  );
  assert.equal(
    getSafeInternalNext(
      "/account/messages/start?expertId=amirhossein-rostami",
      fallback,
      reject,
    ),
    "/account/messages/start?expertId=amirhossein-rostami",
  );
  assert.equal(
    getSafeInternalNext("https://evil.example", fallback, reject),
    fallback,
  );
  assert.equal(getSafeInternalNext("/engineer", fallback, reject), fallback);
  assert.equal(
    getSafeInternalNext("/engineer/profile", fallback, reject),
    fallback,
  );
  assert.equal(getSafeInternalNext("/login", fallback, reject), fallback);
  assert.equal(getSafeInternalNext("/register", fallback, reject), fallback);
  assert.equal(getSafeInternalNext(undefined, fallback, reject), fallback);
});
