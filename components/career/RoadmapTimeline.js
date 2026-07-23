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
    <div
      style={{
        marginTop: "var(--space-lg)",
        display: "grid",
        gap: "var(--space-md)",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      }}
    >
      {SECTIONS.map(({ key, label }) => {
        const items = plan[key];
        if (!items || items.length === 0) return null;
        return (
          <div key={key} className="card" style={{ padding: "var(--space-lg)" }}>
            <span className="eyebrow">{label}</span>
            <ul style={{ marginTop: "var(--space-sm)", display: "flex", flexDirection: "column", gap: "var(--space-2xs)" }}>
              {items.map((item, i) => (
                <li key={i} style={{ fontSize: "0.9em", display: "flex", gap: "var(--space-2xs)" }}>
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
