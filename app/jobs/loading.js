import JobsLoadingSkeleton from "@/components/server/JobsLoadingSkeleton";

/**
 * Next.js route-level loading UI — shown automatically while the /jobs
 * server render is in flight on navigation (e.g. clicking into /jobs from
 * elsewhere in the site). The in-page <Suspense> around JobsResults (see
 * app/jobs/page.js) handles the same fallback for filter/search/sort
 * changes once already on the page.
 */
export default function JobsLoading() {
  return <JobsLoadingSkeleton />;
}
