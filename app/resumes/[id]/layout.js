import { siteConfig } from "@/lib/seo/siteConfig";

/**
 * Additive server-side layout: page.js in this route is a Client
 * Component ("use client"), which can't export metadata/generateMetadata
 * itself. This is a private, auth-gated, per-user page (a specific saved
 * resume), so metadata here is intentionally generic — the real title
 * lives client-side in the editor UI — and marked noindex since a
 * specific user's resume content should never be indexed.
 */
export async function generateMetadata({ params }) {
  const { id } = await params;
  const canonical = `/resumes/${id}`;
  const title = "Resume";
  const description = "View and edit your resume in RemoteAI.";

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: false, follow: false },
    openGraph: {
      type: "website",
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}${canonical}`,
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

export default function Layout({ children }) {
  return children;
}
