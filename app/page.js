import Hero from "@/components/server/Hero";
import Features from "@/components/server/Features";
import WhyChooseUs from "@/components/server/WhyChooseUs";
import CTASection from "@/components/server/CTASection";

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
