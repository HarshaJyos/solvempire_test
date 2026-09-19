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
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-700 scroll-smooth">
      {/* ========================================================= */}
      {/* SECTION 1: HERO SECTION (Takes full screen viewport height) */}
      {/* ========================================================= */}
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
              href="#featured-work"
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
              href="#featured-work"
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

        {/* Hero Center Headline & CTA */}
        <div className="w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center my-auto pt-8 pb-4">
          <h1 className="font-[family-name:var(--font-bricolage)] text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-bold tracking-tight text-slate-950 leading-[1.08] text-center max-w-5xl mx-auto text-balance">
            <span>We Engineer Ideas Into </span>
            <span className="text-blue-600">
              Working Products<span className="text-slate-950">.</span>
            </span>
          </h1>

          <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-500 font-normal max-w-xl mx-auto leading-relaxed">
            Custom software. Scalable platforms. Real-world impact.
          </p>

          <div className="mt-8 sm:mt-10">
            <Link
              href="#featured-work"
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

        {/* Hero Bottom Arch with Down Arrow Indicator */}
        <div className="w-full relative overflow-hidden pb-8 flex flex-col items-center select-none">
          {/* Ambient Blue Radial Glow */}
          <div
            className="absolute inset-0 -top-20 bg-[radial-gradient(ellipse_70%_80%_at_50%_100%,rgba(59,130,246,0.12),transparent_75%)] pointer-events-none"
            aria-hidden="true"
          />

          {/* SVG Arc Curve */}
          <div className="relative w-full max-w-6xl mx-auto px-4">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="w-full h-16 sm:h-20 md:h-24 stroke-blue-300/80 fill-none"
              style={{ strokeWidth: "1.5" }}
            >
              <path d="M 0 120 Q 600 -10 1200 120" />
            </svg>

            {/* Circular Down Button on the apex of the hero arc */}
            <div className="absolute left-1/2 -top-3.5 -translate-x-1/2 flex flex-col items-center">
              <Link
                href="#featured-work"
                aria-label="Scroll down to featured work"
                className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white flex items-center justify-center shadow-md shadow-blue-500/30 transition-all duration-200 hover:scale-110 active:scale-95 z-10"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Link>
              {/* Vertical connector line */}
              <div className="w-[1.5px] h-20 bg-blue-300/80" />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: FEATURED WORK SECTION (Takes full screen viewport) */}
      {/* ========================================================= */}
      <section
        id="featured-work"
        className="min-h-screen flex flex-col justify-center py-16 sm:py-24 relative px-6 sm:px-8 lg:px-12 scroll-mt-6"
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
          {/* Section Header & Interactive Rotating Arc Stepper */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 mb-10 sm:mb-14">
            {/* Title on Left */}
            <div className="flex flex-col items-start text-left">
              <span className="text-blue-600 font-semibold tracking-[0.2em] text-xs sm:text-sm uppercase mb-2 sm:mb-3">
                Featured Work
              </span>
              <h2 className="font-[family-name:var(--font-bricolage)] text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-slate-950 leading-[1.08] tracking-tight">
                Engineering Impact <br />
                That <span className="text-blue-600">Speaks<span className="text-slate-950">.</span></span>
              </h2>
            </div>

            {/* Rotating Arc Stepper on Right */}
            <div className="relative w-80 sm:w-96 h-28 hidden sm:block select-none">
              {/* Arc Path */}
              <svg
                viewBox="0 0 360 120"
                className="w-full h-full stroke-blue-200 fill-none overflow-visible"
                style={{ strokeWidth: "1.8" }}
              >
                <path d="M 20 100 Q 180 0 340 100" />
              </svg>

              {/* Stepper Nodes along the arc */}
              {projects.map((project, index) => {
                let diff = index - activeProjectIndex;
                if (diff > projects.length / 2) diff -= projects.length;
                if (diff < -projects.length / 2) diff += projects.length;

                // Center is at t=0.5
                let t = 0.5 + diff * 0.22;
                t = Math.max(0.08, Math.min(0.92, t));

                // Curve coordinates on viewBox 360x120
                const cx = 360 * t;
                // y(t) = 100 - 360 * t * (1-t)
                const cy = 100 - 360 * t * (1 - t);

                const isActive = activeProjectIndex === index;

                return (
                  <button
                    key={project.id}
                    onClick={() => setActiveProjectIndex(index)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20 transition-all duration-500 ease-out focus:outline-none"
                    style={{
                      left: `${(cx / 360) * 100}%`,
                      top: `${(cy / 120) * 100}%`,
                    }}
                    aria-label={`Switch to project ${project.id}: ${project.title}`}
                  >
                    {isActive ? (
                      <div className="relative flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-500/35 ring-4 ring-blue-100 transition-transform duration-300 scale-110">
                          <span>{project.id}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-white border-2 border-blue-200 group-hover:border-blue-600 text-slate-500 group-hover:text-blue-600 flex items-center justify-center font-semibold text-xs shadow-sm transition-all duration-300 group-hover:scale-110">
                        <span>{project.id}</span>
                      </div>
                    )}
                  </button>
                );
              })}

              {/* Arrow navigation buttons */}
              <button
                onClick={() =>
                  setActiveProjectIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
                }
                aria-label="Previous Project"
                className="absolute left-0 bottom-0 w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-400 flex items-center justify-center shadow-sm transition-all hover:scale-110 z-20"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() =>
                  setActiveProjectIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
                }
                aria-label="Next Project"
                className="absolute right-0 bottom-0 w-7 h-7 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-400 flex items-center justify-center shadow-sm transition-all hover:scale-110 z-20"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Mobile simple buttons */}
            <div className="flex sm:hidden items-center gap-2.5">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  onClick={() => setActiveProjectIndex(index)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeProjectIndex === index
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {project.id}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Showcase Card (2-column layout with generous breathing space) */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Layered Showcase Visual */}
            <div className="lg:col-span-7 relative w-full">
              {/* Background Layer 1 */}
              <div
                className="absolute -top-3 -left-3 sm:-top-5 sm:-left-5 w-[96%] h-[96%] bg-blue-100/80 rounded-2xl sm:rounded-3xl pointer-events-none transition-transform duration-300"
                aria-hidden="true"
              />

              {/* Background Layer 2 */}
              <div
                className="absolute -bottom-3 -right-3 w-[90%] h-[90%] bg-blue-200/50 rounded-2xl sm:rounded-3xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Main Showcase Image Container */}
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-2xl group aspect-[16/10] w-full">
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

            {/* Right Column: Project Details & CTA */}
            <div className="lg:col-span-5 flex flex-col items-start justify-center text-left">
              <span className="text-blue-600 font-semibold tracking-[0.18em] text-xs sm:text-sm uppercase">
                {projects[activeProjectIndex].category}
              </span>

              <h3 className="font-[family-name:var(--font-bricolage)] text-2xl sm:text-3xl lg:text-[2.65rem] font-bold text-slate-950 mt-3 mb-4 leading-[1.14] tracking-tight">
                {projects[activeProjectIndex].title}
              </h3>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
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
