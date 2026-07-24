import styles from "./TrustBar.module.css";

const METRICS = [
  { value: "12,000+", label: "candidates matched", icon: IconUsers },
  { value: "500+", label: "remote-first teams hiring", icon: IconBriefcase },
  { value: "40+", label: "countries with active roles", icon: IconGlobe },
  { value: "3x", label: "faster time-to-offer", icon: IconBolt },
];

/**
 * Slim social-proof strip directly under the hero. Pure trust signal, no
 * narrative — the "why" lives in WhyChooseUs further down the page.
 */
export default function TrustBar() {
  return (
    <section className={styles.bar}>
      <div className={`container ${styles.inner}`}>
        {METRICS.map(({ value, label, icon: Icon }) => (
          <div key={label} className={styles.item}>
            <span className={styles.icon} aria-hidden="true">
              <Icon />
            </span>
            <div>
              <p className={styles.value}>{value}</p>
              <p className={styles.label}>{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="8.5" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 19c.6-3 2.7-4.5 5.5-4.5s4.9 1.5 5.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15.5 6.1a3 3 0 010 5.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 14.6c2.3.4 3.9 1.8 4.4 4.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconBriefcase() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3.5" y="7.5" width="17" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.5 7.5v-2a1.5 1.5 0 011.5-1.5h4a1.5 1.5 0 011.5 1.5v2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 12.5h17" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.75 12h16.5M12 3.75c2.4 2.2 3.6 4.9 3.6 8.25s-1.2 6.05-3.6 8.25c-2.4-2.2-3.6-4.9-3.6-8.25S9.6 5.95 12 3.75z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 3.5l-7 10h5l-1 6.5 7-10.5h-5l1-6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
