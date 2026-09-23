export const TICKET_FILE_MAX_BYTES = 2 * 1024 * 1024;

const TICKET_FILE_TYPES = new Set(["image/jpeg", "image/png", "image/gif"]);

export const TICKET_FILE_ACCEPT = "image/jpeg,image/jpg,image/png,image/gif";

export function isAllowedTicketFile(file: File): boolean {
  if (file.size <= 0 || file.size > TICKET_FILE_MAX_BYTES) {
    return false;
  }

  if (TICKET_FILE_TYPES.has(file.type)) {
    return true;
  }

  return /\.(jpe?g|png|gif)$/i.test(file.name);
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

export function readTicketFile(value: FormDataEntryValue | null): File | undefined {
  if (!(value instanceof File) || value.size === 0) {
    return undefined;
  }

  return value;
}
