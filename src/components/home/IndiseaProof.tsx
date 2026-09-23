"use client";

import React from "react";

const TESTIMONIALS = [
  {
    quote: "“SolveMpire took our FreshPod machine from an early concept sketch to full turnkey CRCA sheet metal fabrication, custom relay PCB, and FreeRTOS control in record time.”",
    role: "Co-Founder & COO",
    company: "FreshPod Technologies",
    hoverBorder: "hover:border-[#0EA5E9]",
  },
  {
    quote: "“Having mechanical CAD, circuit design, and low-level firmware in one synchronized team eliminated all the vendor finger-pointing we struggled with previously.”",
    role: "VP of Product Engineering",
    company: "Connected Mobility Systems",
    hoverBorder: "hover:border-[#FACC15]",
  },
  {
    quote: "“Their DFM and GD&T precision saved us tens of thousands in tooling rework. They build real-world physical machines that actually hold up in the field.”",
    role: "Director of Operations",
    company: "Industrial R&D Lab",
    hoverBorder: "hover:border-[#22C55E]",
  },
];

export function IndiseaProof() {
  return (
    <section className="py-24 sm:py-32 bg-[var(--surface-card)] font-sans border-y border-[var(--border-hairline)]">
      <div className="indisea-wrap space-y-16">
        <div>
          <span className="indisea-eyebrow">11 / VERIFIED CLIENT TESTIMONIALS &amp; PROOF</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[56px] uppercase text-[var(--text-heading)] tracking-tight leading-[1.08] mt-4">
            What our engineering <br />
            partners are saying.
          </h2>
        </div>


        <div className="space-y-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className={`p-8 sm:p-12 lg:p-14 rounded-3xl bg-[var(--surface-canvas)] border border-[var(--border-hairline)] ${t.hoverBorder} transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end shadow-2xs group`}
            >
              <blockquote className="lg:col-span-9 font-display font-bold text-xl sm:text-2xl lg:text-3xl text-[var(--text-heading)] leading-snug">
                {t.quote}
              </blockquote>

              <div className="lg:col-span-3 space-y-1 lg:text-right">
                <span className="font-display font-bold text-sm text-[var(--text-heading)] block">
                  {t.role}
                </span>
                <span className="font-mono text-xs text-[var(--text-muted)] block uppercase">
                  {t.company}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
