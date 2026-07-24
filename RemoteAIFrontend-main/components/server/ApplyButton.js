/**
 * "Apply Now" — opens the ORIGINAL job posting (job.sourceUrl, the URL
 * captured at ingestion from whichever provider/source this job came
 * from — see backend models/Job.js) directly on the company/provider's
 * own site. Falls back to job.companyWebsite only if no sourceUrl was
 * captured. Renders nothing (no dead button) if neither exists, rather
 * than ever pointing at an internal placeholder page.
 *
 * Plain server-renderable <a> (no client interactivity needed) — using
 * a real anchor tag means right-click/"open in new tab"/middle-click
 * all work correctly, which a JS-driven onClick redirect would break.
 */
export default function ApplyButton({ job, size = "default" }) {
  const href = job?.sourceUrl || job?.companyWebsite;
  if (!href) return null;

  const className = size === "large" ? "btn btn-primary btn-lg" : "btn btn-primary";

  return (
    <a href={href} target="_blank" rel="noopener noreferrer nofollow" className={className}>
      Apply Now ↗
    </a>
  );
}
