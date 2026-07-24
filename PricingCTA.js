import Button from "@/components/ui/Button";
import styles from "./PricingCTA.module.css";

export default function PricingCTA() {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.panel}>
          <span className={styles.glow} aria-hidden="true" />

          <div className={styles.content}>
            <span className={`eyebrow ${styles.eyebrow}`}>
              <span className="dot dot--pulse" />
              Free for job seekers, always
            </span>
            <h2 className={styles.heading}>Start free. Upgrade only if you need more.</h2>
            <p className={styles.subheading}>
              Build your resume, track applications, and search remote roles today at no
              cost — then request early access to Premium&apos;s AI tools whenever you&apos;re ready.
            </p>
          </div>

          <div className={styles.actions}>
            <Button href="/jobs" size="lg" variant="primary" className={styles.ctaPrimary}>
              Browse remote jobs
            </Button>
            <Button href="/contact" size="lg" variant="secondary">
              Talk to us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
