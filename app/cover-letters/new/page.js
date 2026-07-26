"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import * as resumesApi from "@/lib/api/resumes";
import * as coverLettersApi from "@/lib/api/coverLetters";
import styles from "@/components/career/AITools.module.css";

/** General Cover Letter mode (see ticket) — job-specific mode lives on the job page via GenerateCoverLetterButton, same generate endpoint underneath. */
export default function NewCoverLetterPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [resumes, setResumes] = useState(null);
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    resumesApi.listResumes().then((data) => {
      setResumes(data);
      const defaultResume = data.find((r) => r.isDefault) || data[0];
      if (defaultResume) setSelectedResumeId(defaultResume._id);
    });
  }, [authLoading, user, router]);

  async function handleGenerate() {
    if (!selectedResumeId) return;
    setIsGenerating(true);
    setError("");
    try {
      const letter = await coverLettersApi.generateCoverLetter({ resumeId: selectedResumeId });
      router.push(`/cover-letters/${letter._id}`);
    } catch (err) {
      setError(err.message || "Couldn't generate a cover letter.");
      setIsGenerating(false);
    }
  }

  if (authLoading || !user) return null;

  return (
    <section className="section">
      <div className="container">
        <div className={styles.hero}>
          <div className={styles.heroInner}>
            <span className="eyebrow">
              <span className="dot dot--pulse" />
              Cover Letters
            </span>
            <h1 style={{ marginTop: "var(--space-sm)" }}>Generate a general cover letter</h1>
            <p className={styles.heroDescription}>
              We&apos;ll write a professional cover letter based on your resume — you can edit it afterward.
            </p>
          </div>
        </div>

        {resumes === null ? (
          <div className={styles.loadingCard} style={{ marginTop: 0 }}>
            <div className={styles.loadingHeader}>
              <span className={styles.loadingSpinner} aria-hidden="true" />
              <span className={styles.loadingLabel}>Loading your resumes…</span>
            </div>
          </div>
        ) : resumes.length === 0 ? (
          <div className={styles.toolCard}>
            <p>You need a resume first — Cover Letter generation uses your resume&apos;s info.</p>
            <Link href="/resumes" className="btn btn-primary" style={{ marginTop: "var(--space-sm)", display: "inline-block" }}>
              Go to Resume Builder
            </Link>
          </div>
        ) : (
          <div className={styles.toolCard}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Which resume should we base it on?</span>
              <select className={styles.select} value={selectedResumeId} onChange={(e) => setSelectedResumeId(e.target.value)}>
                {resumes.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.title} {r.isDefault ? "(Default)" : ""}
                  </option>
                ))}
              </select>
            </label>

            {error && (
              <p className={styles.errorText} role="alert">
                <span aria-hidden="true">⚠</span> {error}
              </p>
            )}

            <div className={styles.actions}>
              <button type="button" className="btn btn-primary btn-lg" onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? "Generating…" : "Generate cover letter"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
