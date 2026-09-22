import type { Metadata } from "next";
import Link from "next/link";
import { IndiseaHeader } from "@/components/site/IndiseaHeader";
import { IndiseaFooter } from "@/components/site/IndiseaFooter";
import { COMPANY } from "@/lib/company";
import { ShieldCheck, ArrowLeft, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | SolveMpire",
  description: `Privacy policy and data protection practices of ${COMPANY.legalName}.`,
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="font-mono text-xs text-[var(--text-muted)]">
              Last Updated: September 2026 // {COMPANY.legalName}
            </p>
          </div>

          <div className="space-y-8 text-[15px] sm:text-base leading-relaxed text-[var(--text-body)] font-normal">
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)]">
                1. Information We Collect
              </h2>
              <p>
                When you interact with our website or submit an inquiry through our project scoping wizard, {COMPANY.legalName} collects only the technical and commercial information necessary to evaluate, scope, and execute your engineering requirements:
              </p>
              <ul className="space-y-2 text-sm text-[var(--text-muted)] pt-1 list-disc pl-5">
                <li>Contact information (Name, professional email address, phone number).</li>
                <li>Project specification metadata (Technical requirements, BOM estimates, timelines).</li>
                <li>Mutual Non-Disclosure Agreement (NDA) execution parameters.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)]">
                2. Intellectual Property &amp; Confidentiality
              </h2>
              <p>
                We operate under strict confidentiality. All proprietary 3D CAD files, schematics, PCB Gerber files, firmware source code, and commercial specifications shared with SolveMpire are protected under mutual NDA and never disclosed to third parties without explicit written consent.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-heading)] pb-2 border-b border-[var(--border-hairline)]">
                3. Direct Inquiries
              </h2>
              <p>
                For any privacy inquiries or legal governance requests, please contact our compliance desk directly at{" "}
                <a href="mailto:contact@solvempire.com" className="text-[#2563EB] font-bold underline">
                  contact@solvempire.com
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
