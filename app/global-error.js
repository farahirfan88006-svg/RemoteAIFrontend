"use client";

import { useEffect } from "react";

/**
 * Global error boundary — Next.js App Router convention. Only fires if
 * the root layout itself (app/layout.js) throws, which app/error.js
 * can't catch since it renders inside that layout. Per Next.js's
 * requirement, this file must render its own <html>/<body> since the
 * root layout is unavailable when this is shown. Kept intentionally
 * plain/dependency-free (no design-system CSS, no shared components)
 * since it has to work even if the failure is layout-level.
 */
export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // eslint-disable-next-line no-console -- surfaced for local/prod diagnostics until real error reporting is wired up
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          background: "#0e1116",
          color: "#edeff3",
          padding: "1.5rem",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "28rem" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Something went wrong</h1>
          <p style={{ color: "#99a1b3", marginBottom: "1.5rem" }}>
            The application hit an unexpected error. Please try again.
          </p>
          <button
            onClick={reset}
            style={{
              background: "#7c9eff",
              color: "#0e1116",
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.625rem 1.25rem",
              fontSize: "0.9375rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
