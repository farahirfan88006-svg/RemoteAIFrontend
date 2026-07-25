import { Suspense } from "react";
import Link from "next/link";
import JsonLd from "./JsonLd";
import JobsResults from "./JobsResults";
import JobsLoadingSkeleton from "./JobsLoadingSkeleton";
import RelatedLinks from "./RelatedLinks";
import FaqSection from "./FaqSection";
import AiToolsPromo from "./AiToolsPromo";
import JobsSearchBar from "@/components/client/JobsSearchBar";
import JobsSortDropdown from "@/components/client/JobsSortDropdown";
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildFaqSchema } from "@/lib/seo/schemas";
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
 *   introContent?: string,
 *   faqs?: Array<{question: string, answer: string}>,
 *   showAiToolsPromo?: boolean,
 * }} props
 *
 * `introContent`, `faqs`, and `showAiToolsPromo` are optional and default
 * to rendering nothing extra — /jobs/category/[slug], /jobs/country/[slug],
 * and /jobs/company/[slug] don't pass them, so their output is byte-for-
 * byte the same as before these props were added. Only
 * app/[seoSlug]/page.js currently passes them, for the priority category
 * pages that have curated long-form content (see lib/seo/categoryIntros.js).
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
  introContent,
  faqs = [],
  showAiToolsPromo = false,
}) {
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const collectionSchema = buildCollectionPageSchema({ name: heading, description, path: basePath });
  const faqSchema = faqs.length ? buildFaqSchema(faqs) : null;
  const schemas = [breadcrumbSchema, collectionSchema, ...(faqSchema ? [faqSchema] : [])];

  return (
    <>
      <JsonLd data={schemas} />

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

      {introContent && (
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="container">
            <div style={{ maxWidth: "72ch", display: "grid", gap: "1rem" }}>
              {introContent.split("\n\n").map((para, i) => (
                <p key={i} style={{ lineHeight: 1.7, color: "var(--color-text-muted)" }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

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

            <FaqSection faqs={faqs} />

            <RelatedLinks
              categories={categories}
              countries={countries}
              companies={companies}
              skills={skills}
              seoLinks={seoLinks}
              currentType={relatedType}
              currentSlug={relatedSlug}
            />

            {showAiToolsPromo && <AiToolsPromo />}
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
