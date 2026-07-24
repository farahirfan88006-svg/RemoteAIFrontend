import Card from "@/components/ui/Card";
import CTASection from "@/components/server/CTASection";
import JsonLd from "@/components/server/JsonLd";
import { siteConfig } from "@/lib/seo/siteConfig";
import { buildBreadcrumbSchema } from "@/lib/seo/schemas";
import styles from "./page.module.css";

/**
 * Real feature set only — mirrors what's actually built elsewhere in this
 * app (see app/jobs, app/resumes, app/resume-analyzer, app/cover-letters,
 * the Interview Questions panel, and the Salary Estimate widget). No
 * invented metrics or stats are used on this page.
 */
const OFFERINGS = [
  {
    title: "Remote Jobs",
    description:
      "Browse curated remote job listings across engineering, design, product, and more.",
  },
  {
    title: "AI Resume Builder",
    description:
      "Build a professional resume with AI assistance, from a blank page to a polished, ready-to-send document.",
  },
  {
    title: "ATS Resume Analyzer",
    description:
      "Check how well your resume is likely to perform against applicant tracking systems before you apply.",
  },
  {
    title: "AI Cover Letter Generator",
    description:
      "Generate a tailored cover letter for a specific role in a fraction of the time it takes to write one from scratch.",
  },
  {
    title: "Interview Preparation",
    description:
      "Get role-specific interview questions and suggested answers so you can walk into an interview prepared.",
  },
  {
    title: "Salary Estimator",
    description:
      "See an estimated salary range for a role based on title, location, and experience level.",
  },
];

/**
 * generateMetadata (rather than a static `export const metadata`) per the
 * Phase 3 requirement — content here is static, but this keeps every page
 * consistent and leaves room for future dynamic titles without a rewrite.
 */
export async function generateMetadata() {
  const title = "About Us";
  const description =
    "RemoteAI is an AI-powered platform that helps professionals discover remote jobs and improve their chances of getting hired with AI career tools — Resume Builder, ATS Analyzer, Cover Letter Generator, Interview Prep, and Salary Estimator.";

  return {
    title,
    description,
    alternates: { canonical: "/about" },
    openGraph: {
      type: "website",
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/about`,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: siteConfig.socialImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [siteConfig.socialImage],
    },
  };
}

export default function AboutPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <section className={styles.intro}>
        <div className="container">
          <span className="eyebrow">
            <span className="dot" />
            About RemoteAI
          </span>
          <h1 className={styles.heading}>
            Helping professionals find remote opportunities with AI
          </h1>
          <p className={styles.subheading}>
            RemoteAI is an AI-powered platform created to help job seekers
            discover high-quality remote jobs while providing practical
            tools to improve their chances of getting hired.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">
              <span className="dot" />
              Our mission
            </span>
            <h2>Making remote hiring simpler, smarter, and more accessible</h2>
            <p>
              Our mission is to make remote hiring simpler, smarter, and more
              accessible for everyone by combining verified remote
              opportunities with AI-powered career tools — from a resume
              builder and ATS analyzer to a cover letter generator, interview
              question preparation, and a salary estimator, all in one
              place.
            </p>
          </div>
        </div>
      </section>

      <section className={`section ${styles.valuesSection}`}>
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">
              <span className="dot" />
              What we offer
            </span>
            <h2>Everything you need to land a remote role</h2>
          </div>

          <div className={styles.valuesGrid}>
            {OFFERINGS.map((offering) => (
              <Card key={offering.title}>
                <h3 className={styles.valueTitle}>{offering.title}</h3>
                <p className={styles.valueDescription}>{offering.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Card className={styles.builtByCard}>
            <span className="eyebrow">
              <span className="dot" />
              Built by
            </span>

            <div className={styles.builtByProfile}>
              {/* Typographic monogram, not a photo — RemoteAI has no
                  headshot to show, so this is styled text, not a photo
                  placeholder or stock avatar. */}
              <div className={styles.builtByMonogram} aria-hidden="true">
                FI
              </div>
              <div>
                <h2 className={styles.builtByName}>Farah Irfan</h2>
                <p className={styles.builtByTitle}>Founder &amp; Developer of RemoteAI</p>
              </div>
            </div>

            <p className={styles.builtByDescription}>
              RemoteAI is an independent project built and maintained by
              Farah Irfan, with a focus on creating practical tools that
              help professionals build successful remote careers.
            </p>
          </Card>
        </div>
      </section>

      <CTASection />
    </>
  );
}
