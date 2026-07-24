import { IconSparkle, IconInfinity, IconShield } from "./PricingIcons";
import styles from "./PricingHero.module.css";

/**
 * Pricing page hero. Mirrors the homepage Hero's ambient-orb background
 * and glass eyebrow so the page still feels like the rest of the site,
 * but scoped to its own module so the homepage Hero is never touched.
 */
export default function PricingHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.ambient} aria-hidden="true">
        <span className={`${styles.orb} ${styles.orbAccent}`} />
        <span className={`${styles.orb} ${styles.orbViolet}`} />
      </div>

      <div className={`container ${styles.inner}`}>
        <span className={`eyebrow ${styles.eyebrow}`}>
          <IconSparkle className={styles.eyebrowIcon} aria-hidden="true" />
          Simple, transparent pricing
        </span>

        <h1 className={styles.heading}>
          Free to search.
          <br />
          <span className={styles.accentText}>Premium to get hired faster.</span>
        </h1>

        <p className={styles.subheading}>
          Every core job-search tool on RemoteAI is free, permanently. Premium
          layers AI-powered career tools on top for people actively applying
          and ready to move faster.
        </p>

        <ul className={styles.trustRow} aria-label="Plan highlights">
          <li>
            <IconInfinity className={styles.trustIcon} aria-hidden="true" />
            Free plan, no time limit
          </li>
          <li>
            <IconShield className={styles.trustIcon} aria-hidden="true" />
            No card required to start
          </li>
          <li>
            <IconSparkle className={styles.trustIcon} aria-hidden="true" />
            Upgrade only when you&apos;re ready
          </li>
        </ul>
      </div>
    </section>
  );
}
