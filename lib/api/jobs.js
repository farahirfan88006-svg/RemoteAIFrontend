import { apiFetch, ApiError } from "./client";
import { jobsFiltersToApiQuery } from "@/lib/jobs/searchParams";
import { normalizeJob } from "@/lib/jobs/normalizeJob";

/**
 * Jobs data layer, built on top of `apiFetch` per the pattern described in
 * lib/api/client.js. Backed by the Express API at `NEXT_PUBLIC_API_URL`.
 * If that env var isn't set, `getJobs` degrades gracefully to an empty,
 * "not connected" result instead of throwing or inventing placeholder jobs
 * — see JobsEmptyState's `notConnected` copy.
 *
 * The response envelope is normalized defensively: different Express APIs
 * name the list/pagination fields differently (`jobs` vs `results` vs
 * `data`, `total` vs `count`, `pages` vs `totalPages`, ...), so
 * `normalizeJobsResponse` below accepts several common spellings of each
 * and falls back to computing what it can from what's available, rather
 * than assuming one exact contract.
 */

const JOBS_ENDPOINT = "/jobs";

/**
 * @typedef {object} JobsResult
 * @property {Array<object>} jobs
 * @property {number} total
 * @property {number} page
 * @property {number} pageSize
 * @property {number} totalPages
 * @property {{ categories: Array<{value: string, label: string, count?: number}>, locations: Array<{value: string, label: string, count?: number}> }} facets
 * @property {boolean} connected - whether a real API base URL is configured
 * @property {boolean} requestFailed - whether a configured request errored (distinct from "no results")
 */

function hasApiBaseUrl() {
  return Boolean(process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL);
}

/** @returns {JobsResult} */
function emptyJobsResult(filters, { requestFailed = false } = {}) {
  return {
    jobs: [],
    total: 0,
    page: filters.page,
    pageSize: filters.pageSize,
    totalPages: 0,
    facets: { categories: [], locations: [] },
    connected: false,
    requestFailed,
  };
}

/** First defined value among `keys` on `obj`. */
function pickField(obj, keys) {
  for (const key of keys) {
    const value = obj?.[key];
    if (value !== undefined && value !== null) return value;
  }
  return undefined;
}

/**
 * Normalizes the API response envelope into `JobsResult`. Accepts a few
 * common shapes for the jobs list (`jobs` / `results` / `data` / `items`,
 * or the response itself being a bare array) and for the pagination fields
 * (`total` / `totalCount` / `count`, `page` / `currentPage`, `pages` /
 * `totalPages`), since Express APIs vary in what they call these.
 *
 * @returns {JobsResult}
 */
function normalizeJobsResponse(data, filters) {
  const rawJobs = Array.isArray(data)
    ? data
    : pickField(data, ["jobs", "results", "items", "data"]);
  const jobs = Array.isArray(rawJobs) ? rawJobs.map(normalizeJob) : [];

  const rawTotal = pickField(data, ["total", "totalCount", "count", "totalResults"]);
  const total = Number.isFinite(Number(rawTotal)) && rawTotal !== undefined ? Number(rawTotal) : jobs.length;

  const rawPage = pickField(data, ["page", "currentPage"]);
  const page = Number.isFinite(Number(rawPage)) && rawPage !== undefined ? Number(rawPage) : filters.page;

  const pageSize = filters.pageSize || jobs.length || 1;

  const rawTotalPages = pickField(data, ["pages", "totalPages", "pageCount"]);
  const totalPages =
    Number.isFinite(Number(rawTotalPages)) && rawTotalPages !== undefined
      ? Number(rawTotalPages)
      : pageSize > 0
        ? Math.max(Math.ceil(total / pageSize), jobs.length ? 1 : 0)
        : 0;

  return {
    jobs,
    total,
    page,
    pageSize,
    totalPages,
    facets: {
      categories: Array.isArray(data?.facets?.categories) ? data.facets.categories : [],
      locations: Array.isArray(data?.facets?.locations) ? data.facets.locations : [],
    },
    connected: true,
    requestFailed: false,
  };
}

/**
 * Fetches a page of jobs for the given normalized filter state
 * (see lib/jobs/searchParams.js#parseJobsSearchParams).
 *
 * @param {ReturnType<typeof import("@/lib/jobs/searchParams").parseJobsSearchParams>} filters
 * @returns {Promise<JobsResult>}
 */
export async function getJobs(filters) {
  if (!hasApiBaseUrl()) {
    // No backend connected yet — this is an expected, temporary state for
    // Phase 4, not an error. The UI renders it as "not connected" rather
    // than "no jobs match your search".
    return emptyJobsResult(filters);
  }

  try {
    const data = await apiFetch(JOBS_ENDPOINT, {
      query: jobsFiltersToApiQuery(filters),
      init: { next: { revalidate: 60 } },
    });
    return normalizeJobsResponse(data, filters);
  } catch (error) {
    if (error instanceof ApiError) {
      return emptyJobsResult(filters, { requestFailed: true });
    }
    throw error;
  }
}

/**
 * Fetches one job by slug for the job detail page
 * (app/jobs/[slug]/page.js). Returns null on a 404 or when disconnected
 * — the page itself calls Next's `notFound()` in that case, same
 * "don't invent a fallback page" rule as the rest of this API layer.
 *
 * @param {string} slug
 * @returns {Promise<object|null>}
 */
export async function getJobBySlug(slug) {
  if (!hasApiBaseUrl()) return null;
  try {
    const data = await apiFetch(`${JOBS_ENDPOINT}/${encodeURIComponent(slug)}`, {
      init: { next: { revalidate: 300 } },
    });
    return normalizeJob(data);
  } catch (error) {
    if (error instanceof ApiError) return null;
    throw error;
  }
}

/**
 * @param {string} slug
 * @param {{page?: number, pageSize?: number}} [pagination]
 * @returns {Promise<{questions: object[], total: number, page: number, pageSize: number, totalPages: number}>}
 */
export async function getInterviewQuestions(slug, { page = 1, pageSize = 10 } = {}) {
  return apiFetch(`${JOBS_ENDPOINT}/${encodeURIComponent(slug)}/interview-questions`, {
    query: { page, pageSize },
  });
}

/**
 * @param {string} slug
 * @returns {Promise<{min: number, max: number, average: number, currency: string, isEstimated: boolean}>}
 */
export async function getSalaryEstimate(slug) {
  return apiFetch(`${JOBS_ENDPOINT}/${encodeURIComponent(slug)}/salary-estimate`);
}
