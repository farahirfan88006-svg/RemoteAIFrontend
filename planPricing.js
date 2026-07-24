import { listPremiumFeatures } from "./features";

/**
 * Planned pricing copy for the Free and Premium plans.
 *
 * This is presentation data for the /pricing page only — nothing here
 * is read by lib/premium/access.js or any feature guard. Billing and
 * usage metering don't exist yet (see access.js: TEMP_UNLOCK_ALL_FEATURES),
 * so these numbers describe the approved plan the product is moving
 * toward, not something the app currently enforces. Centralizing them
 * here just keeps the pricing page and comparison table from drifting
 * out of sync with each other.
 */
export const PLAN_PRICING = {
  free: { price: "$0", period: "/forever" },
  premium: { price: "$4.99", period: "/month" },
};

/** Planned Free-tier monthly allowance, per AI feature. */
export const FREE_AI_REQUEST_LIMIT = 20;

/**
 * AI-powered features — every feature the registry marks Premium-tier
 * today. Under the planned model these move from "Premium only" to
 * "Free gets 20/month, Premium is unlimited," so the pricing page
 * reads the list from the registry rather than hardcoding it.
 */
export function listAiFeatures() {
  return listPremiumFeatures();
}
