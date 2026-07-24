/**
 * Skeleton loading placeholders. Uses the shared `.skeleton` shimmer
 * class from globals.css — one loading treatment reused everywhere
 * instead of a spinner in some places and "Loading…" text in others.
 */
export function SkeletonLine({ width = "100%", height = "1rem" }) {
  return <div className="skeleton" style={{ width, height, marginBottom: "0.5rem" }} />;
}

export function SkeletonCard() {
  return (
    <div className="card" style={{ padding: "var(--space-md)" }}>
      <SkeletonLine width="60%" height="1.25rem" />
      <SkeletonLine width="40%" />
      <SkeletonLine width="30%" />
    </div>
  );
}

/** A grid of skeleton cards, matching the card-grid layout used by the resumes/cover-letters dashboards. */
export function SkeletonCardGrid({ count = 3 }) {
  return (
    <div style={{ display: "grid", gap: "var(--space-md)", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
