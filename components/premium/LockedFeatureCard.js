"use client";

import { getFeature } from "@/lib/premium/features";

/**
 * Placeholder rendered in place of a Premium feature when a Free user
 * hits it — built on the existing `.state-block` treatment so it reads
 * as "this dashboard's empty/locked state," not a bolted-on paywall.
 *
 * Renders the feature's own label/description from the registry so
 * copy stays in one place; `onUpgradeClick` opens the shared
 * UpgradeModal (wired up by FeatureGuard/PremiumRoute).
 */
export default function LockedFeatureCard({ feature, onUpgradeClick }) {
  const meta = getFeature(feature);

  return (
    <div className="state-block">
      <span className="state-block__icon" aria-hidden="true">
        🔒
      </span>
      <span className="badge badge-warning" style={{ marginBottom: "var(--space-2xs)" }}>
        Premium
      </span>
      <h3 style={{ margin: 0 }}>{meta?.label || "This is a Premium feature"}</h3>
      <p style={{ maxWidth: 360 }}>
        {meta?.description || "Upgrade to Premium to unlock this feature."}
      </p>
      <button type="button" className="btn btn-primary" style={{ marginTop: "var(--space-sm)" }} onClick={onUpgradeClick}>
        Upgrade Now
      </button>
    </div>
  );
}
