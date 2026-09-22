import type { Metadata } from "next";
import Link from "next/link";
import { IndiseaHeader } from "@/components/site/IndiseaHeader";
import { IndiseaFooter } from "@/components/site/IndiseaFooter";
import {
  Search,
  PenTool,
  Cpu,
  Layers,
  Factory,
  Rocket,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Activity,
  FileText,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our 6-Stage Engineering Process | SolveMpire",
  description:
    "Explore SolveMpire's disciplined 6-stage engineering lifecycle: Discover, Design, Develop, Prototype, Manufacture, and Deploy & Support.",
};

const DETAILED_PROCESS_STAGES = [
  {
    id: "discover",
    num: "01",
    phase: "Discover",
    tag: "REQUIREMENTS & SCOPE",
    summary: "Understand goals, requirements & user needs",
    lead: "Before writing code or starting CAD, we immerse ourselves in the operational constraints, physical environment, user behaviors, and commercial unit economics.",
    activities: [
      "System Requirements Definition (ERD) & operating environment envelope",
      "Mechanical packaging constraints (dimensions, weight, materials, thermal limits)",
      "Target unit economics, Bill of Materials (BOM) budgeting & supply chain feasibility",
      "User workflow mapping for physical and digital customer touchpoints",
    ],
    deliverables: [
      "Engineering Requirements Document (ERD)",
      "Packaging Envelope & Constraint Specification",
      "Technology Stack & MCU/Sensor Matrix",
      "Initial Commercial Feasibility & Risk Map",
    ],
    caseStudy: {
      title: "Tray Market Research for EGGORA",
      slug: "eggora",
      quote:
        "Analyzed 20+ locally available commercial egg-tray formats before creating CAD, establishing a tray-agnostic variable-pitch architecture.",
    },
    icon: Search,
  },
  {
    id: "design",
    num: "02",
    phase: "Design",
    tag: "CAD & SCHEMATIC ARCHITECTURE",
    summary: "Conceptualize, engineer & validate the solution",
    lead: "We model native 3D CAD assemblies and multi-layer electronic schematics, validating thermal dissipation, ingress protection, and component clearances in simulation.",
    activities: [
      "3D mechanical packaging in Autodesk Fusion 360 with structural wall thickness and ribs",
      "Multi-layer PCB schematic design in KiCad with isolated power and signal planes",
      "Precision sealing geometry (silicone O-rings, snap-fits, and compression channels)",
      "Thermal airflow simulation and passive heat-dissipation channel design",
    ],
    deliverables: [
      "Native 3D CAD Files & STEP Assembly Models",
      "KiCad Electrical Schematics & Netlists",
      "DFM Analysis for CNC Bending & Injection Molding",
      "Preliminary Bill of Materials (BOM)",
    ],
    caseStudy: {
      title: "USS2 Switcher 18 mm Cylindrical Sensor",
      slug: "uss2-switcher",
      quote:
        "Engineered an 18 mm × 75 mm threaded cylindrical housing with O-ring sealing (15–30% compression) and internal vibration-retention ribs.",
    },
    icon: PenTool,
  },
  {
    id: "develop",
    num: "03",
    phase: "Develop",
    tag: "HARDWARE & FIRMWARE",
    summary: "Build mechanical, electronic, software & integrations",
    lead: "We engineer deterministic embedded firmware, custom touchscreen interfaces, and cloud telemetry backends, synchronizing physical actuators with digital state machines.",
    activities: [
      "Embedded C++/RTOS firmware development for STM32 and ESP32 microcontrollers",
      "Touchscreen HMI development on DWIN DGUS platforms over custom UART protocols",
      "Dynamic UPI/QR payment pipelines with backend prefetching to cut customer wait time",
      "Industrial communication bus integration (CAN bus, RS-485, UART, MQTT)",
    ],
    deliverables: [
      "Production Multi-Layer PCB Gerber Layouts",
      "Deterministic Embedded Firmware Binaries",
      "DWIN DGUS Graphical HMI Asset Packages",
      "Cloud Telemetry APIs & Payment Webhooks",
    ],
    caseStudy: {
      title: "FreshPod DGUS Touchscreen & Payment Engine",
      slug: "freshpod-hmi",
      quote:
        "Engineered 14 custom touchscreen screens with dynamic UPI/QR payment rendering over UART on a platform without a native web engine.",
    },
    icon: Cpu,
  },
  {
    id: "prototype",
    num: "04",
    phase: "Prototype",
    tag: "PHYSICAL VALIDATION",
    summary: "Prototype, test & iterate for performance and reliability",
    lead: "We assemble functional physical prototypes to stress-test fitment, thermal equilibrium, ingress protection, and vibration endurance under real-world loads.",
    activities: [
      "High-precision functional 3D printing and CNC stainless steel prototype machining",
      "Custom PCBA fabrication, component populating, and bench testing",
      "IP65 ingress sealing validation and pressure/leakage testing",
      "Harsh vibration testing to ensure fastener and component retention under vehicle use",
    ],
    deliverables: [
      "Functional Physical Prototypes (Revision V1, V2)",
      "Test Logs: Thermal, Ingress & Vibration Reports",
      "DFM Refinement & Tolerance Optimization Log",
      "Pre-Production Firmware Release Candidates",
    ],
    caseStudy: {
      title: "Secure Comms 25 mm Enclosure",
      slug: "secure-comms-enclosure",
      quote:
        "Validated passive-only thermal performance and 25 mm profile retention through 3D printed prototypes across two major design revisions.",
    },
    icon: Layers,
  },
  {
    id: "manufacture",
    num: "05",
    phase: "Manufacture",
    tag: "TOOLING & SUPPLY CHAIN",
    summary: "Support production, quality & supply chain",
    lead: "We bridge the gap from validated prototype to volume factory production, supplying comprehensive manufacturing drawing packages, tooling documentation, and QA jigs.",
    activities: [
      "Tooling design and mold qualification for injection-molded components",
      "Sheet metal CNC bending documentation, bend deductions, and weld specifications",
      "Component sourcing, vendor qualification, and second-source part mapping",
      "Factory end-of-line QA/QC testing jig development and assembly guides",
    ],
    deliverables: [
      "2D Manufacturing & Assembly Drawings (PDF, DXF)",
      "Production Tooling & Injection Mold CAD Packages",
      "Full Production BOM with Sourced MPNs",
      "Factory Assembly Procedures & QA Test Checklists",
    ],
    caseStudy: {
      title: "Freshpod Manufacturing in Andhra Pradesh",
      slug: "freshpod-machine",
      quote:
        "Supplied full production engineering documentation for 80+ unique components, enabling volume commercial fabrication of 200+ machines.",
    },
    icon: Factory,
  },
  {
    id: "deploy",
    num: "06",
    phase: "Deploy & Support",
    tag: "COMMERCIAL FLEET",
    summary: "Deploy in the field and support for long-term success",
    lead: "Product engineering doesn't end at factory shipment. We deploy fleets into commercial environments, monitor live heartbeats, and provide multi-year engineering support.",
    activities: [
      "Commercial field deployment and operator on-boarding",
      "Over-the-air (OTA) remote firmware deployment pipeline",
      "Real-time cloud fleet monitoring: heartbeats, error logging, and revenue telemetry",
      "Long-term engineering support agreements (4 to 10 years) covering hardware, firmware, and mechanics",
    ],
    deliverables: [
      "Centralized Fleet Management Dashboard (Next.js/Node.js)",
      "Remote OTA Firmware Update Infrastructure",
      "Field Issue Root-Cause Investigation & Resolution Logs",
      "Multi-Year Engineering Support SLA Agreements",
    ],
    caseStudy: {
      title: "190+ Machine Cloud Fleet Platform",
      slug: "freshpod-platform",
      quote:
        "Supporting 200+ deployed machines processing 200,000+ helmets with a 3-year software framework and up to 10-year support agreement.",
    },
    icon: Rocket,
  },
];

