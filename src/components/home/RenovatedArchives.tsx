"use client";

import { useState } from "react";
import Link from "next/link";
import { caseStudies } from "@/content/case-studies";

export function RenovatedArchives() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Take the 4 featured case studies
  const featured = caseStudies.slice(0, 4);

  return (
    <section id="archives" className="w-full bg-[#eff6ff] border-b-2 border-[#0f0f10] py-20 sm:py-28 relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="border-b-2 border-[#0f0f10] pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="size-3 bg-[#3b82f6] border border-[#0f0f10]" />
              <span className="font-mono font-bold text-xs uppercase text-[#0f0f10] tracking-widest">
                FEATURED PORTFOLIO // CASE ARCHIVES
              </span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#0f0f10]">
              PROVEN FIELD DEPLOYMENTS
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/work"
              className="btn-brutal bg-white hover:bg-[#fafaf8] text-[#0f0f10] border-2 border-[#0f0f10] shadow-brutal-sm px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2"
            >
              VIEW ALL CASE STUDIES &rarr;
            </Link>
          </div>
        </div>

        {/* Featured Case Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-stretch">
          {featured.map((study, idx) => (
            <div
              key={study.slug}
              onMouseEnter={() => setHoveredCard(study.slug)}
              onMouseLeave={() => setHoveredCard(null)}
              className="bg-white border-2 border-[#0f0f10] shadow-brutal-lg overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* System Window Header Bar */}
              <div className="bg-[#f7f6f2] border-b-2 border-[#0f0f10] px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-[#0f0f10]" />
                  <span className="size-3 rounded-full bg-[#f5c518] border border-[#0f0f10]" />
                  <span className="size-3 rounded-full bg-[#ecebe4] border border-[#0f0f10]" />
                  <span className="font-mono font-bold text-xs text-[#0f0f10] ml-2 tracking-wide uppercase">
                    {study.category.split(" ")[0]} // 0{idx + 1}
                  </span>
                </div>
                <span className="bg-[#0f0f10] text-[#f5c518] font-mono font-bold text-[11px] px-2.5 py-0.5 tracking-wider uppercase">
                  {study.status}
                </span>
              </div>

              {/* Blueprint Graphic Render Area */}
              <div className="bg-[#fafaf8] p-6 sm:p-8">
                <div className="bg-white border-2 border-[#0f0f10] p-6 relative">
                  {/* Blueprint Metrics Header */}
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#0f0f10]/70 pb-3 border-b border-[#0f0f10]/15">
                    <span>CLIENT: {study.client}</span>
                    <span>DISCIPLINES: {study.disciplines.slice(0, 2).join(" / ")}</span>
                  </div>

                  {/* Technical Visual Schematics depending on case study */}
                  <div className="my-6 flex items-center justify-center min-h-[140px] relative overflow-hidden">
                    {idx === 0 ? (
                      /* Isometric Machine Enclosure Diagram */
                      <svg
                        className={`w-full max-w-sm h-36 transition-transform duration-500 ${
                          hoveredCard === study.slug ? "scale-105" : ""
                        }`}
                        viewBox="0 0 320 130"
                        fill="none"
                      >
                        <polygon points="40,100 120,120 280,65 200,45" fill="#fafaf8" stroke="#0f0f10" strokeWidth="2" />
                        <polygon points="40,30 120,50 120,120 40,100" fill="#ffffff" stroke="#0f0f10" strokeWidth="2" />
                        <polygon points="120,50 280,-5 280,65 120,120" fill="#f0f7ff" stroke="#0f0f10" strokeWidth="2" />
                        <polygon points="40,30 200,-25 280,-5 120,50" fill="#f5c518" stroke="#0f0f10" strokeWidth="2" />
                        <path d="M60,55 Q110,75 160,45 T250,30" stroke="#3b82f6" strokeWidth="2.5" className="animate-dash-flow" />
                        <circle cx="160" cy="45" r="5" fill="#3b82f6" className="animate-pulse" />
                      </svg>
                    ) : idx === 1 ? (
                      /* Compact Enclosure Profile with Internal Heat Dissipation Lines */
                      <svg
                        className={`w-full max-w-sm h-36 transition-transform duration-500 ${
                          hoveredCard === study.slug ? "scale-105" : ""
                        }`}
                        viewBox="0 0 320 130"
                        fill="none"
                      >
                        <rect x="50" y="20" width="220" height="90" rx="4" fill="#f0f7ff" stroke="#0f0f10" strokeWidth="2" />
                        <rect x="65" y="35" width="80" height="60" fill="#f5c518" stroke="#0f0f10" strokeWidth="1.5" />
                        <rect x="160" y="35" width="95" height="60" fill="#ffffff" stroke="#0f0f10" strokeWidth="1.5" />
                        <line x1="175" y1="45" x2="240" y2="45" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
                        <line x1="175" y1="65" x2="240" y2="65" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
                        <line x1="175" y1="85" x2="240" y2="85" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
                        <circle cx="105" cy="65" r="10" fill="#0f0f10" />
                        <circle cx="105" cy="65" r="4" fill="#ffffff" />
                      </svg>
                    ) : idx === 2 ? (
                      /* Cylindrical Sensor Housing & O-Ring Seal */
                      <svg
                        className={`w-full max-w-sm h-36 transition-transform duration-500 ${
                          hoveredCard === study.slug ? "scale-105" : ""
                        }`}
                        viewBox="0 0 320 130"
                        fill="none"
                      >
                        <rect x="40" y="45" width="200" height="40" rx="2" fill="#ffffff" stroke="#0f0f10" strokeWidth="2" />
                        <circle cx="240" cy="65" r="20" fill="#3b82f6" stroke="#0f0f10" strokeWidth="2" />
                        <circle cx="240" cy="65" r="10" fill="#f5c518" stroke="#0f0f10" strokeWidth="1.5" />
                        <line x1="60" y1="45" x2="60" y2="85" stroke="#0f0f10" strokeWidth="1.5" strokeDasharray="2 2" />
                        <line x1="100" y1="45" x2="100" y2="85" stroke="#0f0f10" strokeWidth="1.5" strokeDasharray="2 2" />
                        <line x1="140" y1="45" x2="140" y2="85" stroke="#0f0f10" strokeWidth="1.5" strokeDasharray="2 2" />
                        <path d="M260,65 L300,65" stroke="#3b82f6" strokeWidth="3" className="animate-dash-flow" />
                      </svg>
                    ) : (
                      /* Fleet IoT Telemetry Mesh */
                      <svg
                        className={`w-full max-w-sm h-36 transition-transform duration-500 ${
                          hoveredCard === study.slug ? "scale-105" : ""
                        }`}
                        viewBox="0 0 320 130"
                        fill="none"
                      >
                        <circle cx="160" cy="65" r="50" stroke="#0f0f10" strokeWidth="1" strokeDasharray="4 4" />
                        <circle cx="160" cy="65" r="30" stroke="#0f0f10" strokeWidth="1.5" />
                        <circle cx="160" cy="65" r="14" fill="#f5c518" stroke="#0f0f10" strokeWidth="2" />
                        <rect x="70" y="50" width="30" height="30" fill="#ffffff" stroke="#0f0f10" strokeWidth="1.5" />
                        <rect x="220" y="50" width="30" height="30" fill="#3b82f6" stroke="#0f0f10" strokeWidth="1.5" />
                        <line x1="100" y1="65" x2="130" y2="65" stroke="#3b82f6" strokeWidth="2" className="animate-dash-flow" />
                        <line x1="190" y1="65" x2="220" y2="65" stroke="#3b82f6" strokeWidth="2" className="animate-dash-flow" />
                      </svg>
                    )}
                  </div>

                  {/* Highlights / Primary Metric */}
                  {study.metrics && study.metrics.length > 0 ? (
                    <div className="border-t border-[#0f0f10]/20 pt-3 flex items-center justify-between font-mono text-[11px] text-[#0f0f10]">
                      <span className="font-semibold">{study.metrics[0].label}:</span>
                      <span className="font-bold text-[#1d4ed8]">{study.metrics[0].value}</span>
                    </div>
                  ) : (
                    <div className="border-t border-[#0f0f10]/20 pt-3 flex items-center justify-between font-mono text-[11px] text-[#0f0f10]">
                      <span className="font-semibold">CATEGORY:</span>
                      <span className="font-bold text-[#1d4ed8]">{study.category}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Case Study Narrative & Call to View */}
              <div className="p-6 sm:p-8 pt-2 flex flex-col justify-between flex-1 gap-4">
                <div>
                  <h3 className="font-display font-bold text-2xl uppercase tracking-tight text-[#0f0f10] mb-2">
                    {study.title}
                  </h3>
                  <p className="font-display text-sm text-[#0f0f10]/80 leading-relaxed mb-4">
                    {study.summary}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#0f0f10]/15">
                  <div className="flex flex-wrap gap-1.5">
                    {study.disciplines.slice(0, 3).map((d, dIdx) => (
                      <span
                        key={dIdx}
                        className="bg-[#ecebe4] border border-[#0f0f10] px-2.5 py-0.5 font-mono font-semibold text-[10px] text-[#0f0f10]"
                      >
                        {d}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/work/${study.slug}`}
                    className="btn-brutal bg-[#0f0f10] hover:bg-[#1d4ed8] text-[#f0f7ff] border border-[#0f0f10] shadow-brutal-xs px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
                  >
                    READ CASE STUDY &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
