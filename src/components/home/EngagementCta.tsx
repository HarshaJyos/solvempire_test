"use client";

import Link from "next/link";
import { COMPANY } from "@/lib/company";

export function EngagementCta() {
  return (
    <section id="contact" className="w-full bg-[#3b82f6] border-b-2 border-[#0f0f10] py-20 sm:py-28 px-4 sm:px-6 relative">
      <div className="max-w-[1280px] mx-auto">
        {/* Large Neo-Brutalist Call to Action Card */}
        <div className="bg-white border-2 border-[#0f0f10] shadow-brutal-xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          {/* Copy Area */}
          <div className="flex flex-col items-start max-w-2xl">
            <div className="bg-[#1d4ed8] text-[#dbeafe] px-3.5 py-1 font-mono font-bold text-xs uppercase tracking-wider mb-5 shadow-[2px_2px_0px_#0f0f10]">
              PROJECT DISPATCH // READY
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#0f0f10] uppercase tracking-tight leading-tight mb-4">
              READY TO ENGINEER YOUR NEXT PRODUCT?
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#0f0f10]/80 leading-relaxed max-w-xl">
              Send us your initial sketches, CAD models, or component requirements. We turn complex physical-digital ideas into field-ready working hardware.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto shrink-0">
            <Link
              href="/contact"
              className="btn-brutal bg-[#1d4ed8] hover:bg-[#2563eb] text-[#dbeafe] border-2 border-[#0f0f10] shadow-brutal-md px-8 py-4 font-mono font-bold text-xs sm:text-sm tracking-wider uppercase text-center flex items-center justify-center gap-2"
            >
              <span>&gt;</span> START A PROJECT
            </Link>
            <a
              href={`mailto:${COMPANY.email}`}
              className="btn-brutal bg-[#f7f6f2] hover:bg-white text-[#0f0f10] border-2 border-[#0f0f10] shadow-brutal-md px-8 py-4 font-mono font-bold text-xs sm:text-sm tracking-wider uppercase text-center flex items-center justify-center gap-2"
            >
              DIRECT TRANSMISSION
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
