import { notFound } from "next/navigation";
import JobsLandingPage, { buildCanonicalPath, buildLandingMetadata } from "@/components/server/JobsLandingPage";
import { parseJobsSearchParams, hasActiveJobFilters } from "@/lib/jobs/searchParams";
import { getCategories, getCountries, findTaxonomyBySlug } from "@/lib/api/taxonomy";
import { getCompanies } from "@/lib/api/companies";
import { siteConfig } from "@/lib/seo/siteConfig";

/**
 * /jobs/category/[slug] — e.g. /jobs/category/software-engineering,
 * /jobs/category/data-and-ai.
 *
 * `slug` is validated against the live category list (see
 * lib/api/taxonomy.js, backed by GET /api/categories — unmodified) rather
 * than trusted as-is: an unknown slug 404s instead of silently rendering
 * an empty "0 jobs" page, since that would otherwise be indexable,
 * thin-content, duplicate-of-nothing SEO noise.
 */

const BASE_PATH_PREFIX = "/jobs/category";

async function resolveCategory(slug) {
  const categories = await getCategories();
  const category = findTaxonomyBySlug(categories, slug);
  return { categories, category };
}

/** True when the person has added filtering beyond just "being on this category page" (search text, etc.) — those variants are real pages, but not ones worth indexing on their own. */
function hasExtraFiltering(filters) {
  return hasActiveJobFilters({ ...filters, category: [] });
}

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const rawParams = await searchParams;
  const filters = parseJobsSearchParams(rawParams);

  const { category } = await resolveCategory(slug);
  if (!category) return {};

  const basePath = `${BASE_PATH_PREFIX}/${slug}`;
  const canonicalPath = buildCanonicalPath(basePath, filters.page);
  const isExtraFiltered = hasExtraFiltering(filters);

  const title = `${category.name} Remote Jobs`;
  const description = `Browse ${category.count.toLocaleString()} remote ${category.name} job${category.count === 1 ? "" : "s"} on ${siteConfig.name}. Updated continuously from remote-first companies hiring now.`;

  return {
    ...buildLandingMetadata({
      title,
      description,
      canonicalPath,
      keywords: [
        `${category.name} jobs`,
        `${category.name} remote jobs`,
        "remote jobs",
        `remote ${category.name.toLowerCase()} careers`,
        siteConfig.name,
      ],
    }),
    robots: isExtraFiltered ? { index: false, follow: true } : undefined,
  };
}

export default async function CategoryJobsPage({ params, searchParams }) {
  const { slug } = await params;
  const rawParams = await searchParams;
  const filters = parseJobsSearchParams(rawParams);

  const [{ categories, category }, countries, companies] = await Promise.all([
    resolveCategory(slug),
    getCountries(),
    getCompanies(),
  ]);

  if (!category) notFound();

  const basePath = `${BASE_PATH_PREFIX}/${slug}`;
  const queryFilters = { ...filters, category: [category.slug] };

  return (
    <JobsLandingPage
      eyebrow={`${category.count.toLocaleString()} open roles`}
      heading={`${category.name} Remote Jobs`}
      description={`Every remote ${category.name} role currently open on ${siteConfig.name}, sourced continuously from remote-first companies. Search within this category or explore related roles below.`}
      breadcrumbItems={[
        { name: "Home", path: "/" },
        { name: "Jobs", path: "/jobs" },
        { name: category.name, path: basePath },
      ]}
      filters={queryFilters}
      basePath={basePath}
      omit={["category"]}
      categories={categories}
      countries={countries}
      companies={companies}
      relatedType="category"
      relatedSlug={category.slug}
    />
  );
}
