/**
 * Structural constants for the Jobs feature.
 *
 * These are UI taxonomy/enum definitions (the fixed set of choices a filter
 * control offers), NOT business data. Actual jobs, companies, categories,
 * and locations are dynamic and must come from the API layer (see
 * lib/api/jobs.js) — never hardcoded here.
 */

/** @typedef {{ value: string, label: string }} FilterOption */

/** @type {FilterOption[]} */
export const JOB_TYPE_OPTIONS = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Internship" },
];

/** @type {FilterOption[]} */
export const EXPERIENCE_LEVEL_OPTIONS = [
  { value: "entry", label: "Entry-level" },
  { value: "mid", label: "Mid-level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead / Principal" },
];

/** @type {FilterOption[]} */
export const REMOTE_TYPE_OPTIONS = [
  { value: "fully-remote", label: "Fully remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "region-locked", label: "Remote (region-locked)" },
];

/** @type {FilterOption[]} */
export const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "salary-desc", label: "Highest salary" },
  { value: "relevance", label: "Relevance" },
];

export const DEFAULT_SORT = "newest";
export const DEFAULT_PAGE_SIZE = 20;

/**
 * Filter groups whose *options* are fixed taxonomy (rendered from the
 * constants above). Category and location are intentionally excluded here
 * — they're dynamic facets that come from the API response and are
 * rendered only when the API supplies them (see JobsFilterSidebar).
 */
export const STATIC_FILTER_GROUPS = [
  { key: "type", label: "Job type", options: JOB_TYPE_OPTIONS },
  { key: "experience", label: "Experience", options: EXPERIENCE_LEVEL_OPTIONS },
  { key: "remoteType", label: "Remote type", options: REMOTE_TYPE_OPTIONS },
];

/**
 * Deep-link hash for a job's Interview Questions panel on /jobs/[slug]
 * (see components/client/InterviewQuestionsPanel.js, which auto-opens
 * and scrolls to itself when this hash is present on mount). Anything
 * that wants to link straight into an already-open panel — e.g. the
 * "🎯 Interview Questions" button on the /jobs listing's JobCard —
 * should link to `/jobs/{slug}#${INTERVIEW_QUESTIONS_HASH}` rather than
 * hardcoding the string, so the two sides can't drift apart. Kept here
 * (a plain, non-"use client" module) so both a Server Component
 * (JobCard) and a Client Component (the panel) can import it safely.
 */
export const INTERVIEW_QUESTIONS_HASH = "interview-questions";
