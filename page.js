import Hero from "@/components/server/Hero";
import TrustBar from "@/components/server/TrustBar";
import Features from "@/components/server/Features";
import AIToolkit from "@/components/server/AIToolkit";
import HowItWorks from "@/components/server/HowItWorks";
import Categories from "@/components/server/Categories";
import WhyChooseUs from "@/components/server/WhyChooseUs";
import CTASection from "@/components/server/CTASection";
import { siteConfig } from "@/lib/seo/siteConfig";

// Homepage-specific metadata. `title` uses `absolute` to opt out of the
// root layout's "%s | RemoteAI" template — the brand name is already
// baked into this headline, so templating it again would duplicate it.
//
// Next's metadata merge is shallow per top-level key: if this object
// defines `openGraph` or `twitter` at all, that whole nested object
// *replaces* the root layout's, it doesn't merge field-by-field. So
// `type`/`locale`/`url`/`siteName`/`images` are respecified here from
// siteConfig (read-only import — siteConfig itself is untouched) to
// avoid silently dropping them from the homepage's social previews.
const HOME_TITLE = "RemoteAI — AI-Powered Remote Jobs, Resumes & Career Coaching";
const HOME_DESCRIPTION =
  "Find remote jobs matched by AI, then get hired faster with a built-in AI resume builder, AI resume analyzer, AI cover letter generator, AI career coach, and mock interview practice — all in one remote-first career platform.";

export const metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [{ url: siteConfig.socialImage }],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [siteConfig.socialImage],
  },
};

// Homepage is a Server Component by default — no client JS beyond what the
// Navbar already ships. Every section is its own component so later phases
// (real job data, blog previews) can slot in without restructuring this file.
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Features />
      <AIToolkit />
      <HowItWorks />
      <Categories />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
