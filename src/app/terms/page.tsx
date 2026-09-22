import type { Metadata } from "next";
import Link from "next/link";
import { IndiseaHeader } from "@/components/site/IndiseaHeader";
import { IndiseaFooter } from "@/components/site/IndiseaFooter";
import { COMPANY } from "@/lib/company";
import { ShieldCheck, ArrowLeft, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | SolveMpire",
  description: `Terms of service and engineering engagement conditions for ${COMPANY.legalName}.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--surface-canvas)] text-[var(--text-body)] selection:bg-[#FACC15] selection:text-[#181A1D] font-sans">
      <IndiseaHeader />
      
      <main id="main-content" className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-28">
        <div className="p-8 sm:p-12 md:p-14 rounded-3xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-sm space-y-8">
          <div>
            <span className="indisea-eyebrow text-[#2563EB] block mb-2">
              CIN: {COMPANY.cin}
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-[var(--text-heading)] mb-2">
              Terms of Service
            </h1>
            <p className="font-mono text-xs text-[var(--text-muted)]">
              Last Updated: September 2026 // {COMPANY.legalName}
            </p>
          </div>

          <div className="space-y-8 text-[15px] sm:text-base leading-relaxed text-[var(--text-body)] font-normal">
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)]">
                1. Scope of Engineering Services
              </h2>
              <p>
                {COMPANY.legalName} delivers custom physical and digital engineering services, including mechanical CAD design, rapid prototyping, printed circuit board (PCB) design, firmware development, cloud telemetry, and volume manufacturing support. All scopes are executed under formal Statements of Work (SOW).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)]">
                2. Intellectual Property Ownership
              </h2>
              <p>
                Upon final settlement of project milestones, all bespoke CAD files, PCB layouts, firmware binaries, source repositories, and manufacturing documentation created specifically for the client transfer to full client ownership in accordance with the executed Master Services Agreement (MSA).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)]">
                3. Direct Legal Inquiries
              </h2>
              <p>
                For contract inquiries, MSA execution, or custom scoping terms, reach our legal desk at{" "}
                <a href="mailto:support@solvempire.com" className="text-[#2563EB] font-bold underline">
                  support@solvempire.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <IndiseaFooter />
    </div>
  );
}
