import { IndiseaHeader } from "@/components/site/IndiseaHeader";
import { IndiseaFooter } from "@/components/site/IndiseaFooter";
import { IndiseaHero } from "@/components/home/IndiseaHero";
import { IndiseaLiveWall } from "@/components/home/IndiseaLiveWall";
import { IndiseaWhoWeAre } from "@/components/home/IndiseaWhoWeAre";
import { IndiseaManifesto } from "@/components/home/IndiseaManifesto";
import { IndiseaSystemTopology } from "@/components/home/IndiseaSystemTopology";
import { IndiseaStickyStack } from "@/components/home/IndiseaStickyStack";
import { IndiseaWhatYouGet } from "@/components/home/IndiseaWhatYouGet";
import { IndiseaWhoWeWorkWith } from "@/components/home/IndiseaWhoWeWorkWith";
import { IndiseaProof } from "@/components/home/IndiseaProof";
import { IndiseaFinalCta } from "@/components/home/IndiseaFinalCta";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--surface-canvas)] text-[var(--text-body)] selection:bg-[#FACC15] selection:text-[#181A1D]">
      <IndiseaHeader />
      <main id="main-content" className="flex-1 w-full">
        <IndiseaHero />
        <IndiseaLiveWall />
        <IndiseaWhoWeAre />
        <IndiseaManifesto />
        <IndiseaSystemTopology />
        <IndiseaStickyStack />
        <IndiseaWhatYouGet />
        <IndiseaWhoWeWorkWith />
        <IndiseaProof />
        <IndiseaFinalCta />
      </main>
      <IndiseaFooter />
    </div>
  );
}
