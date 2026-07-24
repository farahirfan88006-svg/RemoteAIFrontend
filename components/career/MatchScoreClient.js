"use client";

import { useState } from "react";
import PremiumRoute from "@/components/premium/PremiumRoute";
import PremiumPageHeader from "@/components/premium/PremiumPageHeader";
import MatchScoreReport from "@/components/career/MatchScoreReport";
import { SkeletonLine } from "@/components/ui/Skeleton";
import { calculateJobMatchScore } from "@/lib/api/jobMatchScore";
import styles from "@/components/career/AITools.module.css";

export default function MatchScoreClient() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    setError("");

    if (resumeText.trim().length < 50 || jobDescription.trim().length < 20 || !skills.trim() || !experience.trim() || !education.trim()) {
      setError("Fill in every field — resume text and job description need enough detail to compare.");
      return;
    }

    setIsSubmitting(true);
    setResponse(null);
    try {
      const result = await calculateJobMatchScore({ resumeText, jobDescription, skills, experience, education });
      if (!result?.success) {
        setError(result?.message || "Couldn't calculate a match score.");
        return;
      }
      setResponse(result);
    } catch (err) {
      setError(err.message || "Couldn't calculate a match score.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClear() {
    setResumeText("");
    setJobDescription("");
    setSkills("");
    setExperience("");
    setEducation("");
    setResponse(null);
    setError("");
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
          <div className={styles.toolCard}>
            <span className="eyebrow">Compare</span>
            <div className={styles.formGridWide} style={{ marginTop: "var(--space-sm)" }}>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Your resume</span>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  rows={10}
                  placeholder="Paste your resume text here…"
                  className={styles.textarea}
                  aria-label="Resume text"
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Job description</span>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={10}
                  placeholder="Paste the job description here…"
                  className={styles.textarea}
                  aria-label="Job description"
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Skills</span>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="e.g. React, Node.js, SQL"
                  className={styles.input}
                  aria-label="Skills"
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Experience</span>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="e.g. 5 years in full stack development"
                  className={styles.input}
                  aria-label="Experience"
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Education</span>
                <input
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  placeholder="e.g. Bachelor's in Computer Science"
                  className={styles.input}
                  aria-label="Education"
                />
              </label>
            </div>

            {error && (
              <p className={styles.errorText} role="alert">
                <span aria-hidden="true">⚠</span> {error}
              </p>
            )}

            <div className={styles.actions}>
              <button type="button" className="btn btn-primary btn-lg" onClick={handleAnalyze} disabled={isSubmitting}>
                {isSubmitting ? "Calculating…" : "Check my match score"}
              </button>
              <button type="button" className="btn btn-secondary btn-lg" onClick={handleClear} disabled={isSubmitting}>
                Clear
              </button>
            </div>
          </div>

          {isSubmitting && (
            <div className={styles.loadingCard}>
              <div className={styles.loadingHeader}>
                <span className={styles.loadingSpinner} aria-hidden="true" />
                <span className={styles.loadingLabel}>Comparing your resume against the job description…</span>
              </div>
              <SkeletonLine width="60%" height="1.25rem" />
              <SkeletonLine width="90%" />
              <SkeletonLine width="80%" />
            </div>
          )}

          {response && (
            <MatchScoreReport
              result={{
                score: response.data.score,
                matchedSkills: response.data.matchedSkills,
                missingSkills: response.data.missingSkills,
                strengths: response.data.strengths,
                improvements: response.data.improvements,
                breakdown: response.data.breakdown,
                insights: response.data.insights,
                fallback: response.data.fallback,
                message: response.message,
              }}
            />
          )}
        </PremiumRoute>
      </div>
    </section>
  );
}
