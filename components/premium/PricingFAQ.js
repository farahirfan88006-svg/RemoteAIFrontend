import { FREE_AI_REQUEST_LIMIT, PLAN_PRICING } from "@/lib/premium/planPricing";
import styles from "./PricingFAQ.module.css";

/**
 * Pricing FAQ. Returns both the rendered markup and the raw Q&A list,
 * so app/pricing/page.js can feed the same copy into a FAQPage JSON-LD
 * schema without duplicating the text.
 */
export function getPricingFaqs() {
  return [
    {
      question: "What counts as an AI request?",
      answer:
        "Using the AI Resume Analyzer, AI Career Coach, Mock Interviews, AI Match Score, or Resume Rewrite each counts as one AI request. Browsing jobs, using the resume and cover letter editors, and tracking saved or applied jobs never count — those are unlimited on every plan.",
    },
    {
      question: `What happens after I use my ${FREE_AI_REQUEST_LIMIT} free AI requests?`,
      answer: `Free includes ${FREE_AI_REQUEST_LIMIT} AI requests per month for each AI tool. Once you reach the limit on a given tool, you can wait for it to reset next month or upgrade to Premium for unlimited use of every AI tool.`,
    },
    {
      question: "Is Premium available to buy right now?",
      answer:
        "Not yet — billing for Premium isn't live. The pricing on this page reflects the plan going forward. Use the Notify me button and we'll email you as soon as Premium is ready to purchase.",
    },
    {
      question: "How much will Premium cost and how does billing work?",
      answer: `Premium will be ${PLAN_PRICING.premium.price}${PLAN_PRICING.premium.period}, billed monthly with no long-term contract.`,
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes. You can cancel whenever you like — your account simply moves back to the Free plan, and you keep full access to every core tool: job listings, search and filters, the resume builder, cover letters, interview questions, and saved and applied jobs.",
    },
    {
      question: "Do unused AI requests roll over to the next month?",
      answer: "No. Each AI tool's allowance resets at the start of the next month rather than carrying over.",
    },
  ];
}

export default function PricingFaq() {
  const faqs = getPricingFaqs();

  return (
    <div className={styles.list}>
      {faqs.map(({ question, answer }) => (
        <details key={question} className={styles.item}>
          <summary className={styles.question}>
            <span>{question}</span>
            <span className={styles.icon} aria-hidden="true" />
          </summary>
          <p className={styles.answer}>{answer}</p>
        </details>
      ))}
    </div>
  );
}
