import Link from "next/link";

export function ContactCta() {
  return (
    <section
      id="contact-cta"
      aria-labelledby="contact-cta-heading"
      className="w-full bg-ink text-surface relative overflow-hidden pt-24 sm:pt-32 pb-16 sm:pb-24"
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

          {/* Radial Glow using defined filter for full Safari/Firefox compatibility */}
          <circle cx="480" cy="160" r="160" fill="#2563eb" opacity="0.2" filter="url(#contactGlowFilter)" />

          {/* Orbital Arc Lines */}
          <path d="M 50 500 C 180 340, 340 220, 580 80" stroke="url(#blueContactArc)" strokeWidth="2" strokeDasharray="6 4" opacity="0.35" />
          <path d="M 50 500 C 180 340, 340 220, 580 80" stroke="url(#blueContactArc)" strokeWidth="1.5" />

          {/* Satellite Node */}
          <circle cx="450" cy="155" r="5" fill="#3b82f6" />
          <circle cx="450" cy="155" r="14" fill="#3b82f6" opacity="0.35" />
        </svg>
      </div>

      {/* Hero CTA Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="max-w-2xl">
          <span className="inline-block text-brand-light font-bold text-xs sm:text-sm tracking-widest uppercase mb-3">
            GET IN TOUCH
          </span>
          <h2
            id="contact-cta-heading"
            className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tight text-white leading-[1.10]"
          >
            Have an idea? <br />
            <span className="text-brand-light">Let&apos;s build it together.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg mt-5 max-w-xl leading-relaxed">
            We reply within one business day with a 30-minute call to scope the problem. No sales deck.
          </p>

          <div className="mt-8 sm:mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-brand hover:bg-brand-hover active:bg-blue-800 text-white font-semibold text-base sm:text-lg px-8 py-4 rounded-full shadow-xl shadow-brand/30 hover:shadow-brand/50 hover:scale-105 active:scale-95 transition-all duration-300 group"
            >
              <span>Start Your Project</span>
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
