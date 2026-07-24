"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { listPremiumFeatures } from "@/lib/premium/features";
import styles from "./UpgradeModal.module.css";

/**
 * The "Unlock Premium" modal shown whenever a Free user opens a
 * Premium-gated feature. Presentational only — no payment call, since
 * Phase 1 stops at "Upgrade Now" linking through to /pricing.
 *
 * `highlightFeature` (a key from lib/premium/features) puts that
 * feature's own description first in the bullet list so the modal
 * feels specific to what the person just tried to open, rather than
 * a generic upsell.
 */
export default function UpgradeModal({ open, onClose, highlightFeature }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const premiumFeatures = listPremiumFeatures();
  const ordered = highlightFeature
    ? [...premiumFeatures].sort((a) => (a.key === highlightFeature ? -1 : 0))
    : premiumFeatures;

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div
        ref={dialogRef}
        className={`${styles.dialog} glass`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="upgrade-modal-title"
        tabIndex={-1}
      >
        <span className="badge badge-warning" style={{ marginBottom: "var(--space-sm)" }}>
          🔒 Premium
        </span>

        <h3 id="upgrade-modal-title" className={styles.title}>
          Unlock Premium
        </h3>
        <p className={styles.subtitle}>Get access to:</p>

        <ul className={styles.list}>
          {ordered.slice(0, 5).map((feature) => (
            <li key={feature.key}>
              <span className={styles.check} aria-hidden="true">
                ✔
              </span>
              {feature.label}
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Link href="/pricing" className="btn btn-primary" onClick={() => onClose?.()}>
            Upgrade Now
          </Link>
          <button type="button" className="btn btn-ghost" onClick={() => onClose?.()}>
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
