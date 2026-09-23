"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";

export function IndiseaHero() {
  return (
    <section className="relative min-h-[88vh] sm:min-h-[94vh] flex flex-col justify-end pt-32 pb-12 sm:pt-40 sm:pb-16 overflow-hidden font-sans">
      <div className="indisea-wrap relative z-10 space-y-8 sm:space-y-12">
        {/* Eyebrow Label */}
        <div>
          <span className="indisea-eyebrow">01 / hero</span>
        </div>

        {/* Indisea-Style Display Headline with Beautiful Sharp Highlight Badges */}
        <div className="max-w-6xl">
          <h1 className="font-display font-extrabold text-[36px] sm:text-[54px] md:text-[68px] lg:text-[84px] xl:text-[96px] tracking-tight text-[var(--text-heading)] space-y-2 sm:space-y-4">
            {/* Line 1: WE [DESIGN], [ENGINEER], */}
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 leading-none">
              <span className="uppercase">WE</span>
              <span className="inline-flex items-center px-3 sm:px-5 py-0.5 sm:py-1 rounded-none bg-[#FACC15] text-[#181A1D] border border-amber-400 shadow-2xs font-display uppercase tracking-wide">
                DESIGN
              </span>
              <span>,</span>
              <span className="inline-flex items-center px-3 sm:px-5 py-0.5 sm:py-1 rounded-none bg-[#1F56C6] text-white border border-[#17449E] shadow-2xs font-display uppercase tracking-wide">
                ENGINEER
              </span>
              <span>,</span>
            </div>

            {/* Line 2: AND [MANUFACTURE] */}
            <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 leading-none">
              <span className="uppercase">AND</span>
              <span className="inline-flex items-center px-3 sm:px-5 py-0.5 sm:py-1 rounded-none bg-[#16A34A] text-white border border-emerald-700 shadow-2xs font-display uppercase tracking-wide">
                MANUFACTURE
              </span>
            </div>

            {/* Line 3: PHYSICAL MACHINES */}
            <div className="block leading-none text-slate-900 pt-1 uppercase">
              PHYSICAL MACHINES
            </div>

            {/* Line 4: & CONNECTED HARDWARE. */}
            <div className="block leading-none text-[#1F56C6] pt-1 uppercase">
              &amp; CONNECTED HARDWARE.
            </div>
          </h1>
        </div>

        {/* Bottom Split: Action CTAs + Scroll Cue */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-[var(--border-hairline)]">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="group btn-indisea-blue flex items-center gap-2 text-sm sm:text-base px-7 py-3.5 shadow-xs"
            >
              <span>Talk to us</span>
              <ArrowRight className="w-4 h-4 arrow-slide" />
            </Link>

            <Link
              href="/work"
              className="px-6 py-3.5 rounded-full border border-[var(--border-strong)] text-xs sm:text-sm font-display font-bold text-[var(--text-heading)] hover:bg-[var(--surface-card)] transition-colors"
            >
              <span>Explore Deployed Systems &rarr;</span>
            </Link>
          </div>


          <div className="flex items-center gap-2 text-[var(--text-muted)] font-mono text-xs font-semibold uppercase tracking-wider">
            <a
              href="#live-wall"
              className="inline-flex items-center gap-2 hover:text-[var(--text-heading)] transition-colors"
            >
              <ArrowDown className="w-4 h-4 animate-bounce-subtle" />
              <span>Scroll to Explore</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
