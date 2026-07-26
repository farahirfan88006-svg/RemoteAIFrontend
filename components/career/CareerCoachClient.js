"use client";

import { useState } from "react";
import PremiumRoute from "@/components/premium/PremiumRoute";
import PremiumPageHeader from "@/components/premium/PremiumPageHeader";
import StringListEditor from "@/components/resume/StringListEditor";
import RoadmapTimeline from "@/components/career/RoadmapTimeline";
import AIResultCard from "@/components/career/AIResultCard";
import { SkeletonLine } from "@/components/ui/Skeleton";
import { getCareerAdvice } from "@/lib/api/careerCoach";
import styles from "@/components/career/AITools.module.css";

export default function CareerCoachClient() {
  const [careerGoal, setCareerGoal] = useState("");
  const [experience, setExperience] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [skills, setSkills] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!careerGoal.trim() || !experience.trim() || !targetRole.trim() || skills.length === 0) {
      setError("Fill in your career goal, current skills, experience, and target role.");
      return;
    }

    setIsSubmitting(true);
    setResponse(null);
    try {
      const result = await getCareerAdvice({
        careerGoal,
        currentSkills: skills,
        experience,
        targetRole,
      });
      if (!result?.success) {
        setError(result?.message || "Couldn't generate career advice.");
        return;
      }
      setResponse(result);
    } catch (err) {
      setError(err.message || "Couldn't generate career advice.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClear() {
    setCareerGoal("");
    setExperience("");
    setTargetRole("");
    setSkills([]);
    setResponse(null);
    setError("");
  }

  const details = response?.data?.details;

  return (
    <section className="section">
      <div className="container">
        <PremiumPageHeader
          eyebrow="AI Career Coach"
          title="Get a personalized career roadmap"
          description="Tell us where you are and where you want to go — we'll map out the skills, timeline, and milestones for the jump."
          feature="careerCoach"
        />

        <PremiumRoute feature="careerCoach">
          <form onSubmit={handleSubmit} className={styles.toolCard}>
            <span className="eyebrow">Your goal</span>
            <div className={styles.formGrid} style={{ marginTop: "var(--space-sm)" }}>
              <label className={`${styles.field} ${styles.fullWidth}`}>
                <span className={styles.fieldLabel}>Career goal</span>
                <textarea
                  className={styles.textarea}
                  rows={2}
                  placeholder="e.g. Move from backend engineering into engineering management within 2 years"
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                  aria-label="Career goal"
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Experience</span>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="e.g. 4 years as a Backend Engineer"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  aria-label="Experience"
                />
              </label>
              <label className={styles.field}>
                <span className={styles.fieldLabel}>Target role</span>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="e.g. Engineering Manager"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  aria-label="Target role"
                />
              </label>
            </div>

            <StringListEditor
              title="Current skills"
              items={skills}
              onChange={setSkills}
              placeholder="Add a skill — press Enter"
            />

            {error && (
              <p className={styles.errorText} role="alert">
                <span aria-hidden="true">⚠</span> {error}
              </p>
            )}

            <div className={styles.actions}>
              <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                {isSubmitting ? "Generating…" : "Generate my roadmap"}
              </button>
              <button type="button" className="btn btn-secondary btn-lg" onClick={handleClear} disabled={isSubmitting}>
                Clear
              </button>
            </div>
          </form>

          {isSubmitting && (
            <div className={styles.loadingCard}>
              <div className={styles.loadingHeader}>
                <span className={styles.loadingSpinner} aria-hidden="true" />
                <span className={styles.loadingLabel}>Mapping out your roadmap…</span>
              </div>
              <SkeletonLine width="60%" height="1.25rem" />
              <SkeletonLine width="90%" />
              <SkeletonLine width="80%" />
            </div>
          )}

          {response && details && <RoadmapTimeline plan={details} />}
          {response && !details && (
            <AIResultCard
              title="Your career plan"
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
