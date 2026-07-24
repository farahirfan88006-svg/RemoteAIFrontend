import { IconUsers, IconGlobe, IconBolt, IconInfinity } from "./PricingIcons";
import styles from "./PricingTrust.module.css";

/**
 * Credibility strip for the pricing page. Reuses the same figures
 * already shown on the homepage (Hero / TrustBar / WhyChooseUs) rather
 * than inventing new ones, so the numbers stay consistent site-wide.
 */
const METRICS = [
  { value: "12,000+", label: "remote job seekers on RemoteAI", icon: IconUsers },
  { value: "40+", label: "countries with active listings", icon: IconGlobe },
  { value: "3x", label: "faster time-to-offer vs. generic boards", icon: IconBolt },
  { value: "$0", label: "cost for every core job-search tool", icon: IconInfinity },
];

export default function PricingTrust() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.grid}>
          {METRICS.map(({ value, label, icon: Icon }) => (
            <div key={label} className={styles.item}>
              <span className={styles.iconWrap} aria-hidden="true">
                <Icon className={styles.icon} />
              </span>
              <p className={styles.value}>{value}</p>
              <p className={styles.label}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
