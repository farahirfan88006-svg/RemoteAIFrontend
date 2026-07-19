"use client";

import { useRouter } from "next/navigation";
import { buildJobsHref } from "@/lib/jobs/searchParams";
import styles from "./JobsSearchBar.module.css";

/**
 * Search input for /jobs, driven entirely by the `q` URL param.
 *
 * Renders as a real GET <form> (works with no JS at all — submitting
 * navigates to `/jobs?q=...` natively). The one client-only enhancement is
 * intercepting submit to route through `buildJobsHref`, so the *other*
 * active filters/sort in the URL are preserved instead of being dropped by
 * a plain form GET (which only serializes its own fields).
 *
 * @param {{ filters: object, basePath?: string, omit?: string[] }} props
 *   `basePath`/`omit` let category/country/company landing pages search
 *   within their own canonical path — see buildJobsHref in
 *   lib/jobs/searchParams.js. Both default to the prior /jobs behavior.
 */
export default function JobsSearchBar({ filters, basePath = "/jobs", omit = [] }) {
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const q = String(formData.get("q") || "").trim();
    router.push(buildJobsHref(filters, { q }, { basePath, omit }));
  }

  return (
    <form role="search" className={styles.form} action={basePath} method="GET" onSubmit={handleSubmit}>
      <label htmlFor="jobs-search" className={styles.label}>
        Search jobs
      </label>
      <input
        id="jobs-search"
        name="q"
        type="search"
        placeholder="Search by title, skill, or keyword"
        defaultValue={filters.q}
        className={styles.input}
      />
      <button type="submit" className={styles.submit}>
        Search
      </button>
    </form>
  );
}
