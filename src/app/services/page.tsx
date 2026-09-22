import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { serviceDisciplines } from "@/content/services";
import { getCaseStudyBySlug } from "@/content/case-studies";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Disciplines & Capabilities | SolveMpire",
  description:
    "End-to-end product engineering: Mechanical design, custom PCB development, real-time embedded firmware, and connected IoT platforms.",
};

export default function ServicesPage() {
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
                [CAPABILITIES // CORE DISCIPLINES]
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#0f0f10] uppercase leading-[0.95]">
              UNIFIED MULTI-DISCIPLINARY ENGINEERING.
            </h1>
            <p className="mt-5 text-[#0f0f10]/80 font-display text-lg sm:text-xl leading-relaxed">
              We bridge the gap between physical mechanics, custom electronics, embedded firmware, and digital cloud platforms. One integrated engineering team from initial concept to commercial tooling and field support.
            </p>
          </div>

          {/* Disciplines Stack */}
          <div className="space-y-16">
            {serviceDisciplines.map((discipline, idx) => (
              <section
                key={discipline.id}
                id={discipline.id}
                aria-labelledby={`heading-${discipline.id}`}
                className="bg-white border-2 border-[#0f0f10] shadow-brutal-lg overflow-hidden"
              >
                {/* System Window Header Bar */}
                <div className="bg-[#f7f6f2] border-b-2 border-[#0f0f10] px-5 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-3 rounded-full bg-[#0f0f10]" />
                    <span className="size-3 rounded-full bg-[#f5c518] border border-[#0f0f10]" />
                    <span className="size-3 rounded-full bg-[#ecebe4] border border-[#0f0f10]" />
                    <span className="font-mono font-bold text-xs text-[#0f0f10] ml-2 tracking-wide uppercase">
                      DISCIPLINE // 0{idx + 1}
                    </span>
                  </div>
                  <span className="bg-[#3b82f6] text-[#0f0f10] border border-[#0f0f10] font-mono font-bold text-[11px] px-2.5 py-0.5 tracking-wider uppercase">
                    {discipline.eyebrow}
                  </span>
                </div>

                <div className="p-6 sm:p-10 lg:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left Column: Overview */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                      <div>
                        <h2
                          id={`heading-${discipline.id}`}
                          className="font-display font-black text-2xl sm:text-4xl text-[#0f0f10] uppercase tracking-tight leading-tight mb-4"
                        >
                          {discipline.title}
                        </h2>
                        <p className="font-display text-sm sm:text-base text-[#0f0f10]/80 leading-relaxed mb-6">
                          {discipline.summary}
                        </p>
                      </div>

                      {/* Verified Tooling */}
                      <div className="pt-6 border-t-2 border-[#0f0f10]/15">
                        <span className="block font-mono text-[11px] text-[#0f0f10]/70 font-bold tracking-wider uppercase mb-3">
                          CORE TOOLSET &amp; TECHNOLOGIES
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {discipline.tools.map((tool) => (
                            <span
                              key={tool}
                              className="px-2.5 py-1 font-mono text-[11px] font-bold bg-[#ecebe4] text-[#0f0f10] border border-[#0f0f10]"
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
                        <h3 className="font-mono font-bold text-xs text-[#0f0f10] uppercase tracking-wider mb-4">
                          [CORE CAPABILITIES]
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                          {discipline.capabilities.map((cap, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2.5 p-3.5 bg-[#f0f7ff] border-2 border-[#0f0f10] shadow-[2px_2px_0px_#0f0f10]"
                            >
                              <span className="size-2 bg-[#3b82f6] border border-[#0f0f10] shrink-0 mt-1.5" />
                              <span className="font-display text-xs sm:text-sm text-[#0f0f10] font-medium leading-relaxed">
                                {cap}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Related Case Studies */}
                      {discipline.caseStudySlugs.length > 0 && (
                        <div className="pt-6 border-t-2 border-[#0f0f10]/15">
                          <span className="block font-mono text-[11px] text-[#0f0f10]/70 font-bold tracking-wider uppercase mb-3">
                            FEATURED CASE STUDIES IN THIS DISCIPLINE
                          </span>
                          <div className="flex flex-wrap gap-3">
                            {discipline.caseStudySlugs.map((slug) => {
                              const cs = getCaseStudyBySlug(slug);
                              if (!cs) return null;
                              return (
                                <Link
                                  key={slug}
                                  href={`/work/${slug}`}
                                  className="btn-brutal inline-flex items-center gap-2 px-3.5 py-1.5 bg-white hover:bg-[#fafaf8] border-2 border-[#0f0f10] shadow-brutal-xs font-mono text-xs font-bold text-[#0f0f10] uppercase"
                                >
                                  <span>{cs.title}</span>
                                  <span className="text-[#1d4ed8]">&rarr;</span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
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
