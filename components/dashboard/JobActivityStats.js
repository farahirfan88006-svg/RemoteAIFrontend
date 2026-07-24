"use client";

import { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import { useSavedJobs } from "@/lib/savedJobs/SavedJobsContext";
import { listAppliedJobs } from "@/lib/api/appliedJobs";
import styles from "./DashboardStats.module.css";

/**
 * "Job activity" — Total Saved Jobs, Total Applied Jobs, Interviews,
 * and Offers, per the Phase 6 spec's Dashboard Integration requirement.
 * Reuses DashboardStats.module.css's dt/dd grid styling rather than
 * introducing a second stat-grid layout.
 *
 * Saved count comes from SavedJobsContext (already loaded app-wide for
 * job-card saved state, so no extra request here). Applied counts are
 * fetched locally since nothing else on the page needs the full
 * applied-jobs list — this card owns its own loading/error state
 * rather than blocking the rest of the dashboard on it.
 */
export default function JobActivityStats() {
  const { count: savedCount, isLoading: savedLoading } = useSavedJobs();
  const [appliedJobs, setAppliedJobs] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    listAppliedJobs()
      .then((data) => {
        if (!cancelled) setAppliedJobs(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Couldn't load application stats.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const appliedLoading = appliedJobs === null && !error;
  const totalApplied = appliedJobs?.length ?? 0;
  const interviews = appliedJobs?.filter((entry) => entry.status === "interview").length ?? 0;
  const offers = appliedJobs?.filter((entry) => entry.status === "offer").length ?? 0;

  const stats = [
    { label: "Saved Jobs", value: savedLoading ? "…" : savedCount },
    { label: "Applied Jobs", value: appliedLoading ? "…" : totalApplied },
    { label: "Interviews", value: appliedLoading ? "…" : interviews },
    { label: "Offers", value: appliedLoading ? "…" : offers },
  ];

  return (
    <DashboardCard icon="📌" title="Job activity">
      <dl className={styles.grid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.item}>
            <dt className={styles.label}>{stat.label}</dt>
            <dd className={styles.value}>{stat.value}</dd>
          </div>
        ))}
      </dl>
      {error && (
        <p style={{ color: "crimson", fontSize: "var(--fs-xs)", marginTop: "var(--space-sm)" }}>{error}</p>
      )}
    </DashboardCard>
  );
}
