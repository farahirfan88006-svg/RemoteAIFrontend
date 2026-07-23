"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";

/**
 * Root route-level error boundary — Next.js App Router convention.
 * Additive file: before this, any unexpected render/runtime error on a
 * route with no closer error.js of its own (everything except /jobs and
 * /[seoSlug], which already have theirs) fell through to Next's bare
 * default error screen instead of the site's own UI. This still renders
 * inside the root layout (Navbar/Footer stay in place), matching the
 * same pattern as app/jobs/error.js.
 */
export default function RootError({ error, reset }) {
  useEffect(() => {
    // eslint-disable-next-line no-console -- surfaced for local/prod diagnostics until real error reporting is wired up
    console.error(error);
  }, [error]);

  return (
    <section className="section">
      <div className="container">
        <div style={{ paddingBlock: "var(--space-2xl)", textAlign: "center" }}>
          <span className="eyebrow">
            <span className="dot" />
            Error
          </span>
          <h1 style={{ marginTop: "var(--space-sm)" }}>Something went wrong</h1>
          <p style={{ marginBlock: "var(--space-md)" }}>
            An unexpected error occurred while loading this page. You can try again, or head
            back to the homepage.
          </p>
          <div style={{ display: "flex", gap: "var(--space-sm)", justifyContent: "center", flexWrap: "wrap" }}>
            <Button onClick={reset}>Try again</Button>
            <Button href="/" variant="secondary">
              Go home
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
