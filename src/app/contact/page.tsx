import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MultiStepContactWizard } from "@/components/contact/MultiStepContactWizard";
import { COMPANY } from "@/lib/company";
import { ArrowLeft, Sparkles, ShieldCheck, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Our Engineering Team | SolveMpire",
  description:
    "Scope your mechanical design, custom PCB, firmware, or connected platform project directly with SolveMpire's engineering team.",
};

export default function ContactPage() {
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Context & Direct Reach */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 font-display text-xs font-semibold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>PROJECT INITIATION &amp; SCOPING</span>
                </div>

                <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-950 tracking-tight leading-[1.08]">
                  Let&apos;s Scope <br />
                  <span className="text-blue-600">Your Product.</span>
                </h1>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                  Whether you have an early concept sketch, tight enclosure packaging constraints, or need full-scale firmware and PCB architecture, connect directly with our engineering leads.
                </p>

                {/* Expectation Box */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-editorial-sm space-y-2">
                  <span className="font-display text-xs font-bold text-blue-700 uppercase tracking-wider block">
                    What happens next?
                  </span>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed">
                    We review your brief within 1 business day and reply with a link to schedule a 30-minute technical discovery call. Direct engineering discussion — zero sales fluff.
                  </p>
                </div>
              </div>

              {/* Direct Info */}
              <div className="space-y-4 pt-6 border-t border-slate-200 text-xs font-sans">
                <div>
                  <span className="block text-slate-400 font-semibold uppercase tracking-wider mb-1 font-mono text-[10px]">
                    Direct Inquiries
                  </span>
                  <a href={`mailto:${COMPANY.email}`} className="text-blue-600 font-bold text-sm hover:underline block">
                    {COMPANY.email}
                  </a>
                </div>
                <div>
                  <span className="block text-slate-400 font-semibold uppercase tracking-wider mb-1 font-mono text-[10px]">
                    Studio &amp; Lab Location
                  </span>
                  <p className="text-slate-700 leading-relaxed text-sm">
                    {COMPANY.fullAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Multi-Step Form */}
            <div className="lg:col-span-7">
              <MultiStepContactWizard theme="light" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
