import { siteConfig } from "@/lib/seo/siteConfig";
import JsonLd from "@/components/server/JsonLd";
import ToolSeoContent from "@/components/server/ToolSeoContent";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo/schemas";
import { getToolContent } from "@/lib/seo/toolContent";

const content = getToolContent("resume-analyzer");

/**
 * Additive server-side layout: page.js in this route is a Client
 * Component ("use client"), which can't export metadata/generateMetadata
 * itself. This layout is the parent Server Component that supplies it,
 * the same role app/career-coach/page.js and app/pricing/page.js play
 * via their own wrapper pattern — no change to the existing page.js,
 * its logic, or its UI.
 */
export const metadata = {
  title: "AI Resume Analyzer — ATS Resume Checker",
  description:
    "Check your resume against real job-market demand with RemoteAI's free AI Resume Analyzer — get an ATS score and specific feedback in seconds.",
  keywords: content.keywords,
  alternates: { canonical: "/resume-analyzer" },
  openGraph: {
    type: "website",
    title: `AI Resume Analyzer — ATS Resume Checker | ${siteConfig.name}`,
    description:
      "Check your resume against real job-market demand with RemoteAI's free AI Resume Analyzer — get an ATS score and specific feedback in seconds.",
    url: `${siteConfig.url}/resume-analyzer`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [{ url: siteConfig.socialImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `AI Resume Analyzer — ATS Resume Checker | ${siteConfig.name}`,
    description:
      "Check your resume against real job-market demand with RemoteAI's free AI Resume Analyzer — get an ATS score and specific feedback in seconds.",
    images: [siteConfig.socialImage],
  },
};

/**
 * `children` is page.js's own client-rendered tool (unchanged). The
 * breadcrumb/FAQ JSON-LD and the intro/FAQ/related-links SEO content
 * render alongside it here in the layout, since page.js can't export
 * schema or extra markup of its own without becoming a second server
 * wrapper — this keeps that logic in exactly one place per route.
 */
export default function Layout({ children }) {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Resume Analyzer", path: "/resume-analyzer" },
  ]);
  const faqSchema = buildFaqSchema(content.faqs);

  return (
    <>
      <JsonLd data={[breadcrumbSchema, faqSchema].filter(Boolean)} />
      {children}
      <ToolSeoContent intro={content.intro} faqs={content.faqs} relatedJobLinks={content.relatedJobLinks} />
    </>
  );
}
