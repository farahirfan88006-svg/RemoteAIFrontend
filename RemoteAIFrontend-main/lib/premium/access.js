import { PLAN, getFeatureTier } from "./features";

/**
 * Plan/access helpers. These are the only functions in the app allowed
 * to answer "is this user premium?" / "can this user use feature X?" —
 * everything else (badges, guards, dashboard widgets) calls through
 * here instead of reading `user.plan` directly, so the one place that
 * needs to change when billing exists is this file.
 *
 * Every new account defaults to Free today (no payments yet). The
 * backend user object doesn't send a `plan` field yet either, so
 * `getUserPlan` treats a missing field as "free" rather than throwing
 * or silently unlocking premium features.
 */

export function getUserPlan(user) {
  return user?.plan === PLAN.PREMIUM ? PLAN.PREMIUM : PLAN.FREE;
}

export function isPremium(user) {
  return getUserPlan(user) === PLAN.PREMIUM;
}

export function isFree(user) {
  return !isPremium(user);
}

/**
 * TEMPORARY testing flag: unlock every feature (including Premium-tier
 * ones) for every signed-in user, since payments/billing aren't
 * implemented yet. This only changes what hasAccess() returns — it does
 * NOT change getUserPlan()/isPremium(), so plan badges elsewhere (e.g.
 * DashboardHeader, PlanStatusCard) keep showing each user's real ("Free")
 * plan rather than lying about it; only the actual feature gating is
 * relaxed.
 *
 * Flip this to `false` once billing ships and Premium should start being
 * enforced again — no other file needs to change.
 */
export const TEMP_UNLOCK_ALL_FEATURES = true;

/**
 * Can this user use the given feature?
 * - Free features: always yes.
 * - Premium features: only if the user is on the Premium plan (unless
 *   TEMP_UNLOCK_ALL_FEATURES is on — see above).
 * A signed-out user (`user` is null/undefined) is treated as Free.
 */
export function hasAccess(featureKey, user) {
  if (TEMP_UNLOCK_ALL_FEATURES) return true;
  const tier = getFeatureTier(featureKey);
  if (tier === PLAN.FREE) return true;
  return isPremium(user);
}

export function planLabel(plan) {
  return plan === PLAN.PREMIUM ? "Premium" : "Free";
}
