"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import * as coverLettersApi from "@/lib/api/coverLetters";
import PremiumBadge from "@/components/premium/PremiumBadge";
import StateBlock from "@/components/ui/StateBlock";
import { SkeletonLine } from "@/components/ui/Skeleton";
import styles from "@/components/career/AITools.module.css";

export default function CoverLettersDashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [letters, setLetters] = useState(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setLetters(await coverLettersApi.listCoverLetters());
    } catch (err) {
      setError(err.message || "Couldn't load your cover letters.");
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    load();
  }, [authLoading, user, router, load]);

  async function handleDelete(id) {
    if (!window.confirm("Delete this cover letter?")) return;
    try {
      await coverLettersApi.deleteCoverLetter(id);
      await load();
    } catch (err) {
      setError(err.message || "Couldn't delete that letter.");
    }
  }

  if (authLoading || !user) return null;

  return (
    <section className="section">
      <div className="container">
        <div className={styles.hero}>
          <div className={styles.heroInner}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-md)" }}>
              <div>
                <span className="eyebrow">
                  <span className="dot dot--pulse" />
                  Cover Letters
                </span>
                <div className={styles.heroTitleRow}>
                  <h1>Your cover letters</h1>
                  <PremiumBadge feature="coverLetter" />
                </div>
                <p className={styles.heroDescription}>
                  Generate, edit, and download AI-tailored cover letters for every application.
                </p>
              </div>
              <Link href="/cover-letters/new" className="btn btn-primary btn-lg">
                + New cover letter
              </Link>
            </div>
          </div>
        </div>

        {error && (
          <p className={styles.errorText} role="alert">
            <span aria-hidden="true">⚠</span> {error}
          </p>
        )}

        {letters === null ? (
          <div className={styles.historyGrid}>
            {[0, 1, 2].map((i) => (
              <div key={i} className="card" style={{ padding: "var(--space-md)" }}>
                <SkeletonLine width="65%" height="1.1rem" />
                <SkeletonLine width="40%" />
                <SkeletonLine width="50%" />
              </div>
            ))}
          </div>
        ) : letters.length === 0 ? (
          <StateBlock
            icon="✉️"
            title="No cover letters yet"
            description="Generate your first AI-tailored cover letter from one of your resumes."
            action={
              <Link href="/cover-letters/new" className="btn btn-primary" style={{ marginTop: "var(--space-sm)" }}>
                Create your first cover letter
              </Link>
            }
          />
        ) : (
          <div className={styles.historyGrid}>
            {letters.map((letter) => (
              <div key={letter._id} className={styles.resultCard}>
                <h3 style={{ margin: 0 }}>{letter.title}</h3>
                {letter.job?.companyName && <p className={styles.mutedNote} style={{ marginTop: "var(--space-3xs)" }}>{letter.job.companyName}</p>}
                <p className={styles.historyRowMeta} style={{ marginTop: "var(--space-2xs)" }}>
                  Updated {new Date(letter.updatedAt).toLocaleDateString()}
                </p>
                <div className={styles.actions} style={{ marginTop: "var(--space-sm)" }}>
                  <Link href={`/cover-letters/${letter._id}`} className="btn btn-primary">
                    Edit
                  </Link>
                  <button type="button" className="btn btn-ghost" style={{ color: "var(--color-danger)" }} onClick={() => handleDelete(letter._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
