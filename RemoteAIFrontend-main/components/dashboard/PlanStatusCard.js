import Link from "next/link";
import DashboardCard from "./DashboardCard";
import PremiumBadge from "@/components/premium/PremiumBadge";
import { getUserPlan, isPremium, planLabel } from "@/lib/premium/access";

/**
 * "Current Plan" dashboard section — shows the account's plan, and is
 * one of the dashboard's Upgrade CTA placements (the others live on
 * locked QuickActionCards). Free is the only plan any account can
 * actually be on today (no billing yet — see lib/premium/access.js),
 * but this reads from the same helpers everything else does, so it
 * updates correctly the moment billing exists.
 */
export default function PlanStatusCard({ user }) {
  const plan = getUserPlan(user);
  const premium = isPremium(user);

  return (
    <DashboardCard icon="💳" title="Current Plan" action={<PremiumBadge tier={plan} />}>
      <p style={{ margin: 0, fontSize: "var(--fs-2xl)", fontFamily: "var(--font-display)", fontWeight: 600 }}>
        {planLabel(plan)}
      </p>
      <p style={{ margin: 0 }}>
        {premium
          ? "You have full access to every AI-powered tool on RemoteAI."
          : "You have access to every free tool. Upgrade to unlock AI-powered career tools."}
      </p>
      {!premium && (
        <Link href="/pricing" className="btn btn-primary" style={{ alignSelf: "flex-start", marginTop: "var(--space-2xs)" }}>
          Upgrade to Premium
        </Link>
      )}
    </DashboardCard>
  );
}
