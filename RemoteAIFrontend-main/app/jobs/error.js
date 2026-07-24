"use client";

import { useEffect } from "react";
import JobsErrorState from "@/components/server/JobsErrorState";

/**
 * Route-level error boundary for /jobs, required by Next.js to be a Client
 * Component. This catches unexpected render/runtime errors; the expected,
 * graceful "API request failed" case is instead handled inline by
 * lib/api/jobs.js + components/server/JobsErrorState (no error thrown), so
 * this boundary is a defensive fallback rather than the primary error path.
 */
export default function JobsError({ error, reset }) {
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
