import styles from "./JobsLoadingSkeleton.module.css";

/**
 * Placeholder grid shown while jobs are loading — used both as
 * app/jobs/loading.js (route-level Suspense fallback on navigation) and as
 * the fallback for the <Suspense> boundary around JobsResults within the
 * page itself. Purely decorative, no data.
 *
 * @param {{ count?: number }} props
 */
export default function JobsLoadingSkeleton({ count = 6 }) {
  return (
    <ul className={styles.grid} aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key -- static placeholder list, index is stable
        <li key={index} className={styles.card}>
          <div className={styles.line} style={{ width: "60%" }} />
          <div className={styles.line} style={{ width: "40%" }} />
          <div className={styles.line} style={{ width: "90%" }} />
          <div className={styles.rowTags}>
            <div className={styles.tag} />
            <div className={styles.tag} />
            <div className={styles.tag} />
          </div>
        </li>
      ))}
    </ul>
  );
}
