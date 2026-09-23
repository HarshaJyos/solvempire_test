"use client";

import React from "react";

const BENEFITS = [
  {
    num: "01",
    title: "Launch faster, say yes to physical RFPs",
    description: "Ship hardware prototypes and production machines on predictable timelines your commercial team can confidently commit to.",
    bg: "bg-[#FFFFFF]",
    titleColor: "!text-[#181A1D]",
    descColor: "!text-[#4B5563]",
    numColor: "!text-[#181A1D]",
    borderCircle: "border-[#181A1D]/30",
    borderCard: "border-[var(--border-hairline)] hover:border-[#1F56C6]",
    titleStyle: { color: "#181A1D" },
    descStyle: { color: "#4B5563" },
    numStyle: { color: "#181A1D" },
  },
  {
    num: "02",
    title: "Specialized engineering you can't easily hire",
    description: "Access a synchronized bench of mechanical kinematic designers, multi-layer PCB layout leads, and firmware architects under one direct contract.",
    bg: "bg-[#181A1D]",
    titleColor: "!text-white",
    descColor: "!text-slate-300",
    numColor: "!text-white",
    borderCircle: "border-white/40",
    borderCard: "border-slate-800 hover:border-slate-600 shadow-md",
    titleStyle: { color: "#FFFFFF" },
    descStyle: { color: "#CBD5E1" },
    numStyle: { color: "#FFFFFF" },
  },
  {
    num: "03",
    title: "A turnkey partner, not a broker",
    description: "We stay engaged through pilot build, board bring-up, field testing, and volume manufacturing. We take total ownership of delivery.",
    bg: "bg-[#E6E1DA]",
    titleColor: "!text-[#181A1D]",
    descColor: "!text-[#374151]",
    numColor: "!text-[#181A1D]",
    borderCircle: "border-[#181A1D]/30",
    borderCard: "border-[#D4CDC4] hover:border-slate-500",
    titleStyle: { color: "#181A1D" },
    descStyle: { color: "#374151" },
    numStyle: { color: "#181A1D" },
  },
];

export function IndiseaWhatYouGet() {
  return (
    <section className="py-24 sm:py-32 bg-[var(--surface-canvas)] font-sans">
      <div className="indisea-wrap space-y-12 sm:space-y-16">
        <div>
          <span className="indisea-eyebrow">09 / THE SOLVEMPIRE ADVANTAGE</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BENEFITS.map((b) => (
            <div
              key={b.num}
              className={`p-8 sm:p-10 rounded-3xl ${b.bg} border ${b.borderCard} transition-all duration-300 flex flex-col justify-between min-h-[360px] sm:min-h-[430px] shadow-sm hover:shadow-lg group`}
            >
              {/* Top Circled Number */}
              <div
                style={b.numStyle}
                className={`w-12 h-12 rounded-full border-2 ${b.borderCircle} flex items-center justify-center font-display font-bold text-base ${b.numColor} group-hover:scale-105 transition-transform`}
              >
                {b.num}
              </div>

              {/* Bottom Text Content */}
              <div className="space-y-4">
                <h3
                  style={b.titleStyle}
                  className={`font-display font-extrabold text-xl sm:text-2xl uppercase tracking-tight ${b.titleColor} leading-snug`}
                >
                  {b.title}
                </h3>
                <p
                  style={b.descStyle}
                  className={`font-sans text-sm sm:text-base ${b.descColor} leading-relaxed font-normal`}
                >
                  {b.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

