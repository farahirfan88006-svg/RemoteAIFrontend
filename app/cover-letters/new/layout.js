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
  title: "Generate a Cover Letter",
  description:
    "Generate a general cover letter using RemoteAI's AI-powered cover letter tool.",
  alternates: { canonical: "/cover-letters/new" },
  openGraph: {
    type: "website",
    title: `Generate a Cover Letter | ${siteConfig.name}`,
    description:
      "Generate a general cover letter using RemoteAI's AI-powered cover letter tool.",
    url: `${siteConfig.url}/cover-letters/new`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [{ url: siteConfig.socialImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Generate a Cover Letter | ${siteConfig.name}`,
    description:
      "Generate a general cover letter using RemoteAI's AI-powered cover letter tool.",
    images: [siteConfig.socialImage],
  },
};

export default function Layout({ children }) {
  return children;
}
