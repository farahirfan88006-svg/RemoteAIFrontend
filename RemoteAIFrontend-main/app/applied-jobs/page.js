"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import * as appliedJobsApi from "@/lib/api/appliedJobs";
import { SkeletonCardGrid } from "@/components/ui/Skeleton";
import StateBlock from "@/components/ui/StateBlock";
import PremiumBadge from "@/components/premium/PremiumBadge";
import styles from "./AppliedJobsPage.module.css";

const STATUS_LABELS = {
  applied: "Applied",
  interview: "Interview",
  assessment: "Assessment",
  offer: "Offer",
  rejected: "Rejected",
};

const STATUS_BADGE_CLASS = {
  applied: "badge",
  interview: "badge-success",
  assessment: "badge-success",
  offer: "badge-success",
  rejected: "badge-warning",
};

/**
 * /applied-jobs — every job the current user has marked as applied,
 * with editable application status (Applied/Interview/Assessment/
 * Offer/Rejected) and application date. Same page shape as
 * /saved-jobs (see that page's comment) and app/resumes/page.js
 * before it.
 *
 * Each row renders from the application record's own `jobSnapshot`
 * (captured at apply time — see backend models/AppliedJob.js) rather
 * than the full JobCard treatment: an application record is closer to
 * "a row I'm tracking" than "a listing I'm browsing", so a compact
 * table-style row fits the Dashboard's pipeline framing better here.
 */
export default function AppliedJobsPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [appliedJobs, setAppliedJobs] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [pendingId, setPendingId] = useState(null);

  const loadAppliedJobs = useCallback(async () => {
    try {
      const data = await appliedJobsApi.listAppliedJobs();
      setAppliedJobs(data);
    } catch (err) {
      setError(err.message || "Couldn't load your applications.");
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    loadAppliedJobs();
  }, [authLoading, user, router, loadAppliedJobs]);

  useEffect(() => {
    if (!successMessage) return;
    const timer = setTimeout(() => setSuccessMessage(""), 3000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  async function handleStatusChange(id, status) {
    setPendingId(id);
    setError("");
    try {
      const updated = await appliedJobsApi.updateApplicationStatus(id, { status });
      setAppliedJobs((prev) => prev.map((entry) => (entry._id === id ? updated : entry)));
      setSuccessMessage(`Status updated to ${STATUS_LABELS[status]}.`);
    } catch (err) {
      setError(err.message || "Couldn't update that application's status.");
    } finally {
      setPendingId(null);
    }
  }

  async function handleRemove(id) {
    if (!window.confirm("Remove this application? This can't be undone.")) return;
    setPendingId(id);
    setError("");
    try {
      await appliedJobsApi.deleteApplication(id);
      setAppliedJobs((prev) => prev.filter((entry) => entry._id !== id));
      setSuccessMessage("Application removed.");
    } catch (err) {
      setError(err.message || "Couldn't remove that application.");
    } finally {
      setPendingId(null);
    }
  }

  if (authLoading || !user) return null;

  return (
    <section className="section">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/dashboard">Dashboard</Link> / <span aria-current="page">Applied Jobs</span>
        </nav>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-md)" }}>
          <div>
            <span className="eyebrow">
              <span className="dot" />
              Applied Jobs
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", marginTop: "var(--space-sm)", flexWrap: "wrap" }}>
              <h1 style={{ margin: 0 }}>Your applications</h1>
              <PremiumBadge feature="appliedJobs" />
            </div>
          </div>
          <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}>
            <Link href="/saved-jobs" className="btn btn-secondary">
              View saved jobs
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

        {appliedJobs === null ? (
          <div style={{ marginTop: "var(--space-lg)" }}>
            <SkeletonCardGrid count={4} />
          </div>
        ) : appliedJobs.length === 0 ? (
          <div style={{ marginTop: "var(--space-lg)" }}>
            <StateBlock
              icon="📬"
              title="No applications tracked yet"
              description="Mark a job as applied from its listing, or from your Saved Jobs page, to start tracking it here."
              action={
                <Link href="/saved-jobs" className="btn btn-primary" style={{ marginTop: "var(--space-sm)" }}>
                  Go to saved jobs
                </Link>
              }
            />
          </div>
        ) : (
          <ul className={styles.list}>
            {appliedJobs.map((entry) => {
              const snapshot = entry.jobSnapshot || {};
              const isPending = pendingId === entry._id;
              return (
                <li key={entry._id} className="card">
                  <div className={styles.row}>
                    <div className={styles.main}>
                      <div className={styles.titleRow}>
                        <h3 style={{ margin: 0 }}>{snapshot.title || "Untitled role"}</h3>
                        <span className={STATUS_BADGE_CLASS[entry.status] === "badge" ? "badge" : `badge ${STATUS_BADGE_CLASS[entry.status]}`}>
                          {STATUS_LABELS[entry.status] || entry.status}
                        </span>
                      </div>
                      {snapshot.companyName && <p className={styles.company}>{snapshot.companyName}</p>}
                      <p className={styles.appliedDate}>
                        Applied {new Date(entry.appliedDate || entry.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className={styles.actions}>
                      <label className={styles.statusLabel}>
                        Status
                        <select
                          value={entry.status}
                          disabled={isPending}
                          onChange={(e) => handleStatusChange(entry._id, e.target.value)}
                        >
                          {Object.entries(STATUS_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </label>

                      <div className={styles.buttonRow}>
                        {snapshot.slug && (
                          <Link href={`/jobs/${snapshot.slug}`} className="btn btn-secondary">
                            View job
                          </Link>
                        )}
                        <button
                          type="button"
                          className="btn btn-ghost"
                          disabled={isPending}
                          onClick={() => handleRemove(entry._id)}
                          style={{ color: "crimson" }}
                        >
                          {isPending ? "Working…" : "Remove"}
                        </button>
                      </div>
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
