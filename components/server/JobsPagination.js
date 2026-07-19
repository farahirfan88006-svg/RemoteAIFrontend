import Link from "next/link";
import { buildJobsHref } from "@/lib/jobs/searchParams";
import styles from "./JobsPagination.module.css";

/**
 * SEO-friendly pagination: every page is a real, crawlable <Link href>,
 * not a client-side-only control, so search engines and no-JS clients can
 * reach every page. Server Component — no interactivity required.
 *
 * @param {{ filters: object, totalPages: number, basePath?: string, omit?: string[] }} props
 *   `basePath`/`omit` let category/country/company landing pages
 *   (/jobs/category/[slug], etc.) paginate within their own canonical path
 *   instead of `/jobs?...` — see buildJobsHref in lib/jobs/searchParams.js.
 *   Both default to the prior hardcoded /jobs behavior.
 */
export default function JobsPagination({ filters, totalPages, basePath = "/jobs", omit = [] }) {
  if (!totalPages || totalPages <= 1) return null;

  const { page } = filters;
  const pageNumbers = buildPageWindow(page, totalPages);
  const hrefOptions = { basePath, omit };

  return (
    <nav className={styles.nav} aria-label="Jobs pagination">
      <Link
        href={buildJobsHref(filters, { page: Math.max(page - 1, 1) }, hrefOptions)}
        aria-disabled={page <= 1}
        className={page <= 1 ? styles.disabled : styles.control}
      >
        Previous
      </Link>

      <ul className={styles.pages}>
        {pageNumbers.map((entry, index) =>
          entry === "ellipsis" ? (
            // eslint-disable-next-line react/no-array-index-key -- ellipsis markers are non-interactive and position-stable within a render
            <li key={`ellipsis-${index}`} className={styles.ellipsis} aria-hidden="true">
              …
            </li>
          ) : (
            <li key={entry}>
              <Link
                href={buildJobsHref(filters, { page: entry }, hrefOptions)}
                aria-current={entry === page ? "page" : undefined}
                className={entry === page ? styles.pageActive : styles.page}
              >
                {entry}
              </Link>
            </li>
          ),
        )}
      </ul>

      <Link
        href={buildJobsHref(filters, { page: Math.min(page + 1, totalPages) }, hrefOptions)}
        aria-disabled={page >= totalPages}
        className={page >= totalPages ? styles.disabled : styles.control}
      >
        Next
      </Link>
    </nav>
  );
}

/** Builds a compact [1, "ellipsis", 4, 5, 6, "ellipsis", 12] style window around the current page. */
function buildPageWindow(current, total, windowSize = 1) {
  const pages = new Set([1, total, current]);
  for (let offset = 1; offset <= windowSize; offset += 1) {
    if (current - offset > 0) pages.add(current - offset);
    if (current + offset <= total) pages.add(current + offset);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const result = [];
  sorted.forEach((pageNum, index) => {
    if (index > 0 && pageNum - sorted[index - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(pageNum);
  });
  return result;
}
