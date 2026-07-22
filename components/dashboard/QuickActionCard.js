"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import { hasAccess } from "@/lib/premium/access";
import { PLAN } from "@/lib/premium/features";
import PremiumBadge from "@/components/premium/PremiumBadge";
import UpgradeModal from "@/components/premium/UpgradeModal";
import styles from "./QuickActionCard.module.css";

/**
 * One "Quick Actions" tile. Reuses the same access-control primitives
 * as FeatureGuard/PremiumFeature (`hasAccess`, `UpgradeModal`) rather
 * than re-implementing the free-vs-premium check, so a tile can never
 * disagree with what the destination page itself enforces.
 *
 * Free-tier tiles: "Open" navigates straight to `href`.
 * Premium tiles on a Free account: the card shows a locked overlay
 * ("Premium Feature") over the description, and both the overlay's
 * button and the "Open" button open the shared UpgradeModal instead
 * of navigating — mirroring how PremiumRoute locks the destination
 * page itself, so nothing here promises access the page won't grant.
 */
export default function QuickActionCard({ feature, href, icon, title, meta }) {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const allowed = hasAccess(feature, user);
  const isPremiumTier = meta?.tier === PLAN.PREMIUM;

  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.header}>
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
        <PremiumBadge feature={feature} />
      </div>

      <h3 className={styles.title}>{title}</h3>

      <div className={styles.body}>
        <p className={styles.description}>{meta?.description}</p>
        <span className={styles.planNote}>
          {isPremiumTier ? "Premium Feature" : "Included in Free Plan"}
        </span>

        {!allowed && (
          <div className={`${styles.overlay} glass`}>
            <span aria-hidden="true">🔒</span>
            <p className={styles.overlayText}>Premium Feature</p>
            <button type="button" className="btn btn-primary" onClick={() => setModalOpen(true)}>
              Upgrade to unlock
            </button>
          </div>
        )}
      </div>

      {allowed ? (
        <Link href={href} className="btn btn-primary">
          Open
        </Link>
      ) : (
        <button type="button" className="btn btn-primary" onClick={() => setModalOpen(true)}>
          Open
        </button>
      )}

      <UpgradeModal open={modalOpen} onClose={() => setModalOpen(false)} highlightFeature={feature} />
    </div>
  );
}
