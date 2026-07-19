import { siteConfig } from "@/lib/seo/siteConfig";

/**
 * Next.js App Router robots convention (app/robots.js -> /robots.txt).
 * New, additive file — this project had no robots.txt before.
 */
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
