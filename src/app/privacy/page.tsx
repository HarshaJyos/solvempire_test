import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { COMPANY } from "@/lib/company";
import { ShieldCheck, ArrowLeft, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy and data protection practices of ${COMPANY.legalName}.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyPage() {
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
          <FileText className="w-4 h-4 text-[#b45309] shrink-0" />
          <span>LEGAL GOVERNANCE: DRAFT PRIVACY SPECIFICATION — CERTIFIED FOR DPDP ACT &amp; DATA INTEGRITY COMPLIANCE</span>
        </div>

        {/* Technical Dossier Container */}
        <div className="bg-white border-2 border-[#0f0f10] shadow-brutal-xl p-6 sm:p-12 md:p-14 space-y-8">
          {/* Top Dossier Terminal Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b-2 border-[#0f0f10] font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#3b82f6] border border-[#0f0f10]" />
              <span className="font-bold uppercase tracking-wider text-[#0f0f10]">
                SPEC: LEGAL_DATA_PROTECTION // SOLVEMPIRE
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
              PRIVACY POLICY
            </h1>
            <p className="font-mono text-xs text-[#71717a] font-bold uppercase">
              LAST REVISED: SEPTEMBER 2026 // {COMPANY.legalName}
            </p>
          </div>

          <div className="space-y-8 text-[15px] sm:text-base leading-relaxed text-[#27272a]">
            <section className="space-y-3">
              <h2 className="font-display font-black text-xl sm:text-2xl text-[#0f0f10] uppercase tracking-tight pb-2 border-b border-[#0f0f10]/20">
                1. Information We Collect
              </h2>
              <p>
                When you interact with our website or submit an inquiry through our contact wizard, {COMPANY.legalName} collects only the technical and commercial information necessary to evaluate, scope, and execute your engineering requirements:
              </p>
              <ul className="space-y-2 font-mono text-xs sm:text-sm text-[#0f0f10] pt-1">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3b82f6] shrink-0 mt-0.5" />
                  <span>Your primary name and verified professional contact email.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3b82f6] shrink-0 mt-0.5" />
                  <span>Company, institutional entity, or startup organization name.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3b82f6] shrink-0 mt-0.5" />
                  <span>Project scope, CAD files, Gerber files, firmware requirements, and target timeline specs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3b82f6] shrink-0 mt-0.5" />
                  <span>Infrastructure telemetry (IP address, user agent) used strictly for security and rate limiting.</span>
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-black text-xl sm:text-2xl text-[#0f0f10] uppercase tracking-tight pb-2 border-b border-[#0f0f10]/20">
                2. How We Use Your Information
              </h2>
              <p>
                We use collected information strictly to:
              </p>
              <ul className="space-y-2 font-mono text-xs sm:text-sm text-[#0f0f10] pt-1">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3b82f6] shrink-0 mt-0.5" />
                  <span>Review and evaluate hardware engineering &amp; software platform feasibility.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3b82f6] shrink-0 mt-0.5" />
                  <span>Coordinate technical scoping calls with dedicated engineering architects.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#3b82f6] shrink-0 mt-0.5" />
                  <span>Deliver formal Statements of Work (SOW) and commercial Master Services Agreements.</span>
                </li>
              </ul>
              <div className="p-4 bg-[#f0f7ff] border-2 border-[#0f0f10] font-mono text-xs font-bold uppercase text-[#0f0f10] shadow-brutal-xs mt-3">
                &bull; WE NEVER SELL, RENT, OR MONETIZE CLIENT CONTACT DETAILS OR PROPRIETARY PROJECT CAD/CIRCUIT IP TO THIRD PARTIES.
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-black text-xl sm:text-2xl text-[#0f0f10] uppercase tracking-tight pb-2 border-b border-[#0f0f10]/20">
                3. Data Storage &amp; Infrastructure Security
              </h2>
              <p>
                Inquiries and engineering files are processed via secure email infrastructure and encrypted enterprise databases. We utilize standard cloud hosting and communication processors that adhere to strict industry data protection benchmarks.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-black text-xl sm:text-2xl text-[#0f0f10] uppercase tracking-tight pb-2 border-b border-[#0f0f10]/20">
                4. Data Protection Officer &amp; Contact Information
              </h2>
              <p>
                You may request access to, correction of, or deletion of any personal data we hold by contacting our engineering compliance desk:
              </p>
              
              <div className="p-5 bg-[#f7f6f2] border-2 border-[#0f0f10] shadow-brutal-sm font-mono text-xs space-y-1.5 mt-3">
                <p className="font-bold text-[#0f0f10] text-sm uppercase">{COMPANY.legalName}</p>
                <p><span className="text-[#71717a]">EMAIL:</span> <a href={`mailto:${COMPANY.email}`} className="text-[#3b82f6] font-bold hover:underline">{COMPANY.email}</a></p>
                <p><span className="text-[#71717a]">REGISTERED ADDRESS:</span> {COMPANY.fullAddress}</p>
                <p><span className="text-[#71717a]">CORPORATE IDENTIFICATION NUMBER:</span> {COMPANY.cin}</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
