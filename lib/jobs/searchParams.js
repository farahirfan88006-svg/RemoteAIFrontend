import { DEFAULT_PAGE_SIZE, DEFAULT_SORT } from "./constants";

/**
 * URL search-params <-> filter-state helpers for /jobs.
 *
 * The Jobs page is driven entirely by the URL (?q=&category=&type=&...) so
 * search, filters, sort, and pagination are all shareable, bookmarkable,
 * and server-renderable. This module is the single place that knows the
 * param names and how they're encoded — every component (server or
 * client) that needs to read or build a /jobs URL imports from here
 * instead of re-implementing the encoding.
 *
 * Multi-select filter groups (category, type, experience, remoteType) are
 * encoded as a single comma-separated param each, e.g. `?type=full-time,contract`,
 * so adding new filter values later never requires new query-string keys.
 */

const MULTI_VALUE_KEYS = ["category", "type", "experience", "remoteType", "country", "company", "skill"];

function splitParam(value) {
  if (!value) return [];
  const raw = Array.isArray(value) ? value.join(",") : String(value);
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toNumberOrUndefined(value) {
  if (value === undefined || value === null || value === "") return undefined;
  const num = Number(value);
  return Number.isFinite(num) ? num : undefined;
}

/**
 * Parses raw Next.js `searchParams` (a plain object of string | string[])
 * into a normalized filter-state object used throughout the Jobs feature.
 */
export function parseJobsSearchParams(rawParams = {}) {
  const pageNum = Number.parseInt(
    Array.isArray(rawParams.page) ? rawParams.page[0] : rawParams.page,
    10,
  );

  return {
    q: (Array.isArray(rawParams.q) ? rawParams.q[0] : rawParams.q || "").trim(),
    category: splitParam(rawParams.category),
    type: splitParam(rawParams.type),
    experience: splitParam(rawParams.experience),
    remoteType: splitParam(rawParams.remoteType),
    country: splitParam(rawParams.country),
    company: splitParam(rawParams.company),
    skill: splitParam(rawParams.skill),
    location: (Array.isArray(rawParams.location) ? rawParams.location[0] : rawParams.location || "").trim(),
    salaryMin: toNumberOrUndefined(Array.isArray(rawParams.salaryMin) ? rawParams.salaryMin[0] : rawParams.salaryMin),
    salaryMax: toNumberOrUndefined(Array.isArray(rawParams.salaryMax) ? rawParams.salaryMax[0] : rawParams.salaryMax),
    sort: (Array.isArray(rawParams.sort) ? rawParams.sort[0] : rawParams.sort) || DEFAULT_SORT,
    page: Number.isFinite(pageNum) && pageNum > 0 ? pageNum : 1,
    pageSize: DEFAULT_PAGE_SIZE,
  };
}

/** True when any search/filter criteria (not sort/page) is active. */
export function hasActiveJobFilters(filters) {
  return Boolean(
    filters.q ||
      filters.category.length ||
      filters.type.length ||
      filters.experience.length ||
      filters.remoteType.length ||
      filters.country.length ||
      filters.company.length ||
      filters.skill.length ||
      filters.location ||
      filters.salaryMin ||
      filters.salaryMax,
  );
}

/** Converts normalized filter state into a query object ready for the API client. */
export function jobsFiltersToApiQuery(filters) {
  return {
    q: filters.q || undefined,
    category: filters.category.length ? filters.category.join(",") : undefined,
    type: filters.type.length ? filters.type.join(",") : undefined,
    experience: filters.experience.length ? filters.experience.join(",") : undefined,
    remoteType: filters.remoteType.length ? filters.remoteType.join(",") : undefined,
    country: filters.country.length ? filters.country.join(",") : undefined,
    company: filters.company.length ? filters.company.join(",") : undefined,
    skill: filters.skill.length ? filters.skill.join(",") : undefined,
    location: filters.location || undefined,
    salaryMin: filters.salaryMin,
    salaryMax: filters.salaryMax,
    sort: filters.sort,
    page: filters.page,
    pageSize: filters.pageSize,
  };
}

/**
 * Builds a `/jobs?...` href from the current filter state plus overrides.
 * Any filter change other than an explicit `page` override resets pagination
 * to page 1, since the result set underneath it changes.
 *
 * @param {ReturnType<typeof parseJobsSearchParams>} filters
 * @param {Partial<ReturnType<typeof parseJobsSearchParams>>} overrides
 * @param {{ basePath?: string, omit?: string[] }} [options] - `basePath`
 *   defaults to "/jobs" (unchanged behavior for every existing caller).
 *   Category/country/company landing pages (/jobs/category/[slug], etc.)
 *   pass their own canonical path here plus `omit: ["category"]` (etc.) so
 *   the dimension already encoded in the path isn't *also* duplicated as a
 *   query param.
 */
export function buildJobsHref(filters, overrides = {}, options = {}) {
  const { basePath = "/jobs", omit = [] } = options;
  const isOmitted = (key) => omit.includes(key);

  const merged = { ...filters, ...overrides };
  if (!("page" in overrides)) {
    merged.page = 1;
  }

  const params = new URLSearchParams();
  const setIfPresent = (key, value) => {
    if (isOmitted(key)) return;
    if (value === undefined || value === null || value === "") return;
    params.set(key, value);
  };

  setIfPresent("q", merged.q);
  MULTI_VALUE_KEYS.forEach((key) => {
    if (isOmitted(key)) return;
    const list = merged[key];
    if (Array.isArray(list) && list.length) params.set(key, list.join(","));
  });
  setIfPresent("location", merged.location);
  setIfPresent("salaryMin", merged.salaryMin);
  setIfPresent("salaryMax", merged.salaryMax);
  if (!isOmitted("sort") && merged.sort && merged.sort !== DEFAULT_SORT) params.set("sort", merged.sort);
  if (!isOmitted("page") && merged.page && merged.page > 1) params.set("page", String(merged.page));

  const qs = params.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}
