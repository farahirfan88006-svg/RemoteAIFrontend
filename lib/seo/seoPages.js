import { getCategories } from "@/lib/api/taxonomy";
import { getTags } from "@/lib/api/tags";
import { JOB_TYPE_OPTIONS, EXPERIENCE_LEVEL_OPTIONS } from "@/lib/jobs/constants";
import { CATEGORY_SEO_ALIASES, PRIORITY_SKILL_SLUGS } from "@/lib/seo/seoAliases";

/**
 * Programmatic SEO landing page registry.
 *
 * Generates the full set of `/remote-{x}-jobs`-style routes (see
 * app/[seoSlug]/page.js) from live data instead of a hand-maintained
 * list, per the "no hardcoded pages" requirement:
 *
 *   - "category" defs come from `GET /api/categories` (live, DB-derived —
 *     see lib/api/taxonomy.js / backend categoryTaxonomy.js). New category
 *     -> new page automatically, next time the taxonomy is fetched. Zero
 *     current jobs in a category -> it's absent from the source list ->
 *     no page is generated for it.
 *   - "skill" defs come from `GET /api/tags` (live, DB-derived — see
 *     lib/api/tags.js / backend tagTaxonomy.js), the same way. A
 *     `MIN_SKILL_JOB_COUNT` floor keeps single-job, one-off tags from
 *     generating thin, low-value pages.
 *   - "type" (employment type) and "experience" (experience level) defs
 *     come from the app's existing fixed enums (lib/jobs/constants.js —
 *     the same JOB_TYPE_OPTIONS/EXPERIENCE_LEVEL_OPTIONS the /jobs filter
 *     sidebar already renders from). These are schema-level taxonomy
 *     (Job.employmentType / Job.experienceLevel only ever take one of
 *     these five/four values — see backend models/Job.js), not
 *     hand-authored content, so generating one page per enum value is
 *     still "derived from data," just from the schema rather than a
 *     collection query.
 *
 * Each def's `slug` is a *template* applied to that data (e.g.
 * `remote-${category.slug}-jobs`), not a literal string someone typed —
 * add a category or tag in MongoDB and its page exists on the next
 * `getSeoPageDefs()` call / next revalidation window, with no code change.
 *
 * @typedef {object} SeoPageDef
 * @property {string} slug - URL segment under the site root, e.g. "remote-python-jobs"
 * @property {"category"|"skill"|"type"|"experience"} dimension
 * @property {string} value - the taxonomy slug/enum value used to build the job filter
 * @property {string} name - display name, e.g. "Python", "Full-time"
 * @property {number} [count] - live job count, when known (category/skill only)
 */

// Below this many currently-active jobs, a skill isn't worth its own
// indexable page (thin content) — it still works as a `?skill=` filter on
// /jobs, just doesn't get a dedicated programmatic SEO landing page.
const MIN_SKILL_JOB_COUNT = 2;

// Cap on how many skill pages get generated, even if more clear the count
// floor above — keeps the generated-page count sane on a very tag-rich
// dataset. Categories aren't capped: the curated taxonomy is already a
// bounded ~45 entries (see backend categoryTaxonomy.js).
const MAX_SKILL_PAGES = 60;

const EXPERIENCE_SLUG_TEMPLATES = {
  entry: "entry-level-remote-jobs",
  mid: "mid-level-remote-jobs",
  senior: "senior-remote-jobs",
  lead: "lead-remote-jobs",
};

function categoryDef(category) {
  return {
    slug: `remote-${category.slug}-jobs`,
    dimension: "category",
    value: category.slug,
    name: category.name,
    count: category.count,
  };
}

/**
 * Builds the extra alias def for one `CATEGORY_SEO_ALIASES` entry, resolved
 * against the *live* categories list — never a hardcoded filter value. Skips
 * (returns null) if the canonical category isn't in the current fetch, so an
 * alias never generates a page for a category that doesn't currently exist /
 * has no active jobs, same rule as every other def here.
 *
 * @param {string} aliasSlug
 * @param {{canonicalSlug: string, name: string}} alias
 * @param {TaxonomyOption[]} categories
 */
function categoryAliasDef(aliasSlug, alias, categories) {
  const canonical = categories.find((category) => category.slug === alias.canonicalSlug);
  if (!canonical) return null;
  return {
    slug: `remote-${aliasSlug}-jobs`,
    dimension: "category",
    value: canonical.slug,
    name: alias.name,
    count: canonical.count,
  };
}

function skillDef(tag) {
  return {
    slug: `remote-${tag.slug}-jobs`,
    dimension: "skill",
    value: tag.slug,
    name: tag.name,
    count: tag.count,
  };
}

