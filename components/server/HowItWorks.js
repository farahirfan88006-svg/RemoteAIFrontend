import styles from "./HowItWorks.module.css";

const STEPS = [
  {
    number: "01",
    title: "Build your profile",
    description:
      "Add your skills, experience, and the kind of remote work you actually want — time zone, seniority, comp range included.",
  },
  {
    number: "02",
    title: "AI matches you in real time",
    description:
      "Our model scores every open role against your profile as it comes in, so you only ever see work worth applying to.",
  },
  {
    number: "03",
    title: "Apply with a resume built to land",
    description:
      "Generate a resume tuned for remote hiring managers, then apply in one motion — no rewriting for every posting.",
  },
];

export default function HowItWorks() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">
            <span className="dot" />
            AI-powered workflow
          </span>
          <h2>From profile to offer, in three steps</h2>
          <p>
            No endless scrolling, no cold-applying into the void. The
            matching engine does the searching so you can spend your time on
            the interviews that matter.
          </p>
        </div>

        <ol className={styles.steps}>
          {STEPS.map((step) => (
            <li key={step.number} className={styles.step}>
              <span className={styles.number}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
