"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  caseStudyTitle: string;
  caseStudyHref: string;
  tag: string;
  hoverBorder: string;
  accentColor: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "“Hanish and the SolveMpire team did a great job with the compact sensor housing design. Fitting the board and seals into an 18 mm threaded cylindrical profile was tight, but the 3D printed prototypes fit cleanly on the first try and let us move straight into sample builds. Fast turnaround and great communication whenever we needed format or tolerance adjustments.”",
    author: "Daocai (DC)",
    role: "Lead Hardware Client // DC101",
    company: "USS2 Switcher Automotive Sensor Project",
    caseStudyTitle: "USS2 Switcher M18 Sensor Housing",
    caseStudyHref: "/work/uss2-switcher",
    tag: "Automotive Mechanical CAD & 3D Prototyping",
    hoverBorder: "hover:border-[#0EA5E9]",
    accentColor: "text-[#0EA5E9]",
  },
  {
    quote:
      "“Working with SolveMpire made our hardware journey much smoother. They handled the stainless-steel enclosure design, custom control board, and the touchscreen payment interface end-to-end. Having a single engineering team manage the mechanical, electronics, and firmware meant fewer headaches for us, and our machines have been running reliably in the field.”",
    author: "Founder & CEO",
    role: "Executive Leadership",
    company: "FreshPod India",
    caseStudyTitle: "FreshPod Commercial Sanitization Fleet",
    caseStudyHref: "/work/freshpod-machine",
    tag: "Commercial Fleet Deployed Across India & Global Markets",
    hoverBorder: "hover:border-[#FACC15]",
    accentColor: "text-[#D97706]",
  },
  {
    quote:
      "“SolveMpire helped us solve the hardest part of our smart vending machine: designing a modular 42-compartment layout and reliable custom PCBAs. Their multi-layer board design with daisy-chained CAN door controllers kept our internal wiring clean and eliminated mechanical dispensing jams. Really solid engineering execution.”",
    author: "Hardware & Operations Lead",
    role: "Lead Systems Architect",
    company: "Dadspire Solutions (AEEGZ Smart Vending)",
    caseStudyTitle: "AEEGZ 42-Door Smart Vending PCBAs",
    caseStudyHref: "/work/aeegz",
    tag: "Modular Smart Vending Architecture & PCB Design",
    hoverBorder: "hover:border-[#22C55E]",
    accentColor: "text-[#16A34A]",
  },
];

export function IndiseaProof() {
  return (
    <section className="py-24 sm:py-32 bg-[var(--surface-card)] font-sans border-y border-[var(--border-hairline)]">
      <div className="indisea-wrap space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="indisea-eyebrow">11 / VERIFIED CLIENT TESTIMONIALS &amp; REAL DELIVERIES</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[56px] uppercase text-[var(--text-heading)] tracking-tight leading-[1.08] mt-4">
              Real deliveries. <br />
              <span className="text-[#1F56C6]">Direct from the founders &amp; leads.</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] bg-[var(--surface-canvas)] px-3.5 py-2 rounded-full border border-[var(--border-hairline)] self-start md:self-end">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>100% AUTHENTIC CLIENT FEEDBACK</span>
          </div>
        </div>

        <div className="space-y-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className={`p-8 sm:p-12 lg:p-14 rounded-3xl bg-[var(--surface-canvas)] border border-[var(--border-hairline)] ${t.hoverBorder} transition-all duration-300 flex flex-col justify-between gap-8 shadow-2xs group`}
            >
              {/* Header Tag + Case Study Link */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4">
                <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
                  // {t.tag}
                </span>

                <Link
                  href={t.caseStudyHref}
                  className="inline-flex items-center gap-1 text-xs font-display font-bold text-[#1F56C6] hover:underline uppercase tracking-wide"
                >
                  <span>View Case Study: {t.caseStudyTitle}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Main Quote */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                <blockquote className="lg:col-span-9 font-display font-bold text-xl sm:text-2xl lg:text-3xl text-[var(--text-heading)] leading-snug">
                  {t.quote}
                </blockquote>

                <div className="lg:col-span-3 space-y-1.5 lg:text-right pt-4 lg:pt-0 border-t lg:border-t-0 border-[var(--border-hairline)]">
                  <span className="font-display font-extrabold text-base text-[var(--text-heading)] block">
                    {t.author}
                  </span>
                  <span className="font-sans text-xs text-[var(--text-muted)] block font-medium">
                    {t.role}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--text-muted)] block uppercase">
                    {t.company}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
