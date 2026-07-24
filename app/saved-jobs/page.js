"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import { useSavedJobs } from "@/lib/savedJobs/SavedJobsContext";
import * as savedJobsApi from "@/lib/api/savedJobs";
import * as appliedJobsApi from "@/lib/api/appliedJobs";
import { normalizeJob } from "@/lib/jobs/normalizeJob";
import JobCard from "@/components/server/JobCard";
import { SkeletonCardGrid } from "@/components/ui/Skeleton";
import StateBlock from "@/components/ui/StateBlock";
import PremiumBadge from "@/components/premium/PremiumBadge";
import styles from "./SavedJobsPage.module.css";

/**
 * /saved-jobs — every job the current user has bookmarked.
 *
 * Follows the same shape as app/resumes/page.js (auth-gated client
 * page, load-on-mount, explicit loading/empty/error states) rather
 * than introducing a different dashboard-page pattern. Each entry
 * renders through the same JobCard used on /jobs and the job detail
 * page — `jobSnapshot` (captured at save time; see backend
 * models/SavedJob.js) is normalized the same way a live API job
 * record would be, so a saved job looks identical whether or not the
 * original listing is still active.
 */
export default function SavedJobsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { refresh: refreshSavedJobIds } = useSavedJobs();
  const router = useRouter();

  const [savedJobs, setSavedJobs] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [pendingJobId, setPendingJobId] = useState(null);

  const loadSavedJobs = useCallback(async () => {
    try {
      const data = await savedJobsApi.listSavedJobs();
      setSavedJobs(data);
    } catch (err) {
      setError(err.message || "Couldn't load your saved jobs.");
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    loadSavedJobs();
  }, [authLoading, user, router, loadSavedJobs]);

  // Transient success messages auto-clear rather than sticking around.
  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  async function handleRemove(jobId) {
    setPendingJobId(jobId);
    setError("");
    try {
      await savedJobsApi.unsaveJob(jobId);
      setSavedJobs((prev) => prev.filter((entry) => entry.job !== jobId));
      setSuccessMessage("Removed from saved jobs.");
      // Keep every other job card's ★ Saved state in sync app-wide.
      refreshSavedJobIds();
    } catch (err) {
      setError(err.message || "Couldn't remove that job. Try again.");
    } finally {
      setPendingJobId(null);
    }
  }

  async function handleMarkApplied(jobId) {
    setPendingJobId(jobId);
    setError("");
    try {
      await appliedJobsApi.applyToJob(jobId);
      setSuccessMessage("Marked as applied — see it on your Applied Jobs page.");
    } catch (err) {
      setError(err.message || "Couldn't mark that job as applied. Try again.");
    } finally {
      setPendingJobId(null);
    }
  }

  if (authLoading || !user) return null;

  return (
    <section className="section">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/dashboard">Dashboard</Link> / <span aria-current="page">Saved Jobs</span>
        </nav>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-md)" }}>
          <div>
            <span className="eyebrow">
              <span className="dot" />
              Saved Jobs
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", marginTop: "var(--space-sm)", flexWrap: "wrap" }}>
              <h1 style={{ margin: 0 }}>Your saved jobs</h1>
              <PremiumBadge feature="savedJobs" />
            </div>
          </div>
          <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}>
            <Link href="/applied-jobs" className="btn btn-secondary">
              View applied jobs
            </Link>
            <Link href="/jobs" className="btn btn-primary">
              Browse more jobs
            </Link>
          </div>
        </div>

        {successMessage && (
          <div className={styles.successBanner} role="status">
            ✓ {successMessage}
          </div>
        )}

        {error && (
          <StateBlock variant="error" icon="⚠️" title="Something went wrong" description={error} />
        )}

        {savedJobs === null ? (
          <div style={{ marginTop: "var(--space-lg)" }}>
            <SkeletonCardGrid count={4} />
          </div>
        ) : savedJobs.length === 0 ? (
          <div style={{ marginTop: "var(--space-lg)" }}>
            <StateBlock
              icon="⭐"
              title="No saved jobs yet"
              description="Bookmark listings from the jobs board to keep track of roles you're interested in."
              action={
                <Link href="/jobs" className="btn btn-primary" style={{ marginTop: "var(--space-sm)" }}>
                  Browse jobs
                </Link>
              }
            />
          </div>
        ) : (
          <ul className={styles.grid}>
            {savedJobs.map((entry) => {
              const job = normalizeJob({ ...entry.jobSnapshot, id: entry.job });
              const isPending = pendingJobId === entry.job;
              return (
                <li key={entry._id} className={styles.item}>
                  <JobCard job={job} />
                  <div className={styles.itemActions}>
                    <span className={styles.savedAt}>
                      Saved {new Date(entry.createdAt).toLocaleDateString()}
                    </span>
                    <div className={styles.itemButtons}>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        disabled={isPending}
                        onClick={() => handleMarkApplied(entry.job)}
                      >
                        {isPending ? "Working…" : "Mark as Applied"}
                      </button>
                      <button
                        type="button"
                        className="btn btn-ghost"
                        disabled={isPending}
                        onClick={() => handleRemove(entry.job)}
                        style={{ color: "crimson" }}
                      >
                        {isPending ? "Removing…" : "Remove"}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
