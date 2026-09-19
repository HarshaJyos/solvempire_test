import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { HeroShowcase } from "@/components/home/HeroShowcase";
import { WhyPartner } from "@/components/home/WhyPartner";
import { ProcessRibbon } from "@/components/home/ProcessRibbon";
import { TeamSection } from "@/components/home/TeamSection";
import { ContactCta } from "@/components/home/ContactCta";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-canvas selection:bg-brand/15 selection:text-brand">
      <Header />
      <main id="main-content" className="flex-1 w-full">
        <HeroShowcase />
        <WhyPartner />
        <ProcessRibbon />
        <TeamSection />
        <ContactCta />
      </main>
      <Footer />
    </div>
  );
}
