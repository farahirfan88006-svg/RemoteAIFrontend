/**
 * Original → Improved → Summary layout for the Resume Rewrite tool.
 * Both text blocks render as read-only, pre-wrapped text (not inputs)
 * since this is a comparison view, not an editor.
 */
export default function ResumeCompareView({ original, improved, changes, stats }) {
  return (
    <div style={{ marginTop: "var(--space-lg)" }}>
      <div
        style={{
          display: "grid",
          gap: "var(--space-md)",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        <div className="card" style={{ padding: "var(--space-lg)" }}>
          <span className="badge badge-neutral">Original</span>
          <pre style={preStyle}>{original}</pre>
        </div>

        <div className="card" style={{ padding: "var(--space-lg)", borderColor: "var(--color-accent)" }}>
          <span className="badge badge-accent">Improved Version</span>
          <pre style={preStyle}>{improved}</pre>
        </div>
      </div>

      <div className="card" style={{ padding: "var(--space-lg)", marginTop: "var(--space-md)" }}>
        <span className="badge badge-success">
          {stats.linesChanged} of {stats.totalLines} lines improved
        </span>
        <h4 style={{ marginTop: "var(--space-sm)" }}>Improvement summary</h4>
        <ul style={{ marginTop: "var(--space-2xs)", display: "flex", flexDirection: "column", gap: "var(--space-2xs)" }}>
          {changes.map((change, i) => (
            <li key={i} style={{ display: "flex", gap: "var(--space-2xs)", fontSize: "0.9em" }}>
              <span aria-hidden="true">•</span>
              <span>{change}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const preStyle = {
  marginTop: "var(--space-sm)",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  fontFamily: "var(--font-body)",
  fontSize: "0.9em",
  color: "var(--color-text)",
  maxHeight: 420,
  overflowY: "auto",
};
