import { listFreeFeatures, listPremiumFeatures } from "@/lib/premium/features";
import { IconChevronDown } from "./PricingIcons";
import styles from "./PricingFAQ.module.css";

/** Joins a list of labels into a natural sentence: "A, B and C". */
function joinLabels(labels) {
  if (labels.length <= 1) return labels.join("");
  return `${labels.slice(0, -1).join(", ")} and ${labels[labels.length - 1]}`;
}

/**
 * FAQ content for the pricing page. Built as a plain array (rather
 * than hardcoded JSX) so app/pricing/page.js can reuse the same data
 * to build the FAQPage JSON-LD schema without repeating copy.
 */
export function getPricingFaqs() {
  const freeLabels = listFreeFeatures().map((f) => f.label);
  const premiumLabels = listPremiumFeatures().map((f) => f.label);

  return [
    {
      question: "Is the Free plan actually free, forever?",
      answer: `Yes. Free never expires and never asks for a card. It includes ${joinLabels(
        freeLabels
      )}.`,
    },
    {
      question: "What do I get with Premium?",
      answer: `Premium adds everything in Free plus ${joinLabels(
        premiumLabels
      )} — the AI-powered tools built for people actively applying.`,
    },
    {
      question: "When does Premium billing go live?",
      answer:
        "Premium billing isn't live yet — this page reflects what each plan will include once it is. Tap \"Notify me\" on the Premium plan above to hear the moment it opens.",
    },
    {
      question: "Do I need to enter payment details to use RemoteAI today?",
      answer:
        "No. Every account is currently on the Free plan while Premium billing is being built, and requesting early access doesn't charge you anything.",
    },
    {
      question: "Can I see what Premium tools look like before they launch?",
      answer:
        "Yes. Premium-only pages are visible today with a locked preview showing exactly what each tool does, so you know what you're signing up for ahead of launch.",
    },
  ];
}

export default function PricingFAQ() {
  const faqs = getPricingFaqs();

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">
            <span className="dot" />
            FAQ
          </span>
          <h2>Questions about the plans</h2>
          <p>Everything you need to know about Free and Premium, straight from the source.</p>
        </div>

        <div className={styles.list}>
          {faqs.map((faq) => (
            <details key={faq.question} className={`card ${styles.item}`}>
              <summary className={styles.question}>
                <span>{faq.question}</span>
                <IconChevronDown className={styles.chevron} aria-hidden="true" />
              </summary>
              <p className={styles.answer}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
