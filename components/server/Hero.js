import Button from "@/components/ui/Button";
import styles from "./Hero.module.css";

/**
 * Homepage hero. The signature visual here is the "network" panel: a grid
 * of status dots connected by thin lines, echoing a distributed team map.
 * It's decorative (aria-hidden) and pure CSS/SVG, no motion library.
 */
export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <span className="eyebrow">
            <span className="dot dot--pulse" />
            Now matching candidates in 40+ countries
          </span>
          <h1 className={styles.heading}>
            Remote work, <span className={styles.accentText}>matched by AI.</span>
          </h1>
          <p className={styles.subheading}>
            RemoteAI connects engineers, designers, and AI practitioners with
            remote-first teams — and helps you build a resume that gets you
            there. No relocation, no time-zone guesswork, just work that fits
            your life.
          </p>
          <div className={styles.actions}>
            <Button href="/jobs" size="lg" variant="primary">
              Browse remote jobs
            </Button>
            <Button href="/about" size="lg" variant="secondary">
              How it works
            </Button>
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <NetworkPanel />
        </div>
      </div>
    </section>
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
