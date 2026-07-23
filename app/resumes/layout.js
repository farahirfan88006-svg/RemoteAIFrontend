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
  title: "Your Resumes",
  description:
    "Manage and edit the resumes you've built with RemoteAI.",
  alternates: { canonical: "/resumes" },
  openGraph: {
    type: "website",
    title: `Your Resumes | ${siteConfig.name}`,
    description:
      "Manage and edit the resumes you've built with RemoteAI.",
    url: `${siteConfig.url}/resumes`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [{ url: siteConfig.socialImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Your Resumes | ${siteConfig.name}`,
    description:
      "Manage and edit the resumes you've built with RemoteAI.",
    images: [siteConfig.socialImage],
  },
};

export default function Layout({ children }) {
  return children;
}
