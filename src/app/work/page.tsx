import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { caseStudies } from "@/content/case-studies";
import { ArrowRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Portfolio & Case Studies | SolveMpire",
  description:
    "Explore our production-ready mechanical product designs, custom PCBs, embedded systems, automated machines, and connected IoT platforms.",
};

export default function WorkPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f0f7ff] bg-blueprint-subtle text-[#0f0f10] selection:bg-[#3b82f6]/20 selection:text-[#1d4ed8]">
      <Header />
      <main id="main-content" className="flex-1 w-full pt-12 pb-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          {/* Back Navigation */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#0f0f10]/70 hover:text-[#1d4ed8] font-bold uppercase mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>&larr; Return to Studio</span>
          </Link>

          {/* Header Banner */}
          <div className="max-w-3xl mb-16 border-b-2 border-[#0f0f10] pb-10">
            <div className="bg-[#3b82f6] border-2 border-[#0f0f10] shadow-[3px_3px_0px_#0f0f10] px-3.5 py-1 inline-flex items-center gap-2 mb-4">
              <span className="font-mono font-bold text-xs uppercase text-[#0f0f10] tracking-widest">
                [PORTFOLIO // FIELD CASE STUDIES]
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#0f0f10] uppercase leading-[0.95]">
              ENGINEERED FOR THE REAL WORLD.
            </h1>
            <p className="mt-5 text-[#0f0f10]/80 font-display text-lg sm:text-xl leading-relaxed">
              From high-density mechanical enclosures to custom electronics, firmware pipelines, and cloud telemetry — explore our shipped products and field-proven case archives.
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
            {caseStudies.map((study, idx) => (
              <article
                key={study.slug}
                className="group bg-white border-2 border-[#0f0f10] shadow-brutal-lg hover:shadow-brutal-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col overflow-hidden justify-between"
              >
                {/* System Window Header */}
                <div className="bg-[#f7f6f2] border-b-2 border-[#0f0f10] px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-[#0f0f10]" />
                    <span className="size-3 rounded-full bg-[#f5c518] border border-[#0f0f10]" />
                    <span className="size-3 rounded-full bg-[#ecebe4] border border-[#0f0f10]" />
                    <span className="font-mono font-bold text-xs text-[#0f0f10] ml-2 tracking-wide uppercase">
                      CASE // 0{idx + 1}
                    </span>
                  </div>
                  <span className="bg-[#0f0f10] text-[#f5c518] font-mono font-bold text-[11px] px-2.5 py-0.5 tracking-wider uppercase">
                    {study.status}
                  </span>
                </div>

                {/* Visual Thumbnail */}
                <div className="relative w-full aspect-[16/9] bg-[#0f0f10] overflow-hidden border-b-2 border-[#0f0f10]">
                  <Image
                    src={study.hero.src}
                    alt={study.hero.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute bottom-3 left-3 bg-white border border-[#0f0f10] shadow-[2px_2px_0px_#0f0f10] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#0f0f10] uppercase tracking-wider">
                    CLIENT: {study.client}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
                  <div className="space-y-3">
                    <span className="font-mono font-bold text-xs text-[#1d4ed8] tracking-widest uppercase block">
                      {study.category}
                    </span>

                    <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#0f0f10] leading-tight group-hover:text-[#1d4ed8] transition-colors">
                      <Link href={`/work/${study.slug}`} className="focus:outline-none">
                        {study.title}
                      </Link>
                    </h2>

                    <p className="font-display text-sm sm:text-base text-[#0f0f10]/80 leading-relaxed line-clamp-3">
                      {study.summary}
                    </p>

                    {/* Key Metrics Grid */}
                    {study.metrics && study.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 pt-3">
                        {study.metrics.slice(0, 2).map((m) => (
                          <div
                            key={m.label}
                            className="p-3 bg-[#f0f7ff] border-2 border-[#0f0f10] shadow-[2px_2px_0px_#0f0f10]"
                          >
                            <span className="block font-mono text-[10px] text-[#0f0f10]/70 font-semibold uppercase tracking-wider truncate">
                              {m.label}
                            </span>
                            <span className="font-display text-lg sm:text-xl font-bold text-[#0f0f10]">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer Tags & Action Link */}
                  <div className="pt-4 border-t-2 border-[#0f0f10]/15 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap gap-1.5 max-w-[65%]">
                      {study.disciplines.slice(0, 3).map((d) => (
                        <span
                          key={d}
                          className="px-2 py-0.5 font-mono text-[10px] font-semibold bg-[#ecebe4] text-[#0f0f10] border border-[#0f0f10]"
                        >
                          {d}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/work/${study.slug}`}
                      className="btn-brutal bg-[#0f0f10] hover:bg-[#1d4ed8] text-[#f0f7ff] border border-[#0f0f10] shadow-brutal-xs px-3.5 py-1.5 font-mono font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
                      aria-label={`Read case study for ${study.title}`}
                    >
                      <span>READ DOSSIER</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#f5c518]" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
