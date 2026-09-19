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

      {/* Main Single-Viewport Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between items-center text-center pt-2 sm:pt-4 pb-6 sm:pb-8 relative">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Main Headline */}
          <h1 className="font-[family-name:var(--font-bricolage)] text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold tracking-tight text-slate-950 leading-[1.08] text-center max-w-4xl mx-auto text-balance">
            <span>We Engineer Ideas Into </span>
            <span className="text-blue-600">
              Working Products<span className="text-slate-950">.</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-2 sm:mt-2.5 text-sm sm:text-base text-slate-500 font-normal max-w-lg mx-auto leading-normal">
            Custom software. Scalable platforms. Real-world impact.
          </p>
        </div>

        {/* Interactive Rotating Arc Dial */}
        <div className="w-full relative mt-4 sm:mt-6 mb-2 flex flex-col items-center select-none">
          {/* Seamless Ambient Glow */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[85vw] max-w-4xl h-48 sm:h-60 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Large Arc Dial Container */}
          <div className="relative w-full max-w-5xl mx-auto px-4 h-24 sm:h-28">
            {/* SVG Arc Curve */}
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="w-full h-full stroke-blue-200 fill-none overflow-visible"
              style={{ strokeWidth: "1.8" }}
            >
              <path d="M 0 110 Q 600 -40 1200 110" />
            </svg>

            {/* Dial Nodes along the Arc (Precisely centered on the curve) */}
            {projects.map((project, index) => {
              // Calculate circular offset relative to activeProjectIndex
              let diff = index - activeProjectIndex;
              if (diff > projects.length / 2) diff -= projects.length;
              if (diff < -projects.length / 2) diff += projects.length;

              // Map diff to parameter t on curve: diff=0 is center (t=0.5)
              let t = 0.5 + diff * 0.22;
              t = Math.max(0.08, Math.min(0.92, t));

              // Compute (x, y) coordinates in percentage
              const leftPercent = t * 100;
              // Quadratic curve formula: y(t) = 110 - 300*t*(1-t) in viewBox height 120
              const topPercent = ((110 - 300 * t * (1 - t)) / 120) * 100;

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
                    /* Active Center Node - Centered directly on the arc apex */
                    <div className="relative flex flex-col items-center">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm sm:text-base shadow-lg shadow-blue-500/35 ring-4 sm:ring-6 ring-blue-100 transition-transform duration-300 scale-105">
                        <span>{project.id}</span>
                      </div>
                    </div>
                  ) : (
                    /* Inactive Side Node - Centered on the arc curve */
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border-2 border-blue-200 group-hover:border-blue-600 text-slate-500 group-hover:text-blue-600 flex items-center justify-center font-semibold text-xs shadow-sm transition-all duration-300 group-hover:scale-110">
                      <span>{project.id}</span>
                    </div>
                  )}
                </button>
              );
            })}

            {/* Vertical Connector Line from Center Apex into Showcase Card */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[20%] bottom-0 w-[1.5px] bg-gradient-to-b from-blue-400 via-blue-300 to-transparent pointer-events-none" />

            {/* Left / Right Quick Prev / Next Arrow Controls */}
            <button
              onClick={() =>
                setActiveProjectIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
              }
              aria-label="Previous Project"
              className="absolute left-1 sm:left-4 top-[60%] -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-400 flex items-center justify-center shadow-sm transition-all hover:scale-110 z-20"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() =>
                setActiveProjectIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
              }
              aria-label="Next Project"
              className="absolute right-1 sm:right-4 top-[60%] -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-400 flex items-center justify-center shadow-sm transition-all hover:scale-110 z-20"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Featured Project Showcase Card (Seamlessly crowns right under the arc dial) */}
        <section
          id="featured-work"
          className="w-full max-w-5xl mx-auto px-2 sm:px-4 transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center text-left">
            {/* Left Column: Layered Showcase Image */}
            <div className="lg:col-span-7 relative w-full">
              {/* Offset Background Layer 1 */}
              <div
                className="absolute -top-2.5 -left-2.5 sm:-top-4 sm:-left-4 w-[96%] h-[96%] bg-blue-100/80 rounded-2xl pointer-events-none transition-transform duration-300"
                aria-hidden="true"
              />

              {/* Offset Background Layer 2 */}
              <div
                className="absolute -bottom-2.5 -right-2.5 w-[90%] h-[90%] bg-blue-200/50 rounded-2xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Main Image Container */}
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-xl group aspect-[16/10] max-h-[260px] sm:max-h-[300px] md:max-h-[340px] w-full">
                <Image
                  src={projects[activeProjectIndex].image}
                  alt={projects[activeProjectIndex].title}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Right Column: Project Info & CTA */}
            <div className="lg:col-span-5 flex flex-col items-start justify-center">
              <span className="text-blue-600 font-semibold tracking-[0.16em] text-xs uppercase">
                {projects[activeProjectIndex].category}
              </span>

              <h3 className="font-[family-name:var(--font-bricolage)] text-xl sm:text-2xl lg:text-[1.85rem] font-bold text-slate-950 mt-1.5 mb-2.5 leading-[1.18] tracking-tight">
                {projects[activeProjectIndex].title}
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3">
                {projects[activeProjectIndex].description}
              </p>

              <Link
                href={projects[activeProjectIndex].link}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-full shadow-md shadow-blue-500/25 hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                <span>View Case Study</span>
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
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
        </section>
      </main>
    </div>
  );
}
