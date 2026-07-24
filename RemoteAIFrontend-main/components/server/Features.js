import styles from "./Features.module.css";

const FEATURES = [
  {
    title: "AI-matched listings",
    description:
      "Every role is scored against your skills and preferences, so the jobs you see are the ones worth your time.",
    icon: IconTarget,
  },
  {
    title: "Verified remote-first teams",
    description:
      "We only list companies that hire remote by default — not office roles with a remote label bolted on.",
    icon: IconShield,
  },
  {
    title: "Built-in resume builder",
    description:
      "Turn your experience into a resume tuned for remote hiring managers, ready to attach to any application.",
    icon: IconFile,
  },
  {
    title: "Transparent compensation",
    description:
      "Salary bands and time-zone requirements are listed up front, so there are no surprises three interviews in.",
    icon: IconCoin,
  },
];

export default function Features() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">
            <span className="dot" />
            Platform
          </span>
          <h2>Everything you need to find remote work that fits</h2>
          <p>
            One platform for the whole search — from discovering the right
            roles to walking into the interview prepared.
          </p>
        </div>

        <div className={styles.grid}>
          {FEATURES.map(({ title, description, icon: Icon }, i) => (
            <div key={title} className={styles.card} style={{ "--delay": `${i * 70}ms` }}>
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

function IconTarget() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 3.5l7 2.6v5.4c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6.1l7-2.6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M8.75 12.25l2.15 2.15 4.35-4.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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

function IconCoin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7.25v9.5M14.5 9.25a2.5 2 0 00-2.5-1.1c-1.4 0-2.5.7-2.5 1.75s1.1 1.5 2.5 1.75c1.4.25 2.5.7 2.5 1.75s-1.1 1.75-2.5 1.75a2.7 2.2 0 01-2.6-1.35"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
