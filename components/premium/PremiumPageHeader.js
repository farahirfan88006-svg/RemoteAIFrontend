import PremiumBadge from "./PremiumBadge";
import styles from "@/components/career/AITools.module.css";

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
    <div className={styles.hero}>
      <div className={styles.heroInner}>
        <span className="eyebrow">
          <span className="dot dot--pulse" />
          {eyebrow}
        </span>
        <div className={styles.heroTitleRow}>
          <h1>{title}</h1>
          <PremiumBadge feature={feature} />
        </div>
        {description && <p className={styles.heroDescription}>{description}</p>}
      </div>
    </div>
  );
}
