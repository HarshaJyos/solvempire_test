import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ContactForm } from "@/components/contact/ContactForm";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Contact Our Engineering Team",
  description:
    "Scope your mechanical design, custom PCB, firmware, or connected platform project directly with SolveMpire's engineering team.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      <Header />
      <main id="main-content" className="flex-1 w-full pt-28 sm:pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Context & Direct Reach */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="inline-block text-brand font-bold text-xs sm:text-sm tracking-widest uppercase mb-3">
                  START A PROJECT
                </span>
                <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-heading leading-[1.12] mb-6">
                  Let&apos;s Scope Your Engineering Requirements.
                </h1>
                <p className="text-body text-base leading-[1.618] mb-8">
                  Whether you have an early napkin sketch, a challenging packaging constraint, or need full-scale firmware and PCB architecture, connect directly with our engineering architects.
                </p>

                {/* Expectation Box */}
                <div className="p-6 rounded-2xl bg-ice-light border border-brand/20 mb-8">
                  <h2 className="text-xs font-bold text-brand uppercase tracking-wider mb-2">
                    What happens next?
                  </h2>
                  <p className="text-heading text-sm font-medium leading-relaxed">
                    We reply within one business day with a 30-minute call to scope the problem. No sales deck.
                  </p>
                </div>
              </div>

              {/* Direct Info */}
              <div className="space-y-4 pt-6 border-t border-hairline">
                <div>
                  <span className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">
                    Direct Email
                  </span>
                  <a href={`mailto:${COMPANY.email}`} className="text-brand font-semibold text-sm hover:underline">
                    {COMPANY.email}
                  </a>
                </div>
                <div>
                  <span className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">
                    Engineering Studio Location
                  </span>
                  <p className="text-body text-xs sm:text-sm leading-relaxed">
                    {COMPANY.fullAddress}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
