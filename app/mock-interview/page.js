import JsonLd from "@/components/server/JsonLd";
import ToolSeoContent from "@/components/server/ToolSeoContent";
import MockInterviewClient from "@/components/career/MockInterviewClient";
import { siteConfig } from "@/lib/seo/siteConfig";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo/schemas";
import { getToolContent } from "@/lib/seo/toolContent";

const content = getToolContent("mock-interview");

export async function generateMetadata() {
  const title = "AI Mock Interview";
  const description =
    "Practice with role-specific interview questions across Frontend, Backend, Full Stack, AI, Data Science, Product, and Marketing tracks. Premium feature.";

  return {
    title,
    description,
    keywords: content.keywords,
    alternates: { canonical: "/mock-interview" },
    openGraph: {
      type: "website",
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/mock-interview`,
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

export default function MockInterviewPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Mock Interview", path: "/mock-interview" },
  ]);
  const faqSchema = buildFaqSchema(content.faqs);

  return (
    <>
      <JsonLd data={[breadcrumbSchema, faqSchema].filter(Boolean)} />
      <MockInterviewClient />
      <ToolSeoContent intro={content.intro} faqs={content.faqs} relatedJobLinks={content.relatedJobLinks} />
    </>
  );
}
