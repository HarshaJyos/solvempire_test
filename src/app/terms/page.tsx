import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { COMPANY } from "@/lib/company";
import { ArrowLeft, FileCode, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms and conditions governing the engineering services and website of ${COMPANY.legalName}.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f0f7ff] bg-blueprint-subtle text-[#0f0f10] selection:bg-[#3b82f6] selection:text-white">
      <Header />

      <main id="main-content" className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20">
        {/* Top Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#0f0f10] hover:text-[#3b82f6] transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>&larr; BACK TO INDEX</span>
        </Link>

        {/* Legal Review Disclaimer */}
        <div className="p-4 bg-[#fef3c7] border-2 border-[#0f0f10] shadow-brutal-xs text-[#78350f] font-mono text-xs font-bold uppercase mb-8 flex items-center gap-3">
          <FileCode className="w-4 h-4 text-[#b45309] shrink-0" />
          <span>LEGAL GOVERNANCE: DRAFT TERMS OF SERVICE SPECIFICATION // MASTER SERVICES FRAMEWORK</span>
        </div>

        {/* Technical Dossier Container */}
        <div className="bg-white border-2 border-[#0f0f10] shadow-brutal-xl p-6 sm:p-12 md:p-14 space-y-8">
          {/* Top Dossier Terminal Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b-2 border-[#0f0f10] font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#3b82f6] border border-[#0f0f10]" />
              <span className="font-bold uppercase tracking-wider text-[#0f0f10]">
                SPEC: TERMS_OF_SERVICE // SOLVEMPIRE
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#3b82f6] text-white font-bold uppercase border border-[#0f0f10]">
                CIN: {COMPANY.cin}
              </span>
            </div>
          </div>

          <div>
            <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-[#0f0f10] mb-3">
              TERMS OF SERVICE
            </h1>
            <p className="font-mono text-xs text-[#71717a] font-bold uppercase">
              LAST REVISED: SEPTEMBER 2026 // {COMPANY.legalName}
            </p>
          </div>

          <div className="space-y-8 text-[15px] sm:text-base leading-relaxed text-[#27272a]">
            <section className="space-y-3">
              <h2 className="font-display font-black text-xl sm:text-2xl text-[#0f0f10] uppercase tracking-tight pb-2 border-b border-[#0f0f10]/20">
                1. Scope of Engineering Services
              </h2>
              <p>
                {COMPANY.legalName} (&quot;SolveMpire&quot;) provides bespoke industrial mechanical engineering, custom PCB design, embedded firmware development, and connected cloud IoT platform engineering. All engineering deliverables and development stages are governed by executed Statements of Work (SOW) and Master Services Agreements (MSA).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-black text-xl sm:text-2xl text-[#0f0f10] uppercase tracking-tight pb-2 border-b border-[#0f0f10]/20">
                2. Intellectual Property &amp; Deliverables Assignment
              </h2>
              <p>
                Unless explicitly stipulated otherwise in a signed Statement of Work, custom mechanical CAD STEP models, schematic captures, Gerber manufacturing files, and firmware source code created specifically for a client upon full settlement of project milestones are transferred directly to the client.
              </p>
              <div className="p-4 bg-[#f0f7ff] border-2 border-[#0f0f10] font-mono text-xs font-bold uppercase text-[#0f0f10] shadow-brutal-xs mt-3">
                &bull; PRE-EXISTING PROPRIETARY SOLVEMPIRE CORE DRIVERS, CAD TEMPLATES, AND INTERNAL ENGINEERING TOOLCHAINS REMAIN SOLVEMPIRE INTELLECTUAL PROPERTY.
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-black text-xl sm:text-2xl text-[#0f0f10] uppercase tracking-tight pb-2 border-b border-[#0f0f10]/20">
                3. Confidentiality &amp; Non-Disclosure
              </h2>
              <p>
                SolveMpire treats all client concepts, preliminary circuit schematics, trade secrets, and commercial discussions under strict confidentiality. Mutual Non-Disclosure Agreements (NDAs) are routinely executed prior to in-depth technical scoping calls.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-black text-xl sm:text-2xl text-[#0f0f10] uppercase tracking-tight pb-2 border-b border-[#0f0f10]/20">
                4. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, SolveMpire&apos;s total aggregate liability arising under any engineering engagement or from the use of this website shall be limited to the total fees paid by the client under the specific Statement of Work giving rise to the claim.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-black text-xl sm:text-2xl text-[#0f0f10] uppercase tracking-tight pb-2 border-b border-[#0f0f10]/20">
                5. Governing Law &amp; Jurisdiction
              </h2>
              <p>
                These terms and any commercial agreements arising from them shall be governed by and construed in accordance with the laws of India. The courts located in Kakinada, Andhra Pradesh, India shall have exclusive jurisdiction over any disputes.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
