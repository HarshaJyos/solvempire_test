"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/content/case-studies";

export function IndiseaCaseStudies() {
  const featured = caseStudies.slice(0, 4);

  return (
    <section id="work" className="py-20 sm:py-24 bg-[var(--surface-canvas)] font-sans border-b border-[var(--border-hairline)]">
      <div className="indisea-wrap space-y-12 sm:space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="indisea-eyebrow">07 / PRODUCTION DOSSIERS &amp; CASE STUDIES</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[56px] uppercase text-[var(--text-heading)] tracking-tight leading-[1.08]">
              Real-World Systems. <br />
              <span className="text-[#1F56C6]">Built, Tested &amp; Shipped.</span>
            </h2>
          </div>

          <Link
            href="/work"
            className="group inline-flex items-center gap-2 font-display text-sm font-bold text-[var(--text-heading)] hover:text-[#1F56C6] transition-colors whitespace-nowrap"
          >
            <span>View All {caseStudies.length} Case Studies</span>
            <ArrowRight className="w-4 h-4 arrow-slide" />
          </Link>
        </div>

        {/* Clean, Compact Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featured.map((study, idx) => (
            <Link
              key={study.slug}
              href={`/work/${study.slug}`}
              className="group flex flex-col space-y-4 rounded-2xl bg-[var(--surface-card)] p-4 sm:p-5 border border-[var(--border-hairline)] hover:border-slate-400/80 transition-all duration-300 shadow-2xs"
            >
              {/* Compact, Sleek Machine Photography */}
              <div className="relative aspect-[16/7.5] w-full rounded-xl bg-slate-950 overflow-hidden">
                <Image
                  src={study.hero.src}
                  alt={study.hero.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-103"
                />
              </div>

              {/* Editorial Text */}
              <div className="space-y-2.5 px-1 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                    <span>0{idx + 1} // {study.client}</span>
                    <span className="text-emerald-600 font-semibold">{study.status}</span>
                  </div>

                  <h3 className="font-display font-extrabold text-lg sm:text-xl uppercase tracking-tight text-[var(--text-heading)] group-hover:text-[#1F56C6] transition-colors leading-snug">
                    {study.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2 font-normal">
                    {study.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-wider">
                    {study.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-display font-bold text-xs text-[#1F56C6] group-hover:translate-x-1 transition-transform">
                    <span>Explore Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
