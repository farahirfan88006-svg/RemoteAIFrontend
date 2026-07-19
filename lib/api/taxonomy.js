import { apiFetch, ApiError } from "./client";

/**
 * Categories/Countries data layer, built on top of `apiFetch` (see
 * lib/api/client.js), backed by the Express API's `/api/categories` and
 * `/api/countries` endpoints (dynamic, DB-derived category/country lists
 * with job counts — see backend src/controllers/categories.controller.js
 * and src/controllers/countries.controller.js).
 *
 * Both endpoints are cheap, slow-changing lookups (they only change when
 * the sync engine adds/removes categories or countries, not on every
 * request), so both are fetched with a longer `revalidate` window than
 * the jobs list itself. Next.js's fetch cache means this is a single
 * network round trip per revalidate window server-side, not one per
 * request — combined with the sidebar caching what it's given in React
 * state (see JobsFilterSidebar.js) and never re-fetching itself, this is
 * what "load once" means in practice here.
 *
 * Like `getJobs`, both functions degrade to an empty list — rather than
 * throwing — when no API base URL is configured or the request fails, so
 * a backend hiccup never breaks the whole /jobs page, just leaves the
 * dropdowns showing "no options available" (JobsFilterSidebar already
 * handles that.)
 */

const CATEGORIES_ENDPOINT = "/categories";
const COUNTRIES_ENDPOINT = "/countries";

// How long Next.js may serve a cached copy of the categories/countries
// response before revalidating, in seconds. Longer than the jobs list's
// own 60s window (see lib/api/jobs.js) since this data changes far less
// often — new categories/countries only ever appear via a sync run.
const TAXONOMY_REVALIDATE_SECONDS = 300;

function hasApiBaseUrl() {
  return Boolean(process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL);
}

/**
 * @typedef {object} TaxonomyOption
 * @property {string} name - display name, e.g. "Software Engineering"
 * @property {string} slug - stable identifier used as the filter value
 * @property {number} count - number of currently active jobs in this bucket
 */

/**
 * Normalizes one raw taxonomy entry defensively — same spirit as
 * lib/jobs/normalizeJob.js: don't assume one exact backend shape, just
 * read the fields the UI needs and skip anything unusable.
 *
 * @returns {TaxonomyOption|null}
 */
function normalizeTaxonomyEntry(entry) {
  const name = entry?.name ?? entry?.label;
  const slug = entry?.slug ?? entry?.value;
  const count = Number(entry?.count);
  if (!name || !slug) return null;
  return { name: String(name), slug: String(slug), count: Number.isFinite(count) ? count : 0 };
}

/**
 * @param {string} endpoint
 * @returns {Promise<TaxonomyOption[]>}
 */
async function fetchTaxonomy(endpoint) {
  if (!hasApiBaseUrl()) return [];

  try {
    const data = await apiFetch(endpoint, {
      init: { next: { revalidate: TAXONOMY_REVALIDATE_SECONDS } },
    });
    const rows = Array.isArray(data) ? data : [];
    return rows.map(normalizeTaxonomyEntry).filter(Boolean);
  } catch (error) {
    if (error instanceof ApiError) return [];
    throw error;
  }
}

/** @returns {Promise<TaxonomyOption[]>} categories that currently have active jobs, sorted by count desc */
export function getCategories() {
  return fetchTaxonomy(CATEGORIES_ENDPOINT);
}

/** @returns {Promise<TaxonomyOption[]>} countries that currently have active jobs, sorted by count desc */
export function getCountries() {
  return fetchTaxonomy(COUNTRIES_ENDPOINT);
}

/**
 * Finds one option by its URL slug from an already-fetched list — avoids a
 * second network request when the caller already loaded the full list
 * (see app/jobs/category/[slug]/page.js and app/jobs/country/[slug]/page.js).
 *
 * @param {TaxonomyOption[]} options
 * @param {string} slug
 * @returns {TaxonomyOption|undefined}
 */
export function findTaxonomyBySlug(options, slug) {
  return options.find((option) => option.slug === slug);
}
