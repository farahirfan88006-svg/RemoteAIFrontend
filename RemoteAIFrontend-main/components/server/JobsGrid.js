import JobCard from "./JobCard";
import styles from "./JobsGrid.module.css";

/**
 * Lays out a page of jobs. Server Component — purely presentational.
 * Assumes `jobs` is already the correct page/filter/sort slice; it owns
 * layout only, not data fetching (see components/server/JobsResults.js).
 *
 * @param {{ jobs: Array<object> }} props
 */
export default function JobsGrid({ jobs }) {
  return (
    <ul className={styles.grid}>
      {jobs.map((job) => (
        <li key={job.id || job.slug}>
          <JobCard job={job} />
        </li>
      ))}
    </ul>
  );
}
