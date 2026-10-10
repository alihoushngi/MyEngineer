export type UploadRule = {
  /** Allowed lower-case extensions without the dot. */
  extensions: readonly string[];
  /** Expected browser MIME types for each allowed extension. */
  mimeTypes?: Readonly<Record<string, readonly string[]>>;
  maxBytes: number;
  typeError: string;
  sizeError: string;
};

export const MB = 1024 * 1024;

const IMAGE_MIME_TYPES = {
  jpg: ["image/jpeg", "image/jpg"],
  jpeg: ["image/jpeg", "image/jpg"],
  png: ["image/png"],
  webp: ["image/webp"],
  gif: ["image/gif"],
} as const;

export const resumeUploadRule: UploadRule = {
  extensions: ["pdf", "doc", "docx"],
  mimeTypes: {
    pdf: ["application/pdf"],
    doc: ["application/msword"],
    docx: [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },
  maxBytes: 4 * MB,
  typeError: "فقط فایل PDF، DOC یا DOCX پذیرفته می‌شود.",
  sizeError: "حجم فایل رزومه باید حداکثر ۴ مگابایت باشد.",
};

export const photoUploadRule: UploadRule = {
  extensions: ["jpg", "jpeg", "png", "webp"],
  mimeTypes: IMAGE_MIME_TYPES,
  maxBytes: 4 * MB,
  typeError: "فقط تصویر JPG، PNG یا WEBP پذیرفته می‌شود.",
  sizeError: "حجم تصویر باید حداکثر ۴ مگابایت باشد.",
};

export const avatarUploadRule: UploadRule = {
  ...photoUploadRule,
  maxBytes: 2 * MB,
  sizeError: "حجم تصویر باید حداکثر ۲ مگابایت باشد.",
};

const documentUploadRule: UploadRule = {
  extensions: ["pdf", "jpg", "jpeg", "png"],
  mimeTypes: { ...IMAGE_MIME_TYPES, pdf: ["application/pdf"] },
  maxBytes: 4 * MB,
  typeError: "فقط فایل PDF، JPG یا PNG پذیرفته می‌شود.",
  sizeError: "حجم فایل باید حداکثر ۴ مگابایت باشد.",
};

/** Upload purpose is validated separately before indexing these rules. */
export const purposeUploadRules = {
  avatar: avatarUploadRule,
  degree: documentUploadRule,
  license: documentUploadRule,
  certificate: documentUploadRule,
  portfolio_image: {
    ...photoUploadRule,
    extensions: [...photoUploadRule.extensions, "gif"],
    typeError: "فقط تصویر JPG، PNG، WEBP یا GIF پذیرفته می‌شود.",
  },
  testimonial: photoUploadRule,
} satisfies Record<string, UploadRule>;

function extensionOf(name: string): string {
  const index = name.lastIndexOf(".");

  return index === -1 ? "" : name.slice(index + 1).toLowerCase();
}

/**
 * Checks declared metadata, not file contents. The storage backend must verify
 * signatures, scan uploads and serve them with safe content types.
 */
export function validateUpload(
  file: { name: string; size: number; type?: string },
  rule: UploadRule,
): string | null {
  const extension = extensionOf(file.name);
  if (
    /[\u0000-\u001f\u007f]/.test(file.name) ||
    !rule.extensions.includes(extension)
  ) {
    return rule.typeError;
  }

  if (
    !Number.isSafeInteger(file.size) ||
    file.size <= 0 ||
    file.size > rule.maxBytes
  ) {
    return rule.sizeError;
  }

  if (
    rule.mimeTypes &&
    file.type !== undefined &&
    file.type !== "" &&
    !rule.mimeTypes[extension]?.includes(file.type.toLowerCase())
  ) {
    return rule.typeError;
  }

  return null;
}
