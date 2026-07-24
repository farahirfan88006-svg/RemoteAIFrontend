import JsonLd from "@/components/server/JsonLd";
import PricingCard from "@/components/premium/PricingCard";
import FeatureComparisonTable from "@/components/premium/FeatureComparisonTable";
import { siteConfig } from "@/lib/seo/siteConfig";
import { buildBreadcrumbSchema } from "@/lib/seo/schemas";
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
 */
export default function PricingPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
  ]);

  const freeFeatureLabels = listFreeFeatures().map((f) => f.label);
  const premiumFeatureLabels = [...freeFeatureLabels, ...listPremiumFeatures().map((f) => f.label)];

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">
              <span className="dot" />
              Pricing
            </span>
            <h1 style={{ marginTop: "var(--space-sm)" }}>Simple pricing, upgrade when you&apos;re ready</h1>
            <p style={{ marginTop: "var(--space-sm)", maxWidth: 560 }}>
              Everything you need to start your remote job search is free. Premium adds deeper AI tools
              for people actively applying.
            </p>
          </div>

          <div
            style={{
              marginTop: "var(--space-xl)",
              display: "grid",
              gap: "var(--space-lg)",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              maxWidth: 820,
              marginInline: "auto",
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

          <h2 style={{ marginTop: "var(--space-2xl)" }}>Compare plans</h2>
          <div style={{ marginTop: "var(--space-md)" }}>
            <FeatureComparisonTable />
          </div>

          <p style={{ marginTop: "var(--space-lg)", fontSize: "0.85em" }}>
            Premium billing isn&apos;t live yet — this page reflects what each plan will include once it is.
          </p>
        </div>
      </section>
    </>
  );
}
