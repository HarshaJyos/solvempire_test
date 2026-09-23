import type { Metadata } from "next";
import Link from "next/link";
import { IndiseaHeader } from "@/components/site/IndiseaHeader";
import { IndiseaFooter } from "@/components/site/IndiseaFooter";
import { serviceDisciplines } from "@/content/services";
import { getCaseStudyBySlug } from "@/content/case-studies";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { buildBreadcrumbsJsonLd, buildServicesJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Engineering Disciplines & Capabilities | SolveMpire",
  description:
    "End-to-end product engineering: Mechanical design (Fusion 360), custom PCB development (KiCad), real-time embedded firmware (STM32/ESP32), DWIN DGUS HMI, and connected IoT platforms.",
  keywords: [
    "Mechanical Engineering India",
    "Custom PCB Design KiCad",
    "Embedded Firmware Development",
    "IoT Cloud Telemetry",
    "DWIN DGUS HMI",
    "Product Engineering Services",
    "DFM Tooling Support",
    "Hardware Prototyping",
  ],
  alternates: {
    canonical: `${COMPANY.websiteUrl}/services`,
  },
  openGraph: {
    title: "Engineering Disciplines & Capabilities | SolveMpire",
    description:
      "End-to-end product engineering: Mechanical design, custom PCB development, real-time embedded firmware, and connected IoT platforms.",
    url: `${COMPANY.websiteUrl}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Disciplines & Capabilities | SolveMpire",
    description:
      "End-to-end product engineering: Mechanical design, custom PCB development, real-time embedded firmware, and connected IoT platforms.",
  },
};

export default function ServicesPage() {
  const breadcrumbsSchema = buildBreadcrumbsJsonLd([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ]);
  const servicesSchema = buildServicesJsonLd(serviceDisciplines);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--surface-canvas)] text-[var(--text-body)] selection:bg-[#FACC15] selection:text-[#181A1D] font-sans">
      <JsonLd schema={breadcrumbsSchema} />
      <JsonLd schema={servicesSchema} />
      <IndiseaHeader />

      <main id="main-content" className="flex-1 w-full pt-36 pb-28">
        <div className="indisea-wrap space-y-16">
          {/* Header Banner */}
          <div className="max-w-4xl space-y-6">
            <span className="indisea-eyebrow">01 / CAPABILITIES &amp; SPECIALIZATIONS</span>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[56px] text-[var(--text-heading)] tracking-tight leading-[1.06] uppercase">
              Unified Engineering Disciplines. <br />
              <span className="text-[#1F56C6]">Physical &amp; Digital Co-Design.</span>
            </h1>
            <p className="font-sans text-base sm:text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed font-normal">
              We bridge the gap between physical mechanics, custom electronics, embedded firmware, and cloud software. One unified engineering bench from initial concept to commercial tooling and field support.
            </p>
          </div>

          {/* Disciplines Stack (Indisea Spec Sheets) */}
          <div className="space-y-12">
            {serviceDisciplines.map((discipline, idx) => (
              <section
                key={discipline.id}
                id={discipline.id}
                className="rounded-none bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs overflow-hidden"
              >
                {/* Header Bar */}
                <div className="bg-[var(--surface-canvas-alt)]/60 border-b border-[var(--border-hairline)] px-6 sm:px-10 py-4 flex items-center justify-between">
                  <span className="indisea-eyebrow">
                    DISCIPLINE 0{idx + 1} // {discipline.eyebrow.toUpperCase()}
                  </span>
                  <span className="px-3 py-1 rounded-none bg-[var(--surface-card)] text-[#1F56C6] font-mono text-[10px] font-bold border border-[var(--border-hairline)] uppercase">
                    IN-HOUSE FACILITY
                  </span>
                </div>

                <div className="p-6 sm:p-10 lg:p-12">
                  <div className="indisea-grid items-start gap-8 lg:gap-12">
                    {/* Left Column: Overview (Span 5) */}
                    <div className="col-span-12 lg:col-span-5 space-y-6">
                      <div>
                        <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-[34px] text-[var(--text-heading)] tracking-tight leading-tight uppercase mb-3">
                          {discipline.title}
                        </h2>
                        <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed font-normal">
                          {discipline.summary}
                        </p>
                      </div>

                      {/* Toolset & Technologies */}
                      <div className="pt-6 border-t border-[var(--border-hairline)] space-y-2.5">
                        <span className="indisea-eyebrow block">
                          Core Toolchain &amp; Standards
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {discipline.tools.map((tool) => (
                            <span
                              key={tool}
                              className="px-2.5 py-1 rounded-none font-mono text-xs font-semibold bg-[var(--surface-canvas)] border border-[var(--border-hairline)] text-[var(--text-heading)] uppercase"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Capabilities & Related Projects (Span 7) */}
                    <div className="col-span-12 lg:col-span-7 space-y-6">
                      <div>
                        <span className="indisea-eyebrow block mb-3">
                          Scope &amp; Deliverables
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[var(--text-heading)]">
                          {discipline.capabilities.map((cap) => (
                            <li
                              key={cap}
                              className="flex items-start gap-2.5 p-3.5 rounded-none bg-[var(--surface-canvas)] border border-[var(--border-hairline)]"
                            >
                              <span className="w-1.5 h-1.5 rounded-none bg-[#1F56C6] mt-2 shrink-0" />
                              <span className="font-medium text-xs sm:text-sm">{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Related Case Study Card */}
                      {discipline.caseStudySlugs && discipline.caseStudySlugs.length > 0 && (
                        <div className="pt-4 border-t border-[var(--border-hairline)]">
                          <span className="indisea-eyebrow block mb-2">
                            Featured Project Deployment
                          </span>
                          {(() => {
                            const cs = getCaseStudyBySlug(discipline.caseStudySlugs[0]);
                            if (!cs) return null;
                            return (
                              <Link
                                href={`/work/${cs.slug}`}
                                className="group p-4 rounded-none bg-[var(--surface-canvas)] border border-[var(--border-hairline)] hover:border-slate-400 transition-all flex items-center justify-between"
                              >
                                <div>
                                  <span className="font-display font-bold text-sm text-[var(--text-heading)] group-hover:text-[#1F56C6] transition-colors block uppercase tracking-tight">
                                    {cs.title}
                                  </span>
                                  <span className="font-mono text-[10px] text-[var(--text-muted)] block mt-0.5 uppercase">
                                    Client: {cs.client} &bull; {cs.status}
                                  </span>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-[#1F56C6] group-hover:translate-x-0.5 transition-transform shrink-0" />
                              </Link>
                            );
                          })()}
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
      <IndiseaFooter />
    </div>
  );
}
