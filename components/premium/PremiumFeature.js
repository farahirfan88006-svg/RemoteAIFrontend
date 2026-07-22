"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { hasAccess } from "@/lib/premium/access";
import PremiumBadge from "./PremiumBadge";
import UpgradeModal from "./UpgradeModal";

/**
 * Inline gate for a single element (a button, a link, a card action) —
 * the lightweight counterpart to PremiumRoute. Free users still see
 * the element (so they know the feature exists) but clicking opens the
 * upgrade modal instead of running the action; Premium users pass
 * straight through unmodified.
 *
 * `as` lets it wrap whatever's natural at the call site — a Button
 * component, a plain <button>, a <Link> — without re-implementing that
 * element's styling. It clones the single child and intercepts onClick.
 *
 * Usage:
 *   <PremiumFeature feature="resumeAnalyzer">
 *     <Link href="/resume-analyzer" className="btn btn-secondary">Analyze a resume</Link>
 *   </PremiumFeature>
 */
export default function PremiumFeature({ feature, children, showBadge = true }) {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const allowed = hasAccess(feature, user);

  if (allowed) return children;

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2xs)" }}>
      <span
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault();
          setModalOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setModalOpen(true);
          }
        }}
        style={{ cursor: "pointer", display: "inline-flex" }}
      >
        {children}
      </span>
      {showBadge && <PremiumBadge feature={feature} />}
      <UpgradeModal open={modalOpen} onClose={() => setModalOpen(false)} highlightFeature={feature} />
    </span>
  );
}
