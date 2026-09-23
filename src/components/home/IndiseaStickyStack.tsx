"use client";

import React from "react";

interface ReasonPanel {
  reasonNumber: string;
  title: string;
  description: string;
  bgClass: string;
  badgeBg: string;
  numColor: string;
  watermark: string;
  topOffset: string;
}

const PANELS: ReasonPanel[] = [
  {
    reasonNumber: "Reason 1",
    title: "Hardware gaps in product roadmaps & client RFPs",
    description:
      "A client asks whether you can deliver a dedicated physical device, automated kiosk, or connected controller. Deals stall while software teams scope mechanical and PCB work nobody was hired for. We take the entire hardware scope and build it.",
    bgClass: "bg-[#1F56C6] text-white",
    badgeBg: "bg-[#17449E]",
    numColor: "text-blue-200/30",
    watermark: "1",
    topOffset: "top-20",
  },
  {
    reasonNumber: "Reason 2",
    title: "Constrained in-house engineering & multi-vendor chaos",
    description:
      "Constant firefighting and finger-pointing across disconnected CAD freelancers, overseas PCB fabs, and firmware contractors. Shift total ownership of the physical system to our integrated studio.",
    bgClass: "bg-[#CA8A04] text-white",
    badgeBg: "bg-[#A16207]",
    numColor: "text-amber-200/30",
    watermark: "2",
    topOffset: "top-28",
  },
  {
    reasonNumber: "Reason 3",
    title: "Transitioning prototypes into certified volume production",
    description:
      "A 3D-printed proof-of-concept is not a commercial product. We engineer for mass manufacturing (DFM), sheet metal CNC tooling, automated testing fixtures, and volume SMT fabrication.",
    bgClass: "bg-[#16A34A] text-white",
    badgeBg: "bg-[#15803D]",
    numColor: "text-emerald-200/30",
    watermark: "3",
    topOffset: "top-36",
  },
];

export function IndiseaStickyStack() {
  return (
    <section className="relative py-20 bg-[var(--surface-canvas)] font-sans">
      <div className="indisea-wrap space-y-8">
        <div className="pb-4">
          <span className="indisea-eyebrow">08 / WHY COMPANIES PARTNER WITH US</span>
        </div>

        {/* Sticky Stacked Cards */}
        <div className="space-y-12">
          {PANELS.map((panel) => (
            <div
              key={panel.reasonNumber}
              className={`sticky ${panel.topOffset} rounded-3xl ${panel.bgClass} p-8 sm:p-14 lg:p-16 shadow-lg overflow-hidden border border-white/10`}
            >
              <div className="indisea-grid items-center relative z-10">
                {/* Text Content */}
                <div className="col-span-12 lg:col-span-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-none bg-white/20 backdrop-blur-xs">
                      08 // WHY COMPANIES PARTNER WITH US
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-white/80">
                      {panel.reasonNumber}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-[48px] uppercase tracking-tight leading-[1.1]">
                    {panel.title}
                  </h3>

                  <p className="font-sans text-base sm:text-xl text-white/90 max-w-2xl leading-relaxed font-normal">
                    {panel.description}
                  </p>
                </div>


                {/* Right Column / Background Giant Numeral */}
                <div className="col-span-12 lg:col-span-4 flex justify-end items-center">
                  <span
                    aria-hidden="true"
                    className={`font-display font-extrabold text-[120px] sm:text-[200px] lg:text-[260px] leading-none select-none ${panel.numColor}`}
                  >
                    {panel.watermark}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
