/**
 * Original → Rewritten layout for the Resume Rewrite tool. Both text
 * blocks render as read-only, pre-wrapped text (not inputs) since this
 * is a comparison view, not an editor. No line-level diff/stats here —
 * POST /api/ai/resume-rewrite/rewrite only returns a rewritten text
 * block (`data.result`), not a structured change list.
 */
import CopyButton from "./CopyButton";

export default function ResumeCompareView({ original, improved, fallback, message }) {
  return (
    <div style={{ marginTop: "var(--space-lg)" }}>
      {fallback && (
        <p style={{ marginBottom: "var(--space-sm)", fontSize: "0.85em", color: "var(--color-text-muted, #666)" }}>{message}</p>
      )}
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-sm)", flexWrap: "wrap" }}>
            <span className="badge badge-accent">
              Rewritten Version{fallback ? " (built-in fallback)" : ""}
            </span>
            <CopyButton text={improved} />
          </div>
          <pre style={preStyle}>{improved}</pre>
        </div>
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
