/**
 * Central site configuration.
 *
 * Every piece of SEO-relevant, brand-relevant static data lives here so it
 * is defined exactly once and imported everywhere it's needed (root layout
 * metadata, JSON-LD builders, Open Graph tags, the footer, etc).
 *
 * When the real production domain / assets are ready, update this file only.
 */

export const siteConfig = {
  name: "RemoteAI",
  shortName: "RemoteAI",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.remoteai.example",
  title: "RemoteAI — Remote Jobs for AI & Tech Talent",
  description:
    "RemoteAI connects skilled engineers, designers, and AI practitioners with remote-first companies. Browse curated remote roles, build your resume, and get hired from anywhere.",
  tagline: "Remote work, matched by AI.",
  socialImage: "/og-image.png",
  locale: "en_US",
  keywords: [
    "remote jobs",
    "AI jobs",
    "remote work",
    "software engineering jobs",
    "work from anywhere",
    "tech careers",
    "remote-first companies",
  ],
  contactEmail: "remoteaiplatform@gmail.com",
  company: {
    legalName: "RemoteAI, Inc.",
    foundedYear: 2025,
  },
};

export default siteConfig;
