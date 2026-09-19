"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col text-slate-900 selection:bg-blue-100 selection:text-blue-700">
      {/* Navigation Bar */}
      <header className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-6 pb-4 flex items-center justify-between relative z-30">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt="Solvempire Logo"
            width={190}
            height={44}
            priority
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <Link
            href="#about"
            className="text-slate-600 hover:text-blue-600 text-[15px] font-medium transition-colors duration-200"
          >
            About Us
          </Link>
          <Link
            href="#journal"
            className="text-slate-600 hover:text-blue-600 text-[15px] font-medium transition-colors duration-200"
          >
            Journal
          </Link>
          <Link
            href="#case-studies"
            className="text-slate-600 hover:text-blue-600 text-[15px] font-medium transition-colors duration-200"
          >
            Case Studies
          </Link>
        </nav>

        {/* Desktop Contact CTA */}
        <div className="hidden md:block">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-[15px] px-6 py-2.5 rounded-full shadow-sm hover:shadow-md hover:shadow-blue-500/20 transition-all duration-200 active:scale-95"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-2 duration-200 relative z-20">
          <Link
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-700 hover:text-blue-600 font-medium py-1"
          >
            About Us
          </Link>
          <Link
            href="#journal"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-700 hover:text-blue-600 font-medium py-1"
          >
            Journal
          </Link>
          <Link
            href="#case-studies"
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-700 hover:text-blue-600 font-medium py-1"
          >
            Case Studies
          </Link>
          <Link
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-full text-center mt-2 shadow-sm"
          >
            Contact Us
          </Link>
        </div>
      )}

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-between items-center text-center px-4 sm:px-6 pt-16 sm:pt-24 md:pt-28 relative">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Main Headline - Bricolage Grotesque font with balanced 2-line structure */}
          <h1 className="font-[family-name:var(--font-bricolage)] text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold tracking-tight text-slate-950 leading-[1.08] text-center max-w-5xl mx-auto text-balance">
            <span className="block">We Engineer Ideas Into</span>
            <span className="block text-blue-600">
              Working Products<span className="text-slate-950">.</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-500 font-normal max-w-xl mx-auto leading-relaxed">
            Custom software. Scalable platforms. Real-world impact.
          </p>

          {/* Primary CTA Button */}
          <div className="mt-8 sm:mt-10">
            <Link
              href="#explore"
              className="group inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-base sm:text-[17px] px-8 py-3.5 rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <span>Explore Our Work</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Arch & Scroll Indicator Visual Element */}
        <div className="w-full relative overflow-hidden mt-16 sm:mt-24 pt-4 pb-12 flex flex-col items-center">
          {/* Ambient Blue Radial Glow */}
          <div
            className="absolute inset-0 -top-20 bg-[radial-gradient(ellipse_70%_80%_at_50%_100%,rgba(59,130,246,0.12),transparent_75%)] pointer-events-none"
            aria-hidden="true"
          />

          {/* Responsive SVG Arc Curve */}
          <div className="relative w-full max-w-6xl mx-auto px-4">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="w-full h-16 sm:h-20 md:h-24 stroke-blue-300/80 fill-none"
              style={{ strokeWidth: "1.5" }}
            >
              <path d="M 0 120 Q 600 -10 1200 120" />
            </svg>

            {/* Circular Down Button positioned exactly at the peak of the arc */}
            <div className="absolute left-1/2 -top-3.5 -translate-x-1/2 flex flex-col items-center">
              <Link
                href="#explore"
                aria-label="Scroll down to explore"
                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white flex items-center justify-center shadow-md shadow-blue-500/30 transition-all duration-200 hover:scale-110 active:scale-95 z-10"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Link>
              {/* Vertical line extending downward */}
              <div className="w-[1.5px] h-20 bg-blue-300/80" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
