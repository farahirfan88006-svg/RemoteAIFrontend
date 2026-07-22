"use client";

import { useState } from "react";
import PremiumRoute from "@/components/premium/PremiumRoute";
import PremiumPageHeader from "@/components/premium/PremiumPageHeader";
import MatchScoreReport from "@/components/career/MatchScoreReport";
import { analyzeMatch } from "@/lib/career/mockMatchScore";

const textareaStyle = { width: "100%", padding: "0.75rem", fontFamily: "var(--font-body)", resize: "vertical" };

export default function MatchScoreClient() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function handleAnalyze() {
    if (!resumeText.trim() || !jobDescriptionText.trim()) {
      setError("Paste both your resume and the job description.");
      return;
    }
    setError("");
    setResult(analyzeMatch(resumeText, jobDescriptionText));
  }

  return (
    <section className="section">
      <div className="container">
        <PremiumPageHeader
          eyebrow="AI Match Score"
          title="See how well your resume matches a job"
          description="Paste your resume and a job description to get an overall match score, skill-by-skill breakdown, and missing keywords."
          feature="aiMatchScore"
        />

        <PremiumRoute feature="aiMatchScore">
          <div
            className="card"
            style={{ padding: "var(--space-lg)", display: "grid", gap: "var(--space-md)", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
          >
            <label style={{ display: "grid", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.85em" }}>Your resume</span>
              <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} rows={10} placeholder="Paste your resume text here…" style={textareaStyle} />
            </label>
            <label style={{ display: "grid", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.85em" }}>Job description</span>
              <textarea
                value={jobDescriptionText}
                onChange={(e) => setJobDescriptionText(e.target.value)}
                rows={10}
                placeholder="Paste the job description here…"
                style={textareaStyle}
              />
            </label>
          </div>

          {error && <p style={{ color: "crimson", marginTop: "var(--space-sm)" }}>{error}</p>}

          <button type="button" className="btn btn-primary btn-lg" style={{ marginTop: "var(--space-md)" }} onClick={handleAnalyze}>
            Check my match score
          </button>

          {result && <MatchScoreReport result={result} />}
        </PremiumRoute>
      </div>
    </section>
  );
}
