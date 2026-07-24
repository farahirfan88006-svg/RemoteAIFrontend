import styles from "./WhyUpgradeSection.module.css";

const BENEFITS = [
  {
    title: "Save time on every application",
    description:
      "Skip manual editing and guesswork — Resume Rewrite and the AI Resume Analyzer do the heavy lifting in seconds, as often as you need.",
    icon: IconClock,
  },
  {
    title: "Unlimited AI access",
    description:
      "No monthly cap. Run the AI Resume Analyzer, Career Coach, Mock Interviews, Match Score, and Resume Rewrite as many times as your search needs.",
    icon: IconInfinity,
  },
  {
    title: "Professional, ATS-ready resumes",
    description:
      "The AI Resume Analyzer checks formatting and skill gaps, and Resume Rewrite tunes your bullet points to the role — unlimited passes until it's right.",
    icon: IconFileCheck,
  },
  {
    title: "Better interview preparation",
    description: "Practice with unlimited Mock Interviews and get AI-driven feedback before it counts.",
    icon: IconMicPlus,
  },
  {
    title: "Better career guidance",
    description: "Unlimited AI Career Coach sessions for personalized direction on your job search and career path.",
    icon: IconCompassPlus,
  },
];

export default function WhyUpgradeSection() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">
            <span className="dot dot--pulse" />
            Why upgrade
          </span>
          <h2>What Premium actually changes</h2>
          <p>
            Free already includes every core job-search tool. Premium removes the {" "}
            <strong>monthly limit</strong> on the AI tools above, so nothing slows you down mid-search.
          </p>
        </div>

        <div className={styles.grid}>
          {BENEFITS.map(({ title, description, icon: Icon }, i) => (
            <div key={title} className={styles.card} style={{ "--delay": `${i * 60}ms` }}>
              <span className={styles.cardGlow} aria-hidden="true" />
              <span className={styles.iconWrap} aria-hidden="true">
                <Icon />
              </span>
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardDescription}>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconInfinity() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.5 8.5c-2.1 0-3.5 1.6-3.5 3.5s1.4 3.5 3.5 3.5c2.6 0 3.7-7 6.9-7 2.1 0 3.6 1.6 3.6 3.5s-1.5 3.5-3.6 3.5c-3.2 0-4.3-7-6.9-7z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconFileCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 3.5h7l4 4v13a1 1 0 01-1 1H7a1 1 0 01-1-1v-16a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 3.5v4h4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 14.5l1.8 1.8L15.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconMicPlus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="9.25" y="3.5" width="5.5" height="9.5" rx="2.75" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.5 12a5.5 5.5 0 0011 0M12 17.5v3M9.5 20.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconCompassPlus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14.75 9.25l-1.6 4.3-4.3 1.6 1.6-4.3 4.3-1.6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
