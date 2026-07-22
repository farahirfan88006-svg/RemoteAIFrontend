"use client";

import { useState } from "react";
import PremiumRoute from "@/components/premium/PremiumRoute";
import PremiumPageHeader from "@/components/premium/PremiumPageHeader";
import ResumeCompareView from "@/components/career/ResumeCompareView";
import { rewriteResume } from "@/lib/career/mockResumeRewrite";

export default function ResumeRewriteClient() {
  const [originalText, setOriginalText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function handleRewrite() {
    if (!originalText.trim()) {
      setError("Paste your resume text first.");
      return;
    }
    setError("");
    setResult(rewriteResume(originalText));
  }

  return (
    <section className="section">
      <div className="container">
        <PremiumPageHeader
          eyebrow="Resume Rewrite"
          title="Get a stronger version of your resume"
          description="Paste your resume text and see it rewritten with stronger phrasing, then a summary of what changed and why."
          feature="resumeRewrite"
        />

        <PremiumRoute feature="resumeRewrite">
          <div className="card" style={{ padding: "var(--space-lg)" }}>
            <label style={{ display: "grid", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.85em" }}>Paste your resume text</span>
              <textarea
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                rows={12}
                placeholder="Paste your resume content here…"
                style={{ width: "100%", padding: "0.75rem", fontFamily: "var(--font-body)", resize: "vertical" }}
              />
            </label>

            {error && <p style={{ color: "crimson", marginTop: "var(--space-sm)" }}>{error}</p>}

            <button type="button" className="btn btn-primary btn-lg" style={{ marginTop: "var(--space-md)" }} onClick={handleRewrite}>
              Rewrite my resume
            </button>
          </div>

          {result && (
            <ResumeCompareView original={originalText} improved={result.improved} changes={result.changes} stats={result.stats} />
          )}
        </PremiumRoute>
      </div>
    </section>
  );
}
