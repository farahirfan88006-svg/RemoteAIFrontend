import { Suspense } from "react";
import JsonLd from "@/components/server/JsonLd";
import JobsResults from "@/components/server/JobsResults";
import JobsLoadingSkeleton from "@/components/server/JobsLoadingSkeleton";
import JobsSearchBar from "@/components/client/JobsSearchBar";
import JobsSortDropdown from "@/components/client/JobsSortDropdown";
import JobsFilterSidebar from "@/components/client/JobsFilterSidebar";
import { siteConfig } from "@/lib/seo/siteConfig";
import { buildBreadcrumbSchema } from "@/lib/seo/schemas";
import { parseJobsSearchParams, hasActiveJobFilters } from "@/lib/jobs/searchParams";
import { getCategories, getCountries } from "@/lib/api/taxonomy";
import styles from "./page.module.css";

/**
 * Dynamic metadata for /jobs, built from the same parsed filter state the
 * page renders with. Search/filter permutations are deliberately not
 * indexed (see `robots` below) to avoid thin, near-duplicate pages; the
 * canonical listing (and its numbered pages) is what should surface in
 * search results.
 */
export async function generateMetadata({ searchParams }) {
  const rawParams = await searchParams;
  const filters = parseJobsSearchParams(rawParams);
  const isFiltered = hasActiveJobFilters(filters);

  const title = filters.q ? `"${filters.q}" remote jobs` : "Remote Jobs";
  const description = filters.q
    ? `Browse remote jobs matching "${filters.q}" on ${siteConfig.name}.`
    : "Browse curated remote jobs across engineering, design, product, and more. Filter by category, experience, location, and salary.";

  const canonicalPath = filters.page > 1 ? `/jobs?page=${filters.page}` : "/jobs";

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    robots: isFiltered ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}${canonicalPath}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
    },
  };
}

export default async function JobsPage({ searchParams }) {
  const rawParams = await searchParams;
  const filters = parseJobsSearchParams(rawParams);

  // Loaded once per request here (cached server-side by Next's fetch cache
  // — see lib/api/taxonomy.js) and handed to the sidebar as props, rather
  // than each dropdown fetching its own options — see
  // JobsFilterSidebar.js and lib/api/taxonomy.js for the full rationale.
  const [categories, countries] = await Promise.all([getCategories(), getCountries()]);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <section className={styles.hero}>
        <div className="container">
          <span className="eyebrow">
            <span className="dot dot--pulse" />
            {siteConfig.name} jobs
          </span>
          <h1 className={styles.heading}>Remote jobs, matched by AI</h1>
          <p className={styles.subheading}>
            Search and filter remote-first roles from companies that hire distributed
            teams by default.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            <aside className={styles.sidebar} aria-label="Filter jobs">
              <JobsFilterSidebar filters={filters} categories={categories} countries={countries} />
            </aside>

            <div className={styles.main}>
              <div className={styles.toolbar}>
                <JobsSearchBar filters={filters} />
                <JobsSortDropdown filters={filters} />
              </div>

              <Suspense key={JSON.stringify(filters)} fallback={<JobsLoadingSkeleton />}>
                <JobsResults filters={filters} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
