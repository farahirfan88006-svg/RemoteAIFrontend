"use client";

import { useState } from "react";
import PremiumRoute from "@/components/premium/PremiumRoute";
import PremiumPageHeader from "@/components/premium/PremiumPageHeader";
import MatchScoreReport from "@/components/career/MatchScoreReport";
import AILoadingState from "@/components/career/AILoadingState";
import { calculateJobMatchScore } from "@/lib/api/jobMatchScore";

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
          <div className="card ai-panel ai-form-grid">
            <label className="ai-field">
              <span className="ai-field__label">Your resume</span>
              <textarea
                className="ai-textarea"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={10}
                placeholder="Paste your resume text here…"
                aria-label="Resume text"
              />
            </label>
            <label className="ai-field">
              <span className="ai-field__label">Job description</span>
              <textarea
                className="ai-textarea"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={10}
                placeholder="Paste the job description here…"
                aria-label="Job description"
              />
            </label>
            <label className="ai-field">
              <span className="ai-field__label">Skills</span>
              <input
                className="ai-input"
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g. React, Node.js, SQL"
                aria-label="Skills"
              />
            </label>
            <label className="ai-field">
              <span className="ai-field__label">Experience</span>
              <input
                className="ai-input"
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g. 5 years in full stack development"
                aria-label="Experience"
              />
            </label>
            <label className="ai-field">
              <span className="ai-field__label">Education</span>
              <input
                className="ai-input"
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="e.g. Bachelor's in Computer Science"
                aria-label="Education"
              />
            </label>
          </div>

          {error && (
            <p className="ai-error" role="alert">
              {error}
            </p>
          )}

          <div className="ai-form-actions" style={{ marginTop: "var(--space-md)" }}>
            <button type="button" className="btn btn-primary btn-lg" onClick={handleAnalyze} disabled={isSubmitting}>
              {isSubmitting ? "Calculating…" : "Check my match score"}
            </button>
            <button type="button" className="btn btn-secondary btn-lg" onClick={handleClear} disabled={isSubmitting}>
              Clear
            </button>
          </div>

          {isSubmitting && <AILoadingState label="Calculating your match score…" />}

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
