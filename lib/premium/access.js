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
 * Can this user use the given feature?
 * - Free features: always yes.
 * - Premium features: only if the user is on the Premium plan.
 * A signed-out user (`user` is null/undefined) is treated as Free.
 */
export function hasAccess(featureKey, user) {
  const tier = getFeatureTier(featureKey);
  if (tier === PLAN.FREE) return true;
  return isPremium(user);
}

export function planLabel(plan) {
  return plan === PLAN.PREMIUM ? "Premium" : "Free";
}
