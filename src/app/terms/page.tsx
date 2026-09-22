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
    <div className="flex flex-col min-h-screen bg-[#fafcff] bg-editorial-grid text-[#0f172a] selection:bg-[#2563eb]/15 selection:text-[#1d4ed8] font-sans">
      <Header />

      <main id="main-content" className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24">
        {/* Top Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-display text-xs text-slate-500 hover:text-blue-600 font-bold uppercase mb-8 group transition-colors"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>&larr; Return to Studio</span>
        </Link>

        {/* Legal Review Disclaimer */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono mb-8 flex items-center gap-3">
          <FileCode className="w-4 h-4 text-amber-700 shrink-0" />
          <span>LEGAL GOVERNANCE: TERMS OF SERVICE SPECIFICATION // MASTER SERVICES AGREEMENT FRAMEWORK</span>
        </div>

        {/* Technical Dossier Container */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-editorial-md p-6 sm:p-12 md:p-14 space-y-8">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-mono text-xs font-semibold mb-3">
              CIN: {COMPANY.cin}
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-slate-950 mb-2">
              Terms of Service
            </h1>
            <p className="font-mono text-xs text-slate-400">
              Last Updated: September 2026 // {COMPANY.legalName}
            </p>
          </div>

          <div className="space-y-8 text-[15px] sm:text-base leading-relaxed text-slate-700 font-normal">
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-950 pb-2 border-b border-slate-100">
                1. Scope of Engineering Services
              </h2>
              <p>
                {COMPANY.legalName} (&quot;SolveMpire&quot;) provides bespoke industrial mechanical engineering, custom PCB design, embedded firmware development, and connected cloud IoT platform engineering. All engineering deliverables and development stages are governed by executed Statements of Work (SOW) and Master Services Agreements (MSA).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-950 pb-2 border-b border-slate-100">
                2. Intellectual Property &amp; Deliverables Assignment
              </h2>
              <p>
                Unless explicitly stipulated otherwise in a signed Statement of Work, custom mechanical CAD STEP models, schematic captures, Gerber manufacturing files, and firmware source code created specifically for a client upon full settlement of project milestones are transferred directly to the client.
              </p>
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs font-medium text-blue-900 mt-3">
                &bull; Pre-existing proprietary SolveMpire core drivers, internal CAD templates, and engineering toolchains remain SolveMpire intellectual property.
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-950 pb-2 border-b border-slate-100">
                3. Confidentiality &amp; Non-Disclosure
              </h2>
              <p>
                SolveMpire treats all client concepts, preliminary circuit schematics, trade secrets, and commercial discussions under strict confidentiality. Mutual Non-Disclosure Agreements (NDAs) are routinely executed prior to in-depth technical scoping calls.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-950 pb-2 border-b border-slate-100">
                4. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, SolveMpire&apos;s total aggregate liability arising under any engineering engagement or from the use of this website shall be limited to the total fees paid by the client under the specific Statement of Work giving rise to the claim.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-950 pb-2 border-b border-slate-100">
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
