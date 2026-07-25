import JsonLd from "@/components/server/JsonLd";
import ToolSeoContent from "@/components/server/ToolSeoContent";
import CareerCoachClient from "@/components/career/CareerCoachClient";
import { siteConfig } from "@/lib/seo/siteConfig";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo/schemas";
import { getToolContent } from "@/lib/seo/toolContent";

const content = getToolContent("career-coach");

export async function generateMetadata() {
  const title = "AI Career Coach";
  const description =
    "Get a personalized career roadmap from RemoteAI's AI Career Coach — skill gaps, milestones, and a realistic timeline for your next remote role. Premium feature.";

  return {
    title,
    description,
    keywords: content.keywords,
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
 * Server Component wrapper: owns SEO metadata + breadcrumb/FAQ JSON-LD (a
 * "use client" file can't export generateMetadata), and renders the
 * actual interactive tool as a Client Component. The tool itself is
 * gated behind PremiumRoute inside CareerCoachClient — this page is
 * reachable and indexable by anyone, only the tool underneath locks.
 * ToolSeoContent (intro/FAQ/related-job-links) renders below the tool,
 * without any change to CareerCoachClient itself.
 */
export default function CareerCoachPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Career Coach", path: "/career-coach" },
  ]);
  const faqSchema = buildFaqSchema(content.faqs);

  return (
    <>
      <JsonLd data={[breadcrumbSchema, faqSchema].filter(Boolean)} />
      <CareerCoachClient />
      <ToolSeoContent intro={content.intro} faqs={content.faqs} relatedJobLinks={content.relatedJobLinks} />
    </>
  );
}
