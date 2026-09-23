"use client";

import React from "react";
import { Zap, Users2, ShieldCheck, ArrowUpRight } from "lucide-react";

interface BenefitCard {
  num: string;
  tag: string;
  title: string;
  description: string;
  bullet: string;
  bgGradient: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  pillBg: string;
  pillText: string;
  pillBorder: string;
  accentColor: string;
  icon: typeof Zap;
}

const BENEFITS: BenefitCard[] = [
  {
    num: "01",
    tag: "SPEED & MARKET VELOCITY",
    title: "Launch faster, say yes to physical RFPs",
    description: "Ship hardware prototypes and production machines on predictable timelines your commercial team can confidently commit to.",
    bullet: "CAD-to-functional prototype in 3–6 weeks",
    bgGradient: "bg-gradient-to-b from-[#EFF6FF] via-[#F4F8FF] to-[#FFFFFF]",
    borderColor: "border-[#BFDBFE] hover:border-[#1F56C6]",
    badgeBg: "bg-[#1F56C6]",
    badgeText: "text-white",
    pillBg: "bg-[#1F56C6]/10",
    pillText: "text-[#1F56C6]",
    pillBorder: "border-[#1F56C6]/25",
    accentColor: "text-[#1F56C6]",
    icon: Zap,
  },
  {
    num: "02",
    tag: "SYNCHRONIZED BENCH",
    title: "Specialized engineering you can't easily hire",
    description: "Access a synchronized bench of mechanical kinematic designers, multi-layer PCB layout leads, and firmware architects under one direct contract.",
    bullet: "Zero recruiter overhead or talent lock-in",
    bgGradient: "bg-gradient-to-b from-[#FEFCE8] via-[#FFFDEB] to-[#FFFFFF]",
    borderColor: "border-[#FDE047] hover:border-[#EAB308]",
    badgeBg: "bg-[#FACC15]",
    badgeText: "text-[#181A1D]",
    pillBg: "bg-[#FACC15]/20",
    pillText: "text-[#854D0E]",
    pillBorder: "border-[#FACC15]/40",
    accentColor: "text-[#854D0E]",
    icon: Users2,
  },
  {
    num: "03",
    tag: "TOTAL OWNERSHIP",
    title: "A turnkey partner, not a broker",
    description: "We stay engaged through pilot build, board bring-up, field testing, and volume manufacturing. We take total ownership of delivery.",
    bullet: "100% accountable CAD through volume deployment",
    bgGradient: "bg-gradient-to-b from-[#F0FDF4] via-[#F6FEF8] to-[#FFFFFF]",
    borderColor: "border-[#BBF7D0] hover:border-[#16A34A]",
    badgeBg: "bg-[#16A34A]",
    badgeText: "text-white",
    pillBg: "bg-[#16A34A]/10",
    pillText: "text-[#166534]",
    pillBorder: "border-[#16A34A]/25",
    accentColor: "text-[#166534]",
    icon: ShieldCheck,
  },
];

export function IndiseaWhatYouGet() {
  return (
    <section className="py-24 sm:py-32 bg-[var(--surface-canvas)] font-sans">
      <div className="indisea-wrap space-y-12 sm:space-y-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="indisea-eyebrow block">08 / what you get</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[56px] text-[var(--text-heading)] uppercase tracking-tight mt-2">
              Why Teams Build With Us
            </h2>
          </div>
          <p className="font-sans text-sm sm:text-base text-[var(--text-muted)] max-w-md">
            Direct access to senior physical systems engineers without middle-management friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BENEFITS.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.num}
                className={`relative p-8 sm:p-10 rounded-none ${b.bgGradient} border ${b.borderColor} transition-all duration-300 flex flex-col justify-between min-h-[360px] sm:min-h-[440px] shadow-sm hover:shadow-md group overflow-hidden`}
              >
                {/* Background Architectural Watermark Number */}
                <span className="absolute -right-3 -top-6 font-display font-black text-8xl sm:text-9xl text-slate-900/[0.03] select-none pointer-events-none">
                  {b.num}
                </span>

                {/* Top Bar: Sharp Pill Tag & Number Badge */}
                <div className="flex items-center justify-between gap-3 relative z-10">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-none font-mono text-[10px] font-bold uppercase tracking-wider border ${b.pillBg} ${b.pillText} ${b.pillBorder}`}>
                    {b.tag}
                  </span>

                  <div className={`w-9 h-9 rounded-none ${b.badgeBg} ${b.badgeText} flex items-center justify-center font-mono font-extrabold text-xs shadow-2xs`}>
                    {b.num}
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div className="space-y-6 pt-12 relative z-10">
                  <div className="space-y-3">
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl uppercase tracking-tight text-[var(--text-heading)] leading-snug">
                      {b.title}
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-[var(--text-body)] leading-relaxed font-normal">
                      {b.description}
                    </p>
                  </div>

                  {/* Highlighted Micro-Deliverable Bullet */}
                  <div className={`pt-4 border-t ${b.borderColor} flex items-center gap-2 font-mono text-xs font-semibold ${b.accentColor} uppercase tracking-tight`}>
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{b.bullet}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
