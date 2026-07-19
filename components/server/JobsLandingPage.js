import { Suspense } from "react";
import Link from "next/link";
import JsonLd from "./JsonLd";
import JobsResults from "./JobsResults";
import JobsLoadingSkeleton from "./JobsLoadingSkeleton";
import RelatedLinks from "./RelatedLinks";
import JobsSearchBar from "@/components/client/JobsSearchBar";
import JobsSortDropdown from "@/components/client/JobsSortDropdown";
import { buildBreadcrumbSchema, buildCollectionPageSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";
import styles from "@/app/jobs/page.module.css";

/**
 * Shared template for /jobs/category/[slug], /jobs/country/[slug], and
 * /jobs/company/[slug] — each page.js resolves its own slug against the
 * relevant taxonomy (see lib/api/taxonomy.js / lib/api/companies.js),
 * builds `filters` with that dimension locked in, and hands everything
 * here so the three routes share one layout, one Suspense boundary, one
 * JobsResults/JobsSearchBar/JobsSortDropdown wiring, and one internal
 * linking block — rather than three near-identical page bodies drifting
 * apart over time.
 *
 * Deliberately does NOT reuse JobsFilterSidebar: the spec for these pages
 * calls for heading + description + count + in-page search + pagination,
 * not the full type/experience/remoteType/salary filter set — keeping
 * that off these pages also means one crawlable page per category/
 * country/company (good for SEO), rather than a combinatorial explosion
 * of filter permutations under each landing page.
 *
 * @param {{
 *   eyebrow: string,
 *   heading: string,
 *   description: string,
 *   breadcrumbItems: Array<{name: string, path: string}>,
 *   filters: object,
 *   basePath: string,
 *   omit: string[],
 *   categories: Array<{name:string,slug:string,count:number}>,
 *   countries: Array<{name:string,slug:string,count:number}>,
 *   companies: Array<{name:string,slug:string,count:number}>,
 *   skills?: Array<{name:string,slug:string,count:number}>,
 *   seoLinks?: Array<{name:string,href:string}>,
 *   relatedType?: "category" | "country" | "company" | "skill",
 *   relatedSlug?: string,
 * }} props
 */
export default function JobsLandingPage({
  eyebrow,
  heading,
  description,
  breadcrumbItems,
  filters,
  basePath,
  omit,
  categories,
  countries,
  companies,
  skills = [],
  seoLinks = [],
  relatedType,
  relatedSlug,
}) {
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const collectionSchema = buildCollectionPageSchema({ name: heading, description, path: basePath });

  return (
    <>
      <JsonLd data={[breadcrumbSchema, collectionSchema]} />

      <section className={styles.hero}>
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            {breadcrumbItems.map((item, index) => (
              <span key={item.path}>
                {index > 0 && " / "}
                {index === breadcrumbItems.length - 1 ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <Link href={item.path}>{item.name}</Link>
                )}
              </span>
            ))}
          </nav>
          <span className="eyebrow">
            <span className="dot dot--pulse" />
            {eyebrow}
          </span>
          <h1 className={styles.heading}>{heading}</h1>
          <p className={styles.subheading}>{description}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.main}>
            <div className={styles.toolbar}>
              <JobsSearchBar filters={filters} basePath={basePath} omit={omit} />
              <JobsSortDropdown filters={filters} basePath={basePath} omit={omit} />
            </div>

            <Suspense key={JSON.stringify(filters)} fallback={<JobsLoadingSkeleton />}>
              <JobsResults filters={filters} basePath={basePath} omit={omit} />
            </Suspense>

            <RelatedLinks
              categories={categories}
              countries={countries}
              companies={companies}
              skills={skills}
              seoLinks={seoLinks}
              currentType={relatedType}
              currentSlug={relatedSlug}
            />
          </div>
        </div>
      </section>
    </>
  );
}

/** Small helper so each page.js's generateMetadata can build a consistent canonical path. */
export function buildCanonicalPath(basePath, page) {
  return page > 1 ? `${basePath}?page=${page}` : basePath;
}

/** Small helper so each page.js's generateMetadata can build consistent OG/Twitter fields. */
export function buildLandingMetadata({ title, description, canonicalPath, keywords }) {
  const fullTitle = `${title} | ${siteConfig.name}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: fullTitle,
      description,
      url: `${siteConfig.url}${canonicalPath}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
