import { getFeature } from "./features";

/**
 * Routing config for the Premium AI tools surfaced in navigation.
 * Kept separate from `features.js` (which is UI/tier metadata, not
 * routing) so the registry doesn't need a `route` field just to serve
 * this one nav — but every label still comes from `getFeature(...).label`,
 * so the nav can never say something different from the badge/pricing
 * table for the same feature.
 *
 * Used by Navbar.js (desktop dropdown + mobile list) and available for
 * any future entry point (e.g. a dashboard "AI tools" section) that
 * wants the same list without redefining it.
 */
export const PREMIUM_NAV_LINKS = [
  { feature: "careerCoach", href: "/career-coach" },
  { feature: "mockInterviews", href: "/mock-interview" },
  { feature: "resumeRewrite", href: "/resume-rewrite" },
  { feature: "aiMatchScore", href: "/match-score" },
].map((entry) => ({ ...entry, label: getFeature(entry.feature)?.label ?? entry.feature }));
