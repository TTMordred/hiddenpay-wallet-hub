import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { TechnicalAssurance } from "@/components/landing/TechnicalAssurance";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeatureGrid />
        <TechnicalAssurance />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
