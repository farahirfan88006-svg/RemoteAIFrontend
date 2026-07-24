import { getFeature, getFeatureTier, PLAN } from "@/lib/premium/features";

/**
 * Small inline pill marking a feature as Free or Premium, built on the
 * existing `.badge` classes from globals.css (no new visual language).
 *
 * Usage:
 *   <PremiumBadge feature="resumeAnalyzer" />           // reads the registry
 *   <PremiumBadge tier="premium" />                     // explicit override
 */
export default function PremiumBadge({ feature, tier, className = "" }) {
  const resolvedTier = tier ?? (feature ? getFeatureTier(feature) : PLAN.FREE);
  const isPremiumTier = resolvedTier === PLAN.PREMIUM;
  const meta = feature ? getFeature(feature) : null;

  return (
    <span
      className={`badge ${isPremiumTier ? "badge-warning" : "badge-success"} ${className}`.trim()}
      title={meta?.description}
    >
      {isPremiumTier ? "🔒" : "🟢"} {isPremiumTier ? "Premium" : "Free"}
    </span>
  );
}
