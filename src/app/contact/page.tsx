import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { MultiStepContactWizard } from "@/components/contact/MultiStepContactWizard";
import { COMPANY } from "@/lib/company";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Our Engineering Team | SolveMpire",
  description:
    "Scope your mechanical design, custom PCB, firmware, or connected platform project directly with SolveMpire's engineering team.",
};

export default function ContactPage() {
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Context & Direct Reach */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div>
                <div className="bg-[#3b82f6] border-2 border-[#0f0f10] shadow-[3px_3px_0px_#0f0f10] px-3.5 py-1 inline-flex items-center gap-2 mb-4">
                  <span className="font-mono font-bold text-xs uppercase text-[#0f0f10] tracking-widest">
                    [PROJECT INITIATION // SCOPING]
                  </span>
                </div>

                <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#0f0f10] uppercase tracking-tight leading-[0.95] mb-6">
                  LET&apos;S SCOPE YOUR PRODUCT.
                </h1>

                <p className="font-display text-base sm:text-lg text-[#0f0f10]/80 leading-relaxed mb-8">
                  Whether you have an early concept sketch, tight enclosure packaging constraints, or need full-scale firmware and PCB architecture, connect directly with our engineering architects.
                </p>

                {/* Expectation Box */}
                <div className="p-6 bg-white border-2 border-[#0f0f10] shadow-brutal-md mb-8">
                  <div className="font-mono text-xs font-bold text-[#1d4ed8] uppercase tracking-wider mb-2">
                    WHAT HAPPENS NEXT?
                  </div>
                  <p className="font-display text-sm text-[#0f0f10] font-medium leading-relaxed">
                    We reply within one business day to schedule a 30-minute technical discovery call. Direct engineering discussion — zero sales fluff.
                  </p>
                </div>
              </div>

              {/* Direct Info */}
              <div className="space-y-4 pt-6 border-t-2 border-[#0f0f10]/20 font-mono text-xs">
                <div>
                  <span className="block text-[10px] font-bold text-[#0f0f10]/60 uppercase tracking-wider mb-1">
                    Direct Email
                  </span>
                  <a href={`mailto:${COMPANY.email}`} className="text-[#1d4ed8] font-bold text-sm hover:underline">
                    {COMPANY.email}
                  </a>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[#0f0f10]/60 uppercase tracking-wider mb-1">
                    Studio Location
                  </span>
                  <p className="text-[#0f0f10] leading-relaxed">
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
