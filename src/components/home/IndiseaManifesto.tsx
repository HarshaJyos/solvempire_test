"use client";

import React from "react";

export function IndiseaManifesto() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[92vh] flex flex-col justify-center py-24 sm:py-32 bg-[var(--surface-card)] text-[var(--text-heading)] font-sans border-y border-[var(--border-hairline)] overflow-hidden">
      <div className="indisea-wrap space-y-12 sm:space-y-16">
        {/* Eyebrow */}
        <div>
          <span className="indisea-eyebrow">04 / the problem</span>
        </div>

        {/* Giant Headline */}
        <div className="max-w-6xl">
          <h2 className="font-display font-extrabold text-[40px] sm:text-[70px] lg:text-[100px] xl:text-[116px] tracking-tight leading-[0.94]">
            <span className="block">Hardware</span>
            <span className="block">shouldn&apos;t be your</span>
            <span className="block text-[#2563EB]">engineering bottleneck.</span>
          </h2>
        </div>

        {/* Fine Detail Split */}
        <div className="indisea-grid pt-6 border-t border-[var(--border-hairline)]">
          <div className="col-span-12 lg:col-span-6 space-y-4">
            <span className="block w-16 h-1 rounded-full bg-[var(--indisea-signal-yellow)]" />
            <p className="font-sans text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
              Physical product development fails when mechanical CAD, circuit board fabrication, and embedded firmware are fractured across disconnected vendors.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-6 space-y-4">
            <p className="font-sans text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
              SolveMpire provides a unified engineering bench. We engineer custom sheet metal chassis, spin multi-layer PCBs, flash deterministic FreeRTOS firmware, and deploy connected IoT dashboards under one synchronized roof.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
