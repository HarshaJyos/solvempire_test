"use client";

import { useEffect, useState } from "react";
import { COMPANY } from "@/lib/company";

export function HeroShowcase() {
  const [latency, setLatency] = useState(8);
  const [coords, setCoords] = useState({ x: 512, y: 380 });
  const [isHovered, setIsHovered] = useState(false);

  // Subtle telemetry jitter for live technical dashboard feel
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(7 + Math.random() * 3));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCoords({ x, y });
  };

  return (
    <section className="relative w-full bg-[#f0f7ff] bg-blueprint-subtle border-b-2 border-[#0f0f10] overflow-hidden pt-8 pb-16 sm:pb-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Top Hero Telemetry Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 sm:pb-12">
          {/* Engineering Discipline Tag */}
          <div className="bg-white border-2 border-[#0f0f10] shadow-[3px_3px_0px_#0f0f10] px-3.5 py-1.5 flex items-center gap-2">
            <span className="font-mono font-bold text-xs uppercase text-[#0f0f10] tracking-wider">
              [SYSTEM: STUDIO]
            </span>
            <span className="font-mono text-xs text-[#0f0f10]/50">//</span>
            <span className="font-mono text-xs text-[#0f0f10] font-medium tracking-wide">
              END-TO-END PRODUCT ENGINEERING
            </span>
          </div>

          {/* Live Engineering Telemetry */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs">
            <div className="flex items-center gap-1.5 text-[#0f0f10]/80">
              <span className="text-[#0f0f10]/60">LATENCY:</span>
              <span className="font-bold text-[#0f0f10]">{latency}ms</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#0f0f10]/80">
              <span className="text-[#0f0f10]/60">UPTIME:</span>
              <span className="font-bold text-[#0f0f10]">99.98%</span>
            </div>
            <div className="bg-[#dbeafe]/70 border border-[#1d4ed8]/40 px-2.5 py-1 rounded-sm flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#1d4ed8] animate-ping" />
              <span className="font-mono text-[11px] font-semibold text-[#1d4ed8] tracking-wider uppercase">
                CAD TO COMMERCIAL DEPLOYMENT
              </span>
            </div>
          </div>
        </div>

        {/* Hero Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Hero Typography & Actions */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-start">
            {/* Tagline Badge */}
            <div className="bg-[#3b82f6] border-2 border-[#0f0f10] shadow-[3px_3px_0px_#0f0f10] px-3.5 py-1.5 mb-6">
              <span className="font-mono font-bold text-xs uppercase text-[#0f0f10] tracking-widest">
                Full-Stack Hardware &amp; Digital Engineering
              </span>
            </div>

            {/* Main Punchy Display Heading */}
            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-[84px] xl:text-[94px] text-[#0f0f10] uppercase tracking-[-0.035em] leading-[0.92] mb-8">
              WE FORGE
              <br />
              <span className="relative inline-block my-1 text-[#0f0f10]">
                PHYSICAL &amp; DIGITAL
                <svg
                  className="absolute -bottom-2.5 left-0 w-full h-4 sm:h-5 text-[#3b82f6] overflow-visible"
                  viewBox="0 0 240 16"
                  fill="none"
                >
                  <path
                    d="M3 12C65 4 175 3 237 11"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              EMPIRES.
            </h1>

            {/* Mission Proposition Copy */}
            <p className="font-display text-lg sm:text-2xl text-[#0f0f10]/80 leading-relaxed max-w-2xl mb-10 font-normal">
              Mechanical enclosures, custom PCB architectures, embedded firmware, and the cloud platforms that power them. One unified engineering team from prototype to institutional scale.
            </p>

            {/* Call to Action Suite */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="#capabilities"
                className="btn-brutal bg-[#3b82f6] hover:bg-[#2563eb] text-[#0f0f10] border-2 border-[#0f0f10] shadow-brutal-md px-7 py-4 font-mono font-bold text-sm tracking-wider uppercase flex items-center gap-3"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
                  <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 3.3L19 9v6.7L12 19.7 5 15.7V9l7-3.7zM12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
                Explore Capabilities
              </a>
              <a
                href="#archives"
                className="btn-brutal bg-white hover:bg-[#fafaf8] text-[#0f0f10] border-2 border-[#0f0f10] shadow-brutal-md px-7 py-4 font-mono font-bold text-sm tracking-wider uppercase flex items-center gap-2"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                Case Studies (08)
              </a>
            </div>
          </div>

          {/* Right Column: Hero Engineering Monolith Card */}
          <div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="lg:col-span-5 xl:col-span-4 bg-[#f0f7ff] border-2 border-[#0f0f10] shadow-brutal-lg p-6 flex flex-col justify-between relative select-none transition-transform duration-300"
          >
            {/* Spec Card Header */}
            <div className="border-b-2 border-[#0f0f10] pb-4 flex items-center justify-between">
              <span className="font-mono font-bold text-xs uppercase text-[#0f0f10] tracking-wider">
                CORE // ARCHITECTURE_NODE
              </span>
              <span className="bg-[#1d4ed8] text-[#dbeafe] font-mono font-bold text-[11px] px-2.5 py-0.5 tracking-wider uppercase shadow-[1px_1px_0px_#0f0f10]">
                ACTIVE
              </span>
            </div>

            {/* Interactive Vector Graphic Area */}
            <div className="relative my-8 flex items-center justify-center min-h-[280px]">
              {/* Background Coordinate Lines */}
              <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
                <div className="w-full h-[1px] bg-[#0f0f10]" />
                <div className="absolute h-full w-[1px] bg-[#0f0f10]" />
              </div>

              {/* Multi-layered Animated SVG Engine Structure */}
              <div className="relative size-64 flex items-center justify-center">
                {/* Outer Calibrated Reticle Ring */}
                <svg
                  className={`absolute inset-0 size-full ${isHovered ? "animate-spin" : "animate-spin-slow"}`}
                  style={{ animationDuration: isHovered ? "8s" : "24s" }}
                  viewBox="0 0 260 260"
                  fill="none"
                >
                  <circle
                    cx="130"
                    cy="130"
                    r="120"
                    stroke="#0f0f10"
                    strokeWidth="1.5"
                    strokeDasharray="4 8"
                  />
                  <circle cx="130" cy="10" r="4" fill="#3b82f6" stroke="#0f0f10" strokeWidth="1.5" />
                  <circle cx="250" cy="130" r="4" fill="#3b82f6" stroke="#0f0f10" strokeWidth="1.5" />
                  <circle cx="130" cy="250" r="4" fill="#3b82f6" stroke="#0f0f10" strokeWidth="1.5" />
                  <circle cx="10" cy="130" r="4" fill="#3b82f6" stroke="#0f0f10" strokeWidth="1.5" />
                </svg>

                {/* Inner Counter-Rotating Orbit Ring */}
                <svg
                  className="absolute inset-4 size-[228px] animate-spin-reverse"
                  viewBox="0 0 230 230"
                  fill="none"
                >
                  <circle
                    cx="115"
                    cy="115"
                    r="100"
                    stroke="#0f0f10"
                    strokeWidth="1"
                    strokeOpacity="0.4"
                  />
                  <line x1="15" y1="115" x2="215" y2="115" stroke="#0f0f10" strokeWidth="0.75" strokeDasharray="3 3" />
                  <line x1="115" y1="15" x2="115" y2="215" stroke="#0f0f10" strokeWidth="0.75" strokeDasharray="3 3" />
                </svg>

                {/* Geometric Prism Triangle with Amber Core */}
                <svg className="relative size-44" viewBox="0 0 160 160" fill="none">
                  <polygon
                    points="80,18 144,130 16,130"
                    fill="#f5c518"
                    stroke="#0f0f10"
                    strokeWidth="3.5"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="80,48 124,124 36,124"
                    fill="#ffffff"
                    stroke="#0f0f10"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <circle cx="80" cy="94" r="18" fill="#0f0f10" />
                  <circle cx="80" cy="94" r="9" fill="#3b82f6" className="animate-pulse" />
                  <circle cx="80" cy="94" r="3.5" fill="#ffffff" />
                </svg>
              </div>

              {/* Dynamic Coordinate Readout on Card Corner */}
              <div className="absolute top-0 right-0 font-mono text-[10px] text-[#0f0f10]/60 bg-white/80 border border-[#0f0f10]/40 px-1.5 py-0.5">
                X:{coords.x} Y:{coords.y}
              </div>
            </div>

            {/* Metrics Manifest */}
            <div className="border-t-2 border-[#0f0f10] pt-4 flex flex-col gap-2.5 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#0f0f10]/70">Delivery Pipeline</span>
                <span className="font-bold text-[#0f0f10]">100% In-House</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#0f0f10]/70">Vendor Handoff Gaps</span>
                <span className="font-bold text-[#dc2626] line-through">Zero Gaps</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#0f0f10]/70">Standard</span>
                <span className="bg-[#f5c518] text-[#0f0f10] font-bold px-2 py-0.5 border border-[#0f0f10] shadow-[1px_1px_0px_#0f0f10]">
                  Production Ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
