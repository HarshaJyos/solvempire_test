"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { partnerPillars } from "@/content/services";

gsap.registerPlugin(ScrollTrigger);

export function WhyPartner() {
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<number | null>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const mm = gsap.matchMedia();

    // Pinned track ONLY on desktop (>= 1024px)
    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          const index = Math.min(partnerPillars.length - 1, Math.floor(p * partnerPillars.length));
          setActivePillarIndex((prev) => (prev === index ? prev : index));
        },
      });
    });

    return () => mm.revert();
  }, []);

  const activePillar = partnerPillars[activePillarIndex] || partnerPillars[0];

  const renderBlueprintGraphic = (idx: number) => {
    switch (idx) {
      case 0:
        return (
          <svg className="w-full h-full max-h-52" viewBox="0 0 400 240" fill="none" aria-hidden="true">
            <rect x="50" y="30" width="300" height="180" rx="12" stroke="white" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.3" />
            <rect x="70" y="50" width="260" height="140" rx="8" stroke="white" strokeWidth="1.5" />
            <circle cx="200" cy="120" r="45" stroke="white" strokeWidth="1.5" />
            <circle cx="200" cy="120" r="25" stroke="white" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <line x1="120" y1="120" x2="280" y2="120" stroke="white" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
            <line x1="200" y1="65" x2="200" y2="175" stroke="white" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
          </svg>
        );
      case 1:
        return (
          <svg className="w-full h-full max-h-52" viewBox="0 0 400 240" fill="none" aria-hidden="true">
            <rect x="60" y="60" width="280" height="120" rx="16" stroke="white" strokeWidth="1.5" />
            <rect x="85" y="80" width="230" height="80" rx="8" stroke="white" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
            <circle cx="130" cy="120" r="18" stroke="white" strokeWidth="1.5" />
            <circle cx="270" cy="120" r="18" stroke="white" strokeWidth="1.5" />
            <line x1="150" y1="120" x2="250" y2="120" stroke="white" strokeWidth="1.5" strokeDasharray="6 3" />
          </svg>
        );
      case 2:
        return (
          <svg className="w-full h-full max-h-52" viewBox="0 0 400 240" fill="none" aria-hidden="true">
            <circle cx="200" cy="120" r="75" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
            <circle cx="200" cy="120" r="45" stroke="white" strokeWidth="1.5" />
            <circle cx="200" cy="120" r="12" fill="white" />
            <circle cx="100" cy="80" r="8" stroke="white" strokeWidth="1.5" />
            <circle cx="300" cy="80" r="8" stroke="white" strokeWidth="1.5" />
            <circle cx="140" cy="180" r="8" stroke="white" strokeWidth="1.5" />
            <circle cx="260" cy="180" r="8" stroke="white" strokeWidth="1.5" />
            <line x1="200" y1="120" x2="100" y2="80" stroke="white" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            <line x1="200" y1="120" x2="300" y2="80" stroke="white" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            <line x1="200" y1="120" x2="140" y2="180" stroke="white" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            <line x1="200" y1="120" x2="260" y2="180" stroke="white" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          </svg>
        );
      case 3:
        return (
          <svg className="w-full h-full max-h-52" viewBox="0 0 400 240" fill="none" aria-hidden="true">
            <rect x="70" y="40" width="260" height="160" rx="10" stroke="white" strokeWidth="1.5" />
            <line x1="70" y1="80" x2="330" y2="80" stroke="white" strokeWidth="1" opacity="0.3" />
            <line x1="70" y1="120" x2="330" y2="120" stroke="white" strokeWidth="1" opacity="0.3" />
            <line x1="70" y1="160" x2="330" y2="160" stroke="white" strokeWidth="1" opacity="0.3" />
            <polyline points="90,150 140,110 190,130 240,70 290,95" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="240" cy="70" r="5" fill="white" />
          </svg>
        );
      case 4:
        return (
          <svg className="w-full h-full max-h-52" viewBox="0 0 400 240" fill="none" aria-hidden="true">
            <rect x="80" y="50" width="240" height="140" rx="4" stroke="white" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
            <path d="M 120 70 L 280 70 L 280 170 L 120 170 Z" stroke="white" strokeWidth="1.5" />
            <line x1="120" y1="70" x2="160" y2="40" stroke="white" strokeWidth="1.5" />
            <line x1="280" y1="70" x2="320" y2="40" stroke="white" strokeWidth="1.5" />
            <line x1="280" y1="170" x2="320" y2="140" stroke="white" strokeWidth="1.5" />
            <line x1="160" y1="40" x2="320" y2="40" stroke="white" strokeWidth="1.5" />
            <line x1="320" y1="40" x2="320" y2="140" stroke="white" strokeWidth="1.5" />
          </svg>
        );
      case 5:
        return (
          <svg className="w-full h-full max-h-52" viewBox="0 0 400 240" fill="none" aria-hidden="true">
            <circle cx="200" cy="120" r="70" stroke="white" strokeWidth="1.5" />
            <circle cx="200" cy="120" r="50" stroke="white" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
            <path d="M 200 65 L 200 120 L 240 140" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="200" cy="120" r="4" fill="white" />
            <path d="M 150 120 A 50 50 0 0 1 200 70" stroke="white" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="why-partner"
      ref={containerRef}
      aria-labelledby="why-partner-heading"
      className="relative w-full bg-canvas border-t border-hairline/70"
    >
      {/* ========================================================================= */}
      {/* DESKTOP VIEW: Pinned Scroll Track (>= 1024px, 260vh) */}
      {/* ========================================================================= */}
      <div className="hidden lg:block relative h-[260vh] w-full">
        <div
          ref={trackRef}
          className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-canvas px-8 lg:px-12 py-6"
        >
          {/* Ambient Lighting Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[550px] bg-brand/5 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute inset-0 bg-dot-matrix-subtle opacity-35 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_95%)] -z-10" />

          <div className="max-w-7xl w-full mx-auto flex flex-col items-center relative z-10">
            {/* Section Heading */}
            <div className="w-full text-center max-w-4xl mx-auto mb-8 shrink-0">
              <span className="inline-block text-brand font-bold text-xs sm:text-sm tracking-widest uppercase mb-2">
                WHY CHOOSE US
              </span>
              <h2
                id="why-partner-heading"
                className="font-display text-3xl md:text-4xl lg:text-[2.85rem] font-bold tracking-tight text-heading uppercase leading-tight"
              >
                <span>WHY PARTNER WITH </span>
                <span className="text-brand">SOLVEMPIRE?</span>
              </h2>
            </div>

            {/* Main Interactive Partner Showcase Card */}
            <div className="bg-surface rounded-[2.5rem] border border-hairline shadow-xl p-10 relative w-full">
              <div className="grid grid-cols-12 gap-12 items-center">
                {/* Left Column: Numbered Timeline Stepper Rail */}
                <div className="col-span-1 flex flex-col items-center justify-between h-[340px] relative py-2">
                  <div className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-[2px] bg-hairline z-0" />
                  <div
                    className="absolute top-4 left-1/2 -translate-x-1/2 w-[2px] bg-brand z-0 transition-all duration-300 ease-out"
                    style={{
                      height: `${(activePillarIndex / (partnerPillars.length - 1)) * 100}%`,
                    }}
                  />

                  {partnerPillars.map((pillar, idx) => {
                    const isActive = activePillarIndex === idx;
                    return (
                      <button
                        key={pillar.id}
                        onClick={() => setActivePillarIndex(idx)}
                        aria-label={`Pillar ${pillar.id}: ${pillar.title}`}
                        className="relative z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-full cursor-pointer"
                      >
                        {isActive ? (
                          <div className="w-11 h-11 rounded-full bg-brand text-white font-bold text-sm flex items-center justify-center shadow-lg shadow-brand/35 ring-4 ring-brand/15 scale-110 transition-all duration-300">
                            <span>{pillar.id}</span>
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-surface border-2 border-hairline hover:border-brand text-muted hover:text-brand font-semibold text-xs flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-xs">
                            <span>{pillar.id}</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Middle Column: Pillar Content & Tool Badges */}
                <div className="col-span-6 flex flex-col items-start justify-center text-left w-full">
                  <div className="mb-2.5">
                    <span className="inline-block text-brand font-bold text-xs sm:text-sm tracking-widest uppercase">
                      {activePillar.tag}
                    </span>
                  </div>

                  <div className="w-full mb-3.5">
                    <h3 className="font-display text-2xl lg:text-[2.125rem] font-bold text-heading leading-[1.16] tracking-tight">
                      {activePillar.title}
                    </h3>
                  </div>

                  <div className="w-full mb-6">
                    <p className="text-body text-base lg:text-[1.05rem] leading-[1.618] max-w-lg">
                      {activePillar.description}
                    </p>
                  </div>

                  {/* Tool Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {activePillar.tools.map((tool) => (
                      <div
                        key={tool.name}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-subtle border border-hairline"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0" />
                        <span className="font-semibold text-heading text-xs whitespace-nowrap">
                          {tool.name}
                        </span>
                        <span className="text-[10px] text-muted font-normal whitespace-nowrap border-l border-hairline pl-1.5">
                          {tool.category}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <Link
                      href={`/work/${activePillar.projectSlug}`}
                      className="inline-flex items-center gap-2 text-brand hover:text-brand-hover font-semibold text-sm transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-md px-1"
                    >
                      <span>Explore related project</span>
                      <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                    </Link>
                  </div>
                </div>

                {/* Right Column: Blueprint Visualizer Graphic */}
                <div className="col-span-5 flex items-center justify-center">
                  <div className="w-full h-80 rounded-2xl bg-gradient-to-br from-brand via-brand to-blue-700 p-6 shadow-2xl relative overflow-hidden flex items-center justify-center border border-brand/30">
                    <div
                      className="absolute inset-0 opacity-15 pointer-events-none"
                      style={{
                        backgroundImage: "radial-gradient(#ffffff 1.2px, transparent 1.2px)",
                        backgroundSize: "20px 20px",
                      }}
                    />
                    <div className="relative z-10 w-full flex items-center justify-center">
                      {renderBlueprintGraphic(activePillarIndex)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE VIEW: True Accessible Accordion (< 1024px, 0vh Extra Scroll) */}
      {/* ========================================================================= */}
      <div className="block lg:hidden w-full py-16 px-4 sm:px-6">
        <div className="max-w-xl mx-auto flex flex-col items-center">
          {/* Section Heading */}
          <div className="text-center mb-8">
            <span className="inline-block text-brand font-bold text-xs tracking-widest uppercase mb-1">
              WHY CHOOSE US
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-heading uppercase leading-tight">
              <span>WHY PARTNER WITH </span>
              <span className="text-brand">SOLVEMPIRE?</span>
            </h2>
          </div>

          {/* Real Accessible Accordion */}
          <div className="w-full flex flex-col divide-y divide-hairline border border-hairline bg-surface rounded-2xl overflow-hidden shadow-sm">
            {partnerPillars.map((pillar, idx) => {
              const isOpen = openMobileAccordion === idx;
              return (
                <div key={`mob-pillar-${pillar.id}`} className={isOpen ? "bg-canvas/40" : "bg-surface"}>
                  <button
                    type="button"
                    onClick={() => setOpenMobileAccordion((prev) => (prev === idx ? null : idx))}
                    aria-expanded={isOpen}
                    aria-controls={`pillar-body-${pillar.id}`}
                    className="w-full flex items-center justify-between py-4 px-4 sm:px-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand cursor-pointer gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                          isOpen ? "bg-brand text-white" : "bg-surface-subtle text-body border border-hairline"
                        }`}
                      >
                        {pillar.id}
                      </div>
                      <div className="min-w-0">
                        <span className="block text-[10px] font-bold text-brand tracking-wider uppercase">
                          {pillar.tag}
                        </span>
                        <h3 className="font-display text-sm sm:text-base font-bold text-heading leading-snug">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? "bg-brand text-white rotate-45" : "bg-surface-subtle text-muted border border-hairline"
                      }`}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </button>

                  {isOpen && (
                    <div id={`pillar-body-${pillar.id}`} className="px-4 pb-4 sm:px-5 sm:pb-5">
                      <div className="relative w-full h-28 rounded-xl bg-gradient-to-br from-brand to-blue-700 p-2 my-2 overflow-hidden flex items-center justify-center border border-brand/30">
                        {renderBlueprintGraphic(idx)}
                      </div>
                      <p className="text-body text-xs sm:text-sm leading-[1.618] mb-3">
                        {pillar.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {pillar.tools.map((tool) => (
                          <span
                            key={tool.name}
                            className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-surface border border-hairline text-heading"
                          >
                            {tool.name}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/work/${pillar.projectSlug}`}
                        className="inline-flex items-center gap-1.5 text-brand hover:text-brand-hover font-semibold text-xs"
                      >
                        <span>View project details</span>
                        <span>&rarr;</span>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
