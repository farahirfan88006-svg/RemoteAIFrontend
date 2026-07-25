import styles from "./AiToolsPromo.module.css";

/**
 * Internal-linking block pointing SEO job-category landing pages at the
 * site's AI tools (resume builder, resume analyzer, mock interview,
 * career coach, match score). Kept as one small, reusable component
 * rather than duplicated per-category markup — every SEO page renders
 * the same set of tool links, so uniqueness for search purposes comes
 * from each page's own intro/FAQ copy, not from this block.
 *
 * /cover-letters is intentionally not included here — it's a private,
 * per-user "your saved cover letters" page (excluded from the sitemap),
 * not a public marketing page for the tool.
 */
const AI_TOOLS = [
  {
    href: "/resumes/generate",
    title: "AI Resume Builder",
    description: "Build an ATS-friendly resume tuned for remote hiring managers in minutes.",
  },
  {
    href: "/resume-analyzer",
    title: "AI Resume Analyzer",
    description: "Get an instant ATS score and specific feedback on your existing resume.",
  },
  {
    href: "/mock-interview",
    title: "AI Mock Interview",
    description: "Practice real interview questions for this role with instant AI feedback.",
  },
  {
    href: "/career-coach",
    title: "AI Career Coach",
    description: "Get personalized advice on positioning your experience for remote roles.",
  },
  {
    href: "/match-score",
    title: "Match Score",
    description: "See how well your profile matches a specific listing before you apply.",
  },
];

export default function AiToolsPromo({ heading = "Improve your chances of getting hired" }) {
  return (
    <section className={styles.wrapper} aria-labelledby="ai-tools-heading">
      <h2 id="ai-tools-heading" className={styles.heading}>
        {heading}
      </h2>
      <div className={styles.grid}>
        {AI_TOOLS.map((tool) => (
          <a key={tool.href} href={tool.href} className={styles.card}>
            <span className={styles.cardTitle}>{tool.title}</span>
            <span className={styles.cardDescription}>{tool.description}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
