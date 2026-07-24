import Link from "next/link";
import Card from "@/components/ui/Card";
import Tag from "@/components/ui/Tag";
import ApplyButton from "@/components/server/ApplyButton";
import SaveJobButton from "@/components/client/SaveJobButton";
import { INTERVIEW_QUESTIONS_HASH } from "@/lib/jobs/constants";
import styles from "./JobCard.module.css";

/**
 * Renders one job in the /jobs grid. Server Component — purely
 * presentational, no interactivity.
 *
 * Every field is read defensively (optional chaining / fallbacks) because
 * this renders whatever the API layer returns; nothing here invents data.
 * Links to the job detail page (/jobs/[slug]) when a slug is present,
 * falling back to "#" only for the (expected-rare) case of a job
 * missing one rather than ever pointing at a dead/placeholder route.
 * Also surfaces the same ApplyButton the detail page uses (identical
 * component, not a second copy of the "which URL to open" logic) so
 * "Apply Now" works directly from the list, not just after opening the
 * full job page.
 *
 * The "🎯 Interview Questions" button beside it is a plain link to
 * `/jobs/{slug}#interview-questions` — no separate interview system,
 * no client-side interactivity needed here at all. The existing
 * InterviewQuestionsPanel on the job detail page (components/client/
 * InterviewQuestionsPanel.js) recognizes that hash on mount and
 * auto-loads + scrolls to itself, reusing the same
 * `/api/jobs/:slug/interview-questions` call it already makes. This
 * component stays a Server Component throughout.
 *
 * @param {{ job: object }} props
 */
export default function JobCard({ job }) {
  const {
    slug,
    title,
    companyName,
    location,
    remoteTypeLabel,
    employmentTypeLabel,
    salaryLabel,
    postedAtLabel,
    summary,
    tags,
  } = normalizeJobForDisplay(job);

  const href = slug ? `/jobs/${slug}` : "#";

  return (
    <Card as="article" className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerMain}>
          <h3 className={styles.title}>
            <Link href={href} className={styles.titleLink}>
              {title}
            </Link>
          </h3>
          {companyName && <p className={styles.company}>{companyName}</p>}
        </div>
        {salaryLabel && <span className={styles.salary}>{salaryLabel}</span>}
      </div>

      {summary && <p className={styles.summary}>{summary}</p>}

      <div className={styles.meta}>
        {location && <Tag>{location}</Tag>}
        {remoteTypeLabel && <Tag>{remoteTypeLabel}</Tag>}
        {employmentTypeLabel && <Tag>{employmentTypeLabel}</Tag>}
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div className={styles.footer}>
        {postedAtLabel && <p className={styles.posted}>{postedAtLabel}</p>}
        <div className={styles.actions}>
          {slug && (
            <Link href={`/jobs/${slug}#${INTERVIEW_QUESTIONS_HASH}`} className="btn btn-secondary">
              🎯 Interview Questions
            </Link>
          )}
          <SaveJobButton job={job} />
          <ApplyButton job={job} />
        </div>
      </div>
    </Card>
  );
}

function normalizeJobForDisplay(job = {}) {
  return {
    slug: job.slug,
    title: job.title || "Untitled role",
    companyName: job.companyName,
    location: job.location,
    remoteTypeLabel: job.remoteTypeLabel || job.remoteType,
    employmentTypeLabel: job.employmentTypeLabel || job.employmentType,
    salaryLabel: job.salaryLabel,
    postedAtLabel: job.postedAtLabel,
    summary: job.summary,
    tags: Array.isArray(job.tags) ? job.tags : [],
  };
}
