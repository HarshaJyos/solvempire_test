import { Check } from "lucide-react";
import { MultiStepContactWizard } from "@/components/contact/MultiStepContactWizard";
import { COMPANY } from "@/lib/company";

export function ContactCta() {
  return (
    <section
      id="contact-cta"
      aria-labelledby="contact-cta-heading"
      className="w-full bg-ink text-surface relative overflow-hidden pt-20 sm:pt-28 pb-16 sm:pb-24"
    >
      {/* Ambient Radial Glow & Orbital Arc */}
      <div className="absolute right-0 top-0 w-full sm:w-2/3 lg:w-1/2 h-[450px] sm:h-[550px] pointer-events-none overflow-hidden select-none z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 600 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMaxYMin meet"
          aria-hidden="true"
        >
          <defs>
            <filter id="contactGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="60" />
            </filter>
            <linearGradient id="blueContactArc" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.1" />
              <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Radial Glow using defined filter */}
          <circle cx="480" cy="160" r="160" fill="#2563eb" opacity="0.2" filter="url(#contactGlowFilter)" />

          {/* Orbital Arc Lines */}
          <path d="M 50 500 C 180 340, 340 220, 580 80" stroke="url(#blueContactArc)" strokeWidth="2" strokeDasharray="6 4" opacity="0.35" />
          <path d="M 50 500 C 180 340, 340 220, 580 80" stroke="url(#blueContactArc)" strokeWidth="1.5" />

          {/* Satellite Node */}
          <circle cx="450" cy="155" r="5" fill="#3b82f6" />
          <circle cx="450" cy="155" r="14" fill="#3b82f6" opacity="0.35" />
        </svg>
      </div>

      {/* Hero CTA & Interactive Wizard Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Context & Promise */}
          <div className="lg:col-span-5 flex flex-col justify-between pt-2">
            <div>
              <span className="inline-block text-brand-light font-bold text-xs sm:text-sm tracking-widest uppercase mb-3">
                PROJECT SCOPING WIZARD
              </span>
              <h2
                id="contact-cta-heading"
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.12]"
              >
                Have an idea? <br />
                <span className="text-brand-light">Let&apos;s build it together.</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base mt-4 max-w-xl leading-relaxed">
                Scope your engineering requirements in under 60 seconds. Select your engineering discipline, current stage, and timeline to receive a direct 30-minute scoping call link. No sales decks.
              </p>

              {/* Value Guarantees */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-brand/20 text-brand-light flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>Direct technical discussion with engineering leads</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-brand/20 text-brand-light flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>NDA signed prior to deep technical disclosures</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-brand/20 text-brand-light flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span>1 business day reply time guarantee</span>
                </div>
              </div>
            </div>


            {/* Direct Contact fallback */}
            <div className="mt-10 pt-6 border-t border-slate-800">
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Prefer email directly?
              </span>
              <a
                href={`mailto:${COMPANY.email}`}
                className="text-brand-light font-semibold text-sm hover:underline"
              >
                {COMPANY.email}
              </a>
            </div>
          </div>

          {/* Right Column: Multi-Step Interactive Form */}
          <div className="lg:col-span-7 w-full">
            <MultiStepContactWizard theme="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}

