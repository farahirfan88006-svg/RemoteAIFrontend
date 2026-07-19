import { apiFetch, ApiError } from "./client";

/**
 * Tags/skills data layer, built on top of `apiFetch` (see lib/api/client.js),
 * backed by the new `GET /api/tags` endpoint (see backend
 * src/controllers/tags.controller.js) — the same "dynamic, DB-derived,
 * count-sorted taxonomy list" pattern as lib/api/taxonomy.js's
 * getCategories/getCountries, just for `Job.tags`.
 *
 * Powers the programmatic SEO skill landing pages (/remote-python-jobs,
 * /remote-react-jobs, ...) — see lib/seo/seoPages.js, which turns this
 * list into a set of generated route definitions, and the "Popular
 * skills" block in RelatedLinks.
 *
 * Same caching + graceful-degradation rationale as getCategories: tags
 * only change as often as the sync engine runs, so they're fetched with a
 * longer `revalidate` window than the jobs list itself, and this degrades
 * to an empty list (rather than throwing) if the API isn't reachable —
 * in that case, no skill pages are generated for that build, rather than
 * the whole site failing to build.
 */

const TAGS_ENDPOINT = "/tags";
const TAGS_REVALIDATE_SECONDS = 300;

function hasApiBaseUrl() {
  return Boolean(process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL);
}

/**
 * @typedef {object} TagOption
 * @property {string} name - display name, e.g. "Python", "Machine Learning"
 * @property {string} slug - stable identifier used as the filter value / URL segment
 * @property {number} count - number of currently active jobs tagged with this skill
 */

/** @returns {TagOption|null} */
function normalizeTagEntry(entry) {
  const name = entry?.name ?? entry?.label;
  const slug = entry?.slug ?? entry?.value;
  const count = Number(entry?.count);
  if (!name || !slug) return null;
  return { name: String(name), slug: String(slug), count: Number.isFinite(count) ? count : 0 };
}

/** @returns {Promise<TagOption[]>} tags/skills that currently have active jobs, sorted by count desc */
export async function getTags() {
  if (!hasApiBaseUrl()) return [];

  try {
    const data = await apiFetch(TAGS_ENDPOINT, {
      init: { next: { revalidate: TAGS_REVALIDATE_SECONDS } },
    });
    const rows = Array.isArray(data) ? data : [];
    return rows.map(normalizeTagEntry).filter(Boolean);
  } catch (error) {
    if (error instanceof ApiError) return [];
    throw error;
  }
}

/**
 * Finds one tag by its URL slug from an already-fetched list — avoids a
 * second network request when the caller already loaded the full list.
 *
 * @param {TagOption[]} tags
 * @param {string} slug
 * @returns {TagOption|undefined}
 */
export function findTagBySlug(tags, slug) {
  return tags.find((tag) => tag.slug === slug);
}
