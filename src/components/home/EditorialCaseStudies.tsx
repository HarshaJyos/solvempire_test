"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Cpu, Layers, ShieldCheck, Box } from "lucide-react";
import { caseStudies } from "@/content/case-studies";

export function EditorialCaseStudies() {
  const featured = caseStudies.slice(0, 4);

  return (
    <section id="work" className="py-24 sm:py-32 bg-white border-b border-slate-200/80 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 font-display text-xs font-semibold tracking-wide">
              <Box className="w-3.5 h-3.5" />
              <span>PROVEN PRODUCTION DEPLOYMENTS</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-950 tracking-tight leading-[1.12]">
              Featured Engineering Work. <br />
              <span className="text-blue-600">Built, Tested &amp; Deployed in the Real World.</span>
            </h2>
          </div>

          <Link
            href="/work"
            className="group inline-flex items-center gap-2 font-display text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap"
          >
            <span>View All 6 Case Studies</span>
            <ArrowRight className="w-4 h-4 arrow-slide" />
          </Link>
        </div>

        {/* 2x2 Modular Case Study Grid with Blueprint Overlay on Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {featured.map((study) => (
            <article
              key={study.slug}
              className="group relative rounded-3xl bg-slate-50/70 border border-slate-200/90 overflow-hidden hover:bg-white hover:border-slate-300 shadow-editorial-sm hover:shadow-editorial-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Showcase Container with Technical Blueprint Overlay */}
              <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden border-b border-slate-200/80">
                <Image
                  src={study.hero.src}
                  alt={study.hero.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                {/* Technical Blueprint Overlay (Reveals on Hover) */}
                <div className="absolute inset-0 bg-blue-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 pointer-events-none font-mono text-white text-xs">
                  {/* Top Overlay Markers */}
                  <div className="flex justify-between items-center text-[10px] text-blue-300">
                    <span>SPEC://{study.slug.toUpperCase()}</span>
                    <span>TOL &plusmn;0.05mm</span>
                  </div>

                  {/* Dimension lines & Blueprint crosshairs */}
                  <div className="flex items-center justify-center gap-4 text-center">
                    <div className="border border-blue-400/50 px-3 py-1.5 rounded-lg bg-blue-900/50 backdrop-blur-xs">
                      <span className="text-[10px] text-blue-200 block">STATUS</span>
                      <span className="font-bold text-white uppercase">{study.status}</span>
                    </div>
                  </div>

                  {/* Bottom Blueprint Pinout Markers */}
                  <div className="flex justify-between items-center text-[10px] text-blue-300">
                    <span>CLIENT: {study.client.toUpperCase()}</span>
                    <span>CAD VERIFIED &bull; DFM</span>
                  </div>
                </div>

                {/* Permanent Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/60 font-mono text-[11px] font-bold text-slate-800 uppercase shadow-xs">
                    {study.category}
                  </span>
                </div>
              </div>

              {/* Text Dossier Content */}
              <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 group-hover:text-blue-600 transition-colors">
                    <Link href={`/work/${study.slug}`} className="focus:outline-none">
                      <span className="absolute inset-0" />
                      {study.title}
                    </Link>
                  </h3>
                  <p className="font-sans text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">
                    {study.summary}
                  </p>
                </div>

                {/* Technical Metric Strips */}
                {study.metrics && study.metrics.length > 0 && (
                  <div className="pt-3 grid grid-cols-2 gap-2 font-mono text-xs border-t border-slate-100">
                    {study.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block truncate">
                          {m.label}
                        </span>
                        <span className="font-display font-bold text-slate-900 text-sm">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Link Footer */}
                <div className="pt-2 flex items-center justify-between text-xs font-display">
                  <div className="flex flex-wrap gap-1.5">
                    {study.disciplines.slice(0, 2).map((d) => (
                      <span key={d} className="px-2 py-0.5 rounded-md bg-slate-200/60 text-slate-700 text-[10px] font-mono">
                        {d}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 font-bold text-blue-600 group-hover:text-blue-700">
                    <span>Read Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5 arrow-slide" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
