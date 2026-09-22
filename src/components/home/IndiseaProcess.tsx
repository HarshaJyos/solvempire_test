"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  PenTool,
  Cpu,
  Layers,
  Factory,
  Rocket,
  ArrowRight,
} from "lucide-react";

const STAGES = [
  {
    num: "01",
    phase: "Discover",
    summary: "Understand goals, requirements & user needs",
    desc: "ERD specification, packaging constraints, and feasibility assessment.",
    icon: Search,
  },
  {
    num: "02",
    phase: "Design",
    summary: "Conceptualize, engineer & validate the solution",
    desc: "3D CAD in Fusion 360, KiCad multi-layer schematics, and DFM analysis.",
    icon: PenTool,
  },
  {
    num: "03",
    phase: "Develop",
    summary: "Build mechanical, electronic, software & integrations",
    desc: "Embedded RTOS firmware, DWIN DGUS HMI, and cloud telemetry.",
    icon: Cpu,
  },
  {
    num: "04",
    phase: "Prototype",
    summary: "Prototype, test & iterate for performance and reliability",
    desc: "Functional 3D printing, PCBA assembly, IP65 sealing, and vibration tests.",
    icon: Layers,
  },
  {
    num: "05",
    phase: "Manufacture",
    summary: "Support production, quality & supply chain",
    desc: "Tooling fabrication, CNC sheet metal bending, and factory QA test jigs.",
    icon: Factory,
  },
  {
    num: "06",
    phase: "Deploy & Support",
    summary: "Deploy in the field and support for long-term success",
    desc: "OTA remote firmware updates, fleet monitoring, and 10-year support SLAs.",
    icon: Rocket,
  },
];

export function IndiseaProcess() {
  return (
    <section id="process" className="py-20 sm:py-24 bg-[var(--surface-canvas)] font-sans border-b border-[var(--border-hairline)] relative">
      <div className="indisea-wrap space-y-12 sm:space-y-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <span className="indisea-eyebrow">05 / our engineering lifecycle</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[var(--text-heading)] tracking-tight leading-[1.05]">
              How We Engineer. <br />
              <span className="text-[#2563EB]">A Connected 6-Stage Pipeline.</span>
            </h2>
          </div>

          <Link
            href="/process"
            className="group inline-flex items-center gap-2 font-display text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors whitespace-nowrap"
          >
            <span>Explore Full Process Details</span>
            <ArrowRight className="w-4 h-4 arrow-slide" />
          </Link>
        </div>

        {/* Connected Pipeline Flow */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-[28px] left-[5%] right-[5%] h-0.5 bg-[var(--border-hairline)] -z-0" />

          {/* 6 Connected Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative z-10">
            {STAGES.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.num}
                  className="flex flex-col space-y-4 group p-4 sm:p-5 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] hover:border-[#2563EB] transition-all duration-300 shadow-2xs hover:shadow-xs"
                >
                  {/* Step Header with Node Indicator */}
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-mono text-xs font-bold group-hover:bg-[#2563EB] group-hover:text-white transition-colors shrink-0">
                      {s.num}
                    </div>
                    <Icon className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[#2563EB] transition-colors shrink-0" />
                  </div>

                  {/* Content */}
                  <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display font-extrabold text-lg text-[var(--text-heading)] group-hover:text-[#2563EB] transition-colors">
                        {s.phase}
                      </h3>
                      <p className="font-sans text-xs font-semibold text-[#2563EB] mt-0.5 leading-snug">
                        {s.summary}
                      </p>
                    </div>

                    <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed font-normal pt-2 border-t border-[var(--border-hairline)]">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subtle Quick Link Bar */}
        <div className="pt-2 flex items-center justify-between text-xs font-mono text-[var(--text-muted)] border-t border-[var(--border-hairline)]">
          <span className="uppercase tracking-wider">END-TO-END METHODOLOGY // NO VENDOR DISCONNECTS</span>
          <Link
            href="/process"
            className="inline-flex items-center gap-1.5 font-bold text-[#2563EB] hover:underline"
          >
            <span>Read Complete Milestone &amp; DFM Breakdown &rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
