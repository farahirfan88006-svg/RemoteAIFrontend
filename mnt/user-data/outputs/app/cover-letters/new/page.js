"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import * as resumesApi from "@/lib/api/resumes";
import * as coverLettersApi from "@/lib/api/coverLetters";
import StateBlock from "@/components/ui/StateBlock";
import AILoadingState from "@/components/career/AILoadingState";

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
        <h1 className="ai-page-header__title" style={{ marginTop: "var(--space-sm)" }}>
          Generate a general cover letter
        </h1>
        <p className="ai-page-header__description" style={{ marginTop: "var(--space-2xs)" }}>
          We&apos;ll write a professional cover letter based on your resume — you can edit it afterward.
        </p>

        {resumes === null ? (
          <AILoadingState label="Loading your resumes…" />
        ) : resumes.length === 0 ? (
          <StateBlock
            icon="📄"
            title="You need a resume first"
            description="Cover Letter generation uses your resume's info — build one to continue."
            action={
              <a href="/resumes" className="btn btn-primary">
                Go to Resume Builder
              </a>
            }
          />
        ) : (
          <div className="card ai-panel" style={{ marginTop: "var(--space-md)" }}>
            <label className="ai-field">
              <span className="ai-field__label">Which resume should we base it on?</span>
              <select className="ai-select" value={selectedResumeId} onChange={(e) => setSelectedResumeId(e.target.value)}>
                {resumes.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.title} {r.isDefault ? "(Default)" : ""}
                  </option>
                ))}
              </select>
            </label>

            {error && (
              <p className="ai-error" role="alert">
                {error}
              </p>
            )}

            <div className="ai-form-actions">
              <button type="button" className="btn btn-primary" onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? "Generating…" : "Generate Cover Letter"}
              </button>
            </div>

            {isGenerating && <AILoadingState label="Generating your cover letter…" />}
          </div>
        )}
      </div>
    </section>
  );
}
