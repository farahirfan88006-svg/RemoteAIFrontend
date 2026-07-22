import JsonLd from "@/components/server/JsonLd";
import DashboardClient from "@/components/dashboard/DashboardClient";
import { siteConfig } from "@/lib/seo/siteConfig";
import { buildBreadcrumbSchema } from "@/lib/seo/schemas";

export async function generateMetadata() {
  const title = "Dashboard";
  const description = `Your ${siteConfig.name} dashboard — plan status, usage, and quick access to every job-search and AI career tool.`;

  return {
    title,
    description,
    alternates: { canonical: "/dashboard" },
    openGraph: {
      type: "website",
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/dashboard`,
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
 * "use client" file can't export generateMetadata), same split used by
 * app/career-coach/page.js and app/mock-interview/page.js. The actual
 * dashboard — welcome card, plan status, usage, quick actions — is a
 * Client Component because it reads useAuth() and redirects signed-out
 * visitors to /login.
 */
export default function DashboardPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <DashboardClient />
    </>
  );
}
