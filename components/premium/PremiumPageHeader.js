import PremiumBadge from "./PremiumBadge";

/**
 * Shared header for the Phase 2 premium feature pages — eyebrow, title,
 * description, and a Premium badge, in the same shape every other page
 * in this app already uses (see app/resume-analyzer/page.js,
 * app/resumes/page.js). Rendered outside PremiumRoute/FeatureGuard so
 * it's always visible (including to signed-out visitors and search
 * engines) — only the interactive tool underneath gets locked.
 */
export default function PremiumPageHeader({ eyebrow, title, description, feature }) {
  return (
    <div style={{ marginBottom: "var(--space-lg)" }}>
      <span className="eyebrow">
        <span className="dot" />
        {eyebrow}
      </span>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", marginTop: "var(--space-sm)", flexWrap: "wrap" }}>
        <h1 style={{ margin: 0 }}>{title}</h1>
        <PremiumBadge feature={feature} />
      </div>
      {description && <p style={{ marginTop: "var(--space-sm)", maxWidth: 640 }}>{description}</p>}
    </div>
  );
}
