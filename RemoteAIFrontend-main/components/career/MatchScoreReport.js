import CopyButton from "./CopyButton";

/**
 * Overall score + matched/missing skills + strengths/improvements +
 * score breakdown + AI/fallback insights, for the Job Match Score tool.
 * Reuses the same score-color convention as the existing Resume
 * Analyzer's ScoreBadge (green/amber/red bands) so the two
 * "score out of 100" UIs read consistently. The score itself is always
 * computed deterministically by the backend — never by the AI provider.
 */
function scoreColor(score) {
  if (score >= 80) return "var(--color-success)";
  if (score >= 50) return "#d97706";
  return "var(--color-danger)";
}

const BREAKDOWN_LABELS = {
  skillsMatch: "Skills",
  technologyMatch: "Technology",
  experienceMatch: "Experience",
  educationMatch: "Education",
};

function BulletList({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <ul style={{ marginTop: "var(--space-2xs)", display: "flex", flexDirection: "column", gap: "var(--space-2xs)" }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: "flex", gap: "var(--space-2xs)", fontSize: "0.9em" }}>
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
    <div className="card" style={{ padding: "var(--space-lg)", marginTop: "var(--space-lg)" }}>
      <div style={{ display: "flex", gap: "var(--space-lg)", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", fontWeight: 700, color: scoreColor(score) }}>{score}</div>
          <div style={{ fontSize: "0.85em", color: "var(--color-text-muted, #666)" }}>Overall Match / 100</div>
        </div>

        <div style={{ flex: 1, minWidth: 240, display: "flex", gap: "var(--space-lg)", flexWrap: "wrap" }}>
          {Object.entries(breakdown || {}).map(([key, value]) => (
            <div key={key}>
              <span className="eyebrow">{BREAKDOWN_LABELS[key] || key}</span>
              <p style={{ color: "var(--color-text)", fontWeight: 600, marginTop: "var(--space-3xs)" }}>{value}%</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gap: "var(--space-md)", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", marginTop: "var(--space-lg)" }}>
        <div>
          <h4 style={{ margin: 0 }}>Matched skills</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "var(--space-2xs)" }}>
            {matchedSkills.length > 0 ? (
              matchedSkills.map((skill) => (
                <span key={skill} className="badge badge-success">
                  ✔ {skill}
                </span>
              ))
            ) : (
              <span style={{ fontSize: "0.9em", color: "var(--color-text-muted, #666)" }}>None detected</span>
            )}
          </div>
        </div>

        <div>
          <h4 style={{ margin: 0 }}>Missing skills</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "var(--space-2xs)" }}>
            {missingSkills.length > 0 ? (
              missingSkills.map((skill) => (
                <span key={skill} className="tag">
                  {skill}
                </span>
              ))
            ) : (
              <span style={{ fontSize: "0.9em", color: "var(--color-text-muted, #666)" }}>None — great coverage</span>
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
            <p style={{ fontSize: "0.85em", color: "var(--color-text-muted, #666)", marginTop: "var(--space-3xs)" }}>{message}</p>
          )}
          <pre
            style={{
              marginTop: "var(--space-sm)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontFamily: "var(--font-body)",
              fontSize: "0.9em",
              color: "var(--color-text)",
            }}
          >
            {insights}
          </pre>
        </div>
      )}
    </div>
  );
}
