import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { serviceDisciplines } from "@/content/services";
import { getCaseStudyBySlug } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "Engineering Disciplines & Capabilities",
  description:
    "End-to-end product engineering: Mechanical design, custom PCB development, real-time embedded firmware, and connected IoT platforms.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      <Header />
      <main id="main-content" className="flex-1 w-full pt-28 sm:pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <span className="inline-block text-brand font-bold text-xs sm:text-sm tracking-widest uppercase mb-3">
              WHAT WE DO
            </span>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-heading leading-[1.10]">
              Unified Multi-Disciplinary Engineering.
            </h1>
            <p className="mt-4 sm:mt-6 text-body text-base sm:text-lg leading-relaxed">
              We bridge the gap between physical mechanics, custom electronics, embedded firmware, and digital cloud platforms. One integrated engineering team from initial concept to commercial tooling and field support.
            </p>
          </div>

          {/* Disciplines Stack */}
          <div className="space-y-16">
            {serviceDisciplines.map((discipline) => (
              <section
                key={discipline.id}
                id={discipline.id}
                aria-labelledby={`heading-${discipline.id}`}
                className="bg-surface rounded-2xl sm:rounded-3xl border border-hairline p-8 sm:p-12 shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                  {/* Left Column: Overview */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-display text-2xl font-bold text-brand">{discipline.order}</span>
                        <span className="w-8 h-[1px] bg-brand/30" />
                        <span className="text-xs font-bold text-brand tracking-widest uppercase">
                          {discipline.eyebrow}
                        </span>
                      </div>
                      <h2
                        id={`heading-${discipline.id}`}
                        className="font-display text-2xl sm:text-3xl font-bold text-heading leading-tight mb-4"
                      >
                        {discipline.title}
                      </h2>
                      <p className="text-body text-sm sm:text-base leading-[1.618] mb-6">
                        {discipline.summary}
                      </p>
                    </div>

                    {/* Verified Tooling */}
                    <div className="pt-6 border-t border-hairline">
                      <span className="block text-xs text-muted font-bold tracking-wider uppercase mb-2">
                        Core Toolset &amp; Technologies
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {discipline.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-2.5 py-1 rounded-md text-xs font-semibold bg-canvas text-heading border border-hairline"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Capabilities & Related Projects */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-muted uppercase tracking-wider mb-4">
                        Core Capabilities
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {discipline.capabilities.map((cap, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2.5 p-3 rounded-xl bg-canvas border border-hairline/70"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand shrink-0 mt-2" />
                            <span className="text-xs sm:text-sm text-body leading-relaxed">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Related Case Studies */}
                    {discipline.caseStudySlugs.length > 0 && (
                      <div className="pt-6 border-t border-hairline">
                        <span className="block text-xs text-muted font-bold tracking-wider uppercase mb-3">
                          Featured Case Studies in this Discipline
                        </span>
                        <div className="flex flex-wrap gap-3">
                          {discipline.caseStudySlugs.map((slug) => {
                            const cs = getCaseStudyBySlug(slug);
                            if (!cs) return null;
                            return (
                              <Link
                                key={slug}
                                href={`/work/${slug}`}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ice-light hover:bg-brand text-brand hover:text-white text-xs font-semibold transition-colors group"
                              >
                                <span>{cs.title}</span>
                                <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
