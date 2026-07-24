"use client";

import { useRouter } from "next/navigation";
import { SORT_OPTIONS } from "@/lib/jobs/constants";
import { buildJobsHref } from "@/lib/jobs/searchParams";
import styles from "./JobsSortDropdown.module.css";

/**
 * Sort control for /jobs. Small, isolated Client Component — the only
 * interactivity is navigating to the same filter state with a new `sort`
 * value, so it's kept separate from the (larger) filter sidebar.
 *
 * @param {{ filters: object, basePath?: string, omit?: string[] }} props
 *   `basePath`/`omit` let category/country/company landing pages sort
 *   within their own canonical path — see buildJobsHref in
 *   lib/jobs/searchParams.js. Both default to the prior /jobs behavior.
 */
export default function JobsSortDropdown({ filters, basePath = "/jobs", omit = [] }) {
  const router = useRouter();

  function handleChange(event) {
    // No `page` override: buildJobsHref resets pagination to 1, since the
    // result ordering (and therefore what page 2+ contains) changes.
    router.push(buildJobsHref(filters, { sort: event.target.value }, { basePath, omit }));
  }

  return (
    <div className={styles.wrapper}>
      <label htmlFor="jobs-sort" className={styles.label}>
        Sort by
      </label>
      <select id="jobs-sort" className={styles.select} value={filters.sort} onChange={handleChange}>
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
