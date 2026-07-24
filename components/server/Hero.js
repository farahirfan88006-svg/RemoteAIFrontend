import Button from "@/components/ui/Button";
import styles from "./Hero.module.css";

/**
 * Homepage hero. The signature visual is the "network" panel: a grid of
 * status dots connected by thin lines, with one pulse of "signal" travelling
 * the graph — a visual metaphor for a match landing in real time. It's
 * decorative (aria-hidden) and pure CSS/SVG, no motion library.
 */
export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.ambient} aria-hidden="true">
        <span className={`${styles.orb} ${styles.orbAccent}`} />
        <span className={`${styles.orb} ${styles.orbViolet}`} />
        <span className={styles.grain} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <span className={`eyebrow ${styles.eyebrow}`}>
            <span className="dot dot--pulse" />
            Now matching candidates in 40+ countries
          </span>

          <h1 className={styles.heading}>
            Your next remote role,
            <br />
            <span className={styles.accentText}>found by AI, not luck.</span>
          </h1>

          <p className={styles.subheading}>
            RemoteAI reads your skills, not just your keywords, and matches you
            to remote-first teams that are actually hiring for them. Add a
            resume tuned for the way distributed companies hire, and apply in
            one motion — no relocation, no time-zone guesswork.
          </p>

          <div className={styles.actions}>
            <Button href="/jobs" size="lg" variant="primary" className={styles.ctaPrimary}>
              Browse remote jobs
            </Button>
            <Button href="/about" size="lg" variant="secondary" className={styles.ctaSecondary}>
              How it works
            </Button>
          </div>

          <div className={styles.proof}>
            <span className={styles.avatarStack} aria-hidden="true">
              <span className={styles.avatar} style={{ "--i": 0 }}>JK</span>
              <span className={styles.avatar} style={{ "--i": 1 }}>AS</span>
              <span className={styles.avatar} style={{ "--i": 2 }}>MT</span>
              <span className={styles.avatar} style={{ "--i": 3 }}>+</span>
            </span>
            <p className={styles.proofText}>
              Trusted by <strong>12,000+</strong> remote engineers, designers
              &amp; AI practitioners
            </p>
          </div>
        </div>

        <div className={styles.visualWrap}>
          <div className={styles.visual} aria-hidden="true">
            <NetworkPanel />
            <FloatingChip
              className={styles.chipMatch}
              label="Match score"
              value="92%"
              tone="accent"
            />
            <FloatingChip
              className={styles.chipStatus}
              label="Status"
              value="Interview requested"
              tone="success"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Small floating glass card layered over the hero visual for depth. */
function FloatingChip({ className = "", label, value, tone = "accent" }) {
  return (
    <div className={`${styles.chip} glass ${className}`}>
      <span className={`${styles.chipDot} ${tone === "success" ? styles.chipDotSuccess : ""}`} />
      <span className={styles.chipLabel}>{label}</span>
      <span className={styles.chipValue}>{value}</span>
    </div>
  );
}

/** Decorative node-graph SVG representing a distributed remote network. */
function NetworkPanel() {
  const nodes = [
    { x: 40, y: 40 }, { x: 160, y: 30 }, { x: 260, y: 90 },
    { x: 90, y: 130 }, { x: 210, y: 170 }, { x: 60, y: 220 },
    { x: 190, y: 250 },
  ];
  const edges = [
    [0, 1], [1, 2], [1, 3], [3, 4], [3, 5], [4, 6],
  ];
  const pulsePath = `M${nodes[0].x} ${nodes[0].y} L${nodes[1].x} ${nodes[1].y} L${nodes[3].x} ${nodes[3].y} L${nodes[4].x} ${nodes[4].y} L${nodes[6].x} ${nodes[6].y}`;

  return (
    <svg viewBox="0 0 300 290" className={styles.networkSvg}>
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          className={styles.edge}
        />
      ))}
      <path d={pulsePath} className={styles.pulsePath} />
      <circle r="4" className={styles.pulseDot}>
        <animateMotion dur="4.5s" repeatCount="indefinite" path={pulsePath} />
      </circle>
      {nodes.map((node, i) => (
        <circle
          key={i}
          cx={node.x}
          cy={node.y}
          r={i === 3 ? 7 : 5}
          className={i === 3 ? styles.nodeActive : styles.node}
        />
      ))}
    </svg>
  );
}
