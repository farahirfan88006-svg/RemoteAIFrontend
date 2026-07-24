import DashboardCard from "./DashboardCard";
import { MOCK_USAGE, USAGE_DISCLAIMER } from "@/lib/dashboard/mockUsage";
import styles from "./UsageCard.module.css";

/**
 * "Usage summary" dashboard section. Every number here is mock data
 * (see lib/dashboard/mockUsage.js) — there's no metering backend yet —
 * so `USAGE_DISCLAIMER` is always rendered with it, not just mentioned
 * once elsewhere, to keep it honest wherever this card is used.
 */
export default function UsageCard() {
  return (
    <DashboardCard icon="📊" title="Usage summary">
      <ul className={styles.list}>
        {MOCK_USAGE.map((item) => (
          <li key={item.feature} className={styles.row}>
            <span className={styles.label}>{item.label}</span>
            <span className={styles.value}>
              {item.used} / {item.limit}
            </span>
          </li>
        ))}
      </ul>
      <p className={styles.disclaimer}>{USAGE_DISCLAIMER}</p>
    </DashboardCard>
  );
}
