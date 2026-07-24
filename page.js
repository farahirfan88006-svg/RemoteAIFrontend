import JsonLd from "@/components/server/JsonLd";
import PricingHero from "@/components/premium/PricingHero";
import PricingTrust from "@/components/premium/PricingTrust";
import PricingCard from "@/components/premium/PricingCard";
import FeatureComparisonTable from "@/components/premium/FeatureComparisonTable";
import PricingFAQ, { getPricingFaqs } from "@/components/premium/PricingFAQ";
import PricingCTA from "@/components/premium/PricingCTA";
import { siteConfig } from "@/lib/seo/siteConfig";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo/schemas";
import { listFreeFeatures, listPremiumFeatures } from "@/lib/premium/features";

export async function generateMetadata() {
  const title = "Pricing";
  const description =
    "Compare RemoteAI Free and Premium plans — see which job-search tools are free and which unlock with Premium.";

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
 * Phase 1 pricing page: plan comparison + upgrade CTA, no checkout.
 * "Upgrade Now" everywhere on the site routes here; this page itself
 * doesn't wire up payment yet (see Navbar / dashboard / UpgradeModal —
 * all point at /pricing rather than a Stripe checkout URL that doesn't
 * exist).
 *
 * Presentation-only redesign: pricing/gating logic still lives entirely
 * in lib/premium/features.js. This page just renders more of it, more
 * clearly, across a few extra (purely visual) sections.
 */
export default function PricingPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
  ]);
  const faqSchema = buildFaqSchema(getPricingFaqs());
  const jsonLdData = [breadcrumbSchema, faqSchema].filter(Boolean);

  const freeFeatureLabels = listFreeFeatures().map((f) => f.label);
  const premiumFeatureLabels = [...freeFeatureLabels, ...listPremiumFeatures().map((f) => f.label)];

  return (
    <>
      <JsonLd data={jsonLdData} />

      <PricingHero />
      <PricingTrust />

      <section className="section">
        <div className="container">
          <div className="section-header" style={{ marginInline: "auto", textAlign: "center", alignItems: "center" }}>
            <span className="eyebrow">
              <span className="dot" />
              Plans
            </span>
            <h2>Pick the plan that fits your search</h2>
            <p>
              Everything you need to start your remote job search is free. Premium adds deeper AI
              tools for people actively applying.
            </p>
          </div>

          <div
            style={{
              marginTop: "var(--space-xl)",
              display: "grid",
              gap: "var(--space-lg)",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              maxWidth: 860,
              marginInline: "auto",
              alignItems: "start",
            }}
          >
            <PricingCard
              name="Free"
              price="$0"
              period="/forever"
              tagline="Everything to search and apply."
              features={freeFeatureLabels}
              ctaLabel="Your current plan"
            />
            <PricingCard
              name="Premium"
              price="Coming soon"
              tagline="Unlock AI-powered career tools."
              features={premiumFeatureLabels}
              highlighted
              ctaLabel="Notify me"
            />
          </div>

          <p
            style={{
              marginTop: "var(--space-lg)",
              fontSize: "0.85em",
              textAlign: "center",
            }}
          >
            Premium billing isn&apos;t live yet — this page reflects what each plan will include once it is.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">
              <span className="dot" />
              Compare plans
            </span>
            <h2>Exactly what each plan includes</h2>
            <p>No fine print — every gated feature in the product is listed here, side by side.</p>
          </div>
          <FeatureComparisonTable />
        </div>
      </section>

      <PricingFAQ />
      <PricingCTA />
    </>
  );
}
