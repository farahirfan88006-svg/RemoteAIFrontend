import { FEATURES } from "@/lib/premium/features";
import { FREE_AI_REQUEST_LIMIT } from "@/lib/premium/planPricing";
import styles from "./FeatureComparisonTable.module.css";

/**
 * Free vs Premium comparison table, generated directly from the
 * feature registry (lib/premium/features.js) so the pricing page can
 * never drift out of sync with what's actually gated in the product.
 *
 * Free-tier rows (core job-search tools) are unlimited on both plans.
 * Premium-tier rows are the AI tools: Free includes a monthly
 * allowance of each, Premium is unlimited — see lib/premium/planPricing.js
 * for where that allowance number comes from.
 */
export default function FeatureComparisonTable() {
  const rows = Object.entries(FEATURES);

  return (
    <div className={`card ${styles.wrapper}`}>
      <table className={styles.table}>
        <caption className={styles.caption}>
          Core tools are unlimited on every plan. AI tools are capped on Free and unlimited on Premium.
        </caption>
        <thead>
          <tr>
            <th scope="col">Feature</th>
            <th scope="col">Free</th>
            <th scope="col">Premium</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([key, feature]) => {
            const isAiFeature = feature.tier === "premium";
            return (
              <tr key={key}>
                <th scope="row">
                  {feature.label}
                  {isAiFeature && (
                    <span className={styles.aiTag} aria-hidden="true">
                      AI
                    </span>
                  )}
                </th>
                <td>
                  {isAiFeature ? (
                    <span className={styles.limit}>{FREE_AI_REQUEST_LIMIT}/mo</span>
                  ) : (
                    <span className={styles.yes} aria-label="Included, unlimited">
                      ✔
                    </span>
                  )}
                </td>
                <td>
                  {isAiFeature ? (
                    <span className={styles.unlimited}>Unlimited</span>
                  ) : (
                    <span className={styles.yes} aria-label="Included, unlimited">
                      ✔
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
