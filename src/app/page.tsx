import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { HeroShowcase } from "@/components/home/HeroShowcase";
import { GlobalTicker } from "@/components/home/GlobalTicker";
import { RenovatedPillars } from "@/components/home/RenovatedPillars";
import { RenovatedArchives } from "@/components/home/RenovatedArchives";
import { MethodologyStroke } from "@/components/home/MethodologyStroke";
import { MetricsMatrix } from "@/components/home/MetricsMatrix";
import { StudioManifesto } from "@/components/home/StudioManifesto";
import { EngagementCta } from "@/components/home/EngagementCta";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-canvas selection:bg-[#3b82f6]/20 selection:text-[#1d4ed8]">
      <Header />
      <main id="main-content" className="flex-1 w-full">
        <HeroShowcase />
        <GlobalTicker />
        <RenovatedPillars />
        <RenovatedArchives />
        <MethodologyStroke />
        <MetricsMatrix />
        <StudioManifesto />
        <EngagementCta />
      </main>
      <Footer />
    </div>
  );
}
