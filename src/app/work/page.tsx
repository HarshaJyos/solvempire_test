import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { IndiseaHeader } from "@/components/site/IndiseaHeader";
import { IndiseaFooter } from "@/components/site/IndiseaFooter";
import { caseStudies } from "@/content/case-studies";
import { ArrowRight, ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies & Production Archives | SolveMpire",
  description:
    "Explore our production-ready mechanical product designs, custom PCBs, embedded systems, automated machines, and connected IoT platforms.",
};

export default function WorkPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--surface-canvas)] text-[var(--text-body)] selection:bg-[#FACC15] selection:text-[#181A1D] font-sans">
      <IndiseaHeader />
      <main id="main-content" className="flex-1 w-full pt-36 pb-28">
        <div className="indisea-wrap space-y-16">
          {/* Header Banner */}
          <div className="max-w-4xl space-y-6">
            <span className="indisea-eyebrow">01 / case studies directory</span>
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl text-[var(--text-heading)] tracking-tight leading-[1.05]">
              Real-World Systems. <br />
              <span className="text-[#2563EB]">Built, Tested &amp; Shipped.</span>
            </h1>
            <p className="font-sans text-base sm:text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed font-normal">
              From high-density mechanical enclosures to custom multi-layer electronics, deterministic firmware, and cloud telemetry — explore our field-proven case archives.
            </p>
          </div>

          {/* Case Studies Grid (Indisea Card Style - Compact) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {caseStudies.map((study, idx) => (
              <article
                key={study.slug}
                className="group relative rounded-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] hover:border-slate-400 overflow-hidden shadow-2xs transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/7.5] w-full bg-slate-900 overflow-hidden border-b border-[var(--border-hairline)]">
                  <Image
                    src={study.hero.src}
                    alt={study.hero.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-103 opacity-95 group-hover:opacity-100"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-0.5 rounded-full bg-[var(--surface-card)]/90 backdrop-blur-md border border-[var(--border-hairline)] font-mono text-[10px] font-bold text-[var(--text-heading)] uppercase shadow-2xs">
                      {study.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 z-10">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/90 text-white font-mono text-[10px] font-bold uppercase shadow-2xs">
                      {study.status}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                      <span>0{idx + 1} // {study.client}</span>
                    </div>

                    <h2 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--text-heading)] leading-snug group-hover:text-[#2563EB] transition-colors">
                      <Link href={`/work/${study.slug}`} className="focus:outline-none">
                        <span className="absolute inset-0" />
                        {study.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2 font-normal">
                      {study.summary}
                    </p>

                    {/* Key Metrics */}
                    {study.metrics && study.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--border-hairline)]">
                        {study.metrics.slice(0, 2).map((m) => (
                          <div
                            key={m.label}
                            className="p-2.5 bg-[var(--surface-canvas)] rounded-lg border border-[var(--border-hairline)]"
                          >
                            <span className="block font-mono text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-wide truncate">
                              {m.label}
                            </span>
                            <span className="font-display text-sm font-bold text-[var(--text-heading)] mt-0.5 block truncate">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer Tags & Action Link */}
                  <div className="pt-3 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex flex-wrap gap-1">
                      {study.disciplines.slice(0, 3).map((d) => (
                        <span
                          key={d}
                          className="px-2 py-0.5 rounded font-mono text-[10px] font-medium bg-[var(--surface-canvas)] text-[var(--text-muted)]"
                        >
                          {d}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 font-display font-bold text-xs text-[#2563EB] group-hover:translate-x-1 transition-transform">
                      <span>Read Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <IndiseaFooter />
    </div>
  );
}
