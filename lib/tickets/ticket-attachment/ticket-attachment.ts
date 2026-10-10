export const TICKET_FILE_MAX_BYTES = 2 * 1024 * 1024;

const TICKET_FILE_TYPES: Readonly<Record<string, readonly string[]>> = {
  jpg: ["image/jpeg", "image/jpg"],
  jpeg: ["image/jpeg", "image/jpg"],
  png: ["image/png"],
  gif: ["image/gif"],
};

export const TICKET_FILE_ACCEPT = "image/jpeg,image/jpg,image/png,image/gif";

export function isAllowedTicketFile(file: File): boolean {
  if (file.size <= 0 || file.size > TICKET_FILE_MAX_BYTES) {
    return false;
  }

  const extension = file.name.split(".").at(-1)?.toLowerCase() ?? "";
  return (
    !/[\u0000-\u001f\u007f]/.test(file.name) &&
    file.name.includes(".") &&
    Boolean(TICKET_FILE_TYPES[extension]) &&
    (file.type === "" ||
      TICKET_FILE_TYPES[extension]!.includes(file.type.toLowerCase()))
  );
}

export function ticketFileError(file: File | undefined): string | null {
  if (!file || file.size === 0) {
    return null;
  }

  if (!isAllowedTicketFile(file)) {
    return "فقط تصویر jpeg، png یا gif تا ۲ مگابایت مجاز است.";
  }

  return null;
}

export function readTicketFile(
  value: FormDataEntryValue | null,
): File | undefined {
  if (!(value instanceof File) || value.size === 0) {
    return undefined;
  }

  return value;
}
