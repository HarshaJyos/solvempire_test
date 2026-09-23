import type { Metadata } from "next";
import Link from "next/link";
import { IndiseaHeader } from "@/components/site/IndiseaHeader";
import { IndiseaFooter } from "@/components/site/IndiseaFooter";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  FileText,
  Layers,
  Cpu,
  PenTool,
  Search,
  Factory,
  Rocket,
} from "lucide-react";
import { buildBreadcrumbsJsonLd, buildProcessHowToJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Our 6-Stage Engineering Process | SolveMpire",
  description:
    "Explore SolveMpire's 6-stage engineering lifecycle: Discover, Design, Develop, Prototype, Manufacture, and Deploy & Support. From initial CAD to volume production.",
  keywords: [
    "Hardware Development Process",
    "Product Engineering Lifecycle",
    "Stage-Gate Hardware Development",
    "DFM Engineering India",
    "Electronic Prototyping Stages",
    "Production Tooling Lifecycle",
    "SolveMpire Engineering Methodology",
  ],
  alternates: {
    canonical: `${COMPANY.websiteUrl}/process`,
  },
  openGraph: {
    title: "Our 6-Stage Engineering Process | SolveMpire",
    description:
      "Explore SolveMpire's 6-stage engineering lifecycle: Discover, Design, Develop, Prototype, Manufacture, and Deploy & Support.",
    url: `${COMPANY.websiteUrl}/process`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our 6-Stage Engineering Process | SolveMpire",
    description:
      "Explore SolveMpire's 6-stage engineering lifecycle: Discover, Design, Develop, Prototype, Manufacture, and Deploy & Support.",
  },
};


interface ProcessCard {
  stepNumber: string;
  stageName: string;
  title: string;
  summary: string;
  description: string;
  activities: string[];
  deliverables: string[];
  caseStudy: { title: string; slug: string };
  bgClass: string;
  numColor: string;
  watermark: string;
  topOffset: string;
  icon: typeof Search;
}

