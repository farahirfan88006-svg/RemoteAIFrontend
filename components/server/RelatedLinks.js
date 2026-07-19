import Link from "next/link";
import Tag from "@/components/ui/Tag";
import styles from "./RelatedLinks.module.css";

/**
 * Internal-linking block shown at the bottom of every category/country/
 * company SEO landing page (see app/jobs/category|country|company/[slug]/
 * page.js). Renders up to `limit` other categories, countries, and
 * companies (sorted by job count, i.e. "popular" — the same ranking IS
 * the "related" ranking here, since there's no cheaper, equally-relevant
 * signal available without an extra scoped aggregation call per page),
 * plus a link back to the full, unfiltered jobs listing ("Latest jobs").
 *
 * Receives all three lists as props — they're loaded once per request by
 * the page (see lib/api/taxonomy.js, lib/api/companies.js) and reused
 * here, rather than this component fetching anything itself.
 *
 * @param {{
 *   categories: Array<{name:string,slug:string,count:number}>,
 *   countries: Array<{name:string,slug:string,count:number}>,
 *   companies: Array<{name:string,slug:string,count:number}>,
 *   skills?: Array<{name:string,slug:string,count:number}>,
 *   seoLinks?: Array<{name:string,href:string}>,
 *   currentType?: "category" | "country" | "company" | "skill",
 *   currentSlug?: string,
 *   limit?: number,
 * }} props
 *
 * `skills` (linking to `/remote-{slug}-jobs`) and `seoLinks` (arbitrary
 * `{name, href}` pairs — used for cross-linking to the employment-type
 * and experience-level SEO pages, e.g. "Full-time", "Senior") are new,
 * optional, and default to `[]`: every existing caller of this component
 * renders exactly as before. Only app/[seoSlug]/page.js passes them.
 */
export default function RelatedLinks({
  categories = [],
  countries = [],
  companies = [],
  skills = [],
  seoLinks = [],
  currentType,
  currentSlug,
  limit = 10,
}) {
  const otherCategories = excludeCurrent(categories, currentType === "category" ? currentSlug : null).slice(
    0,
    limit,
  );
  const otherCountries = excludeCurrent(countries, currentType === "country" ? currentSlug : null).slice(0, limit);
  const otherCompanies = excludeCurrent(companies, currentType === "company" ? currentSlug : null).slice(0, limit);
  const otherSkills = excludeCurrent(skills, currentType === "skill" ? currentSlug : null).slice(0, limit);

  const hasAnyLinks =
    otherCategories.length || otherCountries.length || otherCompanies.length || otherSkills.length || seoLinks.length;
  if (!hasAnyLinks) return null;

  return (
    <section className={styles.wrapper} aria-label="Explore more remote jobs">
      <div className={styles.header}>
        <h2 className={styles.heading}>Explore more remote jobs</h2>
        <Link href="/jobs" className={styles.latestLink}>
          Browse all latest jobs →
        </Link>
      </div>

      <div className={styles.groups}>
        {otherCategories.length > 0 && (
          <div className={styles.group}>
            <h3 className={styles.groupHeading}>Popular categories</h3>
            <ul className={styles.chipList}>
              {otherCategories.map((category) => (
                <li key={category.slug}>
                  <Link href={`/jobs/category/${category.slug}`}>
                    <Tag>
                      {category.name} ({category.count.toLocaleString()})
                    </Tag>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {otherCountries.length > 0 && (
          <div className={styles.group}>
            <h3 className={styles.groupHeading}>Popular countries</h3>
            <ul className={styles.chipList}>
              {otherCountries.map((country) => (
                <li key={country.slug}>
                  <Link href={`/jobs/country/${country.slug}`}>
                    <Tag>
                      {country.name} ({country.count.toLocaleString()})
                    </Tag>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {otherCompanies.length > 0 && (
          <div className={styles.group}>
            <h3 className={styles.groupHeading}>Companies hiring now</h3>
            <ul className={styles.chipList}>
              {otherCompanies.map((company) => (
                <li key={company.slug}>
                  <Link href={`/jobs/company/${company.slug}`}>
                    <Tag>
                      {company.name} ({company.count.toLocaleString()})
                    </Tag>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {otherSkills.length > 0 && (
          <div className={styles.group}>
            <h3 className={styles.groupHeading}>Popular skills</h3>
            <ul className={styles.chipList}>
              {otherSkills.map((skill) => (
                <li key={skill.slug}>
                  <Link href={`/remote-${skill.slug}-jobs`}>
                    <Tag>
                      {skill.name} ({skill.count.toLocaleString()})
                    </Tag>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {seoLinks.length > 0 && (
          <div className={styles.group}>
            <h3 className={styles.groupHeading}>Related searches</h3>
            <ul className={styles.chipList}>
              {seoLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <Tag>{link.name}</Tag>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function excludeCurrent(list, currentSlug) {
  if (!currentSlug) return list;
  return list.filter((entry) => entry.slug !== currentSlug);
}
