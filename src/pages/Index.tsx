import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { TechnicalAssurance } from "@/components/landing/TechnicalAssurance";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Full-page Animated Grid Background */}
      <AnimatedGridPattern
        numSquares={50}
        maxOpacity={0.08}
        duration={4}
        repeatDelay={1}
        className={cn(
          "fixed inset-0 h-full w-full",
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
          "fill-foreground/15 stroke-foreground/15"
        )}
      />
      <Header />
      <main className="relative z-10">
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
