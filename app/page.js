import Hero from "@/components/server/Hero";
import Features from "@/components/server/Features";
import WhyChooseUs from "@/components/server/WhyChooseUs";
import CTASection from "@/components/server/CTASection";

// Root layout already supplies the full title/description/OG/Twitter
// defaults from siteConfig, so this only needs to add what the homepage
// doesn't inherit automatically: an explicit self-referencing canonical.
export const metadata = {
  alternates: { canonical: "/" },
};

// Homepage is a Server Component by default — no client JS beyond what the
// Navbar already ships. Every section is its own component so later phases
// (real job data, blog previews) can slot in without restructuring this file.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
