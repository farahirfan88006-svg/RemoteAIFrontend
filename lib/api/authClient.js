"use client";

/**
 * Client-side auth token storage + an authenticated fetch helper.
 *
 * The backend has no cookie/session support (see backend
 * src/routes/auth.routes.js) — it issues a bearer JWT, so the token has
 * to live somewhere the browser controls. `localStorage` is used here
 * (not httpOnly cookies, which would need server-side cookie handling
 * this Express API doesn't have). Tradeoff, documented plainly: a
 * `localStorage` token is readable by any script on the page, so it's
 * vulnerable to XSS in a way an httpOnly cookie wouldn't be. Acceptable
 * for this scope, but flagged in "Known limitations" — a production
 * hardening pass would move to httpOnly cookies + CSRF protection.
 */

const TOKEN_KEY = "remoteai_auth_token";

export function getToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  constructor(message, { status, code } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

function apiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || "";
}

/**
 * Fetch wrapper for auth-required endpoints — attaches the bearer token,
 * parses the backend's `{ success: false, error: { code, message } }`
 * envelope on failure into an `ApiError`, otherwise returns the parsed
 * JSON body directly.
 *
 * @param {string} path - e.g. "/resumes"
 * @param {RequestInit & { body?: object, isFormData?: boolean }} [options]
 */
export async function authFetch(path, options = {}) {
  const { body, isFormData, headers, ...rest } = options;
  const token = getToken();

  const finalHeaders = { ...headers };
  if (token) finalHeaders.Authorization = `Bearer ${token}`;
  if (!isFormData) finalHeaders["Content-Type"] = "application/json";

  const response = await fetch(`${apiBaseUrl()}${path}`, {
    ...rest,
    headers: finalHeaders,
    body: isFormData ? body : body !== undefined ? JSON.stringify(body) : undefined,
  });

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    // Two response envelopes exist in this API:
    //   - { success: false, error: { code, message } }  (errorHandler.js — auth, resumes, etc.)
    //   - { success: false, message, errors: [...] }    (/api/ai/* controllers — careerCoach,
    //     mockInterview, resumeAnalyzer, etc., which respond directly rather than via next(err))
    // Check both shapes so AI-endpoint failures surface their real message
    // instead of falling through to the generic fallback below.
    const message =
      data?.error?.message ||
      data?.message ||
      `Request failed with status ${response.status}`;
    const code = data?.error?.code || data?.errors?.[0];
    throw new ApiError(message, { status: response.status, code });
  }

  return data;
}
