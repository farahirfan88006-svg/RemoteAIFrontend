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
  title: "Create Your Account",
  description:
    "Create a free RemoteAI account to start applying to remote jobs and using AI-powered resume and career tools.",
  alternates: { canonical: "/register" },
  openGraph: {
    type: "website",
    title: `Create Your Account | ${siteConfig.name}`,
    description:
      "Create a free RemoteAI account to start applying to remote jobs and using AI-powered resume and career tools.",
    url: `${siteConfig.url}/register`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [{ url: siteConfig.socialImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Create Your Account | ${siteConfig.name}`,
    description:
      "Create a free RemoteAI account to start applying to remote jobs and using AI-powered resume and career tools.",
    images: [siteConfig.socialImage],
  },
};

export default function Layout({ children }) {
  return children;
}
