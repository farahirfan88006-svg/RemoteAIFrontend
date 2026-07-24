/**
 * Shared "N / 100" score display. Resume Analyzer's ATS score and Job
 * Match Score's overall match score previously rendered two separate,
 * slightly different ad hoc versions of the same idea (inline hex
 * colors, different font sizes). This is the one shared visual for it.
 *
 * `bands` lets each caller keep its own score thresholds — only the
 * markup/CSS is shared, never the scoring logic itself.
 */
export default function ScoreBadge({ score, label = "Score / 100", bands }) {
  const defaultBands = [
    { min: 80, color: "var(--color-success)" },
    { min: 60, color: "var(--color-signal)" },
    { min: 0, color: "var(--color-danger)" },
  ];
  const activeBands = bands && bands.length > 0 ? bands : defaultBands;
  const matched = activeBands.find((band) => score >= band.min);
  const color = matched ? matched.color : "var(--color-text)";

  return (
    <div className="ai-score">
      <div className="ai-score__value" style={{ color }}>
        {score}
      </div>
      <div className="ai-score__label">{label}</div>
    </div>
  );
}
