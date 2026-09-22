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
          <FileText className="w-4 h-4 text-amber-700 shrink-0" />
          <span>LEGAL GOVERNANCE: PRIVACY SPECIFICATION — COMPLIANT WITH DPDP ACT &amp; INTERNATIONAL DATA PRIVACY STANDARDS</span>
        </div>

        {/* Technical Dossier Container */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-editorial-md p-6 sm:p-12 md:p-14 space-y-8">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-mono text-xs font-semibold mb-3">
              CIN: {COMPANY.cin}
            </span>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-slate-950 mb-2">
              Privacy Policy
            </h1>
            <p className="font-mono text-xs text-slate-400">
              Last Updated: September 2026 // {COMPANY.legalName}
            </p>
          </div>

          <div className="space-y-8 text-[15px] sm:text-base leading-relaxed text-slate-700 font-normal">
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-950 pb-2 border-b border-slate-100">
                1. Information We Collect
              </h2>
              <p>
                When you interact with our website or submit an inquiry through our project scoping wizard, {COMPANY.legalName} collects only the technical and commercial information necessary to evaluate, scope, and execute your engineering requirements:
              </p>
              <ul className="space-y-2 text-sm text-slate-700 pt-1">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Your primary name and verified professional contact email.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Company, institutional entity, or startup organization name.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Project scope, CAD files, Gerber files, firmware requirements, and target timeline specs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Infrastructure telemetry (IP address, user agent) used strictly for security and rate limiting.</span>
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-950 pb-2 border-b border-slate-100">
                2. How We Use Your Information
              </h2>
              <p>
                We use collected information strictly to:
              </p>
              <ul className="space-y-2 text-sm text-slate-700 pt-1">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Review and evaluate hardware engineering &amp; software platform feasibility.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Coordinate technical discovery calls with dedicated engineering architects.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Deliver formal Statements of Work (SOW) and commercial Master Services Agreements.</span>
                </li>
              </ul>
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs font-medium text-blue-900 mt-3">
                &bull; We never sell, rent, or monetize client contact details or proprietary project CAD/circuit IP to third parties.
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-950 pb-2 border-b border-slate-100">
                3. Data Storage &amp; Infrastructure Security
              </h2>
              <p>
                Inquiries and engineering files are processed via secure email infrastructure and encrypted enterprise databases. We utilize standard cloud hosting and communication processors that adhere to strict industry data protection benchmarks.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-slate-950 pb-2 border-b border-slate-100">
                4. Data Protection Officer &amp; Contact Information
              </h2>
              <p>
                You may request access to, correction of, or deletion of any personal data we hold by contacting our engineering compliance desk:
              </p>
              
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5 mt-3 font-sans">
                <p className="font-bold text-slate-900 text-sm">{COMPANY.legalName}</p>
                <p><span className="text-slate-400">Email:</span> <a href={`mailto:${COMPANY.email}`} className="text-blue-600 font-bold hover:underline">{COMPANY.email}</a></p>
                <p><span className="text-slate-400">Registered Address:</span> {COMPANY.fullAddress}</p>
                <p><span className="text-slate-400">Corporate Identification Number:</span> {COMPANY.cin}</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
