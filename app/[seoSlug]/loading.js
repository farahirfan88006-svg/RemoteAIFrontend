import JobsLoadingSkeleton from "@/components/server/JobsLoadingSkeleton";

/**
 * Route-level loading UI for the programmatic SEO pages, mirroring
 * app/jobs/category/[slug]/loading.js — shown while the server render
 * (slug resolution against the SEO registry + jobs fetch) is in flight.
 */
export default function Loading() {
  return <JobsLoadingSkeleton />;
}
