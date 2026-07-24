import Button from "@/components/ui/Button";
import { FREE_AI_REQUEST_LIMIT, PLAN_PRICING } from "@/lib/premium/planPricing";
import styles from "./PricingCTA.module.css";

/**
 * Closing CTA for the pricing page. Points at the plan cards and at
 * Contact — there's no checkout to link to yet (see app/pricing/page.js
 * header comment), so this stays honest about that instead of implying
 * a live purchase flow.
 */
export default function PricingCTA() {
  return (
    <div className={styles.panel}>
      <span className={styles.glow} aria-hidden="true" />

      <div className={styles.content}>
        <span className={`eyebrow ${styles.eyebrow}`}>
          <span className="dot dot--pulse" />
          Get more out of your search
        </span>
        <h2 className={styles.heading}>Ready for unlimited AI help?</h2>
        <p className={styles.subheading}>
          Free gets you {FREE_AI_REQUEST_LIMIT} AI requests a month on every tool. Premium removes
          the limit for {PLAN_PRICING.premium.price}
          {PLAN_PRICING.premium.period} — cancel anytime.
        </p>
      </div>

      <div className={styles.actions}>
        <Button href="#plans" size="lg" variant="primary" className={styles.ctaPrimary}>
          Compare plans
        </Button>
        <Button href="/contact" size="lg" variant="secondary">
          Ask a question
        </Button>
      </div>
    </div>
  );
}
