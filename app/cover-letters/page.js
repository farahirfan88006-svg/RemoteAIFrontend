"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import * as coverLettersApi from "@/lib/api/coverLetters";

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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-md)" }}>
          <div>
            <span className="eyebrow">
              <span className="dot" />
              Cover Letters
            </span>
            <h1 style={{ marginTop: "var(--space-sm)" }}>Your cover letters</h1>
          </div>
          <Link href="/cover-letters/new" className="btn btn-primary">
            + New cover letter
          </Link>
        </div>

        {error && <p style={{ color: "crimson", marginTop: "var(--space-md)" }}>{error}</p>}

        {letters === null ? (
          <p style={{ marginTop: "var(--space-lg)" }}>Loading…</p>
        ) : letters.length === 0 ? (
          <div className="card" style={{ marginTop: "var(--space-lg)", padding: "var(--space-lg)" }}>
            <p>No cover letters yet.</p>
            <Link href="/cover-letters/new" className="btn btn-primary" style={{ marginTop: "var(--space-sm)", display: "inline-block" }}>
              Create your first cover letter
            </Link>
          </div>
        ) : (
          <div style={{ marginTop: "var(--space-lg)", display: "grid", gap: "var(--space-md)", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {letters.map((letter) => (
              <div key={letter._id} className="card" style={{ padding: "var(--space-md)" }}>
                <h3 style={{ margin: 0 }}>{letter.title}</h3>
                {letter.job?.companyName && <p style={{ fontSize: "0.85em", color: "var(--color-text-muted, #666)" }}>{letter.job.companyName}</p>}
                <p style={{ fontSize: "0.8em", color: "var(--color-text-muted, #666)" }}>Updated {new Date(letter.updatedAt).toLocaleDateString()}</p>
                <div style={{ marginTop: "var(--space-sm)", display: "flex", gap: "0.5rem" }}>
                  <Link href={`/cover-letters/${letter._id}`} className="btn btn-primary">
                    Edit
                  </Link>
                  <button type="button" className="btn btn-ghost" style={{ color: "crimson" }} onClick={() => handleDelete(letter._id)}>
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
