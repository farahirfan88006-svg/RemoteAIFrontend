import { notFound } from "next/navigation";
import JobsLandingPage, { buildCanonicalPath, buildLandingMetadata } from "@/components/server/JobsLandingPage";
import { parseJobsSearchParams, hasActiveJobFilters } from "@/lib/jobs/searchParams";
import { getCategories, getCountries } from "@/lib/api/taxonomy";
import { getCompanies, findCompanyBySlug } from "@/lib/api/companies";
import { siteConfig } from "@/lib/seo/siteConfig";

/**
 * /jobs/company/[slug] — e.g. /jobs/company/google, /jobs/company/airbnb.
 *
 * `slug` is validated against the live company list (see
 * lib/api/companies.js, backed by the existing GET /api/companies —
 * unmodified); an unknown slug 404s.
 *
 * The `company` filter matches Job.companyName by its exact string (Job
 * has no stable slug field — see backend services/jobQuery.service.js),
 * so this page passes `company.name`, not the URL slug, into
 * `filters.company`.
 */

const BASE_PATH_PREFIX = "/jobs/company";

async function resolveCompany(slug) {
  const companies = await getCompanies();
  const company = findCompanyBySlug(companies, slug);
  return { companies, company };
}

function hasExtraFiltering(filters) {
  return hasActiveJobFilters({ ...filters, company: [] });
}

export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const rawParams = await searchParams;
  const filters = parseJobsSearchParams(rawParams);

  const { company } = await resolveCompany(slug);
  if (!company) return {};

  const basePath = `${BASE_PATH_PREFIX}/${slug}`;
  const canonicalPath = buildCanonicalPath(basePath, filters.page);
  const isExtraFiltered = hasExtraFiltering(filters);

  const title = `Remote Jobs at ${company.name}`;
  const description = `Browse ${company.count.toLocaleString()} open remote job${company.count === 1 ? "" : "s"} at ${company.name} on ${siteConfig.name}. Updated continuously as ${company.name} posts new roles.`;

  return {
    ...buildLandingMetadata({
      title,
      description,
      canonicalPath,
      keywords: [
        `${company.name} jobs`,
        `${company.name} careers`,
        `remote jobs at ${company.name}`,
        `work at ${company.name}`,
        "remote jobs",
      ],
    }),
    robots: isExtraFiltered ? { index: false, follow: true } : undefined,
  };
}

export default async function CompanyJobsPage({ params, searchParams }) {
  const { slug } = await params;
  const rawParams = await searchParams;
  const filters = parseJobsSearchParams(rawParams);

  const [{ companies, company }, categories, countries] = await Promise.all([
    resolveCompany(slug),
    getCategories(),
    getCountries(),
  ]);

  if (!company) notFound();

  const basePath = `${BASE_PATH_PREFIX}/${slug}`;
  const queryFilters = { ...filters, company: [company.name] };

  return (
    <JobsLandingPage
      eyebrow={`${company.count.toLocaleString()} open roles`}
      heading={`Remote Jobs at ${company.name}`}
      description={`Every open remote role at ${company.name} currently listed on ${siteConfig.name}. Search within ${company.name}'s open roles or explore related companies below.`}
      breadcrumbItems={[
        { name: "Home", path: "/" },
        { name: "Jobs", path: "/jobs" },
        { name: company.name, path: basePath },
      ]}
      filters={queryFilters}
      basePath={basePath}
      omit={["company"]}
      categories={categories}
      countries={countries}
      companies={companies}
      relatedType="company"
      relatedSlug={company.slug}
    />
  );
}
