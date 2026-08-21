import Hero from "@/components/Hero";
import HeroQuoteSection from "@/components/HeroQuoteSection";
import Fleet from "@/components/Fleet";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import About from "@/components/About";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <HeroQuoteSection />
      <Fleet />
      <Services />
      <WhyChooseUs />
      <About />
      <CTA />
    </>
  );
}
