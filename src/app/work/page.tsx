import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { caseStudies } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Engineering Portfolio & Case Studies",
  description:
    "Explore our production-ready mechanical product designs, custom PCBs, embedded systems, and connected IoT platforms.",
};

export default function WorkPage() {
  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      <Header />
      <main id="main-content" className="flex-1 w-full pt-28 sm:pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header Banner */}
          <div className="max-w-3xl mb-16">
            <span className="inline-block text-brand font-bold text-xs sm:text-sm tracking-widest uppercase mb-3">
              OUR PORTFOLIO
            </span>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-heading leading-[1.10]">
              Engineered for the Real World.
            </h1>
            <p className="mt-4 sm:mt-6 text-body text-base sm:text-lg leading-relaxed">
              From high-density mechanical packaging to custom electronics, firmware pipelines, and cloud telemetry — explore our shipped products and ongoing engineering engagements.
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {caseStudies.map((study) => (
              <article
                key={study.slug}
                className="group bg-surface rounded-2xl sm:rounded-3xl border border-hairline overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Visual Thumbnail */}
                <div className="relative w-full aspect-[16/10] bg-ink overflow-hidden">
                  <Image
                    src={study.hero.src}
                    alt={study.hero.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-surface/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold text-brand border border-hairline">
                    {study.status}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-brand tracking-wider uppercase mb-2">
                      {study.category}
                    </div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-heading leading-tight mb-3 group-hover:text-brand transition-colors">
                      <Link href={`/work/${study.slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded">
                        {study.title}
                      </Link>
                    </h2>
                    <p className="text-body text-sm sm:text-base leading-[1.618] mb-6">
                      {study.summary}
                    </p>

                    {/* Key Metrics (if present) */}
                    {study.metrics && study.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-canvas border border-hairline/80">
                        {study.metrics.slice(0, 2).map((m) => (
                          <div key={m.label}>
                            <span className="block text-[11px] text-muted font-medium uppercase tracking-wide">
                              {m.label}
                            </span>
                            <span className="font-display text-lg font-bold text-heading">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer Tags & Action */}
                  <div className="pt-4 border-t border-hairline flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                      {study.disciplines.slice(0, 3).map((d) => (
                        <span
                          key={d}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-ice-light text-brand"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/work/${study.slug}`}
                      className="inline-flex items-center gap-1.5 text-brand font-semibold text-sm group-hover:translate-x-1 transition-transform"
                      aria-label={`Read case study for ${study.title}`}
                    >
                      <span>Read</span>
                      <span>&rarr;</span>
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
