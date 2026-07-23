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
  title: "Resume Match Analyzer",
  description:
    "Check your resume against real job-market demand with RemoteAI's Resume Match Analyzer.",
  alternates: { canonical: "/resume-analyzer" },
  openGraph: {
    type: "website",
    title: `Resume Match Analyzer | ${siteConfig.name}`,
    description:
      "Check your resume against real job-market demand with RemoteAI's Resume Match Analyzer.",
    url: `${siteConfig.url}/resume-analyzer`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [{ url: siteConfig.socialImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Resume Match Analyzer | ${siteConfig.name}`,
    description:
      "Check your resume against real job-market demand with RemoteAI's Resume Match Analyzer.",
    images: [siteConfig.socialImage],
  },
};

export default function Layout({ children }) {
  return children;
}
