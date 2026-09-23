"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus, ArrowRight, ShieldCheck, Cpu, Layers } from "lucide-react";
import { FAQS } from "@/content/faqs";

export function IndiseaFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[var(--surface-canvas)] font-sans border-b border-[var(--border-hairline)]">
      <div className="indisea-wrap space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="indisea-eyebrow">12 / FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[56px] uppercase text-[var(--text-heading)] tracking-tight leading-[1.08]">
              Engineering Answers. <br />
              <span className="text-[#1F56C6]">Clear, Transparent &amp; Direct.</span>
            </h2>
          </div>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 font-display text-sm font-bold text-[var(--text-heading)] hover:text-[#1F56C6] transition-colors whitespace-nowrap"
          >
            <span>Have a custom question? Contact Us</span>
            <ArrowRight className="w-4 h-4 arrow-slide" />
          </Link>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[var(--surface-card)] border-[#1F56C6]/40 shadow-sm"
                    : "bg-[var(--surface-card)] border-[var(--border-hairline)] hover:border-slate-400/60"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-6 sm:p-8 flex items-start justify-between gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1.5 pr-2">
                    {faq.category && (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#1F56C6] font-bold block">
                        // {faq.category}
                      </span>
                    )}
                    <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--text-heading)] leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? "bg-[#1F56C6] border-[#1F56C6] text-white rotate-180"
                        : "bg-[var(--surface-canvas)] border-[var(--border-hairline)] text-[var(--text-heading)]"
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 border-t border-[var(--border-hairline)]/50 mt-2">
                    <p className="font-sans text-sm sm:text-base text-[var(--text-body)] leading-relaxed pt-4 font-normal">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Assurance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 font-display font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>100% IP Assignment</span>
            </div>
            <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed">
              Complete CAD, KiCad PCB files, and firmware source code transfer upon project completion.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] space-y-2">
            <div className="flex items-center gap-2 text-[#1F56C6] font-display font-bold text-sm">
              <Cpu className="w-4 h-4" />
              <span>DFM-First Engineering</span>
            </div>
            <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed">
              Designed for CNC, injection molding, SMT lines, and automated test fixtures from day one.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] space-y-2">
            <div className="flex items-center gap-2 text-amber-600 font-display font-bold text-sm">
              <Layers className="w-4 h-4" />
              <span>Multi-Year SLAs</span>
            </div>
            <p className="font-sans text-xs text-[var(--text-muted)] leading-relaxed">
              4 to 10 year engineering support agreements covering OTA firmware, telemetry, and hardware revisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
