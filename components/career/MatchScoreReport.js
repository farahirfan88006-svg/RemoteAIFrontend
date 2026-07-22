/**
 * Overall % + skills match + missing keywords + recommendations, for
 * the Resume Match Score tool. Reuses the same score-color convention
 * as the existing Resume Analyzer's ScoreBadge (green/amber/red bands)
 * so the two "score out of 100/100%" UIs read consistently.
 */
function scoreColor(score) {
  if (score >= 80) return "var(--color-success)";
  if (score >= 50) return "#d97706";
  return "var(--color-danger)";
}

export default function MatchScoreReport({ result }) {
  const { overallScore, skillsMatch, missingKeywords, recommendations } = result;

  return (
    <div className="card" style={{ padding: "var(--space-lg)", marginTop: "var(--space-lg)" }}>
      <div style={{ display: "flex", gap: "var(--space-lg)", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", fontWeight: 700, color: scoreColor(overallScore) }}>{overallScore}%</div>
          <div style={{ fontSize: "0.85em", color: "var(--color-text-muted)" }}>Overall Match</div>
        </div>

        <div style={{ flex: 1, minWidth: 240 }}>
          <h4 style={{ margin: 0 }}>Skills match</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "var(--space-2xs)" }}>
            {skillsMatch.map(({ skill, matched }) => (
              <span key={skill} className={`badge ${matched ? "badge-success" : "badge-neutral"}`}>
                {matched ? "✔" : "—"} {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {missingKeywords.length > 0 && (
        <div style={{ marginTop: "var(--space-lg)" }}>
          <h4>Missing keywords</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "var(--space-2xs)" }}>
            {missingKeywords.map((keyword) => (
              <span key={keyword} className="tag">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: "var(--space-lg)" }}>
        <h4>Recommendations</h4>
        <ul style={{ marginTop: "var(--space-2xs)", display: "flex", flexDirection: "column", gap: "var(--space-2xs)" }}>
          {recommendations.map((rec, i) => (
            <li key={i} style={{ display: "flex", gap: "var(--space-2xs)", fontSize: "0.9em" }}>
              <span aria-hidden="true">•</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
