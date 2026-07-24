import Link from "next/link";
import PremiumBadge from "@/components/premium/PremiumBadge";
import styles from "./AIToolkit.module.css";

/**
 * Homepage showcase for the platform's actual AI tools. Every entry maps
 * to a real route and reads its tier/description from the existing
 * feature registry (lib/premium/features.js) — the same source of truth
 * PremiumBadge, FeatureComparisonTable, and UpgradeModal already use —
 * so this section can never drift out of sync with what the product
 * actually offers, and never invents a tool that doesn't exist.
 */
const TOOLS = [
  {
    href: "/resumes/generate",
    featureKey: "resumeBuilder",
    title: "AI Resume Builder",
    description:
      "Answer a few prompts and get a resume formatted the way remote hiring managers actually read them.",
    icon: IconFile,
  },
  {
    href: "/resume-analyzer",
    featureKey: "resumeAnalyzer",
    title: "AI Resume Analyzer",
    description:
      "ATS scoring, skill-gap detection, and formatting checks — know what's holding your resume back before a recruiter does.",
    icon: IconScan,
  },
  {
    href: "/cover-letters",
    featureKey: "coverLetter",
    title: "AI Cover Letter Generator",
    description:
      "Generate a cover letter tailored to a specific job in seconds, then edit it to sound like you.",
    icon: IconMail,
  },
  {
    href: "/career-coach",
    featureKey: "careerCoach",
    title: "AI Career Coach",
    description:
      "A personalized roadmap for your job search — skill gaps, milestones, and a realistic timeline to your next role.",
    icon: IconCompass,
  },
  {
    href: "/mock-interview",
    featureKey: "mockInterviews",
    title: "AI Mock Interviews",
    description:
      "Practice role-specific questions across Frontend, Backend, AI, Data Science, Product, and more, with instant feedback.",
    icon: IconMic,
  },
  {
    href: "/match-score",
    featureKey: "aiMatchScore",
    title: "AI Match Score",
    description:
      "See exactly how your profile stacks up against a listing — overall score, skill-by-skill breakdown, and what's missing.",
    icon: IconGauge,
  },
];

export default function AIToolkit() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">
            <span className="dot" />
            AI career toolkit
          </span>
          <h2>The AI tools that get you from application to offer</h2>
          <p>
            Remote job search is more than a listings feed. Every tool below
            is built into RemoteAI, ready as soon as you create a profile.
          </p>
        </div>

        <div className={styles.grid}>
          {TOOLS.map(({ href, featureKey, title, description, icon: Icon }) => (
            <Link key={href} href={href} className={styles.tile}>
              <div className={styles.tileHead}>
                <span className={styles.iconWrap} aria-hidden="true">
                  <Icon />
                </span>
                <PremiumBadge feature={featureKey} />
              </div>
              <h3 className={styles.tileTitle}>{title}</h3>
              <p className={styles.tileDescription}>{description}</p>
              <span className={styles.tileCta} aria-hidden="true">
                Open tool →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function IconFile() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 3.5h7l4 4v13a1 1 0 01-1 1H7a1 1 0 01-1-1v-16a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 3.5v4h4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 13h6M9 16.5h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconScan() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 8V5.5A1.5 1.5 0 015.5 4H8M16 4h2.5A1.5 1.5 0 0120 5.5V8M20 16v2.5a1.5 1.5 0 01-1.5 1.5H16M8 20H5.5A1.5 1.5 0 014 18.5V16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 12.5h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 6.5l7.5 6 7.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCompass() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15 9l-2 5-4-1 2-5 4 1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function IconMic() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="9" y="3.5" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5.5 12a6.5 6.5 0 0013 0M12 18.5v2.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconGauge() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 15a8 8 0 1116 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 15l3.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1.4" fill="currentColor" />
    </svg>
  );
}
