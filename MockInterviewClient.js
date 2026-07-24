"use client";

import { useState } from "react";
import PremiumRoute from "@/components/premium/PremiumRoute";
import PremiumPageHeader from "@/components/premium/PremiumPageHeader";
import InterviewQuestionCard from "@/components/career/InterviewQuestionCard";
import AIResultCard from "@/components/career/AIResultCard";
import AILoadingState from "@/components/career/AILoadingState";
import { startMockInterview } from "@/lib/api/mockInterview";

const INTERVIEW_TYPES = [
  { id: "technical", label: "Technical" },
  { id: "hr", label: "HR" },
  { id: "behavioral", label: "Behavioral" },
];

function ListSection({ title, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="card ai-panel">
      <span className="eyebrow">{title}</span>
      <ul className="ai-bullet-list" style={{ marginTop: "var(--space-sm)" }}>
        {items.map((item, i) => (
          <li key={i}>
            <span aria-hidden="true">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MockInterviewClient() {
  const [jobTitle, setJobTitle] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [interviewType, setInterviewType] = useState("technical");
  const [skills, setSkills] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!jobTitle.trim() || !experienceLevel.trim() || !skills.trim() || resumeText.trim().length < 50) {
      setError("Fill in job title, experience level, and skills, and paste at least 50 characters of resume text.");
      return;
    }

    setIsSubmitting(true);
    setResponse(null);
    try {
      const result = await startMockInterview({ jobTitle, experienceLevel, interviewType, skills, resumeText });
      if (!result?.success) {
        setError(result?.message || "Couldn't start this mock interview.");
        return;
      }
      setResponse(result);
    } catch (err) {
      setError(err.message || "Couldn't start this mock interview.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClear() {
    setJobTitle("");
    setExperienceLevel("");
    setInterviewType("technical");
    setSkills("");
    setResumeText("");
    setResponse(null);
    setError("");
  }

  const details = response?.data?.details;

  return (
    <section className="section">
      <div className="container">
        <PremiumPageHeader
          eyebrow="AI Mock Interview"
          title="Practice with a personalized mock interview"
          description="Tell us the role and your background — we'll generate interview questions, model answers, and preparation tips."
          feature="mockInterviews"
        />

        <PremiumRoute feature="mockInterviews">
          <form onSubmit={handleSubmit} className="card ai-panel">
            <div className="ai-form-grid">
              <label className="ai-field">
                <span className="ai-field__label">Job title</span>
                <input
                  className="ai-input"
                  type="text"
                  placeholder="e.g. Frontend Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  aria-label="Job title"
                />
              </label>
              <label className="ai-field">
                <span className="ai-field__label">Experience level</span>
                <input
                  className="ai-input"
                  type="text"
                  placeholder="e.g. Mid-level (3-5 years)"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  aria-label="Experience level"
                />
              </label>
              <label className="ai-field">
                <span className="ai-field__label">Interview type</span>
                <select
                  className="ai-select"
                  value={interviewType}
                  onChange={(e) => setInterviewType(e.target.value)}
                  aria-label="Interview type"
                >
                  {INTERVIEW_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="ai-field">
                <span className="ai-field__label">Skills</span>
                <input
                  className="ai-input"
                  type="text"
                  placeholder="e.g. React, TypeScript, CSS"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  aria-label="Skills"
                />
              </label>
            </div>

            <label className="ai-field" style={{ marginTop: "0.75rem" }}>
              <span className="ai-field__label">Resume text</span>
              <textarea
                className="ai-textarea"
                rows={8}
                placeholder="Paste your resume text here…"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                aria-label="Resume text"
              />
            </label>

            {error && (
              <p className="ai-error" role="alert">
                {error}
              </p>
            )}

            <div className="ai-form-actions">
              <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                {isSubmitting ? "Generating…" : "Start mock interview"}
              </button>
              <button type="button" className="btn btn-secondary btn-lg" onClick={handleClear} disabled={isSubmitting}>
                Clear
              </button>
            </div>
          </form>

          {isSubmitting && <AILoadingState label="Generating your mock interview…" />}

          {response && details && (
            <div style={{ marginTop: "var(--space-lg)", display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
              {details.questions?.length > 0 && (
                <div>
                  <h3 style={{ marginBottom: "var(--space-sm)" }}>Interview questions</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
                    {details.questions.map((q) => (
                      <InterviewQuestionCard key={q.id} question={q.question} difficulty={q.difficulty} suggestedAnswer={q.modelAnswer} />
                    ))}
                  </div>
                </div>
              )}
              <ListSection title="Evaluation criteria" items={details.evaluationCriteria} />
              <ListSection title="Improvement tips" items={details.improvementTips} />
              <ListSection title="Follow-up questions" items={details.followUpQuestions} />
              <ListSection title="Preparation advice" items={details.prepAdvice} />
            </div>
          )}
          {response && !details && (
            <AIResultCard
              title="Your mock interview"
              message={response.message}
              fallback={response.data?.fallback}
              resultText={response.data?.result}
            />
          )}
        </PremiumRoute>
      </div>
    </section>
  );
}
