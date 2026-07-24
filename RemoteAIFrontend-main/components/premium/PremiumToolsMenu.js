"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PREMIUM_NAV_LINKS } from "@/lib/premium/premiumNav";
import PremiumBadge from "./PremiumBadge";
import styles from "./PremiumToolsMenu.module.css";

/**
 * "AI Tools ▾" dropdown for the desktop navbar — groups the four Phase 2
 * premium pages (Career Coach, Mock Interview, Resume Rewrite, Match
 * Score) behind one trigger instead of adding four more buttons to an
 * already-busy action row. Each entry shows its Premium badge inline so
 * the nav itself previews the paywall before the person even clicks
 * through.
 *
 * Only rendered for signed-in users by Navbar.js, matching how
 * "Resume Builder" / "Cover Letters" already behave — signed-out
 * visitors see Log in / Sign up instead.
 */
export default function PremiumToolsMenu() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <button
        type="button"
        className={`btn btn-ghost ${styles.trigger}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        AI Tools <span className={styles.chevron} data-open={open} aria-hidden="true" />
      </button>

      {open && (
        <div className={`${styles.menu} glass`} role="menu">
          {PREMIUM_NAV_LINKS.map((item) => (
            <Link key={item.href} href={item.href} role="menuitem" className={styles.menuItem} onClick={() => setOpen(false)}>
              <span>{item.label}</span>
              <PremiumBadge feature={item.feature} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
