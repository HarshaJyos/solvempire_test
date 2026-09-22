"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowDown } from "lucide-react";

export function IndiseaHero() {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-end pt-36 pb-12 sm:pb-16 overflow-hidden font-sans">
      <div className="indisea-wrap relative z-10 space-y-8 sm:space-y-12">
        {/* Eyebrow Label */}
        <div>
          <span className="indisea-eyebrow">01 / hero</span>
        </div>

        {/* Massive Indisea-Style Display Headline with Verb Badges */}
        <div className="max-w-6xl">
          <h1 className="font-display font-extrabold text-[44px] sm:text-[76px] lg:text-[110px] xl:text-[132px] tracking-tight leading-[0.93] text-[var(--text-heading)]">
            <span className="block">
              We <span className="indisea-verb-yellow">design</span>,{" "}
              <span className="indisea-verb-blue">engineer</span>,
            </span>
            <span className="block">
              and <span className="indisea-verb-green">manufacture</span>
            </span>
            <span className="block text-slate-900">physical machines</span>
            <span className="block text-[#2563EB]">&amp; connected hardware</span>
          </h1>
        </div>

        {/* Bottom Split: Action CTAs + Scroll Cue */}
        <div className="pt-6 sm:pt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-[var(--border-hairline)]">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="group btn-indisea-primary flex items-center gap-2 text-sm sm:text-base px-7 py-3.5"
            >
              <span>Talk to us</span>
              <ArrowRight className="w-4 h-4 arrow-slide" />
            </Link>

            <Link
              href="/work"
              className="px-6 py-3.5 rounded-full border border-[var(--border-strong)] text-xs sm:text-sm font-display font-bold text-[var(--text-heading)] hover:bg-[var(--surface-card)] transition-colors"
            >
              <span>Explore Deployed Systems &rarr;</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 text-[var(--text-muted)] font-mono text-xs font-semibold uppercase tracking-wider">
            <a
              href="#live-wall"
              className="inline-flex items-center gap-2 hover:text-[var(--text-heading)] transition-colors"
            >
              <ArrowDown className="w-4 h-4 animate-bounce-subtle" />
              <span>Scroll to Explore</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
