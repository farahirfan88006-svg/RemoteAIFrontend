import Button from "@/components/ui/Button";
import styles from "./JobsErrorState.module.css";

/**
 * Shared error-state markup for /jobs. Deliberately framework-agnostic
 * (no hooks, no "use client") so it can render both:
 *  - inline, from the async server component, when `getJobs` catches an
 *    API error gracefully (see lib/api/jobs.js), and
 *  - inside app/jobs/error.js, the Next.js error boundary for genuinely
 *    unexpected render/runtime errors (which Next requires to be a Client
 *    Component, but the boundary itself just renders this).
 *
 * @param {{ onRetry?: () => void }} props
 */
export default function JobsErrorState({ onRetry }) {
  return (
    <div className={styles.state} role="alert">
      <span className="eyebrow">
        <span className="dot" />
        Something went wrong
      </span>
      <h2 className={styles.heading}>We couldn&apos;t load jobs right now</h2>
      <p className={styles.body}>
        This is likely temporary. Try again in a moment.
      </p>
      {onRetry ? (
        <Button type="button" variant="secondary" onClick={onRetry} className={styles.action}>
          Try again
        </Button>
      ) : (
        <Button href="/jobs" variant="secondary" className={styles.action}>
          Reload jobs
        </Button>
      )}
    </div>
  );
}
