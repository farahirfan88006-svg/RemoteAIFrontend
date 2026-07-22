import { getFeature } from "@/lib/premium/features";

/**
 * Dashboard "Quick Actions" registry.
 *
 * Deliberately just `{ feature, href, icon, title }` — everything else
 * a QuickActionCard needs (tier, description, badge) is read from the
 * shared feature registry (lib/premium/features.js) via `feature`, the
 * same way PremiumBadge / FeatureComparisonTable / the pricing page
 * already do. This keeps the dashboard from ever describing a feature
 * differently than the rest of the app does.
 *
 * `savedJobs` has no dedicated route yet (bookmarking isn't built —
 * see lib/premium/features.js), so its card links to /jobs (browse)
 * rather than a page that doesn't exist.
 */
export const QUICK_ACTIONS = [
  { feature: "resumeBuilder", href: "/resumes", icon: "📄", title: "Resume Builder" },
  { feature: "resumeAnalyzer", href: "/resume-analyzer", icon: "🔍", title: "Resume Analyzer" },
  { feature: "careerCoach", href: "/career-coach", icon: "🧭", title: "Career Coach" },
  { feature: "mockInterviews", href: "/mock-interview", icon: "🎤", title: "Mock Interview" },
  { feature: "resumeRewrite", href: "/resume-rewrite", icon: "✍️", title: "Resume Rewrite" },
  { feature: "aiMatchScore", href: "/match-score", icon: "🎯", title: "Match Score" },
  { feature: "savedJobs", href: "/jobs", icon: "⭐", title: "Saved Jobs" },
].map((action) => ({ ...action, meta: getFeature(action.feature) }));
