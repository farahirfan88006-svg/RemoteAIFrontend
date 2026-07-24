import { notFound } from "next/navigation";
import { getJobBySlug } from "@/lib/api/jobs";
import { buildJobPostingSchema, buildBreadcrumbSchema } from "@/lib/seo/schemas";
import { siteConfig } from "@/lib/seo/siteConfig";
import JsonLd from "@/components/server/JsonLd";
import Tag from "@/components/ui/Tag";
import ApplyButton from "@/components/server/ApplyButton";
import SalaryEstimate from "@/components/client/SalaryEstimate";
import InterviewQuestionsPanel from "@/components/client/InterviewQuestionsPanel";
import GenerateCoverLetterButton from "@/components/client/GenerateCoverLetterButton";
import SaveJobButton from "@/components/client/SaveJobButton";
import InterviewQuestionsTriggerLink from "@/components/client/InterviewQuestionsTriggerLink";

/**
 * /jobs/[slug] — the job detail page. Didn't exist before this phase
 * (see components/server/JobCard.js's own comment: "Job Details...
 * lands in a later phase" — this is that phase). Built to match the
 * existing SEO page conventions (generateMetadata + JsonLd + notFound
 * for unknown slugs) rather than introducing a different pattern.
 */

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return {};

  const title = `${job.title} at ${job.companyName}`;
  const description = job.summary || job.description?.slice(0, 160) || `${job.title} at ${job.companyName} — apply now.`;

  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/jobs/${slug}` },
    openGraph: { title, description, url: `${siteConfig.url}/jobs/${slug}` },
    twitter: { card: "summary", title, description },
    robots: job.indexable === false ? { index: false, follow: true } : undefined,
  };
}

export default async function JobDetailPage({ params }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  const jobPostingSchema = buildJobPostingSchema(job);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Jobs", path: "/jobs" },
    { name: job.title, path: `/jobs/${slug}` },
  ]);

  return (
    <section className="section">
      <div className="container">
        <JsonLd data={[jobPostingSchema, breadcrumbSchema]} />

        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/jobs">Jobs</a> / <span aria-current="page">{job.title}</span>
        </nav>

        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "var(--space-md)", marginTop: "var(--space-sm)" }}>
          <div>
            <h1 style={{ margin: 0 }}>{job.title}</h1>
            <p style={{ fontSize: "1.1rem", margin: "0.25rem 0" }}>{job.companyName}</p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
              {job.location && <Tag>{job.location}</Tag>}
              {job.remoteTypeLabel && <Tag>{job.remoteTypeLabel}</Tag>}
              {job.employmentTypeLabel && <Tag>{job.employmentTypeLabel}</Tag>}
              {job.postedAtLabel && <Tag>{job.postedAtLabel}</Tag>}
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "flex-end", justifyContent: "flex-end" }}>
            <ApplyButton job={job} size="large" />
            <SaveJobButton job={job} size="large" />
            <GenerateCoverLetterButton job={job} />
            <InterviewQuestionsTriggerLink />
            <a href="#salary-estimate" className="btn btn-ghost">
              💰 Salary Estimate
            </a>
          </div>
        </div>

        <div
          style={{
            marginTop: "var(--space-lg)",
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)",
            gap: "var(--space-lg)",
          }}
          className="job-detail-grid"
        >
          <div>
            {job.description && (
              <div className="card" style={{ padding: "var(--space-lg)" }}>
                <h2>About this role</h2>
                <div style={{ whiteSpace: "pre-wrap" }}>{job.description}</div>
                {job.tags?.length > 0 && (
                  <div style={{ marginTop: "var(--space-md)", display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    {job.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div style={{ marginTop: "var(--space-lg)" }}>
              <InterviewQuestionsPanel jobSlug={slug} jobTitle={job.title} />
            </div>
          </div>

          <div>
            <SalaryEstimate jobSlug={slug} salaryLabel={job.salaryLabel} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .job-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
