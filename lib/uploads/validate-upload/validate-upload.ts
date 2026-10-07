export type UploadRule = {
  /** Allowed lower-case extensions without the dot. */
  extensions: readonly string[];
  maxBytes: number;
  typeError: string;
  sizeError: string;
};

export const MB = 1024 * 1024;

export const resumeUploadRule: UploadRule = {
  extensions: ["pdf", "doc", "docx"],
  maxBytes: 4 * MB,
  typeError: "فقط فایل PDF، DOC یا DOCX پذیرفته می‌شود.",
  sizeError: "حجم فایل رزومه باید حداکثر ۴ مگابایت باشد.",
};

export const photoUploadRule: UploadRule = {
  extensions: ["jpg", "jpeg", "png", "webp"],
  maxBytes: 4 * MB,
  typeError: "فقط تصویر JPG، PNG یا WEBP پذیرفته می‌شود.",
  sizeError: "حجم تصویر باید حداکثر ۴ مگابایت باشد.",
};

function extensionOf(name: string): string {
  const index = name.lastIndexOf(".");

  return index === -1 ? "" : name.slice(index + 1).toLowerCase();
}

/** Returns an error message, or null when the file is acceptable. */
export function validateUpload(
  file: { name: string; size: number },
  rule: UploadRule,
): string | null {
  if (!rule.extensions.includes(extensionOf(file.name))) {
    return rule.typeError;
  }

  if (file.size > rule.maxBytes) {
    return rule.sizeError;
  }

  return null;
}
