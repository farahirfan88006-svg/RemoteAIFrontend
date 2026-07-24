"use client";

import { useState } from "react";
import PremiumRoute from "@/components/premium/PremiumRoute";
import PremiumPageHeader from "@/components/premium/PremiumPageHeader";
import ResumeCompareView from "@/components/career/ResumeCompareView";
import { SkeletonLine } from "@/components/ui/Skeleton";
import { rewriteResume } from "@/lib/api/resumeRewrite";

export default function ResumeRewriteClient() {
  const [originalText, setOriginalText] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  async function handleRewrite() {
    setError("");

    if (originalText.trim().length < 50) {
      setError("Paste at least 50 characters of resume text.");
      return;
    }
    if (!targetRole.trim()) {
      setError("Enter a target role.");
      return;
    }

    setIsSubmitting(true);
    setResponse(null);
    try {
      const result = await rewriteResume({ resumeText: originalText, targetRole });
      if (!result?.success) {
        setError(result?.message || "Couldn't rewrite that resume.");
        return;
      }
      setResponse(result);
    } catch (err) {
      setError(err.message || "Couldn't rewrite that resume.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClear() {
    setOriginalText("");
    setTargetRole("");
    setResponse(null);
    setError("");
  }

  return (
    <section className="section">
      <div className="container">
        <PremiumPageHeader
          eyebrow="Resume Rewrite"
          title="Get a stronger version of your resume"
          description="Paste your resume text and a target role, then see it rewritten and tailored for that role."
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
                aria-label="Resume text"
              />
            </label>

            <label style={{ display: "grid", gap: "0.4rem", marginTop: "0.75rem" }}>
              <span style={{ fontSize: "0.85em" }}>Target role</span>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Senior Frontend Engineer"
                style={{ width: "100%", padding: "0.5rem" }}
                aria-label="Target role"
              />
            </label>

            {error && <p style={{ color: "crimson", marginTop: "var(--space-sm)" }}>{error}</p>}

            <div style={{ display: "flex", gap: "var(--space-sm)", marginTop: "var(--space-md)", flexWrap: "wrap" }}>
              <button type="button" className="btn btn-primary btn-lg" onClick={handleRewrite} disabled={isSubmitting}>
                {isSubmitting ? "Rewriting…" : "Rewrite my resume"}
              </button>
              <button type="button" className="btn btn-secondary btn-lg" onClick={handleClear} disabled={isSubmitting}>
                Clear
              </button>
            </div>
          </div>

          {isSubmitting && (
            <div className="card" style={{ padding: "var(--space-lg)", marginTop: "var(--space-lg)" }}>
              <SkeletonLine width="60%" height="1.25rem" />
              <SkeletonLine width="90%" />
              <SkeletonLine width="80%" />
            </div>
          )}

          {response && (
            <ResumeCompareView
              original={originalText}
              improved={response.data?.result}
              fallback={response.data?.fallback}
              message={response.message}
            />
          )}
        </PremiumRoute>
      </div>
    </section>
  );
}
