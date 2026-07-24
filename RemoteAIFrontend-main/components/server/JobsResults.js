import { getJobs } from "@/lib/api/jobs";
import { buildJobsItemListSchema } from "@/lib/seo/schemas";
import { hasActiveJobFilters } from "@/lib/jobs/searchParams";
import JsonLd from "./JsonLd";
import JobsGrid from "./JobsGrid";
import JobsPagination from "./JobsPagination";
import JobsEmptyState from "./JobsEmptyState";
import JobsErrorState from "./JobsErrorState";
import styles from "./JobsResults.module.css";

/**
 * Async Server Component that owns the actual `getJobs` call. Split out
 * from app/jobs/page.js so the page shell (search bar, filters, sort) can
 * render immediately while this piece streams in behind a <Suspense>
 * boundary (see app/jobs/page.js), using JobsLoadingSkeleton as fallback.
 *
 * Also reused by the category/country/company landing pages
 * (app/jobs/category|country|company/[slug]/page.js) — `filters` there
 * already includes the locked dimension (e.g. `category: [slug]`) so the
 * exact same `getJobs` call scopes results correctly, and `basePath`/`omit`
 * keep pagination links on that page's own canonical path instead of
 * `/jobs?...` — see buildJobsHref in lib/jobs/searchParams.js.
 *
 * @param {{ filters: object, basePath?: string, omit?: string[] }} props
 */
export default async function JobsResults({ filters, basePath = "/jobs", omit = [] }) {
  const result = await getJobs(filters);

  if (result.requestFailed) {
    return <JobsErrorState />;
  }

  if (result.jobs.length === 0) {
    return <JobsEmptyState notConnected={!result.connected} hasFilters={hasActiveJobFilters(filters)} />;
  }

  const itemListSchema = buildJobsItemListSchema(result.jobs, {
    path: basePath,
    startPosition: (result.page - 1) * result.pageSize + 1,
  });

  return (
    <>
      <JsonLd data={itemListSchema} />
      <p className={styles.count}>
        {result.total.toLocaleString()} {result.total === 1 ? "role" : "roles"} found
      </p>
      <JobsGrid jobs={result.jobs} />
      <JobsPagination filters={filters} totalPages={result.totalPages} basePath={basePath} omit={omit} />
    </>
  );
}
