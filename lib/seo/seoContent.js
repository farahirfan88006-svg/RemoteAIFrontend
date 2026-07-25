import { siteConfig } from "./siteConfig";
import { getCategoryIntro } from "./categoryIntros";

/**
 * Turns one SeoPageDef (see lib/seo/seoPages.js) into the copy a landing
 * page needs — eyebrow, H1, subheading, and SEO metadata description/
 * keywords. Every string here is built from a template plus the def's
 * `name`/`count`, the same way app/jobs/category/[slug]/page.js already
 * builds its title/description from `category.name`/`category.count` —
 * this just generalizes that one-off pattern across all four dimensions
 * so no page's copy is typed out by hand.
 *
 * For the handful of priority pages that have real, hand-written
 * long-form content (see lib/seo/categoryIntros.js), the returned object
 * also carries `intro` (a 300-500 word unique paragraph) and `faqs` (a
 * curated FAQ list). Pages without an entry there simply don't get those
 * two fields — `intro` is `undefined` and `faqs` is `[]` — so nothing
 * about their existing output changes.
 *
 * @param {import("./seoPages").SeoPageDef} def
 * @param {{ count?: number }} [liveCount] - override/supply a live count
 *   for dimensions (type/experience) that don't carry one on `def` itself
 *   (see app/[seoSlug]/page.js, which fetches it once per request).
 */
export function buildSeoContent(def, { count } = {}) {
  const resolvedCount = Number.isFinite(count) ? count : def.count;
  const hasCount = Number.isFinite(resolvedCount);
  const countLabel = hasCount ? resolvedCount.toLocaleString() : undefined;
  const roleWord = resolvedCount === 1 ? "role" : "roles";
  const jobWord = resolvedCount === 1 ? "job" : "jobs";
  const curated = getCategoryIntro(def.slug);
  const extra = { intro: curated?.intro, faqs: curated?.faqs || [] };

  switch (def.dimension) {
    case "category":
      return {
        ...extra,
        eyebrow: hasCount ? `${countLabel} open ${roleWord}` : "Open roles",
        heading: `${def.name} Remote Jobs`,
        subheading: `Every remote ${def.name} role currently open on ${siteConfig.name}, sourced continuously from remote-first companies. Search within this category or explore related roles below.`,
        metaDescription: hasCount
          ? `Browse ${countLabel} remote ${def.name} ${jobWord} on ${siteConfig.name}. Updated continuously from remote-first companies hiring now.`
          : `Browse remote ${def.name} jobs on ${siteConfig.name}. Updated continuously from remote-first companies hiring now.`,
        keywords: [
          `${def.name} jobs`,
          `${def.name} remote jobs`,
          "remote jobs",
          `remote ${def.name.toLowerCase()} careers`,
          siteConfig.name,
        ],
      };

    case "skill":
      return {
        ...extra,
        eyebrow: hasCount ? `${countLabel} open ${roleWord}` : "Open roles",
        heading: `Remote ${def.name} Jobs`,
        subheading: `Every remote job currently open on ${siteConfig.name} that calls for ${def.name} experience, sourced continuously from remote-first companies. Search within this list or explore related roles below.`,
        metaDescription: hasCount
          ? `Find ${countLabel} remote ${def.name} ${jobWord} on ${siteConfig.name}. Curated roles that call for ${def.name}, updated continuously from remote-first companies hiring now.`
          : `Find remote ${def.name} jobs on ${siteConfig.name}. Curated roles that call for ${def.name}, updated continuously from remote-first companies.`,
        keywords: [
          `${def.name} jobs`,
          `remote ${def.name} jobs`,
          `${def.name} remote jobs`,
          "remote jobs",
          `${def.name} careers`,
          siteConfig.name,
        ],
      };

    case "type":
      return {
        ...extra,
        eyebrow: hasCount ? `${countLabel} open ${roleWord}` : "Open roles",
        heading: `${def.name} Remote Jobs`,
        subheading: `Every ${def.name.toLowerCase()} remote role currently open on ${siteConfig.name}, sourced continuously from remote-first companies.`,
        metaDescription: hasCount
          ? `Browse ${countLabel} ${def.name.toLowerCase()} remote ${jobWord} on ${siteConfig.name}. Updated continuously from remote-first companies hiring now.`
          : `Browse ${def.name.toLowerCase()} remote jobs on ${siteConfig.name}. Updated continuously from remote-first companies hiring now.`,
        keywords: [
          `${def.name.toLowerCase()} remote jobs`,
          `remote ${def.name.toLowerCase()} jobs`,
          "remote jobs",
          siteConfig.name,
        ],
      };

    case "experience":
    default:
      return {
        ...extra,
        eyebrow: hasCount ? `${countLabel} open ${roleWord}` : "Open roles",
        heading: `${def.name} Remote Jobs`,
        subheading: `Every ${def.name.toLowerCase()} remote role currently open on ${siteConfig.name}, sourced continuously from remote-first companies.`,
        metaDescription: hasCount
          ? `Browse ${countLabel} ${def.name.toLowerCase()} remote ${jobWord} on ${siteConfig.name}. Updated continuously from remote-first companies hiring now.`
          : `Browse ${def.name.toLowerCase()} remote jobs on ${siteConfig.name}. Updated continuously from remote-first companies hiring now.`,
        keywords: [
          `${def.name.toLowerCase()} remote jobs`,
          `remote ${def.name.toLowerCase()} jobs`,
          "remote jobs",
          siteConfig.name,
        ],
      };
  }
}
