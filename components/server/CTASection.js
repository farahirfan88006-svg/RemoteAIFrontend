import Button from "@/components/ui/Button";
import styles from "./CTASection.module.css";

export default function CTASection() {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.panel}>
          <div>
            <h2 className={styles.heading}>Ready to work from anywhere?</h2>
            <p className={styles.subheading}>
              Create a profile, get matched to remote-first roles, and apply
              with a resume built for the way distributed teams hire.
            </p>
          </div>
          <div className={styles.actions}>
            <Button href="/jobs" size="lg" variant="primary">
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
