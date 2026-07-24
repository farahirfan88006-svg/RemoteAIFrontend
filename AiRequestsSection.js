import { listAiFeatures, FREE_AI_REQUEST_LIMIT } from "@/lib/premium/planPricing";
import styles from "./AiRequestsSection.module.css";

const ICONS = {
  resumeAnalyzer: IconScan,
  careerCoach: IconCompass,
  mockInterviews: IconMic,
  aiMatchScore: IconGauge,
  resumeRewrite: IconPencil,
};

/**
 * "What counts as an AI request?" — pulled straight from the feature
 * registry (lib/premium/features.js via planPricing.js) so this list
 * can never mention a tool that isn't actually in the product, and
 * never goes stale if a feature moves tiers later.
 */
export default function AiRequestsSection() {
  const aiFeatures = listAiFeatures();

  return (
    <div className={styles.wrapper}>
      <div className="section-header">
        <span className="eyebrow">
          <span className="dot" />
          What counts as a request
        </span>
        <h2>One request, one AI action</h2>
        <p>
          Every time you run one of these tools, it uses one AI request. Everything else on
          RemoteAI — job search, the resume and cover letter editors, saved and applied jobs — is
          unlimited on every plan and never counts against your {FREE_AI_REQUEST_LIMIT}.
        </p>
      </div>

      <div className={styles.grid}>
        {aiFeatures.map(({ key, label, description }, i) => {
          const Icon = ICONS[key] ?? IconSparkle;
          return (
            <div key={key} className={styles.card} style={{ "--delay": `${i * 60}ms` }}>
              <span className={styles.iconWrap} aria-hidden="true">
                <Icon />
              </span>
              <h3 className={styles.cardTitle}>{label}</h3>
              <p className={styles.cardDescription}>{description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function IconScan() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 3.5h10a1 1 0 011 1V19a1 1 0 01-1 1H7a1 1 0 01-1-1V4.5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8.5 8h7M8.5 11.5h7M8.5 15h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="16.5" cy="16.5" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M18.7 18.7L21 21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconCompass() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14.75 9.25l-1.6 4.3-4.3 1.6 1.6-4.3 4.3-1.6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function IconMic() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="9.25" y="3.5" width="5.5" height="9.5" rx="2.75" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.5 12a5.5 5.5 0 0011 0M12 17.5v3M9.5 20.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconGauge() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 15a7.5 7.5 0 1115 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 15l3.5-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="15" r="1.2" fill="currentColor" />
    </svg>
  );
}

function IconPencil() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5 4.5l4 4L9 19l-4.5 1 1-4.5 10-11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M13.5 6.5l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconSparkle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3.5l1.6 4.9 4.9 1.6-4.9 1.6-1.6 4.9-1.6-4.9-4.9-1.6 4.9-1.6L12 3.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
