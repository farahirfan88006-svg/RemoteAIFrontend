"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import DashboardCard from "./DashboardCard";
import { SkeletonCard } from "@/components/ui/Skeleton";
import styles from "./DashboardSettingsClient.module.css";

const NOTIFICATION_PREFS = [
  { key: "jobMatches", label: "New job matches", defaultChecked: true },
  { key: "productUpdates", label: "Product updates and new features", defaultChecked: true },
  { key: "weeklyDigest", label: "Weekly career digest", defaultChecked: false },
];

const THEME_OPTIONS = ["System", "Light", "Dark"];

/**
 * /dashboard/settings content. Every section here is UI-only:
 *   - Profile: local form state seeded from the real user object, but
 *     submitting shows a status message instead of calling an API.
 *   - Email / Password / Theme / Danger Zone: explicitly placeholders,
 *     per the Phase 3 spec — none of this is wired to a backend yet.
 * Nothing here calls lib/api/auth.js's real updateProfile/changePassword
 * endpoints; that wiring is intentionally left for a later phase so
 * this page can't silently mutate account data it only half-implements.
 */
export default function DashboardSettingsClient() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // null = the person hasn't edited the field yet, so it should keep
  // tracking `user.name` (which only becomes available once auth
  // finishes loading); a string means they've typed something locally.
  const [nameOverride, setNameOverride] = useState(null);
  const [profileStatus, setProfileStatus] = useState("");
  const [notifications, setNotifications] = useState(
    Object.fromEntries(NOTIFICATION_PREFS.map((p) => [p.key, p.defaultChecked]))
  );
  const [theme, setTheme] = useState("System");
  const name = nameOverride ?? (user?.name || "");

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

  function handleProfileSubmit(event) {
    event.preventDefault();
    setProfileStatus("Saved locally for this session — profile editing isn't connected to the backend yet.");
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link> / <Link href="/dashboard">Dashboard</Link> /{" "}
          <span aria-current="page">Settings</span>
        </nav>

        <span className="eyebrow">
          <span className="dot" />
          Account
        </span>
        <h1 style={{ marginTop: "var(--space-sm)" }}>Account Settings</h1>
        <p style={{ marginTop: "var(--space-2xs)", maxWidth: 560 }}>
          Manage your profile and preferences. This page is a frontend preview — most changes aren&apos;t
          saved to your account yet.
        </p>

        <div className={styles.stack}>
          <DashboardCard icon="👤" title="Profile">
            <form onSubmit={handleProfileSubmit} className={styles.form}>
              <label className={styles.field}>
                <span>Full name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setNameOverride(e.target.value)}
                  placeholder="Your name"
                  className={styles.input}
                />
              </label>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start" }}>
                Save changes
              </button>
              {profileStatus && <p className={styles.statusNote}>{profileStatus}</p>}
            </form>
          </DashboardCard>

          <DashboardCard icon="✉️" title="Email">
            <div className={styles.field}>
              <span>Email address</span>
              <input type="email" value={user.email || ""} readOnly className={styles.input} />
            </div>
            <p className={styles.helperNote}>
              Contact <a href="mailto:remoteaiplatform@gmail.com">remoteaiplatform@gmail.com</a> to change the
              email on your account.
            </p>
          </DashboardCard>

          <DashboardCard icon="🔒" title="Password">
            <span className="badge badge-neutral" style={{ alignSelf: "flex-start" }}>
              Coming soon
            </span>
            <div className={styles.form} aria-disabled="true">
              <label className={styles.field}>
                <span>Current password</span>
                <input type="password" disabled placeholder="••••••••" className={styles.input} />
              </label>
              <label className={styles.field}>
                <span>New password</span>
                <input type="password" disabled placeholder="••••••••" className={styles.input} />
              </label>
              <button type="button" className="btn btn-secondary" disabled style={{ alignSelf: "flex-start" }}>
                Update password
              </button>
            </div>
            <p className={styles.helperNote}>Password changes aren&apos;t available yet.</p>
          </DashboardCard>

          <DashboardCard icon="🔔" title="Notification preferences">
            <div className={styles.checkboxList}>
              {NOTIFICATION_PREFS.map((pref) => (
                <label key={pref.key} className={styles.checkboxRow}>
                  <input
                    type="checkbox"
                    checked={notifications[pref.key]}
                    onChange={(e) =>
                      setNotifications((prev) => ({ ...prev, [pref.key]: e.target.checked }))
                    }
                  />
                  <span>{pref.label}</span>
                </label>
              ))}
            </div>
            <p className={styles.helperNote}>
              Preferences shown here are for preview only and aren&apos;t saved to your account yet.
            </p>
          </DashboardCard>

          <DashboardCard icon="🎨" title="Theme">
            <span className="badge badge-neutral" style={{ alignSelf: "flex-start" }}>
              Coming soon
            </span>
            <div className={styles.themeRow}>
              {THEME_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={theme === option ? "btn btn-secondary" : "btn btn-ghost"}
                  onClick={() => setTheme(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <p className={styles.helperNote}>Theme switching isn&apos;t connected yet — RemoteAI currently follows your OS setting.</p>
          </DashboardCard>

          <DashboardCard icon="⚠️" title="Danger Zone" className={styles.dangerCard}>
            <p style={{ margin: 0 }}>Permanently delete your account and all associated data.</p>
            <button type="button" className="btn btn-secondary" disabled style={{ alignSelf: "flex-start", borderColor: "var(--color-danger)", color: "var(--color-danger)" }}>
              Delete account
            </button>
            <p className={styles.helperNote}>
              Account deletion isn&apos;t available yet — contact support if you need your data removed.
            </p>
          </DashboardCard>
        </div>
      </div>
    </section>
  );
}
