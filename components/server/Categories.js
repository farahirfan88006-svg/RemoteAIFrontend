import Link from "next/link";
import styles from "./Categories.module.css";

/**
 * Quick-start browse links into /jobs, pre-filtered by work style. Values
 * mirror JOB_TYPE_OPTIONS in lib/jobs/constants.js so every link lands on
 * a real, populated filter rather than an invented taxonomy.
 */
const WORK_STYLES = [
  {
    value: "full-time",
    label: "Full-time",
    description: "Long-term roles, one team, full benefits.",
    icon: IconCalendar,
  },
  {
    value: "contract",
    label: "Contract",
    description: "Fixed-scope engagements with clear end dates.",
    icon: IconDocument,
  },
  {
    value: "freelance",
    label: "Freelance",
    description: "Project-based work you can run alongside other clients.",
    icon: IconLayers,
  },
  {
    value: "part-time",
    label: "Part-time",
    description: "Reduced hours without giving up meaningful work.",
    icon: IconClock,
  },
];

export default function Categories() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">
            <span className="dot" />
            Browse by work style
          </span>
          <h2>Find roles that match how you want to work</h2>
        </div>

        <div className={styles.grid}>
          {WORK_STYLES.map(({ value, label, description, icon: Icon }) => (
            <Link key={value} href={`/jobs?type=${value}`} className={styles.tile}>
              <span className={styles.iconWrap} aria-hidden="true">
                <Icon />
              </span>
              <span className={styles.tileLabel}>{label}</span>
              <span className={styles.tileDescription}>{description}</span>
              <span className={styles.tileArrow} aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3.5" y="5.5" width="17" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconDocument() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 3.5h7l4 4v13a1 1 0 01-1 1H7a1 1 0 01-1-1v-16a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12.5h6M9 16h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3.5l8 4.25L12 12 4 7.75 12 3.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M4 12.25L12 16.5l8-4.25M4 16.5L12 20.75l8-4.25" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v5.25l3.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
