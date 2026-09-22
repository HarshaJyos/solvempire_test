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

          {/* Case Studies Grid (Indisea Card Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {caseStudies.map((study) => (
              <article
                key={study.slug}
                className="group relative rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] hover:border-slate-400 overflow-hidden shadow-sm transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden border-b border-[var(--border-hairline)]">
                  <Image
                    src={study.hero.src}
                    alt={study.hero.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-95 group-hover:opacity-100"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-[var(--surface-card)]/90 backdrop-blur-md border border-[var(--border-hairline)] font-mono text-[10px] font-bold text-[var(--text-heading)] uppercase shadow-xs">
                      {study.category}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-white font-mono text-[10px] font-bold uppercase shadow-xs">
                      {study.status}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
                  <div className="space-y-3">
                    <span className="indisea-eyebrow block">
                      CLIENT: {study.client.toUpperCase()}
                    </span>

                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-heading)] leading-tight group-hover:text-[#2563EB] transition-colors">
                      <Link href={`/work/${study.slug}`} className="focus:outline-none">
                        <span className="absolute inset-0" />
                        {study.title}
                      </Link>
                    </h2>

                    <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed line-clamp-3 font-normal">
                      {study.summary}
                    </p>

                    {/* Key Metrics */}
                    {study.metrics && study.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[var(--border-hairline)]">
                        {study.metrics.slice(0, 2).map((m) => (
                          <div
                            key={m.label}
                            className="p-3 bg-[var(--surface-canvas)] rounded-xl border border-[var(--border-hairline)]"
                          >
                            <span className="block font-mono text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-wide truncate">
                              {m.label}
                            </span>
                            <span className="font-display text-base font-bold text-[var(--text-heading)] mt-0.5 block">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer Tags & Action Link */}
                  <div className="pt-4 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {study.disciplines.slice(0, 3).map((d) => (
                        <span
                          key={d}
                          className="px-2.5 py-1 rounded-lg font-mono text-[10px] font-medium bg-[var(--surface-canvas)] text-[var(--text-muted)]"
                        >
                          {d}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 font-display font-bold text-xs text-[#2563EB] group-hover:translate-x-1 transition-transform">
                      <span>Read Dossier</span>
                      <ArrowUpRight className="w-4 h-4" />
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
