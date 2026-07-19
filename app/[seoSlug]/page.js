import { notFound } from "next/navigation";
import JobsLandingPage, { buildCanonicalPath, buildLandingMetadata } from "@/components/server/JobsLandingPage";
import { parseJobsSearchParams, hasActiveJobFilters } from "@/lib/jobs/searchParams";
import { getCategories, getCountries } from "@/lib/api/taxonomy";
import { getCompanies } from "@/lib/api/companies";
import { getTags } from "@/lib/api/tags";
import { getJobs } from "@/lib/api/jobs";
import { getSeoPageDefs, seoDefFilterKey, buildSeoCrossLinks } from "@/lib/seo/seoPages";
import { buildSeoContent } from "@/lib/seo/seoContent";

/**
 * /[seoSlug] — the programmatic SEO landing pages: one per category, tag/
 * skill, employment type, and experience level that currently has active
 * jobs (see lib/seo/seoPages.js for how that list is generated). E.g.
 * /remote-python-jobs, /remote-software-engineering-jobs,
 * /full-time-remote-jobs, /senior-remote-jobs.
 *
 * A single root-level `[seoSlug]` segment is safe alongside the existing
 * static top-level routes (/about, /contact, /jobs, /privacy-policy):
 * Next.js always matches a static segment before falling back to a
 * dynamic one at the same level, so none of those routes are shadowed by
 * this one, and this route never sees requests for them.
 *
 * `seoSlug` is validated against the live registry (built from
 * /api/categories, /api/tags, and the app's fixed employment-type/
 * experience-level enums — never a hardcoded list) rather than trusted
 * as-is: an unknown slug 404s instead of silently rendering an empty
 * page, same rule the category/country/company landing pages already
 * follow (see app/jobs/category/[slug]/page.js).
 *
 * Reuses JobsLandingPage (shared with the category/country/company
 * pages) for layout, breadcrumb/CollectionPage schema, search, sort,
 * pagination, and the ItemList/JobPosting schema + results grid (via
 * JobsResults) — nothing about the existing architecture is duplicated
 * or reimplemented here, only the SEO-specific data (which dimension is
 * locked, what copy/metadata to show, which pages to cross-link).
 */

async function resolveSeoDef(slug) {
  const defs = await getSeoPageDefs();
  return { defs, def: defs.find((entry) => entry.slug === slug) };
}

/** Builds the locked filter state + basePath/omit for one resolved def, reusing the same URL machinery every other landing page uses (see lib/jobs/searchParams.js). */
function buildFiltersForDef(def, rawParams) {
  const filterKey = seoDefFilterKey(def);
  const filters = { ...parseJobsSearchParams(rawParams), [filterKey]: [def.value] };
  return { filters, filterKey, basePath: `/${def.slug}` };
}

/** True when filtering beyond "being on this SEO page" is active — those variants are real pages, but not worth indexing on their own (same rule as the category/country/company pages). */
function hasExtraFiltering(filters, filterKey) {
  return hasActiveJobFilters({ ...filters, [filterKey]: [] });
}

/**
 * Live job count for this def. Categories/skills already carry a `count`
 * from their taxonomy endpoint (zero extra requests); employment-type and
 * experience-level defs don't have a dedicated count endpoint, so those
 * fall back to a single `getJobs` call — which Next.js's fetch
 * memoization dedupes against the identical call `generateMetadata` and
 * the page body both make per request, so this is still exactly one
 * network round trip, not two (see "avoid duplicate fetching").
 */
async function resolveCount(def, filters) {
  if (Number.isFinite(def.count)) return def.count;
  const result = await getJobs({ ...filters, page: 1 });
  return result.total;
}

export async function generateStaticParams() {
  const defs = await getSeoPageDefs();
  return defs.map((def) => ({ seoSlug: def.slug }));
}

export async function generateMetadata({ params, searchParams }) {
  const { seoSlug } = await params;
  const rawParams = await searchParams;

  const { def } = await resolveSeoDef(seoSlug);
  if (!def) return {};

  const { filters, filterKey, basePath } = buildFiltersForDef(def, rawParams);
  const canonicalPath = buildCanonicalPath(basePath, filters.page);
  const isExtraFiltered = hasExtraFiltering(filters, filterKey);

  const count = await resolveCount(def, filters);
  const content = buildSeoContent(def, { count });

  return {
    ...buildLandingMetadata({
      title: content.heading,
      description: content.metaDescription,
      canonicalPath,
      keywords: content.keywords,
    }),
    robots: isExtraFiltered ? { index: false, follow: true } : undefined,
  };
}

export default async function SeoLandingPage({ params, searchParams }) {
  const { seoSlug } = await params;
  const rawParams = await searchParams;

  const [{ defs, def }, categories, countries, companies, skills] = await Promise.all([
    resolveSeoDef(seoSlug),
    getCategories(),
    getCountries(),
    getCompanies(),
    getTags(),
  ]);

  if (!def) notFound();

  const { filters, filterKey, basePath } = buildFiltersForDef(def, rawParams);
  const count = await resolveCount(def, filters);
  const content = buildSeoContent(def, { count });
  const seoLinks = buildSeoCrossLinks(def, defs);

  // categories/skills' own "excludeCurrent" only needs to fire for the
  // two dimensions that actually appear in those two lists.
  const relatedType = def.dimension === "category" || def.dimension === "skill" ? def.dimension : undefined;

  return (
    <JobsLandingPage
      eyebrow={content.eyebrow}
      heading={content.heading}
      description={content.subheading}
      breadcrumbItems={[
        { name: "Home", path: "/" },
        { name: "Jobs", path: "/jobs" },
        { name: def.name, path: basePath },
      ]}
      filters={filters}
      basePath={basePath}
      omit={[filterKey]}
      categories={categories}
      countries={countries}
      companies={companies}
      skills={skills}
      seoLinks={seoLinks}
      relatedType={relatedType}
      relatedSlug={def.value}
    />
  );
}
