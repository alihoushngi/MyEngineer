import assert from "node:assert/strict";
import test from "node:test";
import {
  isAllowedTicketFile,
  ticketFileError,
} from "./ticket-attachment.ts";

function makeFile(name: string, type: string, size: number): File {
  const bytes = new Uint8Array(size);
  return new File([bytes], name, { type });
}

test("accepts jpeg png gif under 2MB", () => {
  assert.equal(isAllowedTicketFile(makeFile("a.jpg", "image/jpeg", 12)), true);
  assert.equal(isAllowedTicketFile(makeFile("a.png", "image/png", 12)), true);
  assert.equal(isAllowedTicketFile(makeFile("a.gif", "image/gif", 12)), true);
});

test("rejects oversized or disallowed ticket files", () => {
  assert.equal(
    isAllowedTicketFile(makeFile("a.jpg", "image/jpeg", 2 * 1024 * 1024 + 1)),
    false,
  );
  assert.equal(isAllowedTicketFile(makeFile("a.pdf", "application/pdf", 12)), false);
  assert.equal(
    ticketFileError(makeFile("a.webp", "image/webp", 12)),
    "فقط تصویر jpeg، png یا gif تا ۲ مگابایت مجاز است.",
  );
  assert.equal(ticketFileError(undefined), null);
});
