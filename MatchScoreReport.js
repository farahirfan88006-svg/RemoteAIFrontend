import CopyButton from "./CopyButton";
import ScoreBadge from "./ScoreBadge";

/**
 * Overall score + matched/missing skills + strengths/improvements +
 * score breakdown + AI/fallback insights, for the Job Match Score tool.
 * Uses the shared ScoreBadge (same visual as the Resume Analyzer's ATS
 * score) so the two "score out of 100" UIs read consistently. The
 * score itself is always computed deterministically by the backend —
 * never by the AI provider.
 */
const SCORE_BANDS = [
  { min: 80, color: "var(--color-success)" },
  { min: 50, color: "var(--color-signal)" },
  { min: 0, color: "var(--color-danger)" },
];

const BREAKDOWN_LABELS = {
  skillsMatch: "Skills",
  technologyMatch: "Technology",
  experienceMatch: "Experience",
  educationMatch: "Education",
};

function BulletList({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <ul className="ai-bullet-list" style={{ marginTop: "var(--space-2xs)" }}>
      {items.map((item, i) => (
        <li key={i}>
          <span aria-hidden="true">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function MatchScoreReport({ result }) {
  const { score, matchedSkills, missingSkills, strengths, improvements, breakdown, insights, fallback, message } = result;

  return (
    <div className="card ai-panel" style={{ marginTop: "var(--space-lg)" }}>
      <div style={{ display: "flex", gap: "var(--space-lg)", flexWrap: "wrap", alignItems: "center" }}>
        <ScoreBadge score={score} label="Overall Match / 100" bands={SCORE_BANDS} />

        <div className="ai-breakdown-grid" style={{ flex: 1, minWidth: 240 }}>
          {Object.entries(breakdown || {}).map(([key, value]) => (
            <div key={key}>
              <span className="eyebrow">{BREAKDOWN_LABELS[key] || key}</span>
              <p style={{ color: "var(--color-text)", fontWeight: 600, marginTop: "var(--space-3xs)" }}>{value}%</p>
            </div>
          ))}
        </div>
      </div>

      <div className="ai-result-grid">
        <div>
          <h4 style={{ margin: 0 }}>Matched skills</h4>
          <div className="ai-skill-chip-row">
            {matchedSkills.length > 0 ? (
              matchedSkills.map((skill) => (
                <span key={skill} className="badge badge-success">
                  ✔ {skill}
                </span>
              ))
            ) : (
              <span style={{ fontSize: "0.9em", color: "var(--color-text-muted)" }}>None detected</span>
            )}
          </div>
        </div>

        <div>
          <h4 style={{ margin: 0 }}>Missing skills</h4>
          <div className="ai-skill-chip-row">
            {missingSkills.length > 0 ? (
              missingSkills.map((skill) => (
                <span key={skill} className="tag">
                  {skill}
                </span>
              ))
            ) : (
              <span style={{ fontSize: "0.9em", color: "var(--color-text-muted)" }}>None — great coverage</span>
            )}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "var(--space-lg)" }}>
        <h4 style={{ margin: 0 }}>Strengths</h4>
        <BulletList items={strengths} />
      </div>

      <div style={{ marginTop: "var(--space-lg)" }}>
        <h4 style={{ margin: 0 }}>Improvements</h4>
        <BulletList items={improvements} />
      </div>

      {insights && (
        <div style={{ marginTop: "var(--space-lg)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-sm)", flexWrap: "wrap" }}>
            <h4 style={{ margin: 0 }}>
              Insights{fallback ? " (built-in fallback)" : ""}
            </h4>
            <CopyButton text={insights} />
          </div>
          {fallback && message && (
            <p style={{ fontSize: "0.85em", color: "var(--color-text-muted)", marginTop: "var(--space-3xs)" }}>{message}</p>
          )}
          <pre className="ai-result-pre" style={{ marginTop: "var(--space-sm)" }}>
            {insights}
          </pre>
        </div>
      )}
    </div>
  );
}
