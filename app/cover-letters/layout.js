import { siteConfig } from "@/lib/seo/siteConfig";

/**
 * Additive server-side layout: page.js in this route is a Client
 * Component ("use client"), which can't export metadata/generateMetadata
 * itself. This layout is the parent Server Component that supplies it,
 * the same role app/career-coach/page.js and app/pricing/page.js play
 * via their own wrapper pattern — no change to the existing page.js,
 * its logic, or its UI.
 */
export const metadata = {
  title: "Your Cover Letters",
  description:
    "Manage and edit the cover letters you've generated with RemoteAI.",
  alternates: { canonical: "/cover-letters" },
  openGraph: {
    type: "website",
    title: `Your Cover Letters | ${siteConfig.name}`,
    description:
      "Manage and edit the cover letters you've generated with RemoteAI.",
    url: `${siteConfig.url}/cover-letters`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [{ url: siteConfig.socialImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Your Cover Letters | ${siteConfig.name}`,
    description:
      "Manage and edit the cover letters you've generated with RemoteAI.",
    images: [siteConfig.socialImage],
  },
};

export default function Layout({ children }) {
  return children;
}
