import JsonLd from "@/components/server/JsonLd";
import ResumeRewriteClient from "@/components/career/ResumeRewriteClient";
import { siteConfig } from "@/lib/seo/siteConfig";
import { buildBreadcrumbSchema } from "@/lib/seo/schemas";

export async function generateMetadata() {
  const title = "Resume Rewrite";
  const description =
    "Paste your resume and see a rewritten, stronger version alongside a plain-language summary of what changed. Premium feature.";

  return {
    title,
    description,
    alternates: { canonical: "/resume-rewrite" },
    openGraph: {
      type: "website",
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/resume-rewrite`,
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

export default function ResumeRewritePage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Resume Rewrite", path: "/resume-rewrite" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <ResumeRewriteClient />
    </>
  );
}
