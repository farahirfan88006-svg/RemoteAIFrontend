/**
 * Adapts one raw job record from the backend into the shape the existing
 * UI already expects:
 *  - components/server/JobCard.js reads: slug, title, companyName, location,
 *    remoteTypeLabel/remoteType, employmentTypeLabel/employmentType,
 *    salaryLabel, postedAtLabel, summary, tags
 *  - lib/seo/schemas.js#buildJobPostingSchema reads: title, description,
 *    datePosted, employmentType, companyName, country
 *
 * Different Express/Mongo APIs name these fields differently (e.g. `company`
 * vs `companyName`, `jobType` vs `employmentType`, `createdAt` vs
 * `postedAt`). Rather than changing the UI to match one specific backend,
 * this module is the single place that maps "whatever the API calls it" to
 * "what the UI already reads" — so JobCard.js and schemas.js never need to
 * change as the backend evolves.
 *
 * Nothing here invents data: a field that isn't present anywhere on the raw
 * record is simply left undefined, and the UI already renders optional
 * fields defensively.
 */

/** Returns the first defined, non-null, non-empty-string value among `keys` on `obj`. */
function pick(obj, keys) {
  for (const key of keys) {
    const value = obj?.[key];
    if (value !== undefined && value !== null && value !== "") return value;
  }
  return undefined;
}

function toCompanyName(job) {
  const direct = pick(job, ["companyName", "company_name"]);
  if (direct) return direct;
  const company = job?.company;
  if (typeof company === "string") return company;
  if (company && typeof company === "object") {
    return pick(company, ["name", "companyName", "title"]);
  }
  return undefined;
}

function toLocation(job) {
  const direct = pick(job, ["location", "locationLabel", "jobLocation", "city"]);
  if (direct) return direct;
  if (Array.isArray(job?.locations) && job.locations.length) {
    return job.locations.join(", ");
  }
  return undefined;
}

function formatSalary(job) {
  const label = pick(job, ["salaryLabel", "salary_label"]);
  if (label) return label;

  const currency = pick(job, ["salaryCurrency", "currency"]) || "USD";
  const min = pick(job, ["salaryMin", "salary_min", "minSalary"]) ?? job?.salary?.min;
  const max = pick(job, ["salaryMax", "salary_max", "maxSalary"]) ?? job?.salary?.max;
  const flat = typeof job?.salary === "number" ? job.salary : undefined;

  const formatNumber = (value) => {
    const num = Number(value);
    if (!Number.isFinite(num)) return undefined;
    return num >= 1000 ? `${Math.round(num / 1000)}k` : String(num);
  };

  const symbol = currency === "USD" ? "$" : `${currency} `;

  if (min !== undefined && max !== undefined) {
    const minStr = formatNumber(min);
    const maxStr = formatNumber(max);
    if (minStr && maxStr) return `${symbol}${minStr} – ${symbol}${maxStr}`;
  }
  if (min !== undefined) {
    const minStr = formatNumber(min);
    if (minStr) return `From ${symbol}${minStr}`;
  }
  if (max !== undefined) {
    const maxStr = formatNumber(max);
    if (maxStr) return `Up to ${symbol}${maxStr}`;
  }
  if (flat !== undefined) {
    const flatStr = formatNumber(flat);
    if (flatStr) return `${symbol}${flatStr}`;
  }
  return undefined;
}

function toDatePosted(job) {
  return pick(job, ["datePosted", "postedAt", "posted_at", "createdAt", "created_at", "publishedAt"]);
}

function formatPostedAtLabel(job) {
  const explicitLabel = pick(job, ["postedAtLabel"]);
  if (explicitLabel) return explicitLabel;

  const rawDate = toDatePosted(job);
  if (!rawDate) return undefined;

  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) return undefined;

  const diffMs = Date.now() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Posted today";
  if (diffDays === 1) return "Posted 1 day ago";
  if (diffDays < 30) return `Posted ${diffDays} days ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths === 1) return "Posted 1 month ago";
  if (diffMonths < 12) return `Posted ${diffMonths} months ago`;
  const diffYears = Math.floor(diffMonths / 12);
  return diffYears === 1 ? "Posted 1 year ago" : `Posted ${diffYears} years ago`;
}

function toTags(job) {
  const list = job?.tags || job?.skills || job?.categories;
  return Array.isArray(list) ? list.filter((item) => typeof item === "string") : [];
}

/**
 * Normalizes one raw job record from the API into the fields the existing
 * UI and JSON-LD builders read. Unknown/extra fields on the raw record are
 * preserved (spread first) in case a later phase needs them.
 *
 * @param {object} job - raw record as returned by the backend
 * @returns {object} normalized job
 */
export function normalizeJob(job = {}) {
  const employmentType = pick(job, ["employmentType", "employmentTypeLabel", "jobType", "type", "contractType"]);
  const remoteType = pick(job, ["remoteType", "remoteTypeLabel", "workplaceType", "workType"]);

  return {
    ...job,
    slug: pick(job, ["slug", "id", "_id"]),
    title: pick(job, ["title", "jobTitle", "name"]) || "Untitled role",
    companyName: toCompanyName(job),
    location: toLocation(job),
    country: pick(job, ["country", "countryCode"]),
    remoteType,
    remoteTypeLabel: pick(job, ["remoteTypeLabel"]) || remoteType,
    employmentType,
    employmentTypeLabel: pick(job, ["employmentTypeLabel"]) || employmentType,
    salaryLabel: formatSalary(job),
    datePosted: toDatePosted(job),
    postedAtLabel: formatPostedAtLabel(job),
    summary: pick(job, ["summary", "description", "jobDescription", "shortDescription"]),
    description: pick(job, ["description", "jobDescription", "summary"]),
    tags: toTags(job),
  };
}
