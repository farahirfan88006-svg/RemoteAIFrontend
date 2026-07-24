import JsonLd from "@/components/server/JsonLd";
import MatchScoreClient from "@/components/career/MatchScoreClient";
import { siteConfig } from "@/lib/seo/siteConfig";
import { buildBreadcrumbSchema } from "@/lib/seo/schemas";

export async function generateMetadata() {
  const title = "AI Match Score";
  const description =
    "See your overall match percentage against a job description, a skill-by-skill breakdown, missing keywords, and recommendations. Premium feature.";

  return {
    title,
    description,
    alternates: { canonical: "/match-score" },
    openGraph: {
      type: "website",
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/match-score`,
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

export default function MatchScorePage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Match Score", path: "/match-score" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <MatchScoreClient />
    </>
  );
}
