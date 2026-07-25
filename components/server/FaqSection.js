import styles from "./FaqSection.module.css";

/**
 * Renders a curated FAQ list as a plain, zero-JS <details>/<summary>
 * accordion (server component — no client bundle needed for this).
 * The matching FAQPage JSON-LD is built separately via
 * lib/seo/schemas.js's buildFaqSchema() and rendered through the
 * existing <JsonLd /> component, so schema logic lives in exactly one
 * place instead of being duplicated here.
 *
 * @param {{ faqs: Array<{question: string, answer: string}>, heading?: string }} props
 */
export default function FaqSection({ faqs, heading = "Frequently asked questions" }) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className={styles.wrapper} aria-labelledby="faq-heading">
      <h2 id="faq-heading" className={styles.heading}>
        {heading}
      </h2>
      <div className={styles.list}>
        {faqs.map((faq, i) => (
          <details key={i} className={styles.item}>
            <summary className={styles.question}>{faq.question}</summary>
            <p className={styles.answer}>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
