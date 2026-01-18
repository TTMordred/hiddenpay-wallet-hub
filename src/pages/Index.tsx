import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { TechnicalAssurance } from "@/components/landing/TechnicalAssurance";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { InfiniteGrid } from "@/components/ui/the-infinite-grid";

const Index = () => {
  return (
    <InfiniteGrid>
      <Header />
      <main className="relative z-10">
        <HeroSection />
        <FeatureGrid />
        <TechnicalAssurance />
        <CTASection />
      </main>
      <Footer />
    </InfiniteGrid>
  );
};

export default Index;
