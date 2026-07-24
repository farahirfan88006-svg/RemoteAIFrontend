"use client";

import { useEffect } from "react";
import JobsErrorState from "@/components/server/JobsErrorState";

/**
 * Route-level error boundary for this landing page, mirroring
 * app/jobs/error.js. Catches unexpected render/runtime errors; the
 * expected "API request failed" case is instead handled gracefully inline
 * (see lib/api/jobs.js + JobsErrorState), so this is a defensive fallback.
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    // eslint-disable-next-line no-console -- surfaced for local/prod diagnostics until real error reporting is wired up
    console.error(error);
  }, [error]);

  return (
    <div className="container">
      <div style={{ paddingBlock: "var(--space-2xl)" }}>
        <JobsErrorState onRetry={reset} />
      </div>
    </div>
  );
}