export default function ProcessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--surface-canvas)] text-[var(--text-body)] selection:bg-[#FACC15] selection:text-[#181A1D] font-sans">
      <IndiseaHeader />

      <main id="main-content" className="flex-1 w-full pt-36 pb-28">
        <div className="indisea-wrap space-y-16 sm:space-y-20">
          {/* Header Banner */}
          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="indisea-eyebrow">01 / the solvempire engineering lifecycle</span>
              <span className="marker-pill marker-pill-blue text-[11px] uppercase tracking-wide font-mono">
                Disciplined Execution
              </span>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[var(--text-heading)] tracking-tight leading-[1.04]">
              Our Engineering Process. <br />
              <span className="text-[#2563EB]">From Discovery to Commercial Fleets.</span>
            </h1>

            <p className="font-sans text-base sm:text-xl text-[var(--text-muted)] max-w-3xl leading-relaxed font-normal">
              Hardware engineering fails when mechanical, electronic, and software teams work in isolated silos. Our disciplined 6-stage lifecycle integrates all disciplines from day one — turning complex technical briefs into production-grade physical systems.
            </p>
          </div>

          {/* Quick Stage Anchor Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {DETAILED_PROCESS_STAGES.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="p-4 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] hover:border-[#2563EB] hover:bg-[var(--surface-card)] transition-all flex flex-col justify-between space-y-2 group shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#2563EB]">
                      {s.num}.
                    </span>
                    <Icon className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[#2563EB] transition-colors" />
                  </div>
                  <div>
                    <span className="font-display font-bold text-sm text-[var(--text-heading)] block leading-snug group-hover:text-[#2563EB] transition-colors">
                      {s.phase}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--text-muted)] block truncate mt-0.5">
                      {s.tag}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>

          {/* 6 Detailed Engineering Chapters */}
          <div className="space-y-12 sm:space-y-16">
            {DETAILED_PROCESS_STAGES.map((stage, idx) => {
              const Icon = stage.icon;

              return (
                <article
                  key={stage.id}
                  id={stage.id}
                  className="rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] p-6 sm:p-10 lg:p-12 shadow-2xs space-y-8 scroll-mt-28 relative overflow-hidden group hover:border-slate-400/80 transition-colors"
                >
                  {/* Top Bar: Phase Identifier & Category */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border-hairline)]">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs sm:text-sm font-bold text-white bg-[#2563EB] px-3 py-1 rounded-md">
                        PHASE // {stage.num}
                      </span>
                      <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                        {stage.tag}
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-[var(--surface-canvas)] flex items-center justify-center text-[#2563EB]">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Stage Headline & Lead Philosophy */}
                  <div className="space-y-3 max-w-4xl">
                    <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[var(--text-heading)] tracking-tight">
                      {stage.num}. {stage.phase} — {stage.summary}
                    </h2>
                    <p className="font-sans text-base sm:text-lg text-[var(--text-muted)] leading-relaxed font-normal">
                      {stage.lead}
                    </p>
                  </div>

                  {/* 2-Column Content Grid: Engineering Activities & Deliverables */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
                    {/* Left: Engineering Activities */}
                    <div className="space-y-4">
                      <span className="indisea-eyebrow text-[#2563EB] block">
                        Core Engineering Activities
                      </span>
                      <ul className="space-y-3 font-sans text-sm sm:text-base text-[var(--text-heading)]">
                        {stage.activities.map((act, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                            <span className="leading-snug">{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: Concrete Deliverables */}
                    <div className="space-y-4 p-6 rounded-2xl bg-[var(--surface-canvas)] border border-[var(--border-hairline)] flex flex-col justify-between">
                      <div className="space-y-3">
                        <span className="indisea-eyebrow block">
                          Tangible Engineering Outputs
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {stage.deliverables.map((del, i) => (
                            <div
                              key={i}
                              className="p-2.5 rounded-lg bg-[var(--surface-card)] border border-[var(--border-hairline)] flex items-center gap-2 text-xs font-mono font-medium text-[var(--text-heading)] shadow-2xs"
                            >
                              <FileText className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                              <span className="truncate">{del}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Real Case Application */}
                      <div className="pt-4 border-t border-[var(--border-hairline)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="space-y-0.5">
                          <span className="indisea-eyebrow text-[10px] block">Field Application:</span>
                          <span className="font-display font-bold text-[var(--text-heading)] block">
                            {stage.caseStudy.title}
                          </span>
                        </div>

                        <Link
                          href={`/work/${stage.caseStudy.slug}`}
                          className="inline-flex items-center gap-1 font-display font-bold text-xs text-[#2563EB] hover:text-[#1D4ED8] whitespace-nowrap self-start sm:self-center"
                        >
                          <span>View Case Dossier</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom Callout Banner */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#2563EB]/10 border border-[#2563EB]/25 text-center space-y-6 shadow-xs">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#2563EB] text-white mx-auto shadow-2xs">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="space-y-2 max-w-2xl mx-auto">
              <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-[var(--text-heading)] tracking-tight">
                Ready to Initiate Your Engineering Project?
              </h3>
              <p className="font-sans text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                Connect directly with our lead mechanical, electronics, and firmware engineers to scope technical feasibility, packaging envelopes, and production tooling timelines.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="btn-indisea-blue text-xs py-3 px-8 tracking-wide uppercase font-mono font-bold"
              >
                <span>Initiate Engineering Discovery &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <IndiseaFooter />
    </div>
  );
}
