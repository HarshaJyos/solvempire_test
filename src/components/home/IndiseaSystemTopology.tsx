"use client";

import React from "react";
import Image from "next/image";
import { Monitor, Cpu, Box, HardDrive, Wifi, Sparkles, ShieldCheck } from "lucide-react";

export function IndiseaSystemTopology() {
  return (
    <section className="py-24 sm:py-32 bg-[var(--surface-canvas)] font-sans overflow-hidden">
      <div className="indisea-wrap space-y-16">
        {/* Eyebrow */}
        <div>
          <span className="indisea-eyebrow">05 / what changes</span>
        </div>

        {/* 12-Column Grid */}
        <div className="indisea-grid items-center gap-12 lg:gap-16">
          {/* Left Column: Editorial Explanation */}
          <div className="col-span-12 lg:col-span-6 space-y-8">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[var(--text-heading)] leading-[1.05] tracking-tight">
              We sit between your real-world problem and every physical system required to solve it.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
              <p>
                Taking an automated machine or connected hardware product to market requires synchronized mechanical kinematics, robust power electronics, low-level firmware, and cloud telemetry.
              </p>
              <p>
                We build that entire layer, validate it in our prototyping lab, and support it in the field so your core team stays focused on business growth.
              </p>
            </div>

            {/* 3 Pill Badges */}
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-card)] border border-[var(--border-hairline)] text-sm font-display font-semibold text-[var(--text-heading)] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[var(--indisea-sky-blue)]" />
                <span>Domain Expertise</span>
              </span>

              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-card)] border border-[var(--border-hairline)] text-sm font-display font-semibold text-[var(--text-heading)] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[var(--indisea-signal-yellow)]" />
                <span>Operational Maturity</span>
              </span>

              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface-card)] border border-[var(--border-hairline)] text-sm font-display font-semibold text-[var(--text-heading)] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[var(--indisea-link-green)]" />
                <span>Unified In-House Model</span>
              </span>
            </div>
          </div>

          {/* Right Column: High-Precision System Topology Architecture Card */}
          <div className="col-span-12 lg:col-span-6">
            <div className="p-6 sm:p-10 rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-sm relative overflow-hidden">
              {/* SVG Connecting Traces */}
              <svg
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-300"
                strokeWidth="2"
                strokeDasharray="4 4"
                fill="none"
              >
                {/* Horizontal line from source to hub */}
                <line x1="18%" y1="50%" x2="48%" y2="50%" />
                {/* Lines from hub to 4 target nodes */}
                <line x1="52%" y1="50%" x2="82%" y2="18%" />
                <line x1="52%" y1="50%" x2="82%" y2="39%" />
                <line x1="52%" y1="50%" x2="82%" y2="61%" />
                <line x1="52%" y1="50%" x2="82%" y2="82%" />
              </svg>

              <div className="relative z-10 grid grid-cols-12 gap-2 sm:gap-4 items-center">
                {/* Left Source Node: Your Problem */}
                <div className="col-span-3 flex flex-col items-center text-center space-y-2">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-4 border-[var(--text-heading)] bg-[var(--surface-card)] flex items-center justify-center text-[var(--text-heading)] shadow-xs">
                    <Monitor className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                    Your Problem
                  </span>
                </div>

                {/* Center Hub Node: SolveMpire Core */}
                <div className="col-span-4 flex flex-col items-center text-center space-y-2">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#2563EB] bg-[#2563EB] text-white flex items-center justify-center shadow-md">
                    <span className="font-display font-extrabold text-xs sm:text-sm tracking-tight text-center leading-tight">
                      SOLVE<br />MPIRE
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#2563EB] uppercase tracking-wider">
                    Engineering Hub
                  </span>
                </div>

                {/* Right Target Nodes: 4 Disciplines */}
                <div className="col-span-5 flex flex-col gap-3 sm:gap-4 py-2">
                  {/* Node 1: Mechanical CAD */}
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[var(--surface-canvas)] border border-blue-200">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                      <Box className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-display font-bold text-xs text-[var(--text-heading)] block truncate">
                        Mechanical CAD
                      </span>
                      <span className="font-mono text-[9px] text-[var(--text-muted)] block">
                        DFM &bull; SolidWorks
                      </span>
                    </div>
                  </div>

                  {/* Node 2: Custom PCB */}
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[var(--surface-canvas)] border border-emerald-200">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-display font-bold text-xs text-[var(--text-heading)] block truncate">
                        Custom PCB
                      </span>
                      <span className="font-mono text-[9px] text-[var(--text-muted)] block">
                        Multilayer &bull; SMT
                      </span>
                    </div>
                  </div>

                  {/* Node 3: Embedded RTOS */}
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[var(--surface-canvas)] border border-amber-200">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <HardDrive className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-display font-bold text-xs text-[var(--text-heading)] block truncate">
                        RTOS Firmware
                      </span>
                      <span className="font-mono text-[9px] text-[var(--text-muted)] block">
                        C/C++ &bull; FreeRTOS
                      </span>
                    </div>
                  </div>

                  {/* Node 4: Cloud & HMI */}
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[var(--surface-canvas)] border border-red-200">
                    <div className="w-7 h-7 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                      <Wifi className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-display font-bold text-xs text-[var(--text-heading)] block truncate">
                        Cloud &amp; Payments
                      </span>
                      <span className="font-mono text-[9px] text-[var(--text-muted)] block">
                        MQTT &bull; Touch HMI
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
