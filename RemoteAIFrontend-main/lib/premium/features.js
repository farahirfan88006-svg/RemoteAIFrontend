/**
 * Feature registry — the single source of truth for which plan a given
 * feature requires.
 *
 * Every current + planned feature is listed here with a "free" or
 * "premium" value. Nothing else in the app should hardcode that
 * decision: pages, nav items, badges, and guards all read from this
 * file, so upgrading (or downgrading) a feature later is a one-line
 * change here instead of a hunt through components.
 *
 * Phase 1 note: this file controls UI (badges, locks, the pricing
 * page) only. There is no billing yet, so "premium" here means
 * "will require an active subscription once payments exist" — for
 * now every account is on the Free plan (see lib/premium/access.js),
 * so premium-gated features simply show the upgrade flow to everyone.
 */

export const PLAN = {
  FREE: "free",
  PREMIUM: "premium",
};

/**
 * key: stable identifier used everywhere the feature is referenced
 * (guards, badges, comparison table rows).
 *
 * value: shape describing the feature for UI purposes. `tier` is the
 * only field that gates anything; the rest is display metadata so
 * PremiumBadge / FeatureComparisonTable / UpgradeModal don't need
 * their own copies of feature names and descriptions.
 */
export const FEATURES = {
  remoteJobs: {
    tier: PLAN.FREE,
    label: "Remote Job Listings",
    description: "Browse and search every remote job on the platform.",
  },
  jobSearchFilters: {
    tier: PLAN.FREE,
    label: "Job Search & Filters",
    description: "Filter listings by role, location, salary, and more.",
  },
  blog: {
    tier: PLAN.FREE,
    label: "Career Blog",
    description: "Guides and articles on remote work and job hunting.",
  },
  resumeBuilder: {
    tier: PLAN.FREE,
    label: "Resume Builder",
    description: "Build and manage resumes with our editor.",
  },
  resumeAnalyzer: {
    tier: PLAN.PREMIUM,
    label: "AI Resume Analyzer",
    description: "ATS scoring, skill-gap detection, and formatting checks for your resume.",
  },
  coverLetter: {
    tier: PLAN.FREE,
    label: "Cover Letters",
    description: "Create and manage cover letters for your applications.",
  },
  interviewQuestions: {
    tier: PLAN.FREE,
    label: "Interview Questions",
    description: "Likely interview questions for a given role.",
  },
  savedJobs: {
    tier: PLAN.FREE,
    label: "Saved Jobs",
    description: "Bookmark listings to come back to later.",
  },
  appliedJobs: {
    tier: PLAN.FREE,
    label: "Applied Jobs",
    description: "Track applications and their status from Applied through Offer.",
  },
  // Not built yet — later phases. Listed here now so the registry
  // doesn't need to change shape when they arrive; each just needs
  // a FeatureGuard/PremiumRoute added at its page.
  careerCoach: {
    tier: PLAN.PREMIUM,
    label: "AI Career Coach",
    description: "Personalized guidance on your job search and career path.",
  },
  mockInterviews: {
    tier: PLAN.PREMIUM,
    label: "Mock Interviews",
    description: "Practice interviews with AI-driven feedback.",
  },
  aiMatchScore: {
    tier: PLAN.PREMIUM,
    label: "AI Match Score",
    description: "See how well your profile matches a given listing.",
  },
  resumeRewrite: {
    tier: PLAN.PREMIUM,
    label: "Resume Rewrite",
    description: "AI-rewritten bullet points tuned to a target role.",
  },
};

/** Look up a feature's plan tier. Unknown keys default to "premium" —
 * fail closed, so a typo'd or future feature key never accidentally
 * ships unlocked. */
export function getFeatureTier(featureKey) {
  return FEATURES[featureKey]?.tier ?? PLAN.PREMIUM;
}

export function getFeature(featureKey) {
  return FEATURES[featureKey] ?? null;
}

/** Features actually gated behind Premium today — drives the "Unlock
 * Premium" modal's bullet list and the pricing page's feature rows. */
export function listPremiumFeatures() {
  return Object.entries(FEATURES)
    .filter(([, feature]) => feature.tier === PLAN.PREMIUM)
    .map(([key, feature]) => ({ key, ...feature }));
}

export function listFreeFeatures() {
  return Object.entries(FEATURES)
    .filter(([, feature]) => feature.tier === PLAN.FREE)
    .map(([key, feature]) => ({ key, ...feature }));
}
