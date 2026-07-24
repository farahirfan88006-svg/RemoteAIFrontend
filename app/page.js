import Hero from "@/components/server/Hero";
import TrustBar from "@/components/server/TrustBar";
import Features from "@/components/server/Features";
import HowItWorks from "@/components/server/HowItWorks";
import Categories from "@/components/server/Categories";
import WhyChooseUs from "@/components/server/WhyChooseUs";
import CTASection from "@/components/server/CTASection";

// Homepage is a Server Component by default — no client JS beyond what the
// Navbar already ships. Every section is its own component so later phases
// (real job data, blog previews) can slot in without restructuring this file.
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Features />
      <HowItWorks />
      <Categories />
      <WhyChooseUs />
      <CTASection />
    </>
  );
}
