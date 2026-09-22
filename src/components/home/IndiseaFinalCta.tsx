"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Mail, Phone, ShieldCheck } from "lucide-react";

export function IndiseaFinalCta() {
  return (
    <section className="py-24 sm:py-36 bg-[#0EA5E9] text-[#181A1D] font-sans relative overflow-hidden">
      <div className="indisea-wrap space-y-10 sm:space-y-14 relative z-10">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#181A1D]/70 block">
            11 / talk to us
          </span>
        </div>

        {/* Massive Headline */}
        <div className="max-w-6xl">
          <h2 className="font-display font-extrabold text-[44px] sm:text-[76px] lg:text-[110px] xl:text-[132px] tracking-tight leading-[0.92] text-[#181A1D]">
            <span className="block">Let&apos;s start</span>
            <span className="block">building the</span>
            <span className="block">physical thing.</span>
          </h2>
        </div>

        {/* Contact Strip */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-4">
          <Link
            href="/contact"
            className="btn-indisea-primary text-base sm:text-lg px-8 py-4 bg-[#181A1D] text-white hover:bg-black shadow-lg"
          >
            <span>Scope Your Project</span>
            <ArrowRight className="w-5 h-5 ml-2 arrow-slide" />
          </Link>

          <a
            href="mailto:contact@solvempire.com"
            className="font-display font-bold text-base sm:text-lg text-[#181A1D] border-b-2 border-[#181A1D]/40 pb-1 hover:border-[#181A1D] transition-colors"
          >
            contact@solvempire.com
          </a>

          <a
            href="tel:+919121996739"
            className="font-display font-bold text-base sm:text-lg text-[#181A1D] border-b-2 border-[#181A1D]/40 pb-1 hover:border-[#181A1D] transition-colors"
          >
            +91 91219 96739
          </a>
        </div>

        {/* Reassurance Tags */}
        <div className="pt-8 border-t border-[#181A1D]/15 flex flex-wrap items-center gap-6 sm:gap-10 text-xs font-mono font-bold text-[#181A1D]/80 uppercase">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Strict Mutual NDA Executed</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Direct Lead Engineer Scoping</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>DFM &amp; BOM Feasibility Review</span>
          </div>
        </div>
      </div>
    </section>
  );
}
