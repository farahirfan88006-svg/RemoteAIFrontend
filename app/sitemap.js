import { siteConfig } from "@/lib/seo/siteConfig";
import { getCategories, getCountries } from "@/lib/api/taxonomy";
import { getCompanies } from "@/lib/api/companies";
import { getSeoPageDefs } from "@/lib/seo/seoPages";
import { getAllSlugs as getAllBlogSlugs, getCategories as getBlogCategories } from "@/lib/blog/blogService";
import { BLOG_POSTS } from "@/lib/blog/posts";

/**
 * Next.js App Router sitemap convention (app/sitemap.js -> /sitemap.xml).
 * This project had no sitemap before — this is a new, additive file, not
 * a modification of anything existing.
 *
 * Every dynamic section is pulled live, the same way the pages themselves
 * load it (lib/api/taxonomy.js, lib/api/companies.js, lib/seo/seoPages.js
 * — the latter is also what generates every /remote-{x}-jobs-style page,
 * see app/[seoSlug]/page.js), so a category/country/company/tag that
 * appears or disappears is reflected here automatically — nothing is a
 * hardcoded URL list.
 *
 * Job detail pages (/jobs/{slug}) aren't included: that route doesn't
 * exist yet in this codebase (see components/server/JobCard.js's own
 * comment — "Job Details... lands in a later phase"), so listing it here
 * would just add 404s to the sitemap.
 *
 * Next.js's sitemap XML serializer interpolates each entry's `url`
 * directly into `<loc>` without HTML/XML-entity escaping it — it assumes
 * the string is already a well-formed URL. A raw `&`, `<`, `>`, `'`, or
 * `"` coming through in any live slug (category/country/company/tag —
 * none of which this app controls the source data for) would land in the
 * XML unescaped and break the whole document (the exact
 * "xmlParseEntityRef: no name" class of error). `urlSlug` below closes
 * that gap once, for every dynamic segment used here, by percent-encoding
 * it the same way any URL path segment should be — a clean kebab-case
 * slug like "product-design" passes through byte-for-byte unchanged; a
 * slug containing "&" or similar becomes "%26" etc., which is both valid
 * in a URL and can never be misparsed as an XML entity.
 */
function urlSlug(value) {
  return encodeURIComponent(String(value ?? ""));
}

const STATIC_ROUTES = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/jobs", changeFrequency: "hourly", priority: 0.9 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.5 },
  { path: "/career-coach", changeFrequency: "monthly", priority: 0.4 },
  { path: "/mock-interview", changeFrequency: "monthly", priority: 0.4 },
  { path: "/resume-rewrite", changeFrequency: "monthly", priority: 0.4 },
  { path: "/match-score", changeFrequency: "monthly", priority: 0.4 },
  { path: "/blog", changeFrequency: "daily", priority: 0.6 },
  { path: "/about", changeFrequency: "monthly", priority: 0.3 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.3 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.1 },
];

export default async function sitemap() {
  const [categories, countries, companies, seoDefs] = await Promise.all([
    getCategories(),
    getCountries(),
    getCompanies(),
    getSeoPageDefs(),
  ]);

  const now = new Date();

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const categoryEntries = categories.map((category) => ({
    url: `${siteConfig.url}/jobs/category/${urlSlug(category.slug)}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const countryEntries = countries.map((country) => ({
    url: `${siteConfig.url}/jobs/country/${urlSlug(country.slug)}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.6,
  }));

  const companyEntries = companies.map((company) => ({
    url: `${siteConfig.url}/jobs/company/${urlSlug(company.slug)}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.5,
  }));

  // Every programmatic SEO page — categories, skills, employment types,
  // experience levels — from the exact same registry that generates
  // the pages themselves (see lib/seo/seoPages.js).
  const seoEntries = seoDefs.map((def) => ({
    url: `${siteConfig.url}/${urlSlug(def.slug)}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: def.dimension === "category" || def.dimension === "skill" ? 0.7 : 0.6,
  }));

  // Blog — static content (see lib/blog/posts.js), so `lastModified` uses
  // each post's own publishedAt rather than the build time `now` used
  // for the live/dynamic sections above.
  const blogPostEntries = getAllBlogSlugs().map((slug) => {
    const post = BLOG_POSTS.find((p) => p.slug === slug);
    return {
      url: `${siteConfig.url}/blog/${urlSlug(slug)}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly",
      priority: 0.5,
    };
  });

  const blogCategoryEntries = getBlogCategories().map((category) => ({
    url: `${siteConfig.url}/blog/category/${urlSlug(category.slug)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.4,
  }));

  return [
    ...staticEntries,
    ...categoryEntries,
    ...countryEntries,
    ...companyEntries,
    ...seoEntries,
    ...blogPostEntries,
    ...blogCategoryEntries,
  ];
}
