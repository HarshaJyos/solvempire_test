"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const projects = [
  {
    id: "01",
    category: "PRODUCT ENGINEERING",
    title: "Freshpod Helmet Sanitization System",
    description:
      "An automated helmet hygiene system that uses advanced sanitization & sterilization technology to keep helmets clean, safe and germ-free.",
    image: "/freshpod.jpg",
    link: "#freshpod",
  },
  {
    id: "02",
    category: "FINTECH & CLOUD SYSTEMS",
    title: "ApexFlow Real-Time Financial Engine",
    description:
      "High-throughput, ultra-low latency financial data platform built for real-time asset settlement and institutional execution.",
    image: "/freshpod.jpg",
    link: "#apexflow",
  },
  {
    id: "03",
    category: "AI & IOT PLATFORMS",
    title: "OmniTrack Smart Fleet Telemetry",
    description:
      "Intelligent IoT fleet tracking system powering next-gen route optimization, predictive maintenance, and driver safety intelligence.",
    image: "/freshpod.jpg",
    link: "#omnitrack",
  },
  {
    id: "04",
    category: "HEALTHCARE INNOVATION",
    title: "MedVantage Diagnostic AI Suite",
    description:
      "Clinical decision support software harnessing advanced machine learning to deliver fast, highly accurate medical image analysis.",
    image: "/freshpod.jpg",
    link: "#medvantage",
  },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  return (
    <div className="w-full bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-700 scroll-smooth">
      {/* ========================================================================= */}
      {/* SECTION 1: HERO VIEWPORT (Uncrowded, spacious landing screen) */}
      {/* ========================================================================= */}
      <section className="min-h-screen flex flex-col justify-between relative overflow-hidden">
        {/* Navigation Bar */}
        <header className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-6 sm:pt-8 flex items-center justify-between relative z-30">
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
              href="#showcase"
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
              href="#showcase"
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

        {/* Hero Center Content with open breathing space */}
        <div className="w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center my-auto py-12">
          <h1 className="font-[family-name:var(--font-bricolage)] text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-bold tracking-tight text-slate-950 leading-[1.08] text-center max-w-5xl mx-auto text-balance">
            <span>We Engineer Ideas Into </span>
            <span className="text-blue-600">
              Working Products<span className="text-slate-950">.</span>
            </span>
          </h1>

          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-slate-500 font-normal max-w-xl mx-auto leading-relaxed">
            Custom software. Scalable platforms. Real-world impact.
          </p>

          <div className="mt-8 sm:mt-10">
            <Link
              href="#showcase"
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

        {/* Hero Bottom Floating Explorer Badge */}
        <div className="w-full flex flex-col items-center select-none relative z-20 pb-8">
          <Link
            href="#showcase"
            aria-label="Scroll to featured showcase"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/95 hover:bg-blue-50/90 border border-slate-200/90 hover:border-blue-300 text-slate-600 hover:text-blue-600 text-xs sm:text-sm font-medium tracking-wide shadow-sm hover:shadow-md transition-all duration-300 group backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>Explore Featured Work</span>
            <svg
              className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform duration-300 group-hover:translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: SHOWCASE VIEWPORT (Unique Glowing Arc Dial & Featured Card) */}
      {/* ========================================================================= */}
      <section
        id="showcase"
        className="min-h-screen flex flex-col justify-between items-center relative pt-4 pb-8 sm:pb-12 overflow-hidden scroll-mt-6"
      >
        {/* Ambient Blue Radial Spotlight focused on active hub */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-4 w-[600px] sm:w-[800px] h-72 bg-gradient-to-b from-blue-400/15 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Live Project Beacon Header Badge */}
        <div className="flex flex-col items-center pt-2 pb-1 select-none z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-100 text-blue-700 text-xs font-semibold tracking-wider uppercase shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
            <span>Featured Case Studies &bull; {projects[activeProjectIndex].id} of 04</span>
          </div>
        </div>

        {/* Full-Width Edge-to-Edge Glowing Arc Dial */}
        <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden select-none px-0">
          <div className="relative w-full h-28 sm:h-32 md:h-36">
            {/* SVG Glowing Arc Curve stretching across the entire screen */}
            <svg
              viewBox="0 0 1920 140"
              preserveAspectRatio="none"
              className="w-full h-full fill-none overflow-visible"
            >
              <defs>
                <linearGradient id="arcGlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.2" />
                  <stop offset="25%" stopColor="#60a5fa" stopOpacity="0.5" />
                  <stop offset="50%" stopColor="#2563eb" stopOpacity="0.95" />
                  <stop offset="75%" stopColor="#60a5fa" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.2" />
                </linearGradient>
                <filter id="arcGlowFilter" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Soft ambient glow line */}
              <path
                d="M 0 115 Q 960 -35 1920 115"
                stroke="url(#arcGlowGradient)"
                strokeWidth="5"
                opacity="0.25"
                filter="url(#arcGlowFilter)"
                vectorEffect="non-scaling-stroke"
              />

              {/* Sharp primary track line */}
              <path
                d="M 0 115 Q 960 -35 1920 115"
                stroke="url(#arcGlowGradient)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Dial Nodes along the Arc - Mathematically aligned 100% on the curve */}
            {projects.map((project, index) => {
              let diff = index - activeProjectIndex;
              if (diff > projects.length / 2) diff -= projects.length;
              if (diff < -projects.length / 2) diff += projects.length;

              // Map diff to parameter t on curve: t=0.5 is center apex
              let t = 0.5 + diff * 0.16;
              t = Math.max(0.06, Math.min(0.94, t));

              // Exact X & Y coordinate percentage matching SVG path y(t) = 115 - 300*t*(1-t) in height 140
              const leftPercent = t * 100;
              const yVal = 115 - 300 * t * (1 - t);
              const topPercent = (yVal / 140) * 100;

              const isActive = activeProjectIndex === index;

              return (
                <button
                  key={project.id}
                  onClick={() => setActiveProjectIndex(index)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20 transition-all duration-500 ease-out focus:outline-none"
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                  }}
                  aria-label={`Switch to project ${project.id}: ${project.title}`}
                >
                  {isActive ? (
                    <div className="relative flex flex-col items-center">
                      {/* Luminous Pulsing Halo */}
                      <span className="absolute -inset-2 rounded-full bg-blue-400/30 animate-pulse blur-xs" />
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm sm:text-base shadow-xl shadow-blue-500/40 ring-4 sm:ring-6 ring-blue-100 transition-transform duration-300 scale-105">
                        <span>{project.id}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-sm border-2 border-slate-200 group-hover:border-blue-500 text-slate-500 group-hover:text-blue-600 flex items-center justify-center font-semibold text-xs sm:text-sm shadow-sm transition-all duration-300 group-hover:scale-115">
                      <span>{project.id}</span>
                    </div>
                  )}
                </button>
              );
            })}

            {/* Left / Right Quick Prev / Next Controls centered on the Arc curve */}
            {(() => {
              // Position Left Arrow at t=0.07
              const tLeft = 0.07;
              const yLeft = 115 - 300 * tLeft * (1 - tLeft);
              const topPercentLeft = (yLeft / 140) * 100;

              // Position Right Arrow at t=0.93
              const tRight = 0.93;
              const yRight = 115 - 300 * tRight * (1 - tRight);
              const topPercentRight = (yRight / 140) * 100;

              return (
                <>
                  <button
                    onClick={() =>
                      setActiveProjectIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
                    }
                    aria-label="Previous Project"
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200/90 text-slate-500 hover:text-blue-600 hover:border-blue-400 flex items-center justify-center shadow-md transition-all hover:scale-115 z-20 group"
                    style={{
                      left: "7%",
                      top: `${topPercentLeft}%`,
                    }}
                  >
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      setActiveProjectIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
                    }
                    aria-label="Next Project"
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200/90 text-slate-500 hover:text-blue-600 hover:border-blue-400 flex items-center justify-center shadow-md transition-all hover:scale-115 z-20 group"
                    style={{
                      left: "93%",
                      top: `${topPercentRight}%`,
                    }}
                  >
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              );
            })()}
          </div>
        </div>

        {/* Middle / Bottom: The Featured Showcase Card (fits comfortably in this 100vh) */}
        <div className="w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center my-auto pt-4 pb-2">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Layered Showcase Visual */}
            <div className="lg:col-span-7 relative w-full">
              {/* Background Offset Card Layer 1 */}
              <div
                className="absolute -top-3 -left-3 sm:-top-5 sm:-left-5 w-[96%] h-[96%] bg-blue-100/80 rounded-2xl sm:rounded-3xl pointer-events-none transition-transform duration-300"
                aria-hidden="true"
              />

              {/* Background Offset Card Layer 2 */}
              <div
                className="absolute -bottom-3 -right-3 w-[90%] h-[90%] bg-blue-200/50 rounded-2xl sm:rounded-3xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Main Image Container */}
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-2xl group aspect-[16/10] max-h-[300px] sm:max-h-[340px] md:max-h-[380px] w-full">
                <Image
                  src={projects[activeProjectIndex].image}
                  alt={projects[activeProjectIndex].title}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Right Column: Project Details & Action */}
            <div className="lg:col-span-5 flex flex-col items-start justify-center text-left">
              <span className="text-blue-600 font-semibold tracking-[0.18em] text-xs sm:text-sm uppercase">
                {projects[activeProjectIndex].category}
              </span>

              <h3 className="font-[family-name:var(--font-bricolage)] text-2xl sm:text-3xl lg:text-[2.5rem] font-bold text-slate-950 mt-2 mb-3 leading-[1.14] tracking-tight">
                {projects[activeProjectIndex].title}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                {projects[activeProjectIndex].description}
              </p>

              <Link
                href={projects[activeProjectIndex].link}
                className="inline-flex items-center gap-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm sm:text-base px-7 py-3 sm:py-3.5 rounded-full shadow-md shadow-blue-500/25 hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>View Case Study</span>
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
        </div>
      </section>
    </div>
  );
}
