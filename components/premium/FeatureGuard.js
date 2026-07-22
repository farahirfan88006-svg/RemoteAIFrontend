"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { hasAccess } from "@/lib/premium/access";
import LockedFeatureCard from "./LockedFeatureCard";
import UpgradeModal from "./UpgradeModal";

/**
 * Core access-control wrapper: renders `children` if the current user
 * can use `feature`, otherwise renders `fallback` (default:
 * LockedFeatureCard) and wires it up to the shared UpgradeModal.
 *
 * This is the single place that decides what "locked" looks like — the
 * page-level PremiumRoute and inline PremiumFeature helpers are both
 * built on top of this component rather than duplicating the check.
 *
 * Deliberately does not redirect or hide the page shell; it only
 * swaps the gated content, so pages that mix free and premium sections
 * (e.g. a dashboard) can wrap just the premium part.
 */
export default function FeatureGuard({ feature, children, fallback }) {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const allowed = hasAccess(feature, user);

  if (allowed) return children;

  return (
    <>
      {fallback ? (
        fallback({ onUpgradeClick: () => setModalOpen(true) })
      ) : (
        <LockedFeatureCard feature={feature} onUpgradeClick={() => setModalOpen(true)} />
      )}
      <UpgradeModal open={modalOpen} onClose={() => setModalOpen(false)} highlightFeature={feature} />
    </>
  );
}
