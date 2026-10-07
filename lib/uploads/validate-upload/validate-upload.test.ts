import assert from "node:assert/strict";
import test from "node:test";

import {
  MB,
  photoUploadRule,
  resumeUploadRule,
  validateUpload,
} from "./validate-upload.ts";

test("resume rule accepts pdf/doc/docx up to 4MB", () => {
  assert.equal(validateUpload({ name: "cv.PDF", size: MB }, resumeUploadRule), null);
  assert.equal(validateUpload({ name: "cv.docx", size: 4 * MB }, resumeUploadRule), null);
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
  assert.equal(validateUpload({ name: "a.jpg", size: 100 }, photoUploadRule), null);
  assert.equal(
    validateUpload({ name: "a.pdf", size: 100 }, photoUploadRule),
    photoUploadRule.typeError,
  );
});
