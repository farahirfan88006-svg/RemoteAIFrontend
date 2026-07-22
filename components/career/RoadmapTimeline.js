/**
 * Renders the phase-by-phase roadmap returned by
 * lib/career/mockCareerCoach.js#buildRoadmap. Built on the existing
 * `.card` treatment (no new visual language), one card per phase.
 */
export default function RoadmapTimeline({ roadmap }) {
  return (
    <div style={{ marginTop: "var(--space-lg)" }}>
      <div className="card" style={{ padding: "var(--space-lg)" }}>
        <span className="badge badge-accent">Your transition</span>
        <h3 style={{ marginTop: "var(--space-sm)" }}>
          {roadmap.currentRole} → {roadmap.targetRole}
        </h3>
        <p style={{ marginTop: "var(--space-2xs)" }}>{roadmap.summary}</p>
        <div style={{ display: "flex", gap: "var(--space-md)", flexWrap: "wrap", marginTop: "var(--space-md)" }}>
          <div>
            <span className="eyebrow">Estimated timeline</span>
            <p style={{ color: "var(--color-text)", fontWeight: 600, marginTop: "var(--space-3xs)" }}>{roadmap.estimatedTimeline}</p>
          </div>
          <div>
            <span className="eyebrow">Target market</span>
            <p style={{ color: "var(--color-text)", fontWeight: 600, marginTop: "var(--space-3xs)" }}>{roadmap.country}</p>
          </div>
        </div>

        {roadmap.skillGaps.length > 0 && (
          <div style={{ marginTop: "var(--space-md)" }}>
            <span className="eyebrow">Skill gaps to close</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "var(--space-2xs)" }}>
              {roadmap.skillGaps.map((skill) => (
                <span key={skill} className="tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: "var(--space-lg)",
          display: "grid",
          gap: "var(--space-md)",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {roadmap.milestones.map((milestone) => (
          <div key={milestone.phase} className="card" style={{ padding: "var(--space-lg)" }}>
            <span className="badge badge-neutral">{milestone.phase}</span>
            <p style={{ fontSize: "0.8em", color: "var(--color-text-faint)", marginTop: "var(--space-2xs)" }}>{milestone.timeframe}</p>
            <h4 style={{ marginTop: "var(--space-2xs)" }}>{milestone.title}</h4>
            <p style={{ marginTop: "var(--space-3xs)" }}>{milestone.description}</p>

            <ul style={{ marginTop: "var(--space-sm)", display: "flex", flexDirection: "column", gap: "var(--space-2xs)" }}>
              {milestone.actions.map((action, i) => (
                <li key={i} style={{ fontSize: "0.9em", display: "flex", gap: "var(--space-2xs)" }}>
                  <span aria-hidden="true">✔</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>

            {milestone.skillsToLearn.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "var(--space-sm)" }}>
                {milestone.skillsToLearn.map((skill) => (
                  <span key={skill} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
