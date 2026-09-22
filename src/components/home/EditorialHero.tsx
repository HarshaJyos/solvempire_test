"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Cpu, Layers, ShieldCheck, Sparkles } from "lucide-react";

export function EditorialHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Subtle 3D mouse parallax interaction (5-15px maximum)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden flex flex-col justify-center bg-[#fafcff] bg-editorial-grid"
    >
      {/* Signature Background: Ambient Gradient Drift */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-200/40 via-sky-100/30 to-indigo-100/20 rounded-full blur-3xl pointer-events-none animate-gradient-drift" />

      {/* Signature Animation #1: Organic SolveMpire Curve SVG Path Draw */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
        >
          {/* Main Flowing Brand Path */}
          <path
            d="M -100,550 C 250,550 400,200 700,250 C 1000,300 1150,150 1550,200"
            stroke="url(#hero-blue-grad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="animate-path-draw"
          />
          {/* Parallel Harmonic Path */}
          <path
            d="M -50,600 C 300,600 450,250 750,300 C 1050,350 1200,200 1600,250"
            stroke="rgba(37, 99, 235, 0.15)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <defs>
            <linearGradient id="hero-blue-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#2563eb" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Split Text Stagger Reveal & Editorial Hierarchy */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Precision Sub-badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-200/80 text-blue-700 font-display text-xs font-semibold tracking-wide shadow-editorial-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse-dot" />
              <span>END-TO-END PRODUCT ENGINEERING STUDIO</span>
            </div>

            {/* Signature Animation #2: Split Text Stagger Reveal */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-[4.25rem] text-slate-950 tracking-tight leading-[1.08]">
              <span className="block animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
                Engineering Solutions
              </span>
              <span className="block animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150 fill-mode-both text-slate-800">
                for Problems That
              </span>
              <span className="block animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300 fill-mode-both bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600">
                Need To Be Solved.
              </span>
            </h1>

            {/* Editorial Subheading */}
            <p className="font-sans text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-normal">
              We take complex physical and digital requirements from initial mechanical CAD and custom PCB layout to embedded firmware and full-scale production manufacturing.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="group btn-editorial btn-editorial-blue px-6 py-3.5 text-sm shadow-editorial-sm"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 ml-2 arrow-slide" />
              </Link>

              <Link
                href="/work"
                className="btn-editorial btn-editorial-secondary px-6 py-3.5 text-sm"
              >
                <span>Explore Case Studies</span>
                <ArrowUpRight className="w-4 h-4 ml-1.5 text-slate-500" />
              </Link>
            </div>

            {/* Trust Badges Minimal Strip */}
            <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-display">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>In-House Prototyping</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Multi-Layer PCB Assembly</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>DFM Certified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Signature Animation #3 — 3D Parallax Float Engineering Core */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div
              className="relative w-full max-w-[460px] aspect-[4/4.2] transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateX(${mousePos.y * -8}deg) rotateY(${mousePos.x * 8}deg) translateZ(10px)`,
              }}
            >
              {/* Central Engineering Card Container */}
              <div className="w-full h-full rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/90 shadow-editorial-lg p-6 flex flex-col justify-between relative overflow-hidden group">
                {/* Background Tech Mesh */}
                <div className="absolute inset-0 bg-editorial-dots opacity-40 pointer-events-none" />

                {/* Top Terminal Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-slate-200" />
                    <span className="w-3 h-3 rounded-full bg-slate-200" />
                    <span className="w-3 h-3 rounded-full bg-slate-200" />
                    <span className="font-mono text-[11px] font-semibold text-slate-500 ml-1.5">
                      SYS://SOLVEMPIRE_CORE
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-bold">
                    ONLINE
                  </span>
                </div>

                {/* Interactive Multi-Layer Physical Graphic */}
                <div className="relative my-4 flex-1 flex items-center justify-center">
                  {/* Outer Geometric Ring */}
                  <div className="absolute w-64 h-64 rounded-full border border-blue-200/60 animate-spin-slow pointer-events-none" />
                  <div className="absolute w-48 h-48 rounded-full border border-dashed border-slate-300 pointer-events-none" />

                  {/* Core Schematic Module */}
                  <div className="relative z-10 w-44 h-44 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-800 text-white p-4 shadow-editorial-md flex flex-col justify-between border border-slate-700">
                    <div className="flex items-center justify-between">
                      <Cpu className="w-5 h-5 text-blue-400" />
                      <span className="font-mono text-[9px] text-slate-400">ESP32-S3 // 240MHz</span>
                    </div>

                    <div className="space-y-1 my-auto">
                      <div className="h-1 w-full bg-blue-500/30 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-400 w-3/4 animate-pulse" />
                      </div>
                      <div className="flex justify-between font-mono text-[9px] text-slate-400">
                        <span>FIRMWARE</span>
                        <span className="text-emerald-400">SYNCED</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between font-mono text-[9px] text-slate-300">
                      <span>4-LAYER PCB</span>
                      <span className="text-blue-400">IP67</span>
                    </div>
                  </div>

                  {/* Floating Dimension Callout Badge */}
                  <div
                    className="absolute -top-2 right-2 bg-white/95 border border-slate-200 shadow-editorial-sm px-3 py-1.5 rounded-xl text-[11px] font-mono font-semibold text-slate-700 flex items-center gap-1.5 transition-transform duration-200"
                    style={{ transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>TOL &plusmn;0.05mm</span>
                  </div>

                  {/* Floating Mechanical Callout Badge */}
                  <div
                    className="absolute -bottom-2 left-2 bg-white/95 border border-slate-200 shadow-editorial-sm px-3 py-1.5 rounded-xl text-[11px] font-mono font-semibold text-slate-700 flex items-center gap-1.5 transition-transform duration-200"
                    style={{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)` }}
                  >
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                    <span>AL6061-T6 CNC</span>
                  </div>
                </div>

                {/* Bottom Technical Telemetry Strip */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500 relative z-10">
                  <span>DISCIPLINES: 4</span>
                  <span className="text-blue-600 font-semibold">CAD &bull; PCB &bull; RTOS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
