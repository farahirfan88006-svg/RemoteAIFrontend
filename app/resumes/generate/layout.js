import { siteConfig } from "@/lib/seo/siteConfig";
import JsonLd from "@/components/server/JsonLd";
import ToolSeoContent from "@/components/server/ToolSeoContent";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo/schemas";
import { getToolContent } from "@/lib/seo/toolContent";

const content = getToolContent("resume-builder");

/**
 * Additive server-side layout: page.js in this route is a Client
 * Component ("use client"), which can't export metadata/generateMetadata
 * itself. This layout is the parent Server Component that supplies it,
 * the same role app/career-coach/page.js and app/pricing/page.js play
 * via their own wrapper pattern — no change to the existing page.js,
 * its logic, or its UI.
 */
export const metadata = {
  title: "Free AI Resume Builder — ATS-Friendly",
  description:
    "Build a free, ATS-friendly resume from your work history with RemoteAI's AI Resume Builder — tuned for remote hiring managers.",
  keywords: content.keywords,
  alternates: { canonical: "/resumes/generate" },
  openGraph: {
    type: "website",
    title: `Free AI Resume Builder — ATS-Friendly | ${siteConfig.name}`,
    description:
      "Build a free, ATS-friendly resume from your work history with RemoteAI's AI Resume Builder — tuned for remote hiring managers.",
    url: `${siteConfig.url}/resumes/generate`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [{ url: siteConfig.socialImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Free AI Resume Builder — ATS-Friendly | ${siteConfig.name}`,
    description:
      "Build a free, ATS-friendly resume from your work history with RemoteAI's AI Resume Builder — tuned for remote hiring managers.",
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
    { name: "Resume Builder", path: "/resumes/generate" },
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
