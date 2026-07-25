"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import * as resumesApi from "@/lib/api/resumes";
import * as coverLettersApi from "@/lib/api/coverLetters";

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
        <span className="eyebrow">
          <span className="dot" />
          Cover Letters
        </span>
        <h1 style={{ marginTop: "var(--space-sm)" }}>Generate a general cover letter</h1>
        <p>We&apos;ll write a professional cover letter based on your resume — you can edit it afterward.</p>

        {resumes === null ? (
          <p>Loading your resumes…</p>
        ) : resumes.length === 0 ? (
          <div className="card" style={{ padding: "var(--space-lg)", marginTop: "var(--space-md)" }}>
            <p>You need a resume first — Cover Letter generation uses your resume&apos;s info.</p>
            <a href="/resumes" className="btn btn-primary" style={{ marginTop: "var(--space-sm)", display: "inline-block" }}>
              Go to Resume Builder
            </a>
          </div>
        ) : (
          <div className="card" style={{ padding: "var(--space-lg)", marginTop: "var(--space-md)" }}>
            <label style={{ display: "grid", gap: "0.25rem" }}>
              <span style={{ fontSize: "0.85em" }}>Which resume should we base it on?</span>
              <select value={selectedResumeId} onChange={(e) => setSelectedResumeId(e.target.value)} style={{ padding: "0.5rem" }}>
                {resumes.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.title} {r.isDefault ? "(Default)" : ""}
                  </option>
                ))}
              </select>
            </label>

            {error && <p style={{ color: "crimson", marginTop: "var(--space-sm)" }}>{error}</p>}

            <button type="button" className="btn btn-primary" style={{ marginTop: "var(--space-md)" }} onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? "Generating…" : "Generate Cover Letter"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
