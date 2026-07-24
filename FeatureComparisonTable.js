import { FEATURES } from "@/lib/premium/features";
import { IconCheck, IconMinus } from "./PricingIcons";
import styles from "./FeatureComparisonTable.module.css";

/**
 * Free vs Premium comparison table, generated directly from the
 * feature registry (lib/premium/features.js) so the pricing page can
 * never drift out of sync with what's actually gated in the product.
 */
export default function FeatureComparisonTable() {
  const rows = Object.entries(FEATURES);

  return (
    <div className={`card ${styles.wrapper}`}>
      <div className={styles.scroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col" className={styles.featureHead}>
                Feature
              </th>
              <th scope="col">Free</th>
              <th scope="col" className={styles.premiumHead}>
                Premium
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([key, feature]) => (
              <tr key={key}>
                <th scope="row">
                  <span className={styles.featureLabel}>{feature.label}</span>
                  {feature.description && (
                    <span className={styles.featureDescription}>{feature.description}</span>
                  )}
                </th>
                <td>
                  {feature.tier === "free" ? (
                    <span className={styles.yes} aria-label="Included in Free">
                      <IconCheck className={styles.mark} />
                    </span>
                  ) : (
                    <span className={styles.no} aria-label="Not included in Free">
                      <IconMinus className={styles.mark} />
                    </span>
                  )}
                </td>
                <td className={styles.premiumCell}>
                  <span className={styles.yes} aria-label="Included in Premium">
                    <IconCheck className={styles.mark} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
