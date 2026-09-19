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
              {/* Vertical line extending downward */}
              <div className="w-[1.5px] h-20 bg-blue-300/80" />
            </div>
          </div>
        </div>
      </main>

      {/* Featured Work Section */}
      <section
        id="featured-work"
        className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 lg:py-28 relative scroll-mt-10"
      >
        {/* Section Header with Stepper Arc */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          {/* Left Title Area */}
          <div className="flex flex-col items-start">
            <span className="text-blue-600 font-semibold tracking-[0.2em] text-xs sm:text-sm uppercase mb-3">
              Featured Work
            </span>
            <h2 className="font-[family-name:var(--font-bricolage)] text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-950 leading-[1.08] tracking-tight">
              Engineering Impact <br />
              That <span className="text-blue-600">Speaks<span className="text-slate-950">.</span></span>
            </h2>
          </div>

          {/* Right Curved Stepper Navigation (Dots mathematically aligned on the arc line) */}
          <div className="relative w-72 md:w-80 h-28 hidden sm:block select-none">
            <svg
              viewBox="0 0 340 130"
              className="w-full h-full overflow-visible"
            >
              {/* The Curved Arc */}
              <path
                d="M 25 20 Q 180 20 305 90"
                fill="none"
                stroke="#bfdbfe"
                strokeWidth="1.5"
              />

              {/* Stepper Nodes positioned directly on the curve */}
              {projects.map((project, index) => {
                const nodePositions = [
                  { cx: 25, cy: 20, tx: 25, ty: 48 },
                  { cx: 130, cy: 29, tx: 130, ty: 57 },
                  { cx: 227, cy: 54, tx: 227, ty: 82 },
                  { cx: 305, cy: 90, tx: 305, ty: 118 },
                ];
                const node = nodePositions[index];
                const isActive = activeProjectIndex === index;

                return (
                  <g
                    key={project.id}
                    onClick={() => setActiveProjectIndex(index)}
                    className="cursor-pointer group"
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${project.title}`}
                  >
                    {/* Active Halo Ring */}
                    {isActive && (
                      <circle
                        cx={node.cx}
                        cy={node.cy}
                        r="12"
                        className="fill-blue-500/20 stroke-blue-400/40 animate-pulse"
                        strokeWidth="1"
                      />
                    )}

                    {/* Center Dot - exactly on the line */}
                    <circle
                      cx={node.cx}
                      cy={node.cy}
                      r={isActive ? 5.5 : 4}
                      className={
                        isActive
                          ? "fill-blue-600 transition-all duration-200"
                          : "fill-blue-300 group-hover:fill-blue-500 transition-colors"
                      }
                    />

                    {/* Number Label below the dot */}
                    <text
                      x={node.tx}
                      y={node.ty}
                      textAnchor="middle"
                      className={`text-sm sm:text-[15px] select-none transition-colors duration-200 ${
                        isActive
                          ? "fill-blue-600 font-bold"
                          : "fill-slate-400 group-hover:fill-slate-700 font-medium"
                      }`}
                      style={{
                        fontFamily: "'Google Sans', sans-serif",
                        fontWeight: isActive ? "700" : "500",
                      }}
                    >
                      {project.id}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Mobile Simple Stepper */}
          <div className="flex sm:hidden items-center gap-3">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setActiveProjectIndex(index)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeProjectIndex === index
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {project.id}
              </button>
            ))}
          </div>
        </div>

        {/* Showcase Grid (Image + Content) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mt-12 sm:mt-16">
          {/* Left Column: Layered Visual Cards */}
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

            {/* Main Showcase Image Container */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/70 shadow-2xl group aspect-[16/10] w-full">
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

          {/* Right Column: Project Info & CTA */}
          <div className="lg:col-span-5 flex flex-col items-start max-w-xl">
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
      </section>
    </div>
  );
}
