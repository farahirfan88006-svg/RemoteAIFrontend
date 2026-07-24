import CopyButton from "./CopyButton";
import styles from "./AITools.module.css";

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
    <ul className={styles.bulletList}>
      {items.map((item, i) => (
        <li key={i} className={styles.bulletItem}>
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
    <div className={`card ${styles.sectionGap}`} style={{ padding: "var(--space-lg)" }}>
      <div className={styles.scoreHeader}>
        <div className={styles.scoreGauge} style={{ "--score": score, "--score-color": scoreColor(score) }}>
          <div className={styles.scoreGaugeInner}>
            <span className={styles.scoreGaugeValue}>{score}</span>
            <span className={styles.scoreGaugeLabel}>Overall match</span>
          </div>
        </div>

        <div className={styles.breakdownGrid}>
          {Object.entries(breakdown || {}).map(([key, value]) => (
            <div key={key} className={styles.breakdownItem}>
              <div className={styles.breakdownLabelRow}>
                <span className={styles.fieldLabel}>{BREAKDOWN_LABELS[key] || key}</span>
                <span className={styles.breakdownValue}>{value}%</span>
              </div>
              <div className={styles.breakdownTrack}>
                <div className={styles.breakdownFill} style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.resultGrid}>
        <div className={styles.resultCard}>
          <h4 className={styles.resultCardTitle}>Matched skills</h4>
          <div className={styles.chipRow}>
            {matchedSkills.length > 0 ? (
              matchedSkills.map((skill) => (
                <span key={skill} className="badge badge-success">
                  ✔ {skill}
                </span>
              ))
            ) : (
              <span className={styles.mutedNote}>None detected</span>
            )}
          </div>
        </div>

        <div className={styles.resultCard}>
          <h4 className={styles.resultCardTitle}>Missing skills</h4>
          <div className={styles.chipRow}>
            {missingSkills.length > 0 ? (
              missingSkills.map((skill) => (
                <span key={skill} className="tag">
                  {skill}
                </span>
              ))
            ) : (
              <span className={styles.mutedNote}>None — great coverage</span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.resultGrid} style={{ marginTop: "var(--space-md)" }}>
        <div className={styles.resultCard}>
          <h4 className={styles.resultCardTitle}>
            <span aria-hidden="true">💪</span> Strengths
          </h4>
          <BulletList items={strengths} />
        </div>

        <div className={styles.resultCard}>
          <h4 className={styles.resultCardTitle}>
            <span aria-hidden="true">🎯</span> Improvement roadmap
          </h4>
          <BulletList items={improvements} />
        </div>
      </div>

      {insights && (
        <div className={styles.resultCard} style={{ marginTop: "var(--space-md)" }}>
          <div className={styles.letterToolbar}>
            <h4 className={styles.resultCardTitle} style={{ margin: 0 }}>
              ATS insights{fallback ? " (built-in fallback)" : ""}
            </h4>
            <CopyButton text={insights} />
          </div>
          {fallback && message && <p className={styles.mutedNote} style={{ marginTop: "var(--space-3xs)" }}>{message}</p>}
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
