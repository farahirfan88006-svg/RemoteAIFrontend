import styles from "./WhyChooseUs.module.css";

const REASONS = [
  {
    metric: "40+",
    label: "countries with active candidates",
  },
  {
    metric: "3x",
    label: "faster time-to-offer vs. generic job boards",
  },
  {
    metric: "100%",
    label: "remote-first roles, no hidden office requirements",
  },
  {
    metric: "0",
    label: "cost to job seekers, ever",
  },
];

export default function WhyChooseUs() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.layout}>
          <div className="section-header">
            <span className="eyebrow">
              <span className="dot" />
              Why RemoteAI
            </span>
            <h2>Built for people who work from anywhere</h2>
            <p>
              Most job boards bolt a &quot;remote&quot; filter onto listings
              built for offices. RemoteAI starts from the opposite direction —
              every company on the platform hires distributed teams as a
              default, not an exception.
            </p>
          </div>

          <dl className={styles.stats}>
            {REASONS.map((reason) => (
              <div key={reason.label} className={styles.stat}>
                <dt className={styles.metric}>{reason.metric}</dt>
                <dd className={styles.label}>{reason.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
