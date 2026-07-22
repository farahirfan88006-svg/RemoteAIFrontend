import styles from "./DashboardCard.module.css";

/**
 * Generic content card for the dashboard — the same `.card` treatment
 * used everywhere else in the app (see components/ui/Card.js), with an
 * optional icon/title/action header row so PlanStatusCard, UsageCard,
 * and DashboardStats don't each rebuild that header layout themselves.
 *
 * Server Component: purely presentational, no state of its own.
 */
export default function DashboardCard({ icon, title, action, children, className = "", ...rest }) {
  return (
    <div className={`card ${styles.card} ${className}`.trim()} {...rest}>
      {(icon || title || action) && (
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            {icon && (
              <span className={styles.icon} aria-hidden="true">
                {icon}
              </span>
            )}
            {title && <h3 className={styles.title}>{title}</h3>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}
