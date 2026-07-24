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
  title: "Log In",
  description:
    "Log in to your RemoteAI account to manage your job search, resumes, cover letters, and AI career tools.",
  alternates: { canonical: "/login" },
  openGraph: {
    type: "website",
    title: `Log In | ${siteConfig.name}`,
    description:
      "Log in to your RemoteAI account to manage your job search, resumes, cover letters, and AI career tools.",
    url: `${siteConfig.url}/login`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [{ url: siteConfig.socialImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Log In | ${siteConfig.name}`,
    description:
      "Log in to your RemoteAI account to manage your job search, resumes, cover letters, and AI career tools.",
    images: [siteConfig.socialImage],
  },
};

export default function Layout({ children }) {
  return children;
}
