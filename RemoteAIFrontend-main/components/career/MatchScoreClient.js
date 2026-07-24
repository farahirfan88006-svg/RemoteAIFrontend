"use client";

import { useState } from "react";
import PremiumRoute from "@/components/premium/PremiumRoute";
import PremiumPageHeader from "@/components/premium/PremiumPageHeader";
import MatchScoreReport from "@/components/career/MatchScoreReport";
import { SkeletonLine } from "@/components/ui/Skeleton";
import { calculateJobMatchScore } from "@/lib/api/jobMatchScore";

const textareaStyle = { width: "100%", padding: "0.75rem", fontFamily: "var(--font-body)", resize: "vertical" };
const inputStyle = { width: "100%", padding: "0.5rem" };
const fieldStyle = { display: "grid", gap: "0.4rem" };

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
          <div
            className="card"
            style={{ padding: "var(--space-lg)", display: "grid", gap: "var(--space-md)", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
          >
            <label style={fieldStyle}>
              <span style={{ fontSize: "0.85em" }}>Your resume</span>
              <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} rows={10} placeholder="Paste your resume text here…" style={textareaStyle} aria-label="Resume text" />
            </label>
            <label style={fieldStyle}>
              <span style={{ fontSize: "0.85em" }}>Job description</span>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={10}
                placeholder="Paste the job description here…"
                style={textareaStyle}
                aria-label="Job description"
              />
            </label>
            <label style={fieldStyle}>
              <span style={{ fontSize: "0.85em" }}>Skills</span>
              <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g. React, Node.js, SQL" style={inputStyle} aria-label="Skills" />
            </label>
            <label style={fieldStyle}>
              <span style={{ fontSize: "0.85em" }}>Experience</span>
              <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="e.g. 5 years in full stack development" style={inputStyle} aria-label="Experience" />
            </label>
            <label style={fieldStyle}>
              <span style={{ fontSize: "0.85em" }}>Education</span>
              <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} placeholder="e.g. Bachelor's in Computer Science" style={inputStyle} aria-label="Education" />
            </label>
          </div>

          {error && <p style={{ color: "crimson", marginTop: "var(--space-sm)" }}>{error}</p>}

          <div style={{ display: "flex", gap: "var(--space-sm)", marginTop: "var(--space-md)", flexWrap: "wrap" }}>
            <button type="button" className="btn btn-primary btn-lg" onClick={handleAnalyze} disabled={isSubmitting}>
              {isSubmitting ? "Calculating…" : "Check my match score"}
            </button>
            <button type="button" className="btn btn-secondary btn-lg" onClick={handleClear} disabled={isSubmitting}>
              Clear
            </button>
          </div>

          {isSubmitting && (
            <div className="card" style={{ padding: "var(--space-lg)", marginTop: "var(--space-lg)" }}>
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
