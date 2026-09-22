import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { EditorialHero } from "@/components/home/EditorialHero";
import { EditorialTrustBar } from "@/components/home/EditorialTrustBar";
import { EditorialPillars } from "@/components/home/EditorialPillars";
import { PhysicalProductShowcase } from "@/components/home/PhysicalProductShowcase";
import { EditorialCaseStudies } from "@/components/home/EditorialCaseStudies";
import { EditorialProcessTimeline } from "@/components/home/EditorialProcessTimeline";
import { EditorialCta } from "@/components/home/EditorialCta";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafcff] text-[#0f172a] selection:bg-[#2563eb]/15 selection:text-[#1d4ed8]">
      <Header />
      <main id="main-content" className="flex-1 w-full">
        <EditorialHero />
        <EditorialTrustBar />
        <EditorialPillars />
        <PhysicalProductShowcase />
        <EditorialCaseStudies />
        <EditorialProcessTimeline />
        <EditorialCta />
      </main>
      <Footer />
    </div>
  );
}
