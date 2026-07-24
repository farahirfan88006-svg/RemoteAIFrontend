import styles from "./PricingCard.module.css";

/**
 * Single plan card for the pricing page. Deliberately takes plain
 * props rather than reading the feature registry itself, so it stays
 * reusable for any future plan tier without a schema change.
 *
 * @param {object} props
 * @param {string} props.name - "Free" | "Premium"
 * @param {string} props.price - e.g. "$0" or "$12"
 * @param {string} [props.period] - e.g. "/month"
 * @param {string} [props.tagline]
 * @param {string[]} props.features - short bullet strings
 * @param {boolean} [props.highlighted] - visually promote this plan (Premium)
 * @param {string} [props.ctaLabel]
 * @param {React.ReactNode} [props.cta] - custom call-to-action element
 */
export default function PricingCard({
  name,
  price,
  period,
  tagline,
  features,
  highlighted = false,
  ctaLabel = "Get started",
  cta,
}) {
  return (
    <div className={`card ${styles.card} ${highlighted ? styles.highlighted : ""}`.trim()}>
      {highlighted && <span className={`badge badge-accent ${styles.ribbon}`}>Most popular</span>}

      <h3 className={styles.name}>{name}</h3>
      {tagline && <p className={styles.tagline}>{tagline}</p>}

      <div className={styles.priceRow}>
        <span className={styles.price}>{price}</span>
        {period && <span className={styles.period}>{period}</span>}
      </div>

      <ul className={styles.features}>
        {features.map((feature) => (
          <li key={feature}>
            <span className={styles.check} aria-hidden="true">
              ✔
            </span>
            {feature}
          </li>
        ))}
      </ul>

      {cta ?? (
        <button type="button" className={`btn ${highlighted ? "btn-primary" : "btn-secondary"} ${styles.cta}`}>
          {ctaLabel}
        </button>
      )}
    </div>
  );
}
