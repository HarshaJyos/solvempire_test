import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { serviceDisciplines } from "@/content/services";
import { getCaseStudyBySlug } from "@/content/case-studies";
import { ArrowLeft, ArrowRight, Layers, CheckCircle2, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Engineering Disciplines & Capabilities | SolveMpire",
  description:
    "End-to-end product engineering: Mechanical design, custom PCB development, real-time embedded firmware, and connected IoT platforms.",
};

export default function ServicesPage() {
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
            <span>&larr; Return to Studio</span>
          </Link>

          {/* Header Banner */}
          <div className="max-w-3xl mb-16 border-b border-slate-200 pb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 font-display text-xs font-semibold tracking-wide">
              <Layers className="w-3.5 h-3.5" />
              <span>CAPABILITIES &amp; SPECIALIZATIONS</span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.08]">
              Unified Engineering Disciplines. <br />
              <span className="text-blue-600">Physical &amp; Digital Co-Design.</span>
            </h1>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              We bridge the gap between physical mechanics, custom electronics, embedded firmware, and digital cloud platforms. One integrated engineering team from initial concept to commercial tooling and field support.
            </p>
          </div>

          {/* Disciplines Stack */}
          <div className="space-y-12">
            {serviceDisciplines.map((discipline, idx) => (
              <section
                key={discipline.id}
                id={discipline.id}
                aria-labelledby={`heading-${discipline.id}`}
                className="rounded-3xl bg-white border border-slate-200/90 shadow-editorial-sm hover:shadow-editorial-md transition-all duration-300 overflow-hidden"
              >
                {/* Header Bar */}
                <div className="bg-slate-50/80 border-b border-slate-100 px-6 sm:px-10 py-4 flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-slate-500 uppercase tracking-wide">
                    DISCIPLINE 0{idx + 1} // {discipline.eyebrow}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-mono text-[11px] font-semibold border border-blue-200/60">
                    IN-HOUSE FACILITY
                  </span>
                </div>

                <div className="p-6 sm:p-10 lg:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left Column: Overview */}
                    <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                      <div>
                        <h2
                          id={`heading-${discipline.id}`}
                          className="font-display font-bold text-2xl sm:text-3xl text-slate-950 tracking-tight leading-tight mb-3"
                        >
                          {discipline.title}
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                          {discipline.summary}
                        </p>
                      </div>

                      {/* Toolset & Technologies */}
                      <div className="pt-6 border-t border-slate-100 space-y-2.5">
                        <span className="block font-display text-xs font-bold text-slate-500 uppercase tracking-wide">
                          Core Toolchain &amp; Standards
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {discipline.tools.map((tool) => (
                            <span
                              key={tool}
                              className="px-2.5 py-1 rounded-lg font-mono text-xs font-medium bg-slate-50 border border-slate-200/60 text-slate-700"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Capabilities & Related Projects */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                      <div>
                        <h3 className="font-display font-bold text-xs uppercase tracking-wider text-slate-500 mb-3">
                          Key Capabilities &amp; Specifications
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {discipline.capabilities.map((cap, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/60"
                            >
                              <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                              <span className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                                {cap}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Related Case Studies */}
                      {discipline.caseStudySlugs.length > 0 && (
                        <div className="pt-6 border-t border-slate-100">
                          <span className="block font-display text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                            Deployed Systems Using This Discipline
                          </span>
                          <div className="flex flex-wrap gap-3">
                            {discipline.caseStudySlugs.map((slug) => {
                              const cs = getCaseStudyBySlug(slug);
                              if (!cs) return null;
                              return (
                                <Link
                                  key={slug}
                                  href={`/work/${slug}`}
                                  className="btn-editorial btn-editorial-secondary inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-800 group shadow-xs"
                                >
                                  <span>{cs.title}</span>
                                  <ArrowUpRight className="w-3.5 h-3.5 text-blue-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
