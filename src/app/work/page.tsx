import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { caseStudies } from "@/content/case-studies";
import { ArrowRight, ArrowLeft, Box } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Portfolio & Case Studies | SolveMpire",
  description:
    "Explore our production-ready mechanical product designs, custom PCBs, embedded systems, automated machines, and connected IoT platforms.",
};

export default function WorkPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafcff] bg-editorial-grid text-[#0f172a] selection:bg-[#2563eb]/15 selection:text-[#1d4ed8] font-sans">
      <Header />
      <main id="main-content" className="flex-1 w-full pt-28 sm:pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display text-xs text-slate-500 hover:text-blue-600 font-bold uppercase mb-8 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>&larr; Return to Overview</span>
          </Link>

          {/* Header Banner */}
          <div className="max-w-3xl mb-16 border-b border-slate-200 pb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 font-display text-xs font-semibold tracking-wide">
              <Box className="w-3.5 h-3.5" />
              <span>PRODUCTION PORTFOLIO &amp; ARCHIVES</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.08]">
              Engineered for the Real World. <br />
              <span className="text-blue-600">Case Studies &amp; Shipped Systems.</span>
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              From high-density mechanical enclosures to custom multi-layer electronics, firmware pipelines, and cloud telemetry — explore our field-proven case archives.
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {caseStudies.map((study) => (
              <article
                key={study.slug}
                className="group relative rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-editorial-sm hover:shadow-editorial-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Visual Thumbnail with Blueprint Overlay */}
                <div className="relative aspect-[16/10] w-full bg-slate-950 overflow-hidden border-b border-slate-200/80">
                  <Image
                    src={study.hero.src}
                    alt={study.hero.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-95 group-hover:opacity-100"
                  />

                  {/* Blueprint Overlay on Hover */}
                  <div className="absolute inset-0 bg-blue-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 pointer-events-none font-mono text-white text-xs">
                    <div className="flex justify-between items-center text-[10px] text-blue-300">
                      <span>SPEC://{study.slug.toUpperCase()}</span>
                      <span>TOL &plusmn;0.05mm</span>
                    </div>
                    <div className="text-center">
                      <span className="inline-block px-3 py-1 rounded-lg bg-blue-900/60 border border-blue-400/40 text-white font-bold text-xs">
                        STATUS: {study.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-blue-300">
                      <span>CLIENT: {study.client.toUpperCase()}</span>
                      <span>DFM VERIFIED</span>
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/60 font-mono text-[11px] font-bold text-slate-800 uppercase shadow-xs">
                      {study.category}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
                  <div className="space-y-3">
                    <span className="font-mono text-xs font-semibold text-blue-700 uppercase tracking-wider block">
                      Client: {study.client}
                    </span>

                    <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                      <Link href={`/work/${study.slug}`} className="focus:outline-none">
                        <span className="absolute inset-0" />
                        {study.title}
                      </Link>
                    </h2>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed line-clamp-3 font-normal">
                      {study.summary}
                    </p>

                    {/* Key Metrics */}
                    {study.metrics && study.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 pt-3 font-mono text-xs border-t border-slate-100">
                        {study.metrics.slice(0, 2).map((m) => (
                          <div
                            key={m.label}
                            className="p-3 bg-slate-50 rounded-xl border border-slate-200/60"
                          >
                            <span className="block text-[10px] text-slate-400 font-semibold uppercase tracking-wide truncate">
                              {m.label}
                            </span>
                            <span className="font-display text-base font-bold text-slate-900">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer Tags & Action Link */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap gap-1.5">
                      {study.disciplines.slice(0, 3).map((d) => (
                        <span
                          key={d}
                          className="px-2.5 py-1 rounded-lg font-mono text-[11px] font-medium bg-slate-100 text-slate-700"
                        >
                          {d}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 font-display font-bold text-xs text-blue-600 group-hover:text-blue-700">
                      <span>Read Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5 arrow-slide" />
                    </span>
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
