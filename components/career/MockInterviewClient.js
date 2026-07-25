"use client";

import { useState } from "react";
import PremiumRoute from "@/components/premium/PremiumRoute";
import PremiumPageHeader from "@/components/premium/PremiumPageHeader";
import InterviewQuestionCard from "@/components/career/InterviewQuestionCard";
import AIResultCard from "@/components/career/AIResultCard";
import { SkeletonLine } from "@/components/ui/Skeleton";
import { startMockInterview } from "@/lib/api/mockInterview";

const INTERVIEW_TYPES = [
  { id: "technical", label: "Technical" },
  { id: "hr", label: "HR" },
  { id: "behavioral", label: "Behavioral" },
];

const inputStyle = { width: "100%", padding: "0.5rem" };
const textareaStyle = { width: "100%", padding: "0.75rem", fontFamily: "var(--font-body)", resize: "vertical" };
const fieldStyle = { display: "grid", gap: "0.25rem" };

function ListSection({ title, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="card" style={{ padding: "var(--space-lg)" }}>
      <span className="eyebrow">{title}</span>
      <ul style={{ marginTop: "var(--space-sm)", display: "flex", flexDirection: "column", gap: "var(--space-2xs)" }}>
        {items.map((item, i) => (
          <li key={i} style={{ fontSize: "0.9em", display: "flex", gap: "var(--space-2xs)" }}>
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
          <form onSubmit={handleSubmit} className="card" style={{ padding: "var(--space-lg)" }}>
            <div style={{ display: "grid", gap: "0.75rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              <label style={fieldStyle}>
                <span style={{ fontSize: "0.85em" }}>Job title</span>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="e.g. Frontend Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  aria-label="Job title"
                />
              </label>
              <label style={fieldStyle}>
                <span style={{ fontSize: "0.85em" }}>Experience level</span>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="e.g. Mid-level (3-5 years)"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  aria-label="Experience level"
                />
              </label>
              <label style={fieldStyle}>
                <span style={{ fontSize: "0.85em" }}>Interview type</span>
                <select
                  style={inputStyle}
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
              <label style={fieldStyle}>
                <span style={{ fontSize: "0.85em" }}>Skills</span>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="e.g. React, TypeScript, CSS"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  aria-label="Skills"
                />
              </label>
            </div>

            <label style={{ ...fieldStyle, marginTop: "0.75rem" }}>
              <span style={{ fontSize: "0.85em" }}>Resume text</span>
              <textarea
                style={textareaStyle}
                rows={8}
                placeholder="Paste your resume text here…"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                aria-label="Resume text"
              />
            </label>

            {error && <p style={{ color: "crimson", marginTop: "var(--space-sm)" }}>{error}</p>}

            <div style={{ display: "flex", gap: "var(--space-sm)", marginTop: "var(--space-lg)", flexWrap: "wrap" }}>
              <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                {isSubmitting ? "Generating…" : "Start mock interview"}
              </button>
              <button type="button" className="btn btn-secondary btn-lg" onClick={handleClear} disabled={isSubmitting}>
                Clear
              </button>
            </div>
          </form>

          {isSubmitting && (
            <div className="card" style={{ padding: "var(--space-lg)", marginTop: "var(--space-lg)" }}>
              <SkeletonLine width="60%" height="1.25rem" />
              <SkeletonLine width="90%" />
              <SkeletonLine width="80%" />
            </div>
          )}

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
