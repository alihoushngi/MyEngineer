import assert from "node:assert/strict";
import test from "node:test";

import {
  MB,
  photoUploadRule,
  purposeUploadRules,
  resumeUploadRule,
  validateUpload,
} from "./validate-upload.ts";

test("resume rule accepts pdf/doc/docx up to 4MB", () => {
  assert.equal(
    validateUpload({ name: "cv.PDF", size: MB }, resumeUploadRule),
    null,
  );
  assert.equal(
    validateUpload({ name: "cv.docx", size: 4 * MB }, resumeUploadRule),
    null,
  );
  assert.equal(
    validateUpload({ name: "cv.exe", size: 10 }, resumeUploadRule),
    resumeUploadRule.typeError,
  );
  assert.equal(
    validateUpload({ name: "cv.pdf", size: 4 * MB + 1 }, resumeUploadRule),
    resumeUploadRule.sizeError,
  );
  assert.equal(
    validateUpload({ name: "noext", size: 1 }, resumeUploadRule),
    resumeUploadRule.typeError,
  );
});

test("photo rule accepts common images", () => {
  assert.equal(
    validateUpload({ name: "a.jpg", size: 100 }, photoUploadRule),
    null,
  );
  assert.equal(
    validateUpload({ name: "a.pdf", size: 100 }, photoUploadRule),
    photoUploadRule.typeError,
  );
});

test("uploads require nonempty bounded files and MIME matching the extension", () => {
  for (const file of [
    { name: "a.jpg", size: 0, type: "image/jpeg" },
    { name: "a.jpg", size: -1, type: "image/jpeg" },
    { name: "a.jpg", size: Number.NaN, type: "image/jpeg" },
    { name: "a.jpg", size: 1, type: "application/x-php" },
    { name: "a.php", size: 1, type: "image/jpeg" },
    { name: "a.jpg", size: 1, type: "image/png" },
    { name: "a\u0000.jpg", size: 1, type: "image/jpeg" },
  ]) {
    assert.notEqual(validateUpload(file, photoUploadRule), null);
  }
  assert.equal(
    validateUpload(
      { name: "a.JPG", size: 1, type: "image/jpeg" },
      photoUploadRule,
    ),
    null,
  );
});

test("browsers without MIME metadata still require an allowed extension and size", () => {
  assert.equal(
    validateUpload({ name: "cv.docx", size: MB, type: "" }, resumeUploadRule),
    null,
  );
  assert.equal(
    validateUpload({ name: "a.jpg", size: MB, type: "" }, photoUploadRule),
    null,
  );
  assert.notEqual(
    validateUpload({ name: "a.php", size: MB, type: "" }, photoUploadRule),
    null,
  );
  assert.notEqual(
    validateUpload({ name: "a.jpg", size: 5 * MB, type: "" }, photoUploadRule),
    null,
  );
});

test("purpose rules cap avatars and keep portfolio GIFs and document PDFs", () => {
  assert.equal(
    validateUpload(
      { name: "a.webp", type: "image/webp", size: 2 * MB },
      purposeUploadRules.avatar,
    ),
    null,
  );
  assert.notEqual(
    validateUpload(
      { name: "a.webp", type: "image/webp", size: 2 * MB + 1 },
      purposeUploadRules.avatar,
    ),
    null,
  );
  assert.equal(
    validateUpload(
      { name: "a.gif", type: "image/gif", size: MB },
      purposeUploadRules.portfolio_image,
    ),
    null,
  );
  for (const purpose of ["degree", "license", "certificate"] as const) {
    assert.equal(
      validateUpload(
        { name: "document.pdf", type: "application/pdf", size: 4 * MB },
        purposeUploadRules[purpose],
      ),
      null,
    );
    assert.notEqual(
      validateUpload(
        { name: "a.svg", type: "image/svg+xml", size: 12 },
        purposeUploadRules[purpose],
      ),
      null,
    );
  }
});
