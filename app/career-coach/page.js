import JsonLd from "@/components/server/JsonLd";
import CareerCoachClient from "@/components/career/CareerCoachClient";
import { siteConfig } from "@/lib/seo/siteConfig";
import { buildBreadcrumbSchema } from "@/lib/seo/schemas";

export async function generateMetadata() {
  const title = "AI Career Coach";
  const description =
    "Get a personalized career roadmap from RemoteAI's AI Career Coach — skill gaps, milestones, and a realistic timeline for your next role. Premium feature.";

  return {
    title,
    description,
    alternates: { canonical: "/career-coach" },
    openGraph: {
      type: "website",
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/career-coach`,
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
 * Server Component wrapper: owns SEO metadata + breadcrumb JSON-LD (a
 * "use client" file can't export generateMetadata), and renders the
 * actual interactive tool as a Client Component. The tool itself is
 * gated behind PremiumRoute inside CareerCoachClient — this page is
 * reachable and indexable by anyone, only the tool underneath locks.
 */
export default function CareerCoachPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Career Coach", path: "/career-coach" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <CareerCoachClient />
    </>
  );
}
