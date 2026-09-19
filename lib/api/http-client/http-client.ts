import { env } from "@/lib/env/env";
import { joinApiUrl } from "@/lib/env/api-env/api-env";
import {
  ApiError,
  apiErrorFromFetchFailure,
  apiErrorFromResponse,
} from "@/lib/api/api-error/api-error";

type QueryPrimitive = string | number | boolean;
type QueryValue = QueryPrimitive | null | undefined;
type QueryParams = Record<string, QueryValue | QueryValue[]>;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type NextFetchOptions = {
  cache?: RequestCache;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

type HttpRequestOptions<TBody = unknown> = {
  headers?: HeadersInit;
  body?: TBody;
  query?: QueryParams;
  signal?: AbortSignal;
  timeoutMs?: number;
} & NextFetchOptions;

const DEFAULT_TIMEOUT_MS = 15_000;

export async function httpGet<TResponse>(
  path: string,
  options?: Omit<HttpRequestOptions, "body">,
): Promise<TResponse> {
  return httpRequest<TResponse>("GET", path, options);
}

export async function httpPost<TResponse, TBody = unknown>(
  path: string,
  options?: HttpRequestOptions<TBody>,
): Promise<TResponse> {
  return httpRequest<TResponse, TBody>("POST", path, options);
}

export async function httpPut<TResponse, TBody = unknown>(
  path: string,
  options?: HttpRequestOptions<TBody>,
): Promise<TResponse> {
  return httpRequest<TResponse, TBody>("PUT", path, options);
}

export async function httpPatch<TResponse, TBody = unknown>(
  path: string,
  options?: HttpRequestOptions<TBody>,
): Promise<TResponse> {
  return httpRequest<TResponse, TBody>("PATCH", path, options);
}

export async function httpDelete<TResponse>(
  path: string,
  options?: Omit<HttpRequestOptions, "body">,
): Promise<TResponse> {
  return httpRequest<TResponse>("DELETE", path, options);
}

export async function httpRequest<TResponse, TBody = unknown>(
  method: HttpMethod,
  path: string,
  options: HttpRequestOptions<TBody> = {},
): Promise<TResponse> {
  const url = buildRequestUrl(path, options.query);
  const headers = new Headers(options.headers);

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  // Browser fetch forbids setting User-Agent; Node/server fetch needs one for some API edges.
  if (typeof window === "undefined" && !headers.has("User-Agent")) {
    headers.set("User-Agent", "MohandesManFrontend/1.0");
  }

  const body = serializeBody(method, options.body, headers);
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const timeoutSignal = AbortSignal.timeout(timeoutMs);
  const signal = composeAbortSignals(options.signal, timeoutSignal);

  let response: Response;

  try {
    response = await fetch(url, {
      method,
      headers,
      body,
      signal,
      cache: options.cache,
      next: options.next,
    });
  } catch (error) {
    throw apiErrorFromFetchFailure(
      error,
      timeoutSignal.aborted,
      options.signal?.aborted === true,
    );
  }

  if (!response.ok) {
    throw await apiErrorFromResponse(response);
  }

  try {
    return await parseSuccessBody<TResponse>(response);
  } catch {
    throw new ApiError({
      status: response.status,
      code: "unknown",
      message: "Response body was not valid JSON",
    });
  }
}

function composeAbortSignals(
  callerSignal: AbortSignal | undefined,
  timeoutSignal: AbortSignal,
): AbortSignal {
  if (!callerSignal) {
    return timeoutSignal;
  }

  return AbortSignal.any([callerSignal, timeoutSignal]);
}

function buildRequestUrl(path: string, query?: QueryParams): string {
  if (env.apiBaseUrl === "") {
    throw new ApiError({
      status: 0,
      code: "unconfigured",
      message: "NEXT_PUBLIC_API_BASE_URL is not configured",
    });
  }

  const url = new URL(joinApiUrl(env.apiBaseUrl, path));

  if (query) {
    appendQueryParams(url, query);
  }

  return url.toString();
}

function appendQueryParams(url: URL, query: QueryParams): void {
  for (const [key, value] of Object.entries(query)) {
    const values = Array.isArray(value) ? value : [value];

    for (const entry of values) {
      if (entry === null || entry === undefined) {
        continue;
      }

      url.searchParams.append(key, String(entry));
    }
  }
}

function serializeBody<TBody>(
  method: HttpMethod,
  body: TBody | undefined,
  headers: Headers,
): string | FormData | undefined {
  if (body === undefined || method === "GET" || method === "DELETE") {
    return undefined;
  }

  if (typeof FormData !== "undefined" && body instanceof FormData) {
    // Boundary is set by the runtime; do not force application/json.
    headers.delete("Content-Type");
    return body;
  }

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return JSON.stringify(body);
}

async function parseSuccessBody<TResponse>(
  response: Response,
): Promise<TResponse> {
  if (response.status === 204) {
    return undefined as TResponse;
  }

  const text = await response.text();

  if (text.trim() === "") {
    return undefined as TResponse;
  }

  return JSON.parse(text) as TResponse;
}
