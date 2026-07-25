import { FEATURES } from "@/lib/premium/features";
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
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Feature</th>
            <th scope="col">Free</th>
            <th scope="col">Premium</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([key, feature]) => (
            <tr key={key}>
              <th scope="row">{feature.label}</th>
              <td>
                {feature.tier === "free" ? (
                  <span className={styles.yes} aria-label="Included">
                    ✔
                  </span>
                ) : (
                  <span className={styles.no} aria-label="Not included">
                    —
                  </span>
                )}
              </td>
              <td>
                <span className={styles.yes} aria-label="Included">
                  ✔
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
