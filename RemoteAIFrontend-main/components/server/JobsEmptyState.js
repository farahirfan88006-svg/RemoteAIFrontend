import Button from "@/components/ui/Button";
import styles from "./JobsEmptyState.module.css";

/**
 * Renders in place of the grid when there are zero jobs to show.
 * Two distinct copies:
 *  - `notConnected`: the jobs API isn't wired up yet (Phase 4 temporary
 *    state) — this is expected, not an error.
 *  - otherwise: a real query ran and legitimately matched nothing, so we
 *    point the person back to an unfiltered search.
 *
 * @param {{ notConnected?: boolean, hasFilters?: boolean }} props
 */
export default function JobsEmptyState({ notConnected = false, hasFilters = false }) {
  if (notConnected) {
    return (
      <div className={styles.state} role="status">
        <span className="eyebrow">
          <span className="dot" />
          Listings coming soon
        </span>
        <h2 className={styles.heading}>Job listings aren&apos;t connected yet</h2>
        <p className={styles.body}>
          This page is wired up and ready — search, filters, sorting, and pagination all
          work — but it isn&apos;t pointed at a live jobs feed yet. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.state} role="status">
      <span className="eyebrow">
        <span className="dot" />
        No matches
      </span>
      <h2 className={styles.heading}>No jobs match your search</h2>
      <p className={styles.body}>
        Try removing a filter or searching a broader term.
      </p>
      {hasFilters && (
        <Button href="/jobs" variant="secondary" className={styles.action}>
          Clear all filters
        </Button>
      )}
    </div>
  );
}
