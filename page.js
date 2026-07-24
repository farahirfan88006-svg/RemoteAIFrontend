import JsonLd from "@/components/server/JsonLd";
import PricingCard from "@/components/premium/PricingCard";
import FeatureComparisonTable from "@/components/premium/FeatureComparisonTable";
import AiRequestsSection from "@/components/premium/AiRequestsSection";
import WhyUpgradeSection from "@/components/premium/WhyUpgradeSection";
import PricingFaq, { getPricingFaqs } from "@/components/premium/PricingFaq";
import PricingCTA from "@/components/premium/PricingCTA";
import styles from "./page.module.css";
import { siteConfig } from "@/lib/seo/siteConfig";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo/schemas";
import { listFreeFeatures } from "@/lib/premium/features";
import { FREE_AI_REQUEST_LIMIT, PLAN_PRICING, listAiFeatures } from "@/lib/premium/planPricing";

export async function generateMetadata() {
  const title = "Pricing";
  const description = `RemoteAI is free, with ${FREE_AI_REQUEST_LIMIT} AI requests a month on every AI tool. Premium unlocks unlimited AI requests for ${PLAN_PRICING.premium.price}${PLAN_PRICING.premium.period}.`;

  return {
    title,
    description,
    alternates: { canonical: "/pricing" },
    openGraph: {
      type: "website",
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/pricing`,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: siteConfig.socialImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [siteConfig.socialImage],
    },
  };
}

/**
 * Pricing page: plan comparison + upgrade CTA, no checkout.
 * "Upgrade Now" everywhere on the site routes here; this page itself
 * doesn't wire up payment yet (see Navbar / dashboard / UpgradeModal —
 * all point at /pricing rather than a Stripe checkout URL that doesn't
 * exist). The $4.99/month + 20-requests-per-month figures below are
 * the approved planned pricing model — see lib/premium/planPricing.js
 * for where they're defined. No billing, quota enforcement, or
 * feature-gating logic is implemented by this page; lib/premium/access.js
 * still unlocks every feature for every account until billing ships.
 */
export default function PricingPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
  ]);
  const faqSchema = buildFaqSchema(getPricingFaqs());

  const freeFeatureLabels = listFreeFeatures().map((f) => f.label);
  const aiFeatureCount = listAiFeatures().length;

  const freePlanFeatures = [
    ...freeFeatureLabels,
    `${FREE_AI_REQUEST_LIMIT} AI requests/month, per AI tool`,
  ];
  const premiumPlanFeatures = [...freeFeatureLabels, "Unlimited AI requests on every AI tool"];

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">
              <span className="dot" />
              Pricing
            </span>
            <h1 style={{ marginTop: "var(--space-sm)" }}>Simple pricing, upgrade when you&apos;re ready</h1>
            <p style={{ marginTop: "var(--space-sm)", maxWidth: 620 }}>
              Every core job-search tool on RemoteAI is free, always. Free also includes{" "}
              {FREE_AI_REQUEST_LIMIT} AI requests a month on each AI tool — enough to try Resume
              Analyzer, Career Coach, Mock Interviews, Match Score, and Resume Rewrite for yourself.
              Premium removes the monthly limit.
            </p>
          </div>

          <div id="plans" className={styles.plansGrid}>
            <PricingCard
              name="Free"
              price={PLAN_PRICING.free.price}
              period={PLAN_PRICING.free.period}
              tagline="Ideal for trying RemoteAI — no credit card required."
              features={freePlanFeatures}
              footnote={`Resets monthly. Applies separately to each of the ${aiFeatureCount} AI tools.`}
              ctaLabel="Your current plan"
            />
            <PricingCard
              name="Premium"
              price={PLAN_PRICING.premium.price}
              period={PLAN_PRICING.premium.period}
              tagline="Unlimited AI access for people actively applying."
              features={premiumPlanFeatures}
              footnote="Cancel anytime. Billing isn't live yet — get notified when it is."
              highlighted
              ribbonLabel="Best for active job seekers"
              ctaLabel="Notify me"
            />
          </div>

          <AiRequestsSection />

          <h2 id="compare" style={{ marginTop: "var(--space-2xl)", scrollMarginTop: "var(--nav-height)" }}>
            Compare plans
          </h2>
          <div style={{ marginTop: "var(--space-md)" }}>
            <FeatureComparisonTable />
          </div>

          <p style={{ marginTop: "var(--space-lg)", fontSize: "0.85em" }}>
            Premium billing isn&apos;t live yet — this page reflects what each plan will include once it is.
          </p>
        </div>
      </section>

      <WhyUpgradeSection />

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">
              <span className="dot" />
              FAQ
            </span>
            <h2>Pricing questions, answered</h2>
          </div>
          <PricingFaq />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <PricingCTA />
        </div>
      </section>
    </>
  );
}
