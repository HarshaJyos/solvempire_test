"use client";

import React from "react";

const BENEFITS = [
  {
    num: "01",
    title: "Launch faster, say yes to physical RFPs",
    description: "Ship hardware prototypes and production machines on predictable timelines your commercial team can confidently commit to.",
    hoverBorder: "hover:border-[#0EA5E9]",
    hoverBg: "hover:bg-[#0EA5E9]/5",
  },
  {
    num: "02",
    title: "Specialized engineering you can't easily hire",
    description: "Access a synchronized bench of mechanical kinematic designers, multi-layer PCB layout leads, and firmware architects under one direct contract.",
    hoverBorder: "hover:border-[#FACC15]",
    hoverBg: "hover:bg-[#FACC15]/5",
  },
  {
    num: "03",
    title: "A turnkey partner, not a broker",
    description: "We stay engaged through pilot build, board bring-up, field testing, and volume manufacturing. We take total ownership of delivery.",
    hoverBorder: "hover:border-[#22C55E]",
    hoverBg: "hover:bg-[#22C55E]/5",
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
              className={`p-8 sm:p-10 rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] ${b.hoverBorder} ${b.hoverBg} transition-all duration-300 flex flex-col justify-between min-h-[320px] sm:min-h-[420px] shadow-sm group`}
            >
              {/* Top Circled Number */}
              <div className="w-12 h-12 rounded-full border-2 border-[var(--text-heading)] flex items-center justify-center font-display font-bold text-base text-[var(--text-heading)] group-hover:scale-110 transition-transform">
                {b.num}
              </div>

              {/* Bottom Text Content */}
              <div className="space-y-4">
                <h3 className="font-display font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-[var(--text-heading)] leading-snug">
                  {b.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-[var(--text-muted)] leading-relaxed font-normal">
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
