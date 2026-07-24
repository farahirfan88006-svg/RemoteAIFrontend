import { notFound } from "next/navigation";
import JobsLandingPage, { buildCanonicalPath, buildLandingMetadata } from "@/components/server/JobsLandingPage";
import { parseJobsSearchParams, hasActiveJobFilters } from "@/lib/jobs/searchParams";
import { getCategories, getCountries, findTaxonomyBySlug } from "@/lib/api/taxonomy";
import { getCompanies } from "@/lib/api/companies";
import { siteConfig } from "@/lib/seo/siteConfig";

/**
 * /jobs/country/[slug] — e.g. /jobs/country/united-states,
 * /jobs/country/worldwide.
 *
 * `slug` is validated against the live country list (see
 * lib/api/taxonomy.js, backed by GET /api/countries — unmodified) rather
 * than trusted as-is; an unknown slug 404s.
 *
 * The `country` filter matches Job.country by its exact canonical *name*
 * (not slug — see backend utils/countryTaxonomy.js), so this page passes
 * `country.name`, not the URL slug, into `filters.country`.
 */

const BASE_PATH_PREFIX = "/jobs/country";

async function resolveCountry(slug) {
  const countries = await getCountries();
  const country = findTaxonomyBySlug(countries, slug);
  return { countries, country };
}

function hasExtraFiltering(filters) {
  return hasActiveJobFilters({ ...filters, country: [] });
}

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const rawParams = await searchParams;
  const filters = parseJobsSearchParams(rawParams);

  const { country } = await resolveCountry(slug);
  if (!country) return {};

  const basePath = `${BASE_PATH_PREFIX}/${slug}`;
  const canonicalPath = buildCanonicalPath(basePath, filters.page);
  const isExtraFiltered = hasExtraFiltering(filters);

  const title = `Remote Jobs in ${country.name}`;
  const description = `Browse ${country.count.toLocaleString()} remote job${country.count === 1 ? "" : "s"} open to candidates in ${country.name} on ${siteConfig.name}. Updated continuously from remote-first companies hiring now.`;

  return {
    ...buildLandingMetadata({
      title,
      description,
      canonicalPath,
      keywords: [
        `remote jobs in ${country.name}`,
        `${country.name} remote jobs`,
        `work from home ${country.name}`,
        "remote jobs",
        siteConfig.name,
      ],
    }),
    robots: isExtraFiltered ? { index: false, follow: true } : undefined,
  };
}

export default async function CountryJobsPage({ params, searchParams }) {
  const { slug } = await params;
  const rawParams = await searchParams;
  const filters = parseJobsSearchParams(rawParams);

  const [{ countries, country }, categories, companies] = await Promise.all([
    resolveCountry(slug),
    getCategories(),
    getCompanies(),
  ]);

  if (!country) notFound();

  const basePath = `${BASE_PATH_PREFIX}/${slug}`;
  const queryFilters = { ...filters, country: [country.name] };

  return (
    <JobsLandingPage
      eyebrow={`${country.count.toLocaleString()} open roles`}
      heading={`Remote Jobs in ${country.name}`}
      description={`Every remote role currently open to candidates in ${country.name} on ${siteConfig.name}, sourced continuously from remote-first companies. Search within this country or explore related roles below.`}
      breadcrumbItems={[
        { name: "Home", path: "/" },
        { name: "Jobs", path: "/jobs" },
        { name: country.name, path: basePath },
      ]}
      filters={queryFilters}
      basePath={basePath}
      omit={["country"]}
      categories={categories}
      countries={countries}
      companies={companies}
      relatedType="country"
      relatedSlug={country.slug}
    />
  );
}