const PROCESS_CARDS: ProcessCard[] = [
  {
    stepNumber: "01",
    stageName: "Stage 01 // Discovery",
    title: "Discover",
    summary: "Understand goals, requirements & user needs",
    description:
      "Before writing code or starting CAD, we deeply analyze operational constraints, mechanical envelopes, commercial unit economics, and technology feasibility.",
    activities: [
      "System Requirements Definition (ERD) & operating environment envelope",
      "Mechanical packaging constraints (dimensions, weight, thermal limits)",
      "Target unit economics, Bill of Materials (BOM) budgeting & supply chain",
      "User workflow mapping across physical and digital touchpoints",
    ],
    deliverables: ["ERD Specification", "Constraint Map", "BOM Budgeting", "Tech Stack Matrix"],
    caseStudy: {
      title: "Market Tray Research for AEEGZ",
      slug: "aeegz",
    },
    bgClass: "bg-[#1F56C6] text-white",
    numColor: "text-blue-200/25",
    watermark: "1",
    topOffset: "top-20",
    icon: Search,
  },
  {
    stepNumber: "02",
    stageName: "Stage 02 // Architecture",
    title: "Design",
    summary: "Conceptualize, engineer & validate the solution",
    description:
      "We model native 3D CAD assemblies and multi-layer electronic schematics, validating thermal dissipation, ingress protection, and component clearances in simulation.",
    activities: [
      "3D mechanical CAD packaging in Autodesk Fusion 360 with structural ribs",
      "Multi-layer PCB schematic design in KiCad with isolated ground planes",
      "Precision O-ring sealing geometry (15–30% compression) for IP65 ingress",
      "Passive thermal airflow channels and heat dissipation geometry",
    ],
    deliverables: ["Native 3D CAD & STEP", "KiCad Schematics", "DFM Analysis", "Initial BOM"],
    caseStudy: {
      title: "USS2 Switcher 18 mm Cylindrical Sensor",
      slug: "uss2-switcher",
    },
    bgClass: "bg-[#CA8A04] text-white",
    numColor: "text-amber-200/25",
    watermark: "2",
    topOffset: "top-24",
    icon: PenTool,
  },
  {
    stepNumber: "03",
    stageName: "Stage 03 // Engineering",
    title: "Develop",
    summary: "Build mechanical, electronic, software & integrations",
    description:
      "We engineer deterministic embedded firmware, custom touchscreen interfaces, and cloud telemetry backends, synchronizing physical actuators with digital state machines.",
    activities: [
      "Embedded C++/RTOS firmware for STM32 and ESP32 microcontrollers",
      "Touchscreen HMI development on DWIN DGUS over custom UART protocols",
      "Dynamic UPI/QR payment pipelines with backend prefetching to cut wait time",
      "Industrial communication bus integration (CAN bus, RS-485, UART, MQTT)",
    ],
    deliverables: ["PCB Gerber Layouts", "Firmware Binaries", "DGUS HMI Assets", "Cloud Telemetry APIs"],
    caseStudy: {
      title: "FreshPod DGUS Touchscreen & Payment Engine",
      slug: "freshpod-hmi",
    },
    bgClass: "bg-[#1F56C6] text-white",
    numColor: "text-blue-200/25",
    watermark: "3",
    topOffset: "top-28",
    icon: Cpu,
  },
  {
    stepNumber: "04",
    stageName: "Stage 04 // Validation",
    title: "Prototype",
    summary: "Prototype, test & iterate for performance and reliability",
    description:
      "We assemble functional physical prototypes to stress-test fitment, thermal equilibrium, ingress protection, and vibration endurance under real operating loads.",
    activities: [
      "High-precision functional 3D printing and CNC stainless steel machining",
      "Custom PCBA fabrication, component populating, and bench testing",
      "IP65 ingress sealing validation and pressure/leakage testing",
      "Harsh vibration testing ensuring component retention under vehicle loads",
    ],
    deliverables: ["Functional Prototypes (V1, V2)", "Ingress & Leak Reports", "Vibration Test Logs", "DFM Revision Logs"],
    caseStudy: {
      title: "Secure Comms 25 mm Enclosure",
      slug: "secure-comms-enclosure",
    },
    bgClass: "bg-[#16A34A] text-white",
    numColor: "text-emerald-200/25",
    watermark: "4",
    topOffset: "top-32",
    icon: Layers,
  },
  {
    stepNumber: "05",
    stageName: "Stage 05 // Production",
    title: "Manufacture",
    summary: "Support production, quality & supply chain",
    description:
      "We bridge the gap from validated prototype to volume factory production, supplying comprehensive manufacturing drawing packages, tooling documentation, and QA jigs.",
    activities: [
      "Tooling design and mold qualification for injection-molded components",
      "Sheet metal CNC bending documentation, bend deductions, and weld specs",
      "Component sourcing, vendor qualification, and second-source mapping",
      "Factory end-of-line QA/QC testing jig development and assembly guides",
    ],
    deliverables: ["2D Manufacturing Drawings", "Tooling Packages & DXF", "Full Production BOM", "Factory QA Checklists"],
    caseStudy: {
      title: "Freshpod Manufacturing in Andhra Pradesh",
      slug: "freshpod-machine",
    },
    bgClass: "bg-[#EA580C] text-white",
    numColor: "text-orange-200/25",
    watermark: "5",
    topOffset: "top-36",
    icon: Factory,
  },
  {
    stepNumber: "06",
    stageName: "Stage 06 // Operations",
    title: "Deploy & Support",
    summary: "Deploy in the field and support for long-term success",
    description:
      "Product engineering doesn't end at factory shipment. We deploy fleets into commercial environments, monitor live heartbeats, and provide multi-year engineering support.",
    activities: [
      "Commercial field deployment and operator on-boarding",
      "Over-the-air (OTA) remote firmware deployment pipeline",
      "Real-time cloud fleet monitoring: heartbeats, error logging, revenue data",
      "Long-term engineering support agreements (4 to 10 years) covering all subsystems",
    ],
    deliverables: ["Fleet Management Dashboard", "Remote OTA Pipeline", "Field Troubleshooting Logs", "10-Year Support SLA"],
    caseStudy: {
      title: "190+ Machine Cloud Fleet Platform",
      slug: "freshpod-platform",
    },
    bgClass: "bg-[#0F766E] text-white",
    numColor: "text-teal-200/25",
    watermark: "6",
    topOffset: "top-40",
    icon: Rocket,
  },
];

