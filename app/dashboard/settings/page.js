import JsonLd from "@/components/server/JsonLd";
import DashboardSettingsClient from "@/components/dashboard/DashboardSettingsClient";
import { siteConfig } from "@/lib/seo/siteConfig";
import { buildBreadcrumbSchema } from "@/lib/seo/schemas";

export async function generateMetadata() {
  const title = "Account Settings";
  const description = `Manage your ${siteConfig.name} profile, notifications, and account preferences.`;

  return {
    title,
    description,
    alternates: { canonical: "/dashboard/settings" },
    // Account settings has no content of value to a search visitor and
    // is only ever reachable while signed in — noindex, same call as
    // any authenticated account-management page, distinct from the
    // gated *feature landing* pages (career-coach, mock-interview, etc.)
    // which stay indexable because their marketing content is public.
    robots: { index: false, follow: false },
    openGraph: {
      type: "website",
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/dashboard/settings`,
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

export default function DashboardSettingsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Settings", path: "/dashboard/settings" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <DashboardSettingsClient />
    </>
  );
}
