"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import * as coverLettersApi from "@/lib/api/coverLetters";
import PremiumBadge from "@/components/premium/PremiumBadge";
import StateBlock from "@/components/ui/StateBlock";
import { SkeletonCardGrid } from "@/components/ui/Skeleton";

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
        <div className="ai-toolbar" style={{ marginBottom: "var(--space-lg)" }}>
          <div>
            <span className="eyebrow">
              <span className="dot" />
              Cover Letters
            </span>
            <div className="ai-page-header__top" style={{ marginTop: "var(--space-sm)" }}>
              <h1 className="ai-page-header__title">Your cover letters</h1>
              <PremiumBadge feature="coverLetter" />
            </div>
          </div>
          <Link href="/cover-letters/new" className="btn btn-primary">
            + New cover letter
          </Link>
        </div>

        {error && (
          <p className="ai-error" role="alert">
            {error}
          </p>
        )}

        {letters === null ? (
          <SkeletonCardGrid count={3} />
        ) : letters.length === 0 ? (
          <StateBlock
            icon="✉️"
            title="No cover letters yet"
            description="Generate a cover letter based on your resume to get started."
            action={
              <Link href="/cover-letters/new" className="btn btn-primary">
                Create your first cover letter
              </Link>
            }
          />
        ) : (
          <div style={{ marginTop: "var(--space-lg)", display: "grid", gap: "var(--space-md)", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {letters.map((letter) => (
              <div key={letter._id} className="card" style={{ padding: "var(--space-md)" }}>
                <h3 style={{ margin: 0 }}>{letter.title}</h3>
                {letter.job?.companyName && <p style={{ fontSize: "0.85em", color: "var(--color-text-muted)" }}>{letter.job.companyName}</p>}
                <p style={{ fontSize: "0.8em", color: "var(--color-text-muted)" }}>Updated {new Date(letter.updatedAt).toLocaleDateString()}</p>
                <div style={{ marginTop: "var(--space-sm)", display: "flex", gap: "0.5rem" }}>
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
