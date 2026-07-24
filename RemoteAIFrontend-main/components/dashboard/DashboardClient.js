"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { isPremium } from "@/lib/premium/access";
import { QUICK_ACTIONS } from "@/lib/dashboard/quickActions";
import DashboardHeader from "./DashboardHeader";
import PlanStatusCard from "./PlanStatusCard";
import DashboardStats from "./DashboardStats";
import JobActivityStats from "./JobActivityStats";
import UsageCard from "./UsageCard";
import QuickActionCard from "./QuickActionCard";
import { SkeletonCard } from "@/components/ui/Skeleton";
import styles from "./DashboardClient.module.css";

/**
 * The actual /dashboard content. Split out from app/dashboard/page.js
 * (a Server Component, so it can own generateMetadata + JSON-LD) the
 * same way CareerCoachClient / MockInterviewClient are split from
 * their pages — this component needs useAuth, so it has to be a
 * Client Component.
 */
export default function DashboardClient() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;
    if (!user) router.replace("/login");
  }, [authLoading, user, router]);

  if (authLoading || !user) {
    return (
      <section className="section">
        <div className="container">
          <SkeletonCard />
        </div>
      </section>
    );
  }

  const premium = isPremium(user);

  return (
    <section className="section">
      <div className="container">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link> / <span aria-current="page">Dashboard</span>
        </nav>

        <DashboardHeader user={user} />

        <div className={styles.overviewGrid}>
          <PlanStatusCard user={user} />
          <DashboardStats user={user} />
          <JobActivityStats />
          <UsageCard />
        </div>

        <div className={styles.quickActionsHeader}>
          <h2 style={{ margin: 0 }}>Quick Actions</h2>
          {!premium && (
            <Link href="/pricing" className="btn btn-secondary">
              Unlock all tools with Premium
            </Link>
          )}
        </div>

        <div className={styles.quickActionsGrid}>
          {QUICK_ACTIONS.map((action) => (
            <QuickActionCard
              key={action.feature}
              feature={action.feature}
              href={action.href}
              icon={action.icon}
              title={action.title}
              meta={action.meta}
            />
          ))}
        </div>

        <div className={`card ${styles.settingsLink}`}>
          <div>
            <h3 style={{ margin: 0 }}>Account settings</h3>
            <p style={{ margin: 0 }}>Manage your profile, notifications, and account preferences.</p>
          </div>
          <Link href="/dashboard/settings" className="btn btn-secondary">
            Go to settings
          </Link>
        </div>
      </div>
    </section>
  );
}
