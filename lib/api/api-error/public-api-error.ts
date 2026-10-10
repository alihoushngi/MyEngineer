export type PublicValidationError = {
  field?: string;
  message: string;
};

const UNSAFE_MESSAGE =
  /<\/?[a-z!][^>]*>|\b(?:SQLSTATE|Traceback|Stack trace|PDOException|QueryException)\b|\bBearer\s+\S+|\beyJ[\w-]+\.[\w-]+\.[\w-]+|\b(?:gh[pousr]_|github_pat_|xox[baprs]-|sk-(?:proj-)?|sk_live_|AIza)[\w-]{16,}|\b(?:password|passwd|secret|access[_-]?token|refresh[_-]?token|api[_-]?key|authorization)\s*[:=]\s*\S+|\b[a-z]+:\/\/[^\s/:@]+:[^\s/@]+@|\/(?:var|etc|home|Users|srv)\/\S+|[a-z]:\\(?:Users|Windows)\\/i;

/** Accept short feedback without markup, credential patterns or stack details. */
export function safePublicErrorMessage(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const message = value.trim();
  if (
    message === "" ||
    message.length > 500 ||
    UNSAFE_MESSAGE.test(message) ||
    Array.from(message).some((character) => {
      const code = character.charCodeAt(0);
      return (
        (code < 32 && code !== 10 && code !== 13 && code !== 9) || code === 127
      );
    })
  ) {
    return null;
  }

  return message;
}

export function publicValidationErrors(
  value: unknown,
): PublicValidationError[] {
  const candidates: { field?: unknown; message: unknown }[] = [];
  if (Array.isArray(value)) {
    for (const item of value.slice(0, 50)) {
      if (typeof item === "string") {
        candidates.push({ message: item });
      } else if (isRecord(item)) {
        candidates.push({ field: item.field, message: item.message });
      }
    }
  } else if (isRecord(value)) {
    for (const [field, messages] of Object.entries(value).slice(0, 50)) {
      for (const message of (Array.isArray(messages)
        ? messages
        : [messages]
      ).slice(0, 5)) {
        candidates.push({ field, message });
      }
    }
  }

  return candidates.flatMap(({ field, message }) => {
    const safeMessage = safePublicErrorMessage(message);
    if (!safeMessage) {
      return [];
    }
    const safeField =
      typeof field === "string" && /^[\w.[\]-]{1,100}$/.test(field)
        ? field
        : undefined;
    return [
      { message: safeMessage, ...(safeField ? { field: safeField } : {}) },
    ];
  });
}

/** Only structured 4xx feedback is allowed to cross the API boundary. */
export function parsePublicApiError(
  status: number,
  body: string,
): {
  message: string;
  validationErrors: PublicValidationError[];
} {
  const fallback = {
    message: `Request failed with status ${status}`,
    validationErrors: [],
  };
  if (status < 400 || status >= 500 || body.length > 64 * 1024) {
    return fallback;
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body) as unknown;
  } catch {
    return fallback;
  }
  if (!isRecord(payload)) {
    return fallback;
  }

  return {
    message: safePublicErrorMessage(payload.message) ?? fallback.message,
    validationErrors: publicValidationErrors(
      payload.errors ?? payload.validationErrors,
    ),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
