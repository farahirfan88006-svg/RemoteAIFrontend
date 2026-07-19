import JobsLoadingSkeleton from "@/components/server/JobsLoadingSkeleton";

/**
 * Route-level loading UI for this landing page, mirroring app/jobs/loading.js
 * — shown while the server render (slug resolution + jobs fetch) is in
 * flight on navigation.
 */
export default function Loading() {
  return <JobsLoadingSkeleton />;
}
