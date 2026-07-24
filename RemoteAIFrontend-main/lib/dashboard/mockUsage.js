/**
 * Frontend-only usage tracking for the dashboard's Usage Summary card.
 *
 * There is no usage-tracking backend yet — every account's real AI
 * features run without a metered quota (see lib/premium/access.js).
 * These numbers are illustrative placeholders so the dashboard's shape
 * is right when real tracking lands; they are never fetched from the
 * API and don't change based on anything the user actually does.
 *
 * UI that renders this data must show `USAGE_DISCLAIMER` so it's never
 * mistaken for real account activity.
 */

export const USAGE_DISCLAIMER =
  "This demonstration uses mock data until AI services are connected.";

export const MOCK_USAGE = [
  { feature: "resumeAnalyzer", label: "Resume Analysis", used: 3, limit: "Unlimited" },
  { feature: "careerCoach", label: "Career Coach", used: 0, limit: "Unlimited" },
  { feature: "mockInterviews", label: "Mock Interviews", used: 2, limit: "Unlimited" },
  { feature: "resumeRewrite", label: "Resume Rewrite", used: 1, limit: "Unlimited" },
  { feature: "aiMatchScore", label: "Match Score", used: 5, limit: "Unlimited" },
];
