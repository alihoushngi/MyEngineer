import assert from "node:assert/strict";
import test from "node:test";

import {
  parsePublicApiError,
  safePublicErrorMessage,
} from "./public-api-error.ts";

test("server failures discard messages and validation diagnostics", () => {
  const result = parsePublicApiError(
    500,
    JSON.stringify({
      message: "SQLSTATE database failure",
      errors: { password: ["secret: example-diagnostic"] },
      access_token: "example-diagnostic",
    }),
  );
  assert.deepEqual(result, {
    message: "Request failed with status 500",
    validationErrors: [],
  });
});

test("raw HTML, plain text and JSON strings never become user feedback", () => {
  for (const body of [
    "<html>internal error</html>",
    "internal error",
    '"internal error"',
  ]) {
    assert.deepEqual(parsePublicApiError(403, body), {
      message: "Request failed with status 403",
      validationErrors: [],
    });
  }
});

test("structured 4xx validation feedback survives without arbitrary payload fields", () => {
  assert.deepEqual(
    parsePublicApiError(
      422,
      JSON.stringify({
        message: "اطلاعات ارسال‌شده معتبر نیست.",
        errors: { password: ["رمز عبور باید حداقل ۸ کاراکتر باشد."] },
        debug: { authorization: "example-diagnostic" },
        access_token: "example-diagnostic",
      }),
    ),
    {
      message: "اطلاعات ارسال‌شده معتبر نیست.",
      validationErrors: [
        { field: "password", message: "رمز عبور باید حداقل ۸ کاراکتر باشد." },
      ],
    },
  );
});

test("4xx feedback cannot pass markup, credential patterns or stack details", () => {
  const result = parsePublicApiError(
    422,
    JSON.stringify({
      message: "خطا: <script>alert(1)</script>",
      errors: [
        { field: "name", message: "نام الزامی است." },
        { field: "debug", message: "خطا Bearer example-diagnostic" },
        { field: "debug", message: "secret=example-diagnostic" },
        { field: "debug", message: "SQLSTATE database failure" },
      ],
    }),
  );
  assert.deepEqual(result, {
    message: "Request failed with status 422",
    validationErrors: [{ field: "name", message: "نام الزامی است." }],
  });
  assert.equal(safePublicErrorMessage("خطا در /var/www/private/app.php"), null);
  assert.equal(safePublicErrorMessage("x".repeat(501)), null);
});
