import DashboardCard from "./DashboardCard";
import { getUserPlan, planLabel } from "@/lib/premium/access";
import styles from "./DashboardStats.module.css";

function formatMemberSince(value) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

/**
 * "Account overview" — a small stat grid built from whatever the
 * backend's User model already provides (email, name, createdAt — see
 * RemoteAIBackend's src/models/User.js). No field is invented: a stat
 * simply isn't rendered if the underlying value is missing.
 */
export default function DashboardStats({ user }) {
  const memberSince = formatMemberSince(user?.createdAt);

  const stats = [
    { label: "Name", value: user?.name?.trim() || "Not set" },
    { label: "Email", value: user?.email || "—" },
    { label: "Plan", value: planLabel(getUserPlan(user)) },
    ...(memberSince ? [{ label: "Member since", value: memberSince }] : []),
  ];

  return (
    <DashboardCard icon="👤" title="Account overview">
      <dl className={styles.grid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.item}>
            <dt className={styles.label}>{stat.label}</dt>
            <dd className={styles.value}>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </DashboardCard>
  );
}
