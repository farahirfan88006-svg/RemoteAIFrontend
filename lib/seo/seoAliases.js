/**
 * Alias registry for the programmatic SEO page slugs (lib/seo/seoPages.js).
 *
 * The taxonomy returned by `GET /api/categories` uses its own, sometimes
 * longer/compound slugs (e.g. "data-and-ai", "devops-and-infrastructure",
 * "product-management", "product-design", "finance-and-accounting") —
 * that's the backend's real, unmodified taxonomy, and this file doesn't
 * change it. But `categoryDef()` in seoPages.js builds each SEO URL
 * directly from that slug (`remote-${category.slug}-jobs`), so a request
 * for the shorter, more search-friendly `/remote-ai-jobs` or
 * `/remote-devops-jobs` never matched anything — those exact slugs were
 * never in the registry.
 *
 * `CATEGORY_SEO_ALIASES` fixes that by adding a second, additional def for
 * specific categories under the short alias slug, alongside (not instead
 * of) the natural one — both resolve to the exact same live category
 * (same `value`/filter, same live count), so filtering, counts, and the
 * existing `/jobs/category/{slug}` pages are completely untouched.
 *
 * Key: the short slug fragment requested (used as `remote-{key}-jobs`).
 * Value: the *real*, current category slug from `GET /api/categories` it
 * should resolve to. If that category isn't present in a given fetch
 * (taxonomy changed, or it currently has zero jobs), the alias is simply
 * skipped that cycle — same "derived from live data" rule as everything
 * else in seoPages.js, never a hardcoded fallback page.
 */
export const CATEGORY_SEO_ALIASES = {
  ai: { canonicalSlug: "data-and-ai", name: "AI" },
  "machine-learning": { canonicalSlug: "data-and-ai", name: "Machine Learning" },
  "data-science": { canonicalSlug: "data-and-ai", name: "Data Science" },
  devops: { canonicalSlug: "devops-and-infrastructure", name: "DevOps" },
  "product-manager": { canonicalSlug: "product-management", name: "Product Manager" },
  design: { canonicalSlug: "product-design", name: "Design" },
  finance: { canonicalSlug: "finance-and-accounting", name: "Finance" },
};

/**
 * Developer-skill tag slugs that should always get a dedicated SEO page
 * whenever `GET /api/tags` actually returns them — regardless of the
 * general thin-content job-count floor (`MIN_SKILL_JOB_COUNT` in
 * seoPages.js). These are exactly the skill pages the ticket asks for
 * (/remote-python-jobs, /remote-react-jobs, ...); they're common enough
 * that "the tag exists at all" is a better signal than an arbitrary count
 * floor meant for long-tail, one-off tags.
 *
 * This only relaxes the *count* requirement — the tag itself still has to
 * come back from the live `/api/tags` response. It never fabricates a
 * page for a skill with zero real jobs.
 */
export const PRIORITY_SKILL_SLUGS = new Set([
  "python",
  "react",
  "reactjs",
  "javascript",
  "nodejs",
  "node-js",
  "machine-learning",
  "data-science",
  "typescript",
]);
