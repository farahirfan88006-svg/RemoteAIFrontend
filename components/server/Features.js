import Card from "@/components/ui/Card";
import styles from "./Features.module.css";

const FEATURES = [
  {
    title: "AI-matched listings",
    description:
      "Every role is scored against your skills and preferences, so the jobs you see are the ones worth your time.",
  },
  {
    title: "Verified remote-first teams",
    description:
      "We only list companies that hire remote by default — not office roles with a remote label bolted on.",
  },
  {
    title: "Built-in resume builder",
    description:
      "Turn your experience into a resume tuned for remote hiring managers, ready to attach to any application.",
  },
  {
    title: "Transparent compensation",
    description:
      "Salary bands and time-zone requirements are listed up front, so there are no surprises three interviews in.",
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
        </div>

        <div className={styles.grid}>
          {FEATURES.map((feature) => (
            <Card key={feature.title}>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
