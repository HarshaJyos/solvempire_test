import { IndiseaHeader } from "@/components/site/IndiseaHeader";
import { IndiseaFooter } from "@/components/site/IndiseaFooter";
import { IndiseaHero } from "@/components/home/IndiseaHero";
import { IndiseaLiveWall } from "@/components/home/IndiseaLiveWall";
import { IndiseaWhoWeAre } from "@/components/home/IndiseaWhoWeAre";
import { IndiseaManifesto } from "@/components/home/IndiseaManifesto";
import { IndiseaSystemTopology } from "@/components/home/IndiseaSystemTopology";
import { IndiseaProcess } from "@/components/home/IndiseaProcess";
import { IndiseaCaseStudies } from "@/components/home/IndiseaCaseStudies";
import { IndiseaStickyStack } from "@/components/home/IndiseaStickyStack";
import { IndiseaWhatYouGet } from "@/components/home/IndiseaWhatYouGet";
import { IndiseaWhoWeWorkWith } from "@/components/home/IndiseaWhoWeWorkWith";
import { IndiseaProof } from "@/components/home/IndiseaProof";
import { IndiseaFinalCta } from "@/components/home/IndiseaFinalCta";
import { buildFaqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { COMPANY } from "@/lib/company";

const HOME_FAQS = [
  {
    question: "What does SolveMpire do?",
    answer:
      "SolveMpire is an integrated product engineering company based in Andhra Pradesh, India. We engineer physical products, custom electronics & PCBs in KiCad, real-time embedded firmware for STM32/ESP32, touchscreen HMIs on DWIN DGUS, and connected IoT cloud platforms — handling complete development from initial CAD to volume manufacturing and multi-year field support.",
  },
  {
    question: "Where is SolveMpire located and what is its legal registration?",
    answer: `SolveMpire Private Limited is registered in India with Corporate Identity Number (CIN) ${COMPANY.cin}. The engineering headquarters is located at SFNO 244/3, D.No: 2-247/2, Near Medha School Employee, Panasapadu, Kakinada, Andhra Pradesh, India.`,
  },
  {
    question: "What engineering disciplines does SolveMpire cover in-house?",
    answer:
      "SolveMpire houses 3D Mechanical CAD (Autodesk Fusion 360), multi-layer custom PCB design (KiCad), embedded C++/RTOS firmware programming, touchscreen HMI development, payment gateways (Razorpay dynamic UPI), IoT cloud telemetry, and factory tooling/DFM documentation under one roof.",
  },
  {
    question: "Does SolveMpire provide long-term engineering support for deployed hardware?",
    answer:
      "Yes. SolveMpire backs commercial deployments with multi-year engineering support agreements (spanning 4 to 10 years), covering continuous firmware updates, over-the-air (OTA) deployments, mechanical enhancements, PCB revisions, and cloud fleet monitoring.",
  },
];

export default function HomePage() {
  const faqSchema = buildFaqJsonLd(HOME_FAQS);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--surface-canvas)] text-[var(--text-body)] selection:bg-[#FACC15] selection:text-[#181A1D]">
      <JsonLd schema={faqSchema} />
      <IndiseaHeader />
      <main id="main-content" className="flex-1 w-full">
        <IndiseaHero />
        <IndiseaLiveWall />
        <IndiseaWhoWeAre />
        <IndiseaManifesto />
        <IndiseaSystemTopology />
        <IndiseaProcess />
        <IndiseaCaseStudies />
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