function typeDef(option) {
  return {
    slug: `${option.value}-remote-jobs`,
    dimension: "type",
    value: option.value,
    name: option.label,
  };
}

function experienceDef(option) {
  const slug = EXPERIENCE_SLUG_TEMPLATES[option.value];
  if (!slug) return null;
  return { slug, dimension: "experience", value: option.value, name: option.label };
}

/**
 * Builds the full, deduplicated list of SEO page definitions from live
 * taxonomy data. `category` defs take priority over `skill` defs on a
 * slug collision (both use the `remote-{x}-jobs` template, so a category
 * and a tag that slugify to the same string would otherwise fight over
 * one URL) — categories are the smaller, curated, higher-intent list.
 *
 * @returns {Promise<SeoPageDef[]>}
 */
export async function getSeoPageDefs() {
  const [categories, tags] = await Promise.all([getCategories(), getTags()]);

  const bySlug = new Map();
  const add = (def) => {
    if (def && !bySlug.has(def.slug)) bySlug.set(def.slug, def);
  };

  categories.forEach((category) => add(categoryDef(category)));

  // Short, search-friendly aliases (e.g. "ai" -> the live "data-and-ai"
  // category) — additive, only added if the natural category slug didn't
  // already claim that exact URL (see the `add` guard above), and only
  // when the canonical category is actually present in this fetch.
  Object.entries(CATEGORY_SEO_ALIASES).forEach(([aliasSlug, alias]) => {
    add(categoryAliasDef(aliasSlug, alias, categories));
  });

  // Priority developer-skill tags (python, react, javascript, ...) get a
  // page whenever the tag exists at all; everything else still needs to
  // clear MIN_SKILL_JOB_COUNT to avoid thin, one-off tag pages. Priority
  // tags are listed first so they're never pushed out by MAX_SKILL_PAGES.
  const priorityTags = tags.filter((tag) => PRIORITY_SKILL_SLUGS.has(tag.slug) && tag.count > 0);
  const otherTags = tags.filter(
    (tag) => !PRIORITY_SKILL_SLUGS.has(tag.slug) && tag.count >= MIN_SKILL_JOB_COUNT,
  );
  [...priorityTags, ...otherTags].slice(0, MAX_SKILL_PAGES).forEach((tag) => add(skillDef(tag)));

  JOB_TYPE_OPTIONS.forEach((option) => add(typeDef(option)));
  EXPERIENCE_LEVEL_OPTIONS.forEach((option) => add(experienceDef(option)));

  return [...bySlug.values()];
}

/** Maps an SeoPageDef's `dimension` to the filter key it locks in lib/jobs/searchParams.js's filter state. */
const DIMENSION_FILTER_KEY = {
  category: "category",
  skill: "skill",
  type: "type",
  experience: "experience",
};

/**
 * @param {SeoPageDef} def
 * @returns {string} the filter key this def locks (see lib/jobs/searchParams.js)
 */
export function seoDefFilterKey(def) {
  return DIMENSION_FILTER_KEY[def.dimension];
}

/**
 * Builds the "Related searches" cross-links for one def: every other
 * type/experience SEO page (excluding the current one, if it happens to
 * be one of those). Category and skill cross-links are already handled
 * by RelatedLinks' own "categories"/"skills" groups (see
 * app/[seoSlug]/page.js), so this only covers the two small, fixed-size
 * dimensions those groups don't — giving every generated page a
 * consistent, site-wide interlinking footer, entirely derived from
 * `allDefs` rather than typed out per page.
 *
 * @param {SeoPageDef} def
 * @param {SeoPageDef[]} allDefs
 * @returns {Array<{name: string, href: string}>}
 */
export function buildSeoCrossLinks(def, allDefs) {
  return allDefs
    .filter((other) => (other.dimension === "type" || other.dimension === "experience") && other.slug !== def.slug)
    .map((other) => ({ name: other.name, href: `/${other.slug}` }));
}

/**
 * Resolves one SEO slug against the full registry. Used by
 * app/[seoSlug]/page.js for both `generateStaticParams` (indirectly, via
 * `getSeoPageDefs`) and per-request resolution (an unknown slug 404s
 * instead of rendering, same "validate against live data" rule the
 * category/country/company landing pages already follow).
 *
 * @param {string} slug
 * @returns {Promise<SeoPageDef|undefined>}
 */
export async function resolveSeoPageDef(slug) {
  const defs = await getSeoPageDefs();
  return defs.find((def) => def.slug === slug);
}
