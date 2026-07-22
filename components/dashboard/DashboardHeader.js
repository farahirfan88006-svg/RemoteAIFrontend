import PremiumBadge from "@/components/premium/PremiumBadge";
import { getUserPlan, planLabel } from "@/lib/premium/access";
import styles from "./DashboardHeader.module.css";

/**
 * "Welcome card" — the dashboard's greeting header, plus the account's
 * Premium status badge (requirement: dashboard must clearly show the
 * user's Free/Premium status at a glance, separately from the fuller
 * Current Plan card below it).
 *
 * Server Component: `user` is passed in from DashboardClient (which
 * already holds it via useAuth) rather than reading auth context
 * itself, so this stays a plain, easily-testable presentational piece.
 */
export default function DashboardHeader({ user }) {
  const plan = getUserPlan(user);
  const displayName = user?.name?.trim() || user?.email?.split("@")[0] || "there";

  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.top}>
        <span className="eyebrow">
          <span className="dot" />
          Dashboard
        </span>
        <span className={`badge ${plan === "premium" ? "badge-warning" : "badge-success"}`}>
          {plan === "premium" ? "🔒" : "🟢"} {planLabel(plan)} plan
        </span>
      </div>

      <div className={styles.greetRow}>
        <h1 className={styles.heading}>Welcome back, {displayName}</h1>
        <PremiumBadge tier={plan} />
      </div>

      <p className={styles.subheading}>
        Here&apos;s an overview of your account, usage, and the tools available to you.
      </p>
    </div>
  );
}
