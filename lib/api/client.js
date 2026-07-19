/**
 * Base API client.
 *
 * Talks to the Express backend at `NEXT_PUBLIC_API_URL`
 * (e.g. "http://localhost:5000/api" or a production Railway URL).
 * `NEXT_PUBLIC_API_BASE_URL` is also accepted as a fallback for anyone who
 * already had that name configured from an earlier phase. Endpoint-specific
 * modules (e.g. lib/api/jobs.js, lib/api/auth.js) import `apiFetch` and
 * build on top of it, rather than calling `fetch` directly, which keeps
 * error handling, headers, and response parsing consistent in one place.
 *
 * Example usage:
 *   // lib/api/jobs.js
 *   import { apiFetch } from "@/lib/api/client";
 *   export function getJobs(params) {
 *     return apiFetch("/jobs", { query: params });
 *   }
 */

const DEFAULT_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";

export class ApiError extends Error {
  constructor(message, { status, data } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

/**
 * Serializes a plain object into a query string, skipping nullish values.
 * @param {Record<string, unknown>} [query]
 */
function toQueryString(query) {
  if (!query) return "";
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.append(key, value);
    }
  });
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

/**
 * Core fetch wrapper. Throws `ApiError` on non-2xx responses so callers can
 * use a single try/catch instead of checking `response.ok` everywhere.
 *
 * @param {string} path - endpoint path, e.g. "/jobs". Combined with baseUrl.
 * @param {object} [options]
 * @param {string} [options.method]
 * @param {Record<string, unknown>} [options.query] - serialized to a query string
 * @param {unknown} [options.body] - JSON-serialized automatically
 * @param {Record<string, string>} [options.headers]
 * @param {string} [options.baseUrl] - override the default base URL
 * @param {RequestInit} [options.init] - any other native fetch options (cache, next, signal, ...)
 */
export async function apiFetch(path, options = {}) {
  const {
    method = "GET",
    query,
    body,
    headers = {},
    baseUrl = DEFAULT_BASE_URL,
    init = {},
  } = options;

  const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");
  const url = `${normalizedBaseUrl}${path}${toQueryString(query)}`;

  const response = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    ...init,
  });

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json().catch(() => null) : await response.text();

  if (!response.ok) {
    throw new ApiError(`Request to ${url} failed with status ${response.status}`, {
      status: response.status,
      data,
    });
  }

  return data;
}
