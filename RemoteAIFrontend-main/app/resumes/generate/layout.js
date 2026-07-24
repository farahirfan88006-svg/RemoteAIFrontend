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
  title: "Generate a Resume",
  description:
    "Generate a resume from the basics using RemoteAI's AI-powered resume builder.",
  alternates: { canonical: "/resumes/generate" },
  openGraph: {
    type: "website",
    title: `Generate a Resume | ${siteConfig.name}`,
    description:
      "Generate a resume from the basics using RemoteAI's AI-powered resume builder.",
    url: `${siteConfig.url}/resumes/generate`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [{ url: siteConfig.socialImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Generate a Resume | ${siteConfig.name}`,
    description:
      "Generate a resume from the basics using RemoteAI's AI-powered resume builder.",
    images: [siteConfig.socialImage],
  },
};

export default function Layout({ children }) {
  return children;
}
