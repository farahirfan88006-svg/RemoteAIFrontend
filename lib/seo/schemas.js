import { siteConfig } from "./siteConfig";

/**
 * Reusable JSON-LD ("schema.org") builders.
 *
 * Each function returns a plain JS object describing one schema.org type.
 * Pages render the result by JSON.stringify-ing it into a
 * <script type="application/ld+json"> tag — see app/layout.js for the
 * Organization schema usage.
 *
 * Keeping builders here (instead of inlining JSON-LD in each page) means
 * every page gets consistent, typo-free structured data, and future pages
 * (Jobs, Blog) can compose these same helpers instead of writing new ones.
 */

/**
 * Base Organization schema — identifies RemoteAI as an entity to search
 * engines. No `sameAs` field: RemoteAI has no official social media
 * profiles yet, and this should only be added once real accounts exist.
 */
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
  };
}

/** WebSite schema — enables sitelinks search box eligibility. */
export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

/**
 * Breadcrumb schema builder.
 * @param {{ name: string, path: string }[]} items - ordered from root to current page
 */
export function buildBreadcrumbSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

/**
 * ItemList schema builder for the /jobs listing page — describes the
 * current page of results as an ordered list of JobPosting items.
 * @param {Array<object>} jobs - normalized job objects for the current page
 * @param {{ path?: string, startPosition?: number }} [options]
 */
export function buildJobsItemListSchema(jobs = [], { path = "/jobs", startPosition = 1 } = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url: `${siteConfig.url}${path}`,
    itemListElement: jobs.map((job, index) => ({
      "@type": "ListItem",
      position: startPosition + index,
      url: job.slug ? `${siteConfig.url}/jobs/${job.slug}` : undefined,
      item: buildJobPostingSchema(job),
    })),
  };
}

/**
 * CollectionPage schema builder — identifies a landing page (category,
 * country, or company) as a curated collection of JobPosting items, as
 * distinct from the ItemList schema above (which describes one page of
 * *results*). Search engines use CollectionPage to understand the page's
 * own identity (name/description/URL) separately from what it lists.
 *
 * @param {{ name: string, description: string, path: string }} options
 */
export function buildCollectionPageSchema({ name, description, path }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: `${siteConfig.url}${path}`,
  };
}

/**
 * JobPosting schema builder — reused by both the future Job Details page
 * and the ItemList schema above.
 * @param {object} job
 */
export function buildJobPostingSchema(job = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: job.companyName,
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: {
      "@type": "Country",
      name: job.country || "Remote",
    },
  };
}

/**
 * Article schema for a blog post detail page (app/blog/[slug]/page.js).
 * Same minimal, only-what-we-actually-have approach as
 * buildJobPostingSchema above — no invented fields.
 */
export function buildArticleSchema(post = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author?.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };
}
