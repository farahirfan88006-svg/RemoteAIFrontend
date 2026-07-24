"use client";

import FeatureGuard from "./FeatureGuard";
import LockedFeatureCard from "./LockedFeatureCard";

/**
 * Page-level guard. Wrap an entire route's content in this when the
 * whole page is a Premium feature (as opposed to PremiumFeature, which
 * locks one element inside an otherwise-accessible page).
 *
 * Auth itself (redirect-to-login for signed-out users) stays the
 * page's own responsibility, same as it is today on every dashboard —
 * PremiumRoute only answers the free-vs-premium question, so it
 * composes with each page's existing `if (!user) router.replace(...)`
 * effect instead of replacing it.
 *
 * Usage:
 *   if (authLoading || !user) return null;
 *   return (
 *     <PremiumRoute feature="resumeAnalyzer">
 *       ...page content...
 *     </PremiumRoute>
 *   );
 */
export default function PremiumRoute({ feature, children }) {
  return (
    <FeatureGuard
      feature={feature}
      fallback={({ onUpgradeClick }) => (
        <section className="section">
          <div className="container" style={{ maxWidth: 560, margin: "0 auto" }}>
            <LockedFeatureCard feature={feature} onUpgradeClick={onUpgradeClick} />
          </div>
        </section>
      )}
    >
      {children}
    </FeatureGuard>
  );
}
