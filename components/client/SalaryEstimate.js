"use client";

import { useEffect, useState } from "react";
import { getSalaryEstimate } from "@/lib/api/jobs";

function formatCurrency(amount, currency) {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: currency || "USD", maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `${currency || "USD"} ${amount.toLocaleString()}`;
  }
}

/**
 * Fetches GET /api/jobs/:slug/salary-estimate. The backend already
 * decides real-vs-estimated (see ai/salaryEstimator.js) — this component
 * just renders whichever it gets back, and always shows the "Estimated"
 * badge when `isEstimated` is true, per the ticket's "clearly indicate
 * estimated values".
 */
export default function SalaryEstimate({ jobSlug }) {
  const [estimate, setEstimate] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getSalaryEstimate(jobSlug)
      .then((data) => !cancelled && setEstimate(data))
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, [jobSlug]);

  if (error) return null;

  return (
    <div id="salary-estimate" className="card" style={{ padding: "var(--space-lg)", scrollMarginTop: "calc(var(--nav-height) + 1rem)" }}>
      <h3 style={{ marginTop: 0 }}>
        Salary {estimate?.isEstimated ? "Estimate" : ""}
        {estimate?.isEstimated && (
          <span className="tag" style={{ marginLeft: "0.5rem", fontSize: "0.7em", verticalAlign: "middle" }}>
            Estimated
          </span>
        )}
      </h3>

      {!estimate ? (
        <p style={{ color: "var(--color-text-muted, #666)" }}>Loading…</p>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between", textAlign: "center", gap: "0.5rem" }}>
          <div>
            <div style={{ fontSize: "0.75em", color: "var(--color-text-muted, #666)" }}>Min</div>
            <div style={{ fontWeight: 600 }}>{formatCurrency(estimate.min, estimate.currency)}</div>
          </div>
          <div>
            <div style={{ fontSize: "0.75em", color: "var(--color-text-muted, #666)" }}>Average</div>
            <div style={{ fontWeight: 700, fontSize: "1.1em" }}>{formatCurrency(estimate.average, estimate.currency)}</div>
          </div>
          <div>
            <div style={{ fontSize: "0.75em", color: "var(--color-text-muted, #666)" }}>Max</div>
            <div style={{ fontWeight: 600 }}>{formatCurrency(estimate.max, estimate.currency)}</div>
          </div>
        </div>
      )}

      {estimate?.isEstimated && (
        <p style={{ marginTop: "var(--space-sm)", fontSize: "0.8em", color: "var(--color-text-muted, #666)" }}>
          This job doesn&apos;t list a salary, so this is an automated estimate based on role, location, and experience level — not confirmed compensation data.
        </p>
      )}
    </div>
  );
}
