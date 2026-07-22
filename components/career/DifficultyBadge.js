/**
 * Small difficulty pill, built on the same `.badge` classes as
 * PremiumBadge/pricing (no new visual language) rather than the
 * inline hex-color mapping the existing InterviewQuestionsPanel uses
 * for its own, separate feature.
 */
const DIFFICULTY_CLASS = {
  beginner: "badge-success",
  intermediate: "badge-warning",
  advanced: "badge-accent",
};

const DIFFICULTY_LABEL = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export default function DifficultyBadge({ difficulty }) {
  const cls = DIFFICULTY_CLASS[difficulty] || "badge-neutral";
  const label = DIFFICULTY_LABEL[difficulty] || difficulty;
  return <span className={`badge ${cls}`}>{label}</span>;
}
