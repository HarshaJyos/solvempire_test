import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { caseStudies } from "@/content/case-studies";
import { ArrowRight, ArrowLeft, Layers, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Portfolio & Case Studies | SolveMpire",
  description:
    "Explore our production-ready mechanical product designs, custom PCBs, embedded systems, automated machines, and connected IoT platforms.",
};

export default function WorkPage() {
  return (
    <div className="flex flex-col min-h-screen bg-canvas text-heading selection:bg-brand/15 selection:text-brand">
      <Header />
      <main id="main-content" className="flex-1 w-full pt-28 sm:pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-brand transition-colors mb-6 group font-medium"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>

          {/* Header Banner */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-ice-light border border-brand/25 text-xs font-semibold text-brand uppercase tracking-wider mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>SolveMpire Engineering Portfolio</span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-heading leading-[1.10]">
              Engineered for the Real World.
            </h1>
            <p className="mt-4 sm:mt-5 text-body text-base sm:text-lg leading-relaxed">
              From high-density mechanical packaging to custom electronics, firmware pipelines, and cloud telemetry — explore our shipped products, deployed machines, and technical case studies.
            </p>
          </div>

          {/* Case Studies Dossier Grid (Crisp A4 Whitepaper Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {caseStudies.map((study) => (
              <article
                key={study.slug}
                className="group bg-white rounded-none border border-slate-300 shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-brand/50 transition-all duration-300 hover:-translate-y-0.5 flex flex-col overflow-hidden"
              >
                {/* Visual Thumbnail */}
                <div className="relative w-full aspect-[16/10] bg-slate-900 overflow-hidden border-b border-slate-200">
                  <Image
                    src={study.hero.src}
                    alt={study.hero.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1 rounded-none text-xs font-semibold text-brand border border-slate-200 shadow-xs uppercase tracking-wider">
                    {study.status}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-brand tracking-wider uppercase">
                        {study.category}
                      </span>
                      <span className="text-xs text-muted font-medium">
                        Client: {study.client}
                      </span>
                    </div>

                    <h2 className="font-display text-xl sm:text-2xl font-bold text-heading leading-tight group-hover:text-brand transition-colors">
                      <Link href={`/work/${study.slug}`} className="focus:outline-none">
                        {study.title}
                      </Link>
                    </h2>

                    <p className="text-body text-sm sm:text-base leading-relaxed line-clamp-3">
                      {study.summary}
                    </p>

                    {/* Key Metrics Grid */}
                    {study.metrics && study.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {study.metrics.slice(0, 2).map((m) => (
                          <div
                            key={m.label}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-none"
                          >
                            <span className="block text-[11px] text-muted font-medium uppercase tracking-wide truncate">
                              {m.label}
                            </span>
                            <span className="font-display text-lg sm:text-xl font-bold text-brand">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer Tags & Action Link */}
                  <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                      {study.disciplines.slice(0, 3).map((d) => (
                        <span
                          key={d}
                          className="px-2 py-0.5 rounded-none text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {d}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/work/${study.slug}`}
                      className="inline-flex items-center gap-1.5 text-brand font-semibold text-xs sm:text-sm group-hover:translate-x-1 transition-transform"
                      aria-label={`Read case study for ${study.title}`}
                    >
                      <span>Read Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