export default function ProcessPage() {
  const breadcrumbsSchema = buildBreadcrumbsJsonLd([
    { name: "Home", url: "/" },
    { name: "Process", url: "/process" },
  ]);
  const howToSchema = buildProcessHowToJsonLd();

  return (
    <div className="flex flex-col min-h-screen bg-[var(--surface-canvas)] text-[var(--text-body)] selection:bg-[#FACC15] selection:text-[#181A1D] font-sans">
      <JsonLd schema={breadcrumbsSchema} />
      <JsonLd schema={howToSchema} />
      <IndiseaHeader />

      <main id="main-content" className="flex-1 w-full pt-36 pb-28">
        <div className="indisea-wrap space-y-16">
          {/* Header Banner */}
          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="indisea-eyebrow">01 / OUR ENGINEERING PROCESS</span>
              <span className="marker-pill marker-pill-yellow text-[11px] uppercase tracking-wide font-mono">
                The 6-Stage Lifecycle
              </span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[56px] uppercase text-[var(--text-heading)] tracking-tight leading-[1.08]">
              How We Build. <br />
              <span className="text-[#1F56C6]">From Discovery to Commercial Fleets.</span>
            </h1>

            <p className="font-sans text-base sm:text-xl text-[var(--text-muted)] max-w-3xl leading-relaxed font-normal">
              A disciplined, end-to-end engineering methodology that eliminates multi-vendor chaos. Scroll to explore how mechanical, electronic, firmware, and cloud systems integrate through all six stages.
            </p>
          </div>

          {/* Stacking Cards Container */}
          <div className="space-y-12">
            {PROCESS_CARDS.map((card) => {
              return (
                <div
                  key={card.stepNumber}
                  className={`sticky ${card.topOffset} rounded-none ${card.bgClass} p-8 sm:p-12 lg:p-16 shadow-xl overflow-hidden border border-white/10`}
                >
                  <div className="indisea-grid items-center relative z-10">
                    {/* Left Column: Content */}
                    <div className="col-span-12 lg:col-span-8 space-y-6">
                      {/* Eyebrow Badges */}
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-none bg-white/20 backdrop-blur-xs">
                          OUR PROCESS // STAGE {card.stepNumber}
                        </span>
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/80">
                          {card.stageName}
                        </span>
                      </div>

                      {/* Title & Summary */}
                      <div className="space-y-2">
                        <h2 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-[48px] uppercase tracking-tight leading-[1.1]">
                          {card.stepNumber}. {card.title}
                        </h2>
                        <p className="font-sans text-lg sm:text-2xl text-white font-semibold leading-snug">
                          {card.summary}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="font-sans text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed font-normal">
                        {card.description}
                      </p>

                      {/* Activities Grid */}
                      <div className="space-y-2 pt-2">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-white/70 block">
                          Core Engineering Activities:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {card.activities.map((act, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-white/95 leading-snug">
                              <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                              <span>{act}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Deliverables & Real-World Application Footer */}
                      <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-white/70 mr-1">
                            Outputs:
                          </span>
                          {card.deliverables.map((del) => (
                            <span
                              key={del}
                              className="px-2.5 py-1 rounded-none bg-white/15 backdrop-blur-xs text-white font-mono text-[11px] font-medium border border-white/10 uppercase"
                            >
                              {del}
                            </span>
                          ))}
                        </div>

                        <Link
                          href={`/work/${card.caseStudy.slug}`}
                          className="inline-flex items-center gap-1.5 font-display font-bold text-xs text-white hover:underline bg-white/20 px-3.5 py-1.5 rounded-none self-start sm:self-center shrink-0 transition-colors uppercase tracking-wider"
                        >
                          <span>Applied: {card.caseStudy.title}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Giant Watermark Numeral */}
                    <div className="col-span-12 lg:col-span-4 hidden lg:flex justify-end items-center">
                      <span
                        aria-hidden="true"
                        className={`font-display font-extrabold text-[160px] xl:text-[200px] leading-none select-none ${card.numColor}`}
                      >
                        {card.watermark}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Callout Banner */}
          <div className="p-8 sm:p-12 rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs text-center space-y-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-none bg-[#1F56C6] text-white mx-auto shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="space-y-2 max-w-2xl mx-auto">
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-[var(--text-heading)]">
                Have a Complex Product to Engineer?
              </h3>
              <p className="font-sans text-sm sm:text-base text-[var(--text-muted)] leading-relaxed font-normal">
                Connect directly with our lead mechanical, electronics, and firmware engineers to evaluate packaging constraints, custom PCB layouts, and volume manufacturing feasibility.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="btn-indisea-blue text-xs py-3 px-8 tracking-wider uppercase font-mono font-bold"
              >
                <span>Scope Your Project With Lead Engineers &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <IndiseaFooter />
    </div>
  );
}
