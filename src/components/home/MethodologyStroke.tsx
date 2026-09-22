"use client";

import { useState } from "react";

export function MethodologyStroke() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    { title: "CAD & MECHANICAL", desc: "Stainless CNC & Enclosure Design", color: "#ffffff" },
    { title: "PCB ELECTRONICS", desc: "Custom Circuitry & Sensor PCBA", color: "#ffffff" },
    { title: "EMBEDDED FIRMWARE", desc: "Deterministic C/C++ Control", color: "#3b82f6", textColor: "#f0f7ff" },
    { title: "CLOUD & FLEET IOT", desc: "Real-time Telemetry & HMI", color: "#ffffff" },
  ];

  return (
    <section id="methodology" className="w-full bg-white border-b-2 border-[#0f0f10] py-20 sm:py-28 relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Methodology Narrative */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="bg-[#3b82f6] border-2 border-[#0f0f10] shadow-[3px_3px_0px_#0f0f10] px-3.5 py-1.5 self-start">
              <span className="font-mono font-bold text-xs uppercase text-[#0f0f10] tracking-widest">
                The Unified Studio Advantage
              </span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-[46px] uppercase tracking-tight text-[#0f0f10] leading-tight">
              WHY SILOED VENDOR HANDOFFS FAIL
            </h2>

            <div className="flex flex-col gap-4 font-display text-base text-[#0f0f10]/80 leading-relaxed">
              <p>
                <strong className="text-[#0f0f10]">The Silo Trap:</strong> When mechanical engineers, electronics designers, firmware coders, and web developers operate at separate agencies, integration failures multiply at assembly time, spawning expensive prototype re-spins and launch delays.
              </p>
              <p>
                <strong className="text-[#0f0f10]">The Solvempire Standard:</strong> We execute mechanical modeling, PCB layout, embedded firmware, and cloud telemetry concurrently in one room. Zero handoff friction. Rapid iteration.
              </p>
            </div>

            {/* Comparison Metrics Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {/* Old Siloed Box */}
              <div className="bg-[#f7f6f2] border-2 border-[#0f0f10] p-5 flex flex-col gap-2">
                <span className="font-mono font-bold text-xs text-[#dc2626] tracking-wider uppercase">
                  [FRAGMENTED VENDORS]
                </span>
                <div className="flex flex-col gap-1.5 font-mono text-xs text-[#0f0f10]/70">
                  <p>✕ 4+ Disconnected Agencies</p>
                  <p>✕ 3–6 Month Handoff Delays</p>
                  <p>✕ Finger-pointing on Bugs</p>
                </div>
              </div>

              {/* Solvempire Box */}
              <div className="bg-[#3b82f6] border-2 border-[#0f0f10] shadow-brutal-sm p-5 flex flex-col gap-2">
                <span className="font-mono font-bold text-xs text-[#0f0f10] tracking-wider uppercase">
                  [SOLVEMPIRE UNIFIED]
                </span>
                <div className="flex flex-col gap-1.5 font-mono font-semibold text-xs text-[#0f0f10]">
                  <p>✓ 100% In-House Accountability</p>
                  <p>✓ Concurrent CAD + PCB + Code</p>
                  <p>✓ Production Field-Ready</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Blueprint Schematic Flow Canvas */}
          <div className="lg:col-span-6 bg-[#f0f7ff] border-2 border-[#0f0f10] shadow-brutal-lg p-6 sm:p-8 flex flex-col justify-between relative">
            {/* Top Schematic Header */}
            <div className="border-b-2 border-[#0f0f10] pb-3 flex items-center justify-between">
              <span className="font-mono font-bold text-xs uppercase text-[#0f0f10] tracking-wider">
                SCHEMATIC // FULL_STACK_FLOW
              </span>
              <span className="font-mono text-xs text-[#0f0f10]/60">ISO_9001_COMPLIANT</span>
            </div>

            {/* Interactive Vector Pipeline Diagram */}
            <div className="my-8 relative min-h-[320px] flex items-center justify-center">
              <svg className="w-full h-72" viewBox="0 0 460 260" fill="none">
                {/* Connector Lines between Steps */}
                <path
                  d="M110,60 L230,60 L230,190 L350,190"
                  stroke="#0f0f10"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="animate-dash-flow"
                />

                {/* Node 1: CAD */}
                <g className="cursor-pointer" onClick={() => setActiveStep(0)}>
                  <rect
                    x="20"
                    y="30"
                    width="110"
                    height="60"
                    fill="#ffffff"
                    stroke="#0f0f10"
                    strokeWidth="2"
                    className="shadow-sm"
                  />
                  <text x="75" y="55" textAnchor="middle" fill="#0f0f10" className="font-mono text-[11px] font-bold">
                    CAD MODEL
                  </text>
                  <text x="75" y="72" textAnchor="middle" fill="#0f0f10" opacity="0.7" className="font-mono text-[9px]">
                    CNC Enclosures
                  </text>
                </g>

                {/* Node 2: PCBA */}
                <g className="cursor-pointer" onClick={() => setActiveStep(1)}>
                  <rect
                    x="180"
                    y="30"
                    width="110"
                    height="60"
                    fill="#ffffff"
                    stroke="#0f0f10"
                    strokeWidth="2"
                  />
                  <text x="235" y="55" textAnchor="middle" fill="#0f0f10" className="font-mono text-[11px] font-bold">
                    CUSTOM PCB
                  </text>
                  <text x="235" y="72" textAnchor="middle" fill="#0f0f10" opacity="0.7" className="font-mono text-[9px]">
                    Circuits &amp; Sensors
                  </text>
                </g>

                {/* Node 3: Firmware */}
                <g className="cursor-pointer" onClick={() => setActiveStep(2)}>
                  <rect
                    x="180"
                    y="160"
                    width="110"
                    height="60"
                    fill="#3b82f6"
                    stroke="#0f0f10"
                    strokeWidth="2"
                  />
                  <text x="235" y="185" textAnchor="middle" fill="#0f0f10" className="font-mono text-[11px] font-bold">
                    EMBEDDED C++
                  </text>
                  <text x="235" y="202" textAnchor="middle" fill="#0f0f10" opacity="0.9" className="font-mono text-[9px]">
                    Deterministic Core
                  </text>
                </g>

                {/* Node 4: Cloud */}
                <g className="cursor-pointer" onClick={() => setActiveStep(3)}>
                  <rect
                    x="335"
                    y="160"
                    width="110"
                    height="60"
                    fill="#ffffff"
                    stroke="#0f0f10"
                    strokeWidth="2"
                  />
                  <text x="390" y="185" textAnchor="middle" fill="#0f0f10" className="font-mono text-[11px] font-bold">
                    CLOUD &amp; HMI
                  </text>
                  <text x="390" y="202" textAnchor="middle" fill="#0f0f10" opacity="0.7" className="font-mono text-[9px]">
                    Fleet Scale
                  </text>
                </g>

                {/* Pulse Signal Node */}
                <circle cx="230" cy="115" r="8" fill="#f5c518" stroke="#0f0f10" strokeWidth="2" className="animate-pulse" />
              </svg>
            </div>

            {/* Bottom Status */}
            <div className="border-t border-[#0f0f10]/20 pt-3 flex items-center justify-between font-mono text-[11px] text-[#0f0f10]/70">
              <span>PIPELINE: INTEGRATED CAD-TO-CLOUD</span>
              <span className="font-bold text-[#1d4ed8]">STATUS: 100% IN-HOUSE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
