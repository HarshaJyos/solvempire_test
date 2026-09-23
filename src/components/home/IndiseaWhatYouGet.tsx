"use client";

import React from "react";

const BENEFITS = [
  {
    num: "01",
    title: "Launch faster, say yes to physical RFPs",
    description: "Ship hardware prototypes and production machines on predictable timelines your commercial team can confidently commit to.",
    bg: "bg-[#1F56C6]",
    textPrimary: "text-white",
    textSecondary: "text-blue-100/90",
    borderCircle: "border-white/35",
    borderCard: "border-[#17449E]",
  },
  {
    num: "02",
    title: "Specialized engineering you can't easily hire",
    description: "Access a synchronized bench of mechanical kinematic designers, multi-layer PCB layout leads, and firmware architects under one direct contract.",
    bg: "bg-[#FACC15]",
    textPrimary: "text-[#181A1D]",
    textSecondary: "text-[#181A1D]/80",
    borderCircle: "border-[#181A1D]/35",
    borderCard: "border-[#EAB308]",
  },
  {
    num: "03",
    title: "A turnkey partner, not a broker",
    description: "We stay engaged through pilot build, board bring-up, field testing, and volume manufacturing. We take total ownership of delivery.",
    bg: "bg-[#16A34A]",
    textPrimary: "text-white",
    textSecondary: "text-emerald-100/90",
    borderCircle: "border-white/35",
    borderCard: "border-[#15803D]",
  },
];

export function IndiseaWhatYouGet() {
  return (
    <section className="py-24 sm:py-32 bg-[var(--surface-canvas)] font-sans">
      <div className="indisea-wrap space-y-12 sm:space-y-16">
        <div>
          <span className="indisea-eyebrow">08 / what you get</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BENEFITS.map((b) => (
            <div
              key={b.num}
              className={`p-8 sm:p-10 rounded-3xl ${b.bg} border ${b.borderCard} transition-all duration-300 flex flex-col justify-between min-h-[360px] sm:min-h-[430px] shadow-sm hover:shadow-lg group`}
            >
              {/* Top Circled Number */}
              <div className={`w-12 h-12 rounded-full border-2 ${b.borderCircle} flex items-center justify-center font-display font-bold text-base ${b.textPrimary} group-hover:scale-105 transition-transform`}>
                {b.num}
              </div>

              {/* Bottom Text Content */}
              <div className="space-y-4">
                <h3 className={`font-display font-extrabold text-xl sm:text-2xl uppercase tracking-tight ${b.textPrimary} leading-snug`}>
                  {b.title}
                </h3>
                <p className={`font-sans text-sm sm:text-base ${b.textSecondary} leading-relaxed font-normal`}>
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

