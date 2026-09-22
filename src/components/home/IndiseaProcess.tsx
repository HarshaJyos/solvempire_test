"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  PenTool,
  Cpu,
  Layers,
  Factory,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PROCESS_STEPS = [
  {
    num: "01",
    phase: "Discover",
    tag: "REQUIREMENTS & SCOPE",
    summary: "Understand goals, requirements & user needs",
    description:
      "Deep technical immersion into product requirements, mechanical envelopes, operating environments, commercial margins, and technology feasibility before touching CAD.",
    deliverables: ["Engineering Requirements (ERD)", "Architecture Matrix", "Feasibility & Risk Map"],
    icon: Search,
    color: "#2563EB",
  },
  {
    num: "02",
    phase: "Design",
    tag: "CAD & SCHEMATIC",
    summary: "Conceptualize, engineer & validate the solution",
    description:
      "Precision 3D mechanical CAD modeling in Fusion 360, multi-layer schematic design in KiCad, component selection, thermal simulation, and DFM tolerance analysis.",
    deliverables: ["Native 3D CAD & STEP", "KiCad Schematics", "Thermal & DFM Analysis"],
    icon: PenTool,
    color: "#0EA5E9",
  },
  {
    num: "03",
    phase: "Develop",
    tag: "HARDWARE & FIRMWARE",
    summary: "Build mechanical, electronic, software & integrations",
    description:
      "Deterministic embedded C++/RTOS firmware (STM32/ESP32), custom touchscreen HMI (DWIN DGUS), cloud telemetry backends (Next.js, Node.js), and industrial bus protocols (CAN, UART).",
    deliverables: ["PCB Gerber Layouts", "Embedded Firmware Binaries", "Cloud API & HMI Systems"],
    icon: Cpu,
    color: "#854D0E",
  },
  {
    num: "04",
    phase: "Prototype",
    tag: "PHYSICAL VALIDATION",
    summary: "Prototype, test & iterate for performance and reliability",
    description:
      "Functional 3D printing, CNC stainless steel prototyping, custom PCBA assembly, IP65 O-ring sealing tests, and harsh vibration endurance validation under real operating conditions.",
    deliverables: ["Functional Prototypes (V1, V2)", "Ingress & Vibration Tests", "DFM Revision Logs"],
    icon: Layers,
    color: "#166534",
  },
  {
    num: "05",
    phase: "Manufacture",
    tag: "TOOLING & SUPPLY CHAIN",
    summary: "Support production, quality & supply chain",
    description:
      "Production tooling fabrication, CNC sheet metal bending, injection mold qualification, vendor part procurement, QA/QC test jig development, and complete manufacturing packages.",
    deliverables: ["2D Manufacturing Drawings", "Tooling Packages & DXF", "Full Production BOM"],
    icon: Factory,
    color: "#EA580C",
  },
  {
    num: "06",
    phase: "Deploy & Support",
    tag: "COMMERCIAL FLEET",
    summary: "Deploy in the field and support for long-term success",
    description:
      "Commercial field deployment, continuous over-the-air (OTA) firmware pipelines, real-time fleet heartbeat monitoring, on-site troubleshooting, and up to 10-year support agreements.",
    deliverables: ["Fleet Management Dashboard", "Remote OTA Pipeline", "Multi-Year Support SLA"],
    icon: Rocket,
    color: "#2563EB",
  },
];

export function IndiseaProcess() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const current = PROCESS_STEPS[activeStep];

  return (
    <section id="process" className="py-20 sm:py-28 bg-[var(--surface-canvas)] font-sans border-b border-[var(--border-hairline)] relative overflow-hidden">
      <div className="indisea-wrap space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <span className="indisea-eyebrow">05 / our engineering lifecycle</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[var(--text-heading)] tracking-tight leading-[1.04]">
              Our Proven <span className="text-[#2563EB]">6-Stage Process.</span> <br />
              From Concept to Commercial Fleet.
            </h2>
            <p className="font-sans text-base sm:text-lg text-[var(--text-muted)] leading-relaxed font-normal">
              A disciplined, end-to-end engineering methodology that eliminates vendor disconnects and turns complex physical requirements into reliable, manufactured products.
            </p>
          </div>

          <Link
            href="/process"
            className="group inline-flex items-center gap-2 font-display text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors whitespace-nowrap"
          >
            <span>Explore Full Process Details</span>
            <ArrowRight className="w-4 h-4 arrow-slide" />
          </Link>
        </div>

        {/* 6-Stage Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;

            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={cn(
                  "p-6 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer group shadow-2xs relative",
                  isSelected
                    ? "bg-[var(--surface-card)] border-[#2563EB] ring-2 ring-[#2563EB]/10 shadow-xs"
                    : "bg-[var(--surface-card)] border-[var(--border-hairline)] hover:border-slate-400/80 hover:bg-[var(--surface-card)]"
                )}
              >
                <div className="space-y-4">
                  {/* Top Bar: Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#2563EB] bg-[#2563EB]/10 px-2.5 py-1 rounded-md">
                      PHASE // {step.num}
                    </span>
                    <div
                      className={cn(
                        "w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
                        isSelected ? "bg-[#2563EB] text-white" : "bg-[var(--surface-canvas)] text-[var(--text-muted)] group-hover:text-[var(--text-heading)]"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <div className="space-y-1">
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-[var(--text-heading)] group-hover:text-[#2563EB] transition-colors">
                      {step.num}. {step.phase}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm font-semibold text-[#2563EB] leading-snug">
                      {step.summary}
                    </p>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Key Deliverables Pills */}
                <div className="pt-4 mt-4 border-t border-[var(--border-hairline)] space-y-2">
                  <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] font-semibold block tracking-wider">
                    Key Outputs:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {step.deliverables.map((del) => (
                      <span
                        key={del}
                        className="px-2 py-0.5 rounded bg-[var(--surface-canvas)] text-[var(--text-heading)] text-[11px] font-mono font-medium"
                      >
                        {del}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Deep-Dive CTA */}
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <span className="indisea-eyebrow text-[#2563EB] block">Disciplined Execution</span>
            <h4 className="font-display font-extrabold text-lg sm:text-xl text-[var(--text-heading)]">
              Need a full breakdown of milestones, CAD deliverables, and testing protocols?
            </h4>
            <p className="font-sans text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
              Read our complete engineering workflow guide covering mechanical DFM, KiCad hardware revisions, firmware state validation, and long-term support SLAs.
            </p>
          </div>

          <Link
            href="/process"
            className="btn-indisea-blue text-xs py-3 px-6 shrink-0 self-start sm:self-center"
          >
            <span>View Dedicated Process Guide &rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
