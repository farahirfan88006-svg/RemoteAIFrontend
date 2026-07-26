import styles from "./AITools.module.css";

/**
 * Renders the structured career plan returned in `data.details` by
 * POST /api/ai/career-coach/advice when the backend used its local
 * rule-based fallback (see careerCoach.controller.js#buildFallbackCareerPlan).
 * Six plain string-array sections — built on the existing `.card`/`.eyebrow`
 * treatment, no new visual language.
 */
const SECTIONS = [
  { key: "roadmap", label: "Career Roadmap" },
  { key: "skillsToImprove", label: "Skills to Improve" },
  { key: "learningRecommendations", label: "Learning Recommendations" },
  { key: "resumeSuggestions", label: "Resume Improvement Suggestions" },
  { key: "jobSearchAdvice", label: "Job Search Advice" },
  { key: "interviewTips", label: "Interview Preparation Tips" },
];

export default function RoadmapTimeline({ plan }) {
  return (
    <div className={styles.timelineGrid}>
      {SECTIONS.map(({ key, label }) => {
        const items = plan[key];
        if (!items || items.length === 0) return null;
        return (
          <div key={key} className={styles.timelineCard}>
            <span className="eyebrow">{label}</span>
            <ul className={styles.bulletList}>
              {items.map((item, i) => (
                <li key={i} className={styles.bulletItem}>
                  <span aria-hidden="true">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
