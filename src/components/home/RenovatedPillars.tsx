"use client";

import { useState } from "react";

const pillars = [
  {
    spec: "CAPABILITY 01",
    specBg: "bg-[#3b82f6] text-[#0f0f10]",
    cardBg: "bg-white text-[#0f0f10]",
    borderTopOpacity: "border-[#0f0f10]/20",
    title: "Mechanical & Product Design",
    description:
      "Stainless-steel & CNC-fabricated enclosures, complex thermal airflow management, injection mold tooling, and industrial ergonomic design built for harsh operating environments.",
    footnoteLabel: "CORE DISCIPLINES",
    footnoteValue: "CAD / CNC / DFM / THERMALS",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6 text-[#0f0f10]" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    spec: "CAPABILITY 02",
    specBg: "bg-[#1d4ed8] text-[#dbeafe]",
    cardBg: "bg-[#3b82f6] text-[#0f0f10]",
    borderTopOpacity: "border-[#0f0f10]/40",
    title: "Electronics & Embedded Firmware",
    description:
      "Custom multi-layer PCB design, component sourcing, sensor integration, and deterministic C/C++ firmware running on ESP32, STM32, and ARM architectures with OTA capabilities.",
    footnoteLabel: "HARDWARE STANDARDS",
    footnoteValue: "CUSTOM PCBA / EMC TESTED",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6 text-[#f5c518]" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <path d="M6 18h12M6 6h12M9 6v12M15 6v12" />
      </svg>
    ),
  },
  {
    spec: "CAPABILITY 03",
    specBg: "bg-[#eff6ff] text-[#1d4ed8]",
    cardBg: "bg-white text-[#0f0f10]",
    borderTopOpacity: "border-[#0f0f10]/20",
    title: "Cloud, IoT & Machine HMI",
    description:
      "Industrial touchscreen software, real-time telemetry streaming, remote fleet diagnostics, and high-concurrency cloud backends ensuring 99.98% machine availability.",
    footnoteLabel: "DIGITAL INFRASTRUCTURE",
    footnoteValue: "NEXT.JS / MQTT / AWS IoT",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6 text-[#0f0f10]" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <circle cx="12" cy="11" r="3" fill="#f5c518" />
      </svg>
    ),
  },
];

export function RenovatedPillars() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="capabilities" className="w-full bg-[#f0f7ff] border-b-2 border-[#0f0f10] py-20 sm:py-28 relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="border-b-2 border-[#0f0f10] pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="size-3 bg-[#3b82f6] border border-[#0f0f10]" />
              <span className="font-mono font-bold text-xs uppercase text-[#0f0f10] tracking-widest">
                MODULE 01 / CORE DISCIPLINES
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#0f0f10]">
              CORE ENGINEERING PILLARS
            </h2>
          </div>

          <div className="max-w-md font-mono text-xs sm:text-sm text-[#0f0f10]/75 leading-relaxed">
            Eliminating multi-vendor friction by integrating mechanical design, custom electronics, and digital systems under one roof.
          </div>
        </div>

        {/* 3 Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`${pillar.cardBg} border-2 border-[#0f0f10] shadow-brutal-md p-8 sm:p-10 relative flex flex-col justify-between transition-all duration-300 ${
                hoveredIdx === idx ? "-translate-y-2 shadow-brutal-lg" : ""
              }`}
            >
              {/* Corner Spec Badge */}
              <div
                className={`absolute -top-3.5 right-6 ${pillar.specBg} border border-[#0f0f10] px-3.5 py-1 font-mono font-bold text-[11px] tracking-wider uppercase shadow-[2px_2px_0px_#0f0f10]`}
              >
                {pillar.spec}
              </div>

              <div>
                {/* Vector Glyph Emblem */}
                <div className="bg-[#f7f6f2] border-2 border-[#0f0f10] shadow-[3px_3px_0px_#0f0f10] size-14 flex items-center justify-center mb-8">
                  {pillar.icon}
                </div>

                {/* Card Title */}
                <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight mb-4">
                  {pillar.title}
                </h3>

                {/* Card Narrative */}
                <p className="font-display text-sm sm:text-base opacity-80 leading-relaxed mb-8">
                  {pillar.description}
                </p>
              </div>

              {/* System Footnote Specs */}
              <div className={`border-t-2 ${pillar.borderTopOpacity} pt-4 flex items-center justify-between font-mono text-xs`}>
                <span className="opacity-70 font-medium">{pillar.footnoteLabel}</span>
                <span className="font-bold tracking-wider">{pillar.footnoteValue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
